import Typography from "@mui/material/Typography";
import ChatIcon from "@mui/icons-material/Chat";
import router from "../auth/Routes";

const Branding = () => {
  return (
    <>
      <ChatIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        onClick={() => router.navigate("/")}
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        ChimeIn
      </Typography>
    </>
  );
};

export default Branding;
