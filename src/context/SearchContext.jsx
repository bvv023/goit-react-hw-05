// src/context/SearchContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    // Очищення результатів пошуку при завантаженні компонента
    setSearchResults(null);
  }, []);

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};
