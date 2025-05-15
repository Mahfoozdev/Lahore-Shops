import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface Prop {
  totalPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PaginationControlled({
  totalPage,
  page,
  setPage,
}: Prop) {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        count={totalPage}
        page={page}
        color="primary"
        onChange={handleChange}
        size="large" // makes the whole pagination component larger
      />
    </Stack>
  );
}
