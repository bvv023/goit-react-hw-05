// src/pages/MovieDetailsPage/MovieDetailsPage.jsx
import { useEffect, useState, Suspense, useRef } from 'react';
import { Link, Route, Routes, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import css from './MovieDetailsPage.module.css';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const backLinkRef = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}`;
      const options = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzFlZjYyNjU5NGZlZWI2MTc4Y2JhNjBhOTU1MjkyZSIsInN1YiI6IjY2NWRkNjg2N2Q2YjY0YTgzMzA5MzUxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZZwkcO9-B3T64ay5m1Xyd3F6fCzq78GbTIOQ4fbkzHQ',
        },
      };
      try {
        const response = await axios.get(url, options);
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={css.container}>
      <Link to={backLinkRef.current} className={css.backButton}>Go back</Link>
      <div className={css.movieBox}>
        <div className={css.details}>
          <img className={css.poster} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <div className={css.movieInfo}>
            <h2 className={css.movieTitle}>{movie.title}</h2>
            <p className={css.movieOverview}>{movie.overview}</p>
            <p className={css.rating}>Rating: {movie.vote_average}</p>
            <p className={css.releaseDate}>Release Date: {movie.release_date}</p>
          </div>
        </div>
          
        <div className={css.additionalInfo}>
          <h3>Additional Information</h3>
          <ul className={css.additionalLinks}>
            <li>
              <Link to="cast" state={{ from: location.state?.from ?? '/' }}>Cast</Link>
            </li>
            <li>
              <Link to="reviews" state={{ from: location.state?.from ?? '/' }}>Reviews</Link>
            </li>
          </ul>
        </div>
          

          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews onEmpty={() => toast.error('Sorry, there are no reviews yet')} />} />
            </Routes>
          </Suspense>
        
      </div>
    </div>
  );
};

export default MovieDetailsPage;
