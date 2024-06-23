import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { useNavigate } from "react-router-dom";

type AuthProps = {
  submitButtonLabel: string;
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  children: React.ReactNode;
  error?: string;
};

const Auth = ({ submitButtonLabel, onSubmit, error, children }: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data } = useGetMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <Stack
      spacing={4}
      sx={{
        height: "100vh",
        maxWidth: {
          xs: "100%",
          sm: "50%",
        },
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <TextField
        label="Email"
        type="email"
        variant="filled"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        error={Boolean(error)}
        helperText={error}
      />

      <TextField
        label="Password"
        type="password"
        variant="filled"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        error={!!error}
        helperText={error}
      />
      <Button variant="contained" onClick={() => onSubmit({ email, password })}>
        {submitButtonLabel}
      </Button>
      {children}
    </Stack>
  );
};

export default Auth;
