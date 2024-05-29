import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Auth from "./components/auth/Auth";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      {/* CSS Baseline for some default styling */}
      <CssBaseline />
      <Container>
        <Auth />
      </Container>
    </ThemeProvider>
  );
}

export default App;
