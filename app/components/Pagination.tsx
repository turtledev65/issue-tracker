import { Button, Flex, Text } from "@radix-ui/themes";
import {
  MdChevronLeft,
  MdChevronRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight
} from "react-icons/md";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  return (
    <Flex align="center" gap="2">
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <MdKeyboardDoubleArrowLeft />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <MdChevronLeft />
      </Button>
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button color="gray" variant="soft" disabled={currentPage === pageCount}>
        <MdChevronRight />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === pageCount}>
        <MdKeyboardDoubleArrowRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
