import { Box, Button } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NewIssueLoadingPage = () => {
  return (
    <Box className="max-w-xl ">
      <Skeleton />
      <Skeleton height="20rem" />
      <Button>Submit new issue</Button>
    </Box>
  );
};

export default NewIssueLoadingPage;
