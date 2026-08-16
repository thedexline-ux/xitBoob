const groups = {
  aim: ["Aim Lock", "Aim Assist", "Aimbot", "FOV", "Aim Smoothing", "Crosshair"],
  esp: ["ESP", "Player Info", "Health Bar", "Name Tag", "Box", "Antenna"],
  game: ["Headshot", "No Recoil", "No Spread", "Fast Switch"]
};

function featureHTML(name) {
  return `
    <div class="feature">
      <div>
        <b>${name}</b>
        <small>UI control only</small>
      </div>
      <button class="toggle" onclick="toggle(this,'${name}')">
        <i></i>
      </button>
    </div>
  `;
}

for (const [k, v] of Object.entries(groups)) {
  const list = document.getElementById(k + "List");
  if (list) {
    list.innerHTML = v.map(featureHTML).join("");
  }
}

function login() {
  const codeInput = document.getElementById("code");
  const loginMsg = document.getElementById("loginMsg");

  const c = codeInput ? codeInput.value.trim() : "";

  if (!c) {
    if (loginMsg) {
      loginMsg.textContent = "Enter an access code.";
    }
    return;
  }

  const loginPanel = document.getElementById("login");
  const mainPanel = document.getElementById("main");
  const sessionCode = document.getElementById("sessionCode");

  if (loginPanel) loginPanel.style.display = "none";
  if (mainPanel) mainPanel.style.display = "block";
  if (sessionCode) sessionCode.textContent = c;
  if (loginMsg) loginMsg.textContent = "Authorized";
}

function showTab(id, btn) {
  ["home", "features", "device"].forEach(x => {
    const el = document.getElementById(x);
    if (el) {
      el.style.display = x === id ? "grid" : "none";
    }
  });

  document.querySelectorAll(".pill").forEach(x => {
    x.classList.remove("active");
  });

  if (btn) {
    btn.classList.add("active");
  }
}

function toggle(el, name) {
  if (!el) return;

  el.classList.toggle("on");

  const on = el.classList.contains("on");
  say(name + " " + (on ? "on" : "off"));
}

function say(text) {
  if ("speechSynthesis" in window) {
    speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    u.pitch = 1.1;

    speechSynthesis.speak(u);
  }
}

/* Device information */
const platform = document.getElementById("platform");
const screen = document.getElementById("screen");
const lang = document.getElementById("lang");
const memory = document.getElementById("memory");
const network = document.getElementById("network");

if (platform) {
  platform.textContent =
    navigator.userAgentData?.platform ||
    navigator.platform ||
    "—";
}

if (screen) {
  screen.textContent = innerWidth + "×" + innerHeight;
}

if (lang) {
  lang.textContent = navigator.language || "—";
}

if (memory) {
  memory.textContent =
    navigator.deviceMemory
      ? navigator.deviceMemory + " GB"
      : "Unavailable";
}

function updateNetwork() {
  if (network) {
    network.textContent = navigator.onLine ? "Online" : "Offline";
  }
}

updateNetwork();

window.addEventListener("online", updateNetwork);
window.addEventListener("offline", updateNetwork);

/* Battery information */
if (navigator.getBattery) {
  navigator.getBattery().then(battery => {
    const batteryEl = document.getElementById("battery");

    function updateBattery() {
      if (!batteryEl) return;

      batteryEl.textContent =
        Math.round(battery.level * 100) +
        "%" +
        (battery.charging ? " · Charging" : "");
    }

    updateBattery();

    battery.addEventListener("levelchange", updateBattery);
    battery.addEventListener("chargingchange", updateBattery);
  }).catch(() => {
    const batteryEl = document.getElementById("battery");
    if (batteryEl) {
      batteryEl.textContent = "Unavailable";
    }
  });
}

/* Service Worker registration for PWA */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then(registration => {
        console.log(
          "Service Worker registered successfully:",
          registration.scope
        );
      })
      .catch(error => {
        console.error(
          "Service Worker registration failed:",
          error
        );
      });
  });
}
