import React, { useEffect, useState } from "react";
import {
  getMovieWatchList,
  auth,
  deleteMovieWatchlist,
} from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import List from "./List";
import "./MyList.css";
import { useNavigate } from "react-router-dom";
import NoResult from "../ui/NoResult";

const MyList = () => {
  const [movies, setMovies] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading, navigate]);

  useEffect(() => {
    async function fetchData() {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          getMovieWatchList(user.uid).then((snapshot) => {
            if (snapshot.length > 0) {
              setMovies(snapshot);
              setIsLoading(false);
            }
          });
        } else {
          navigate("/");
        }
      });
    }
    fetchData();
  }, [navigate]);
  // console.log(movies);
  return isLoading || movies.length === 0 ? (
    <NoResult class="no-results-myList" />
  ) : (
    movies.map((movie) => {
      return (
        <List
          key={movie.imdbID}
          movie={movie}
          buttonTitle="Remove"
          onClick={() => {
            deleteMovieWatchlist(movie);
            setMovies(movies.filter((m) => m.imdbID !== movie.imdbID));
          }}
        />
      );
    })
  );
};

export default MyList;