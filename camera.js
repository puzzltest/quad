import { canvas, ctx, v, view, mouse } from "./index.js";
import { the_id } from "./database.js";
import { maps, map } from "./map.js";
import { particle } from "./particle.js";
import { player } from "./player.js";
import { util } from "./util.js";
import { draw } from "./draw.js";

export const camera = {
  cx: 0,
  cy: 0,
  z: 0,
  tx: 0,
  ty: 0,
  scale: 0,
  get tscale() {
    return map.get_scale(player.x, player.y, player.z);
  },
  get x() {
    return this.cx - this.scale / 2;
  },
  set x(x) {
    this.cx = x + this.scale / 2;
  },
  get y() {
    return this.cy - this.scale / 2;
  },
  set y(y) {
    this.cy = y + this.scale / 2;
  },
  get size() {
    return view.size / camera.scale + 1;
  },
};

camera.init = function() {
  camera.scale = 1;
};

camera.tick = function() {
  camera.scale = util.lerp(camera.scale, camera.tscale, 0.05);
  const offset = camera.tscale / 2;
  camera.tx = player.x ;
  camera.ty = player.y ;
  camera.cx = util.lerp(camera.cx, camera.tx, 0.05);
  camera.cy = util.lerp(camera.cy, camera.ty, 0.05);
  camera.z = player.z;
};

camera.jump = function() {
  camera.cx = player.x;
  camera.cy = player.y;
};

camera.convert = function(x, y, scale = camera.scale) {
  return [
    view.cx + (x - camera.cx) * view.size / scale,
    view.cy + (y - camera.cy) * view.size / scale
  ];
};

camera.draw = function() {
  ctx.save();
  ctx.beginPath();
  ctx.rect(view.x, view.y, view.size, view.size);
  ctx.clip();
  const size = camera.size;
  // const M = map.search_area(camera.x, camera.y, camera.scale, camera.scale);
  const z = camera.z;
  for (let x = Math.floor(camera.x); x <= camera.x + camera.scale + 1; x++) {
    for (let y = Math.floor(camera.y); y <= camera.y + camera.scale + 1; y++) {
      const m = map.get_map(x, y, z);
      const s = map.get_tile(x, y, z);
      const t = m?.theme ?? map.z_themes[z] ?? "normal";
      let [xx, yy] = camera.convert(x, y);
      if (theme[t][s] != undefined) {
        theme[t][s](xx, yy, size, size, {x, y, z});
      } else {
        theme.normal[s](xx, yy, size, size, {x, y, z});
      }
    }
  }
  
  // draw wires
  for (const o of map.search_wires(Math.floor(camera.x) - 1.5, Math.floor(camera.y) - 1.5, z, camera.scale + 3, camera.scale + 3)) {
    const t = o?.theme ?? "normal";
    let [xx, yy] = camera.convert(o.x, o.y);
    if (theme[t]?.wire != undefined) {
      theme[t]?.wire(xx, yy, size, size, o);
    }
  }
  
  // draw objects
  for (const o of map.search_objects(Math.floor(camera.x) - 1.5, Math.floor(camera.y) - 1.5, z, Math.ceil(camera.scale) + 3, Math.ceil(camera.scale) + 3)) {
    const s = o.type;
    const t = o?.theme ?? "normal";
    let [xx, yy] = camera.convert(o.x, o.y);
    if (theme[t][s] != undefined) {
      theme[t][s](xx, yy, size, size, o);
    } else {
      theme.normal[s](xx, yy, size, size, o);
    }
  }
  
  // draw other players
  for (const other_id in player.others) {
    if (other_id === the_id) continue;
    const other = player.others[other_id];
    if (other.z == player.z) {
      const [ox, oy] = camera.convert(other.x, other.y);
      player_theme.other(ox, oy, size * player.size, size * player.size, other);
    }
  };
  
  // draw player too!
  const [xx, yy] = camera.convert(player.x, player.y);
  player_theme[player.mode](xx, yy, size * player.size, size * player.size);
  const oo = map.get_object(player.x + player.dx, player.y + player.dy, player.z) ?? map.get_object(player.x, player.y, player.z);
  if (oo) {
    const [xx2, yy2] = camera.convert(oo?.x, oo?.y);
    player_theme.outline(xx2, yy2, size, size);
  }
  
  ctx.restore();
  
  // draw map room name
  let name = map.get_map(Math.round(player.x), Math.round(player.y), player.z)?.name;
  if (map.panel_ref.active && map.panel_ref.o.panel.name) {
    name = map.panel_ref.o.panel.name;
  } else if (map.panel_ref.sign.active && map.panel_ref.sign.o.title) {
    name = map.panel_ref.sign.o.title;
  }
  if (name) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000";
    ctx.font = `${Math.round(view.size * 0.05)}px roboto mono`;
    ctx.fillText(name, view.cx, view.cy - view.size * 0.56);
  }
  if ("coordinates") {
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000";
    ctx.font = `${Math.round(view.size * 0.03)}px roboto mono`;
    ctx.fillText(`(${player.xyz.x},${player.xyz.y},${player.z})`, view.cx - view.size * 0.59, view.cy + view.size * 0.565);
  }
  if (map.panel_ref.total_solved > 0) {
    ctx.textAlign = "right";
    draw.set_font(view.size * 0.045, "bold");
    ctx.fillText(`🧩 ${map.panel_ref?.total_solved}` + `/${map.solvable_panels}`, view.cx + view.size * 0.58, view.cy - view.size * 0.56);
  }
  if (map.stars_collected.length > 0) {
    ctx.textAlign = "left";
    draw.set_font(view.size * 0.045, "bold");
    ctx.fillText(`⭐ ${map.total_stars}`, view.cx - view.size * 0.58, view.cy - view.size * 0.56);
  }
  const players = Object.keys(player?.others ?? {})?.length ?? 0;
  if (players > 0) {
    ctx.textAlign = "right";
    draw.set_font(view.size * 0.045, "bold");
    ctx.fillText(`⬜ ${players}`, view.cx + view.size * 0.58, view.cy + view.size * 0.56);
  }
};

export const theme = {
  normal: {
    ["."]: function(x, y, w, h) {
      // ctx.fillStyle = "#546";
      // draw.rectangle(x, y, w, h);
      // ctx.fill();
    },
    [","]: function(x, y, w, h) {
      ctx.fillStyle = "#56c";
      draw.rectangle(x, y, w, h);
      ctx.fill();
    },
    ["+"]: function(x, y, w, h) {
      // nothing for now
      // todo?
    },
    ["#"]: function(x, y, w, h) {
      ctx.fillStyle = "#597";
      draw.rectangle(x, y, w, h);
      ctx.fill();
      ctx.fillStyle = "#7b9";
      draw.polygon(4, x, y, w * 0.5, v.time / 60);
      ctx.fill();
      ctx.fillStyle = "#9eb";
      draw.polygon(4, x, y, w * 0.353, v.time / 30);
      ctx.fill();
    },
    ["0"]: function(x, y, w, h) {
      ctx.fillStyle = "#cad";
      draw.rectangle(x, y, w, h);
      ctx.fill();
    },
    // objects
    ["link"]: function(x, y, w, h) {
      ctx.fillStyle = "#fff0";
      draw.rectangle(x, y, w, h);
      ctx.fill();
    },
    ["symbol"]: function(x, y, w, h, o) {
      if (!o.symbol) return;
      ctx.fillStyle = o.symbol?.fill ?? "#ffff";
      draw.svg(o.symbol.type, x, y, w);
    },
    ["panel"]: function(x, y, w, h, o) {
      ctx.fillStyle = o.panel?.solved ? "#8da" : "#baf";
      if (o.door) {
        if (!o.door.open) ctx.fillStyle = "#d89";
      }
      draw.rectangle(x, y, w, h);
      ctx.fill();
      ctx.fillStyle = "#fff8";
      ctx.strokeStyle = "#fff8";
      ctx.lineWidth = w * 0.05;
      draw.rectangle(x, y, w * 0.6, h * 0.6);
      if (o.panel?.correct) ctx.stroke();
      else ctx.fill();
    },
    ["door"]: function(x, y, w, h, o) {
      ctx.fillStyle = "#eee";
      ctx.strokeStyle = "#eee";
      ctx.lineWidth = w * 0.05;
      draw.rectangle(x, y, w * 0.8, h * 0.8);
      if (o.door?.open) ctx.stroke();
      else {
        ctx.fill();
        if (o.door?.countdown) {
          ctx.fillStyle = "#1116";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          draw.set_font(w * 0.4);
          ctx.fillText(-o.door?.number || 0, x, y, w, h);
        }
      }
    },
    ["sign"]: function(x, y, w, h, o) {
      ctx.fillStyle = "#a859";
      draw.rectangle(x, y - h * 0.15, w * 0.8, h * 0.6);
      ctx.fill();
      draw.rectangle(x, y + h * 0.15, w * 0.08, h * 0.6);
      ctx.fill();
    },
    ["star"]: function(x, y, w, h, o) {
      // draw base
      ctx.fillStyle = "#8bc";
      draw.rectangle(x, y, w, h);
      ctx.fill();
      ctx.fillStyle = "#7ab";
      draw.rectangle(x, y, w * 0.7, h * 0.7);
      ctx.fill();
      ctx.shadowColor = "#bef";
      ctx.shadowBlur = w * 0.5;
      draw.star(4, x, y, w * 0.45, w * 0.1, v.time / 60);
      if (!o.star.collected) {
        ctx.strokeStyle = "#bef";
        ctx.lineWidth = w * 0.02;
        ctx.stroke();
        ctx.stroke();
      } else {
        ctx.fillStyle = "#bef";
        ctx.fill();
        ctx.fill();
      }
      ctx.shadowColor = undefined;
      ctx.shadowBlur = 0;
      /*
      particle.create({
        type: "star",
        x: o.x,
        y: o.y,
        vx: 0.1,
        vy: 0.1,
        rvx: 0.2,
        rvy: 0.2,
        r: camera.size / 2,
        vr: camera.size * -0.015,
        rvr: 0,
        a: v.time / 60 + Math.PI / 4,
        va: 0.01, // 0.1
        rva: 0,
        fill: "#bef3",
      });*/
    },
    ["wire"]: function(x, y, w, h, o) {
      if (o.rule == undefined) return;
      const p = map.get_panel(o.rule[0])?.panel;
      let on = p?.correct;
      if (o.rule[0].startsWith("door")) {
        on = map.get_door(o.rule[0])?.door?.open;
      }
      if (o.invisible && !p?.correct) return;
      ctx.strokeStyle = on ? "#eee" : "#666";
      if (on) {
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = Math.round(w * 0.25);
      }
      ctx.lineCap = "square";
      ctx.lineWidth = w * 0.08;
      for (const d of o.dirs) {
        const [dx, dy] = util.dir5[d];
        draw.line(x, y, x + dx * w / 2, y + dy * h / 2);
      }
      if (on) {
        ctx.shadowColor = undefined;
        ctx.shadowBlur = 0;
      }
    },
    ["portal"]: function(x, y, w, h, o) {
      const open = !o.door || o.door.open;
      if (o.portal.type === "warp") {
        theme[map.z_themes[o.portal.z]]["."](x, y, w, h, o);
        const t = 0.1 + 0.3 * util.bounce(v.time, 120);
        if (open) {
          ctx.fillStyle = "#eee4";
          draw.rectangle(x, y, w, h);
          ctx.fill();
        }
        ctx.fillStyle = open ? "#aaa6" : "#d896";
        draw.star(4, x, y, w * t, w * 0.5, -v.time / 20);
        ctx.fill();
        draw.star(8, x, y, w * 0.4, w * 0.5, v.time / 60);
        ctx.fill();
        ctx.fillStyle = open ? "#ddd8" : "#f9a8";
        draw.polygon(4, x, y, w * t, -v.time / 20);
        ctx.fill();
      }
      else if ((o.portal.z - o.z) % 1 === 0) {
        if (o.portal.z < o.z) {
          theme[map.z_themes[o.portal.z]]["."](x, y, w, h, o);
          if (o.portal?.flip) w = -w;
          x -= w / 2;
          y -= h / 2;
          // ctx.fillStyle = "#111";
          // draw.rect(x, y, w, h);
          // ctx.fill();
          for (let i = 0; i < 5; i++) {
            ctx.fillStyle = "#" + (238 - i * 50).toString(16).repeat(3);
            const r = h / 5 * (5 - i * 0.5);
            draw.rect(x + i * w * 0.18, y + h * 1.25 - r, w * 0.18, r - h * 0.25);
            ctx.fill();
          }
        } else {
          this["."](x, y, w, h, o);
          if (o.portal?.flip) w = -w;
          x -= w / 2;
          y -= h / 2;
          for (let i = 0; i < 5; i++) {
            const r = h / 5 * (5 - i * 0.5);
            ctx.fillStyle = "#" + (108).toString(16).repeat(3);
            draw.rect(x + i * w * 0.18, y + h - r, w * 0.19, r);
            ctx.fill();
            ctx.fillStyle = "#" + (238 - i * 30).toString(16).repeat(3);
            draw.rect(x + i * w * 0.18, y + h - r, w * 0.18, h / 2);
            ctx.fill();
          }
        }
        if (!open) {
          ctx.fillStyle = "#f008";
          draw.rect(x, y, w, h);
          ctx.fill();
        }
      }
      else {
        ctx.fillStyle = open ? "#597" : "#b67";
        draw.rectangle(x, y, w, h);
        ctx.fill();
        ctx.fillStyle = open ? "#7b9" : "#d89";
        draw.polygon(4, x, y, w * 0.5, v.time / 60);
        ctx.fill();
        ctx.fillStyle = open ? "#9eb" : "#f9a";
        draw.polygon(4, x, y, w * 0.353, v.time / 30);
        ctx.fill();
      }
    },
  },
  grey: {
    ["."]: function(x, y, w, h, o) {
      const c = draw.noise3(o.x / 10, o.y / 10, v.time / 220);
      ctx.fillStyle = "#" + util.to_component(16 + c * 12).repeat(3);
      draw.rectangle(x, y, w, h);
      ctx.fill();
    },
    ["0"]: function(x, y, w, h, o) {
      const c = draw.noise2(o.x / 5, o.y / 5);
      ctx.fillStyle = "#" + util.to_component(128 + c * 13).repeat(3);
      draw.rectangle(x, y, w, h);
      ctx.fill();
      /*ctx.fillStyle = "#222";
      if (util.randreal(0, 1) < 0.2)
      for (let i = 0; i < 1; i++) {
        const xx = util.randint(0, 9);
        const yy = util.randint(0, 9);
        ctx.fillRect(x + xx * w / 10, y + yy * w / 10, w / 10, h / 10);
      }*/
    },
    ["1"]: function(x, y, w, h, o) {
      this["0"](x, y, w, h, o);
    },
    ["2"]: function(x, y, w, h, o) {
      this["."](x, y, w, h, o);
    },
  },
  grass: {
    ["."]: function(x, y, w, h, o) {
      ctx.fillStyle = "#351";
      draw.rectangle(x, y, w, h);
      ctx.fill();
      const f_yellow = draw.noise3(o.x / 5, o.y / 5, 0);
      if (f_yellow > 0.8) {
        const dx = draw.noise3(o.x / 5, o.y / 5, 10) / 2;
        const dy = draw.noise3(o.x / 5, o.y / 5, 20) / 2;
        ctx.fillStyle = "#cc5";
        draw.rectangle(x - w * dx, y - h * dy, w * 0.08, h * 0.08);
        ctx.fill();
      }
      const f_pink= draw.noise3(o.x / 5, o.y / 5, 1);
      if (f_pink > 0.8) {
        const dx = draw.noise3(o.x / 5, o.y / 5, 110) / 2;
        const dy = draw.noise3(o.x / 5, o.y / 5, 120) / 2;
        ctx.fillStyle = "#e69";
        draw.rectangle(x - w * dx, y - h * dy, w * 0.08, h * 0.08);
        ctx.fill();
      }
    },
    ["0"]: function(x, y, w, h, o) {
      ctx.fillStyle = "#842";
      draw.rectangle(x, y, w, h);
      ctx.fill();
      ctx.strokeStyle = "#eee";
      ctx.lineWidth = w * 0.04;
      const ys = [y - h / 2];
      for (let i = -1.5; i < 2; i++) {
        const yy = y + h * i / 4.2;
        ys.push(yy);
        draw.line(x - w / 2, yy, x + w / 2, yy);
      }
      ys.push(y + h / 2);
      for (let i = 0; i < 5; i++) {
        draw.line(x - w * 0.05 * (1 + (o.y - +(!i)) ** 2 % 8) + (i % 2 ? w / 2 : 0), ys[i], undefined, ys[i + 1]);
      }
    },
    ["1"]: function(x, y, w, h, o) {
      this["0"](x, y, w, h, o);
    },
    ["2"]: function(x, y, w, h, o) {
      this["."](x, y, w, h, o);
    },
  },
  wood: {
    ["."]: function(x, y, w, h) {
      ctx.fillStyle = "#652";
      draw.rectangle(x, y, w, h);
      ctx.fill();
      ctx.strokeStyle = "#eee2";
      ctx.lineWidth = w * 0.04;
      ctx.lineCap = "round";
      draw.line(x - w / 2, y - h / 2, x + w / 2, y + h / 2);
      draw.line(x - w / 2, y + h * 0.115, x + w * 0.115, y - h * 0.5);
      draw.line(x + w * 0.1, y + h * 0.5, x + w * 0.5, y + h * 0.1);
    },
    ["0"]: function(x, y, w, h, o) {
      ctx.fillStyle = "#ccc";
      draw.rectangle(x, y, w, h);
      ctx.fill();
      ctx.strokeStyle = "#652";
      ctx.lineWidth = w * 0.04;
      const ys = [y - h / 2];
      for (let i = -1.5; i < 2; i++) {
        const yy = y + h * i / 4.2;
        ys.push(yy);
        draw.line(x - w / 2, yy, x + w / 2, yy);
      }
      ys.push(y + h / 2);
      for (let i = 0; i < 5; i++) {
        draw.line(x - w * 0.05 * (1 + (o.y - +(!i)) ** 2 % 8) + (i % 2 ? w / 2 : 0), ys[i], undefined, ys[i + 1]);
      }
    },
    ["1"]: function(x, y, w, h, o) {
      this["0"](x, y, w, h, o);
    },
    ["2"]: function(x, y, w, h, o) {
      this["."](x, y, w, h, o);
    },
  },
  warp: {
    ["."]: function(x, y, w, h, o) {
      const c = draw.noise3(o.x / 10, o.y / 10, v.time / 220);
      ctx.fillStyle = "#" + util.to_component(102 + c * 18) + util.to_component(51 + c * 9) + util.to_component(85 + c * 15);
      // ctx.fillStyle = "#635";
      draw.rectangle(x, y, w, h);
      ctx.fill();
    },
    ["0"]: function(x, y, w, h, o) {
      ctx.fillStyle = "#b7a";
      draw.rectangle(x, y, w, h);
      ctx.fill();
      ctx.strokeStyle = "#fce";
      ctx.lineWidth = w * 0.04;
      let t = util.bounce(v.time - o.x * 9 + o.y * 15 + 1200, 120);
      t = 0.3 + 0.4 * t;
      draw.rectangle(x, y, w * t, h * t);
      ctx.stroke();
    },
    ["1"]: function(x, y, w, h, o) {
      this["0"](x, y, w, h, o);
    },
    ["2"]: function(x, y, w, h, o) {
      this["."](x, y, w, h, o);
    },
  },
};

// to do, for minimap/map
export const mini_theme = {
  normal: {
    [""]: "#f00", // very error
    ["."]: "#f00", // error
    ["0"]: "#f00", // error
    [","]: "#56c",
    ["+"]: "#0000",
    // objects
    ["panel"]: function(o) {
      if (o.door) {
        if (!o.door.open) return "#d89";
      }
      return o.panel?.solved ? "#8da" : "#baf";
    },
    ["door"]: function(o) {
      if (!o?.door?.open) return "#eee";
      return " ";
    },
    ["portal"]: "#b7a",
    ["sign"]: "#a85",
    ["star"]: "#7ab", // #bef?
    ["symbol"]: () => " ",
    ["link"]: "#0000",
    ["wire"]: "#0000",
  },
  grey: {
    ["."]: "#111",
    ["0"]: "#888",
  },
  grass: {
    ["."]: "#351",
    ["0"]: "#842",
  },
  wood: {
    ["."]: "#652",
    ["0"]: "#ccc",
  },
  warp: {
    ["."]: "#635",
    ["0"]: "#b7a",
    ["portal"]: "#eee",
  },
};

export const player_theme = {
  normal: function(x, y, w, h) {
    ctx.fillStyle = "#eee";
    draw.rectangle(x, y, w, h);
    // draw.polygon(4, x, y, w * 0.6, player.move_a + Math.PI / 4);
    ctx.fill();
    // draw player direction
    ctx.fillStyle = "#000";
    if (player.move_x || player.move_y) {
      ctx.translate(x, y);
      ctx.rotate(Math.atan2(-player.move_x, player.move_y));
      draw.rectangle(w * 0.15, w * 0.375, w * 0.07, h * 0.07);
      ctx.fill();
      draw.rectangle(-w * 0.15, w * 0.375, w * 0.07, h * 0.07);
      ctx.fill();
      draw.reset_transform();
    } else if (player.dx || player.dy) {
      x += player.dx * w * 0.375;
      y += player.dy * h * 0.375;
      draw.rectangle(x + player.dy * h * 0.15, y + player.dx * w * 0.15, w * 0.07, h * 0.07);
      ctx.fill();
      draw.rectangle(x - player.dy * h * 0.15, y - player.dx * w * 0.15, w * 0.07, h * 0.07);
      ctx.fill();
    }
  },
  outline: function(x, y, w, h) {
    ctx.strokeStyle = "#e448";
    ctx.lineWidth = 1;
    draw.rectangle(x, y, w, h);
    ctx.stroke();
  },
  other: function(x, y, w, h, o) {
    ctx.fillStyle = "#eee6";
    draw.rectangle(x, y, w, h);
    ctx.fill();
    ctx.fillStyle = "#1116";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    draw.set_font(w * 0.45);
    ctx.fillText(o.p, x, y, w, h);
  },
};