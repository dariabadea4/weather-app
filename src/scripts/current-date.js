fetch('https://worldtimeapi.org/api/ip')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const dateTime = data.datetime;
          const currentDate = new Date(dateTime);

          const day = currentDate.getDate();
          const weekday = currentDate.toLocaleString('en-US', { weekday: 'short' });
          const month = currentDate.toLocaleString('en-US', { month: 'long' });

          const hours = String(currentDate.getHours()).padStart(2, '0');
          const minutes = String(currentDate.getMinutes()).padStart(2, '0');
          const seconds = String(currentDate.getSeconds()).padStart(2, '0');
          const time = `${hours}:${minutes}:${seconds}`;

          document.querySelector('.day').textContent = day;
          document.querySelector('.weekday').textContent = weekday;
          document.querySelector('.month').textContent = month;
          document.querySelector('.time').textContent = time;

          const lat = data.latitude;
          const lon = data.longitude;

          return fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`);
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Sunrise-Sunset API response was not ok');
          }
          return response.json();
        })
        .then(sunData => {

          const sunrise = new Date(sunData.results.sunrise).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
          const sunset = new Date(sunData.results.sunset).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

          document.querySelector('.sunrise').textContent = ` ${sunrise}`;
          document.querySelector('.sunset').textContent = ` ${sunset}`;
        })
        .catch(error => {
          console.error('Error:', error);
          document.querySelector('.day').textContent = 'Error';
          document.querySelector('.weekday').textContent = 'Error';
          document.querySelector('.month').textContent = 'Error';
          document.querySelector('.time').textContent = 'Error';
          document.querySelector('.sunrise').textContent = 'Error';
          document.querySelector('.sunset').textContent = 'Error';
        });
