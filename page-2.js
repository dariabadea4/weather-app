import{i as E}from"./assets/city-input__favorites-DJSUhGZf.js";import{C as D}from"./assets/vendor-De2ec26M.js";document.addEventListener("DOMContentLoaded",function(){const r="20ffa3f3195f1b01715c348123da79a3";async function d(a){if(!a){alert("Please enter a city name");return}const s=`https://api.openweathermap.org/data/2.5/forecast?q=${a}&units=metric&appid=${r}`;try{const e=await fetch(s);if(!e.ok)throw new Error("City not found");const u=await e.json();p(u)}catch(e){alert(e.message)}}function p(a){const s=document.getElementById("weather-cards"),e=document.getElementById("more-info-container");s.innerHTML="",e.innerHTML="",a.list.filter(l=>l.dt_txt.includes("12:00:00")).forEach((l,w)=>{const i=document.createElement("div");i.classList.add("weather-card-initial");const h=new Date(l.dt_txt),v=h.toLocaleDateString("en-US",{weekday:"long"}),n=h.toLocaleDateString("en-GB",{day:"numeric",month:"short"}),o=l.weather[0].icon,t=Math.round(l.main.temp_min),m=Math.round(l.main.temp_max);i.innerHTML=`
      <div class="day-weather">${v}</div>
      <div class="date">${n}</div>
      <img src="http://openweathermap.org/img/wn/${o}.png" alt="${l.weather[0].description}">
      <div class="min-max">
        <div class="min">
          <div>min</div>
          <div class="degrees">${t}</div>
        </div>
        <div class="line"></div>
        <div class="max">
          <div>max</div>
          <div class="degrees">${m}</div>
        </div>
      </div>
      <button class="more-info-btn">more info</button>
    `,i.querySelector(".more-info-btn").addEventListener("click",()=>c(w,a)),s.appendChild(i)})}function c(a,s){const e=document.getElementById("more-info-container"),u=document.querySelectorAll(".weather-card-initial .day-weather");if(!e.classList.contains("hidden")&&e.getAttribute("data-index")==a){e.classList.add("hidden"),e.innerHTML="",u.forEach(t=>t.classList.remove("selected-day"));return}e.classList.remove("hidden"),e.setAttribute("data-index",a),e.innerHTML="";const l=s.list.slice(a*8,a*8+7);u.forEach(t=>t.classList.remove("selected-day")),document.querySelectorAll(".weather-card-initial")[a].querySelector(".day-weather").classList.add("selected-day");const i=document.createElement("div");i.classList.add("more-info-scrollable"),l.forEach(t=>{const m=document.createElement("div"),y=new Date(t.dt_txt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),g=Math.round(t.main.temp),b=t.weather[0].icon,L=t.rain&&(t.rain["3h"]||t.rain["1h"])||0,C=t.main.humidity,S=t.wind.speed;m.classList.add("hourly-info"),m.innerHTML=`
        <div class="weather-card">
            <div class="time">${y}</div>
            <img src="http://openweathermap.org/img/wn/${b}.png" alt="${t.weather[0].description}">
            <div class="degrees">${g}°C</div>
            <div class="weather-properties">
                <div class="property-details">
                    <img src="/001-percip.png" alt="">
                    <p class="property-detail">${L} mm</p>
                </div>
                <div class="property-details">
                   <img src="/002-humidity.png" alt="">
                    <p class="property-detail">${C}%</p>
                </div>
                <div class="property-details">
                    <img src="/003-wind.png" alt="">
                    <p class="property-detail">${S} m/s</p>
                </div>
            </div>
        </div>
      `,i.appendChild(m)});const h=document.getElementById("weather-cards"),v=document.getElementById("left-arrow"),n=document.getElementById("right-arrow");v.addEventListener("click",()=>{h.scrollBy({left:-300,behavior:"smooth"})}),n.addEventListener("click",()=>{h.scrollBy({left:300,behavior:"smooth"})}),e.appendChild(i);let o=0;i.addEventListener("touchstart",t=>{o=t.touches[0].clientX}),i.addEventListener("touchend",t=>{const m=t.changedTouches[0].clientX,y=o-m;y>50?i.scrollBy({left:300,behavior:"smooth"}):y<-50&&i.scrollBy({left:-300,behavior:"smooth"})})}document.querySelector("#city-input").addEventListener("change",()=>{d(E)}),document.querySelector(".viewed-city__favorites-container").addEventListener("click",a=>{a.target.nodeName=="BUTTON"&&d(E)})});let f;function $(r){console.log("Updating the chart with the following data:",r);const d=document.querySelector(".weatherChart").getContext("2d");f&&(console.log("Destroying the existing chart..."),f.destroy());try{f=new D(d,{type:"line",data:{labels:r.labels,datasets:[{label:"Temperature, C°",data:r.temps,borderColor:"rgba(255, 107, 9, 1)",backgroundColor:"rgba(255, 107, 9, 1)",borderWidth:2},{label:"Humidity, %",data:r.humidity,borderColor:"rgba(9, 6, 235, 1)",backgroundColor:"rgba(9, 6, 235, 1)",borderWidth:2},{label:"Wind Speed, m/s",data:r.windSpeed,borderColor:"rgba(234, 154, 5, 1)",backgroundColor:"rgba(234, 154, 5, 1)",borderWidth:2},{label:"Atmospheric Pressure, m/m",data:r.pressure,borderColor:"rgba(6, 120, 6, 1)",backgroundColor:"rgba(6, 120, 6, 1)",borderWidth:2}]},options:{responsive:!0,scales:{y:{beginAtZero:!0}},plugins:{legend:{display:!0,position:"top",labels:{boxWidth:15,boxHeight:12,usePointStyle:!1},onClick:(p,c)=>{const a=c.datasetIndex,s=f.data.datasets[a];s.hidden=!s.hidden,f.update()}}}}}),console.log("The chart has been successfully updated.")}catch(p){console.error("Error creating the chart:",p)}}async function x(r){console.log(`Fetching weather data for city: ${r}`);const p=`https://api.openweathermap.org/data/2.5/forecast?q=${r}&units=metric&appid=20ffa3f3195f1b01715c348123da79a3`;try{const c=await fetch(p);if(!c.ok)throw new Error(`Error fetching data: ${c.statusText}`);const a=await c.json();console.log("Weather data retrieved successfully:",a);const s=a.list.filter(e=>e.dt_txt.includes("12:00:00"));return console.log("Filtered data for 12:00:",s),{temps:s.map(e=>e.main.temp),humidity:s.map(e=>e.main.humidity),windSpeed:s.map(e=>e.wind.speed),pressure:s.map(e=>e.main.pressure),labels:s.map(e=>new Date(e.dt_txt).toLocaleDateString("en-GB",{day:"numeric",month:"short"}))}}catch(c){throw console.error("Error fetching weather data:",c),c}}document.addEventListener("DOMContentLoaded",()=>{console.log("Document has fully loaded."),document.getElementById("city-input").addEventListener("change",async function(){const r=this.value.trim();if(console.log(`Selected city: ${r}`),r)try{const d=await x(r);$(d);const p=document.querySelector(".toggleChartBtn");p.style.display="block",p.textContent="Show Chart"}catch(d){console.error("Error retrieving weather data in event listener:",d)}}),document.querySelector(".toggleChartBtn").addEventListener("click",function(){const r=document.querySelector(".chart-container");B(r,this)}),document.querySelector(".chart-container").style.display="none",document.querySelector(".toggleChartBtn").style.display="none"});function B(r,d){r.style.display==="none"||r.style.display===""?(r.style.display="block",d.textContent="Hide Chart"):(r.style.display="none",d.textContent="Show Chart")}document.URL.includes("pag-2")&&document.querySelector("#five-days-btn").classList.add("selected");
//# sourceMappingURL=page-2.js.map
