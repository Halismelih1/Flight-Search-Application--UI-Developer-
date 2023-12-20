import React, { useState } from 'react';
import SearchForm from './Components/SearchForm';
import FlightList from './Components/FlightList';
import Header from './Components/Header'

const App = () => {
  const [searchCriteria, setSearchCriteria] = useState({});

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
  };

  return (
    <div>
      <Header/>
      <SearchForm onSearch={handleSearch} />
      <FlightList searchCriteria={searchCriteria} />
    </div>
  );
};

export default App;
