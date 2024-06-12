import { canvas, ctx, v, view, mouse } from "./index.js";
import { player } from "./player.js";

export const util = {
  dir4: [[1, 0], [0, 1], [-1, 0], [0, -1]],
  dir5: [[0, 0], [1, 0], [0, 1], [-1, 0], [0, -1]],
  dir8: [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]],
  dir9: [[0, 0], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]],
  dir5x: [[0, 0], [1, 1], [-1, 1], [-1, -1], [1, -1]],
  lerp: function(a, b, t) {
    return a * (1 - t) + b * t;
  },
  bounce: function(t, a) {
    return Math.abs((t % (a * 2)) - a) / a;
  },
  halfbounce: function(t, a) {
    return -Math.min((t % (a * 2)) - a, 0) / a;
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

const round = Math.round;
export const draw = {
  
  line: function(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2 ?? x1, y2 ?? y1);
    ctx.stroke();
  },
  circle: function(x, y, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arc(x, y, r, 0, Math.PI * 2);
  },
  rect: function(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
  },
  rectangle: function(x, y, w, h) {
    return draw.rect(x - w / 2, y - h / 2, w, h);
  },
  roundrect: function(x, y, w, h, r) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    /*
    r = Math.min(r, Math.min(w, h));
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arc(x + w - r, y + r, r, 0, Math.PI / 2);
    ctx.moveTo(x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI / 2);
    */
  },
  roundrectangle: function(x, y, w, h, r) {
    return draw.roundrect(x - w / 2, y - h / 2, w, h, r);
  },
  polygon: function(sides, x, y, r, a = 0) {
    ctx.beginPath();
    ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a));
    const step = Math.PI * 2 / sides;
    for (let i = 0; i < sides; i++) {
      a += step;
      ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
    }
  },
  star: function(sides, x, y, r1, r2, a = 0) {
    ctx.beginPath();
    ctx.moveTo(x + r1 * Math.cos(a), y + r1 * Math.sin(a));
    const step = Math.PI / sides;
    for (let i = 0; i < sides * 2; i++) {
      a += step;
      const r = (i % 2 ? r1 : r2);
      ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
    }
  },
  rect_angle: function(x, y, w, h, a) {
    x -= w / 2;
    y -= h / 2;
    // todo
  },
  
  // text functions
  set_font: function(size, modifier) {
    ctx.font = ((modifier) ? (modifier + " ") : "") + `${round(size)}px roboto mono`;
  },
  split_text_: function(text, x, y, w, h, fontsize) {
    const words = text.split(/[ ]+/g);
    const lines = [];
    let line = "";
    let space = "";
    ctx.font = fontsize + "px roboto mono";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    for (let n = 0; n < words.length; n++) {
      const temp = line + space + words[n];
      space = " ";
      if (ctx.measureText(temp).width > w) {
        // ctx.fillText(line, x, y);
        lines.push(line);
        line = words[n] + " ";
        space = "";
      } else {
        line = temp;
      }
    }
    lines.push(line);
    // ctx.fillText(line, x, y);
    // return y + gap - starty;
    return lines;
  },
  split_text: function(text, x, y, w, h, fontsize) {
    let lines = [];
    for (const t of text.split("\n")) {
      lines = lines.concat(draw.split_text_(t, x, y, w, h, fontsize));
    }
    const gap = fontsize * 1.286;
    const totaly = gap * (lines.length - 1) + fontsize;
    let yy = y - totaly / 2;
    for (const line of lines) {
      ctx.fillText(line, x, yy);
      yy += gap;
    }
  },
  
  // important!
  reset_transform: function() {
    ctx.resetTransform();
    const r = window.devicePixelRatio;
    ctx.scale(r, r);
  }
  
};