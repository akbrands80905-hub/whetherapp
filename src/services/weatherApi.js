const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeather(city, { signal } = {}) {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("Weather service is not configured. Add VITE_WEATHER_API_KEY to your .env file.");
  }

  const params = new URLSearchParams({
    q: city.trim(),
    appid: apiKey,
    units: "metric",
  });
  const response = await fetch(`${BASE_URL}?${params}`, { signal });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("The weather service returned an unreadable response.");
  }

  if (!response.ok) {
    if (response.status === 404) throw new Error("We couldn't find that city. Check the spelling and try again.");
    if (response.status === 401) throw new Error("The weather API key is invalid. Check your .env configuration.");
    if (response.status === 429) throw new Error("Too many requests. Please wait a moment and try again.");
    throw new Error(data?.message || "The weather service is temporarily unavailable.");
  }

  return data;
}