import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MuiLink, TextField } from "@mui/material";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useState } from "react";
import { extractErrorMsg } from "../../utils/errors";
import { useLogin } from "../../hooks/useLogin";
import { UNKNOWN_ERROR_MESSAGE } from "../../constants/errors";

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [error, setError] = useState<string>("");
  const { login } = useLogin();
  const [username, setUsername] = useState("");

  return (
    <Auth
      error={error}
      submitButtonLabel="Sign Up"
      onSubmit={async ({ email, password }) => {
        try {
          await createUser({
            variables: {
              createUserInput: {
                email,
                username,
                password,
              },
            },
          });
          await login({ email, password });
          setError("");
        } catch (err) {
          const errMsg = extractErrorMsg(err);
          if (errMsg) {
            setError(errMsg);
            return;
          }
          // unknown error handling globally
          setError(UNKNOWN_ERROR_MESSAGE);
        }
      }}
      additionalFields={[
        <TextField
          type="text"
          key="username"
          label="Username"
          variant="filled"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          error={!!error}
          helperText={error}
        />,
      ]}
    >
      <div style={{ alignSelf: "center" }}>
        <MuiLink component={Link} to="/sign-in">
          Already have an account? Sign in
        </MuiLink>
      </div>
    </Auth>
  );
};

export default SignUp;
