import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSumarry";
import LatestIssues from "./LatestIssues";

export default async function Home() {
  const openIssues = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgressIssues = await prisma.issue.count({
    where: { status: "IN_PROGRESS" }
  });
  const closedIssues = await prisma.issue.count({
    where: { status: "CLOSED" }
  });

  const data = {
    open: openIssues,
    inProgress: inProgressIssues,
    closed: closedIssues
  };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="3">
        <IssueSummary {...data} />
        <IssueChart {...data} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
