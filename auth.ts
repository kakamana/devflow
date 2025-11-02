import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import slugify from "slugify";

import Account from "./database/account.model";
import User from "./database/user.model";
import dbConnect from "./lib/mongoose";
import { SignInSchema } from "./lib/validations";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          await dbConnect();

          // Find account by email (for credentials provider, providerAccountId is email)
          const existingAccount = await Account.findOne({
            providerAccountId: email,
          });

          if (!existingAccount) return null;

          // Find user by ID
          const existingUser = await User.findById(existingAccount.userId);

          if (!existingUser) return null;

          // Verify password
          const isValidPassword = await bcrypt.compare(
            password,
            existingAccount.password!
          );

          if (isValidPassword) {
            return {
              id: existingUser._id.toString(),
              name: existingUser.name,
              email: existingUser.email,
              image: existingUser.image,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        await dbConnect();

        const existingAccount = await Account.findOne({
          providerAccountId:
            account.type === "credentials"
              ? token.email!
              : account.providerAccountId,
        });

        if (!existingAccount) return token;

        const userId = existingAccount.userId;

        if (userId) token.sub = userId.toString();
      }

      return token;
    },
    async signIn({ user, profile, account }) {
      if (account?.type === "credentials") return true;
      if (!account || !user) return false;

      await dbConnect();

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const { name, email, image } = user;
        const username =
          account.provider === "github"
            ? (profile?.login as string)
            : user.name?.toLowerCase();

        const slugifiedUsername = slugify(username!, {
          lower: true,
          strict: true,
          trim: true,
        });

        let existingUser = await User.findOne({ email }).session(session);

        if (!existingUser) {
          [existingUser] = await User.create(
            [{ name, username: slugifiedUsername, email, image }],
            { session }
          );
        } else {
          const updatedData: { name?: string; image?: string } = {};

          if (name && existingUser.name !== name) updatedData.name = name;
          if (image && existingUser.image !== image) updatedData.image = image;

          if (Object.keys(updatedData).length > 0) {
            await User.updateOne(
              { _id: existingUser._id },
              { $set: updatedData }
            ).session(session);
          }
        }

        const existingAccount = await Account.findOne({
          userId: existingUser._id,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        }).session(session);

        if (!existingAccount) {
          await Account.create(
            [
              {
                userId: existingUser._id,
                name,
                image,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            ],
            { session }
          );
        }

        await session.commitTransaction();
        return true;
      } catch (error) {
        await session.abortTransaction();
        console.error("OAuth sign-in error:", error);
        return false;
      } finally {
        session.endSession();
      }
    },
  },
});
