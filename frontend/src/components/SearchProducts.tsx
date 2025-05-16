import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { Product } from "../types/types";

interface SearchProp {
  allProducts: Product[];
  search: string;
  mySearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchProducts({
  allProducts,
  search,
  mySearch,
}: SearchProp) {
  return (
    <Stack spacing={2} sx={{ width: "100%", borderRadius: "0" }}>
      <Autocomplete
        id="search-autocomplete"
        freeSolo
        options={(allProducts ?? []).map((option: Product) => option.name)}
        inputValue={search}
        onInputChange={(_, newInputValue) => {
          mySearch(newInputValue);
        }}
        sx={{
          "& .MuiInputBase-input": {
            color: "#928dab",
          },
          "& .MuiInputBase-placeholder": {
            color: "#928dab",
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Product"
            sx={{
              // Change the label color
              "& .MuiInputLabel-root": {
                color: "#928dab",
              },
              // Change label color on focus
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#7a6ba8",
              },
            }}
          />
        )}
      />
    </Stack>
  );
}
