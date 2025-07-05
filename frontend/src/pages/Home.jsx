import MovieCard from "../components/MovieCard";
import { useState } from 'react'
import "../css/Home.css";


function Home() {

    const [searchQuery, setSearchQuery] = useState("");

  const movies = [
    {
      title: "Inception",
      release_date: "2010-07-16",
      url: "https://image.tmdb.org/t/p/w500/8h58n2b1c4d3a5e6f7d8e9f0g1h2i3j4.jpg"
    },
    {
      title: "Inception",
      release_date: "2010-07-16",
      url: "https://image.tmdb.org/t/p/w500/8h58n2b1c4d3a5e6f7d8e9f0g1h2i3j4.jpg"
    },
    {
      title: "Inception",
      release_date: "2010-07-16",
      url: "https://image.tmdb.org/t/p/w500/8h58n2b1c4d3a5e6f7d8e9f0g1h2i3j4.jpg"
    },
    {
      title: "The Dark Knight",
      release_date: "2008-07-18",
      url: "https://image.tmdb.org/t/p/w500/8h58n2b1c4d3a5e6f7d8e9f0g1h2i3j4.jpg"
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    alert(searchQuery)
  };

  return (
    <div className="home">
         <form onSubmit={handleSearch} className="search-form" >
            <input type="text" placeholder="Search for movies..." className="search-input" value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value) }
            />
            <button type="submit" className="search-button">Search</button>
         </form>
    <div className="movies-grid">
      {movies.map((movie, index) => 
        movie.title.toLowerCase().startsWith(searchQuery) && (<MovieCard movie={movie} key={index} />
        
      ))}
      </div>
    </div>
  );
}

export default Home;