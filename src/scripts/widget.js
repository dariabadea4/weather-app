import { inputData } from './city-input';
document.addEventListener('DOMContentLoaded', () => {
  const apiKey = '20ffa3f3195f1b01715c348123da79a3';
  const cityInputElement = document.querySelector('#city-input');
  const locationElement = document.getElementById('current-location');
  const tempElement = document.getElementById('current-temp');
  const minTempElement = document.getElementById('min-temp');
  const maxTempElement = document.getElementById('max-temp');
  const weatherContainer = document.querySelector('.weather-info');
  const getWeather = async location => {
    if (!location) {
      alert('Te rog, introdu un nume de oraș.');
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Orașul nu a fost găsit.');
      }
      const data = await response.json();
      displayCurrentWeather(data);
    } catch (error) {}
  };
  const displayCurrentWeather = data => {
    const today = new Date().toISOString().split('T')[0];
    const dayData = data.list.find(item => item.dt_txt.startsWith(today));
    const {
      city: { country, name },
      list: [city, weather],
    } = data;
    const {
      main: { temp, temp_max, temp_min },
    } = city;
    const icon = data.list[0].weather[0].icon
    const weatherInfo = `<div class="current-weather">
                          <img class="about-icon" src="http://openweathermap.org/img/wn/${icon}.png"/>
                          <span class="location">${name}, ${country}</span>
                          <div class="temp-values">
                            <div class="current-temp">-3</div>
                            <div class="min-max__temp">
                              <div class="min-max__temps">
                                <div class="min-temp">min</div>
                                <div class="temps"> -2°</div>
                              </div>
                              <div class="line"></div>
                              <div class="min-max__temps">
                                <div class="max-temp">max</div>
                                <div class="temps"> 1°</div>
                              </div>
                            </div>
                          </div>
                        </div>`;
    weatherContainer.insertAdjacentHTML('afterbegin', weatherInfo);
    locationElement.textContent = `${data.city.name}, ${data.city.country}`;
    tempElement.textContent = `${Math.round(dayData.main.temp)}°C`;
    minTempElement.textContent = `${Math.round(dayData.main.temp_min)}°C`;
    maxTempElement.textContent = `${Math.round(dayData.main.temp_max)}°C`;
  };
  cityInputElement.addEventListener('change', () => {
    const location = cityInputElement.value.trim();
    if (location) {
      getWeather(location);
    }
  });
  const initialLocation = inputData?.trim() || 'Kyiv';
  getWeather(initialLocation);
});