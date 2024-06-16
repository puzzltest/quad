import { canvas, ctx, v, view, mouse } from "./index.js";
import { maps, map, objects } from "./map.js";
import { player } from "./player.js";
import { sound } from "./sfx.js";
import { util } from "./util.js";
import { temp } from "./database.js";
import { draw } from "./draw.js";

export const panel = {
  x: 0,
  y: 0,
  size: 0,
  active: false,
  time: 0,
  o: null,
  lock_mode: false,
  total_solved: 0,
  total_correct: 0,
  sign: {
    active: false,
    time: 0,
    o: null,
    type: "",
    text: "",
  },
};

export const panels = {};

for (const o of objects) {
  if (!o.panel?.id) continue;
  panels[o.panel.id] = o.panel;
}

const panel_symbols = {};
const sign_functions = {};
const sign_pictures = {};
const symbol_functions = {};
const door_custom = {};

panel.init = function() {
  panel.active = false;
  panel.sign.active = false;
  map.door_custom = door_custom;
  map.panel_ref = panel;
  map.player_ref = player;
  map.util_ref = util;
};

panel.activate = function() {
  // const p = panel.o.panel;
  // panel.initstate(p.w, p.h, p.initial);
  panel.lock_mode = false;
};

panel.clearstate = function() {
  const p = panel.o.panel;
  for (let y = 0; y < p.h; y++) {
    for (let x = 0; x < p.w; x++) {
      p.lock[y][x] = 0;
      if (+p.map[y][x] == 2) {
        p.state[y][x] = 0;
      }
    }
  }
};

panel.deactivate = function() {
  
};

panel.sign.activate = function() {
  const title = panel.sign.o.title;
  if (sign_functions.hasOwnProperty(title)) {
    sign_functions[title]();
  }
};

panel.sign.deactivate = function() {
  
};

panel.mousecheck = function() {
  for (const t of mouse.newtaps) {
    if (ctx.isPointInPath(t.x, t.y)) {
      t.active = false;
      // sound.play("tap");
      return t;
    }
  }
  return false;
};

panel.draw = function() {
  let x, y, w, h;
  if (panel.active) {
    panel.time++;
    const p = panel.o.panel;
    const size = panel.size * 0.85 / Math.max(p.w, p.h);
    const gap = panel.size * 0.15 / (1 + Math.max(p.w, p.h));
    if ("true") {
      ctx.fillStyle = p.correct ? "#8dac" : "#bafc";
      draw.rectangle(view.cx, view.cy, panel.size + gap * 2, panel.size + gap * 2);
      ctx.fill();
    }
    ctx.fillStyle = p.correct ? "#111" : "#111";
    ctx.fillRect(panel.x, panel.y, panel.size, panel.size);
    x = panel.x + panel.size / 2 - (size * p.w + gap * p.w - gap) / 2;
    y = panel.y + panel.size / 2 - (size * p.h + gap * p.h - gap) / 2;
    for (let i = 0; i < p.w; i++) {
      for (let j = 0; j < p.h; j++) {
        let s = +p.state[j][i];
        let locked = +p.lock[j][i];
        let n = +p.map[j][i];
        draw.roundrect(x, y, size, size, 5);
        if (s || n === 1) {
          ctx.fillStyle = "#eee";
          ctx.fill();
        }
        if (n === 2) {
          ctx.strokeStyle = p.correct ? "#8da" : "#baf";
          if (locked) ctx.strokeStyle = "#c76";
          ctx.lineWidth = gap * 0.3;
          ctx.stroke();
          const check = panel.mousecheck();
          if (check) {
            if (panel.lock_mode) {
              p.lock[j][i] = 1 - locked;
            } else if (!locked) {
              p.state[j][i] = 1 - s;
            }
          }
        }
        for (const symbol in p.hide_symbols ? [] : p.symbols) {
          const str = p.symbols[symbol][j][i];
          if (str !== ".") {
            panel_symbols[symbol](str, x + size / 2, y + size / 2, size, size, s);
          }
        }
        y += size + gap;
      }
      y -= (size + gap) * p.h;
      x += size + gap;
    }
    // panel
    panel.update_panel();
  }
  else {
    panel.time = 0;
    if (panel.sign.active) {
      panel.sign.time++;
      // draw sign
      ctx.fillStyle = "#974e";
      ctx.strokeStyle = "#543";
      ctx.lineWidth = 2.5;
      x = view.cx;
      y = view.cy - view.size * 0.075;
      w = view.size * 0.9;
      h = view.size * 0.75;
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
    } else {
      panel.sign.time = 0;
    }
  }
};

panel.resize = function() {
  panel.size = view.size * 0.85;
  panel.x = view.cx - panel.size / 2;
  panel.y = view.cy - panel.size / 2;
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
  if (p.answer) {
    return panel.check_answer(p.state, p.answer);
  }
  for (const symbol_name in p.symbols) {
    for (let y = 0; y < p.h; y++) {
      for (let x = 0; x < p.w; x++) {
        const s = p.symbols[symbol_name][y][x];
        if (s !== ".") {
          if (panel.check_symbol_correct(p, symbol_name, s, x, y) == false) {
            return false;
          }
        }
      }
    }
  }
  return true;
};

panel.check_symbol_correct = function(p, name, s, x, y) {
  if (name === "number") {
    let total = 0;
    for (const [dx, dy] of util.dir5) {
      const n = (p.state[y + dy] == undefined || p.state[y + dy][x + dx] == undefined) ? 0 : p.state[y + dy][x + dx];
      if (n) total++;
    }
    return (total === +s);
  }
  else if (name === "diagonal") {
    let total = 0;
    for (const [dx, dy] of util.dir5x) {
      const n = (p.state[y + dy] == undefined || p.state[y + dy][x + dx] == undefined) ? 0 : p.state[y + dy][x + dx];
      if (n) total++;
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
    if (s == 0)
      return util.compare_shape(util.bfs_to_shape(util.bfs(p.state, x, y)), p.ruin);
    else if (s == 1) {
      // todo
    }
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
    if (!p.solved) panel.total_solved++;
    p.solved = true;
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

panel_symbols.number = function(s, x, y, w, h, state) {
  ctx.fillStyle = (state) ? "#111" : "#eee"
  draw.set_font(w * 0.5);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(s, x, y);
};

panel_symbols.diagonal = function(s, x, y, w, h, state) {
  ctx.fillStyle = (state) ? "#111" : "#eee"
  draw.set_font(w * 0.5);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.translate(x, y);
  ctx.rotate(-Math.PI / 4);
  ctx.fillText(s, 0, 0);
  draw.reset_transform();
};

panel_symbols.ring = function(s, x, y, w, h, state) {
  ctx.strokeStyle = (state) ? "#111" : "#eee";
  ctx.lineWidth = w * 0.065;
  draw.circle(x, y, w * 0.3);
  ctx.stroke();
};

panel_symbols.ringnumber = function(s, x, y, w, h, state) {
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
panel_symbols.circle = function(s, x, y, w, h, state) {
  ctx.fillStyle = circle_colours[s];
  draw.circle(x, y, w * 0.28);
  ctx.fill();
};

panel_symbols.ruing = function(s, x, y, w, h, state) {
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

sign_pictures.text = function(x, y, w, h, o) {
  // todo scam
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
  ctx.shadowBlur = Math.round(r * 0.075);
  for (const line of lines_IA) {
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
      panel_symbols.diagonal(s, xx - r + gap * (x + 1) + size * x, yy - r + gap * (y + 1) + size * y, size, size, 0);
    }
  }
};

sign_functions["answer :)"] = function(o) {
  const othersign = map.get_sign("failed tutorial :(");
  if (!othersign.content.includes("wait")) {
    othersign.content = othersign.content.replace(" :)", "... wait you already looked at it :)");
  }
};

symbol_functions.arrow_left = function() {
  map.physics_ref.move_player(-50 * player.speed, 0);
};

symbol_functions.arrow_right = function() {
  map.physics_ref.move_player(50 * player.speed, 0);
};

symbol_functions.save = function() {
  window.prompt("saved! copy this:", temp.save());
};

symbol_functions.load = function() {
  const code = window.prompt("load from 10-letter code:");
  temp.load(code);
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