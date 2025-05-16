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
        size="large"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#928dab", // applies to text and arrows
          },
          // Optional: add different color on selected page
          "& .Mui-selected": {
            backgroundColor: "#928dab",
            color: "#1f1c2c",
          },
        }}
      />
    </Stack>
  );
}
