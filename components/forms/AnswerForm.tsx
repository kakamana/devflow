"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ReloadIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AnswerSchema } from "@/lib/validations";
import { createAnswer } from "@/lib/actions/answer.action";
import { toast } from "sonner";
import { api } from "@/lib/api";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

interface AnswerFormProps {
  questionId: string;
  questionTitle: string;
  questionContent: string;
  isAuthenticated: boolean;
}

const AnswerForm = ({
  questionId,
  questionTitle,
  questionContent,
  isAuthenticated,
}: AnswerFormProps) => {
  const [isAnswering, startAnsweringTransition] = useTransition();
  const [isAISubmitting, setIsAISubmitting] = useState(false);

  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    startAnsweringTransition(async () => {
      const result = await createAnswer({
        questionId,
        content: values.content,
      });

      if (result.success) {
        form.reset();

        toast.success("Your answer has been posted successfully");

        if (editorRef.current) {
          editorRef.current.setMarkdown("");
        }
      } else {
        toast.error(result.error?.message || "Failed to post answer");
      }
    });
  };

  const generateAIAnswer = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to generate an AI answer");
      return;
    }

    setIsAISubmitting(true);
    const userAnswer = editorRef.current?.getMarkdown();

    try {
      const response = await api.ai.getAnswer(
        questionTitle,
        questionContent,
        userAnswer
      );

      if (!response.success) {
        toast.error(response.error?.message || "Failed to generate AI answer");
        return;
      }

      const aiAnswer = response.data || "";

      if (!aiAnswer || typeof aiAnswer !== "string") {
        toast.error("Invalid response from AI service");
        return;
      }

      const formattedAnswer = aiAnswer.replace(/<br>/g, "\n").trim();

      // Set the form value
      form.setValue("content", formattedAnswer);

      // Update editor via ref
      if (editorRef.current) {
        editorRef.current.setMarkdown(formattedAnswer);
      }

      toast.success("AI answer generated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "There was a problem with your request"
      );
    } finally {
      setIsAISubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>
        <Button
          className="btn light-border-2 gap-1.5 rounded-md border px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          disabled={isAISubmitting || !isAuthenticated}
          onClick={generateAIAnswer}
        >
          {isAISubmitting ? (
            <>
              <ReloadIcon className="mr-2 size-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Image
                src="/icons/stars.svg"
                alt="Generate AI Answer"
                width={12}
                height={12}
                className="object-contain"
              />
              Generate AI Answer
            </>
          )}
        </Button>
      </div>
      {!isAuthenticated && (
        <p className="mt-4 text-sm text-dark400_light700">
          Please sign in to post an answer or generate an AI answer.
        </p>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-6 flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    ref={editorRef}
                    value={field.value}
                    fieldChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit"
              disabled={isAnswering || !isAuthenticated}
            >
              {isAnswering ? (
                <>
                  <ReloadIcon className="mr-2 size-4 animate-spin" />
                  Posting...
                </>
              ) : !isAuthenticated ? (
                "Sign In to Post Answer"
              ) : (
                "Post Answer"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
