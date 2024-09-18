import { indexOf } from 'lodash';
import {
  populateFavorites,
  nextPage,
  prevPage,
  currentPage,
  getCity,
  setCity
} from './city-input__functions';
// import { inputData } from './city-input';

const nextBtn = document.querySelector('.viewed-city__next'),
  prevBtn = document.querySelector('.viewed-city__prev'),
  favContainer = document.querySelector('.viewed-city__favorites-container');

nextBtn.addEventListener('click', () => nextPage(currentPage));
prevBtn.addEventListener('click', () => prevPage(currentPage));
favContainer.addEventListener('click', e => {
  const selectedCity = e.target.parentNode.dataset.id,
        cities = getCity('orase')
  if (e.target.nodeName !== 'use' && e.target.nodeName !== 'svg') {
    return;
  }
        const newList = cities.filter(city=> city.id != selectedCity);
        setCity('orase', newList);
        populateFavorites();
});

populateFavorites();
