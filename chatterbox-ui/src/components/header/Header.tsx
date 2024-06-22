import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Branding from "./Branding";
import MobileNavigation from "./mobile/MobileNavigation";
import MobileBranding from "./mobile/MobileBranding";
import Nav from "./Nav";
import Settings from "./Settings";
import { useReactiveVar } from "@apollo/client";
import { isAuthenticatedVar } from "../../constants/authenticated";

const pages = [
  {
    title: "Home",
    path: "/",
  },
];

const unauthenticatedPages = [
  {
    title: "Sign In",
    path: "/sign-in",
  },
  {
    title: "Sign Up",
    path: "/sign-up",
  },
];

const Header = () => {
  const isAuthenticated = useReactiveVar(isAuthenticatedVar);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MobileNavigation
            pages={isAuthenticated ? pages : unauthenticatedPages}
          />
          <Branding />
          <Nav pages={isAuthenticated ? pages : unauthenticatedPages} />
          <MobileBranding />
          {isAuthenticated && <Settings />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
