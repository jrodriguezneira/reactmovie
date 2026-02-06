import "../css/Details.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieVideos } from "../services/api";

function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await getMovieDetails(id);
        if (mounted) setMovie(data);
        try {
          const vids = await getMovieVideos(id);
          // prefer official YouTube trailer
          const trailer = vids.find(
            (v) => v.type === "Trailer" && v.site === "YouTube"
          );
          const yt = trailer || vids.find((v) => v.site === "YouTube");
          if (mounted) setTrailerKey(yt ? yt.key : null);
        } catch (e) {
          if (mounted) setTrailerKey(null);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load movie details");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="details-empty">Loading...</div>;
  if (error || !movie) return <div className="details-empty">{error || "Movie not found"}</div>;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <div className="details-page">
      <div
        className="details-hero"
        style={backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : {}}
      >
        <div className="details-hero-overlay">
          <div className="details-inner">
            <div className="details-poster">
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ""}
                alt={movie.title}
              />
            </div>
            <div className="details-info">
              <h1 className="details-title">
                {movie.title}
                {movie.release_date ? (
                  <span className="details-year"> ({new Date(movie.release_date).getFullYear()})</span>
                ) : null}
              </h1>
              <div className="details-meta">
                {movie.release_date && <span>{movie.release_date}</span>}
                {movie.runtime && <span> • {movie.runtime} min</span>}
                {movie.genres && movie.genres.length > 0 && (
                  <span> • {movie.genres.map((g) => g.name).join(", ")}</span>
                )}
              </div>
              <p className="details-overview">{movie.overview}</p>
              <div className="details-extra">
                <div className="rating">Rating: {movie.vote_average} / 10</div>
                <div className="status">Status: {movie.status}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {trailerKey && (
        <div className="details-trailer">
          <h3>Trailer</h3>
          <div className="video-wrapper">
            <iframe
              title="Trailer"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
