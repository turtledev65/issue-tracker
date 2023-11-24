import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

interface Props {
  params: {
    id: string;
  };
}

const EditIssuesPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({ where: { id: params.id } });
  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuesPage;
