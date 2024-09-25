import{i as w}from"./assets/city-input__favorites-DJSUhGZf.js";import{C as D}from"./assets/vendor-De2ec26M.js";document.addEventListener("DOMContentLoaded",function(){const t="20ffa3f3195f1b01715c348123da79a3";async function o(a){if(!a){alert("Please enter a city name");return}const n=`https://api.openweathermap.org/data/2.5/forecast?q=${a}&units=metric&appid=${t}`;try{const e=await fetch(n);if(!e.ok)throw new Error("City not found");const m=await e.json();d(m)}catch(e){alert(e.message)}}function d(a){const n=document.getElementById("weather-cards"),e=document.getElementById("more-info-container");n.innerHTML="",e.innerHTML="",a.list.filter(c=>c.dt_txt.includes("12:00:00")).forEach((c,v)=>{const i=document.createElement("div");i.classList.add("weather-card-initial");const h=new Date(c.dt_txt),g=h.toLocaleDateString("en-US",{weekday:"long"}),f=h.toLocaleDateString("en-GB",{day:"numeric",month:"short"}),p=c.weather[0].icon,r=Math.round(c.main.temp_min),l=Math.round(c.main.temp_max);i.innerHTML=`
      <div class="day-weather">${g}</div>
      <div class="date">${f}</div>
      <img src="http://openweathermap.org/img/wn/${p}.png" alt="${c.weather[0].description}">
      <div class="min-max">
        <div class="min">
          <div>min</div>
          <div class="degrees">${r}</div>
        </div>
        <div class="line"></div>
        <div class="max">
          <div>max</div>
          <div class="degrees">${l}</div>
        </div>
      </div>
      <button class="more-info-btn">more info</button>
    `,i.querySelector(".more-info-btn").addEventListener("click",()=>s(v,a)),n.appendChild(i)})}function s(a,n){const e=document.getElementById("more-info-container"),m=document.querySelectorAll(".weather-card-initial .day-weather");if(!e.classList.contains("hidden")&&e.getAttribute("data-index")==a){e.classList.add("hidden"),e.innerHTML="",m.forEach(r=>r.classList.remove("selected-day"));return}e.classList.remove("hidden"),e.setAttribute("data-index",a),e.innerHTML="";const c=n.list.slice(a*8,a*8+7);m.forEach(r=>r.classList.remove("selected-day")),document.querySelectorAll(".weather-card-initial")[a].querySelector(".day-weather").classList.add("selected-day");const i=document.createElement("div");i.classList.add("more-info-scrollable"),c.forEach(r=>{const l=document.createElement("div"),y=new Date(r.dt_txt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),b=Math.round(r.main.temp),C=r.weather[0].icon,L=r.rain&&(r.rain["3h"]||r.rain["1h"])||0,E=r.main.humidity,S=r.wind.speed;l.classList.add("hourly-info"),l.innerHTML=`
        <div class="weather-card">
            <div class="time">${y}</div>
            <img src="http://openweathermap.org/img/wn/${C}.png" alt="${r.weather[0].description}">
            <div class="degrees">${b}°C</div>
            <div class="weather-properties">
                <div class="property-details">
                    <img src="/001-percip.png" alt="">
                    <p class="property-detail">${L} mm</p>
                </div>
                <div class="property-details">
                   <img src="/002-humidity.png" alt="">
                    <p class="property-detail">${E}%</p>
                </div>
                <div class="property-details">
                    <img src="/003-wind.png" alt="">
                    <p class="property-detail">${S} m/s</p>
                </div>
            </div>
        </div>
      `,i.appendChild(l)});const h=document.getElementById("weather-cards"),g=document.getElementById("left-arrow"),f=document.getElementById("right-arrow");g.addEventListener("click",()=>{h.scrollBy({left:-300,behavior:"smooth"})}),f.addEventListener("click",()=>{h.scrollBy({left:300,behavior:"smooth"})}),e.appendChild(i);let p=0;i.addEventListener("touchstart",r=>{p=r.touches[0].clientX}),i.addEventListener("touchend",r=>{const l=r.changedTouches[0].clientX,y=p-l;y>50?i.scrollBy({left:300,behavior:"smooth"}):y<-50&&i.scrollBy({left:-300,behavior:"smooth"})})}document.querySelector("#city-input").addEventListener("change",()=>{o(w),document.querySelector(".weather-layout").classList.remove("hidden")}),document.querySelector(".viewed-city__favorites-container").addEventListener("click",a=>{a.target.nodeName=="BUTTON"&&o(w)}),document.querySelector(".weather-layout").addEventListener("click",a=>{a.target.nodeName=="BUTTON"&&document.querySelector(".button-location").classList.remove("page-2__position-1")})});let u;function $(t){console.log("Updating the chart with the following data:",t);const o=document.querySelector(".weatherChart").getContext("2d");u&&(console.log("Destroying the existing chart..."),u.destroy());try{u=new D(o,{type:"line",data:{labels:t.labels,datasets:[{label:"Temperature, C°",data:t.temps,borderColor:"rgba(255, 107, 9, 1)",backgroundColor:"rgba(255, 107, 9, 1)",borderWidth:2},{label:"Humidity, %",data:t.humidity,borderColor:"rgba(9, 6, 235, 1)",backgroundColor:"rgba(9, 6, 235, 1)",borderWidth:2},{label:"Wind Speed, m/s",data:t.windSpeed,borderColor:"rgba(234, 154, 5, 1)",backgroundColor:"rgba(234, 154, 5, 1)",borderWidth:2},{label:"Atmospheric Pressure, m/m",data:t.pressure,borderColor:"rgba(6, 120, 6, 1)",backgroundColor:"rgba(6, 120, 6, 1)",borderWidth:2}]},options:{responsive:!0,scales:{y:{beginAtZero:!0}},plugins:{legend:{display:!0,position:"top",labels:{boxWidth:15,boxHeight:12,usePointStyle:!1},onClick:(d,s)=>{const a=s.datasetIndex,n=u.data.datasets[a];n.hidden=!n.hidden,u.update()}}}}}),console.log("The chart has been successfully updated.")}catch(d){console.error("Error creating the chart:",d)}}async function x(t){console.log(`Fetching weather data for city: ${t}`);const d=`https://api.openweathermap.org/data/2.5/forecast?q=${t}&units=metric&appid=20ffa3f3195f1b01715c348123da79a3`;try{const s=await fetch(d);if(!s.ok)throw new Error(`Error fetching data: ${s.statusText}`);const a=await s.json();console.log("Weather data retrieved successfully:",a);const n=a.list.filter(e=>e.dt_txt.includes("12:00:00"));return console.log("Filtered data for 12:00:",n),{temps:n.map(e=>e.main.temp),humidity:n.map(e=>e.main.humidity),windSpeed:n.map(e=>e.wind.speed),pressure:n.map(e=>e.main.pressure),labels:n.map(e=>new Date(e.dt_txt).toLocaleDateString("en-GB",{day:"numeric",month:"short"}))}}catch(s){throw console.error("Error fetching weather data:",s),s}}document.addEventListener("DOMContentLoaded",()=>{console.log("Document has fully loaded."),document.getElementById("city-input").addEventListener("change",async function(){const t=this.value.trim();if(console.log(`Selected city: ${t}`),t)try{const o=await x(t);$(o);const d=document.querySelector(".toggleChartBtn");d.style.display="block",d.textContent="Show Chart"}catch(o){console.error("Error retrieving weather data in event listener:",o)}}),document.querySelector(".toggleChartBtn").addEventListener("click",function(){const t=document.querySelector(".chart-container");q(t,this)}),document.querySelector(".chart-container").style.display="none",document.querySelector(".toggleChartBtn").style.display="none"});function q(t,o){t.style.display==="none"||t.style.display===""?(t.style.display="block",o.textContent="Hide Chart"):(t.style.display="none",o.textContent="Show Chart")}document.URL.includes("page-2")&&document.querySelector("#five-days-btn").classList.add("selected");
//# sourceMappingURL=page-2.js.map
