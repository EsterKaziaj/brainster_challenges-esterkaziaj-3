// Database of weather data for various cities
const weatherData = [
  { city: 'New York', temperature: 16, humidity: 70, windSpeed: 7 },
  { city: 'London', temperature: 12, humidity: 80, windSpeed: 5 },
  { city: 'Tokyo', temperature: 22, humidity: 60, windSpeed: 4 },
  { city: 'Sydney', temperature: 25, humidity: 50, windSpeed: 6 },
  { city: 'Paris', temperature: 15, humidity: 65, windSpeed: 5 },
  { city: 'Berlin', temperature: 14, humidity: 60, windSpeed: 6 },
  { city: 'Moscow', temperature: 5, humidity: 75, windSpeed: 10 },
  { city: 'Toronto', temperature: 17, humidity: 55, windSpeed: 8 },
  { city: 'Rio de Janeiro', temperature: 26, humidity: 85, windSpeed: 7 },
  { city: 'Beijing', temperature: 20, humidity: 40, windSpeed: 3 },
  { city: 'Mumbai', temperature: 30, humidity: 70, windSpeed: 5 },
  { city: 'Los Angeles', temperature: 19, humidity: 65, windSpeed: 4 },
  { city: 'Cape Town', temperature: 18, humidity: 60, windSpeed: 6 },
  { city: 'Rome', temperature: 21, humidity: 55, windSpeed: 3 },
  { city: 'Bangkok', temperature: 33, humidity: 75, windSpeed: 2 },
  { city: 'Istanbul', temperature: 20, humidity: 60, windSpeed: 4 },
  { city: 'Lagos', temperature: 29, humidity: 80, windSpeed: 3 },
  { city: 'Buenos Aires', temperature: 23, humidity: 70, windSpeed: 5 },
  { city: 'Chicago', temperature: 10, humidity: 65, windSpeed: 7 },
  { city: 'Shanghai', temperature: 19, humidity: 80, windSpeed: 6 },
];

// Fetch weather data for a specific city from the database
function fetchWeather(city) {
  return weatherData.find(item => item.city.toLowerCase() === city.toLowerCase());
}

// Display the current weather details for a given city in the DOM
function displayCurrentWeather(data) {
  const weatherDisplay = document.getElementById('weatherDisplay');
  weatherDisplay.innerHTML = `
    <h3>Current Weather for ${data.city}</h3>
    <p>Temperature: ${data.temperature}°C</p>
    <p>Humidity: ${data.humidity}%</p>
    <p>Wind Speed: ${data.windSpeed} m/s</p>
  `;
}

// Fetch a 5-day weather forecast for a specific city
function fetchForecast(city) {
  const currentWeather = fetchWeather(city);
  const forecast = [];
  for (let i = 1; i <= 5; i++) {
    forecast.push({
      day: `Day ${i}`,
      temperature: currentWeather.temperature + i,
    });
  }
  return forecast;
}

// Display the 5-day weather forecast for a given city in the DOM
function displayForecast(data, city) {
  const weatherDisplay = document.getElementById('weatherDisplay');
  let forecastHTML = `<h3>5-Day Forecast for ${city}</h3>`;
  data.forEach(day => {
    forecastHTML += `<p>${day.day}: Temperature: ${day.temperature}°C</p>`;
  });
  weatherDisplay.innerHTML += forecastHTML;
}

// Handle the search functionality, triggered by the search button click
function searchWeather() {
  const cityInput = document.getElementById('cityName').value;
  const currentWeather = fetchWeather(cityInput);
  if (currentWeather) {
    displayCurrentWeather(currentWeather);
    const forecast = fetchForecast(cityInput);
    displayForecast(forecast, cityInput);
    saveRecentSearch(cityInput);
    displayRecentSearches();
  } else {
    alert('City not found');
  }
}

// Save the recent searches in local storage
function saveRecentSearch(city) {
  let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
  if (!recentSearches.includes(city)) {
    recentSearches.push(city);
  }
  localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
}

// Display the recent searches from local storage in the DOM
function displayRecentSearches() {
  const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
  const recentSearchesDiv = document.getElementById('recentSearches');
  recentSearchesDiv.innerHTML = '';
  recentSearches.forEach(city => {
    const cityElement = document.createElement('div');
    cityElement.textContent = city;
    cityElement.className = 'recent-search';
    cityElement.onclick = () => {
      document.getElementById('cityName').value = city;
      searchWeather();
    };
    recentSearchesDiv.appendChild(cityElement);
  });
}

// Initialize the display of recent searches when the page loads
window.onload = function() {
  displayRecentSearches();
};
