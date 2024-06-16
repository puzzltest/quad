import { camera } from "./camera.js";
import { canvas, ctx, v, view } from "./index.js";
import { util } from "./util.js";
import { draw } from "./draw.js";

let particles = [];
export const particle = {
  id: 1,
  get count() {
    return particles.length;
  },
};

particle.init = function() {
  particles = [];
};

particle.tick = function() {
  for (const p of particles) {
    if (p.delay > 0) {
      p.delay -= 1;
      continue;
    }
    p.x += p.vx;
    p.y += p.vy;
    p.a += p.va + Math.PI * 2;
    p.a %= Math.PI * 2;
    p.r += p.vr;
    p.t -= 1;
    if ((p.t <= 0 && p.t > -1) || p.r <= 0 || p.r > Math.max(v.width, v.height) /*|| p.x + p.r < 0 || p.y + p.r < 0 || p.x - p.r > v.width || p.y - p.r > v.height*/) { // wow what a long line
      p.active = false;
    }
  }
  particles = particles.filter((p) => p.active);
};

particle.draw = function() {
  ctx.save();
  draw.rect(view.x, view.y, view.size, view.size);
  ctx.clip();
  for (const p of particles) {
    if (p.delay > 0) continue;
    if (p.fill) ctx.fillStyle = p.fill;
    if (p.stroke) ctx.strokeStyle = p.stroke;
    let { x, y } = p;
    if (p.coordinates === "camera") {
      [ x, y ] = camera.convert(x, y);
    }
    if (p.type === "square") {
      draw.polygon(4, x, y, p.r, p.a);
      ctx.fill();
    } else if (p.type === "frame") {
      draw.polygon(4, x, y, p.r, p.a);
      ctx.stroke();
    } else if (p.type === "circle") {
      draw.circle(x, y, p.r);
      ctx.fill();
    } else if (p.type === "ring") {
      draw.circle(x, y, p.r);
      ctx.stroke();
    } else if (p.type === "star") {
      draw.star(4, x, y, p.r * 0.25, p.r, p.a);
      ctx.fill();
    }
  }
  ctx.restore();
};

particle.create = function(o) {
  const p = {
    id: particle.id++,
    active: true,
    type: o.type ?? "square",
    group: o.group ?? "none",
    coordinates: o.coord ?? "camera",
    x: o.x,
    y: o.y,
    a: o.a || 0,
    r: o.r ?? o.size / 2,
    t: o.t ?? -1,
    vx: (o.vx || 0),
    vy: (o.vy || 0),
    va: (o.va || 0),
    vr: (o.vr || 0),
    fill: o.fill ?? undefined,
    stroke: o.stroke ?? undefined,
    linewidth: o.linewidth ?? 1,
    delay: o.delay || 0,
  };
  if (o.rx) p.x += util.randreal(-o.rx, o.rx);
  if (o.ry) p.y += util.randreal(-o.ry, o.ry);
  if (o.ra) {
    p.a += Math.PI * 2 + util.randreal(-o.ra, o.ra);
    p.a %= Math.PI * 2;
  }
  if (o.rr) p.r += util.randreal(-o.rr, o.rr);
  if (o.rvx) p.vx += util.randreal(-o.rvx, o.rvx);
  if (o.rvy) p.vy += util.randreal(-o.rvy, o.rvy);
  if (o.rva) {
    p.va += Math.PI * 2 + util.randreal(-o.rva, o.rva);
    p.va %= Math.PI * 2;
  }
  if (o.rvr) p.vr += util.randreal(-o.rvr, o.rvr);
  particles.push(p);
};