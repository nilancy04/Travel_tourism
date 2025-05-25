import React from 'react';
import './flightDetailsModal.css';

const FlightDetailsModal = ({ flight, onClose }) => {
  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>&times;</button>
        <div className="flightDetailsFull">
          <h2>Flight Details</h2>
          
          <div className="priceSection">
            <h3>Price Details</h3>
            <p className="totalPrice">Total Price: ${Math.round(flight.price.total)}</p>
            <p>Base Price: ${Math.round(flight.price.base)}</p>
          </div>

          <div className="airlineSection">
            <h3>Airline Information</h3>
            <p>Carrier: {flight.validatingAirlineCodes.join(', ')}</p>
          </div>

          <div className="itinerarySection">
            <h3>Flight Itinerary</h3>
            {flight.itineraries[0].segments.map((segment, idx) => (
              <div key={idx} className="segmentDetails">
                <h4>Segment {idx + 1}</h4>
                <div className="segmentGrid">
                  <div className="departure">
                    <h5>Departure</h5>
                    <p className="time">{new Date(segment.departure.at).toLocaleString()}</p>
                    <p className="airport">{segment.departure.iataCode}</p>
                  </div>
                  
                  <div className="flightInfo">
                    <p className="duration">Duration: {segment.duration.replace('PT', '')}</p>
                    <p className="flightNumber">Flight: {segment.carrierCode} {segment.number}</p>
                  </div>

                  <div className="arrival">
                    <h5>Arrival</h5>
                    <p className="time">{new Date(segment.arrival.at).toLocaleString()}</p>
                    <p className="airport">{segment.arrival.iataCode}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="fareSection">
            <h3>Fare Details</h3>
            <p>Fare Type: {flight.pricingOptions.fareType}</p>
            <p>Included Checked Bags: {flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weight || 0}kg</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsModal; 