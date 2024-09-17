import Chart from 'chart.js/auto';

let weatherChart;

// Function to update the chart with new data
export function updateChart(data, labels) {
  const ctx = document.querySelector('.weatherChart').getContext('2d');

  // Destroy the previous chart if it exists
  if (weatherChart) {
    weatherChart.destroy();
  }

  // Create the new chart with updated data
  weatherChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels, // New labels (dates or times)
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
}