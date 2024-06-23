import Typography from "@mui/material/Typography";
import ChatIcon from "@mui/icons-material/Chat";
import router from "../../auth/Routes";

const MobileBranding = () => {
  return (
    <>
      <ChatIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        onClick={() => router.navigate("/")}
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
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

export default MobileBranding;
