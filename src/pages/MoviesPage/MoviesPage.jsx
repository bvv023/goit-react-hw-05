import { useState, useRef } from 'react';
import { useSearch } from '../../context/SearchContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const { searchResults, setSearchResults } = useSearch();
  const inputRef = useRef(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query) {
      toast.error('Please enter your request');
      return;
    }

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          query,
        },
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

  return (
    <div className={css.container}>
      <form onSubmit={handleSearch} className={css.searchForm}>
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

      {searchResults && (
        <ul className={css.list}>
          {searchResults.map(movie => (
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
      )}
    </div>
  );
};

export default MoviesPage;
