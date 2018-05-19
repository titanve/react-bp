import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

class App extends Component {
  render() {
    return (
      <div>
        <h1>
          <FormattedMessage id="detail.titulo" />
        </h1>
      </div>
    );
  }
}

export default App;
