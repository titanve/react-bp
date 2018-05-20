import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import NewDatesParamsFilter from "../common/NewDatesParamsFilter/NewDatesParamsFilter";

class List extends Component {
  state = {
    itemsperpage: 10,
    nocolumns: 1
  };

  componentDidMount() {
    this.props.onLoadPosts();
  }

  handleCalModelUpdate = calmodel => {
    this.props.onCalModelUpdate(calmodel);
  };

  searchDates = () => {
    // this.loadPosts();
    this.props.onLoadPosts();
    // this.props.handleReStartTimer();
  };

  resetCal = () => {
    // this.loadPosts();
    this.props.onLoadPosts();
  };

  handleUpdateItemsperPage = itemsperpage => {
    this.setState({ itemsperpage });
  };

  render() {
    return (
      <div>
        <h1>
          <FormattedMessage id="detail.titulo" />
        </h1>
        <NewDatesParamsFilter
          parent={"List"}
          calmodel={this.props.calmodel}
          itemsperpage={this.state.itemsperpage}
          onCalModelUpdate={this.handleCalModelUpdate}
          onSearchDates={this.searchDates}
          onResetCal={this.resetCal}
          onUpdateItemsperPage={this.handleUpdateItemsperPage}
        />
      </div>
    );
  }
}

export default List;
