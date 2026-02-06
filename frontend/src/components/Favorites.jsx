import "../css/Favorites.css";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavorites(stored);
    } catch (err) {
      setFavorites([]);
    }
  }, []);

  // Listen for storage changes (other tabs) so the list stays in sync
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "favorites") {
        try {
          setFavorites(JSON.parse(e.newValue || "[]"));
        } catch {
          setFavorites([]);
        }
      }
    };
    window.addEventListener("storage", handler);
    // also listen for same-tab updates
    const localHandler = (e) => {
      if (e.type === "favoritesUpdated") {
        setFavorites(e.detail || []);
      }
    };
    window.addEventListener("favoritesUpdated", localHandler);

    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("favoritesUpdated", localHandler);
    };
  }, []);

  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No favorites yet</h2>
        <p>Click the heart on a movie to add it to your favorites.</p>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h2>Your Favorites</h2>
      <div className="movies-grid">
        {favorites.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;