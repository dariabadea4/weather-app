(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))f(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const t of s.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&f(t)}).observe(document,{childList:!0,subtree:!0});function u(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function f(e){if(e.ep)return;e.ep=!0;const s=u(e);fetch(e.href,s)}})();document.querySelector(".viewed-city__favorites-container");document.querySelector(".viewed-city__next");document.querySelector(".viewed-city__prev");const C=(o,a)=>{try{const u=JSON.stringify(a);localStorage.setItem(o,u)}catch(u){console.log(u)}},$=o=>{try{const a=localStorage.getItem(o);return a===null?void 0:JSON.parse(a)}catch(a){console.log(a)}},b=o=>{const a=$("orase");a===void 0?C("orase",[o]):(a.push(o),C("orase",a))},q=document.querySelector(".city-input__field"),I=document.querySelector(".star");let S;q.addEventListener("change",o=>{S=o.target.value});I.addEventListener("click",()=>{b(S)});document.addEventListener("DOMContentLoaded",function(){const o="20ffa3f3195f1b01715c348123da79a3";async function a(e){if(!e){alert("Please enter a city name");return}const s=`https://api.openweathermap.org/data/2.5/forecast?q=${e}&units=metric&appid=${o}`;try{const t=await fetch(s);if(!t.ok)throw new Error("City not found");const p=await t.json();u(p)}catch(t){alert(t.message)}}function u(e){const s=document.getElementById("weather-cards"),t=document.getElementById("more-info-container");s.innerHTML="",t.innerHTML="",e.list.filter(d=>d.dt_txt.includes("12:00:00")).forEach((d,g)=>{const n=document.createElement("div");n.classList.add("weather-card-initial");const m=new Date(d.dt_txt),v=m.toLocaleDateString("en-US",{weekday:"long"}),r=m.toLocaleDateString("en-GB",{day:"numeric",month:"short"}),c=d.weather[0].icon,i=Math.round(d.main.temp_min),l=Math.round(d.main.temp_max);n.innerHTML=`
      <div class="day-weather">${v}</div>
      <div class="date">${r}</div>
      <img src="http://openweathermap.org/img/wn/${c}.png" alt="${d.weather[0].description}">
      <div class="min-max">
        <div class="min">
          <div>min</div>
          <div class="degrees">${i}</div>
        </div>
        <div class="line"></div>
        <div class="max">
          <div>max</div>
          <div class="degrees">${l}</div>
        </div>
      </div>
      <button class="more-info-btn">more info</button>
    `,n.querySelector(".more-info-btn").addEventListener("click",()=>f(g,e)),s.appendChild(n)})}function f(e,s){const t=document.getElementById("more-info-container"),p=document.querySelectorAll(".weather-card-initial .day-weather");if(!t.classList.contains("hidden")&&t.getAttribute("data-index")==e){t.classList.add("hidden"),t.innerHTML="",p.forEach(i=>i.classList.remove("selected-day"));return}t.classList.remove("hidden"),t.setAttribute("data-index",e),t.innerHTML="";const d=s.list.slice(e*8,e*8+7);p.forEach(i=>i.classList.remove("selected-day")),document.querySelectorAll(".weather-card-initial")[e].querySelector(".day-weather").classList.add("selected-day");const n=document.createElement("div");n.classList.add("more-info-scrollable"),d.forEach(i=>{const l=document.createElement("div"),h=new Date(i.dt_txt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),y=Math.round(i.main.temp),w=i.weather[0].icon,L=i.rain&&(i.rain["3h"]||i.rain["1h"])||0,E=i.main.humidity,D=i.wind.speed;l.classList.add("hourly-info"),l.innerHTML=`
        <div class="weather-card">
            <div class="time">${h}</div>
            <img src="http://openweathermap.org/img/wn/${w}.png" alt="${i.weather[0].description}">
            <div class="degrees">${y}°C</div>
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
                    <p class="property-detail">${D} m/s</p>
                </div>
            </div>
        </div>
      `,n.appendChild(l)});const m=document.getElementById("weather-cards"),v=document.getElementById("left-arrow"),r=document.getElementById("right-arrow");v.addEventListener("click",()=>{m.scrollBy({left:-300,behavior:"smooth"})}),r.addEventListener("click",()=>{m.scrollBy({left:300,behavior:"smooth"})}),t.appendChild(n);let c=0;n.addEventListener("touchstart",i=>{c=i.touches[0].clientX}),n.addEventListener("touchend",i=>{const l=i.changedTouches[0].clientX,h=c-l;h>50?n.scrollBy({left:300,behavior:"smooth"}):h<-50&&n.scrollBy({left:-300,behavior:"smooth"})})}document.querySelector("#city-input").addEventListener("change",()=>{a(S)})});
//# sourceMappingURL=index.js.map
