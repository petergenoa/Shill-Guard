import React, { createContext, useContext, useEffect, useState } from 'react';

interface TokenData {
    TokenName: string;
    TokenHash: string;
    PairAddress: string;
    TokenSymbol: string;
}
  
interface SearchTokenContextProps {
    tokens: TokenData[];
    loading: boolean;
}

const SearchTokenContext = createContext<SearchTokenContextProps | undefined>(undefined);

export const useSearchTokenContext = () => {
  const context = useContext(SearchTokenContext);
  if (!context) {
    throw new Error('useTokenContext must be used within TokenProvider');
  }
  return context;
};

export const SearchTokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tokens, setTokens] = useState<TokenData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchTokens = async () => {
        setLoading(true);
        try {
          // Check if data is available in localStorage
          const cachedData = localStorage.getItem('tokens');
          if (cachedData) {
            setTokens(JSON.parse(cachedData));
            setLoading(false);
          }
  
          // Fetch the latest data from API endpoint
          const response = await fetch('https://shillguard-001-site6.etempurl.com/signals/AutocompleteSignals');
          const data: TokenData[] = await response.json();
  
          setTokens(data); // Update tokens in context
          localStorage.setItem('tokens', JSON.stringify(data)); // Cache in localStorage
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch token data:', error);
          setLoading(false);
        }
      };
  
      fetchTokens();
    }, []);
  
    return (
      <SearchTokenContext.Provider value={{ tokens, loading }}>
        {children}
      </SearchTokenContext.Provider>
    );
  };