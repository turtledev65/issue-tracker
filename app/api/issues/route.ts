import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const issueSchema = z.object({
  title: z.string().max(250),
  description: z.string().min(1)
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 404 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description
    }
  });

  return NextResponse.json(newIssue, { status: 201 });
}
