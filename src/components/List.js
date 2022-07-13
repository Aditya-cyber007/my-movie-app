import React, { useEffect, useState } from "react";
import "./List.css";
// import axios from "../searchById";
import axios from "axios";

const baseURL = "https://image.tmdb.org/t/p/original/";

const List = ({ movie, date }) => {
  const [movieDetails, setMoviesDetails] = useState({});
  const imdbId = movie.imdbID;
  useEffect(() => {
    async function fetchData() {
      const res = axios
        .get(`https://www.omdbapi.com/?apikey=28fd471d&i=${imdbId}`)
        .then((res) => setMoviesDetails(res.data));
    }
    fetchData();
  }, [imdbId]);
  return (
      <div className="container"> 
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
      <div className="container-xy" key={imdbId}>
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
        </div>
      </div>
    </div>
</div>
  );
};

export default List;