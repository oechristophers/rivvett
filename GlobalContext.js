// context/GlobalContext.js
import { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const GlobalContext = createContext();

// Provider component to wrap around the app
export const GlobalProvider = ({ children }) => {
  const [data, setData] = useState({
    featuredProduct: null,
    newProducts: null,
    maleProducts: null,
    femaleProducts: null,
    productCategories: null,
    maleBlogs: null,
    femaleBlogs: null,
    maleGender: null,
    femaleGender: null,
    allProducts: null,
  });

  // Load data from localStorage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('layoutData');
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use global context
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
