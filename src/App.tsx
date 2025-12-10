import { Navigate, Route, Routes, useNavigate } from "react-router";
import { useCallback, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.scss";

import { getCurrentUser } from "@/api/user/user_api.ts";
import { useUserActions } from "@/stores/userStore";
import { LoginPage } from "@/pages/LoginPage";
import { GamePage } from "@/pages/GamePage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const { setUser } = useUserActions();
  const navigate = useNavigate();

  const getUserData = useCallback(async () => {
    try {
      const res = await getCurrentUser();

      setUser(res);
    } catch (e) {
      if (e instanceof Object && "message" in e) {
        // TODO: Справочник ошибок
        if (
          e.message === "Empty token" ||
          e.message ===
            "Authorization token is invalid: The token signature is invalid."
        )
          navigate("/login");
      } else {
        console.error(e);
      }
    }
  }, [setUser, navigate]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/rounds/*" index element={<GamePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to={"/rounds/"} />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
