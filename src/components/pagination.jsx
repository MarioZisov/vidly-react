import React, { Component } from "react";
import _ from 'lodash'
import PropTypes from "prop-types";

class Pagination extends Component {
  state = {};
  render() {
    
    const pagesCount = Math.ceil(this.props.itemsCount / this.props.pageSize)

    if (pagesCount === 1) {
      return null;
    }
    const pages = _.range(1, pagesCount + 1)
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">{pages.map(page => 
           <li key={page} className={this.props.currentPage === page ? "page-item active" : "page-item"}>
           <span
             style={{ cursor: "pointer" }}
             onClick={() => this.props.onClick(page)}
             className="page-link"
           >
             {page}
           </span>
         </li>
        )}</ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Pagination;
