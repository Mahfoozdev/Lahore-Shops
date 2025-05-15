import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "primeicons/primeicons.css";
import { APIOptions, PrimeReactProvider } from "primereact/api"; // Only import it once

import App from "./App.tsx";
import { store, persistor } from "./redux/store.ts";

// PrimeReact styles
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./materialuiTheme.ts";
// Your global styles
import "./index.css";
import "./styles/app.scss";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

const primeReactConfig: Partial<APIOptions> = {
  ripple: true,
  inputStyle: "outlined",
  cssTransition: true,
  appendTo: document.body,
};

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PrimeReactProvider value={primeReactConfig}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </PrimeReactProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
