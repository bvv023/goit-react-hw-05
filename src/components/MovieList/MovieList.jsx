// src/components/MovieList/MovieList.jsx
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  return (
    <ul className={css.list}>
      {movies.map(movie => (
        <li key={movie.id} className={css.item}>
          <Link to={`/movies/${movie.id}`} state={{ from: window.location.pathname }}>
            <img className={css.moviePoster} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className={css.movieInfo}>
              <p className={css.movieTitle}>{movie.title}</p>
              <p className={css.movieReleaseDate}>{new Date(movie.release_date).getFullYear()}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string,
  })).isRequired,
};

export default MovieList;
