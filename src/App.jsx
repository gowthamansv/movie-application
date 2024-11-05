import React, { useEffect, useState } from 'react';
import { fetchMovieById, fetchMoviesBySearch } from './Components/api';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [type, setType] = useState('');
  const [year, setYear] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMoviesBySearch(query, type, page, year);
      if (data.Response === "True") {
        setMovies(data.Search);
        setFilteredMovies(data.Search);
        setError(null);
      } else {
        setMovies([]);
        setFilteredMovies([]);
        setError(data.Error);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching movies.");
    }
    setLoading(false);
  };

  const fetchMovieDetails = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMovieById(id);
      setMovie(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching movies.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (query) {
      fetchMovies();
    }
  }, [query, type, page, year]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMovies();
  };


  return (
    <div className="app">
      <h1>OMDB Movie Search</h1>

      {/* Search */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {/* Movie List */}
      <div className="movie-list">
        {filteredMovies.map((movie) => (
          <div
            key={movie.imdbID}
            onClick={() => fetchMovieDetails(movie.imdbID)}
            className="movie-item"
          >
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>

      {/* Page */}
      {movies.length > 0 && (
        <div className="pagination">
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page}</span>
          <button onClick={() => setPage((prev) => prev + 1)}>
            Next
          </button>
        </div>
      )}

      {/* Detail movie */}
      {movie && (
        <div className="movie-details">
          <h2>{movie.Title} ({movie.Year})</h2>
          <img src={movie.Poster} alt={movie.Title} />
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Cast:</strong> {movie.Actors}</p>
          <p><strong>Ratings:</strong> {movie.Ratings ? movie.Ratings.map(r => `${r.Source}: ${r.Value}`).join(', ') : 'N/A'}</p>
          <button onClick={() => setMovie(null)}>Back to search results</button>
        </div>
      )}
    </div>
  );
}

export default App;
