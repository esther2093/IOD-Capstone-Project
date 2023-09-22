import { createTheme } from "@mui/material/styles";

export const mainTheme = createTheme({
  palette: {
    primary: { main: "#000000 ", contrastText: "#ffffff" },
    secondary: { main: "#ffffff", contrastText: "#000000 " },
  },
  typography: {
    fontFamily: "Open Sans",
    fontSize: 14,
    h1: { fontSize: 30 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `a { color: #ffffff; }`
    },
    MuiTextField: { defaultProps: { variant: "filled" } },
  },
});

