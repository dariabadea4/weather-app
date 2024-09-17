import {
  populateFavorites,
  nextPage,
  prevPage,
  currentPage,
  getCity,
} from './city-input__functions';
// import { inputData } from './city-input';

const nextBtn = document.querySelector('.viewed-city__next'),
  prevBtn = document.querySelector('.viewed-city__prev'),
  favContainer = document.querySelector('.viewed-city__favorites-container');
  

nextBtn.addEventListener('click', () => nextPage(currentPage));
prevBtn.addEventListener('click', () => prevPage(currentPage));
favContainer.addEventListener('click', (e)=>{
   console.log(e.target.parentNode.innerText);
})


populateFavorites();
