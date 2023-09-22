import "./App.css";
import HomeNavBar from "./components/HomeNavBar";
import { UserProvider } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "@mui/material/styles";
import { pastelTheme } from "./themes/pastelTheme";

function App() {

  return (
    <>
      <UserProvider>
        <ThemeProvider theme={pastelTheme}>
          <HomeNavBar />
          <AppRoutes />
        </ThemeProvider>
      </UserProvider>
    </>
  );
}

export default App;
