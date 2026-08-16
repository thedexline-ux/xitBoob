const groups={
aim:["Aim Lock","Aim Assist","Aimbot","FOV","Aim Smoothing","Crosshair"],
esp:["ESP","Player Info","Health Bar","Name Tag","Box","Antenna"],
game:["Headshot","No Recoil","No Spread","Fast Switch"]
};
function featureHTML(name){
  return `<div class="feature"><div><b>${name}</b><small>UI control only</small></div><button class="toggle" onclick="toggle(this,'${name}')"><i></i></button></div>`;
}
for(const [k,v] of Object.entries(groups)) document.getElementById(k+"List").innerHTML=v.map(featureHTML).join("");
function login(){
  const c=document.getElementById("code").value.trim();
  if(!c){document.getElementById("loginMsg").textContent="Enter an access code.";return}
  document.getElementById("login").style.display="none";document.getElementById("main").style.display="block";
  document.getElementById("sessionCode").textContent=c; document.getElementById("loginMsg").textContent="Authorized";
}
function showTab(id,btn){
  ["home","features","device"].forEach(x=>document.getElementById(x).style.display=x===id?"grid":"none");
  document.querySelectorAll(".pill").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
}
function toggle(el,name){el.classList.toggle("on"); const on=el.classList.contains("on"); say(name+" "+(on?"on":"off"))}
function say(text){if("speechSynthesis" in window){speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(text);u.rate=.95;u.pitch=1.1;speechSynthesis.speak(u)}}
document.getElementById("platform").textContent=navigator.userAgentData?.platform||navigator.platform||"—";
document.getElementById("screen").textContent=innerWidth+"×"+innerHeight;
document.getElementById("lang").textContent=navigator.language||"—";
document.getElementById("memory").textContent=navigator.deviceMemory?navigator.deviceMemory+" GB":"Unavailable";
document.getElementById("network").textContent=navigator.onLine?"Online":"Offline";
if(navigator.getBattery){navigator.getBattery().then(b=>{const f=()=>document.getElementById("battery").textContent=Math.round(b.level*100)+"%"+(b.charging?" · Charging":"");f();b.addEventListener("levelchange",f);b.addEventListener("chargingchange",f)})}
