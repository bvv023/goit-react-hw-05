//src/pages/MoviesPage/MoviesPage.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useSearch } from '../../context/SearchContext';
import css from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResults, setSearchResults } = useSearch();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  useEffect(() => {
    if (!searchParams.get('query')) return;

    const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchParams.get('query')}&include_adult=false&language=en-US&page=1`;
      const options = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzFlZjYyNjU5NGZlZWI2MTc4Y2JhNjBhOTU1MjkyZSIsInN1YiI6IjY2NWRkNjg2N2Q2YjY0YTgzMzA5MzUxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZZwkcO9-B3T64ay5m1Xyd3F6fCzq78GbTIOQ4fbkzHQ'
        }
      };

      try {
        const response = await axios.get(url, options);
        setSearchResults(response.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, [searchParams, setSearchResults]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ query });
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={css.input}
        />
        <button type="submit" className={css.button}>Search</button>
      </form>
      {searchResults && <MovieList movies={searchResults} />}
    </div>
  );
};

export default MoviesPage;