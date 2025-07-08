import MovieCard from "../components/MovieCard";
import { useEffect, useState } from 'react'
import "../css/Home.css";
import { searchMovies,getPopularMovies } from "../services/api";


function Home() {

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, seterror] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadPopularMovies = async () => {
          try {
            const popularMovies = await getPopularMovies();  
            setMovies(popularMovies);
          } catch (err) {   
            console.error("Error fetching movies:")
            seterror("Failed to fetch movies",err);

          } finally { 
            setLoading(false);
          } 
        }
        loadPopularMovies();
      }, []); 

    

 

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