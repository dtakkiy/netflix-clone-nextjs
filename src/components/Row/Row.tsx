import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
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

type Options = {
  height: string;
  width: string;
  playerVars: {
    autoplay: 0 | 1 | undefined;
  };
};

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>('');

  const base_url = 'https://image.tmdb.org/t/p/original';
  const iframe_height = '390';
  const iframe_width = '640';

  const opts: Options = {
    height: iframe_height,
    width: iframe_width,
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };

    fetchData();
  }, [fetchUrl]);

  const handleClick = async (movie: Movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      try {
        let res = await axios.get(
          `/tv/${movie.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        );
        if (res.data.results.length > 0) {
          setTrailerUrl(res.data.results[0]?.key);
        }
      } catch (e) {}
    }
  };

  return (
    <div className={styles.row}>
      <h2>{title}</h2>
      <div className={styles.posters}>
        {movies.map((movie, i) => (
          <img
            key={movie.id}
            className={styles.poster + ` ${isLargeRow && styles.poster_large}`}
            alt={movie.name}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};
