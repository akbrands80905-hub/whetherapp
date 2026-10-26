function WeatherCard({ weather }) {
  if (!weather) {
    return (
      <div className="weather-card empty">
        <div className="empty-mark" aria-hidden="true">⌕</div>
        <h3>Search for a city to get started</h3>
        <p>Your current conditions and local forecast will appear here.</p>
      </div>
    );
  }

  const condition = weather.weather?.[0]?.main?.toLowerCase() || "default";
  const icons = {
    clear: "☀️",
    clouds: "☁️",
    rain: "🌧",
    drizzle: "🌦",
    thunderstorm: "⛈",
    snow: "❄️",
    mist: "🌫",
    haze: "🌫",
    fog: "🌫",
    smoke: "🌫",
    dust: "🌫",
    sand: "🌫",
    squall: "💨",
    tornado: "🌪",
  };
  const icon = icons[condition] || "🌤️";
  const localDate = new Date((weather.dt + weather.timezone) * 1000);
  const localTime = localDate.toLocaleTimeString("en", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "2-digit",
  });
  const countryCode = weather.sys?.country?.toLowerCase();

  return (
    <div className="weather-card">
      <div className="location">
        <h2>{weather.name}{countryCode ? `, ${weather.sys.country}` : ""}</h2>
        {countryCode && (
          <img
            src={`https://flagcdn.com/w40/${countryCode}.png`}
            alt={`${weather.sys.country} flag`}
            className="country-flag"
          />
        )}
      </div>
      <p className="location-meta">Local time {localTime}</p>
      <div className="weather-main">
        <div className="weather-icon">
          <span role="img" aria-label={weather.weather?.[0]?.description || condition}>{icon}</span>
        </div>
        <div>
          <div className="temperature">{Math.round(weather.main.temp)}°</div>
          <p className="condition">{weather.weather?.[0]?.description || condition}</p>
        </div>
      </div>
      <div className="temp-info">
        <div>
          <span>Feels like</span>
          <h4>{Math.round(weather.main.feels_like)}°C</h4>
        </div>
        <div>
          <span>Humidity</span>
          <h4>{weather.main.humidity}%</h4>
        </div>
        <div>
          <span>Wind</span>
          <h4>{weather.wind.speed} m/s</h4>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
