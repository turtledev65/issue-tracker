import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "Issues in progress", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" }
  ];

  return (
    <Flex gap="4">
      {containers.map(container => (
        <Card key={container.value}>
          <Flex direction="column">
            <Link
              href={`issues/list?status=${container.status}`}
              className="text-sm"
            >
              {container.label}
            </Link>
            <Text className="font-bold">{container.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
