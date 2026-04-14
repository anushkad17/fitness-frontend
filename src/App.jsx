import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { setCredentials } from "./store/authSlice";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";

import bgImage from "./assets/victor-freitas-WvDYdXDzkhs-unsplash.jpg";

const ActivitiesPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",   
        overflowX: "hidden",
        overflowY: "hidden",           
        px: 2,                
        py: 3,
      }}
    >
      <ActivityList />
    </Box>
  );
};

function App() {
  const { token, tokenData, logIn, logOut } = useContext(AuthContext);

  const username =
    tokenData?.preferred_username ||
    tokenData?.email ||
    "User";

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
      localStorage.setItem("token", token);
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
        // 🔥 LANDING PAGE
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.6)",
            }}
          />

          <Box
            sx={{
              position: "relative",
              textAlign: "center",
              color: "#fff",
              px: 5,
              py: 6,
              borderRadius: 4,
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <Typography variant="h3" fontWeight="bold">
              💪 FitAI
            </Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Smart way to track your daily calories
            </Typography>

            <Typography sx={{ mt: 2, opacity: 0.8 }}>
              Track workouts, burn calories, and get AI-powered insights.
            </Typography>

            <Button
              sx={{
                mt: 4,
                px: 5,
                py: 1.5,
                borderRadius: 3,
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "#fff",
                boxShadow: "0 10px 25px rgba(239,68,68,0.4)",
                "&:hover": { transform: "scale(1.05)" },
              }}
              onClick={(e) => {
                e.preventDefault();
                logIn();
              }}
            >
              Get Started 
            </Button>
          </Box>
        </Box>
      ) : (
        //  DASHBOARD
        <Box
          sx={{
            minHeight: "100vh",
            width: "100%",
            overflowX: "hidden",
            background: "radial-gradient(circle at 20% 20%, #1e293b, #020617)",
            color: "#fff",
          }}
        >
          {/* NAVBAR */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 4,
              py: 2,
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Typography fontWeight="bold">
              💪 FitAI Dashboard
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography>👤 {username}</Typography>

              <Button
                onClick={logOut}
                sx={{
                  background: "#ef4444",
                  color: "#fff",
                  borderRadius: 2,
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>

          {/* ROUTES */}
          <Routes>
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
            <Route path="/" element={<Navigate to="/activities" replace />} />
          </Routes>
        </Box>
      )}
    </Router>
  );
}

export default App;