import { type FC, type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import "./styles.scss";

import { authUser } from "@/api/user/user_api.ts";

export const LoginPage: FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await authUser({ username, password });

      navigate("/");
    } catch (e) {
      if (e instanceof Object && "message" in e) {
        if (e.message === "Invalid credentials") setError("Неверный пароль");
      } else {
        console.error(e);
      }
    }
  };

  return (
    <Box className={"login-page__main-container"}>
      <Paper elevation={1}>
        <Box
          className={"login-page__form-container"}
          gap={2}
          component={"form"}
          onSubmit={handleSubmit}
        >
          <Typography mb={3} variant={"h4"}>
            The Last of Guss
          </Typography>
          <TextField
            variant={"outlined"}
            label={"Логин"}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label={"Пароль"}
            required
            value={password}
            error={!!error}
            helperText={error ?? ""}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={() => setShowPassword((value) => !value)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            className={"login-page__submit-button"}
            type={"submit"}
            variant={"contained"}
          >
            Войти
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
