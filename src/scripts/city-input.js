import { saveCity, populateFavorites } from "./city-input__functions";

const input = document.querySelector('.city-input__field'),
      favorites= document.querySelector('.star');
let inputData;

input.addEventListener('change', e => {
  inputData = e.target.value;
});

favorites.addEventListener('click', () => {
  saveCity(inputData);
  populateFavorites();
});

export {inputData};