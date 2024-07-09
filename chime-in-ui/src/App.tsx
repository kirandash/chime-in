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

const lightTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const { path } = usePath();
  const showChatList = path === "/" || path.includes("/chats");

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={lightTheme}>
        {/* CSS Baseline for some default styling */}
        <CssBaseline />
        <Header />
        <Container>
          <Guard>
            {showChatList ? (
              <Grid container>
                <Grid item xs={12} md={5} lg={4}>
                  <ChatList />
                </Grid>
                <Grid item xs={12} md={7} lg={8}>
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
