import React, { useEffect, useState } from "react";
import axios from "../axios";
import List from "./List";
import { logout, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";


const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();


  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    // fetchUserName();
  }, [user, loading]);

  useEffect(() => {
    async function fetchData() {

		console.log(searchTerm.length + "======");
      const res = await axios.get(searchTerm);
      const data = res.data.results;
      //   console.log(data);
      setMovies(prevData => [...data]);
    }
    if (searchTerm !== "") {
      fetchData();
    }
  }, [searchTerm]);

  function onSearch(e) {
    e.preventDefault();
    const search = e.target.value;
    console.log(search);
    if (search.length === 0 || searchTerm.length === 0) {
      setMovies([]);
	  setSearchTerm("");
    }
    if (!search) {
		setMovies([]);
		setSearchTerm("");
      return;
    }

    setSearchTerm(search);
  }
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Movies-Everytime</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" to="/">Home</a>
                    </li>
                    <li className="nav-item"><a className="nav-link" href="/Action">Action</a></li>
                    <li className="nav-item"><a className="nav-link" href="/Horror">Horror</a></li>
                    <li className="nav-item"><a className="nav-link" href="/Comedy">Comedy</a></li>
                    <li className="nav-item"><a className="nav-link" href="/Adventure">Adventure</a></li>
                    <li className="nav-item"><a className="nav-link" href="/Romance">Romance</a></li>
                    <li className="nav-item"><a className="nav-link" href="/si-fi">Science-fiction</a></li>
                    <li className="nav-item"><a className="nav-link" href="/Adult">Adult</a></li>

                </ul>
                <form class="d-flex" role="search" onSubmit={(e)=>{
                  onSearch(e)
                }}>
                    <input onChange={onSearch} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button class='btn btn-outline-warning mx-2' onClick={logout}>Logout</button>
                </form>
            </div>
        </div>
    </nav>
    
                <List movies={movies} />
</div>
  );
};

export default Home;
