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

const saveCity = value => {
  const currentState = getCity('orase');
  if (currentState === undefined) {
    setCity('orase', [value]);
  } else {
    currentState.push(value);
    setCity('orase', currentState);
  }
};

const populateFavorites = () => {
  const cities = getCity('orase');
  if (cities === undefined) {
    return;
  } else {
    const favorites = document.querySelector(
      '.viewed-city__favorites-container'
    );
    cities.forEach(city => {
      const favorite = `<button class="viewed-city" type="button">
                                <p>${city}
                                  <svg class="viewed-city__close-btn">
                                      <use href ="./city-input-icons.svg#icon-close"></use>
                                  </svg>
                                </p>
                              </button>`;
      favorites.insertAdjacentHTML('beforeend', favorite);
    });
    
  }
};

export { saveCity, populateFavorites };
