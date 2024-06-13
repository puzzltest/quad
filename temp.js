import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get, update, increment, onDisconnect, runTransaction } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-database.js";
import { map } from "https://qat.pages.dev/map.js";
import "https://cdn.jsdelivr.net/npm/zipson@latest/dist/zipson.min.js";
const firebaseConfig = {
  apiKey: "AIzaSyCbkiYb_waAew2mLVr9ejn6FTGTr19Vi4A",
  authDomain: "four--4.firebaseapp.com",
  databaseURL: "https://four--4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "four--4",
  storageBucket: "four--4.appspot.com",
  messagingSenderId: "587842447388",
  appId: "1:587842447388:web:bd3168656fc812f3e717d9",
  measurementId: "G-9E0TRH93JC",
};
const params = new URLSearchParams(document.location.search);
window.firebase = {};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
window.firebase.set = function(path, value) {
  return set(ref(db, path), value);
};
window.firebase.get = function(path, getter_function) {
  return onValue(ref(db, path), (snapshot) => {
    getter_function(snapshot.val());
  }, {
    onlyOnce: true,
  });
};
window.firebase.random = function(l = 10) {
  let result = "";
  for (let i = 0; i < l; i++) {
    result += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
  }
  return result;
};

export const temp = {};
temp.load = function() {
  if (params.get("save")) {
    window.firebase.get("/quad/" + params.get("save"), (data) => {
      const raw = zipson.stringify(JSON.parse(data));
      if (raw) {
        localStorage.setItem("save", raw);
        map.load(raw);
        map.save();
        setTimeout(() => window.location.href = "/", 100);
      }
    });
  }
};