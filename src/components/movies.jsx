import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 3,
    selectedGenre: {},
    sortColumn: {}
  };

  componentDidMount() {
    const defaultGenre = { _id: null, name: "All Genres" };

    this.setState({
      movies: getMovies(),
      genres: [defaultGenre, ...getGenres()],
      selectedGenre: defaultGenre
    });
  }

  getPagedData = () => {
    let filtered =
      this.state.selectedGenre && this.state.selectedGenre._id
        ? this.state.movies.filter(
            m => m.genre._id === this.state.selectedGenre._id
          )
        : this.state.movies;

    let sorted = this.state.sortColumn
      ? _.orderBy(
          filtered,
          [this.state.sortColumn.path],
          [this.state.sortColumn.order]
        )
      : filtered;

    return sorted;
  };

  render() {
    let data = this.getPagedData();

    let message = `Showing ${data.length} ${
      data.length > 1 ? "movies" : "movie"
    } id the database.`;
    if (data.length === 0) message = "No movies in the database.";

    const movies = paginate(data, this.state.currentPage, this.state.pageSize);

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3">
            <ListGroup
              items={this.state.genres}
              valueProp="_id"
              textProp="name"
              selectedItem={this.state.selectedGenre}
              onClick={this.handleGenreChange}
            />
          </div>
          <div className="col">
            <p>{message}</p>
            <MoviesTable
              movies={movies}
              sortColumn={this.state.sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={data.length}
              currentPage={this.state.currentPage}
              pageSize={this.state.pageSize}
              onClick={this.handlePageClick}
            />
          </div>
        </div>
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

  handleDelete = movieId => {
    const movies = this.state.movies.filter(movie => movie._id !== movieId);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].like = !movies[index].like;

    this.setState({ movies });
  };

  handlePageClick = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  handleGenreChange = genreId => {
    let selectedGenre = this.state.genres.find(g => g._id === genreId);
    this.setState({ selectedGenre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
}
