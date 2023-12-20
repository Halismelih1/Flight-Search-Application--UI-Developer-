import React, { useState } from 'react';

const SearchForm = () => {
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [oneWay, setOneWay] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    // istek kısmı  
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;


    switch (name) {
      case 'departureAirport':
        setDepartureAirport(value);
        break;
      case 'arrivalAirport':
        setArrivalAirport(value);
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Kalkış Havaalanı:
        <input type="text" name="departureAirport" value={departureAirport} onChange={handleInputChange} />
      </label>
      {/* Diğer input alanları belki */}
      <label>
        Tek Yönlü Uçuş:
        <input type="checkbox" name="oneWay" checked={oneWay} onChange={() => setOneWay(!oneWay)} />
      </label>
      <button type="submit">Ara</button>
    </form>
  );
};

export default SearchForm;
