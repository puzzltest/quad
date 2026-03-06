import { util } from "/util.js";
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

window.addEventListener("load", async function(event) {
  if (!util.is_local()) {
    const password = window.prompt("password?");
    const hi = await sha256(password);
    console.log(hi);
    if (hi !== "26a08721ac62bc4dd61f69ba877d91cf979c10589e90dcd49324fbeedef28f41") {
      return;
    }
  }
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
    alert("hello");
    const password = window.prompt("password?");
    const hi = await sha256(password);
    console.log(hi);
  });
  const div = document.querySelector("div");
  const span = document.querySelector("span");
  firebase.init();
  firebase.listen("/quad/positions/", function(data) {
    let s = "";
    for (const id in data) {
      const o = data[id];
      s += `<p>p: ${o.p} | x: ${o.x} | y: ${o.y} | z: ${o.z} | <a id="${id}">go</a></p><br>`;
    }
    div.innerHTML = `total: ${Object.keys(data ?? {}).length}<br>` + s;
    for (const id in data) {
      const o = data[id];
      const link = document.getElementById(id);
      link.href = "#";
      link.addEventListener("click", function(event) {
        setpos(o);
      });
    }
  });
  firebase.listen("/quad/save/", async function(data) {
    const savestats = (await firebase.promise_get("/quad/savestats/")) ?? {};
    const codes = Object.keys(data);
    codes.sort((a, b) => {
      return (savestats[b].time ?? 0) - (savestats[a].time ?? 0);
    });
    let s = "";
    for (const id of codes) {
      s += `<p>${savestats[id]?.puzzles ?? 0}/${savestats[id]?.stars ?? 0} | <a id="save_${id}">${id}</a></p>`;
    }
    span.innerHTML = s;
    for (const id of codes) {
      const link = document.getElementById("save_" + id);
      link.href = "#";
      link.addEventListener("click", function(event) {
        if (window.confirm("remove " + id + "?")) {
          firebase.remove("/quad/save/" + id);
          firebase.remove("/quad/savestats/" + id);
        }
      });
    }
  });
});


