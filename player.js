import { camera } from "./camera.js";
import { firebase, the_id } from "./database.js";
import { map, tiledef } from "./map.js";
import { panel } from "./panel.js";
import { particle } from "./particle.js";
import { physics, player_bodies } from "./physics.js";
import { util } from "./util.js";
import { draw } from "./draw.js";

export const player = {
  x: map.start_point.x,
  y: map.start_point.y,
  z: map.start_point.z,
  dx: 0,
  dy: 0,
  d: 0,
  speed: 15,
  size: 0.75,
  mode: "normal",
  others: {},
  init: function() {
    map.physics_ref = physics;
    firebase.send = function() {
      // firebase.set("/quad/timestamp", serverTimestamp());
      firebase.set("/quad/positions/" + the_id, {
        id: the_id,
        x: util.round_to(player.x, 100),
        y: util.round_to(player.y, 100),
        z: player.z,
        // t: serverTimestamp(),
        p: map.panel_ref.total_solved,
      });
    };
  },
  tick: function() {
    player.others = firebase.others;
    player.move();
    const z = player.z;
    let {x, y} = player_bodies[z].getPosition();
    player.x = x;
    player.y = y;
    if (player.acted) {
      player.acted = false;
    } else {
      player.act_time = -1;
    }
    x = Math.round(x);
    y = Math.round(y);
    const tile = map.get_tile(x, y, z);
    if (tiledef[tile].force) {
      const f = tiledef[tile].force;
      let xx = x - player.x;
      let yy = y - player.y;
      if (xx === 0) xx = 100;
      else if (Math.abs(xx) < 0.1) xx *= 0.1 / xx;
      if (yy === 0) yy = 100;
      else if (Math.abs(yy) < 0.1) yy *= 0.1 / yy;
      physics.move_player(f / xx, f / yy);
    }
    if (tiledef[tile].water) {
      // physics.teleport_player(x - player.dx, y - player.dy);
    }
    if (z === 1 && ((x === 18 && player.dx === 1) || (x === 20 && player.dx === -1)) && y >= 19 && y <= 21) {
      player.door_staring_counter = (player.door_staring_counter ?? 0) + 1;
      panel.update_doors([map.get_door("door_staring")]);
    } else {
      player.door_staring_counter = 0;
    }
  },
  move_x: 0,
  move_y: 0,
  get move_a() {
    return Math.atan2(player.move_y, player.move_x);
  },
  get move_r2() {
    return player.move_x * player.move_x + player.move_y * player.move_y;
  },
  get move_nx() {
    if (player.move_x === 0) return 0;
    return Math.cos(player.move_a);
  },
  get move_ny() {
    if (player.move_y === 0) return 0;
    return Math.sin(player.move_a);
  },
  pre_move: function(dx, dy) {
    player.move_x += dx;
    player.move_y += dy;
  },
  get paused() {
    return panel.active || panel.sign.active;
  },
  get can_move() {
    return !(panel.active || panel.sign.active);
  },
  move: function() {
    if (!player.can_move) return;
    if (player.move_x === 0 && player.move_y === 0) return;
    if (player.move_r2 < 25 * 25) return;
    const dx = player.move_nx;
    const dy = player.move_ny;
    /*
    player.x += dx * player.speed;
    player.y += dy * player.speed;
    */
    physics.move_player(dx * player.speed, dy * player.speed);
    if (dx === 0 && dx === dy) {
      player.dx = 0;
      player.dy = 0;
      player.d = 0;
    } else if (Math.abs(dx) > Math.abs(dy)) {
      player.dx = dx / Math.abs(dx);
      player.dy = 0;
      player.d = (dx > 0) ? 1 : 3;
    } else {
      player.dx = 0;
      player.dy = dy / Math.abs(dy);
      player.d = (dy > 0) ? 2 : 4;
    }
    player.move_x = 0;
    player.move_y = 0;
  },
  get xyz() {
    const x = Math.round(player.x);
    const y = Math.round(player.y);
    const z = player.z;
    return { x, y, z };
  },
  acted: false,
  act_time: -1,
  act: function() {
    if (player.acted) return;
    player.acted = true;
    player.act_time++;
    // press and hold
    if (player.act_time > 120) return; // todo another function
    if (player.act_time > 0) return;
    // ok it's actually a new button press now
    const { x, y, z } = player.xyz;
    let do_check = true;
    if (player.dx || player.dy) do_check = !player.act_tile(x + player.dx, y + player.dy, z, false, true);
    player.act_tile(x, y, z, true, do_check);
  },
  act_tile: function(x, y, z, on, do_check) {
    const tile = map.get_tile(x, y, z);
    const o = map.get_object(x, y, z);
    const [xx, yy] = camera.convert(x, y);
    // act on tiles
    if (on && tile === "#") {
      // create save particles
      for (let i = 0; i < 3; i++) {
        particle.create({
          type: "frame",
          x: x,
          y: y,
          r: camera.size / 2,
          vr: 5,
          rvr: 0,
          a: Math.PI / 4,
          va: 0.0, // 0.1
          rva: 0,
          stroke: "lime",
          delay: i * 10,
        });
      }
    }
    else if (!on && tile === "0") {
      physics.move_player(-player.dx * player.speed * 5, -player.dy * player.speed * 5);
    }
    // act on objects
    if (do_check && o != null && typeof o === "object") {
      o.seen = true;
      if (o.type === "sign") {
        panel.sign.active = !panel.sign.active;
        panel.sign.o = o;
        if (panel.sign.active) panel.sign.activate();
        else panel.sign.deactivate();
      }
      else if (o.type === "panel" && (o.door == undefined || o.door?.open)) {
        panel.active = !panel.active;
        panel.o = o;
        if (panel.active) panel.activate();
        else panel.deactivate();
      }
      else if (o.type === "link") {
        window.location.href = o.content;
      }
      else if (o.type === "portal" && (o.door == undefined || o.door?.open)) {
        player.set_position(o.portal);
        camera.jump();
        // camera.scale = 1;
      }
      else if (o.type === "star" && !o.star?.collected && (o.door == undefined || o.door?.open)) {
        o.star.collected = true;
        map.stars_collected.push(o.star.id);
      }
      else if (o.type === "door") {
        
      }
      else if (o.type === "symbol") {
        panel.symbol_function(o.symbol?.type, o);
      }
      return true;
    } else {
      // no object on this tile
      return false;
    }
  },
  
  save: function() {
    const result = {
      x: this.x,
      y: this.y,
      z: this.z,
      dx: this.dx,
      dy: this.dy,
      d: this.d,
      mode: this.mode,
    };
    return result;
  },
  load: function(o) {
    player.set_position(o);
    for (const k in o) {
      player[k] = o[k]; // ok
    }
    camera.cx = o.x;
    camera.cy = o.y;
    camera.tx = camera.cx;
    camera.ty = camera.cy;
  },
  set_position: function(x_, y_, z_) {
    const old_z = this.z;
    if (y_ == undefined) {
      const {x, y, z} = x_;
      x_ = x; y_ = y; z_ = z;
    }
    this.x = x_;
    this.y = y_;
    this.z = z_;
    physics.teleport_player(x_, y_, z_, (old_z !== z_) ? player_bodies[old_z].v : undefined);
    camera.tick();
  },
};