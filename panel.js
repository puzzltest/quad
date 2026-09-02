import { ctx, v, view, mouse } from "./index.js";
import { camera, mini_theme } from "./camera.js";
import { map, objects } from "./map.js";
import { player } from "./player.js";
import { util } from "./util.js";
import { firebase, temp, the_id } from "./database.js";
import { draw } from "./draw.js";
import { english10, english20, english35, english40, english50 } from 'https://cdn.jsdelivr.net/npm/wordlist-js@2.0.0/+esm';
import { particle } from "./particle.js";

export const panel = {
  x: 0,
  y: 0,
  size: 0,
  active: false,
  time: 0,
  o: null,
  letters: {},
  lock_mode: false,
  total_solved: 0,
  total_solved_h: 0,
  total_correct: 0,
  touch_state: {},
  words: new Set(),
  words_loaded: false,
  lb: [],
  lb2: [],
  lbfn: {
    f: null,
    g: null,
    t: null,
    id: "",
  },
  sign: {
    active: false,
    time: 0,
    o: null,
    type: "",
    text: "",
  },
  talk: {
    active: false,
    time: 0,
    o: null,
    type: "",
    text: [],
    i: 0,
  },
  map: {
    active: false,
    time: 0,
    x: 0,
    y: 0,
    z: map.start_point.z, // a bit unnecessary...
  },
  randomizer: {},
};

export const panels = {};

for (const o of objects) {
  if (!o.panel?.id) continue;
  panels[o.panel.id] = o.panel;
}

const panel_draw_symbols = {};
const panel_updates = {};
const panel_checks = {};
const sign_functions = {};
const sign_pictures = {};
const symbol_functions = {};
const door_custom = {};

panel.init = async function() {
  panel.active = false;
  panel.sign.active = false;
  panel.talk.active = false;
  map.door_custom = door_custom;
  map.panel_ref = panel;
  map.player_ref = player;
  map.util_ref = util;
  map.v_ref = v;
  panel.randomizer.init();
  await util.loadlist(panel.words);
  panel.words_loaded = true;
};

panel.activate = function() {
  const p = panel.o.panel;
  // panel.initstate(p.w, p.h, p.initial);
  panel.lock_mode = false;
  if (p.randomtype && (p.random || p.correct)) {
    panel.randomizer.set(p.id);
  }
  else if (!p.randomtype && (p.random || (p.fullseed && p.correct))) {
    if (!panel.randomizer.load(p.id)) {
      panel.active = false;
      panel.deactivate();
      return;
      // panel.o.panel.correct = false;
      // panel.update_correct();
      // panel.o = null;
    }
  }
  if (panel.lbfn.t) {
    clearTimeout(panel.lbfn.t);
    panel.lbfn.t = null;
  }
  if (panel.lbfn.id !== p.id || panel.lbfn.f == null) {
    panel.lbfn.f?.();
    panel.lbfn.id = p.id;
    panel.lbfn.f = firebase.listen_child(`/qac/puzls/${map.name}__${p.id}/`, function(lb) {
      panel.lb = [];
      panel.lb2 = [];
      for (const name in lb) {
        const l = ["me", "example"].includes(name) ? panel.lb2 : panel.lb;
        l.push({ name, time: lb[name], });
      }
      panel.lbfn.g?.(panel.lb, panel.lb2);
    });
  }
};

panel.deactivate = function() {
  clearTimeout(panel.lbfn.t);
  panel.lbfn.g = null;
  panel.lbfn.t = setTimeout(function() {
    panel.lbfn.f?.();
    panel.lbfn.f = null;
    panel.lbfn.t = null;
    panel.lbfn.id = null;
    panel.lb = [];
    panel.lb2 = [];
  }, 30000);
};

panel.clearstate = function() {
  const p = panel.o.panel;
  for (let y = 0; y < p.h; y++) {
    for (let x = 0; x < p.w; x++) {
      if (+p.lock[y][x] == 1) continue;
      if (+p.map[y][x] == 2) {
        p.state[y][x] = 0;
      }
    }
  }
};

panel.sign.toggle = function(o) {
  panel.sign.active = !panel.sign.active;
  panel.sign.o = o;
  if (panel.sign.active) panel.sign.activate();
  else panel.sign.deactivate();
}

panel.sign.activate = function() {
  const title = panel.sign.o.title;
  if (sign_functions.hasOwnProperty(title)) {
    sign_functions[title]();
  }
};

panel.sign.deactivate = function() {

};

panel.talk.toggle = function(o) {
  if (panel.talk.active) {
    if (panel.talk.time < panel.talk.text[panel.talk.i].length) {
      panel.talk.time += 12345;
      return;
    }
    if (panel.talk.i + 1 >= panel.talk.text.length) {
      panel.talk.active = false;
      panel.talk.deactivate();
    } else {
      panel.talk.i++;
      panel.talk.time = 0;
    }
  } else {
    panel.talk.active = true;
    panel.talk.o = o;
    panel.talk.activate();
  }
};

panel.talk.activate = function() {
  panel.talk.i = 0;
};

panel.talk.deactivate = function() {

};

panel.resize = function() {
  panel.size = view.size * 0.85;
  panel.x = 0;//view.cx - panel.size / 2;
  panel.y = 0;//view.cy - panel.size / 2;
};

panel.draw = function() {
  let x, y, w, h;
  if (panel.active) {
    panel.time++;
    const p = panel.o.panel;
    const size_ = panel.size / Math.max(p.w, p.h);
    const size = size_ * 0.85;
    const gap = panel.size / (1 + Math.max(p.w, p.h)) * 0.15;
    const panel_w = size_ * p.w;
    const panel_h = size_ * p.h;
    ctx.fillStyle = p.correct ? "#8daa" : "#bafa";
    if (player.self_active) ctx.fillStyle = "#c76a";
    draw.rectangle(view.cx, view.cy, view.size + 1, view.size + 1);
    ctx.fill();
    x = view.cx;
    y = view.cy;
    const filtered_checks = p.checks?.filter(check => panel_draw_symbols[check] != undefined);
    if (filtered_checks?.length >= 1) {
      // draw checks
      y -= view.size * 0.43;
      ctx.fillStyle = "#111";
      draw.roundrectangle(x, y, panel_w, view.size * 0.1, size * 0.1);
      ctx.fill();
      ctx.fillStyle = "#eee";
      ctx.strokeStyle = "#eee";
      x -= (filtered_checks.length - 1) / 2 * view.size * 0.11;
      for (const check of filtered_checks) {
        panel_draw_symbols[check]?.("", x, y, view.size * 0.07, view.size * 0.07);
        x += view.size * 0.11;
      }
      x = view.cx; // reset
      y += view.size * 0.49; // net down 0.06
    }
    ctx.fillStyle = "#111";
    draw.roundrectangle(x, y, panel_w, panel_h, size * 0.1);
    ctx.fill();
    x -= (size * p.w + gap * p.w - gap) / 2;
    y -= (size * p.h + gap * p.h - gap) / 2;
    // draw cells
    for (let i = 0; i < p.w; i++) {
      for (let j = 0; j < p.h; j++) {
        let s = +p.state[j][i];
        let locked = +p.lock[j][i];
        let n = +p.map[j][i];
        draw.roundrect(x, y, size, size, size * 0.1);
        if (s || n === 1) {
          ctx.fillStyle = "#eee";
          ctx.fill();
        }
        if (n === 2) {
          ctx.strokeStyle = p.correct ? "#8da" : "#baf";
          if (locked || player.self_active) ctx.strokeStyle = "#c76";
          ctx.lineWidth = size * 0.05;
          ctx.stroke();
          const check = mouse.check(true);
          if (check) {
            let state = panel.touch_state[check.id] ?? 1;
            if (panel.lock_mode && !player.self_active) {
              p.lock[j][i] = check.drag ? state : 1 - locked;
              state = 1 - locked;
            } else if (!locked) {
              p.state[j][i] = check.drag ? state : 1 - s;
              state = 1 - s;
            }
            if (!check.drag) panel.touch_state[check.id] = state;
          }
        }
        for (const symbol in p.hide_symbols ? [] : p.symbols) {
          const str = p.symbols[symbol][j][i];
          if (str !== ".") {
            panel_draw_symbols[symbol](str, x + size / 2, y + size / 2, size, size, s);
          }
        }
        y += size + gap;
      }
      y -= (size + gap) * p.h;
      x += size + gap;
    }
    // panel stuff
    panel.update_panel();
  }
  else {
    panel.time = 0;
    if (panel.sign.active) {
      panel.sign.time++;
      panel.draw_sign();
    } else panel.sign.time = 0;
    if (panel.talk.active) {
      panel.talk.time++;
      panel.draw_talk();
    } else panel.talk.time = 0;
    if (panel.map.active) {
      panel.draw_map();
    }
  }
};

panel.draw_talk = function() {
  let x = view.cx;
  let y = view.cy + view.size * 0.3;
  let w = view.size * 0.9;
  let h = view.size * 0.3;
  let r = view.size * 0.05;
  ctx.fillStyle = "#dc9e";
  draw.roundrectangle(x, y, w, h, r);
  ctx.moveTo(x + w * 0.2, y - h * 0.5);
  ctx.lineTo(x, y - h * 0.77);
  ctx.lineTo(x + w * 0.1, y - h * 0.5);
  ctx.fill();
  ctx.fillStyle = "#111";
  const s = panel.talk.text[panel.talk.i].substring(0, panel.talk.time);
  draw.split_text(s, x, y, w * 0.9, h, h * 0.1);
};

panel.draw_sign = function() {
  ctx.fillStyle = "#974e";
  ctx.strokeStyle = "#543";
  ctx.lineWidth = 2.5;
  let x = view.cx;
  let y = view.cy - view.size * 0.075;
  let w = view.size * 0.9;
  let h = view.size * 0.75;
  draw.rectangle(x, y, w, h);
  ctx.fill();
  ctx.stroke();
  draw.rectangle(x, view.cy + view.size * 0.375, view.size * 0.08, view.size * 0.15);
  ctx.fill();
  ctx.stroke();
  // draw sign content
  const o = panel.sign.o;
  const type = o.sign;
  const content = o.content;
  if (type === "text") {
    sign_pictures.text(x, y, w, h, o);
  } else if (type === "picture") {
    sign_pictures[content](x, y, w, h);
  }
};

panel.draw_map = function() {
  let x = view.cx;
  let y = view.cy;
  const z = panel.map.z;
  let w = view.size * 0.85;
  let h = view.size * 0.85;
  ctx.fillStyle = "#eaf8";
  draw.rectangle(x, y, view.size, view.size);
  ctx.fill();
  ctx.fillStyle = "#ede";
  draw.roundrectangle(x, y, w, h);
  ctx.fill();
  if (panel.map.static && !(player.move_x === 0 && player.move_y === 0) && player.move_r2 >= 25 * 25) {
    const dx = player.move_nx;
    const dy = player.move_ny;
    const speed = 0.5;
    panel.map.x += dx * speed;
    panel.map.y += dy * speed;
    player.move_x = 0;
    player.move_y = 0;
  } else if (!panel.map.static) {
    panel.map.x = camera.cx;
    panel.map.y = camera.cy;
  }
  if ("draw map") {
    ctx.save();
    draw.rectangle(x, y, w * 0.92, h * 0.92);
    ctx.clip();
    const check = mouse.check();
    if (check) {
      player.add_map_marker();
    }
    const scale = 50;
    const size = view.size / scale + 1;
    for (let x = Math.floor(panel.map.x - scale / 2); x <= panel.map.x + scale / 2 + 1; x++) {
      for (let y = Math.floor(panel.map.y - scale / 2); y <= panel.map.y + scale / 2 + 1; y++) {
        const m = map.get_map(x, y, z);
        let t = m?.theme ?? map.z_themes[z] ?? "normal";
        let s = map.get_tile(x, y, z) ?? ".";
        let o = map.get_object(x, y, z);
        if (o?.invisible) o = undefined;
        if (m && m.id && !map.visited.has(m.id)) {
          t = map.z_themes[z] ?? "normal";
          s = ".";
          o = undefined;
        }
        let xx = view.cx + (x - panel.map.x) * view.size / scale;
        let yy = view.cy + (y - panel.map.y) * view.size / scale;
        let fill = mini_theme[t][o?.type] ?? mini_theme.normal[o?.type] ?? mini_theme[t][s] ?? mini_theme.normal[s];
        if (!fill) continue;
        if (typeof fill === "function") {
          fill = fill(o);
          if (fill.length === 1) {
            if (fill === " ") fill = s;
            fill = mini_theme[t][fill] ?? mini_theme.normal[fill];
          }
        }
        ctx.fillStyle = fill;
        draw.rectangle(xx, yy, size + 1, size + 1);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 0.5 + 0.5 * util.bounce(v.time, 20);
    let px = view.cx + (player.x - panel.map.x) * view.size / scale;
    let py = view.cy + (player.y - panel.map.y) * view.size / scale;
    ctx.fillStyle = "#e54f";
    ctx.strokeStyle = "#ffff";
    ctx.lineWidth = size * 0.05;
    draw.circle(px, py, size * 0.5);
    ctx.fill();
    ctx.stroke();
    ctx.globalAlpha *= 0.5;
    // for (const ok in player.others) {
    //   if (ok === the_id) continue;
    //   const op = player.others[ok];
    //   if (op.z != player.z || op.m !== map.name) continue;
    //   const m = map.get_map(Math.floor(op.x), Math.floor(op.y), Math.floor(op.z));
    //   if (m && m.id && !map.visited.has(m.id)) continue;
    //   px = view.cx + (op.x - panel.map.x) * view.size / scale;
    //   py = view.cy + (op.y - panel.map.y) * view.size / scale;
    //   ctx.fillStyle = "#5e4";
    //   ctx.strokeStyle = "#eee";
    //   ctx.lineWidth = size * 0.05;
    //   draw.circle(px, py, size * 0.3);
    //   ctx.fill();
    //   ctx.stroke();
    // }
    for (const marker of map.markers) {
      if (marker.z !== player.z) continue;
      px = view.cx + (marker.x - panel.map.x) * view.size / scale;
      py = view.cy + (marker.y - panel.map.y) * view.size / scale;
      ctx.fillStyle = "#5e4";
      ctx.strokeStyle = "#eee";
      ctx.lineWidth = size * 0.05;
      draw.circle(px, py, size * 0.3);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }
};

panel.check_answer = function(state, answer) {
  for (let y = 0; y < answer.length; y++) {
    for (let x = 0; x < answer[y].length; x++) {
      if (answer[y][x] === ".") continue;
      if (state[y][x] != answer[y][x]) return false;
    }
  }
  return true;
};

panel.update_panel = function(optional_pid) {
  const o = (optional_pid) ? map.get_panel(optional_pid) : panel.o;
  const p = o.panel;
  panel_updates[p.id]?.(p);
  for (const function_name of p.updates ?? []) {
    panel_updates[function_name]?.(p);
  }
  const doors_x = map.get_doors_x(p.id);
  if (doors_x) {
    panel.update_doors(doors_x);
  }
  const old_correct = p.correct;
  p.correct = panel.check_correct(optional_pid);
  if (p.correct !== old_correct) {
    panel.update_correct(optional_pid);
  }
};

panel.check_correct = function(optional_pid) {
  const o = (optional_pid) ? map.get_panel(optional_pid) : panel.o;
  const p = o.panel;
  let off = false;
  if (p.random) return p.solved;
  if (p.answer) {
    return panel.check_answer(p.state, p.answer);
  }
  // check "global" conditions
  if (panel_checks[p.id] && (panel_checks[p.id](p) == false)) return false;
  for (const function_name of p.checks ?? []) { // additional custom check functions
    if (function_name === "wrong") { off = true; continue; }
    if (panel_checks[function_name](p) == false) return false;
  }
  panel.letters = {};
  // check all symbols
  for (const symbol_name in p.symbols) {
    for (let y = 0; y < p.h; y++) {
      for (let x = 0; x < p.w; x++) {
        const s = p.symbols[symbol_name][y][x];
        if (s !== ".") {
          const sss = off ? panel.off_symbol(symbol_name, s) : s;
          let wrong = true;
          for (const ss of sss) {
            const c = panel.check_symbol_correct(p, symbol_name, ss, x, y);
            if (c != false) wrong = false;
          }
          if (wrong) return false;
        }
      }
    }
  }
  // check after
  const ks = Object.keys(panel.letters);
  if (ks.length > 0) {
    let word = "";
    for (let i = 1; i <= Math.max(...ks); i++) {
      if (!panel.letters[i]) return false;
      word += " abcdefghijklmnopqrstuvwxyz"[panel.letters[i]];
    }
    if (!panel.words.has(word)) return false;
  }
  return true;
};

panel.put_letter = function(s, n) {
  if (+s === 0) return true;
  s = parseInt(s, 36);
  if (panel.letters[s] != undefined && panel.letters[s] !== n) return false;
  panel.letters[s] = n;
  return true;
};

panel.off_symbol = function(name, s) {
  if (name === "circle" || name === "ruing" || name === "copyright" || Object.keys(symbol_colours).includes(name)) {
    return s;
  }
  let result = "", a = ["0", "a"], b = ["9", "z"];
  if (name === "diagonal" || name === "shapenumber") {
    if (s === "a") return "jb";
    if (s === "j") return "a";
  }
  else if (name === "ring" || name === "donut" || name === "squaring" || name === "balance") {
    b.push("1", "3");
    a.push("2");
  }
  else if (name === "ringnumber" || name === "ringhole") {
    if (s === "9") return "8a";
    else if (s === "a") return "9b";
  }
  if (!a.includes(s)) result += util.sadd(s, -1);
  if (!b.includes(s)) result += util.sadd(s, 1);
  return result;
};

panel.check_symbol_correct = function(p, name, s, x, y) {
  if (name === "number") {
    let total = 0;
    for (const [dx, dy] of util.dir5) {
      const n = (p.state[y + dy] == undefined || p.state[y + dy][x + dx] == undefined) ? 0 : p.state[y + dy][x + dx];
      if (+n) total++;
    }
    return (total === +s);
  }
  else if (name === "diagonal") {
    let total = 0, dirs = util.dir5x;
    if (s > "9") {
      s = s === "j" ? 0 : parseInt(s, 36) - 9;
      dirs = util.dir9;
    }
    for (const [dx, dy] of dirs) {
      const n = (p.state[y + dy] == undefined || p.state[y + dy][x + dx] == undefined) ? 0 : p.state[y + dy][x + dx];
      if (+n) total++;
    }
    return (total === +s);
  }
  else if (name === "ring") {
    for (const v of util.bfs(p.state, x, y)) {
      if (v.x === x && v.y === y) continue;
      if (p.symbols.ring[v.y][v.x] !== ".") return false;
    }
    return true;
  }
  else if (name === "ringnumber") {
    const area = util.bfs(p.state, x, y).length;
    return (area === +parseInt(s, 36));
  }
  else if (name === "circle") {
    let has_same = false;
    for (const v of util.bfs(p.state, x, y)) {
      if (v.x === x && v.y === y) continue;
      const circle = p.symbols.circle[v.y][v.x];
      if (circle === ".") continue;
      if (circle == s) {
        has_same = true;
      } else {
        return false;
      }
    }
    return has_same;
  }
  else if (name === "ruing") {
    if (!p.ruin) {
      console.warn("no shape!");
      return false;
    }
    if (s == 0)
      return util.compare_shape(util.bfs_to_shape(util.bfs(p.state, x, y)), p.ruin);
    else if (s == 1) {
      let bfs_result = util.bfs(p.state, x, y);
      if (bfs_result.length !== util.size_of_shape(p.ruin)) return false;
      for (let i = 0; i < 4; i++) {
        if (util.compare_shape(util.bfs_to_shape(bfs_result), p.ruin)) {
          return true;
        } else {
          bfs_result = util.rotate_bfs_result(bfs_result);
        }
      }
      return false;
    }
  }
  else if (name === "donut") {
    const bfs_result = util.bfs(p.state, x, y);
    let compare = util.rotate_bfs_result(util.rotate_bfs_result(bfs_result));
    let yes = util.compare_shape(util.bfs_to_shape(bfs_result), util.bfs_to_shape(compare));
    if (s == 1 || s == 3) yes = !yes;
    return yes;
  }
  else if (name === "squaring") {
    const shape = util.bfs_to_shape(util.bfs(p.state, x, y));
    for (const char of shape.join("")) {
      if (char === ".") return (s == 1);
    }
    return (s == 0);
  }
  else if (name === "copyright") {
    let x_ = x, y_ = y;
    if (s == 0) x_ = (x + 1 >= p.w) ? 0 : (x + 1);
    else if (s == 1) y_ = (y + 1 >= p.h) ? 0 : (y + 1);
    else if (s == 2) x_ = (x - 1 < 0) ? (p.w - 1) : (x - 1);
    else if (s == 3) y_ = (y - 1 < 0) ? (p.h - 1) : (y - 1);
    const bfs_left = util.bfs(p.state, x, y);
    const shape_left = util.bfs_to_shape(bfs_left);
    for (const o of bfs_left) {
      if (o.x === x_ && o.y === y_) {
        return false;
      }
    }
    const bfs_right = util.bfs(p.state, x_, y_);
    const shape_right = util.bfs_to_shape(bfs_right);
    if (false) {
      return util.compare_shape(shape_left, shape_right);
    } else if (true) {
      if (bfs_left.length !== bfs_right.length) return false;
      let bfs_result = bfs_left;
      for (let i = 0; i < 4; i++) {
        if (util.compare_shape(util.bfs_to_shape(bfs_result), shape_right)) {
          return true;
        } else {
          bfs_result = util.rotate_bfs_result(bfs_result);
        }
      }
      return false;
    } else { // s isn't 0 or 1
      return false;
    }
  }
  else if (name === "balance") {
    let bfs_result = util.bfs(p.state, x, y);
    const n = (s == 2 || s == 3) ? 4 : 1;
    for (let i = 0; i < n; i++) {
      let total_x = 0;
      let total_y = 0;
      let max_y = Number.NEGATIVE_INFINITY;
      for (const o of bfs_result) {
        total_x += o.x;
        total_y += o.y;
        max_y = Math.max(max_y, o.y);
      }
      let min_x = Number.POSITIVE_INFINITY;
      let max_x = Number.NEGATIVE_INFINITY;
      for (const o of bfs_result) {
        if (o.y === max_y) {
          min_x = Math.min(min_x, o.x);
          max_x = Math.max(max_x, o.x);
        }
      }
      const average_x = (total_x / bfs_result.length);
      const stable = min_x - 0.5001 <= average_x && average_x <= max_x + 0.5001;
      if (s == 0 || s == 2) {
        if (!stable) return false;
      } else if (s == 1 || s == 3) {
        if (stable) return false;
      }
      if (i + 1 < n) bfs_result = util.rotate_bfs_result(bfs_result);
    }
    return true;
  }
  else if (name === "ringhole") {
    const bfs_result = util.bfs(p.state, x, y);
    const holes = util.holes_in_shape(bfs_result);
    const h = holes.length;
    return ("" + h) == s;
  }
  else if (name === "shapenumber") {
    let bfs_result = util.bfs(p.state, x, y);
    let shape = util.bfs_to_shape(bfs_result);
    const n = util.shape_is_number(shape);
    if ((s == 1 || s == "a") && util.size_of_shape(shape) === 1) return false;
    if (s > "9") {
      const ss = s === "j" ? 0 : parseInt(s, 36) - 9;
      for (let i = 0; i < 3; i++) {
        if (("" + util.shape_is_number(shape)) == ss) return true;
        bfs_result = util.rotate_bfs_result(bfs_result);
        shape = util.bfs_to_shape(bfs_result);
      }
      return (("" + util.shape_is_number(shape)) == ss);
    } else {
      return ("" + n) == s;
    }
  }
  else if (name === "waterdrop") {
    const area = util.wfs(p.state, x, y).length;
    // if (area != window._debug) {
    //   console.log(area); window._debug = area;
    // }
    return (area >= +parseInt(s, 36));
  }
  else if (name === "red") {
    let c = p.state[y][x], a = 0;
    for (const [dx, dy, b] of util.dir8b) a += b * +(c === p.state[(y + dy + p.h) % p.h][(x + dx + p.w) % p.w]);
    for (let i = 0; i < util.numbers[0].length; i++) {
      if (a === util.numbers[0][i]) {
        return panel.put_letter(s, i + 1);
      }
    }
    return false;
  }
  else if (name === "orange") {
    const area = util.bfs(p.state, x, y).length;
    if (area > 26) return false;
    return panel.put_letter(s, area);
  }
  else if (name === "yellow") {
    let a = 0;
    for (const [dx, dy, b] of util.dir9b) a += b * (+p.state[(y + dy + p.h) % p.h][(x + dx + p.w) % p.w]);
    for (let i = 0; i < util.numbers[1].length; i++) {
      if (a === util.numbers[1][i] || 511 - a === util.numbers[1][i]) {
        return panel.put_letter(s, i + 1);
      }
    }
    return false;
  }
  else if (name === "green") {
    let a = 0;
    for (let i = 4, b = 1; i >= 0; i--, b *= 2) {
      a += b * (+p.state[y][(x + i + p.w) % p.w]);
    }
    if (a > 26) return false;
    return panel.put_letter(s, a);
  }
  else if (name === "cyan") {
    let a = "";
    for (let i = x, l = 0; i <= p.w; i++) {
      if (i < p.w && +p.state[y][i]) l += 1;
      else {
        if (l > 0) a += l > 1 ? "2" : "1";
        l = 0;
      }
    }
    a = parseInt(a, 3);
    for (let i = 0; i < util.numbers[2].length; i++) {
      if (a === util.numbers[2][i]) {
        return panel.put_letter(s, i + 1);
      }
    }
    return false;
  }
  else if (name === "blue") {
    let a = 0;
    for (const [dx, dy, b] of util.dir6b) a += b * (+p.state[(y + dy + p.h) % p.h][(x + dx + p.w) % p.w]);
    for (let i = 0; i < util.numbers[3].length; i++) {
      if (a === util.numbers[3][i]) {
        return panel.put_letter(s, i + 1);
      }
    }
    return false;
  }
  else if (name === "purple") {
    let a = 0;
    for (const [dx, dy, b] of util.dir9b) a += b * (+p.state[(y + dy + p.h) % p.h][(x + dx + p.w) % p.w]);
    for (let i = 0; i < util.numbers[4].length; i++) {
      if (a === util.numbers[4][i] || 511 - a === util.numbers[4][i]) {
        return panel.put_letter(s, i + 1);
      }
    }
    return false;
  }
  else { // unknown symbol name
    console.error("unknown symbol name: " + name);
  }
};

panel.update_correct = function(optional_pid) {
  const o = (optional_pid) ? map.get_panel(optional_pid) : panel.o;
  const p = o.panel;
  const f = o.body?.getFixtureList();
  if (p.correct) {
    panel.total_correct++;
    o.seen = true;
    if (!p.solved) {
      panel.total_solved++;
      if (panel.hidden || o.invisible) panel.total_solved_h++;
      if (temp.account.data?.name) panel.lb.push({ name: temp.account.data?.name, time: 1e20 });
    }
    p.solved = true;
    if (p.fresh) {
      p.solvecount = (p.solvecount ?? 0) + 1;
      p.fresh = false; // no longer can be solved for the first time
    }
    f?.setFilterData({
      groupIndex: 0,
      categoryBits: 0,
      maskBits: 65535,
    }); // empty
  } else {
    panel.total_correct--;
    f?.setFilterData({
      groupIndex: 0,
      categoryBits: 1,
      maskBits: 65535,
    }); // wall
  }
  const doors = map.get_doors(p.id);
  panel.update_doors(doors);
};

panel.update_doors = function(doors) {
  for (const d of doors ?? []) {
    if (!d.door) continue;
    if (map.check_door(d.door)) {
      const df = d.body?.getFixtureList();
      const empty = d.panel ? d.panel?.correct : d.door?.open;
      df?.setFilterData({
        groupIndex: 0,
        categoryBits: empty ? 0 : 1,
        maskBits: 65535,
      });
    }
  }
};

panel.symbol_function = function(type, o) {
  if (!type) return null;
  if (!symbol_functions[type]) return null;
  return symbol_functions[type]?.(o);
};

panel_draw_symbols.number = function(s, x, y, w, h, state) {
  ctx.fillStyle = (state) ? "#111" : "#eee";
  ctx.strokeStyle = ctx.fillStyle;
  ctx.lineWidth = w * 0.048;
  draw.rectangle(x, y, w * 0.65, h * 0.65);
  ctx.stroke();
  draw.set_font(w * 0.35, "bold");
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(s, x, y);
};

panel_draw_symbols.diagonal = function(s, x, y, w, h, state) {
  ctx.fillStyle = (state) ? "#111" : "#eee";
  ctx.strokeStyle = ctx.fillStyle;
  ctx.lineWidth = w * 0.048;
  ctx.translate(x, y);
  ctx.rotate(-Math.PI / 4);
  if (parseInt(s, 36) > 9) {
    // rotating
    s = parseInt(s, 36) - 9;
    ctx.rotate(Math.PI / 4 + (Math.sin(v.time / 25)));
  }
  draw.rectangle(0, 0, w * 0.6, w * 0.6);
  ctx.stroke();
  draw.reset_transform();
  draw.set_font(w * 0.35, "bold");
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(s, x, y);
};

panel_draw_symbols.ring = function(s, x, y, w, h, state) {
  ctx.strokeStyle = (state) ? "#111" : "#eee";
  ctx.lineWidth = w * 0.065;
  draw.circle(x, y, w * 0.3);
  ctx.stroke();
};

panel_draw_symbols.ringnumber = function(s, x, y, w, h, state) {
  ctx.strokeStyle = (state) ? "#111" : "#eee";
  ctx.lineWidth = w * 0.045;
  draw.circle(x, y, w * 0.35);
  ctx.stroke();
  ctx.fillStyle = (state) ? "#111" : "#eee";
  const n = parseInt(s, 36);
  draw.set_font(n > 9 ? w * 0.28 : w * 0.36, "bold");
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(n, x, y + 1);
};

const circle_colours = ["#d65", "#56b", "#6c5", "#cb4", "#4cc"];
panel_draw_symbols.circle = function(s, x, y, w, h, state) {
  ctx.fillStyle = circle_colours[s];
  draw.circle(x, y, w * 0.28);
  ctx.fill();
};

panel_draw_symbols.ruing = function(s, x, y, w, h, state) {
  ctx.strokeStyle = (state) ? "#111" : "#eee";
  ctx.lineWidth = w * 0.065;
  ctx.lineCap = "square";
  draw.circle(x, y, w * 0.34);
  ctx.stroke();
  if (s == 0) {
    draw.polygon(3, x, y, w * 0.28, Math.PI / 6);
    ctx.stroke();
  } else if (s == 1) {
    draw.polygon(3, x, y, w * 0.28, Math.PI / 6 + v.time * 0.03);
    ctx.stroke();
    // draw.rect_angle(x, y, w * 0.32, h * 0.32, Math.PI / 4, true);
    // draw.rect_angle(x, y, w * 0.32, h * 0.32, v.time * 0.03, true);
  }
};

panel_draw_symbols.squaring = function(s, x, y, w, h, state) {
  ctx.strokeStyle = (state) ? "#111" : "#eee";
  ctx.lineWidth = w * 0.065;
  ctx.lineCap = "square";
  draw.circle(x, y, w * 0.34);
  ctx.stroke();
  draw.polygon(4, x, y, w * 0.28, (s == 0 || s == 1) ? Math.PI / 4 : 0);
  ctx.stroke();
  if (s == 1 || s == 3) {
    draw.line(x + w * 0.24, y + h * 0.24, x - w * 0.24, y - h * 0.24);
    draw.line(x + w * 0.24, y - h * 0.24, x - w * 0.24, y + h * 0.24);
  }
};

panel_draw_symbols.donut = function(s, x, y, w, h, state) {
  ctx.strokeStyle = (state) ? "#111" : "#eee";
  ctx.lineWidth = w * 0.055;
  draw.circle(x, y, w * 0.34);
  ctx.stroke();
  if (s == 0 || s == 1) {
    draw.circle(x, y, w * 0.2);
    ctx.stroke();
  } else if (s == 2 || s == 3) {
    ctx.fillStyle = ctx.strokeStyle;
    draw.circle(x, y, w * 0.2);
    ctx.fill();
  }
  if (s == 1 || s == 3) {
    draw.line(x + w * 0.24, y + h * 0.24, x - w * 0.24, y - h * 0.24);
    draw.line(x + w * 0.24, y - h * 0.24, x - w * 0.24, y + h * 0.24);
  }
};

panel_draw_symbols.copyright = function(s, x, y, w, h, state) {
  ctx.strokeStyle = (state) ? "#111" : "#eee";
  ctx.lineWidth = w * 0.07;
  draw.circle(x, y, w * 0.33);
  ctx.stroke();
  draw.arc(x, y, w * 0.18, (0.6 + Math.PI / 2 * s) % (Math.PI * 2), (-0.6 + Math.PI / 2 * s) % (Math.PI * 2));
  ctx.stroke();
  /*
  ctx.fillStyle = (state) ? "#111" : "#eee";
  draw.set_font(w * 0.44, "bold");
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("c", x, y);
  */
};

panel_draw_symbols.balance = function(s, x, y, w, h, state) {
  ctx.strokeStyle = (state) ? "#111" : "#eee";
  ctx.lineWidth = w * 0.07;
  draw.circle(x, y, w * 0.33);
  ctx.stroke();
  ctx.fillStyle = ctx.strokeStyle;
  draw.set_font(w * 0.44, "bold");
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((s == 2 || s == 3) ? v.time / 30 : 0);
  ctx.fillText("♎︎", 0, 0);
  if ((s == 1 || s == 3)) {
    ctx.strokeStyle = (state) ? "#1119" : "#eee9";
    draw.line(w * 0.24, h * 0.24, -w * 0.24, -h * 0.24);
    draw.line(w * 0.24, -h * 0.24, -w * 0.24, h * 0.24);
  }
  ctx.restore();
};

panel_draw_symbols.ringhole = function(s, x, y, w, h, state) {
  ctx.strokeStyle = (state) ? "#111" : "#eee";
  ctx.lineWidth = w * 0.05;
  draw.circle(x, y, w * 0.36);
  ctx.stroke();
  const r = 0.2 + util.bounce(v.time, 30) * 0.08;
  draw.circle(x, y, w * r);
  ctx.stroke();
  ctx.fillStyle = ctx.strokeStyle;
  const a = w * 0.08, z = w * 0.04;
  if (s == 1) {
    draw.circle(x, y, z);
    ctx.fill();
  } else if (s == 2) {
    draw.circle(x - a, y + a, z);
    ctx.fill();
    draw.circle(x + a, y - a, z);
    ctx.fill();
  } else if (s == 3) {
    draw.circle(x, y - a, z);
    ctx.fill();
    draw.circle(x - a * 0.9, y + a * 0.6, z);
    ctx.fill();
    draw.circle(x + a * 0.9, y + a * 0.6, z);
    ctx.fill();
  } else if (+s >= 4) {
    const sides = Math.floor(+s / 2) * 2;
    let angle = 0;
    for (let i = 0; i < sides; i++) {
      angle += Math.PI * 2 / sides;
      draw.circle(x + a * 1.5 * Math.cos(angle), y + a * 1.5 * Math.sin(angle), z);
      ctx.fill();
    }
    if (+s % 2) {
      draw.circle(x, y, z);
      ctx.fill();
    }
  }
};

const seg7f = {
  a: (x, y, a, b) => draw.line(x - b, y - a, x + b, y - a),
  b: (x, y, a, b) => draw.line(x + b, y - a, x + b, y),
  c: (x, y, a, b) => draw.line(x + b, y, x + b, y + a),
  d: (x, y, a, b) => draw.line(x - b, y + a, x + b, y + a),
  e: (x, y, a, b) => draw.line(x - b, y, x - b, y + a),
  f: (x, y, a, b) => draw.line(x - b, y - a, x - b, y),
  g: (x, y, a, b) => draw.line(x - b, y, x + b, y),
};
panel_draw_symbols.shapenumber = function(s, x, y, w, h, state) {
  ctx.strokeStyle = (state) ? "#111" : "#eee";
  ctx.lineWidth = w * 0.045;
  draw.circle(x, y, w * 0.36);
  ctx.stroke();
  const a = w * 0.23, b = w * 0.12;
  ctx.save();
  ctx.translate(x, y);
  if (s > "9") {
    s = "" + (parseInt(s, 36) - 9);
    ctx.rotate(v.time / 30);
  }
  ctx.strokeStyle = (state) ? "#1112" : "#eee2";
  for (const c of "abcdefg") seg7f[c](0, 0, a, b);
  ctx.strokeStyle = (state) ? "#111" : "#eee";
  for (const c of util.seg7[+s]) seg7f[c](0, 0, a, b);
  ctx.restore();
};

panel_draw_symbols.waterdrop = function(s, x, y, w, h, state) {
  ctx.strokeStyle = (state) ? "#111" : "#eee";
  ctx.lineWidth = w * 0.015;
  draw.svg_stroke("water", x, y, w * 0.85);
  ctx.fillStyle = (state) ? "#111" : "#eee";
  const n = parseInt(s, 36);
  draw.set_font(n > 9 ? w * 0.25 : w * 0.32, "bold");
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(n, x, y + w * 0.1);
};

const symbol_colours = {
  red: "#d65",
  blue: "#56b",
  green: "#6c5",
  yellow: "#cb4",
  cyan: "#4cc",
  purple: "#c4c",
  orange: "#d84",
};
for (const symbol in symbol_colours) {
  panel_draw_symbols[symbol] = function(s, x, y, w, h, state) {
    ctx.fillStyle = symbol_colours[symbol];
    draw.polygon(3, x, y + h * 0.09, w * 0.4, Math.PI / 6);
    ctx.fill();
    if (s > "0") {
      ctx.fillStyle = "#111";
      const n = parseInt(s, 36);
      draw.set_font(n > 9 ? w * 0.25 : w * 0.32, "bold");
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(n, x, y + h * 0.08);
    }
  };
}

// todo symbols.amogus

panel_draw_symbols.snake = function(s, x, y, w, h) {
  ctx.lineWidth = w * 0.08;
  draw.rectangle(x, y, w, h);
  ctx.stroke();
  draw.line(x + w * 0.5, y + h * 0.5, x - w * 0.5, y - h * 0.5);
  draw.line(x + w * 0.5, y - h * 0.5, x - w * 0.5, y + h * 0.5);
  ctx.stroke();
};

panel_draw_symbols.sudoku = function(s, x, y, w, h) {
  ctx.lineWidth = w * 0.08;
  draw.rectangle(x, y, w, h);
  ctx.stroke();
  draw.rectangle(x - w * 0.25, y + h * 0.25, w * 0.5, h * 0.5);
  ctx.fill();
  draw.rectangle(x + w * 0.25, y - h * 0.25, w * 0.5, h * 0.5);
  ctx.fill();
};

panel_draw_symbols.equality = function(s, x, y, w, h) {
  ctx.lineWidth = w * 0.08;
  draw.circle(x, y, w * 0.55);
  ctx.stroke();
  draw.line(x - w * 0.23, y - h * 0.1, x + w * 0.23, y - h * 0.1);
  draw.line(x - w * 0.23, y + h * 0.1, x + w * 0.23, y + h * 0.1);
  ctx.stroke();
};

panel_draw_symbols.x3 = function(s, x, y, w, h) {
  ctx.lineWidth = w * 0.08;
  draw.rectangle(x - w * 0.33, y, w * 0.33, h * 0.33);
  ctx.stroke();
  draw.rectangle(x, y, w * 0.33, h * 0.33);
  ctx.stroke();
  draw.rectangle(x + w * 0.33, y, w * 0.33, h * 0.33);
  ctx.stroke();
  draw.line(x - w * 0.3, y - h * 0.3, x + w * 0.3, y + h * 0.3);
  draw.line(x - w * 0.3, y + h * 0.3, x + w * 0.3, y - h * 0.3);
  ctx.stroke();
};

panel_draw_symbols.mirror = function(s, x, y, w, h) {
  ctx.save();
  ctx.lineWidth = w * 0.08;
  draw.rectangle(x, y, w, h);
  ctx.stroke();
  ctx.setLineDash([w * 0.1, w * 0.1]);
  draw.line(x, y - h * 0.5, x, y + h * 0.5);
  ctx.stroke();
  ctx.restore();
};

panel_draw_symbols.wrong = function(s, x, y, w, h) {
  ctx.lineWidth = w * 0.08;
  draw.circle(x, y, w * 0.55);
  ctx.stroke();
  draw.line(x - w * 0.2, y - h * 0.2, x + w * 0.22, y + h * 0.2);
  draw.line(x - w * 0.2, y + h * 0.2, x + w * 0.22, y - h * 0.2);
  ctx.stroke();
};

const wordlist = [];
panel.randomizer.init = function() {
  for (const english of [english10, english20, english35, english40]) {
    for (const w of english) {
      if (w.length <= 6) {
        wordlist.push(w);
      }
    }
  }
  console.log(wordlist.length);
};

panel.randomizer.random = function(size, type, seed) {
  if (seed === undefined) {
    util.seed();
    seed = panel.randomizer.words(type);
  }
  if (type === undefined) {
    type = panel.randomizer.seed2type(seed);
  }
  const o = {};
  o.id = type + "_" + seed;
  o.name = size + "-" + seed;
  // console.log(seed);
  o.seed = seed;
  o.fullseed = type + "|" + seed;
  o.randomtype = type;
  o.w = size;
  o.h = size;
  o.fresh = true;
  // use deterministic random number generator, so that the next time the seed is provided the exact same puzzle can be generated
  util.seed(o.fullseed);
  // generate panel answer (yes repetition)
  const answer = [];
  if ("generate answer") {
    o.type = "binary";
    o.map = util.construct(size, () => 2);
    for (let i = 0; i < size; i++) {
      const temp_answer = [];
      for (let j = 0; j < size; j++) {
        temp_answer.push(util.randint(0, 1));
      }
      answer.push(temp_answer);
    }
    o.symbols = {};
  }
  if (type === "number_easy") {
    o.symbols.number = util.construct(size, function(x, y) {
      let num = 0;
      for (let [dx, dy] of util.dir5) {
        if (answer[y + dy] == undefined) continue;
        if (answer[y + dy][x + dx]) num++;
      }
      return "" + num;
    });
  }
  else if (type === "ring_easy") {
    const memo = util.construct(size, () => false);
    const rings = util.construct(size, () => ".");
    util.construct(size, function(x, y) {
      if (memo[y][x]) return 0;
      const bfs_result = util.bfs(answer, x, y);
      for (const o of bfs_result) {
        memo[o.y][o.x] = true;
      }
      const rand = util.randint(0, bfs_result.length - 1);
      const ringpos = bfs_result[rand];
      rings[ringpos.y][ringpos.x] = "0";
      return 1;
    });
    o.symbols.ring = rings;
    util.construct(size, function(x, y) {
      if (util.rand() < 0.4) {
        o.map[y][x] = answer[y][x];
      }
    });
  }
  else if (type === "ring_circle") {
    const memo = util.construct(size, () => false);
    const rings = util.construct(size, () => ".");
    const circles = util.construct(size, () => ".");
    util.construct(size, function(x, y) {
      if (memo[y][x]) return 0;
      const bfs_result = util.bfs(answer, x, y);
      for (const o of bfs_result) {
        memo[o.y][o.x] = true;
      }
      const rand = util.randint(0, bfs_result.length - 1);
      const ringpos = bfs_result[rand];
      rings[ringpos.y][ringpos.x] = "0";
      return 1;
    });
    o.symbols.ring = rings;
    o.symbols.circle = circles;
    util.construct(size, function(x, y) {
      if (util.rand() < 0.4) {
        o.map[y][x] = answer[y][x];
      }
    });
  }
  else if (type === "ringnumber") {
    const rings = util.construct(size, () => ".");
    util.construct(size, function(x, y) {
      if (util.rand() < 0.65) return 0;
      const bfs_result = util.bfs(answer, x, y);
      const rand = util.randint(0, bfs_result.length - 1);
      const ringpos = bfs_result[rand];
      rings[ringpos.y][ringpos.x] = "" + bfs_result.length.toString(36);
      return 1;
    });
    o.symbols.ringnumber = rings;
    util.construct(size, function(x, y) {
      if (util.rand() < 0.4) {
        o.map[y][x] = answer[y][x];
      }
    });
  }
  else if (type === "ring_and_number") {
    const memo = util.construct(size, () => false);
    const rings = util.construct(size, () => ".");
    util.construct(size, function(x, y) {
      if (memo[y][x]) return 0;
      const bfs_result = util.bfs(answer, x, y);
      for (const o of bfs_result) {
        memo[o.y][o.x] = true;
      }
      const rand = util.randint(0, bfs_result.length - 1);
      const ringpos = bfs_result[rand];
      rings[ringpos.y][ringpos.x] = "0";
      return 1;
    });
    o.symbols.ring = rings;
    /*util.construct(size, function(x, y) {
      if (util.rand() < 0.4) {
        o.map[y][x] = answer[y][x];
      }
    });*/
    o.symbols.number = util.construct(size, function(x, y) {
      if (rings[y][x] == "0") return ".";
      if (util.rand() < 0.5) return ".";
      let num = 0;
      for (let [dx, dy] of util.dir5) {
        if (answer[y + dy] == undefined) continue;
        if (answer[y + dy][x + dx]) num++;
      }
      return "" + num;
    });
  }
  else if (type === "ringnumber_and_number") {
    const rings = util.construct(size, () => ".");
    util.construct(size, function(x, y) {
      if (util.rand() < 0.65) return 0;
      const bfs_result = util.bfs(answer, x, y);
      const rand = util.randint(0, bfs_result.length - 1);
      const ringpos = bfs_result[rand];
      rings[ringpos.y][ringpos.x] = "" + bfs_result.length.toString(36);
      return 1;
    });
    o.symbols.ringnumber = rings;
    /*util.construct(size, function(x, y) {
      if (util.rand() < 0.4) {
        o.map[y][x] = answer[y][x];
      }
    })*/
    o.symbols.number = util.construct(size, function(x, y) {
      if (rings[y][x] != ".") return ".";
      if (util.rand() < 0.5) return ".";
      let num = 0;
      for (let [dx, dy] of util.dir5) {
        if (answer[y + dy] == undefined) continue;
        if (answer[y + dy][x + dx]) num++;
      }
      return "" + num;
    });
  }
  else if (type === "diagonal_easy") {
    o.symbols.diagonal = util.construct(size, function(x, y) {
      let num = 0;
      for (let [dx, dy] of util.dir5x) {
        if (answer[y + dy] == undefined) continue;
        if (answer[y + dy][x + dx]) num++;
      }
      return "" + num;
    });
  }
  else if (type === "diagonal_number") {
    o.symbols.number = util.construct(size, function(x, y) {
      if (util.rand() < 0.5) return ".";
      let num = 0;
      for (let [dx, dy] of util.dir5) {
        if (answer[y + dy] == undefined) continue;
        if (answer[y + dy][x + dx]) num++;
      }
      return "" + num;
    });
    o.symbols.diagonal = util.construct(size, function(x, y) {
      if (o.symbols.number[y][x] != ".") return ".";
      let num = 0;
      for (let [dx, dy] of util.dir5x) {
        if (answer[y + dy] == undefined) continue;
        if (answer[y + dy][x + dx]) num++;
      }
      return "" + num;
    });
  }
  if ("generate state") {
    o.state = util.construct(size, (x, y) => {
      return o.map[y][x] == "2" ? "0" : o.map[y][x];
    });
    o.lock = util.construct(size, () => 0);
  }
  return o;
};

panel.randomizer.set = function(id) {
  const o = map.get_panel(id);
  if (!o || !o?.panel) return false;
  const solved = o.panel.solved;
  const solvecount = o.panel.solvecount;
  o.panel = panel.randomizer.random(o.panel.w, o.panel.randomtype);
  o.panel.id = id;
  o.panel.solved = solved;
  o.panel.solvecount = solvecount;
  return true;
};

panel.randomizer.load = function(id) {
  const o = map.get_panel(id);
  if (!o || !o?.panel) return false;
  const solved = o.panel.solved;
  const solvecount = o.panel.solvecount;
  let name = prompt("name of puzzle?");
  if (name == undefined || !name) return false;
  name = name.replaceAll(" ", "-");
  const splat = name.split("-");
  if (splat.length < 2) return false;
  if (!splat[0].length) return false;
  const size = +splat[0];
  const seed = splat.slice(1).join("-");
  if (size == undefined || seed == undefined || !size || !seed || size < 0 || size > 20) return false;
  o.panel = panel.randomizer.random(size, undefined, seed);
  // o.panel.random = true;
  delete o.panel.randomtype;
  o.panel.id = id;
  o.panel.solved = solved;
  o.panel.solvecount = solvecount;
  return true;
};

panel.randomizer.types = ["number_easy", "ring_easy", "ring_circle", "ringnumber", "ring_and_number", "ringnumber_and_number", "diagonal_easy", "diagonal_number"];
const typecount_limit = 50;
panel.randomizer.words = function(type) {
  const l = wordlist.length;
  const bucket = Math.floor(l / typecount_limit);
  const i = panel.randomizer.types.indexOf(type);
  if (i === -1) {
    console.error("invalid randomizer type");
    return "";
  }
  const index = util.randrange(bucket * i, Math.min(l, bucket * (i + 1)));
  const result = [wordlist[index], wordlist[util.randrange(0, l)], wordlist[util.randrange(0, l)]].join("-")
  return result;
};

panel.randomizer.seed2type = function(words) {
  const l = wordlist.length;
  const bucket = Math.floor(l / typecount_limit);
  const word = words.split("-")[0];
  const i = wordlist.indexOf(word);
  if (i === -1) return "number_easy";
  const index = Math.floor(i / bucket);
  console.log(i, bucket, index);
  const type = panel.randomizer.types[index];
  return type ?? "number_easy";
};

(function() { // special function for 1234_n and c1234_n
  for (let i = 1; i < 4; i++) {
    for (let c = 0; c <= 1; c++) {
      const j = i + 1;
      const prefix = (c ? "c" : "") + "1234_";
      const n = c ? [0, 2, 3, 7, 9][j] : j;
      panel_updates[prefix + i] = function(p) {
        const o = map.get_panel(prefix + j);
        if (o) {
          const p2 = o.panel;
          const a = [];
          for (let y = 0; y < p.h; y++) {
            let s = "";
            for (let x = 0; x < p.w; x++) {
              s += p.state[y][x] ? n : ".";
            }
            a.push(s);
          }
          p2.symbols[c ? "ringnumber" : "number"] = a;
          panel.update_panel(prefix + j);
        }
      };
      panel_checks[prefix + j] = function(_) {
        return !!map.get_panel(prefix + i)?.panel?.correct;
      };
    }
  }
})();

panel_checks.nonempty = function(p) {
  for (let y = 0; y < p.h; y++) {
    for (let x = 0; x < p.w; x++) {
      if (p.state[y][x]) return true;
    }
  }
  return false;
};

panel_checks.snake = function(p) {
  for (let y = 0; y < p.h - 1; y++) {
    for (let x = 0; x < p.w - 1; x++) {
      const s = p.state[y][x];
      if (s === p.state[y+1][x] && s === p.state[y][x+1] && s === p.state[y+1][x+1]) return false;
    }
  }
  return true;
};

panel_checks.sudoku = function(p) {
  for (let y = 0; y < p.h; y++) {
    let s = 0;
    for (let x = 0; x < p.w; x++) s += p.state[y][x] ? 1 : 0;
    if (s !== p.w / 2) return false;
  }
  for (let x = 0; x < p.w; x++) {
    let s = 0;
    for (let y = 0; y < p.h; y++) s += p.state[y][x] ? 1 : 0;
    if (s !== p.h / 2) return false;
  }
  return true;
};

panel_checks.equality = function(p) {
  // not exactly the most averagely efficient way
  const f = util.bfs_all(p.state).flat();
  return f.every(a => a === f[0]);
};

panel_checks.x3 = function(p) {
  for (let y = 0; y < p.h; y++) {
    for (let x = 1, a = 0; x < p.w; x++) {
      if (p.state[y][x-1] === p.state[y][x]) {
        a++;
        if (a >= 2) return false;
      } else a = 0;
    }
  }
  for (let x = 0; x < p.w; x++) {
    for (let y = 1, a = 0; y < p.h; y++) {
      if (p.state[y-1][x] === p.state[y][x]) {
        a++;
        if (a >= 2) return false;
      } else a = 0;
    }
  }
  return true;
};

panel_checks.mirror = function(p) {
  let yes = true;
  for (let y = 0; y < p.h; y++) {
    for (let x = 0; x < Math.floor(p.w / 2); x++) {
      if (p.state[y][x] !== p.state[y][p.w - x - 1]) {
        yes = false;
        break;
      }
    }
    if (!yes) break;
  }
  if (yes) return true;
  else yes = true;
  for (let x = 0; x < p.w; x++) {
    for (let y = 0; y < Math.floor(p.h / 2); y++) {
      if (p.state[y][x] !== p.state[p.h - y - 1][x]) {
        yes = false;
        break;
      }
    }
    if (!yes) break;
  }
  if (yes) return true;
  else yes = true;
  for (let y = 0; y < p.h; y++) {
    for (let x = 0; x < Math.floor((p.w + 1) / 2); x++) {
      if (p.state[y][x] !== p.state[p.h - y - 1][p.w - x - 1]) {
        yes = false;
        break;
      }
    }
    if (!yes) break;
  }
  if (yes) return true;
  return false;
};

sign_pictures.text = function(x, y, w, h, o) {
  // todo scam
  // what was i saying 2 years ago
  ctx.translate(x, y);
  if (o.textangle) {
    ctx.rotate(o.textangle);
  }
  ctx.fillStyle = o.fontcolor ?? "#eee";
  draw.split_text(o.content, 0, 0, w * 0.95, h, h * (o.fontsize ?? 0.1));
  draw.reset_transform();
};

sign_pictures.smile_0 = function(x, y, w, h) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(0.1);
  ctx.fillStyle = "#8da";
  const r = Math.min(w, h) * 0.4;
  const size = r * 1.8 / 5;
  const gap = r * 0.2 / 6;
  const state = "01010.00000.00000.10001.01110".split(".");
  // ctx.filter = "blur(5px)";
  draw.rectangle(0, 0, r * 2, r * 2);
  ctx.fill();
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      ctx.fillStyle = (+state[j][i]) ? "#eee" : "#111";
      draw.rect(-r + gap * (i + 1) + size * i, -r + gap * (j + 1) + size * j, size, size);
      ctx.fill();
    }
  }
  ctx.restore();
  // ctx.filter = undefined;
  draw.reset_transform();
};

sign_pictures["1234_rotated"] = function(x, y, w, h) {
  ctx.save();
  ctx.translate(x, y);
  let r = Math.min(w, h) * 0.4;
  let size = r * 1.7 / 5;
  let gap = r * 0.3 / 6;
  ctx.fillStyle = "#111";
  ctx.strokeStyle = "#222";
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.5 * util.halfbounce(v.time, 120);
  draw.rectangle(0, 0, r * 2, r * 2);
  ctx.fill();
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if ((i + j) % 2 === 1) continue;
      if ((i === 0 || i === 4) && (j === 0 || j === 4)) continue;
      draw.roundrect(-r + gap * (i + 1) + size * i, -r + gap * (j + 1) + size * j, size, size, 5);
      ctx.stroke();
    }
  }
  ctx.rotate(util.halfbounce(v.time, 120) * -Math.PI / 4);
  ctx.globalAlpha = 0.5 - 0.5 * util.halfbounce(v.time, 120);
  r = Math.min(w, h) * 0.34;
  size = r * 1.8 / 3;
  gap = r * 0.2 / 4;
  draw.rectangle(0, 0, r * 2, r * 2);
  ctx.fill();
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      draw.roundrect(-r + gap * (i + 1) + size * i, -r + gap * (j + 1) + size * j, size, size, 5);
      ctx.stroke();
    }
  }
  draw.reset_transform();
  ctx.translate(x, y);
  ctx.rotate(-Math.PI / 4);
  ctx.globalAlpha = 0.05 * util.halfbounce(v.time, 120);
  r = Math.min(w, h) * 0.24;
  size = r * 1.7 / 2;
  gap = r * 0.3 / 3;
  ctx.fillStyle = "#eee";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  draw.set_font(size * 0.5);
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      ctx.fillText(j * 2 + i + 1, -r + gap * (i + 1) + size * (i + 0.5), -r + gap * (j + 1) + size * (j + 0.5));
    }
  }
  ctx.restore();
};

sign_pictures.IA = function(x, y, w, h) {
  const lines_IA = [
    [-1, -1, -1, 1],
    [0, -1, 0, 1],
    [1, -1, 1, 1],
    [0, -1, 1, -1],
    [0, 0, 1, 0],
  ];
  ctx.translate(x, y);
  const r = Math.min(w, h) * 0.35;
  ctx.scale(r, r);
  ctx.strokeStyle = "#eee";
  ctx.lineWidth = 0.05;
  ctx.shadowColor = "#fff";
  ctx.shadowBlur = Math.round(r * 0.2 * util.bounce(v.time, 60));
  for (const line of lines_IA) {
    draw.line(line[0], line[1], line[2], line[3]);
    draw.line(line[0], line[1], line[2], line[3]);
    draw.line(line[0], line[1], line[2], line[3]);
    ctx.stroke();
  }
  ctx.shadowColor = undefined;
  ctx.shadowBlur = 0;
  draw.reset_transform();
};

sign_pictures.IA_invisible = function(x, y, w, h) {
  const r = Math.min(w, h) * 0.4;
  const size = r * 1.7 / 4;
  const gap = r * 0.3 / 5;
  const xx = x, yy = y;
  const diagonal_symbols = `
    ....
    .50.
    .05.
    ....
  `.trim().replaceAll(/[ ]/g, "").split("\n");
  ctx.strokeStyle = "#eee";
  draw.roundrectangle(xx, yy, r * 2, r * 2, r * 0.05);
  ctx.stroke();
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      const s = diagonal_symbols[y][x];
      if (s === ".") continue;
      panel_draw_symbols.diagonal(s, xx - r + gap * (x + 1) + size * x, yy - r + gap * (y + 1) + size * y, size, size, 0);
    }
  }
};

sign_functions["answer :)"] = function(o) {
  const othersign = map.get_sign("failed tutorial :(");
  if (!othersign.content.includes("wait")) {
    othersign.content = othersign.content.replace(" :)", "... wait you already looked at it :)");
  }
};

symbol_functions.arrow_left = function(o) {
  map.physics_ref.teleport_player(o.x, o.y, o.z);
  map.physics_ref.move_player(-50 * player.speed, 0);
};
symbol_functions.arrow_right = function(o) {
  map.physics_ref.teleport_player(o.x, o.y, o.z);
  map.physics_ref.move_player(50 * player.speed, 0);
};
symbol_functions.arrow_up = function(o) {
  map.physics_ref.teleport_player(o.x, o.y, o.z);
  map.physics_ref.move_player(0, -50 * player.speed);
};
symbol_functions.arrow_down = function(o) {
  map.physics_ref.teleport_player(o.x, o.y, o.z);
  map.physics_ref.move_player(0, 50 * player.speed);
};

symbol_functions.save = async function(o) {
  if (map.name === "old") {
    const current_code = localStorage.getItem("code");
    if (current_code) {
      const new_save = !window.confirm("save to code: '" + current_code + "'? (cancel to make new save)");
      if (new_save) window.prompt("new save created! copy this:", temp.save(the_id));
      else window.alert("saved to " + temp.save(current_code));
    } else {
      if (window.confirm("create a new save?")) window.prompt("saved! copy this:", temp.save(the_id));
    }
  } else {
    const success = await temp.account.save(true);
    if (!success) return;
    for (let i = 0; i < 10; i++) {
      particle.create({
        type: "ring",
        x: o.x,
        y: o.y,
        o: 1,
        r: camera.size / 2,
        vr: 5 + i,
        rvr: 0,
        vo: -0.02 - 0.002 * i,
        stroke: "lime",
        linewidth: camera.size * 0.1,
      });
    }
  }
};

symbol_functions.load = function() {
  if (map.name === "old") {
    const code = window.prompt("load from 10-letter code:", localStorage.getItem("code"));
    if (!code) return;
    if ((code?.length ?? 0) !== 10) {
      window.alert("not 10 letters!");
      return;
    }
    temp.load(code);
  } else {
    // hmmm
  }
};

symbol_functions.account = function() {
  if (temp.account.logged_in) {
    temp.accountbear();
  } else {
    temp.accountant();
  }
};

symbol_functions.map = function() {
  panel.map.active = !panel.map.active;
  panel.map.x = player.x;
  panel.map.y = player.y;
  panel.map.z = player.z;
  panel.map.static = true;
};

symbol_functions.leaderboard = function() {
  temp.accountcow();
};

symbol_functions.art_test = function(o) {
  panel.talk.text = ["testing..​​​​​​​​​​​​​​​.​​​​​​​​​​​​​​​.​​​​​​.​​​​​​.​​​​​​​​​​​​​​​..", "oh, you found me!"];
  panel.talk.toggle(o);
};

symbol_functions.art_warning = function(o) {
  panel.talk.text = ["don't say i didn't warn you"];
  panel.talk.toggle(o);
};

symbol_functions.art_snail = function(o) {
  if (map.visited.has("28")) panel.talk.text = ["oops i didn't know it's your home!! i'll go somewhere else...", "bye :("];
  else panel.talk.text = ["i'm just trying to get to the other side, i heard the grass there is greener.", "[developer's note: it's not. it's #335511 always.]"];
  panel.talk.toggle(o);
};

symbol_functions.art_mess = function(o) {
  panel.talk.text = ["i used to be a really famous footballer until my pet lion went missing...", "can you help me find him? you should know his name..."];
  panel.talk.toggle(o);
};

symbol_functions.art_person_1 = function(o) {
  const s = map.total_stars;
  if (s <= 0) panel.talk.text = ["i like stars. do you have any?", "seems like it's a no :("];
  else if (s <= 5) panel.talk.text = ["click on the map to add or remove a little dot at your location!"];
  else panel.talk.text = ["how did you get so many stars???", "share some please >:)"];
  panel.talk.toggle(o);
};

symbol_functions.art_beaver = function(o) {
  panel.talk.text = ["boo"];
  panel.talk.toggle(o);
};

symbol_functions.art_pipe = function(o) {
  panel.talk.text = ["no, i'm not a reference to anything in particular"];
  panel.talk.toggle(o);
};

symbol_functions.art_click = function(o) {
  panel.talk.text = ["did you know... you can click-", "(oh i forgot what to say.)", "click on yourself [˙-˙] for a pop up!"];
  panel.talk.toggle(o);
};

symbol_functions.art_amogus = function(o) {
  panel.talk.text = ["area under conStrUction... check back later for more puzzleS!"];
  panel.talk.toggle(o);
};

door_custom.door_start_1234 = function(door) {
  const answers = [0, "000\n001\n000", "000\n001\n010", "010\n001\n010", "010\n101\n010"];
  for (let i = 1; i <= 4; i++) {
    if (!panel.check_answer(map.get_panel("start_t_" + i).panel.state, answers[i].split("\n"))) {
      return false;
    }
  }
  return true;
};

door_custom.door_0_1234 = function(door) {
  const answers = [0, "000\n001\n000", "000\n001\n010", "010\n001\n010", "010\n101\n010"];
  for (let i = 1; i <= 4; i++) {
    if (!panel.check_answer(map.get_panel("0_" + i).panel.state, answers[i].split("\n"))) {
      return false;
    }
  }
  return true;
};

door_custom.door_0_taunt = function(door) {
  const possible_answers = ["00100\n00010\n00001\n01000\n00100", "00000\n01000\n10100\n00010\n00000"];
  for (const answer of possible_answers) {
    if (panel.check_answer(map.get_panel("0_5").panel.state, answer.split("\n"))) {
      return true;
    }
  }
  return false;
};

door_custom.door_ia = function(door) {
  const answer = {
    corridor: [null, false, true, true, true],
    diagonal: [true, true, false, false, false, true, true],
  };
  for (const key in answer) {
    for (let i = 0; i < answer[key].length; i++) {
      const o = map.get_panel(key + "_" + i);
      if (!o) continue;
      if (o.panel.correct !== answer[key][i]) {
        return false;
      }
    }
  }
  return true;
};

door_custom.door_choice_0 = function(door) {
  const state = map.get_panel("choice_0").panel.state;
  return state[door.y][door.x] === 0;
};

door_custom.door_staring = function(door) {
  const counter = player.door_staring_counter;
  if (counter === 600) {
    player.door_staring_open = true;
  }
  return player.door_staring_open === true;
};