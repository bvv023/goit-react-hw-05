// src/pages/MoviesPage/MoviesPage.jsx
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryParam = searchParams.get('query');
    if (queryParam) {
      setQuery(queryParam);
      handleSearch(queryParam);
    }
  }, [searchParams]);

  const handleSearch = async (queryParam) => {
    if (!queryParam) {
      toast.error('Please enter your request');
      return;
    }

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: { query: queryParam },
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzFlZjYyNjU5NGZlZWI2MTc4Y2JhNjBhOTU1MjkyZSIsInN1YiI6IjY2NWRkNjg2N2Q2YjY0YTgzMzA5MzUxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZZwkcO9-B3T64ay5m1Xyd3F6fCzq78GbTIOQ4fbkzHQ',
        },
      });
      if (response.data.results.length === 0) {
        toast.error('Sorry, nothing was found for your search');
      }
      setSearchResults(response.data.results);
      setQuery('');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    } catch (error) {
      console.error('Failed to fetch search results', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParams({ query });
    handleSearch(query);
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={inputRef}
          placeholder="Search for movies..."
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>Search</button>
      </form>

      {searchResults.length > 0 && <MovieList movies={searchResults} />}
    </div>
  );
};

export default MoviesPage;
