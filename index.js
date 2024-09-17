(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))g(a);new MutationObserver(a=>{for(const t of a)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&g(o)}).observe(document,{childList:!0,subtree:!0});function h(a){const t={};return a.integrity&&(t.integrity=a.integrity),a.referrerPolicy&&(t.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?t.credentials="include":a.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function g(a){if(a.ep)return;a.ep=!0;const t=h(a);fetch(a.href,t)}})();let D;const b=(d,r)=>{try{const h=JSON.stringify(r);localStorage.setItem(d,h)}catch(h){console.log(h)}},$=d=>{try{const r=localStorage.getItem(d);return r===null?void 0:JSON.parse(r)}catch(r){console.log(r)}},I=d=>{const r=$("orase");r===void 0?b("orase",[d]):(r.push(d),b("orase",r))};document.querySelector(".city-input__field").addEventListener("change",d=>{D=d.target.value});document.querySelector(".star").addEventListener("click",()=>{I(D)});document.addEventListener("DOMContentLoaded",function(){const d="20ffa3f3195f1b01715c348123da79a3";async function r(){const t=document.getElementById("city-input").value;if(!t){alert("Please enter a city name");return}const o=`https://api.openweathermap.org/data/2.5/forecast?q=${t}&units=metric&appid=${d}`;try{const i=await fetch(o);if(!i.ok)throw new Error("City not found");const u=await i.json();h(u)}catch(i){alert(i.message)}}function h(t){const o=document.getElementById("weather-cards"),i=document.getElementById("more-info-container");o.innerHTML="",i.innerHTML="",t.list.filter(l=>l.dt_txt.includes("12:00:00")).forEach((l,w)=>{const n=document.createElement("div");n.classList.add("weather-card-initial");const p=new Date(l.dt_txt),v=p.toLocaleDateString("en-US",{weekday:"long"}),s=p.toLocaleDateString("en-GB",{day:"numeric",month:"short"}),c=l.weather[0].icon,e=Math.round(l.main.temp_min),m=Math.round(l.main.temp_max);n.innerHTML=`
      <div class="day-weather">${v}</div>
      <div class="date">${s}</div>
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
    `,n.querySelector(".more-info-btn").addEventListener("click",()=>g(w,t)),o.appendChild(n)})}function g(t,o){const i=document.getElementById("more-info-container"),u=document.querySelectorAll(".weather-card-initial .day-weather");if(!i.classList.contains("hidden")&&i.getAttribute("data-index")==t){i.classList.add("hidden"),i.innerHTML="",u.forEach(e=>e.classList.remove("selected-day"));return}i.classList.remove("hidden"),i.setAttribute("data-index",t),i.innerHTML="";const l=o.list.slice(t*8,t*8+7);u.forEach(e=>e.classList.remove("selected-day")),document.querySelectorAll(".weather-card-initial")[t].querySelector(".day-weather").classList.add("selected-day");const n=document.createElement("div");n.classList.add("more-info-scrollable"),l.forEach(e=>{const m=document.createElement("div"),y=new Date(e.dt_txt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),f=Math.round(e.main.temp),L=e.weather[0].icon,E=e.rain&&(e.rain["3h"]||e.rain["1h"])||0,C=e.main.humidity,S=e.wind.speed;m.classList.add("hourly-info"),m.innerHTML=`
        <div class="weather-card">
            <div class="time">${y}</div>
            <img src="http://openweathermap.org/img/wn/${L}.png" alt="${e.weather[0].description}">
            <div class="degrees">${f}°C</div>
            <div class="weather-properties">
                <div class="property-details">
                    <p class="property-detail">${E} mm</p>
                </div>
                <div class="property-details">
                    <p class="property-detail">${C}%</p>
                </div>
                <div class="property-details">
                    <p class="property-detail">${S} m/s</p>
                </div>
            </div>
        </div>
      `,n.appendChild(m)});const p=document.getElementById("weather-cards"),v=document.getElementById("left-arrow"),s=document.getElementById("right-arrow");v.addEventListener("click",()=>{p.scrollBy({left:-300,behavior:"smooth"})}),s.addEventListener("click",()=>{p.scrollBy({left:300,behavior:"smooth"})}),i.appendChild(n);let c=0;n.addEventListener("touchstart",e=>{c=e.touches[0].clientX}),n.addEventListener("touchend",e=>{const m=e.changedTouches[0].clientX,y=c-m;y>50?n.scrollBy({left:300,behavior:"smooth"}):y<-50&&n.scrollBy({left:-300,behavior:"smooth"})})}let a;document.getElementById("city-input").addEventListener("input",function(){clearTimeout(a),a=setTimeout(r,500)})});
//# sourceMappingURL=index.js.map
