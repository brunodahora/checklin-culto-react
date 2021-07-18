import React from "react";
import { Container, createTheme, ThemeProvider, responsiveFontSizes } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Cultos from "./pages/cultos/Cultos";
import CultoCheckIn from "./pages/cultoCheckIn/CultoCheckIn";

const queryClient = new QueryClient();

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
});

const StyledContainer = styled(Container)`
  height: 100%;
`;

function App(): React.ReactElement {
  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <main>
        <StyledContainer disableGutters>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Router>
              <Switch>
                <Route path="/cultos/:id">
                  <CultoCheckIn />
                </Route>
                <Route path="/">
                  <Cultos />
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
