import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchTokenContext } from '../contexts/SearchTokenContext';
import "./styled/Search.css";

interface TokenData {
  TokenName: string;
  TokenHash: string;
  PairAddress: string;
  TokenSymbol: string;
}

interface SearchProps {
    onSearch: (query: string) => void;
}
  
  const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const { tokens, loading } = useSearchTokenContext();
    const [query, setQuery] = useState<string>('');
    const [filteredTokens, setFilteredTokens] = useState<TokenData[]>([]);
    const [selectedTokenHash, setSelectedTokenHash] = useState<string | ''>('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setQuery(inputValue);
  
      if (inputValue) {
        const filtered = tokens.filter((token) =>
          token.TokenName.toLowerCase().includes(inputValue.toLowerCase()) ||
          token.TokenHash.toLowerCase().includes(inputValue.toLowerCase()) ||
          token.TokenSymbol.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredTokens(filtered);
      } else {
        setFilteredTokens([]);
      }
    };
  
    

    const handleSelectToken = (token: TokenData) => {
      setSelectedTokenHash(token.TokenHash);
      setQuery(token.TokenName);
      setFilteredTokens([]);
      if (onSearch) {
        onSearch(token.TokenHash); 
      }
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setFilteredTokens([]); // Close dropdown if click outside
        }
      };
  
      // Add event listener for clicks
      document.addEventListener('mousedown', handleClickOutside);
      
      // Clean up the event listener
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    return (
      <div className='search-header'>
        <input
          type="text"
          placeholder="token name, pair or hash..."
          value={query}
          onChange={handleInputChange}
        />
        <SearchIcon style={{ cursor: 'pointer' }} />

        {/* Show loading message or dropdown */}
        {loading ? (
          <div>Loading tokens...</div>
        ) : (
          filteredTokens.length > 0 && (
            <div ref={dropdownRef} className="autocomplete-dropdown">
              {filteredTokens.map((token, index) => (
                <div
                  key={index}
                  className="autocomplete-item"
                  onClick={() => handleSelectToken(token)}
                >
                  {token.TokenName} ({token.TokenSymbol})
                </div>
              ))}
            </div>
          )
        )}
      </div>
    );
  };
  
  export default Search;