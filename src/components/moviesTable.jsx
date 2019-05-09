import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Like from "./like";

class MoviesTable extends Component {
  columns = [
    { index: 0, path: "title", label: "Title" },
    { index: 1, path: "genre.name", label: "Genre" },
    { index: 2, path: "numberInStock", label: "Stock" },
    { index: 3, path: "dailyRentalRate", label: "Rate" },
    {
      index: 4,
      content: movie => (
        <Like liked={movie.like} onClick={() => this.props.onLike(movie)} />
      )
    },
    {
      index: 5,
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { movies } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={this.props.sortColumn}
          onSort={this.props.onSort}
        />
        <TableBody data={movies} columns={this.columns} />
      </table>
    );
  }
}

export default MoviesTable;
