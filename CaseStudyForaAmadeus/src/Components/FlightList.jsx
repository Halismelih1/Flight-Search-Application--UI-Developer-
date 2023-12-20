// FlightList.jsx

import React from 'react';
import flights from '../Data/db';

const FlightList = ({ searchCriteria }) => {
  // Uçuşları filtrele
  const filteredFlights = flights.filter((flight) => {
    // Kullanıcının en az bir şehir ve bir tarih girmesi gerekiyor
    if (
      (searchCriteria.departureCity && flight.departureCity.toLowerCase().includes(searchCriteria.departureCity.toLowerCase())) ||
      (searchCriteria.arrivalCity && flight.arrivalCity.toLowerCase().includes(searchCriteria.arrivalCity.toLowerCase())) ||
      (searchCriteria.departureDate && flight.departureDate === searchCriteria.departureDate.format('YYYY-MM-DD'))
    ) {
      return true;
    }
    return false;
  });

  return (
    <div>
      <h2>Uygun Uçuşlar</h2>
      {filteredFlights.length > 0 ? (
        <ul>
          {filteredFlights.map((flight) => (
            <li key={flight.id}>
              {flight.departureCity} to {flight.arrivalCity} - {flight.departureDate} {flight.departureTime}
            </li>
          ))}
        </ul>
      ) : (
        <p>Uygun uçuş bulunamadı.</p>
      )}
    </div>
  );
};

export default FlightList;
