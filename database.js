// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get, update, increment, onDisconnect, runTransaction, serverTimestamp, remove } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import { getAuth, onAuthStateChanged, updateProfile, GoogleAuthProvider, EmailAuthProvider, reauthenticateWithCredential, reauthenticateWithPopup, signInWithPopup, signInWithEmailAndPassword, signInWithCredential, updateEmail, getAdditionalUserInfo, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { map } from "./map.js";
import { util } from "./util.js";

const params = new URLSearchParams(document.location.search);
const local = util.is_local();

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
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export const firebase = {};
export const the_id = util.randletters(10);
export const VERSION = 100401; // remember to change...
const version = VERSION;

let already_ran_connect = false;
function connect() {
  if (already_ran_connect) return;
  already_ran_connect = true;
  firebase.increment("/quad/connections", 1);
  firebase.disconnect_increment("/quad/connections", -1);
  firebase.disconnect_remove("/quad/positions/" + the_id);
  firebase.listen("/quad/positions/", function(positions) {
    firebase.others = positions;
  });
  firebase.listen("/quad/version/", function(new_ver) {
    if (new_ver < version) {
      firebase.set("/quad/version/", version);
    } else if (new_ver > version) {
      if (window.confirm("new version released! reload?")) {
        window.location.reload(true);
      }
    } else {
      // yay correct version
      // do nothing
    }
  });
  /*
  firebase.listen("/quad/timestamp/", function(now) {
      if (firebase.time - firebase.update2_time < 2000) return;
      firebase.update2_time = firebase.time;
      for (const other_id in player.others ?? []) {
        if (now - (player.others[other_id].t ?? 0) > 3000) {
          console.log(now - (player.others[other_id].t ?? 0));
          firebase.remove("/quad/positions/" + other_id);
        }
      }
  });*/
};

firebase.init = function() {

  // initialize firebase
  const app = initializeApp(firebaseConfig);
  //initializeAnalytics(app);
  //const analytics = getAnalytics(app);
  const db = getDatabase(app);

  onValue(ref(db, ".info/connected"), (snapshot) => {
    if (snapshot.val() === true) {
      console.log("connected :)");
      connect();
    } else {
      console.log("not connected :(");
    }
  });

  firebase.listen = function(path, listener) {
    return onValue(ref(db, path), (snapshot) => {
      listener(snapshot.val());
    });
  }

  firebase.get = function(path, getter_function) {
    return onValue(ref(db, path), (snapshot) => {
      getter_function(snapshot.val());
    }, {
      onlyOnce: true,
    });
  }

  firebase.promise_get = async function(path, getter_function) {
    return new Promise((resolve, reject) => {
      firebase.get(path, function(data) {
        if (getter_function != null) {
          getter_function(data);
        }
        resolve(data);
      });
    });
  }

  firebase.set = function(path, value) {
    return set(ref(db, path), value);
  }

  firebase.update = function(updates) {
    return update(ref(db), updates);
  }

  firebase.bare_transaction = function(path, setter_function) {
    runTransaction(ref(db, path), (old_data) => {
      return setter_function(old_data);
    });
  }

  firebase.transaction = function(path, setter_function) {
    firebase.get(path, (unused_locally_cached_data) => {
      runTransaction(ref(db, path), (old_data) => {
        return setter_function(old_data);
      });
    });
  }

  firebase.increment = function(path, number = 1) {
    return set(ref(db, path), increment(number));
  }

  firebase.remove = function(path) {
    remove(ref(db, path));
  };

  firebase.disconnect_set = function(path, value) {
    onDisconnect(ref(db, path)).set(value);
  };

  firebase.disconnect_increment = function(path, number = 1) {
    onDisconnect(ref(db, path)).set(increment(number));
  };

  firebase.disconnect_remove = function(path) {
    onDisconnect(ref(db, path)).remove();
  };

  // initialized = true;

};

firebase.time = 0;
firebase.update_time = 30;
firebase.update2_time = -30000; // also do it at the start
firebase.update3_time = 0;
firebase.tick = function(time) {
  firebase.time = time;
  if (time - firebase.update_time > 30) { // ms
    firebase.update_time = time;
    firebase.send();
  }
  if (time - firebase.update2_time > 30000) { // ms
    firebase.update2_time = time;
    firebase.clear();
    firebase.send();
  }
  if (local && time - firebase.update3_time > 3000) {
    firebase.update3_time = time;
    temp.save("local");
  }
};

firebase.clear = function() {
  // console.log("cleared :}");
  firebase.remove("/quad/positions/");
};



export const temp = {};

temp.save = function(id = the_id) {
  let nice = localStorage.getItem("save");
  if (nice) {
    nice = zipson.parse(nice);
    nice = JSON.stringify(nice);
    firebase.set("/quad/save/" + id, nice);
    firebase.set("/quad/savestats/" + id, {
      puzzles: map.panel_ref.total_solved,
      stars: map.total_stars,
      time: serverTimestamp(),
    });
  } else {
    alert("error: no save data?");
  }
  return id;
};
temp.load = function(code = false) {
  if (!code && params.get("save")) {
    firebase.get("/quad/" + params.get("save"), (data) => {
      if (data == null) {
        alert("error: no such save code?");
        return;
      }
      const raw = zipson.stringify(JSON.parse(data));
      if (raw) {
        localStorage.setItem("save", raw);
        map.load(raw);
        map.save();
        setTimeout(() => window.location.href = "/", 200);
      }
    });
  } else if ((code?.length ?? 0) > 0) {
    firebase.get("/quad/save/" + code, function(data) {
      if (data == null) {
        alert("error: no such save code?");
      } else {
        const raw = zipson.stringify(JSON.parse(data));
        if (raw) {
          localStorage.setItem("save", raw);
          map.load(raw);
          localStorage.setItem("save", map.save());
          firebase.set("/quad/savestats/" + code, {
            puzzles: map.panel_ref.total_solved,
            stars: map.total_stars,
          });
          if (code !== "local") alert("loaded!");
          else localStorage.setItem("local", VERSION);
          setTimeout(() => window.location.href = "/", 250);
        } else {
          alert("error: ???");
        }
      }
    });
  } else {
    // alert("error: invalid save code?");
    return;
  }
};