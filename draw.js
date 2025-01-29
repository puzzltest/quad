import { canvas, ctx, v, view, mouse } from "./index.js";
import { util } from "./util.js";
import { createNoise2D, createNoise3D, createNoise4D } from "https://cdn.jsdelivr.net/npm/simplex-noise@4.0.1/+esm";

const round = Math.round;
export const noise2 = createNoise2D();
export const noise3 = createNoise3D();
export const noise4  = createNoise4D();

export const draw = {
  
  noise2: noise2,
  noise3: noise3,
  noise4: noise4,
  
  line: function(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2 ?? x1, y2 ?? y1);
    ctx.stroke();
  },
  arc: function(x, y, r, start_angle, end_angle) {
    ctx.beginPath();
    //ctx.moveTo(x + r, y);
    ctx.arc(x, y, r, start_angle, end_angle);
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
  rect_angle: function(x, y, w, h, a, stroke = false) {
    const stored = ctx.getTransform();
    ctx.translate(x, y);
    ctx.rotate(a);
    draw.rectangle(0, 0, w, h);
    if (stroke) ctx.stroke();
    else ctx.fill();
    ctx.setTransform(stored);
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
  
  // svg
  svg: function(name, x, y, r, a = 0) {
    if (!svg[name]) {
      console.warn("no such svg: " + name);
      return;
    }
    const stored = ctx.getTransform();
    ctx.translate(x, y);
    ctx.rotate(a);
    ctx.translate(-r / 2, -r / 2);
    ctx.scale(r / 24, r / 24);
    ctx.fill(new Path2D(svg[name]));
    ctx.setTransform(stored);
    // draw.reset_transform();
  },
  
  // important!
  reset_transform: function() {
    ctx.resetTransform();
    const r = window.devicePixelRatio;
    ctx.scale(r, r);
  },
  
};

export const svg = {
  
  arrow_left: "m10 18l-6-6l6-6l1.4 1.45L7.85 11H20v2H7.85l3.55 3.55z",
  arrow_right: "m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6z",
  arrow_up: "M11 20V7.825l-5.6 5.6L4 12l8-8l8 8l-1.4 1.425l-5.6-5.6V20z",
  arrow_down: "M11 4v12.175l-5.6-5.6L4 12l8 8l8-8l-1.4-1.425l-5.6 5.6V4z",
  save: "M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11.175q.4 0 .763.15t.637.425l2.85 2.85q.275.275.425.638t.15.762V19q0 .825-.587 1.413T19 21zm7-3q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-5-8h7q.425 0 .713-.288T15 9V7q0-.425-.288-.712T14 6H7q-.425 0-.712.288T6 7v2q0 .425.288.713T7 10",
  load: "M5 20h14q.425 0 .713.288T20 21t-.288.713T19 22H5q-.425 0-.712-.288T4 21t.288-.712T5 20m5-2q-.425 0-.712-.288T9 17v-6H7.05q-.625 0-.9-.562t.1-1.063l4.95-6.35q.15-.2.363-.3t.437-.1t.438.1t.362.3l4.95 6.35q.375.5.1 1.063t-.9.562H15v6q0 .425-.288.713T14 18z",
  account: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.95 9.95 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20",
  map: "m15 21l-6-2.1l-4.65 1.8q-.5.2-.925-.112T3 19.75v-14q0-.325.188-.575T3.7 4.8L9 3l6 2.1l4.65-1.8q.5-.2.925.113T21 4.25v14q0 .325-.187.575t-.513.375zm-1-2.45V6.85l-4-1.4v11.7z",
  clear_puzzle: "M3 17v-2h2v2zm0-4v-2h2v2zm0-4V7h2v2zm4 12v-2h2v2zM7 5V3h2v2zm4 0V3h2v2zm1.5 16l-1.4-1.4l3.55-3.55l-3.55-3.55l1.4-1.4l3.55 3.55l3.55-3.55l1.4 1.4l-3.55 3.55L21 19.6L19.6 21l-3.55-3.55zM15 5V3h2v2zm4 4V7h2v2zM3 5V3h2v2zm18 0h-2V3h2zM3 21v-2h2v2z",
  lock_puzzle: "M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z",
  unlock_puzzle: "M12 17q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17m-6 5q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h7V6q0-2.075 1.463-3.537T18 1q1.875 0 3.263 1.213T22.925 5.2q.05.325-.225.563T22 6t-.7-.175t-.4-.575q-.275-.95-1.062-1.6T18 3q-1.25 0-2.125.875T15 6v2h3q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22z",
  
};