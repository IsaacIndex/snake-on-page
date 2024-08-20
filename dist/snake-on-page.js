var Cr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, et = { exports: {} }, Ze = {}, rt = { exports: {} }, R = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kt;
function en() {
  if (kt) return R;
  kt = 1;
  var v = Symbol.for("react.element"), f = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), y = Symbol.for("react.profiler"), P = Symbol.for("react.provider"), Y = Symbol.for("react.context"), j = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), Z = Symbol.for("react.memo"), L = Symbol.for("react.lazy"), K = Symbol.iterator;
  function oe(n) {
    return n === null || typeof n != "object" ? null : (n = K && n[K] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var te = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, fe = Object.assign, Le = {};
  function ie(n, s, E) {
    this.props = n, this.context = s, this.refs = Le, this.updater = E || te;
  }
  ie.prototype.isReactComponent = {}, ie.prototype.setState = function(n, s) {
    if (typeof n != "object" && typeof n != "function" && n != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, n, s, "setState");
  }, ie.prototype.forceUpdate = function(n) {
    this.updater.enqueueForceUpdate(this, n, "forceUpdate");
  };
  function ue() {
  }
  ue.prototype = ie.prototype;
  function W(n, s, E) {
    this.props = n, this.context = s, this.refs = Le, this.updater = E || te;
  }
  var me = W.prototype = new ue();
  me.constructor = W, fe(me, ie.prototype), me.isPureReactComponent = !0;
  var se = Array.isArray, z = Object.prototype.hasOwnProperty, re = { current: null }, le = { key: !0, ref: !0, __self: !0, __source: !0 };
  function ve(n, s, E) {
    var w, T = {}, $ = null, D = null;
    if (s != null) for (w in s.ref !== void 0 && (D = s.ref), s.key !== void 0 && ($ = "" + s.key), s) z.call(s, w) && !le.hasOwnProperty(w) && (T[w] = s[w]);
    var I = arguments.length - 2;
    if (I === 1) T.children = E;
    else if (1 < I) {
      for (var A = Array(I), J = 0; J < I; J++) A[J] = arguments[J + 2];
      T.children = A;
    }
    if (n && n.defaultProps) for (w in I = n.defaultProps, I) T[w] === void 0 && (T[w] = I[w]);
    return { $$typeof: v, type: n, key: $, ref: D, props: T, _owner: re.current };
  }
  function Ce(n, s) {
    return { $$typeof: v, type: n.type, key: s, ref: n.ref, props: n.props, _owner: n._owner };
  }
  function ke(n) {
    return typeof n == "object" && n !== null && n.$$typeof === v;
  }
  function Je(n) {
    var s = { "=": "=0", ":": "=2" };
    return "$" + n.replace(/[=:]/g, function(E) {
      return s[E];
    });
  }
  var Te = /\/+/g;
  function Q(n, s) {
    return typeof n == "object" && n !== null && n.key != null ? Je("" + n.key) : s.toString(36);
  }
  function ne(n, s, E, w, T) {
    var $ = typeof n;
    ($ === "undefined" || $ === "boolean") && (n = null);
    var D = !1;
    if (n === null) D = !0;
    else switch ($) {
      case "string":
      case "number":
        D = !0;
        break;
      case "object":
        switch (n.$$typeof) {
          case v:
          case f:
            D = !0;
        }
    }
    if (D) return D = n, T = T(D), n = w === "" ? "." + Q(D, 0) : w, se(T) ? (E = "", n != null && (E = n.replace(Te, "$&/") + "/"), ne(T, s, E, "", function(J) {
      return J;
    })) : T != null && (ke(T) && (T = Ce(T, E + (!T.key || D && D.key === T.key ? "" : ("" + T.key).replace(Te, "$&/") + "/") + n)), s.push(T)), 1;
    if (D = 0, w = w === "" ? "." : w + ":", se(n)) for (var I = 0; I < n.length; I++) {
      $ = n[I];
      var A = w + Q($, I);
      D += ne($, s, E, A, T);
    }
    else if (A = oe(n), typeof A == "function") for (n = A.call(n), I = 0; !($ = n.next()).done; ) $ = $.value, A = w + Q($, I++), D += ne($, s, E, A, T);
    else if ($ === "object") throw s = String(n), Error("Objects are not valid as a React child (found: " + (s === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : s) + "). If you meant to render a collection of children, use an array instead.");
    return D;
  }
  function G(n, s, E) {
    if (n == null) return n;
    var w = [], T = 0;
    return ne(n, w, "", "", function($) {
      return s.call(E, $, T++);
    }), w;
  }
  function ce(n) {
    if (n._status === -1) {
      var s = n._result;
      s = s(), s.then(function(E) {
        (n._status === 0 || n._status === -1) && (n._status = 1, n._result = E);
      }, function(E) {
        (n._status === 0 || n._status === -1) && (n._status = 2, n._result = E);
      }), n._status === -1 && (n._status = 0, n._result = s);
    }
    if (n._status === 1) return n._result.default;
    throw n._result;
  }
  var h = { current: null }, pe = { transition: null }, Oe = { ReactCurrentDispatcher: h, ReactCurrentBatchConfig: pe, ReactCurrentOwner: re };
  function ye() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return R.Children = { map: G, forEach: function(n, s, E) {
    G(n, function() {
      s.apply(this, arguments);
    }, E);
  }, count: function(n) {
    var s = 0;
    return G(n, function() {
      s++;
    }), s;
  }, toArray: function(n) {
    return G(n, function(s) {
      return s;
    }) || [];
  }, only: function(n) {
    if (!ke(n)) throw Error("React.Children.only expected to receive a single React element child.");
    return n;
  } }, R.Component = ie, R.Fragment = p, R.Profiler = y, R.PureComponent = W, R.StrictMode = i, R.Suspense = k, R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Oe, R.act = ye, R.cloneElement = function(n, s, E) {
    if (n == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + n + ".");
    var w = fe({}, n.props), T = n.key, $ = n.ref, D = n._owner;
    if (s != null) {
      if (s.ref !== void 0 && ($ = s.ref, D = re.current), s.key !== void 0 && (T = "" + s.key), n.type && n.type.defaultProps) var I = n.type.defaultProps;
      for (A in s) z.call(s, A) && !le.hasOwnProperty(A) && (w[A] = s[A] === void 0 && I !== void 0 ? I[A] : s[A]);
    }
    var A = arguments.length - 2;
    if (A === 1) w.children = E;
    else if (1 < A) {
      I = Array(A);
      for (var J = 0; J < A; J++) I[J] = arguments[J + 2];
      w.children = I;
    }
    return { $$typeof: v, type: n.type, key: T, ref: $, props: w, _owner: D };
  }, R.createContext = function(n) {
    return n = { $$typeof: Y, _currentValue: n, _currentValue2: n, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, n.Provider = { $$typeof: P, _context: n }, n.Consumer = n;
  }, R.createElement = ve, R.createFactory = function(n) {
    var s = ve.bind(null, n);
    return s.type = n, s;
  }, R.createRef = function() {
    return { current: null };
  }, R.forwardRef = function(n) {
    return { $$typeof: j, render: n };
  }, R.isValidElement = ke, R.lazy = function(n) {
    return { $$typeof: L, _payload: { _status: -1, _result: n }, _init: ce };
  }, R.memo = function(n, s) {
    return { $$typeof: Z, type: n, compare: s === void 0 ? null : s };
  }, R.startTransition = function(n) {
    var s = pe.transition;
    pe.transition = {};
    try {
      n();
    } finally {
      pe.transition = s;
    }
  }, R.unstable_act = ye, R.useCallback = function(n, s) {
    return h.current.useCallback(n, s);
  }, R.useContext = function(n) {
    return h.current.useContext(n);
  }, R.useDebugValue = function() {
  }, R.useDeferredValue = function(n) {
    return h.current.useDeferredValue(n);
  }, R.useEffect = function(n, s) {
    return h.current.useEffect(n, s);
  }, R.useId = function() {
    return h.current.useId();
  }, R.useImperativeHandle = function(n, s, E) {
    return h.current.useImperativeHandle(n, s, E);
  }, R.useInsertionEffect = function(n, s) {
    return h.current.useInsertionEffect(n, s);
  }, R.useLayoutEffect = function(n, s) {
    return h.current.useLayoutEffect(n, s);
  }, R.useMemo = function(n, s) {
    return h.current.useMemo(n, s);
  }, R.useReducer = function(n, s, E) {
    return h.current.useReducer(n, s, E);
  }, R.useRef = function(n) {
    return h.current.useRef(n);
  }, R.useState = function(n) {
    return h.current.useState(n);
  }, R.useSyncExternalStore = function(n, s, E) {
    return h.current.useSyncExternalStore(n, s, E);
  }, R.useTransition = function() {
    return h.current.useTransition();
  }, R.version = "18.3.1", R;
}
var rr = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
rr.exports;
var Tt;
function rn() {
  return Tt || (Tt = 1, function(v, f) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var p = "18.3.1", i = Symbol.for("react.element"), y = Symbol.for("react.portal"), P = Symbol.for("react.fragment"), Y = Symbol.for("react.strict_mode"), j = Symbol.for("react.profiler"), k = Symbol.for("react.provider"), Z = Symbol.for("react.context"), L = Symbol.for("react.forward_ref"), K = Symbol.for("react.suspense"), oe = Symbol.for("react.suspense_list"), te = Symbol.for("react.memo"), fe = Symbol.for("react.lazy"), Le = Symbol.for("react.offscreen"), ie = Symbol.iterator, ue = "@@iterator";
      function W(e) {
        if (e === null || typeof e != "object")
          return null;
        var r = ie && e[ie] || e[ue];
        return typeof r == "function" ? r : null;
      }
      var me = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, se = {
        transition: null
      }, z = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, re = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, le = {}, ve = null;
      function Ce(e) {
        ve = e;
      }
      le.setExtraStackFrame = function(e) {
        ve = e;
      }, le.getCurrentStack = null, le.getStackAddendum = function() {
        var e = "";
        ve && (e += ve);
        var r = le.getCurrentStack;
        return r && (e += r() || ""), e;
      };
      var ke = !1, Je = !1, Te = !1, Q = !1, ne = !1, G = {
        ReactCurrentDispatcher: me,
        ReactCurrentBatchConfig: se,
        ReactCurrentOwner: re
      };
      G.ReactDebugCurrentFrame = le, G.ReactCurrentActQueue = z;
      function ce(e) {
        {
          for (var r = arguments.length, a = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)
            a[o - 1] = arguments[o];
          pe("warn", e, a);
        }
      }
      function h(e) {
        {
          for (var r = arguments.length, a = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)
            a[o - 1] = arguments[o];
          pe("error", e, a);
        }
      }
      function pe(e, r, a) {
        {
          var o = G.ReactDebugCurrentFrame, l = o.getStackAddendum();
          l !== "" && (r += "%s", a = a.concat([l]));
          var _ = a.map(function(d) {
            return String(d);
          });
          _.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, _);
        }
      }
      var Oe = {};
      function ye(e, r) {
        {
          var a = e.constructor, o = a && (a.displayName || a.name) || "ReactClass", l = o + "." + r;
          if (Oe[l])
            return;
          h("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", r, o), Oe[l] = !0;
        }
      }
      var n = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(e) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(e, r, a) {
          ye(e, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(e, r, a, o) {
          ye(e, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(e, r, a, o) {
          ye(e, "setState");
        }
      }, s = Object.assign, E = {};
      Object.freeze(E);
      function w(e, r, a) {
        this.props = e, this.context = r, this.refs = E, this.updater = a || n;
      }
      w.prototype.isReactComponent = {}, w.prototype.setState = function(e, r) {
        if (typeof e != "object" && typeof e != "function" && e != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, e, r, "setState");
      }, w.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      };
      {
        var T = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, $ = function(e, r) {
          Object.defineProperty(w.prototype, e, {
            get: function() {
              ce("%s(...) is deprecated in plain JavaScript React classes. %s", r[0], r[1]);
            }
          });
        };
        for (var D in T)
          T.hasOwnProperty(D) && $(D, T[D]);
      }
      function I() {
      }
      I.prototype = w.prototype;
      function A(e, r, a) {
        this.props = e, this.context = r, this.refs = E, this.updater = a || n;
      }
      var J = A.prototype = new I();
      J.constructor = A, s(J, w.prototype), J.isPureReactComponent = !0;
      function Pr() {
        var e = {
          current: null
        };
        return Object.seal(e), e;
      }
      var ar = Array.isArray;
      function Me(e) {
        return ar(e);
      }
      function jr(e) {
        {
          var r = typeof Symbol == "function" && Symbol.toStringTag, a = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
          return a;
        }
      }
      function Ue(e) {
        try {
          return ge(e), !1;
        } catch {
          return !0;
        }
      }
      function ge(e) {
        return "" + e;
      }
      function Pe(e) {
        if (Ue(e))
          return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", jr(e)), ge(e);
      }
      function or(e, r, a) {
        var o = e.displayName;
        if (o)
          return o;
        var l = r.displayName || r.name || "";
        return l !== "" ? a + "(" + l + ")" : a;
      }
      function je(e) {
        return e.displayName || "Context";
      }
      function de(e) {
        if (e == null)
          return null;
        if (typeof e.tag == "number" && h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
          return e.displayName || e.name || null;
        if (typeof e == "string")
          return e;
        switch (e) {
          case P:
            return "Fragment";
          case y:
            return "Portal";
          case j:
            return "Profiler";
          case Y:
            return "StrictMode";
          case K:
            return "Suspense";
          case oe:
            return "SuspenseList";
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case Z:
              var r = e;
              return je(r) + ".Consumer";
            case k:
              var a = e;
              return je(a._context) + ".Provider";
            case L:
              return or(e, e.render, "ForwardRef");
            case te:
              var o = e.displayName || null;
              return o !== null ? o : de(e.type) || "Memo";
            case fe: {
              var l = e, _ = l._payload, d = l._init;
              try {
                return de(d(_));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Ae = Object.prototype.hasOwnProperty, We = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, ir, ur, Ne;
      Ne = {};
      function qe(e) {
        if (Ae.call(e, "ref")) {
          var r = Object.getOwnPropertyDescriptor(e, "ref").get;
          if (r && r.isReactWarning)
            return !1;
        }
        return e.ref !== void 0;
      }
      function be(e) {
        if (Ae.call(e, "key")) {
          var r = Object.getOwnPropertyDescriptor(e, "key").get;
          if (r && r.isReactWarning)
            return !1;
        }
        return e.key !== void 0;
      }
      function Ar(e, r) {
        var a = function() {
          ir || (ir = !0, h("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: a,
          configurable: !0
        });
      }
      function sr(e, r) {
        var a = function() {
          ur || (ur = !0, h("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: a,
          configurable: !0
        });
      }
      function cr(e) {
        if (typeof e.ref == "string" && re.current && e.__self && re.current.stateNode !== e.__self) {
          var r = de(re.current.type);
          Ne[r] || (h('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, e.ref), Ne[r] = !0);
        }
      }
      var xe = function(e, r, a, o, l, _, d) {
        var g = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: i,
          // Built-in properties that belong on the element
          type: e,
          key: r,
          ref: a,
          props: d,
          // Record the component responsible for creating this element.
          _owner: _
        };
        return g._store = {}, Object.defineProperty(g._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(g, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: o
        }), Object.defineProperty(g, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: l
        }), Object.freeze && (Object.freeze(g.props), Object.freeze(g)), g;
      };
      function xr(e, r, a) {
        var o, l = {}, _ = null, d = null, g = null, C = null;
        if (r != null) {
          qe(r) && (d = r.ref, cr(r)), be(r) && (Pe(r.key), _ = "" + r.key), g = r.__self === void 0 ? null : r.__self, C = r.__source === void 0 ? null : r.__source;
          for (o in r)
            Ae.call(r, o) && !We.hasOwnProperty(o) && (l[o] = r[o]);
        }
        var F = arguments.length - 2;
        if (F === 1)
          l.children = a;
        else if (F > 1) {
          for (var M = Array(F), U = 0; U < F; U++)
            M[U] = arguments[U + 2];
          Object.freeze && Object.freeze(M), l.children = M;
        }
        if (e && e.defaultProps) {
          var V = e.defaultProps;
          for (o in V)
            l[o] === void 0 && (l[o] = V[o]);
        }
        if (_ || d) {
          var q = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          _ && Ar(l, q), d && sr(l, q);
        }
        return xe(e, _, d, g, C, re.current, l);
      }
      function Ir(e, r) {
        var a = xe(e.type, r, e.ref, e._self, e._source, e._owner, e.props);
        return a;
      }
      function Dr(e, r, a) {
        if (e == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
        var o, l = s({}, e.props), _ = e.key, d = e.ref, g = e._self, C = e._source, F = e._owner;
        if (r != null) {
          qe(r) && (d = r.ref, F = re.current), be(r) && (Pe(r.key), _ = "" + r.key);
          var M;
          e.type && e.type.defaultProps && (M = e.type.defaultProps);
          for (o in r)
            Ae.call(r, o) && !We.hasOwnProperty(o) && (r[o] === void 0 && M !== void 0 ? l[o] = M[o] : l[o] = r[o]);
        }
        var U = arguments.length - 2;
        if (U === 1)
          l.children = a;
        else if (U > 1) {
          for (var V = Array(U), q = 0; q < U; q++)
            V[q] = arguments[q + 2];
          l.children = V;
        }
        return xe(e.type, _, d, g, C, F, l);
      }
      function Re(e) {
        return typeof e == "object" && e !== null && e.$$typeof === i;
      }
      var fr = ".", Fr = ":";
      function $r(e) {
        var r = /[=:]/g, a = {
          "=": "=0",
          ":": "=2"
        }, o = e.replace(r, function(l) {
          return a[l];
        });
        return "$" + o;
      }
      var Ve = !1, lr = /\/+/g;
      function he(e) {
        return e.replace(lr, "$&/");
      }
      function Ie(e, r) {
        return typeof e == "object" && e !== null && e.key != null ? (Pe(e.key), $r("" + e.key)) : r.toString(36);
      }
      function Ee(e, r, a, o, l) {
        var _ = typeof e;
        (_ === "undefined" || _ === "boolean") && (e = null);
        var d = !1;
        if (e === null)
          d = !0;
        else
          switch (_) {
            case "string":
            case "number":
              d = !0;
              break;
            case "object":
              switch (e.$$typeof) {
                case i:
                case y:
                  d = !0;
              }
          }
        if (d) {
          var g = e, C = l(g), F = o === "" ? fr + Ie(g, 0) : o;
          if (Me(C)) {
            var M = "";
            F != null && (M = he(F) + "/"), Ee(C, r, M, "", function(Qt) {
              return Qt;
            });
          } else C != null && (Re(C) && (C.key && (!g || g.key !== C.key) && Pe(C.key), C = Ir(
            C,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            a + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (C.key && (!g || g.key !== C.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              he("" + C.key) + "/"
            ) : "") + F
          )), r.push(C));
          return 1;
        }
        var U, V, q = 0, X = o === "" ? fr : o + Fr;
        if (Me(e))
          for (var Sr = 0; Sr < e.length; Sr++)
            U = e[Sr], V = X + Ie(U, Sr), q += Ee(U, r, a, V, l);
        else {
          var Xr = W(e);
          if (typeof Xr == "function") {
            var St = e;
            Xr === St.entries && (Ve || ce("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Ve = !0);
            for (var Xt = Xr.call(St), wt, Zt = 0; !(wt = Xt.next()).done; )
              U = wt.value, V = X + Ie(U, Zt++), q += Ee(U, r, a, V, l);
          } else if (_ === "object") {
            var Ct = String(e);
            throw new Error("Objects are not valid as a React child (found: " + (Ct === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : Ct) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return q;
      }
      function De(e, r, a) {
        if (e == null)
          return e;
        var o = [], l = 0;
        return Ee(e, o, "", "", function(_) {
          return r.call(a, _, l++);
        }), o;
      }
      function Lr(e) {
        var r = 0;
        return De(e, function() {
          r++;
        }), r;
      }
      function pr(e, r, a) {
        De(e, function() {
          r.apply(this, arguments);
        }, a);
      }
      function Mr(e) {
        return De(e, function(r) {
          return r;
        }) || [];
      }
      function dr(e) {
        if (!Re(e))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return e;
      }
      function vr(e) {
        var r = {
          $$typeof: Z,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: e,
          _currentValue2: e,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        r.Provider = {
          $$typeof: k,
          _context: r
        };
        var a = !1, o = !1, l = !1;
        {
          var _ = {
            $$typeof: Z,
            _context: r
          };
          Object.defineProperties(_, {
            Provider: {
              get: function() {
                return o || (o = !0, h("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), r.Provider;
              },
              set: function(d) {
                r.Provider = d;
              }
            },
            _currentValue: {
              get: function() {
                return r._currentValue;
              },
              set: function(d) {
                r._currentValue = d;
              }
            },
            _currentValue2: {
              get: function() {
                return r._currentValue2;
              },
              set: function(d) {
                r._currentValue2 = d;
              }
            },
            _threadCount: {
              get: function() {
                return r._threadCount;
              },
              set: function(d) {
                r._threadCount = d;
              }
            },
            Consumer: {
              get: function() {
                return a || (a = !0, h("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), r.Consumer;
              }
            },
            displayName: {
              get: function() {
                return r.displayName;
              },
              set: function(d) {
                l || (ce("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", d), l = !0);
              }
            }
          }), r.Consumer = _;
        }
        return r._currentRenderer = null, r._currentRenderer2 = null, r;
      }
      var Fe = -1, Ke = 0, Ge = 1, yr = 2;
      function Ur(e) {
        if (e._status === Fe) {
          var r = e._result, a = r();
          if (a.then(function(_) {
            if (e._status === Ke || e._status === Fe) {
              var d = e;
              d._status = Ge, d._result = _;
            }
          }, function(_) {
            if (e._status === Ke || e._status === Fe) {
              var d = e;
              d._status = yr, d._result = _;
            }
          }), e._status === Fe) {
            var o = e;
            o._status = Ke, o._result = a;
          }
        }
        if (e._status === Ge) {
          var l = e._result;
          return l === void 0 && h(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, l), "default" in l || h(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, l), l.default;
        } else
          throw e._result;
      }
      function Wr(e) {
        var r = {
          // We use these fields to store the result.
          _status: Fe,
          _result: e
        }, a = {
          $$typeof: fe,
          _payload: r,
          _init: Ur
        };
        {
          var o, l;
          Object.defineProperties(a, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return o;
              },
              set: function(_) {
                h("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), o = _, Object.defineProperty(a, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return l;
              },
              set: function(_) {
                h("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), l = _, Object.defineProperty(a, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return a;
      }
      function Nr(e) {
        e != null && e.$$typeof === te ? h("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof e != "function" ? h("forwardRef requires a render function but was given %s.", e === null ? "null" : typeof e) : e.length !== 0 && e.length !== 2 && h("forwardRef render functions accept exactly two parameters: props and ref. %s", e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), e != null && (e.defaultProps != null || e.propTypes != null) && h("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var r = {
          $$typeof: L,
          render: e
        };
        {
          var a;
          Object.defineProperty(r, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return a;
            },
            set: function(o) {
              a = o, !e.name && !e.displayName && (e.displayName = o);
            }
          });
        }
        return r;
      }
      var hr;
      hr = Symbol.for("react.module.reference");
      function t(e) {
        return !!(typeof e == "string" || typeof e == "function" || e === P || e === j || ne || e === Y || e === K || e === oe || Q || e === Le || ke || Je || Te || typeof e == "object" && e !== null && (e.$$typeof === fe || e.$$typeof === te || e.$$typeof === k || e.$$typeof === Z || e.$$typeof === L || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        e.$$typeof === hr || e.getModuleId !== void 0));
      }
      function u(e, r) {
        t(e) || h("memo: The first argument must be a component. Instead received: %s", e === null ? "null" : typeof e);
        var a = {
          $$typeof: te,
          type: e,
          compare: r === void 0 ? null : r
        };
        {
          var o;
          Object.defineProperty(a, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return o;
            },
            set: function(l) {
              o = l, !e.name && !e.displayName && (e.displayName = l);
            }
          });
        }
        return a;
      }
      function c() {
        var e = me.current;
        return e === null && h(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), e;
      }
      function m(e) {
        var r = c();
        if (e._context !== void 0) {
          var a = e._context;
          a.Consumer === e ? h("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : a.Provider === e && h("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return r.useContext(e);
      }
      function O(e) {
        var r = c();
        return r.useState(e);
      }
      function x(e, r, a) {
        var o = c();
        return o.useReducer(e, r, a);
      }
      function S(e) {
        var r = c();
        return r.useRef(e);
      }
      function b(e, r) {
        var a = c();
        return a.useEffect(e, r);
      }
      function H(e, r) {
        var a = c();
        return a.useInsertionEffect(e, r);
      }
      function N(e, r) {
        var a = c();
        return a.useLayoutEffect(e, r);
      }
      function B(e, r) {
        var a = c();
        return a.useCallback(e, r);
      }
      function ae(e, r) {
        var a = c();
        return a.useMemo(e, r);
      }
      function Se(e, r, a) {
        var o = c();
        return o.useImperativeHandle(e, r, a);
      }
      function _e(e, r) {
        {
          var a = c();
          return a.useDebugValue(e, r);
        }
      }
      function ee() {
        var e = c();
        return e.useTransition();
      }
      function He(e) {
        var r = c();
        return r.useDeferredValue(e);
      }
      function Vr() {
        var e = c();
        return e.useId();
      }
      function Yr(e, r, a) {
        var o = c();
        return o.useSyncExternalStore(e, r, a);
      }
      var Xe = 0, tt, nt, at, ot, it, ut, st;
      function ct() {
      }
      ct.__reactDisabledLog = !0;
      function It() {
        {
          if (Xe === 0) {
            tt = console.log, nt = console.info, at = console.warn, ot = console.error, it = console.group, ut = console.groupCollapsed, st = console.groupEnd;
            var e = {
              configurable: !0,
              enumerable: !0,
              value: ct,
              writable: !0
            };
            Object.defineProperties(console, {
              info: e,
              log: e,
              warn: e,
              error: e,
              group: e,
              groupCollapsed: e,
              groupEnd: e
            });
          }
          Xe++;
        }
      }
      function Dt() {
        {
          if (Xe--, Xe === 0) {
            var e = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: s({}, e, {
                value: tt
              }),
              info: s({}, e, {
                value: nt
              }),
              warn: s({}, e, {
                value: at
              }),
              error: s({}, e, {
                value: ot
              }),
              group: s({}, e, {
                value: it
              }),
              groupCollapsed: s({}, e, {
                value: ut
              }),
              groupEnd: s({}, e, {
                value: st
              })
            });
          }
          Xe < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Br = G.ReactCurrentDispatcher, zr;
      function _r(e, r, a) {
        {
          if (zr === void 0)
            try {
              throw Error();
            } catch (l) {
              var o = l.stack.trim().match(/\n( *(at )?)/);
              zr = o && o[1] || "";
            }
          return `
` + zr + e;
        }
      }
      var Jr = !1, mr;
      {
        var Ft = typeof WeakMap == "function" ? WeakMap : Map;
        mr = new Ft();
      }
      function ft(e, r) {
        if (!e || Jr)
          return "";
        {
          var a = mr.get(e);
          if (a !== void 0)
            return a;
        }
        var o;
        Jr = !0;
        var l = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var _;
        _ = Br.current, Br.current = null, It();
        try {
          if (r) {
            var d = function() {
              throw Error();
            };
            if (Object.defineProperty(d.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(d, []);
              } catch (X) {
                o = X;
              }
              Reflect.construct(e, [], d);
            } else {
              try {
                d.call();
              } catch (X) {
                o = X;
              }
              e.call(d.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (X) {
              o = X;
            }
            e();
          }
        } catch (X) {
          if (X && o && typeof X.stack == "string") {
            for (var g = X.stack.split(`
`), C = o.stack.split(`
`), F = g.length - 1, M = C.length - 1; F >= 1 && M >= 0 && g[F] !== C[M]; )
              M--;
            for (; F >= 1 && M >= 0; F--, M--)
              if (g[F] !== C[M]) {
                if (F !== 1 || M !== 1)
                  do
                    if (F--, M--, M < 0 || g[F] !== C[M]) {
                      var U = `
` + g[F].replace(" at new ", " at ");
                      return e.displayName && U.includes("<anonymous>") && (U = U.replace("<anonymous>", e.displayName)), typeof e == "function" && mr.set(e, U), U;
                    }
                  while (F >= 1 && M >= 0);
                break;
              }
          }
        } finally {
          Jr = !1, Br.current = _, Dt(), Error.prepareStackTrace = l;
        }
        var V = e ? e.displayName || e.name : "", q = V ? _r(V) : "";
        return typeof e == "function" && mr.set(e, q), q;
      }
      function $t(e, r, a) {
        return ft(e, !1);
      }
      function Lt(e) {
        var r = e.prototype;
        return !!(r && r.isReactComponent);
      }
      function gr(e, r, a) {
        if (e == null)
          return "";
        if (typeof e == "function")
          return ft(e, Lt(e));
        if (typeof e == "string")
          return _r(e);
        switch (e) {
          case K:
            return _r("Suspense");
          case oe:
            return _r("SuspenseList");
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case L:
              return $t(e.render);
            case te:
              return gr(e.type, r, a);
            case fe: {
              var o = e, l = o._payload, _ = o._init;
              try {
                return gr(_(l), r, a);
              } catch {
              }
            }
          }
        return "";
      }
      var lt = {}, pt = G.ReactDebugCurrentFrame;
      function br(e) {
        if (e) {
          var r = e._owner, a = gr(e.type, e._source, r ? r.type : null);
          pt.setExtraStackFrame(a);
        } else
          pt.setExtraStackFrame(null);
      }
      function Mt(e, r, a, o, l) {
        {
          var _ = Function.call.bind(Ae);
          for (var d in e)
            if (_(e, d)) {
              var g = void 0;
              try {
                if (typeof e[d] != "function") {
                  var C = Error((o || "React class") + ": " + a + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw C.name = "Invariant Violation", C;
                }
                g = e[d](r, d, o, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (F) {
                g = F;
              }
              g && !(g instanceof Error) && (br(l), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", a, d, typeof g), br(null)), g instanceof Error && !(g.message in lt) && (lt[g.message] = !0, br(l), h("Failed %s type: %s", a, g.message), br(null));
            }
        }
      }
      function Ye(e) {
        if (e) {
          var r = e._owner, a = gr(e.type, e._source, r ? r.type : null);
          Ce(a);
        } else
          Ce(null);
      }
      var qr;
      qr = !1;
      function dt() {
        if (re.current) {
          var e = de(re.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
      function Ut(e) {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), a = e.lineNumber;
          return `

Check your code at ` + r + ":" + a + ".";
        }
        return "";
      }
      function Wt(e) {
        return e != null ? Ut(e.__source) : "";
      }
      var vt = {};
      function Nt(e) {
        var r = dt();
        if (!r) {
          var a = typeof e == "string" ? e : e.displayName || e.name;
          a && (r = `

Check the top-level render call using <` + a + ">.");
        }
        return r;
      }
      function yt(e, r) {
        if (!(!e._store || e._store.validated || e.key != null)) {
          e._store.validated = !0;
          var a = Nt(r);
          if (!vt[a]) {
            vt[a] = !0;
            var o = "";
            e && e._owner && e._owner !== re.current && (o = " It was passed a child from " + de(e._owner.type) + "."), Ye(e), h('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', a, o), Ye(null);
          }
        }
      }
      function ht(e, r) {
        if (typeof e == "object") {
          if (Me(e))
            for (var a = 0; a < e.length; a++) {
              var o = e[a];
              Re(o) && yt(o, r);
            }
          else if (Re(e))
            e._store && (e._store.validated = !0);
          else if (e) {
            var l = W(e);
            if (typeof l == "function" && l !== e.entries)
              for (var _ = l.call(e), d; !(d = _.next()).done; )
                Re(d.value) && yt(d.value, r);
          }
        }
      }
      function _t(e) {
        {
          var r = e.type;
          if (r == null || typeof r == "string")
            return;
          var a;
          if (typeof r == "function")
            a = r.propTypes;
          else if (typeof r == "object" && (r.$$typeof === L || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          r.$$typeof === te))
            a = r.propTypes;
          else
            return;
          if (a) {
            var o = de(r);
            Mt(a, e.props, "prop", o, e);
          } else if (r.PropTypes !== void 0 && !qr) {
            qr = !0;
            var l = de(r);
            h("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", l || "Unknown");
          }
          typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && h("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Vt(e) {
        {
          for (var r = Object.keys(e.props), a = 0; a < r.length; a++) {
            var o = r[a];
            if (o !== "children" && o !== "key") {
              Ye(e), h("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", o), Ye(null);
              break;
            }
          }
          e.ref !== null && (Ye(e), h("Invalid attribute `ref` supplied to `React.Fragment`."), Ye(null));
        }
      }
      function mt(e, r, a) {
        var o = t(e);
        if (!o) {
          var l = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (l += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var _ = Wt(r);
          _ ? l += _ : l += dt();
          var d;
          e === null ? d = "null" : Me(e) ? d = "array" : e !== void 0 && e.$$typeof === i ? (d = "<" + (de(e.type) || "Unknown") + " />", l = " Did you accidentally export a JSX literal instead of a component?") : d = typeof e, h("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", d, l);
        }
        var g = xr.apply(this, arguments);
        if (g == null)
          return g;
        if (o)
          for (var C = 2; C < arguments.length; C++)
            ht(arguments[C], e);
        return e === P ? Vt(g) : _t(g), g;
      }
      var gt = !1;
      function Yt(e) {
        var r = mt.bind(null, e);
        return r.type = e, gt || (gt = !0, ce("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(r, "type", {
          enumerable: !1,
          get: function() {
            return ce("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: e
            }), e;
          }
        }), r;
      }
      function Bt(e, r, a) {
        for (var o = Dr.apply(this, arguments), l = 2; l < arguments.length; l++)
          ht(arguments[l], o.type);
        return _t(o), o;
      }
      function zt(e, r) {
        var a = se.transition;
        se.transition = {};
        var o = se.transition;
        se.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          e();
        } finally {
          if (se.transition = a, a === null && o._updatedFibers) {
            var l = o._updatedFibers.size;
            l > 10 && ce("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), o._updatedFibers.clear();
          }
        }
      }
      var bt = !1, Rr = null;
      function Jt(e) {
        if (Rr === null)
          try {
            var r = ("require" + Math.random()).slice(0, 7), a = v && v[r];
            Rr = a.call(v, "timers").setImmediate;
          } catch {
            Rr = function(l) {
              bt === !1 && (bt = !0, typeof MessageChannel > "u" && h("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var _ = new MessageChannel();
              _.port1.onmessage = l, _.port2.postMessage(void 0);
            };
          }
        return Rr(e);
      }
      var Be = 0, Rt = !1;
      function Et(e) {
        {
          var r = Be;
          Be++, z.current === null && (z.current = []);
          var a = z.isBatchingLegacy, o;
          try {
            if (z.isBatchingLegacy = !0, o = e(), !a && z.didScheduleLegacyUpdate) {
              var l = z.current;
              l !== null && (z.didScheduleLegacyUpdate = !1, Hr(l));
            }
          } catch (V) {
            throw Er(r), V;
          } finally {
            z.isBatchingLegacy = a;
          }
          if (o !== null && typeof o == "object" && typeof o.then == "function") {
            var _ = o, d = !1, g = {
              then: function(V, q) {
                d = !0, _.then(function(X) {
                  Er(r), Be === 0 ? Kr(X, V, q) : V(X);
                }, function(X) {
                  Er(r), q(X);
                });
              }
            };
            return !Rt && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              d || (Rt = !0, h("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), g;
          } else {
            var C = o;
            if (Er(r), Be === 0) {
              var F = z.current;
              F !== null && (Hr(F), z.current = null);
              var M = {
                then: function(V, q) {
                  z.current === null ? (z.current = [], Kr(C, V, q)) : V(C);
                }
              };
              return M;
            } else {
              var U = {
                then: function(V, q) {
                  V(C);
                }
              };
              return U;
            }
          }
        }
      }
      function Er(e) {
        e !== Be - 1 && h("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Be = e;
      }
      function Kr(e, r, a) {
        {
          var o = z.current;
          if (o !== null)
            try {
              Hr(o), Jt(function() {
                o.length === 0 ? (z.current = null, r(e)) : Kr(e, r, a);
              });
            } catch (l) {
              a(l);
            }
          else
            r(e);
        }
      }
      var Gr = !1;
      function Hr(e) {
        if (!Gr) {
          Gr = !0;
          var r = 0;
          try {
            for (; r < e.length; r++) {
              var a = e[r];
              do
                a = a(!0);
              while (a !== null);
            }
            e.length = 0;
          } catch (o) {
            throw e = e.slice(r + 1), o;
          } finally {
            Gr = !1;
          }
        }
      }
      var qt = mt, Kt = Bt, Gt = Yt, Ht = {
        map: De,
        forEach: pr,
        count: Lr,
        toArray: Mr,
        only: dr
      };
      f.Children = Ht, f.Component = w, f.Fragment = P, f.Profiler = j, f.PureComponent = A, f.StrictMode = Y, f.Suspense = K, f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = G, f.act = Et, f.cloneElement = Kt, f.createContext = vr, f.createElement = qt, f.createFactory = Gt, f.createRef = Pr, f.forwardRef = Nr, f.isValidElement = Re, f.lazy = Wr, f.memo = u, f.startTransition = zt, f.unstable_act = Et, f.useCallback = B, f.useContext = m, f.useDebugValue = _e, f.useDeferredValue = He, f.useEffect = b, f.useId = Vr, f.useImperativeHandle = Se, f.useInsertionEffect = H, f.useLayoutEffect = N, f.useMemo = ae, f.useReducer = x, f.useRef = S, f.useState = O, f.useSyncExternalStore = Yr, f.useTransition = ee, f.version = p, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(rr, rr.exports)), rr.exports;
}
process.env.NODE_ENV === "production" ? rt.exports = en() : rt.exports = rn();
var tr = rt.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ot;
function tn() {
  if (Ot) return Ze;
  Ot = 1;
  var v = tr, f = Symbol.for("react.element"), p = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, y = v.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, P = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Y(j, k, Z) {
    var L, K = {}, oe = null, te = null;
    Z !== void 0 && (oe = "" + Z), k.key !== void 0 && (oe = "" + k.key), k.ref !== void 0 && (te = k.ref);
    for (L in k) i.call(k, L) && !P.hasOwnProperty(L) && (K[L] = k[L]);
    if (j && j.defaultProps) for (L in k = j.defaultProps, k) K[L] === void 0 && (K[L] = k[L]);
    return { $$typeof: f, type: j, key: oe, ref: te, props: K, _owner: y.current };
  }
  return Ze.Fragment = p, Ze.jsx = Y, Ze.jsxs = Y, Ze;
}
var Qe = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pt;
function nn() {
  return Pt || (Pt = 1, process.env.NODE_ENV !== "production" && function() {
    var v = tr, f = Symbol.for("react.element"), p = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), P = Symbol.for("react.profiler"), Y = Symbol.for("react.provider"), j = Symbol.for("react.context"), k = Symbol.for("react.forward_ref"), Z = Symbol.for("react.suspense"), L = Symbol.for("react.suspense_list"), K = Symbol.for("react.memo"), oe = Symbol.for("react.lazy"), te = Symbol.for("react.offscreen"), fe = Symbol.iterator, Le = "@@iterator";
    function ie(t) {
      if (t === null || typeof t != "object")
        return null;
      var u = fe && t[fe] || t[Le];
      return typeof u == "function" ? u : null;
    }
    var ue = v.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function W(t) {
      {
        for (var u = arguments.length, c = new Array(u > 1 ? u - 1 : 0), m = 1; m < u; m++)
          c[m - 1] = arguments[m];
        me("error", t, c);
      }
    }
    function me(t, u, c) {
      {
        var m = ue.ReactDebugCurrentFrame, O = m.getStackAddendum();
        O !== "" && (u += "%s", c = c.concat([O]));
        var x = c.map(function(S) {
          return String(S);
        });
        x.unshift("Warning: " + u), Function.prototype.apply.call(console[t], console, x);
      }
    }
    var se = !1, z = !1, re = !1, le = !1, ve = !1, Ce;
    Ce = Symbol.for("react.module.reference");
    function ke(t) {
      return !!(typeof t == "string" || typeof t == "function" || t === i || t === P || ve || t === y || t === Z || t === L || le || t === te || se || z || re || typeof t == "object" && t !== null && (t.$$typeof === oe || t.$$typeof === K || t.$$typeof === Y || t.$$typeof === j || t.$$typeof === k || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      t.$$typeof === Ce || t.getModuleId !== void 0));
    }
    function Je(t, u, c) {
      var m = t.displayName;
      if (m)
        return m;
      var O = u.displayName || u.name || "";
      return O !== "" ? c + "(" + O + ")" : c;
    }
    function Te(t) {
      return t.displayName || "Context";
    }
    function Q(t) {
      if (t == null)
        return null;
      if (typeof t.tag == "number" && W("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string")
        return t;
      switch (t) {
        case i:
          return "Fragment";
        case p:
          return "Portal";
        case P:
          return "Profiler";
        case y:
          return "StrictMode";
        case Z:
          return "Suspense";
        case L:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case j:
            var u = t;
            return Te(u) + ".Consumer";
          case Y:
            var c = t;
            return Te(c._context) + ".Provider";
          case k:
            return Je(t, t.render, "ForwardRef");
          case K:
            var m = t.displayName || null;
            return m !== null ? m : Q(t.type) || "Memo";
          case oe: {
            var O = t, x = O._payload, S = O._init;
            try {
              return Q(S(x));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var ne = Object.assign, G = 0, ce, h, pe, Oe, ye, n, s;
    function E() {
    }
    E.__reactDisabledLog = !0;
    function w() {
      {
        if (G === 0) {
          ce = console.log, h = console.info, pe = console.warn, Oe = console.error, ye = console.group, n = console.groupCollapsed, s = console.groupEnd;
          var t = {
            configurable: !0,
            enumerable: !0,
            value: E,
            writable: !0
          };
          Object.defineProperties(console, {
            info: t,
            log: t,
            warn: t,
            error: t,
            group: t,
            groupCollapsed: t,
            groupEnd: t
          });
        }
        G++;
      }
    }
    function T() {
      {
        if (G--, G === 0) {
          var t = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ne({}, t, {
              value: ce
            }),
            info: ne({}, t, {
              value: h
            }),
            warn: ne({}, t, {
              value: pe
            }),
            error: ne({}, t, {
              value: Oe
            }),
            group: ne({}, t, {
              value: ye
            }),
            groupCollapsed: ne({}, t, {
              value: n
            }),
            groupEnd: ne({}, t, {
              value: s
            })
          });
        }
        G < 0 && W("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var $ = ue.ReactCurrentDispatcher, D;
    function I(t, u, c) {
      {
        if (D === void 0)
          try {
            throw Error();
          } catch (O) {
            var m = O.stack.trim().match(/\n( *(at )?)/);
            D = m && m[1] || "";
          }
        return `
` + D + t;
      }
    }
    var A = !1, J;
    {
      var Pr = typeof WeakMap == "function" ? WeakMap : Map;
      J = new Pr();
    }
    function ar(t, u) {
      if (!t || A)
        return "";
      {
        var c = J.get(t);
        if (c !== void 0)
          return c;
      }
      var m;
      A = !0;
      var O = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var x;
      x = $.current, $.current = null, w();
      try {
        if (u) {
          var S = function() {
            throw Error();
          };
          if (Object.defineProperty(S.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(S, []);
            } catch (ee) {
              m = ee;
            }
            Reflect.construct(t, [], S);
          } else {
            try {
              S.call();
            } catch (ee) {
              m = ee;
            }
            t.call(S.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ee) {
            m = ee;
          }
          t();
        }
      } catch (ee) {
        if (ee && m && typeof ee.stack == "string") {
          for (var b = ee.stack.split(`
`), H = m.stack.split(`
`), N = b.length - 1, B = H.length - 1; N >= 1 && B >= 0 && b[N] !== H[B]; )
            B--;
          for (; N >= 1 && B >= 0; N--, B--)
            if (b[N] !== H[B]) {
              if (N !== 1 || B !== 1)
                do
                  if (N--, B--, B < 0 || b[N] !== H[B]) {
                    var ae = `
` + b[N].replace(" at new ", " at ");
                    return t.displayName && ae.includes("<anonymous>") && (ae = ae.replace("<anonymous>", t.displayName)), typeof t == "function" && J.set(t, ae), ae;
                  }
                while (N >= 1 && B >= 0);
              break;
            }
        }
      } finally {
        A = !1, $.current = x, T(), Error.prepareStackTrace = O;
      }
      var Se = t ? t.displayName || t.name : "", _e = Se ? I(Se) : "";
      return typeof t == "function" && J.set(t, _e), _e;
    }
    function Me(t, u, c) {
      return ar(t, !1);
    }
    function jr(t) {
      var u = t.prototype;
      return !!(u && u.isReactComponent);
    }
    function Ue(t, u, c) {
      if (t == null)
        return "";
      if (typeof t == "function")
        return ar(t, jr(t));
      if (typeof t == "string")
        return I(t);
      switch (t) {
        case Z:
          return I("Suspense");
        case L:
          return I("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case k:
            return Me(t.render);
          case K:
            return Ue(t.type, u, c);
          case oe: {
            var m = t, O = m._payload, x = m._init;
            try {
              return Ue(x(O), u, c);
            } catch {
            }
          }
        }
      return "";
    }
    var ge = Object.prototype.hasOwnProperty, Pe = {}, or = ue.ReactDebugCurrentFrame;
    function je(t) {
      if (t) {
        var u = t._owner, c = Ue(t.type, t._source, u ? u.type : null);
        or.setExtraStackFrame(c);
      } else
        or.setExtraStackFrame(null);
    }
    function de(t, u, c, m, O) {
      {
        var x = Function.call.bind(ge);
        for (var S in t)
          if (x(t, S)) {
            var b = void 0;
            try {
              if (typeof t[S] != "function") {
                var H = Error((m || "React class") + ": " + c + " type `" + S + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof t[S] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw H.name = "Invariant Violation", H;
              }
              b = t[S](u, S, m, c, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (N) {
              b = N;
            }
            b && !(b instanceof Error) && (je(O), W("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", c, S, typeof b), je(null)), b instanceof Error && !(b.message in Pe) && (Pe[b.message] = !0, je(O), W("Failed %s type: %s", c, b.message), je(null));
          }
      }
    }
    var Ae = Array.isArray;
    function We(t) {
      return Ae(t);
    }
    function ir(t) {
      {
        var u = typeof Symbol == "function" && Symbol.toStringTag, c = u && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return c;
      }
    }
    function ur(t) {
      try {
        return Ne(t), !1;
      } catch {
        return !0;
      }
    }
    function Ne(t) {
      return "" + t;
    }
    function qe(t) {
      if (ur(t))
        return W("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ir(t)), Ne(t);
    }
    var be = ue.ReactCurrentOwner, Ar = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, sr, cr, xe;
    xe = {};
    function xr(t) {
      if (ge.call(t, "ref")) {
        var u = Object.getOwnPropertyDescriptor(t, "ref").get;
        if (u && u.isReactWarning)
          return !1;
      }
      return t.ref !== void 0;
    }
    function Ir(t) {
      if (ge.call(t, "key")) {
        var u = Object.getOwnPropertyDescriptor(t, "key").get;
        if (u && u.isReactWarning)
          return !1;
      }
      return t.key !== void 0;
    }
    function Dr(t, u) {
      if (typeof t.ref == "string" && be.current && u && be.current.stateNode !== u) {
        var c = Q(be.current.type);
        xe[c] || (W('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', Q(be.current.type), t.ref), xe[c] = !0);
      }
    }
    function Re(t, u) {
      {
        var c = function() {
          sr || (sr = !0, W("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", u));
        };
        c.isReactWarning = !0, Object.defineProperty(t, "key", {
          get: c,
          configurable: !0
        });
      }
    }
    function fr(t, u) {
      {
        var c = function() {
          cr || (cr = !0, W("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", u));
        };
        c.isReactWarning = !0, Object.defineProperty(t, "ref", {
          get: c,
          configurable: !0
        });
      }
    }
    var Fr = function(t, u, c, m, O, x, S) {
      var b = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: f,
        // Built-in properties that belong on the element
        type: t,
        key: u,
        ref: c,
        props: S,
        // Record the component responsible for creating this element.
        _owner: x
      };
      return b._store = {}, Object.defineProperty(b._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(b, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: m
      }), Object.defineProperty(b, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: O
      }), Object.freeze && (Object.freeze(b.props), Object.freeze(b)), b;
    };
    function $r(t, u, c, m, O) {
      {
        var x, S = {}, b = null, H = null;
        c !== void 0 && (qe(c), b = "" + c), Ir(u) && (qe(u.key), b = "" + u.key), xr(u) && (H = u.ref, Dr(u, O));
        for (x in u)
          ge.call(u, x) && !Ar.hasOwnProperty(x) && (S[x] = u[x]);
        if (t && t.defaultProps) {
          var N = t.defaultProps;
          for (x in N)
            S[x] === void 0 && (S[x] = N[x]);
        }
        if (b || H) {
          var B = typeof t == "function" ? t.displayName || t.name || "Unknown" : t;
          b && Re(S, B), H && fr(S, B);
        }
        return Fr(t, b, H, O, m, be.current, S);
      }
    }
    var Ve = ue.ReactCurrentOwner, lr = ue.ReactDebugCurrentFrame;
    function he(t) {
      if (t) {
        var u = t._owner, c = Ue(t.type, t._source, u ? u.type : null);
        lr.setExtraStackFrame(c);
      } else
        lr.setExtraStackFrame(null);
    }
    var Ie;
    Ie = !1;
    function Ee(t) {
      return typeof t == "object" && t !== null && t.$$typeof === f;
    }
    function De() {
      {
        if (Ve.current) {
          var t = Q(Ve.current.type);
          if (t)
            return `

Check the render method of \`` + t + "`.";
        }
        return "";
      }
    }
    function Lr(t) {
      return "";
    }
    var pr = {};
    function Mr(t) {
      {
        var u = De();
        if (!u) {
          var c = typeof t == "string" ? t : t.displayName || t.name;
          c && (u = `

Check the top-level render call using <` + c + ">.");
        }
        return u;
      }
    }
    function dr(t, u) {
      {
        if (!t._store || t._store.validated || t.key != null)
          return;
        t._store.validated = !0;
        var c = Mr(u);
        if (pr[c])
          return;
        pr[c] = !0;
        var m = "";
        t && t._owner && t._owner !== Ve.current && (m = " It was passed a child from " + Q(t._owner.type) + "."), he(t), W('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', c, m), he(null);
      }
    }
    function vr(t, u) {
      {
        if (typeof t != "object")
          return;
        if (We(t))
          for (var c = 0; c < t.length; c++) {
            var m = t[c];
            Ee(m) && dr(m, u);
          }
        else if (Ee(t))
          t._store && (t._store.validated = !0);
        else if (t) {
          var O = ie(t);
          if (typeof O == "function" && O !== t.entries)
            for (var x = O.call(t), S; !(S = x.next()).done; )
              Ee(S.value) && dr(S.value, u);
        }
      }
    }
    function Fe(t) {
      {
        var u = t.type;
        if (u == null || typeof u == "string")
          return;
        var c;
        if (typeof u == "function")
          c = u.propTypes;
        else if (typeof u == "object" && (u.$$typeof === k || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        u.$$typeof === K))
          c = u.propTypes;
        else
          return;
        if (c) {
          var m = Q(u);
          de(c, t.props, "prop", m, t);
        } else if (u.PropTypes !== void 0 && !Ie) {
          Ie = !0;
          var O = Q(u);
          W("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", O || "Unknown");
        }
        typeof u.getDefaultProps == "function" && !u.getDefaultProps.isReactClassApproved && W("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ke(t) {
      {
        for (var u = Object.keys(t.props), c = 0; c < u.length; c++) {
          var m = u[c];
          if (m !== "children" && m !== "key") {
            he(t), W("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), he(null);
            break;
          }
        }
        t.ref !== null && (he(t), W("Invalid attribute `ref` supplied to `React.Fragment`."), he(null));
      }
    }
    var Ge = {};
    function yr(t, u, c, m, O, x) {
      {
        var S = ke(t);
        if (!S) {
          var b = "";
          (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (b += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var H = Lr();
          H ? b += H : b += De();
          var N;
          t === null ? N = "null" : We(t) ? N = "array" : t !== void 0 && t.$$typeof === f ? (N = "<" + (Q(t.type) || "Unknown") + " />", b = " Did you accidentally export a JSX literal instead of a component?") : N = typeof t, W("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", N, b);
        }
        var B = $r(t, u, c, O, x);
        if (B == null)
          return B;
        if (S) {
          var ae = u.children;
          if (ae !== void 0)
            if (m)
              if (We(ae)) {
                for (var Se = 0; Se < ae.length; Se++)
                  vr(ae[Se], t);
                Object.freeze && Object.freeze(ae);
              } else
                W("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              vr(ae, t);
        }
        if (ge.call(u, "key")) {
          var _e = Q(t), ee = Object.keys(u).filter(function(Yr) {
            return Yr !== "key";
          }), He = ee.length > 0 ? "{key: someKey, " + ee.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ge[_e + He]) {
            var Vr = ee.length > 0 ? "{" + ee.join(": ..., ") + ": ...}" : "{}";
            W(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, He, _e, Vr, _e), Ge[_e + He] = !0;
          }
        }
        return t === i ? Ke(B) : Fe(B), B;
      }
    }
    function Ur(t, u, c) {
      return yr(t, u, c, !0);
    }
    function Wr(t, u, c) {
      return yr(t, u, c, !1);
    }
    var Nr = Wr, hr = Ur;
    Qe.Fragment = i, Qe.jsx = Nr, Qe.jsxs = hr;
  }()), Qe;
}
process.env.NODE_ENV === "production" ? et.exports = tn() : et.exports = nn();
var Zr = et.exports, an = {}, kr = {}, nr = {};
(function(v) {
  Object.defineProperty(v, "__esModule", { value: !0 }), v.JoystickShape = void 0, function(f) {
    f.Circle = "circle", f.Square = "square", f.AxisY = "axisY", f.AxisX = "axisX";
  }(v.JoystickShape || (v.JoystickShape = {}));
})(nr);
var Tr = {};
Object.defineProperty(Tr, "__esModule", { value: !0 });
Tr.shapeFactory = void 0;
var jt = nr, on = function(v, f) {
  switch (v) {
    case jt.JoystickShape.Square:
      return {
        borderRadius: Math.sqrt(f)
      };
    case jt.JoystickShape.Circle:
    default:
      return {
        borderRadius: f
      };
  }
};
Tr.shapeFactory = on;
var Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.shapeBoundsFactory = void 0;
var Qr = nr, un = function(v, f, p, i, y, P, Y, j, k) {
  switch (v) {
    case Qr.JoystickShape.Square:
      return i = wr(f - k.left - j / 2, j), y = wr(p - k.top - j / 2, j), { relativeX: i, relativeY: y };
    case Qr.JoystickShape.AxisX:
      return i = wr(f - k.left - j / 2, j), y = 0, { relativeX: i, relativeY: y };
    case Qr.JoystickShape.AxisY:
      return i = 0, y = wr(p - k.top - j / 2, j), { relativeX: i, relativeY: y };
    default:
      return P > Y && (i *= Y / P, y *= Y / P), { relativeX: i, relativeY: y };
  }
};
Or.shapeBoundsFactory = un;
var wr = function(v, f) {
  var p = f / 2;
  return v > p ? p : v < -p ? p * -1 : v;
}, sn = Cr && Cr.__extends || /* @__PURE__ */ function() {
  var v = function(f, p) {
    return v = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, y) {
      i.__proto__ = y;
    } || function(i, y) {
      for (var P in y) Object.prototype.hasOwnProperty.call(y, P) && (i[P] = y[P]);
    }, v(f, p);
  };
  return function(f, p) {
    if (typeof p != "function" && p !== null)
      throw new TypeError("Class extends value " + String(p) + " is not a constructor or null");
    v(f, p);
    function i() {
      this.constructor = f;
    }
    f.prototype = p === null ? Object.create(p) : (i.prototype = p.prototype, new i());
  };
}(), ze = Cr && Cr.__assign || function() {
  return ze = Object.assign || function(v) {
    for (var f, p = 1, i = arguments.length; p < i; p++) {
      f = arguments[p];
      for (var y in f) Object.prototype.hasOwnProperty.call(f, y) && (v[y] = f[y]);
    }
    return v;
  }, ze.apply(this, arguments);
};
Object.defineProperty(kr, "__esModule", { value: !0 });
kr.Joystick = void 0;
var er = tr, At = nr, xt = Tr, cn = Or, we;
(function(v) {
  v.PointerDown = "pointerdown", v.PointerMove = "pointermove", v.PointerUp = "pointerup";
})(we || (we = {}));
var $e;
(function(v) {
  v[v.TopRight = 2.35619449] = "TopRight", v[v.TopLeft = -2.35619449] = "TopLeft", v[v.BottomRight = 0.785398163] = "BottomRight", v[v.BottomLeft = -0.785398163] = "BottomLeft";
})($e || ($e = {}));
var fn = (
  /** @class */
  function(v) {
    sn(f, v);
    function f(p) {
      var i = v.call(this, p) || this;
      return i._stickRef = er.createRef(), i._baseRef = er.createRef(), i.frameId = null, i._pointerId = null, i._mounted = !1, i._pointerMove = function(y) {
        if (y.preventDefault(), i.state.dragging) {
          if (!i.props.followCursor && y.pointerId !== i._pointerId)
            return;
          var P = y.clientX, Y = y.clientY, j = P - i._parentRect.left - i._radius, k = Y - i._parentRect.top - i._radius, Z = i._distance(j, k), L = (0, cn.shapeBoundsFactory)(
            //@ts-ignore
            i.props.controlPlaneShape || i.props.baseShape,
            P,
            Y,
            j,
            k,
            Z,
            i._radius,
            i._baseSize,
            i._parentRect
          );
          j = L.relativeX, k = L.relativeY;
          var K = Math.atan2(j, k);
          i._updatePos({
            relativeX: j,
            relativeY: k,
            distance: i._distanceToPercentile(Z),
            direction: i._getDirection(K),
            axisX: P - i._parentRect.left,
            axisY: Y - i._parentRect.top
          });
        }
      }, i._pointerUp = function(y) {
        if (y.pointerId === i._pointerId) {
          var P = {
            dragging: !1
          };
          i.props.sticky || (P.coordinates = void 0), i.frameId = window.requestAnimationFrame(function() {
            i._mounted && i.setState(P);
          }), window.removeEventListener(we.PointerUp, i._pointerUp), window.removeEventListener(we.PointerMove, i._pointerMove), i._pointerId = null, i.props.stop && i.props.stop({
            type: "stop",
            // @ts-ignore
            x: i.props.sticky ? i.state.coordinates.relativeX * 2 / i._baseSize : null,
            // @ts-ignore
            y: i.props.sticky ? i.state.coordinates.relativeY * 2 / i._baseSize : null,
            // @ts-ignore
            direction: i.props.sticky ? i.state.coordinates.direction : null,
            // @ts-ignore
            distance: i.props.sticky ? i.state.coordinates.distance : null
          });
        }
      }, i.state = {
        dragging: !1
      }, i._throttleMoveCallback = /* @__PURE__ */ function() {
        var y = 0;
        return function(P) {
          var Y = (/* @__PURE__ */ new Date()).getTime(), j = i.props.throttle || 0;
          if (!(Y - y < j) && (y = Y, i.props.move))
            return i.props.move(P);
        };
      }(), i;
    }
    return f.prototype.componentWillUnmount = function() {
      var p = this;
      this._mounted = !1, this.props.followCursor && window.removeEventListener(we.PointerMove, function(i) {
        return p._pointerMove(i);
      }), this.frameId !== null && window.cancelAnimationFrame(this.frameId);
    }, f.prototype.componentDidMount = function() {
      var p = this;
      this._mounted = !0, this.props.followCursor && (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(we.PointerMove, function(i) {
        return p._pointerMove(i);
      }), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, f.prototype._updatePos = function(p) {
      var i = this;
      this.frameId = window.requestAnimationFrame(function() {
        i._mounted && i.setState({
          coordinates: p
        });
      }), !(typeof this.props.minDistance == "number" && p.distance < this.props.minDistance) && this._throttleMoveCallback({
        type: "move",
        x: p.relativeX * 2 / this._baseSize,
        y: -(p.relativeY * 2 / this._baseSize),
        direction: p.direction,
        distance: p.distance
      });
    }, f.prototype._pointerDown = function(p) {
      this.props.disabled || this.props.followCursor || (this._parentRect = this._baseRef.current.getBoundingClientRect(), this.setState({
        dragging: !0
      }), window.addEventListener(we.PointerUp, this._pointerUp), window.addEventListener(we.PointerMove, this._pointerMove), this._pointerId = p.pointerId, this._stickRef.current.setPointerCapture(p.pointerId), this.props.start && this.props.start({
        type: "start",
        x: null,
        y: null,
        distance: null,
        direction: null
      }));
    }, f.prototype._getDirection = function(p) {
      return p > $e.TopRight || p < $e.TopLeft ? "FORWARD" : p < $e.TopRight && p > $e.BottomRight ? "RIGHT" : p < $e.BottomLeft ? "LEFT" : "BACKWARD";
    }, f.prototype._distance = function(p, i) {
      return Math.hypot(p, i);
    }, f.prototype._distanceToPercentile = function(p) {
      var i = p / (this._baseSize / 2) * 100;
      return i > 100 ? 100 : i;
    }, f.prototype.getBaseShapeStyle = function() {
      var p = this.props.baseShape || At.JoystickShape.Circle;
      return (0, xt.shapeFactory)(p, this._baseSize);
    }, f.prototype.getStickShapeStyle = function() {
      var p = this.props.stickShape || At.JoystickShape.Circle;
      return (0, xt.shapeFactory)(p, this._baseSize);
    }, f.prototype._getBaseStyle = function() {
      var p = this.props.baseColor !== void 0 ? this.props.baseColor : "#000033", i = "".concat(this._baseSize, "px"), y = ze(ze({}, this.getBaseShapeStyle()), { height: i, width: i, background: p, display: "flex", justifyContent: "center", alignItems: "center" });
      return this.props.baseImage && (y.background = "url(".concat(this.props.baseImage, ")"), y.backgroundSize = "100%"), y;
    }, f.prototype._getStickStyle = function() {
      var p = this.props.stickColor !== void 0 ? this.props.stickColor : "#3D59AB", i = this._stickSize ? "".concat(this._stickSize, "px") : "".concat(this._baseSize / 1.5, "px"), y = ze(ze({}, this.getStickShapeStyle()), { background: p, cursor: "move", height: i, width: i, border: "none", flexShrink: 0, touchAction: "none" });
      return this.props.stickImage && (y.background = "url(".concat(this.props.stickImage, ")"), y.backgroundSize = "100%"), this.props.pos && (y = Object.assign({}, y, {
        position: "absolute",
        transform: "translate3d(".concat(this.props.pos.x * this._baseSize / 2, "px, ").concat(-(this.props.pos.y * this._baseSize) / 2, "px, 0)")
      })), this.state.coordinates !== void 0 && (y = Object.assign({}, y, {
        position: "absolute",
        transform: "translate3d(".concat(this.state.coordinates.relativeX, "px, ").concat(this.state.coordinates.relativeY, "px, 0)")
      })), y;
    }, f.prototype.render = function() {
      var p = this;
      this._baseSize = this.props.size || 100, this._stickSize = this.props.stickSize, this._radius = this._baseSize / 2;
      var i = this._getBaseStyle(), y = this._getStickStyle();
      return er.createElement(
        "div",
        { "data-testid": "joystick-base", className: this.props.disabled ? "joystick-base-disabled" : "", ref: this._baseRef, style: i },
        er.createElement("button", { ref: this._stickRef, disabled: this.props.disabled, onPointerDown: function(P) {
          return p._pointerDown(P);
        }, className: this.props.disabled ? "joystick-disabled" : "", style: y })
      );
    }, f;
  }(er.Component)
);
kr.Joystick = fn;
(function(v) {
  Object.defineProperty(v, "__esModule", { value: !0 }), v.JoystickShape = v.Joystick = void 0;
  var f = kr;
  Object.defineProperty(v, "Joystick", { enumerable: !0, get: function() {
    return f.Joystick;
  } });
  var p = nr;
  Object.defineProperty(v, "JoystickShape", { enumerable: !0, get: function() {
    return p.JoystickShape;
  } });
})(an);
const ln = () => {
  tr.useState(0);
  const [v, f] = tr.useState(0);
  console.log(v);
  try {
    console.log("public:" + process.env.PUBLIC_URL);
  } catch {
    console.log("public failed");
  }
  try {
    console.log("origin:" + window.location.origin);
  } catch {
    console.log("origin failed");
  }
  return /* @__PURE__ */ Zr.jsxs("div", { children: [
    /* @__PURE__ */ Zr.jsx("span", { style: { position: "fixed", zIndex: 999, top: 0, backgroundColor: "white" }, children: v }),
    /* @__PURE__ */ Zr.jsx("img", { src: "/foresee-revamp2/mountain.jpg", alt: "My Image" })
  ] });
};
export {
  ln as default
};
