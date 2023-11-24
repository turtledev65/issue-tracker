import Skeleton from "@/app/components/Skeleton";
import { Box, Button } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl ">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
      <Button>Submit new issue</Button>
    </Box>
  );
};

export default IssueFormSkeleton;
