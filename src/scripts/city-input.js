let inputData;

const setCity = (key, value) => {
  try {
    const oras = JSON.stringify(value);
    localStorage.setItem(key, oras);
  } catch (err) {
    console.log(err);
  }
};

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

document.querySelector('.city-input__field').addEventListener('change', e => {
  inputData = e.target.value;
});

document.querySelector('.star').addEventListener('click', () => {
  saveCity(inputData);
});

export default {inputData, getCity};