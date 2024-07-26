import { jsx as m, jsxs as Vt, Fragment as me } from "react/jsx-runtime";
import H, { useEffect as rt, useRef as w, useState as j, useMemo as Pe } from "react";
const Ie = "/snake_sprite/snake-graphics.png", xe = "/snake_sprite/snake-graphics_achromatopsia.png", ze = "/snake_sprite/snake-graphics_deuteranopia.png", je = "/snake_sprite/snake-graphics_protanopia.png", Oe = "/snake_sprite/snake-graphics_tritanopia.png", te = {
  normal: Ie,
  achromatopsia: xe,
  deuteranopia: ze,
  protanopia: je,
  tritanopia: Oe
};
function $({ src: r, alt: i, hidden: e, onLoad: t }) {
  return rt(() => {
    const o = new Image();
    return o.src = r, o.onload = () => {
      t();
    }, () => {
      o.onload = null;
    };
  }, [r]), /* @__PURE__ */ m("img", { src: r, alt: i, hidden: e });
}
var gt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, be = {}, Rt = {}, it = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = void 0, function(i) {
    i.Circle = "circle", i.Square = "square", i.AxisY = "axisY", i.AxisX = "axisX";
  }(r.JoystickShape || (r.JoystickShape = {}));
})(it);
var Mt = {};
Object.defineProperty(Mt, "__esModule", { value: !0 });
Mt.shapeFactory = void 0;
var ee = it, Je = function(r, i) {
  switch (r) {
    case ee.JoystickShape.Square:
      return {
        borderRadius: Math.sqrt(i)
      };
    case ee.JoystickShape.Circle:
    default:
      return {
        borderRadius: i
      };
  }
};
Mt.shapeFactory = Je;
var Ct = {};
Object.defineProperty(Ct, "__esModule", { value: !0 });
Ct.shapeBoundsFactory = void 0;
var Ut = it, Be = function(r, i, e, t, o, n, p, s, a) {
  switch (r) {
    case Ut.JoystickShape.Square:
      return t = dt(i - a.left - s / 2, s), o = dt(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    case Ut.JoystickShape.AxisX:
      return t = dt(i - a.left - s / 2, s), o = 0, { relativeX: t, relativeY: o };
    case Ut.JoystickShape.AxisY:
      return t = 0, o = dt(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    default:
      return n > p && (t *= p / n, o *= p / n), { relativeX: t, relativeY: o };
  }
};
Ct.shapeBoundsFactory = Be;
var dt = function(r, i) {
  var e = i / 2;
  return r > e ? e : r < -e ? e * -1 : r;
}, De = gt && gt.__extends || /* @__PURE__ */ function() {
  var r = function(i, e) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, o) {
      t.__proto__ = o;
    } || function(t, o) {
      for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n]);
    }, r(i, e);
  };
  return function(i, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
    r(i, e);
    function t() {
      this.constructor = i;
    }
    i.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
  };
}(), Y = gt && gt.__assign || function() {
  return Y = Object.assign || function(r) {
    for (var i, e = 1, t = arguments.length; e < t; e++) {
      i = arguments[e];
      for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (r[o] = i[o]);
    }
    return r;
  }, Y.apply(this, arguments);
};
Object.defineProperty(Rt, "__esModule", { value: !0 });
Rt.Joystick = void 0;
var V = H, oe = it, re = Mt, Le = Ct, M;
(function(r) {
  r.PointerDown = "pointerdown", r.PointerMove = "pointermove", r.PointerUp = "pointerup";
})(M || (M = {}));
var O;
(function(r) {
  r[r.TopRight = 2.35619449] = "TopRight", r[r.TopLeft = -2.35619449] = "TopLeft", r[r.BottomRight = 0.785398163] = "BottomRight", r[r.BottomLeft = -0.785398163] = "BottomLeft";
})(O || (O = {}));
var Te = (
  /** @class */
  function(r) {
    De(i, r);
    function i(e) {
      var t = r.call(this, e) || this;
      return t._stickRef = V.createRef(), t._baseRef = V.createRef(), t.frameId = null, t._pointerId = null, t._mounted = !1, t._pointerMove = function(o) {
        if (o.preventDefault(), t.state.dragging) {
          if (!t.props.followCursor && o.pointerId !== t._pointerId)
            return;
          var n = o.clientX, p = o.clientY, s = n - t._parentRect.left - t._radius, a = p - t._parentRect.top - t._radius, f = t._distance(s, a), h = (0, Le.shapeBoundsFactory)(
            //@ts-ignore
            t.props.controlPlaneShape || t.props.baseShape,
            n,
            p,
            s,
            a,
            f,
            t._radius,
            t._baseSize,
            t._parentRect
          );
          s = h.relativeX, a = h.relativeY;
          var k = Math.atan2(s, a);
          t._updatePos({
            relativeX: s,
            relativeY: a,
            distance: t._distanceToPercentile(f),
            direction: t._getDirection(k),
            axisX: n - t._parentRect.left,
            axisY: p - t._parentRect.top
          });
        }
      }, t._pointerUp = function(o) {
        if (o.pointerId === t._pointerId) {
          var n = {
            dragging: !1
          };
          t.props.sticky || (n.coordinates = void 0), t.frameId = window.requestAnimationFrame(function() {
            t._mounted && t.setState(n);
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
        var o = 0;
        return function(n) {
          var p = (/* @__PURE__ */ new Date()).getTime(), s = t.props.throttle || 0;
          if (!(p - o < s) && (o = p, t.props.move))
            return t.props.move(n);
        };
      }(), t;
    }
    return i.prototype.componentWillUnmount = function() {
      var e = this;
      this._mounted = !1, this.props.followCursor && window.removeEventListener(M.PointerMove, function(t) {
        return e._pointerMove(t);
      }), this.frameId !== null && window.cancelAnimationFrame(this.frameId);
    }, i.prototype.componentDidMount = function() {
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
    }, i.prototype._updatePos = function(e) {
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
    }, i.prototype._pointerDown = function(e) {
      this.props.disabled || this.props.followCursor || (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(M.PointerUp, this._pointerUp), window.addEventListener(M.PointerMove, this._pointerMove), this._pointerId = e.pointerId, this._stickRef.current.setPointerCapture(e.pointerId), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, i.prototype._getDirection = function(e) {
      return e > O.TopRight || e < O.TopLeft ? "FORWARD" : e < O.TopRight && e > O.BottomRight ? "RIGHT" : e < O.BottomLeft ? "LEFT" : "BACKWARD";
    }, i.prototype._distance = function(e, t) {
      return Math.hypot(e, t);
    }, i.prototype._distanceToPercentile = function(e) {
      var t = e / (this._baseSize / 2) * 100;
      return t > 100 ? 100 : t;
    }, i.prototype.getBaseShapeStyle = function() {
      var e = this.props.baseShape || oe.JoystickShape.Circle;
      return (0, re.shapeFactory)(e, this._baseSize);
    }, i.prototype.getStickShapeStyle = function() {
      var e = this.props.stickShape || oe.JoystickShape.Circle;
      return (0, re.shapeFactory)(e, this._baseSize);
    }, i.prototype._getBaseStyle = function() {
      var e = this.props.baseColor !== void 0 ? this.props.baseColor : "#000033", t = "".concat(this._baseSize, "px"), o = Y(Y({}, this.getBaseShapeStyle()), { height: t, width: t, background: e, display: "flex", justifyContent: "center", alignItems: "center" });
      return this.props.baseImage && (o.background = "url(".concat(this.props.baseImage, ")"), o.backgroundSize = "100%"), o;
    }, i.prototype._getStickStyle = function() {
      var e = this.props.stickColor !== void 0 ? this.props.stickColor : "#3D59AB", t = this._stickSize ? "".concat(this._stickSize, "px") : "".concat(this._baseSize / 1.5, "px"), o = Y(Y({}, this.getStickShapeStyle()), { background: e, cursor: "move", height: t, width: t, border: "none", flexShrink: 0, touchAction: "none" });
      return this.props.stickImage && (o.background = "url(".concat(this.props.stickImage, ")"), o.backgroundSize = "100%"), this.props.pos && (o = Object.assign({}, o, {
        position: "absolute",
        transform: "translate3d(".concat(this.props.pos.x * this._baseSize / 2, "px, ").concat(-(this.props.pos.y * this._baseSize) / 2, "px, 0)")
      })), this.state.coordinates !== void 0 && (o = Object.assign({}, o, {
        position: "absolute",
        transform: "translate3d(".concat(this.state.coordinates.relativeX, "px, ").concat(this.state.coordinates.relativeY, "px, 0)")
      })), o;
    }, i.prototype.render = function() {
      var e = this;
      this._baseSize = this.props.size || 100, this._stickSize = this.props.stickSize, this._radius = this._baseSize / 2;
      var t = this._getBaseStyle(), o = this._getStickStyle();
      return V.createElement(
        "div",
        { "data-testid": "joystick-base", className: this.props.disabled ? "joystick-base-disabled" : "", ref: this._baseRef, style: t },
        V.createElement("button", { ref: this._stickRef, disabled: this.props.disabled, onPointerDown: function(n) {
          return e._pointerDown(n);
        }, className: this.props.disabled ? "joystick-disabled" : "", style: o })
      );
    }, i;
  }(V.Component)
);
Rt.Joystick = Te;
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = r.Joystick = void 0;
  var i = Rt;
  Object.defineProperty(r, "Joystick", { enumerable: !0, get: function() {
    return i.Joystick;
  } });
  var e = it;
  Object.defineProperty(r, "JoystickShape", { enumerable: !0, get: function() {
    return e.JoystickShape;
  } });
})(be);
const Ae = ({ onDirectionChange: r }) => {
  const i = {
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
  }, e = 60, t = w(null), o = w(), n = w(0), p = (a) => {
    t.current = a.direction;
  }, s = () => {
    t.current = null;
  };
  return rt(() => {
    let a;
    const f = (h) => {
      h - n.current >= e && (t.current != null && r(t.current), n.current = h), a = window.requestAnimationFrame(f);
    };
    return f(), () => {
      window.cancelAnimationFrame(a);
    };
  }, []), /* @__PURE__ */ m("div", { style: i, children: /* @__PURE__ */ m(be.Joystick, { ref: o, minDistance: 50, move: p, stop: s }) });
}, Fe = (r, i, e) => {
  const t = r[i];
  return t ? typeof t == "function" ? t() : Promise.resolve(t) : new Promise((o, n) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(
      n.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + i + (i.split("/").length !== e ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
}, Ye = "_snakeGame_2cqgw_5", Ee = "_snakeCanvas_2cqgw_15", Xe = "_mapCanvas_2cqgw_23", Wt = {
  snakeGame: Ye,
  snakeCanvas: Ee,
  mapCanvas: Xe
}, qe = "_loadingDiv_dcsfs_1", Ue = {
  loadingDiv: qe
}, We = () => /* @__PURE__ */ m("div", { className: Ue.loadingDiv, children: /* @__PURE__ */ m("h1", { children: "Loading..." }) }), He = ({ mapImporterName: r, nextMap: i, addScore: e }) => {
  const [t, o] = j(""), n = w(), p = w(), s = w(), a = w("right"), f = w(), h = w(), k = w(), [A, Se] = j("normal"), [Xt, Zt] = j(!1), F = w(), N = w(), [ke, we] = j(!1), [d, Mo] = j(30), G = Re(5, () => {
    console.log(Xt), Zt(!0), console.log("loaded");
  });
  function Re(v, l) {
    let _ = 0;
    return function(...c) {
      _ = _ + 1, v === _ && l(...c);
    };
  }
  const K = Pe(() => ({
    normal: A !== "normal",
    achromatopsia: A !== "achromatopsia",
    deuteranopia: A !== "deuteranopia",
    protanopia: A !== "protanopia",
    tritanopia: A !== "tritanopia"
  }), [A]), qt = (v) => {
    if (typeof v == "object") {
      const l = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down"
      };
      if (l[v.key] == "right" && a.current != "left")
        a.current = "right";
      else if (l[v.key] == "left" && a.current != "right")
        a.current = "left";
      else if (l[v.key] == "up" && a.current != "down")
        a.current = "up";
      else if (l[v.key] == "down" && a.current != "up")
        a.current = "down";
      else if (v.key == "m")
        e(), console.log(e);
      else {
        console.log(v.key);
        return;
      }
    } else if (v == "RIGHT" && a.current != "left")
      a.current = "right";
    else if (v == "LEFT" && a.current != "right")
      a.current = "left";
    else if (v == "FORWARD" && a.current != "down")
      a.current = "up";
    else if (v == "BACKWARD" && a.current != "up")
      a.current = "down";
    else
      return;
    Ce();
  }, Me = () => {
    const v = {
      right: [1, 0],
      left: [-1, 0],
      up: [0, -1],
      down: [0, 1]
    };
    n.current.unshift(
      [
        n.current[0][0] + v[a.current][0] * d,
        n.current[0][1] + v[a.current][1] * d
      ]
    ), n.current[0][0] < 0 ? n.current[0][0] = window.innerWidth : n.current[0][0] > window.innerWidth && (n.current[0][0] = 0);
    const l = s.current;
    Math.abs(n.current[0][0] - l[0]) < d && Math.abs(n.current[0][1] + scrollY - l[1]) < d && (console.log("==========================tunnel"), i());
    const _ = p.current;
    let c = !1;
    for (let u = 0; u < _.length; u++) {
      const [R, y] = _[u];
      if (Math.abs(n.current[0][0] - y[0]) < d * 0.75 && Math.abs(n.current[0][1] + scrollY - y[1]) < d * 0.75) {
        console.log("==========================eaten"), e(), c = !0, p.current.splice(u, 1), lt();
        const g = new Image();
        g.src = te[R], h.current = g, Se(R), u--;
      }
    }
    c || n.current.pop(), console.log(window.innerHeight + window.scrollY, F.current.offsetHeight), a.current == "down" ? (window.innerHeight + window.scrollY < F.current.offsetHeight - d && n.current.forEach((u) => u[1] -= d), scrollBy(0, d + 1)) : a.current == "up" && (window.scrollY > 0 && n.current.forEach((u) => u[1] += d), scrollBy(0, -d + 1));
  }, ut = () => {
    const l = f.current.getContext("2d");
    l.clearRect(0, 0, l.canvas.width, l.canvas.height);
    for (var _ = 0; _ < n.current.length; _++) {
      var c = 0, u = 0, R = n.current[_], y = R[0], g = R[1];
      if (_ == 0) {
        var b = n.current[_ + 1];
        g < b[1] ? (c = 3, u = 0) : y > b[0] ? (c = 4, u = 0) : g > b[1] ? (c = 4, u = 1) : y < b[0] && (c = 3, u = 1);
      } else if (_ == n.current.length - 1) {
        var S = n.current[_ - 1];
        S[1] < g ? (c = 3, u = 2) : S[0] > y ? (c = 4, u = 2) : S[1] > g ? (c = 4, u = 3) : S[0] < y && (c = 3, u = 3);
      } else {
        var S = n.current[_ - 1], b = n.current[_ + 1];
        S[0] < y && b[0] > y || b[0] < y && S[0] > y ? (c = 1, u = 0) : S[0] < y && b[1] > g || b[0] < y && S[1] > g ? (c = 2, u = 0) : S[1] < g && b[1] > g || b[1] < g && S[1] > g ? (c = 2, u = 1) : S[1] < g && b[0] < y || b[1] < g && S[0] < y ? (c = 2, u = 2) : S[0] > y && b[1] < g || b[0] > y && S[1] < g ? (c = 0, u = 1) : S[1] > g && b[0] > y || b[1] > g && S[0] > y ? (c = 0, u = 0) : (c = 1, u = 0);
      }
      var Qt = [0, 0];
      l.drawImage(N.current, c * 64, u * 64, 64, 64, n.current[_][0] + Qt[0], n.current[_][1] + Qt[1], d, d);
    }
  }, lt = () => {
    const l = k.current.getContext("2d");
    l.clearRect(0, 0, l.canvas.width, l.canvas.height), l.textAlign = "center", l.font = "20px Georgia", l.fillStyle = "white", p.current.forEach(([_, c]) => {
      l.drawImage(N.current, 0 * 64, 3 * 64, 64, 64, c[0], c[1], d, d), l.fillText(_, c[0] + d / 2, c[1] + d);
    }), l.drawImage(N.current, 1 * 64, 3 * 64, 64, 64, s.current[0], s.current[1], d * 2, d * 2), l.fillText("Next Map", s.current[0] + d, s.current[1] + 64);
  }, Ce = () => {
    console.log("gameLoop"), Me(), ut();
  };
  return rt(() => {
    Zt(!1);
  }, [r]), rt(() => {
    console.log("setup"), (async () => {
      try {
        const c = await Fe(/* @__PURE__ */ Object.assign({ "../image_importers/desertImages.js": () => import("./desertImages-CIneN81N.js"), "../image_importers/forestImages.js": () => import("./forestImages-My2q2rGl.js"), "../image_importers/mapImages.js": () => import("./mapImages-BClUnFAK.js") }), `../image_importers/${r}.js`, 3);
        o(c.default);
      } catch {
        console.error("Failed to dynamically load component");
      }
    })(), p.current = [
      ["protanopia", [0.3, 0.3]],
      ["achromatopsia", [0.4, 0.35]],
      ["deuteranopia", [0.4, 0.45]],
      ["tritanopia", [0.4, 0.55]],
      ["normal", [0.4, 0.65]]
    ], p.current.forEach((c) => {
      c[1][0] *= F.current.offsetWidth, c[1][1] *= F.current.offsetHeight;
    }), n.current = [
      [Math.round(window.innerWidth / 2), Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - d, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - d * 2, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - d * 3, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - d * 4, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - d * 5, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - d * 6, Math.round(window.innerHeight / 2)]
    ];
    const l = new Image();
    l.src = te.normal, h.current = l, s.current = [
      Math.floor(Math.random() * (document.documentElement.offsetWidth - 64 * 2 - 64 * 2 + 1)) + 64 * 2,
      Math.ceil(document.documentElement.offsetHeight * 0.9)
    ];
    const _ = () => {
      const c = f.current, u = k.current, R = F.current;
      c.width = Math.min(window.innerWidth, 1920), c.height = window.innerHeight, u.width = R.offsetWidth, u.height = R.offsetHeight, we(window.innerWidth <= 768), ut(), lt();
    };
    return _(), ut(), lt(), window.addEventListener("resize", _), window.addEventListener("keydown", qt), () => {
      window.removeEventListener("resize", _), window.removeEventListener("keydown", qt);
    };
  }, [Xt, r]), rt(() => {
    console.log("snakesprite");
    const v = N.current;
    v.src = h.current.src, v.onload = () => {
      lt(), ut();
    };
  }, [h.current]), /* @__PURE__ */ Vt("div", { ref: F, className: Wt.snakeGame, children: [
    !Xt && /* @__PURE__ */ m(We, {}),
    /* @__PURE__ */ m("img", { src: "", hidden: !0, style: { position: "fixed" }, ref: N }),
    /* @__PURE__ */ m("canvas", { className: Wt.mapCanvas, ref: k }),
    /* @__PURE__ */ m("canvas", { className: Wt.snakeCanvas, ref: f }),
    t && /* @__PURE__ */ Vt(me, { children: [
      /* @__PURE__ */ m($, { src: t.normal, hidden: K.normal, alt: "normal", onLoad: G }),
      /* @__PURE__ */ m($, { src: t.achromatopsia, hidden: K.achromatopsia, alt: "achromatopsia", onLoad: G }),
      /* @__PURE__ */ m($, { src: t.deuteranopia, hidden: K.deuteranopia, alt: "deuteranopia", onLoad: G }),
      /* @__PURE__ */ m($, { src: t.protanopia, hidden: K.protanopia, alt: "protanopia", onLoad: G }),
      /* @__PURE__ */ m($, { src: t.tritanopia, hidden: K.tritanopia, alt: "tritanopia", onLoad: G })
    ] }),
    ke && /* @__PURE__ */ m(Ae, { onDirectionChange: qt })
  ] });
}, Ne = () => {
  const [r, i] = j(0), [e, t] = j(0);
  return console.log(e), /* @__PURE__ */ Vt("div", { children: [
    /* @__PURE__ */ m("span", { style: { position: "fixed", zIndex: 999, top: 0, backgroundColor: "white" }, children: e }),
    /* @__PURE__ */ m(He, { mapImporterName: {
      0: "forestImages",
      1: "desertImages"
    }[r], nextMap: () => i(r + 1), addScore: () => t((n) => n + 1) })
  ] });
};
var mt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ge = {}, Pt = {}, nt = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = void 0, function(i) {
    i.Circle = "circle", i.Square = "square", i.AxisY = "axisY", i.AxisX = "axisX";
  }(r.JoystickShape || (r.JoystickShape = {}));
})(nt);
var It = {};
Object.defineProperty(It, "__esModule", { value: !0 });
It.shapeFactory = void 0;
var ie = nt, Ke = function(r, i) {
  switch (r) {
    case ie.JoystickShape.Square:
      return {
        borderRadius: Math.sqrt(i)
      };
    case ie.JoystickShape.Circle:
    default:
      return {
        borderRadius: i
      };
  }
};
It.shapeFactory = Ke;
var xt = {};
Object.defineProperty(xt, "__esModule", { value: !0 });
xt.shapeBoundsFactory = void 0;
var Ht = nt, $e = function(r, i, e, t, o, n, p, s, a) {
  switch (r) {
    case Ht.JoystickShape.Square:
      return t = ht(i - a.left - s / 2, s), o = ht(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    case Ht.JoystickShape.AxisX:
      return t = ht(i - a.left - s / 2, s), o = 0, { relativeX: t, relativeY: o };
    case Ht.JoystickShape.AxisY:
      return t = 0, o = ht(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    default:
      return n > p && (t *= p / n, o *= p / n), { relativeX: t, relativeY: o };
  }
};
xt.shapeBoundsFactory = $e;
var ht = function(r, i) {
  var e = i / 2;
  return r > e ? e : r < -e ? e * -1 : r;
}, Ve = mt && mt.__extends || /* @__PURE__ */ function() {
  var r = function(i, e) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, o) {
      t.__proto__ = o;
    } || function(t, o) {
      for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n]);
    }, r(i, e);
  };
  return function(i, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
    r(i, e);
    function t() {
      this.constructor = i;
    }
    i.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
  };
}(), E = mt && mt.__assign || function() {
  return E = Object.assign || function(r) {
    for (var i, e = 1, t = arguments.length; e < t; e++) {
      i = arguments[e];
      for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (r[o] = i[o]);
    }
    return r;
  }, E.apply(this, arguments);
};
Object.defineProperty(Pt, "__esModule", { value: !0 });
Pt.Joystick = void 0;
var Z = H, ne = nt, se = It, Ze = xt, C;
(function(r) {
  r.PointerDown = "pointerdown", r.PointerMove = "pointermove", r.PointerUp = "pointerup";
})(C || (C = {}));
var J;
(function(r) {
  r[r.TopRight = 2.35619449] = "TopRight", r[r.TopLeft = -2.35619449] = "TopLeft", r[r.BottomRight = 0.785398163] = "BottomRight", r[r.BottomLeft = -0.785398163] = "BottomLeft";
})(J || (J = {}));
var Qe = (
  /** @class */
  function(r) {
    Ve(i, r);
    function i(e) {
      var t = r.call(this, e) || this;
      return t._stickRef = Z.createRef(), t._baseRef = Z.createRef(), t.frameId = null, t._pointerId = null, t._mounted = !1, t._pointerMove = function(o) {
        if (o.preventDefault(), t.state.dragging) {
          if (!t.props.followCursor && o.pointerId !== t._pointerId)
            return;
          var n = o.clientX, p = o.clientY, s = n - t._parentRect.left - t._radius, a = p - t._parentRect.top - t._radius, f = t._distance(s, a), h = (0, Ze.shapeBoundsFactory)(
            //@ts-ignore
            t.props.controlPlaneShape || t.props.baseShape,
            n,
            p,
            s,
            a,
            f,
            t._radius,
            t._baseSize,
            t._parentRect
          );
          s = h.relativeX, a = h.relativeY;
          var k = Math.atan2(s, a);
          t._updatePos({
            relativeX: s,
            relativeY: a,
            distance: t._distanceToPercentile(f),
            direction: t._getDirection(k),
            axisX: n - t._parentRect.left,
            axisY: p - t._parentRect.top
          });
        }
      }, t._pointerUp = function(o) {
        if (o.pointerId === t._pointerId) {
          var n = {
            dragging: !1
          };
          t.props.sticky || (n.coordinates = void 0), t.frameId = window.requestAnimationFrame(function() {
            t._mounted && t.setState(n);
          }), window.removeEventListener(C.PointerUp, t._pointerUp), window.removeEventListener(C.PointerMove, t._pointerMove), t._pointerId = null, t.props.stop && t.props.stop({
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
        var o = 0;
        return function(n) {
          var p = (/* @__PURE__ */ new Date()).getTime(), s = t.props.throttle || 0;
          if (!(p - o < s) && (o = p, t.props.move))
            return t.props.move(n);
        };
      }(), t;
    }
    return i.prototype.componentWillUnmount = function() {
      var e = this;
      this._mounted = !1, this.props.followCursor && window.removeEventListener(C.PointerMove, function(t) {
        return e._pointerMove(t);
      }), this.frameId !== null && window.cancelAnimationFrame(this.frameId);
    }, i.prototype.componentDidMount = function() {
      var e = this;
      this._mounted = !0, this.props.followCursor && (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(C.PointerMove, function(t) {
        return e._pointerMove(t);
      }), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, i.prototype._updatePos = function(e) {
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
    }, i.prototype._pointerDown = function(e) {
      this.props.disabled || this.props.followCursor || (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(C.PointerUp, this._pointerUp), window.addEventListener(C.PointerMove, this._pointerMove), this._pointerId = e.pointerId, this._stickRef.current.setPointerCapture(e.pointerId), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, i.prototype._getDirection = function(e) {
      return e > J.TopRight || e < J.TopLeft ? "FORWARD" : e < J.TopRight && e > J.BottomRight ? "RIGHT" : e < J.BottomLeft ? "LEFT" : "BACKWARD";
    }, i.prototype._distance = function(e, t) {
      return Math.hypot(e, t);
    }, i.prototype._distanceToPercentile = function(e) {
      var t = e / (this._baseSize / 2) * 100;
      return t > 100 ? 100 : t;
    }, i.prototype.getBaseShapeStyle = function() {
      var e = this.props.baseShape || ne.JoystickShape.Circle;
      return (0, se.shapeFactory)(e, this._baseSize);
    }, i.prototype.getStickShapeStyle = function() {
      var e = this.props.stickShape || ne.JoystickShape.Circle;
      return (0, se.shapeFactory)(e, this._baseSize);
    }, i.prototype._getBaseStyle = function() {
      var e = this.props.baseColor !== void 0 ? this.props.baseColor : "#000033", t = "".concat(this._baseSize, "px"), o = E(E({}, this.getBaseShapeStyle()), { height: t, width: t, background: e, display: "flex", justifyContent: "center", alignItems: "center" });
      return this.props.baseImage && (o.background = "url(".concat(this.props.baseImage, ")"), o.backgroundSize = "100%"), o;
    }, i.prototype._getStickStyle = function() {
      var e = this.props.stickColor !== void 0 ? this.props.stickColor : "#3D59AB", t = this._stickSize ? "".concat(this._stickSize, "px") : "".concat(this._baseSize / 1.5, "px"), o = E(E({}, this.getStickShapeStyle()), { background: e, cursor: "move", height: t, width: t, border: "none", flexShrink: 0, touchAction: "none" });
      return this.props.stickImage && (o.background = "url(".concat(this.props.stickImage, ")"), o.backgroundSize = "100%"), this.props.pos && (o = Object.assign({}, o, {
        position: "absolute",
        transform: "translate3d(".concat(this.props.pos.x * this._baseSize / 2, "px, ").concat(-(this.props.pos.y * this._baseSize) / 2, "px, 0)")
      })), this.state.coordinates !== void 0 && (o = Object.assign({}, o, {
        position: "absolute",
        transform: "translate3d(".concat(this.state.coordinates.relativeX, "px, ").concat(this.state.coordinates.relativeY, "px, 0)")
      })), o;
    }, i.prototype.render = function() {
      var e = this;
      this._baseSize = this.props.size || 100, this._stickSize = this.props.stickSize, this._radius = this._baseSize / 2;
      var t = this._getBaseStyle(), o = this._getStickStyle();
      return Z.createElement(
        "div",
        { "data-testid": "joystick-base", className: this.props.disabled ? "joystick-base-disabled" : "", ref: this._baseRef, style: t },
        Z.createElement("button", { ref: this._stickRef, disabled: this.props.disabled, onPointerDown: function(n) {
          return e._pointerDown(n);
        }, className: this.props.disabled ? "joystick-disabled" : "", style: o })
      );
    }, i;
  }(Z.Component)
);
Pt.Joystick = Qe;
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = r.Joystick = void 0;
  var i = Pt;
  Object.defineProperty(r, "Joystick", { enumerable: !0, get: function() {
    return i.Joystick;
  } });
  var e = nt;
  Object.defineProperty(r, "JoystickShape", { enumerable: !0, get: function() {
    return e.JoystickShape;
  } });
})(Ge);
var bt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, to = {}, zt = {}, st = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = void 0, function(i) {
    i.Circle = "circle", i.Square = "square", i.AxisY = "axisY", i.AxisX = "axisX";
  }(r.JoystickShape || (r.JoystickShape = {}));
})(st);
var jt = {};
Object.defineProperty(jt, "__esModule", { value: !0 });
jt.shapeFactory = void 0;
var ae = st, eo = function(r, i) {
  switch (r) {
    case ae.JoystickShape.Square:
      return {
        borderRadius: Math.sqrt(i)
      };
    case ae.JoystickShape.Circle:
    default:
      return {
        borderRadius: i
      };
  }
};
jt.shapeFactory = eo;
var Ot = {};
Object.defineProperty(Ot, "__esModule", { value: !0 });
Ot.shapeBoundsFactory = void 0;
var Nt = st, oo = function(r, i, e, t, o, n, p, s, a) {
  switch (r) {
    case Nt.JoystickShape.Square:
      return t = ft(i - a.left - s / 2, s), o = ft(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    case Nt.JoystickShape.AxisX:
      return t = ft(i - a.left - s / 2, s), o = 0, { relativeX: t, relativeY: o };
    case Nt.JoystickShape.AxisY:
      return t = 0, o = ft(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    default:
      return n > p && (t *= p / n, o *= p / n), { relativeX: t, relativeY: o };
  }
};
Ot.shapeBoundsFactory = oo;
var ft = function(r, i) {
  var e = i / 2;
  return r > e ? e : r < -e ? e * -1 : r;
}, ro = bt && bt.__extends || /* @__PURE__ */ function() {
  var r = function(i, e) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, o) {
      t.__proto__ = o;
    } || function(t, o) {
      for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n]);
    }, r(i, e);
  };
  return function(i, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
    r(i, e);
    function t() {
      this.constructor = i;
    }
    i.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
  };
}(), X = bt && bt.__assign || function() {
  return X = Object.assign || function(r) {
    for (var i, e = 1, t = arguments.length; e < t; e++) {
      i = arguments[e];
      for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (r[o] = i[o]);
    }
    return r;
  }, X.apply(this, arguments);
};
Object.defineProperty(zt, "__esModule", { value: !0 });
zt.Joystick = void 0;
var Q = H, pe = st, ce = jt, io = Ot, P;
(function(r) {
  r.PointerDown = "pointerdown", r.PointerMove = "pointermove", r.PointerUp = "pointerup";
})(P || (P = {}));
var B;
(function(r) {
  r[r.TopRight = 2.35619449] = "TopRight", r[r.TopLeft = -2.35619449] = "TopLeft", r[r.BottomRight = 0.785398163] = "BottomRight", r[r.BottomLeft = -0.785398163] = "BottomLeft";
})(B || (B = {}));
var no = (
  /** @class */
  function(r) {
    ro(i, r);
    function i(e) {
      var t = r.call(this, e) || this;
      return t._stickRef = Q.createRef(), t._baseRef = Q.createRef(), t.frameId = null, t._pointerId = null, t._mounted = !1, t._pointerMove = function(o) {
        if (o.preventDefault(), t.state.dragging) {
          if (!t.props.followCursor && o.pointerId !== t._pointerId)
            return;
          var n = o.clientX, p = o.clientY, s = n - t._parentRect.left - t._radius, a = p - t._parentRect.top - t._radius, f = t._distance(s, a), h = (0, io.shapeBoundsFactory)(
            //@ts-ignore
            t.props.controlPlaneShape || t.props.baseShape,
            n,
            p,
            s,
            a,
            f,
            t._radius,
            t._baseSize,
            t._parentRect
          );
          s = h.relativeX, a = h.relativeY;
          var k = Math.atan2(s, a);
          t._updatePos({
            relativeX: s,
            relativeY: a,
            distance: t._distanceToPercentile(f),
            direction: t._getDirection(k),
            axisX: n - t._parentRect.left,
            axisY: p - t._parentRect.top
          });
        }
      }, t._pointerUp = function(o) {
        if (o.pointerId === t._pointerId) {
          var n = {
            dragging: !1
          };
          t.props.sticky || (n.coordinates = void 0), t.frameId = window.requestAnimationFrame(function() {
            t._mounted && t.setState(n);
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
        var o = 0;
        return function(n) {
          var p = (/* @__PURE__ */ new Date()).getTime(), s = t.props.throttle || 0;
          if (!(p - o < s) && (o = p, t.props.move))
            return t.props.move(n);
        };
      }(), t;
    }
    return i.prototype.componentWillUnmount = function() {
      var e = this;
      this._mounted = !1, this.props.followCursor && window.removeEventListener(P.PointerMove, function(t) {
        return e._pointerMove(t);
      }), this.frameId !== null && window.cancelAnimationFrame(this.frameId);
    }, i.prototype.componentDidMount = function() {
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
    }, i.prototype._updatePos = function(e) {
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
    }, i.prototype._pointerDown = function(e) {
      this.props.disabled || this.props.followCursor || (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(P.PointerUp, this._pointerUp), window.addEventListener(P.PointerMove, this._pointerMove), this._pointerId = e.pointerId, this._stickRef.current.setPointerCapture(e.pointerId), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, i.prototype._getDirection = function(e) {
      return e > B.TopRight || e < B.TopLeft ? "FORWARD" : e < B.TopRight && e > B.BottomRight ? "RIGHT" : e < B.BottomLeft ? "LEFT" : "BACKWARD";
    }, i.prototype._distance = function(e, t) {
      return Math.hypot(e, t);
    }, i.prototype._distanceToPercentile = function(e) {
      var t = e / (this._baseSize / 2) * 100;
      return t > 100 ? 100 : t;
    }, i.prototype.getBaseShapeStyle = function() {
      var e = this.props.baseShape || pe.JoystickShape.Circle;
      return (0, ce.shapeFactory)(e, this._baseSize);
    }, i.prototype.getStickShapeStyle = function() {
      var e = this.props.stickShape || pe.JoystickShape.Circle;
      return (0, ce.shapeFactory)(e, this._baseSize);
    }, i.prototype._getBaseStyle = function() {
      var e = this.props.baseColor !== void 0 ? this.props.baseColor : "#000033", t = "".concat(this._baseSize, "px"), o = X(X({}, this.getBaseShapeStyle()), { height: t, width: t, background: e, display: "flex", justifyContent: "center", alignItems: "center" });
      return this.props.baseImage && (o.background = "url(".concat(this.props.baseImage, ")"), o.backgroundSize = "100%"), o;
    }, i.prototype._getStickStyle = function() {
      var e = this.props.stickColor !== void 0 ? this.props.stickColor : "#3D59AB", t = this._stickSize ? "".concat(this._stickSize, "px") : "".concat(this._baseSize / 1.5, "px"), o = X(X({}, this.getStickShapeStyle()), { background: e, cursor: "move", height: t, width: t, border: "none", flexShrink: 0, touchAction: "none" });
      return this.props.stickImage && (o.background = "url(".concat(this.props.stickImage, ")"), o.backgroundSize = "100%"), this.props.pos && (o = Object.assign({}, o, {
        position: "absolute",
        transform: "translate3d(".concat(this.props.pos.x * this._baseSize / 2, "px, ").concat(-(this.props.pos.y * this._baseSize) / 2, "px, 0)")
      })), this.state.coordinates !== void 0 && (o = Object.assign({}, o, {
        position: "absolute",
        transform: "translate3d(".concat(this.state.coordinates.relativeX, "px, ").concat(this.state.coordinates.relativeY, "px, 0)")
      })), o;
    }, i.prototype.render = function() {
      var e = this;
      this._baseSize = this.props.size || 100, this._stickSize = this.props.stickSize, this._radius = this._baseSize / 2;
      var t = this._getBaseStyle(), o = this._getStickStyle();
      return Q.createElement(
        "div",
        { "data-testid": "joystick-base", className: this.props.disabled ? "joystick-base-disabled" : "", ref: this._baseRef, style: t },
        Q.createElement("button", { ref: this._stickRef, disabled: this.props.disabled, onPointerDown: function(n) {
          return e._pointerDown(n);
        }, className: this.props.disabled ? "joystick-disabled" : "", style: o })
      );
    }, i;
  }(Q.Component)
);
zt.Joystick = no;
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = r.Joystick = void 0;
  var i = zt;
  Object.defineProperty(r, "Joystick", { enumerable: !0, get: function() {
    return i.Joystick;
  } });
  var e = st;
  Object.defineProperty(r, "JoystickShape", { enumerable: !0, get: function() {
    return e.JoystickShape;
  } });
})(to);
var St = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, so = {}, Jt = {}, at = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = void 0, function(i) {
    i.Circle = "circle", i.Square = "square", i.AxisY = "axisY", i.AxisX = "axisX";
  }(r.JoystickShape || (r.JoystickShape = {}));
})(at);
var Bt = {};
Object.defineProperty(Bt, "__esModule", { value: !0 });
Bt.shapeFactory = void 0;
var ue = at, ao = function(r, i) {
  switch (r) {
    case ue.JoystickShape.Square:
      return {
        borderRadius: Math.sqrt(i)
      };
    case ue.JoystickShape.Circle:
    default:
      return {
        borderRadius: i
      };
  }
};
Bt.shapeFactory = ao;
var Dt = {};
Object.defineProperty(Dt, "__esModule", { value: !0 });
Dt.shapeBoundsFactory = void 0;
var Gt = at, po = function(r, i, e, t, o, n, p, s, a) {
  switch (r) {
    case Gt.JoystickShape.Square:
      return t = _t(i - a.left - s / 2, s), o = _t(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    case Gt.JoystickShape.AxisX:
      return t = _t(i - a.left - s / 2, s), o = 0, { relativeX: t, relativeY: o };
    case Gt.JoystickShape.AxisY:
      return t = 0, o = _t(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    default:
      return n > p && (t *= p / n, o *= p / n), { relativeX: t, relativeY: o };
  }
};
Dt.shapeBoundsFactory = po;
var _t = function(r, i) {
  var e = i / 2;
  return r > e ? e : r < -e ? e * -1 : r;
}, co = St && St.__extends || /* @__PURE__ */ function() {
  var r = function(i, e) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, o) {
      t.__proto__ = o;
    } || function(t, o) {
      for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n]);
    }, r(i, e);
  };
  return function(i, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
    r(i, e);
    function t() {
      this.constructor = i;
    }
    i.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
  };
}(), q = St && St.__assign || function() {
  return q = Object.assign || function(r) {
    for (var i, e = 1, t = arguments.length; e < t; e++) {
      i = arguments[e];
      for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (r[o] = i[o]);
    }
    return r;
  }, q.apply(this, arguments);
};
Object.defineProperty(Jt, "__esModule", { value: !0 });
Jt.Joystick = void 0;
var tt = H, le = at, de = Bt, uo = Dt, I;
(function(r) {
  r.PointerDown = "pointerdown", r.PointerMove = "pointermove", r.PointerUp = "pointerup";
})(I || (I = {}));
var D;
(function(r) {
  r[r.TopRight = 2.35619449] = "TopRight", r[r.TopLeft = -2.35619449] = "TopLeft", r[r.BottomRight = 0.785398163] = "BottomRight", r[r.BottomLeft = -0.785398163] = "BottomLeft";
})(D || (D = {}));
var lo = (
  /** @class */
  function(r) {
    co(i, r);
    function i(e) {
      var t = r.call(this, e) || this;
      return t._stickRef = tt.createRef(), t._baseRef = tt.createRef(), t.frameId = null, t._pointerId = null, t._mounted = !1, t._pointerMove = function(o) {
        if (o.preventDefault(), t.state.dragging) {
          if (!t.props.followCursor && o.pointerId !== t._pointerId)
            return;
          var n = o.clientX, p = o.clientY, s = n - t._parentRect.left - t._radius, a = p - t._parentRect.top - t._radius, f = t._distance(s, a), h = (0, uo.shapeBoundsFactory)(
            //@ts-ignore
            t.props.controlPlaneShape || t.props.baseShape,
            n,
            p,
            s,
            a,
            f,
            t._radius,
            t._baseSize,
            t._parentRect
          );
          s = h.relativeX, a = h.relativeY;
          var k = Math.atan2(s, a);
          t._updatePos({
            relativeX: s,
            relativeY: a,
            distance: t._distanceToPercentile(f),
            direction: t._getDirection(k),
            axisX: n - t._parentRect.left,
            axisY: p - t._parentRect.top
          });
        }
      }, t._pointerUp = function(o) {
        if (o.pointerId === t._pointerId) {
          var n = {
            dragging: !1
          };
          t.props.sticky || (n.coordinates = void 0), t.frameId = window.requestAnimationFrame(function() {
            t._mounted && t.setState(n);
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
        var o = 0;
        return function(n) {
          var p = (/* @__PURE__ */ new Date()).getTime(), s = t.props.throttle || 0;
          if (!(p - o < s) && (o = p, t.props.move))
            return t.props.move(n);
        };
      }(), t;
    }
    return i.prototype.componentWillUnmount = function() {
      var e = this;
      this._mounted = !1, this.props.followCursor && window.removeEventListener(I.PointerMove, function(t) {
        return e._pointerMove(t);
      }), this.frameId !== null && window.cancelAnimationFrame(this.frameId);
    }, i.prototype.componentDidMount = function() {
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
    }, i.prototype._updatePos = function(e) {
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
    }, i.prototype._pointerDown = function(e) {
      this.props.disabled || this.props.followCursor || (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(I.PointerUp, this._pointerUp), window.addEventListener(I.PointerMove, this._pointerMove), this._pointerId = e.pointerId, this._stickRef.current.setPointerCapture(e.pointerId), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, i.prototype._getDirection = function(e) {
      return e > D.TopRight || e < D.TopLeft ? "FORWARD" : e < D.TopRight && e > D.BottomRight ? "RIGHT" : e < D.BottomLeft ? "LEFT" : "BACKWARD";
    }, i.prototype._distance = function(e, t) {
      return Math.hypot(e, t);
    }, i.prototype._distanceToPercentile = function(e) {
      var t = e / (this._baseSize / 2) * 100;
      return t > 100 ? 100 : t;
    }, i.prototype.getBaseShapeStyle = function() {
      var e = this.props.baseShape || le.JoystickShape.Circle;
      return (0, de.shapeFactory)(e, this._baseSize);
    }, i.prototype.getStickShapeStyle = function() {
      var e = this.props.stickShape || le.JoystickShape.Circle;
      return (0, de.shapeFactory)(e, this._baseSize);
    }, i.prototype._getBaseStyle = function() {
      var e = this.props.baseColor !== void 0 ? this.props.baseColor : "#000033", t = "".concat(this._baseSize, "px"), o = q(q({}, this.getBaseShapeStyle()), { height: t, width: t, background: e, display: "flex", justifyContent: "center", alignItems: "center" });
      return this.props.baseImage && (o.background = "url(".concat(this.props.baseImage, ")"), o.backgroundSize = "100%"), o;
    }, i.prototype._getStickStyle = function() {
      var e = this.props.stickColor !== void 0 ? this.props.stickColor : "#3D59AB", t = this._stickSize ? "".concat(this._stickSize, "px") : "".concat(this._baseSize / 1.5, "px"), o = q(q({}, this.getStickShapeStyle()), { background: e, cursor: "move", height: t, width: t, border: "none", flexShrink: 0, touchAction: "none" });
      return this.props.stickImage && (o.background = "url(".concat(this.props.stickImage, ")"), o.backgroundSize = "100%"), this.props.pos && (o = Object.assign({}, o, {
        position: "absolute",
        transform: "translate3d(".concat(this.props.pos.x * this._baseSize / 2, "px, ").concat(-(this.props.pos.y * this._baseSize) / 2, "px, 0)")
      })), this.state.coordinates !== void 0 && (o = Object.assign({}, o, {
        position: "absolute",
        transform: "translate3d(".concat(this.state.coordinates.relativeX, "px, ").concat(this.state.coordinates.relativeY, "px, 0)")
      })), o;
    }, i.prototype.render = function() {
      var e = this;
      this._baseSize = this.props.size || 100, this._stickSize = this.props.stickSize, this._radius = this._baseSize / 2;
      var t = this._getBaseStyle(), o = this._getStickStyle();
      return tt.createElement(
        "div",
        { "data-testid": "joystick-base", className: this.props.disabled ? "joystick-base-disabled" : "", ref: this._baseRef, style: t },
        tt.createElement("button", { ref: this._stickRef, disabled: this.props.disabled, onPointerDown: function(n) {
          return e._pointerDown(n);
        }, className: this.props.disabled ? "joystick-disabled" : "", style: o })
      );
    }, i;
  }(tt.Component)
);
Jt.Joystick = lo;
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = r.Joystick = void 0;
  var i = Jt;
  Object.defineProperty(r, "Joystick", { enumerable: !0, get: function() {
    return i.Joystick;
  } });
  var e = at;
  Object.defineProperty(r, "JoystickShape", { enumerable: !0, get: function() {
    return e.JoystickShape;
  } });
})(so);
var kt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, ho = {}, Lt = {}, pt = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = void 0, function(i) {
    i.Circle = "circle", i.Square = "square", i.AxisY = "axisY", i.AxisX = "axisX";
  }(r.JoystickShape || (r.JoystickShape = {}));
})(pt);
var Tt = {};
Object.defineProperty(Tt, "__esModule", { value: !0 });
Tt.shapeFactory = void 0;
var he = pt, fo = function(r, i) {
  switch (r) {
    case he.JoystickShape.Square:
      return {
        borderRadius: Math.sqrt(i)
      };
    case he.JoystickShape.Circle:
    default:
      return {
        borderRadius: i
      };
  }
};
Tt.shapeFactory = fo;
var At = {};
Object.defineProperty(At, "__esModule", { value: !0 });
At.shapeBoundsFactory = void 0;
var Kt = pt, _o = function(r, i, e, t, o, n, p, s, a) {
  switch (r) {
    case Kt.JoystickShape.Square:
      return t = vt(i - a.left - s / 2, s), o = vt(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    case Kt.JoystickShape.AxisX:
      return t = vt(i - a.left - s / 2, s), o = 0, { relativeX: t, relativeY: o };
    case Kt.JoystickShape.AxisY:
      return t = 0, o = vt(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    default:
      return n > p && (t *= p / n, o *= p / n), { relativeX: t, relativeY: o };
  }
};
At.shapeBoundsFactory = _o;
var vt = function(r, i) {
  var e = i / 2;
  return r > e ? e : r < -e ? e * -1 : r;
}, vo = kt && kt.__extends || /* @__PURE__ */ function() {
  var r = function(i, e) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, o) {
      t.__proto__ = o;
    } || function(t, o) {
      for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n]);
    }, r(i, e);
  };
  return function(i, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
    r(i, e);
    function t() {
      this.constructor = i;
    }
    i.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
  };
}(), U = kt && kt.__assign || function() {
  return U = Object.assign || function(r) {
    for (var i, e = 1, t = arguments.length; e < t; e++) {
      i = arguments[e];
      for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (r[o] = i[o]);
    }
    return r;
  }, U.apply(this, arguments);
};
Object.defineProperty(Lt, "__esModule", { value: !0 });
Lt.Joystick = void 0;
var et = H, fe = pt, _e = Tt, yo = At, x;
(function(r) {
  r.PointerDown = "pointerdown", r.PointerMove = "pointermove", r.PointerUp = "pointerup";
})(x || (x = {}));
var L;
(function(r) {
  r[r.TopRight = 2.35619449] = "TopRight", r[r.TopLeft = -2.35619449] = "TopLeft", r[r.BottomRight = 0.785398163] = "BottomRight", r[r.BottomLeft = -0.785398163] = "BottomLeft";
})(L || (L = {}));
var go = (
  /** @class */
  function(r) {
    vo(i, r);
    function i(e) {
      var t = r.call(this, e) || this;
      return t._stickRef = et.createRef(), t._baseRef = et.createRef(), t.frameId = null, t._pointerId = null, t._mounted = !1, t._pointerMove = function(o) {
        if (o.preventDefault(), t.state.dragging) {
          if (!t.props.followCursor && o.pointerId !== t._pointerId)
            return;
          var n = o.clientX, p = o.clientY, s = n - t._parentRect.left - t._radius, a = p - t._parentRect.top - t._radius, f = t._distance(s, a), h = (0, yo.shapeBoundsFactory)(
            //@ts-ignore
            t.props.controlPlaneShape || t.props.baseShape,
            n,
            p,
            s,
            a,
            f,
            t._radius,
            t._baseSize,
            t._parentRect
          );
          s = h.relativeX, a = h.relativeY;
          var k = Math.atan2(s, a);
          t._updatePos({
            relativeX: s,
            relativeY: a,
            distance: t._distanceToPercentile(f),
            direction: t._getDirection(k),
            axisX: n - t._parentRect.left,
            axisY: p - t._parentRect.top
          });
        }
      }, t._pointerUp = function(o) {
        if (o.pointerId === t._pointerId) {
          var n = {
            dragging: !1
          };
          t.props.sticky || (n.coordinates = void 0), t.frameId = window.requestAnimationFrame(function() {
            t._mounted && t.setState(n);
          }), window.removeEventListener(x.PointerUp, t._pointerUp), window.removeEventListener(x.PointerMove, t._pointerMove), t._pointerId = null, t.props.stop && t.props.stop({
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
        var o = 0;
        return function(n) {
          var p = (/* @__PURE__ */ new Date()).getTime(), s = t.props.throttle || 0;
          if (!(p - o < s) && (o = p, t.props.move))
            return t.props.move(n);
        };
      }(), t;
    }
    return i.prototype.componentWillUnmount = function() {
      var e = this;
      this._mounted = !1, this.props.followCursor && window.removeEventListener(x.PointerMove, function(t) {
        return e._pointerMove(t);
      }), this.frameId !== null && window.cancelAnimationFrame(this.frameId);
    }, i.prototype.componentDidMount = function() {
      var e = this;
      this._mounted = !0, this.props.followCursor && (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(x.PointerMove, function(t) {
        return e._pointerMove(t);
      }), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, i.prototype._updatePos = function(e) {
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
    }, i.prototype._pointerDown = function(e) {
      this.props.disabled || this.props.followCursor || (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(x.PointerUp, this._pointerUp), window.addEventListener(x.PointerMove, this._pointerMove), this._pointerId = e.pointerId, this._stickRef.current.setPointerCapture(e.pointerId), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, i.prototype._getDirection = function(e) {
      return e > L.TopRight || e < L.TopLeft ? "FORWARD" : e < L.TopRight && e > L.BottomRight ? "RIGHT" : e < L.BottomLeft ? "LEFT" : "BACKWARD";
    }, i.prototype._distance = function(e, t) {
      return Math.hypot(e, t);
    }, i.prototype._distanceToPercentile = function(e) {
      var t = e / (this._baseSize / 2) * 100;
      return t > 100 ? 100 : t;
    }, i.prototype.getBaseShapeStyle = function() {
      var e = this.props.baseShape || fe.JoystickShape.Circle;
      return (0, _e.shapeFactory)(e, this._baseSize);
    }, i.prototype.getStickShapeStyle = function() {
      var e = this.props.stickShape || fe.JoystickShape.Circle;
      return (0, _e.shapeFactory)(e, this._baseSize);
    }, i.prototype._getBaseStyle = function() {
      var e = this.props.baseColor !== void 0 ? this.props.baseColor : "#000033", t = "".concat(this._baseSize, "px"), o = U(U({}, this.getBaseShapeStyle()), { height: t, width: t, background: e, display: "flex", justifyContent: "center", alignItems: "center" });
      return this.props.baseImage && (o.background = "url(".concat(this.props.baseImage, ")"), o.backgroundSize = "100%"), o;
    }, i.prototype._getStickStyle = function() {
      var e = this.props.stickColor !== void 0 ? this.props.stickColor : "#3D59AB", t = this._stickSize ? "".concat(this._stickSize, "px") : "".concat(this._baseSize / 1.5, "px"), o = U(U({}, this.getStickShapeStyle()), { background: e, cursor: "move", height: t, width: t, border: "none", flexShrink: 0, touchAction: "none" });
      return this.props.stickImage && (o.background = "url(".concat(this.props.stickImage, ")"), o.backgroundSize = "100%"), this.props.pos && (o = Object.assign({}, o, {
        position: "absolute",
        transform: "translate3d(".concat(this.props.pos.x * this._baseSize / 2, "px, ").concat(-(this.props.pos.y * this._baseSize) / 2, "px, 0)")
      })), this.state.coordinates !== void 0 && (o = Object.assign({}, o, {
        position: "absolute",
        transform: "translate3d(".concat(this.state.coordinates.relativeX, "px, ").concat(this.state.coordinates.relativeY, "px, 0)")
      })), o;
    }, i.prototype.render = function() {
      var e = this;
      this._baseSize = this.props.size || 100, this._stickSize = this.props.stickSize, this._radius = this._baseSize / 2;
      var t = this._getBaseStyle(), o = this._getStickStyle();
      return et.createElement(
        "div",
        { "data-testid": "joystick-base", className: this.props.disabled ? "joystick-base-disabled" : "", ref: this._baseRef, style: t },
        et.createElement("button", { ref: this._stickRef, disabled: this.props.disabled, onPointerDown: function(n) {
          return e._pointerDown(n);
        }, className: this.props.disabled ? "joystick-disabled" : "", style: o })
      );
    }, i;
  }(et.Component)
);
Lt.Joystick = go;
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = r.Joystick = void 0;
  var i = Lt;
  Object.defineProperty(r, "Joystick", { enumerable: !0, get: function() {
    return i.Joystick;
  } });
  var e = pt;
  Object.defineProperty(r, "JoystickShape", { enumerable: !0, get: function() {
    return e.JoystickShape;
  } });
})(ho);
var wt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, mo = {}, Ft = {}, ct = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = void 0, function(i) {
    i.Circle = "circle", i.Square = "square", i.AxisY = "axisY", i.AxisX = "axisX";
  }(r.JoystickShape || (r.JoystickShape = {}));
})(ct);
var Yt = {};
Object.defineProperty(Yt, "__esModule", { value: !0 });
Yt.shapeFactory = void 0;
var ve = ct, bo = function(r, i) {
  switch (r) {
    case ve.JoystickShape.Square:
      return {
        borderRadius: Math.sqrt(i)
      };
    case ve.JoystickShape.Circle:
    default:
      return {
        borderRadius: i
      };
  }
};
Yt.shapeFactory = bo;
var Et = {};
Object.defineProperty(Et, "__esModule", { value: !0 });
Et.shapeBoundsFactory = void 0;
var $t = ct, So = function(r, i, e, t, o, n, p, s, a) {
  switch (r) {
    case $t.JoystickShape.Square:
      return t = yt(i - a.left - s / 2, s), o = yt(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    case $t.JoystickShape.AxisX:
      return t = yt(i - a.left - s / 2, s), o = 0, { relativeX: t, relativeY: o };
    case $t.JoystickShape.AxisY:
      return t = 0, o = yt(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    default:
      return n > p && (t *= p / n, o *= p / n), { relativeX: t, relativeY: o };
  }
};
Et.shapeBoundsFactory = So;
var yt = function(r, i) {
  var e = i / 2;
  return r > e ? e : r < -e ? e * -1 : r;
}, ko = wt && wt.__extends || /* @__PURE__ */ function() {
  var r = function(i, e) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, o) {
      t.__proto__ = o;
    } || function(t, o) {
      for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n]);
    }, r(i, e);
  };
  return function(i, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
    r(i, e);
    function t() {
      this.constructor = i;
    }
    i.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
  };
}(), W = wt && wt.__assign || function() {
  return W = Object.assign || function(r) {
    for (var i, e = 1, t = arguments.length; e < t; e++) {
      i = arguments[e];
      for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (r[o] = i[o]);
    }
    return r;
  }, W.apply(this, arguments);
};
Object.defineProperty(Ft, "__esModule", { value: !0 });
Ft.Joystick = void 0;
var ot = H, ye = ct, ge = Yt, wo = Et, z;
(function(r) {
  r.PointerDown = "pointerdown", r.PointerMove = "pointermove", r.PointerUp = "pointerup";
})(z || (z = {}));
var T;
(function(r) {
  r[r.TopRight = 2.35619449] = "TopRight", r[r.TopLeft = -2.35619449] = "TopLeft", r[r.BottomRight = 0.785398163] = "BottomRight", r[r.BottomLeft = -0.785398163] = "BottomLeft";
})(T || (T = {}));
var Ro = (
  /** @class */
  function(r) {
    ko(i, r);
    function i(e) {
      var t = r.call(this, e) || this;
      return t._stickRef = ot.createRef(), t._baseRef = ot.createRef(), t.frameId = null, t._pointerId = null, t._mounted = !1, t._pointerMove = function(o) {
        if (o.preventDefault(), t.state.dragging) {
          if (!t.props.followCursor && o.pointerId !== t._pointerId)
            return;
          var n = o.clientX, p = o.clientY, s = n - t._parentRect.left - t._radius, a = p - t._parentRect.top - t._radius, f = t._distance(s, a), h = (0, wo.shapeBoundsFactory)(
            //@ts-ignore
            t.props.controlPlaneShape || t.props.baseShape,
            n,
            p,
            s,
            a,
            f,
            t._radius,
            t._baseSize,
            t._parentRect
          );
          s = h.relativeX, a = h.relativeY;
          var k = Math.atan2(s, a);
          t._updatePos({
            relativeX: s,
            relativeY: a,
            distance: t._distanceToPercentile(f),
            direction: t._getDirection(k),
            axisX: n - t._parentRect.left,
            axisY: p - t._parentRect.top
          });
        }
      }, t._pointerUp = function(o) {
        if (o.pointerId === t._pointerId) {
          var n = {
            dragging: !1
          };
          t.props.sticky || (n.coordinates = void 0), t.frameId = window.requestAnimationFrame(function() {
            t._mounted && t.setState(n);
          }), window.removeEventListener(z.PointerUp, t._pointerUp), window.removeEventListener(z.PointerMove, t._pointerMove), t._pointerId = null, t.props.stop && t.props.stop({
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
        var o = 0;
        return function(n) {
          var p = (/* @__PURE__ */ new Date()).getTime(), s = t.props.throttle || 0;
          if (!(p - o < s) && (o = p, t.props.move))
            return t.props.move(n);
        };
      }(), t;
    }
    return i.prototype.componentWillUnmount = function() {
      var e = this;
      this._mounted = !1, this.props.followCursor && window.removeEventListener(z.PointerMove, function(t) {
        return e._pointerMove(t);
      }), this.frameId !== null && window.cancelAnimationFrame(this.frameId);
    }, i.prototype.componentDidMount = function() {
      var e = this;
      this._mounted = !0, this.props.followCursor && (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(z.PointerMove, function(t) {
        return e._pointerMove(t);
      }), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, i.prototype._updatePos = function(e) {
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
    }, i.prototype._pointerDown = function(e) {
      this.props.disabled || this.props.followCursor || (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(z.PointerUp, this._pointerUp), window.addEventListener(z.PointerMove, this._pointerMove), this._pointerId = e.pointerId, this._stickRef.current.setPointerCapture(e.pointerId), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, i.prototype._getDirection = function(e) {
      return e > T.TopRight || e < T.TopLeft ? "FORWARD" : e < T.TopRight && e > T.BottomRight ? "RIGHT" : e < T.BottomLeft ? "LEFT" : "BACKWARD";
    }, i.prototype._distance = function(e, t) {
      return Math.hypot(e, t);
    }, i.prototype._distanceToPercentile = function(e) {
      var t = e / (this._baseSize / 2) * 100;
      return t > 100 ? 100 : t;
    }, i.prototype.getBaseShapeStyle = function() {
      var e = this.props.baseShape || ye.JoystickShape.Circle;
      return (0, ge.shapeFactory)(e, this._baseSize);
    }, i.prototype.getStickShapeStyle = function() {
      var e = this.props.stickShape || ye.JoystickShape.Circle;
      return (0, ge.shapeFactory)(e, this._baseSize);
    }, i.prototype._getBaseStyle = function() {
      var e = this.props.baseColor !== void 0 ? this.props.baseColor : "#000033", t = "".concat(this._baseSize, "px"), o = W(W({}, this.getBaseShapeStyle()), { height: t, width: t, background: e, display: "flex", justifyContent: "center", alignItems: "center" });
      return this.props.baseImage && (o.background = "url(".concat(this.props.baseImage, ")"), o.backgroundSize = "100%"), o;
    }, i.prototype._getStickStyle = function() {
      var e = this.props.stickColor !== void 0 ? this.props.stickColor : "#3D59AB", t = this._stickSize ? "".concat(this._stickSize, "px") : "".concat(this._baseSize / 1.5, "px"), o = W(W({}, this.getStickShapeStyle()), { background: e, cursor: "move", height: t, width: t, border: "none", flexShrink: 0, touchAction: "none" });
      return this.props.stickImage && (o.background = "url(".concat(this.props.stickImage, ")"), o.backgroundSize = "100%"), this.props.pos && (o = Object.assign({}, o, {
        position: "absolute",
        transform: "translate3d(".concat(this.props.pos.x * this._baseSize / 2, "px, ").concat(-(this.props.pos.y * this._baseSize) / 2, "px, 0)")
      })), this.state.coordinates !== void 0 && (o = Object.assign({}, o, {
        position: "absolute",
        transform: "translate3d(".concat(this.state.coordinates.relativeX, "px, ").concat(this.state.coordinates.relativeY, "px, 0)")
      })), o;
    }, i.prototype.render = function() {
      var e = this;
      this._baseSize = this.props.size || 100, this._stickSize = this.props.stickSize, this._radius = this._baseSize / 2;
      var t = this._getBaseStyle(), o = this._getStickStyle();
      return ot.createElement(
        "div",
        { "data-testid": "joystick-base", className: this.props.disabled ? "joystick-base-disabled" : "", ref: this._baseRef, style: t },
        ot.createElement("button", { ref: this._stickRef, disabled: this.props.disabled, onPointerDown: function(n) {
          return e._pointerDown(n);
        }, className: this.props.disabled ? "joystick-disabled" : "", style: o })
      );
    }, i;
  }(ot.Component)
);
Ft.Joystick = Ro;
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = r.Joystick = void 0;
  var i = Ft;
  Object.defineProperty(r, "Joystick", { enumerable: !0, get: function() {
    return i.Joystick;
  } });
  var e = ct;
  Object.defineProperty(r, "JoystickShape", { enumerable: !0, get: function() {
    return e.JoystickShape;
  } });
})(mo);
function Io() {
  return /* @__PURE__ */ m(me, { children: /* @__PURE__ */ m(Ne, {}) });
}
export {
  Io as default
};
