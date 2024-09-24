import { saveCity, populateFavorites } from "./city-input__functions";

const input = document.querySelector('.city-input__field'),
      favorites= document.querySelector('.star-icon'),
      favContainer = document.querySelector('.viewed-city__favorites-container');
let inputData;
    


// search
input.addEventListener('change', e => {
  inputData = e.target.value;
});

// search saved city
favContainer.addEventListener('click', e => {
  inputData = e.target.value
})

// save to favorites
favorites.addEventListener('click', () => {
  saveCity(inputData);
  populateFavorites();
});

export {inputData};