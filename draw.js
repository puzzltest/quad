import { canvas, ctx, v, view, mouse } from "./index.js";
import { util } from "./util.js";

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
  save: "M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11.175q.4 0 .763.15t.637.425l2.85 2.85q.275.275.425.638t.15.762V19q0 .825-.587 1.413T19 21zm7-3q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-5-8h7q.425 0 .713-.288T15 9V7q0-.425-.288-.712T14 6H7q-.425 0-.712.288T6 7v2q0 .425.288.713T7 10",
  load: "M5 20h14q.425 0 .713.288T20 21t-.288.713T19 22H5q-.425 0-.712-.288T4 21t.288-.712T5 20m5-2q-.425 0-.712-.288T9 17v-6H7.05q-.625 0-.9-.562t.1-1.063l4.95-6.35q.15-.2.363-.3t.437-.1t.438.1t.362.3l4.95 6.35q.375.5.1 1.063t-.9.562H15v6q0 .425-.288.713T14 18z",
  
};