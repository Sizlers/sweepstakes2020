import { createContext, useState } from 'react';
import { FilterContext } from '../lib/filterContext';
import 'tailwindcss/tailwind.css'
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  const [filters, setFilters] = useState([]);
  return (
    <FilterContext.Provider value={{filters, setFilters}}>
      <Header />
      <Component {...pageProps} />
    </FilterContext.Provider>
  );
}

export default MyApp;
