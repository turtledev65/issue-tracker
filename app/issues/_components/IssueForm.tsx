"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, Status } from "@prisma/client";
import {
  Box,
  Button,
  Callout,
  Flex,
  Grid,
  Select,
  TextField
} from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueForm = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
}

const statusMap: Record<
  Status,
  { label: string; color: "red" | "yellow" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "yellow" },
  CLOSED: { label: "Closed", color: "green" }
};

const IssueForm = ({ issue }: Props) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema)
  });
  const [error, setError] = useState("");

  const handleSubmitIssue = handleSubmit(async data => {
    try {
      let response = null;

      if (issue)
        response = await fetch(`/api/issues/${issue.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
      else
        response = await fetch("/api/issues", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

      if (!response.ok) throw response;

      if (issue) router.push(`/issues/${issue.id}`);
      else router.push(`/issues`);
      router.refresh();
    } catch (err) {
      setError("An unexpected error occured.");
    }
  });

  return (
    <div>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmitIssue}>
        <Grid columns={{ initial: "1", md: "5" }} gap="5">
          <Box className="lg:col-span-4">
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <TextField.Root>
              <TextField.Input
                placeholder="Title"
                defaultValue={issue?.title}
                {...register("title")}
              />
            </TextField.Root>
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
            <Controller
              name="description"
              control={control}
              defaultValue={issue?.description}
              render={({ field }) => (
                <SimpleMDE placeholder="Description" {...field} />
              )}
            />
          </Box>
          <Flex direction="column" gap="2" width="100%">
            <Button disabled={isSubmitting} className="w-full">
              {issue ? "Update issue" : "Submit issue"}
              {isSubmitting && <Spinner />}
            </Button>
            {issue && (
              <Select.Root defaultValue={issue.status}>
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Label>Status</Select.Label>
                    {Object.entries(statusMap).map(([key, value]) => (
                      <Select.Item value={key} key={key}>
                        {value.label}
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            )}
          </Flex>
        </Grid>
      </form>
    </div>
  );
};

export default IssueForm;
