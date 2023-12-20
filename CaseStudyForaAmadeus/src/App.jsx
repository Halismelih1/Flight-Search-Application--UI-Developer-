import React, { useState } from 'react';
import SearchForm from './Components/SearchForm';
import FlightList from './Components/FlightList';

const App = () => {
  const [searchCriteria, setSearchCriteria] = useState({});

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      <FlightList searchCriteria={searchCriteria} />
    </div>
  );
};

export default App;
