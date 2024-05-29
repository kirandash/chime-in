import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MuiLink } from "@mui/material";

const SignUp = () => {
  return (
    <Auth submitButtonLabel="Sign Up" onSubmit={async () => {}}>
      <Link to="/sign-in" style={{ alignSelf: "center" }}>
        <MuiLink>Already have an account? Sign in</MuiLink>
      </Link>
    </Auth>
  );
};

export default SignUp;
