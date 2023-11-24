import Skeleton from "@/app/components/Skeleton";
import { Box, Button } from "@radix-ui/themes";

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
