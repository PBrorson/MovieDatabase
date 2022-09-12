import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import Movie from "./Movie";
import leo from '../src/leo.gif'

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=25f29436";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  const searchMovies = async (title) => {
    const result = await fetch(`${API_URL}&s=${title}`);
    const data = await result.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Avengers");
  }, []);

  return (
    <div className="app">
      <h1>Patriks MovieDB</h1>

      <div className="search">
        <input
          placeholder="Sök på film"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => {
            return <Movie movie={movie} />;
          })}
        </div>
      ) : (
        <div className="empty">
          <h1>Nope,not today!</h1>
          <img src={leo}alt="loading"/>
        </div>
      )}
    </div>
  );
};

export default App;
