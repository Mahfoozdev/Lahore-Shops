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
        renderInput={(params) => (
          <TextField {...params} label="Search Product" />
        )}
      />
    </Stack>
  );
}
