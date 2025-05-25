import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './flightResults.css';
import FlightDetailsModal from '../FlightDetailsModal/FlightDetailsModal';

const FlightResults = ({ setSelectedFlight, selectedFlight }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we have flights data
  if (!location.state?.flights) {
    console.log('No flight data found');
    return (
      <div className="flightResultsPage">
        <div className="secContainer container">
          <h2>No Flight Results</h2>
          <button onClick={() => navigate('/')}>Return to Search</button>
        </div>
      </div>
    );
  }

  const flights = location.state.flights;
  const searchDetails = location.state.searchDetails;

  return (
    <section className='flightResultsPage'>
      <div className="secContainer container">
        <h2>Available Flights</h2>
        {searchDetails && (
          <div className="searchSummary">
            <p>From: {searchDetails.origin} To: {searchDetails.destination}</p>
            <p>Date: {new Date(searchDetails.date).toLocaleDateString()}</p>
          </div>
        )}
        <div className="flightResults">
          {flights.map((flight, index) => (
            <div 
              key={index} 
              className="flightCard"
              onClick={() => setSelectedFlight(flight)}
              style={{ cursor: 'pointer' }}
            >
              <p>Price: ${Math.round(flight.price.total)}</p>
              <p>Airline: {flight.validatingAirlineCodes.join(', ')}</p>
              {flight.itineraries[0].segments.map((segment, idx) => (
                <div key={idx}>
                  <p>From: {segment.departure.iataCode} - {new Date(segment.departure.at).toLocaleTimeString()}</p>
                  <p>To: {segment.arrival.iataCode} - {new Date(segment.arrival.at).toLocaleTimeString()}</p>
                  <p>Duration: {segment.duration.replace('PT', '')}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        {selectedFlight && (
          <FlightDetailsModal 
            flight={selectedFlight} 
            onClose={() => setSelectedFlight(null)} 
          />
        )}
      </div>
    </section>
  );
};

export default FlightResults; 