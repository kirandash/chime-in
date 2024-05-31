import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MuiLink } from "@mui/material";
import { useCreateUser } from "../../hooks/useCreateUser";

const SignUp = () => {
  const [createUser] = useCreateUser();

  return (
    <Auth
      submitButtonLabel="Sign Up"
      onSubmit={async ({ email, password }) => {
        await createUser({
          variables: {
            createUserInput: {
              email,
              password,
            },
          },
        });
      }}
    >
      <Link to="/sign-in" style={{ alignSelf: "center" }}>
        <MuiLink>Already have an account? Sign in</MuiLink>
      </Link>
    </Auth>
  );
};

export default SignUp;
