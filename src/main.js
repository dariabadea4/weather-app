
// import { updateChart } from '../js/chart'; // Import the function from chart.js

// // Example data
// const mockData = {
//   Kyiv: { temps: [-2, 1, -1, 2],humidity: [60, 55, 58, 62],windSpeed: [2, 3, 1, 4],pressure: [1008, 1200, 1119, 1007], labels: ["Feb 9", "Feb 10", "Feb 11", "Feb 12"] },
//   Paris: { temps: [5, 6, 4, 7], labels: ["Feb 9", "Feb 10", "Feb 11", "Feb 12"] }
// };

// // Event listener for city selection change
// document.getElementById('citySelect').addEventListener('change', function () {
//   const selectedCity = this.value;
//   const weatherData = mockData[selectedCity];
//   updateChart(weatherData, weatherData.labels);
// });

// // Toggle button logic
// document.querySelector('.toggleChartBtn').addEventListener('click', function () {
//   const chartContainer = document.querySelector('.chart-container');

//   if (chartContainer.style.display === 'none' || chartContainer.style.display === '') {
//     chartContainer.style.display = 'block';
//     this.textContent = 'Hide Chart';

//     const selectedCity = document.getElementById('citySelect').value;
//     const weatherData = mockData[selectedCity];
//     updateChart(weatherData, weatherData.labels);
//   } else {
//     chartContainer.style.display = 'none';
//     this.textContent = 'Show Chart';
//   }
// });

// // Initially hide the chart
// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelector('.chart-container').style.display = 'none';
// });

import './scripts/city-input'