import { Issue, Status } from "@prisma/client";
import { Table, TableRow } from "@radix-ui/themes";
import Link from "next/link";
import { FaLongArrowAltUp } from "react-icons/fa";
import IssueStatusBadge from "../components/IssueStatusBadge";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map(column => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <Link
                href={{
                  query: { ...searchParams, orderBy: column.value }
                }}
              >
                {column.label}
              </Link>
              {column.value === searchParams.orderBy && (
                <FaLongArrowAltUp className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map(issue => (
          <TableRow key={issue.id}>
            <Table.RowHeaderCell>
              <Link href={`issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.RowHeaderCell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </TableRow>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" }
];
export const columnNames = columns.map(column => column.value);

export default IssueTable;
