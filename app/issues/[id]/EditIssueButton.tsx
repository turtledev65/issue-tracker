import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { PiNotePencilDuotone } from "react-icons/pi";

const EditIssueButton = ({ issueId }: { issueId: string }) => {
  return (
    <Button>
      <PiNotePencilDuotone />
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
