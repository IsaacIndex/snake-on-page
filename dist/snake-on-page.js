import { jsx as g, jsxs as K, Fragment as pe } from "react/jsx-runtime";
import ue, { useRef as y, useEffect as O, useState as C, useMemo as de } from "react";
const le = (n, r, t) => {
  const e = n[r];
  return e ? typeof e == "function" ? e() : Promise.resolve(e) : new Promise((o, i) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(
      i.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + r + (r.split("/").length !== t ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
}, fe = "_snakeGame_2cqgw_5", he = "_snakeCanvas_2cqgw_15", me = "_mapCanvas_2cqgw_23", N = {
  snakeGame: fe,
  snakeCanvas: he,
  mapCanvas: me
};
var H = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, ne = {}, q = {}, J = {};
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.JoystickShape = void 0, function(r) {
    r.Circle = "circle", r.Square = "square", r.AxisY = "axisY", r.AxisX = "axisX";
  }(n.JoystickShape || (n.JoystickShape = {}));
})(J);
var x = {};
Object.defineProperty(x, "__esModule", { value: !0 });
x.shapeFactory = void 0;
var Z = J, _e = function(n, r) {
  switch (n) {
    case Z.JoystickShape.Square:
      return {
        borderRadius: Math.sqrt(r)
      };
    case Z.JoystickShape.Circle:
    default:
      return {
        borderRadius: r
      };
  }
};
x.shapeFactory = _e;
var U = {};
Object.defineProperty(U, "__esModule", { value: !0 });
U.shapeBoundsFactory = void 0;
var Y = J, ve = function(n, r, t, e, o, i, _, d, a) {
  switch (n) {
    case Y.JoystickShape.Square:
      return e = B(r - a.left - d / 2, d), o = B(t - a.top - d / 2, d), { relativeX: e, relativeY: o };
    case Y.JoystickShape.AxisX:
      return e = B(r - a.left - d / 2, d), o = 0, { relativeX: e, relativeY: o };
    case Y.JoystickShape.AxisY:
      return e = 0, o = B(t - a.top - d / 2, d), { relativeX: e, relativeY: o };
    default:
      return i > _ && (e *= _ / i, o *= _ / i), { relativeX: e, relativeY: o };
  }
};
U.shapeBoundsFactory = ve;
var B = function(n, r) {
  var t = r / 2;
  return n > t ? t : n < -t ? t * -1 : n;
}, we = H && H.__extends || /* @__PURE__ */ function() {
  var n = function(r, t) {
    return n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, o) {
      e.__proto__ = o;
    } || function(e, o) {
      for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (e[i] = o[i]);
    }, n(r, t);
  };
  return function(r, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    n(r, t);
    function e() {
      this.constructor = r;
    }
    r.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
  };
}(), j = H && H.__assign || function() {
  return j = Object.assign || function(n) {
    for (var r, t = 1, e = arguments.length; t < e; t++) {
      r = arguments[t];
      for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (n[o] = r[o]);
    }
    return n;
  }, j.apply(this, arguments);
};
Object.defineProperty(q, "__esModule", { value: !0 });
q.Joystick = void 0;
var E = ue, Q = J, ee = x, ge = U, M;
(function(n) {
  n.PointerDown = "pointerdown", n.PointerMove = "pointermove", n.PointerUp = "pointerup";
})(M || (M = {}));
var I;
(function(n) {
  n[n.TopRight = 2.35619449] = "TopRight", n[n.TopLeft = -2.35619449] = "TopLeft", n[n.BottomRight = 0.785398163] = "BottomRight", n[n.BottomLeft = -0.785398163] = "BottomLeft";
})(I || (I = {}));
var ye = (
  /** @class */
  function(n) {
    we(r, n);
    function r(t) {
      var e = n.call(this, t) || this;
      return e._stickRef = E.createRef(), e._baseRef = E.createRef(), e.frameId = null, e._pointerId = null, e._mounted = !1, e._pointerMove = function(o) {
        if (o.preventDefault(), e.state.dragging) {
          if (!e.props.followCursor && o.pointerId !== e._pointerId)
            return;
          var i = o.clientX, _ = o.clientY, d = i - e._parentRect.left - e._radius, a = _ - e._parentRect.top - e._radius, S = e._distance(d, a), k = (0, ge.shapeBoundsFactory)(
            //@ts-ignore
            e.props.controlPlaneShape || e.props.baseShape,
            i,
            _,
            d,
            a,
            S,
            e._radius,
            e._baseSize,
            e._parentRect
          );
          d = k.relativeX, a = k.relativeY;
          var D = Math.atan2(d, a);
          e._updatePos({
            relativeX: d,
            relativeY: a,
            distance: e._distanceToPercentile(S),
            direction: e._getDirection(D),
            axisX: i - e._parentRect.left,
            axisY: _ - e._parentRect.top
          });
        }
      }, e._pointerUp = function(o) {
        if (o.pointerId === e._pointerId) {
          var i = {
            dragging: !1
          };
          e.props.sticky || (i.coordinates = void 0), e.frameId = window.requestAnimationFrame(function() {
            e._mounted && e.setState(i);
          }), window.removeEventListener(M.PointerUp, e._pointerUp), window.removeEventListener(M.PointerMove, e._pointerMove), e._pointerId = null, e.props.stop && e.props.stop({
            type: "stop",
            // @ts-ignore
            x: e.props.sticky ? e.state.coordinates.relativeX * 2 / e._baseSize : null,
            // @ts-ignore
            y: e.props.sticky ? e.state.coordinates.relativeY * 2 / e._baseSize : null,
            // @ts-ignore
            direction: e.props.sticky ? e.state.coordinates.direction : null,
            // @ts-ignore
            distance: e.props.sticky ? e.state.coordinates.distance : null
          });
        }
      }, e.state = {
        dragging: !1
      }, e._throttleMoveCallback = /* @__PURE__ */ function() {
        var o = 0;
        return function(i) {
          var _ = (/* @__PURE__ */ new Date()).getTime(), d = e.props.throttle || 0;
          if (!(_ - o < d) && (o = _, e.props.move))
            return e.props.move(i);
        };
      }(), e;
    }
    return r.prototype.componentWillUnmount = function() {
      var t = this;
      this._mounted = !1, this.props.followCursor && window.removeEventListener(M.PointerMove, function(e) {
        return t._pointerMove(e);
      }), this.frameId !== null && window.cancelAnimationFrame(this.frameId);
    }, r.prototype.componentDidMount = function() {
      var t = this;
      this._mounted = !0, this.props.followCursor && (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(M.PointerMove, function(e) {
        return t._pointerMove(e);
      }), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, r.prototype._updatePos = function(t) {
      var e = this;
      this.frameId = window.requestAnimationFrame(function() {
        e._mounted && e.setState({
          coordinates: t
        });
      }), !(typeof this.props.minDistance == "number" && t.distance < this.props.minDistance) && this._throttleMoveCallback({
        type: "move",
        x: t.relativeX * 2 / this._baseSize,
        y: -(t.relativeY * 2 / this._baseSize),
        direction: t.direction,
        distance: t.distance
      });
    }, r.prototype._pointerDown = function(t) {
      this.props.disabled || this.props.followCursor || (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(M.PointerUp, this._pointerUp), window.addEventListener(M.PointerMove, this._pointerMove), this._pointerId = t.pointerId, this._stickRef.current.setPointerCapture(t.pointerId), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, r.prototype._getDirection = function(t) {
      return t > I.TopRight || t < I.TopLeft ? "FORWARD" : t < I.TopRight && t > I.BottomRight ? "RIGHT" : t < I.BottomLeft ? "LEFT" : "BACKWARD";
    }, r.prototype._distance = function(t, e) {
      return Math.hypot(t, e);
    }, r.prototype._distanceToPercentile = function(t) {
      var e = t / (this._baseSize / 2) * 100;
      return e > 100 ? 100 : e;
    }, r.prototype.getBaseShapeStyle = function() {
      var t = this.props.baseShape || Q.JoystickShape.Circle;
      return (0, ee.shapeFactory)(t, this._baseSize);
    }, r.prototype.getStickShapeStyle = function() {
      var t = this.props.stickShape || Q.JoystickShape.Circle;
      return (0, ee.shapeFactory)(t, this._baseSize);
    }, r.prototype._getBaseStyle = function() {
      var t = this.props.baseColor !== void 0 ? this.props.baseColor : "#000033", e = "".concat(this._baseSize, "px"), o = j(j({}, this.getBaseShapeStyle()), { height: e, width: e, background: t, display: "flex", justifyContent: "center", alignItems: "center" });
      return this.props.baseImage && (o.background = "url(".concat(this.props.baseImage, ")"), o.backgroundSize = "100%"), o;
    }, r.prototype._getStickStyle = function() {
      var t = this.props.stickColor !== void 0 ? this.props.stickColor : "#3D59AB", e = this._stickSize ? "".concat(this._stickSize, "px") : "".concat(this._baseSize / 1.5, "px"), o = j(j({}, this.getStickShapeStyle()), { background: t, cursor: "move", height: e, width: e, border: "none", flexShrink: 0, touchAction: "none" });
      return this.props.stickImage && (o.background = "url(".concat(this.props.stickImage, ")"), o.backgroundSize = "100%"), this.props.pos && (o = Object.assign({}, o, {
        position: "absolute",
        transform: "translate3d(".concat(this.props.pos.x * this._baseSize / 2, "px, ").concat(-(this.props.pos.y * this._baseSize) / 2, "px, 0)")
      })), this.state.coordinates !== void 0 && (o = Object.assign({}, o, {
        position: "absolute",
        transform: "translate3d(".concat(this.state.coordinates.relativeX, "px, ").concat(this.state.coordinates.relativeY, "px, 0)")
      })), o;
    }, r.prototype.render = function() {
      var t = this;
      this._baseSize = this.props.size || 100, this._stickSize = this.props.stickSize, this._radius = this._baseSize / 2;
      var e = this._getBaseStyle(), o = this._getStickStyle();
      return E.createElement(
        "div",
        { "data-testid": "joystick-base", className: this.props.disabled ? "joystick-base-disabled" : "", ref: this._baseRef, style: e },
        E.createElement("button", { ref: this._stickRef, disabled: this.props.disabled, onPointerDown: function(i) {
          return t._pointerDown(i);
        }, className: this.props.disabled ? "joystick-disabled" : "", style: o })
      );
    }, r;
  }(E.Component)
);
q.Joystick = ye;
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.JoystickShape = n.Joystick = void 0;
  var r = q;
  Object.defineProperty(n, "Joystick", { enumerable: !0, get: function() {
    return r.Joystick;
  } });
  var t = J;
  Object.defineProperty(n, "JoystickShape", { enumerable: !0, get: function() {
    return t.JoystickShape;
  } });
})(ne);
const ke = ({ onDirectionChange: n }) => {
  const r = {
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
  }, t = 60, e = y(null), o = y(), i = y(0), _ = (a) => {
    e.current = a.direction;
  }, d = () => {
    e.current = null;
  };
  return O(() => {
    let a;
    const S = (k) => {
      k - i.current >= t && (e.current != null && n(e.current), i.current = k), a = window.requestAnimationFrame(S);
    };
    return S(), () => {
      window.cancelAnimationFrame(a);
    };
  }, []), /* @__PURE__ */ g("div", { style: r, children: /* @__PURE__ */ g(ne.Joystick, { ref: o, minDistance: 50, move: _, stop: d }) });
}, Se = "_loadingDiv_dcsfs_1", be = {
  loadingDiv: Se
}, Me = () => /* @__PURE__ */ g("div", { className: be.loadingDiv, children: /* @__PURE__ */ g("h1", { children: "Loading..." }) });
function F({ src: n, alt: r, hidden: t, onLoad: e }) {
  return O(() => {
    const o = new Image();
    return o.src = n, o.onload = () => {
      e();
    }, () => {
      o.onload = null;
    };
  }, [n]), /* @__PURE__ */ g("img", { src: n, alt: r, hidden: t });
}
const Ce = "/snake_sprite/snake-graphics.png", Ie = "/snake_sprite/snake-graphics_achromatopsia.png", Re = "/snake_sprite/snake-graphics_deuteranopia.png", Le = "/snake_sprite/snake-graphics_protanopia.png", je = "/snake_sprite/snake-graphics_tritanopia.png", te = {
  normal: Ce,
  achromatopsia: Ie,
  deuteranopia: Re,
  protanopia: Le,
  tritanopia: je
}, De = ({ mapImporterName: n, nextMap: r, addScore: t }) => {
  const [e, o] = C(""), i = y(), _ = y(), d = y(), a = y("right"), S = y(), k = y(), D = y(), [R, re] = C("normal"), [G, V] = C(!1), L = y(), P = y(), [oe, ie] = C(!1), [u, Pe] = C(30), A = ae(5, () => {
    console.log(G), V(!0), console.log("loaded");
  });
  function ae(f, p) {
    let l = 0;
    return function(...s) {
      l = l + 1, f === l && p(...s);
    };
  }
  const z = de(() => ({
    normal: R !== "normal",
    achromatopsia: R !== "achromatopsia",
    deuteranopia: R !== "deuteranopia",
    protanopia: R !== "protanopia",
    tritanopia: R !== "tritanopia"
  }), [R]), $ = (f) => {
    if (typeof f == "object") {
      const p = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down"
      };
      if (p[f.key] == "right" && a.current != "left")
        a.current = "right";
      else if (p[f.key] == "left" && a.current != "right")
        a.current = "left";
      else if (p[f.key] == "up" && a.current != "down")
        a.current = "up";
      else if (p[f.key] == "down" && a.current != "up")
        a.current = "down";
      else if (f.key == "m")
        t(), console.log(t);
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
    ce();
  }, se = () => {
    const f = {
      right: [1, 0],
      left: [-1, 0],
      up: [0, -1],
      down: [0, 1]
    };
    i.current.unshift(
      [
        i.current[0][0] + f[a.current][0] * u,
        i.current[0][1] + f[a.current][1] * u
      ]
    ), i.current[0][0] < 0 ? i.current[0][0] = window.innerWidth : i.current[0][0] > window.innerWidth && (i.current[0][0] = 0);
    const p = d.current;
    Math.abs(i.current[0][0] - p[0]) < u && Math.abs(i.current[0][1] + scrollY - p[1]) < u && (console.log("==========================tunnel"), r());
    const l = _.current;
    let s = !1;
    for (let c = 0; c < l.length; c++) {
      const [b, h] = l[c];
      if (Math.abs(i.current[0][0] - h[0]) < u * 0.75 && Math.abs(i.current[0][1] + scrollY - h[1]) < u * 0.75) {
        console.log("==========================eaten"), t(), s = !0, _.current.splice(c, 1), W();
        const m = new Image();
        m.src = te[b], k.current = m, re(b), c--;
      }
    }
    s || i.current.pop(), console.log(window.innerHeight + window.scrollY, L.current.offsetHeight), a.current == "down" ? (window.innerHeight + window.scrollY < L.current.offsetHeight - u && i.current.forEach((c) => c[1] -= u), scrollBy(0, u + 1)) : a.current == "up" && (window.scrollY > 0 && i.current.forEach((c) => c[1] += u), scrollBy(0, -u + 1));
  }, T = () => {
    const p = S.current.getContext("2d");
    p.clearRect(0, 0, p.canvas.width, p.canvas.height);
    for (var l = 0; l < i.current.length; l++) {
      var s = 0, c = 0, b = i.current[l], h = b[0], m = b[1];
      if (l == 0) {
        var v = i.current[l + 1];
        m < v[1] ? (s = 3, c = 0) : h > v[0] ? (s = 4, c = 0) : m > v[1] ? (s = 4, c = 1) : h < v[0] && (s = 3, c = 1);
      } else if (l == i.current.length - 1) {
        var w = i.current[l - 1];
        w[1] < m ? (s = 3, c = 2) : w[0] > h ? (s = 4, c = 2) : w[1] > m ? (s = 4, c = 3) : w[0] < h && (s = 3, c = 3);
      } else {
        var w = i.current[l - 1], v = i.current[l + 1];
        w[0] < h && v[0] > h || v[0] < h && w[0] > h ? (s = 1, c = 0) : w[0] < h && v[1] > m || v[0] < h && w[1] > m ? (s = 2, c = 0) : w[1] < m && v[1] > m || v[1] < m && w[1] > m ? (s = 2, c = 1) : w[1] < m && v[0] < h || v[1] < m && w[0] < h ? (s = 2, c = 2) : w[0] > h && v[1] < m || v[0] > h && w[1] < m ? (s = 0, c = 1) : w[1] > m && v[0] > h || v[1] > m && w[0] > h ? (s = 0, c = 0) : (s = 1, c = 0);
      }
      var X = [0, 0];
      p.drawImage(P.current, s * 64, c * 64, 64, 64, i.current[l][0] + X[0], i.current[l][1] + X[1], u, u);
    }
  }, W = () => {
    const p = D.current.getContext("2d");
    p.clearRect(0, 0, p.canvas.width, p.canvas.height), p.textAlign = "center", p.font = "20px Georgia", p.fillStyle = "white", _.current.forEach(([l, s]) => {
      p.drawImage(P.current, 0 * 64, 3 * 64, 64, 64, s[0], s[1], u, u), p.fillText(l, s[0] + u / 2, s[1] + u);
    }), p.drawImage(P.current, 1 * 64, 3 * 64, 64, 64, d.current[0], d.current[1], u * 2, u * 2), p.fillText("Next Map", d.current[0] + u, d.current[1] + 64);
  }, ce = () => {
    console.log("gameLoop"), se(), T();
  };
  return O(() => {
    V(!1);
  }, [n]), O(() => {
    console.log("setup"), (async () => {
      try {
        const s = await le(/* @__PURE__ */ Object.assign({ "../image_importers/desertImages.js": () => import("./desertImages-CIneN81N.js"), "../image_importers/forestImages.js": () => import("./forestImages-My2q2rGl.js"), "../image_importers/mapImages.js": () => import("./mapImages-BClUnFAK.js") }), `../image_importers/${n}.js`, 3);
        o(s.default);
      } catch {
        console.error("Failed to dynamically load component");
      }
    })(), _.current = [
      ["protanopia", [0.3, 0.3]],
      ["achromatopsia", [0.4, 0.35]],
      ["deuteranopia", [0.4, 0.45]],
      ["tritanopia", [0.4, 0.55]],
      ["normal", [0.4, 0.65]]
    ], _.current.forEach((s) => {
      s[1][0] *= L.current.offsetWidth, s[1][1] *= L.current.offsetHeight;
    }), i.current = [
      [Math.round(window.innerWidth / 2), Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - u, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - u * 2, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - u * 3, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - u * 4, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - u * 5, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - u * 6, Math.round(window.innerHeight / 2)]
    ];
    const p = new Image();
    p.src = te.normal, k.current = p, d.current = [
      Math.floor(Math.random() * (document.documentElement.offsetWidth - 64 * 2 - 64 * 2 + 1)) + 64 * 2,
      Math.ceil(document.documentElement.offsetHeight * 0.9)
    ];
    const l = () => {
      const s = S.current, c = D.current, b = L.current;
      s.width = Math.min(window.innerWidth, 1920), s.height = window.innerHeight, c.width = b.offsetWidth, c.height = b.offsetHeight, ie(window.innerWidth <= 768), T(), W();
    };
    return l(), T(), W(), window.addEventListener("resize", l), window.addEventListener("keydown", $), () => {
      window.removeEventListener("resize", l), window.removeEventListener("keydown", $);
    };
  }, [G, n]), O(() => {
    console.log("snakesprite");
    const f = P.current;
    f.src = k.current.src, f.onload = () => {
      W(), T();
    };
  }, [k.current]), /* @__PURE__ */ K("div", { ref: L, className: N.snakeGame, children: [
    !G && /* @__PURE__ */ g(Me, {}),
    /* @__PURE__ */ g("img", { src: "", hidden: !0, style: { position: "fixed" }, ref: P }),
    /* @__PURE__ */ g("canvas", { className: N.mapCanvas, ref: D }),
    /* @__PURE__ */ g("canvas", { className: N.snakeCanvas, ref: S }),
    e && /* @__PURE__ */ K(pe, { children: [
      /* @__PURE__ */ g(F, { src: e.normal, hidden: z.normal, alt: "normal", onLoad: A }),
      /* @__PURE__ */ g(F, { src: e.achromatopsia, hidden: z.achromatopsia, alt: "achromatopsia", onLoad: A }),
      /* @__PURE__ */ g(F, { src: e.deuteranopia, hidden: z.deuteranopia, alt: "deuteranopia", onLoad: A }),
      /* @__PURE__ */ g(F, { src: e.protanopia, hidden: z.protanopia, alt: "protanopia", onLoad: A }),
      /* @__PURE__ */ g(F, { src: e.tritanopia, hidden: z.tritanopia, alt: "tritanopia", onLoad: A })
    ] }),
    oe && /* @__PURE__ */ g(ke, { onDirectionChange: $ })
  ] });
}, Ee = () => {
  const [n, r] = C(0), [t, e] = C(0);
  return console.log(t), /* @__PURE__ */ K("div", { children: [
    /* @__PURE__ */ g("span", { style: { position: "fixed", zIndex: 999, top: 0, backgroundColor: "white" }, children: t }),
    /* @__PURE__ */ g(De, { mapImporterName: {
      0: "forestImages",
      1: "desertImages"
    }[n], nextMap: () => r(n + 1), addScore: () => e((i) => i + 1) })
  ] });
};
export {
  Ee as default
};
