import { firebase } from "/database.js";

async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);
  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  // convert bytes to hex string
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

const setpos = function(o) {
  const raw = localStorage.getItem("save");
  const s = zipson.parse(raw);
  s.player.x = o.x ?? 0;
  s.player.y = o.y ?? 0;
  s.player.z = o.z ?? 0;
  const new_raw = zipson.stringify(s);
  localStorage.setItem("save", new_raw);
  setTimeout(() => window.location.href = "/", 500);
};

window.addEventListener("load", function(event) {
  const raw = localStorage.getItem("save");
  const a = document.querySelector("textarea");
  const b = document.getElementById("load");
  b.addEventListener("click", function(event) {
    const new_raw = a.value;
    if (new_raw) {
      localStorage.setItem("save", zipson.stringify(JSON.parse(new_raw)));
    }
    setTimeout(() => window.location.href = "/", 100);
  });
  const c = document.getElementById("clear");
  c.addEventListener("click", function(event) {
    firebase.remove("/quad/positions/");
  });
  const v = document.getElementById("version");
  v.addEventListener("click", async function(event) {
    alert(1);
    const password = window.prompt("password?");
    const hi = await sha256(password);
    console.log(hi);
  });
  const div = document.querySelector("div");
  firebase.init();
  firebase.listen("/quad/positions/", function(data) {
    let s = "";
    for (const id in data) {
      const o = data[id];
      s += `<p>p: ${o.p} | x: ${o.x} | y: ${o.y} | z: ${o.z} | <a id="${id}">go</a></p><br>`;
    }
    div.innerHTML = `total: ${Object.keys(data).length}<br>` + s;
    for (const id in data) {
      const o = data[id];
      const link = document.getElementById(id);
      link.href = "#";
      link.addEventListener("click", function(event) {
        setpos(o);
      });
    }
  });
});


