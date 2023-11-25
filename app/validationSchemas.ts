import { Status } from "@prisma/client";
import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(250),
  description: z.string().min(1, "Description is required").max(65535),
  status: z.nativeEnum(Status).optional()
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(250).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  status: z.nativeEnum(Status).optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required")
    .max(255)
    .optional()
    .nullable()
});
