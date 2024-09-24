import{i as S}from"./assets/city-input__favorites-DJSUhGZf.js";fetch("https://worldtimeapi.org/api/ip").then(t=>{if(!t.ok)throw new Error("Network response was not ok");return t.json()}).then(t=>{const r=t.datetime,n=new Date(r),a=n.getDate(),c=n.toLocaleString("en-US",{weekday:"short"}),u=n.toLocaleString("en-US",{month:"long"}),m=String(n.getHours()).padStart(2,"0"),s=String(n.getMinutes()).padStart(2,"0"),d=String(n.getSeconds()).padStart(2,"0"),l=`${m}:${s}:${d}`;document.querySelector(".day").textContent=a,document.querySelector(".weekday").textContent=c,document.querySelector(".month").textContent=u,document.querySelector(".time").textContent=l;const i=t.latitude,e=t.longitude;return fetch(`https://api.sunrise-sunset.org/json?lat=${i}&lng=${e}&formatted=0`)}).then(t=>{if(!t.ok)throw new Error("Sunrise-Sunset API response was not ok");return t.json()}).then(t=>{const r=new Date(t.results.sunrise).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1}),n=new Date(t.results.sunset).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1});document.querySelector(".sunrise").textContent=` ${r}`,document.querySelector(".sunset").textContent=` ${n}`}).catch(t=>{console.error("Error:",t),document.querySelector(".day").textContent="Error",document.querySelector(".weekday").textContent="Error",document.querySelector(".month").textContent="Error",document.querySelector(".time").textContent="Error",document.querySelector(".sunrise").textContent="Error",document.querySelector(".sunset").textContent="Error"});const v=[{text:"The only limit to our realization of tomorrow is our doubts of today.",author:"Franklin D. Roosevelt"},{text:"Success is not final, failure is not fatal: It is the courage to continue that counts.",author:"Winston Churchill"},{text:"You miss 100% of the shots you don't take.",author:"Wayne Gretzky"},{text:"The best time to plant a tree was 20 years ago. The second best time is now.",author:"Chinese Proverb"},{text:"It always seems impossible until it's done.",author:"Nelson Mandela"},{text:"Don't watch the clock; do what it does. Keep going.",author:"Sam Levenson"},{text:"Whether you think you can or you think you can't, you're right.",author:"Henry Ford"}],f=new Date().getDay(),p=v[f];document.getElementById("quote-text").textContent=p.text;document.getElementById("quote-author").textContent=p.author;document.addEventListener("DOMContentLoaded",()=>{var i;const t="20ffa3f3195f1b01715c348123da79a3",r=document.querySelector("#city-input"),n=document.getElementById("current-location"),a=document.getElementById("current-temp"),c=document.getElementById("min-temp"),u=document.getElementById("max-temp"),m=document.querySelector(".weather-info"),s=async e=>{if(!e){alert("Te rog, introdu un nume de oraș.");return}const h=`https://api.openweathermap.org/data/2.5/forecast?q=${e}&units=metric&appid=${t}`;try{const o=await fetch(h);if(!o.ok)throw new Error("Orașul nu a fost găsit.");const y=await o.json();d(y)}catch{}},d=e=>{const h=new Date().toISOString().split("T")[0],o=e.list.find(x=>x.dt_txt.startsWith(h)),{city:{country:y,name:g},list:[C,E]}=e,w=`<div class="current-weather">
                          <img class="about-icon" src="http://openweathermap.org/img/wn/${e.list[0].weather[0].icon}.png"/>
                          <span class="location">${g}, ${y}</span>
                          <div class="temp-values">
                            <div class="current-temp">-3</div>
                            <div class="min-max__temp">
                              <div class="min-max__temps">
                                <div class="min-temp">min</div>
                                <div class="temps"> -2°</div>
                              </div>
                              <div class="line"></div>
                              <div class="min-max__temps">
                                <div class="max-temp">max</div>
                                <div class="temps"> 1°</div>
                              </div>
                            </div>
                          </div>
                        </div>`;m.insertAdjacentHTML("afterbegin",w),n.textContent=`${e.city.name}, ${e.city.country}`,a.textContent=`${Math.round(o.main.temp)}°C`,c.textContent=`${Math.round(o.main.temp_min)}°C`,u.textContent=`${Math.round(o.main.temp_max)}°C`};r.addEventListener("change",()=>{const e=r.value.trim();e&&s(e)});const l=((i=S)==null?void 0:i.trim())||"Kyiv";s(l)});
//# sourceMappingURL=index.js.map
