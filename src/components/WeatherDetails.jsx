function formatLocalTime(timestamp, timezoneOffset = 0) {
  const localDate = new Date((timestamp + timezoneOffset) * 1000);
  return localDate.toLocaleTimeString("en", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "2-digit",
  });
}

function WeatherDetails({ weather }) {
  if (!weather) return null;

  const details = [
    { icon: "💧", label: "Humidity", value: `${weather.main.humidity}%` },
    { icon: "💨", label: "Wind speed", value: `${weather.wind.speed} m/s` },
    { icon: "◉", label: "Pressure", value: `${weather.main.pressure} hPa` },
    { icon: "◌", label: "Visibility", value: `${(weather.visibility / 1000).toFixed(1)} km` },
    { icon: "↗", label: "Sunrise", value: formatLocalTime(weather.sys.sunrise, weather.timezone) },
    { icon: "↘", label: "Sunset", value: formatLocalTime(weather.sys.sunset, weather.timezone) },
  ];

  return (
    <section className="details-section" aria-labelledby="details-title">
      <div className="details-heading">
        <h2 id="details-title">Today&apos;s details</h2>
        <span>More from your forecast</span>
      </div>
      <div className="info-grid">
        {details.map(({ icon, label, value }) => (
          <div className="info-box" key={label}>
            <span className="info-icon" aria-hidden="true">{icon}</span>
            <div>
              <h3>{label}</h3>
              <p>{value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WeatherDetails;
