import { inputData } from "./city-input";

document.addEventListener('DOMContentLoaded', function() {
  const apiKey = "20ffa3f3195f1b01715c348123da79a3";

  // Funcția pentru a obține datele meteo
  async function getWeather(location) {
    if (!location) {
      alert("Please enter a city name");
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;

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
      <div class="day-weather">${dayOfWeek}</div>
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

// Funcția pentru a afișa sau ascunde secțiunea "More Info"
  function toggleDetails(index, data) {
    const moreInfoContainer = document.getElementById('more-info-container');
    const allDays = document.querySelectorAll('.weather-card-initial .day-weather');

    // Verificăm dacă secțiunea este deja afișată
    if (!moreInfoContainer.classList.contains('hidden') && moreInfoContainer.getAttribute('data-index') == index) {
      moreInfoContainer.classList.add('hidden');
      moreInfoContainer.innerHTML = ''; // Golim conținutul
      allDays.forEach(day => day.classList.remove('selected-day')); // Eliminăm clasa 'selected-day'
      return;
    }

    moreInfoContainer.classList.remove('hidden');
    moreInfoContainer.setAttribute('data-index', index);

    // Golim secțiunea înainte de a adăuga conținut nou
    moreInfoContainer.innerHTML = '';

    const dayData = data.list.slice(index * 8, index * 8 + 7); // Extragem doar primele 7 ore

    allDays.forEach(day => day.classList.remove('selected-day'));
    const selectedDay = document.querySelectorAll('.weather-card-initial')[index].querySelector('.day-weather');
    selectedDay.classList.add('selected-day');

    // Cream un container scrollable pentru cardurile orare
    const scrollableContainer = document.createElement('div');
    scrollableContainer.classList.add('more-info-scrollable');

    // Afișăm cardurile orare
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
      scrollableContainer.appendChild(hourDiv);
    });

    // Funcția pentru derularea containerului cu carduri
    const weatherCardsContainer = document.getElementById('weather-cards');
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');

    leftArrow.addEventListener('click', () => {
      weatherCardsContainer.scrollBy({ left: -300, behavior: 'smooth' });
    });

    rightArrow.addEventListener('click', () => {
      weatherCardsContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });

    // Adăugăm containerul scrollable la secțiunea more-info
    moreInfoContainer.appendChild(scrollableContainer);

    // Logica pentru swipe pe dispozitive mobile
    let startX = 0;

    scrollableContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    scrollableContainer.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const deltaX = startX - endX;

      if (deltaX > 50) {
        scrollableContainer.scrollBy({ left: 300, behavior: 'smooth' }); // Scroll la dreapta
      } else if (deltaX < -50) {
        scrollableContainer.scrollBy({ left: -300, behavior: 'smooth' }); // Scroll la stânga
      }
    });
  }

  // let debounceTimer;
  // document.getElementById('city-input').addEventListener('input', function() {
  //   clearTimeout(debounceTimer);
  //   debounceTimer = setTimeout(getWeather, 500);
  // });
  // document.getElementById('get-weather-btn').addEventListener('click', getWeather);
  document.querySelector('#city-input').addEventListener('change',()=>{
    getWeather(inputData)
  });
  document.querySelector('.viewed-city__favorites-container').addEventListener('click',(e)=>{
    if(e.target.nodeName != 'BUTTON'){
      return
    }
    getWeather(inputData)
  });
});

