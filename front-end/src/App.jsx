import "./App.css";
import HomeNavBar from "./components/HomeNavBar";
import { UserProvider } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "@mui/material/styles";
import { mainTheme } from "./themes/mainTheme";

function App() {

  return (
    <>
      <UserProvider>
        <ThemeProvider theme={mainTheme}>
          <HomeNavBar />
          <AppRoutes />
        </ThemeProvider>
      </UserProvider>
    </>
  );
}

export default App;
