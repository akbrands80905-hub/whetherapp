import { useCallback, useEffect, useRef, useState } from "react";

import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import DateTime from "./components/DateTime";

import { getWeather } from "./services/weatherApi";

import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lightMode, setLightMode] = useState(() => localStorage.getItem("weather:theme") === "light");
  const requestRef = useRef(null);

  const handleSearch = useCallback(async (city) => {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setLoading(true);
    setError("");

    try {
      const data = await getWeather(city, { signal: controller.signal });
      setWeatherData(data);
      localStorage.setItem("weather:lastCity", city.trim());
    } catch (err) {
      if (err.name !== "AbortError") setError(err.message || "Unable to fetch weather data.");
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null;
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    requestRef.current = controller;

    async function loadInitialWeather() {
      try {
        const city = localStorage.getItem("weather:lastCity") || "London";
        const data = await getWeather(city, { signal: controller.signal });
        if (!controller.signal.aborted) setWeatherData(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Unable to fetch weather data.");
      } finally {
        if (!controller.signal.aborted) {
          requestRef.current = null;
          setLoading(false);
        }
      }
    }

    loadInitialWeather();
    return () => controller.abort();
  }, []);

  function toggleTheme() {
    const nextMode = !lightMode;
    localStorage.setItem("weather:theme", nextMode ? "light" : "dark");
    setLightMode(nextMode);
  }

  const weatherType =
    weatherData?.weather?.[0]?.main?.toLowerCase() || "default";

  return (
    <div className={`app ${weatherType} ${lightMode ? "light" : ""}`}>
      <main className="container">
        <header className="topbar">
          <div className="brand"><span className="brand-mark" aria-hidden="true">☀</span> Skycast</div>
          <button className="theme-btn" onClick={toggleTheme} aria-label={`Switch to ${lightMode ? "dark" : "light"} theme`}>
            <span aria-hidden="true">{lightMode ? "☾" : "☼"}</span> {lightMode ? "Dark mode" : "Light mode"}
          </button>
        </header>

        <section className="hero" aria-label="Find weather">
          <p className="eyebrow">Your daily weather</p>
          <h1>Weather, at a glance.</h1>
          <p className="subtitle">Current conditions and local details, wherever you are.</p>
          <SearchBar onSearch={handleSearch} loading={loading} />
          <div className="quick-row" aria-label="Popular cities">
            <span>Try:</span>
            {["New York", "London", "Tokyo"].map((city) => (
              <button className="quick-city" key={city} onClick={() => handleSearch(city)} disabled={loading}>{city}</button>
            ))}
          </div>
        </section>
        <DateTime />

        {loading && <div className="spinner" role="status" aria-label="Loading weather" />}
        {error && <p className="error" role="alert">{error}</p>}

        {!loading && !weatherData && !error && <WeatherCard />}
        {weatherData && <>
          <WeatherCard weather={weatherData} />
          <WeatherDetails weather={weatherData} />
        </>}

        <footer className="footer">
          <p>Weather data by OpenWeather</p>
          <p>Skycast · Forecast with clarity</p>
        </footer>
      </main>
    </div>
  );
}

export default App;