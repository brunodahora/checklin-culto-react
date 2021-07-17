import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Cultos from "./pages/cultos/Cultos";
import CultoCheckIn from "./pages/cultoCheckIn/CultoCheckIn";

const queryClient = new QueryClient();

function App(): React.ReactElement {
  return (
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
  );
}

export default App;
