import { jsx as m, jsxs as zt, Fragment as Wt } from "react/jsx-runtime";
import pt, { useEffect as N, useRef as k, useState as z, useMemo as Qt } from "react";
const te = "/snake_sprite/snake-graphics.png", ee = "/snake_sprite/snake-graphics_achromatopsia.png", oe = "/snake_sprite/snake-graphics_deuteranopia.png", re = "/snake_sprite/snake-graphics_protanopia.png", ne = "/snake_sprite/snake-graphics_tritanopia.png", jt = {
  normal: te,
  achromatopsia: ee,
  deuteranopia: oe,
  protanopia: re,
  tritanopia: ne
};
function q({ src: o, alt: n, hidden: e, onLoad: t }) {
  return N(() => {
    const r = new Image();
    return r.src = o, r.onload = () => {
      t();
    }, () => {
      r.onload = null;
    };
  }, [o]), /* @__PURE__ */ m("img", { src: o, alt: n, hidden: e });
}
var it = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ht = {}, ut = {}, K = {};
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.JoystickShape = void 0, function(n) {
    n.Circle = "circle", n.Square = "square", n.AxisY = "axisY", n.AxisX = "axisX";
  }(o.JoystickShape || (o.JoystickShape = {}));
})(K);
var lt = {};
Object.defineProperty(lt, "__esModule", { value: !0 });
lt.shapeFactory = void 0;
var Ot = K, ie = function(o, n) {
  switch (o) {
    case Ot.JoystickShape.Square:
      return {
        borderRadius: Math.sqrt(n)
      };
    case Ot.JoystickShape.Circle:
    default:
      return {
        borderRadius: n
      };
  }
};
lt.shapeFactory = ie;
var dt = {};
Object.defineProperty(dt, "__esModule", { value: !0 });
dt.shapeBoundsFactory = void 0;
var Rt = K, se = function(o, n, e, t, r, i, c, s, a) {
  switch (o) {
    case Rt.JoystickShape.Square:
      return t = et(n - a.left - s / 2, s), r = et(e - a.top - s / 2, s), { relativeX: t, relativeY: r };
    case Rt.JoystickShape.AxisX:
      return t = et(n - a.left - s / 2, s), r = 0, { relativeX: t, relativeY: r };
    case Rt.JoystickShape.AxisY:
      return t = 0, r = et(e - a.top - s / 2, s), { relativeX: t, relativeY: r };
    default:
      return i > c && (t *= c / i, r *= c / i), { relativeX: t, relativeY: r };
  }
};
dt.shapeBoundsFactory = se;
var et = function(o, n) {
  var e = n / 2;
  return o > e ? e : o < -e ? e * -1 : o;
}, ae = it && it.__extends || /* @__PURE__ */ function() {
  var o = function(n, e) {
    return o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
      t.__proto__ = r;
    } || function(t, r) {
      for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
    }, o(n, e);
  };
  return function(n, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
    o(n, e);
    function t() {
      this.constructor = n;
    }
    n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
  };
}(), T = it && it.__assign || function() {
  return T = Object.assign || function(o) {
    for (var n, e = 1, t = arguments.length; e < t; e++) {
      n = arguments[e];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (o[r] = n[r]);
    }
    return o;
  }, T.apply(this, arguments);
};
Object.defineProperty(ut, "__esModule", { value: !0 });
ut.Joystick = void 0;
var U = pt, Jt = K, Lt = lt, ce = dt, M;
(function(o) {
  o.PointerDown = "pointerdown", o.PointerMove = "pointermove", o.PointerUp = "pointerup";
})(M || (M = {}));
var C;
(function(o) {
  o[o.TopRight = 2.35619449] = "TopRight", o[o.TopLeft = -2.35619449] = "TopLeft", o[o.BottomRight = 0.785398163] = "BottomRight", o[o.BottomLeft = -0.785398163] = "BottomLeft";
})(C || (C = {}));
var pe = (
  /** @class */
  function(o) {
    ae(n, o);
    function n(e) {
      var t = o.call(this, e) || this;
      return t._stickRef = U.createRef(), t._baseRef = U.createRef(), t.frameId = null, t._pointerId = null, t._mounted = !1, t._pointerMove = function(r) {
        if (r.preventDefault(), t.state.dragging) {
          if (!t.props.followCursor && r.pointerId !== t._pointerId)
            return;
          var i = r.clientX, c = r.clientY, s = i - t._parentRect.left - t._radius, a = c - t._parentRect.top - t._radius, g = t._distance(s, a), v = (0, ce.shapeBoundsFactory)(
            //@ts-ignore
            t.props.controlPlaneShape || t.props.baseShape,
            i,
            c,
            s,
            a,
            g,
            t._radius,
            t._baseSize,
            t._parentRect
          );
          s = v.relativeX, a = v.relativeY;
          var w = Math.atan2(s, a);
          t._updatePos({
            relativeX: s,
            relativeY: a,
            distance: t._distanceToPercentile(g),
            direction: t._getDirection(w),
            axisX: i - t._parentRect.left,
            axisY: c - t._parentRect.top
          });
        }
      }, t._pointerUp = function(r) {
        if (r.pointerId === t._pointerId) {
          var i = {
            dragging: !1
          };
          t.props.sticky || (i.coordinates = void 0), t.frameId = window.requestAnimationFrame(function() {
            t._mounted && t.setState(i);
          }), window.removeEventListener(M.PointerUp, t._pointerUp), window.removeEventListener(M.PointerMove, t._pointerMove), t._pointerId = null, t.props.stop && t.props.stop({
            type: "stop",
            // @ts-ignore
            x: t.props.sticky ? t.state.coordinates.relativeX * 2 / t._baseSize : null,
            // @ts-ignore
            y: t.props.sticky ? t.state.coordinates.relativeY * 2 / t._baseSize : null,
            // @ts-ignore
            direction: t.props.sticky ? t.state.coordinates.direction : null,
            // @ts-ignore
            distance: t.props.sticky ? t.state.coordinates.distance : null
          });
        }
      }, t.state = {
        dragging: !1
      }, t._throttleMoveCallback = /* @__PURE__ */ function() {
        var r = 0;
        return function(i) {
          var c = (/* @__PURE__ */ new Date()).getTime(), s = t.props.throttle || 0;
          if (!(c - r < s) && (r = c, t.props.move))
            return t.props.move(i);
        };
      }(), t;
    }
    return n.prototype.componentWillUnmount = function() {
      var e = this;
      this._mounted = !1, this.props.followCursor && window.removeEventListener(M.PointerMove, function(t) {
        return e._pointerMove(t);
      }), this.frameId !== null && window.cancelAnimationFrame(this.frameId);
    }, n.prototype.componentDidMount = function() {
      var e = this;
      this._mounted = !0, this.props.followCursor && (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(M.PointerMove, function(t) {
        return e._pointerMove(t);
      }), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, n.prototype._updatePos = function(e) {
      var t = this;
      this.frameId = window.requestAnimationFrame(function() {
        t._mounted && t.setState({
          coordinates: e
        });
      }), !(typeof this.props.minDistance == "number" && e.distance < this.props.minDistance) && this._throttleMoveCallback({
        type: "move",
        x: e.relativeX * 2 / this._baseSize,
        y: -(e.relativeY * 2 / this._baseSize),
        direction: e.direction,
        distance: e.distance
      });
    }, n.prototype._pointerDown = function(e) {
      this.props.disabled || this.props.followCursor || (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(M.PointerUp, this._pointerUp), window.addEventListener(M.PointerMove, this._pointerMove), this._pointerId = e.pointerId, this._stickRef.current.setPointerCapture(e.pointerId), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, n.prototype._getDirection = function(e) {
      return e > C.TopRight || e < C.TopLeft ? "FORWARD" : e < C.TopRight && e > C.BottomRight ? "RIGHT" : e < C.BottomLeft ? "LEFT" : "BACKWARD";
    }, n.prototype._distance = function(e, t) {
      return Math.hypot(e, t);
    }, n.prototype._distanceToPercentile = function(e) {
      var t = e / (this._baseSize / 2) * 100;
      return t > 100 ? 100 : t;
    }, n.prototype.getBaseShapeStyle = function() {
      var e = this.props.baseShape || Jt.JoystickShape.Circle;
      return (0, Lt.shapeFactory)(e, this._baseSize);
    }, n.prototype.getStickShapeStyle = function() {
      var e = this.props.stickShape || Jt.JoystickShape.Circle;
      return (0, Lt.shapeFactory)(e, this._baseSize);
    }, n.prototype._getBaseStyle = function() {
      var e = this.props.baseColor !== void 0 ? this.props.baseColor : "#000033", t = "".concat(this._baseSize, "px"), r = T(T({}, this.getBaseShapeStyle()), { height: t, width: t, background: e, display: "flex", justifyContent: "center", alignItems: "center" });
      return this.props.baseImage && (r.background = "url(".concat(this.props.baseImage, ")"), r.backgroundSize = "100%"), r;
    }, n.prototype._getStickStyle = function() {
      var e = this.props.stickColor !== void 0 ? this.props.stickColor : "#3D59AB", t = this._stickSize ? "".concat(this._stickSize, "px") : "".concat(this._baseSize / 1.5, "px"), r = T(T({}, this.getStickShapeStyle()), { background: e, cursor: "move", height: t, width: t, border: "none", flexShrink: 0, touchAction: "none" });
      return this.props.stickImage && (r.background = "url(".concat(this.props.stickImage, ")"), r.backgroundSize = "100%"), this.props.pos && (r = Object.assign({}, r, {
        position: "absolute",
        transform: "translate3d(".concat(this.props.pos.x * this._baseSize / 2, "px, ").concat(-(this.props.pos.y * this._baseSize) / 2, "px, 0)")
      })), this.state.coordinates !== void 0 && (r = Object.assign({}, r, {
        position: "absolute",
        transform: "translate3d(".concat(this.state.coordinates.relativeX, "px, ").concat(this.state.coordinates.relativeY, "px, 0)")
      })), r;
    }, n.prototype.render = function() {
      var e = this;
      this._baseSize = this.props.size || 100, this._stickSize = this.props.stickSize, this._radius = this._baseSize / 2;
      var t = this._getBaseStyle(), r = this._getStickStyle();
      return U.createElement(
        "div",
        { "data-testid": "joystick-base", className: this.props.disabled ? "joystick-base-disabled" : "", ref: this._baseRef, style: t },
        U.createElement("button", { ref: this._stickRef, disabled: this.props.disabled, onPointerDown: function(i) {
          return e._pointerDown(i);
        }, className: this.props.disabled ? "joystick-disabled" : "", style: r })
      );
    }, n;
  }(U.Component)
);
ut.Joystick = pe;
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.JoystickShape = o.Joystick = void 0;
  var n = ut;
  Object.defineProperty(o, "Joystick", { enumerable: !0, get: function() {
    return n.Joystick;
  } });
  var e = K;
  Object.defineProperty(o, "JoystickShape", { enumerable: !0, get: function() {
    return e.JoystickShape;
  } });
})(Ht);
const ue = ({ onDirectionChange: o }) => {
  const n = {
    position: "fixed",
    bottom: "5%",
    right: "5%",
    // width: '100%',
    width: "20%",
    height: "10%",
    // backgroundColor: 'blue',
    color: "white",
    fontSize: "16px",
    padding: "10px",
    borderRadius: "4px"
  }, e = 60, t = k(null), r = k(), i = k(0), c = (a) => {
    t.current = a.direction;
  }, s = () => {
    t.current = null;
  };
  return N(() => {
    let a;
    const g = (v) => {
      v - i.current >= e && (t.current != null && o(t.current), i.current = v), a = window.requestAnimationFrame(g);
    };
    return g(), () => {
      window.cancelAnimationFrame(a);
    };
  }, []), /* @__PURE__ */ m("div", { style: n, children: /* @__PURE__ */ m(Ht.Joystick, { ref: r, minDistance: 50, move: c, stop: s }) });
}, le = (o, n, e) => {
  const t = o[n];
  return t ? typeof t == "function" ? t() : Promise.resolve(t) : new Promise((r, i) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(
      i.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + n + (n.split("/").length !== e ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
}, de = "_snakeGame_2cqgw_5", he = "_snakeCanvas_2cqgw_15", fe = "_mapCanvas_2cqgw_23", Mt = {
  snakeGame: de,
  snakeCanvas: he,
  mapCanvas: fe
}, ve = "_loadingDiv_dcsfs_1", _e = {
  loadingDiv: ve
}, ye = () => /* @__PURE__ */ m("div", { className: _e.loadingDiv, children: /* @__PURE__ */ m("h1", { children: "Loading..." }) }), me = ({ mapImporterName: o, nextMap: n, addScore: e }) => {
  const [t, r] = z(""), i = k(), c = k(), s = k(), a = k("right"), g = k(), v = k(), w = k(), [J, Gt] = z("normal"), [kt, Ct] = z(!1), L = k(), Y = k(), [Nt, Kt] = z(!1), [d, Ee] = z(30), B = $t(5, () => {
    console.log(kt), Ct(!0), console.log("loaded");
  });
  function $t(f, l) {
    let h = 0;
    return function(...p) {
      h = h + 1, f === h && l(...p);
    };
  }
  const X = Qt(() => ({
    normal: J !== "normal",
    achromatopsia: J !== "achromatopsia",
    deuteranopia: J !== "deuteranopia",
    protanopia: J !== "protanopia",
    tritanopia: J !== "tritanopia"
  }), [J]), wt = (f) => {
    if (typeof f == "object") {
      const l = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down"
      };
      if (l[f.key] == "right" && a.current != "left")
        a.current = "right";
      else if (l[f.key] == "left" && a.current != "right")
        a.current = "left";
      else if (l[f.key] == "up" && a.current != "down")
        a.current = "up";
      else if (l[f.key] == "down" && a.current != "up")
        a.current = "down";
      else if (f.key == "m")
        e(), console.log(e);
      else {
        console.log(f.key);
        return;
      }
    } else if (f == "RIGHT" && a.current != "left")
      a.current = "right";
    else if (f == "LEFT" && a.current != "right")
      a.current = "left";
    else if (f == "FORWARD" && a.current != "down")
      a.current = "up";
    else if (f == "BACKWARD" && a.current != "up")
      a.current = "down";
    else
      return;
    Zt();
  }, Vt = () => {
    const f = {
      right: [1, 0],
      left: [-1, 0],
      up: [0, -1],
      down: [0, 1]
    };
    i.current.unshift(
      [
        i.current[0][0] + f[a.current][0] * d,
        i.current[0][1] + f[a.current][1] * d
      ]
    ), i.current[0][0] < 0 ? i.current[0][0] = window.innerWidth : i.current[0][0] > window.innerWidth && (i.current[0][0] = 0);
    const l = s.current;
    Math.abs(i.current[0][0] - l[0]) < d && Math.abs(i.current[0][1] + scrollY - l[1]) < d && (console.log("==========================tunnel"), n());
    const h = c.current;
    let p = !1;
    for (let u = 0; u < h.length; u++) {
      const [R, _] = h[u];
      if (Math.abs(i.current[0][0] - _[0]) < d * 0.75 && Math.abs(i.current[0][1] + scrollY - _[1]) < d * 0.75) {
        console.log("==========================eaten"), e(), p = !0, c.current.splice(u, 1), tt();
        const y = new Image();
        y.src = jt[R], v.current = y, Gt(R), u--;
      }
    }
    p || i.current.pop(), console.log(window.innerHeight + window.scrollY, L.current.offsetHeight), a.current == "down" ? (window.innerHeight + window.scrollY < L.current.offsetHeight - d && i.current.forEach((u) => u[1] -= d), scrollBy(0, d + 1)) : a.current == "up" && (window.scrollY > 0 && i.current.forEach((u) => u[1] += d), scrollBy(0, -d + 1));
  }, Q = () => {
    const l = g.current.getContext("2d");
    l.clearRect(0, 0, l.canvas.width, l.canvas.height);
    for (var h = 0; h < i.current.length; h++) {
      var p = 0, u = 0, R = i.current[h], _ = R[0], y = R[1];
      if (h == 0) {
        var b = i.current[h + 1];
        y < b[1] ? (p = 3, u = 0) : _ > b[0] ? (p = 4, u = 0) : y > b[1] ? (p = 4, u = 1) : _ < b[0] && (p = 3, u = 1);
      } else if (h == i.current.length - 1) {
        var S = i.current[h - 1];
        S[1] < y ? (p = 3, u = 2) : S[0] > _ ? (p = 4, u = 2) : S[1] > y ? (p = 4, u = 3) : S[0] < _ && (p = 3, u = 3);
      } else {
        var S = i.current[h - 1], b = i.current[h + 1];
        S[0] < _ && b[0] > _ || b[0] < _ && S[0] > _ ? (p = 1, u = 0) : S[0] < _ && b[1] > y || b[0] < _ && S[1] > y ? (p = 2, u = 0) : S[1] < y && b[1] > y || b[1] < y && S[1] > y ? (p = 2, u = 1) : S[1] < y && b[0] < _ || b[1] < y && S[0] < _ ? (p = 2, u = 2) : S[0] > _ && b[1] < y || b[0] > _ && S[1] < y ? (p = 0, u = 1) : S[1] > y && b[0] > _ || b[1] > y && S[0] > _ ? (p = 0, u = 0) : (p = 1, u = 0);
      }
      var xt = [0, 0];
      l.drawImage(Y.current, p * 64, u * 64, 64, 64, i.current[h][0] + xt[0], i.current[h][1] + xt[1], d, d);
    }
  }, tt = () => {
    const l = w.current.getContext("2d");
    l.clearRect(0, 0, l.canvas.width, l.canvas.height), l.textAlign = "center", l.font = "20px Georgia", l.fillStyle = "white", c.current.forEach(([h, p]) => {
      l.drawImage(Y.current, 0 * 64, 3 * 64, 64, 64, p[0], p[1], d, d), l.fillText(h, p[0] + d / 2, p[1] + d);
    }), l.drawImage(Y.current, 1 * 64, 3 * 64, 64, 64, s.current[0], s.current[1], d * 2, d * 2), l.fillText("Next Map", s.current[0] + d, s.current[1] + 64);
  }, Zt = () => {
    console.log("gameLoop"), Vt(), Q();
  };
  return N(() => {
    Ct(!1);
  }, [o]), N(() => {
    console.log("setup"), (async () => {
      try {
        const p = await le(/* @__PURE__ */ Object.assign({ "../image_importers/desertImages.js": () => import("./desertImages-CIneN81N.js"), "../image_importers/forestImages.js": () => import("./forestImages-My2q2rGl.js"), "../image_importers/mapImages.js": () => import("./mapImages-BClUnFAK.js") }), `../image_importers/${o}.js`, 3);
        r(p.default);
      } catch {
        console.error("Failed to dynamically load component");
      }
    })(), c.current = [
      ["protanopia", [0.3, 0.3]],
      ["achromatopsia", [0.4, 0.35]],
      ["deuteranopia", [0.4, 0.45]],
      ["tritanopia", [0.4, 0.55]],
      ["normal", [0.4, 0.65]]
    ], c.current.forEach((p) => {
      p[1][0] *= L.current.offsetWidth, p[1][1] *= L.current.offsetHeight;
    }), i.current = [
      [Math.round(window.innerWidth / 2), Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - d, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - d * 2, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - d * 3, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - d * 4, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - d * 5, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - d * 6, Math.round(window.innerHeight / 2)]
    ];
    const l = new Image();
    l.src = jt.normal, v.current = l, s.current = [
      Math.floor(Math.random() * (document.documentElement.offsetWidth - 64 * 2 - 64 * 2 + 1)) + 64 * 2,
      Math.ceil(document.documentElement.offsetHeight * 0.9)
    ];
    const h = () => {
      const p = g.current, u = w.current, R = L.current;
      p.width = Math.min(window.innerWidth, 1920), p.height = window.innerHeight, u.width = R.offsetWidth, u.height = R.offsetHeight, Kt(window.innerWidth <= 768), Q(), tt();
    };
    return h(), Q(), tt(), window.addEventListener("resize", h), window.addEventListener("keydown", wt), () => {
      window.removeEventListener("resize", h), window.removeEventListener("keydown", wt);
    };
  }, [kt, o]), N(() => {
    console.log("snakesprite");
    const f = Y.current;
    f.src = v.current.src, f.onload = () => {
      tt(), Q();
    };
  }, [v.current]), /* @__PURE__ */ zt("div", { ref: L, className: Mt.snakeGame, children: [
    !kt && /* @__PURE__ */ m(ye, {}),
    /* @__PURE__ */ m("img", { src: "", hidden: !0, style: { position: "fixed" }, ref: Y }),
    /* @__PURE__ */ m("canvas", { className: Mt.mapCanvas, ref: w }),
    /* @__PURE__ */ m("canvas", { className: Mt.snakeCanvas, ref: g }),
    t && /* @__PURE__ */ zt(Wt, { children: [
      /* @__PURE__ */ m(q, { src: t.normal, hidden: X.normal, alt: "normal", onLoad: B }),
      /* @__PURE__ */ m(q, { src: t.achromatopsia, hidden: X.achromatopsia, alt: "achromatopsia", onLoad: B }),
      /* @__PURE__ */ m(q, { src: t.deuteranopia, hidden: X.deuteranopia, alt: "deuteranopia", onLoad: B }),
      /* @__PURE__ */ m(q, { src: t.protanopia, hidden: X.protanopia, alt: "protanopia", onLoad: B }),
      /* @__PURE__ */ m(q, { src: t.tritanopia, hidden: X.tritanopia, alt: "tritanopia", onLoad: B })
    ] }),
    Nt && /* @__PURE__ */ m(ue, { onDirectionChange: wt })
  ] });
}, ge = () => {
  const [o, n] = z(0), [e, t] = z(0);
  return console.log(e), /* @__PURE__ */ zt("div", { children: [
    /* @__PURE__ */ m("span", { style: { position: "fixed", zIndex: 999, top: 0, backgroundColor: "white" }, children: e }),
    /* @__PURE__ */ m(me, { mapImporterName: {
      0: "forestImages",
      1: "desertImages"
    }[o], nextMap: () => n(o + 1), addScore: () => t((i) => i + 1) })
  ] });
};
var st = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, be = {}, ht = {}, $ = {};
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.JoystickShape = void 0, function(n) {
    n.Circle = "circle", n.Square = "square", n.AxisY = "axisY", n.AxisX = "axisX";
  }(o.JoystickShape || (o.JoystickShape = {}));
})($);
var ft = {};
Object.defineProperty(ft, "__esModule", { value: !0 });
ft.shapeFactory = void 0;
var Tt = $, Se = function(o, n) {
  switch (o) {
    case Tt.JoystickShape.Square:
      return {
        borderRadius: Math.sqrt(n)
      };
    case Tt.JoystickShape.Circle:
    default:
      return {
        borderRadius: n
      };
  }
};
ft.shapeFactory = Se;
var vt = {};
Object.defineProperty(vt, "__esModule", { value: !0 });
vt.shapeBoundsFactory = void 0;
var It = $, ke = function(o, n, e, t, r, i, c, s, a) {
  switch (o) {
    case It.JoystickShape.Square:
      return t = ot(n - a.left - s / 2, s), r = ot(e - a.top - s / 2, s), { relativeX: t, relativeY: r };
    case It.JoystickShape.AxisX:
      return t = ot(n - a.left - s / 2, s), r = 0, { relativeX: t, relativeY: r };
    case It.JoystickShape.AxisY:
      return t = 0, r = ot(e - a.top - s / 2, s), { relativeX: t, relativeY: r };
    default:
      return i > c && (t *= c / i, r *= c / i), { relativeX: t, relativeY: r };
  }
};
vt.shapeBoundsFactory = ke;
var ot = function(o, n) {
  var e = n / 2;
  return o > e ? e : o < -e ? e * -1 : o;
}, we = st && st.__extends || /* @__PURE__ */ function() {
  var o = function(n, e) {
    return o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
      t.__proto__ = r;
    } || function(t, r) {
      for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
    }, o(n, e);
  };
  return function(n, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
    o(n, e);
    function t() {
      this.constructor = n;
    }
    n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
  };
}(), F = st && st.__assign || function() {
  return F = Object.assign || function(o) {
    for (var n, e = 1, t = arguments.length; e < t; e++) {
      n = arguments[e];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (o[r] = n[r]);
    }
    return o;
  }, F.apply(this, arguments);
};
Object.defineProperty(ht, "__esModule", { value: !0 });
ht.Joystick = void 0;
var W = pt, Ft = $, Et = ft, Re = vt, I;
(function(o) {
  o.PointerDown = "pointerdown", o.PointerMove = "pointermove", o.PointerUp = "pointerup";
})(I || (I = {}));
var x;
(function(o) {
  o[o.TopRight = 2.35619449] = "TopRight", o[o.TopLeft = -2.35619449] = "TopLeft", o[o.BottomRight = 0.785398163] = "BottomRight", o[o.BottomLeft = -0.785398163] = "BottomLeft";
})(x || (x = {}));
var Me = (
  /** @class */
  function(o) {
    we(n, o);
    function n(e) {
      var t = o.call(this, e) || this;
      return t._stickRef = W.createRef(), t._baseRef = W.createRef(), t.frameId = null, t._pointerId = null, t._mounted = !1, t._pointerMove = function(r) {
        if (r.preventDefault(), t.state.dragging) {
          if (!t.props.followCursor && r.pointerId !== t._pointerId)
            return;
          var i = r.clientX, c = r.clientY, s = i - t._parentRect.left - t._radius, a = c - t._parentRect.top - t._radius, g = t._distance(s, a), v = (0, Re.shapeBoundsFactory)(
            //@ts-ignore
            t.props.controlPlaneShape || t.props.baseShape,
            i,
            c,
            s,
            a,
            g,
            t._radius,
            t._baseSize,
            t._parentRect
          );
          s = v.relativeX, a = v.relativeY;
          var w = Math.atan2(s, a);
          t._updatePos({
            relativeX: s,
            relativeY: a,
            distance: t._distanceToPercentile(g),
            direction: t._getDirection(w),
            axisX: i - t._parentRect.left,
            axisY: c - t._parentRect.top
          });
        }
      }, t._pointerUp = function(r) {
        if (r.pointerId === t._pointerId) {
          var i = {
            dragging: !1
          };
          t.props.sticky || (i.coordinates = void 0), t.frameId = window.requestAnimationFrame(function() {
            t._mounted && t.setState(i);
          }), window.removeEventListener(I.PointerUp, t._pointerUp), window.removeEventListener(I.PointerMove, t._pointerMove), t._pointerId = null, t.props.stop && t.props.stop({
            type: "stop",
            // @ts-ignore
            x: t.props.sticky ? t.state.coordinates.relativeX * 2 / t._baseSize : null,
            // @ts-ignore
            y: t.props.sticky ? t.state.coordinates.relativeY * 2 / t._baseSize : null,
            // @ts-ignore
            direction: t.props.sticky ? t.state.coordinates.direction : null,
            // @ts-ignore
            distance: t.props.sticky ? t.state.coordinates.distance : null
          });
        }
      }, t.state = {
        dragging: !1
      }, t._throttleMoveCallback = /* @__PURE__ */ function() {
        var r = 0;
        return function(i) {
          var c = (/* @__PURE__ */ new Date()).getTime(), s = t.props.throttle || 0;
          if (!(c - r < s) && (r = c, t.props.move))
            return t.props.move(i);
        };
      }(), t;
    }
    return n.prototype.componentWillUnmount = function() {
      var e = this;
      this._mounted = !1, this.props.followCursor && window.removeEventListener(I.PointerMove, function(t) {
        return e._pointerMove(t);
      }), this.frameId !== null && window.cancelAnimationFrame(this.frameId);
    }, n.prototype.componentDidMount = function() {
      var e = this;
      this._mounted = !0, this.props.followCursor && (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(I.PointerMove, function(t) {
        return e._pointerMove(t);
      }), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, n.prototype._updatePos = function(e) {
      var t = this;
      this.frameId = window.requestAnimationFrame(function() {
        t._mounted && t.setState({
          coordinates: e
        });
      }), !(typeof this.props.minDistance == "number" && e.distance < this.props.minDistance) && this._throttleMoveCallback({
        type: "move",
        x: e.relativeX * 2 / this._baseSize,
        y: -(e.relativeY * 2 / this._baseSize),
        direction: e.direction,
        distance: e.distance
      });
    }, n.prototype._pointerDown = function(e) {
      this.props.disabled || this.props.followCursor || (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(I.PointerUp, this._pointerUp), window.addEventListener(I.PointerMove, this._pointerMove), this._pointerId = e.pointerId, this._stickRef.current.setPointerCapture(e.pointerId), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, n.prototype._getDirection = function(e) {
      return e > x.TopRight || e < x.TopLeft ? "FORWARD" : e < x.TopRight && e > x.BottomRight ? "RIGHT" : e < x.BottomLeft ? "LEFT" : "BACKWARD";
    }, n.prototype._distance = function(e, t) {
      return Math.hypot(e, t);
    }, n.prototype._distanceToPercentile = function(e) {
      var t = e / (this._baseSize / 2) * 100;
      return t > 100 ? 100 : t;
    }, n.prototype.getBaseShapeStyle = function() {
      var e = this.props.baseShape || Ft.JoystickShape.Circle;
      return (0, Et.shapeFactory)(e, this._baseSize);
    }, n.prototype.getStickShapeStyle = function() {
      var e = this.props.stickShape || Ft.JoystickShape.Circle;
      return (0, Et.shapeFactory)(e, this._baseSize);
    }, n.prototype._getBaseStyle = function() {
      var e = this.props.baseColor !== void 0 ? this.props.baseColor : "#000033", t = "".concat(this._baseSize, "px"), r = F(F({}, this.getBaseShapeStyle()), { height: t, width: t, background: e, display: "flex", justifyContent: "center", alignItems: "center" });
      return this.props.baseImage && (r.background = "url(".concat(this.props.baseImage, ")"), r.backgroundSize = "100%"), r;
    }, n.prototype._getStickStyle = function() {
      var e = this.props.stickColor !== void 0 ? this.props.stickColor : "#3D59AB", t = this._stickSize ? "".concat(this._stickSize, "px") : "".concat(this._baseSize / 1.5, "px"), r = F(F({}, this.getStickShapeStyle()), { background: e, cursor: "move", height: t, width: t, border: "none", flexShrink: 0, touchAction: "none" });
      return this.props.stickImage && (r.background = "url(".concat(this.props.stickImage, ")"), r.backgroundSize = "100%"), this.props.pos && (r = Object.assign({}, r, {
        position: "absolute",
        transform: "translate3d(".concat(this.props.pos.x * this._baseSize / 2, "px, ").concat(-(this.props.pos.y * this._baseSize) / 2, "px, 0)")
      })), this.state.coordinates !== void 0 && (r = Object.assign({}, r, {
        position: "absolute",
        transform: "translate3d(".concat(this.state.coordinates.relativeX, "px, ").concat(this.state.coordinates.relativeY, "px, 0)")
      })), r;
    }, n.prototype.render = function() {
      var e = this;
      this._baseSize = this.props.size || 100, this._stickSize = this.props.stickSize, this._radius = this._baseSize / 2;
      var t = this._getBaseStyle(), r = this._getStickStyle();
      return W.createElement(
        "div",
        { "data-testid": "joystick-base", className: this.props.disabled ? "joystick-base-disabled" : "", ref: this._baseRef, style: t },
        W.createElement("button", { ref: this._stickRef, disabled: this.props.disabled, onPointerDown: function(i) {
          return e._pointerDown(i);
        }, className: this.props.disabled ? "joystick-disabled" : "", style: r })
      );
    }, n;
  }(W.Component)
);
ht.Joystick = Me;
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.JoystickShape = o.Joystick = void 0;
  var n = ht;
  Object.defineProperty(o, "Joystick", { enumerable: !0, get: function() {
    return n.Joystick;
  } });
  var e = $;
  Object.defineProperty(o, "JoystickShape", { enumerable: !0, get: function() {
    return e.JoystickShape;
  } });
})(be);
var at = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ie = {}, _t = {}, V = {};
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.JoystickShape = void 0, function(n) {
    n.Circle = "circle", n.Square = "square", n.AxisY = "axisY", n.AxisX = "axisX";
  }(o.JoystickShape || (o.JoystickShape = {}));
})(V);
var yt = {};
Object.defineProperty(yt, "__esModule", { value: !0 });
yt.shapeFactory = void 0;
var Dt = V, Pe = function(o, n) {
  switch (o) {
    case Dt.JoystickShape.Square:
      return {
        borderRadius: Math.sqrt(n)
      };
    case Dt.JoystickShape.Circle:
    default:
      return {
        borderRadius: n
      };
  }
};
yt.shapeFactory = Pe;
var mt = {};
Object.defineProperty(mt, "__esModule", { value: !0 });
mt.shapeBoundsFactory = void 0;
var Pt = V, Ae = function(o, n, e, t, r, i, c, s, a) {
  switch (o) {
    case Pt.JoystickShape.Square:
      return t = rt(n - a.left - s / 2, s), r = rt(e - a.top - s / 2, s), { relativeX: t, relativeY: r };
    case Pt.JoystickShape.AxisX:
      return t = rt(n - a.left - s / 2, s), r = 0, { relativeX: t, relativeY: r };
    case Pt.JoystickShape.AxisY:
      return t = 0, r = rt(e - a.top - s / 2, s), { relativeX: t, relativeY: r };
    default:
      return i > c && (t *= c / i, r *= c / i), { relativeX: t, relativeY: r };
  }
};
mt.shapeBoundsFactory = Ae;
var rt = function(o, n) {
  var e = n / 2;
  return o > e ? e : o < -e ? e * -1 : o;
}, ze = at && at.__extends || /* @__PURE__ */ function() {
  var o = function(n, e) {
    return o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
      t.__proto__ = r;
    } || function(t, r) {
      for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
    }, o(n, e);
  };
  return function(n, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
    o(n, e);
    function t() {
      this.constructor = n;
    }
    n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
  };
}(), E = at && at.__assign || function() {
  return E = Object.assign || function(o) {
    for (var n, e = 1, t = arguments.length; e < t; e++) {
      n = arguments[e];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (o[r] = n[r]);
    }
    return o;
  }, E.apply(this, arguments);
};
Object.defineProperty(_t, "__esModule", { value: !0 });
_t.Joystick = void 0;
var H = pt, Yt = V, Bt = yt, Ce = mt, P;
(function(o) {
  o.PointerDown = "pointerdown", o.PointerMove = "pointermove", o.PointerUp = "pointerup";
})(P || (P = {}));
var j;
(function(o) {
  o[o.TopRight = 2.35619449] = "TopRight", o[o.TopLeft = -2.35619449] = "TopLeft", o[o.BottomRight = 0.785398163] = "BottomRight", o[o.BottomLeft = -0.785398163] = "BottomLeft";
})(j || (j = {}));
var xe = (
  /** @class */
  function(o) {
    ze(n, o);
    function n(e) {
      var t = o.call(this, e) || this;
      return t._stickRef = H.createRef(), t._baseRef = H.createRef(), t.frameId = null, t._pointerId = null, t._mounted = !1, t._pointerMove = function(r) {
        if (r.preventDefault(), t.state.dragging) {
          if (!t.props.followCursor && r.pointerId !== t._pointerId)
            return;
          var i = r.clientX, c = r.clientY, s = i - t._parentRect.left - t._radius, a = c - t._parentRect.top - t._radius, g = t._distance(s, a), v = (0, Ce.shapeBoundsFactory)(
            //@ts-ignore
            t.props.controlPlaneShape || t.props.baseShape,
            i,
            c,
            s,
            a,
            g,
            t._radius,
            t._baseSize,
            t._parentRect
          );
          s = v.relativeX, a = v.relativeY;
          var w = Math.atan2(s, a);
          t._updatePos({
            relativeX: s,
            relativeY: a,
            distance: t._distanceToPercentile(g),
            direction: t._getDirection(w),
            axisX: i - t._parentRect.left,
            axisY: c - t._parentRect.top
          });
        }
      }, t._pointerUp = function(r) {
        if (r.pointerId === t._pointerId) {
          var i = {
            dragging: !1
          };
          t.props.sticky || (i.coordinates = void 0), t.frameId = window.requestAnimationFrame(function() {
            t._mounted && t.setState(i);
          }), window.removeEventListener(P.PointerUp, t._pointerUp), window.removeEventListener(P.PointerMove, t._pointerMove), t._pointerId = null, t.props.stop && t.props.stop({
            type: "stop",
            // @ts-ignore
            x: t.props.sticky ? t.state.coordinates.relativeX * 2 / t._baseSize : null,
            // @ts-ignore
            y: t.props.sticky ? t.state.coordinates.relativeY * 2 / t._baseSize : null,
            // @ts-ignore
            direction: t.props.sticky ? t.state.coordinates.direction : null,
            // @ts-ignore
            distance: t.props.sticky ? t.state.coordinates.distance : null
          });
        }
      }, t.state = {
        dragging: !1
      }, t._throttleMoveCallback = /* @__PURE__ */ function() {
        var r = 0;
        return function(i) {
          var c = (/* @__PURE__ */ new Date()).getTime(), s = t.props.throttle || 0;
          if (!(c - r < s) && (r = c, t.props.move))
            return t.props.move(i);
        };
      }(), t;
    }
    return n.prototype.componentWillUnmount = function() {
      var e = this;
      this._mounted = !1, this.props.followCursor && window.removeEventListener(P.PointerMove, function(t) {
        return e._pointerMove(t);
      }), this.frameId !== null && window.cancelAnimationFrame(this.frameId);
    }, n.prototype.componentDidMount = function() {
      var e = this;
      this._mounted = !0, this.props.followCursor && (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(P.PointerMove, function(t) {
        return e._pointerMove(t);
      }), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, n.prototype._updatePos = function(e) {
      var t = this;
      this.frameId = window.requestAnimationFrame(function() {
        t._mounted && t.setState({
          coordinates: e
        });
      }), !(typeof this.props.minDistance == "number" && e.distance < this.props.minDistance) && this._throttleMoveCallback({
        type: "move",
        x: e.relativeX * 2 / this._baseSize,
        y: -(e.relativeY * 2 / this._baseSize),
        direction: e.direction,
        distance: e.distance
      });
    }, n.prototype._pointerDown = function(e) {
      this.props.disabled || this.props.followCursor || (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(P.PointerUp, this._pointerUp), window.addEventListener(P.PointerMove, this._pointerMove), this._pointerId = e.pointerId, this._stickRef.current.setPointerCapture(e.pointerId), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, n.prototype._getDirection = function(e) {
      return e > j.TopRight || e < j.TopLeft ? "FORWARD" : e < j.TopRight && e > j.BottomRight ? "RIGHT" : e < j.BottomLeft ? "LEFT" : "BACKWARD";
    }, n.prototype._distance = function(e, t) {
      return Math.hypot(e, t);
    }, n.prototype._distanceToPercentile = function(e) {
      var t = e / (this._baseSize / 2) * 100;
      return t > 100 ? 100 : t;
    }, n.prototype.getBaseShapeStyle = function() {
      var e = this.props.baseShape || Yt.JoystickShape.Circle;
      return (0, Bt.shapeFactory)(e, this._baseSize);
    }, n.prototype.getStickShapeStyle = function() {
      var e = this.props.stickShape || Yt.JoystickShape.Circle;
      return (0, Bt.shapeFactory)(e, this._baseSize);
    }, n.prototype._getBaseStyle = function() {
      var e = this.props.baseColor !== void 0 ? this.props.baseColor : "#000033", t = "".concat(this._baseSize, "px"), r = E(E({}, this.getBaseShapeStyle()), { height: t, width: t, background: e, display: "flex", justifyContent: "center", alignItems: "center" });
      return this.props.baseImage && (r.background = "url(".concat(this.props.baseImage, ")"), r.backgroundSize = "100%"), r;
    }, n.prototype._getStickStyle = function() {
      var e = this.props.stickColor !== void 0 ? this.props.stickColor : "#3D59AB", t = this._stickSize ? "".concat(this._stickSize, "px") : "".concat(this._baseSize / 1.5, "px"), r = E(E({}, this.getStickShapeStyle()), { background: e, cursor: "move", height: t, width: t, border: "none", flexShrink: 0, touchAction: "none" });
      return this.props.stickImage && (r.background = "url(".concat(this.props.stickImage, ")"), r.backgroundSize = "100%"), this.props.pos && (r = Object.assign({}, r, {
        position: "absolute",
        transform: "translate3d(".concat(this.props.pos.x * this._baseSize / 2, "px, ").concat(-(this.props.pos.y * this._baseSize) / 2, "px, 0)")
      })), this.state.coordinates !== void 0 && (r = Object.assign({}, r, {
        position: "absolute",
        transform: "translate3d(".concat(this.state.coordinates.relativeX, "px, ").concat(this.state.coordinates.relativeY, "px, 0)")
      })), r;
    }, n.prototype.render = function() {
      var e = this;
      this._baseSize = this.props.size || 100, this._stickSize = this.props.stickSize, this._radius = this._baseSize / 2;
      var t = this._getBaseStyle(), r = this._getStickStyle();
      return H.createElement(
        "div",
        { "data-testid": "joystick-base", className: this.props.disabled ? "joystick-base-disabled" : "", ref: this._baseRef, style: t },
        H.createElement("button", { ref: this._stickRef, disabled: this.props.disabled, onPointerDown: function(i) {
          return e._pointerDown(i);
        }, className: this.props.disabled ? "joystick-disabled" : "", style: r })
      );
    }, n;
  }(H.Component)
);
_t.Joystick = xe;
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.JoystickShape = o.Joystick = void 0;
  var n = _t;
  Object.defineProperty(o, "Joystick", { enumerable: !0, get: function() {
    return n.Joystick;
  } });
  var e = V;
  Object.defineProperty(o, "JoystickShape", { enumerable: !0, get: function() {
    return e.JoystickShape;
  } });
})(Ie);
var ct = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, je = {}, gt = {}, Z = {};
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.JoystickShape = void 0, function(n) {
    n.Circle = "circle", n.Square = "square", n.AxisY = "axisY", n.AxisX = "axisX";
  }(o.JoystickShape || (o.JoystickShape = {}));
})(Z);
var bt = {};
Object.defineProperty(bt, "__esModule", { value: !0 });
bt.shapeFactory = void 0;
var Xt = Z, Oe = function(o, n) {
  switch (o) {
    case Xt.JoystickShape.Square:
      return {
        borderRadius: Math.sqrt(n)
      };
    case Xt.JoystickShape.Circle:
    default:
      return {
        borderRadius: n
      };
  }
};
bt.shapeFactory = Oe;
var St = {};
Object.defineProperty(St, "__esModule", { value: !0 });
St.shapeBoundsFactory = void 0;
var At = Z, Je = function(o, n, e, t, r, i, c, s, a) {
  switch (o) {
    case At.JoystickShape.Square:
      return t = nt(n - a.left - s / 2, s), r = nt(e - a.top - s / 2, s), { relativeX: t, relativeY: r };
    case At.JoystickShape.AxisX:
      return t = nt(n - a.left - s / 2, s), r = 0, { relativeX: t, relativeY: r };
    case At.JoystickShape.AxisY:
      return t = 0, r = nt(e - a.top - s / 2, s), { relativeX: t, relativeY: r };
    default:
      return i > c && (t *= c / i, r *= c / i), { relativeX: t, relativeY: r };
  }
};
St.shapeBoundsFactory = Je;
var nt = function(o, n) {
  var e = n / 2;
  return o > e ? e : o < -e ? e * -1 : o;
}, Le = ct && ct.__extends || /* @__PURE__ */ function() {
  var o = function(n, e) {
    return o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
      t.__proto__ = r;
    } || function(t, r) {
      for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
    }, o(n, e);
  };
  return function(n, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
    o(n, e);
    function t() {
      this.constructor = n;
    }
    n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
  };
}(), D = ct && ct.__assign || function() {
  return D = Object.assign || function(o) {
    for (var n, e = 1, t = arguments.length; e < t; e++) {
      n = arguments[e];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (o[r] = n[r]);
    }
    return o;
  }, D.apply(this, arguments);
};
Object.defineProperty(gt, "__esModule", { value: !0 });
gt.Joystick = void 0;
var G = pt, qt = Z, Ut = bt, Te = St, A;
(function(o) {
  o.PointerDown = "pointerdown", o.PointerMove = "pointermove", o.PointerUp = "pointerup";
})(A || (A = {}));
var O;
(function(o) {
  o[o.TopRight = 2.35619449] = "TopRight", o[o.TopLeft = -2.35619449] = "TopLeft", o[o.BottomRight = 0.785398163] = "BottomRight", o[o.BottomLeft = -0.785398163] = "BottomLeft";
})(O || (O = {}));
var Fe = (
  /** @class */
  function(o) {
    Le(n, o);
    function n(e) {
      var t = o.call(this, e) || this;
      return t._stickRef = G.createRef(), t._baseRef = G.createRef(), t.frameId = null, t._pointerId = null, t._mounted = !1, t._pointerMove = function(r) {
        if (r.preventDefault(), t.state.dragging) {
          if (!t.props.followCursor && r.pointerId !== t._pointerId)
            return;
          var i = r.clientX, c = r.clientY, s = i - t._parentRect.left - t._radius, a = c - t._parentRect.top - t._radius, g = t._distance(s, a), v = (0, Te.shapeBoundsFactory)(
            //@ts-ignore
            t.props.controlPlaneShape || t.props.baseShape,
            i,
            c,
            s,
            a,
            g,
            t._radius,
            t._baseSize,
            t._parentRect
          );
          s = v.relativeX, a = v.relativeY;
          var w = Math.atan2(s, a);
          t._updatePos({
            relativeX: s,
            relativeY: a,
            distance: t._distanceToPercentile(g),
            direction: t._getDirection(w),
            axisX: i - t._parentRect.left,
            axisY: c - t._parentRect.top
          });
        }
      }, t._pointerUp = function(r) {
        if (r.pointerId === t._pointerId) {
          var i = {
            dragging: !1
          };
          t.props.sticky || (i.coordinates = void 0), t.frameId = window.requestAnimationFrame(function() {
            t._mounted && t.setState(i);
          }), window.removeEventListener(A.PointerUp, t._pointerUp), window.removeEventListener(A.PointerMove, t._pointerMove), t._pointerId = null, t.props.stop && t.props.stop({
            type: "stop",
            // @ts-ignore
            x: t.props.sticky ? t.state.coordinates.relativeX * 2 / t._baseSize : null,
            // @ts-ignore
            y: t.props.sticky ? t.state.coordinates.relativeY * 2 / t._baseSize : null,
            // @ts-ignore
            direction: t.props.sticky ? t.state.coordinates.direction : null,
            // @ts-ignore
            distance: t.props.sticky ? t.state.coordinates.distance : null
          });
        }
      }, t.state = {
        dragging: !1
      }, t._throttleMoveCallback = /* @__PURE__ */ function() {
        var r = 0;
        return function(i) {
          var c = (/* @__PURE__ */ new Date()).getTime(), s = t.props.throttle || 0;
          if (!(c - r < s) && (r = c, t.props.move))
            return t.props.move(i);
        };
      }(), t;
    }
    return n.prototype.componentWillUnmount = function() {
      var e = this;
      this._mounted = !1, this.props.followCursor && window.removeEventListener(A.PointerMove, function(t) {
        return e._pointerMove(t);
      }), this.frameId !== null && window.cancelAnimationFrame(this.frameId);
    }, n.prototype.componentDidMount = function() {
      var e = this;
      this._mounted = !0, this.props.followCursor && (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(A.PointerMove, function(t) {
        return e._pointerMove(t);
      }), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, n.prototype._updatePos = function(e) {
      var t = this;
      this.frameId = window.requestAnimationFrame(function() {
        t._mounted && t.setState({
          coordinates: e
        });
      }), !(typeof this.props.minDistance == "number" && e.distance < this.props.minDistance) && this._throttleMoveCallback({
        type: "move",
        x: e.relativeX * 2 / this._baseSize,
        y: -(e.relativeY * 2 / this._baseSize),
        direction: e.direction,
        distance: e.distance
      });
    }, n.prototype._pointerDown = function(e) {
      this.props.disabled || this.props.followCursor || (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(A.PointerUp, this._pointerUp), window.addEventListener(A.PointerMove, this._pointerMove), this._pointerId = e.pointerId, this._stickRef.current.setPointerCapture(e.pointerId), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, n.prototype._getDirection = function(e) {
      return e > O.TopRight || e < O.TopLeft ? "FORWARD" : e < O.TopRight && e > O.BottomRight ? "RIGHT" : e < O.BottomLeft ? "LEFT" : "BACKWARD";
    }, n.prototype._distance = function(e, t) {
      return Math.hypot(e, t);
    }, n.prototype._distanceToPercentile = function(e) {
      var t = e / (this._baseSize / 2) * 100;
      return t > 100 ? 100 : t;
    }, n.prototype.getBaseShapeStyle = function() {
      var e = this.props.baseShape || qt.JoystickShape.Circle;
      return (0, Ut.shapeFactory)(e, this._baseSize);
    }, n.prototype.getStickShapeStyle = function() {
      var e = this.props.stickShape || qt.JoystickShape.Circle;
      return (0, Ut.shapeFactory)(e, this._baseSize);
    }, n.prototype._getBaseStyle = function() {
      var e = this.props.baseColor !== void 0 ? this.props.baseColor : "#000033", t = "".concat(this._baseSize, "px"), r = D(D({}, this.getBaseShapeStyle()), { height: t, width: t, background: e, display: "flex", justifyContent: "center", alignItems: "center" });
      return this.props.baseImage && (r.background = "url(".concat(this.props.baseImage, ")"), r.backgroundSize = "100%"), r;
    }, n.prototype._getStickStyle = function() {
      var e = this.props.stickColor !== void 0 ? this.props.stickColor : "#3D59AB", t = this._stickSize ? "".concat(this._stickSize, "px") : "".concat(this._baseSize / 1.5, "px"), r = D(D({}, this.getStickShapeStyle()), { background: e, cursor: "move", height: t, width: t, border: "none", flexShrink: 0, touchAction: "none" });
      return this.props.stickImage && (r.background = "url(".concat(this.props.stickImage, ")"), r.backgroundSize = "100%"), this.props.pos && (r = Object.assign({}, r, {
        position: "absolute",
        transform: "translate3d(".concat(this.props.pos.x * this._baseSize / 2, "px, ").concat(-(this.props.pos.y * this._baseSize) / 2, "px, 0)")
      })), this.state.coordinates !== void 0 && (r = Object.assign({}, r, {
        position: "absolute",
        transform: "translate3d(".concat(this.state.coordinates.relativeX, "px, ").concat(this.state.coordinates.relativeY, "px, 0)")
      })), r;
    }, n.prototype.render = function() {
      var e = this;
      this._baseSize = this.props.size || 100, this._stickSize = this.props.stickSize, this._radius = this._baseSize / 2;
      var t = this._getBaseStyle(), r = this._getStickStyle();
      return G.createElement(
        "div",
        { "data-testid": "joystick-base", className: this.props.disabled ? "joystick-base-disabled" : "", ref: this._baseRef, style: t },
        G.createElement("button", { ref: this._stickRef, disabled: this.props.disabled, onPointerDown: function(i) {
          return e._pointerDown(i);
        }, className: this.props.disabled ? "joystick-disabled" : "", style: r })
      );
    }, n;
  }(G.Component)
);
gt.Joystick = Fe;
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.JoystickShape = o.Joystick = void 0;
  var n = gt;
  Object.defineProperty(o, "Joystick", { enumerable: !0, get: function() {
    return n.Joystick;
  } });
  var e = Z;
  Object.defineProperty(o, "JoystickShape", { enumerable: !0, get: function() {
    return e.JoystickShape;
  } });
})(je);
function Be() {
  return /* @__PURE__ */ m(Wt, { children: /* @__PURE__ */ m(ge, {}) });
}
export {
  Be as default
};
