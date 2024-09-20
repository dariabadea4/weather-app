import{i as L}from"./assets/city-input__favorites-DJSUhGZf.js";document.addEventListener("DOMContentLoaded",function(){const E="20ffa3f3195f1b01715c348123da79a3";async function g(n){if(!n){alert("Please enter a city name");return}const o=`https://api.openweathermap.org/data/2.5/forecast?q=${n}&units=metric&appid=${E}`;try{const t=await fetch(o);if(!t.ok)throw new Error("City not found");const l=await t.json();C(l)}catch(t){alert(t.message)}}function C(n){const o=document.getElementById("weather-cards"),t=document.getElementById("more-info-container");o.innerHTML="",t.innerHTML="",n.list.filter(d=>d.dt_txt.includes("12:00:00")).forEach((d,v)=>{const i=document.createElement("div");i.classList.add("weather-card-initial");const c=new Date(d.dt_txt),h=c.toLocaleDateString("en-US",{weekday:"long"}),a=c.toLocaleDateString("en-GB",{day:"numeric",month:"short"}),s=d.weather[0].icon,e=Math.round(d.main.temp_min),r=Math.round(d.main.temp_max);i.innerHTML=`
      <div class="day-weather">${h}</div>
      <div class="date">${a}</div>
      <img src="http://openweathermap.org/img/wn/${s}.png" alt="${d.weather[0].description}">
      <div class="min-max">
        <div class="min">
          <div>min</div>
          <div class="degrees">${e}</div>
        </div>
        <div class="line"></div>
        <div class="max">
          <div>max</div>
          <div class="degrees">${r}</div>
        </div>
      </div>
      <button class="more-info-btn">more info</button>
    `,i.querySelector(".more-info-btn").addEventListener("click",()=>w(v,n)),o.appendChild(i)})}function w(n,o){const t=document.getElementById("more-info-container"),l=document.querySelectorAll(".weather-card-initial .day-weather");if(!t.classList.contains("hidden")&&t.getAttribute("data-index")==n){t.classList.add("hidden"),t.innerHTML="",l.forEach(e=>e.classList.remove("selected-day"));return}t.classList.remove("hidden"),t.setAttribute("data-index",n),t.innerHTML="";const d=o.list.slice(n*8,n*8+7);l.forEach(e=>e.classList.remove("selected-day")),document.querySelectorAll(".weather-card-initial")[n].querySelector(".day-weather").classList.add("selected-day");const i=document.createElement("div");i.classList.add("more-info-scrollable"),d.forEach(e=>{const r=document.createElement("div"),m=new Date(e.dt_txt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),p=Math.round(e.main.temp),y=e.weather[0].icon,u=e.rain&&(e.rain["3h"]||e.rain["1h"])||0,f=e.main.humidity,D=e.wind.speed;r.classList.add("hourly-info"),r.innerHTML=`
        <div class="weather-card">
            <div class="time">${m}</div>
            <img src="http://openweathermap.org/img/wn/${y}.png" alt="${e.weather[0].description}">
            <div class="degrees">${p}°C</div>
            <div class="weather-properties">
                <div class="property-details">
                    <img src="/001-percip.png" alt="">
                    <p class="property-detail">${u} mm</p>
                </div>
                <div class="property-details">
                   <img src="/002-humidity.png" alt="">
                    <p class="property-detail">${f}%</p>
                </div>
                <div class="property-details">
                    <img src="/003-wind.png" alt="">
                    <p class="property-detail">${D} m/s</p>
                </div>
            </div>
        </div>
      `,i.appendChild(r)});const c=document.getElementById("weather-cards"),h=document.getElementById("left-arrow"),a=document.getElementById("right-arrow");h.addEventListener("click",()=>{c.scrollBy({left:-300,behavior:"smooth"})}),a.addEventListener("click",()=>{c.scrollBy({left:300,behavior:"smooth"})}),t.appendChild(i);let s=0;i.addEventListener("touchstart",e=>{s=e.touches[0].clientX}),i.addEventListener("touchend",e=>{const r=e.changedTouches[0].clientX,m=s-r;m>50?i.scrollBy({left:300,behavior:"smooth"}):m<-50&&i.scrollBy({left:-300,behavior:"smooth"})})}document.querySelector("#city-input").addEventListener("change",()=>{g(L)}),document.querySelector(".viewed-city__favorites-container").addEventListener("click",n=>{n.target.nodeName=="BUTTON"&&g(L)})});document.URL.includes("pag-2")&&document.querySelector("#five-days-btn").classList.add("selected");
//# sourceMappingURL=pag-2.js.map
