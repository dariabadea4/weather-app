import Chart from 'chart.js/auto';

// Initialize the weatherChart variable
let weatherChart;

// Function to update the chart with new data
function updateChart(data) {
  console.log('Updating the chart with the following data:', data);
  const ctx = document.querySelector('.weatherChart').getContext('2d');

  // Destroy existing chart if it exists
  if (weatherChart) {
    console.log('Destroying the existing chart...');
    weatherChart.destroy();
  }

  // Create a new chart with updated data
  try {
    weatherChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Temperature, C°',
          data: data.temps,
          borderColor: 'rgba(255, 107, 9, 1)',
          backgroundColor: 'rgba(255, 107, 9, 1)',
          borderWidth: 2
          
          },
          {
            label: 'Humidity, %',
            data: data.humidity,
            borderColor: 'rgba(9, 6, 235, 1)',
            backgroundColor: 'rgba(9, 6, 235, 1)',
            borderWidth: 2
          },
          {
            label: 'Wind Speed, m/s',
          data: data.windSpeed,
          borderColor: 'rgba(234, 154, 5, 1)',
          backgroundColor: 'rgba(234, 154, 5, 1)',
          borderWidth: 2
          },
          {
            label: 'Atmospheric Pressure, m/m',
            data: data.pressure,
            borderColor: 'rgba(6, 120, 6, 1)',
            backgroundColor: 'rgba(6, 120, 6, 1)',
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 15,
              boxHeight: 12,
              usePointStyle: false
            },
            onClick: (e, legendItem) => {
              const index = legendItem.datasetIndex;
              const dataset = weatherChart.data.datasets[index];
              dataset.hidden = !dataset.hidden;
              weatherChart.update();
            }
          }
        }
      }
    });
    console.log('The chart has been successfully updated.');
  } catch (error) {
    console.error('Error creating the chart:', error);
  }
}

// Function to fetch weather data from the API
async function fetchWeatherData(city) {
  console.log(`Fetching weather data for city: ${city}`);
  const apiKey = "20ffa3f3195f1b01715c348123da79a3";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Weather data retrieved successfully:', data);

    // Filter data for 12:00 to get daily data
    const filteredData = data.list.filter(item => item.dt_txt.includes('12:00:00'));
    console.log('Filtered data for 12:00:', filteredData);

    // Return processed data
    return {
      temps: filteredData.map(item => item.main.temp),
      humidity: filteredData.map(item => item.main.humidity),
      windSpeed: filteredData.map(item => item.wind.speed),
      pressure: filteredData.map(item => item.main.pressure),
      labels: filteredData.map(item => new Date(item.dt_txt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }))
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

// Initialize the chart when the city is selected
document.addEventListener('DOMContentLoaded', () => {
  console.log('Document has fully loaded.');

  // Set up city selection change listener
  document.getElementById('city-input').addEventListener('change', async function () {
    const selectedCity = this.value.trim();
    console.log(`Selected city: ${selectedCity}`);

    if (selectedCity) {
      try {
        // Fetch weather data from the API
        const weatherData = await fetchWeatherData(selectedCity);

        // Update the chart data
        updateChart(weatherData);

        // Show the "Show Chart" button if hidden
        const toggleButton = document.querySelector('.toggleChartBtn');
        toggleButton.style.display = 'block';
        toggleButton.textContent = 'Show Chart';

      } catch (error) {
        console.error('Error retrieving weather data in event listener:', error);
      }
    }
  });

  // Button to toggle showing/hiding the chart
  document.querySelector('.toggleChartBtn').addEventListener('click', function () {
    const chartContainer = document.querySelector('.chart-container');
    toggleChartVisibility(chartContainer, this);
  });

  // Ensure both the chart container and the button are hidden on page load
  document.querySelector('.chart-container').style.display = 'none';
  document.querySelector('.toggleChartBtn').style.display = 'none'; // Ensure the button is hidden on load
});

// Function to toggle the visibility of the chart container
function toggleChartVisibility(chartContainer, toggleButton) {
  if (chartContainer.style.display === 'none' || chartContainer.style.display === '') {
    chartContainer.style.display = 'block';
    toggleButton.textContent = 'Hide Chart';
  } else {
    chartContainer.style.display = 'none';
    toggleButton.textContent = 'Show Chart';
  }
}
