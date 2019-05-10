import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    let sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    debugger;
    if (column.path === undefined || column.path !== this.props.sortColumn.path)
      return null;
    if (this.props.sortColumn.order === "asc")
      return <i className="fas fa-sort-amount-up" />;

    return <i className="fas fa-sort-amount-down" />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              className="clickable"
              key={column.index}
              onClick={() => this.raiseSort(column.path)}
            >
              <b>{column.label}</b> {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
