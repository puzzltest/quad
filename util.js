import lzstring from 'https://cdn.jsdelivr.net/npm/lz-string@1.5.0/+esm';

export const util = {
  dir4: [[1, 0], [0, 1], [-1, 0], [0, -1]],
  dir5: [[0, 0], [1, 0], [0, 1], [-1, 0], [0, -1]],
  dir8: [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]],
  dir9: [[0, 0], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]],
  dir4x: [[1, 1], [-1, 1], [-1, -1], [1, -1]],
  dir5x: [[0, 0], [1, 1], [-1, 1], [-1, -1], [1, -1]],
  seg7: ["abcdef", "bc", "abdeg", "abcdg", "bcfg", "acdfg", "acdefg", "abc", "abcdefg", "abcdfg"],
  pi: Math.PI,
  sqrt2: Math.sqrt(2.0),
  sqrt3: Math.sqrt(3.0),
  invsqrt2: 1.0 / Math.sqrt(2.0),
  lerp: function(a, b, t) {
    return a * (1 - t) + b * t;
  },
  bounce: function(t, a) {
    return Math.abs((t % (a * 2)) - a) / a;
  },
  halfbounce: function(t, a) {
    return -Math.min((t % (a * 2)) - a, 0) / a;
  },
  round_to: function(n, mult) {
    return Math.round((n + Number.EPSILON) * mult) / mult;
  },
  seed: function(seed) {
    if (seed) {
      Math.seedrandom(seed);
    } else {
      Math.seedrandom();
    }
  },
  rng: function(seed) {
    return new Math.seedrandom(seed);
  },
  rand: function() {
    return Math.random();
  },
  randreal: function(a, b) {
    return a + Math.random() * (b - a);
  },
  randint: function(a, b) {
    return Math.floor(util.randreal(a, b + 1));
  },
  randrange: function(a, b) {
    return Math.floor(util.randreal(a, b));
  },
  randletters: function(l = 10) {
    let result = "";
    for (let i = 0; i < l; i++) {
      result += "abcdefghijklmnopqrstuvwxyz"[util.randint(0, 25)];
    }
    return result;
  },
  compress: function(s) {
    return lzstring.compressToUTF16(s);
  },
  decompress: function(s) {
    return lzstring.decompressFromUTF16(s);
  },
  compress_safe: function(s) {
    return lzstring.compressToEncodedURIComponent(s);
  },
  decompress_safe: function(s) {
    return lzstring.decompressFromEncodedURIComponent(s);
  },
  to_component: function(a) {
    return Math.floor(a).toString(16).padStart(2, "0");
  },
  radius2: function(x, y) {
    return x * x + y * y;
  },
  distance2: function(x1, y1, x2, y2) {
    return util.radius2(x2 - x1, y2 - y1);
  },
  xy2str: function(x, y) {
    return x + "," + y;
  },
  // constructs a 2d square matrix (arrays) based on function f
  construct: function(size, f) {
    const result = [];
    for (let i = 0; i < size; i++) {
      const temp = [];
      for (let j = 0; j < size; j++) {
        temp.push(f(j, i)); // f(x, y)
      }
      result.push(temp);
    }
    return result;
  },
  wfs: function(state, x, y, amount) {
    const air = state[y][x];
    const h = state.length;
    const w = state[0].length;
    const water = Array.from(Array(h), () => Array(w).fill(false));
    const visited = {};
    function is_solid(cx, cy) {
      return state[cy] != undefined && state[cy][cx] != undefined && (state[cy][cx] != air || water[cy][cx]);
    }
    function wfs_pour(xx, yy, a) { // guaranteed to pour from air
      while (yy < h && !is_solid(xx, yy + 1)) yy++;
      if (yy < 0 || yy >= h) return;
      const k = util.xy2str(xx, yy);
      if (visited[k]) return;
      visited[k] = 1;
      wfs_fill(xx, yy, a);
    }
    function wfs_fill(xx, yy, a) {
      let sources = [xx];
      while (yy >= 0) {
        const open = [];
        const q = sources.filter(s => s >= 0 && s < w && !is_solid(s, yy));
        if (q.length === 0) return;
        // 1d bfs
        const seen = new Set(q);
        while (q.length > 0) {
          const cx = q.pop();
          open.push(cx);
          for (const nx of [cx - 1, cx + 1]) {
            if (!seen.has(nx) && nx >= 0 && nx < w && !is_solid(nx, yy)) {
              seen.add(nx);
              if (is_solid(nx, yy + 1)) q.push(nx);
            }
          }
        }
        // console.log(seen, open);
        open.sort((a, b) => a - b);
        const groups = [[]];
        groups[0].push(open[0]);
        for (let i = 1; i < open.length; i++) {
          if (open[i] !== open[i - 1] + 1) groups.push([]);
          groups[groups.length - 1].push(open[i]);
        }
        sources = [];
        for (const group of groups) {
          const left = group[0];
          const right = group[group.length - 1];

          for (const cx of group) {
            if (yy + 1 < h && !is_solid(cx, yy + 1)) {
              console.error("floor hole error");
              wfs_pour(cx, yy + 1);
            }
          }

          const leftwall = is_solid(left - 1, yy);
          const rightwall = is_solid(right + 1, yy);
          const allfloor = group.every(cx => is_solid(cx, yy + 1));
          if (allfloor === false) console.error("floor all error");

          if (leftwall && rightwall) {
            sources.push(...group);
          } else {
            const divider = (Number(!leftwall) + Number(!rightwall));
            if (!leftwall && left > 0) wfs_pour(left - 1, yy, a / divider);
            if (!rightwall && right < w - 1) wfs_pour(right + 1, yy, a / divider);
            return;
          }
        }

        if (sources.length === 0) return;
        for (const x of sources) water[yy][x] = true;
        a -= sources.length;
        yy--;
      }
    }

    wfs_pour(x, y, amount);

    const result = [];
    for (let r = 0; r < h; r++)
      for (let c = 0; c < w; c++)
        if (water[r][c]) result.push({ x: c, y: r });
    return result;
  },
  bfs: function(a, x, y) {
    const result = [];
    const the = a[y][x];
    const visited = {};
    const q = [{ x, y }]; // q? really?
    let k;
    while (q.length > 0) {
      const b = q.pop();
      visited[util.xy2str(b.x, b.y)] = true;
      for (const [dx, dy] of util.dir4) {
        const xx = b.x + dx;
        const yy = b.y + dy;
        if (a[yy] == undefined || a[yy][xx] == undefined) continue;
        if (the == a[yy][xx] && !visited[k = util.xy2str(xx, yy)]) {
          visited[k] = true;
          q.push({ x: xx, y: yy });
        }
      }
      result.push(b);
    }
    return result;
  },
  bfs_all: function(a) {
    const result = [];
    const visited = {};
    for (let y = 0; y < a.length; y++) {
      const r = [];
      for (let x = 0; x < a[y].length; x++) {
        const v = visited[util.xy2str(b.x, b.y)];
        if (v) {
          r.push(v[0]);
          continue;
        }
        const a = [1]; // lol
        const ans = [];
        const the = a[y][x];
        const q = [{ x, y }];
        let k;
        while (q.length > 0) {
          const b = q.pop();
          visited[util.xy2str(b.x, b.y)] = a;
          for (const [dx, dy] of util.dir4) {
            const xx = b.x + dx;
            const yy = b.y + dy;
            if (a[yy] == undefined || a[yy][xx] == undefined) continue;
            if (the == a[yy][xx] && !visited[k = util.xy2str(xx, yy)]) {
              visited[k] = a;
              q.push({ x: xx, y: yy });
            }
          }
          ans.push(b);
        }
        a[0] = ans.length;
        r.push(a[0]);
      }
      result.push(r);
    }
    return result;
  },
  bfs_aabb: function(bfs_result) {
    const xs = [];
    const ys = [];
    for (const { x, y } of bfs_result) {
      xs.push(x);
      ys.push(y);
    }
    const min_x = Math.min(...xs);
    const max_x = Math.max(...xs);
    const min_y = Math.min(...ys);
    const max_y = Math.max(...ys);
    return {
      min_x, max_x, min_y, max_y,
      x: min_x,
      y: min_y,
      w: max_x - min_x,
      h: max_y - min_y,
    };
  },
  bfs_to_shape: function(bfs_result, padding = 0) {
    if (bfs_result.length === 1) return ["0"];
    const xs = [];
    const ys = [];
    for (const { x, y } of bfs_result) {
      xs.push(x);
      ys.push(y);
    }
    const min_x = Math.min(...xs) - padding;
    const max_x = Math.max(...xs) + padding;
    const min_y = Math.min(...ys) - padding;
    const max_y = Math.max(...ys) + padding;
    const temp = [];
    for (const line of ((".").repeat(max_x - min_x + 1) + "\n").repeat(max_y - min_y + 1).trim().split("\n")) {
      temp.push(line.split(""));
    }
    for (const { x, y } of bfs_result) {
      temp[y - min_y][x - min_x] = "0";
    }
    const result = [];
    for (const line of temp) {
      result.push(line?.join("") ?? line);
    }
    return result;
  },
  rotate_bfs_result: function(bfs_result) {
    const new_result = [];
    for (const { x, y } of bfs_result) {
      new_result.push({
        x: y,
        y: -x,
      });
    }
    return new_result;
  },
  compare_shape: function(shape1, shape2) {
    return (shape1.join("\n") === shape2.join("\n"));
  },
  size_of_shape: function(shape) {
    let size = 0;
    for (const line of shape) {
      for (const char of line) {
        if (char === "0") size++;
      }
    }
    return size;
  },
  shape_is_number: function(shape) {
    return util.check_shape_number(shape);
  },
  holes_in_shape: function(bfs_result) {
    const shape = util.bfs_to_shape(bfs_result, 1);
    const result = [];
    const visited = {};
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (visited[util.xy2str(x, y)]) continue;
        // modified bfs
        const q = [{ x, y }];
        const the = shape[y][x];
        const is_hole = the === "." && y > 0 && x > 0;
        const r = [];
        while (q.length > 0) {
          const b = q.pop();
          visited[util.xy2str(b.x, b.y)] = true;
          for (const [dx, dy] of util.dir4) {
            const xx = b.x + dx;
            const yy = b.y + dy;
            if (shape[yy] == undefined || shape[yy][xx] == undefined) continue;
            if (the === shape[yy][xx] && !visited[util.xy2str(xx, yy)]) {
              visited[util.xy2str(xx, yy)] = true;
              q.push({ x: xx, y: yy });
            }
          }
          if (is_hole) r.push(b);
        }
        if (is_hole) result.push(r);
      }
    }
    return result;
  },
  copy: function(text) {
    function fallbackCopyTextToClipboard(text) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }
      document.body.removeChild(textArea);
    }
    function copyTextToClipboard(text) {
      if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
      }
      navigator.clipboard.writeText(text).then(function() {
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
    }
    copyTextToClipboard(text);
  },
  is_local: () => (document.location.hostname === "localhost" || document.location.hostname === "127.0.0.1"),
  is_ios: function() {
    return [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod"
    ].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
  },
};

util.check_shape_number = (function() {
  // thanks matrix67!
  const shape0 = [
    ["111", "101", "111"]
  ];
  const shape1 = [
    ["1"]
  ];
  const shape2 = [
    ["11", "01", "11", "10", "11"],
    ["110", "010", "110", "100", "111"],
    ["111", "011", "111", "100", "110"],
    ["111", "001", "011", "010", "011"],
    ["1110", "0010", "0110", "0100", "0111"],
    ["1111", "0011", "0111", "0100", "0110"],
    ["011", "001", "111", "110", "111"],
    ["0110", "0010", "1110", "1100", "1111"],
    ["0111", "0011", "1111", "1100", "1110"],
    ["111", "001", "111", "100", "111"],
    ["1110", "0010", "1110", "1000", "1111"],
    ["1111", "0011", "1111", "1000", "1110"],
    ["1111", "0001", "0111", "0100", "0111"],
    ["11110", "00010", "01110", "01000", "01111"],
    ["11111", "00011", "01111", "01000", "01110"],
    ["0111", "0001", "1111", "1100", "1111"],
    ["01110", "00010", "11110", "11000", "11111"],
    ["01111", "00011", "11111", "11000", "11110"],
    ["011", "001", "111", "100", "111"],
    ["111", "001", "111", "100", "110"],
    ["011", "001", "111", "100", "110"],
    ["0110", "0010", "1110", "1000", "1111"],
    ["0111", "0011", "1111", "1000", "1110"],
    ["1111", "0001", "0111", "0100", "0110"],
    ["0111", "0001", "1111", "1100", "1110"],
    ["0011", "0001", "1111", "1000", "1100"],
    ["0111", "0001", "1111", "1000", "1100"],
    ["1111", "0001", "1111", "1000", "1100"],
    ["11111", "00001", "01111", "01000", "01100"],
    ["0011", "0001", "1111", "1000", "1110"],
    ["0011", "0001", "1111", "1000", "1111"],
    ["00110", "00010", "11110", "10000", "11111"],
    ["00011", "00001", "11111", "10000", "11000"]
  ];
  const shape3 = [
    ["11", "01", "11", "01", "11"],
    ["111", "001", "011", "001", "011"],
    ["011", "001", "111", "001", "011"],
    ["011", "001", "011", "001", "111"],
    ["111", "001", "111", "001", "011"],
    ["111", "001", "011", "001", "111"],
    ["011", "001", "111", "001", "111"],
    ["0011", "0001", "0111", "0001", "1111"],
    ["0011", "0001", "1111", "0001", "0111"],
    ["0111", "0001", "0011", "0001", "1111"],
    ["0111", "0001", "1111", "0001", "0011"],
    ["1111", "0001", "0011", "0001", "0111"],
    ["1111", "0001", "0111", "0001", "0011"]
  ];
  const shape4 = [
    ["101", "111", "001"],
    ["100", "101", "111", "001"],
    ["001", "101", "111", "001"],
    // ["1010", "1111", "0010"],
    // ["1000", "1010", "1111", "0010"],
    // ["0010", "1010", "1111", "0010"]
  ];
  const shape5 = [
    ["11", "10", "11", "01", "11"],
    ["111", "100", "110", "010", "110"],
    ["110", "100", "111", "011", "111"],
    ["011", "010", "011", "001", "111"],
    ["0111", "0100", "0110", "0010", "1110"],
    ["0110", "0100", "0111", "0011", "1111"],
    ["111", "110", "111", "001", "011"],
    ["1111", "1100", "1110", "0010", "0110"],
    ["1110", "1100", "1111", "0011", "0111"],
    ["111", "100", "111", "001", "111"],
    ["1111", "1000", "1110", "0010", "1110"],
    ["1110", "1000", "1111", "0011", "1111"],
    ["0111", "0100", "0111", "0001", "1111"],
    ["01111", "01000", "01110", "00010", "11110"],
    ["01110", "01000", "01111", "00011", "11111"],
    ["1111", "1100", "1111", "0001", "0111"],
    ["11111", "11000", "11110", "00010", "01110"],
    ["11110", "11000", "11111", "00011", "01111"],
    ["111", "100", "111", "001", "011"],
    ["110", "100", "111", "001", "111"],
    ["110", "100", "111", "001", "011"],
    ["1111", "1000", "1110", "0010", "0110"],
    ["1110", "1000", "1111", "0011", "0111"],
    ["0110", "0100", "0111", "0001", "1111"],
    ["1110", "1100", "1111", "0001", "0111"],
    ["1100", "1000", "1111", "0001", "0011"],
    ["1110", "1000", "1111", "0001", "0011"],
    ["1111", "1000", "1111", "0001", "0011"],
    ["11111", "10000", "11110", "00010", "00110"],
    ["1100", "1000", "1111", "0001", "0111"],
    ["1100", "1000", "1111", "0001", "1111"],
    ["01100", "01000", "01111", "00001", "11111"],
    ["11000", "10000", "11111", "00001", "00011"]
  ];
  const shape6 = [
    ["110", "100", "111", "101", "111"],
    ["111", "100", "111", "101", "111"],
    ["1111", "1000", "1110", "1010", "1110"],
    ["1110", "1000", "1111", "1011", "1111"],
    ["1100", "1000", "1111", "1001", "1111"]
  ];
  const shape7 = [
    ["11", "01"]
  ];
  const shape8 = [
    ["111", "101", "111", "101", "111"]
  ];
  const shape9 = [
    // ["111", "101", "111", "001"],
    ["111", "101", "111", "001", "011"],
    ["111", "101", "111", "001", "111"],
    ["0111", "0101", "0111", "0001", "1111"],
    ["1111", "1101", "1111", "0001", "0111"],
    ["1111", "1001", "1111", "0001", "0011"]
  ];
  const shapes = [shape0, shape1, shape2, shape3, shape4, shape5, shape6, shape7, shape8, shape9]

  function shrink(a) {
    if (!a.length) return [];
    const result = [a[0]];
    for (let i = 1; i < a.length; i++) {
      if (a[i] !== a[i - 1]) {
        result.push(a[i]);
      }
    }
    return result;
  }

  function trim0(a) {
    const all0 = (s) => /^0+$/.test(s);
    while (a.length && all0(a[0])) a.shift();
    while (a.length && all0(a[a.length - 1])) a.pop();
    return a;
  }

  function transpose(a) {
    if (!a.length) return [];
    const rr = a.length;
    const cc = a[0].length;
    const result = [];
    for (let c = 0; c < cc; c++) {
      let s = "";
      for (let r = 0; r < rr; r++) {
        s += a[r][c];
      }
      result.push(s);
    }
    return result;
  }

  function convert(a) {
    const result = [];
    for (let i = 0; i < a.length; i++) {
      let s = "";
      for (let j = 0; j < a[i].length; j++) {
        s += (a[i][j] === "0" ? "1" : "0");
      }
      result.push(s);
    }
    return result;
  }

  function equal(a1, a2) {
    if (a1.length !== a2.length) return false;
    for (let i = 0; i < a1.length; i++) {
      if (a1[i] !== a2[i]) return false;
    }
    return true;
  }

  function findshape(a) {
    for (let i = 0; i < shapes.length; i++) {
      for (let j = 0; j < shapes[i].length; j++) {
        if (equal(shapes[i][j], a)) {
          return i;
        }
      }
    }
    return -1; // no number at all
  }

  function check(a) {
    let result = a;
    result = convert(result);
    result = shrink(result);
    result = trim0(result);
    result = transpose(result);
    result = shrink(result);
    result = trim0(result);
    result = transpose(result);
    return findshape(result);
  }

  return check;
})();