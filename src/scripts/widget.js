import { inputData } from "./city-input";
document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "20ffa3f3195f1b01715c348123da79a3";
  const cityInputElement = document.querySelector("#city-input");
  const locationElement = document.getElementById("current-location");
  const tempElement = document.getElementById("current-temp");
  const minTempElement = document.getElementById("min-temp");
  const maxTempElement = document.getElementById("max-temp");
  const getWeather = async (location) => {
    if (!location) {
      alert("Te rog, introdu un nume de oraș.");
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Orașul nu a fost găsit.");
      }
      const data = await response.json();
      displayCurrentWeather(data);
    } catch (error) {
      alert(error.message);
    }
  };
  const displayCurrentWeather = (data) => {
    const today = new Date().toISOString().split("T")[0];
    const dayData = data.list.find((item) => item.dt_txt.startsWith(today));
    if (dayData) {
      locationElement.textContent = `${data.city.name}, ${data.city.country}`;
      tempElement.textContent = `${Math.round(dayData.main.temp)}°C`;
      minTempElement.textContent = `${Math.round(dayData.main.temp_min)}°C`;
      maxTempElement.textContent = `${Math.round(dayData.main.temp_max)}°C`;
    } else {
      alert("Nu au fost găsite date pentru ziua curentă.");
    }
  };
  cityInputElement.addEventListener("change", () => {
    const location = cityInputElement.value.trim();
    if (location) {
      getWeather(location);
    }
  });
  const initialLocation = inputData?.trim() || "Kyiv";
  getWeather(initialLocation);
});
