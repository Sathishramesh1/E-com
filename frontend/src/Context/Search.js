import { useState, useContext, createContext } from "react";

const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });
  const [open, setOpen] = useState(false);

  return (
    <SearchContext.Provider value={[auth, setAuth,open,setOpen]}>
      {children}
    </SearchContext.Provider>
  );
};

export{SearchContext}

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };