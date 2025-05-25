import React, {useState} from 'react'
import './navbar.css'
import {MdOutlineTravelExplore} from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [active, setActive] = useState('navBar')
    const navigate = useNavigate()
    
    const handleHomeClick = (e) => {
        e.preventDefault()
        navigate('/')
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const handleDestinationClick = (e) => {
        if (window.location.pathname === '/') {
            e.preventDefault()
            const element = document.getElementById('destinations')
            if (element) {
                element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                })
            }
        }
    }

  return (
    <section className='navBarSection'>
      <header className="header">
        <div className="logoDiv">
           <Link to="/" onClick={handleHomeClick} className="logo">
            <h1>
              <MdOutlineTravelExplore className="icon"/>
              <span className="logoText">Travel</span>
            </h1>
           </Link>
        </div>

        <div className="navigationDiv">
            <ul className="navList">
                <li>
                    <Link to="/" onClick={handleHomeClick}>Home</Link>
                </li>

                <li>
                    <Link to="/destinations" onClick={handleDestinationClick}>Destinations</Link>
                </li>

                <li>
                    <Link to="/about">About</Link>
                </li>

                <li>
                    <Link to="/planner">Travel Planner</Link>
                </li>

                <li>
                    <Link to="/contact">Contact</Link>
                </li>

                <button className="btn">
                    <Link to="/explore">Explore Now</Link>
                </button>
            </ul>
        </div>
      </header>
    </section>
  )
}
    
export default Navbar 