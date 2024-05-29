import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      />

      <TextField
        label="Password"
        type="password"
        variant="filled"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Button variant="contained">Sign In</Button>
    </Stack>
  );
};

export default Auth;
