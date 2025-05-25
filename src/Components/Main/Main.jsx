import React, {useEffect, useState} from 'react';
import './main.css';
import img from '../../Assests/img(1).jpg'
import img2 from '../../Assests/img(2).jpg'
import img3 from '../../Assests/img(3).jpg'
import img4 from '../../Assests/img(4).jpg'
import img5 from '../../Assests/img(5).jpg'
import img6 from '../../Assests/img(6).jpg'
import img7 from '../../Assests/img(7).jpg'
import img8 from '../../Assests/img(8).jpg'
import img9 from '../../Assests/img(9).jpg'
import { HiOutlineClipboardCheck, HiOutlineLocationMarker } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { MdTravelExplore } from 'react-icons/md';

import Aos from 'aos'
import 'aos/dist/aos.css'

const Data = [

  
  {
    id: 1,
    imgSrc: img,
    destTitle: 'Hong Kong',
    location: 'China',
    grade: 'CULTURAL EXPLORATION',
    fees: '$650',
    description: 'A vibrant city blending tradition and modernity, Hong Kong is known for its iconic skyline, bustling markets, and cultural landmarks like the Tian Tan Buddha and Victoria Peak. Experience a fusion of cuisines, diverse attractions, and unforgettable harbor views.',
  },

  {
    id: 2,
    imgSrc: img2,
    destTitle: 'Bangkok',
    location: 'Thailand',
    grade: 'CULTURAL VIBES',
    fees: '$400',
    description: `Known as the City of Angels, Bangkok is a vibrant hub of culture, street markets, and stunning temples like Wat Arun and Wat Phra Kaew. Famous for its bustling nightlife, flavorful street food, and river cruises, it’s a perfect mix of tradition and modernity.`,
  },


  {
    id: 3,
    imgSrc: img3,
    destTitle: 'London',
    location: 'United Kingdom',
    grade: 'CULTURAL RELAX',
    fees: '$800',
    description: `A city of timeless charm, London blends historical landmarks like the Tower of London and Buckingham Palace with modern marvels like the London Eye. Explore its world-class museums, vibrant markets, and iconic streetscapes that offer an unforgettable urban adventure.`,
  },

  {
    id: 4,
    imgSrc: img4,
    destTitle: 'Singapore',
    location: 'Singapore',
    grade: 'CULTURAL RELAX',
    fees: '$900',
    description: 'Known as the "Lion City," Singapore is a vibrant destination famous for its stunning skyline, lush green spaces, and modern attractions like Marina Bay Sands and Gardens by the Bay. A hub of cultural diversity, it offers world-class dining, shopping, and nightlife experiences.',
  },

  {
    id: 5,
    imgSrc: img5,
    destTitle: 'Paris',
    location: 'France',
    grade: 'CULTURAL RELAX',
    fees: '$900',
    description: `Known as the "City of Light," Paris is a dream destination with its iconic landmarks like the Eiffel Tower, Notre-Dame Cathedral, and Louvre Museum. A hub for art, fashion, and fine dining, it offers an unforgettable blend of history, romance, and modern charm.`,
  },

  {
    id: 6,
    imgSrc: img6,
    destTitle: 'Dubai',
    location: 'United Arab Emirates',
    grade: 'CULTURAL RELAX',
    fees: '$1200',
    description: `A dazzling metropolis known for its ultramodern architecture, luxury shopping, and vibrant nightlife. From the iconic Burj Khalifa to the serene desert safaris, Dubai offers a unique blend of futuristic charm and cultural heritage.`,
  },

  {
    id: 7,
    imgSrc: img7,
    destTitle: 'New Zealand',
    location: 'Oceania',
    grade: 'CULTURAL RELAX',
    fees: '$950',
    description: 'A land of breathtaking natural beauty, New Zealand is famous for its stunning landscapes, from majestic fjords and towering mountains to serene beaches. It’s a paradise for adventure seekers and those looking to connect with nature.',
  },

  {
    id: 8,
    imgSrc: img8,
    destTitle: 'Taj Mahal',
    location: 'India',
    grade: 'CULTURAL RELAX',
    fees: '$900',
    description: 'An immense mausoleum of white marble, built-in Agra by Mughal emperor Shah Jahan in memory of his wife Mumtaz, the monument is breathtakingly beautiful. This place is known for its luxurious stays and adventurous activities'
  },
  
  {
    id: 9,
    imgSrc: img9,
    destTitle: 'Bali Island',
    location: 'Indonesia',
    grade: 'CULTURAL RELAX',
    fees: '$500',
    description: 'Bali is an Indonesian Island and one of the best holiday destinations in the world, known for its forested volcanic mountains, iconic rice paddies, beautiful beaches, and coral reefs. It is a paradise for tourists seeking relaxation, adventure, and cultural exploration.'
  } 
]



const Main = () => {
  const navigate = useNavigate();
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])

  const handleDetailClick = (destination) => {
    setSelectedDestination(destination);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDestination(null);
  };

  const handleExplore = () => {
    closeModal();
    navigate('/explore');
  };

  return (
    <section className='main container section' id="destinations">
      <div className="secTitle">
        <h3 data-aos="fade-up" className="title">
          Most Visited destinations
        </h3>
      </div>

      <div className="secContent grid">
        {
          Data.map((destination) => {
            return(
              <div key={destination.id} data-aos="fade-up" className="singleDestination">
                <div className="imageDiv">
                  <img src={destination.imgSrc} alt={destination.destTitle} />
                </div>
                <div className="cardInfo">
                  <h4 className="destTitle">{destination.destTitle}</h4>
                  <span className="continent flex">
                    <HiOutlineLocationMarker className='icon'/>
                    <span className="name">{destination.location}</span>
                  </span>
                  <div className="fees flex">
                    <div className="grade">
                      <span>{destination.grade}<small>+1</small></span>
                    </div>
                    <div className="price">
                      <h5>{destination.fees}</h5>
                    </div>
                  </div>

                  <div className="desc">
                    <p>{destination.description}</p>
                  </div>

                  <button className='btn flex' onClick={() => handleDetailClick(destination)}>
                    DETAILS <HiOutlineClipboardCheck className='icon'/>
                  </button>
                </div>
              </div>
            )
          })
        }
      </div>

      {showModal && selectedDestination && (
        <div className="destination-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>×</button>
            
            <div className="modal-image">
              <img src={selectedDestination.imgSrc} alt={selectedDestination.destTitle} />
            </div>
            
            <div className="modal-info">
              <h2>{selectedDestination.destTitle}</h2>
              <div className="location">
                <HiOutlineLocationMarker className='icon'/>
                <span>{selectedDestination.location}</span>
              </div>
              
              <div className="details-grid">
                <div className="detail-item">
                  <h4>Grade</h4>
                  <p>{selectedDestination.grade}</p>
                </div>
                <div className="detail-item">
                  <h4>Price</h4>
                  <p>{selectedDestination.fees}</p>
                </div>
              </div>

              <div className="description">
                <h4>Description</h4>
                <p>{selectedDestination.description}</p>
              </div>

              <div className="additional-info">
                <h4>Highlights</h4>
                <ul>
                  <li>Best time to visit: March - October</li>
                  <li>Popular attractions nearby</li>
                  <li>Local cuisine and culture</li>
                  <li>Transportation options</li>
                </ul>
              </div>

              <button className="explore-btn btn flex" onClick={handleExplore}>
                Explore More <MdTravelExplore className='icon'/>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
    
export default Main