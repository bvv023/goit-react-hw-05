//MovieCast.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    const fetchCast = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
      const options = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzFlZjYyNjU5NGZlZWI2MTc4Y2JhNjBhOTU1MjkyZSIsInN1YiI6IjY2NWRkNjg2N2Q2YjY0YTgzMzA5MzUxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZZwkcO9-B3T64ay5m1Xyd3F6fCzq78GbTIOQ4fbkzHQ'
        }
      };

      try {
        const response = await axios.get(url, options);
        setCast(response.data.cast);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div className={css.cast}>
      <ul className={css.list}>
        {cast.map((actor) => (
          <li key={actor.cast_id} className={css.item}>
            <img
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg'}
              alt={actor.name}
              className={css.image}
            />
            <div className={css.actorInfo}>
              <p className={css.actorName}>{actor.name}</p>
              <p className={css.actorCharacter}>{actor.character}</p>
            </div>
          
          </li>
        ))}
      </ul>
    </div>
  );
};

MovieCast.propTypes = {
  cast: PropTypes.arrayOf(PropTypes.shape({
    cast_id: PropTypes.number.isRequired,
    profile_path: PropTypes.string,
    name: PropTypes.string.isRequired,
  })),
};

export default MovieCast;