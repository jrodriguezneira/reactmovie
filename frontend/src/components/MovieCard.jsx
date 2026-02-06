import "../css/MovieCard.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
            setIsFavorite(stored.some((m) => m.id === movie.id));
        } catch (e) {
            setIsFavorite(false);
        }
    }, [movie.id]);

    function onFavoriteClick(e) {
        e.stopPropagation();
        try {
            const key = "favorites";
            const stored = JSON.parse(localStorage.getItem(key) || "[]");
            const exists = stored.some((m) => m.id === movie.id);
            let next;
            if (exists) {
                next = stored.filter((m) => m.id !== movie.id);
            } else {
                next = [movie, ...stored];
            }
            localStorage.setItem(key, JSON.stringify(next));
            // notify other components in the same tab
            try {
                window.dispatchEvent(new CustomEvent("favoritesUpdated", { detail: next }));
            } catch (e) {
                // ignore if CustomEvent isn't supported
            }
            setIsFavorite(!exists);
        } catch (err) {
            console.error("Failed to update favorites", err);
        }
    }

    return (
        <div className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)} style={{cursor: 'pointer'}}>
            <div className="movie-poster">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
                <div className="movie-overlay">
                    <button
                        className={`favorite-button${isFavorite ? " active" : ""}`}
                        onClick={onFavoriteClick}
                        aria-pressed={isFavorite}
                        aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
                    >
                        {isFavorite ? "\u2764" : "\u2661"}
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
            </div>
        </div>
    );
}

export default MovieCard
