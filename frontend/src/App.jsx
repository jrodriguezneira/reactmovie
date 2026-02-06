import { useState } from 'react'
import './css/App.css'
import Home from './pages/Home'
import Favorites from './components/Favorites'
import Details from './pages/Details'
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <div> 
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<Details />} />
        </Routes>
      </main>
      </div>
  );
}

export default App
