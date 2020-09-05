import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Registration, Login, Success } from "pages";
import Layout from "components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" component={Registration} exact />
          <Route path="/login" component={Login} />
          <Route path="/success" component={Success} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
