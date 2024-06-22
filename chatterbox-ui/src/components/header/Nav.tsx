import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Page } from "../../types/page.types";
import router from "../auth/Routes";

type NavigationProps = {
  pages: Page[];
};

const Nav = ({ pages }: NavigationProps) => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) => (
        <Button
          key={page.title}
          onClick={() => router.navigate(page.path)}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          {page.title}
        </Button>
      ))}
    </Box>
  );
};

export default Nav;
