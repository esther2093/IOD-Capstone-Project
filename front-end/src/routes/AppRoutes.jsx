import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import RidesPage from "../pages/RidesPage";
import DrivePage from "../pages/DrivePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";


function AppRoutes(props) {
  return (
    <Routes>
      <Route index element={<Homepage {...props} />} />
      <Route path="/login" element={<LoginPage {...props} />} />
      <Route path="/signup" element={<SignUpPage {...props} />} />

      <Route path="/rides" element={<RidesPage {...props} />} />
      <Route path="/drive" element={<DrivePage {...props} />} />
      <Route path="/forgot" element={<ForgotPasswordPage {...props} />} />
    </Routes>
  );
}

export default AppRoutes;
