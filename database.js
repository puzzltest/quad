import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get, update, increment, onDisconnect, runTransaction, serverTimestamp, remove } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-database.js";
import { util } from "/util.js";

const url = "https://hwrnmdsdjevfcvgpablf.supabase.co";
const api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3cm5tZHNkamV2ZmN2Z3BhYmxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgwNzkyOTQsImV4cCI6MjAzMzY1NTI5NH0.zYEJGqxrQYZoOensuJWG5NCyWC9vFhSbIvMVX3zVq5Y";
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

let already_ran_connect = false;
function connect() {
  if (already_ran_connect) return;
  already_ran_connect = true;
  firebase.increment("/quad/connections", 1);
  firebase.disconnect_increment("/quad/connections", -1);
  firebase.listen("/quad/positions/", function(positions) {
    firebase.others = positions;
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
  firebase.disconnect_remove("/quad/positions/" + the_id);
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
firebase.update_time = 0;
firebase.update2_time = 0;
firebase.tick = function(time) {
  firebase.time = time;
  if (time - firebase.update_time < 30) return;
  firebase.update_time = time;
  firebase.send();
};





export const database = {};
let channel = null;
// const supabase = createClient(url, api_key);

database.subscribe = function() {
  
  return;
  /*
  channel.subscribe((status) => {
    console.log(status);
    if (status === "SUBSCRIBED") {
      database.send();
    } else if (status === "CLOSED") {
      setTimeout(database.init, 1000);
    } else if (status === "CHANNEL_ERROR") {
      setTimeout(database.init, 5000);
    } else {
      
    }
  });*/
  
};
database.time = 0;
database.tick = function(time) {
  return;
  if (time - database.time < 30) return;
  database.time = time;
  // console.log(time);
  database.send();
};
database.send = function() {
  return;
  /*
  channel.send({
    type: "broadcast",
    event: "position",
    payload: {
      id: the_id,
      x: player.x,
      y: player.y,
      z: player.z,
      p: map.panel_ref.total_solved,
    },
  });*/
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
  } else {
    return;
  }
};