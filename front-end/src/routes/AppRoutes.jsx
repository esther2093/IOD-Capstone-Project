import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import TripsPage from "../pages/TripsPage";
import DrivePage from "../pages/DrivePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import MyAccountPage from "../pages/MyAccountPage";
import TripDetails from "../components/TripDetails";
import TripsList from "../components/TripsList";

function AppRoutes(props) {
  return (
    <Routes>
      <Route index element={<Homepage {...props} />} />
      <Route path="/login" element={<LoginPage {...props} />} />
      <Route path="/signup" element={<SignUpPage {...props} />} />
      <Route path="/forgot" element={<ForgotPasswordPage {...props} />} />

      <Route
        path="/trips"
        element={
          <ProtectedRoute>
            <TripsPage {...props} />
          </ProtectedRoute>
        }
      >
        <Route index element={<TripsList />} />
        <Route path=":id" element={<TripDetails />} />
      </Route>

      <Route
        path="/drive"
        element={
          <ProtectedRoute>
            <DrivePage {...props} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/myaccount"
        element={
          <ProtectedRoute>
            <MyAccountPage {...props} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
