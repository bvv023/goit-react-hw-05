import { useEffect, useState, Suspense, lazy } from 'react';
import { useParams, Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import css from './MovieDetailsPage.module.css';

const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'));

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchMovie = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}`;
      const options = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzFlZjYyNjU5NGZlZWI2MTc4Y2JhNjBhOTU1MjkyZSIsInN1YiI6IjY2NWRkNjg2N2Q2YjY0YTgzMzA5MzUxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZZwkcO9-B3T64ay5m1Xyd3F6fCzq78GbTIOQ4fbkzHQ'
        }
      };
      try {
        const response = await axios.get(url, options);
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [movieId]);

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate('/movies');
    }
  };

  return (
    <div className={css.container}>
      {movie && (
        <>
          <button onClick={handleGoBack} className={css.button}>Go back</button>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <div className={css.additionalInfo}>
            <Link to="cast" className={css.link}>Cast</Link>
            <Link to="reviews" className={css.link}>Reviews</Link>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="cast" element={<MovieCast movieId={Number(movieId)} />} />
              <Route path="reviews" element={<MovieReviews movieId={Number(movieId)} />} />
            </Routes>
          </Suspense>
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
