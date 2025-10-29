import { camera } from "./camera.js";
import { firebase, temp, the_id, VERSION } from "./database.js";
import { map } from "./map.js";
import { physics } from "./physics.js";
import { panel } from "./panel.js";
import { particle } from "./particle.js";
import { player } from "./player.js";
import { sound } from "./sfx.js";
import { util } from "./util.js";
import { draw } from "./draw.js";

export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");

export const v = {
  version: VERSION,
  width: 0,
  height: 0,
  mobile: false,
  time: 0,
  realtime: 0,
  button_press: {},
  button_time: {},
  keys: {},
};

export const view = {
  cx: 0, // centre x
  cy: 0, // centre y
  x: 0,
  y: 0,
  total_size: 0, // with the borders
  get size() { return this.total_size * 0.8 }, // actual viewport size
  jx: 0,
  jy: 0,
};

export const mouse = {
  touches: [],
  newtaps: [],
  start_point: {},
  hold_time: {},
  x: false,
  y: false,
};

const init = function() {
  map.init();
  firebase.init();
  player.init();
  camera.init();
  physics.init();
  physics.tick();
  panel.init();
  sound.init();
  canvas_init();
  resize();
  v.time = 0;
  requestAnimationFrame(tick);
//  if (window.location.hostname === "qat.pages.dev") {
//    temp.load();
//  }
  // load
  if (window.location.hostname === "localhost" && localStorage.getItem("local") != v.version.toString()) {
    temp.load("local");
  } else {
    const raw_save = localStorage.getItem("save");
    if (raw_save) {
      map.load(raw_save);
    }
  }
};

const joystick_mouse = function(x, y, id) {
  const s = mouse.start_point[id] ?? { x, y };
  if (ctx.isPointInPath(s.x, s.y)) {
    player.pre_move(x / v.ratio - view.jx, y / v.ratio - view.jy);
  }
};

const joybutton_mouse = function(x, y, id) {
  const s = mouse.start_point[id] ?? { x, y };
  if (ctx.isPointInPath(x, y) && ctx.isPointInPath(s.x, s.y)) {
    player.act();
    const t = mouse.hold_time[id];
    if (t === 60 && player.act_time >= 59) {
      if (player.paused) return;
      panel.map.active = true;
      panel.map.z = player.z;
      panel.map.static = false;
    }
  }
};

v.button_press.lock = false;
v.button_time.lock = -1;
const lock_button_mouse = function(x, y, id) {
  const s = mouse.start_point[id] ?? { x, y };
  if (ctx.isPointInPath(x, y) && ctx.isPointInPath(s.x, s.y)) {
    /*
    if (v.button_press.lock) return;
    v.button_press.lock = true;
    v.button_time.lock++;
    if (v.button_time.lock > 0) return;
    */
    const t = mouse.hold_time[id];
    if (t === 1) {
      panel.lock_mode = !panel.lock_mode;
    }
    return t;
  }
  return 0;
};

const clear_button_mouse = function(x, y, id) {
  const s = mouse.start_point[id] ?? { x, y };
  if (ctx.isPointInPath(x, y) && ctx.isPointInPath(s.x, s.y)) {
    const t = mouse.hold_time[id];
    if (t === 60) {
      panel.clearstate();
    }
    return t;
  }
  return 0;
};

const maindraw = function() {
  let a, b, c, q, r, s, x, y, z;
  // draw background
  ctx.fillStyle = "#888";
  ctx.fillRect(0, 0, v.width, v.height);
  // draw viewport frame
  ctx.fillStyle = "#ace";
  ctx.fillRect(view.cx - view.total_size / 2, view.cy - view.total_size / 2, view.total_size, view.total_size);
  ctx.fillStyle = "#111";
  ctx.fillRect(view.x, view.y, view.size, view.size);
  if (v.mobile) {
    // draw mobile controls
    if (panel.active) {
      if ("lock button") {
        // draw lock button
        x = view.jx;
        r = v.width / 2 - view.jx;
        r *= 0.7;
        y = view.jy - r * 1.1;
        ctx.fillStyle = "#b8d3";
        draw.circle(x, y, r);
        ctx.fill();
        let m = 0;
        for (const t of mouse.touches) {
          m = Math.max(m, lock_button_mouse(...t));
        }
        r *= 0.8;
        ctx.fillStyle = "#555a";
        draw.circle(x, y, r);
        ctx.fill();
        ctx.save();
        ctx.clip();
        ctx.fillStyle = "#b8d7";
        let hh = r * 2 * m / 1;
        if (m >= 1) hh = 0;
        if (panel.lock_mode) {
          draw.rect(x - r, y - r + hh, r * 2, r * 2 - hh);
          ctx.fill();
          ctx.fillStyle = "#eeea";
          draw.svg("lock_puzzle", x, y, r);
        } else {
          draw.rect(x - r, y - r, r * 2, hh);
          ctx.fill();
          ctx.fillStyle = "#eeea";
          draw.svg("unlock_puzzle", x, y, r);
        }
        ctx.restore();
      }
      if ("clear button") {
        // draw clear button
        x = view.jx;
        r = v.width / 2 - view.jx;
        r *= 0.7;
        y = view.jy + r * 1.1;
        ctx.fillStyle = "#b8d3";
        draw.circle(x, y, r);
        ctx.fill();
        let m = 0;
        for (const t of mouse.touches) {
          m = Math.max(m, clear_button_mouse(...t));
        }
        r *= 0.8;
        ctx.fillStyle = "#555a";
        draw.circle(x, y, r);
        ctx.fill();
        ctx.save();
        ctx.clip();
        ctx.fillStyle = "#b8d7";
        let hh = r * 2 * m / 60;
        if (m >= 60) hh = r * 2;
        draw.rect(x - r, y + r - hh, r * 2, hh);
        ctx.fill();
        ctx.fillStyle = "#eeea";
        draw.svg("clear_puzzle", x, y, r);
        ctx.restore();
      }
    } else {
      if ("joystick border") {
        ctx.fillStyle = "#d8b3";
        draw.circle(view.jx, view.jy, view.jr);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(view.jx, view.jy);
        ctx.arc(view.jx, view.jy, view.jr / 0.9, 0, Math.PI * 2); // joystick touch area is a little bigger than displayed
        if (mouse.touches.length > 1) {
          for (const t of mouse.touches) {
            joystick_mouse(...t);
          }
        } else {
          joystick_mouse(mouse.x, mouse.y, mouse.id);
        }
      }
      if ("joystick arrows") {
        // draw joystick arrows
        for (let i = 0; i < 4; i++) {
          a = ((i + 0.5) * Math.PI / 2) % (Math.PI * 2);
          x = view.jx + view.jr * Math.cos(a + Math.PI / 4) * 0.1;
          y = view.jy + view.jr * Math.sin(a + Math.PI / 4) * 0.1;
          r = view.jr * 0.8;
          let opacity = 0;
          if (i === 3 && player.move_x > 0) {
            opacity = 112 * player.move_nx;
          } else if (i === 1 && player.move_x < 0) {
            opacity = 112 * -player.move_nx;
          } else if (i === 0 && player.move_y > 0) {
            opacity = 112 * player.move_ny;
          } else if (i === 2 && player.move_y < 0) {
            opacity = 112 * -player.move_ny;
          }
          ctx.fillStyle = "#555a";
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.arc(x, y, r, a, (a + Math.PI / 2) % (Math.PI  * 2));
          ctx.fill();
          ctx.fillStyle = "#dd88bb" + Math.floor(opacity).toString(16).padStart(2, "0");
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.arc(x, y, r, a, (a + Math.PI / 2) % (Math.PI  * 2));
          ctx.fill();
        }
      }
    }
    if ("right button") {
      // draw right button
      x = view.jx + v.width / 2;
      y = view.jy;
      r = v.width / 2 - view.jx;
      r *= 0.8;
      ctx.fillStyle = "#d8b3";
      draw.circle(x, y, r);
      ctx.fill();
      if (mouse.touches.length > 1) {
        for (const t of mouse.touches) {
          joybutton_mouse(...t);
        }
      } else {
        joybutton_mouse(mouse.x, mouse.y, mouse.id);
      }
      r *= 0.8;
      ctx.fillStyle = "#555a";
      draw.circle(x, y, r);
      ctx.fill();
      if (player.acted) {
        ctx.fillStyle = "#d8b7";
        ctx.fill();
      }
    }
  }
  camera.draw();
  particle.draw();
  panel.draw();
};

const tick = function(time) {
  v.time += 1;
  const dt = time - v.realtime;
  v.realtime = time;
  v.button_press = {};
  camera.tick();
  physics.tick(dt);
  player.tick();
  particle.tick();
  firebase.tick(time);
  maindraw();
  key_tick();
  tick_after();
  requestAnimationFrame(tick);
};

const tick_after = function() {
  if (mouse.touches.length <= 0) {
    mouse.x = false;
    mouse.y = false;
    mouse.id = false;
  }
  mouse.newtaps = []; // mouse.newtaps.filter((t) => t.active);
  // do a save every 1 second?
  if (v.time % 60 === 0) {
    save_game();
  }
  for (const id in mouse.start_point) {
    mouse.hold_time[id] = (mouse.hold_time[id] ?? 0) + 1;
  }
  for (const k in v.button_time) {
    if (v.button_press[k]) {
      v.button_press[k] = false;
    } else {
      v.button_time[k] = -1;
    }
  }
};

const canvas_init = function() {
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
};

const resize = function() {
  v.ratio = window.devicePixelRatio;
  v.width = window.innerWidth;
  v.height = window.innerHeight;
  canvas.width = v.width * v.ratio;
  canvas.height = v.height * v.ratio;
  ctx.scale(v.ratio, v.ratio);
  v.mobile = v.width < v.height;
  view.total_size = Math.min(v.width, v.height);
  view.cx = v.width / 2;
  view.cy = view.total_size / 2;
  view.x = view.cx - view.size / 2;
  view.y = view.cy - view.size / 2;
  if (v.mobile) {
    view.jy = view.total_size + (v.height - view.total_size) / 2;
    view.jr = Math.min(v.width * 0.6, v.height - view.total_size) * 0.45;
    view.jx = v.width * 0.3;
  }
  panel.resize();
};

const touchstart_handler = function(event) {
  event.preventDefault();
  for (const touch of event.changedTouches) {
    const o = {
      x: touch.clientX * v.ratio,
      y: touch.clientY * v.ratio,
      active: true,
    };
    mouse.newtaps.push(o);
    mouse.start_point[touch.identifier] = o;
  }
};

const mousedown_handler = function(event) {
  const o = {
    x: event.clientX * v.ratio,
    y: event.clientY * v.ratio,
    active: true,
  };
  /*if (!panel.active && event.buttons & 1) {
    player.act();
  } else {*/
    mouse.newtaps.push(o);
    mouse.start_point[-1] = o;
  // }
};

const touch_handler = function(event) {
  event.preventDefault();
  mouse.touches = [];
  for (const touch of event.touches) {
    mouse.touches.push([touch.clientX * v.ratio, touch.clientY * v.ratio, touch.identifier]);
  }
  if (event.touches.length > 0) {
    mouse.x = mouse.touches[0][0];
    mouse.y = mouse.touches[0][1];
    mouse.id = mouse.touches[0][2];
    // console.log(mouse.touches);
  } else {
    // mouse.x = false;
    // mouse.y = false;
  }
};

const mouse_handler = function(event) {
  mouse.touches = [[event.clientX * v.ratio, event.clientY * v.ratio, -1]];
  mouse.x = mouse.touches[0][0];
  mouse.y = mouse.touches[0][1];
  mouse.id = mouse.touches[0][2];
};

const touchend_handler = function(event) {
  for (const touch of event.changedTouches) {
    delete mouse.start_point[touch.identifier];
    delete mouse.hold_time[touch.identifier];
  }
};

const mouseup_handler = function(event) {
  delete mouse.start_point[-1];
  delete mouse.hold_time[-1];
};

const keydown = function(event) {
  if (event.repeat) return;
  v.keys[event.code] = true;
};

const keyup = function(event) {
  v.keys[event.code] = false;
};

const key_tick = function(event) {
  let dx = 0;
  let dy = 0;
  if (v.keys.ArrowLeft || v.keys.KeyA) {
    dx -= 1;
  }
  if (v.keys.ArrowRight || v.keys.KeyD) {
    dx += 1;
  }
  if (v.keys.ArrowUp || v.keys.KeyW) {
    dy -= 1;
  }
  if (v.keys.ArrowDown || v.keys.KeyS) {
    dy += 1;
  }
  if (v.keys.Space || v.keys.Enter) {
    player.act();
  }
  player.pre_move(dx * 100, dy * 100);
};

const scroll_handler = function(event) {
  event.preventDefault();
  return false;
};

const save_game = function() {
  const raw_save = map.save();
  localStorage.setItem("save", raw_save);
  return;
};

const before_unload = function(event) {
  save_game();
  firebase.remove("/quad/positions/" + the_id);
};

// window handlers
window.addEventListener("load", init);
window.addEventListener("resize", resize);
window.addEventListener("keydown", keydown);
window.addEventListener("keyup", keyup);
window.addEventListener("touchstart", touchstart_handler);
window.addEventListener("touchstart", touch_handler);
window.addEventListener("touchmove", touch_handler);
window.addEventListener("touchend", touch_handler);
window.addEventListener("touchend", touchend_handler);
window.addEventListener("mousedown", mousedown_handler);
window.addEventListener("mousedown", mouse_handler);
window.addEventListener("mousemove", mouse_handler);
window.addEventListener("mouseup", mouseup_handler);
window.addEventListener("mouseup", mouse_handler);
window.addEventListener("beforeunload", before_unload);

// this is me spamming to fix the funny canvas sliding problem on iOS
window.addEventListener("contextmenu", scroll_handler);
window.addEventListener("wheel", scroll_handler);
window.addEventListener("mousewheel", scroll_handler);
window.addEventListener("scroll", scroll_handler);
window.addEventListener("touchcancel", scroll_handler);
canvas.addEventListener("touchstart", scroll_handler);
canvas.addEventListener("touchmove", scroll_handler);
canvas.addEventListener("touchend", scroll_handler);
canvas.addEventListener("touchcancel", scroll_handler);