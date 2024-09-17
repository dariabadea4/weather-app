(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))g(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&g(o)}).observe(document,{childList:!0,subtree:!0});function y(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerPolicy&&(t.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?t.credentials="include":s.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function g(s){if(s.ep)return;s.ep=!0;const t=y(s);fetch(s.href,t)}})();document.querySelector(".viewed-city__favorites-container");document.querySelector(".viewed-city__next");document.querySelector(".viewed-city__prev");const S=(d,a)=>{try{const y=JSON.stringify(a);localStorage.setItem(d,y)}catch(y){console.log(y)}},$=d=>{try{const a=localStorage.getItem(d);return a===null?void 0:JSON.parse(a)}catch(a){console.log(a)}},I=d=>{const a=$("orase");a===void 0?S("orase",[d]):(a.push(d),S("orase",a))},B=document.querySelector(".city-input__field"),T=document.querySelector(".star");let b;B.addEventListener("change",d=>{b=d.target.value});T.addEventListener("click",()=>{I(b)});document.addEventListener("DOMContentLoaded",function(){const d="20ffa3f3195f1b01715c348123da79a3";async function a(){const t=document.getElementById("city-input").value;if(!t){alert("Please enter a city name");return}const o=`https://api.openweathermap.org/data/2.5/forecast?q=${t}&units=metric&appid=${d}`;try{const i=await fetch(o);if(!i.ok)throw new Error("City not found");const p=await i.json();y(p)}catch(i){alert(i.message)}}function y(t){const o=document.getElementById("weather-cards"),i=document.getElementById("more-info-container");o.innerHTML="",i.innerHTML="",t.list.filter(l=>l.dt_txt.includes("12:00:00")).forEach((l,w)=>{const n=document.createElement("div");n.classList.add("weather-card-initial");const u=new Date(l.dt_txt),f=u.toLocaleDateString("en-US",{weekday:"long"}),r=u.toLocaleDateString("en-GB",{day:"numeric",month:"short"}),c=l.weather[0].icon,e=Math.round(l.main.temp_min),m=Math.round(l.main.temp_max);n.innerHTML=`
      <div class="day-weather">${f}</div>
      <div class="date">${r}</div>
      <img src="http://openweathermap.org/img/wn/${c}.png" alt="${l.weather[0].description}">
      <div class="min-max">
        <div class="min">
          <div>min</div>
          <div class="degrees">${e}</div>
        </div>
        <div class="line"></div>
        <div class="max">
          <div>max</div>
          <div class="degrees">${m}</div>
        </div>
      </div>
      <button class="more-info-btn">more info</button>
    `,n.querySelector(".more-info-btn").addEventListener("click",()=>g(w,t)),o.appendChild(n)})}function g(t,o){const i=document.getElementById("more-info-container"),p=document.querySelectorAll(".weather-card-initial .day-weather");if(!i.classList.contains("hidden")&&i.getAttribute("data-index")==t){i.classList.add("hidden"),i.innerHTML="",p.forEach(e=>e.classList.remove("selected-day"));return}i.classList.remove("hidden"),i.setAttribute("data-index",t),i.innerHTML="";const l=o.list.slice(t*8,t*8+7);p.forEach(e=>e.classList.remove("selected-day")),document.querySelectorAll(".weather-card-initial")[t].querySelector(".day-weather").classList.add("selected-day");const n=document.createElement("div");n.classList.add("more-info-scrollable"),l.forEach(e=>{const m=document.createElement("div"),h=new Date(e.dt_txt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),v=Math.round(e.main.temp),L=e.weather[0].icon,E=e.rain&&(e.rain["3h"]||e.rain["1h"])||0,C=e.main.humidity,D=e.wind.speed;m.classList.add("hourly-info"),m.innerHTML=`
        <div class="weather-card">
            <div class="time">${h}</div>
            <img src="http://openweathermap.org/img/wn/${L}.png" alt="${e.weather[0].description}">
            <div class="degrees">${v}°C</div>
            <div class="weather-properties">
                <div class="property-details">
                    <p class="property-detail">${E} mm</p>
                </div>
                <div class="property-details">
                    <p class="property-detail">${C}%</p>
                </div>
                <div class="property-details">
                    <p class="property-detail">${D} m/s</p>
                </div>
            </div>
        </div>
      `,n.appendChild(m)});const u=document.getElementById("weather-cards"),f=document.getElementById("left-arrow"),r=document.getElementById("right-arrow");f.addEventListener("click",()=>{u.scrollBy({left:-300,behavior:"smooth"})}),r.addEventListener("click",()=>{u.scrollBy({left:300,behavior:"smooth"})}),i.appendChild(n);let c=0;n.addEventListener("touchstart",e=>{c=e.touches[0].clientX}),n.addEventListener("touchend",e=>{const m=e.changedTouches[0].clientX,h=c-m;h>50?n.scrollBy({left:300,behavior:"smooth"}):h<-50&&n.scrollBy({left:-300,behavior:"smooth"})})}let s;document.getElementById("city-input").addEventListener("input",function(){clearTimeout(s),s=setTimeout(a,500)})});
//# sourceMappingURL=index.js.map
