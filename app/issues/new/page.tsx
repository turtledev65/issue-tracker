"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMde from "react-simplemde-editor";
import { z } from "zod";

type IssueForm = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema)
  });
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async data => {
          try {
            const response = await fetch("/api/issues", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data)
            });
            if (!response.ok) throw response;

            router.push("/issues");
          } catch (err) {
            setError("An unexpected error occured.");
          }
        })}
      >
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMde placeholder="Description" {...field} />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
