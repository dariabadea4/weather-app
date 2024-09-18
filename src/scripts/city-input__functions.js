const favorites = document.querySelector('.viewed-city__favorites-container'),
  nextBtn = document.querySelector('.viewed-city__next'),
  prevBtn = document.querySelector('.viewed-city__prev');

const itemsOnPage = 4;
let currentPage = 0;

// store cities in local storage
const setCity = (key, value) => {
  try {
    const oras = JSON.stringify(value);
    localStorage.setItem(key, oras);
  } catch (err) {
    console.log(err);
  }
};

//   retrieve cities from local storage
const getCity = key => {
  try {
    const data = localStorage.getItem(key);
    return data === null ? undefined : JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

// create city object
const newCity = (cityName) => ({ 
  cityName :cityName, 
  id: Math.floor((Math.random()*200)+1)
});

// const checkLength =(arr)=>{
//   if(arr.length)
// }


const saveCity = value => {
  const cityObj = newCity(value)
  const currentState = getCity('orase');
  if (currentState === undefined) {
    setCity('orase', [cityObj]);
  } else {
    const cityObj = newCity(value)
    currentState.push(cityObj);
    setCity('orase', currentState);
  }
};

const shortWord = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
};

// populate favorites list

const populateFavorites = () => {
  const cities = getCity('orase');
  if (cities === undefined) {
    return;
  } else {
    if (cities.length < 4) {
      nextBtn.classList.add('hidden');
    }
    if (currentPage >= 1) {
      prevBtn.classList.remove('hidden');
    }
    favorites.innerHTML = '';
    const begin = currentPage * itemsOnPage,
      end = begin + itemsOnPage,
      pageItems = cities.slice(begin, end);

    pageItems.forEach(item => {
      const shortCity = shortWord(item.cityName, 7);
      const favorite = `<button class="viewed-city" type="button" value="${shortCity}"data-id="${item.id}">
                                  ${shortCity}
                                  <svg class="viewed-city__close-btn" data-id="${item.id}">
                                      <use href ="./city-input-icons.svg#icon-close"></use>
                                  </svg>
                              </button>`;
      favorites.insertAdjacentHTML('beforeend', favorite);
    });
  }
};

const nextPage = pageNumber => {
  const cities = getCity('orase');
  if ((pageNumber + 1) * itemsOnPage < cities.length) {
    currentPage++;
    populateFavorites();
  }
};

const prevPage = pageNumber => {
  if (pageNumber >= 1) {
    currentPage--;
    populateFavorites();
  }
};

export {
  setCity,
  getCity,
  saveCity,
  populateFavorites,
  nextPage,
  prevPage,
  currentPage,
};
