import React, { useEffect, useState } from 'react';
import axios from '../../libs/axios';
import styles from './Row.module.css';

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

type Movie = {
  id: string;
  name: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
};

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const base_url = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };

    fetchData();
  }, [fetchUrl]);

  return (
    <div className={styles.row}>
      <h2>{title}</h2>
      <div className={styles.row_posters}>
        {movies.map((movie, i) => (
          <img
            key={movie.id}
            className={styles.poster + ` ${isLargeRow && styles.poster_large}`}
            alt={movie.name}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
          />
        ))}
      </div>
    </div>
  );
};
