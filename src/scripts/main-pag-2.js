import './city-input.js';
import './input-cards-api-logic.js';
import './city-input__favorites.js';


if (document.URL.includes('pag-2')) {
    document.querySelector('#five-days-btn').classList.add('selected')
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitude: " + position.coords.longitude);
  }
