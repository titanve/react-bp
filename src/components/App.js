import React, { Component } from "react";
import { Route, Switch, Redirect, HashRouter } from "react-router-dom";
import asyncComponent from "../common/asyncComponent/asyncComponent";
import fetch from "isomorphic-fetch";

const List = asyncComponent(
  () => import("./src/components/List").then(module => module.default),
  { name: "List" }
);

const Form = asyncComponent(
  () => import("./src/components/Form").then(module => module.default),
  { name: "Form" }
);

class App extends Component {
  state = {
    calmodel: { fecini: "", showpresentdate: "", fecfin: "", codven: "" },
    isFetching: false,
    posts: []
  };

  async fetchPosts() {
    let { fecini, fecfin } = this.state.calmodel;
    const url = `/index.php/visitas/reqvisitas/${fecini}/${fecfin}`;
    // const url = `/index.php/visitas/reqvisitas/01-01-2007/31-12-2020`;
    const response = await fetch(url, {
      credentials: "same-origin"
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  loadPosts = () => {
    this.setState({ isFetching: true });
    this.fetchPosts()
      .then(posts => {
        this.receivePosts(posts);
      })
      .catch(err => {
        console.error(`Error(fetchPosts()): ${err.message}`);
        this.setState({ isFetching: false });
      });
  };

  receivePosts = json => {
    let posts = json;
    // console.table(posts);
    this.setState({ posts: posts, isFetching: false });
  };

  handleCalModelUpdate = calmodel => {
    // console.log(`calmodel VisitasApp: ${JSON.stringify(calmodel)}`);
    this.setState({ calmodel: calmodel });
  };

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <List
                locale={this.props.locale}
                posts={this.state.posts}
                isFetching={this.state.isFetching}
                calmodel={this.state.calmodel}
                onLoadPosts={this.loadPosts}
                onCalModelUpdate={this.handleCalModelUpdate}
              />
            )}
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
