// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#1f1c2c",
      contrastText: "#928dab",
    },
    primary: {
      main: "#928dab",
      contrastText: "#1f1c2c",
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    primary: Palette["primary"];
  }
  interface PaletteOptions {
    primary?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    primary: true;
  }
}

export default theme;
