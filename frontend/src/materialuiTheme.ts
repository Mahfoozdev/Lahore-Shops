// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#1f1c2c",
      contrastText: "#c9c8b9",
    },
    primary: {
      main: "#0b101b",
      contrastText: "#c9c8b9",
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
