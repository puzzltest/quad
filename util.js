
const round = Math.round;

export const util = {
  dir4: [[1, 0], [0, 1], [-1, 0], [0, -1]],
  dir5: [[0, 0], [1, 0], [0, 1], [-1, 0], [0, -1]],
  dir8: [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]],
  dir9: [[0, 0], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]],
  dir5x: [[0, 0], [1, 1], [-1, 1], [-1, -1], [1, -1]],
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
  rand: function() {
    return Math.random();
  },
  randreal: function(a, b) {
    return a + Math.random() * b;
  },
  randint: function(a, b) {
    return Math.floor(util.randreal(a, b + 1));
  },
  randletters: function(l = 10) {
    let result = "";
    for (let i = 0; i < l; i++) {
      result += "abcdefghijklmnopqrstuvwxyz"[util.randint(0, 25)];
    }
    return result;
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
  bfs: function(a, x, y) {
    const result = [];
    const the = a[y][x];
    const visited = {};
    const q = [{ x, y }]; // ya not really a q but ok
    while (q.length > 0) {
      const b = q.shift();
      for (const [dx, dy] of util.dir4) {
        const xx = b.x + dx;
        const yy = b.y + dy;
        if (a[yy] == undefined || a[yy][xx] == undefined) continue;
        if (the === a[yy][xx] && !visited[util.xy2str(xx, yy)]) {
          visited[util.xy2str(xx, yy)] = true;
          q.push({ x: xx, y: yy });
        }
      }
      visited[util.xy2str(b.x, b.y)] = true;
      result.push(b);
    }
    return result;
  },
  bfs_to_shape: function(bfs_result) {
    if (bfs_result.length === 1) return ["0"];
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
  copy: function(text) {
    function fallbackCopyTextToClipboard(text) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      
      // Avoid scrolling to bottom
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
  is_ios: function() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
  },
};
util.ios = util.is_ios();
