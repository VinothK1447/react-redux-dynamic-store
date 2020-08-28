"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _rootReducer = _interopRequireDefault(require("./rootReducer"));

var _MiddlewareManager = require("./MiddlewareManager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var REDUCER_ADDED = '@@dynamic-store/REDUCER_ADDED';
var REDUCER_REMOVED = '@@dynamic-store/REDUCER_REMOVED';

var initializeStore = function initializeStore(options) {
  var store;

  if (options) {
    var middleware = options.middleware;

    if (middleware && middleware === 'thunk') {
      store = _MiddlewareManager.middlewarestore;
    }
  } else {
    store = (0, _redux.createStore)((0, _rootReducer["default"])(), _redux.compose.apply(void 0, _toConsumableArray(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : [])));
  }

  store.asyncReducers = {};

  store.injectReducer = function (key, reducer) {
    if (!store.asyncReducers.hasOwnProperty(key)) {
      store.asyncReducers[key] = reducer;
      store.replaceReducer((0, _rootReducer["default"])(store.asyncReducers));
      store.dispatch({
        type: REDUCER_ADDED,
        payload: key
      });
    }
  };

  store.removeReducer = function (key) {
    if (store.asyncReducers.hasOwnProperty(key)) {
      delete store.asyncReducers[key];
      store.dispatch({
        type: "".concat(REDUCER_REMOVED, "/").concat(key),
        payload: key
      });
    }

    store.replaceReducer((0, _rootReducer["default"])(store.asyncReducers));
  };

  return store;
};

var _default = initializeStore;
exports["default"] = _default;