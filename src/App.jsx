// src/App.jsx
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import { SearchProvider } from './context/SearchContext';
import toast from 'react-hot-toast';
import ToastContainer from './components/ToastContainer/ToastContainer';
import css from './App.module.css';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'));

const App = () => (
  <SearchProvider>
    <div className={css.container}>
      <Navigation />
      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews onEmpty={() => toast.error('Sorry, there are no reviews yet')} />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  </SearchProvider>
);

export default App;
