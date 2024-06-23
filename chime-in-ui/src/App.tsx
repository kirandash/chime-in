import {
  Container,
  CssBaseline,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./components/auth/Routes";
import { ApolloProvider } from "@apollo/client";
import client from "./constants/apollo-client";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import Snackbar from "./components/snackbar/Snackbar";
import ChatList from "./components/chat-list/ChatList";
import { usePath } from "./hooks/usePath";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const { path } = usePath();
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        {/* CSS Baseline for some default styling */}
        <CssBaseline />
        <Header />
        <Container>
          <Guard>
            {path === "/" ? (
              <Grid container>
                <Grid item md={3}>
                  <ChatList />
                </Grid>
                <Grid item md={9}>
                  <RouterProvider router={router} />
                </Grid>
              </Grid>
            ) : (
              <RouterProvider router={router} />
            )}
          </Guard>
        </Container>
        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
