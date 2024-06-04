import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MuiLink } from "@mui/material";
import { useLogin } from "../../hooks/useLogin";

const SignIn = () => {
  const { login, error } = useLogin();
  return (
    <Auth
      submitButtonLabel="Sign In"
      onSubmit={(request) => login(request)}
      error={error}
    >
      <Link to="/sign-up" style={{ alignSelf: "center" }}>
        <MuiLink>Don't have an account? Sign up</MuiLink>
      </Link>
    </Auth>
  );
};

export default SignIn;
