"use server";

import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

import ROUTES from "@/constants/routes";
import { Collection, Question } from "@/database";

import action from "../handlers/action";
import handleError from "../handlers/error";
import {
  CollectionBaseSchema,
  PaginatedSearchParamsSchema,
} from "../validations";

export async function toggleSaveQuestion(
  params: CollectionBaseParams
): Promise<ActionResponse<{ saved: boolean }>> {
  const validationResult = await action({
    params,
    schema: CollectionBaseSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { questionId } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  try {
    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question not found");

    const collection = await Collection.findOne({
      question: questionId,
      author: userId,
    });

    if (collection) {
      await Collection.findByIdAndDelete(collection._id);

      revalidatePath(ROUTES.QUESTION(questionId));

      return {
        success: true,
        data: {
          saved: false,
        },
      };
    }

    await Collection.create({
      question: questionId,
      author: userId,
    });

    revalidatePath(ROUTES.QUESTION(questionId));

    return {
      success: true,
      data: {
        saved: true,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
export async function hasSavedQuestion(
  params: CollectionBaseParams
): Promise<ActionResponse<{ saved: boolean }>> {
  const validationResult = await action({
    params,
    schema: CollectionBaseSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { questionId } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  try {
    const collection = await Collection.findOne({
      question: questionId,
      author: userId,
    });

    return {
      success: true,
      data: {
        saved: !!collection,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getSavedQuestions(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ collection: Collection[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const userId = validationResult.session?.user?.id;
  const { page = 1, pageSize = 10, query, filter } = params;
  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  try {
    // Step 1: Build filter query for Collections
    const collectionFilter: FilterQuery<typeof Collection> = { author: userId };

    // Step 2: If there's a search query, first find matching Questions
    if (query) {
      const questionFilter: FilterQuery<typeof Question> = {
        $or: [
          { title: { $regex: new RegExp(query, "i") } },
          { content: { $regex: new RegExp(query, "i") } },
        ],
      };

      // Find all questions that match the search query
      const matchingQuestions = await Question.find(questionFilter).select(
        "_id"
      );
      const matchingQuestionIds = matchingQuestions.map((q) => q._id);

      // Add condition to only include collections with these question IDs
      collectionFilter.question = { $in: matchingQuestionIds };
    }

    // Step 3: Count total collections matching the filter
    const totalCollections = await Collection.countDocuments(collectionFilter);

    // Step 4: Set up sort criteria based on filter
    // Since we need to sort by Question fields, we'll use aggregation
    let sortCriteria: Record<string, 1 | -1> = {};

    switch (filter) {
      case "mostrecent":
        sortCriteria = { "question.createdAt": -1 };
        break;
      case "oldest":
        sortCriteria = { "question.createdAt": 1 };
        break;
      case "mostvoted":
        sortCriteria = { "question.upvotes": -1 };
        break;
      case "mostanswered":
        sortCriteria = { "question.answers": -1 };
        break;
      default:
        sortCriteria = { createdAt: -1 };
        break;
    }

    // Step 5: Fetch collections with populated question data
    const collections = await Collection.find(collectionFilter)
      .populate({
        path: "question",
        populate: [
          { path: "tags", select: "_id name" },
          { path: "author", select: "_id name image" },
        ],
      })
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalCollections > skip + collections.length;

    return {
      success: true,
      data: { collection: JSON.parse(JSON.stringify(collections)), isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
