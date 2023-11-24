import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: true,
  loading: () => <IssueFormSkeleton />
});

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
