import React, { Component } from "react";
import Page from "./page";

class Pagination extends Component {
  state = {};
  render() {
    const pagesList = [];
    for (let index = 1; index <= this.props.pagesCount; index++) {
      let selected = this.props.currentPage === index ? true : false;
      pagesList.push(
        <Page
          key={index}
          pageNumber={index}
          isSelected={selected}
          onClick={this.props.pageClicked}
        />
      );
    }

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">{pagesList}</ul>
      </nav>
    );
  }
}

export default Pagination;
