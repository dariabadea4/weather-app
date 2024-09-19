(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))m(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&m(n)}).observe(document,{childList:!0,subtree:!0});function c(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function m(e){if(e.ep)return;e.ep=!0;const a=c(e);fetch(e.href,a)}})();const q=document.querySelector(".viewed-city__favorites-container"),x=document.querySelector(".viewed-city__next"),I=document.querySelector(".viewed-city__prev");let w,f=0;const D=(t,s)=>{try{const c=JSON.stringify(s);localStorage.setItem(t,c)}catch(c){console.log(c)}},E=t=>{try{const s=localStorage.getItem(t);return s===null?void 0:JSON.parse(s)}catch(s){console.log(s)}},T=(t,s)=>{switch(!0){case t.length>4:x.classList.remove("hidden");break;default:x.classList.add("hidden");break}switch(!0){case s>0:I.classList.remove("hidden");break;default:I.classList.add("hidden");break}},A=t=>{switch(!0){case(t<500&&t>400):w=3;break;case t<400:w=2;break;default:w=4;break}},_=t=>({cityName:t,id:Math.floor(Math.random()*200+1)}),O=t=>{const s=_(t),c=E("orase");if(c===void 0)D("orase",[s]);else{const m=_(t);c.push(m),D("orase",c)}},H=(t,s)=>{if(t)return t.length>s?t.substring(0,s)+"...":t},L=()=>{const t=E("orase");if(t!==void 0){A(window.innerWidth),T(t,f),q.innerHTML="";const s=f*w,c=s+w;t.slice(s,c).forEach(e=>{const a=H(e.cityName,6),n=`<button class="viewed-city" type="button" value="${a}"data-id="${e.id}">
                                  ${a}
                                  <svg class="viewed-city__close-btn" data-id="${e.id}">
                                      <use href ="./city-input-icons.svg#icon-close"></use>
                                  </svg>
                              </button>`;q.insertAdjacentHTML("beforeend",n)})}},N=t=>{const s=E("orase");(t+1)*w<s.length&&(f++,L())},P=t=>{t>=1&&(f--,L(),console.log(f))},X=document.querySelector(".city-input__field"),W=document.querySelector(".star");let k;X.addEventListener("change",t=>{k=t.target.value});W.addEventListener("click",()=>{O(k),L()});document.addEventListener("DOMContentLoaded",function(){const t="20ffa3f3195f1b01715c348123da79a3";async function s(e){if(!e){alert("Please enter a city name");return}const a=`https://api.openweathermap.org/data/2.5/forecast?q=${e}&units=metric&appid=${t}`;try{const n=await fetch(a);if(!n.ok)throw new Error("City not found");const y=await n.json();c(y)}catch(n){alert(n.message)}}function c(e){const a=document.getElementById("weather-cards"),n=document.getElementById("more-info-container");a.innerHTML="",n.innerHTML="",e.list.filter(l=>l.dt_txt.includes("12:00:00")).forEach((l,b)=>{const r=document.createElement("div");r.classList.add("weather-card-initial");const h=new Date(l.dt_txt),g=h.toLocaleDateString("en-US",{weekday:"long"}),o=h.toLocaleDateString("en-GB",{day:"numeric",month:"short"}),d=l.weather[0].icon,i=Math.round(l.main.temp_min),u=Math.round(l.main.temp_max);r.innerHTML=`
      <div class="day-weather">${g}</div>
      <div class="date">${o}</div>
      <img src="http://openweathermap.org/img/wn/${d}.png" alt="${l.weather[0].description}">
      <div class="min-max">
        <div class="min">
          <div>min</div>
          <div class="degrees">${i}</div>
        </div>
        <div class="line"></div>
        <div class="max">
          <div>max</div>
          <div class="degrees">${u}</div>
        </div>
      </div>
      <button class="more-info-btn">more info</button>
    `,r.querySelector(".more-info-btn").addEventListener("click",()=>m(b,e)),a.appendChild(r)})}function m(e,a){const n=document.getElementById("more-info-container"),y=document.querySelectorAll(".weather-card-initial .day-weather");if(!n.classList.contains("hidden")&&n.getAttribute("data-index")==e){n.classList.add("hidden"),n.innerHTML="",y.forEach(i=>i.classList.remove("selected-day"));return}n.classList.remove("hidden"),n.setAttribute("data-index",e),n.innerHTML="";const l=a.list.slice(e*8,e*8+7);y.forEach(i=>i.classList.remove("selected-day")),document.querySelectorAll(".weather-card-initial")[e].querySelector(".day-weather").classList.add("selected-day");const r=document.createElement("div");r.classList.add("more-info-scrollable"),l.forEach(i=>{const u=document.createElement("div"),p=new Date(i.dt_txt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),v=Math.round(i.main.temp),C=i.weather[0].icon,S=i.rain&&(i.rain["3h"]||i.rain["1h"])||0,$=i.main.humidity,M=i.wind.speed;u.classList.add("hourly-info"),u.innerHTML=`
        <div class="weather-card">
            <div class="time">${p}</div>
            <img src="http://openweathermap.org/img/wn/${C}.png" alt="${i.weather[0].description}">
            <div class="degrees">${v}°C</div>
            <div class="weather-properties">
                <div class="property-details">
                    <img src="/001-percip.png" alt="">
                    <p class="property-detail">${S} mm</p>
                </div>
                <div class="property-details">
                   <img src="/002-humidity.png" alt="">
                    <p class="property-detail">${$}%</p>
                </div>
                <div class="property-details">
                    <img src="/003-wind.png" alt="">
                    <p class="property-detail">${M} m/s</p>
                </div>
            </div>
        </div>
      `,r.appendChild(u)});const h=document.getElementById("weather-cards"),g=document.getElementById("left-arrow"),o=document.getElementById("right-arrow");g.addEventListener("click",()=>{h.scrollBy({left:-300,behavior:"smooth"})}),o.addEventListener("click",()=>{h.scrollBy({left:300,behavior:"smooth"})}),n.appendChild(r);let d=0;r.addEventListener("touchstart",i=>{d=i.touches[0].clientX}),r.addEventListener("touchend",i=>{const u=i.changedTouches[0].clientX,p=d-u;p>50?r.scrollBy({left:300,behavior:"smooth"}):p<-50&&r.scrollBy({left:-300,behavior:"smooth"})})}document.querySelector("#city-input").addEventListener("change",()=>{s(k)})});const j=document.querySelector(".viewed-city__next"),z=document.querySelector(".viewed-city__prev"),F=document.querySelector(".viewed-city__favorites-container");window.addEventListener("resize",()=>{L()});j.addEventListener("click",()=>{N(f)});z.addEventListener("click",()=>{P(f)});F.addEventListener("click",t=>{const s=t.target.parentNode.dataset.id,c=E("orase");if(t.target.nodeName!=="use"&&t.target.nodeName!=="svg")return;const m=c.filter(e=>e.id!=s);D("orase",m),L()});L();const K=[{text:"The only limit to our realization of tomorrow is our doubts of today.",author:"Franklin D. Roosevelt"},{text:"Success is not final, failure is not fatal: It is the courage to continue that counts.",author:"Winston Churchill"},{text:"You miss 100% of the shots you don't take.",author:"Wayne Gretzky"},{text:"The best time to plant a tree was 20 years ago. The second best time is now.",author:"Chinese Proverb"},{text:"It always seems impossible until it's done.",author:"Nelson Mandela"},{text:"Don't watch the clock; do what it does. Keep going.",author:"Sam Levenson"},{text:"Whether you think you can or you think you can't, you're right.",author:"Henry Ford"}],G=new Date().getDay(),B=K[G];document.getElementById("quote-text").textContent=B.text;document.getElementById("quote-author").textContent=B.author;
//# sourceMappingURL=index.js.map
