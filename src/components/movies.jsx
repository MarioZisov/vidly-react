import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./like";
import Pagination from "./pagination";

export default class Movies extends Component {
  state = {
    movies: getMovies(),
    pagesCount: 1,
    currentPage: 1,
    moviesPerPage: 3
  };

  render() {
    const { length: count } = this.state.movies;
    this.state.pagesCount = Math.ceil(count / this.state.moviesPerPage);

    if (count === 0) return <p>No movies in the database.</p>;

    return (
      <React.Fragment>
        <p>
          Showing {count} {count > 1 ? "movies" : "movie"} in the database.
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>
                <b>Title</b>
              </th>
              <th>
                <b>Genre</b>
              </th>
              <th>
                <b>Stock</b>
              </th>
              <th>
                <b>Rate</b>
              </th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.movies
              .slice(
                this.state.currentPage * this.state.moviesPerPage -
                  this.state.moviesPerPage,
                this.state.currentPage * this.state.moviesPerPage
              )
              .map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.like}
                      onClick={() => this.handleClick(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.deleteMovieFromDb(movie._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination
          pagesCount={this.state.pagesCount}
          currentPage={this.state.currentPage}
          pageClicked={this.handlePageClick}
        />
      </React.Fragment>
    );
  }

  getMoviesText = () => {
    if (this.state.movies.length === 0) {
      return "No movies.";
    }

    let txt =
      "Showing " +
      this.state.movies.length +
      (this.state.movies.length > 1 ? " movies" : " movie") +
      " in the database.";

    return txt;
  };

  deleteMovieFromDb = movieId => {
    const movies = this.state.movies.filter(movie => movie._id !== movieId);
    this.setState({ movies });
  };

  handleClick = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = this.state.movies[index];
    movies[index].like = !movies[index].like;

    this.setState({ movies });
  };

  handlePageClick = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  // getPagesCount = () => {
  //   const pagesCount = this.state.movies.length / 3;
  // };
}
