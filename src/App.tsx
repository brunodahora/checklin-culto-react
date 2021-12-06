import React from "react";
import { Container, createTheme, ThemeProvider, responsiveFontSizes } from "@material-ui/core";
import { blueGrey, deepOrange } from "@material-ui/core/colors";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Locais from "./pages/locais/Locais";
import Tipocheck from "./pages/locais/Tipocheck";
import Check from "./pages/locais/Check";
import PrivateRoute from "./pages/Utils/PrivateRoute";
import Login from "./pages/locais/Login";
import { getToken } from "./pages/Utils/Token";

const queryClient = new QueryClient();

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    primary: {
      main: deepOrange[900],
    },
    secondary: {
      main: blueGrey[700],
    },
  },
});

const StyledContainer = styled(Container)`
  height: 100%;
`;

function App(): React.ReactElement {
  const isAuthenticated = getToken() !== null;
  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <main>
        <StyledContainer disableGutters>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Router>
              <Switch>
                <PrivateRoute path="/locais" isAuthenticated={isAuthenticated}>
                  <Locais />
                </PrivateRoute>
                <PrivateRoute path="/check" isAuthenticated={isAuthenticated}>
                  <Check />
                </PrivateRoute>
                <PrivateRoute path="/tipocheck" isAuthenticated={isAuthenticated}>
                  <Tipocheck />
                </PrivateRoute>
                <Route path="/">
                  <Login />
                </Route>
              </Switch>
            </Router>
          </QueryClientProvider>
        </StyledContainer>
      </main>
    </ThemeProvider>
  );
}

export default App;
