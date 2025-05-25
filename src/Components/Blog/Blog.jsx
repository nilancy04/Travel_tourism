import React from 'react';
import './Blog.css';
import { BsArrowRight } from 'react-icons/bs';
import { AiOutlineClockCircle, AiOutlineUser } from 'react-icons/ai';
import img1 from '../../Assests/img(1).jpg';
import img2 from '../../Assests/img(2).jpg';
import img3 from '../../Assests/img(3).jpg';
import img4 from '../../Assests/img(4).jpg';
import img5 from '../../Assests/img(5).jpg';
import img6 from '../../Assests/img(6).jpg';

const blogPosts = [
  {
    id: 1,
    image: img1,
    title: "Top 10 Beach Destinations in Asia",
    description: "Discover pristine beaches, crystal-clear waters, and hidden coastal gems across Asia. From Bali's vibrant shores to Thailand's secluded islands...",
    date: "March 15, 2024",
    author: "Sarah Chen",
    category: "Beach Travel"
  },
  {
    id: 2,
    image: img2,
    title: "Ultimate Mountain Trekking Guide",
    description: "Essential tips for mountain adventures: from gear selection to altitude acclimatization. Perfect for beginners planning their first trek...",
    date: "March 12, 2024",
    author: "Mike Anderson",
    category: "Adventure"
  },
  {
    id: 3,
    image: img3,
    title: "Local Street Food Adventures",
    description: "Navigate through Asia's vibrant street food scene. Discover must-try dishes, best food streets, and tips for safe street food exploration...",
    date: "March 10, 2024",
    author: "Lisa Wong",
    category: "Food & Culture"
  },
  {
    id: 4,
    image: img4,
    title: "Budget Travel: $50/Day in Southeast Asia",
    description: "Complete guide to traveling Southeast Asia on a budget. Learn about affordable accommodations, local transport, and money-saving tips...",
    date: "March 8, 2024",
    author: "Tom Bradley",
    category: "Budget Travel"
  },
  {
    id: 5,
    image: img5,
    title: "Photography Tips for Travelers",
    description: "Capture stunning travel moments with these photography tips. From landscape shots to portrait photography, enhance your travel photography skills...",
    date: "March 5, 2024",
    author: "Emma Davis",
    category: "Travel Tips"
  },
  {
    id: 6,
    image: img6,
    title: "Luxury Train Journeys in India",
    description: "Experience India's magnificent landscapes through its luxury train routes. From the Palace on Wheels to the Deccan Odyssey...",
    date: "March 1, 2024",
    author: "Raj Patel",
    category: "Luxury Travel"
  }
];

const Blog = () => {
  return (
    <section className="blog-section">
      <div className="blog-container">
        <div className="blog-header">
          <h2>Our Latest Blog Posts</h2>
          <p>Stay updated with travel tips, guides, and inspiring stories</p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-image">
                <img src={post.image} alt={post.title} />
                <span className="category">{post.category}</span>
              </div>
              
              <div className="blog-content">
                <div className="blog-info">
                  <span className="date">
                    <AiOutlineClockCircle className="icon"/>
                    {post.date}
                  </span>
                  <span className="author">
                    <AiOutlineUser className="icon"/>
                    {post.author}
                  </span>
                </div>

                <h3>{post.title}</h3>
                <p>{post.description}</p>

                <button className="read-more">
                  Read More <BsArrowRight className="icon"/>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog; 