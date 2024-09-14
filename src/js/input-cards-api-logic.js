document.addEventListener('DOMContentLoaded', function() {
  const apiKey = "20ffa3f3195f1b01715c348123da79a3";

  // Funcția pentru a obține datele meteo
  async function getWeather() {
    const city = document.getElementById('city-input').value;
    if (!city) {
      alert("Please enter a city name");
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      displayWeather(data);
    } catch (error) {
      alert(error.message);
    }
  }

  // Funcția pentru a afișa datele meteo pe zile
  function displayWeather(data) {
    const weatherCardsContainer = document.getElementById('weather-cards');
    const moreInfoContainer = document.getElementById('more-info-container');

    weatherCardsContainer.innerHTML = '';
    moreInfoContainer.innerHTML = '';

    const filteredData = data.list.filter(item => item.dt_txt.includes('12:00:00'));

    // Parcurgem fiecare zi și creăm carduri pentru vreme
    filteredData.forEach((day, index) => {
      const weatherCard = document.createElement('div');
      weatherCard.classList.add('weather-card-initial');

      const date = new Date(day.dt_txt);
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
      const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      const icon = day.weather[0].icon;
      const min = Math.round(day.main.temp_min);
      const max = Math.round(day.main.temp_max);

      weatherCard.innerHTML = `
      <div class="day">${dayOfWeek}</div>
      <div class="date">${formattedDate}</div>
      <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${day.weather[0].description}">
      <div class="min-max">
        <div class="min">
          <div>min</div>
          <div class="degrees">${min}</div>
        </div>
        <div class="line"></div>
        <div class="max">
          <div>max</div>
          <div class="degrees">${max}</div>
        </div>
      </div>
      <button class="more-info-btn">more info</button>
    `;

      weatherCard.querySelector('.more-info-btn').addEventListener('click', () => toggleDetails(index, data));

      weatherCardsContainer.appendChild(weatherCard);
    });
  }

  // Funcția pentru a afișa sau ascunde secțiunea "More Info"
  function toggleDetails(index, data) {
    const moreInfoContainer = document.getElementById('more-info-container');
    const allDays = document.querySelectorAll('.weather-card-initial .day');

    // Verificăm dacă secțiunea este deja afișată
    if (!moreInfoContainer.classList.contains('hidden') && moreInfoContainer.getAttribute('data-index') == index) {
      // Dacă este afișată și corespunde cu ziua selectată, o ascundem
      moreInfoContainer.classList.add('hidden');
      moreInfoContainer.innerHTML = ''; // Golim conținutul

      // Eliminăm clasa 'selected-day' de la toate zilele
      allDays.forEach(day => day.classList.remove('selected-day'));
      return; // Ieșim din funcție
    }

    // Dacă este ascunsă sau este pentru o altă zi, afișăm conținutul nou
    moreInfoContainer.classList.remove('hidden');
    moreInfoContainer.setAttribute('data-index', index); // Setăm un atribut pentru a reține ziua selectată

    // Golim secțiunea înainte de a adăuga conținut nou
    moreInfoContainer.innerHTML = '';

    // Extragem datele pe ore pentru ziua selectată, limitat la 7 carduri
    const dayData = data.list.slice(index * 8, index * 8 + 7);

    // Resetăm toate zilele pentru a elimina clasa 'selected-day'
    allDays.forEach(day => day.classList.remove('selected-day'));

    // Adăugăm clasa 'selected-day' doar la ziua selectată
    const selectedDay = document.querySelectorAll('.weather-card-initial')[index].querySelector('.day');
    selectedDay.classList.add('selected-day');

    dayData.forEach(hour => {
      const hourDiv = document.createElement('div');
      const time = new Date(hour.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const temp = Math.round(hour.main.temp);
      const icon = hour.weather[0].icon;
      const precip = hour.rain ? hour.rain['3h'] || hour.rain['1h'] || 0 : 0;
      const humidity = hour.main.humidity;
      const wind = hour.wind.speed;

      hourDiv.classList.add('hourly-info');
      hourDiv.innerHTML = `
      <div class="weather-card">
        <div class="time">${time}</div>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${hour.weather[0].description}">
        <div class="degrees">${temp}°C</div>
        <div class="weather-properties">
          <div class="property-details">
            <img src="/001-percip.png" alt="">
            <p class="property-detail">${precip} mm</p>
          </div>
          <div class="property-details">
            <img src="/002-humidity.png" alt="">
            <p class="property-detail">${humidity}%</p>
          </div>
          <div class="property-details">
            <img src="/003-wind.png" alt="">
            <p class="property-detail">${wind} m/s</p>
          </div>
        </div>
      </div>
    `;

      moreInfoContainer.appendChild(hourDiv);
    });
  }
  document.getElementById('get-weather-btn').addEventListener('click', getWeather);
});