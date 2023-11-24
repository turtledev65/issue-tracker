import { Button } from "@radix-ui/themes";
import { FaRegTrashAlt } from "react-icons/fa";

const DeleteIssueButton = ({ issueId }: { issueId: string }) => {
  return (
    <Button color="red">
      <FaRegTrashAlt />
      Delete Issue
    </Button>
  );
};

export default DeleteIssueButton;
