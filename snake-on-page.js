import { jsx as b, jsxs as me, Fragment as Ne } from "react/jsx-runtime";
import J, { useEffect as lt, useRef as w, useState as B, useMemo as eo } from "react";
const oo = "/snake_sprite/snake-graphics.png", ro = "/snake_sprite/snake-graphics_achromatopsia.png", io = "/snake_sprite/snake-graphics_deuteranopia.png", no = "/snake_sprite/snake-graphics_protanopia.png", so = "/snake_sprite/snake-graphics_tritanopia.png", ke = {
  normal: oo,
  achromatopsia: ro,
  deuteranopia: io,
  protanopia: no,
  tritanopia: so
};
function ot({ src: r, alt: i, hidden: e, onLoad: t }) {
  return lt(() => {
    const o = new Image();
    return o.src = r, o.onload = () => {
      t();
    }, () => {
      o.onload = null;
    };
  }, [r]), /* @__PURE__ */ b("img", { src: r, alt: i, hidden: e });
}
var zt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ge = {}, At = {}, dt = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = void 0, function(i) {
    i.Circle = "circle", i.Square = "square", i.AxisY = "axisY", i.AxisX = "axisX";
  }(r.JoystickShape || (r.JoystickShape = {}));
})(dt);
var Ft = {};
Object.defineProperty(Ft, "__esModule", { value: !0 });
Ft.shapeFactory = void 0;
var we = dt, ao = function(r, i) {
  switch (r) {
    case we.JoystickShape.Square:
      return {
        borderRadius: Math.sqrt(i)
      };
    case we.JoystickShape.Circle:
    default:
      return {
        borderRadius: i
      };
  }
};
Ft.shapeFactory = ao;
var Yt = {};
Object.defineProperty(Yt, "__esModule", { value: !0 });
Yt.shapeBoundsFactory = void 0;
var ue = dt, po = function(r, i, e, t, o, n, p, s, a) {
  switch (r) {
    case ue.JoystickShape.Square:
      return t = kt(i - a.left - s / 2, s), o = kt(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    case ue.JoystickShape.AxisX:
      return t = kt(i - a.left - s / 2, s), o = 0, { relativeX: t, relativeY: o };
    case ue.JoystickShape.AxisY:
      return t = 0, o = kt(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    default:
      return n > p && (t *= p / n, o *= p / n), { relativeX: t, relativeY: o };
  }
};
Yt.shapeBoundsFactory = po;
var kt = function(r, i) {
  var e = i / 2;
  return r > e ? e : r < -e ? e * -1 : r;
}, co = zt && zt.__extends || /* @__PURE__ */ function() {
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
}(), W = zt && zt.__assign || function() {
  return W = Object.assign || function(r) {
    for (var i, e = 1, t = arguments.length; e < t; e++) {
      i = arguments[e];
      for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (r[o] = i[o]);
    }
    return r;
  }, W.apply(this, arguments);
};
Object.defineProperty(At, "__esModule", { value: !0 });
At.Joystick = void 0;
var rt = J, Re = dt, Me = Ft, uo = Yt, M;
(function(r) {
  r.PointerDown = "pointerdown", r.PointerMove = "pointermove", r.PointerUp = "pointerup";
})(M || (M = {}));
var T;
(function(r) {
  r[r.TopRight = 2.35619449] = "TopRight", r[r.TopLeft = -2.35619449] = "TopLeft", r[r.BottomRight = 0.785398163] = "BottomRight", r[r.BottomLeft = -0.785398163] = "BottomLeft";
})(T || (T = {}));
var lo = (
  /** @class */
  function(r) {
    co(i, r);
    function i(e) {
      var t = r.call(this, e) || this;
      return t._stickRef = rt.createRef(), t._baseRef = rt.createRef(), t.frameId = null, t._pointerId = null, t._mounted = !1, t._pointerMove = function(o) {
        if (o.preventDefault(), t.state.dragging) {
          if (!t.props.followCursor && o.pointerId !== t._pointerId)
            return;
          var n = o.clientX, p = o.clientY, s = n - t._parentRect.left - t._radius, a = p - t._parentRect.top - t._radius, l = t._distance(s, a), u = (0, uo.shapeBoundsFactory)(
            //@ts-ignore
            t.props.controlPlaneShape || t.props.baseShape,
            n,
            p,
            s,
            a,
            l,
            t._radius,
            t._baseSize,
            t._parentRect
          );
          s = u.relativeX, a = u.relativeY;
          var y = Math.atan2(s, a);
          t._updatePos({
            relativeX: s,
            relativeY: a,
            distance: t._distanceToPercentile(l),
            direction: t._getDirection(y),
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
      return e > T.TopRight || e < T.TopLeft ? "FORWARD" : e < T.TopRight && e > T.BottomRight ? "RIGHT" : e < T.BottomLeft ? "LEFT" : "BACKWARD";
    }, i.prototype._distance = function(e, t) {
      return Math.hypot(e, t);
    }, i.prototype._distanceToPercentile = function(e) {
      var t = e / (this._baseSize / 2) * 100;
      return t > 100 ? 100 : t;
    }, i.prototype.getBaseShapeStyle = function() {
      var e = this.props.baseShape || Re.JoystickShape.Circle;
      return (0, Me.shapeFactory)(e, this._baseSize);
    }, i.prototype.getStickShapeStyle = function() {
      var e = this.props.stickShape || Re.JoystickShape.Circle;
      return (0, Me.shapeFactory)(e, this._baseSize);
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
      return rt.createElement(
        "div",
        { "data-testid": "joystick-base", className: this.props.disabled ? "joystick-base-disabled" : "", ref: this._baseRef, style: t },
        rt.createElement("button", { ref: this._stickRef, disabled: this.props.disabled, onPointerDown: function(n) {
          return e._pointerDown(n);
        }, className: this.props.disabled ? "joystick-disabled" : "", style: o })
      );
    }, i;
  }(rt.Component)
);
At.Joystick = lo;
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = r.Joystick = void 0;
  var i = At;
  Object.defineProperty(r, "Joystick", { enumerable: !0, get: function() {
    return i.Joystick;
  } });
  var e = dt;
  Object.defineProperty(r, "JoystickShape", { enumerable: !0, get: function() {
    return e.JoystickShape;
  } });
})(Ge);
const ho = ({ onDirectionChange: r }) => {
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
  return lt(() => {
    let a;
    const l = (u) => {
      u - n.current >= e && (t.current != null && r(t.current), n.current = u), a = window.requestAnimationFrame(l);
    };
    return l(), () => {
      window.cancelAnimationFrame(a);
    };
  }, []), /* @__PURE__ */ b("div", { style: i, children: /* @__PURE__ */ b(Ge.Joystick, { ref: o, minDistance: 50, move: p, stop: s }) });
}, fo = (r, i, e) => {
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
}, vo = "_snakeGame_2cqgw_5", _o = "_snakeCanvas_2cqgw_15", yo = "_mapCanvas_2cqgw_23", le = {
  snakeGame: vo,
  snakeCanvas: _o,
  mapCanvas: yo
}, go = "_loadingDiv_dcsfs_1", mo = {
  loadingDiv: go
}, bo = () => /* @__PURE__ */ b("div", { className: mo.loadingDiv, children: /* @__PURE__ */ b("h1", { children: "Loading..." }) }), So = ({ mapImporterName: r, nextMap: i, addScore: e }) => {
  const [t, o] = B(""), n = w(), p = w(), s = w(), a = w("right"), l = w(), u = w(), y = w(), [q, Ke] = B("normal"), [pe, be] = B(!1), U = w(), Q = w(), [$e, Ve] = B(!1), [f, lr] = B(30), tt = Ze(5, () => {
    console.log(pe), be(!0), console.log("loaded");
  });
  function Ze(_, h) {
    let v = 0;
    return function(...c) {
      v = v + 1, _ === v && h(...c);
    };
  }
  const et = eo(() => ({
    normal: q !== "normal",
    achromatopsia: q !== "achromatopsia",
    deuteranopia: q !== "deuteranopia",
    protanopia: q !== "protanopia",
    tritanopia: q !== "tritanopia"
  }), [q]), ce = (_) => {
    if (typeof _ == "object") {
      const h = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down"
      };
      if (h[_.key] == "right" && a.current != "left")
        a.current = "right";
      else if (h[_.key] == "left" && a.current != "right")
        a.current = "left";
      else if (h[_.key] == "up" && a.current != "down")
        a.current = "up";
      else if (h[_.key] == "down" && a.current != "up")
        a.current = "down";
      else if (_.key == "m")
        e(), console.log(e);
      else {
        console.log(_.key);
        return;
      }
    } else if (_ == "RIGHT" && a.current != "left")
      a.current = "right";
    else if (_ == "LEFT" && a.current != "right")
      a.current = "left";
    else if (_ == "FORWARD" && a.current != "down")
      a.current = "up";
    else if (_ == "BACKWARD" && a.current != "up")
      a.current = "down";
    else
      return;
    to();
  }, Qe = () => {
    const _ = {
      right: [1, 0],
      left: [-1, 0],
      up: [0, -1],
      down: [0, 1]
    };
    n.current.unshift(
      [
        n.current[0][0] + _[a.current][0] * f,
        n.current[0][1] + _[a.current][1] * f
      ]
    ), n.current[0][0] < 0 ? n.current[0][0] = window.innerWidth : n.current[0][0] > window.innerWidth && (n.current[0][0] = 0);
    const h = s.current;
    Math.abs(n.current[0][0] - h[0]) < f && Math.abs(n.current[0][1] + scrollY - h[1]) < f && (console.log("==========================tunnel"), i());
    const v = p.current;
    let c = !1;
    for (let d = 0; d < v.length; d++) {
      const [R, g] = v[d];
      if (Math.abs(n.current[0][0] - g[0]) < f * 0.75 && Math.abs(n.current[0][1] + scrollY - g[1]) < f * 0.75) {
        console.log("==========================eaten"), e(), c = !0, p.current.splice(d, 1), St();
        const m = new Image();
        m.src = ke[R], u.current = m, Ke(R), d--;
      }
    }
    c || n.current.pop(), console.log(window.innerHeight + window.scrollY, U.current.offsetHeight), a.current == "down" ? (window.innerHeight + window.scrollY < U.current.offsetHeight - f && n.current.forEach((d) => d[1] -= f), scrollBy(0, f + 1)) : a.current == "up" && (window.scrollY > 0 && n.current.forEach((d) => d[1] += f), scrollBy(0, -f + 1));
  }, bt = () => {
    const h = l.current.getContext("2d");
    h.clearRect(0, 0, h.canvas.width, h.canvas.height);
    for (var v = 0; v < n.current.length; v++) {
      var c = 0, d = 0, R = n.current[v], g = R[0], m = R[1];
      if (v == 0) {
        var S = n.current[v + 1];
        m < S[1] ? (c = 3, d = 0) : g > S[0] ? (c = 4, d = 0) : m > S[1] ? (c = 4, d = 1) : g < S[0] && (c = 3, d = 1);
      } else if (v == n.current.length - 1) {
        var k = n.current[v - 1];
        k[1] < m ? (c = 3, d = 2) : k[0] > g ? (c = 4, d = 2) : k[1] > m ? (c = 4, d = 3) : k[0] < g && (c = 3, d = 3);
      } else {
        var k = n.current[v - 1], S = n.current[v + 1];
        k[0] < g && S[0] > g || S[0] < g && k[0] > g ? (c = 1, d = 0) : k[0] < g && S[1] > m || S[0] < g && k[1] > m ? (c = 2, d = 0) : k[1] < m && S[1] > m || S[1] < m && k[1] > m ? (c = 2, d = 1) : k[1] < m && S[0] < g || S[1] < m && k[0] < g ? (c = 2, d = 2) : k[0] > g && S[1] < m || S[0] > g && k[1] < m ? (c = 0, d = 1) : k[1] > m && S[0] > g || S[1] > m && k[0] > g ? (c = 0, d = 0) : (c = 1, d = 0);
      }
      var Se = [0, 0];
      h.drawImage(Q.current, c * 64, d * 64, 64, 64, n.current[v][0] + Se[0], n.current[v][1] + Se[1], f, f);
    }
  }, St = () => {
    const h = y.current.getContext("2d");
    h.clearRect(0, 0, h.canvas.width, h.canvas.height), h.textAlign = "center", h.font = "20px Georgia", h.fillStyle = "white", p.current.forEach(([v, c]) => {
      h.drawImage(Q.current, 0 * 64, 3 * 64, 64, 64, c[0], c[1], f, f), h.fillText(v, c[0] + f / 2, c[1] + f);
    }), h.drawImage(Q.current, 1 * 64, 3 * 64, 64, 64, s.current[0], s.current[1], f * 2, f * 2), h.fillText("Next Map", s.current[0] + f, s.current[1] + 64);
  }, to = () => {
    console.log("gameLoop"), Qe(), bt();
  };
  return lt(() => {
    be(!1);
  }, [r]), lt(() => {
    console.log("setup"), (async () => {
      try {
        const c = await fo(/* @__PURE__ */ Object.assign({ "../image_importers/desertImages.js": () => import("./desertImages-CIneN81N.js"), "../image_importers/forestImages.js": () => import("./forestImages-My2q2rGl.js"), "../image_importers/mapImages.js": () => import("./mapImages-BClUnFAK.js") }), `../image_importers/${r}.js`, 3);
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
      c[1][0] *= U.current.offsetWidth, c[1][1] *= U.current.offsetHeight;
    }), n.current = [
      [Math.round(window.innerWidth / 2), Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - f, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - f * 2, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - f * 3, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - f * 4, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - f * 5, Math.round(window.innerHeight / 2)],
      [Math.round(window.innerWidth / 2) - f * 6, Math.round(window.innerHeight / 2)]
    ];
    const h = new Image();
    h.src = ke.normal, u.current = h, s.current = [
      Math.floor(Math.random() * (document.documentElement.offsetWidth - 64 * 2 - 64 * 2 + 1)) + 64 * 2,
      Math.ceil(document.documentElement.offsetHeight * 0.9)
    ];
    const v = () => {
      const c = l.current, d = y.current, R = U.current;
      c.width = Math.min(window.innerWidth, 1920), c.height = window.innerHeight, d.width = R.offsetWidth, d.height = R.offsetHeight, Ve(window.innerWidth <= 768), bt(), St();
    };
    return v(), bt(), St(), window.addEventListener("resize", v), window.addEventListener("keydown", ce), () => {
      window.removeEventListener("resize", v), window.removeEventListener("keydown", ce);
    };
  }, [pe, r]), lt(() => {
    console.log("snakesprite");
    const _ = Q.current;
    _.src = u.current.src, _.onload = () => {
      St(), bt();
    };
  }, [u.current]), /* @__PURE__ */ me("div", { ref: U, className: le.snakeGame, children: [
    !pe && /* @__PURE__ */ b(bo, {}),
    /* @__PURE__ */ b("img", { src: "", hidden: !0, style: { position: "fixed" }, ref: Q }),
    /* @__PURE__ */ b("canvas", { className: le.mapCanvas, ref: y }),
    /* @__PURE__ */ b("canvas", { className: le.snakeCanvas, ref: l }),
    t && /* @__PURE__ */ me(Ne, { children: [
      /* @__PURE__ */ b(ot, { src: t.normal, hidden: et.normal, alt: "normal", onLoad: tt }),
      /* @__PURE__ */ b(ot, { src: t.achromatopsia, hidden: et.achromatopsia, alt: "achromatopsia", onLoad: tt }),
      /* @__PURE__ */ b(ot, { src: t.deuteranopia, hidden: et.deuteranopia, alt: "deuteranopia", onLoad: tt }),
      /* @__PURE__ */ b(ot, { src: t.protanopia, hidden: et.protanopia, alt: "protanopia", onLoad: tt }),
      /* @__PURE__ */ b(ot, { src: t.tritanopia, hidden: et.tritanopia, alt: "tritanopia", onLoad: tt })
    ] }),
    $e && /* @__PURE__ */ b(ho, { onDirectionChange: ce })
  ] });
}, ko = () => {
  const [r, i] = B(0), [e, t] = B(0);
  return console.log(e), /* @__PURE__ */ me("div", { children: [
    /* @__PURE__ */ b("span", { style: { position: "fixed", zIndex: 999, top: 0, backgroundColor: "white" }, children: e }),
    /* @__PURE__ */ b(So, { mapImporterName: {
      0: "forestImages",
      1: "desertImages"
    }[r], nextMap: () => i(r + 1), addScore: () => t((n) => n + 1) })
  ] });
};
var jt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, wo = {}, Xt = {}, ht = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = void 0, function(i) {
    i.Circle = "circle", i.Square = "square", i.AxisY = "axisY", i.AxisX = "axisX";
  }(r.JoystickShape || (r.JoystickShape = {}));
})(ht);
var Et = {};
Object.defineProperty(Et, "__esModule", { value: !0 });
Et.shapeFactory = void 0;
var Pe = ht, Ro = function(r, i) {
  switch (r) {
    case Pe.JoystickShape.Square:
      return {
        borderRadius: Math.sqrt(i)
      };
    case Pe.JoystickShape.Circle:
    default:
      return {
        borderRadius: i
      };
  }
};
Et.shapeFactory = Ro;
var qt = {};
Object.defineProperty(qt, "__esModule", { value: !0 });
qt.shapeBoundsFactory = void 0;
var de = ht, Mo = function(r, i, e, t, o, n, p, s, a) {
  switch (r) {
    case de.JoystickShape.Square:
      return t = wt(i - a.left - s / 2, s), o = wt(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    case de.JoystickShape.AxisX:
      return t = wt(i - a.left - s / 2, s), o = 0, { relativeX: t, relativeY: o };
    case de.JoystickShape.AxisY:
      return t = 0, o = wt(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    default:
      return n > p && (t *= p / n, o *= p / n), { relativeX: t, relativeY: o };
  }
};
qt.shapeBoundsFactory = Mo;
var wt = function(r, i) {
  var e = i / 2;
  return r > e ? e : r < -e ? e * -1 : r;
}, Po = jt && jt.__extends || /* @__PURE__ */ function() {
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
}(), H = jt && jt.__assign || function() {
  return H = Object.assign || function(r) {
    for (var i, e = 1, t = arguments.length; e < t; e++) {
      i = arguments[e];
      for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (r[o] = i[o]);
    }
    return r;
  }, H.apply(this, arguments);
};
Object.defineProperty(Xt, "__esModule", { value: !0 });
Xt.Joystick = void 0;
var it = J, Ce = ht, Ie = Et, Co = qt, P;
(function(r) {
  r.PointerDown = "pointerdown", r.PointerMove = "pointermove", r.PointerUp = "pointerup";
})(P || (P = {}));
var D;
(function(r) {
  r[r.TopRight = 2.35619449] = "TopRight", r[r.TopLeft = -2.35619449] = "TopLeft", r[r.BottomRight = 0.785398163] = "BottomRight", r[r.BottomLeft = -0.785398163] = "BottomLeft";
})(D || (D = {}));
var Io = (
  /** @class */
  function(r) {
    Po(i, r);
    function i(e) {
      var t = r.call(this, e) || this;
      return t._stickRef = it.createRef(), t._baseRef = it.createRef(), t.frameId = null, t._pointerId = null, t._mounted = !1, t._pointerMove = function(o) {
        if (o.preventDefault(), t.state.dragging) {
          if (!t.props.followCursor && o.pointerId !== t._pointerId)
            return;
          var n = o.clientX, p = o.clientY, s = n - t._parentRect.left - t._radius, a = p - t._parentRect.top - t._radius, l = t._distance(s, a), u = (0, Co.shapeBoundsFactory)(
            //@ts-ignore
            t.props.controlPlaneShape || t.props.baseShape,
            n,
            p,
            s,
            a,
            l,
            t._radius,
            t._baseSize,
            t._parentRect
          );
          s = u.relativeX, a = u.relativeY;
          var y = Math.atan2(s, a);
          t._updatePos({
            relativeX: s,
            relativeY: a,
            distance: t._distanceToPercentile(l),
            direction: t._getDirection(y),
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
      return e > D.TopRight || e < D.TopLeft ? "FORWARD" : e < D.TopRight && e > D.BottomRight ? "RIGHT" : e < D.BottomLeft ? "LEFT" : "BACKWARD";
    }, i.prototype._distance = function(e, t) {
      return Math.hypot(e, t);
    }, i.prototype._distanceToPercentile = function(e) {
      var t = e / (this._baseSize / 2) * 100;
      return t > 100 ? 100 : t;
    }, i.prototype.getBaseShapeStyle = function() {
      var e = this.props.baseShape || Ce.JoystickShape.Circle;
      return (0, Ie.shapeFactory)(e, this._baseSize);
    }, i.prototype.getStickShapeStyle = function() {
      var e = this.props.stickShape || Ce.JoystickShape.Circle;
      return (0, Ie.shapeFactory)(e, this._baseSize);
    }, i.prototype._getBaseStyle = function() {
      var e = this.props.baseColor !== void 0 ? this.props.baseColor : "#000033", t = "".concat(this._baseSize, "px"), o = H(H({}, this.getBaseShapeStyle()), { height: t, width: t, background: e, display: "flex", justifyContent: "center", alignItems: "center" });
      return this.props.baseImage && (o.background = "url(".concat(this.props.baseImage, ")"), o.backgroundSize = "100%"), o;
    }, i.prototype._getStickStyle = function() {
      var e = this.props.stickColor !== void 0 ? this.props.stickColor : "#3D59AB", t = this._stickSize ? "".concat(this._stickSize, "px") : "".concat(this._baseSize / 1.5, "px"), o = H(H({}, this.getStickShapeStyle()), { background: e, cursor: "move", height: t, width: t, border: "none", flexShrink: 0, touchAction: "none" });
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
      return it.createElement(
        "div",
        { "data-testid": "joystick-base", className: this.props.disabled ? "joystick-base-disabled" : "", ref: this._baseRef, style: t },
        it.createElement("button", { ref: this._stickRef, disabled: this.props.disabled, onPointerDown: function(n) {
          return e._pointerDown(n);
        }, className: this.props.disabled ? "joystick-disabled" : "", style: o })
      );
    }, i;
  }(it.Component)
);
Xt.Joystick = Io;
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = r.Joystick = void 0;
  var i = Xt;
  Object.defineProperty(r, "Joystick", { enumerable: !0, get: function() {
    return i.Joystick;
  } });
  var e = ht;
  Object.defineProperty(r, "JoystickShape", { enumerable: !0, get: function() {
    return e.JoystickShape;
  } });
})(wo);
var Ot = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, xo = {}, Ut = {}, ft = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = void 0, function(i) {
    i.Circle = "circle", i.Square = "square", i.AxisY = "axisY", i.AxisX = "axisX";
  }(r.JoystickShape || (r.JoystickShape = {}));
})(ft);
var Wt = {};
Object.defineProperty(Wt, "__esModule", { value: !0 });
Wt.shapeFactory = void 0;
var xe = ft, zo = function(r, i) {
  switch (r) {
    case xe.JoystickShape.Square:
      return {
        borderRadius: Math.sqrt(i)
      };
    case xe.JoystickShape.Circle:
    default:
      return {
        borderRadius: i
      };
  }
};
Wt.shapeFactory = zo;
var Ht = {};
Object.defineProperty(Ht, "__esModule", { value: !0 });
Ht.shapeBoundsFactory = void 0;
var he = ft, jo = function(r, i, e, t, o, n, p, s, a) {
  switch (r) {
    case he.JoystickShape.Square:
      return t = Rt(i - a.left - s / 2, s), o = Rt(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    case he.JoystickShape.AxisX:
      return t = Rt(i - a.left - s / 2, s), o = 0, { relativeX: t, relativeY: o };
    case he.JoystickShape.AxisY:
      return t = 0, o = Rt(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    default:
      return n > p && (t *= p / n, o *= p / n), { relativeX: t, relativeY: o };
  }
};
Ht.shapeBoundsFactory = jo;
var Rt = function(r, i) {
  var e = i / 2;
  return r > e ? e : r < -e ? e * -1 : r;
}, Oo = Ot && Ot.__extends || /* @__PURE__ */ function() {
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
}(), N = Ot && Ot.__assign || function() {
  return N = Object.assign || function(r) {
    for (var i, e = 1, t = arguments.length; e < t; e++) {
      i = arguments[e];
      for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (r[o] = i[o]);
    }
    return r;
  }, N.apply(this, arguments);
};
Object.defineProperty(Ut, "__esModule", { value: !0 });
Ut.Joystick = void 0;
var nt = J, ze = ft, je = Wt, Jo = Ht, C;
(function(r) {
  r.PointerDown = "pointerdown", r.PointerMove = "pointermove", r.PointerUp = "pointerup";
})(C || (C = {}));
var L;
(function(r) {
  r[r.TopRight = 2.35619449] = "TopRight", r[r.TopLeft = -2.35619449] = "TopLeft", r[r.BottomRight = 0.785398163] = "BottomRight", r[r.BottomLeft = -0.785398163] = "BottomLeft";
})(L || (L = {}));
var Bo = (
  /** @class */
  function(r) {
    Oo(i, r);
    function i(e) {
      var t = r.call(this, e) || this;
      return t._stickRef = nt.createRef(), t._baseRef = nt.createRef(), t.frameId = null, t._pointerId = null, t._mounted = !1, t._pointerMove = function(o) {
        if (o.preventDefault(), t.state.dragging) {
          if (!t.props.followCursor && o.pointerId !== t._pointerId)
            return;
          var n = o.clientX, p = o.clientY, s = n - t._parentRect.left - t._radius, a = p - t._parentRect.top - t._radius, l = t._distance(s, a), u = (0, Jo.shapeBoundsFactory)(
            //@ts-ignore
            t.props.controlPlaneShape || t.props.baseShape,
            n,
            p,
            s,
            a,
            l,
            t._radius,
            t._baseSize,
            t._parentRect
          );
          s = u.relativeX, a = u.relativeY;
          var y = Math.atan2(s, a);
          t._updatePos({
            relativeX: s,
            relativeY: a,
            distance: t._distanceToPercentile(l),
            direction: t._getDirection(y),
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
      return e > L.TopRight || e < L.TopLeft ? "FORWARD" : e < L.TopRight && e > L.BottomRight ? "RIGHT" : e < L.BottomLeft ? "LEFT" : "BACKWARD";
    }, i.prototype._distance = function(e, t) {
      return Math.hypot(e, t);
    }, i.prototype._distanceToPercentile = function(e) {
      var t = e / (this._baseSize / 2) * 100;
      return t > 100 ? 100 : t;
    }, i.prototype.getBaseShapeStyle = function() {
      var e = this.props.baseShape || ze.JoystickShape.Circle;
      return (0, je.shapeFactory)(e, this._baseSize);
    }, i.prototype.getStickShapeStyle = function() {
      var e = this.props.stickShape || ze.JoystickShape.Circle;
      return (0, je.shapeFactory)(e, this._baseSize);
    }, i.prototype._getBaseStyle = function() {
      var e = this.props.baseColor !== void 0 ? this.props.baseColor : "#000033", t = "".concat(this._baseSize, "px"), o = N(N({}, this.getBaseShapeStyle()), { height: t, width: t, background: e, display: "flex", justifyContent: "center", alignItems: "center" });
      return this.props.baseImage && (o.background = "url(".concat(this.props.baseImage, ")"), o.backgroundSize = "100%"), o;
    }, i.prototype._getStickStyle = function() {
      var e = this.props.stickColor !== void 0 ? this.props.stickColor : "#3D59AB", t = this._stickSize ? "".concat(this._stickSize, "px") : "".concat(this._baseSize / 1.5, "px"), o = N(N({}, this.getStickShapeStyle()), { background: e, cursor: "move", height: t, width: t, border: "none", flexShrink: 0, touchAction: "none" });
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
      return nt.createElement(
        "div",
        { "data-testid": "joystick-base", className: this.props.disabled ? "joystick-base-disabled" : "", ref: this._baseRef, style: t },
        nt.createElement("button", { ref: this._stickRef, disabled: this.props.disabled, onPointerDown: function(n) {
          return e._pointerDown(n);
        }, className: this.props.disabled ? "joystick-disabled" : "", style: o })
      );
    }, i;
  }(nt.Component)
);
Ut.Joystick = Bo;
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = r.Joystick = void 0;
  var i = Ut;
  Object.defineProperty(r, "Joystick", { enumerable: !0, get: function() {
    return i.Joystick;
  } });
  var e = ft;
  Object.defineProperty(r, "JoystickShape", { enumerable: !0, get: function() {
    return e.JoystickShape;
  } });
})(xo);
var Jt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, To = {}, Nt = {}, vt = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = void 0, function(i) {
    i.Circle = "circle", i.Square = "square", i.AxisY = "axisY", i.AxisX = "axisX";
  }(r.JoystickShape || (r.JoystickShape = {}));
})(vt);
var Gt = {};
Object.defineProperty(Gt, "__esModule", { value: !0 });
Gt.shapeFactory = void 0;
var Oe = vt, Do = function(r, i) {
  switch (r) {
    case Oe.JoystickShape.Square:
      return {
        borderRadius: Math.sqrt(i)
      };
    case Oe.JoystickShape.Circle:
    default:
      return {
        borderRadius: i
      };
  }
};
Gt.shapeFactory = Do;
var Kt = {};
Object.defineProperty(Kt, "__esModule", { value: !0 });
Kt.shapeBoundsFactory = void 0;
var fe = vt, Lo = function(r, i, e, t, o, n, p, s, a) {
  switch (r) {
    case fe.JoystickShape.Square:
      return t = Mt(i - a.left - s / 2, s), o = Mt(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    case fe.JoystickShape.AxisX:
      return t = Mt(i - a.left - s / 2, s), o = 0, { relativeX: t, relativeY: o };
    case fe.JoystickShape.AxisY:
      return t = 0, o = Mt(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    default:
      return n > p && (t *= p / n, o *= p / n), { relativeX: t, relativeY: o };
  }
};
Kt.shapeBoundsFactory = Lo;
var Mt = function(r, i) {
  var e = i / 2;
  return r > e ? e : r < -e ? e * -1 : r;
}, Ao = Jt && Jt.__extends || /* @__PURE__ */ function() {
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
}(), G = Jt && Jt.__assign || function() {
  return G = Object.assign || function(r) {
    for (var i, e = 1, t = arguments.length; e < t; e++) {
      i = arguments[e];
      for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (r[o] = i[o]);
    }
    return r;
  }, G.apply(this, arguments);
};
Object.defineProperty(Nt, "__esModule", { value: !0 });
Nt.Joystick = void 0;
var st = J, Je = vt, Be = Gt, Fo = Kt, I;
(function(r) {
  r.PointerDown = "pointerdown", r.PointerMove = "pointermove", r.PointerUp = "pointerup";
})(I || (I = {}));
var A;
(function(r) {
  r[r.TopRight = 2.35619449] = "TopRight", r[r.TopLeft = -2.35619449] = "TopLeft", r[r.BottomRight = 0.785398163] = "BottomRight", r[r.BottomLeft = -0.785398163] = "BottomLeft";
})(A || (A = {}));
var Yo = (
  /** @class */
  function(r) {
    Ao(i, r);
    function i(e) {
      var t = r.call(this, e) || this;
      return t._stickRef = st.createRef(), t._baseRef = st.createRef(), t.frameId = null, t._pointerId = null, t._mounted = !1, t._pointerMove = function(o) {
        if (o.preventDefault(), t.state.dragging) {
          if (!t.props.followCursor && o.pointerId !== t._pointerId)
            return;
          var n = o.clientX, p = o.clientY, s = n - t._parentRect.left - t._radius, a = p - t._parentRect.top - t._radius, l = t._distance(s, a), u = (0, Fo.shapeBoundsFactory)(
            //@ts-ignore
            t.props.controlPlaneShape || t.props.baseShape,
            n,
            p,
            s,
            a,
            l,
            t._radius,
            t._baseSize,
            t._parentRect
          );
          s = u.relativeX, a = u.relativeY;
          var y = Math.atan2(s, a);
          t._updatePos({
            relativeX: s,
            relativeY: a,
            distance: t._distanceToPercentile(l),
            direction: t._getDirection(y),
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
      return e > A.TopRight || e < A.TopLeft ? "FORWARD" : e < A.TopRight && e > A.BottomRight ? "RIGHT" : e < A.BottomLeft ? "LEFT" : "BACKWARD";
    }, i.prototype._distance = function(e, t) {
      return Math.hypot(e, t);
    }, i.prototype._distanceToPercentile = function(e) {
      var t = e / (this._baseSize / 2) * 100;
      return t > 100 ? 100 : t;
    }, i.prototype.getBaseShapeStyle = function() {
      var e = this.props.baseShape || Je.JoystickShape.Circle;
      return (0, Be.shapeFactory)(e, this._baseSize);
    }, i.prototype.getStickShapeStyle = function() {
      var e = this.props.stickShape || Je.JoystickShape.Circle;
      return (0, Be.shapeFactory)(e, this._baseSize);
    }, i.prototype._getBaseStyle = function() {
      var e = this.props.baseColor !== void 0 ? this.props.baseColor : "#000033", t = "".concat(this._baseSize, "px"), o = G(G({}, this.getBaseShapeStyle()), { height: t, width: t, background: e, display: "flex", justifyContent: "center", alignItems: "center" });
      return this.props.baseImage && (o.background = "url(".concat(this.props.baseImage, ")"), o.backgroundSize = "100%"), o;
    }, i.prototype._getStickStyle = function() {
      var e = this.props.stickColor !== void 0 ? this.props.stickColor : "#3D59AB", t = this._stickSize ? "".concat(this._stickSize, "px") : "".concat(this._baseSize / 1.5, "px"), o = G(G({}, this.getStickShapeStyle()), { background: e, cursor: "move", height: t, width: t, border: "none", flexShrink: 0, touchAction: "none" });
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
      return st.createElement(
        "div",
        { "data-testid": "joystick-base", className: this.props.disabled ? "joystick-base-disabled" : "", ref: this._baseRef, style: t },
        st.createElement("button", { ref: this._stickRef, disabled: this.props.disabled, onPointerDown: function(n) {
          return e._pointerDown(n);
        }, className: this.props.disabled ? "joystick-disabled" : "", style: o })
      );
    }, i;
  }(st.Component)
);
Nt.Joystick = Yo;
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = r.Joystick = void 0;
  var i = Nt;
  Object.defineProperty(r, "Joystick", { enumerable: !0, get: function() {
    return i.Joystick;
  } });
  var e = vt;
  Object.defineProperty(r, "JoystickShape", { enumerable: !0, get: function() {
    return e.JoystickShape;
  } });
})(To);
var Bt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Xo = {}, $t = {}, _t = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = void 0, function(i) {
    i.Circle = "circle", i.Square = "square", i.AxisY = "axisY", i.AxisX = "axisX";
  }(r.JoystickShape || (r.JoystickShape = {}));
})(_t);
var Vt = {};
Object.defineProperty(Vt, "__esModule", { value: !0 });
Vt.shapeFactory = void 0;
var Te = _t, Eo = function(r, i) {
  switch (r) {
    case Te.JoystickShape.Square:
      return {
        borderRadius: Math.sqrt(i)
      };
    case Te.JoystickShape.Circle:
    default:
      return {
        borderRadius: i
      };
  }
};
Vt.shapeFactory = Eo;
var Zt = {};
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.shapeBoundsFactory = void 0;
var ve = _t, qo = function(r, i, e, t, o, n, p, s, a) {
  switch (r) {
    case ve.JoystickShape.Square:
      return t = Pt(i - a.left - s / 2, s), o = Pt(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    case ve.JoystickShape.AxisX:
      return t = Pt(i - a.left - s / 2, s), o = 0, { relativeX: t, relativeY: o };
    case ve.JoystickShape.AxisY:
      return t = 0, o = Pt(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    default:
      return n > p && (t *= p / n, o *= p / n), { relativeX: t, relativeY: o };
  }
};
Zt.shapeBoundsFactory = qo;
var Pt = function(r, i) {
  var e = i / 2;
  return r > e ? e : r < -e ? e * -1 : r;
}, Uo = Bt && Bt.__extends || /* @__PURE__ */ function() {
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
}(), K = Bt && Bt.__assign || function() {
  return K = Object.assign || function(r) {
    for (var i, e = 1, t = arguments.length; e < t; e++) {
      i = arguments[e];
      for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (r[o] = i[o]);
    }
    return r;
  }, K.apply(this, arguments);
};
Object.defineProperty($t, "__esModule", { value: !0 });
$t.Joystick = void 0;
var at = J, De = _t, Le = Vt, Wo = Zt, x;
(function(r) {
  r.PointerDown = "pointerdown", r.PointerMove = "pointermove", r.PointerUp = "pointerup";
})(x || (x = {}));
var F;
(function(r) {
  r[r.TopRight = 2.35619449] = "TopRight", r[r.TopLeft = -2.35619449] = "TopLeft", r[r.BottomRight = 0.785398163] = "BottomRight", r[r.BottomLeft = -0.785398163] = "BottomLeft";
})(F || (F = {}));
var Ho = (
  /** @class */
  function(r) {
    Uo(i, r);
    function i(e) {
      var t = r.call(this, e) || this;
      return t._stickRef = at.createRef(), t._baseRef = at.createRef(), t.frameId = null, t._pointerId = null, t._mounted = !1, t._pointerMove = function(o) {
        if (o.preventDefault(), t.state.dragging) {
          if (!t.props.followCursor && o.pointerId !== t._pointerId)
            return;
          var n = o.clientX, p = o.clientY, s = n - t._parentRect.left - t._radius, a = p - t._parentRect.top - t._radius, l = t._distance(s, a), u = (0, Wo.shapeBoundsFactory)(
            //@ts-ignore
            t.props.controlPlaneShape || t.props.baseShape,
            n,
            p,
            s,
            a,
            l,
            t._radius,
            t._baseSize,
            t._parentRect
          );
          s = u.relativeX, a = u.relativeY;
          var y = Math.atan2(s, a);
          t._updatePos({
            relativeX: s,
            relativeY: a,
            distance: t._distanceToPercentile(l),
            direction: t._getDirection(y),
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
      return e > F.TopRight || e < F.TopLeft ? "FORWARD" : e < F.TopRight && e > F.BottomRight ? "RIGHT" : e < F.BottomLeft ? "LEFT" : "BACKWARD";
    }, i.prototype._distance = function(e, t) {
      return Math.hypot(e, t);
    }, i.prototype._distanceToPercentile = function(e) {
      var t = e / (this._baseSize / 2) * 100;
      return t > 100 ? 100 : t;
    }, i.prototype.getBaseShapeStyle = function() {
      var e = this.props.baseShape || De.JoystickShape.Circle;
      return (0, Le.shapeFactory)(e, this._baseSize);
    }, i.prototype.getStickShapeStyle = function() {
      var e = this.props.stickShape || De.JoystickShape.Circle;
      return (0, Le.shapeFactory)(e, this._baseSize);
    }, i.prototype._getBaseStyle = function() {
      var e = this.props.baseColor !== void 0 ? this.props.baseColor : "#000033", t = "".concat(this._baseSize, "px"), o = K(K({}, this.getBaseShapeStyle()), { height: t, width: t, background: e, display: "flex", justifyContent: "center", alignItems: "center" });
      return this.props.baseImage && (o.background = "url(".concat(this.props.baseImage, ")"), o.backgroundSize = "100%"), o;
    }, i.prototype._getStickStyle = function() {
      var e = this.props.stickColor !== void 0 ? this.props.stickColor : "#3D59AB", t = this._stickSize ? "".concat(this._stickSize, "px") : "".concat(this._baseSize / 1.5, "px"), o = K(K({}, this.getStickShapeStyle()), { background: e, cursor: "move", height: t, width: t, border: "none", flexShrink: 0, touchAction: "none" });
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
      return at.createElement(
        "div",
        { "data-testid": "joystick-base", className: this.props.disabled ? "joystick-base-disabled" : "", ref: this._baseRef, style: t },
        at.createElement("button", { ref: this._stickRef, disabled: this.props.disabled, onPointerDown: function(n) {
          return e._pointerDown(n);
        }, className: this.props.disabled ? "joystick-disabled" : "", style: o })
      );
    }, i;
  }(at.Component)
);
$t.Joystick = Ho;
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = r.Joystick = void 0;
  var i = $t;
  Object.defineProperty(r, "Joystick", { enumerable: !0, get: function() {
    return i.Joystick;
  } });
  var e = _t;
  Object.defineProperty(r, "JoystickShape", { enumerable: !0, get: function() {
    return e.JoystickShape;
  } });
})(Xo);
var Tt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, No = {}, Qt = {}, yt = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = void 0, function(i) {
    i.Circle = "circle", i.Square = "square", i.AxisY = "axisY", i.AxisX = "axisX";
  }(r.JoystickShape || (r.JoystickShape = {}));
})(yt);
var te = {};
Object.defineProperty(te, "__esModule", { value: !0 });
te.shapeFactory = void 0;
var Ae = yt, Go = function(r, i) {
  switch (r) {
    case Ae.JoystickShape.Square:
      return {
        borderRadius: Math.sqrt(i)
      };
    case Ae.JoystickShape.Circle:
    default:
      return {
        borderRadius: i
      };
  }
};
te.shapeFactory = Go;
var ee = {};
Object.defineProperty(ee, "__esModule", { value: !0 });
ee.shapeBoundsFactory = void 0;
var _e = yt, Ko = function(r, i, e, t, o, n, p, s, a) {
  switch (r) {
    case _e.JoystickShape.Square:
      return t = Ct(i - a.left - s / 2, s), o = Ct(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    case _e.JoystickShape.AxisX:
      return t = Ct(i - a.left - s / 2, s), o = 0, { relativeX: t, relativeY: o };
    case _e.JoystickShape.AxisY:
      return t = 0, o = Ct(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    default:
      return n > p && (t *= p / n, o *= p / n), { relativeX: t, relativeY: o };
  }
};
ee.shapeBoundsFactory = Ko;
var Ct = function(r, i) {
  var e = i / 2;
  return r > e ? e : r < -e ? e * -1 : r;
}, $o = Tt && Tt.__extends || /* @__PURE__ */ function() {
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
}(), $ = Tt && Tt.__assign || function() {
  return $ = Object.assign || function(r) {
    for (var i, e = 1, t = arguments.length; e < t; e++) {
      i = arguments[e];
      for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (r[o] = i[o]);
    }
    return r;
  }, $.apply(this, arguments);
};
Object.defineProperty(Qt, "__esModule", { value: !0 });
Qt.Joystick = void 0;
var pt = J, Fe = yt, Ye = te, Vo = ee, z;
(function(r) {
  r.PointerDown = "pointerdown", r.PointerMove = "pointermove", r.PointerUp = "pointerup";
})(z || (z = {}));
var Y;
(function(r) {
  r[r.TopRight = 2.35619449] = "TopRight", r[r.TopLeft = -2.35619449] = "TopLeft", r[r.BottomRight = 0.785398163] = "BottomRight", r[r.BottomLeft = -0.785398163] = "BottomLeft";
})(Y || (Y = {}));
var Zo = (
  /** @class */
  function(r) {
    $o(i, r);
    function i(e) {
      var t = r.call(this, e) || this;
      return t._stickRef = pt.createRef(), t._baseRef = pt.createRef(), t.frameId = null, t._pointerId = null, t._mounted = !1, t._pointerMove = function(o) {
        if (o.preventDefault(), t.state.dragging) {
          if (!t.props.followCursor && o.pointerId !== t._pointerId)
            return;
          var n = o.clientX, p = o.clientY, s = n - t._parentRect.left - t._radius, a = p - t._parentRect.top - t._radius, l = t._distance(s, a), u = (0, Vo.shapeBoundsFactory)(
            //@ts-ignore
            t.props.controlPlaneShape || t.props.baseShape,
            n,
            p,
            s,
            a,
            l,
            t._radius,
            t._baseSize,
            t._parentRect
          );
          s = u.relativeX, a = u.relativeY;
          var y = Math.atan2(s, a);
          t._updatePos({
            relativeX: s,
            relativeY: a,
            distance: t._distanceToPercentile(l),
            direction: t._getDirection(y),
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
      return e > Y.TopRight || e < Y.TopLeft ? "FORWARD" : e < Y.TopRight && e > Y.BottomRight ? "RIGHT" : e < Y.BottomLeft ? "LEFT" : "BACKWARD";
    }, i.prototype._distance = function(e, t) {
      return Math.hypot(e, t);
    }, i.prototype._distanceToPercentile = function(e) {
      var t = e / (this._baseSize / 2) * 100;
      return t > 100 ? 100 : t;
    }, i.prototype.getBaseShapeStyle = function() {
      var e = this.props.baseShape || Fe.JoystickShape.Circle;
      return (0, Ye.shapeFactory)(e, this._baseSize);
    }, i.prototype.getStickShapeStyle = function() {
      var e = this.props.stickShape || Fe.JoystickShape.Circle;
      return (0, Ye.shapeFactory)(e, this._baseSize);
    }, i.prototype._getBaseStyle = function() {
      var e = this.props.baseColor !== void 0 ? this.props.baseColor : "#000033", t = "".concat(this._baseSize, "px"), o = $($({}, this.getBaseShapeStyle()), { height: t, width: t, background: e, display: "flex", justifyContent: "center", alignItems: "center" });
      return this.props.baseImage && (o.background = "url(".concat(this.props.baseImage, ")"), o.backgroundSize = "100%"), o;
    }, i.prototype._getStickStyle = function() {
      var e = this.props.stickColor !== void 0 ? this.props.stickColor : "#3D59AB", t = this._stickSize ? "".concat(this._stickSize, "px") : "".concat(this._baseSize / 1.5, "px"), o = $($({}, this.getStickShapeStyle()), { background: e, cursor: "move", height: t, width: t, border: "none", flexShrink: 0, touchAction: "none" });
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
      return pt.createElement(
        "div",
        { "data-testid": "joystick-base", className: this.props.disabled ? "joystick-base-disabled" : "", ref: this._baseRef, style: t },
        pt.createElement("button", { ref: this._stickRef, disabled: this.props.disabled, onPointerDown: function(n) {
          return e._pointerDown(n);
        }, className: this.props.disabled ? "joystick-disabled" : "", style: o })
      );
    }, i;
  }(pt.Component)
);
Qt.Joystick = Zo;
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = r.Joystick = void 0;
  var i = Qt;
  Object.defineProperty(r, "Joystick", { enumerable: !0, get: function() {
    return i.Joystick;
  } });
  var e = yt;
  Object.defineProperty(r, "JoystickShape", { enumerable: !0, get: function() {
    return e.JoystickShape;
  } });
})(No);
var Dt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Qo = {}, oe = {}, gt = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = void 0, function(i) {
    i.Circle = "circle", i.Square = "square", i.AxisY = "axisY", i.AxisX = "axisX";
  }(r.JoystickShape || (r.JoystickShape = {}));
})(gt);
var re = {};
Object.defineProperty(re, "__esModule", { value: !0 });
re.shapeFactory = void 0;
var Xe = gt, tr = function(r, i) {
  switch (r) {
    case Xe.JoystickShape.Square:
      return {
        borderRadius: Math.sqrt(i)
      };
    case Xe.JoystickShape.Circle:
    default:
      return {
        borderRadius: i
      };
  }
};
re.shapeFactory = tr;
var ie = {};
Object.defineProperty(ie, "__esModule", { value: !0 });
ie.shapeBoundsFactory = void 0;
var ye = gt, er = function(r, i, e, t, o, n, p, s, a) {
  switch (r) {
    case ye.JoystickShape.Square:
      return t = It(i - a.left - s / 2, s), o = It(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    case ye.JoystickShape.AxisX:
      return t = It(i - a.left - s / 2, s), o = 0, { relativeX: t, relativeY: o };
    case ye.JoystickShape.AxisY:
      return t = 0, o = It(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    default:
      return n > p && (t *= p / n, o *= p / n), { relativeX: t, relativeY: o };
  }
};
ie.shapeBoundsFactory = er;
var It = function(r, i) {
  var e = i / 2;
  return r > e ? e : r < -e ? e * -1 : r;
}, or = Dt && Dt.__extends || /* @__PURE__ */ function() {
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
}(), V = Dt && Dt.__assign || function() {
  return V = Object.assign || function(r) {
    for (var i, e = 1, t = arguments.length; e < t; e++) {
      i = arguments[e];
      for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (r[o] = i[o]);
    }
    return r;
  }, V.apply(this, arguments);
};
Object.defineProperty(oe, "__esModule", { value: !0 });
oe.Joystick = void 0;
var ct = J, Ee = gt, qe = re, rr = ie, j;
(function(r) {
  r.PointerDown = "pointerdown", r.PointerMove = "pointermove", r.PointerUp = "pointerup";
})(j || (j = {}));
var X;
(function(r) {
  r[r.TopRight = 2.35619449] = "TopRight", r[r.TopLeft = -2.35619449] = "TopLeft", r[r.BottomRight = 0.785398163] = "BottomRight", r[r.BottomLeft = -0.785398163] = "BottomLeft";
})(X || (X = {}));
var ir = (
  /** @class */
  function(r) {
    or(i, r);
    function i(e) {
      var t = r.call(this, e) || this;
      return t._stickRef = ct.createRef(), t._baseRef = ct.createRef(), t.frameId = null, t._pointerId = null, t._mounted = !1, t._pointerMove = function(o) {
        if (o.preventDefault(), t.state.dragging) {
          if (!t.props.followCursor && o.pointerId !== t._pointerId)
            return;
          var n = o.clientX, p = o.clientY, s = n - t._parentRect.left - t._radius, a = p - t._parentRect.top - t._radius, l = t._distance(s, a), u = (0, rr.shapeBoundsFactory)(
            //@ts-ignore
            t.props.controlPlaneShape || t.props.baseShape,
            n,
            p,
            s,
            a,
            l,
            t._radius,
            t._baseSize,
            t._parentRect
          );
          s = u.relativeX, a = u.relativeY;
          var y = Math.atan2(s, a);
          t._updatePos({
            relativeX: s,
            relativeY: a,
            distance: t._distanceToPercentile(l),
            direction: t._getDirection(y),
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
          }), window.removeEventListener(j.PointerUp, t._pointerUp), window.removeEventListener(j.PointerMove, t._pointerMove), t._pointerId = null, t.props.stop && t.props.stop({
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
      this._mounted = !1, this.props.followCursor && window.removeEventListener(j.PointerMove, function(t) {
        return e._pointerMove(t);
      }), this.frameId !== null && window.cancelAnimationFrame(this.frameId);
    }, i.prototype.componentDidMount = function() {
      var e = this;
      this._mounted = !0, this.props.followCursor && (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(j.PointerMove, function(t) {
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
      }), window.addEventListener(j.PointerUp, this._pointerUp), window.addEventListener(j.PointerMove, this._pointerMove), this._pointerId = e.pointerId, this._stickRef.current.setPointerCapture(e.pointerId), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, i.prototype._getDirection = function(e) {
      return e > X.TopRight || e < X.TopLeft ? "FORWARD" : e < X.TopRight && e > X.BottomRight ? "RIGHT" : e < X.BottomLeft ? "LEFT" : "BACKWARD";
    }, i.prototype._distance = function(e, t) {
      return Math.hypot(e, t);
    }, i.prototype._distanceToPercentile = function(e) {
      var t = e / (this._baseSize / 2) * 100;
      return t > 100 ? 100 : t;
    }, i.prototype.getBaseShapeStyle = function() {
      var e = this.props.baseShape || Ee.JoystickShape.Circle;
      return (0, qe.shapeFactory)(e, this._baseSize);
    }, i.prototype.getStickShapeStyle = function() {
      var e = this.props.stickShape || Ee.JoystickShape.Circle;
      return (0, qe.shapeFactory)(e, this._baseSize);
    }, i.prototype._getBaseStyle = function() {
      var e = this.props.baseColor !== void 0 ? this.props.baseColor : "#000033", t = "".concat(this._baseSize, "px"), o = V(V({}, this.getBaseShapeStyle()), { height: t, width: t, background: e, display: "flex", justifyContent: "center", alignItems: "center" });
      return this.props.baseImage && (o.background = "url(".concat(this.props.baseImage, ")"), o.backgroundSize = "100%"), o;
    }, i.prototype._getStickStyle = function() {
      var e = this.props.stickColor !== void 0 ? this.props.stickColor : "#3D59AB", t = this._stickSize ? "".concat(this._stickSize, "px") : "".concat(this._baseSize / 1.5, "px"), o = V(V({}, this.getStickShapeStyle()), { background: e, cursor: "move", height: t, width: t, border: "none", flexShrink: 0, touchAction: "none" });
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
      return ct.createElement(
        "div",
        { "data-testid": "joystick-base", className: this.props.disabled ? "joystick-base-disabled" : "", ref: this._baseRef, style: t },
        ct.createElement("button", { ref: this._stickRef, disabled: this.props.disabled, onPointerDown: function(n) {
          return e._pointerDown(n);
        }, className: this.props.disabled ? "joystick-disabled" : "", style: o })
      );
    }, i;
  }(ct.Component)
);
oe.Joystick = ir;
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = r.Joystick = void 0;
  var i = oe;
  Object.defineProperty(r, "Joystick", { enumerable: !0, get: function() {
    return i.Joystick;
  } });
  var e = gt;
  Object.defineProperty(r, "JoystickShape", { enumerable: !0, get: function() {
    return e.JoystickShape;
  } });
})(Qo);
var Lt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, nr = {}, ne = {}, mt = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = void 0, function(i) {
    i.Circle = "circle", i.Square = "square", i.AxisY = "axisY", i.AxisX = "axisX";
  }(r.JoystickShape || (r.JoystickShape = {}));
})(mt);
var se = {};
Object.defineProperty(se, "__esModule", { value: !0 });
se.shapeFactory = void 0;
var Ue = mt, sr = function(r, i) {
  switch (r) {
    case Ue.JoystickShape.Square:
      return {
        borderRadius: Math.sqrt(i)
      };
    case Ue.JoystickShape.Circle:
    default:
      return {
        borderRadius: i
      };
  }
};
se.shapeFactory = sr;
var ae = {};
Object.defineProperty(ae, "__esModule", { value: !0 });
ae.shapeBoundsFactory = void 0;
var ge = mt, ar = function(r, i, e, t, o, n, p, s, a) {
  switch (r) {
    case ge.JoystickShape.Square:
      return t = xt(i - a.left - s / 2, s), o = xt(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    case ge.JoystickShape.AxisX:
      return t = xt(i - a.left - s / 2, s), o = 0, { relativeX: t, relativeY: o };
    case ge.JoystickShape.AxisY:
      return t = 0, o = xt(e - a.top - s / 2, s), { relativeX: t, relativeY: o };
    default:
      return n > p && (t *= p / n, o *= p / n), { relativeX: t, relativeY: o };
  }
};
ae.shapeBoundsFactory = ar;
var xt = function(r, i) {
  var e = i / 2;
  return r > e ? e : r < -e ? e * -1 : r;
}, pr = Lt && Lt.__extends || /* @__PURE__ */ function() {
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
}(), Z = Lt && Lt.__assign || function() {
  return Z = Object.assign || function(r) {
    for (var i, e = 1, t = arguments.length; e < t; e++) {
      i = arguments[e];
      for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (r[o] = i[o]);
    }
    return r;
  }, Z.apply(this, arguments);
};
Object.defineProperty(ne, "__esModule", { value: !0 });
ne.Joystick = void 0;
var ut = J, We = mt, He = se, cr = ae, O;
(function(r) {
  r.PointerDown = "pointerdown", r.PointerMove = "pointermove", r.PointerUp = "pointerup";
})(O || (O = {}));
var E;
(function(r) {
  r[r.TopRight = 2.35619449] = "TopRight", r[r.TopLeft = -2.35619449] = "TopLeft", r[r.BottomRight = 0.785398163] = "BottomRight", r[r.BottomLeft = -0.785398163] = "BottomLeft";
})(E || (E = {}));
var ur = (
  /** @class */
  function(r) {
    pr(i, r);
    function i(e) {
      var t = r.call(this, e) || this;
      return t._stickRef = ut.createRef(), t._baseRef = ut.createRef(), t.frameId = null, t._pointerId = null, t._mounted = !1, t._pointerMove = function(o) {
        if (o.preventDefault(), t.state.dragging) {
          if (!t.props.followCursor && o.pointerId !== t._pointerId)
            return;
          var n = o.clientX, p = o.clientY, s = n - t._parentRect.left - t._radius, a = p - t._parentRect.top - t._radius, l = t._distance(s, a), u = (0, cr.shapeBoundsFactory)(
            //@ts-ignore
            t.props.controlPlaneShape || t.props.baseShape,
            n,
            p,
            s,
            a,
            l,
            t._radius,
            t._baseSize,
            t._parentRect
          );
          s = u.relativeX, a = u.relativeY;
          var y = Math.atan2(s, a);
          t._updatePos({
            relativeX: s,
            relativeY: a,
            distance: t._distanceToPercentile(l),
            direction: t._getDirection(y),
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
          }), window.removeEventListener(O.PointerUp, t._pointerUp), window.removeEventListener(O.PointerMove, t._pointerMove), t._pointerId = null, t.props.stop && t.props.stop({
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
      this._mounted = !1, this.props.followCursor && window.removeEventListener(O.PointerMove, function(t) {
        return e._pointerMove(t);
      }), this.frameId !== null && window.cancelAnimationFrame(this.frameId);
    }, i.prototype.componentDidMount = function() {
      var e = this;
      this._mounted = !0, this.props.followCursor && (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(O.PointerMove, function(t) {
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
      }), window.addEventListener(O.PointerUp, this._pointerUp), window.addEventListener(O.PointerMove, this._pointerMove), this._pointerId = e.pointerId, this._stickRef.current.setPointerCapture(e.pointerId), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, i.prototype._getDirection = function(e) {
      return e > E.TopRight || e < E.TopLeft ? "FORWARD" : e < E.TopRight && e > E.BottomRight ? "RIGHT" : e < E.BottomLeft ? "LEFT" : "BACKWARD";
    }, i.prototype._distance = function(e, t) {
      return Math.hypot(e, t);
    }, i.prototype._distanceToPercentile = function(e) {
      var t = e / (this._baseSize / 2) * 100;
      return t > 100 ? 100 : t;
    }, i.prototype.getBaseShapeStyle = function() {
      var e = this.props.baseShape || We.JoystickShape.Circle;
      return (0, He.shapeFactory)(e, this._baseSize);
    }, i.prototype.getStickShapeStyle = function() {
      var e = this.props.stickShape || We.JoystickShape.Circle;
      return (0, He.shapeFactory)(e, this._baseSize);
    }, i.prototype._getBaseStyle = function() {
      var e = this.props.baseColor !== void 0 ? this.props.baseColor : "#000033", t = "".concat(this._baseSize, "px"), o = Z(Z({}, this.getBaseShapeStyle()), { height: t, width: t, background: e, display: "flex", justifyContent: "center", alignItems: "center" });
      return this.props.baseImage && (o.background = "url(".concat(this.props.baseImage, ")"), o.backgroundSize = "100%"), o;
    }, i.prototype._getStickStyle = function() {
      var e = this.props.stickColor !== void 0 ? this.props.stickColor : "#3D59AB", t = this._stickSize ? "".concat(this._stickSize, "px") : "".concat(this._baseSize / 1.5, "px"), o = Z(Z({}, this.getStickShapeStyle()), { background: e, cursor: "move", height: t, width: t, border: "none", flexShrink: 0, touchAction: "none" });
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
      return ut.createElement(
        "div",
        { "data-testid": "joystick-base", className: this.props.disabled ? "joystick-base-disabled" : "", ref: this._baseRef, style: t },
        ut.createElement("button", { ref: this._stickRef, disabled: this.props.disabled, onPointerDown: function(n) {
          return e._pointerDown(n);
        }, className: this.props.disabled ? "joystick-disabled" : "", style: o })
      );
    }, i;
  }(ut.Component)
);
ne.Joystick = ur;
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JoystickShape = r.Joystick = void 0;
  var i = ne;
  Object.defineProperty(r, "Joystick", { enumerable: !0, get: function() {
    return i.Joystick;
  } });
  var e = mt;
  Object.defineProperty(r, "JoystickShape", { enumerable: !0, get: function() {
    return e.JoystickShape;
  } });
})(nr);
function fr() {
  return /* @__PURE__ */ b(Ne, { children: /* @__PURE__ */ b(ko, {}) });
}
export {
  fr as default
};
