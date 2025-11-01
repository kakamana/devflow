"use client";
import AuthForm from "@/components/forms/AuthForm";
import React from "react";
import { SignUpSchema } from "@/lib/validations";
import { signUpWithCredentials } from "@/lib/actions/auth.actions";

const SignUp = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpSchema}
      defaultValues={{ username: "", name: "", email: "", password: "" }}
      onSubmit={signUpWithCredentials}
    />
  );
};

export default SignUp;
