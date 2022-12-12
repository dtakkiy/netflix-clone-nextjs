import { requests } from 'libs/request';
import { useEffect, useState } from 'react';
import axios from '../../libs/axios';
import styles from './Banner.module.css';

type movieProps = {
  title?: string;
  name?: string;
  original_name?: string;
  backdrop_path?: string;
  overview?: string;
};

export const Banner = () => {
  const [movie, setMovie] = useState<movieProps>({});

  const MAX_DESCRIPTION = 150;

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.feachNetflixOriginals);

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ],
      );

      return request;
    };
    fetchData();
  }, []);

  const truncate = (str: any, n: number) => {
    if (str !== undefined) {
      return str.length > n ? str?.substr(0, n - 1) + '...' : str;
    }
  };

  return (
    <>
      <header
        className={styles.banner}
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
          backgroundPosition: 'center center',
        }}
      >
        <div className={styles.banner_contents}>
          <h1 className={styles.banner_title}>
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className={styles.banner_buttons}>
            <button className={styles.banner_button}>Play</button>
            <button className={styles.banner_button}>My List</button>
          </div>
          <h1 className={styles.banner_description}>
            {truncate(movie?.overview, MAX_DESCRIPTION)}
          </h1>
        </div>
        <div className={styles.banner_fadeBottom} />
      </header>
    </>
  );
};
