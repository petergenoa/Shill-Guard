import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import "./styled/Search.css";

interface SearchProps {
    onSearch: (query: string) => void;
}
  
  const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>('');
  
    const handleSearch = () => {
      if (onSearch) {
        onSearch(query); 
      }
    };
  
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' || event.key === 'Return') {
            handleSearch();
        }
    };
  
    return (
      <div className='search-header'>
        <input
          type="text"
          placeholder="token name, pair or hash..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <SearchIcon onClick={handleSearch} style={{ cursor: 'pointer' }} />
      </div>
    );
  };
  
  export default Search;