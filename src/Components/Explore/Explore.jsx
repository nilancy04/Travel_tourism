import React, { useEffect, useState } from 'react';
import './Explore.css';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaStar, FaHeart, FaFilter, FaThLarge, FaList, FaMap } from 'react-icons/fa';
import { MdTimer, MdLocalOffer } from 'react-icons/md';
import img1 from '../../Assests/img(1).jpg';
import img2 from '../../Assests/img(2).jpg';
import img3 from '../../Assests/img(3).jpg';
import img4 from '../../Assests/img(4).jpg';
import img5 from '../../Assests/img(5).jpg';
import img6 from '../../Assests/img(6).jpg';
import img7 from '../../Assests/img(7).jpg';
import img8 from '../../Assests/img(8).jpg';
import img9 from '../../Assests/img(9).jpg';
import img10 from '../../Assests/img(10).jpg';
import img11 from '../../Assests/img(11).jpg';
import img12 from '../../Assests/img(12).jpg';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDates, setSelectedDates] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [showMap, setShowMap] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  const attractions = [
    {
      id: 1,
      title: "Mehrangarh Fort Tour",
      location: "Jodhpur, India",
      image: img1,
      rating: 4.8,
      reviews: 2453,
      price: 120,
      category: "historical",
      duration: "3 hours",
      description: "Explore the magnificent Mehrangarh Fort with expert guides. Learn about its rich history and architecture.",
      highlights: ["Expert local guide", "Skip-the-line entry", "Cultural insights", "Photo opportunities"]
    },
    {
      id: 2,
      title: "Desert Safari Experience",
      location: "Thar Desert",
      image: img2,
      rating: 4.7,
      reviews: 1876,
      price: 250,
      category: "adventure",
      duration: "6 hours",
      description: "Experience the magic of Thar Desert with camel rides, traditional dinner, and cultural performances.",
      highlights: ["Camel ride", "Traditional dinner", "Cultural show", "Sunset views"]
    },
    {
      id: 3,
      title: "City Heritage Walk",
      location: "Old City, Jodhpur",
      image: img3,
      rating: 4.9,
      reviews: 1245,
      price: 80,
      category: "cultural",
      duration: "4 hours",
      description: "Walk through the historic lanes of Jodhpur's old city, visiting local markets and heritage sites.",
      highlights: ["Local market visit", "Heritage sites", "Food tasting", "Photography spots"]
    },
    {
      id: 4,
      title: "Rajasthani Cooking Class",
      location: "Local Home, Jodhpur",
      image: img4,
      rating: 4.9,
      reviews: 856,
      price: 150,
      category: "food",
      duration: "3 hours",
      description: "Learn authentic Rajasthani cooking from local experts in a traditional home setting.",
      highlights: ["Traditional recipes", "Market visit", "Hands-on cooking", "Family dinner"]
    },
    {
      id: 5,
      title: "Bishnoi Village Safari",
      location: "Bishnoi Villages",
      image: img5,
      rating: 4.6,
      reviews: 1123,
      price: 180,
      category: "cultural",
      duration: "5 hours",
      description: "Visit the Bishnoi villages and experience their unique lifestyle and traditions.",
      highlights: ["Village tour", "Traditional crafts", "Wildlife spotting", "Local interaction"]
    },
    {
      id: 6,
      title: "Zip Line Adventure",
      location: "Mehrangarh Fort",
      image: img6,
      rating: 4.8,
      reviews: 978,
      price: 200,
      category: "adventure",
      duration: "2 hours",
      description: "Experience thrilling zip-lining with panoramic views of Jodhpur's blue city.",
      highlights: ["6 zip lines", "Safety equipment", "Professional guides", "Photo package"]
    },
    {
      id: 7,
      title: "Sunset Market Tour",
      location: "Sardar Market",
      image: img7,
      rating: 4.7,
      reviews: 645,
      price: 90,
      category: "food",
      duration: "3 hours",
      description: "Explore the vibrant Sardar Market and taste local street food delicacies.",
      highlights: ["Food tasting", "Market exploration", "Local guide", "Cultural insights"]
    },
    {
      id: 8,
      title: "Mandore Gardens Tour",
      location: "Mandore",
      image: img8,
      rating: 4.5,
      reviews: 789,
      price: 100,
      category: "historical",
      duration: "4 hours",
      description: "Visit the ancient Mandore Gardens and learn about its historical significance.",
      highlights: ["Garden tour", "Temple visit", "Historical monuments", "Expert guide"]
    },
    {
      id: 9,
      title: "Pottery Workshop",
      location: "Local Studio, Jodhpur",
      image: img9,
      rating: 4.9,
      reviews: 432,
      price: 130,
      category: "cultural",
      duration: "2 hours",
      description: "Learn traditional pottery techniques from local artisans in a hands-on workshop.",
      highlights: ["Pottery making", "Local artisans", "Take-home creation", "Traditional methods"]
    },
    {
      id: 10,
      title: "Cycling Tour",
      location: "Blue City",
      image: img10,
      rating: 4.8,
      reviews: 567,
      price: 110,
      category: "adventure",
      duration: "3 hours",
      description: "Explore the blue city of Jodhpur on a guided cycling tour through narrow lanes.",
      highlights: ["Bicycle rental", "Local guide", "Hidden spots", "Photo stops"]
    },
    {
      id: 11,
      title: "Textile Workshop",
      location: "Craft Center",
      image: img11,
      rating: 4.7,
      reviews: 345,
      price: 160,
      category: "cultural",
      duration: "4 hours",
      description: "Learn about traditional textile techniques including block printing and tie-dye.",
      highlights: ["Hands-on workshop", "Material included", "Take-home creation", "Expert instruction"]
    },
    {
      id: 12,
      title: "Sunset Yoga Session",
      location: "Mehrangarh Fort",
      image: img12,
      rating: 4.9,
      reviews: 234,
      price: 80,
      category: "nature",
      duration: "1.5 hours",
      description: "Practice yoga with stunning views of the sunset over the blue city.",
      highlights: ["Professional instructor", "Yoga mat provided", "Meditation", "Scenic location"]
    },
    {
      id: 13,
      title: "Santorini Sunset Cruise",
      location: "Santorini, Greece",
      image: img3,
      rating: 4.9,
      reviews: 3245,
      price: 850,
      category: "adventure",
      duration: "5 hours",
      description: "Sail around Santorini's caldera on a luxury catamaran. Enjoy swimming, snorkeling, and a famous Greek sunset.",
      highlights: ["Luxury catamaran", "Greek BBQ dinner", "Wine tasting", "Sunset views"]
    },
    {
      id: 14,
      title: "Machu Picchu Explorer",
      location: "Cusco, Peru",
      image: img4,
      rating: 4.8,
      reviews: 2876,
      price: 1200,
      category: "historical",
      duration: "12 hours",
      description: "Discover the ancient Incan citadel of Machu Picchu with expert guides. Including train journey and site tour.",
      highlights: ["Expert guide", "Train tickets", "Site admission", "Lunch included"]
    },
    {
      id: 15,
      title: "Tokyo Food Tour",
      location: "Tokyo, Japan",
      image: img5,
      rating: 4.9,
      reviews: 1987,
      price: 650,
      category: "food",
      duration: "4 hours",
      description: "Sample the best of Tokyo's street food and local delicacies in this evening food tour.",
      highlights: ["10+ food tastings", "Local guide", "Small group", "Hidden gems"]
    },
    {
      id: 16,
      title: "Northern Lights Hunt",
      location: "Tromsø, Norway",
      image: img6,
      rating: 4.7,
      reviews: 1543,
      price: 1500,
      category: "nature",
      duration: "7 hours",
      description: "Chase the Aurora Borealis with professional guides and photographers in the Arctic wilderness.",
      highlights: ["Professional photos", "Hot drinks", "Thermal suits", "Expert guide"]
    },
    {
      id: 17,
      title: "Great Barrier Reef Dive",
      location: "Cairns, Australia",
      image: img7,
      rating: 4.8,
      reviews: 2134,
      price: 950,
      category: "adventure",
      duration: "8 hours",
      description: "Discover the underwater wonders of the Great Barrier Reef. Suitable for beginners and experienced divers.",
      highlights: ["Diving equipment", "Marine guide", "Lunch included", "Reef education"]
    },
    {
      id: 18,
      title: "Sahara Desert Camp",
      location: "Merzouga, Morocco",
      image: img8,
      rating: 4.9,
      reviews: 1678,
      price: 750,
      category: "adventure",
      duration: "24 hours",
      description: "Experience the magic of the Sahara with camel trek, luxury camp stay, and traditional Berber entertainment.",
      highlights: ["Luxury camp", "Camel trek", "Traditional dinner", "Stargazing"]
    },
    {
      id: 19,
      title: "Vatican Museums Tour",
      location: "Rome, Italy",
      image: img9,
      rating: 4.8,
      reviews: 4567,
      price: 550,
      category: "cultural",
      duration: "3 hours",
      description: "Skip the lines and explore the Vatican Museums, Sistine Chapel, and St. Peter's Basilica with an art historian.",
      highlights: ["Skip-the-line", "Art historian guide", "Small group", "Sistine Chapel"]
    },
    {
      id: 20,
      title: "Bali Temple & Rice Terrace Tour",
      location: "Ubud, Bali",
      image: img10,
      rating: 4.7,
      reviews: 1897,
      price: 450,
      category: "cultural",
      duration: "9 hours",
      description: "Visit ancient temples, explore stunning rice terraces, and experience Balinese culture.",
      highlights: ["Temple visits", "Rice terraces", "Local lunch", "Cultural show"]
    },
    {
      id: 21,
      title: "New York Food & History Tour",
      location: "New York, USA",
      image: img11,
      rating: 4.8,
      reviews: 2345,
      price: 7000,
      category: "food",
      duration: "4 hours",
      description: "Explore NYC's diverse food scene while learning about the city's immigrant history.",
      highlights: ["7+ food stops", "Historical sites", "Local guide", "Small group"]
    },
    {
      id: 22,
      title: "Cape Town Penguin Colony",
      location: "Cape Town, South Africa",
      image: img12,
      rating: 4.6,
      reviews: 1234,
      price: 5500,
      category: "nature",
      duration: "6 hours",
      description: "Visit the famous Boulders Beach penguin colony and explore the Cape Peninsula.",
      highlights: ["Penguin viewing", "Scenic drive", "Cape Point", "Expert guide"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Experiences', icon: '🌟' },
    { id: 'historical', name: 'Historical', icon: '🏛️' },
    { id: 'adventure', name: 'Adventure', icon: '🏃' },
    { id: 'cultural', name: 'Cultural', icon: '🎭' },
    { id: 'food', name: 'Food & Dining', icon: '🍽️' },
    { id: 'nature', name: 'Nature', icon: '🌿' },
    { id: 'city', name: 'City Tours', icon: '🌆' },
    { id: 'water', name: 'Water Activities', icon: '🌊' }
  ];

  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'duration', label: 'Duration' }
  ];

  const sortAttractions = (attractions) => {
    switch(sortBy) {
      case 'price-low':
        return [...attractions].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...attractions].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...attractions].sort((a, b) => b.rating - a.rating);
      case 'duration':
        return [...attractions].sort((a, b) => getDurationHours(a.duration) - getDurationHours(b.duration));
      default:
        return attractions;
    }
  };

  const filteredAttractions = attractions.filter(attraction => {
    const matchesCategory = selectedCategory === 'all' || attraction.category.toLowerCase() === selectedCategory;
    const matchesPrice = attraction.price <= priceRange;
    const matchesDuration = selectedDuration === 'all' || 
      (selectedDuration === 'short' && getDurationHours(attraction.duration) <= 3) ||
      (selectedDuration === 'medium' && getDurationHours(attraction.duration) > 3 && getDurationHours(attraction.duration) <= 6) ||
      (selectedDuration === 'long' && getDurationHours(attraction.duration) > 6);
    
    return matchesCategory && matchesPrice && matchesDuration;
  });

  const getDurationHours = (duration) => {
    return parseInt(duration.split(' ')[0]);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="explore-section">
      <div className="explore-hero">
        <h1>Discover Amazing Places</h1>
        <p>Find and book the best experiences for your journey</p>
        
        <div className="search-container">
          <div className="search-box">
            <FaMapMarkerAlt className="search-icon" />
            <input
              type="text"
              placeholder="Where are you going?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="date-box">
            <FaCalendarAlt className="calendar-icon" />
            <input
              type="date"
              value={selectedDates}
              onChange={(e) => setSelectedDates(e.target.value)}
            />
          </div>
          
          <button className="search-btn">
            <FaSearch /> Explore
          </button>
        </div>

        <div className="category-scroll">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        <div className="explore-controls">
          <div className="view-controls">
            <button 
              className={`view-control-btn ${!showMap ? 'active' : ''}`}
              onClick={() => setShowMap(false)}
            >
              <FaThLarge /> Grid View
            </button>
            <button 
              className={`view-control-btn ${showMap ? 'active' : ''}`}
              onClick={() => setShowMap(true)}
            >
              <FaMap /> Map View
            </button>
          </div>

          <div className="sort-control">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="explore-content">
        <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
          <FaFilter /> Filters
        </button>

        <div className={`filters-section ${showFilters ? 'show' : ''}`}>
          <div className="filters-header">
            <h3>Refine Your Search</h3>
            <button className="close-filters" onClick={() => setShowFilters(false)}>×</button>
          </div>
          
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewType === 'grid' ? 'active' : ''}`}
              onClick={() => setViewType('grid')}
            >
              <FaThLarge /> Grid
            </button>
            <button 
              className={`view-btn ${viewType === 'list' ? 'active' : ''}`}
              onClick={() => setViewType('list')}
            >
              <FaList /> List
            </button>
          </div>

          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-slider">
              <input 
                type="range" 
                min="0" 
                max="500" 
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <div className="price-range">$0 - ${priceRange}</div>
            </div>
          </div>

          <div className="filter-group">
            <h4>Duration</h4>
            <label>
              <input 
                type="radio" 
                name="duration" 
                value="all"
                checked={selectedDuration === 'all'}
                onChange={(e) => setSelectedDuration(e.target.value)}
              /> Any Duration
            </label>
            <label>
              <input 
                type="radio" 
                name="duration" 
                value="short"
                checked={selectedDuration === 'short'}
                onChange={(e) => setSelectedDuration(e.target.value)}
              /> Up to 3 hours
            </label>
            <label>
              <input 
                type="radio" 
                name="duration" 
                value="medium"
                checked={selectedDuration === 'medium'}
                onChange={(e) => setSelectedDuration(e.target.value)}
              /> 3-6 hours
            </label>
            <label>
              <input 
                type="radio" 
                name="duration" 
                value="long"
                checked={selectedDuration === 'long'}
                onChange={(e) => setSelectedDuration(e.target.value)}
              /> Full day
            </label>
          </div>

          <button className="apply-filters" onClick={() => setShowFilters(false)}>
            Apply Filters
          </button>
        </div>

        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Finding the best experiences...</p>
          </div>
        ) : filteredAttractions.length === 0 ? (
          <div className="no-results">
            <h3>No experiences found</h3>
            <p>Try adjusting your filters or search criteria</p>
            <button 
              className="reset-filters"
              onClick={() => {
                setSelectedCategory('all');
                setPriceRange(5000);
                setSelectedDuration('all');
                setSearchQuery('');
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className={`attractions-grid ${viewType === 'list' ? 'list-view' : ''}`}>
            {sortAttractions(filteredAttractions).map(attraction => (
              <div key={attraction.id} className="attraction-card" data-aos="fade-up">
                <div className="attraction-image">
                  <img src={attraction.image} alt={attraction.title} />
                  <div className="attraction-category">{attraction.category}</div>
                  <button 
                    className={`favorite-btn ${favorites.includes(attraction.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(attraction.id)}
                  >
                    <FaHeart />
                  </button>
                </div>
                
                <div className="attraction-content">
                  <h3>{attraction.title}</h3>
                  <p className="location">
                    <FaMapMarkerAlt /> {attraction.location}
                  </p>
                  <p className="duration">
                    <MdTimer /> {attraction.duration}
                  </p>
                  <p className="description">{attraction.description}</p>
                  
                  <div className="highlights">
                    {attraction.highlights.map((highlight, index) => (
                      <span key={index} className="highlight-tag">{highlight}</span>
                    ))}
                  </div>

                  <div className="attraction-footer">
                    <div className="rating">
                      <span className="rating-score">
                        <FaStar className="star-icon" /> {attraction.rating}
                      </span>
                      <span className="reviews">({attraction.reviews} reviews)</span>
                    </div>
                    <div className="price">
                      <MdLocalOffer className="price-icon" />
                      <span className="amount">${attraction.price}</span>
                      <span className="per-person">per person</span>
                    </div>
                  </div>
                  
                  <button className="book-btn">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedAttraction && (
          <div className="quick-view-modal" onClick={() => setSelectedAttraction(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="close-modal" onClick={() => setSelectedAttraction(null)}>×</button>
              <div className="modal-image">
                <img src={selectedAttraction.image} alt={selectedAttraction.title} />
              </div>
              <div className="modal-details">
                <h2>{selectedAttraction.title}</h2>
                <div className="modal-info">
                  <p className="location"><FaMapMarkerAlt /> {selectedAttraction.location}</p>
                  <p className="duration"><MdTimer /> {selectedAttraction.duration}</p>
                  <div className="rating">
                    <FaStar className="star-icon" /> {selectedAttraction.rating}
                    <span className="reviews">({selectedAttraction.reviews} reviews)</span>
                  </div>
                </div>
                <p className="description">{selectedAttraction.description}</p>
                <div className="highlights">
                  <h3>Highlights</h3>
                  <ul>
                    {selectedAttraction.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                <div className="booking-section">
                  <div className="price-info">
                    <span className="amount">${selectedAttraction.price}</span>
                    <span className="per-person">per person</span>
                  </div>
                  <button className="book-btn">Book Now</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Explore; 