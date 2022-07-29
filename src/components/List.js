import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { addMovieWatchlist, deleteMovieWatchlist } from "../auth/firebase";
import Button from "../ui/Button";

const List = ({ movie, buttonTitle, onClick }) => {
  const [movieDetails, setMoviesDetails] = useState({});
  const imdbId = movie.imdbID;
  // console.log(imdbId);
  useEffect(() => {
    async function fetchData() {
      axios
        .get(`https://www.omdbapi.com/?apikey=28fd471d&i=${imdbId}`)
        .then((res) => setMoviesDetails(res.data));
    }
    fetchData();
  }, [imdbId]);
  // console.log(movieDetails);
    // addMovieWatchlist(movieDetails);
  return (
    <div className="card">
      <div className="list">
        <img
          className="list_img"
          src={movieDetails.Poster}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://ih1.redbubble.net/image.512138487.5983/fposter,small,wall_texture,product,750x1000.u3.jpg";
          }}
          alt={movieDetails.Title}
        />
      </div>
      <div className="container" key={imdbId}>
        <div className="info_list">
          <h2>{movie.Title}</h2>
          <p>
            Overall Ratings: {movieDetails.imdbRating}/10 (
            {movieDetails.imdbVotes})
          </p>
          <p>Language: {movieDetails.Language}</p>
          <p>Rated: {movieDetails.Rated}</p>

          <p>Release data: {movieDetails.Released}</p>
          <p>Runtime: {movieDetails.Runtime}</p>
          <p>Genre: {movieDetails.Genre}</p>
          <p>Director: {movieDetails.Director}</p>
          <p>Actors: {movieDetails.Actors}</p>
          <p>Plot: {movieDetails.Plot}</p>
          <Button
            onClick={onClick}
            className="add-button"
          >
            {buttonTitle}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default List;