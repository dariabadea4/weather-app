
import {
  populateFavorites,
  nextPage,
  prevPage,
  currentPage,
  getCity,
  getLocation,
  setCity,
} from './city-input__functions';

const nextBtn = document.querySelector('.viewed-city__next'),
  prevBtn = document.querySelector('.viewed-city__prev'),
  favContainer = document.querySelector('.viewed-city__favorites-container');

window.addEventListener('resize', () => {
  populateFavorites();
});

nextBtn.addEventListener('click', () => {
  nextPage(currentPage);
});

prevBtn.addEventListener('click', () => {
  prevPage(currentPage);
});

// Remove from favorites
favContainer.addEventListener('click', e => {
  const selectedCity = e.target.parentNode.dataset.id,
    cities = getCity('orase');
  if (e.target.nodeName !== 'use' && e.target.nodeName !== 'svg') {
    return;
  }
  const newList = cities.filter(city => city.id != selectedCity);
  setCity('orase', newList);
  populateFavorites();
});

document.querySelector('.location-icon').addEventListener('click', () => {
  const answer = confirm('Would you like the browser to access your location?')
  answer ? getLocation() : alert('Please select a city');
});

populateFavorites();
