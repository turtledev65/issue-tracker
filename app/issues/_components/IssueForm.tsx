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
import axios from "axios";
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
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
        router.push(`/issues/${issue.id}`);
      } else {
        await axios.post("/api/issues", data);
        router.push(`/issues`);
      }
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
                <SimpleMDE
                  placeholder="Description"
                  className="mt-3"
                  {...field}
                />
              )}
            />
          </Box>
          <Flex direction="column" gap="2" width="100%">
            <Button disabled={isSubmitting} className="w-full">
              {issue ? "Update issue" : "Submit issue"}
              {isSubmitting && <Spinner />}
            </Button>
            {issue && (
              <Controller
                name="status"
                control={control}
                defaultValue={issue.status}
                render={({ field }) => (
                  <Select.Root onValueChange={field.onChange} {...field}>
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
              />
            )}
          </Flex>
        </Grid>
      </form>
    </div>
  );
};

export default IssueForm;
