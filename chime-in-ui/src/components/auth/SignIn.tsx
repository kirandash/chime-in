import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MuiLink } from "@mui/material";
import { useLogin } from "../../hooks/useLogin";

const SignIn = () => {
  const { login, error } = useLogin();
  return (
    <Auth
      submitButtonLabel="Log In"
      onSubmit={(request) => login(request)}
      error={error}
    >
      <div style={{ alignSelf: "center" }}>
        <MuiLink component={Link} to="/sign-up">
          Don't have an account? Sign up
        </MuiLink>
      </div>
    </Auth>
  );
};

export default SignIn;
