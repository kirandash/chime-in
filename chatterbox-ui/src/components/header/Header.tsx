import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Branding from "./Branding";
import MobileNavigation from "./mobile/MobileNavigation";
import MobileBranding from "./mobile/MobileBranding";
import Nav from "./Nav";
import Settings from "./Settings";

const pages: string[] = [];

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MobileNavigation pages={pages} />
          <Branding />
          <Nav pages={pages} />
          <MobileBranding />
          <Settings />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
