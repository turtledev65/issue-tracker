import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
  params: {
    id: string;
  };
}

const fetchUser = cache((issueId: string) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await fetchUser(params.id);
  if (!issue) notFound();

  const session = await getServerSession(authOptions);

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className="lg:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Flex direction="column" gap="3">
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={params.id} />
          <DeleteIssueButton issueId={params.id} />
        </Flex>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(params.id);

  return {
    title: issue?.title,
    description: "Details of issue: " + issue
  };
}

export default IssueDetailsPage;
