import Skeleton from "@/app/components/Skeleton";
import { Box, Button, Flex, Grid } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
  return (
    <Box>
      <Grid columns={{ initial: "1", md: "5" }} gap="5">
        <Box className="lg:col-span-4">
          <Skeleton height="2rem" />
          <Skeleton height="20rem" className="mt-3" />
        </Box>
        <Flex direction="column" gap="2" width="100%">
          <Button>...</Button>
          <Skeleton height="2rem" />
        </Flex>
      </Grid>
    </Box>
  );
};

export default IssueFormSkeleton;
