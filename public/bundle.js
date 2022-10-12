/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
  let warned = false;
  return () => {
    if (!warned) {
      warned = true;
      console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
    }
  };
})();

/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
  // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
  // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
  // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);
  if (!this.useColors) {
    return;
  }
  const c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit');

  // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  let index = 0;
  let lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, match => {
    if (match === '%%') {
      return;
    }
    index++;
    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
  let r;
  try {
    r = exports.storage.getItem('debug');
  } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
  }

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }
  return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
module.exports = __webpack_require__(/*! ./common */ "./node_modules/debug/src/common.js")(exports);
const {
  formatters
} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};

/***/ }),

/***/ "./node_modules/debug/src/common.js":
/*!******************************************!*\
  !*** ./node_modules/debug/src/common.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");
  createDebug.destroy = destroy;
  Object.keys(env).forEach(key => {
    createDebug[key] = env[key];
  });

  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];

  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */
  createDebug.formatters = {};

  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */
  function selectColor(namespace) {
    let hash = 0;
    for (let i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }
  createDebug.selectColor = selectColor;

  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */
  function createDebug(namespace) {
    let prevTime;
    let enableOverride = null;
    let namespacesCache;
    let enabledCache;
    function debug(...args) {
      // Disabled?
      if (!debug.enabled) {
        return;
      }
      const self = debug;

      // Set `diff` timestamp
      const curr = Number(new Date());
      const ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);
      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      }

      // Apply any `formatters` transformations
      let index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return '%';
        }
        index++;
        const formatter = createDebug.formatters[format];
        if (typeof formatter === 'function') {
          const val = args[index];
          match = formatter.call(self, val);

          // Now we need to remove `args[index]` since it's inlined in the `format`
          args.splice(index, 1);
          index--;
        }
        return match;
      });

      // Apply env-specific formatting (colors, etc.)
      createDebug.formatArgs.call(self, args);
      const logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }
    debug.namespace = namespace;
    debug.useColors = createDebug.useColors();
    debug.color = createDebug.selectColor(namespace);
    debug.extend = extend;
    debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

    Object.defineProperty(debug, 'enabled', {
      enumerable: true,
      configurable: false,
      get: () => {
        if (enableOverride !== null) {
          return enableOverride;
        }
        if (namespacesCache !== createDebug.namespaces) {
          namespacesCache = createDebug.namespaces;
          enabledCache = createDebug.enabled(namespace);
        }
        return enabledCache;
      },
      set: v => {
        enableOverride = v;
      }
    });

    // Env-specific initialization logic for debug instances
    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }
    return debug;
  }
  function extend(namespace, delimiter) {
    const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
    newDebug.log = this.log;
    return newDebug;
  }

  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */
  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.namespaces = namespaces;
    createDebug.names = [];
    createDebug.skips = [];
    let i;
    const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    const len = split.length;
    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }
      namespaces = split[i].replace(/\*/g, '.*?');
      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }
  }

  /**
  * Disable debug output.
  *
  * @return {String} namespaces
  * @api public
  */
  function disable() {
    const namespaces = [...createDebug.names.map(toNamespace), ...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)].join(',');
    createDebug.enable('');
    return namespaces;
  }

  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */
  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }
    let i;
    let len;
    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }

  /**
  * Convert regexp to namespace
  *
  * @param {RegExp} regxep
  * @return {String} namespace
  * @api private
  */
  function toNamespace(regexp) {
    return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
  }

  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */
  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }
    return val;
  }

  /**
  * XXX DO NOT USE. This is a temporary stub function.
  * XXX It WILL be removed in the next major release.
  */
  function destroy() {
    console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
  }
  createDebug.enable(createDebug.load());
  return createDebug;
}
module.exports = setup;

/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

/***/ }),

/***/ "./src/round.js":
/*!**********************!*\
  !*** ./src/round.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var round = function round(number, decimalPlaces) {
  var factorOfTen = Math.pow(10, decimalPlaces);
  return Math.round(number * factorOfTen) / factorOfTen;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (round);

/***/ }),

/***/ "./node_modules/@tgwf/co2/dist/esm/1byte.js":
/*!**************************************************!*\
  !*** ./node_modules/@tgwf/co2/dist/esm/1byte.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OneByte": () => (/* binding */ OneByte),
/* harmony export */   "default": () => (/* binding */ byte_default)
/* harmony export */ });
const CO2_PER_KWH_IN_DC_GREY = 519;
const CO2_PER_KWH_NETWORK_GREY = 475;
const CO2_PER_KWH_IN_DC_GREEN = 0;
const KWH_PER_BYTE_IN_DC = 72e-12;
const FIXED_NETWORK_WIRED = 429e-12;
const FIXED_NETWORK_WIFI = 152e-12;
const FOUR_G_MOBILE = 884e-12;
const KWH_PER_BYTE_FOR_NETWORK = (FIXED_NETWORK_WIRED + FIXED_NETWORK_WIFI + FOUR_G_MOBILE) / 3;
const KWH_PER_BYTE_FOR_DEVICES = 13e-11;
class OneByte {
  constructor(options) {
    this.options = options;
    this.KWH_PER_BYTE_FOR_NETWORK = KWH_PER_BYTE_FOR_NETWORK;
  }
  perByte(bytes, green) {
    if (bytes < 1) {
      return 0;
    }
    if (green) {
      const Co2ForDC = bytes * KWH_PER_BYTE_IN_DC * CO2_PER_KWH_IN_DC_GREEN;
      const Co2forNetwork = bytes * KWH_PER_BYTE_FOR_NETWORK * CO2_PER_KWH_NETWORK_GREY;
      return Co2ForDC + Co2forNetwork;
    }
    const KwHPerByte = KWH_PER_BYTE_IN_DC + KWH_PER_BYTE_FOR_NETWORK;
    return bytes * KwHPerByte * CO2_PER_KWH_IN_DC_GREY;
  }
}
var byte_default = OneByte;


/***/ }),

/***/ "./node_modules/@tgwf/co2/dist/esm/co2.js":
/*!************************************************!*\
  !*** ./node_modules/@tgwf/co2/dist/esm/co2.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CO2": () => (/* binding */ CO2),
/* harmony export */   "default": () => (/* binding */ co2_default)
/* harmony export */ });
/* harmony import */ var _1byte_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./1byte.js */ "./node_modules/@tgwf/co2/dist/esm/1byte.js");
/* harmony import */ var _sustainable_web_design_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sustainable-web-design.js */ "./node_modules/@tgwf/co2/dist/esm/sustainable-web-design.js");




class CO2 {
  constructor(options) {
    this.model = new _sustainable_web_design_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    if ((options == null ? void 0 : options.model) === "1byte") {
      this.model = new _1byte_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    } else if ((options == null ? void 0 : options.model) === "swd") {
      this.model = new _sustainable_web_design_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    } else if (options == null ? void 0 : options.model) {
      throw new Error(`"${options.model}" is not a valid model. Please use "1byte" for the OneByte model, and "swd" for the Sustainable Web Design model.
See https://developers.thegreenwebfoundation.org/co2js/models/ to learn more about the models available in CO2.js.`);
    }
  }
  perByte(bytes, green) {
    return this.model.perByte(bytes, green);
  }
  perVisit(bytes, green) {
    var _a;
    if ((_a = this.model) == null ? void 0 : _a.perVisit) {
      return this.model.perVisit(bytes, green);
    } else {
      throw new Error(`The perVisit() method is not supported in the model you are using. Try using perByte() instead.
See https://developers.thegreenwebfoundation.org/co2js/methods/ to learn more about the methods available in CO2.js.`);
    }
  }
  perDomain(pageXray, greenDomains) {
    const co2PerDomain = [];
    for (let domain of Object.keys(pageXray.domains)) {
      let co2;
      if (greenDomains && greenDomains.indexOf(domain) > -1) {
        co2 = this.perByte(pageXray.domains[domain].transferSize, true);
      } else {
        co2 = this.perByte(pageXray.domains[domain].transferSize);
      }
      co2PerDomain.push({
        domain,
        co2,
        transferSize: pageXray.domains[domain].transferSize
      });
    }
    co2PerDomain.sort((a, b) => b.co2 - a.co2);
    return co2PerDomain;
  }
  perPage(pageXray, green) {
    const domainCO2 = this.perDomain(pageXray, green);
    let totalCO2 = 0;
    for (let domain of domainCO2) {
      totalCO2 += domain.co2;
    }
    return totalCO2;
  }
  perContentType(pageXray, greenDomains) {
    const co2PerContentType = {};
    for (let asset of pageXray.assets) {
      const domain = new URL(asset.url).domain;
      const transferSize = asset.transferSize;
      const co2ForTransfer = this.perByte(transferSize, greenDomains && greenDomains.indexOf(domain) > -1);
      const contentType = asset.type;
      if (!co2PerContentType[contentType]) {
        co2PerContentType[contentType] = {
          co2: 0,
          transferSize: 0
        };
      }
      co2PerContentType[contentType].co2 += co2ForTransfer;
      co2PerContentType[contentType].transferSize += transferSize;
    }
    const all = [];
    for (let type of Object.keys(co2PerContentType)) {
      all.push({
        type,
        co2: co2PerContentType[type].co2,
        transferSize: co2PerContentType[type].transferSize
      });
    }
    all.sort((a, b) => b.co2 - a.co2);
    return all;
  }
  dirtiestResources(pageXray, greenDomains) {
    const allAssets = [];
    for (let asset of pageXray.assets) {
      const domain = new URL(asset.url).domain;
      const transferSize = asset.transferSize;
      const co2ForTransfer = this.perByte(transferSize, greenDomains && greenDomains.indexOf(domain) > -1);
      allAssets.push({
        url: asset.url,
        co2: co2ForTransfer,
        transferSize
      });
    }
    allAssets.sort((a, b) => b.co2 - a.co2);
    return allAssets.slice(0, allAssets.length > 10 ? 10 : allAssets.length);
  }
  perParty(pageXray, greenDomains) {
    let firstParty = 0;
    let thirdParty = 0;
    const firstPartyRegEx = pageXray.firstPartyRegEx;
    for (let d of Object.keys(pageXray.domains)) {
      if (!d.match(firstPartyRegEx)) {
        thirdParty += this.perByte(pageXray.domains[d].transferSize, greenDomains && greenDomains.indexOf(d) > -1);
      } else {
        firstParty += this.perByte(pageXray.domains[d].transferSize, greenDomains && greenDomains.indexOf(d) > -1);
      }
    }
    return {
      firstParty,
      thirdParty
    };
  }
}
var co2_default = CO2;


/***/ }),

/***/ "./node_modules/@tgwf/co2/dist/esm/constants/file-size.js":
/*!****************************************************************!*\
  !*** ./node_modules/@tgwf/co2/dist/esm/constants/file-size.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ file_size_default)
/* harmony export */ });
const GIGABYTE = 1e3 * 1e3 * 1e3;
var file_size_default = {
  GIGABYTE
};


/***/ }),

/***/ "./node_modules/@tgwf/co2/dist/esm/constants/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@tgwf/co2/dist/esm/constants/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fileSize": () => (/* reexport safe */ _file_size_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _file_size_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-size.js */ "./node_modules/@tgwf/co2/dist/esm/constants/file-size.js");



/***/ }),

/***/ "./node_modules/@tgwf/co2/dist/esm/data/average-intensities-2021.min.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@tgwf/co2/dist/esm/data/average-intensities-2021.min.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "data": () => (/* binding */ data),
/* harmony export */   "default": () => (/* binding */ average_intensities_2021_min_default),
/* harmony export */   "type": () => (/* binding */ type),
/* harmony export */   "year": () => (/* binding */ year)
/* harmony export */ });
const data = {
  "AFRICA": "489.26",
  "ARG": "365.292",
  "ARM": "206.522",
  "ASIA": "543.57",
  "AUS": "526.876",
  "AUT": "145.083",
  "AZE": "536.585",
  "BGD": "559.606",
  "BLR": "472.727",
  "BEL": "156.063",
  "BOL": "311.475",
  "BIH": "470.982",
  "BRA": "144.677",
  "BGR": "364.136",
  "BDI": "275.862",
  "CAN": "123.859",
  "CHL": "395.565",
  "CHN": "549.288",
  "CRI": "30.903",
  "HRV": "212.161",
  "CYP": "601.19",
  "CZE": "401.272",
  "DNK": "240.419",
  "ECU": "132.964",
  "EGY": "470.879",
  "SLV": "180.87",
  "EST": "488.529",
  "EU": "261.43",
  "EUROPE": "277.64",
  "FIN": "152.651",
  "FRA": "67.781",
  "G20": "445.9",
  "G7": "338.04",
  "GEO": "105.685",
  "DEU": "363.982",
  "GRC": "363.388",
  "HUN": "236.271",
  "IND": "632.656",
  "IRL": "361.274",
  "ITA": "340.937",
  "JPN": "460.647",
  "KAZ": "656.097",
  "KEN": "104.0",
  "LATIN AMERICA AND CARIBBEAN": "261.51",
  "LVA": "226.351",
  "LTU": "247.475",
  "LUX": "183.824",
  "MLT": "452.055",
  "MEX": "391.582",
  "MDA": "642.512",
  "MNG": "725.26",
  "MNE": "335.958",
  "NLD": "386.189",
  "NORTH AMERICA": "345.38",
  "MKD": "444.191",
  "NOR": "26.131",
  "OCEANIA": "479.98",
  "OECD": "338.24",
  "PAK": "363.065",
  "PER": "241.492",
  "PHL": "579.689",
  "POL": "657.138",
  "PRT": "222.632",
  "ROU": "255.718",
  "RUS": "355.431",
  "SAU": "568.967",
  "SEN": "540.098",
  "SRB": "549.083",
  "SGP": "488.21",
  "SVK": "173.854",
  "SVN": "241.956",
  "ZAF": "706.991",
  "KOR": "442.389",
  "ESP": "193.737",
  "SWE": "43.9",
  "CHE": "58.952",
  "TWN": "565.629",
  "TJK": "72.823",
  "THA": "503.034",
  "TUN": "470.848",
  "TUR": "432.293",
  "UKR": "240.28",
  "GBR": "268.255",
  "USA": "378.625",
  "VNM": "491.192",
  "WORLD": "442.37"
};
const type = "average";
const year = "2021";
var average_intensities_2021_min_default = {
  data,
  type,
  year
};


/***/ }),

/***/ "./node_modules/@tgwf/co2/dist/esm/data/marginal-intensities-2021.min.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@tgwf/co2/dist/esm/data/marginal-intensities-2021.min.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "data": () => (/* binding */ data),
/* harmony export */   "default": () => (/* binding */ marginal_intensities_2021_min_default),
/* harmony export */   "type": () => (/* binding */ type),
/* harmony export */   "year": () => (/* binding */ year)
/* harmony export */ });
const data = {
  "AFG": "414",
  "ALB": "0",
  "DZA": "528",
  "ASM": "753",
  "AND": "188",
  "AGO": "1476",
  "AIA": "753",
  "ATG": "753",
  "ARG": "478",
  "ARM": "390",
  "ABW": "753",
  "AUS": "808",
  "AUT": "242",
  "AZE": "534",
  "AZORES (PORTUGAL)": "753",
  "BHS": "753",
  "BHR": "726",
  "BGD": "528",
  "BRB": "749",
  "BLR": "400",
  "BEL": "252",
  "BLZ": "403",
  "BEN": "745",
  "BMU": "753",
  "BTN": "0",
  "BOL": "604",
  "BES": "753",
  "BIH": "1197",
  "BWA": "1486",
  "BRA": "284",
  "VGB": "753",
  "BRN": "681",
  "BGR": "911",
  "BFA": "753",
  "BDI": "414",
  "KHM": "1046",
  "CMR": "659",
  "CAN": "372",
  "CYM": "753",
  "CPV": "753",
  "CAF": "188",
  "TCD": "753",
  "CHANNEL ISLANDS (U.K)": "753",
  "CHL": "657",
  "CHN": "899",
  "COL": "410",
  "COM": "753",
  "COD": "0",
  "COG": "659",
  "COK": "753",
  "CRI": "108",
  "CIV": "466",
  "HRV": "294",
  "CUB": "559",
  "CUW": "876",
  "CYP": "751",
  "CZE": "902",
  "DNK": "362",
  "DJI": "753",
  "DMA": "753",
  "DOM": "601",
  "ECU": "560",
  "EGY": "554",
  "SLV": "547",
  "GNQ": "632",
  "ERI": "915",
  "EST": "1057",
  "SWZ": "0",
  "ETH": "0",
  "FLK": "753",
  "FRO": "753",
  "FJI": "640",
  "FIN": "267",
  "FRA": "158",
  "GUF": "423",
  "PYF": "753",
  "GAB": "946",
  "GMB": "753",
  "GEO": "289",
  "DEU": "650",
  "GHA": "495",
  "GIB": "779",
  "GRC": "507",
  "GRL": "264",
  "GRD": "753",
  "GLP": "753",
  "GUM": "753",
  "GTM": "798",
  "GIN": "753",
  "GNB": "753",
  "GUY": "847",
  "HTI": "1048",
  "HND": "662",
  "HUN": "296",
  "ISL": "0",
  "IND": "951",
  "IDN": "783",
  "IRN": "592",
  "IRQ": "1080",
  "IRL": "380",
  "IMN": "436",
  "ISR": "394",
  "ITA": "414",
  "JAM": "711",
  "JPN": "471",
  "JOR": "529",
  "KAZ": "797",
  "KEN": "574",
  "KIR": "753",
  "PRK": "754",
  "KOR": "555",
  "XKX": "1145",
  "KWT": "675",
  "KGZ": "217",
  "LAO": "1069",
  "LVA": "240",
  "LBN": "794",
  "LSO": "0",
  "LBR": "677",
  "LBY": "668",
  "LIE": "151",
  "LTU": "211",
  "LUX": "220",
  "MDG": "876",
  "MADEIRA (PORTUGAL)": "663",
  "MWI": "489",
  "MYS": "551",
  "MDV": "753",
  "MLI": "1076",
  "MLT": "520",
  "MHL": "753",
  "MTQ": "753",
  "MRT": "753",
  "MUS": "700",
  "MYT": "753",
  "MEX": "531",
  "FSM": "753",
  "MDA": "541",
  "MCO": "158",
  "MNG": "1366",
  "MNE": "899",
  "MSR": "753",
  "MAR": "729",
  "MOZ": "234",
  "MMR": "719",
  "NAM": "355",
  "NRU": "753",
  "NPL": "0",
  "NLD": "326",
  "NCL": "779",
  "NZL": "246",
  "NIC": "675",
  "NER": "772",
  "NGA": "526",
  "NIU": "753",
  "MKD": "851",
  "MNP": "753",
  "NOR": "47",
  "OMN": "479",
  "PAK": "592",
  "PLW": "753",
  "PSE": "719",
  "PAN": "477",
  "PNG": "597",
  "PRY": "0",
  "PER": "473",
  "PHL": "672",
  "POL": "828",
  "PRT": "389",
  "PRI": "596",
  "QAT": "503",
  "REU": "772",
  "ROU": "489",
  "RUS": "476",
  "RWA": "712",
  "SHN": "753",
  "KNA": "753",
  "LCA": "753",
  "MAF": "753",
  "SPM": "753",
  "VCT": "753",
  "WSM": "753",
  "SMR": "414",
  "STP": "753",
  "SAU": "592",
  "SEN": "870",
  "SRB": "1086",
  "SYC": "753",
  "SLE": "489",
  "SGP": "379",
  "SXM": "753",
  "SVK": "332",
  "SVN": "620",
  "SLB": "753",
  "SOM": "753",
  "ZAF": "1070",
  "SSD": "890",
  "ESP": "402",
  "LKA": "731",
  "SDN": "736",
  "SUR": "1029",
  "SWE": "68",
  "CHE": "48",
  "SYR": "713",
  "TWN": "484",
  "TJK": "255",
  "TZA": "531",
  "THA": "450",
  "TLS": "753",
  "TGO": "859",
  "TON": "753",
  "TTO": "559",
  "TUN": "468",
  "TUR": "376",
  "TKM": "927",
  "TCA": "753",
  "TUV": "753",
  "UGA": "279",
  "UKR": "768",
  "ARE": "556",
  "GBR": "380",
  "USA": "416",
  "URY": "174",
  "UZB": "612",
  "VUT": "753",
  "VEN": "711",
  "VNM": "560",
  "VIR": "650",
  "YEM": "807",
  "ZMB": "416",
  "ZWE": "1575",
  "MEMO:  EU 27": "409"
};
const type = "marginal";
const year = "2021";
var marginal_intensities_2021_min_default = {
  data,
  type,
  year
};


/***/ }),

/***/ "./node_modules/@tgwf/co2/dist/esm/helpers/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@tgwf/co2/dist/esm/helpers/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatNumber": () => (/* binding */ formatNumber)
/* harmony export */ });
const formatNumber = num => parseFloat(num.toFixed(2));


/***/ }),

/***/ "./node_modules/@tgwf/co2/dist/esm/hosting-api.js":
/*!********************************************************!*\
  !*** ./node_modules/@tgwf/co2/dist/esm/hosting-api.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ hosting_api_default)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");



const log = debug__WEBPACK_IMPORTED_MODULE_0__("tgwf:hostingAPI");
function check(domain) {
  if (typeof domain === "string") {
    return checkAgainstAPI(domain);
  } else {
    return checkDomainsAgainstAPI(domain);
  }
}
async function checkAgainstAPI(domain) {
  const req = await fetch(`https://api.thegreenwebfoundation.org/greencheck/${domain}`);
  const res = await req.json();
  return res.green;
}
async function checkDomainsAgainstAPI(domains) {
  try {
    const apiPath = "https://api.thegreenwebfoundation.org/v2/greencheckmulti";
    const domainsString = JSON.stringify(domains);
    const req = await fetch(`${apiPath}/${domainsString}`);
    log(`${apiPath}/${domainsString}`);
    log({
      req
    });
    const textResult = await req.text();
    log({
      textResult
    });
    const allGreenCheckResults = await req.json();
    return greenDomainsFromResults(allGreenCheckResults);
  } catch (e) {
    return [];
  }
}
function greenDomainsFromResults(greenResults) {
  const entries = Object.entries(greenResults);
  const greenEntries = entries.filter(([key, val]) => val.green);
  return greenEntries.map(([key, val]) => val.url);
}
var hosting_api_default = {
  check
};


/***/ }),

/***/ "./node_modules/@tgwf/co2/dist/esm/hosting.js":
/*!****************************************************!*\
  !*** ./node_modules/@tgwf/co2/dist/esm/hosting.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ hosting_default)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var _hosting_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hosting-api.js */ "./node_modules/@tgwf/co2/dist/esm/hosting-api.js");



const log = debug__WEBPACK_IMPORTED_MODULE_0__("tgwf:hosting");

function check(domain, db) {
  return _hosting_api_js__WEBPACK_IMPORTED_MODULE_1__["default"].check(domain);
}
var hosting_default = {
  check
};


/***/ }),

/***/ "./node_modules/@tgwf/co2/dist/esm/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@tgwf/co2/dist/esm/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "averageIntensity": () => (/* reexport safe */ _data_average_intensities_2021_min_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "co2": () => (/* reexport safe */ _co2_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "default": () => (/* binding */ src_default),
/* harmony export */   "hosting": () => (/* reexport safe */ _hosting_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "marginalIntensity": () => (/* reexport safe */ _data_marginal_intensities_2021_min_js__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _co2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./co2.js */ "./node_modules/@tgwf/co2/dist/esm/co2.js");
/* harmony import */ var _hosting_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hosting.js */ "./node_modules/@tgwf/co2/dist/esm/hosting.js");
/* harmony import */ var _data_average_intensities_2021_min_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/average-intensities-2021.min.js */ "./node_modules/@tgwf/co2/dist/esm/data/average-intensities-2021.min.js");
/* harmony import */ var _data_marginal_intensities_2021_min_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data/marginal-intensities-2021.min.js */ "./node_modules/@tgwf/co2/dist/esm/data/marginal-intensities-2021.min.js");




var src_default = {
  co2: _co2_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  hosting: _hosting_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  averageIntensity: _data_average_intensities_2021_min_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  marginalIntensity: _data_marginal_intensities_2021_min_js__WEBPACK_IMPORTED_MODULE_3__["default"]
};


/***/ }),

/***/ "./node_modules/@tgwf/co2/dist/esm/sustainable-web-design.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tgwf/co2/dist/esm/sustainable-web-design.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SustainableWebDesign": () => (/* binding */ SustainableWebDesign),
/* harmony export */   "default": () => (/* binding */ sustainable_web_design_default)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var _constants_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants/index.js */ "./node_modules/@tgwf/co2/dist/esm/constants/index.js");
/* harmony import */ var _helpers_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/index.js */ "./node_modules/@tgwf/co2/dist/esm/helpers/index.js");



const log = debug__WEBPACK_IMPORTED_MODULE_0__("tgwf:sustainable-web-design");


const KWH_PER_GB = 0.81;
const END_USER_DEVICE_ENERGY = 0.52;
const NETWORK_ENERGY = 0.14;
const DATACENTER_ENERGY = 0.15;
const PRODUCTION_ENERGY = 0.19;
const GLOBAL_INTENSITY = 442;
const RENEWABLES_INTENSITY = 50;
const FIRST_TIME_VIEWING_PERCENTAGE = 0.75;
const RETURNING_VISITOR_PERCENTAGE = 0.25;
const PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD = 0.02;
class SustainableWebDesign {
  constructor(options) {
    this.options = options;
  }
  energyPerByteByComponent(bytes) {
    const transferedBytesToGb = bytes / _constants_index_js__WEBPACK_IMPORTED_MODULE_1__.fileSize.GIGABYTE;
    const energyUsage = transferedBytesToGb * KWH_PER_GB;
    return {
      consumerDeviceEnergy: energyUsage * END_USER_DEVICE_ENERGY,
      networkEnergy: energyUsage * NETWORK_ENERGY,
      productionEnergy: energyUsage * PRODUCTION_ENERGY,
      dataCenterEnergy: energyUsage * DATACENTER_ENERGY
    };
  }
  co2byComponent(energyBycomponent, carbonIntensity = GLOBAL_INTENSITY) {
    const returnCO2ByComponent = {};
    for (const [key, value] of Object.entries(energyBycomponent)) {
      if (key.startsWith("dataCenterEnergy")) {
        returnCO2ByComponent[key] = value * carbonIntensity;
      } else {
        returnCO2ByComponent[key] = value * GLOBAL_INTENSITY;
      }
    }
    return returnCO2ByComponent;
  }
  perByte(bytes, carbonIntensity = GLOBAL_INTENSITY) {
    const energyBycomponent = this.energyPerByteByComponent(bytes);
    if (Boolean(carbonIntensity) === false) {
      carbonIntensity = GLOBAL_INTENSITY;
    }
    if (carbonIntensity === true) {
      carbonIntensity = RENEWABLES_INTENSITY;
    }
    if (typeof carbonIntensity !== "number") {
      throw new Error(`perByte expects a numeric value or boolean for the carbon intensity value. Received: ${carbonIntensity}`);
    }
    const co2ValuesbyComponent = this.co2byComponent(energyBycomponent, carbonIntensity);
    const co2Values = Object.values(co2ValuesbyComponent);
    return co2Values.reduce((prevValue, currentValue) => prevValue + currentValue);
  }
  perVisit(bytes, carbonIntensity = GLOBAL_INTENSITY) {
    const energyBycomponent = this.energyPerVisitByComponent(bytes);
    if (Boolean(carbonIntensity) === false) {
      carbonIntensity = GLOBAL_INTENSITY;
    }
    if (carbonIntensity === true) {
      carbonIntensity = RENEWABLES_INTENSITY;
    }
    if (typeof carbonIntensity !== "number") {
      throw new Error(`perVisit expects a numeric value or boolean for the carbon intensity value. Received: ${carbonIntensity}`);
    }
    const co2ValuesbyComponent = this.co2byComponent(energyBycomponent, carbonIntensity);
    const co2Values = Object.values(co2ValuesbyComponent);
    return co2Values.reduce((prevValue, currentValue) => prevValue + currentValue);
  }
  energyPerByte(bytes) {
    const energyByComponent = this.energyPerByteByComponent(bytes);
    const energyValues = Object.values(energyByComponent);
    return energyValues.reduce((prevValue, currentValue) => prevValue + currentValue);
  }
  energyPerVisitByComponent(bytes, firstView = FIRST_TIME_VIEWING_PERCENTAGE, returnView = RETURNING_VISITOR_PERCENTAGE, dataReloadRatio = PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD) {
    const energyBycomponent = this.energyPerByteByComponent(bytes);
    const cacheAdjustedSegmentEnergy = {};
    log({
      energyBycomponent
    });
    const energyValues = Object.values(energyBycomponent);
    for (const [key, value] of Object.entries(energyBycomponent)) {
      cacheAdjustedSegmentEnergy[`${key} - first`] = value * firstView;
      cacheAdjustedSegmentEnergy[`${key} - subsequent`] = value * returnView * dataReloadRatio;
    }
    log({
      cacheAdjustedSegmentEnergy
    });
    return cacheAdjustedSegmentEnergy;
  }
  energyPerVisit(bytes) {
    let firstVisits = 0;
    let subsequentVisits = 0;
    const energyBycomponent = Object.entries(this.energyPerVisitByComponent(bytes));
    for (const [key, val] of energyBycomponent) {
      if (key.indexOf("first") > 0) {
        firstVisits += val;
      }
    }
    for (const [key, val] of energyBycomponent) {
      if (key.indexOf("subsequent") > 0) {
        subsequentVisits += val;
      }
    }
    return firstVisits + subsequentVisits;
  }
  emissionsPerVisitInGrams(energyPerVisit, carbonintensity = GLOBAL_INTENSITY) {
    return (0,_helpers_index_js__WEBPACK_IMPORTED_MODULE_2__.formatNumber)(energyPerVisit * carbonintensity);
  }
  annualEnergyInKwh(energyPerVisit, monthlyVisitors = 1e3) {
    return energyPerVisit * monthlyVisitors * 12;
  }
  annualEmissionsInGrams(co2grams, monthlyVisitors = 1e3) {
    return co2grams * monthlyVisitors * 12;
  }
  annualSegmentEnergy(annualEnergy) {
    return {
      consumerDeviceEnergy: (0,_helpers_index_js__WEBPACK_IMPORTED_MODULE_2__.formatNumber)(annualEnergy * END_USER_DEVICE_ENERGY),
      networkEnergy: (0,_helpers_index_js__WEBPACK_IMPORTED_MODULE_2__.formatNumber)(annualEnergy * NETWORK_ENERGY),
      dataCenterEnergy: (0,_helpers_index_js__WEBPACK_IMPORTED_MODULE_2__.formatNumber)(annualEnergy * DATACENTER_ENERGY),
      productionEnergy: (0,_helpers_index_js__WEBPACK_IMPORTED_MODULE_2__.formatNumber)(annualEnergy * PRODUCTION_ENERGY)
    };
  }
}
var sustainable_web_design_default = SustainableWebDesign;


/***/ }),

/***/ "./data/compilation-stats.json":
/*!*************************************!*\
  !*** ./data/compilation-stats.json ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"hash":"16db2c60db1c3fd8416c","version":"5.74.0","time":5971,"builtAt":1665559833318,"publicPath":"auto","outputPath":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\public","assetsByChunkName":{"frontend":["frontend.css","bundle.js"]},"assets":[{"type":"asset","name":"frontend.css","size":4411,"emitted":true,"comparedForEmit":false,"cached":false,"info":{"related":{"sourceMap":"frontend.css.map"},"size":4411},"chunkNames":["frontend"],"chunkIdHints":[],"auxiliaryChunkNames":[],"auxiliaryChunkIdHints":[],"filteredRelated":0,"related":[{"type":"sourceMap","name":"frontend.css.map","size":10631,"emitted":true,"comparedForEmit":false,"cached":false,"info":{"development":true,"size":10631},"chunkNames":[],"chunkIdHints":[],"auxiliaryChunkNames":["frontend"],"auxiliaryChunkIdHints":[],"related":{},"chunks":[],"auxiliaryChunks":[495],"isOverSizeLimit":false}],"chunks":[495],"auxiliaryChunks":[],"isOverSizeLimit":false},{"type":"asset","name":"bundle.js","size":372,"emitted":true,"comparedForEmit":false,"cached":false,"info":{"javascriptModule":false,"minimized":true,"related":{"sourceMap":"bundle.js.map"},"size":372},"chunkNames":["frontend"],"chunkIdHints":[],"auxiliaryChunkNames":[],"auxiliaryChunkIdHints":[],"filteredRelated":0,"related":[{"type":"sourceMap","name":"bundle.js.map","size":1087,"emitted":true,"comparedForEmit":false,"cached":false,"info":{"development":true,"size":1087},"chunkNames":[],"chunkIdHints":[],"auxiliaryChunkNames":["frontend"],"auxiliaryChunkIdHints":[],"related":{},"chunks":[],"auxiliaryChunks":[495],"isOverSizeLimit":false}],"chunks":[495],"auxiliaryChunks":[],"isOverSizeLimit":false}],"chunks":[{"rendered":true,"initial":true,"entry":true,"recorded":false,"size":4867,"sizes":{"javascript":497,"css/mini-extract":4370},"names":["frontend"],"idHints":[],"runtime":["frontend"],"files":["frontend.css","bundle.js"],"auxiliaryFiles":["bundle.js.map","frontend.css.map"],"hash":"a6fd2fb789fd2bd79655","childrenByOrder":{},"id":495,"siblings":[],"parents":[],"children":[],"modules":[{"type":"module","moduleType":"javascript/auto","layer":null,"size":447,"sizes":{"javascript":447},"built":true,"codeGenerated":true,"buildTimeExecuted":false,"cached":false,"identifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\babel-loader\\\\lib\\\\index.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\index.js","name":"./src/index.js","nameForCondition":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\index.js","index":0,"preOrderIndex":0,"index2":0,"postOrderIndex":0,"cacheable":true,"optional":false,"orphan":false,"dependent":false,"issuer":null,"issuerName":null,"issuerPath":null,"failed":false,"errors":0,"warnings":0,"profile":{"total":5583,"resolving":612,"restoring":0,"building":4971,"integration":0,"storing":0,"additionalResolving":0,"additionalIntegration":0,"factory":612,"dependencies":0},"id":579,"issuerId":null,"chunks":[495],"assets":[],"reasons":[{"moduleIdentifier":null,"module":null,"moduleName":null,"resolvedModuleIdentifier":null,"resolvedModule":null,"type":"entry","active":true,"explanation":"","userRequest":"./src/index.js","loc":"frontend","moduleId":null,"resolvedModuleId":null}],"usedExports":[],"providedExports":null,"optimizationBailout":["Statement (VariableDeclaration) with side effects in source code at 3:0-53","ModuleConcatenation bailout: Module is not an ECMAScript module"],"depth":0},{"type":"module","moduleType":"javascript/auto","layer":null,"size":50,"sizes":{"javascript":50},"built":true,"codeGenerated":true,"buildTimeExecuted":false,"cached":false,"identifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\mini-css-extract-plugin\\\\dist\\\\loader.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","name":"./src/sass/style.scss","nameForCondition":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","index":1,"preOrderIndex":1,"index2":2,"postOrderIndex":2,"cacheable":true,"optional":false,"orphan":false,"dependent":false,"issuer":null,"issuerName":null,"issuerPath":null,"failed":false,"errors":0,"warnings":0,"profile":{"total":5573,"resolving":28,"restoring":0,"building":5545,"integration":0,"storing":0,"additionalResolving":0,"additionalIntegration":0,"factory":28,"dependencies":0},"id":208,"issuerId":null,"chunks":[495],"assets":[],"reasons":[{"moduleIdentifier":null,"module":null,"moduleName":null,"resolvedModuleIdentifier":null,"resolvedModule":null,"type":"entry","active":true,"explanation":"","userRequest":"./src/sass/style.scss","loc":"frontend","moduleId":null,"resolvedModuleId":null}],"usedExports":[],"providedExports":[],"optimizationBailout":[],"depth":0},{"type":"module","moduleType":"css/mini-extract","size":4370,"sizes":{"css/mini-extract":4370},"built":true,"codeGenerated":true,"buildTimeExecuted":false,"cached":false,"identifier":"css|C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss|0","name":"css ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss","nameForCondition":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","index":2,"preOrderIndex":2,"index2":1,"postOrderIndex":1,"cacheable":true,"optional":false,"orphan":false,"dependent":true,"issuer":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\mini-css-extract-plugin\\\\dist\\\\loader.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","issuerName":"./src/sass/style.scss","issuerPath":[{"identifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\mini-css-extract-plugin\\\\dist\\\\loader.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","name":"./src/sass/style.scss","profile":{"total":5573,"resolving":28,"restoring":0,"building":5545,"integration":0,"storing":0,"additionalResolving":0,"additionalIntegration":0,"factory":28,"dependencies":0},"id":208}],"failed":false,"errors":0,"warnings":0,"profile":{"total":1,"resolving":0,"restoring":0,"building":1,"integration":0,"storing":0,"additionalResolving":0,"additionalIntegration":0,"factory":0,"dependencies":0},"id":null,"issuerId":208,"chunks":[495],"assets":[],"reasons":[{"moduleIdentifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\mini-css-extract-plugin\\\\dist\\\\loader.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","module":"./src/sass/style.scss","moduleName":"./src/sass/style.scss","resolvedModuleIdentifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\mini-css-extract-plugin\\\\dist\\\\loader.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","resolvedModule":"./src/sass/style.scss","type":"unknown","active":true,"explanation":"","userRequest":null,"moduleId":208,"resolvedModuleId":208}],"usedExports":null,"providedExports":null,"optimizationBailout":["ModuleConcatenation bailout: Module Concatenation is not implemented for CssModule"],"depth":1}],"origins":[{"module":"","moduleIdentifier":"","moduleName":"","loc":"frontend","request":"./src/index.js"},{"module":"","moduleIdentifier":"","moduleName":"","loc":"frontend","request":"./src/sass/style.scss"}]}],"modules":[{"type":"module","moduleType":"javascript/auto","layer":null,"size":447,"sizes":{"javascript":447},"built":true,"codeGenerated":true,"buildTimeExecuted":false,"cached":false,"identifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\babel-loader\\\\lib\\\\index.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\index.js","name":"./src/index.js","nameForCondition":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\index.js","index":0,"preOrderIndex":0,"index2":0,"postOrderIndex":0,"cacheable":true,"optional":false,"orphan":false,"issuer":null,"issuerName":null,"issuerPath":null,"failed":false,"errors":0,"warnings":0,"profile":{"total":5583,"resolving":612,"restoring":0,"building":4971,"integration":0,"storing":0,"additionalResolving":0,"additionalIntegration":0,"factory":612,"dependencies":0},"id":579,"issuerId":null,"chunks":[495],"assets":[],"reasons":[{"moduleIdentifier":null,"module":null,"moduleName":null,"resolvedModuleIdentifier":null,"resolvedModule":null,"type":"entry","active":true,"explanation":"","userRequest":"./src/index.js","loc":"frontend","moduleId":null,"resolvedModuleId":null}],"usedExports":[],"providedExports":null,"optimizationBailout":["Statement (VariableDeclaration) with side effects in source code at 3:0-53","ModuleConcatenation bailout: Module is not an ECMAScript module"],"depth":0},{"type":"module","moduleType":"javascript/auto","layer":null,"size":50,"sizes":{"javascript":50},"built":true,"codeGenerated":true,"buildTimeExecuted":false,"cached":false,"identifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\mini-css-extract-plugin\\\\dist\\\\loader.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","name":"./src/sass/style.scss","nameForCondition":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","index":1,"preOrderIndex":1,"index2":2,"postOrderIndex":2,"cacheable":true,"optional":false,"orphan":false,"issuer":null,"issuerName":null,"issuerPath":null,"failed":false,"errors":0,"warnings":0,"profile":{"total":5573,"resolving":28,"restoring":0,"building":5545,"integration":0,"storing":0,"additionalResolving":0,"additionalIntegration":0,"factory":28,"dependencies":0},"id":208,"issuerId":null,"chunks":[495],"assets":[],"reasons":[{"moduleIdentifier":null,"module":null,"moduleName":null,"resolvedModuleIdentifier":null,"resolvedModule":null,"type":"entry","active":true,"explanation":"","userRequest":"./src/sass/style.scss","loc":"frontend","moduleId":null,"resolvedModuleId":null}],"usedExports":[],"providedExports":[],"optimizationBailout":[],"depth":0},{"type":"module","moduleType":"css/mini-extract","size":4370,"sizes":{"css/mini-extract":4370},"built":true,"codeGenerated":true,"buildTimeExecuted":false,"cached":false,"identifier":"css|C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss|0","name":"css ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss","nameForCondition":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","index":2,"preOrderIndex":2,"index2":1,"postOrderIndex":1,"cacheable":true,"optional":false,"orphan":false,"issuer":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\mini-css-extract-plugin\\\\dist\\\\loader.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","issuerName":"./src/sass/style.scss","issuerPath":[{"identifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\mini-css-extract-plugin\\\\dist\\\\loader.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","name":"./src/sass/style.scss","profile":{"total":5573,"resolving":28,"restoring":0,"building":5545,"integration":0,"storing":0,"additionalResolving":0,"additionalIntegration":0,"factory":28,"dependencies":0},"id":208}],"failed":false,"errors":0,"warnings":0,"profile":{"total":1,"resolving":0,"restoring":0,"building":1,"integration":0,"storing":0,"additionalResolving":0,"additionalIntegration":0,"factory":0,"dependencies":0},"id":null,"issuerId":208,"chunks":[495],"assets":[],"reasons":[{"moduleIdentifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\mini-css-extract-plugin\\\\dist\\\\loader.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","module":"./src/sass/style.scss","moduleName":"./src/sass/style.scss","resolvedModuleIdentifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\mini-css-extract-plugin\\\\dist\\\\loader.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","resolvedModule":"./src/sass/style.scss","type":"unknown","active":true,"explanation":"","userRequest":null,"moduleId":208,"resolvedModuleId":208}],"usedExports":null,"providedExports":null,"optimizationBailout":["ModuleConcatenation bailout: Module Concatenation is not implemented for CssModule"],"depth":1},{"type":"module","moduleType":"javascript/auto","layer":null,"size":2299,"sizes":{"javascript":2299},"built":true,"codeGenerated":true,"buildTimeExecuted":true,"cached":false,"identifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\babel-loader\\\\lib\\\\index.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\runtime\\\\api.js","name":"./node_modules/css-loader/dist/runtime/api.js","nameForCondition":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\runtime\\\\api.js","index":null,"preOrderIndex":null,"index2":null,"postOrderIndex":null,"cacheable":true,"optional":false,"orphan":true,"issuer":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","issuerName":"./src/sass/style.scss.webpack[javascript/auto]!=!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss","issuerPath":[{"identifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\mini-css-extract-plugin\\\\dist\\\\loader.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","name":"./src/sass/style.scss","profile":{"total":5573,"resolving":28,"restoring":0,"building":5545,"integration":0,"storing":0,"additionalResolving":0,"additionalIntegration":0,"factory":28,"dependencies":0},"id":208},{"identifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","name":"./src/sass/style.scss.webpack[javascript/auto]!=!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss","profile":{"total":2135,"resolving":2,"restoring":0,"building":2133,"integration":0,"storing":0,"additionalResolving":0,"additionalIntegration":0,"factory":2,"dependencies":0},"id":null}],"failed":false,"errors":0,"warnings":0,"profile":{"total":0,"resolving":0,"restoring":0,"building":0,"integration":0,"storing":0,"additionalResolving":0,"additionalIntegration":0,"factory":0,"dependencies":0},"id":null,"issuerId":null,"chunks":[],"assets":[],"reasons":[{"moduleIdentifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\babel-loader\\\\lib\\\\index.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\runtime\\\\api.js","module":"./node_modules/css-loader/dist/runtime/api.js","moduleName":"./node_modules/css-loader/dist/runtime/api.js","resolvedModuleIdentifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\babel-loader\\\\lib\\\\index.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\runtime\\\\api.js","resolvedModule":"./node_modules/css-loader/dist/runtime/api.js","type":"cjs self exports reference","active":true,"explanation":"","userRequest":null,"loc":"7:0-14","moduleId":null,"resolvedModuleId":null},{"moduleIdentifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","module":"./src/sass/style.scss.webpack[javascript/auto]!=!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss","moduleName":"./src/sass/style.scss.webpack[javascript/auto]!=!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss","resolvedModuleIdentifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","resolvedModule":"./src/sass/style.scss.webpack[javascript/auto]!=!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss","type":"harmony side effect evaluation","active":true,"explanation":"","userRequest":"../../node_modules/css-loader/dist/runtime/api.js","loc":"3:0-92","moduleId":null,"resolvedModuleId":null},{"moduleIdentifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","module":"./src/sass/style.scss.webpack[javascript/auto]!=!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss","moduleName":"./src/sass/style.scss.webpack[javascript/auto]!=!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss","resolvedModuleIdentifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","resolvedModule":"./src/sass/style.scss.webpack[javascript/auto]!=!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss","type":"harmony import specifier","active":true,"explanation":"","userRequest":"../../node_modules/css-loader/dist/runtime/api.js","loc":"4:30-57","moduleId":null,"resolvedModuleId":null}],"usedExports":false,"providedExports":null,"optimizationBailout":["CommonJS bailout: module.exports is used directly at 7:0-14","Statement (ExpressionStatement) with side effects in source code at 7:0-83:2","ModuleConcatenation bailout: Module is not an ECMAScript module"],"depth":null},{"type":"module","moduleType":"javascript/auto","layer":null,"size":685,"sizes":{"javascript":685},"built":true,"codeGenerated":true,"buildTimeExecuted":true,"cached":false,"identifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\babel-loader\\\\lib\\\\index.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\runtime\\\\sourceMaps.js","name":"./node_modules/css-loader/dist/runtime/sourceMaps.js","nameForCondition":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\runtime\\\\sourceMaps.js","index":null,"preOrderIndex":null,"index2":null,"postOrderIndex":null,"cacheable":true,"optional":false,"orphan":true,"issuer":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","issuerName":"./src/sass/style.scss.webpack[javascript/auto]!=!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss","issuerPath":[{"identifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\mini-css-extract-plugin\\\\dist\\\\loader.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","name":"./src/sass/style.scss","profile":{"total":5573,"resolving":28,"restoring":0,"building":5545,"integration":0,"storing":0,"additionalResolving":0,"additionalIntegration":0,"factory":28,"dependencies":0},"id":208},{"identifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","name":"./src/sass/style.scss.webpack[javascript/auto]!=!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss","profile":{"total":2135,"resolving":2,"restoring":0,"building":2133,"integration":0,"storing":0,"additionalResolving":0,"additionalIntegration":0,"factory":2,"dependencies":0},"id":null}],"failed":false,"errors":0,"warnings":0,"profile":{"total":0,"resolving":0,"restoring":0,"building":0,"integration":0,"storing":0,"additionalResolving":0,"additionalIntegration":0,"factory":0,"dependencies":0},"id":null,"issuerId":null,"chunks":[],"assets":[],"reasons":[{"moduleIdentifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\babel-loader\\\\lib\\\\index.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\runtime\\\\sourceMaps.js","module":"./node_modules/css-loader/dist/runtime/sourceMaps.js","moduleName":"./node_modules/css-loader/dist/runtime/sourceMaps.js","resolvedModuleIdentifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\babel-loader\\\\lib\\\\index.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\runtime\\\\sourceMaps.js","resolvedModule":"./node_modules/css-loader/dist/runtime/sourceMaps.js","type":"cjs self exports reference","active":true,"explanation":"","userRequest":null,"loc":"3:0-14","moduleId":null,"resolvedModuleId":null},{"moduleIdentifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","module":"./src/sass/style.scss.webpack[javascript/auto]!=!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss","moduleName":"./src/sass/style.scss.webpack[javascript/auto]!=!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss","resolvedModuleIdentifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","resolvedModule":"./src/sass/style.scss.webpack[javascript/auto]!=!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss","type":"harmony side effect evaluation","active":true,"explanation":"","userRequest":"../../node_modules/css-loader/dist/runtime/sourceMaps.js","loc":"2:0-109","moduleId":null,"resolvedModuleId":null},{"moduleIdentifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","module":"./src/sass/style.scss.webpack[javascript/auto]!=!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss","moduleName":"./src/sass/style.scss.webpack[javascript/auto]!=!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss","resolvedModuleIdentifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","resolvedModule":"./src/sass/style.scss.webpack[javascript/auto]!=!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss","type":"harmony import specifier","active":true,"explanation":"","userRequest":"../../node_modules/css-loader/dist/runtime/sourceMaps.js","loc":"4:58-95","moduleId":null,"resolvedModuleId":null}],"usedExports":false,"providedExports":null,"optimizationBailout":["CommonJS bailout: module.exports is used directly at 3:0-14","Statement (ExpressionStatement) with side effects in source code at 3:0-19:2","ModuleConcatenation bailout: Module is not an ECMAScript module"],"depth":null},{"type":"module","moduleType":"javascript/auto","layer":null,"size":16002,"sizes":{"javascript":16002},"built":true,"codeGenerated":true,"buildTimeExecuted":true,"cached":false,"identifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","name":"./src/sass/style.scss.webpack[javascript/auto]!=!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss","nameForCondition":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","index":null,"preOrderIndex":null,"index2":null,"postOrderIndex":null,"cacheable":true,"optional":false,"orphan":true,"issuer":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\mini-css-extract-plugin\\\\dist\\\\loader.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","issuerName":"./src/sass/style.scss","issuerPath":[{"identifier":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\mini-css-extract-plugin\\\\dist\\\\loader.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","name":"./src/sass/style.scss","profile":{"total":5573,"resolving":28,"restoring":0,"building":5545,"integration":0,"storing":0,"additionalResolving":0,"additionalIntegration":0,"factory":28,"dependencies":0},"id":208}],"failed":false,"errors":0,"warnings":0,"profile":{"total":2135,"resolving":2,"restoring":0,"building":2133,"integration":0,"storing":0,"additionalResolving":0,"additionalIntegration":0,"factory":2,"dependencies":0},"id":null,"issuerId":208,"chunks":[],"assets":[],"reasons":[{"moduleIdentifier":null,"module":null,"moduleName":null,"resolvedModuleIdentifier":null,"resolvedModule":null,"type":"loader import","active":false,"explanation":"","userRequest":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss.webpack[javascript/auto]!=!!!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","loc":"C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss.webpack[javascript/auto]!=!!!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\css-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\node_modules\\\\sass-loader\\\\dist\\\\cjs.js!C:\\\\Users\\\\Pablo\\\\Local Sites\\\\pluriversidadnomade\\\\app\\\\public\\\\wp-content\\\\themes\\\\pluri_web\\\\src\\\\sass\\\\style.scss","moduleId":null,"resolvedModuleId":null}],"usedExports":false,"providedExports":["default"],"optimizationBailout":["Statement (VariableDeclaration) with side effects in source code at 4:0-97","ModuleConcatenation bailout: Module uses module.id"],"depth":null},{"type":"module","moduleType":"runtime","layer":null,"size":267,"sizes":{"runtime":267},"built":false,"codeGenerated":true,"buildTimeExecuted":true,"cached":false,"identifier":"webpack/runtime/compat get default export","name":"webpack/runtime/compat get default export","nameForCondition":null,"index":null,"preOrderIndex":null,"index2":null,"postOrderIndex":null,"optional":false,"orphan":true,"failed":false,"errors":0,"warnings":0,"id":null,"chunks":[],"assets":[],"reasons":[],"usedExports":[],"providedExports":null,"optimizationBailout":["ModuleConcatenation bailout: Module Concatenation is not implemented for CompatGetDefaultExportRuntimeModule"],"depth":null},{"type":"module","moduleType":"runtime","layer":null,"size":308,"sizes":{"runtime":308},"built":false,"codeGenerated":true,"buildTimeExecuted":true,"cached":false,"identifier":"webpack/runtime/define property getters","name":"webpack/runtime/define property getters","nameForCondition":null,"index":null,"preOrderIndex":null,"index2":null,"postOrderIndex":null,"optional":false,"orphan":true,"failed":false,"errors":0,"warnings":0,"id":null,"chunks":[],"assets":[],"reasons":[],"usedExports":[],"providedExports":null,"optimizationBailout":["ModuleConcatenation bailout: Module Concatenation is not implemented for DefinePropertyGettersRuntimeModule"],"depth":null},{"type":"module","moduleType":"runtime","layer":null,"size":88,"sizes":{"runtime":88},"built":false,"codeGenerated":true,"buildTimeExecuted":true,"cached":false,"identifier":"webpack/runtime/hasOwnProperty shorthand","name":"webpack/runtime/hasOwnProperty shorthand","nameForCondition":null,"index":null,"preOrderIndex":null,"index2":null,"postOrderIndex":null,"optional":false,"orphan":true,"failed":false,"errors":0,"warnings":0,"id":null,"chunks":[],"assets":[],"reasons":[],"usedExports":[],"providedExports":null,"optimizationBailout":["ModuleConcatenation bailout: Module Concatenation is not implemented for HasOwnPropertyRuntimeModule"],"depth":null},{"type":"module","moduleType":"runtime","layer":null,"size":274,"sizes":{"runtime":274},"built":false,"codeGenerated":true,"buildTimeExecuted":true,"cached":false,"identifier":"webpack/runtime/make namespace object","name":"webpack/runtime/make namespace object","nameForCondition":null,"index":null,"preOrderIndex":null,"index2":null,"postOrderIndex":null,"optional":false,"orphan":true,"failed":false,"errors":0,"warnings":0,"id":null,"chunks":[],"assets":[],"reasons":[],"usedExports":[],"providedExports":null,"optimizationBailout":["ModuleConcatenation bailout: Module Concatenation is not implemented for MakeNamespaceObjectRuntimeModule"],"depth":null}],"entrypoints":{"frontend":{"name":"frontend","chunks":[495],"assets":[{"name":"frontend.css","size":4411},{"name":"bundle.js","size":372}],"filteredAssets":0,"assetsSize":4783,"auxiliaryAssets":[{"name":"bundle.js.map","size":1087},{"name":"frontend.css.map","size":10631}],"filteredAuxiliaryAssets":0,"auxiliaryAssetsSize":11718,"children":{},"childAssets":{},"isOverSizeLimit":false}},"namedChunkGroups":{"frontend":{"name":"frontend","chunks":[495],"assets":[{"name":"frontend.css","size":4411},{"name":"bundle.js","size":372}],"filteredAssets":0,"assetsSize":4783,"auxiliaryAssets":[{"name":"bundle.js.map","size":1087},{"name":"frontend.css.map","size":10631}],"filteredAuxiliaryAssets":0,"auxiliaryAssetsSize":11718,"children":{},"childAssets":{},"isOverSizeLimit":false}},"errors":[],"errorsCount":0,"warnings":[],"warningsCount":0,"children":[]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_compilation_stats_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/compilation-stats.json */ "./data/compilation-stats.json");
/* harmony import */ var _tgwf_co2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tgwf/co2 */ "./node_modules/@tgwf/co2/dist/esm/index.js");
/* harmony import */ var _round_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./round.js */ "./src/round.js");



var swd = new _tgwf_co2__WEBPACK_IMPORTED_MODULE_1__.co2();
console.log(_data_compilation_stats_json__WEBPACK_IMPORTED_MODULE_0__.assets);
var pageSize = 0;
var assetWeight = _data_compilation_stats_json__WEBPACK_IMPORTED_MODULE_0__.assets.map(function (asset) {
  pageSize += asset.size;
});
pageSize += document.getElementsByTagName("html")[0].outerHTML.length;

//count images
pageSize += document.getElementsByTagName("img").length * 140000;
var pageCarbon = (0,_round_js__WEBPACK_IMPORTED_MODULE_2__["default"])(swd.perByte(pageSize), 4);
var carbonContainer = document.getElementById("carbon");
carbonContainer.innerHTML = "".concat(pageCarbon, " gr. de co2");

//navigation
var nav = document.querySelector("#main-navigation");
var toggleMenu = document.querySelector("#toggle-menu");
nav.classList.add("hidden");
toggleMenu.addEventListener("click", function (e) {
  e.preventDefault();
  if (nav.classList.contains("hidden")) {
    nav.classList.remove("hidden");
    toggleMenu.innerText = "CERRAR";
  } else {
    nav.classList.add("hidden");
    toggleMenu.innerText = "MENU";
  }
});
console.log(nav);
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*****************************!*\
  !*** ./src/sass/style.scss ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map