import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MuiLink } from "@mui/material";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useState } from "react";
import { extractErrorMsg } from "../../utils/errors";

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [error, setError] = useState<string>("");

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
                password,
              },
            },
          });
          setError("");
        } catch (err) {
          const errMsg = extractErrorMsg(err);
          if (errMsg) {
            setError(errMsg);
            return;
          }
          // unknown error handling globally
          setError("Something went wrong");
        }
      }}
    >
      <Link to="/sign-in" style={{ alignSelf: "center" }}>
        <MuiLink>Already have an account? Sign in</MuiLink>
      </Link>
    </Auth>
  );
};

export default SignUp;
