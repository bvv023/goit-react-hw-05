import { useEffect, useState, Suspense } from 'react';
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
  const backLink = '/movies';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
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

  const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  if (!movie) return <div>Loading...</div>;

  const backLinkFromState = location.state?.from ?? backLink;

  return (
    <div className={css.container}>
      <Link to={backLinkFromState} className={css.backButton}>Go back</Link>
      <div className={css.details}>
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : defaultImg}
          width={250}
          alt="poster"
        />
        <div className={css.movieInfo}>
          <h1 className={css.movieTitle}>{movie.title}</h1>
          <p className={css.movieOverview}>{movie.overview}</p>
          <p className={css.releaseDate}>Release Date: {movie.release_date}</p>
        </div>
      </div>
      <div className={css.additionalInfo}>
        <h3>Additional Information</h3>
        <ul>
          <li>
            <Link to={`/movies/${movieId}/cast`} state={{ from: backLinkFromState }}>Cast</Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`} state={{ from: backLinkFromState }}>Reviews</Link>
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
  );
};

export default MovieDetailsPage;

