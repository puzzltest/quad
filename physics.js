const { World, Shape, Fixture, Body, Contact, Vec2, Box, Circle } = planck;
import { map, tiles, tilemap, tiledef, objects } from "./map.js";
import { player } from "./player.js";
import { util } from "./util.js";
import { draw } from "./draw.js";

export const physics = {
  
};

export const tile_bodies = {};
export const player_bodies = {};

export const worlds = {};
  
for (const z of map.levels) {
  worlds[z] = new World({
    gravity: new Vec2(0.0, 0.0),
    allowSleep: true,
  });
}

physics.init = function() {
  // create walls
  for (const s in tiles) {
    const d = tiledef[tiles[s]];
    if (d.physics === "empty") continue;
    const { x, y, z } = map.str2vec(s);
    const b = physics.create(d.physics, x, y, z);
    tile_bodies[s] = b;
  }
  // create objects
  for (const o of objects) {
    const d = tiledef[o.type];
    const p_ = o.physics ?? d.physics;
    if (p_ === "empty") continue;
    const b = physics.create(p_, o.x, o.y, o.z);
    o.body = b;
  }
  // create player
  const {x, y} = player;
  for (const z of map.levels) {
    player_bodies[z] = worlds[z].createBody({
      type: "dynamic",
      position: new Vec2(x, y),
      angle: 0,
      allowSleep: false,
      awake: true,
      fixedRotation: true,
      linearDamping: 10,
      angularDamping: 0,
    });
    player_bodies[z].createFixture({
      shape: new Circle(0.48 * player.size),
      density: 1,
      friction: 0.3,
    });
  }
};

physics.get_tile_body = function(x, y, z) {
  const s = map.vec2str(x, y, z);
  return tile_bodies[s];
};

physics.create = function(type, x, y, z) {
  const b = worlds[z].createBody({
    type: "static",
    position: new Vec2(x, y),
    angle: 0,
  });
  if (type === "wall") {
    b.createFixture({
      shape: new Box(0.5, 0.5),
    });
  }
  else if (type === "door") {
    b.createFixture({
      shape: new Box(0.4, 0.4),
    });
  }
  else if (type === "sign") {
    b.createFixture({
      shape: new Box(0.4, 0.3, new Vec2(0, -0.15)),
    });
    b.createFixture({
      shape: new Box(0.04, 0.3, new Vec2(0, 0.15)),
    });
  }
  else if (type === "panel") {
    b.createFixture({
      shape: new Box(0.3, 0.3),
    });
  }
  return b;
};

const timeStep = 1 / 60; // unused for now?
const velocityIterations = 8;
const positionIterations = 3;
physics.tick = function(dt) {
  if (player.paused) return;
  worlds[player.z].step(dt / 700, velocityIterations, positionIterations);
  worlds[player.z].clearForces();
};

physics.move_player = function(dx, dy) {
  if (!player.can_move) return;
  const x = dx;
  const y = dy;
  const z = player.z;
  player_bodies[z].applyForce(new Vec2(x, y), player_bodies[z].getPosition());
};

physics.teleport_player = function(x, y, z, v) {
  if (z == undefined) z = player.z;
  player_bodies[z].setPosition(new Vec2(x, y));
  if (v != undefined) player_bodies[z].setLinearVelocity(v ?? new Vec2(0, 0));
  worlds[z].clearForces();
};