import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MuiLink } from "@mui/material";

const SignIn = () => {
  return (
    <Auth submitButtonLabel="Sign In" onSubmit={async () => {}}>
      <Link to="/sign-up" style={{ alignSelf: "center" }}>
        <MuiLink>Don't have an account? Sign up</MuiLink>
      </Link>
    </Auth>
  );
};

export default SignIn;
