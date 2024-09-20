const favorites = document.querySelector('.viewed-city__favorites-container'),
  nextBtn = document.querySelector('.viewed-city__next'),
  prevBtn = document.querySelector('.viewed-city__prev');

let itemsOnPage,
    currentPage = 0;

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

// check how many cities are in favorites
const checkLength = (arr, number)=>{
  switch (true) {
    case (arr.length > 4):
      nextBtn.classList.remove('hidden')
      break;
    default:
      nextBtn.classList.add('hidden')
      break;
  }
  switch (true) {
    case (number > 0):
      prevBtn.classList.remove('hidden')
      break;
  
    default:
      prevBtn.classList.add('hidden')
      break;
  }
}

// not actually getting the location
const getLocation=()=>{
  setTimeout(() => {
    alert("Couldn't get locaton, please try again later")
  }, 2000);
}


// check the size of the page
const checkPageSize=(number)=>{
  switch (true) {
    case (number < 500 && number > 400):
      itemsOnPage = 3;
      break;
    case (number < 400):
      itemsOnPage = 2;
      break;
    default:
      itemsOnPage = 4;
      break;
  }
}

// create city object
const newCity = (cityName) => ({ 
  cityName :cityName, 
  id: Math.floor((Math.random()*200)+1)
});

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
  if(!str){
    return
  }
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
    checkPageSize(window.innerWidth)
    checkLength(cities, currentPage)
    favorites.innerHTML = '';
    const begin = currentPage * itemsOnPage,
      end = begin + itemsOnPage,
      pageItems = cities.slice(begin, end);

    pageItems.forEach(item => {
      const shortCity = shortWord(item.cityName, 6);
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
    console.log(currentPage);
  }
};

export {
  setCity,
  getCity,
  saveCity,
  populateFavorites,
  nextPage,
  prevPage,
  getLocation,
  currentPage,
};
