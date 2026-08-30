// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get, update, increment, onDisconnect, runTransaction, serverTimestamp, remove } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
import { getAuth, onAuthStateChanged, updateProfile, EmailAuthProvider, updateEmail, getAdditionalUserInfo, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { reinit_everything, map } from "./map.js";
import { util } from "./util.js";
import { physics } from "./physics.js";
import { init_load, v } from "./index.js";
import { panel } from "./panel.js";
import lzstring from 'https://cdn.jsdelivr.net/npm/lz-string@1.5.0/+esm';
import { player } from "./player.js";

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
const auth = getAuth(app);
export const firebase = {};
export const the_id = util.randletters(10);
export const VERSION = 120001; // remember to change...
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
    if (!local && new_ver < version) {
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

// used to be firebase.init
(function() {

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
    }, console.error);
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

})();

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
  if (map.name !== "old") return;
  // if (time - firebase.update3_time > 3000) {
  //   firebase.update3_time = time;
  //   if (local) temp.save("local");
  //   else temp.autosave();
  // }
};

firebase.clear = function() {
  // console.log("cleared :}");
  firebase.remove("/quad/positions/");
};

firebase.init_map = function() {
  const params = new URLSearchParams(window.location.search);
  const map_id = params.get("map") ?? "new";
  if (map_id !== "old") {
    firebase.listen(`/qat/publish/${map_id}`, function(raw) {
      if (!raw) return;
      panel.total_solved = 0;
      panel.active = false;
      panel.o = null;
      reinit_everything(util.decompress_safe(raw));
      map.name = map_id;
      map.loaded = false;
      player.x = map.start_point.x;
      player.y = map.start_point.y;
      player.z = map.start_point.z;
      physics.init();
      init_load();
      physics.tick();
    });
  }
};



export const temp = {};

temp.autosave = function() {
  const current_code = localStorage.getItem("code");
  if (current_code) {
    temp.save(current_code);
  }
};

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
    localStorage.setItem("code", id);
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
        if (!map.load(raw)) return;
        localStorage.setItem("save", raw);
        map.save();
        localStorage.setItem("code", params.get("save"));
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
          if (!map.load(raw)) return;
          localStorage.setItem("save", raw);
          map.save();
          localStorage.setItem("code", code);
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

temp.account = {
  active: false,
  user: null,
  data: null,
  after_auth_fns: [],
  get logged_in() {
    return temp.account.user != null;
  },
  save: async function() {
    const uid = temp.account.user?.uid;
    if (!uid) return;
    if (map.name === "old") return;
    await firebase.set(`/qac/users/${uid}/saves/${map.name}`, map.save());
    await firebase.set(`/qac/lb/${uid}/`, { n: temp.account.data.name, p: panel.total_solved, s: map.total_stars });
  },
  register_unpw: function(username, password, then_fn, error_fn = console.error) {
    const email = username + "@qat.pages.dev";
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (cred) => {
        const user = cred.user;
        const prefix = `/qac/users/${user.uid}/`;
        try {
          await firebase.set(`/qac/users/${user.uid}/name`, username);
          await firebase.set(`/qac/names/${username.toLowerCase()}`, user.uid);
          await temp.account.save();
          then_fn?.();
        } catch (e) { error_fn(e); }
      }).catch(error_fn);
  },
  login_unpw: function(username, password, then_fn, error_fn = console.error) {
    const email = username + "@qat.pages.dev";
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        const user = cred.user;
        firebase.get(`/qac/users/${user.uid}`, async function(data) {
          try {
            const save = data.saves?.[map.name];
            if (save) map.load(save);
            await firebase.set(`/qac/users/${user.uid}/saves/${map.name}`, map.save());
            then_fn?.(data);
          } catch (e) { error_fn(e); }
        });
      }).catch(error_fn);
  },
  logout: function(then_fn, error_fn = console.error) {
    signOut(auth).then(() => {
      then_fn?.();
    }).catch(error_fn);
  },
  init: function() {
    onAuthStateChanged(auth, async (u) => {
      temp.account.user = u;
      v.logged_in = temp.account.logged_in;
      if (u != null) {
        const prefix = `/qac/users/${u.uid}/`;
        firebase.listen(prefix, function(data) {
          temp.account.data = data ?? {};
        });
      }
    });
  },
  on: function() {
    player.act_time = -1;
    temp.account.active = true;
  },
  off: function() {
    document.getElementById("account").remove();
    temp.account.active = false;
  },
  lb_l: null,
  on_lb: function(then_fn) {
    temp.account.lb_l = firebase.listen("/qac/lb/", function(lb) {
      then_fn?.(lb);
    });
  },
  off_lb: function() {
    temp.account.off();
    temp.account.lb_l?.();
  },
};

temp.accountant = function() {
  const div = document.createElement("div");
  if (document.getElementById("account")) document.getElementById("account").remove();
  div.id = "account";
  div.innerHTML = `
    <div id="one">
    <form>
    <input type="text" style="display: none;">
    <input type="password" style="display: none;">
    <h2></h2>
    <p>username: <input id="user" type="text" placeholder="" autocomplete="qat"><br style="margin: 0.6em;"><span id="spin"></span></p>
    <p id="nex"></p>
    <p><input id="close" type="button" value="close"></p>
    </form>
    </div><div id="two"></div>
  `.trim();
  document.body.appendChild(div);
  document.getElementById("close").addEventListener("click", temp.account.off);
  const input_user = document.getElementById("user");
  const h2 = document.querySelector("h2");
  const nex = document.getElementById("nex");
  const spin = document.getElementById("spin");
  async function next() {
    const username = input_user.value.trim();
    let valid = false;
    if (username.length <= 1) {
      if (username.length > 0) spin.textContent = "username must be at least 2 characters!";
      spin.style.color = "coral";
    } else if (username.length > 26) {
      spin.textContent = "username must be at most 26 characters!";
      spin.style.color = "coral";
    } else if (!/^[-_a-zA-Z0-9]+$/.test(username)) {
      spin.textContent = "username can't have funny characters!";
      spin.style.color = "coral";
    } else {
      spin.textContent = "";
      valid = true;
    }
    if (valid) {
      const yes = await firebase.promise_get(`/qac/names/${username.toLowerCase()}`);
      if (yes) {
        h2.textContent = "log in";
        nex.innerHTML = `
          password: <input id="pass" type="password" autocomplete="current-password">
          <br>
          <span id="spin"></span>
          <br style="margin: 0.6em;">
          <input id="submit" type="button" value="log in!">
        `;
      } else {
        h2.textContent = "register";
        nex.innerHTML = `
          &nbsp; &nbsp; &nbsp; &nbsp; password: <input id="pass" type="password" autocomplete="new-password">
          <br style="margin: 0.6em;">
          password (again): <input id="pass2" type="password" autocomplete="new-password">
          <br>
          <span id="spun"></span>
          <br style="margin: 0.6em;">
          <input id="submit" type="button" value="register!">
        `;
      }
      const input_pass = document.getElementById("pass");
      const spun = document.getElementById("spun");
      let valid2 = yes;
      input_user.addEventListener("keydown", function(event) {
        if (event.code === "Enter") input_pass.focus();
      });
      if (!yes) {
        const input_pass2 = document.getElementById("pass2");
        function same() {
          valid2 = false;
          if (input_pass.value.length < 6) {
            spun.textContent = (input_pass.value.length <= 0) ? "" : "password too short!";
            spun.style.color = "coral";
          } else if (input_pass.value !== input_pass2.value) {
            if (input_pass.value.length > 0 && input_pass2.value.length > 0) spun.textContent = "passwords don't match!";
            else spun.textContent = "";
            spun.style.color = "coral";
          } else {
            valid2 = true;
            spun.textContent = "";
          }
        };
        input_pass.addEventListener("input", same);
        input_pass2.addEventListener("input", same);
        input_pass.addEventListener("keydown", function(event) {
          if (event.code === "Enter") input_pass2.focus();
        });
      }
      function go() {
        if (!valid || !valid2) return;
        const one = document.getElementById("one");
        const username = input_user.value.trim();
        const password = input_pass.value;
        one.style.display = "none";
        if (yes) {
          two.textContent = `logging in...`;
          temp.account.login_unpw(username, password, function(data) {
            two.textContent = `done!`;
            setTimeout(temp.account.off, 300);
          }, function(error) {
            console.error(error);
            one.style.display = "block";
            two.style.display = "none";
          });
        } else {
          two.innerHTML = `registering <b>${username}</b>...`;
          temp.account.register_unpw(username, password, function() {
            two.textContent = `done!`;
            setTimeout(temp.account.off, 300);
          }, function(error) {
            console.error(error);
            one.style.display = "block";
            two.style.display = "none";
          });
        }
      };
      (document.getElementById("pass2") ?? input_pass).addEventListener("keydown", function(event) {
        if (!event.repeat && event.code === "Enter") go();
      });
      document.getElementById("submit").addEventListener("click", go);
    } else {
      h2.textContent = "log in / register";
      nex.innerHTML = `<input id="next" type="button" value="next">`;
      document.getElementById("next").addEventListener("click", next);
    }
  }
  next();
  input_user.addEventListener("input", next);
  temp.account.on();
};

temp.accountbear = function() {
  const div = document.createElement("div");
  if (document.getElementById("account")) document.getElementById("account").remove();
  div.id = "account";
  div.innerHTML = `
    <h2>account</h2>
    <p>change nickname coming soon</p>
    <p><input id="logout" type="button" value="logout"></p>
    <p><input id="close" type="button" value="close"></p>
  `.trim();
  document.body.appendChild(div);
  document.getElementById("close").addEventListener("click", temp.account.off);
  document.getElementById("logout").addEventListener("click", function(_) {
    temp.account.logout(function() {
      temp.account.off();
      temp.accountant();
    });
  });
  temp.account.on();
};

temp.accountcow = function() {
  const div = document.createElement("div");
  if (document.getElementById("account")) document.getElementById("account").remove();
  div.id = "account";
  div.innerHTML = `
    <h2>leaderboard <input id="close" type="button" value="close"> </h2>
    <table>
      <thead><tr>
        <th>#</th> <th>name</th> <th>🧩</th> <th>⭐</th> <!--<th>🥚</th>-->
      </tr></thead>
      <tbody></tbody>
    </table>
  `.trim();
  document.body.appendChild(div);
  temp.account.on_lb(function(lb) {
    const leaderboard = [];
    for (const uid in lb) {
      const o = lb[uid];
      leaderboard.push({ uid, n: o.n, p: o.p, s: o.s, });
    }
    leaderboard.sort((a, b) => {
      if (a.p !== b.p) return b.p - a.p;
      else return b.s - a.s;
    });
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    let i = 0;
    for (const o of leaderboard) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${++i}</td><td>${o.n}</td><td>${o.p}</td><td>${o.s}</td>`;
      if (o.uid === temp.account.user?.uid) tr.classList.add("you");
      tbody.appendChild(tr);
    }
  });
  function lb_keydown(event) {
    if (event.code === "Escape" || event.code === "Enter" || event.code === "Space") {
      temp.account.off_lb();
      window.removeEventListener("keydown", lb_keydown);
    }
  }
  document.getElementById("close").addEventListener("click", function(_) {
    temp.account.off_lb();
    window.removeEventListener("keydown", lb_keydown);
  });
  window.addEventListener("keydown", lb_keydown);
  temp.account.on();
};