import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({ where: { id: params.id } });
  if (!issue) notFound();

  return (
    <div>
      {issue.title}
      {issue.description}
      {issue.status}
      {issue.createdAt.toDateString()}
    </div>
  );
};

export default IssueDetailsPage;
