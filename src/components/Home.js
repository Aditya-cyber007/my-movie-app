import React, { useEffect, useState } from "react";
import axios from "../axios";
import List from "./List";
import {  auth, addMovieWatchlist } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import NoResult from "../ui/NoResult";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, loading] = useAuthState(auth);
  const [timeoutId, updateTimeoutId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading, navigate]);

  useEffect(() => {
    async function fetchData() {
      // console.log(searchTerm.length + "======");
      const res = await axios.get(searchTerm);
      const data = res.data.Search;

      if (typeof data !== "undefined") {
        setMovies(data);
      }
    }
    if (searchTerm !== "") {
      fetchData();
    }
  }, [searchTerm]);

  function onSearch(e) {
    e.preventDefault();
    const search = e.target.value;
    if (search.length === 0 || searchTerm.length === 0) {
      setMovies([]);
      setSearchTerm("");
    }
    if (!search) {
      setMovies([]);
      setSearchTerm("");
      return;
    }
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => setSearchTerm(search), 500);
    updateTimeoutId(timeout);
  }

  const onMyListClick = (e) => {
    e.preventDefault();
    navigate("/mylist");
  };
  return (
      <div className="container my-3">
                 <h1 className="text-center text-white" >Search your movie here!</h1>
                 <div className="container">

                 <form className="d-flex my-3 w-25 mx-auto" role="search" onSubmit={(e)=>{
                   onSearch(e)
                  }}>
                     <input onChange={onSearch} className="form-control me-2 "  type="search" placeholder="Search" aria-label="Search" />
                 </form>
                   </div>
                   {movies.length === 0 ? (
        <NoResult class="no-results" />
      ) : (
        <div>
          {movies.map((movie) => {
            return (
              <List
                key={movie.imdbID}
                movie={movie}
                buttonTitle="Add to List"
				onClick={() => addMovieWatchlist(movie)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
