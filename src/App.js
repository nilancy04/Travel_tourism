import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Main from './Components/Main/Main'
import Footer from './Components/Footer/Footer'
import About from './Components/About/About'
import Contact from './Components/Contact/Contact'
import Planner from './Components/Planner/Planner'
import Explore from './Components/Explore/Explore'

// ScrollToTop component to handle scroll on route change
const ScrollToTop = () => {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar/>
      <Routes>
        <Route path="/" element={
          <>
            <Home/>
            <Main/>
            <Footer/>
          </>
        }/>
        <Route path="/destinations" element={<Main/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/planner" element={<Planner/>}/>
        <Route path="/explore" element={<Explore/>}/>
      </Routes>
    </BrowserRouter>
  )
}
    
export default App 