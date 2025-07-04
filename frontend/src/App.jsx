import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MovieCard from './components/MovieCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MovieCard movie={{
      title: "Inception",
      release_date: "2010-07-16",
      url: "https://image.tmdb.org/t/p/w500/8h58n2b1c4d3a5e6f7d8e9f0g1h2i3j4.jpg"
    }} />

    <MovieCard movie={{
      title: "terminator",
      release_date: "2010-07-16",
      url: "https://image.tmdb.org/t/p/w500/8h58n2b1c4d3a5e6f7d8e9f0g1h2i3j4.jpg"
    }} />
     
    </>
  )
}

export default App
