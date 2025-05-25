import React from 'react';
import './About.css';
import { FaPlane, FaHotel, FaMapMarkedAlt, FaUserTie } from 'react-icons/fa';
import { MdSupportAgent, MdPayment } from 'react-icons/md';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-header" data-aos="fade-down">
          <h1>About Us</h1>
          <p>Your Trusted Travel Partner </p>
        </div>

        <div className="about-content">
          <div className="mission-vision" data-aos="fade-up">
            <div className="mission">
              <h2>Our Mission</h2>
              <p>To provide exceptional travel experiences that create lasting memories for our clients through personalized service, expertise, and attention to detail.</p>
            </div>
            <div className="vision">
              <h2>Our Vision</h2>
              <p>To become the most trusted and innovative travel company, making dream vacations accessible to everyone while promoting sustainable tourism.</p>
            </div>
          </div>

          <div className="services-grid">
            <div className="service-card" data-aos="fade-up" data-aos-delay="100">
              <FaPlane className="service-icon"/>
              <h3>Flight Booking</h3>
              <p>Best deals on flights worldwide with flexible booking options.</p>
            </div>

            <div className="service-card" data-aos="fade-up" data-aos-delay="200">
              <FaHotel className="service-icon"/>
              <h3>Hotel Reservations</h3>
              <p>Luxury to budget accommodations at competitive prices.</p>
            </div>

            <div className="service-card" data-aos="fade-up" data-aos-delay="300">
              <FaMapMarkedAlt className="service-icon"/>
              <h3>Tour Packages</h3>
              <p>Customized tour packages for every type of traveler.</p>
            </div>

            <div className="service-card" data-aos="fade-up" data-aos-delay="400">
              <MdSupportAgent className="service-icon"/>
              <h3>24/7 Support</h3>
              <p>Round-the-clock assistance for all your travel needs.</p>
            </div>

            <div className="service-card" data-aos="fade-up" data-aos-delay="500">
              <MdPayment className="service-icon"/>
              <h3>Secure Payments</h3>
              <p>Safe and flexible payment options for your convenience.</p>
            </div>

            <div className="service-card" data-aos="fade-up" data-aos-delay="600">
              <FaUserTie className="service-icon"/>
              <h3>Expert Guidance</h3>
              <p>Professional travel experts to plan your perfect trip.</p>
            </div>
          </div>

          <div className="why-choose-us" data-aos="fade-up">
            <h2>Why Choose Us?</h2>
            <div className="features">
              <div className="feature">
                <h3>Experience</h3>
                <p>Over 3 years of excellence in travel services</p>
              </div>
              <div className="feature">
                <h3>Best Prices</h3>
                <p>Competitive prices and exclusive deals</p>
              </div>
              <div className="feature">
                <h3>Trusted Partners</h3>
                <p>Partnerships with leading travel providers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
