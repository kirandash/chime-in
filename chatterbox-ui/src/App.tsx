import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";

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
        <h1>Chatter Box!</h1>
      </Container>
    </ThemeProvider>
  );
}

export default App;
