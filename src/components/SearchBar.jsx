import { useState } from "react";

function SearchBar({ onSearch, loading = false }) {
  const [city, setCity] = useState("");

  function handleSearch(event) {
    event.preventDefault();
    if (!city.trim() || loading) return;
    onSearch(city.trim());
  }

  return (
    <form className="search-box" onSubmit={handleSearch} role="search">
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        type="text"
        aria-label="Search for a city"
        placeholder="Search a city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        autoComplete="off"
        maxLength={80}
      />
      <button type="submit" disabled={loading || !city.trim()}>
        {loading ? "Loading…" : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;