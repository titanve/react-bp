import React, { Component } from "react";
import { Route, Switch, Redirect, HashRouter } from "react-router-dom";
import asyncComponent from "../common/asyncComponent/asyncComponent";

const List = asyncComponent(
  () => import("./src/components/List").then(module => module.default),
  { name: "List" }
);

const Form = asyncComponent(
  () => import("./src/components/Form").then(module => module.default),
  { name: "Form" }
);

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <List locale={this.props.locale} />}
          />
          <Route
            path="/add/:id"
            render={({ match }) => <Form id={match.params.id} />}
          />
          <Route path="/add" render={() => <Form />} />
          <Redirect path="*" to="/" />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
