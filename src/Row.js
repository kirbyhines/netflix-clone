/** @format */
import './Row.css';
import React, { useEffect, useState } from 'react';
import axios from './axios';

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const base_url = 'https://image.tmdb.org/t/p/original/';

  useEffect(() => {
    async function fetchData() {
      const request = axios.get(fetchUrl);
      setMovies((await request).data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__container">
        <div className="row__posters">
          {movies.map((movie) => (
            <div className="row__poster--container">
              <img
                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                key={movie.id}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
              <p className="row__poster--movie">
                {movie?.title || movie?.name || movie?.original_name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="row--fadeRight"></div>
    </div>
  );
}

export default Row;
