import { objects_temp, wires_temp } from "./objects.js";

export const maps = [
  
  {
    x: -3,
    y: -4,
    z: -1,
    w: 8,
    h: 9,
    scale: 7.25,
    theme: "grey",
    name: "the origin",
    map: `
........
00000000
0.....0.
0.......
0..#....
0.......
0.....0.
00000000
........
  `,
  }, // -3,-4,-1 the origin
  {
    x: 5,
    y: -4,
    z: -1,
    w: 7,
    h: 9,
    scale: 7.5,
    theme: "grey",
    name: "first 'puzzle'",
    map: `
.......
0000000
......0
......0
...+...
......0
......0
0000000
.......
    `,
  }, // 5,-4,-1 first 'puzzle'
  {
    x: 12,
    y: -5,
    z: -1,
    w: 11,
    h: 11,
    scale: 8,
    theme: "grey",
    name: "taunt",
    map: `
....0.0....
...00.00...
..00...00..
.00..+..00.
00.......00
...+.+.+...
00.......00
.00..+..00.
..00...00..
...00.00...
....0.0....
    `,
  }, // 12,-5,-1 taunt
  {
    x: 23,
    y: -2,
    z: -1,
    w: 5,
    h: 5,
    scale: 5,
    theme: "grey",
    name: "a portal?",
    map: `
00000
0...0
....0
0...0
00000
    `,
  }, // 23,-2,-1 a portal?
  {
    x: 14,
    y: 6,
    z: -1,
    w: 7,
    h: 9,
    scale: 8,
    theme: "grey",
    name: "secret star",
    map: `
.00.00.
.0...0.
000.000
0.....0
0.....0
0.....0
0.....0
0.....0
0000000
    `,
  }, // 14,6,-1 secret star
  {
    x: 41,
    y: 2,
    z: -1,
    scale: 8,
    theme: "grey",
    name: "diagonal",
    map: `
000000000
0.......0
0.+.+.+.0
0.......0
..+...+..
0.......0
0.+.+.+.0
0.......0
000000000
    `,
  }, // 41,2,-1 diagonal
  {
    x: 33,
    y: 2,
    z: -1,
    scale: 8,
    theme: "grey",
    name: "diagonal extras!",
    map: `
00000000
.......+
0000+000
0.......
0.+.+.+.
0.......
0.+.+.+.
0.......
0000.000
....,...
    `,
  }, // 32,2,-1 diagonal extras!
  {
    x: 50,
    y: 5,
    z: -1,
    scale: 7,
    theme: "grey",
    name: "IA",
    map: `
0000.0
.....0
.0.0.0
.....0
.....0
0...00
.000..
    `,
  }, // 50,5,-1 IA
  {
    x: 49,
    y: 0,
    z: -1,
    scale: 7,
    theme: "grey",
    name: "a choice",
    map: `
000.000000
0.....0
0.....0
0.....0
0....+0
    `,
  }, // 49,0,-1 a choice
  {
    x: 49,
    y: -10,
    z: -1,
    scale: 7,
    theme: "grey",
    name: "that choice",
    map: `
0000000..
0.0.0.0+.
0.....0..
0.....0
0.....0
0.....0
0.....0
0.....0
0.....0000
0.........
    `,
  }, // 49,-10,-1 that choice
  {
    x: 55,
    y: -11,
    z: -1,
    scale: 2.4,
    theme: "grey",
    name: "amazing",
    map: `
    0000+0000000
    0..0.0.0...0
    0+...0...0.+
    0..000.00000
    0.00...0...0
    0.0..0...0.0
    0.0.000000.0
    0.0.00...0.0
    0...0..0.0.0
    00000.00.0.0
    ......0..+.0
    0000000.0000
    `,
  }, // 55,-11,-1 amazing
  {
    x: 56,
    y: -17,
    z: -1,
    scale: 6.5,
    theme: "grey",
    name: "amazing star",
    map: `
    0000000
    0.....0
    0.....0
    0.....0
    0.....0
    0.....0
    `,
  }, // 56,-17,-1 amazing star
  {
    x: 67,
    y: -11,
    z: -1,
    scale: 8,
    theme: "grey",
    name: "warp: amazing",
    map: `
000000
.....0
.....0
.....0
.....0
.....0
000000
    `,
  }, // 67,-11,-1 warp: amazing
  {
    x: 22,
    y: 2,
    z: -1,
    scale: 6.5,
    theme: "grey",
    name: "basement",
    map: `
    .00.0000000
    .0+........
    000.0000000
    0.....0
    0.....0
    0.....0
    0.....0
    0.....0
    000.000
    0.....0
    0000000
    `,
  }, // 22,2,-1 basement
  {
    x: 61,
    y: 1,
    z: -1,
    scale: 3.5,
    theme: "grey",
    name: "amazing link",
    map: `
    0.0
    0.0
    0.0
    0.0
    000
    `,
  }, // 61,1,-1 amazing link
  
  {
    x: 22,
    y: -3,
    z: 0,
    w: 7,
    h: 7,
    scale: 9,
    theme: "grass",
    name: "the beginning",
    map: `
,,,,...
,......
.......
.......
.......
.......
0.....0
    `,
  }, // 22,-3,0 the beginning
  {
    x: 29,
    y: -5,
    z: 0,
    w: 11,
    h: 13,
    scale: 9,
    theme: "grass",
    name: "scattered",
    map: `
,,.+......0
.........+0
......+...0
...+......0
..........0
+....+....+
..........0
..+.......0
........+.0
.....+..,,0
,,,,,,,,,,0
,,,,,,,,,,0
00000000000
    `,
  }, // 29,-5,0 scattered
  {
    x: 29,
    y: -16,
    z: 0,
    scale: 9,
    theme: "grass",
    name: "above scattered",
    map: `
..........0
..........0
..........0
..........0
..........0
......,...0
......,...0
......,...0
.....,,...0
.....,....0
.,,,,,,,,,,
    `,
  }, // 29,-16,0 above scattered
  {
    x: 40,
    y: -6,
    z: 0,
    scale: 5,
    theme: "grass",
    name: "corridor",
    map: `
    ,,
    ..
    .0
    .0
    .0
    .0
    .0
    .0
    .0
    .0
    +0
    .0
    ..
    00
    .0
    .0
    .0
    `,
  }, // 40,-6,0 corridor
  {
    x: 42,
    y: 2,
    z: 0,
    scale: 7,
    theme: "grass",
    name: "50%",
    map: `
00000000
.......0
...+...0
.......0
.+...+.0
.......0
...+...0
.......0
00000000
    `,
  }, // 42,2,0 50%
  {
    x: 40,
    y: -12,
    z: 0,
    scale: 9,
    theme: "grass",
    name: "the ruins",
    map: `
0000000+000000
,,,,,,.......0
,.,..,...000.0
,,.,,,....0..0
,.,..,...0.0..
,..,.,..+....0
,,,,,+.......0
.............0
.000000......0
.0......0000.0
.0.000000....0
.0.0.0....0..0
.0...0.00.0..0
.0.0...0..0..0
.0000000.00.00
    `,
  }, // 40,-12,0 the ruins
  {
    x: 45,
    y: -16,
    z: 0,
    scale: 5.5,
    theme: "grass",
    name: "scattered star",
    map: `
    00000
    0...0
    0...0
    0...0
    `,
  }, // 45,-16,0 scattered star
  {
    x: 49,
    y: 2,
    z: 0,
    scale: 5,
    theme: "grass",
    name: "tiny room + portal",
    map: `
    00.00
    0...0
    0....
    0...0
    00000
    `,
  }, // 49,2,0 tiny room + portal
  {
    x: 54,
    y: -12,
    z: 0,
    scale: 7,
    theme: "grass",
    name: "trial and error",
    map: `
    0000000
    ......0
    .+00+.0
    .0..0.+
    .0..0.0
    .+00+.0
    ......0
    0000000
    `,
  }, // 54,-12,0 trial and error
  {
    x: 61,
    y: -12,
    z: 0,
    scale: 7,
    theme: "grass",
    name: "withinst ourselves",
    map: `
    000000000
    ......0.0
    ..000.0.0
    .00...0.0
    .0000.+.0
    ..0.0.0.0
    ......0.0
    0000000.0
    `,
  }, // 61,-12,0 withinst ourselves
  {
    x: 60,
    y: -4,
    z: 0,
    scale: 7,
    theme: "grass",
    name: "addition",
    map: `
    0......0.0
    0...0..0.0
    0..000.0.0
    0...0..0.0
    .........0
    0......0..,
    00000000.00
    `,
  }, // 60,-4,0 addition
  {
    x: 54,
    y: -4,
    z: 0,
    scale: 7,
    theme: "grass",
    name: "central",
    map: `
    ......
    .0000.
    .0000.
    .0000.
    .0000.
    ......
    0000.00
    `,
  }, // 54,-4,0 central
  {
    x: 54,
    y: 3,
    z: 0,
    scale: 12,
    theme: "grass",
    name: "overview",
    map: `
    ..0...0...0..+..0
    +...+...........0
    ..0...0...0.....0
    0000.000000000.00
    ..0...0...0.....0,
    ..0.+...+.....+,,,
    ..0...0...0.....0,
    ..000000000000000
    `,
  }, // 56,3,0 overview
  {
    x: 22,
    y: 4,
    z: 0,
    w: 7,
    h: 6,
    scale: 6.5,
    theme: "grass",
    name: "home",
    map: `
000.000
0.....0
0.....0
0.....0
0.....0
0.....0
000.000
0.....0
0000000
    `,
  }, // 22,4,0 home
  {
    x: 22,
    y: -10,
    z: 0,
    w: 7,
    h: 7,
    scale: 9,
    theme: "grass",
    name: "above the river",
    map: `
.....,,
....,,.
....,..
...,,..
...,...
...,..,
...,,,,
    `,
  }, // 22,-10,0 above the river
  {
    x: 11,
    y: -5,
    z: 0,
    w: 11,
    h: 13,
    scale: 9,
    theme: "grass",
    name: "westward",
    map: `
...........
...........
,,,,,......
....,,,,,,,
...........
...........
...........
...........
......+....
...........
......+....
...........
000000.0000
    `,
  }, // 11,-5,0 westward
  {
    x: 12,
    y: 8,
    z: 0,
    scale: 7.5,
    theme: "grass",
    name: "a ring",
    map: `
0.........
0....+....
0..+...+..
0.........
0.+.....+.
0.........0
0..+...+..0
0....+....+
0.........0
00000.00000
    `,
  }, // 12,8,0 a ring
  {
    x: 22,
    y: 13,
    z: 0,
    scale: 7,
    theme: "grass",
    name: "bring",
    map: `
0..0..0
00...00
.......0
00...00
0..0..0
.000000
    `,
  }, // 22,13,0 bring
  {
    x: 14,
    y: 18,
    z: 0,
    scale: 6,
    theme: "grass",
    name: "stairing",
    map: `
0.....0..
0.....0.0
0.......0
0.....000
0.....0
00.0.00
0.....0
0.....0
0.....0
0.....0
0.....0
0000000
    `,
  }, // 14,18,0 stairing
  {
    x: -10,
    y: -10,
    z: 0,
    w: 21,
    h: 21,
    scale: 14,
    theme: "grass",
    name: "in the midst (todo)",
    map: `
000000000000000000000
0...................0
0...................0
0...................0
0...................0
0...................0
0...................0
0...................0
0...................0
0...................0
0.........#..........
0...................0
0...................0
0...................0
0...................0
0...................0
0...................0
0...................0
0...................0
0...................0
000000000000000000000
    `,
  }, // -10,-10,0 the core
  
  {
    x: 15,
    y: 18,
    z: 1,
    scale: 4.5,
    theme: "wood",
    name: "staring (to the right)",
    map: `
00000
0...0
.....
0...0
00000
    `,
  }, // 15,18,1 staring (to the right)
  {
    x: 20,
    y: 18,
    z: 1,
    scale: 5,
    theme: "wood",
    name: "star-ing!",
    map: `
0000
...0
...0
...0
0000
    `,
  }, // 20,18,1 star-ing!
  {
    x: 2,
    y: 17,
    z: 1,
    scale: 6.5,
    theme: "wood",
    name: "circles",
    map: `
.0000000000000
.0...........
.0...+.+..+..
,..+.....+.+.
.0...+.+..+..
.0...........
.0000000000000
    `,
  }, // 2,17,1 circles
  {
    x: 15,
    y: 23,
    z: 1,
    scale: 4.5,
    theme: "wood",
    name: "tiny rooms",
    map: `
0000000000.00
0000000000.00
0...0...0...0
............0
0...0...0...0
00.000.000.00
0...0...0...0
0...........0
0...0...0...0
00.000.000.00
0...0...0...0
0...........0
0...0...0...0
0.00000000000

    `,
  }, // 15,23,1 tiny rooms
  {
    x: 3,
    y: 23,
    z: 1,
    scale: 6.5,
    theme: "wood",
    name: "circled numbers",
    map: `
0000000000000
0.....0.+...
0.....0.+...
0.....0.+.+.
0.....0.+...
0.....0.+...
000+000.00000
0.....0.....
0.+.+.0..+..
0.....0.....
0.+.+.0+++++
0..+..0.....
0..........+
00000000000+
    `,
  }, // 3,23,1 circled numbers
  {
    x: 10,
    y: 37,
    z: 1,
    scale: 6,
    theme: "wood",
    name: "more circles?",
    map: `
    .0.....0.
    .0.....0.
    .0.....0.
    .0.....0.
    .0.....0.
    .0000000.
    `,
  }, // 10,37,1 more circles?
  {
    x: 63,
    y: 1,
    z: 1,
    scale: 6.5,
    theme: "wood",
    name: "circle test",
    map: `
000,000
000,000
00...00
00...00
00...00
000.000
000.000
000.000
0.....0
0.....0
0.....0...
0.....0000
0.....0..0
000.000
    `,
  }, // 63,1,1 circle test
  {
    x: 61,
    y: 14,
    z: 1,
    scale: 8,
    theme: "wood",
    name: "triangles?",
    map: `
00000.0000.0000,,0000
0.............,,,..+0
0.00.00...0...,,....0
0.0..00.0.0...+.....0,
0.+..+..+.0........+,,
0.........,+...0+...0,
00000.000,,,0000000.0
0.,,.....+,.........0
0..,,+....0..00+....0
0.........0...0..0+.0
0.,,,+....0.....000.0
0............00.....0
00,,0,+00000..00+.000
...,,,,....0......0..
...........00000000..
    `,
  }, // 63,15,1 triangles?
  {
    x: 22,
    y: 4,
    z: 1,
    w: 7,
    h: 6,
    scale: 6.5,
    theme: "wood",
    name: "room",
    map: `
..00000
......0
0.....0
0.....0
0.....0
0.....0
000.000
0.....0
0000000
    `,
  }, // 22,4,1 room
  {
    x: 15,
    y: -7,
    z: 1,
    w: 7,
    h: 6,
    scale: 6.5,
    theme: "wood",
    name: "random",
    map: `
0000000....
0.0.0.0....
0.0.0.0....
0.0.0.0....
0.0.0.00000
0.........0
0.....00000
0.........0
0.....00000
0......00
000.0...00
..0.00...
..00000..
......0
    `,
  }, // 15,-3,1 random
  {
    x: 25,
    y: 12,
    z: 1,
    scale: 6,
    theme: "wood",
    name: "ringed rings",
    map: `
    000000000.000
    0.....0.....0
    0.....0.....0
    0...........0
    0.....0.....000
    0.....0.......0
    000000000000000
    `,
  }, // 25,12,1 ringed rings
  {
    x: 29,
    y: 4,
    z: 1,
    scale: 7.5,
    theme: "wood",
    name: "more donuts",
    map: `
    000000000
    ........0
    ........0
    ........0
    ........0
    ........0
    ........0
    ........0
    `,
  }, // 29,4,1 more donuts
  {
    x: 21,
    y: 12,
    z: 1,
    scale: 6,
    theme: "wood",
    name: "middle room",
    map: `
0000000
0...0..
0...0..
0...0..
0...0..
0...0..
000.000
..0...0
..0....
..0...0
0000.00
    `,
  }, // 21,12,1 middle room
  {
    x: 27,
    y: 19,
    z: 1,
    scale: 7.5,
    theme: "wood",
    name: "squaring",
    map: `
    0....0.....,
    .....0....0
    0....0....0
    0.........0
    00000000000
    `,
  }, // 27,19,1 squaring
  
  {
    x: -10,
    y: -10,
    z: -99,
    scale: 10,
    theme: "warp",
    name: "warp zone",
    map: `
.....000.000.000.....
....00.000.000.00....
....0...0...0...0....
....0...0...0...0....
.0000...0...0...0000.
00...0.000.000.0...00
0...................0
00...0.........0...00
.00000.........00000.
00...0.........0...00
0...................0
00...0.........0...00
.00000.........00000.
00...0.........0...00
0...................0
00...0.000.000.0...00
.0000...0...0...0000.
....0...0...0...0....
....0...0...0...0....
....00.000.000.00....
.....000.000.000.....
    `,
  }, // -10,-10,-99 warp zone
  
];

export const objects = objects_temp;

export const wires = wires_temp;
export const tiles = {};
export const tilemap = {};
const tile_reverse_memo = {};

export const tiledef = {
  ["."]: {
    physics: "empty",
  },
  [","]: {
    physics: "wall",
    water: true,
  },
  ["0"]: {
    physics: "wall",
  },
  ["1"]: {
    physics: "empty",
  },
  ["2"]: {
    physics: "wall",
  },
  ["+"]: {
    physics: "empty",
  },
  ["#"]: {
    physics: "empty",
  },
  ["@"]: {
    physics: "empty",
  },
  ["portal"]: {
    physics: "empty",
  },
  ["link"]: {
    physics: "empty",
  },
  ["symbol"]: {
    physics: "empty",
  },
  ["sign"]: {
    physics: "sign",
  },
  ["panel"]: {
    physics: "panel",
  },
  ["door"]: {
    physics: "door",
  },
  ["star"]: {
    physics: "empty",
  },
};

export const object_lookup = {};
export const panel_lookup = {};
export const sign_lookup = {};
export const star_lookup = {};
export const door_lookup = {};
export const door_connections = {};
export const door_connexions = {};
for (const o of objects) {
  const s = o.x + "," + o.y + "," + o.z;
  object_lookup[s] = o;
  if (o.panel?.id != undefined) {
    panel_lookup[o.panel.id] = o;
  }
  if (o.type === "sign" && o.title != undefined) {
    sign_lookup[o.title] = o;
  }
  if (o.star?.id != undefined) {
    star_lookup[o.star.id] = o;
  }
  if (o.door?.id != undefined) {
    door_lookup[o.door.id] = o;
  }
  for (const pid of o.door?.panels ?? []) {
    if (door_connections[pid] == undefined) door_connections[pid] = [];
    door_connections[pid].push(o);
  }
  for (const pid of o.door?.panelx ?? []) {
    if (door_connexions[pid] == undefined) door_connexions[pid] = [];
    door_connexions[pid].push(o);
  }
}

const params = new URLSearchParams(document.location.search);

export const map = {
  
  start_point: {
    x: 0,
    y: 0,
    z: -1,
  },
  door_custom: null,
  panel_ref: null,
  physics_ref: null,
  player_ref: null,
  util_ref: null,
  v_ref: null,
  levels: [],
  solvable_panels: 0,
  stars_collected: [],
  get total_stars() {
    return this.stars_collected.length;
  },
  z_themes: {
    [-99]: "warp",
    [-1]: "grey",
    [0]: "grass",
    [1]: "wood",
  },
  init: function() {
    for (const pid in panel_lookup) {
      if (panel_lookup[pid].panel.unsolvable) continue;
      map.solvable_panels++;
    }
  },
  point_in_map: function(m, x, y, z) {
    return m.z === z && m.x <= x && m.y <= y && m.x + m.w > x && m.y + m.h > y;
  },
  area_in_map: function(m, x, y, z, w, h) {
    return m.z === z && m.x < x + w && m.y < y + h && m.x + m.w > x && m.y + m.h > y;
  },
  point_in_area: function(v, x, y, z, w, h) {
    return v.z === z && x <= v.x && y <= v.y && x + w > v.x && y + h > v.y;
  },
  search_point: function(x, y, z) {
    const result = [];
    for (const m of maps) {
      if (map.point_in_map(m, x, y, z)) {
        result.push(m);
      }
    }
    return result;
  },
  search_area: function(x, y, z, w, h) {
    const result = [];
    for (const m of maps) {
      if (map.area_in_map(m, x, y, z, w, h)) {
        result.push(m);
      }
    }
    return result;
  },
  search_objects: function(x, y, z, w, h) {
    const result = [];
    for (const o of objects) {
      if (map.point_in_area(o, x, y, z, w, h)) {
        result.push(o);
      }
    }
    return result;
  },
  search_wires: function(x, y, z, w, h) {
    const result = [];
    for (const ws in wires) {
      const o = wires[ws];
      if (map.point_in_area(o, x, y, z, w, h)) {
        result.push(o);
      }
    }
    return result;
  },
  get_scale: function(x, y, z) {
    return map.get_map(x, y, z)?.scale ?? 10;
  },
  get_map: function(x, y, z) {
    return tilemap[Math.round(x) + "," + Math.round(y) + "," + Math.floor(z)];
  },
  get_tile: function(x, y, z) {
    return tiles[Math.floor(x) + "," + Math.floor(y) + "," + Math.floor(z)] ?? ".";
  },
  get_object: function(x, y, z) {
    return object_lookup[Math.round(x) + "," + Math.round(y) + "," + Math.floor(z)];
  },
  get_panel: function(id) {
    return panel_lookup[id];
  },
  get_sign: function(title) {
    return sign_lookup[title];
  },
  get_star: function(id) {
    return star_lookup[id];
  },
  get_door: function(id) {
    return door_lookup[id];
  },
  get_doors: function(panel_id) {
    return door_connections[panel_id];
  },
  get_doors_x: function(panel_id) {
    return door_connexions[panel_id];
  },
  // returns if the door open state has changed
  check_door: function(door) {
    const old = door.open === true;
    if (door.rule === "custom") {
      const f = map.door_custom[door.id] ?? map.door_custom[door.custom] ?? ((d) => false);
      door.open = f(door);
      return (door.open !== old);
    }
    let number = 0;
    for (const pid of door.panels ?? []) {
      const pane = map.get_panel(pid)?.panel;
      const corr = ((door.rule.includes("solved")) ? pane?.solved : pane?.correct) === true;
      if (corr) number++;
    }
    door.number = number - (door.at_least ?? door.panels?.length ?? 0);
    const open = (door.number >= 0);
    door.open = open;
    return (open !== old);
  },
  str2vec: function(s) {
    return tile_reverse_memo[s];
    /*
    const splat = s.split(",");
    return {
      x: +splat[0],
      y: +splat[1],
      z: +splat[2],
    };
    */
  },
  vec2str: function(x, y, z) {
    return x + "," + y + "," + z;
  },
  
  // save/load
  save: function() {
    const save = {
      player: map.player_ref.save(),
      panels: {},
      signs: {},
      stars: map.stars_collected,
    };
    for (const pid in panel_lookup) {
      const o = map.get_panel(pid);
      const p = o.panel;
      const panelsave = {
        state: p.state,
        solved: p.solved,
      };
      if (p.lock.flat().includes(1)) {
        panelsave.lock = p.lock;
      }
      if (p.solvecount) {
        panelsave.solvecount = p.solvecount;
      }
      save.panels[pid] = panelsave;
    }
    const zipped = zipson.stringify(save);
    // console.log("saved", save);
    return zipped;
  },
  
  load: function(raw) {
    try {
      map.load_(raw);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  
  load_: function(raw) {
    const save = zipson.parse(raw);
    map.player_ref.load(save.player);
    for (const pid in panel_lookup) {
      const o = map.get_panel(pid);
      const p = o.panel;
      const s = save?.panels[pid];
      if (s) o.seen = true;
      if (s?.state != undefined) {
        p.state = [];
        for (let y = 0; y < p.h; y++) {
          const temp = [];
          for (let x = 0; x < p.w; x++) {
            if (+p.map[y][x] != 2) {
              temp.push(+p.map[y][x]);
            } else {
              temp.push(s?.state[y] ? +(s?.state[y][x] ?? 0) : 0);
            }
          }
          p.state.push(temp);
        }
      }
      if (s?.lock != undefined) {
        p.lock = [];
        for (let y = 0; y < o.panel.h; y++) {
          const temp = [];
          for (let x = 0; x < o.panel.w; x++) {
            temp.push(s?.lock[y] ? +s?.lock[y][x] ?? 0 : 0);
          }
          p.lock.push(temp);
        }
      }
      if (!p?.solved && !p?.revoke && s?.solved) {
        p.solved = true;
        map.panel_ref.total_solved++;
      }
      if (s?.solvecount) {
        p.solvecount = s.solvecount;
      }
      map.panel_ref.update_panel(pid);
    }
    map.panel_ref.update_doors(Object.values(panel_lookup));
    map.panel_ref.update_doors(Object.values(door_lookup));
    map.stars_collected = [];
    for (const asteroid of save.stars) {
      map.stars_collected.push(asteroid);
      map.get_star(asteroid).star.collected = true;
    }
  },
  
};


// do things

for (const m of maps) {
  m.map = m.map.trim().replaceAll(/[ ]/g, "").split("\n");
  /*if (m.wire) {
    m.wire = m.wire.trim().replaceAll(/[ ]/g, "").split("\n");
  }*/
}

for (const m of maps) {
  if (!map.levels.includes(m.z)) {
    map.levels.push(m.z);
  }
  for (let i = 0; i < m.map.length; i++) {
    const y = m.y + i;
    for (let j = 0; j < m.map[i].length; j++) {
      const x = m.x + j;
      const s = map.vec2str(x, y, m.z);
      tiles[s] = m.map[i][j];
      tilemap[s] = tilemap[s] ?? m;
      tile_reverse_memo[s] = { x: x, y: y, z: m.z };
      /*if (m.wire && m.wire[i][j] !== ".") {
        wires[s] = m.wire[i][j];
      }*/
    }
  }
}

/*
const dir4 = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const start_wires = [];
for (const ws in wires) { // ws stands for wirestring but that doesn't make much sense too because a wire is a string...
  const { x, y, z } = map.str2vec(ws);
  const the_number = +wires[ws];
  const dirs = [];
  let d = 0;
  for (const [dx, dy] of dir4) {
    d++;
    const s = map.vec2str(x + dx, y + dy, z);
    if (wires.hasOwnProperty(s)) {
      const o = wires[s];
      let num = o;
      if (typeof o === "object") {
        num = o.num;
      }
      if (the_number === +num) {
        dirs.push(d);
      }
    }
  }
  const obj = {
    x, y, z,
    num: the_number,
    dirs: dirs,
  };
  if (dirs.length === 1) {
    const o = map.get_object(x, y, z);
    if (o == null) {
      console.error("no object at wire termination point: ", x, y, z);
    } else if (o.type === "panel") {
      obj.id = o.panel.id;
      obj.distance = 0;
      start_wires.push(obj);
    } else if (o.type === "door") {
      // obj.id = o.door.id;
    }
  }
  wires[ws] = obj;
}

for (let wi = 0; wi < start_wires.length; wi++) {
  const w = start_wires[wi];
  for (const d of w.dirs) {
    const [ dx, dy ] = dir4[d - 1];
    const s = map.vec2str(w.x + dx, w.y + dy, w.z);
    if (wires.hasOwnProperty(s)) {
      const o = wires[s];
      if (o.id == null && o.num === w.num) {
        o.id = w.id;
        o.distance = w.distance + 1;
        start_wires.push(o);
      }
    }
  }
}
*/