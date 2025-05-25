import React, {useEffect, useState} from 'react'
import './home.css'
import video from '../../Assests/video.mp4'
import { GrLocation } from 'react-icons/gr'
import { HiFilter } from 'react-icons/hi'
import { FiTwitter } from 'react-icons/fi'
import { AiOutlineInstagram } from 'react-icons/ai'
import { SiTripadvisor } from 'react-icons/si'
import { BsListTask, BsGithub } from 'react-icons/bs'
import { TbApps } from 'react-icons/tb'
import { FaLinkedinIn } from 'react-icons/fa'

import Aos from 'aos'
import 'aos/dist/aos.css'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { searchFlights, autosuggestLocations } from '../../services/amadeusService';
import { useNavigate } from 'react-router-dom';

mapboxgl.accessToken = 'pk.eyJ1IjoicHMyMjY1IiwiYSI6ImNtMTNzbjBlbzB6cWMycnI1MnM4ejFyYnoifQ.FcxrQ__CESbNjW1nMb3-WQ';

const Home = () => {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [price, setPrice] = useState(5000)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    travelers: 1,
    duration: '1-7',
    accommodation: 'any',
    transportation: 'any',
    mealPreference: 'any',
    budgetCategory: 'any',
    activities: []
  })
  const [showMap, setShowMap] = useState(false);
  const [map, setMap] = useState(null);
  const mapContainer = React.useRef(null);
  const [flights, setFlights] = useState([]);
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])

  useEffect(() => {
    let marker = null;
    let geocoder = null;
    let newMap = null;

    if (showMap && mapContainer.current) {
      try {
        newMap = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/ps2265/cm4yexjnl006401s90i7rav18',
          center: [0, 0],
          zoom: 1,
          width: '100%',
          height: '100%'
        });

        newMap.on('load', () => {
          marker = new mapboxgl.Marker();
          
          geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker: false,
            placeholder: 'Search for places',
            zoom: 12
          });

          newMap.addControl(geocoder);

          geocoder.on('result', (e) => {
            if (marker) {
              marker.remove();
            }
            
            const coordinates = e.result.geometry.coordinates;
            
            marker.setLngLat(coordinates).addTo(newMap);
            
            newMap.flyTo({
              center: coordinates,
              zoom: 12,
              essential: true,
              duration: 2000
            });

            setDestination(e.result.place_name);
          });

          geocoder.on('clear', () => {
            if (marker) {
              marker.remove();
            }
          });
        });

        setMap(newMap);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }

    // Cleanup function
    return () => {
      if (marker) {
        marker.remove();
        marker = null;
      }
      if (geocoder) {
        geocoder.clear();
        geocoder = null;
      }
      if (newMap) {
        newMap.remove();
        setMap(null);
      }
    };
  }, [showMap]);

  const handleOriginChange = async (e) => {
    const query = e.target.value;
    setOrigin(query);
    
    if (query.length >= 2) {
      try {
        console.log('Fetching suggestions for:', query);
        const locations = await autosuggestLocations(query);
        console.log('Received locations for origin:', locations);
        setOriginSuggestions(locations || []);
      } catch (error) {
        console.error('Error in handleOriginChange:', error);
        setOriginSuggestions([]);
      }
    } else {
      setOriginSuggestions([]);
    }
  };

  const handleDestinationChange = async (e) => {
    const query = e.target.value;
    setDestination(query);
    
    if (query.length >= 2) {
      try {
        console.log('Fetching suggestions for:', query);
        const locations = await autosuggestLocations(query);
        console.log('Received locations for destination:', locations);
        setDestinationSuggestions(locations || []);
      } catch (error) {
        console.error('Error in handleDestinationChange:', error);
        setDestinationSuggestions([]);
      }
    } else {
      setDestinationSuggestions([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!origin || !destination || !travelDate) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const originCode = origin.match(/\(([^)]+)\)/)?.[1];
      const destinationCode = destination.match(/\(([^)]+)\)/)?.[1];

      if (!originCode || !destinationCode) {
        alert('Please select valid locations from the suggestions');
        return;
      }

      const formattedDate = new Date(travelDate).toISOString().split('T')[0];

      console.log('Searching for flights...', {
        origin: originCode,
        destination: destinationCode,
        date: formattedDate
      });

      const flightData = await searchFlights(originCode, destinationCode, formattedDate);
      
      if (flightData && flightData.data && flightData.data.length > 0) {
        console.log('Found flights:', flightData.data);
        navigate('/flight-results', { 
          state: { 
            flights: flightData.data,
            searchDetails: {
              origin: originCode,
              destination: destinationCode,
              date: formattedDate
            }
          } 
        });
      } else {
        alert('No flights found for the selected criteria');
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Error searching flights. Please try again.');
    }
  };

  const handleFilterClick = (e) => {
    e.preventDefault()
    setShowFilters(!showFilters)
  }

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleActivityToggle = (activity) => {
    setFilters(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }))
  }

  const handleClickOutside = () => {
    setShowFilters(false)
  }

  return (
    <section className='home'>
      <div className="overlay"></div>
      <video src={video} muted autoPlay loop type="video/mp4"></video>

      <div className="homeContent container">
      <div className="textdiv">
    <span data-aos="fade-up" className="smallText">
        Explore & Experience
    </span>
    
    <h1 data-aos="fade-up" className="homeTitle">
    Discover Your Next Adventure
    </h1>
</div>

        <form onSubmit={handleSearch} data-aos="fade-up" className="cardDiv grid">
          <div className="destinationInput">
            <label htmlFor="origin">From:</label>
            <div className="input flex">
              <input 
                type="text" 
                id="origin"
                placeholder='Enter origin here...'
                value={origin}
                onChange={handleOriginChange}
              />
              <GrLocation 
                className="icon"
                onClick={() => {
                  if (!showMap) {
                    setShowMap(true);
                  }
                }}
                style={{ cursor: 'pointer' }}
              />
            </div>
            {originSuggestions.length > 0 && (
              <ul className="suggestions">
                {originSuggestions.map((place, index) => (
                  <li 
                    key={index} 
                    onClick={() => {
                      setOrigin(`${place.name} (${place.iataCode})`);
                      setOriginSuggestions([]);
                    }}
                  >
                    {place.name} - {place.iataCode} - {place.cityName}, {place.countryName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="destinationInput">
            <label htmlFor="destination">To:</label>
            <div className="input flex">
              <input 
                type="text" 
                id="destination"
                placeholder='Enter destination here...'
                value={destination}
                onChange={handleDestinationChange}
              />
              <GrLocation 
                className="icon"
                onClick={() => {
                  if (!showMap) {
                    setShowMap(true);
                  }
                }}
                style={{ cursor: 'pointer' }}
              />
            </div>
            {destinationSuggestions.length > 0 && (
              <ul className="suggestions">
                {destinationSuggestions.map((place, index) => (
                  <li 
                    key={index} 
                    onClick={() => {
                      setDestination(`${place.name} (${place.iataCode})`);
                      setDestinationSuggestions([]);
                    }}
                  >
                    {place.name} - {place.iataCode} - {place.cityName}, {place.countryName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="dateInput">
            <label htmlFor="date">Select your date:</label>
            <div className="input flex">
              <input 
                type="date" 
                id="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
              />
            </div>
          </div>

          <div className="priceInput">
            <div className="label_total flex">
              <label htmlFor="price">Price:</label>
              <h3 className="total">${price}</h3>
            </div>
            <div className="input flex">
              <input 
                type="number" 
                id="price"
                min="50"
                max="500"
                step="10"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter your budget"
              />
            </div>
            <div className="price_range flex">
              <span className="min_price">Min: $50</span>
              <span className="max_price">Max: $500</span>
            </div>
          </div>

          <div className="searchContainer flex">
            <div className="searchOptions flex" onClick={handleFilterClick}>
              <HiFilter className="icon"/>
              <span>MORE FILTERS</span>
            </div>
            <div className="searchButton flex" onClick={handleSearch}>
              <span>SEARCH</span>
            </div>
          </div>
          

          {showFilters && (
            <>
              <div className="modalOverlay" onClick={() => setShowFilters(false)} />
              <div className="filterModal">
                <div className="filterContent" onClick={e => e.stopPropagation()}>
                  <button 
                    className="closeBtn" 
                    onClick={() => setShowFilters(false)}
                  >
                    ×
                  </button>
                  <h3>Additional Filters</h3>
                  
                  <div className="filterGroup">
                    <label>Number of Travelers</label>
                    <div className="numberInput">
                        <input 
                            type="number" 
                            min="1" 
                            max="10"
                            value={filters.travelers}
                            onChange={(e) => handleFilterChange('travelers', e.target.value)}
                            readOnly
                        />
                        <div className="arrows">
                            <button 
                                type="button"
                                onClick={() => {
                                    if (filters.travelers < 10) {
                                        handleFilterChange('travelers', filters.travelers + 1)
                                    }
                                }}
                                className="numberBtn"
                            >
                                ▲
                            </button>
                            <button 
                                type="button" 
                                onClick={() => {
                                    if (filters.travelers > 1) {
                                        handleFilterChange('travelers', filters.travelers - 1)
                                    }
                                }}
                                className="numberBtn"
                            >
                                ▼
                            </button>
                        </div>
                    </div>
                  </div>

                  <div className="filterGroup">
                    <label>Trip Duration</label>
                    <select 
                      value={filters.duration}
                      onChange={(e) => handleFilterChange('duration', e.target.value)}
                    >
                      <option value="1-7">1-7 days</option>
                      <option value="8-14">8-14 days</option>
                      <option value="15-30">15-30 days</option>
                      <option value="30+">30+ days</option>
                    </select>
                  </div>

                  <div className="filterGroup">
                    <label>Accommodation Type</label>
                    <select 
                      value={filters.accommodation}
                      onChange={(e) => handleFilterChange('accommodation', e.target.value)}
                    >
                      <option value="any">Any</option>
                      <option value="hotel">Hotel</option>
                      <option value="resort">Resort</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                    </select>
                  </div>

                  <div className="filterGroup">
                    <label>Transportation</label>
                    <select 
                      value={filters.transportation}
                      onChange={(e) => handleFilterChange('transportation', e.target.value)}
                    >
                      <option value="any">Any</option>
                      <option value="flight">Flight</option>
                      <option value="train">Train</option>
                      <option value="bus">Bus</option>
                      <option value="car">Rental Car</option>
                    </select>
                  </div>

                  <div className="filterGroup">
                    <label>Meal Preference</label>
                    <select 
                      value={filters.mealPreference}
                      onChange={(e) => handleFilterChange('mealPreference', e.target.value)}
                    >
                      <option value="any">Any</option>
                      <option value="nonVegetarian">Non Vegetarian</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                      <option value="halal">Halal</option>
                      <option value="glutenFree">Gluten Free</option>
                      <option value="continental">Continental</option>
                    </select>
                  </div>

                  <div className="filterGroup">
                    <label>Budget Category</label>
                    <select 
                      value={filters.budgetCategory}
                      onChange={(e) => handleFilterChange('budgetCategory', e.target.value)}
                    >
                      <option value="any">Any</option>
                      <option value="budget">Budget Friendly</option>
                      <option value="midRange">Mid Range</option>
                      <option value="luxury">Luxury</option>
                      <option value="ultraLuxury">Ultra Luxury</option>
                    </select>
                  </div>

                  <div className="filterGroup">
                    <label>Activities</label>
                    <div className="activitiesGrid">
                        {['Beach', 'Mountain', 'City', 'Cultural', 'Adventure', 'Relaxation'].map(activity => (
                            <label key={activity} className="activityCheckbox">
                                <input 
                                    type="checkbox"
                                    checked={filters.activities.includes(activity)}
                                    onChange={() => handleActivityToggle(activity)}
                                />
                                <span>{activity}</span>
                            </label>
                        ))}
                    </div>
                  </div>

                  <div className="filterActions">
                    <button onClick={() => setShowFilters(false)} className="applyFilters">
                      Apply Filters
                    </button>
                    <button 
                      onClick={() => {
                        setFilters({
                          travelers: 1,
                          duration: '1-7',
                          accommodation: 'any',
                          transportation: 'any',
                          mealPreference: 'any',
                          budgetCategory: 'any',
                          activities: []
                        })
                      }} 
                      className="clearFilters"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </form>

        <div data-aos="fade-up" className="homeFooterIcons flex">
          <div className="rightIcons">
            <a 
              href="https://twitter.com/nilancy2005" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FiTwitter className="icon"/>
            </a>
            <a 
              href="" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <AiOutlineInstagram className="icon"/>
            </a>
            <a 
              href="https://linkedin.com/in/nilancy04" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="icon"/>
            </a>
            <a 
              href="https://github.com/nilancy04" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <BsGithub className="icon"/>
            </a>
            <a 
              href="https://tripadvisor.com/YourProfile" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <SiTripadvisor className="icon"/>
            </a>
          </div>

          <div className="leftIcons">
            <BsListTask className="icon"/>
            <TbApps className="icon"/>
          </div>
        </div>
      </div>

      {showMap && (
        <>
          <div className="modalOverlay" onClick={() => setShowMap(false)} />
          <div className="mapModal">
            <div className="mapContent" onClick={e => e.stopPropagation()}>
              <button 
                className="closeBtn" 
                onClick={() => {
                  setShowMap(false);
                }}
              >
                ×
              </button>
              <div 
                ref={mapContainer} 
                className="mapContainer" 
                style={{ width: '100%', height: '400px' }}
              />
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default Home
