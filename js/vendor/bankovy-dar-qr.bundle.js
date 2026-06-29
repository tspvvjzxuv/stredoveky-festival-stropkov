(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
  var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

  // node_modules/validator/lib/util/assertString.js
  var require_assertString = __commonJS({
    "node_modules/validator/lib/util/assertString.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = assertString;
      function assertString(input) {
        if (input === void 0 || input === null) throw new TypeError("Expected a string but received a ".concat(input));
        if (input.constructor.name !== "String") throw new TypeError("Expected a string but received a ".concat(input.constructor.name));
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/toDate.js
  var require_toDate = __commonJS({
    "node_modules/validator/lib/toDate.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = toDate;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function toDate(date) {
        (0, _assertString.default)(date);
        date = Date.parse(date);
        return !isNaN(date) ? new Date(date) : null;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/util/nullUndefinedCheck.js
  var require_nullUndefinedCheck = __commonJS({
    "node_modules/validator/lib/util/nullUndefinedCheck.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isNullOrUndefined;
      function isNullOrUndefined(value) {
        return value === null || value === void 0;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/alpha.js
  var require_alpha = __commonJS({
    "node_modules/validator/lib/alpha.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.farsiLocales = exports.englishLocales = exports.dotDecimal = exports.decimal = exports.commaDecimal = exports.bengaliLocales = exports.arabicLocales = exports.alphanumeric = exports.alpha = void 0;
      var alpha = exports.alpha = {
        "en-US": /^[A-Z]+$/i,
        "az-AZ": /^[A-VXYZÇƏĞİıÖŞÜ]+$/i,
        "bg-BG": /^[А-Я]+$/i,
        "cs-CZ": /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
        "da-DK": /^[A-ZÆØÅ]+$/i,
        "de-DE": /^[A-ZÄÖÜß]+$/i,
        "el-GR": /^[Α-ώ]+$/i,
        "es-ES": /^[A-ZÁÉÍÑÓÚÜ]+$/i,
        "fa-IR": /^[ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/i,
        "fi-FI": /^[A-ZÅÄÖ]+$/i,
        "fr-FR": /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
        "it-IT": /^[A-ZÀÉÈÌÎÓÒÙ]+$/i,
        "ja-JP": /^[ぁ-んァ-ヶｦ-ﾟ一-龠ー・。、]+$/i,
        "nb-NO": /^[A-ZÆØÅ]+$/i,
        "nl-NL": /^[A-ZÁÉËÏÓÖÜÚ]+$/i,
        "nn-NO": /^[A-ZÆØÅ]+$/i,
        "hu-HU": /^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
        "pl-PL": /^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
        "pt-PT": /^[A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
        "ru-RU": /^[А-ЯЁ]+$/i,
        "kk-KZ": /^[А-ЯЁ\u04D8\u04B0\u0406\u04A2\u0492\u04AE\u049A\u04E8\u04BA]+$/i,
        "sl-SI": /^[A-ZČĆĐŠŽ]+$/i,
        "sk-SK": /^[A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
        "sr-RS@latin": /^[A-ZČĆŽŠĐ]+$/i,
        "sr-RS": /^[А-ЯЂЈЉЊЋЏ]+$/i,
        "sv-SE": /^[A-ZÅÄÖ]+$/i,
        "th-TH": /^[ก-๐\s]+$/i,
        "tr-TR": /^[A-ZÇĞİıÖŞÜ]+$/i,
        "uk-UA": /^[А-ЩЬЮЯЄIЇҐі]+$/i,
        "vi-VN": /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
        "ko-KR": /^[ㄱ-ㅎㅏ-ㅣ가-힣]*$/,
        "ku-IQ": /^[ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
        ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
        he: /^[א-ת]+$/,
        fa: /^['آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی']+$/i,
        bn: /^['ঀঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣৰৱ৲৳৴৵৶৷৸৹৺৻']+$/,
        eo: /^[ABCĈD-GĜHĤIJĴK-PRSŜTUŬVZ]+$/i,
        "hi-IN": /^[\u0900-\u0961]+[\u0972-\u097F]*$/i,
        "si-LK": /^[\u0D80-\u0DFF]+$/,
        "ta-IN": /^[\u0B80-\u0BFF]+$/i,
        "te-IN": /^[\u0C00-\u0C7F]+$/i,
        "kn-IN": /^[\u0C80-\u0CFF]+$/i,
        "ml-IN": /^[\u0D00-\u0D7F]+$/i,
        "gu-IN": /^[\u0A80-\u0AFF]+$/i,
        "pa-IN": /^[\u0A00-\u0A7F]+$/i,
        "or-IN": /^[\u0B00-\u0B7F]+$/i
      };
      var alphanumeric = exports.alphanumeric = {
        "en-US": /^[0-9A-Z]+$/i,
        "az-AZ": /^[0-9A-VXYZÇƏĞİıÖŞÜ]+$/i,
        "bg-BG": /^[0-9А-Я]+$/i,
        "cs-CZ": /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
        "da-DK": /^[0-9A-ZÆØÅ]+$/i,
        "de-DE": /^[0-9A-ZÄÖÜß]+$/i,
        "el-GR": /^[0-9Α-ω]+$/i,
        "es-ES": /^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,
        "fi-FI": /^[0-9A-ZÅÄÖ]+$/i,
        "fr-FR": /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
        "it-IT": /^[0-9A-ZÀÉÈÌÎÓÒÙ]+$/i,
        "ja-JP": /^[0-9０-９ぁ-んァ-ヶｦ-ﾟ一-龠ー・。、]+$/i,
        "hu-HU": /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
        "nb-NO": /^[0-9A-ZÆØÅ]+$/i,
        "nl-NL": /^[0-9A-ZÁÉËÏÓÖÜÚ]+$/i,
        "nn-NO": /^[0-9A-ZÆØÅ]+$/i,
        "pl-PL": /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
        "pt-PT": /^[0-9A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
        "ru-RU": /^[0-9А-ЯЁ]+$/i,
        "kk-KZ": /^[0-9А-ЯЁ\u04D8\u04B0\u0406\u04A2\u0492\u04AE\u049A\u04E8\u04BA]+$/i,
        "sl-SI": /^[0-9A-ZČĆĐŠŽ]+$/i,
        "sk-SK": /^[0-9A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
        "sr-RS@latin": /^[0-9A-ZČĆŽŠĐ]+$/i,
        "sr-RS": /^[0-9А-ЯЂЈЉЊЋЏ]+$/i,
        "sv-SE": /^[0-9A-ZÅÄÖ]+$/i,
        "th-TH": /^[ก-๙\s]+$/i,
        "tr-TR": /^[0-9A-ZÇĞİıÖŞÜ]+$/i,
        "uk-UA": /^[0-9А-ЩЬЮЯЄIЇҐі]+$/i,
        "ko-KR": /^[0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/,
        "ku-IQ": /^[٠١٢٣٤٥٦٧٨٩0-9ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
        "vi-VN": /^[0-9A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
        ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
        he: /^[0-9א-ת]+$/,
        fa: /^['0-9آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی۱۲۳۴۵۶۷۸۹۰']+$/i,
        bn: /^['ঀঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣ০১২৩৪৫৬৭৮৯ৰৱ৲৳৴৵৶৷৸৹৺৻']+$/,
        eo: /^[0-9ABCĈD-GĜHĤIJĴK-PRSŜTUŬVZ]+$/i,
        "hi-IN": /^[\u0900-\u0963]+[\u0966-\u097F]*$/i,
        "si-LK": /^[0-9\u0D80-\u0DFF]+$/,
        "ta-IN": /^[0-9\u0B80-\u0BFF.]+$/i,
        "te-IN": /^[0-9\u0C00-\u0C7F.]+$/i,
        "kn-IN": /^[0-9\u0C80-\u0CFF.]+$/i,
        "ml-IN": /^[0-9\u0D00-\u0D7F.]+$/i,
        "gu-IN": /^[0-9\u0A80-\u0AFF.]+$/i,
        "pa-IN": /^[0-9\u0A00-\u0A7F.]+$/i,
        "or-IN": /^[0-9\u0B00-\u0B7F.]+$/i
      };
      var decimal = exports.decimal = {
        "en-US": ".",
        ar: "\u066B"
      };
      var englishLocales = exports.englishLocales = ["AU", "GB", "HK", "IN", "NZ", "ZA", "ZM"];
      for (i2 = 0; i2 < englishLocales.length; i2++) {
        locale = "en-".concat(englishLocales[i2]);
        alpha[locale] = alpha["en-US"];
        alphanumeric[locale] = alphanumeric["en-US"];
        decimal[locale] = decimal["en-US"];
      }
      var locale;
      var i2;
      var arabicLocales = exports.arabicLocales = ["AE", "BH", "DZ", "EG", "IQ", "JO", "KW", "LB", "LY", "MA", "QM", "QA", "SA", "SD", "SY", "TN", "YE"];
      for (_i = 0; _i < arabicLocales.length; _i++) {
        _locale = "ar-".concat(arabicLocales[_i]);
        alpha[_locale] = alpha.ar;
        alphanumeric[_locale] = alphanumeric.ar;
        decimal[_locale] = decimal.ar;
      }
      var _locale;
      var _i;
      var farsiLocales = exports.farsiLocales = ["IR", "AF"];
      for (_i2 = 0; _i2 < farsiLocales.length; _i2++) {
        _locale2 = "fa-".concat(farsiLocales[_i2]);
        alphanumeric[_locale2] = alphanumeric.fa;
        decimal[_locale2] = decimal.ar;
      }
      var _locale2;
      var _i2;
      var bengaliLocales = exports.bengaliLocales = ["BD", "IN"];
      for (_i3 = 0; _i3 < bengaliLocales.length; _i3++) {
        _locale3 = "bn-".concat(bengaliLocales[_i3]);
        alpha[_locale3] = alpha.bn;
        alphanumeric[_locale3] = alphanumeric.bn;
        decimal[_locale3] = decimal["en-US"];
      }
      var _locale3;
      var _i3;
      var dotDecimal = exports.dotDecimal = ["ar-EG", "ar-LB", "ar-LY"];
      var commaDecimal = exports.commaDecimal = ["bg-BG", "cs-CZ", "da-DK", "de-DE", "el-GR", "en-ZM", "eo", "es-ES", "fr-CA", "fr-FR", "gu-IN", "hi-IN", "hu-HU", "id-ID", "it-IT", "kk-KZ", "kn-IN", "ku-IQ", "ml-IN", "nb-NO", "nl-NL", "nn-NO", "or-IN", "pa-IN", "pl-PL", "pt-PT", "ru-RU", "si-LK", "sl-SI", "sr-RS", "sr-RS@latin", "sv-SE", "ta-IN", "te-IN", "tr-TR", "uk-UA", "vi-VN"];
      for (_i4 = 0; _i4 < dotDecimal.length; _i4++) {
        decimal[dotDecimal[_i4]] = decimal["en-US"];
      }
      var _i4;
      for (_i5 = 0; _i5 < commaDecimal.length; _i5++) {
        decimal[commaDecimal[_i5]] = ",";
      }
      var _i5;
      alpha["fr-CA"] = alpha["fr-FR"];
      alphanumeric["fr-CA"] = alphanumeric["fr-FR"];
      alpha["pt-BR"] = alpha["pt-PT"];
      alphanumeric["pt-BR"] = alphanumeric["pt-PT"];
      decimal["pt-BR"] = decimal["pt-PT"];
      alpha["pl-Pl"] = alpha["pl-PL"];
      alphanumeric["pl-Pl"] = alphanumeric["pl-PL"];
      decimal["pl-Pl"] = decimal["pl-PL"];
      alpha["fa-AF"] = alpha.fa;
    }
  });

  // node_modules/validator/lib/isFloat.js
  var require_isFloat = __commonJS({
    "node_modules/validator/lib/isFloat.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isFloat;
      exports.locales = void 0;
      var _assertString = _interopRequireDefault(require_assertString());
      var _nullUndefinedCheck = _interopRequireDefault(require_nullUndefinedCheck());
      var _alpha = require_alpha();
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function isFloat(str, options) {
        (0, _assertString.default)(str);
        options = options || {};
        var float = new RegExp("^(?:[-+])?(?:[0-9]+)?(?:\\".concat(options.locale ? _alpha.decimal[options.locale] : ".", "[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$"));
        if (str === "" || str === "." || str === "," || str === "-" || str === "+") {
          return false;
        }
        var value = parseFloat(str.replace(",", "."));
        return float.test(str) && (!options.hasOwnProperty("min") || (0, _nullUndefinedCheck.default)(options.min) || value >= options.min) && (!options.hasOwnProperty("max") || (0, _nullUndefinedCheck.default)(options.max) || value <= options.max) && (!options.hasOwnProperty("lt") || (0, _nullUndefinedCheck.default)(options.lt) || value < options.lt) && (!options.hasOwnProperty("gt") || (0, _nullUndefinedCheck.default)(options.gt) || value > options.gt);
      }
      var locales = exports.locales = Object.keys(_alpha.decimal);
    }
  });

  // node_modules/validator/lib/toFloat.js
  var require_toFloat = __commonJS({
    "node_modules/validator/lib/toFloat.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = toFloat;
      var _isFloat = _interopRequireDefault(require_isFloat());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function toFloat(str) {
        if (!(0, _isFloat.default)(str)) return NaN;
        return parseFloat(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/toInt.js
  var require_toInt = __commonJS({
    "node_modules/validator/lib/toInt.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = toInt;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function toInt(str, radix) {
        (0, _assertString.default)(str);
        return parseInt(str, radix || 10);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/toBoolean.js
  var require_toBoolean = __commonJS({
    "node_modules/validator/lib/toBoolean.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = toBoolean;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function toBoolean(str, strict) {
        (0, _assertString.default)(str);
        if (strict) {
          return str === "1" || /^true$/i.test(str);
        }
        return str !== "0" && !/^false$/i.test(str) && str !== "";
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/equals.js
  var require_equals = __commonJS({
    "node_modules/validator/lib/equals.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = equals;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function equals(str, comparison) {
        (0, _assertString.default)(str);
        return str === comparison;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/util/toString.js
  var require_toString = __commonJS({
    "node_modules/validator/lib/util/toString.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = toString2;
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      function toString2(input) {
        if (_typeof(input) === "object" && input !== null) {
          if (typeof input.toString === "function") {
            input = input.toString();
          } else {
            input = "[object Object]";
          }
        } else if (input === null || typeof input === "undefined" || isNaN(input) && !input.length) {
          input = "";
        }
        return String(input);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/util/merge.js
  var require_merge = __commonJS({
    "node_modules/validator/lib/util/merge.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = merge;
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      function merge() {
        var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var defaults = arguments.length > 1 ? arguments[1] : void 0;
        if (_typeof(obj) !== "object" || obj === null) {
          obj = {};
        }
        for (var key in defaults) {
          if (typeof obj[key] === "undefined") {
            obj[key] = defaults[key];
          }
        }
        return obj;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/contains.js
  var require_contains = __commonJS({
    "node_modules/validator/lib/contains.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = contains;
      var _assertString = _interopRequireDefault(require_assertString());
      var _toString = _interopRequireDefault(require_toString());
      var _merge = _interopRequireDefault(require_merge());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var defaultContainsOptions = {
        ignoreCase: false,
        minOccurrences: 1
      };
      function contains(str, elem, options) {
        (0, _assertString.default)(str);
        options = (0, _merge.default)(options, defaultContainsOptions);
        if (options.ignoreCase) {
          return str.toLowerCase().split((0, _toString.default)(elem).toLowerCase()).length > options.minOccurrences;
        }
        return str.split((0, _toString.default)(elem)).length > options.minOccurrences;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/matches.js
  var require_matches = __commonJS({
    "node_modules/validator/lib/matches.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = matches;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function matches(str, pattern, modifiers) {
        (0, _assertString.default)(str);
        if (Object.prototype.toString.call(pattern) !== "[object RegExp]") {
          pattern = new RegExp(pattern, modifiers);
        }
        return !!str.match(pattern);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/util/checkHost.js
  var require_checkHost = __commonJS({
    "node_modules/validator/lib/util/checkHost.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = checkHost;
      function isRegExp(obj) {
        return Object.prototype.toString.call(obj) === "[object RegExp]";
      }
      function checkHost(host, matches) {
        for (var i2 = 0; i2 < matches.length; i2++) {
          var match = matches[i2];
          if (host === match || isRegExp(match) && match.test(host)) {
            return true;
          }
        }
        return false;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isByteLength.js
  var require_isByteLength = __commonJS({
    "node_modules/validator/lib/isByteLength.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isByteLength;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      function isByteLength(str, options) {
        (0, _assertString.default)(str);
        var min;
        var max;
        if (_typeof(options) === "object") {
          min = options.min || 0;
          max = options.max;
        } else {
          min = arguments[1];
          max = arguments[2];
        }
        var len = encodeURI(str).split(/%..|./).length - 1;
        return len >= min && (typeof max === "undefined" || len <= max);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isFQDN.js
  var require_isFQDN = __commonJS({
    "node_modules/validator/lib/isFQDN.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isFQDN;
      var _assertString = _interopRequireDefault(require_assertString());
      var _merge = _interopRequireDefault(require_merge());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var default_fqdn_options = {
        require_tld: true,
        allow_underscores: false,
        allow_trailing_dot: false,
        allow_numeric_tld: false,
        allow_wildcard: false,
        ignore_max_length: false
      };
      function isFQDN(str, options) {
        (0, _assertString.default)(str);
        options = (0, _merge.default)(options, default_fqdn_options);
        if (options.allow_trailing_dot && str[str.length - 1] === ".") {
          str = str.substring(0, str.length - 1);
        }
        if (options.allow_wildcard === true && str.indexOf("*.") === 0) {
          str = str.substring(2);
        }
        var parts = str.split(".");
        var tld = parts[parts.length - 1];
        if (options.require_tld) {
          if (parts.length < 2) {
            return false;
          }
          if (!options.allow_numeric_tld && !/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
            return false;
          }
          if (/\s/.test(tld)) {
            return false;
          }
        }
        if (!options.allow_numeric_tld && /^\d+$/.test(tld)) {
          return false;
        }
        return parts.every(function(part) {
          if (part.length > 63 && !options.ignore_max_length) {
            return false;
          }
          if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(part)) {
            return false;
          }
          if (/[\uff01-\uff5e]/.test(part)) {
            return false;
          }
          if (/^-|-$/.test(part)) {
            return false;
          }
          if (!options.allow_underscores && /_/.test(part)) {
            return false;
          }
          return true;
        });
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isIP.js
  var require_isIP = __commonJS({
    "node_modules/validator/lib/isIP.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isIP;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      var IPv4SegmentFormat = "(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";
      var IPv4AddressFormat = "(".concat(IPv4SegmentFormat, "[.]){3}").concat(IPv4SegmentFormat);
      var IPv4AddressRegExp = new RegExp("^".concat(IPv4AddressFormat, "$"));
      var IPv6SegmentFormat = "(?:[0-9a-fA-F]{1,4})";
      var IPv6AddressRegExp = new RegExp("^(" + "(?:".concat(IPv6SegmentFormat, ":){7}(?:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){6}(?:").concat(IPv4AddressFormat, "|:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){5}(?::").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,2}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){4}(?:(:").concat(IPv6SegmentFormat, "){0,1}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,3}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){3}(?:(:").concat(IPv6SegmentFormat, "){0,2}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,4}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){2}(?:(:").concat(IPv6SegmentFormat, "){0,3}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,5}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){1}(?:(:").concat(IPv6SegmentFormat, "){0,4}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,6}|:)|") + "(?::((?::".concat(IPv6SegmentFormat, "){0,5}:").concat(IPv4AddressFormat, "|(?::").concat(IPv6SegmentFormat, "){1,7}|:))") + ")(%[0-9a-zA-Z.]{1,})?$");
      function isIP(ipAddress) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        (0, _assertString.default)(ipAddress);
        var version = (_typeof(options) === "object" ? options.version : arguments[1]) || "";
        if (!version) {
          return isIP(ipAddress, {
            version: 4
          }) || isIP(ipAddress, {
            version: 6
          });
        }
        if (version.toString() === "4") {
          return IPv4AddressRegExp.test(ipAddress);
        }
        if (version.toString() === "6") {
          return IPv6AddressRegExp.test(ipAddress);
        }
        return false;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isEmail.js
  var require_isEmail = __commonJS({
    "node_modules/validator/lib/isEmail.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isEmail;
      var _assertString = _interopRequireDefault(require_assertString());
      var _checkHost = _interopRequireDefault(require_checkHost());
      var _isByteLength = _interopRequireDefault(require_isByteLength());
      var _isFQDN = _interopRequireDefault(require_isFQDN());
      var _isIP = _interopRequireDefault(require_isIP());
      var _merge = _interopRequireDefault(require_merge());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var default_email_options = {
        allow_display_name: false,
        allow_underscores: false,
        require_display_name: false,
        allow_utf8_local_part: true,
        require_tld: true,
        blacklisted_chars: "",
        ignore_max_length: false,
        host_blacklist: [],
        host_whitelist: []
      };
      var splitNameAddress = /^([^\x00-\x1F\x7F-\x9F\cX]+)</i;
      var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
      var gmailUserPart = /^[a-z\d]+$/;
      var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
      var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A1-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
      var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
      var defaultMaxEmailLength = 254;
      function validateDisplayName(display_name) {
        var display_name_without_quotes = display_name.replace(/^"(.+)"$/, "$1");
        if (!display_name_without_quotes.trim()) {
          return false;
        }
        var contains_illegal = /[\.";<>]/.test(display_name_without_quotes);
        if (contains_illegal) {
          if (display_name_without_quotes === display_name) {
            return false;
          }
          var all_start_with_back_slash = display_name_without_quotes.split('"').length === display_name_without_quotes.split('\\"').length;
          if (!all_start_with_back_slash) {
            return false;
          }
        }
        return true;
      }
      function isEmail(str, options) {
        (0, _assertString.default)(str);
        options = (0, _merge.default)(options, default_email_options);
        if (options.require_display_name || options.allow_display_name) {
          var display_email = str.match(splitNameAddress);
          if (display_email) {
            var display_name = display_email[1];
            str = str.replace(display_name, "").replace(/(^<|>$)/g, "");
            if (display_name.endsWith(" ")) {
              display_name = display_name.slice(0, -1);
            }
            if (!validateDisplayName(display_name)) {
              return false;
            }
          } else if (options.require_display_name) {
            return false;
          }
        }
        if (!options.ignore_max_length && str.length > defaultMaxEmailLength) {
          return false;
        }
        var parts = str.split("@");
        var domain = parts.pop();
        var lower_domain = domain.toLowerCase();
        if (options.host_blacklist.length > 0 && (0, _checkHost.default)(lower_domain, options.host_blacklist)) {
          return false;
        }
        if (options.host_whitelist.length > 0 && !(0, _checkHost.default)(lower_domain, options.host_whitelist)) {
          return false;
        }
        var user = parts.join("@");
        if (options.domain_specific_validation && (lower_domain === "gmail.com" || lower_domain === "googlemail.com")) {
          user = user.toLowerCase();
          var username = user.split("+")[0];
          if (!(0, _isByteLength.default)(username.replace(/\./g, ""), {
            min: 6,
            max: 30
          })) {
            return false;
          }
          var _user_parts = username.split(".");
          for (var i2 = 0; i2 < _user_parts.length; i2++) {
            if (!gmailUserPart.test(_user_parts[i2])) {
              return false;
            }
          }
        }
        if (options.ignore_max_length === false && (!(0, _isByteLength.default)(user, {
          max: 64
        }) || !(0, _isByteLength.default)(domain, {
          max: 254
        }))) {
          return false;
        }
        if (!(0, _isFQDN.default)(domain, {
          require_tld: options.require_tld,
          ignore_max_length: options.ignore_max_length,
          allow_underscores: options.allow_underscores
        })) {
          if (!options.allow_ip_domain) {
            return false;
          }
          if (!(0, _isIP.default)(domain)) {
            if (!domain.startsWith("[") || !domain.endsWith("]")) {
              return false;
            }
            var noBracketdomain = domain.slice(1, -1);
            if (noBracketdomain.length === 0 || !(0, _isIP.default)(noBracketdomain)) {
              return false;
            }
          }
        }
        if (options.blacklisted_chars) {
          if (user.search(new RegExp("[".concat(options.blacklisted_chars, "]+"), "g")) !== -1) return false;
        }
        if (user[0] === '"' && user[user.length - 1] === '"') {
          user = user.slice(1, user.length - 1);
          return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
        }
        var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;
        var user_parts = user.split(".");
        for (var _i = 0; _i < user_parts.length; _i++) {
          if (!pattern.test(user_parts[_i])) {
            return false;
          }
        }
        return true;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/util/includesString.js
  var require_includesString = __commonJS({
    "node_modules/validator/lib/util/includesString.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var includes = function includes2(str, val) {
        return str.indexOf(val) !== -1;
      };
      var _default = exports.default = includes;
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isURL.js
  var require_isURL = __commonJS({
    "node_modules/validator/lib/isURL.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isURL;
      var _assertString = _interopRequireDefault(require_assertString());
      var _checkHost = _interopRequireDefault(require_checkHost());
      var _includesString = _interopRequireDefault(require_includesString());
      var _isFQDN = _interopRequireDefault(require_isFQDN());
      var _isIP = _interopRequireDefault(require_isIP());
      var _merge = _interopRequireDefault(require_merge());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _slicedToArray(r, e) {
        return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _unsupportedIterableToArray(r, a2) {
        if (r) {
          if ("string" == typeof r) return _arrayLikeToArray(r, a2);
          var t = {}.toString.call(r).slice(8, -1);
          return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a2) : void 0;
        }
      }
      function _arrayLikeToArray(r, a2) {
        (null == a2 || a2 > r.length) && (a2 = r.length);
        for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
        return n;
      }
      function _iterableToArrayLimit(r, l) {
        var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (null != t) {
          var e, n, i2, u, a2 = [], f = true, o = false;
          try {
            if (i2 = (t = t.call(r)).next, 0 === l) {
              if (Object(t) !== t) return;
              f = false;
            } else for (; !(f = (e = i2.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
          } catch (r2) {
            o = true, n = r2;
          } finally {
            try {
              if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
            } finally {
              if (o) throw n;
            }
          }
          return a2;
        }
      }
      function _arrayWithHoles(r) {
        if (Array.isArray(r)) return r;
      }
      var default_url_options = {
        protocols: ["http", "https", "ftp"],
        require_tld: true,
        require_protocol: false,
        require_host: true,
        require_port: false,
        require_valid_protocol: true,
        allow_underscores: false,
        allow_trailing_dot: false,
        allow_protocol_relative_urls: false,
        allow_fragments: true,
        allow_query_components: true,
        validate_length: true,
        max_allowed_length: 2084
      };
      var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;
      function isURL(url, options) {
        (0, _assertString.default)(url);
        if (!url || /[\s<>]/.test(url)) {
          return false;
        }
        if (url.indexOf("mailto:") === 0) {
          return false;
        }
        options = (0, _merge.default)(options, default_url_options);
        if (options.validate_length && url.length > options.max_allowed_length) {
          return false;
        }
        if (!options.allow_fragments && (0, _includesString.default)(url, "#")) {
          return false;
        }
        if (!options.allow_query_components && ((0, _includesString.default)(url, "?") || (0, _includesString.default)(url, "&"))) {
          return false;
        }
        var protocol, auth, host, hostname, port, port_str, split, ipv6;
        split = url.split("#");
        url = split.shift();
        split = url.split("?");
        url = split.shift();
        var protocol_match = url.match(/^([a-z][a-z0-9+\-.]*):/i);
        var had_explicit_protocol = false;
        var cleanUpProtocol = function cleanUpProtocol2(potential_protocol2) {
          had_explicit_protocol = true;
          protocol = potential_protocol2.toLowerCase();
          if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
            return false;
          }
          return url.substring(protocol_match[0].length);
        };
        if (protocol_match) {
          var potential_protocol = protocol_match[1];
          var after_colon = url.substring(protocol_match[0].length);
          var starts_with_slashes = after_colon.slice(0, 2) === "//";
          if (!starts_with_slashes) {
            var first_slash_position = after_colon.indexOf("/");
            var before_slash = first_slash_position === -1 ? after_colon : after_colon.substring(0, first_slash_position);
            var at_position = before_slash.indexOf("@");
            if (at_position !== -1) {
              var before_at = before_slash.substring(0, at_position);
              var valid_auth_regex = /^[a-zA-Z0-9\-_.%:]*$/;
              var is_valid_auth = valid_auth_regex.test(before_at);
              var has_encoded_content = /%[0-9a-fA-F]{2}/.test(before_at);
              if (is_valid_auth && !has_encoded_content) {
                if (options.require_protocol) {
                  return false;
                }
              } else {
                url = cleanUpProtocol(potential_protocol);
                if (url === false) {
                  return false;
                }
              }
            } else {
              var looks_like_port = /^[0-9]/.test(after_colon);
              if (looks_like_port) {
                if (options.require_protocol) {
                  return false;
                }
              } else {
                url = cleanUpProtocol(potential_protocol);
                if (url === false) {
                  return false;
                }
              }
            }
          } else {
            url = cleanUpProtocol(potential_protocol);
            if (url === false) {
              return false;
            }
          }
        } else if (options.require_protocol) {
          return false;
        }
        if (url.slice(0, 2) === "//") {
          if (!had_explicit_protocol && !options.allow_protocol_relative_urls) {
            return false;
          }
          url = url.slice(2);
        }
        if (url === "") {
          return false;
        }
        split = url.split("/");
        url = split.shift();
        if (url === "" && !options.require_host) {
          return true;
        }
        split = url.split("@");
        if (split.length > 1) {
          if (options.disallow_auth) {
            return false;
          }
          if (split[0] === "") {
            return false;
          }
          auth = split.shift();
          if (auth.indexOf(":") >= 0 && auth.split(":").length > 2) {
            return false;
          }
          var _auth$split = auth.split(":"), _auth$split2 = _slicedToArray(_auth$split, 2), user = _auth$split2[0], password = _auth$split2[1];
          if (user === "" && password === "") {
            return false;
          }
        }
        hostname = split.join("@");
        port_str = null;
        ipv6 = null;
        var ipv6_match = hostname.match(wrapped_ipv6);
        if (ipv6_match) {
          host = "";
          ipv6 = ipv6_match[1];
          port_str = ipv6_match[2] || null;
        } else {
          split = hostname.split(":");
          host = split.shift();
          if (split.length) {
            port_str = split.join(":");
          }
        }
        if (port_str !== null && port_str.length > 0) {
          port = parseInt(port_str, 10);
          if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
            return false;
          }
        } else if (options.require_port) {
          return false;
        }
        if (options.host_whitelist) {
          return (0, _checkHost.default)(host, options.host_whitelist);
        }
        if (host === "" && !options.require_host) {
          return true;
        }
        if (!(0, _isIP.default)(host) && !(0, _isFQDN.default)(host, options) && (!ipv6 || !(0, _isIP.default)(ipv6, 6))) {
          return false;
        }
        host = host || ipv6;
        if (options.host_blacklist && (0, _checkHost.default)(host, options.host_blacklist)) {
          return false;
        }
        return true;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isMACAddress.js
  var require_isMACAddress = __commonJS({
    "node_modules/validator/lib/isMACAddress.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isMACAddress;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var macAddress48 = /^(?:[0-9a-fA-F]{2}([-:\s]))([0-9a-fA-F]{2}\1){4}([0-9a-fA-F]{2})$/;
      var macAddress48NoSeparators = /^([0-9a-fA-F]){12}$/;
      var macAddress48WithDots = /^([0-9a-fA-F]{4}\.){2}([0-9a-fA-F]{4})$/;
      var macAddress64 = /^(?:[0-9a-fA-F]{2}([-:\s]))([0-9a-fA-F]{2}\1){6}([0-9a-fA-F]{2})$/;
      var macAddress64NoSeparators = /^([0-9a-fA-F]){16}$/;
      var macAddress64WithDots = /^([0-9a-fA-F]{4}\.){3}([0-9a-fA-F]{4})$/;
      function isMACAddress(str, options) {
        (0, _assertString.default)(str);
        if (options !== null && options !== void 0 && options.eui) {
          options.eui = String(options.eui);
        }
        if (options !== null && options !== void 0 && options.no_colons || options !== null && options !== void 0 && options.no_separators) {
          if (options.eui === "48") {
            return macAddress48NoSeparators.test(str);
          }
          if (options.eui === "64") {
            return macAddress64NoSeparators.test(str);
          }
          return macAddress48NoSeparators.test(str) || macAddress64NoSeparators.test(str);
        }
        if ((options === null || options === void 0 ? void 0 : options.eui) === "48") {
          return macAddress48.test(str) || macAddress48WithDots.test(str);
        }
        if ((options === null || options === void 0 ? void 0 : options.eui) === "64") {
          return macAddress64.test(str) || macAddress64WithDots.test(str);
        }
        return isMACAddress(str, {
          eui: "48"
        }) || isMACAddress(str, {
          eui: "64"
        });
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isIPRange.js
  var require_isIPRange = __commonJS({
    "node_modules/validator/lib/isIPRange.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isIPRange;
      var _assertString = _interopRequireDefault(require_assertString());
      var _isIP = _interopRequireDefault(require_isIP());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var subnetMaybe = /^\d{1,3}$/;
      var v4Subnet = 32;
      var v6Subnet = 128;
      function isIPRange(str) {
        var version = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
        (0, _assertString.default)(str);
        var parts = str.split("/");
        if (parts.length !== 2) {
          return false;
        }
        if (!subnetMaybe.test(parts[1])) {
          return false;
        }
        if (parts[1].length > 1 && parts[1].startsWith("0")) {
          return false;
        }
        var isValidIP = (0, _isIP.default)(parts[0], version);
        if (!isValidIP) {
          return false;
        }
        var expectedSubnet = null;
        switch (String(version)) {
          case "4":
            expectedSubnet = v4Subnet;
            break;
          case "6":
            expectedSubnet = v6Subnet;
            break;
          default:
            expectedSubnet = (0, _isIP.default)(parts[0], "6") ? v6Subnet : v4Subnet;
        }
        return parts[1] <= expectedSubnet && parts[1] >= 0;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isDate.js
  var require_isDate = __commonJS({
    "node_modules/validator/lib/isDate.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isDate;
      var _merge = _interopRequireDefault(require_merge());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _slicedToArray(r, e) {
        return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _iterableToArrayLimit(r, l) {
        var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (null != t) {
          var e, n, i2, u, a2 = [], f = true, o = false;
          try {
            if (i2 = (t = t.call(r)).next, 0 === l) {
              if (Object(t) !== t) return;
              f = false;
            } else for (; !(f = (e = i2.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
          } catch (r2) {
            o = true, n = r2;
          } finally {
            try {
              if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
            } finally {
              if (o) throw n;
            }
          }
          return a2;
        }
      }
      function _arrayWithHoles(r) {
        if (Array.isArray(r)) return r;
      }
      function _createForOfIteratorHelper(r, e) {
        var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (!t) {
          if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
            t && (r = t);
            var _n = 0, F = function F2() {
            };
            return { s: F, n: function n() {
              return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
            }, e: function e2(r2) {
              throw r2;
            }, f: F };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var o, a2 = true, u = false;
        return { s: function s() {
          t = t.call(r);
        }, n: function n() {
          var r2 = t.next();
          return a2 = r2.done, r2;
        }, e: function e2(r2) {
          u = true, o = r2;
        }, f: function f() {
          try {
            a2 || null == t.return || t.return();
          } finally {
            if (u) throw o;
          }
        } };
      }
      function _unsupportedIterableToArray(r, a2) {
        if (r) {
          if ("string" == typeof r) return _arrayLikeToArray(r, a2);
          var t = {}.toString.call(r).slice(8, -1);
          return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a2) : void 0;
        }
      }
      function _arrayLikeToArray(r, a2) {
        (null == a2 || a2 > r.length) && (a2 = r.length);
        for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
        return n;
      }
      var default_date_options = {
        format: "YYYY/MM/DD",
        delimiters: ["/", "-"],
        strictMode: false
      };
      function isValidFormat(format) {
        return /(^(y{4}|y{2})[.\/-](m{1,2})[.\/-](d{1,2})$)|(^(m{1,2})[.\/-](d{1,2})[.\/-]((y{4}|y{2})$))|(^(d{1,2})[.\/-](m{1,2})[.\/-]((y{4}|y{2})$))/gi.test(format);
      }
      function zip(date, format) {
        var zippedArr = [], len = Math.max(date.length, format.length);
        for (var i2 = 0; i2 < len; i2++) {
          zippedArr.push([date[i2], format[i2]]);
        }
        return zippedArr;
      }
      function isDate(input, options) {
        if (typeof options === "string") {
          options = (0, _merge.default)({
            format: options
          }, default_date_options);
        } else {
          options = (0, _merge.default)(options, default_date_options);
        }
        if (typeof input === "string" && isValidFormat(options.format)) {
          if (options.strictMode && input.length !== options.format.length) return false;
          var formatDelimiter = options.delimiters.find(function(delimiter) {
            return options.format.indexOf(delimiter) !== -1;
          });
          var dateDelimiter = options.strictMode ? formatDelimiter : options.delimiters.find(function(delimiter) {
            return input.indexOf(delimiter) !== -1;
          });
          var dateAndFormat = zip(input.split(dateDelimiter), options.format.toLowerCase().split(formatDelimiter));
          var dateObj = {};
          var _iterator = _createForOfIteratorHelper(dateAndFormat), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var _step$value = _slicedToArray(_step.value, 2), dateWord = _step$value[0], formatWord = _step$value[1];
              if (!dateWord || !formatWord || dateWord.length !== formatWord.length) {
                return false;
              }
              dateObj[formatWord.charAt(0)] = dateWord;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          var fullYear = dateObj.y;
          if (fullYear.startsWith("-")) {
            return false;
          }
          if (dateObj.y.length === 2) {
            var parsedYear = parseInt(dateObj.y, 10);
            if (isNaN(parsedYear)) {
              return false;
            }
            var currentYearLastTwoDigits = (/* @__PURE__ */ new Date()).getFullYear() % 100;
            if (parsedYear < currentYearLastTwoDigits) {
              fullYear = "20".concat(dateObj.y);
            } else {
              fullYear = "19".concat(dateObj.y);
            }
          }
          var month = dateObj.m;
          if (dateObj.m.length === 1) {
            month = "0".concat(dateObj.m);
          }
          var day = dateObj.d;
          if (dateObj.d.length === 1) {
            day = "0".concat(dateObj.d);
          }
          return new Date("".concat(fullYear, "-").concat(month, "-").concat(day, "T00:00:00.000Z")).getUTCDate() === +dateObj.d;
        }
        if (!options.strictMode) {
          return Object.prototype.toString.call(input) === "[object Date]" && isFinite(input);
        }
        return false;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isTime.js
  var require_isTime = __commonJS({
    "node_modules/validator/lib/isTime.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isTime;
      var _merge = _interopRequireDefault(require_merge());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var default_time_options = {
        hourFormat: "hour24",
        mode: "default"
      };
      var formats = {
        hour24: {
          default: /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
          withSeconds: /^([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/,
          withOptionalSeconds: /^([01]?[0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9]))?$/
        },
        hour12: {
          default: /^(0?[1-9]|1[0-2]):([0-5][0-9]) (A|P)M$/,
          withSeconds: /^(0?[1-9]|1[0-2]):([0-5][0-9]):([0-5][0-9]) (A|P)M$/,
          withOptionalSeconds: /^(0?[1-9]|1[0-2]):([0-5][0-9])(?::([0-5][0-9]))? (A|P)M$/
        }
      };
      function isTime(input, options) {
        options = (0, _merge.default)(options, default_time_options);
        if (typeof input !== "string") return false;
        return formats[options.hourFormat][options.mode].test(input);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/util/includesArray.js
  var require_includesArray = __commonJS({
    "node_modules/validator/lib/util/includesArray.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var includes = function includes2(arr, val) {
        return arr.some(function(arrVal) {
          return val === arrVal;
        });
      };
      var _default = exports.default = includes;
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isBoolean.js
  var require_isBoolean = __commonJS({
    "node_modules/validator/lib/isBoolean.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isBoolean;
      var _assertString = _interopRequireDefault(require_assertString());
      var _includesArray = _interopRequireDefault(require_includesArray());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var defaultOptions = {
        loose: false
      };
      var strictBooleans = ["true", "false", "1", "0"];
      var looseBooleans = [].concat(strictBooleans, ["yes", "no"]);
      function isBoolean(str) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultOptions;
        (0, _assertString.default)(str);
        if (options.loose) {
          return (0, _includesArray.default)(looseBooleans, str.toLowerCase());
        }
        return (0, _includesArray.default)(strictBooleans, str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isLocale.js
  var require_isLocale = __commonJS({
    "node_modules/validator/lib/isLocale.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isLocale;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var extlang = "([A-Za-z]{3}(-[A-Za-z]{3}){0,2})";
      var language = "(([a-zA-Z]{2,3}(-".concat(extlang, ")?)|([a-zA-Z]{5,8}))");
      var script = "([A-Za-z]{4})";
      var region = "([A-Za-z]{2}|\\d{3})";
      var variant = "([A-Za-z0-9]{5,8}|(\\d[A-Z-a-z0-9]{3}))";
      var singleton = "(\\d|[A-W]|[Y-Z]|[a-w]|[y-z])";
      var extension = "(".concat(singleton, "(-[A-Za-z0-9]{2,8})+)");
      var privateuse = "(x(-[A-Za-z0-9]{1,8})+)";
      var irregular = "((en-GB-oed)|(i-ami)|(i-bnn)|(i-default)|(i-enochian)|(i-hak)|(i-klingon)|(i-lux)|(i-mingo)|(i-navajo)|(i-pwn)|(i-tao)|(i-tay)|(i-tsu)|(sgn-BE-FR)|(sgn-BE-NL)|(sgn-CH-DE))";
      var regular = "((art-lojban)|(cel-gaulish)|(no-bok)|(no-nyn)|(zh-guoyu)|(zh-hakka)|(zh-min)|(zh-min-nan)|(zh-xiang))";
      var grandfathered = "(".concat(irregular, "|").concat(regular, ")");
      var delimiter = "(-|_)";
      var langtag = "".concat(language, "(").concat(delimiter).concat(script, ")?(").concat(delimiter).concat(region, ")?(").concat(delimiter).concat(variant, ")*(").concat(delimiter).concat(extension, ")*(").concat(delimiter).concat(privateuse, ")?");
      var languageTagRegex = new RegExp("(^".concat(privateuse, "$)|(^").concat(grandfathered, "$)|(^").concat(langtag, "$)"));
      function isLocale(str) {
        (0, _assertString.default)(str);
        return languageTagRegex.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isAbaRouting.js
  var require_isAbaRouting = __commonJS({
    "node_modules/validator/lib/isAbaRouting.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isAbaRouting;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var isRoutingReg = /^(?!(1[3-9])|(20)|(3[3-9])|(4[0-9])|(5[0-9])|(60)|(7[3-9])|(8[1-9])|(9[0-2])|(9[3-9]))[0-9]{9}$/;
      function isAbaRouting(str) {
        (0, _assertString.default)(str);
        if (!isRoutingReg.test(str)) return false;
        var checkSumVal = 0;
        for (var i2 = 0; i2 < str.length; i2++) {
          if (i2 % 3 === 0) checkSumVal += str[i2] * 3;
          else if (i2 % 3 === 1) checkSumVal += str[i2] * 7;
          else checkSumVal += str[i2] * 1;
        }
        return checkSumVal % 10 === 0;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isAlpha.js
  var require_isAlpha = __commonJS({
    "node_modules/validator/lib/isAlpha.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isAlpha;
      exports.locales = void 0;
      var _assertString = _interopRequireDefault(require_assertString());
      var _alpha = require_alpha();
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function isAlpha(_str) {
        var locale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "en-US";
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        (0, _assertString.default)(_str);
        var str = _str;
        var ignore = options.ignore;
        if (ignore) {
          if (ignore instanceof RegExp) {
            str = str.replace(ignore, "");
          } else if (typeof ignore === "string") {
            str = str.replace(new RegExp("[".concat(ignore.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, "\\$&"), "]"), "g"), "");
          } else {
            throw new Error("ignore should be instance of a String or RegExp");
          }
        }
        if (locale in _alpha.alpha) {
          return _alpha.alpha[locale].test(str);
        }
        throw new Error("Invalid locale '".concat(locale, "'"));
      }
      var locales = exports.locales = Object.keys(_alpha.alpha);
    }
  });

  // node_modules/validator/lib/isAlphanumeric.js
  var require_isAlphanumeric = __commonJS({
    "node_modules/validator/lib/isAlphanumeric.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isAlphanumeric;
      exports.locales = void 0;
      var _assertString = _interopRequireDefault(require_assertString());
      var _alpha = require_alpha();
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function isAlphanumeric(_str) {
        var locale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "en-US";
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        (0, _assertString.default)(_str);
        var str = _str;
        var ignore = options.ignore;
        if (ignore) {
          if (ignore instanceof RegExp) {
            str = str.replace(ignore, "");
          } else if (typeof ignore === "string") {
            str = str.replace(new RegExp("[".concat(ignore.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, "\\$&"), "]"), "g"), "");
          } else {
            throw new Error("ignore should be instance of a String or RegExp");
          }
        }
        if (locale in _alpha.alphanumeric) {
          return _alpha.alphanumeric[locale].test(str);
        }
        throw new Error("Invalid locale '".concat(locale, "'"));
      }
      var locales = exports.locales = Object.keys(_alpha.alphanumeric);
    }
  });

  // node_modules/validator/lib/isNumeric.js
  var require_isNumeric = __commonJS({
    "node_modules/validator/lib/isNumeric.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isNumeric;
      var _assertString = _interopRequireDefault(require_assertString());
      var _alpha = require_alpha();
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var numericNoSymbols = /^[0-9]+$/;
      function isNumeric(str, options) {
        (0, _assertString.default)(str);
        if (options && options.no_symbols) {
          return numericNoSymbols.test(str);
        }
        return new RegExp("^[+-]?([0-9]*[".concat((options || {}).locale ? _alpha.decimal[options.locale] : ".", "])?[0-9]+$")).test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isPassportNumber.js
  var require_isPassportNumber = __commonJS({
    "node_modules/validator/lib/isPassportNumber.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isPassportNumber;
      exports.locales = void 0;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var passportRegexByCountryCode = {
        AM: /^[A-Z]{2}\d{7}$/,
        // ARMENIA
        AR: /^[A-Z]{3}\d{6}$/,
        // ARGENTINA
        AT: /^[A-Z]\d{7}$/,
        // AUSTRIA
        AU: /^[A-Z]\d{7}$/,
        // AUSTRALIA
        AZ: /^[A-Z]{1}\d{8}$/,
        // AZERBAIJAN
        BE: /^[A-Z]{2}\d{6}$/,
        // BELGIUM
        BG: /^\d{9}$/,
        // BULGARIA
        BR: /^[A-Z]{2}\d{6}$/,
        // BRAZIL
        BY: /^[A-Z]{2}\d{7}$/,
        // BELARUS
        CA: /^[A-Z]{2}\d{6}$|^[A-Z]\d{6}[A-Z]{2}$/,
        // CANADA
        CH: /^[A-Z]\d{7}$/,
        // SWITZERLAND
        CN: /^G\d{8}$|^E(?![IO])[A-Z0-9]\d{7}$/,
        // CHINA [G=Ordinary, E=Electronic] followed by 8-digits, or E followed by any UPPERCASE letter (except I and O) followed by 7 digits
        CY: /^[A-Z](\d{6}|\d{8})$/,
        // CYPRUS
        CZ: /^\d{8}$/,
        // CZECH REPUBLIC
        DE: /^[CFGHJKLMNPRTVWXYZ0-9]{9}$/,
        // GERMANY
        DK: /^\d{9}$/,
        // DENMARK
        DZ: /^\d{9}$/,
        // ALGERIA
        EE: /^([A-Z]\d{7}|[A-Z]{2}\d{7})$/,
        // ESTONIA (K followed by 7-digits), e-passports have 2 UPPERCASE followed by 7 digits
        ES: /^[A-Z0-9]{2}([A-Z0-9]?)\d{6}$/,
        // SPAIN
        FI: /^[A-Z]{2}\d{7}$/,
        // FINLAND
        FR: /^\d{2}[A-Z]{2}\d{5}$/,
        // FRANCE
        GB: /^\d{9}$/,
        // UNITED KINGDOM
        GR: /^[A-Z]{2}\d{7}$/,
        // GREECE
        HR: /^\d{9}$/,
        // CROATIA
        HU: /^[A-Z]{2}(\d{6}|\d{7})$/,
        // HUNGARY
        IE: /^[A-Z0-9]{2}\d{7}$/,
        // IRELAND
        IN: /^[A-Z]{1}-?\d{7}$/,
        // INDIA
        ID: /^[A-C]\d{7}$/,
        // INDONESIA
        IR: /^[A-Z]\d{8}$/,
        // IRAN
        IS: /^(A)\d{7}$/,
        // ICELAND
        IT: /^[A-Z0-9]{2}\d{7}$/,
        // ITALY
        JM: /^[Aa]\d{7}$/,
        // JAMAICA
        JP: /^[A-Z]{2}\d{7}$/,
        // JAPAN
        KR: /^[MS]\d{8}$/,
        // SOUTH KOREA, REPUBLIC OF KOREA, [S=PS Passports, M=PM Passports]
        KZ: /^[a-zA-Z]\d{7}$/,
        // KAZAKHSTAN
        LI: /^[a-zA-Z]\d{5}$/,
        // LIECHTENSTEIN
        LT: /^[A-Z0-9]{8}$/,
        // LITHUANIA
        LU: /^[A-Z0-9]{8}$/,
        // LUXEMBURG
        LV: /^[A-Z0-9]{2}\d{7}$/,
        // LATVIA
        LY: /^[A-Z0-9]{8}$/,
        // LIBYA
        MT: /^\d{7}$/,
        // MALTA
        MZ: /^([A-Z]{2}\d{7})|(\d{2}[A-Z]{2}\d{5})$/,
        // MOZAMBIQUE
        MY: /^[AHK]\d{8}$/,
        // MALAYSIA
        MX: /^[A-Z]\d{8}$/,
        // MEXICO
        NL: /^[A-Z]{2}[A-Z0-9]{6}\d$/,
        // NETHERLANDS
        NZ: /^([Ll]([Aa]|[Dd]|[Ff]|[Hh])|[Ee]([Aa]|[Pp])|[Nn])\d{6}$/,
        // NEW ZEALAND
        PH: /^([A-Z](\d{6}|\d{7}[A-Z]))|([A-Z]{2}(\d{6}|\d{7}))$/,
        // PHILIPPINES
        PK: /^[A-Z]{2}\d{7}$/,
        // PAKISTAN
        PL: /^[A-Z]{2}\d{7}$/,
        // POLAND
        PT: /^[A-Z]\d{6}$/,
        // PORTUGAL
        RO: /^\d{8,9}$/,
        // ROMANIA
        RU: /^\d{9}$/,
        // RUSSIAN FEDERATION
        SE: /^\d{8}$/,
        // SWEDEN
        SL: /^(P)[A-Z]\d{7}$/,
        // SLOVENIA
        SK: /^[0-9A-Z]\d{7}$/,
        // SLOVAKIA
        TH: /^[A-Z]{1,2}\d{6,7}$/,
        // THAILAND
        TR: /^[A-Z]\d{8}$/,
        // TURKEY
        UA: /^[A-Z]{2}\d{6}$/,
        // UKRAINE
        US: /^\d{9}$|^[A-Z]\d{8}$/,
        // UNITED STATES
        ZA: /^[TAMD]\d{8}$/
        // SOUTH AFRICA
      };
      var locales = exports.locales = Object.keys(passportRegexByCountryCode);
      function isPassportNumber(str, countryCode) {
        (0, _assertString.default)(str);
        var normalizedStr = str.replace(/\s/g, "").toUpperCase();
        return countryCode.toUpperCase() in passportRegexByCountryCode && passportRegexByCountryCode[countryCode].test(normalizedStr);
      }
    }
  });

  // node_modules/validator/lib/isInt.js
  var require_isInt = __commonJS({
    "node_modules/validator/lib/isInt.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isInt;
      var _assertString = _interopRequireDefault(require_assertString());
      var _nullUndefinedCheck = _interopRequireDefault(require_nullUndefinedCheck());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;
      var intLeadingZeroes = /^[-+]?[0-9]+$/;
      function isInt(str, options) {
        (0, _assertString.default)(str);
        options = options || {};
        var regex = options.allow_leading_zeroes === false ? int : intLeadingZeroes;
        var minCheckPassed = !options.hasOwnProperty("min") || (0, _nullUndefinedCheck.default)(options.min) || str >= options.min;
        var maxCheckPassed = !options.hasOwnProperty("max") || (0, _nullUndefinedCheck.default)(options.max) || str <= options.max;
        var ltCheckPassed = !options.hasOwnProperty("lt") || (0, _nullUndefinedCheck.default)(options.lt) || str < options.lt;
        var gtCheckPassed = !options.hasOwnProperty("gt") || (0, _nullUndefinedCheck.default)(options.gt) || str > options.gt;
        return regex.test(str) && minCheckPassed && maxCheckPassed && ltCheckPassed && gtCheckPassed;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isPort.js
  var require_isPort = __commonJS({
    "node_modules/validator/lib/isPort.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isPort;
      var _isInt = _interopRequireDefault(require_isInt());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function isPort(str) {
        return (0, _isInt.default)(str, {
          allow_leading_zeroes: false,
          min: 0,
          max: 65535
        });
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isLowercase.js
  var require_isLowercase = __commonJS({
    "node_modules/validator/lib/isLowercase.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isLowercase;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function isLowercase(str) {
        (0, _assertString.default)(str);
        return str === str.toLowerCase();
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isUppercase.js
  var require_isUppercase = __commonJS({
    "node_modules/validator/lib/isUppercase.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isUppercase;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function isUppercase(str) {
        (0, _assertString.default)(str);
        return str === str.toUpperCase();
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isIMEI.js
  var require_isIMEI = __commonJS({
    "node_modules/validator/lib/isIMEI.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isIMEI;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var imeiRegexWithoutHyphens = /^[0-9]{15}$/;
      var imeiRegexWithHyphens = /^\d{2}-\d{6}-\d{6}-\d{1}$/;
      function isIMEI(str, options) {
        (0, _assertString.default)(str);
        options = options || {};
        var imeiRegex = imeiRegexWithoutHyphens;
        if (options.allow_hyphens) {
          imeiRegex = imeiRegexWithHyphens;
        }
        if (!imeiRegex.test(str)) {
          return false;
        }
        str = str.replace(/-/g, "");
        var sum = 0, mul = 2, l = 14;
        for (var i2 = 0; i2 < l; i2++) {
          var digit = str.substring(l - i2 - 1, l - i2);
          var tp = parseInt(digit, 10) * mul;
          if (tp >= 10) {
            sum += tp % 10 + 1;
          } else {
            sum += tp;
          }
          if (mul === 1) {
            mul += 1;
          } else {
            mul -= 1;
          }
        }
        var chk = (10 - sum % 10) % 10;
        if (chk !== parseInt(str.substring(14, 15), 10)) {
          return false;
        }
        return true;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isAscii.js
  var require_isAscii = __commonJS({
    "node_modules/validator/lib/isAscii.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isAscii;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var ascii = /^[\x00-\x7F]+$/;
      function isAscii(str) {
        (0, _assertString.default)(str);
        return ascii.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isFullWidth.js
  var require_isFullWidth = __commonJS({
    "node_modules/validator/lib/isFullWidth.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isFullWidth;
      exports.fullWidth = void 0;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var fullWidth = exports.fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
      function isFullWidth(str) {
        (0, _assertString.default)(str);
        return fullWidth.test(str);
      }
    }
  });

  // node_modules/validator/lib/isHalfWidth.js
  var require_isHalfWidth = __commonJS({
    "node_modules/validator/lib/isHalfWidth.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isHalfWidth;
      exports.halfWidth = void 0;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var halfWidth = exports.halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
      function isHalfWidth(str) {
        (0, _assertString.default)(str);
        return halfWidth.test(str);
      }
    }
  });

  // node_modules/validator/lib/isVariableWidth.js
  var require_isVariableWidth = __commonJS({
    "node_modules/validator/lib/isVariableWidth.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isVariableWidth;
      var _assertString = _interopRequireDefault(require_assertString());
      var _isFullWidth = require_isFullWidth();
      var _isHalfWidth = require_isHalfWidth();
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function isVariableWidth(str) {
        (0, _assertString.default)(str);
        return _isFullWidth.fullWidth.test(str) && _isHalfWidth.halfWidth.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isMultibyte.js
  var require_isMultibyte = __commonJS({
    "node_modules/validator/lib/isMultibyte.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isMultibyte;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var multibyte = /[^\x00-\x7F]/;
      function isMultibyte(str) {
        (0, _assertString.default)(str);
        return multibyte.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/util/multilineRegex.js
  var require_multilineRegex = __commonJS({
    "node_modules/validator/lib/util/multilineRegex.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = multilineRegexp;
      function multilineRegexp(parts, flags) {
        var regexpAsStringLiteral = parts.join("");
        return new RegExp(regexpAsStringLiteral, flags);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isSemVer.js
  var require_isSemVer = __commonJS({
    "node_modules/validator/lib/isSemVer.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isSemVer;
      var _assertString = _interopRequireDefault(require_assertString());
      var _multilineRegex = _interopRequireDefault(require_multilineRegex());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var semanticVersioningRegex = (0, _multilineRegex.default)(["^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)", "(?:-((?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*))*))", "?(?:\\+([0-9a-z-]+(?:\\.[0-9a-z-]+)*))?$"], "i");
      function isSemVer(str) {
        (0, _assertString.default)(str);
        return semanticVersioningRegex.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isSurrogatePair.js
  var require_isSurrogatePair = __commonJS({
    "node_modules/validator/lib/isSurrogatePair.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isSurrogatePair;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
      function isSurrogatePair(str) {
        (0, _assertString.default)(str);
        return surrogatePair.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isDecimal.js
  var require_isDecimal = __commonJS({
    "node_modules/validator/lib/isDecimal.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isDecimal;
      var _merge = _interopRequireDefault(require_merge());
      var _assertString = _interopRequireDefault(require_assertString());
      var _includesArray = _interopRequireDefault(require_includesArray());
      var _alpha = require_alpha();
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function decimalRegExp(options) {
        var regExp = new RegExp("^[-+]?([0-9]+)?(\\".concat(_alpha.decimal[options.locale], "[0-9]{").concat(options.decimal_digits, "})").concat(options.force_decimal ? "" : "?", "$"));
        return regExp;
      }
      var default_decimal_options = {
        force_decimal: false,
        decimal_digits: "1,",
        locale: "en-US"
      };
      var blacklist = ["", "-", "+"];
      function isDecimal(str, options) {
        (0, _assertString.default)(str);
        options = (0, _merge.default)(options, default_decimal_options);
        if (options.locale in _alpha.decimal) {
          return !(0, _includesArray.default)(blacklist, str.replace(/ /g, "")) && decimalRegExp(options).test(str);
        }
        throw new Error("Invalid locale '".concat(options.locale, "'"));
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isHexadecimal.js
  var require_isHexadecimal = __commonJS({
    "node_modules/validator/lib/isHexadecimal.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isHexadecimal;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var hexadecimal = /^(0x|0h)?[0-9A-F]+$/i;
      function isHexadecimal(str) {
        (0, _assertString.default)(str);
        return hexadecimal.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isOctal.js
  var require_isOctal = __commonJS({
    "node_modules/validator/lib/isOctal.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isOctal;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var octal = /^(0o)?[0-7]+$/i;
      function isOctal(str) {
        (0, _assertString.default)(str);
        return octal.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isDivisibleBy.js
  var require_isDivisibleBy = __commonJS({
    "node_modules/validator/lib/isDivisibleBy.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isDivisibleBy;
      var _assertString = _interopRequireDefault(require_assertString());
      var _toFloat = _interopRequireDefault(require_toFloat());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function isDivisibleBy(str, num) {
        (0, _assertString.default)(str);
        return (0, _toFloat.default)(str) % parseInt(num, 10) === 0;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isHexColor.js
  var require_isHexColor = __commonJS({
    "node_modules/validator/lib/isHexColor.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isHexColor;
      var _assertString = _interopRequireDefault(require_assertString());
      var _merge = _interopRequireDefault(require_merge());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;
      var hexcolor_with_prefix = /^#([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;
      var default_is_hexcolor_options = {
        require_hashtag: false
      };
      function isHexColor(str, options) {
        (0, _assertString.default)(str);
        options = (0, _merge.default)(options, default_is_hexcolor_options);
        var hexcolor_regex = options.require_hashtag ? hexcolor_with_prefix : hexcolor;
        return hexcolor_regex.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isRgbColor.js
  var require_isRgbColor = __commonJS({
    "node_modules/validator/lib/isRgbColor.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isRgbColor;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      var rgbColor = /^rgb\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){2}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\)$/;
      var rgbaColor = /^rgba\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){3}(0?\.\d\d?|1(\.0)?|0(\.0)?)\)$/;
      var rgbColorPercent = /^rgb\((([0-9]%|[1-9][0-9]%|100%),){2}([0-9]%|[1-9][0-9]%|100%)\)$/;
      var rgbaColorPercent = /^rgba\((([0-9]%|[1-9][0-9]%|100%),){3}(0?\.\d\d?|1(\.0)?|0(\.0)?)\)$/;
      var startsWithRgb = /^rgba?/;
      function isRgbColor(str, options) {
        (0, _assertString.default)(str);
        var allowSpaces = false;
        var includePercentValues = true;
        if (_typeof(options) !== "object") {
          if (arguments.length >= 2) {
            includePercentValues = arguments[1];
          }
        } else {
          allowSpaces = options.allowSpaces !== void 0 ? options.allowSpaces : allowSpaces;
          includePercentValues = options.includePercentValues !== void 0 ? options.includePercentValues : includePercentValues;
        }
        if (allowSpaces) {
          if (!startsWithRgb.test(str)) {
            return false;
          }
          str = str.replace(/\s/g, "");
        }
        if (!includePercentValues) {
          return rgbColor.test(str) || rgbaColor.test(str);
        }
        return rgbColor.test(str) || rgbaColor.test(str) || rgbColorPercent.test(str) || rgbaColorPercent.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isHSL.js
  var require_isHSL = __commonJS({
    "node_modules/validator/lib/isHSL.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isHSL;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var hslComma = /^hsla?\(((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn)?(,(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}(,((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?))?\)$/i;
      var hslSpace = /^hsla?\(((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn)?(\s(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}\s?(\/\s((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?)\s?)?\)$/i;
      function isHSL(str) {
        (0, _assertString.default)(str);
        var strippedStr = str.replace(/\s+/g, " ").replace(/\s?(hsla?\(|\)|,)\s?/ig, "$1");
        if (strippedStr.indexOf(",") !== -1) {
          return hslComma.test(strippedStr);
        }
        return hslSpace.test(strippedStr);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isISRC.js
  var require_isISRC = __commonJS({
    "node_modules/validator/lib/isISRC.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isISRC;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var isrc = /^[A-Z]{2}[0-9A-Z]{3}\d{2}\d{5}$/;
      function isISRC(str) {
        (0, _assertString.default)(str);
        return isrc.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isIBAN.js
  var require_isIBAN = __commonJS({
    "node_modules/validator/lib/isIBAN.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isIBAN;
      exports.locales = void 0;
      var _assertString = _interopRequireDefault(require_assertString());
      var _includesArray = _interopRequireDefault(require_includesArray());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var ibanRegexThroughCountryCode = {
        AD: /^(AD[0-9]{2})\d{8}[A-Z0-9]{12}$/,
        AE: /^(AE[0-9]{2})\d{3}\d{16}$/,
        AL: /^(AL[0-9]{2})\d{8}[A-Z0-9]{16}$/,
        AT: /^(AT[0-9]{2})\d{16}$/,
        AZ: /^(AZ[0-9]{2})[A-Z0-9]{4}\d{20}$/,
        BA: /^(BA[0-9]{2})\d{16}$/,
        BE: /^(BE[0-9]{2})\d{12}$/,
        BG: /^(BG[0-9]{2})[A-Z]{4}\d{6}[A-Z0-9]{8}$/,
        BH: /^(BH[0-9]{2})[A-Z]{4}[A-Z0-9]{14}$/,
        BR: /^(BR[0-9]{2})\d{23}[A-Z]{1}[A-Z0-9]{1}$/,
        BY: /^(BY[0-9]{2})[A-Z0-9]{4}\d{20}$/,
        CH: /^(CH[0-9]{2})\d{5}[A-Z0-9]{12}$/,
        CR: /^(CR[0-9]{2})\d{18}$/,
        CY: /^(CY[0-9]{2})\d{8}[A-Z0-9]{16}$/,
        CZ: /^(CZ[0-9]{2})\d{20}$/,
        DE: /^(DE[0-9]{2})\d{18}$/,
        DK: /^(DK[0-9]{2})\d{14}$/,
        DO: /^(DO[0-9]{2})[A-Z]{4}\d{20}$/,
        DZ: /^(DZ\d{24})$/,
        EE: /^(EE[0-9]{2})\d{16}$/,
        EG: /^(EG[0-9]{2})\d{25}$/,
        ES: /^(ES[0-9]{2})\d{20}$/,
        FI: /^(FI[0-9]{2})\d{14}$/,
        FO: /^(FO[0-9]{2})\d{14}$/,
        FR: /^(FR[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
        GB: /^(GB[0-9]{2})[A-Z]{4}\d{14}$/,
        GE: /^(GE[0-9]{2})[A-Z0-9]{2}\d{16}$/,
        GI: /^(GI[0-9]{2})[A-Z]{4}[A-Z0-9]{15}$/,
        GL: /^(GL[0-9]{2})\d{14}$/,
        GR: /^(GR[0-9]{2})\d{7}[A-Z0-9]{16}$/,
        GT: /^(GT[0-9]{2})[A-Z0-9]{4}[A-Z0-9]{20}$/,
        HR: /^(HR[0-9]{2})\d{17}$/,
        HU: /^(HU[0-9]{2})\d{24}$/,
        IE: /^(IE[0-9]{2})[A-Z]{4}\d{14}$/,
        IL: /^(IL[0-9]{2})\d{19}$/,
        IQ: /^(IQ[0-9]{2})[A-Z]{4}\d{15}$/,
        IR: /^(IR[0-9]{2})\d{22}$/,
        IS: /^(IS[0-9]{2})\d{22}$/,
        IT: /^(IT[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
        JO: /^(JO[0-9]{2})[A-Z]{4}\d{22}$/,
        KW: /^(KW[0-9]{2})[A-Z]{4}[A-Z0-9]{22}$/,
        KZ: /^(KZ[0-9]{2})\d{3}[A-Z0-9]{13}$/,
        LB: /^(LB[0-9]{2})\d{4}[A-Z0-9]{20}$/,
        LC: /^(LC[0-9]{2})[A-Z]{4}[A-Z0-9]{24}$/,
        LI: /^(LI[0-9]{2})\d{5}[A-Z0-9]{12}$/,
        LT: /^(LT[0-9]{2})\d{16}$/,
        LU: /^(LU[0-9]{2})\d{3}[A-Z0-9]{13}$/,
        LV: /^(LV[0-9]{2})[A-Z]{4}[A-Z0-9]{13}$/,
        MA: /^(MA[0-9]{26})$/,
        MC: /^(MC[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
        MD: /^(MD[0-9]{2})[A-Z0-9]{20}$/,
        ME: /^(ME[0-9]{2})\d{18}$/,
        MK: /^(MK[0-9]{2})\d{3}[A-Z0-9]{10}\d{2}$/,
        MR: /^(MR[0-9]{2})\d{23}$/,
        MT: /^(MT[0-9]{2})[A-Z]{4}\d{5}[A-Z0-9]{18}$/,
        MU: /^(MU[0-9]{2})[A-Z]{4}\d{19}[A-Z]{3}$/,
        MZ: /^(MZ[0-9]{2})\d{21}$/,
        NL: /^(NL[0-9]{2})[A-Z]{4}\d{10}$/,
        NO: /^(NO[0-9]{2})\d{11}$/,
        PK: /^(PK[0-9]{2})[A-Z0-9]{4}\d{16}$/,
        PL: /^(PL[0-9]{2})\d{24}$/,
        PS: /^(PS[0-9]{2})[A-Z]{4}[A-Z0-9]{21}$/,
        PT: /^(PT[0-9]{2})\d{21}$/,
        QA: /^(QA[0-9]{2})[A-Z]{4}[A-Z0-9]{21}$/,
        RO: /^(RO[0-9]{2})[A-Z]{4}[A-Z0-9]{16}$/,
        RS: /^(RS[0-9]{2})\d{18}$/,
        SA: /^(SA[0-9]{2})\d{2}[A-Z0-9]{18}$/,
        SC: /^(SC[0-9]{2})[A-Z]{4}\d{20}[A-Z]{3}$/,
        SE: /^(SE[0-9]{2})\d{20}$/,
        SI: /^(SI[0-9]{2})\d{15}$/,
        SK: /^(SK[0-9]{2})\d{20}$/,
        SM: /^(SM[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
        SV: /^(SV[0-9]{2})[A-Z0-9]{4}\d{20}$/,
        TL: /^(TL[0-9]{2})\d{19}$/,
        TN: /^(TN[0-9]{2})\d{20}$/,
        TR: /^(TR[0-9]{2})\d{5}[A-Z0-9]{17}$/,
        UA: /^(UA[0-9]{2})\d{6}[A-Z0-9]{19}$/,
        VA: /^(VA[0-9]{2})\d{18}$/,
        VG: /^(VG[0-9]{2})[A-Z]{4}\d{16}$/,
        XK: /^(XK[0-9]{2})\d{16}$/
      };
      function hasOnlyValidCountryCodes(countryCodeArray) {
        var countryCodeArrayFilteredWithObjectIbanCode = countryCodeArray.filter(function(countryCode) {
          return !(countryCode in ibanRegexThroughCountryCode);
        });
        return countryCodeArrayFilteredWithObjectIbanCode.length === 0;
      }
      function hasValidIbanFormat(str, options) {
        var strippedStr = str.replace(/[\s\-]+/gi, "").toUpperCase();
        var isoCountryCode = strippedStr.slice(0, 2).toUpperCase();
        var isoCountryCodeInIbanRegexCodeObject = isoCountryCode in ibanRegexThroughCountryCode;
        if (options.whitelist) {
          if (!hasOnlyValidCountryCodes(options.whitelist)) {
            return false;
          }
          var isoCountryCodeInWhiteList = (0, _includesArray.default)(options.whitelist, isoCountryCode);
          if (!isoCountryCodeInWhiteList) {
            return false;
          }
        }
        if (options.blacklist) {
          var isoCountryCodeInBlackList = (0, _includesArray.default)(options.blacklist, isoCountryCode);
          if (isoCountryCodeInBlackList) {
            return false;
          }
        }
        return isoCountryCodeInIbanRegexCodeObject && ibanRegexThroughCountryCode[isoCountryCode].test(strippedStr);
      }
      function hasValidIbanChecksum(str) {
        var strippedStr = str.replace(/[^A-Z0-9]+/gi, "").toUpperCase();
        var rearranged = strippedStr.slice(4) + strippedStr.slice(0, 4);
        var alphaCapsReplacedWithDigits = rearranged.replace(/[A-Z]/g, function(char) {
          return char.charCodeAt(0) - 55;
        });
        var remainder = alphaCapsReplacedWithDigits.match(/\d{1,7}/g).reduce(function(acc, value) {
          return Number(acc + value) % 97;
        }, "");
        return remainder === 1;
      }
      function isIBAN(str) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        (0, _assertString.default)(str);
        return hasValidIbanFormat(str, options) && hasValidIbanChecksum(str);
      }
      var locales = exports.locales = Object.keys(ibanRegexThroughCountryCode);
    }
  });

  // node_modules/validator/lib/isISO31661Alpha2.js
  var require_isISO31661Alpha2 = __commonJS({
    "node_modules/validator/lib/isISO31661Alpha2.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.CountryCodes = void 0;
      exports.default = isISO31661Alpha2;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var validISO31661Alpha2CountriesCodes = /* @__PURE__ */ new Set(["AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "YE", "YT", "ZA", "ZM", "ZW"]);
      var alpha2CountryCode = /^[a-zA-Z]{2}$/;
      function isISO31661Alpha2(str) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        (0, _assertString.default)(str);
        var userAssignedCodes = options.userAssignedCodes;
        var validUserAssignedCodes = (userAssignedCodes || []).reduce(function(accumulator, userAssignedCode) {
          if (alpha2CountryCode.test(userAssignedCode)) {
            accumulator.push(userAssignedCode.toUpperCase());
          }
          return accumulator;
        }, []);
        if (validUserAssignedCodes.includes(str.toUpperCase())) {
          return true;
        }
        return validISO31661Alpha2CountriesCodes.has(str.toUpperCase());
      }
      var CountryCodes = exports.CountryCodes = validISO31661Alpha2CountriesCodes;
    }
  });

  // node_modules/validator/lib/isBIC.js
  var require_isBIC = __commonJS({
    "node_modules/validator/lib/isBIC.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isBIC;
      var _assertString = _interopRequireDefault(require_assertString());
      var _isISO31661Alpha = require_isISO31661Alpha2();
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var isBICReg = /^[A-Za-z]{6}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?$/;
      function isBIC(str) {
        (0, _assertString.default)(str);
        var countryCode = str.slice(4, 6).toUpperCase();
        if (!_isISO31661Alpha.CountryCodes.has(countryCode) && countryCode !== "XK") {
          return false;
        }
        return isBICReg.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isMD5.js
  var require_isMD5 = __commonJS({
    "node_modules/validator/lib/isMD5.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isMD5;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var md5 = /^[a-f0-9]{32}$/;
      function isMD5(str) {
        (0, _assertString.default)(str);
        return md5.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isHash.js
  var require_isHash = __commonJS({
    "node_modules/validator/lib/isHash.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isHash;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var lengths = {
        md5: 32,
        md4: 32,
        sha1: 40,
        sha256: 64,
        sha384: 96,
        sha512: 128,
        ripemd128: 32,
        ripemd160: 40,
        tiger128: 32,
        tiger160: 40,
        tiger192: 48,
        crc32: 8,
        crc32b: 8
      };
      function isHash(str, algorithm) {
        (0, _assertString.default)(str);
        var hash = new RegExp("^[a-fA-F0-9]{".concat(lengths[algorithm], "}$"));
        return hash.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isBase64.js
  var require_isBase64 = __commonJS({
    "node_modules/validator/lib/isBase64.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isBase64;
      var _assertString = _interopRequireDefault(require_assertString());
      var _merge = _interopRequireDefault(require_merge());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var base64WithPadding = /^[A-Za-z0-9+/]+={0,2}$/;
      var base64WithoutPadding = /^[A-Za-z0-9+/]+$/;
      var base64UrlWithPadding = /^[A-Za-z0-9_-]+={0,2}$/;
      var base64UrlWithoutPadding = /^[A-Za-z0-9_-]+$/;
      function isBase64(str, options) {
        var _options;
        (0, _assertString.default)(str);
        options = (0, _merge.default)(options, {
          urlSafe: false,
          padding: !((_options = options) !== null && _options !== void 0 && _options.urlSafe)
        });
        if (str === "") return true;
        if (options.padding && str.length % 4 !== 0) return false;
        var regex;
        if (options.urlSafe) {
          regex = options.padding ? base64UrlWithPadding : base64UrlWithoutPadding;
        } else {
          regex = options.padding ? base64WithPadding : base64WithoutPadding;
        }
        return (!options.padding || str.length % 4 === 0) && regex.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isJWT.js
  var require_isJWT = __commonJS({
    "node_modules/validator/lib/isJWT.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isJWT;
      var _assertString = _interopRequireDefault(require_assertString());
      var _isBase = _interopRequireDefault(require_isBase64());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function isJWT(str) {
        (0, _assertString.default)(str);
        var dotSplit = str.split(".");
        var len = dotSplit.length;
        if (len !== 3) {
          return false;
        }
        return dotSplit.reduce(function(acc, currElem) {
          return acc && (0, _isBase.default)(currElem, {
            urlSafe: true
          });
        }, true);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isJSON.js
  var require_isJSON = __commonJS({
    "node_modules/validator/lib/isJSON.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isJSON;
      var _assertString = _interopRequireDefault(require_assertString());
      var _includesArray = _interopRequireDefault(require_includesArray());
      var _merge = _interopRequireDefault(require_merge());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      var default_json_options = {
        allow_primitives: false,
        allow_any_value: false
      };
      function isJSON(str, options) {
        (0, _assertString.default)(str);
        try {
          options = (0, _merge.default)(options, default_json_options);
          var obj = JSON.parse(str);
          if (options.allow_any_value) {
            return true;
          }
          var primitives = [];
          if (options.allow_primitives) {
            primitives = [null, false, true];
          }
          return (0, _includesArray.default)(primitives, obj) || !!obj && _typeof(obj) === "object";
        } catch (e) {
        }
        return false;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isEmpty.js
  var require_isEmpty = __commonJS({
    "node_modules/validator/lib/isEmpty.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isEmpty;
      var _assertString = _interopRequireDefault(require_assertString());
      var _merge = _interopRequireDefault(require_merge());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var default_is_empty_options = {
        ignore_whitespace: false
      };
      function isEmpty(str, options) {
        (0, _assertString.default)(str);
        options = (0, _merge.default)(options, default_is_empty_options);
        return (options.ignore_whitespace ? str.trim().length : str.length) === 0;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isLength.js
  var require_isLength = __commonJS({
    "node_modules/validator/lib/isLength.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isLength;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      function isLength(str, options) {
        (0, _assertString.default)(str);
        var min;
        var max;
        if (_typeof(options) === "object") {
          min = options.min || 0;
          max = options.max;
        } else {
          min = arguments[1] || 0;
          max = arguments[2];
        }
        var presentationSequences = str.match(/[^\uFE0F\uFE0E][\uFE0F\uFE0E]/g) || [];
        var surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
        var len = str.length - presentationSequences.length - surrogatePairs.length;
        var isInsideRange = len >= min && (typeof max === "undefined" || len <= max);
        if (isInsideRange && Array.isArray(options === null || options === void 0 ? void 0 : options.discreteLengths)) {
          return options.discreteLengths.some(function(discreteLen) {
            return discreteLen === len;
          });
        }
        return isInsideRange;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isULID.js
  var require_isULID = __commonJS({
    "node_modules/validator/lib/isULID.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isULID;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function isULID(str) {
        (0, _assertString.default)(str);
        return /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/i.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isUUID.js
  var require_isUUID = __commonJS({
    "node_modules/validator/lib/isUUID.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isUUID;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var uuid = {
        1: /^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        2: /^[0-9A-F]{8}-[0-9A-F]{4}-2[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        6: /^[0-9A-F]{8}-[0-9A-F]{4}-6[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        7: /^[0-9A-F]{8}-[0-9A-F]{4}-7[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        8: /^[0-9A-F]{8}-[0-9A-F]{4}-8[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        nil: /^00000000-0000-0000-0000-000000000000$/i,
        max: /^ffffffff-ffff-ffff-ffff-ffffffffffff$/i,
        loose: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
        // From https://github.com/uuidjs/uuid/blob/main/src/regex.js
        all: /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i
      };
      function isUUID(str, version) {
        (0, _assertString.default)(str);
        if (version === void 0 || version === null) {
          version = "all";
        }
        return version in uuid ? uuid[version].test(str) : false;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isMongoId.js
  var require_isMongoId = __commonJS({
    "node_modules/validator/lib/isMongoId.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isMongoId;
      var _assertString = _interopRequireDefault(require_assertString());
      var _isHexadecimal = _interopRequireDefault(require_isHexadecimal());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function isMongoId(str) {
        (0, _assertString.default)(str);
        return (0, _isHexadecimal.default)(str) && str.length === 24;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isAfter.js
  var require_isAfter = __commonJS({
    "node_modules/validator/lib/isAfter.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isAfter;
      var _toDate = _interopRequireDefault(require_toDate());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      function isAfter(date, options) {
        var comparisonDate = (_typeof(options) === "object" ? options.comparisonDate : options) || Date().toString();
        var comparison = (0, _toDate.default)(comparisonDate);
        var original = (0, _toDate.default)(date);
        return !!(original && comparison && original > comparison);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isBefore.js
  var require_isBefore = __commonJS({
    "node_modules/validator/lib/isBefore.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isBefore;
      var _toDate = _interopRequireDefault(require_toDate());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      function isBefore(date, options) {
        var comparisonDate = (_typeof(options) === "object" ? options.comparisonDate : options) || Date().toString();
        var comparison = (0, _toDate.default)(comparisonDate);
        var original = (0, _toDate.default)(date);
        return !!(original && comparison && original < comparison);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isIn.js
  var require_isIn = __commonJS({
    "node_modules/validator/lib/isIn.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isIn;
      var _assertString = _interopRequireDefault(require_assertString());
      var _toString = _interopRequireDefault(require_toString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      function isIn(str, options) {
        (0, _assertString.default)(str);
        var i2;
        if (Object.prototype.toString.call(options) === "[object Array]") {
          var array = [];
          for (i2 in options) {
            if ({}.hasOwnProperty.call(options, i2)) {
              array[i2] = (0, _toString.default)(options[i2]);
            }
          }
          return array.indexOf(str) >= 0;
        } else if (_typeof(options) === "object") {
          return options.hasOwnProperty(str);
        } else if (options && typeof options.indexOf === "function") {
          return options.indexOf(str) >= 0;
        }
        return false;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isLuhnNumber.js
  var require_isLuhnNumber = __commonJS({
    "node_modules/validator/lib/isLuhnNumber.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isLuhnNumber;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function isLuhnNumber(str) {
        (0, _assertString.default)(str);
        var sanitized = str.replace(/[- ]+/g, "");
        var sum = 0;
        var digit;
        var tmpNum;
        var shouldDouble;
        for (var i2 = sanitized.length - 1; i2 >= 0; i2--) {
          digit = sanitized.substring(i2, i2 + 1);
          tmpNum = parseInt(digit, 10);
          if (shouldDouble) {
            tmpNum *= 2;
            if (tmpNum >= 10) {
              sum += tmpNum % 10 + 1;
            } else {
              sum += tmpNum;
            }
          } else {
            sum += tmpNum;
          }
          shouldDouble = !shouldDouble;
        }
        return !!(sum % 10 === 0 ? sanitized : false);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isCreditCard.js
  var require_isCreditCard = __commonJS({
    "node_modules/validator/lib/isCreditCard.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isCreditCard;
      var _assertString = _interopRequireDefault(require_assertString());
      var _isLuhnNumber = _interopRequireDefault(require_isLuhnNumber());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var cards = {
        amex: /^3[47][0-9]{13}$/,
        dinersclub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        discover: /^6(?:011|5[0-9][0-9])[0-9]{12,15}$/,
        jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
        mastercard: /^5[1-5][0-9]{2}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
        // /^[25][1-7][0-9]{14}$/;
        unionpay: /^(6[27][0-9]{14}|^(81[0-9]{14,17}))$/,
        visa: /^(?:4[0-9]{12})(?:[0-9]{3,6})?$/
      };
      var allCards = (function() {
        var tmpCardsArray = [];
        for (var cardProvider in cards) {
          if (cards.hasOwnProperty(cardProvider)) {
            tmpCardsArray.push(cards[cardProvider]);
          }
        }
        return tmpCardsArray;
      })();
      function isCreditCard(card) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        (0, _assertString.default)(card);
        var provider = options.provider;
        var sanitized = card.replace(/[- ]+/g, "");
        if (provider && provider.toLowerCase() in cards) {
          if (!cards[provider.toLowerCase()].test(sanitized)) {
            return false;
          }
        } else if (provider && !(provider.toLowerCase() in cards)) {
          throw new Error("".concat(provider, " is not a valid credit card provider."));
        } else if (!allCards.some(function(cardProvider) {
          return cardProvider.test(sanitized);
        })) {
          return false;
        }
        return (0, _isLuhnNumber.default)(card);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isIdentityCard.js
  var require_isIdentityCard = __commonJS({
    "node_modules/validator/lib/isIdentityCard.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isIdentityCard;
      var _assertString = _interopRequireDefault(require_assertString());
      var _includesArray = _interopRequireDefault(require_includesArray());
      var _isInt = _interopRequireDefault(require_isInt());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var validators = {
        PL: function PL(str) {
          (0, _assertString.default)(str);
          var weightOfDigits = {
            1: 1,
            2: 3,
            3: 7,
            4: 9,
            5: 1,
            6: 3,
            7: 7,
            8: 9,
            9: 1,
            10: 3,
            11: 0
          };
          if (str != null && str.length === 11 && (0, _isInt.default)(str, {
            allow_leading_zeroes: true
          })) {
            var digits = str.split("").slice(0, -1);
            var sum = digits.reduce(function(acc, digit, index) {
              return acc + Number(digit) * weightOfDigits[index + 1];
            }, 0);
            var modulo = sum % 10;
            var lastDigit = Number(str.charAt(str.length - 1));
            if (modulo === 0 && lastDigit === 0 || lastDigit === 10 - modulo) {
              return true;
            }
          }
          return false;
        },
        ES: function ES(str) {
          (0, _assertString.default)(str);
          var DNI = /^[0-9X-Z][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
          var charsValue = {
            X: 0,
            Y: 1,
            Z: 2
          };
          var controlDigits = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
          var sanitized = str.trim().toUpperCase();
          if (!DNI.test(sanitized)) {
            return false;
          }
          var number = sanitized.slice(0, -1).replace(/[X,Y,Z]/g, function(char) {
            return charsValue[char];
          });
          return sanitized.endsWith(controlDigits[number % 23]);
        },
        FI: function FI(str) {
          (0, _assertString.default)(str);
          if (str.length !== 11) {
            return false;
          }
          if (!str.match(/^\d{6}[\-A\+]\d{3}[0-9ABCDEFHJKLMNPRSTUVWXY]{1}$/)) {
            return false;
          }
          var checkDigits = "0123456789ABCDEFHJKLMNPRSTUVWXY";
          var idAsNumber = parseInt(str.slice(0, 6), 10) * 1e3 + parseInt(str.slice(7, 10), 10);
          var remainder = idAsNumber % 31;
          var checkDigit = checkDigits[remainder];
          return checkDigit === str.slice(10, 11);
        },
        IN: function IN(str) {
          var DNI = /^[1-9]\d{3}\s?\d{4}\s?\d{4}$/;
          var d = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 0, 6, 7, 8, 9, 5], [2, 3, 4, 0, 1, 7, 8, 9, 5, 6], [3, 4, 0, 1, 2, 8, 9, 5, 6, 7], [4, 0, 1, 2, 3, 9, 5, 6, 7, 8], [5, 9, 8, 7, 6, 0, 4, 3, 2, 1], [6, 5, 9, 8, 7, 1, 0, 4, 3, 2], [7, 6, 5, 9, 8, 2, 1, 0, 4, 3], [8, 7, 6, 5, 9, 3, 2, 1, 0, 4], [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]];
          var p = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 5, 7, 6, 2, 8, 3, 0, 9, 4], [5, 8, 0, 3, 7, 9, 6, 1, 4, 2], [8, 9, 1, 6, 0, 4, 3, 5, 2, 7], [9, 4, 5, 3, 1, 2, 6, 8, 7, 0], [4, 2, 8, 6, 5, 7, 3, 9, 0, 1], [2, 7, 9, 3, 8, 0, 6, 4, 1, 5], [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]];
          var sanitized = str.trim();
          if (!DNI.test(sanitized)) {
            return false;
          }
          var c = 0;
          var invertedArray = sanitized.replace(/\s/g, "").split("").map(Number).reverse();
          invertedArray.forEach(function(val, i2) {
            c = d[c][p[i2 % 8][val]];
          });
          return c === 0;
        },
        IR: function IR(str) {
          if (!str.match(/^\d{10}$/)) return false;
          str = "0000".concat(str).slice(str.length - 6);
          if (parseInt(str.slice(3, 9), 10) === 0) return false;
          var lastNumber = parseInt(str.slice(9, 10), 10);
          var sum = 0;
          for (var i2 = 0; i2 < 9; i2++) {
            sum += parseInt(str.slice(i2, i2 + 1), 10) * (10 - i2);
          }
          sum %= 11;
          return sum < 2 && lastNumber === sum || sum >= 2 && lastNumber === 11 - sum;
        },
        IT: function IT(str) {
          if (str.length !== 9) return false;
          if (str === "CA00000AA") return false;
          return str.search(/C[A-Z]\d{5}[A-Z]{2}/i) > -1;
        },
        NO: function NO(str) {
          var sanitized = str.trim();
          if (isNaN(Number(sanitized))) return false;
          if (sanitized.length !== 11) return false;
          if (sanitized === "00000000000") return false;
          var f = sanitized.split("").map(Number);
          var k1 = (11 - (3 * f[0] + 7 * f[1] + 6 * f[2] + 1 * f[3] + 8 * f[4] + 9 * f[5] + 4 * f[6] + 5 * f[7] + 2 * f[8]) % 11) % 11;
          var k2 = (11 - (5 * f[0] + 4 * f[1] + 3 * f[2] + 2 * f[3] + 7 * f[4] + 6 * f[5] + 5 * f[6] + 4 * f[7] + 3 * f[8] + 2 * k1) % 11) % 11;
          if (k1 !== f[9] || k2 !== f[10]) return false;
          return true;
        },
        TH: function TH(str) {
          if (!str.match(/^[1-8]\d{12}$/)) return false;
          var sum = 0;
          for (var i2 = 0; i2 < 12; i2++) {
            sum += parseInt(str[i2], 10) * (13 - i2);
          }
          return str[12] === ((11 - sum % 11) % 10).toString();
        },
        LK: function LK(str) {
          var old_nic = /^[1-9]\d{8}[vx]$/i;
          var new_nic = /^[1-9]\d{11}$/i;
          if (str.length === 10 && old_nic.test(str)) return true;
          else if (str.length === 12 && new_nic.test(str)) return true;
          return false;
        },
        "he-IL": function heIL(str) {
          var DNI = /^\d{9}$/;
          var sanitized = str.trim();
          if (!DNI.test(sanitized)) {
            return false;
          }
          var id = sanitized;
          var sum = 0, incNum;
          for (var i2 = 0; i2 < id.length; i2++) {
            incNum = Number(id[i2]) * (i2 % 2 + 1);
            sum += incNum > 9 ? incNum - 9 : incNum;
          }
          return sum % 10 === 0;
        },
        "ar-LY": function arLY(str) {
          var NIN = /^(1|2)\d{11}$/;
          var sanitized = str.trim();
          return NIN.test(sanitized);
        },
        "ar-TN": function arTN(str) {
          var DNI = /^\d{8}$/;
          var sanitized = str.trim();
          return DNI.test(sanitized);
        },
        "zh-CN": function zhCN(str) {
          var provincesAndCities = [
            "11",
            // 北京
            "12",
            // 天津
            "13",
            // 河北
            "14",
            // 山西
            "15",
            // 内蒙古
            "21",
            // 辽宁
            "22",
            // 吉林
            "23",
            // 黑龙江
            "31",
            // 上海
            "32",
            // 江苏
            "33",
            // 浙江
            "34",
            // 安徽
            "35",
            // 福建
            "36",
            // 江西
            "37",
            // 山东
            "41",
            // 河南
            "42",
            // 湖北
            "43",
            // 湖南
            "44",
            // 广东
            "45",
            // 广西
            "46",
            // 海南
            "50",
            // 重庆
            "51",
            // 四川
            "52",
            // 贵州
            "53",
            // 云南
            "54",
            // 西藏
            "61",
            // 陕西
            "62",
            // 甘肃
            "63",
            // 青海
            "64",
            // 宁夏
            "65",
            // 新疆
            "71",
            // 台湾
            "81",
            // 香港
            "82",
            // 澳门
            "91"
            // 国外
          ];
          var powers = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"];
          var parityBit = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
          var checkAddressCode = function checkAddressCode2(addressCode) {
            return (0, _includesArray.default)(provincesAndCities, addressCode);
          };
          var checkBirthDayCode = function checkBirthDayCode2(birDayCode) {
            var yyyy = parseInt(birDayCode.substring(0, 4), 10);
            var mm = parseInt(birDayCode.substring(4, 6), 10);
            var dd = parseInt(birDayCode.substring(6), 10);
            var xdata = new Date(yyyy, mm - 1, dd);
            if (xdata > /* @__PURE__ */ new Date()) {
              return false;
            } else if (xdata.getFullYear() === yyyy && xdata.getMonth() === mm - 1 && xdata.getDate() === dd) {
              return true;
            }
            return false;
          };
          var getParityBit = function getParityBit2(idCardNo) {
            var id17 = idCardNo.substring(0, 17);
            var power = 0;
            for (var i2 = 0; i2 < 17; i2++) {
              power += parseInt(id17.charAt(i2), 10) * parseInt(powers[i2], 10);
            }
            var mod = power % 11;
            return parityBit[mod];
          };
          var checkParityBit = function checkParityBit2(idCardNo) {
            return getParityBit(idCardNo) === idCardNo.charAt(17).toUpperCase();
          };
          var check15IdCardNo = function check15IdCardNo2(idCardNo) {
            var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
            if (!check) return false;
            var addressCode = idCardNo.substring(0, 2);
            check = checkAddressCode(addressCode);
            if (!check) return false;
            var birDayCode = "19".concat(idCardNo.substring(6, 12));
            check = checkBirthDayCode(birDayCode);
            if (!check) return false;
            return true;
          };
          var check18IdCardNo = function check18IdCardNo2(idCardNo) {
            var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
            if (!check) return false;
            var addressCode = idCardNo.substring(0, 2);
            check = checkAddressCode(addressCode);
            if (!check) return false;
            var birDayCode = idCardNo.substring(6, 14);
            check = checkBirthDayCode(birDayCode);
            if (!check) return false;
            return checkParityBit(idCardNo);
          };
          var checkIdCardNo = function checkIdCardNo2(idCardNo) {
            var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
            if (!check) return false;
            if (idCardNo.length === 15) {
              return check15IdCardNo(idCardNo);
            }
            return check18IdCardNo(idCardNo);
          };
          return checkIdCardNo(str);
        },
        "zh-HK": function zhHK(str) {
          str = str.trim();
          var regexHKID = /^[A-Z]{1,2}[0-9]{6}((\([0-9A]\))|(\[[0-9A]\])|([0-9A]))$/;
          var regexIsDigit = /^[0-9]$/;
          str = str.toUpperCase();
          if (!regexHKID.test(str)) return false;
          str = str.replace(/\[|\]|\(|\)/g, "");
          if (str.length === 8) str = "3".concat(str);
          var checkSumVal = 0;
          for (var i2 = 0; i2 <= 7; i2++) {
            var convertedChar = void 0;
            if (!regexIsDigit.test(str[i2])) convertedChar = (str[i2].charCodeAt(0) - 55) % 11;
            else convertedChar = str[i2];
            checkSumVal += convertedChar * (9 - i2);
          }
          checkSumVal %= 11;
          var checkSumConverted;
          if (checkSumVal === 0) checkSumConverted = "0";
          else if (checkSumVal === 1) checkSumConverted = "A";
          else checkSumConverted = String(11 - checkSumVal);
          if (checkSumConverted === str[str.length - 1]) return true;
          return false;
        },
        "zh-TW": function zhTW(str) {
          var ALPHABET_CODES = {
            A: 10,
            B: 11,
            C: 12,
            D: 13,
            E: 14,
            F: 15,
            G: 16,
            H: 17,
            I: 34,
            J: 18,
            K: 19,
            L: 20,
            M: 21,
            N: 22,
            O: 35,
            P: 23,
            Q: 24,
            R: 25,
            S: 26,
            T: 27,
            U: 28,
            V: 29,
            W: 32,
            X: 30,
            Y: 31,
            Z: 33
          };
          var sanitized = str.trim().toUpperCase();
          if (!/^[A-Z][0-9]{9}$/.test(sanitized)) return false;
          return Array.from(sanitized).reduce(function(sum, number, index) {
            if (index === 0) {
              var code = ALPHABET_CODES[number];
              return code % 10 * 9 + Math.floor(code / 10);
            }
            if (index === 9) {
              return (10 - sum % 10 - Number(number)) % 10 === 0;
            }
            return sum + Number(number) * (9 - index);
          }, 0);
        },
        PK: function PK(str) {
          var CNIC = /^[1-7][0-9]{4}-[0-9]{7}-[1-9]$/;
          var sanitized = str.trim();
          return CNIC.test(sanitized);
        }
      };
      function isIdentityCard(str, locale) {
        (0, _assertString.default)(str);
        if (locale in validators) {
          return validators[locale](str);
        } else if (locale === "any") {
          for (var key in validators) {
            if (validators.hasOwnProperty(key)) {
              var validator2 = validators[key];
              if (validator2(str)) {
                return true;
              }
            }
          }
          return false;
        }
        throw new Error("Invalid locale '".concat(locale, "'"));
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isEAN.js
  var require_isEAN = __commonJS({
    "node_modules/validator/lib/isEAN.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isEAN;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var LENGTH_EAN_8 = 8;
      var LENGTH_EAN_14 = 14;
      var validEanRegex = /^(\d{8}|\d{13}|\d{14})$/;
      function getPositionWeightThroughLengthAndIndex(length, index) {
        if (length === LENGTH_EAN_8 || length === LENGTH_EAN_14) {
          return index % 2 === 0 ? 3 : 1;
        }
        return index % 2 === 0 ? 1 : 3;
      }
      function calculateCheckDigit(ean) {
        var checksum = ean.slice(0, -1).split("").map(function(char, index) {
          return Number(char) * getPositionWeightThroughLengthAndIndex(ean.length, index);
        }).reduce(function(acc, partialSum) {
          return acc + partialSum;
        }, 0);
        var remainder = 10 - checksum % 10;
        return remainder < 10 ? remainder : 0;
      }
      function isEAN(str) {
        (0, _assertString.default)(str);
        var actualCheckDigit = Number(str.slice(-1));
        return validEanRegex.test(str) && actualCheckDigit === calculateCheckDigit(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isISIN.js
  var require_isISIN = __commonJS({
    "node_modules/validator/lib/isISIN.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isISIN;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var isin = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;
      function isISIN(str) {
        (0, _assertString.default)(str);
        if (!isin.test(str)) {
          return false;
        }
        var double = true;
        var sum = 0;
        for (var i2 = str.length - 2; i2 >= 0; i2--) {
          if (str[i2] >= "A" && str[i2] <= "Z") {
            var value = str[i2].charCodeAt(0) - 55;
            var lo = value % 10;
            var hi = Math.trunc(value / 10);
            for (var _i = 0, _arr = [lo, hi]; _i < _arr.length; _i++) {
              var digit = _arr[_i];
              if (double) {
                if (digit >= 5) {
                  sum += 1 + (digit - 5) * 2;
                } else {
                  sum += digit * 2;
                }
              } else {
                sum += digit;
              }
              double = !double;
            }
          } else {
            var _digit = str[i2].charCodeAt(0) - "0".charCodeAt(0);
            if (double) {
              if (_digit >= 5) {
                sum += 1 + (_digit - 5) * 2;
              } else {
                sum += _digit * 2;
              }
            } else {
              sum += _digit;
            }
            double = !double;
          }
        }
        var check = Math.trunc((sum + 9) / 10) * 10 - sum;
        return +str[str.length - 1] === check;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isISBN.js
  var require_isISBN = __commonJS({
    "node_modules/validator/lib/isISBN.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isISBN;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var possibleIsbn10 = /^(?:[0-9]{9}X|[0-9]{10})$/;
      var possibleIsbn13 = /^(?:[0-9]{13})$/;
      var factor = [1, 3];
      function isISBN(isbn, options) {
        (0, _assertString.default)(isbn);
        var version = String((options === null || options === void 0 ? void 0 : options.version) || options);
        if (!(options !== null && options !== void 0 && options.version || options)) {
          return isISBN(isbn, {
            version: 10
          }) || isISBN(isbn, {
            version: 13
          });
        }
        var sanitizedIsbn = isbn.replace(/[\s-]+/g, "");
        var checksum = 0;
        if (version === "10") {
          if (!possibleIsbn10.test(sanitizedIsbn)) {
            return false;
          }
          for (var i2 = 0; i2 < version - 1; i2++) {
            checksum += (i2 + 1) * sanitizedIsbn.charAt(i2);
          }
          if (sanitizedIsbn.charAt(9) === "X") {
            checksum += 10 * 10;
          } else {
            checksum += 10 * sanitizedIsbn.charAt(9);
          }
          if (checksum % 11 === 0) {
            return true;
          }
        } else if (version === "13") {
          if (!possibleIsbn13.test(sanitizedIsbn)) {
            return false;
          }
          for (var _i = 0; _i < 12; _i++) {
            checksum += factor[_i % 2] * sanitizedIsbn.charAt(_i);
          }
          if (sanitizedIsbn.charAt(12) - (10 - checksum % 10) % 10 === 0) {
            return true;
          }
        }
        return false;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isISSN.js
  var require_isISSN = __commonJS({
    "node_modules/validator/lib/isISSN.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isISSN;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var issn = "^\\d{4}-?\\d{3}[\\dX]$";
      function isISSN(str) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        (0, _assertString.default)(str);
        var testIssn = issn;
        testIssn = options.require_hyphen ? testIssn.replace("?", "") : testIssn;
        testIssn = options.case_sensitive ? new RegExp(testIssn) : new RegExp(testIssn, "i");
        if (!testIssn.test(str)) {
          return false;
        }
        var digits = str.replace("-", "").toUpperCase();
        var checksum = 0;
        for (var i2 = 0; i2 < digits.length; i2++) {
          var digit = digits[i2];
          checksum += (digit === "X" ? 10 : +digit) * (8 - i2);
        }
        return checksum % 11 === 0;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/util/algorithms.js
  var require_algorithms = __commonJS({
    "node_modules/validator/lib/util/algorithms.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.iso7064Check = iso7064Check;
      exports.luhnCheck = luhnCheck;
      exports.reverseMultiplyAndSum = reverseMultiplyAndSum;
      exports.verhoeffCheck = verhoeffCheck;
      function iso7064Check(str) {
        var checkvalue = 10;
        for (var i2 = 0; i2 < str.length - 1; i2++) {
          checkvalue = (parseInt(str[i2], 10) + checkvalue) % 10 === 0 ? 10 * 2 % 11 : (parseInt(str[i2], 10) + checkvalue) % 10 * 2 % 11;
        }
        checkvalue = checkvalue === 1 ? 0 : 11 - checkvalue;
        return checkvalue === parseInt(str[10], 10);
      }
      function luhnCheck(str) {
        var checksum = 0;
        var second = false;
        for (var i2 = str.length - 1; i2 >= 0; i2--) {
          if (second) {
            var product = parseInt(str[i2], 10) * 2;
            if (product > 9) {
              checksum += product.toString().split("").map(function(a2) {
                return parseInt(a2, 10);
              }).reduce(function(a2, b2) {
                return a2 + b2;
              }, 0);
            } else {
              checksum += product;
            }
          } else {
            checksum += parseInt(str[i2], 10);
          }
          second = !second;
        }
        return checksum % 10 === 0;
      }
      function reverseMultiplyAndSum(digits, base) {
        var total = 0;
        for (var i2 = 0; i2 < digits.length; i2++) {
          total += digits[i2] * (base - i2);
        }
        return total;
      }
      function verhoeffCheck(str) {
        var d_table = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 0, 6, 7, 8, 9, 5], [2, 3, 4, 0, 1, 7, 8, 9, 5, 6], [3, 4, 0, 1, 2, 8, 9, 5, 6, 7], [4, 0, 1, 2, 3, 9, 5, 6, 7, 8], [5, 9, 8, 7, 6, 0, 4, 3, 2, 1], [6, 5, 9, 8, 7, 1, 0, 4, 3, 2], [7, 6, 5, 9, 8, 2, 1, 0, 4, 3], [8, 7, 6, 5, 9, 3, 2, 1, 0, 4], [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]];
        var p_table = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 5, 7, 6, 2, 8, 3, 0, 9, 4], [5, 8, 0, 3, 7, 9, 6, 1, 4, 2], [8, 9, 1, 6, 0, 4, 3, 5, 2, 7], [9, 4, 5, 3, 1, 2, 6, 8, 7, 0], [4, 2, 8, 6, 5, 7, 3, 9, 0, 1], [2, 7, 9, 3, 8, 0, 6, 4, 1, 5], [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]];
        var str_copy = str.split("").reverse().join("");
        var checksum = 0;
        for (var i2 = 0; i2 < str_copy.length; i2++) {
          checksum = d_table[checksum][p_table[i2 % 8][parseInt(str_copy[i2], 10)]];
        }
        return checksum === 0;
      }
    }
  });

  // node_modules/validator/lib/isTaxID.js
  var require_isTaxID = __commonJS({
    "node_modules/validator/lib/isTaxID.js"(exports, module) {
      "use strict";
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isTaxID;
      var _assertString = _interopRequireDefault(require_assertString());
      var algorithms = _interopRequireWildcard(require_algorithms());
      var _isDate = _interopRequireDefault(require_isDate());
      function _interopRequireWildcard(e, t) {
        if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
        return (_interopRequireWildcard = function _interopRequireWildcard2(e2, t2) {
          if (!t2 && e2 && e2.__esModule) return e2;
          var o, i2, f = { __proto__: null, default: e2 };
          if (null === e2 || "object" != _typeof(e2) && "function" != typeof e2) return f;
          if (o = t2 ? n : r) {
            if (o.has(e2)) return o.get(e2);
            o.set(e2, f);
          }
          for (var _t in e2) "default" !== _t && {}.hasOwnProperty.call(e2, _t) && ((i2 = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, _t)) && (i2.get || i2.set) ? o(f, _t, i2) : f[_t] = e2[_t]);
          return f;
        })(e, t);
      }
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _toConsumableArray(r) {
        return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _unsupportedIterableToArray(r, a2) {
        if (r) {
          if ("string" == typeof r) return _arrayLikeToArray(r, a2);
          var t = {}.toString.call(r).slice(8, -1);
          return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a2) : void 0;
        }
      }
      function _iterableToArray(r) {
        if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
      }
      function _arrayWithoutHoles(r) {
        if (Array.isArray(r)) return _arrayLikeToArray(r);
      }
      function _arrayLikeToArray(r, a2) {
        (null == a2 || a2 > r.length) && (a2 = r.length);
        for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
        return n;
      }
      function bgBgCheck(tin) {
        var century_year = tin.slice(0, 2);
        var month = parseInt(tin.slice(2, 4), 10);
        if (month > 40) {
          month -= 40;
          century_year = "20".concat(century_year);
        } else if (month > 20) {
          month -= 20;
          century_year = "18".concat(century_year);
        } else {
          century_year = "19".concat(century_year);
        }
        if (month < 10) {
          month = "0".concat(month);
        }
        var date = "".concat(century_year, "/").concat(month, "/").concat(tin.slice(4, 6));
        if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
          return false;
        }
        var digits = tin.split("").map(function(a2) {
          return parseInt(a2, 10);
        });
        var multip_lookup = [2, 4, 8, 5, 10, 9, 7, 3, 6];
        var checksum = 0;
        for (var i2 = 0; i2 < multip_lookup.length; i2++) {
          checksum += digits[i2] * multip_lookup[i2];
        }
        checksum = checksum % 11 === 10 ? 0 : checksum % 11;
        return checksum === digits[9];
      }
      function isCanadianSIN(input) {
        var digitsArray = input.split("");
        var even = digitsArray.filter(function(_, idx) {
          return idx % 2;
        }).map(function(i2) {
          return Number(i2) * 2;
        }).join("").split("");
        var total = digitsArray.filter(function(_, idx) {
          return !(idx % 2);
        }).concat(even).map(function(i2) {
          return Number(i2);
        }).reduce(function(acc, cur) {
          return acc + cur;
        });
        return total % 10 === 0;
      }
      function csCzCheck(tin) {
        tin = tin.replace(/\W/, "");
        var full_year = parseInt(tin.slice(0, 2), 10);
        if (tin.length === 10) {
          if (full_year < 54) {
            full_year = "20".concat(full_year);
          } else {
            full_year = "19".concat(full_year);
          }
        } else {
          if (tin.slice(6) === "000") {
            return false;
          }
          if (full_year < 54) {
            full_year = "19".concat(full_year);
          } else {
            return false;
          }
        }
        if (full_year.length === 3) {
          full_year = [full_year.slice(0, 2), "0", full_year.slice(2)].join("");
        }
        var month = parseInt(tin.slice(2, 4), 10);
        if (month > 50) {
          month -= 50;
        }
        if (month > 20) {
          if (parseInt(full_year, 10) < 2004) {
            return false;
          }
          month -= 20;
        }
        if (month < 10) {
          month = "0".concat(month);
        }
        var date = "".concat(full_year, "/").concat(month, "/").concat(tin.slice(4, 6));
        if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
          return false;
        }
        if (tin.length === 10) {
          if (parseInt(tin, 10) % 11 !== 0) {
            var checkdigit = parseInt(tin.slice(0, 9), 10) % 11;
            if (parseInt(full_year, 10) < 1986 && checkdigit === 10) {
              if (parseInt(tin.slice(9), 10) !== 0) {
                return false;
              }
            } else {
              return false;
            }
          }
        }
        return true;
      }
      function deAtCheck(tin) {
        return algorithms.luhnCheck(tin);
      }
      function deDeCheck(tin) {
        var digits = tin.split("").map(function(a2) {
          return parseInt(a2, 10);
        });
        var occurrences = [];
        for (var i2 = 0; i2 < digits.length - 1; i2++) {
          occurrences.push("");
          for (var j2 = 0; j2 < digits.length - 1; j2++) {
            if (digits[i2] === digits[j2]) {
              occurrences[i2] += j2;
            }
          }
        }
        occurrences = occurrences.filter(function(a2) {
          return a2.length > 1;
        });
        if (occurrences.length !== 2 && occurrences.length !== 3) {
          return false;
        }
        if (occurrences[0].length === 3) {
          var trip_locations = occurrences[0].split("").map(function(a2) {
            return parseInt(a2, 10);
          });
          var recurrent = 0;
          for (var _i = 0; _i < trip_locations.length - 1; _i++) {
            if (trip_locations[_i] + 1 === trip_locations[_i + 1]) {
              recurrent += 1;
            }
          }
          if (recurrent === 2) {
            return false;
          }
        }
        return algorithms.iso7064Check(tin);
      }
      function dkDkCheck(tin) {
        tin = tin.replace(/\W/, "");
        var year = parseInt(tin.slice(4, 6), 10);
        var century_digit = tin.slice(6, 7);
        switch (century_digit) {
          case "0":
          case "1":
          case "2":
          case "3":
            year = "19".concat(year);
            break;
          case "4":
          case "9":
            if (year < 37) {
              year = "20".concat(year);
            } else {
              year = "19".concat(year);
            }
            break;
          default:
            if (year < 37) {
              year = "20".concat(year);
            } else if (year > 58) {
              year = "18".concat(year);
            } else {
              return false;
            }
            break;
        }
        if (year.length === 3) {
          year = [year.slice(0, 2), "0", year.slice(2)].join("");
        }
        var date = "".concat(year, "/").concat(tin.slice(2, 4), "/").concat(tin.slice(0, 2));
        if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
          return false;
        }
        var digits = tin.split("").map(function(a2) {
          return parseInt(a2, 10);
        });
        var checksum = 0;
        var weight = 4;
        for (var i2 = 0; i2 < 9; i2++) {
          checksum += digits[i2] * weight;
          weight -= 1;
          if (weight === 1) {
            weight = 7;
          }
        }
        checksum %= 11;
        if (checksum === 1) {
          return false;
        }
        return checksum === 0 ? digits[9] === 0 : digits[9] === 11 - checksum;
      }
      function elCyCheck(tin) {
        var digits = tin.slice(0, 8).split("").map(function(a2) {
          return parseInt(a2, 10);
        });
        var checksum = 0;
        for (var i2 = 1; i2 < digits.length; i2 += 2) {
          checksum += digits[i2];
        }
        for (var _i2 = 0; _i2 < digits.length; _i2 += 2) {
          if (digits[_i2] < 2) {
            checksum += 1 - digits[_i2];
          } else {
            checksum += 2 * (digits[_i2] - 2) + 5;
            if (digits[_i2] > 4) {
              checksum += 2;
            }
          }
        }
        return String.fromCharCode(checksum % 26 + 65) === tin.charAt(8);
      }
      function elGrCheck(tin) {
        var digits = tin.split("").map(function(a2) {
          return parseInt(a2, 10);
        });
        var checksum = 0;
        for (var i2 = 0; i2 < 8; i2++) {
          checksum += digits[i2] * Math.pow(2, 8 - i2);
        }
        return checksum % 11 % 10 === digits[8];
      }
      function enIeCheck(tin) {
        var checksum = algorithms.reverseMultiplyAndSum(tin.split("").slice(0, 7).map(function(a2) {
          return parseInt(a2, 10);
        }), 8);
        if (tin.length === 9 && tin[8] !== "W") {
          checksum += (tin[8].charCodeAt(0) - 64) * 9;
        }
        checksum %= 23;
        if (checksum === 0) {
          return tin[7].toUpperCase() === "W";
        }
        return tin[7].toUpperCase() === String.fromCharCode(64 + checksum);
      }
      var enUsCampusPrefix = {
        andover: ["10", "12"],
        atlanta: ["60", "67"],
        austin: ["50", "53"],
        brookhaven: ["01", "02", "03", "04", "05", "06", "11", "13", "14", "16", "21", "22", "23", "25", "34", "51", "52", "54", "55", "56", "57", "58", "59", "65"],
        cincinnati: ["30", "32", "35", "36", "37", "38", "61"],
        fresno: ["15", "24"],
        internet: ["20", "26", "27", "45", "46", "47"],
        kansas: ["40", "44"],
        memphis: ["94", "95"],
        ogden: ["80", "90"],
        philadelphia: ["33", "39", "41", "42", "43", "46", "48", "62", "63", "64", "66", "68", "71", "72", "73", "74", "75", "76", "77", "81", "82", "83", "84", "85", "86", "87", "88", "91", "92", "93", "98", "99"],
        sba: ["31"]
      };
      function enUsGetPrefixes() {
        var prefixes = [];
        for (var location in enUsCampusPrefix) {
          if (enUsCampusPrefix.hasOwnProperty(location)) {
            prefixes.push.apply(prefixes, _toConsumableArray(enUsCampusPrefix[location]));
          }
        }
        return prefixes;
      }
      function enUsCheck(tin) {
        return enUsGetPrefixes().indexOf(tin.slice(0, 2)) !== -1;
      }
      function esArCheck(tin) {
        var accum = 0;
        var digits = tin.split("");
        var digit = parseInt(digits.pop(), 10);
        for (var i2 = 0; i2 < digits.length; i2++) {
          accum += digits[9 - i2] * (2 + i2 % 6);
        }
        var verif = 11 - accum % 11;
        if (verif === 11) {
          verif = 0;
        } else if (verif === 10) {
          verif = 9;
        }
        return digit === verif;
      }
      function esEsCheck(tin) {
        var chars = tin.toUpperCase().split("");
        if (isNaN(parseInt(chars[0], 10)) && chars.length > 1) {
          var lead_replace = 0;
          switch (chars[0]) {
            case "Y":
              lead_replace = 1;
              break;
            case "Z":
              lead_replace = 2;
              break;
            default:
          }
          chars.splice(0, 1, lead_replace);
        } else {
          while (chars.length < 9) {
            chars.unshift(0);
          }
        }
        var lookup = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
        chars = chars.join("");
        var checksum = parseInt(chars.slice(0, 8), 10) % 23;
        return chars[8] === lookup[checksum];
      }
      function etEeCheck(tin) {
        var full_year = tin.slice(1, 3);
        var century_digit = tin.slice(0, 1);
        switch (century_digit) {
          case "1":
          case "2":
            full_year = "18".concat(full_year);
            break;
          case "3":
          case "4":
            full_year = "19".concat(full_year);
            break;
          default:
            full_year = "20".concat(full_year);
            break;
        }
        var date = "".concat(full_year, "/").concat(tin.slice(3, 5), "/").concat(tin.slice(5, 7));
        if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
          return false;
        }
        var digits = tin.split("").map(function(a2) {
          return parseInt(a2, 10);
        });
        var checksum = 0;
        var weight = 1;
        for (var i2 = 0; i2 < 10; i2++) {
          checksum += digits[i2] * weight;
          weight += 1;
          if (weight === 10) {
            weight = 1;
          }
        }
        if (checksum % 11 === 10) {
          checksum = 0;
          weight = 3;
          for (var _i3 = 0; _i3 < 10; _i3++) {
            checksum += digits[_i3] * weight;
            weight += 1;
            if (weight === 10) {
              weight = 1;
            }
          }
          if (checksum % 11 === 10) {
            return digits[10] === 0;
          }
        }
        return checksum % 11 === digits[10];
      }
      function fiFiCheck(tin) {
        var full_year = tin.slice(4, 6);
        var century_symbol = tin.slice(6, 7);
        switch (century_symbol) {
          case "+":
            full_year = "18".concat(full_year);
            break;
          case "-":
            full_year = "19".concat(full_year);
            break;
          default:
            full_year = "20".concat(full_year);
            break;
        }
        var date = "".concat(full_year, "/").concat(tin.slice(2, 4), "/").concat(tin.slice(0, 2));
        if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
          return false;
        }
        var checksum = parseInt(tin.slice(0, 6) + tin.slice(7, 10), 10) % 31;
        if (checksum < 10) {
          return checksum === parseInt(tin.slice(10), 10);
        }
        checksum -= 10;
        var letters_lookup = ["A", "B", "C", "D", "E", "F", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "U", "V", "W", "X", "Y"];
        return letters_lookup[checksum] === tin.slice(10);
      }
      function frBeCheck(tin) {
        if (tin.slice(2, 4) !== "00" || tin.slice(4, 6) !== "00") {
          var date = "".concat(tin.slice(0, 2), "/").concat(tin.slice(2, 4), "/").concat(tin.slice(4, 6));
          if (!(0, _isDate.default)(date, "YY/MM/DD")) {
            return false;
          }
        }
        var checksum = 97 - parseInt(tin.slice(0, 9), 10) % 97;
        var checkdigits = parseInt(tin.slice(9, 11), 10);
        if (checksum !== checkdigits) {
          checksum = 97 - parseInt("2".concat(tin.slice(0, 9)), 10) % 97;
          if (checksum !== checkdigits) {
            return false;
          }
        }
        return true;
      }
      function frFrCheck(tin) {
        tin = tin.replace(/\s/g, "");
        var checksum = parseInt(tin.slice(0, 10), 10) % 511;
        var checkdigits = parseInt(tin.slice(10, 13), 10);
        return checksum === checkdigits;
      }
      function frLuCheck(tin) {
        var date = "".concat(tin.slice(0, 4), "/").concat(tin.slice(4, 6), "/").concat(tin.slice(6, 8));
        if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
          return false;
        }
        if (!algorithms.luhnCheck(tin.slice(0, 12))) {
          return false;
        }
        return algorithms.verhoeffCheck("".concat(tin.slice(0, 11)).concat(tin[12]));
      }
      function hrHrCheck(tin) {
        return algorithms.iso7064Check(tin);
      }
      function huHuCheck(tin) {
        var digits = tin.split("").map(function(a2) {
          return parseInt(a2, 10);
        });
        var checksum = 8;
        for (var i2 = 1; i2 < 9; i2++) {
          checksum += digits[i2] * (i2 + 1);
        }
        return checksum % 11 === digits[9];
      }
      function itItNameCheck(name) {
        var vowelflag = false;
        var xflag = false;
        for (var i2 = 0; i2 < 3; i2++) {
          if (!vowelflag && /[AEIOU]/.test(name[i2])) {
            vowelflag = true;
          } else if (!xflag && vowelflag && name[i2] === "X") {
            xflag = true;
          } else if (i2 > 0) {
            if (vowelflag && !xflag) {
              if (!/[AEIOU]/.test(name[i2])) {
                return false;
              }
            }
            if (xflag) {
              if (!/X/.test(name[i2])) {
                return false;
              }
            }
          }
        }
        return true;
      }
      function itItCheck(tin) {
        var chars = tin.toUpperCase().split("");
        if (!itItNameCheck(chars.slice(0, 3))) {
          return false;
        }
        if (!itItNameCheck(chars.slice(3, 6))) {
          return false;
        }
        var number_locations = [6, 7, 9, 10, 12, 13, 14];
        var number_replace = {
          L: "0",
          M: "1",
          N: "2",
          P: "3",
          Q: "4",
          R: "5",
          S: "6",
          T: "7",
          U: "8",
          V: "9"
        };
        for (var _i4 = 0, _number_locations = number_locations; _i4 < _number_locations.length; _i4++) {
          var i2 = _number_locations[_i4];
          if (chars[i2] in number_replace) {
            chars.splice(i2, 1, number_replace[chars[i2]]);
          }
        }
        var month_replace = {
          A: "01",
          B: "02",
          C: "03",
          D: "04",
          E: "05",
          H: "06",
          L: "07",
          M: "08",
          P: "09",
          R: "10",
          S: "11",
          T: "12"
        };
        var month = month_replace[chars[8]];
        var day = parseInt(chars[9] + chars[10], 10);
        if (day > 40) {
          day -= 40;
        }
        if (day < 10) {
          day = "0".concat(day);
        }
        var date = "".concat(chars[6]).concat(chars[7], "/").concat(month, "/").concat(day);
        if (!(0, _isDate.default)(date, "YY/MM/DD")) {
          return false;
        }
        var checksum = 0;
        for (var _i5 = 1; _i5 < chars.length - 1; _i5 += 2) {
          var char_to_int = parseInt(chars[_i5], 10);
          if (isNaN(char_to_int)) {
            char_to_int = chars[_i5].charCodeAt(0) - 65;
          }
          checksum += char_to_int;
        }
        var odd_convert = {
          // Maps of characters at odd places
          A: 1,
          B: 0,
          C: 5,
          D: 7,
          E: 9,
          F: 13,
          G: 15,
          H: 17,
          I: 19,
          J: 21,
          K: 2,
          L: 4,
          M: 18,
          N: 20,
          O: 11,
          P: 3,
          Q: 6,
          R: 8,
          S: 12,
          T: 14,
          U: 16,
          V: 10,
          W: 22,
          X: 25,
          Y: 24,
          Z: 23,
          0: 1,
          1: 0
        };
        for (var _i6 = 0; _i6 < chars.length - 1; _i6 += 2) {
          var _char_to_int = 0;
          if (chars[_i6] in odd_convert) {
            _char_to_int = odd_convert[chars[_i6]];
          } else {
            var multiplier = parseInt(chars[_i6], 10);
            _char_to_int = 2 * multiplier + 1;
            if (multiplier > 4) {
              _char_to_int += 2;
            }
          }
          checksum += _char_to_int;
        }
        if (String.fromCharCode(65 + checksum % 26) !== chars[15]) {
          return false;
        }
        return true;
      }
      function lvLvCheck(tin) {
        tin = tin.replace(/\W/, "");
        var day = tin.slice(0, 2);
        if (day !== "32") {
          var month = tin.slice(2, 4);
          if (month !== "00") {
            var full_year = tin.slice(4, 6);
            switch (tin[6]) {
              case "0":
                full_year = "18".concat(full_year);
                break;
              case "1":
                full_year = "19".concat(full_year);
                break;
              default:
                full_year = "20".concat(full_year);
                break;
            }
            var date = "".concat(full_year, "/").concat(tin.slice(2, 4), "/").concat(day);
            if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
              return false;
            }
          }
          var checksum = 1101;
          var multip_lookup = [1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          for (var i2 = 0; i2 < tin.length - 1; i2++) {
            checksum -= parseInt(tin[i2], 10) * multip_lookup[i2];
          }
          return parseInt(tin[10], 10) === checksum % 11;
        }
        return true;
      }
      function mtMtCheck(tin) {
        if (tin.length !== 9) {
          var chars = tin.toUpperCase().split("");
          while (chars.length < 8) {
            chars.unshift(0);
          }
          switch (tin[7]) {
            case "A":
            case "P":
              if (parseInt(chars[6], 10) === 0) {
                return false;
              }
              break;
            default: {
              var first_part = parseInt(chars.join("").slice(0, 5), 10);
              if (first_part > 32e3) {
                return false;
              }
              var second_part = parseInt(chars.join("").slice(5, 7), 10);
              if (first_part === second_part) {
                return false;
              }
            }
          }
        }
        return true;
      }
      function nlNlCheck(tin) {
        return algorithms.reverseMultiplyAndSum(tin.split("").slice(0, 8).map(function(a2) {
          return parseInt(a2, 10);
        }), 9) % 11 === parseInt(tin[8], 10);
      }
      function plPlCheck(tin) {
        if (tin.length === 10) {
          var lookup = [6, 5, 7, 2, 3, 4, 5, 6, 7];
          var _checksum = 0;
          for (var i2 = 0; i2 < lookup.length; i2++) {
            _checksum += parseInt(tin[i2], 10) * lookup[i2];
          }
          _checksum %= 11;
          if (_checksum === 10) {
            return false;
          }
          return _checksum === parseInt(tin[9], 10);
        }
        var full_year = tin.slice(0, 2);
        var month = parseInt(tin.slice(2, 4), 10);
        if (month > 80) {
          full_year = "18".concat(full_year);
          month -= 80;
        } else if (month > 60) {
          full_year = "22".concat(full_year);
          month -= 60;
        } else if (month > 40) {
          full_year = "21".concat(full_year);
          month -= 40;
        } else if (month > 20) {
          full_year = "20".concat(full_year);
          month -= 20;
        } else {
          full_year = "19".concat(full_year);
        }
        if (month < 10) {
          month = "0".concat(month);
        }
        var date = "".concat(full_year, "/").concat(month, "/").concat(tin.slice(4, 6));
        if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
          return false;
        }
        var checksum = 0;
        var multiplier = 1;
        for (var _i7 = 0; _i7 < tin.length - 1; _i7++) {
          checksum += parseInt(tin[_i7], 10) * multiplier % 10;
          multiplier += 2;
          if (multiplier > 10) {
            multiplier = 1;
          } else if (multiplier === 5) {
            multiplier += 2;
          }
        }
        checksum = 10 - checksum % 10;
        return checksum === parseInt(tin[10], 10);
      }
      function cnpjCharToValue(char) {
        return char.charCodeAt(0) - 48;
      }
      function validateCnpj(cnpj) {
        var identifiers = cnpj.substring(0, 12).toUpperCase();
        var checkDigits = cnpj.substring(12);
        if (/^(.)\1+$/.test(cnpj.toUpperCase())) {
          return false;
        }
        var sum = 0;
        var weight = 5;
        for (var i2 = 0; i2 < 12; i2++) {
          sum += cnpjCharToValue(identifiers.charAt(i2)) * weight;
          weight = weight === 2 ? 9 : weight - 1;
        }
        var remainder = sum % 11;
        var firstDV = remainder < 2 ? 0 : 11 - remainder;
        if (firstDV !== parseInt(checkDigits.charAt(0), 10)) {
          return false;
        }
        sum = 0;
        weight = 6;
        for (var _i8 = 0; _i8 < 12; _i8++) {
          sum += cnpjCharToValue(identifiers.charAt(_i8)) * weight;
          weight = weight === 2 ? 9 : weight - 1;
        }
        sum += firstDV * 2;
        remainder = sum % 11;
        var secondDV = remainder < 2 ? 0 : 11 - remainder;
        return secondDV === parseInt(checkDigits.charAt(1), 10);
      }
      function ptBrCheck(tin) {
        tin = tin.replace(/[.\-/]/g, "");
        if (tin.length === 11) {
          var sum;
          var remainder;
          sum = 0;
          if (
            // Reject known invalid CPFs
            tin === "11111111111" || tin === "22222222222" || tin === "33333333333" || tin === "44444444444" || tin === "55555555555" || tin === "66666666666" || tin === "77777777777" || tin === "88888888888" || tin === "99999999999" || tin === "00000000000"
          ) return false;
          for (var i2 = 1; i2 <= 9; i2++) sum += parseInt(tin.substring(i2 - 1, i2), 10) * (11 - i2);
          remainder = sum * 10 % 11;
          if (remainder === 10) remainder = 0;
          if (remainder !== parseInt(tin.substring(9, 10), 10)) return false;
          sum = 0;
          for (var _i9 = 1; _i9 <= 10; _i9++) sum += parseInt(tin.substring(_i9 - 1, _i9), 10) * (12 - _i9);
          remainder = sum * 10 % 11;
          if (remainder === 10) remainder = 0;
          if (remainder !== parseInt(tin.substring(10, 11), 10)) return false;
          return true;
        }
        return validateCnpj(tin);
      }
      function ptPtCheck(tin) {
        var checksum = 11 - algorithms.reverseMultiplyAndSum(tin.split("").slice(0, 8).map(function(a2) {
          return parseInt(a2, 10);
        }), 9) % 11;
        if (checksum > 9) {
          return parseInt(tin[8], 10) === 0;
        }
        return checksum === parseInt(tin[8], 10);
      }
      function roRoCheck(tin) {
        if (tin.slice(0, 4) !== "9000") {
          var full_year = tin.slice(1, 3);
          switch (tin[0]) {
            case "1":
            case "2":
              full_year = "19".concat(full_year);
              break;
            case "3":
            case "4":
              full_year = "18".concat(full_year);
              break;
            case "5":
            case "6":
              full_year = "20".concat(full_year);
              break;
            default:
          }
          var date = "".concat(full_year, "/").concat(tin.slice(3, 5), "/").concat(tin.slice(5, 7));
          if (date.length === 8) {
            if (!(0, _isDate.default)(date, "YY/MM/DD")) {
              return false;
            }
          } else if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
            return false;
          }
          var digits = tin.split("").map(function(a2) {
            return parseInt(a2, 10);
          });
          var multipliers = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
          var checksum = 0;
          for (var i2 = 0; i2 < multipliers.length; i2++) {
            checksum += digits[i2] * multipliers[i2];
          }
          if (checksum % 11 === 10) {
            return digits[12] === 1;
          }
          return digits[12] === checksum % 11;
        }
        return true;
      }
      function skSkCheck(tin) {
        if (tin.length === 9) {
          tin = tin.replace(/\W/, "");
          if (tin.slice(6) === "000") {
            return false;
          }
          var full_year = parseInt(tin.slice(0, 2), 10);
          if (full_year > 53) {
            return false;
          }
          if (full_year < 10) {
            full_year = "190".concat(full_year);
          } else {
            full_year = "19".concat(full_year);
          }
          var month = parseInt(tin.slice(2, 4), 10);
          if (month > 50) {
            month -= 50;
          }
          if (month < 10) {
            month = "0".concat(month);
          }
          var date = "".concat(full_year, "/").concat(month, "/").concat(tin.slice(4, 6));
          if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
            return false;
          }
        }
        return true;
      }
      function slSiCheck(tin) {
        var checksum = 11 - algorithms.reverseMultiplyAndSum(tin.split("").slice(0, 7).map(function(a2) {
          return parseInt(a2, 10);
        }), 8) % 11;
        if (checksum === 10) {
          return parseInt(tin[7], 10) === 0;
        }
        return checksum === parseInt(tin[7], 10);
      }
      function svSeCheck(tin) {
        var tin_copy = tin.slice(0);
        if (tin.length > 11) {
          tin_copy = tin_copy.slice(2);
        }
        var full_year = "";
        var month = tin_copy.slice(2, 4);
        var day = parseInt(tin_copy.slice(4, 6), 10);
        if (tin.length > 11) {
          full_year = tin.slice(0, 4);
        } else {
          full_year = tin.slice(0, 2);
          if (tin.length === 11 && day < 60) {
            var current_year = (/* @__PURE__ */ new Date()).getFullYear().toString();
            var current_century = parseInt(current_year.slice(0, 2), 10);
            current_year = parseInt(current_year, 10);
            if (tin[6] === "-") {
              if (parseInt("".concat(current_century).concat(full_year), 10) > current_year) {
                full_year = "".concat(current_century - 1).concat(full_year);
              } else {
                full_year = "".concat(current_century).concat(full_year);
              }
            } else {
              full_year = "".concat(current_century - 1).concat(full_year);
              if (current_year - parseInt(full_year, 10) < 100) {
                return false;
              }
            }
          }
        }
        if (day > 60) {
          day -= 60;
        }
        if (day < 10) {
          day = "0".concat(day);
        }
        var date = "".concat(full_year, "/").concat(month, "/").concat(day);
        if (date.length === 8) {
          if (!(0, _isDate.default)(date, "YY/MM/DD")) {
            return false;
          }
        } else if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
          return false;
        }
        return algorithms.luhnCheck(tin.replace(/\W/, ""));
      }
      function ukUaCheck(tin) {
        var digits = tin.split("").map(function(a2) {
          return parseInt(a2, 10);
        });
        var multipliers = [-1, 5, 7, 9, 4, 6, 10, 5, 7];
        var checksum = 0;
        for (var i2 = 0; i2 < multipliers.length; i2++) {
          checksum += digits[i2] * multipliers[i2];
        }
        return checksum % 11 === 10 ? digits[9] === 0 : digits[9] === checksum % 11;
      }
      var taxIdFormat = {
        "bg-BG": /^\d{10}$/,
        "cs-CZ": /^\d{6}\/{0,1}\d{3,4}$/,
        "de-AT": /^\d{9}$/,
        "de-DE": /^[1-9]\d{10}$/,
        "dk-DK": /^\d{6}-{0,1}\d{4}$/,
        "el-CY": /^[09]\d{7}[A-Z]$/,
        "el-GR": /^([0-4]|[7-9])\d{8}$/,
        "en-CA": /^\d{9}$/,
        "en-GB": /^\d{10}$|^(?!GB|NK|TN|ZZ)(?![DFIQUV])[A-Z](?![DFIQUVO])[A-Z]\d{6}[ABCD ]$/i,
        "en-IE": /^\d{7}[A-W][A-IW]{0,1}$/i,
        "en-US": /^\d{2}[- ]{0,1}\d{7}$/,
        "es-AR": /(20|23|24|27|30|33|34)[0-9]{8}[0-9]/,
        "es-ES": /^(\d{0,8}|[XYZKLM]\d{7})[A-HJ-NP-TV-Z]$/i,
        "et-EE": /^[1-6]\d{6}(00[1-9]|0[1-9][0-9]|[1-6][0-9]{2}|70[0-9]|710)\d$/,
        "fi-FI": /^\d{6}[-+A]\d{3}[0-9A-FHJ-NPR-Y]$/i,
        "fr-BE": /^\d{11}$/,
        "fr-FR": /^[0-3]\d{12}$|^[0-3]\d\s\d{2}(\s\d{3}){3}$/,
        // Conforms both to official spec and provided example
        "fr-LU": /^\d{13}$/,
        "hr-HR": /^\d{11}$/,
        "hu-HU": /^8\d{9}$/,
        "it-IT": /^[A-Z]{6}[L-NP-V0-9]{2}[A-EHLMPRST][L-NP-V0-9]{2}[A-ILMZ][L-NP-V0-9]{3}[A-Z]$/i,
        "lv-LV": /^\d{6}-{0,1}\d{5}$/,
        // Conforms both to DG TAXUD spec and original research
        "mt-MT": /^\d{3,7}[APMGLHBZ]$|^([1-8])\1\d{7}$/i,
        "nl-NL": /^\d{9}$/,
        "pl-PL": /^\d{10,11}$/,
        "pt-BR": /(?:^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(?:^\d{11}$)|(?:^[A-Z0-9]{12}\d{2}$)/i,
        "pt-PT": /^\d{9}$/,
        "ro-RO": /^\d{13}$/,
        "sk-SK": /^\d{6}\/{0,1}\d{3,4}$/,
        "sl-SI": /^[1-9]\d{7}$/,
        "sv-SE": /^(\d{6}[-+]{0,1}\d{4}|(18|19|20)\d{6}[-+]{0,1}\d{4})$/,
        "uk-UA": /^\d{10}$/
      };
      taxIdFormat["lb-LU"] = taxIdFormat["fr-LU"];
      taxIdFormat["lt-LT"] = taxIdFormat["et-EE"];
      taxIdFormat["nl-BE"] = taxIdFormat["fr-BE"];
      taxIdFormat["fr-CA"] = taxIdFormat["en-CA"];
      var taxIdCheck = {
        "bg-BG": bgBgCheck,
        "cs-CZ": csCzCheck,
        "de-AT": deAtCheck,
        "de-DE": deDeCheck,
        "dk-DK": dkDkCheck,
        "el-CY": elCyCheck,
        "el-GR": elGrCheck,
        "en-CA": isCanadianSIN,
        "en-IE": enIeCheck,
        "en-US": enUsCheck,
        "es-AR": esArCheck,
        "es-ES": esEsCheck,
        "et-EE": etEeCheck,
        "fi-FI": fiFiCheck,
        "fr-BE": frBeCheck,
        "fr-FR": frFrCheck,
        "fr-LU": frLuCheck,
        "hr-HR": hrHrCheck,
        "hu-HU": huHuCheck,
        "it-IT": itItCheck,
        "lv-LV": lvLvCheck,
        "mt-MT": mtMtCheck,
        "nl-NL": nlNlCheck,
        "pl-PL": plPlCheck,
        "pt-BR": ptBrCheck,
        "pt-PT": ptPtCheck,
        "ro-RO": roRoCheck,
        "sk-SK": skSkCheck,
        "sl-SI": slSiCheck,
        "sv-SE": svSeCheck,
        "uk-UA": ukUaCheck
      };
      taxIdCheck["lb-LU"] = taxIdCheck["fr-LU"];
      taxIdCheck["lt-LT"] = taxIdCheck["et-EE"];
      taxIdCheck["nl-BE"] = taxIdCheck["fr-BE"];
      taxIdCheck["fr-CA"] = taxIdCheck["en-CA"];
      var allsymbols = /[-\\\/!@#$%\^&\*\(\)\+\=\[\]]+/g;
      var sanitizeRegexes = {
        "de-AT": allsymbols,
        "de-DE": /[\/\\]/g,
        "fr-BE": allsymbols
      };
      sanitizeRegexes["nl-BE"] = sanitizeRegexes["fr-BE"];
      function isTaxID(str) {
        var locale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "en-US";
        (0, _assertString.default)(str);
        var strcopy = str.slice(0);
        if (locale in taxIdFormat) {
          if (locale in sanitizeRegexes) {
            strcopy = strcopy.replace(sanitizeRegexes[locale], "");
          }
          if (!taxIdFormat[locale].test(strcopy)) {
            return false;
          }
          if (locale in taxIdCheck) {
            return taxIdCheck[locale](strcopy);
          }
          return true;
        }
        throw new Error("Invalid locale '".concat(locale, "'"));
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isMobilePhone.js
  var require_isMobilePhone = __commonJS({
    "node_modules/validator/lib/isMobilePhone.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isMobilePhone;
      exports.locales = void 0;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var phones = {
        "am-AM": /^(\+?374|0)(33|4[134]|55|77|88|9[13-689])\d{6}$/,
        "ar-AE": /^((\+?971)|0)?5[024568]\d{7}$/,
        "ar-BH": /^(\+?973)?(3|6)\d{7}$/,
        "ar-DZ": /^(\+?213|0)(5|6|7)\d{8}$/,
        "ar-LB": /^(\+?961)?((3|81)\d{6}|7\d{7})$/,
        "ar-EG": /^((\+?20)|0)?1[0125]\d{8}$/,
        "ar-IQ": /^(\+?964|0)?7[0-9]\d{8}$/,
        "ar-JO": /^(\+?962|0)?7[789]\d{7}$/,
        "ar-KW": /^(\+?965)([569]\d{7}|41\d{6})$/,
        "ar-LY": /^((\+?218)|0)?(9[1-6]\d{7}|[1-8]\d{7,9})$/,
        "ar-MA": /^(?:(?:\+|00)212|0)[5-7]\d{8}$/,
        "ar-OM": /^((\+|00)968)?([79][1-9])\d{6}$/,
        "ar-PS": /^(\+?970|0)5[6|9](\d{7})$/,
        "ar-SA": /^(!?(\+?966)|0)?5\d{8}$/,
        "ar-SD": /^((\+?249)|0)?(9[012369]|1[012])\d{7}$/,
        "ar-SY": /^(!?(\+?963)|0)?9\d{8}$/,
        "ar-TN": /^(\+?216)?[2459]\d{7}$/,
        "az-AZ": /^(\+994|0)(10|5[015]|7[07]|99)\d{7}$/,
        "ar-QA": /^(\+?974|0)?([3567]\d{7})$/,
        "bs-BA": /^((((\+|00)3876)|06))((([0-3]|[5-6])\d{6})|(4\d{7}))$/,
        "be-BY": /^(\+?375)?(24|25|29|33|44)\d{7}$/,
        "bg-BG": /^(\+?359|0)?8[789]\d{7}$/,
        "bn-BD": /^(\+?880|0)1[13456789][0-9]{8}$/,
        "ca-AD": /^(\+376)?[346]\d{5}$/,
        "cs-CZ": /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
        "da-DK": /^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
        "de-DE": /^((\+49|0)1)(5[0-25-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7,9}$/,
        "de-AT": /^(\+43|0)\d{1,4}\d{3,12}$/,
        "de-CH": /^(\+41|0)([1-9])\d{1,9}$/,
        "de-LU": /^(\+352)?((6\d1)\d{6})$/,
        "dv-MV": /^(\+?960)?(7[2-9]|9[1-9])\d{5}$/,
        "el-GR": /^(\+?30|0)?6(8[5-9]|9(?![26])[0-9])\d{7}$/,
        "el-CY": /^(\+?357?)?(9(9|7|6|5|4)\d{6})$/,
        "en-AI": /^(\+?1|0)264(?:2(35|92)|4(?:6[1-2]|76|97)|5(?:3[6-9]|8[1-4])|7(?:2(4|9)|72))\d{4}$/,
        "en-AU": /^(\+?61|0)4\d{8}$/,
        "en-AG": /^(?:\+1|1)268(?:464|7(?:1[3-9]|[28]\d|3[0246]|64|7[0-689]))\d{4}$/,
        "en-BM": /^(\+?1)?441(((3|7)\d{6}$)|(5[0-3][0-9]\d{4}$)|(59\d{5}$))/,
        "en-BS": /^(\+?1[-\s]?|0)?\(?242\)?[-\s]?\d{3}[-\s]?\d{4}$/,
        "en-GB": /^(\+?44|0)7[1-9]\d{8}$/,
        "en-GG": /^(\+?44|0)1481\d{6}$/,
        "en-GH": /^(\+233|0)(20|50|24|54|27|57|26|56|23|53|28|55|59)\d{7}$/,
        "en-GY": /^(\+592|0)6\d{6}$/,
        "en-HK": /^(\+?852[-\s]?)?[456789]\d{3}[-\s]?\d{4}$/,
        "en-MO": /^(\+?853[-\s]?)?[6]\d{3}[-\s]?\d{4}$/,
        "en-IE": /^(\+?353|0)8[356789]\d{7}$/,
        "en-IN": /^(\+?91|0)?[6789]\d{9}$/,
        "en-JM": /^(\+?876)?\d{7}$/,
        "en-KE": /^(\+?254|0)(7|1)\d{8}$/,
        "fr-CF": /^(\+?236| ?)(70|75|77|72|21|22)\d{6}$/,
        "en-SS": /^(\+?211|0)(9[1257])\d{7}$/,
        "en-KI": /^((\+686|686)?)?( )?((6|7)(2|3|8)[0-9]{6})$/,
        "en-KN": /^(?:\+1|1)869(?:46\d|48[89]|55[6-8]|66\d|76[02-7])\d{4}$/,
        "en-LS": /^(\+?266)(22|28|57|58|59|27|52)\d{6}$/,
        "en-MT": /^(\+?356|0)?(99|79|77|21|27|22|25)[0-9]{6}$/,
        "en-MU": /^(\+?230|0)?\d{8}$/,
        "en-MW": /^(\+?265|0)(((77|88|31|99|98|21)\d{7})|(((111)|1)\d{6})|(32000\d{4}))$/,
        "en-NA": /^(\+?264|0)(6|8)\d{7}$/,
        "en-NG": /^(\+?234|0)?[789]\d{9}$/,
        "en-NZ": /^(\+?64|0)[28]\d{7,9}$/,
        "en-PG": /^(\+?675|0)?(7\d|8[18])\d{6}$/,
        "en-PK": /^((00|\+)?92|0)3[0-6]\d{8}$/,
        "en-PH": /^(09|\+639)\d{9}$/,
        "en-RW": /^(\+?250|0)?[7]\d{8}$/,
        "en-SG": /^(\+65)?[3689]\d{7}$/,
        "en-SL": /^(\+?232|0)\d{8}$/,
        "en-TZ": /^(\+?255|0)?[67]\d{8}$/,
        "en-UG": /^(\+?256|0)?[7]\d{8}$/,
        "en-US": /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
        "en-ZA": /^(\+?27|0)\d{9}$/,
        "en-ZM": /^(\+?26)?0[79][567]\d{7}$/,
        "en-ZW": /^(\+263)[0-9]{9}$/,
        "en-BW": /^(\+?267)?(7[1-8]{1})\d{6}$/,
        "es-AR": /^\+?549(11|[2368]\d)\d{8}$/,
        "es-BO": /^(\+?591)?(6|7)\d{7}$/,
        "es-CO": /^(\+?57)?3(0(0|1|2|4|5)|1\d|2[0-4]|5(0|1))\d{7}$/,
        "es-CL": /^(\+?56|0)[2-9]\d{1}\d{7}$/,
        "es-CR": /^(\+506)?[2-8]\d{7}$/,
        "es-CU": /^(\+53|0053)?5\d{7}$/,
        "es-DO": /^(\+?1)?8[024]9\d{7}$/,
        "es-HN": /^(\+?504)?[9|8|3|2]\d{7}$/,
        "es-EC": /^(\+?593|0)([2-7]|9[2-9])\d{7}$/,
        "es-ES": /^(\+?34)?[6|7]\d{8}$/,
        "es-GT": /^(\+?502)?[2|6|7]\d{7}$/,
        "es-PE": /^(\+?51)?9\d{8}$/,
        "es-MX": /^(\+?52)?(1|01)?\d{10,11}$/,
        "es-NI": /^(\+?505)\d{7,8}$/,
        "es-PA": /^(\+?507)\d{7,8}$/,
        "es-PY": /^(\+?595|0)9[9876]\d{7}$/,
        "es-SV": /^(\+?503)?[67]\d{7}$/,
        "es-UY": /^(\+598|0)9[1-9][\d]{6}$/,
        "es-VE": /^(\+?58)?(2|4)\d{9}$/,
        "et-EE": /^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,
        "fa-IR": /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,
        "fi-FI": /^(\+?358|0)\s?(4[0-6]|50)\s?(\d\s?){4,8}$/,
        "fj-FJ": /^(\+?679)?\s?\d{3}\s?\d{4}$/,
        "fo-FO": /^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
        "fr-BF": /^(\+226|0)[67]\d{7}$/,
        "fr-BJ": /^(\+229)\d{8}$/,
        "fr-CD": /^(\+?243|0)?(8|9)\d{8}$/,
        "fr-CM": /^(\+?237)6[0-9]{8}$/,
        "fr-DJ": /^(?:\+253)?77[6-8]\d{5}$/,
        "fr-FR": /^(\+?33|0)[67]\d{8}$/,
        "fr-GF": /^(\+?594|0|00594)[67]\d{8}$/,
        "fr-GP": /^(\+?590|0|00590)[67]\d{8}$/,
        "fr-MQ": /^(\+?596|0|00596)[67]\d{8}$/,
        "fr-PF": /^(\+?689)?8[789]\d{6}$/,
        "fr-RE": /^(\+?262|0|00262)[67]\d{8}$/,
        "fr-WF": /^(\+681)?\d{6}$/,
        "he-IL": /^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,
        "hu-HU": /^(\+?36|06)(20|30|31|50|70)\d{7}$/,
        "id-ID": /^(\+?62|0)8(1[123456789]|2[1238]|3[1238]|5[12356789]|7[78]|9[56789]|8[123456789])([\s?|\d]{5,11})$/,
        "ir-IR": /^(\+98|0)?9\d{9}$/,
        "it-IT": /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
        "it-SM": /^((\+378)|(0549)|(\+390549)|(\+3780549))?6\d{5,9}$/,
        "ja-JP": /^(\+81[ \-]?(\(0\))?|0)[6789]0[ \-]?\d{4}[ \-]?\d{4}$/,
        "ka-GE": /^(\+?995)?(79\d{7}|5\d{8})$/,
        "kk-KZ": /^(\+?7|8)?7\d{9}$/,
        "kl-GL": /^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
        "ko-KR": /^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,
        "ky-KG": /^(\+996\s?)?(22[0-9]|50[0-9]|55[0-9]|70[0-9]|75[0-9]|77[0-9]|880|990|995|996|997|998)\s?\d{3}\s?\d{3}$/,
        "lt-LT": /^(\+370|8)\d{8}$/,
        "lv-LV": /^(\+?371)2\d{7}$/,
        "mg-MG": /^((\+?261|0)(2|3)\d)?\d{7}$/,
        "mn-MN": /^(\+|00|011)?976(77|81|88|91|94|95|96|99)\d{6}$/,
        "my-MM": /^(\+?959|09|9)(2[5-7]|3[1-2]|4[0-5]|6[6-9]|7[5-9]|9[6-9])[0-9]{7}$/,
        "ms-MY": /^(\+?60|0)1(([0145](-|\s)?\d{7,8})|([236-9](-|\s)?\d{7}))$/,
        "mz-MZ": /^(\+?258)?8[234567]\d{7}$/,
        "nb-NO": /^(\+?47)?[49]\d{7}$/,
        "ne-NP": /^(\+?977)?9[78]\d{8}$/,
        "nl-BE": /^(\+?32|0)4\d{8}$/,
        "nl-NL": /^(((\+|00)?31\(0\))|((\+|00)?31)|0)6{1}\d{8}$/,
        "nl-AW": /^(\+)?297(56|59|64|73|74|99)\d{5}$/,
        "nn-NO": /^(\+?47)?[49]\d{7}$/,
        "pl-PL": /^(\+?48)? ?([5-8]\d|45) ?\d{3} ?\d{2} ?\d{2}$/,
        "pt-BR": /^((\+?55\ ?[1-9]{2}\ ?)|(\+?55\ ?\([1-9]{2}\)\ ?)|(0[1-9]{2}\ ?)|(\([1-9]{2}\)\ ?)|([1-9]{2}\ ?))((\d{4}\-?\d{4})|(9[1-9]{1}\d{3}\-?\d{4}))$/,
        "pt-PT": /^(\+?351)?9[1236]\d{7}$/,
        "pt-AO": /^(\+?244)?9\d{8}$/,
        "ro-MD": /^(\+?373|0)((6(0|1|2|6|7|8|9))|(7(6|7|8|9)))\d{6}$/,
        "ro-RO": /^(\+?40|0)\s?7\d{2}(\/|\s|\.|-)?\d{3}(\s|\.|-)?\d{3}$/,
        "ru-RU": /^(\+?7|8)?9\d{9}$/,
        "si-LK": /^(?:0|94|\+94)?(7(0|1|2|4|5|6|7|8)( |-)?)\d{7}$/,
        "sl-SI": /^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,
        "sk-SK": /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
        "so-SO": /^(\+?252|0)((6[0-9])\d{7}|(7[1-9])\d{7})$/,
        "sq-AL": /^(\+355|0)6[2-9]\d{7}$/,
        "sr-RS": /^(\+3816|06)[- \d]{5,9}$/,
        "sv-SE": /^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,
        "tg-TJ": /^(\+?992)?[5][5]\d{7}$/,
        "th-TH": /^(\+66|66|0)\d{9}$/,
        "tr-TR": /^(\+?90|0)?5\d{9}$/,
        "tk-TM": /^(\+993|993|8)\d{8}$/,
        "uk-UA": /^(\+?38)?0(50|6[36-8]|7[357]|9[1-9])\d{7}$/,
        "uz-UZ": /^(\+?998)?(6[125-79]|7[1-69]|88|9\d)\d{7}$/,
        "vi-VN": /^((\+?84)|0)((3([2-9]))|(5([25689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/,
        "zh-CN": /^((\+|00)86)?(1[3-9]|9[28])\d{9}$/,
        "zh-TW": /^(\+?886\-?|0)?9\d{8}$/,
        "dz-BT": /^(\+?975|0)?(17|16|77|02)\d{6}$/,
        "ar-YE": /^(((\+|00)9677|0?7)[0137]\d{7}|((\+|00)967|0)[1-7]\d{6})$/,
        "ar-EH": /^(\+?212|0)[\s\-]?(5288|5289)[\s\-]?\d{5}$/,
        "fa-AF": /^(\+93|0)?(2{1}[0-8]{1}|[3-5]{1}[0-4]{1})(\d{7})$/,
        "mk-MK": /^(\+?389|0)?((?:2[2-9]\d{6}|(?:3[1-4]|4[2-8])\d{6}|500\d{5}|5[2-9]\d{6}|7[0-9][2-9]\d{5}|8[1-9]\d{6}|800\d{5}|8009\d{4}))$/
      };
      phones["en-CA"] = phones["en-US"];
      phones["fr-CA"] = phones["en-CA"];
      phones["fr-BE"] = phones["nl-BE"];
      phones["zh-HK"] = phones["en-HK"];
      phones["zh-MO"] = phones["en-MO"];
      phones["ga-IE"] = phones["en-IE"];
      phones["fr-CH"] = phones["de-CH"];
      phones["it-CH"] = phones["fr-CH"];
      function isMobilePhone(str, locale, options) {
        (0, _assertString.default)(str);
        if (options && options.strictMode && !str.startsWith("+")) {
          return false;
        }
        if (Array.isArray(locale)) {
          return locale.some(function(key2) {
            if (phones.hasOwnProperty(key2)) {
              var phone2 = phones[key2];
              if (phone2.test(str)) {
                return true;
              }
            }
            return false;
          });
        } else if (locale in phones) {
          return phones[locale].test(str);
        } else if (!locale || locale === "any") {
          for (var key in phones) {
            if (phones.hasOwnProperty(key)) {
              var phone = phones[key];
              if (phone.test(str)) {
                return true;
              }
            }
          }
          return false;
        }
        throw new Error("Invalid locale '".concat(locale, "'"));
      }
      var locales = exports.locales = Object.keys(phones);
    }
  });

  // node_modules/validator/lib/isEthereumAddress.js
  var require_isEthereumAddress = __commonJS({
    "node_modules/validator/lib/isEthereumAddress.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isEthereumAddress;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var eth = /^(0x)[0-9a-f]{40}$/i;
      function isEthereumAddress(str) {
        (0, _assertString.default)(str);
        return eth.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isCurrency.js
  var require_isCurrency = __commonJS({
    "node_modules/validator/lib/isCurrency.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isCurrency;
      var _merge = _interopRequireDefault(require_merge());
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function currencyRegex(options) {
        var decimal_digits = "\\d{".concat(options.digits_after_decimal[0], "}");
        options.digits_after_decimal.forEach(function(digit, index) {
          if (index !== 0) decimal_digits = "".concat(decimal_digits, "|\\d{").concat(digit, "}");
        });
        var symbol = "(".concat(options.symbol.replace(/\W/, function(m) {
          return "\\".concat(m);
        }), ")").concat(options.require_symbol ? "" : "?"), negative = "-?", whole_dollar_amount_without_sep = "[1-9]\\d*", whole_dollar_amount_with_sep = "[1-9]\\d{0,2}(\\".concat(options.thousands_separator, "\\d{3})*"), valid_whole_dollar_amounts = ["0", whole_dollar_amount_without_sep, whole_dollar_amount_with_sep], whole_dollar_amount = "(".concat(valid_whole_dollar_amounts.join("|"), ")?"), decimal_amount = "(\\".concat(options.decimal_separator, "(").concat(decimal_digits, "))").concat(options.require_decimal ? "" : "?");
        var pattern = whole_dollar_amount + (options.allow_decimal || options.require_decimal ? decimal_amount : "");
        if (options.allow_negatives && !options.parens_for_negatives) {
          if (options.negative_sign_after_digits) {
            pattern += negative;
          } else if (options.negative_sign_before_digits) {
            pattern = negative + pattern;
          }
        }
        if (options.allow_negative_sign_placeholder) {
          pattern = "( (?!\\-))?".concat(pattern);
        } else if (options.allow_space_after_symbol) {
          pattern = " ?".concat(pattern);
        } else if (options.allow_space_after_digits) {
          pattern += "( (?!$))?";
        }
        if (options.symbol_after_digits) {
          pattern += symbol;
        } else {
          pattern = symbol + pattern;
        }
        if (options.allow_negatives) {
          if (options.parens_for_negatives) {
            pattern = "(\\(".concat(pattern, "\\)|").concat(pattern, ")");
          } else if (!(options.negative_sign_before_digits || options.negative_sign_after_digits)) {
            pattern = negative + pattern;
          }
        }
        return new RegExp("^(?!-? )(?=.*\\d)".concat(pattern, "$"));
      }
      var default_currency_options = {
        symbol: "$",
        require_symbol: false,
        allow_space_after_symbol: false,
        symbol_after_digits: false,
        allow_negatives: true,
        parens_for_negatives: false,
        negative_sign_before_digits: false,
        negative_sign_after_digits: false,
        allow_negative_sign_placeholder: false,
        thousands_separator: ",",
        decimal_separator: ".",
        allow_decimal: true,
        require_decimal: false,
        digits_after_decimal: [2],
        allow_space_after_digits: false
      };
      function isCurrency(str, options) {
        (0, _assertString.default)(str);
        options = (0, _merge.default)(options, default_currency_options);
        return currencyRegex(options).test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isBtcAddress.js
  var require_isBtcAddress = __commonJS({
    "node_modules/validator/lib/isBtcAddress.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isBtcAddress;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var bech32 = /^(bc1|tb1|bc1p|tb1p)[ac-hj-np-z02-9]{39,58}$/;
      var base58 = /^(1|2|3|m)[A-HJ-NP-Za-km-z1-9]{25,39}$/;
      function isBtcAddress(str) {
        (0, _assertString.default)(str);
        return bech32.test(str) || base58.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isISO6346.js
  var require_isISO6346 = __commonJS({
    "node_modules/validator/lib/isISO6346.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.isFreightContainerID = void 0;
      exports.isISO6346 = isISO6346;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var isISO6346Str = /^[A-Z]{3}(U[0-9]{7})|([J,Z][0-9]{6,7})$/;
      var isDigit = /^[0-9]$/;
      function isISO6346(str) {
        (0, _assertString.default)(str);
        str = str.toUpperCase();
        if (!isISO6346Str.test(str)) return false;
        if (str.length === 11) {
          var sum = 0;
          for (var i2 = 0; i2 < str.length - 1; i2++) {
            if (!isDigit.test(str[i2])) {
              var convertedCode = void 0;
              var letterCode = str.charCodeAt(i2) - 55;
              if (letterCode < 11) convertedCode = letterCode;
              else if (letterCode >= 11 && letterCode <= 20) convertedCode = 12 + letterCode % 11;
              else if (letterCode >= 21 && letterCode <= 30) convertedCode = 23 + letterCode % 21;
              else convertedCode = 34 + letterCode % 31;
              sum += convertedCode * Math.pow(2, i2);
            } else sum += str[i2] * Math.pow(2, i2);
          }
          var checkSumDigit = sum % 11;
          if (checkSumDigit === 10) checkSumDigit = 0;
          return Number(str[str.length - 1]) === checkSumDigit;
        }
        return true;
      }
      var isFreightContainerID = exports.isFreightContainerID = isISO6346;
    }
  });

  // node_modules/validator/lib/isISO6391.js
  var require_isISO6391 = __commonJS({
    "node_modules/validator/lib/isISO6391.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isISO6391;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var isISO6391Set = /* @__PURE__ */ new Set(["aa", "ab", "ae", "af", "ak", "am", "an", "ar", "as", "av", "ay", "az", "az", "ba", "be", "bg", "bh", "bi", "bm", "bn", "bo", "br", "bs", "ca", "ce", "ch", "co", "cr", "cs", "cu", "cv", "cy", "da", "de", "dv", "dz", "ee", "el", "en", "eo", "es", "et", "eu", "fa", "ff", "fi", "fj", "fo", "fr", "fy", "ga", "gd", "gl", "gn", "gu", "gv", "ha", "he", "hi", "ho", "hr", "ht", "hu", "hy", "hz", "ia", "id", "ie", "ig", "ii", "ik", "io", "is", "it", "iu", "ja", "jv", "ka", "kg", "ki", "kj", "kk", "kl", "km", "kn", "ko", "kr", "ks", "ku", "kv", "kw", "ky", "la", "lb", "lg", "li", "ln", "lo", "lt", "lu", "lv", "mg", "mh", "mi", "mk", "ml", "mn", "mr", "ms", "mt", "my", "na", "nb", "nd", "ne", "ng", "nl", "nn", "no", "nr", "nv", "ny", "oc", "oj", "om", "or", "os", "pa", "pi", "pl", "ps", "pt", "qu", "rm", "rn", "ro", "ru", "rw", "sa", "sc", "sd", "se", "sg", "si", "sk", "sl", "sm", "sn", "so", "sq", "sr", "ss", "st", "su", "sv", "sw", "ta", "te", "tg", "th", "ti", "tk", "tl", "tn", "to", "tr", "ts", "tt", "tw", "ty", "ug", "uk", "ur", "uz", "ve", "vi", "vo", "wa", "wo", "xh", "yi", "yo", "za", "zh", "zu"]);
      function isISO6391(str) {
        (0, _assertString.default)(str);
        return isISO6391Set.has(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isISO8601.js
  var require_isISO8601 = __commonJS({
    "node_modules/validator/lib/isISO8601.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isISO8601;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
      var iso8601StrictSeparator = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
      var isValidDate = function isValidDate2(str) {
        var ordinalMatch = str.match(/^(\d{4})-?(\d{3})([ T]{1}\.*|$)/);
        if (ordinalMatch) {
          var oYear = Number(ordinalMatch[1]);
          var oDay = Number(ordinalMatch[2]);
          if (oYear % 4 === 0 && oYear % 100 !== 0 || oYear % 400 === 0) return oDay <= 366;
          return oDay <= 365;
        }
        var match = str.match(/(\d{4})-?(\d{0,2})-?(\d*)/).map(Number);
        var year = match[1];
        var month = match[2];
        var day = match[3];
        var monthString = month ? "0".concat(month).slice(-2) : month;
        var dayString = day ? "0".concat(day).slice(-2) : day;
        var d = new Date("".concat(year, "-").concat(monthString || "01", "-").concat(dayString || "01"));
        if (month && day) {
          return d.getUTCFullYear() === year && d.getUTCMonth() + 1 === month && d.getUTCDate() === day;
        }
        return true;
      };
      function isISO8601(str) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        (0, _assertString.default)(str);
        var check = options.strictSeparator ? iso8601StrictSeparator.test(str) : iso8601.test(str);
        if (check && options.strict) return isValidDate(str);
        return check;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isRFC3339.js
  var require_isRFC3339 = __commonJS({
    "node_modules/validator/lib/isRFC3339.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isRFC3339;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var dateFullYear = /[0-9]{4}/;
      var dateMonth = /(0[1-9]|1[0-2])/;
      var dateMDay = /([12]\d|0[1-9]|3[01])/;
      var timeHour = /([01][0-9]|2[0-3])/;
      var timeMinute = /[0-5][0-9]/;
      var timeSecond = /([0-5][0-9]|60)/;
      var timeSecFrac = /(\.[0-9]+)?/;
      var timeNumOffset = new RegExp("[-+]".concat(timeHour.source, ":").concat(timeMinute.source));
      var timeOffset = new RegExp("([zZ]|".concat(timeNumOffset.source, ")"));
      var partialTime = new RegExp("".concat(timeHour.source, ":").concat(timeMinute.source, ":").concat(timeSecond.source).concat(timeSecFrac.source));
      var fullDate = new RegExp("".concat(dateFullYear.source, "-").concat(dateMonth.source, "-").concat(dateMDay.source));
      var fullTime = new RegExp("".concat(partialTime.source).concat(timeOffset.source));
      var rfc3339 = new RegExp("^".concat(fullDate.source, "[ tT]").concat(fullTime.source, "$"));
      function isRFC3339(str) {
        (0, _assertString.default)(str);
        return rfc3339.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isISO15924.js
  var require_isISO15924 = __commonJS({
    "node_modules/validator/lib/isISO15924.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ScriptCodes = void 0;
      exports.default = isISO15924;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var validISO15924Codes = /* @__PURE__ */ new Set(["Adlm", "Afak", "Aghb", "Ahom", "Arab", "Aran", "Armi", "Armn", "Avst", "Bali", "Bamu", "Bass", "Batk", "Beng", "Bhks", "Blis", "Bopo", "Brah", "Brai", "Bugi", "Buhd", "Cakm", "Cans", "Cari", "Cham", "Cher", "Chis", "Chrs", "Cirt", "Copt", "Cpmn", "Cprt", "Cyrl", "Cyrs", "Deva", "Diak", "Dogr", "Dsrt", "Dupl", "Egyd", "Egyh", "Egyp", "Elba", "Elym", "Ethi", "Gara", "Geok", "Geor", "Glag", "Gong", "Gonm", "Goth", "Gran", "Grek", "Gujr", "Gukh", "Guru", "Hanb", "Hang", "Hani", "Hano", "Hans", "Hant", "Hatr", "Hebr", "Hira", "Hluw", "Hmng", "Hmnp", "Hrkt", "Hung", "Inds", "Ital", "Jamo", "Java", "Jpan", "Jurc", "Kali", "Kana", "Kawi", "Khar", "Khmr", "Khoj", "Kitl", "Kits", "Knda", "Kore", "Kpel", "Krai", "Kthi", "Lana", "Laoo", "Latf", "Latg", "Latn", "Leke", "Lepc", "Limb", "Lina", "Linb", "Lisu", "Loma", "Lyci", "Lydi", "Mahj", "Maka", "Mand", "Mani", "Marc", "Maya", "Medf", "Mend", "Merc", "Mero", "Mlym", "Modi", "Mong", "Moon", "Mroo", "Mtei", "Mult", "Mymr", "Nagm", "Nand", "Narb", "Nbat", "Newa", "Nkdb", "Nkgb", "Nkoo", "Nshu", "Ogam", "Olck", "Onao", "Orkh", "Orya", "Osge", "Osma", "Ougr", "Palm", "Pauc", "Pcun", "Pelm", "Perm", "Phag", "Phli", "Phlp", "Phlv", "Phnx", "Plrd", "Piqd", "Prti", "Psin", "Qaaa", "Qaab", "Qaac", "Qaad", "Qaae", "Qaaf", "Qaag", "Qaah", "Qaai", "Qaaj", "Qaak", "Qaal", "Qaam", "Qaan", "Qaao", "Qaap", "Qaaq", "Qaar", "Qaas", "Qaat", "Qaau", "Qaav", "Qaaw", "Qaax", "Qaay", "Qaaz", "Qaba", "Qabb", "Qabc", "Qabd", "Qabe", "Qabf", "Qabg", "Qabh", "Qabi", "Qabj", "Qabk", "Qabl", "Qabm", "Qabn", "Qabo", "Qabp", "Qabq", "Qabr", "Qabs", "Qabt", "Qabu", "Qabv", "Qabw", "Qabx", "Ranj", "Rjng", "Rohg", "Roro", "Runr", "Samr", "Sara", "Sarb", "Saur", "Sgnw", "Shaw", "Shrd", "Shui", "Sidd", "Sidt", "Sind", "Sinh", "Sogd", "Sogo", "Sora", "Soyo", "Sund", "Sunu", "Sylo", "Syrc", "Syre", "Syrj", "Syrn", "Tagb", "Takr", "Tale", "Talu", "Taml", "Tang", "Tavt", "Tayo", "Telu", "Teng", "Tfng", "Tglg", "Thaa", "Thai", "Tibt", "Tirh", "Tnsa", "Todr", "Tols", "Toto", "Tutg", "Ugar", "Vaii", "Visp", "Vith", "Wara", "Wcho", "Wole", "Xpeo", "Xsux", "Yezi", "Yiii", "Zanb", "Zinh", "Zmth", "Zsye", "Zsym", "Zxxx", "Zyyy", "Zzzz"]);
      function isISO15924(str) {
        (0, _assertString.default)(str);
        return validISO15924Codes.has(str);
      }
      var ScriptCodes = exports.ScriptCodes = validISO15924Codes;
    }
  });

  // node_modules/validator/lib/isISO31661Alpha3.js
  var require_isISO31661Alpha3 = __commonJS({
    "node_modules/validator/lib/isISO31661Alpha3.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isISO31661Alpha3;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var validISO31661Alpha3CountriesCodes = /* @__PURE__ */ new Set(["AFG", "ALA", "ALB", "DZA", "ASM", "AND", "AGO", "AIA", "ATA", "ATG", "ARG", "ARM", "ABW", "AUS", "AUT", "AZE", "BHS", "BHR", "BGD", "BRB", "BLR", "BEL", "BLZ", "BEN", "BMU", "BTN", "BOL", "BES", "BIH", "BWA", "BVT", "BRA", "IOT", "BRN", "BGR", "BFA", "BDI", "KHM", "CMR", "CAN", "CPV", "CYM", "CAF", "TCD", "CHL", "CHN", "CXR", "CCK", "COL", "COM", "COG", "COD", "COK", "CRI", "CIV", "HRV", "CUB", "CUW", "CYP", "CZE", "DNK", "DJI", "DMA", "DOM", "ECU", "EGY", "SLV", "GNQ", "ERI", "EST", "ETH", "FLK", "FRO", "FJI", "FIN", "FRA", "GUF", "PYF", "ATF", "GAB", "GMB", "GEO", "DEU", "GHA", "GIB", "GRC", "GRL", "GRD", "GLP", "GUM", "GTM", "GGY", "GIN", "GNB", "GUY", "HTI", "HMD", "VAT", "HND", "HKG", "HUN", "ISL", "IND", "IDN", "IRN", "IRQ", "IRL", "IMN", "ISR", "ITA", "JAM", "JPN", "JEY", "JOR", "KAZ", "KEN", "KIR", "PRK", "KOR", "KWT", "KGZ", "LAO", "LVA", "LBN", "LSO", "LBR", "LBY", "LIE", "LTU", "LUX", "MAC", "MKD", "MDG", "MWI", "MYS", "MDV", "MLI", "MLT", "MHL", "MTQ", "MRT", "MUS", "MYT", "MEX", "FSM", "MDA", "MCO", "MNG", "MNE", "MSR", "MAR", "MOZ", "MMR", "NAM", "NRU", "NPL", "NLD", "NCL", "NZL", "NIC", "NER", "NGA", "NIU", "NFK", "MNP", "NOR", "OMN", "PAK", "PLW", "PSE", "PAN", "PNG", "PRY", "PER", "PHL", "PCN", "POL", "PRT", "PRI", "QAT", "REU", "ROU", "RUS", "RWA", "BLM", "SHN", "KNA", "LCA", "MAF", "SPM", "VCT", "WSM", "SMR", "STP", "SAU", "SEN", "SRB", "SYC", "SLE", "SGP", "SXM", "SVK", "SVN", "SLB", "SOM", "ZAF", "SGS", "SSD", "ESP", "LKA", "SDN", "SUR", "SJM", "SWZ", "SWE", "CHE", "SYR", "TWN", "TJK", "TZA", "THA", "TLS", "TGO", "TKL", "TON", "TTO", "TUN", "TUR", "TKM", "TCA", "TUV", "UGA", "UKR", "ARE", "GBR", "USA", "UMI", "URY", "UZB", "VUT", "VEN", "VNM", "VGB", "VIR", "WLF", "ESH", "YEM", "ZMB", "ZWE"]);
      var alpha3CountryCode = /^[a-zA-Z]{3}$/;
      function isISO31661Alpha3(str) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        (0, _assertString.default)(str);
        var userAssignedCodes = options.userAssignedCodes;
        var validUserAssignedCodes = (userAssignedCodes || []).reduce(function(accumulator, userAssignedCode) {
          if (alpha3CountryCode.test(userAssignedCode)) {
            accumulator.push(userAssignedCode.toUpperCase());
          }
          return accumulator;
        }, []);
        if (validUserAssignedCodes.includes(str.toUpperCase())) {
          return true;
        }
        return validISO31661Alpha3CountriesCodes.has(str.toUpperCase());
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isISO31661Numeric.js
  var require_isISO31661Numeric = __commonJS({
    "node_modules/validator/lib/isISO31661Numeric.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isISO31661Numeric;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var validISO31661NumericCountriesCodes = /* @__PURE__ */ new Set(["004", "008", "010", "012", "016", "020", "024", "028", "031", "032", "036", "040", "044", "048", "050", "051", "052", "056", "060", "064", "068", "070", "072", "074", "076", "084", "086", "090", "092", "096", "100", "104", "108", "112", "116", "120", "124", "132", "136", "140", "144", "148", "152", "156", "158", "162", "166", "170", "174", "175", "178", "180", "184", "188", "191", "192", "196", "203", "204", "208", "212", "214", "218", "222", "226", "231", "232", "233", "234", "238", "239", "242", "246", "248", "250", "254", "258", "260", "262", "266", "268", "270", "275", "276", "288", "292", "296", "300", "304", "308", "312", "316", "320", "324", "328", "332", "334", "336", "340", "344", "348", "352", "356", "360", "364", "368", "372", "376", "380", "384", "388", "392", "398", "400", "404", "408", "410", "414", "417", "418", "422", "426", "428", "430", "434", "438", "440", "442", "446", "450", "454", "458", "462", "466", "470", "474", "478", "480", "484", "492", "496", "498", "499", "500", "504", "508", "512", "516", "520", "524", "528", "531", "533", "534", "535", "540", "548", "554", "558", "562", "566", "570", "574", "578", "580", "581", "583", "584", "585", "586", "591", "598", "600", "604", "608", "612", "616", "620", "624", "626", "630", "634", "638", "642", "643", "646", "652", "654", "659", "660", "662", "663", "666", "670", "674", "678", "682", "686", "688", "690", "694", "702", "703", "704", "705", "706", "710", "716", "724", "728", "729", "732", "740", "744", "748", "752", "756", "760", "762", "764", "768", "772", "776", "780", "784", "788", "792", "795", "796", "798", "800", "804", "807", "818", "826", "831", "832", "833", "834", "840", "850", "854", "858", "860", "862", "876", "882", "887", "894"]);
      function isISO31661Numeric(str) {
        (0, _assertString.default)(str);
        return validISO31661NumericCountriesCodes.has(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isISO4217.js
  var require_isISO4217 = __commonJS({
    "node_modules/validator/lib/isISO4217.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.CurrencyCodes = void 0;
      exports.default = isISO4217;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var validISO4217CurrencyCodes = /* @__PURE__ */ new Set(["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BOV", "BRL", "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHE", "CHF", "CHW", "CLF", "CLP", "CNY", "COP", "COU", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HTG", "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MXV", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD", "SSP", "STN", "SVC", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "USN", "UYI", "UYU", "UYW", "UZS", "VED", "VES", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XBA", "XBB", "XBC", "XBD", "XCD", "XDR", "XOF", "XPD", "XPF", "XPT", "XSU", "XTS", "XUA", "XXX", "YER", "ZAR", "ZMW", "ZWL"]);
      function isISO4217(str) {
        (0, _assertString.default)(str);
        return validISO4217CurrencyCodes.has(str.toUpperCase());
      }
      var CurrencyCodes = exports.CurrencyCodes = validISO4217CurrencyCodes;
    }
  });

  // node_modules/validator/lib/isBase32.js
  var require_isBase32 = __commonJS({
    "node_modules/validator/lib/isBase32.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isBase32;
      var _assertString = _interopRequireDefault(require_assertString());
      var _merge = _interopRequireDefault(require_merge());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var base32 = /^[A-Z2-7]+=*$/;
      var crockfordBase32 = /^[A-HJKMNP-TV-Z0-9]+$/;
      var defaultBase32Options = {
        crockford: false
      };
      function isBase32(str, options) {
        (0, _assertString.default)(str);
        options = (0, _merge.default)(options, defaultBase32Options);
        if (options.crockford) {
          return crockfordBase32.test(str);
        }
        return str.length % 8 === 0 && base32.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isBase58.js
  var require_isBase58 = __commonJS({
    "node_modules/validator/lib/isBase58.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isBase58;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var base58Reg = /^[A-HJ-NP-Za-km-z1-9]*$/;
      function isBase58(str) {
        (0, _assertString.default)(str);
        return base58Reg.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isDataURI.js
  var require_isDataURI = __commonJS({
    "node_modules/validator/lib/isDataURI.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isDataURI;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var validMediaType = /^[a-z]+\/[a-z0-9\-\+\._]+$/i;
      var validAttribute = /^[a-z\-]+=[a-z0-9\-]+$/i;
      var validData = /^[a-z0-9!\$&'\(\)\*\+,;=\-\._~:@\/\?%\s]*$/i;
      function isDataURI(str) {
        (0, _assertString.default)(str);
        var data = str.split(",");
        if (data.length < 2) {
          return false;
        }
        var attributes = data.shift().trim().split(";");
        var schemeAndMediaType = attributes.shift();
        if (schemeAndMediaType.slice(0, 5) !== "data:") {
          return false;
        }
        var mediaType = schemeAndMediaType.slice(5);
        if (mediaType !== "" && !validMediaType.test(mediaType)) {
          return false;
        }
        for (var i2 = 0; i2 < attributes.length; i2++) {
          if (!(i2 === attributes.length - 1 && attributes[i2].toLowerCase() === "base64") && !validAttribute.test(attributes[i2])) {
            return false;
          }
        }
        for (var _i = 0; _i < data.length; _i++) {
          if (!validData.test(data[_i])) {
            return false;
          }
        }
        return true;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isMagnetURI.js
  var require_isMagnetURI = __commonJS({
    "node_modules/validator/lib/isMagnetURI.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isMagnetURI;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var magnetURIComponent = /(?:^magnet:\?|[^?&]&)xt(?:\.1)?=urn:(?:(?:aich|bitprint|btih|ed2k|ed2khash|kzhash|md5|sha1|tree:tiger):[a-z0-9]{32}(?:[a-z0-9]{8})?|btmh:1220[a-z0-9]{64})(?:$|&)/i;
      function isMagnetURI(url) {
        (0, _assertString.default)(url);
        if (url.indexOf("magnet:?") !== 0) {
          return false;
        }
        return magnetURIComponent.test(url);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/rtrim.js
  var require_rtrim = __commonJS({
    "node_modules/validator/lib/rtrim.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = rtrim;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function rtrim(str, chars) {
        (0, _assertString.default)(str);
        if (chars) {
          var pattern = new RegExp("[".concat(chars.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "]+$"), "g");
          return str.replace(pattern, "");
        }
        var strIndex = str.length - 1;
        while (/\s/.test(str.charAt(strIndex))) {
          strIndex -= 1;
        }
        return str.slice(0, strIndex + 1);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/ltrim.js
  var require_ltrim = __commonJS({
    "node_modules/validator/lib/ltrim.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = ltrim;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function ltrim(str, chars) {
        (0, _assertString.default)(str);
        var pattern = chars ? new RegExp("^[".concat(chars.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "]+"), "g") : /^\s+/g;
        return str.replace(pattern, "");
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/trim.js
  var require_trim = __commonJS({
    "node_modules/validator/lib/trim.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = trim;
      var _rtrim = _interopRequireDefault(require_rtrim());
      var _ltrim = _interopRequireDefault(require_ltrim());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function trim(str, chars) {
        return (0, _rtrim.default)((0, _ltrim.default)(str, chars), chars);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isMailtoURI.js
  var require_isMailtoURI = __commonJS({
    "node_modules/validator/lib/isMailtoURI.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isMailtoURI;
      var _trim = _interopRequireDefault(require_trim());
      var _isEmail = _interopRequireDefault(require_isEmail());
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _slicedToArray(r, e) {
        return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _iterableToArrayLimit(r, l) {
        var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (null != t) {
          var e, n, i2, u, a2 = [], f = true, o = false;
          try {
            if (i2 = (t = t.call(r)).next, 0 === l) {
              if (Object(t) !== t) return;
              f = false;
            } else for (; !(f = (e = i2.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
          } catch (r2) {
            o = true, n = r2;
          } finally {
            try {
              if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
            } finally {
              if (o) throw n;
            }
          }
          return a2;
        }
      }
      function _arrayWithHoles(r) {
        if (Array.isArray(r)) return r;
      }
      function _createForOfIteratorHelper(r, e) {
        var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (!t) {
          if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
            t && (r = t);
            var _n = 0, F = function F2() {
            };
            return { s: F, n: function n() {
              return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
            }, e: function e2(r2) {
              throw r2;
            }, f: F };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var o, a2 = true, u = false;
        return { s: function s() {
          t = t.call(r);
        }, n: function n() {
          var r2 = t.next();
          return a2 = r2.done, r2;
        }, e: function e2(r2) {
          u = true, o = r2;
        }, f: function f() {
          try {
            a2 || null == t.return || t.return();
          } finally {
            if (u) throw o;
          }
        } };
      }
      function _unsupportedIterableToArray(r, a2) {
        if (r) {
          if ("string" == typeof r) return _arrayLikeToArray(r, a2);
          var t = {}.toString.call(r).slice(8, -1);
          return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a2) : void 0;
        }
      }
      function _arrayLikeToArray(r, a2) {
        (null == a2 || a2 > r.length) && (a2 = r.length);
        for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
        return n;
      }
      function parseMailtoQueryString(queryString) {
        var allowedParams = /* @__PURE__ */ new Set(["subject", "body", "cc", "bcc"]), query = {
          cc: "",
          bcc: ""
        };
        var isParseFailed = false;
        var queryParams = queryString.split("&");
        if (queryParams.length > 4) {
          return false;
        }
        var _iterator = _createForOfIteratorHelper(queryParams), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var q = _step.value;
            var _q$split = q.split("="), _q$split2 = _slicedToArray(_q$split, 2), key = _q$split2[0], value = _q$split2[1];
            if (key && !allowedParams.has(key)) {
              isParseFailed = true;
              break;
            }
            if (value && (key === "cc" || key === "bcc")) {
              query[key] = value;
            }
            if (key) {
              allowedParams.delete(key);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return isParseFailed ? false : query;
      }
      function isMailtoURI(url, options) {
        (0, _assertString.default)(url);
        if (url.indexOf("mailto:") !== 0) {
          return false;
        }
        var _url$replace$split = url.replace("mailto:", "").split("?"), _url$replace$split2 = _slicedToArray(_url$replace$split, 2), to = _url$replace$split2[0], _url$replace$split2$ = _url$replace$split2[1], queryString = _url$replace$split2$ === void 0 ? "" : _url$replace$split2$;
        if (!to && !queryString) {
          return true;
        }
        var query = parseMailtoQueryString(queryString);
        if (!query) {
          return false;
        }
        return "".concat(to, ",").concat(query.cc, ",").concat(query.bcc).split(",").every(function(email) {
          email = (0, _trim.default)(email, " ");
          if (email) {
            return (0, _isEmail.default)(email, options);
          }
          return true;
        });
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isMimeType.js
  var require_isMimeType = __commonJS({
    "node_modules/validator/lib/isMimeType.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isMimeType;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var mimeTypeSimple = /^(application|audio|font|image|message|model|multipart|text|video)\/[a-zA-Z0-9\.\-\+_]{1,100}$/i;
      var mimeTypeText = /^text\/[a-zA-Z0-9\.\-\+]{1,100};\s?charset=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?$/i;
      var mimeTypeMultipart = /^multipart\/[a-zA-Z0-9\.\-\+]{1,100}(;\s?(boundary|charset)=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?){0,2}$/i;
      function isMimeType(str) {
        (0, _assertString.default)(str);
        return mimeTypeSimple.test(str) || mimeTypeText.test(str) || mimeTypeMultipart.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isLatLong.js
  var require_isLatLong = __commonJS({
    "node_modules/validator/lib/isLatLong.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isLatLong;
      var _assertString = _interopRequireDefault(require_assertString());
      var _merge = _interopRequireDefault(require_merge());
      var _includesString = _interopRequireDefault(require_includesString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var lat = /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/;
      var long = /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/;
      var latDMS = /^(([1-8]?\d)\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|90\D+0\D+0)\D+[NSns]?$/i;
      var longDMS = /^\s*([1-7]?\d{1,2}\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|180\D+0\D+0)\D+[EWew]?$/i;
      var defaultLatLongOptions = {
        checkDMS: false
      };
      function isLatLong(str, options) {
        (0, _assertString.default)(str);
        options = (0, _merge.default)(options, defaultLatLongOptions);
        if (!(0, _includesString.default)(str, ",")) return false;
        var pair = str.split(",");
        if (pair[0].startsWith("(") && !pair[1].endsWith(")") || pair[1].endsWith(")") && !pair[0].startsWith("(")) return false;
        if (options.checkDMS) {
          return latDMS.test(pair[0]) && longDMS.test(pair[1]);
        }
        return lat.test(pair[0]) && long.test(pair[1]);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isPostalCode.js
  var require_isPostalCode = __commonJS({
    "node_modules/validator/lib/isPostalCode.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isPostalCode;
      exports.locales = void 0;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var threeDigit = /^\d{3}$/;
      var fourDigit = /^\d{4}$/;
      var fiveDigit = /^\d{5}$/;
      var sixDigit = /^\d{6}$/;
      var patterns = {
        AD: /^AD\d{3}$/,
        AT: fourDigit,
        AU: fourDigit,
        AZ: /^AZ\d{4}$/,
        BA: /^([7-8]\d{4}$)/,
        BD: /^([1-8][0-9]{3}|9[0-4][0-9]{2})$/,
        BE: fourDigit,
        BG: fourDigit,
        BR: /^\d{5}-?\d{3}$/,
        BY: /^2[1-4]\d{4}$/,
        CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
        CH: fourDigit,
        CN: /^(0[1-7]|1[012356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[1-5]|8[1345]|9[09])\d{4}$/,
        CO: /^(05|08|11|13|15|17|18|19|20|23|25|27|41|44|47|50|52|54|63|66|68|70|73|76|81|85|86|88|91|94|95|97|99)(\d{4})$/,
        CZ: /^\d{3}\s?\d{2}$/,
        DE: fiveDigit,
        DK: fourDigit,
        DO: fiveDigit,
        DZ: fiveDigit,
        EE: fiveDigit,
        ES: /^(5[0-2]{1}|[0-4]{1}\d{1})\d{3}$/,
        FI: fiveDigit,
        FR: /^(?:(?:0[1-9]|[1-8]\d|9[0-5])\d{3}|97[1-46]\d{2})$/,
        GB: /^(gir\s?0aa|[a-z]{1,2}\d[\da-z]?\s?(\d[a-z]{2})?)$/i,
        GR: /^\d{3}\s?\d{2}$/,
        HR: /^([1-5]\d{4}$)/,
        HT: /^HT\d{4}$/,
        HU: fourDigit,
        ID: fiveDigit,
        IE: /^(?!.*(?:o))[A-Za-z]\d[\dw]\s\w{4}$/i,
        IL: /^(\d{5}|\d{7})$/,
        IN: /^((?!10|29|35|54|55|65|66|86|87|88|89)[1-9][0-9]{5})$/,
        IR: /^(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}$/,
        IS: threeDigit,
        IT: fiveDigit,
        JP: /^\d{3}\-\d{4}$/,
        KE: fiveDigit,
        KR: /^(\d{5}|\d{6})$/,
        LI: /^(948[5-9]|949[0-7])$/,
        LT: /^LT\-\d{5}$/,
        LU: fourDigit,
        LV: /^LV\-\d{4}$/,
        LK: fiveDigit,
        MC: /^980\d{2}$/,
        MG: threeDigit,
        MX: fiveDigit,
        MT: /^[A-Za-z]{3}\s{0,1}\d{4}$/,
        MY: fiveDigit,
        NL: /^[1-9]\d{3}\s?(?!sa|sd|ss)[a-z]{2}$/i,
        NO: fourDigit,
        NP: /^(10|21|22|32|33|34|44|45|56|57)\d{3}$|^(977)$/i,
        NZ: fourDigit,
        // https://www.pakpost.gov.pk/postcodes.php
        PK: fiveDigit,
        PL: /^\d{2}\-\d{3}$/,
        PR: /^00[679]\d{2}([ -]\d{4})?$/,
        PT: /^\d{4}\-\d{3}?$/,
        RO: sixDigit,
        RU: sixDigit,
        SA: fiveDigit,
        SE: /^[1-9]\d{2}\s?\d{2}$/,
        SG: sixDigit,
        SI: fourDigit,
        SK: /^\d{3}\s?\d{2}$/,
        TH: fiveDigit,
        TN: fourDigit,
        TW: /^\d{3}(\d{2,3})?$/,
        UA: fiveDigit,
        US: /^\d{5}(-\d{4})?$/,
        ZA: fourDigit,
        ZM: fiveDigit
      };
      var locales = exports.locales = Object.keys(patterns);
      function isPostalCode(str, locale) {
        (0, _assertString.default)(str);
        if (locale in patterns) {
          return patterns[locale].test(str);
        } else if (locale === "any") {
          for (var key in patterns) {
            if (patterns.hasOwnProperty(key)) {
              var pattern = patterns[key];
              if (pattern.test(str)) {
                return true;
              }
            }
          }
          return false;
        }
        throw new Error("Invalid locale '".concat(locale, "'"));
      }
    }
  });

  // node_modules/validator/lib/escape.js
  var require_escape = __commonJS({
    "node_modules/validator/lib/escape.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = escape;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function escape(str) {
        (0, _assertString.default)(str);
        return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\//g, "&#x2F;").replace(/\\/g, "&#x5C;").replace(/`/g, "&#96;");
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/unescape.js
  var require_unescape = __commonJS({
    "node_modules/validator/lib/unescape.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = unescape;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function unescape(str) {
        (0, _assertString.default)(str);
        return str.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#x2F;/g, "/").replace(/&#x5C;/g, "\\").replace(/&#96;/g, "`").replace(/&amp;/g, "&");
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/blacklist.js
  var require_blacklist = __commonJS({
    "node_modules/validator/lib/blacklist.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = blacklist;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function blacklist(str, chars) {
        (0, _assertString.default)(str);
        return str.replace(new RegExp("[".concat(chars, "]+"), "g"), "");
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/stripLow.js
  var require_stripLow = __commonJS({
    "node_modules/validator/lib/stripLow.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = stripLow;
      var _assertString = _interopRequireDefault(require_assertString());
      var _blacklist = _interopRequireDefault(require_blacklist());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function stripLow(str, keep_new_lines) {
        (0, _assertString.default)(str);
        var chars = keep_new_lines ? "\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F" : "\\x00-\\x1F\\x7F";
        return (0, _blacklist.default)(str, chars);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/whitelist.js
  var require_whitelist = __commonJS({
    "node_modules/validator/lib/whitelist.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = whitelist;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function whitelist(str, chars) {
        (0, _assertString.default)(str);
        return str.replace(new RegExp("[^".concat(chars, "]+"), "g"), "");
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isWhitelisted.js
  var require_isWhitelisted = __commonJS({
    "node_modules/validator/lib/isWhitelisted.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isWhitelisted;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function isWhitelisted(str, chars) {
        (0, _assertString.default)(str);
        for (var i2 = str.length - 1; i2 >= 0; i2--) {
          if (chars.indexOf(str[i2]) === -1) {
            return false;
          }
        }
        return true;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/normalizeEmail.js
  var require_normalizeEmail = __commonJS({
    "node_modules/validator/lib/normalizeEmail.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = normalizeEmail;
      var _merge = _interopRequireDefault(require_merge());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var default_normalize_email_options = {
        // The following options apply to all email addresses
        // Lowercases the local part of the email address.
        // Please note this may violate RFC 5321 as per http://stackoverflow.com/a/9808332/192024).
        // The domain is always lowercased, as per RFC 1035
        all_lowercase: true,
        // The following conversions are specific to GMail
        // Lowercases the local part of the GMail address (known to be case-insensitive)
        gmail_lowercase: true,
        // Removes dots from the local part of the email address, as that's ignored by GMail
        gmail_remove_dots: true,
        // Removes the subaddress (e.g. "+foo") from the email address
        gmail_remove_subaddress: true,
        // Conversts the googlemail.com domain to gmail.com
        gmail_convert_googlemaildotcom: true,
        // The following conversions are specific to Outlook.com / Windows Live / Hotmail
        // Lowercases the local part of the Outlook.com address (known to be case-insensitive)
        outlookdotcom_lowercase: true,
        // Removes the subaddress (e.g. "+foo") from the email address
        outlookdotcom_remove_subaddress: true,
        // The following conversions are specific to Yahoo
        // Lowercases the local part of the Yahoo address (known to be case-insensitive)
        yahoo_lowercase: true,
        // Removes the subaddress (e.g. "-foo") from the email address
        yahoo_remove_subaddress: true,
        // The following conversions are specific to Yandex
        // Lowercases the local part of the Yandex address (known to be case-insensitive)
        yandex_lowercase: true,
        // all yandex domains are equal, this explicitly sets the domain to 'yandex.ru'
        yandex_convert_yandexru: true,
        // The following conversions are specific to iCloud
        // Lowercases the local part of the iCloud address (known to be case-insensitive)
        icloud_lowercase: true,
        // Removes the subaddress (e.g. "+foo") from the email address
        icloud_remove_subaddress: true
      };
      var icloud_domains = ["icloud.com", "me.com"];
      var outlookdotcom_domains = ["hotmail.at", "hotmail.be", "hotmail.ca", "hotmail.cl", "hotmail.co.il", "hotmail.co.nz", "hotmail.co.th", "hotmail.co.uk", "hotmail.com", "hotmail.com.ar", "hotmail.com.au", "hotmail.com.br", "hotmail.com.gr", "hotmail.com.mx", "hotmail.com.pe", "hotmail.com.tr", "hotmail.com.vn", "hotmail.cz", "hotmail.de", "hotmail.dk", "hotmail.es", "hotmail.fr", "hotmail.hu", "hotmail.id", "hotmail.ie", "hotmail.in", "hotmail.it", "hotmail.jp", "hotmail.kr", "hotmail.lv", "hotmail.my", "hotmail.ph", "hotmail.pt", "hotmail.sa", "hotmail.sg", "hotmail.sk", "live.be", "live.co.uk", "live.com", "live.com.ar", "live.com.mx", "live.de", "live.es", "live.eu", "live.fr", "live.it", "live.nl", "msn.com", "outlook.at", "outlook.be", "outlook.cl", "outlook.co.il", "outlook.co.nz", "outlook.co.th", "outlook.com", "outlook.com.ar", "outlook.com.au", "outlook.com.br", "outlook.com.gr", "outlook.com.pe", "outlook.com.tr", "outlook.com.vn", "outlook.cz", "outlook.de", "outlook.dk", "outlook.es", "outlook.fr", "outlook.hu", "outlook.id", "outlook.ie", "outlook.in", "outlook.it", "outlook.jp", "outlook.kr", "outlook.lv", "outlook.my", "outlook.ph", "outlook.pt", "outlook.sa", "outlook.sg", "outlook.sk", "passport.com"];
      var yahoo_domains = ["rocketmail.com", "yahoo.ca", "yahoo.co.uk", "yahoo.com", "yahoo.de", "yahoo.fr", "yahoo.in", "yahoo.it", "ymail.com"];
      var yandex_domains = ["yandex.ru", "yandex.ua", "yandex.kz", "yandex.com", "yandex.by", "ya.ru"];
      function dotsReplacer(match) {
        if (match.length > 1) {
          return match;
        }
        return "";
      }
      function normalizeEmail(email, options) {
        options = (0, _merge.default)(options, default_normalize_email_options);
        var raw_parts = email.split("@");
        var domain = raw_parts.pop();
        var user = raw_parts.join("@");
        var parts = [user, domain];
        parts[1] = parts[1].toLowerCase();
        if (parts[1] === "gmail.com" || parts[1] === "googlemail.com") {
          if (options.gmail_remove_subaddress) {
            parts[0] = parts[0].split("+")[0];
          }
          if (options.gmail_remove_dots) {
            parts[0] = parts[0].replace(/\.+/g, dotsReplacer);
          }
          if (!parts[0].length) {
            return false;
          }
          if (options.all_lowercase || options.gmail_lowercase) {
            parts[0] = parts[0].toLowerCase();
          }
          parts[1] = options.gmail_convert_googlemaildotcom ? "gmail.com" : parts[1];
        } else if (icloud_domains.indexOf(parts[1]) >= 0) {
          if (options.icloud_remove_subaddress) {
            parts[0] = parts[0].split("+")[0];
          }
          if (!parts[0].length) {
            return false;
          }
          if (options.all_lowercase || options.icloud_lowercase) {
            parts[0] = parts[0].toLowerCase();
          }
        } else if (outlookdotcom_domains.indexOf(parts[1]) >= 0) {
          if (options.outlookdotcom_remove_subaddress) {
            parts[0] = parts[0].split("+")[0];
          }
          if (!parts[0].length) {
            return false;
          }
          if (options.all_lowercase || options.outlookdotcom_lowercase) {
            parts[0] = parts[0].toLowerCase();
          }
        } else if (yahoo_domains.indexOf(parts[1]) >= 0) {
          if (options.yahoo_remove_subaddress) {
            var components = parts[0].split("-");
            parts[0] = components.length > 1 ? components.slice(0, -1).join("-") : components[0];
          }
          if (!parts[0].length) {
            return false;
          }
          if (options.all_lowercase || options.yahoo_lowercase) {
            parts[0] = parts[0].toLowerCase();
          }
        } else if (yandex_domains.indexOf(parts[1]) >= 0) {
          if (options.all_lowercase || options.yandex_lowercase) {
            parts[0] = parts[0].toLowerCase();
          }
          parts[1] = options.yandex_convert_yandexru ? "yandex.ru" : parts[1];
        } else if (options.all_lowercase) {
          parts[0] = parts[0].toLowerCase();
        }
        return parts.join("@");
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isSlug.js
  var require_isSlug = __commonJS({
    "node_modules/validator/lib/isSlug.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isSlug;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var charsetRegex = /^[a-z0-9](?!.*[-_]{2,})(?:[a-z0-9_-]*[a-z0-9])?$/;
      function isSlug(str) {
        (0, _assertString.default)(str);
        return charsetRegex.test(str);
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isLicensePlate.js
  var require_isLicensePlate = __commonJS({
    "node_modules/validator/lib/isLicensePlate.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isLicensePlate;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var validators = {
        "cs-CZ": function csCZ(str) {
          return /^(([ABCDEFHIJKLMNPRSTUVXYZ]|[0-9])-?){5,8}$/.test(str);
        },
        "de-DE": function deDE(str) {
          return /^((A|AA|AB|AC|AE|AH|AK|AM|AN|AÖ|AP|AS|AT|AU|AW|AZ|B|BA|BB|BC|BE|BF|BH|BI|BK|BL|BM|BN|BO|BÖ|BS|BT|BZ|C|CA|CB|CE|CO|CR|CW|D|DA|DD|DE|DH|DI|DL|DM|DN|DO|DU|DW|DZ|E|EA|EB|ED|EE|EF|EG|EH|EI|EL|EM|EN|ER|ES|EU|EW|F|FB|FD|FF|FG|FI|FL|FN|FO|FR|FS|FT|FÜ|FW|FZ|G|GA|GC|GD|GE|GF|GG|GI|GK|GL|GM|GN|GÖ|GP|GR|GS|GT|GÜ|GV|GW|GZ|H|HA|HB|HC|HD|HE|HF|HG|HH|HI|HK|HL|HM|HN|HO|HP|HR|HS|HU|HV|HX|HY|HZ|IK|IL|IN|IZ|J|JE|JL|K|KA|KB|KC|KE|KF|KG|KH|KI|KK|KL|KM|KN|KO|KR|KS|KT|KU|KW|KY|L|LA|LB|LC|LD|LF|LG|LH|LI|LL|LM|LN|LÖ|LP|LR|LU|M|MA|MB|MC|MD|ME|MG|MH|MI|MK|ML|MM|MN|MO|MQ|MR|MS|MÜ|MW|MY|MZ|N|NB|ND|NE|NF|NH|NI|NK|NM|NÖ|NP|NR|NT|NU|NW|NY|NZ|OA|OB|OC|OD|OE|OF|OG|OH|OK|OL|OP|OS|OZ|P|PA|PB|PE|PF|PI|PL|PM|PN|PR|PS|PW|PZ|R|RA|RC|RD|RE|RG|RH|RI|RL|RM|RN|RO|RP|RS|RT|RU|RV|RW|RZ|S|SB|SC|SE|SG|SI|SK|SL|SM|SN|SO|SP|SR|ST|SU|SW|SY|SZ|TE|TF|TG|TO|TP|TR|TS|TT|TÜ|ÜB|UE|UH|UL|UM|UN|V|VB|VG|VK|VR|VS|W|WA|WB|WE|WF|WI|WK|WL|WM|WN|WO|WR|WS|WT|WÜ|WW|WZ|Z|ZE|ZI|ZP|ZR|ZW|ZZ)[- ]?[A-Z]{1,2}[- ]?\d{1,4}|(ABG|ABI|AIB|AIC|ALF|ALZ|ANA|ANG|ANK|APD|ARN|ART|ASL|ASZ|AUR|AZE|BAD|BAR|BBG|BCH|BED|BER|BGD|BGL|BID|BIN|BIR|BIT|BIW|BKS|BLB|BLK|BNA|BOG|BOH|BOR|BOT|BRA|BRB|BRG|BRK|BRL|BRV|BSB|BSK|BTF|BÜD|BUL|BÜR|BÜS|BÜZ|CAS|CHA|CLP|CLZ|COC|COE|CUX|DAH|DAN|DAU|DBR|DEG|DEL|DGF|DIL|DIN|DIZ|DKB|DLG|DON|DUD|DÜW|EBE|EBN|EBS|ECK|EIC|EIL|EIN|EIS|EMD|EMS|ERB|ERH|ERK|ERZ|ESB|ESW|FDB|FDS|FEU|FFB|FKB|FLÖ|FOR|FRG|FRI|FRW|FTL|FÜS|GAN|GAP|GDB|GEL|GEO|GER|GHA|GHC|GLA|GMN|GNT|GOA|GOH|GRA|GRH|GRI|GRM|GRZ|GTH|GUB|GUN|GVM|HAB|HAL|HAM|HAS|HBN|HBS|HCH|HDH|HDL|HEB|HEF|HEI|HER|HET|HGN|HGW|HHM|HIG|HIP|HMÜ|HOG|HOH|HOL|HOM|HOR|HÖS|HOT|HRO|HSK|HST|HVL|HWI|IGB|ILL|JÜL|KEH|KEL|KEM|KIB|KLE|KLZ|KÖN|KÖT|KÖZ|KRU|KÜN|KUS|KYF|LAN|LAU|LBS|LBZ|LDK|LDS|LEO|LER|LEV|LIB|LIF|LIP|LÖB|LOS|LRO|LSZ|LÜN|LUP|LWL|MAB|MAI|MAK|MAL|MED|MEG|MEI|MEK|MEL|MER|MET|MGH|MGN|MHL|MIL|MKK|MOD|MOL|MON|MOS|MSE|MSH|MSP|MST|MTK|MTL|MÜB|MÜR|MYK|MZG|NAB|NAI|NAU|NDH|NEA|NEB|NEC|NEN|NES|NEW|NMB|NMS|NOH|NOL|NOM|NOR|NVP|NWM|OAL|OBB|OBG|OCH|OHA|ÖHR|OHV|OHZ|OPR|OSL|OVI|OVL|OVP|PAF|PAN|PAR|PCH|PEG|PIR|PLÖ|PRÜ|QFT|QLB|RDG|REG|REH|REI|RID|RIE|ROD|ROF|ROK|ROL|ROS|ROT|ROW|RSL|RÜD|RÜG|SAB|SAD|SAN|SAW|SBG|SBK|SCZ|SDH|SDL|SDT|SEB|SEE|SEF|SEL|SFB|SFT|SGH|SHA|SHG|SHK|SHL|SIG|SIM|SLE|SLF|SLK|SLN|SLS|SLÜ|SLZ|SMÜ|SOB|SOG|SOK|SÖM|SON|SPB|SPN|SRB|SRO|STA|STB|STD|STE|STL|SUL|SÜW|SWA|SZB|TBB|TDO|TET|TIR|TÖL|TUT|UEM|UER|UFF|USI|VAI|VEC|VER|VIB|VIE|VIT|VOH|WAF|WAK|WAN|WAR|WAT|WBS|WDA|WEL|WEN|WER|WES|WHV|WIL|WIS|WIT|WIZ|WLG|WMS|WND|WOB|WOH|WOL|WOR|WOS|WRN|WSF|WST|WSW|WTL|WTM|WUG|WÜM|WUN|WUR|WZL|ZEL|ZIG)[- ]?(([A-Z][- ]?\d{1,4})|([A-Z]{2}[- ]?\d{1,3})))[- ]?(E|H)?$/.test(str);
        },
        "de-LI": function deLI(str) {
          return /^FL[- ]?\d{1,5}[UZ]?$/.test(str);
        },
        "en-IN": function enIN(str) {
          return /^[A-Z]{2}[ -]?[0-9]{1,2}(?:[ -]?[A-Z])(?:[ -]?[A-Z]*)?[ -]?[0-9]{4}$/.test(str);
        },
        "en-SG": function enSG(str) {
          return /^[A-Z]{3}[ -]?[\d]{4}[ -]?[A-Z]{1}$/.test(str);
        },
        "es-AR": function esAR(str) {
          return /^(([A-Z]{2} ?[0-9]{3} ?[A-Z]{2})|([A-Z]{3} ?[0-9]{3}))$/.test(str);
        },
        "fi-FI": function fiFI(str) {
          return /^(?=.{4,7})(([A-Z]{1,3}|[0-9]{1,3})[\s-]?([A-Z]{1,3}|[0-9]{1,5}))$/.test(str);
        },
        "hu-HU": function huHU(str) {
          return /^((((?!AAA)(([A-NPRSTVZWXY]{1})([A-PR-Z]{1})([A-HJ-NPR-Z]))|(A[ABC]I)|A[ABC]O|A[A-W]Q|BPI|BPO|UCO|UDO|XAO)-(?!000)\d{3})|(M\d{6})|((CK|DT|CD|HC|H[ABEFIKLMNPRSTVX]|MA|OT|R[A-Z]) \d{2}-\d{2})|(CD \d{3}-\d{3})|(C-(C|X) \d{4})|(X-(A|B|C) \d{4})|(([EPVZ]-\d{5}))|(S A[A-Z]{2} \d{2})|(SP \d{2}-\d{2}))$/.test(str);
        },
        "pt-BR": function ptBR(str) {
          return /^[A-Z]{3}[ -]?[0-9][A-Z][0-9]{2}|[A-Z]{3}[ -]?[0-9]{4}$/.test(str);
        },
        "pt-PT": function ptPT(str) {
          return /^(([A-Z]{2}[ -·]?[0-9]{2}[ -·]?[0-9]{2})|([0-9]{2}[ -·]?[A-Z]{2}[ -·]?[0-9]{2})|([0-9]{2}[ -·]?[0-9]{2}[ -·]?[A-Z]{2})|([A-Z]{2}[ -·]?[0-9]{2}[ -·]?[A-Z]{2}))$/.test(str);
        },
        "sq-AL": function sqAL(str) {
          return /^[A-Z]{2}[- ]?((\d{3}[- ]?(([A-Z]{2})|T))|(R[- ]?\d{3}))$/.test(str);
        },
        "sv-SE": function svSE(str) {
          return /^[A-HJ-PR-UW-Z]{3} ?[\d]{2}[A-HJ-PR-UW-Z1-9]$|(^[A-ZÅÄÖ ]{2,7}$)/.test(str.trim());
        },
        "en-PK": function enPK(str) {
          return /(^[A-Z]{2}((\s|-){0,1})[0-9]{3,4}((\s|-)[0-9]{2}){0,1}$)|(^[A-Z]{3}((\s|-){0,1})[0-9]{3,4}((\s|-)[0-9]{2}){0,1}$)|(^[A-Z]{4}((\s|-){0,1})[0-9]{3,4}((\s|-)[0-9]{2}){0,1}$)|(^[A-Z]((\s|-){0,1})[0-9]{4}((\s|-)[0-9]{2}){0,1}$)/.test(str.trim());
        }
      };
      function isLicensePlate(str, locale) {
        (0, _assertString.default)(str);
        if (locale in validators) {
          return validators[locale](str);
        } else if (locale === "any") {
          for (var key in validators) {
            var validator2 = validators[key];
            if (validator2(str)) {
              return true;
            }
          }
          return false;
        }
        throw new Error("Invalid locale '".concat(locale, "'"));
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isStrongPassword.js
  var require_isStrongPassword = __commonJS({
    "node_modules/validator/lib/isStrongPassword.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isStrongPassword;
      var _merge = _interopRequireDefault(require_merge());
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var upperCaseRegex = /^[A-Z]$/;
      var lowerCaseRegex = /^[a-z]$/;
      var numberRegex = /^[0-9]$/;
      var symbolRegex = /^[-#!$@£%^&*()_+|~=`{}\[\]:";'<>?,.\/\\ ]$/;
      var defaultOptions = {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10
      };
      function countChars(str) {
        var result = {};
        Array.from(str).forEach(function(char) {
          var curVal = result[char];
          if (curVal) {
            result[char] += 1;
          } else {
            result[char] = 1;
          }
        });
        return result;
      }
      function analyzePassword(password) {
        var charMap = countChars(password);
        var analysis = {
          length: password.length,
          uniqueChars: Object.keys(charMap).length,
          uppercaseCount: 0,
          lowercaseCount: 0,
          numberCount: 0,
          symbolCount: 0
        };
        Object.keys(charMap).forEach(function(char) {
          if (upperCaseRegex.test(char)) {
            analysis.uppercaseCount += charMap[char];
          } else if (lowerCaseRegex.test(char)) {
            analysis.lowercaseCount += charMap[char];
          } else if (numberRegex.test(char)) {
            analysis.numberCount += charMap[char];
          } else if (symbolRegex.test(char)) {
            analysis.symbolCount += charMap[char];
          }
        });
        return analysis;
      }
      function scorePassword(analysis, scoringOptions) {
        var points = 0;
        points += analysis.uniqueChars * scoringOptions.pointsPerUnique;
        points += (analysis.length - analysis.uniqueChars) * scoringOptions.pointsPerRepeat;
        if (analysis.lowercaseCount > 0) {
          points += scoringOptions.pointsForContainingLower;
        }
        if (analysis.uppercaseCount > 0) {
          points += scoringOptions.pointsForContainingUpper;
        }
        if (analysis.numberCount > 0) {
          points += scoringOptions.pointsForContainingNumber;
        }
        if (analysis.symbolCount > 0) {
          points += scoringOptions.pointsForContainingSymbol;
        }
        return points;
      }
      function isStrongPassword(str) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        (0, _assertString.default)(str);
        var analysis = analyzePassword(str);
        options = (0, _merge.default)(options || {}, defaultOptions);
        if (options.returnScore) {
          return scorePassword(analysis, options);
        }
        return analysis.length >= options.minLength && analysis.lowercaseCount >= options.minLowercase && analysis.uppercaseCount >= options.minUppercase && analysis.numberCount >= options.minNumbers && analysis.symbolCount >= options.minSymbols;
      }
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/validator/lib/isVAT.js
  var require_isVAT = __commonJS({
    "node_modules/validator/lib/isVAT.js"(exports) {
      "use strict";
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isVAT;
      exports.vatMatchers = void 0;
      var _assertString = _interopRequireDefault(require_assertString());
      var algorithms = _interopRequireWildcard(require_algorithms());
      function _interopRequireWildcard(e, t) {
        if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
        return (_interopRequireWildcard = function _interopRequireWildcard2(e2, t2) {
          if (!t2 && e2 && e2.__esModule) return e2;
          var o, i2, f = { __proto__: null, default: e2 };
          if (null === e2 || "object" != _typeof(e2) && "function" != typeof e2) return f;
          if (o = t2 ? n : r) {
            if (o.has(e2)) return o.get(e2);
            o.set(e2, f);
          }
          for (var _t in e2) "default" !== _t && {}.hasOwnProperty.call(e2, _t) && ((i2 = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, _t)) && (i2.get || i2.set) ? o(f, _t, i2) : f[_t] = e2[_t]);
          return f;
        })(e, t);
      }
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var AU = function AU2(str) {
        var match = str.match(/^(AU)?(\d{11})$/);
        if (!match) {
          return false;
        }
        var weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
        str = str.replace(/^AU/, "");
        var ABN = (parseInt(str.slice(0, 1), 10) - 1).toString() + str.slice(1);
        var total = 0;
        for (var i2 = 0; i2 < 11; i2++) {
          total += weights[i2] * ABN.charAt(i2);
        }
        return total !== 0 && total % 89 === 0;
      };
      var CH = function CH2(str) {
        var hasValidCheckNumber = function hasValidCheckNumber2(digits) {
          var lastDigit = digits.pop();
          var weights = [5, 4, 3, 2, 7, 6, 5, 4];
          var calculatedCheckNumber = (11 - digits.reduce(function(acc, el, idx) {
            return acc + el * weights[idx];
          }, 0) % 11) % 11;
          return lastDigit === calculatedCheckNumber;
        };
        return /^(CHE[- ]?)?(\d{9}|(\d{3}\.\d{3}\.\d{3})|(\d{3} \d{3} \d{3})) ?(TVA|MWST|IVA)?$/.test(str) && hasValidCheckNumber(str.match(/\d/g).map(function(el) {
          return +el;
        }));
      };
      var PT = function PT2(str) {
        var match = str.match(/^(PT)?(\d{9})$/);
        if (!match) {
          return false;
        }
        var tin = match[2];
        var checksum = 11 - algorithms.reverseMultiplyAndSum(tin.split("").slice(0, 8).map(function(a2) {
          return parseInt(a2, 10);
        }), 9) % 11;
        if (checksum > 9) {
          return parseInt(tin[8], 10) === 0;
        }
        return checksum === parseInt(tin[8], 10);
      };
      var vatMatchers = exports.vatMatchers = {
        /**
         * European Union VAT identification numbers
         */
        AT: function AT(str) {
          return /^(AT)?U\d{8}$/.test(str);
        },
        BE: function BE(str) {
          return /^(BE)?\d{10}$/.test(str);
        },
        BG: function BG(str) {
          return /^(BG)?\d{9,10}$/.test(str);
        },
        HR: function HR(str) {
          return /^(HR)?\d{11}$/.test(str);
        },
        CY: function CY(str) {
          return /^(CY)?\w{9}$/.test(str);
        },
        CZ: function CZ(str) {
          return /^(CZ)?\d{8,10}$/.test(str);
        },
        DK: function DK(str) {
          return /^(DK)?\d{8}$/.test(str);
        },
        EE: function EE(str) {
          return /^(EE)?\d{9}$/.test(str);
        },
        FI: function FI(str) {
          return /^(FI)?\d{8}$/.test(str);
        },
        FR: function FR(str) {
          return /^(FR)([A-Z0-9]{2}\d{9})$/.test(str);
        },
        DE: function DE(str) {
          return /^(DE)?\d{9}$/.test(str);
        },
        EL: function EL(str) {
          return /^(EL)?\d{9}$/.test(str);
        },
        HU: function HU(str) {
          return /^(HU)?\d{8}$/.test(str);
        },
        IE: function IE(str) {
          return /^(IE)?\d{7}\w{1}(W)?$/.test(str);
        },
        IT: function IT(str) {
          return /^(IT)?\d{11}$/.test(str);
        },
        LV: function LV(str) {
          return /^(LV)?\d{11}$/.test(str);
        },
        LT: function LT(str) {
          return /^(LT)?\d{9,12}$/.test(str);
        },
        LU: function LU(str) {
          return /^(LU)?\d{8}$/.test(str);
        },
        MT: function MT(str) {
          return /^(MT)?\d{8}$/.test(str);
        },
        NL: function NL(str) {
          return /^(NL)?\d{9}B\d{2}$/.test(str);
        },
        PL: function PL(str) {
          return /^(PL)?(\d{10}|(\d{3}-\d{3}-\d{2}-\d{2})|(\d{3}-\d{2}-\d{2}-\d{3}))$/.test(str);
        },
        PT,
        RO: function RO(str) {
          return /^(RO)?\d{2,10}$/.test(str);
        },
        SK: function SK(str) {
          return /^(SK)?\d{10}$/.test(str);
        },
        SI: function SI(str) {
          return /^(SI)?\d{8}$/.test(str);
        },
        ES: function ES(str) {
          return /^(ES)?\w\d{7}[A-Z]$/.test(str);
        },
        SE: function SE(str) {
          return /^(SE)?\d{12}$/.test(str);
        },
        /**
         * VAT numbers of non-EU countries
         */
        AL: function AL(str) {
          return /^(AL)?\w{9}[A-Z]$/.test(str);
        },
        MK: function MK(str) {
          return /^(MK)?\d{13}$/.test(str);
        },
        AU,
        BY: function BY(str) {
          return /^(УНП )?\d{9}$/.test(str);
        },
        CA: function CA(str) {
          return /^(CA)?\d{9}$/.test(str);
        },
        IS: function IS(str) {
          return /^(IS)?\d{5,6}$/.test(str);
        },
        IN: function IN(str) {
          return /^(IN)?\d{15}$/.test(str);
        },
        ID: function ID(str) {
          return /^(ID)?(\d{15}|(\d{2}.\d{3}.\d{3}.\d{1}-\d{3}.\d{3}))$/.test(str);
        },
        IL: function IL(str) {
          return /^(IL)?\d{9}$/.test(str);
        },
        KZ: function KZ(str) {
          return /^(KZ)?\d{12}$/.test(str);
        },
        NZ: function NZ(str) {
          return /^(NZ)?\d{9}$/.test(str);
        },
        NG: function NG(str) {
          return /^(NG)?(\d{12}|(\d{8}-\d{4}))$/.test(str);
        },
        NO: function NO(str) {
          return /^(NO)?\d{9}MVA$/.test(str);
        },
        PH: function PH(str) {
          return /^(PH)?(\d{12}|\d{3} \d{3} \d{3} \d{3})$/.test(str);
        },
        RU: function RU(str) {
          return /^(RU)?(\d{10}|\d{12})$/.test(str);
        },
        SM: function SM(str) {
          return /^(SM)?\d{5}$/.test(str);
        },
        SA: function SA(str) {
          return /^(SA)?\d{15}$/.test(str);
        },
        RS: function RS(str) {
          return /^(RS)?\d{9}$/.test(str);
        },
        CH,
        TR: function TR(str) {
          return /^(TR)?\d{10}$/.test(str);
        },
        UA: function UA(str) {
          return /^(UA)?\d{12}$/.test(str);
        },
        GB: function GB(str) {
          return /^GB((\d{3} \d{4} ([0-8][0-9]|9[0-6]))|(\d{9} \d{3})|(((GD[0-4])|(HA[5-9]))[0-9]{2}))$/.test(str);
        },
        UZ: function UZ(str) {
          return /^(UZ)?\d{9}$/.test(str);
        },
        /**
         * VAT numbers of Latin American countries
         */
        AR: function AR(str) {
          return /^(AR)?\d{11}$/.test(str);
        },
        BO: function BO(str) {
          return /^(BO)?\d{7}$/.test(str);
        },
        BR: function BR(str) {
          return /^(BR)?((\d{2}.\d{3}.\d{3}\/\d{4}-\d{2})|(\d{3}.\d{3}.\d{3}-\d{2}))$/.test(str);
        },
        CL: function CL(str) {
          return /^(CL)?\d{8}-\d{1}$/.test(str);
        },
        CO: function CO(str) {
          return /^(CO)?\d{10}$/.test(str);
        },
        CR: function CR(str) {
          return /^(CR)?\d{9,12}$/.test(str);
        },
        EC: function EC(str) {
          return /^(EC)?\d{13}$/.test(str);
        },
        SV: function SV(str) {
          return /^(SV)?\d{4}-\d{6}-\d{3}-\d{1}$/.test(str);
        },
        GT: function GT(str) {
          return /^(GT)?\d{7}-\d{1}$/.test(str);
        },
        HN: function HN(str) {
          return /^(HN)?$/.test(str);
        },
        MX: function MX(str) {
          return /^(MX)?\w{3,4}\d{6}\w{3}$/.test(str);
        },
        NI: function NI(str) {
          return /^(NI)?\d{3}-\d{6}-\d{4}\w{1}$/.test(str);
        },
        PA: function PA(str) {
          return /^(PA)?$/.test(str);
        },
        PY: function PY(str) {
          return /^(PY)?\d{6,8}-\d{1}$/.test(str);
        },
        PE: function PE(str) {
          return /^(PE)?\d{11}$/.test(str);
        },
        DO: function DO(str) {
          return /^(DO)?(\d{11}|(\d{3}-\d{7}-\d{1})|[1,4,5]{1}\d{8}|([1,4,5]{1})-\d{2}-\d{5}-\d{1})$/.test(str);
        },
        UY: function UY(str) {
          return /^(UY)?\d{12}$/.test(str);
        },
        VE: function VE(str) {
          return /^(VE)?[J,G,V,E]{1}-(\d{9}|(\d{8}-\d{1}))$/.test(str);
        }
      };
      function isVAT(str, countryCode) {
        (0, _assertString.default)(str);
        (0, _assertString.default)(countryCode);
        if (countryCode in vatMatchers) {
          return vatMatchers[countryCode](str);
        }
        throw new Error("Invalid country code: '".concat(countryCode, "'"));
      }
    }
  });

  // node_modules/validator/index.js
  var require_validator = __commonJS({
    "node_modules/validator/index.js"(exports, module) {
      "use strict";
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _toDate = _interopRequireDefault(require_toDate());
      var _toFloat = _interopRequireDefault(require_toFloat());
      var _toInt = _interopRequireDefault(require_toInt());
      var _toBoolean = _interopRequireDefault(require_toBoolean());
      var _equals = _interopRequireDefault(require_equals());
      var _contains = _interopRequireDefault(require_contains());
      var _matches = _interopRequireDefault(require_matches());
      var _isEmail = _interopRequireDefault(require_isEmail());
      var _isURL = _interopRequireDefault(require_isURL());
      var _isMACAddress = _interopRequireDefault(require_isMACAddress());
      var _isIP = _interopRequireDefault(require_isIP());
      var _isIPRange = _interopRequireDefault(require_isIPRange());
      var _isFQDN = _interopRequireDefault(require_isFQDN());
      var _isDate = _interopRequireDefault(require_isDate());
      var _isTime = _interopRequireDefault(require_isTime());
      var _isBoolean = _interopRequireDefault(require_isBoolean());
      var _isLocale = _interopRequireDefault(require_isLocale());
      var _isAbaRouting = _interopRequireDefault(require_isAbaRouting());
      var _isAlpha = _interopRequireWildcard(require_isAlpha());
      var _isAlphanumeric = _interopRequireWildcard(require_isAlphanumeric());
      var _isNumeric = _interopRequireDefault(require_isNumeric());
      var _isPassportNumber = _interopRequireWildcard(require_isPassportNumber());
      var _isPort = _interopRequireDefault(require_isPort());
      var _isLowercase = _interopRequireDefault(require_isLowercase());
      var _isUppercase = _interopRequireDefault(require_isUppercase());
      var _isIMEI = _interopRequireDefault(require_isIMEI());
      var _isAscii = _interopRequireDefault(require_isAscii());
      var _isFullWidth = _interopRequireDefault(require_isFullWidth());
      var _isHalfWidth = _interopRequireDefault(require_isHalfWidth());
      var _isVariableWidth = _interopRequireDefault(require_isVariableWidth());
      var _isMultibyte = _interopRequireDefault(require_isMultibyte());
      var _isSemVer = _interopRequireDefault(require_isSemVer());
      var _isSurrogatePair = _interopRequireDefault(require_isSurrogatePair());
      var _isInt = _interopRequireDefault(require_isInt());
      var _isFloat = _interopRequireWildcard(require_isFloat());
      var _isDecimal = _interopRequireDefault(require_isDecimal());
      var _isHexadecimal = _interopRequireDefault(require_isHexadecimal());
      var _isOctal = _interopRequireDefault(require_isOctal());
      var _isDivisibleBy = _interopRequireDefault(require_isDivisibleBy());
      var _isHexColor = _interopRequireDefault(require_isHexColor());
      var _isRgbColor = _interopRequireDefault(require_isRgbColor());
      var _isHSL = _interopRequireDefault(require_isHSL());
      var _isISRC = _interopRequireDefault(require_isISRC());
      var _isIBAN = _interopRequireWildcard(require_isIBAN());
      var _isBIC = _interopRequireDefault(require_isBIC());
      var _isMD = _interopRequireDefault(require_isMD5());
      var _isHash = _interopRequireDefault(require_isHash());
      var _isJWT = _interopRequireDefault(require_isJWT());
      var _isJSON = _interopRequireDefault(require_isJSON());
      var _isEmpty = _interopRequireDefault(require_isEmpty());
      var _isLength = _interopRequireDefault(require_isLength());
      var _isByteLength = _interopRequireDefault(require_isByteLength());
      var _isULID = _interopRequireDefault(require_isULID());
      var _isUUID = _interopRequireDefault(require_isUUID());
      var _isMongoId = _interopRequireDefault(require_isMongoId());
      var _isAfter = _interopRequireDefault(require_isAfter());
      var _isBefore = _interopRequireDefault(require_isBefore());
      var _isIn = _interopRequireDefault(require_isIn());
      var _isLuhnNumber = _interopRequireDefault(require_isLuhnNumber());
      var _isCreditCard = _interopRequireDefault(require_isCreditCard());
      var _isIdentityCard = _interopRequireDefault(require_isIdentityCard());
      var _isEAN = _interopRequireDefault(require_isEAN());
      var _isISIN = _interopRequireDefault(require_isISIN());
      var _isISBN = _interopRequireDefault(require_isISBN());
      var _isISSN = _interopRequireDefault(require_isISSN());
      var _isTaxID = _interopRequireDefault(require_isTaxID());
      var _isMobilePhone = _interopRequireWildcard(require_isMobilePhone());
      var _isEthereumAddress = _interopRequireDefault(require_isEthereumAddress());
      var _isCurrency = _interopRequireDefault(require_isCurrency());
      var _isBtcAddress = _interopRequireDefault(require_isBtcAddress());
      var _isISO = require_isISO6346();
      var _isISO2 = _interopRequireDefault(require_isISO6391());
      var _isISO3 = _interopRequireDefault(require_isISO8601());
      var _isRFC = _interopRequireDefault(require_isRFC3339());
      var _isISO4 = _interopRequireDefault(require_isISO15924());
      var _isISO31661Alpha = _interopRequireDefault(require_isISO31661Alpha2());
      var _isISO31661Alpha2 = _interopRequireDefault(require_isISO31661Alpha3());
      var _isISO31661Numeric = _interopRequireDefault(require_isISO31661Numeric());
      var _isISO5 = _interopRequireDefault(require_isISO4217());
      var _isBase = _interopRequireDefault(require_isBase32());
      var _isBase2 = _interopRequireDefault(require_isBase58());
      var _isBase3 = _interopRequireDefault(require_isBase64());
      var _isDataURI = _interopRequireDefault(require_isDataURI());
      var _isMagnetURI = _interopRequireDefault(require_isMagnetURI());
      var _isMailtoURI = _interopRequireDefault(require_isMailtoURI());
      var _isMimeType = _interopRequireDefault(require_isMimeType());
      var _isLatLong = _interopRequireDefault(require_isLatLong());
      var _isPostalCode = _interopRequireWildcard(require_isPostalCode());
      var _ltrim = _interopRequireDefault(require_ltrim());
      var _rtrim = _interopRequireDefault(require_rtrim());
      var _trim = _interopRequireDefault(require_trim());
      var _escape = _interopRequireDefault(require_escape());
      var _unescape = _interopRequireDefault(require_unescape());
      var _stripLow = _interopRequireDefault(require_stripLow());
      var _whitelist = _interopRequireDefault(require_whitelist());
      var _blacklist = _interopRequireDefault(require_blacklist());
      var _isWhitelisted = _interopRequireDefault(require_isWhitelisted());
      var _normalizeEmail = _interopRequireDefault(require_normalizeEmail());
      var _isSlug = _interopRequireDefault(require_isSlug());
      var _isLicensePlate = _interopRequireDefault(require_isLicensePlate());
      var _isStrongPassword = _interopRequireDefault(require_isStrongPassword());
      var _isVAT = _interopRequireDefault(require_isVAT());
      function _interopRequireWildcard(e, t) {
        if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
        return (_interopRequireWildcard = function _interopRequireWildcard2(e2, t2) {
          if (!t2 && e2 && e2.__esModule) return e2;
          var o, i2, f = { __proto__: null, default: e2 };
          if (null === e2 || "object" != _typeof(e2) && "function" != typeof e2) return f;
          if (o = t2 ? n : r) {
            if (o.has(e2)) return o.get(e2);
            o.set(e2, f);
          }
          for (var _t in e2) "default" !== _t && {}.hasOwnProperty.call(e2, _t) && ((i2 = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, _t)) && (i2.get || i2.set) ? o(f, _t, i2) : f[_t] = e2[_t]);
          return f;
        })(e, t);
      }
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var version = "13.15.35";
      var validator2 = {
        version,
        toDate: _toDate.default,
        toFloat: _toFloat.default,
        toInt: _toInt.default,
        toBoolean: _toBoolean.default,
        equals: _equals.default,
        contains: _contains.default,
        matches: _matches.default,
        isEmail: _isEmail.default,
        isURL: _isURL.default,
        isMACAddress: _isMACAddress.default,
        isIP: _isIP.default,
        isIPRange: _isIPRange.default,
        isFQDN: _isFQDN.default,
        isBoolean: _isBoolean.default,
        isIBAN: _isIBAN.default,
        isBIC: _isBIC.default,
        isAbaRouting: _isAbaRouting.default,
        isAlpha: _isAlpha.default,
        isAlphaLocales: _isAlpha.locales,
        isAlphanumeric: _isAlphanumeric.default,
        isAlphanumericLocales: _isAlphanumeric.locales,
        isNumeric: _isNumeric.default,
        isPassportNumber: _isPassportNumber.default,
        passportNumberLocales: _isPassportNumber.locales,
        isPort: _isPort.default,
        isLowercase: _isLowercase.default,
        isUppercase: _isUppercase.default,
        isAscii: _isAscii.default,
        isFullWidth: _isFullWidth.default,
        isHalfWidth: _isHalfWidth.default,
        isVariableWidth: _isVariableWidth.default,
        isMultibyte: _isMultibyte.default,
        isSemVer: _isSemVer.default,
        isSurrogatePair: _isSurrogatePair.default,
        isInt: _isInt.default,
        isIMEI: _isIMEI.default,
        isFloat: _isFloat.default,
        isFloatLocales: _isFloat.locales,
        isDecimal: _isDecimal.default,
        isHexadecimal: _isHexadecimal.default,
        isOctal: _isOctal.default,
        isDivisibleBy: _isDivisibleBy.default,
        isHexColor: _isHexColor.default,
        isRgbColor: _isRgbColor.default,
        isHSL: _isHSL.default,
        isISRC: _isISRC.default,
        isMD5: _isMD.default,
        isHash: _isHash.default,
        isJWT: _isJWT.default,
        isJSON: _isJSON.default,
        isEmpty: _isEmpty.default,
        isLength: _isLength.default,
        isLocale: _isLocale.default,
        isByteLength: _isByteLength.default,
        isULID: _isULID.default,
        isUUID: _isUUID.default,
        isMongoId: _isMongoId.default,
        isAfter: _isAfter.default,
        isBefore: _isBefore.default,
        isIn: _isIn.default,
        isLuhnNumber: _isLuhnNumber.default,
        isCreditCard: _isCreditCard.default,
        isIdentityCard: _isIdentityCard.default,
        isEAN: _isEAN.default,
        isISIN: _isISIN.default,
        isISBN: _isISBN.default,
        isISSN: _isISSN.default,
        isMobilePhone: _isMobilePhone.default,
        isMobilePhoneLocales: _isMobilePhone.locales,
        isPostalCode: _isPostalCode.default,
        isPostalCodeLocales: _isPostalCode.locales,
        isEthereumAddress: _isEthereumAddress.default,
        isCurrency: _isCurrency.default,
        isBtcAddress: _isBtcAddress.default,
        isISO6346: _isISO.isISO6346,
        isFreightContainerID: _isISO.isFreightContainerID,
        isISO6391: _isISO2.default,
        isISO8601: _isISO3.default,
        isISO15924: _isISO4.default,
        isRFC3339: _isRFC.default,
        isISO31661Alpha2: _isISO31661Alpha.default,
        isISO31661Alpha3: _isISO31661Alpha2.default,
        isISO31661Numeric: _isISO31661Numeric.default,
        isISO4217: _isISO5.default,
        isBase32: _isBase.default,
        isBase58: _isBase2.default,
        isBase64: _isBase3.default,
        isDataURI: _isDataURI.default,
        isMagnetURI: _isMagnetURI.default,
        isMailtoURI: _isMailtoURI.default,
        isMimeType: _isMimeType.default,
        isLatLong: _isLatLong.default,
        ltrim: _ltrim.default,
        rtrim: _rtrim.default,
        trim: _trim.default,
        escape: _escape.default,
        unescape: _unescape.default,
        stripLow: _stripLow.default,
        whitelist: _whitelist.default,
        blacklist: _blacklist.default,
        isWhitelisted: _isWhitelisted.default,
        normalizeEmail: _normalizeEmail.default,
        toString,
        isSlug: _isSlug.default,
        isStrongPassword: _isStrongPassword.default,
        isTaxID: _isTaxID.default,
        isDate: _isDate.default,
        isTime: _isTime.default,
        isLicensePlate: _isLicensePlate.default,
        isVAT: _isVAT.default,
        ibanLocales: _isIBAN.locales
      };
      var _default = exports.default = validator2;
      module.exports = exports.default;
      module.exports.default = exports.default;
    }
  });

  // node_modules/lzma1/lib/utils.js
  var MAX_UINT32 = 4294967296;
  var MAX_INT32 = 2147483647;
  var MIN_INT32 = -2147483648;
  var INFINITY_PRICE = 268435455;
  var _MAX_UINT32 = 4294967295;
  var DICTIONARY_SIZE_THRESHOLD = 1073741823;
  var kTopValue = 1 << 24;
  var kNumBitModelTotalBits = 11;
  var kBitModelTotal = 1 << kNumBitModelTotalBits;
  var MATCH_DECODERS_SIZE = 192;
  var REP_DECODERS_SIZE = 12;
  var POS_DECODERS_SIZE = 114;
  var LITERAL_DECODER_SIZE = 768;
  var DEFAULT_WINDOW_SIZE = 4096;
  var CHOICE_ARRAY_SIZE = 2;
  var N1_LONG_LIT = [4294967295, -MAX_UINT32];
  var P0_LONG_LIT = [0, 0];
  var P1_LONG_LIT = [1, 0];
  var CRC32_TABLE = [
    0,
    1996959894,
    3993919788,
    2567524794,
    124634137,
    1886057615,
    3915621685,
    2657392035,
    249268274,
    2044508324,
    3772115230,
    2547177864,
    162941995,
    2125561021,
    3887607047,
    2428444049,
    498536548,
    1789927666,
    4089016648,
    2227061214,
    450548861,
    1843258603,
    4107580753,
    2211677639,
    325883990,
    1684777152,
    4251122042,
    2321926636,
    335633487,
    1661365465,
    4195302755,
    2366115317,
    997073096,
    1281953886,
    3579855332,
    2724688242,
    1006888145,
    1258607687,
    3524101629,
    2768942443,
    901097722,
    1119000684,
    3686517206,
    2898065728,
    853044451,
    1172266101,
    3705015759,
    2882616665,
    651767980,
    1373503546,
    3369554304,
    3218104598,
    565507253,
    1454621731,
    3485111705,
    3099436303,
    671266974,
    1594198024,
    3322730930,
    2970347812,
    795835527,
    1483230225,
    3244367275,
    3060149565,
    1994146192,
    31158534,
    2563907772,
    4023717930,
    1907459465,
    112637215,
    2680153253,
    3904427059,
    2013776290,
    251722036,
    2517215374,
    3775830040,
    2137656763,
    141376813,
    2439277719,
    3865271297,
    1802195444,
    476864866,
    2238001368,
    4066508878,
    1812370925,
    453092731,
    2181625025,
    4111451223,
    1706088902,
    314042704,
    2344532202,
    4240017532,
    1658658271,
    366619977,
    2362670323,
    4224994405,
    1303535960,
    984961486,
    2747007092,
    3569037538,
    1256170817,
    1037604311,
    2765210733,
    3554079995,
    1131014506,
    879679996,
    2909243462,
    3663771856,
    1141124467,
    855842277,
    2852801631,
    3708648649,
    1342533948,
    654459306,
    3188396048,
    3373015174,
    1466479909,
    544179635,
    3110523913,
    3462522015,
    1591671054,
    702138776,
    2966460450,
    3352799412,
    1504918807,
    783551873,
    3082640443,
    3233442989,
    3988292384,
    2596254646,
    62317068,
    1957810842,
    3939845945,
    2647816111,
    81470997,
    1943803523,
    3814918930,
    2489596804,
    225274430,
    2053790376,
    3826175755,
    2466906013,
    167816743,
    2097651377,
    4027552580,
    2265490386,
    503444072,
    1762050814,
    4150417245,
    2154129355,
    426522225,
    1852507879,
    4275313526,
    2312317920,
    282753626,
    1742555852,
    4189708143,
    2394877945,
    397917763,
    1622183637,
    3604390888,
    2714866558,
    953729732,
    1340076626,
    3518719985,
    2797360999,
    1068828381,
    1219638859,
    3624741850,
    2936675148,
    906185462,
    1090812512,
    3747672003,
    2825379669,
    829329135,
    1181335161,
    3412177804,
    3160834842,
    628085408,
    1382605366,
    3423369109,
    3138078467,
    570562233,
    1426400815,
    3317316542,
    2998733608,
    733239954,
    1555261956,
    3268935591,
    3050360625,
    752459403,
    1541320221,
    2607071920,
    3965973030,
    1969922972,
    40735498,
    2617837225,
    3943577151,
    1913087877,
    83908371,
    2512341634,
    3803740692,
    2075208622,
    213261112,
    2463272603,
    3855990285,
    2094854071,
    198958881,
    2262029012,
    4057260610,
    1759359992,
    534414190,
    2176718541,
    4139329115,
    1873836001,
    414664567,
    2282248934,
    4279200368,
    1711684554,
    285281116,
    2405801727,
    4167216745,
    1634467795,
    376229701,
    2685067896,
    3608007406,
    1308918612,
    956543938,
    2808555105,
    3495958263,
    1231636301,
    1047427035,
    2932959818,
    3654703836,
    1088359270,
    936918e3,
    2847714899,
    3736837829,
    1202900863,
    817233897,
    3183342108,
    3401237130,
    1404277552,
    615818150,
    3134207493,
    3453421203,
    1423857449,
    601450431,
    3009837614,
    3294710456,
    1567103746,
    711928724,
    3020668471,
    3272380065,
    1510334235,
    755167117
  ];
  var PROB_PRICES = createProbPrices();
  var G_FAST_POS = createFastPos();
  function initArray(len, value = 0) {
    const array = [];
    array[len - 1] = void 0;
    if (value !== 0) {
      for (let i2 = 0; i2 < len; i2++) {
        array[i2] = value;
      }
    }
    return array;
  }
  function arraycopy(src, srcOfs, dest, destOfs, len) {
    if (srcOfs < 0 || destOfs < 0 || len < 0 || srcOfs + len > src.length || destOfs + len > dest.length) {
      return;
    }
    if (src === dest && srcOfs < destOfs && destOfs < srcOfs + len) {
      for (let i2 = len - 1; i2 >= 0; i2--) {
        dest[destOfs + i2] = src[srcOfs + i2];
      }
    } else {
      for (let i2 = 0; i2 < len; i2++) {
        dest[destOfs + i2] = src[srcOfs + i2];
      }
    }
  }
  function getBitPrice(probability, bit) {
    return PROB_PRICES[((probability - bit ^ -bit) & 2047) >>> 2];
  }
  function create64(valueLow, valueHigh) {
    let diffHigh, diffLow;
    valueHigh %= 18446744073709552e3;
    valueLow %= 18446744073709552e3;
    diffHigh = valueHigh % MAX_UINT32;
    diffLow = Math.floor(valueLow / MAX_UINT32) * MAX_UINT32;
    valueHigh = valueHigh - diffHigh + diffLow;
    valueLow = valueLow - diffLow + diffHigh;
    while (valueLow < 0) {
      valueLow += MAX_UINT32;
      valueHigh -= MAX_UINT32;
    }
    while (valueLow > 4294967295) {
      valueLow -= MAX_UINT32;
      valueHigh += MAX_UINT32;
    }
    valueHigh = valueHigh % 18446744073709552e3;
    while (valueHigh > 9223372032559809e3) {
      valueHigh -= 18446744073709552e3;
    }
    while (valueHigh < -9223372036854776e3) {
      valueHigh += 18446744073709552e3;
    }
    return [valueLow, valueHigh];
  }
  function add64(a2, b2) {
    return create64(a2[0] + b2[0], a2[1] + b2[1]);
  }
  function sub64(a2, b2) {
    return create64(a2[0] - b2[0], a2[1] - b2[1]);
  }
  function compare64(a2, b2) {
    if (a2[0] == b2[0] && a2[1] == b2[1]) {
      return 0;
    }
    const nega = a2[1] < 0;
    const negb = b2[1] < 0;
    if (nega && !negb) {
      return -1;
    }
    if (!nega && negb) {
      return 1;
    }
    if (sub64(a2, b2)[1] < 0) {
      return -1;
    }
    return 1;
  }
  function lowBits64(a2) {
    if (a2[0] >= 2147483648) {
      return ~~Math.max(Math.min(a2[0] - MAX_UINT32, MAX_INT32), MIN_INT32);
    }
    return ~~Math.max(Math.min(a2[0], MAX_INT32), MIN_INT32);
  }
  function fromInt64(value) {
    if (value >= 0) {
      return [value, 0];
    } else {
      return [value + MAX_UINT32, -MAX_UINT32];
    }
  }
  function shr64(a2, n) {
    n &= 63;
    if (n <= 30) {
      const shiftFact2 = 1 << n;
      return create64(Math.floor(a2[0] / shiftFact2), a2[1] / shiftFact2);
    }
    const shiftFact = (1 << 30) * (1 << n - 30);
    return create64(Math.floor(a2[0] / shiftFact), a2[1] / shiftFact);
  }
  function initBitModels(probs) {
    for (let i2 = probs.length - 1; i2 >= 0; --i2) {
      probs[i2] = 1024;
    }
  }
  function getLenToPosState(len) {
    len -= 2;
    if (len < 4) {
      return len;
    }
    return 3;
  }
  function stateUpdateChar(index) {
    if (index < 4) {
      return 0;
    }
    if (index < 10) {
      return index - 3;
    }
    return index - 6;
  }
  function createBitTree(numBitLevels) {
    return {
      numBitLevels,
      models: initArray(1 << numBitLevels)
    };
  }
  function createProbPrices() {
    const probPrices = [];
    for (let i2 = 8; i2 >= 0; --i2) {
      let start = 1 << 9 - i2 - 1;
      let end = 1 << 9 - i2;
      for (let j2 = start; j2 < end; ++j2) {
        probPrices[j2] = (i2 << 6) + (end - j2 << 6 >>> 9 - i2 - 1);
      }
    }
    return probPrices;
  }
  function createFastPos() {
    const gFastPos = [0, 1];
    let c = 2;
    for (let slotFast = 2; slotFast < 22; ++slotFast) {
      let k = 1 << (slotFast >> 1) - 1;
      for (let j2 = 0; j2 < k; ++j2, ++c) {
        gFastPos[c] = slotFast;
      }
    }
    return gFastPos;
  }

  // node_modules/lzma1/lib/chunker.js
  var EncoderChunker = class {
    constructor(lzma) {
      __publicField(this, "encoder", null);
      __publicField(this, "decoder", null);
      __publicField(this, "alive", 0);
      __publicField(this, "inBytesProcessed", [0, 0]);
      __publicField(this, "lzma");
      this.lzma = lzma;
    }
    /**
     * Process one chunk of encoding
     */
    processChunk() {
      if (!this.alive) {
        throw new Error("bad state");
      }
      if (!this.encoder) {
        throw new Error("No decoding");
      }
      this.lzma.codeOneBlock();
      this.inBytesProcessed = this.encoder.processedInSize[0];
      if (this.encoder.finished[0]) {
        this.lzma.releaseStreams();
        this.alive = 0;
      }
      return this.alive;
    }
  };
  var DecoderChunker = class {
    constructor(decoder) {
      __publicField(this, "encoder", null);
      __publicField(this, "decoder");
      __publicField(this, "alive", 0);
      __publicField(this, "inBytesProcessed", [0, 0]);
      this.decoder = decoder;
    }
    /**
     * Process one chunk of decoding
     */
    processChunk() {
      if (!this.alive) {
        throw new Error("Bad state");
      }
      if (this.encoder) {
        throw new Error("No encoding");
      }
      const result = this.decoder.codeOneChunk();
      if (result === -1) {
        throw new Error("Corrupted input");
      }
      this.inBytesProcessed = this.decoder.nowPos64;
      const isOutputComplete = compare64(this.decoder.outSize, P0_LONG_LIT) >= 0 && compare64(this.decoder.nowPos64, this.decoder.outSize) >= 0;
      if (result || isOutputComplete) {
        this.decoder.flush();
        this.decoder.cleanup();
        this.alive = 0;
      }
      return this.alive;
    }
  };

  // node_modules/lzma1/lib/lz-window.js
  var LzOutWindow = class {
    constructor(writer = null, windowSize = 4096) {
      __publicField(this, "buffer", null);
      __publicField(this, "pos", 0);
      __publicField(this, "streamPos", 0);
      __publicField(this, "stream", null);
      __publicField(this, "windowSize", 0);
      // Private Go-style properties
      __publicField(this, "w", null);
      __publicField(this, "buf", []);
      this.w = writer;
      this.stream = writer;
      this.windowSize = windowSize;
      this.buf = new Array(windowSize);
      this.buffer = this.buf;
      this.pos = 0;
      this.streamPos = 0;
    }
    /**
     * Copy a block of data from a previous position (LZ77-style)
     */
    copyBlock(distance, length) {
      if (!this.buffer)
        return;
      for (let i2 = 0; i2 < length; i2++) {
        let sourcePos = this.pos - distance - 1;
        if (sourcePos < 0) {
          sourcePos += this.windowSize;
        }
        const byte = this.buffer[sourcePos];
        this.putByte(byte);
      }
    }
    /**
     * Put a single byte into the window
     */
    putByte(byte) {
      if (!this.buffer)
        return;
      this.buffer[this.pos] = byte;
      this.pos++;
      this.streamPos++;
      if (this.pos >= this.windowSize) {
        this.flush();
      }
    }
    /**
     * Get a byte from a relative position
     */
    getByte(relativePos) {
      if (!this.buffer)
        return 0;
      let pos = this.pos + relativePos;
      if (pos < 0) {
        pos += this.windowSize;
      } else if (pos >= this.windowSize) {
        pos -= this.windowSize;
      }
      return this.buffer[pos];
    }
    /**
     * Flush buffered data to output writer
     */
    flush() {
      if (this.w && this.buffer && this.pos > 0) {
        const dataToWrite = this.buffer.slice(0, this.pos);
        this.w.write(dataToWrite);
        this.pos = 0;
      }
    }
    /**
     * Check if the window is empty
     */
    isEmpty() {
      return this.streamPos === 0;
    }
    /**
     * Reset the window
     */
    reset() {
      this.pos = 0;
      this.streamPos = 0;
      if (this.buffer) {
        this.buffer.fill(0);
      }
    }
  };

  // node_modules/lzma1/lib/range-decoder.js
  var RangeDecoder = class {
    constructor() {
      __publicField(this, "stream", null);
      __publicField(this, "code", 0);
      __publicField(this, "rrange", 0);
    }
    /**
     * Set input stream for decoding
     */
    setStream(stream) {
      this.stream = stream;
    }
    /**
     * Initialize range decoder
     */
    init() {
      this.code = 0;
      this.rrange = -1;
      for (let i2 = 0; i2 < 5; ++i2) {
        this.code = this.code << 8 | this.readFromStream();
      }
    }
    /**
     * Decode a single bit using probability model
     */
    decodeBit(probs, index) {
      let newBound, prob = probs[index];
      newBound = (this.rrange >>> 11) * prob;
      if ((this.code ^ -2147483648) < (newBound ^ -2147483648)) {
        this.rrange = newBound;
        probs[index] = prob + (2048 - prob >>> 5) << 16 >> 16;
        if (!(this.rrange & -16777216)) {
          this.code = this.code << 8 | this.readFromStream();
          this.rrange <<= 8;
        }
        return 0;
      } else {
        this.rrange -= newBound;
        this.code -= newBound;
        probs[index] = prob - (prob >>> 5) << 16 >> 16;
        if (!(this.rrange & -16777216)) {
          this.code = this.code << 8 | this.readFromStream();
          this.rrange <<= 8;
        }
        return 1;
      }
    }
    /**
     * Decode direct bits (without probability model)
     */
    decodeDirectBits(numTotalBits) {
      let result = 0;
      for (let i2 = numTotalBits; i2 != 0; i2 -= 1) {
        this.rrange >>>= 1;
        let t = this.code - this.rrange >>> 31;
        this.code -= this.rrange & t - 1;
        result = result << 1 | 1 - t;
        if (!(this.rrange & -16777216)) {
          this.code = this.code << 8 | this.readFromStream();
          this.rrange <<= 8;
        }
      }
      return result;
    }
    /**
     * Get current code value (for compatibility)
     */
    get currentCode() {
      return this.code;
    }
    /**
     * Get current range value (for compatibility)
     */
    get currentRange() {
      return this.rrange;
    }
    /**
     * Read a single byte from the input stream
     */
    readFromStream() {
      if (!this.stream) {
        return 0;
      }
      if (this.stream.pos >= this.stream.count) {
        return -1;
      }
      let value;
      if (this.stream.buf instanceof ArrayBuffer) {
        value = new Uint8Array(this.stream.buf)[this.stream.pos++];
      } else if (this.stream.buf instanceof Uint8Array) {
        value = this.stream.buf[this.stream.pos++];
      } else {
        value = this.stream.buf[this.stream.pos++];
      }
      return value & 255;
    }
  };

  // node_modules/lzma1/lib/decoder.js
  var Decoder = class {
    constructor() {
      __publicField(this, "rangeDecoder");
      __publicField(this, "outWindow");
      // Decoder state
      __publicField(this, "state", 0);
      __publicField(this, "rep0", 0);
      __publicField(this, "rep1", 0);
      __publicField(this, "rep2", 0);
      __publicField(this, "rep3", 0);
      __publicField(this, "prevByte", 0);
      __publicField(this, "nowPos64", [0, 0]);
      __publicField(this, "outSize", [0, 0]);
      // Decoder configuration
      __publicField(this, "posStateMask", 0);
      __publicField(this, "dictSizeCheck", 0);
      // Probability models for different symbols
      __publicField(this, "matchDecoders", []);
      __publicField(this, "rep0LongDecoders", []);
      __publicField(this, "repDecoders", []);
      __publicField(this, "repG0Decoders", []);
      __publicField(this, "repG1Decoders", []);
      __publicField(this, "repG2Decoders", []);
      __publicField(this, "posDecoders", []);
      // Complex decoders
      __publicField(this, "literalDecoder");
      __publicField(this, "posSlotDecoders", []);
      __publicField(this, "lenDecoder");
      __publicField(this, "repLenDecoder");
      __publicField(this, "posAlignDecoder");
      // Chunker properties for compatibility
      __publicField(this, "decoder");
      __publicField(this, "encoder", null);
      __publicField(this, "alive", 0);
      __publicField(this, "inBytesProcessed", [0, 0]);
      this.rangeDecoder = new RangeDecoder();
      this.outWindow = new LzOutWindow(null, DEFAULT_WINDOW_SIZE);
      this.matchDecoders = initArray(MATCH_DECODERS_SIZE);
      this.rep0LongDecoders = initArray(MATCH_DECODERS_SIZE);
      this.repDecoders = initArray(REP_DECODERS_SIZE);
      this.repG0Decoders = initArray(REP_DECODERS_SIZE);
      this.repG1Decoders = initArray(REP_DECODERS_SIZE);
      this.repG2Decoders = initArray(REP_DECODERS_SIZE);
      this.posDecoders = initArray(POS_DECODERS_SIZE);
      this.literalDecoder = {
        coders: [],
        numPrevBits: 0,
        numPosBits: 0,
        posMask: 0,
        init: () => this.initLiteralDecoder()
      };
      for (let i2 = 0; i2 < 4; i2++) {
        this.posSlotDecoders[i2] = createBitTree(6);
      }
      this.lenDecoder = this.createLenDecoder();
      this.repLenDecoder = this.createLenDecoder();
      this.posAlignDecoder = createBitTree(4);
      this.decoder = this;
    }
    // Alias for compatibility with LZMA class
    get literalCoder() {
      return this.literalDecoder;
    }
    createLenDecoder() {
      const decoder = {
        choice: initArray(CHOICE_ARRAY_SIZE),
        lowCoder: [],
        midCoder: [],
        highCoder: createBitTree(8),
        numPosStates: 0
      };
      return decoder;
    }
    setDecoderProperties(properties) {
      if (properties.length < 5) {
        return false;
      }
      const lc = properties[0] % 9;
      const remainder = Math.floor(properties[0] / 9);
      const lp = remainder % 5;
      const pb = Math.floor(remainder / 5);
      if (pb > 4) {
        return false;
      }
      this.literalDecoder.numPrevBits = lc;
      this.literalDecoder.numPosBits = lp;
      this.literalDecoder.posMask = (1 << lp) - 1;
      this.posStateMask = (1 << pb) - 1;
      let dictSize = 0;
      for (let i2 = 0; i2 < 4; i2++) {
        const unsignedByte = properties[1 + i2] & 255;
        dictSize += unsignedByte << i2 * 8;
      }
      this.dictSizeCheck = Math.max(dictSize, 1);
      if (dictSize > 0) {
        this.outWindow.windowSize = Math.max(dictSize, 4096);
        this.outWindow.buffer = initArray(this.outWindow.windowSize);
      }
      const numStates = 1 << this.literalDecoder.numPrevBits + this.literalDecoder.numPosBits;
      this.literalDecoder.coders = [];
      for (let i2 = 0; i2 < numStates; i2++) {
        this.literalDecoder.coders[i2] = {
          decoders: initArray(LITERAL_DECODER_SIZE)
          // 0x300
        };
      }
      this.lenDecoder.numPosStates = 1 << pb;
      this.repLenDecoder.numPosStates = 1 << pb;
      this.lenDecoder.lowCoder = [];
      this.lenDecoder.midCoder = [];
      this.repLenDecoder.lowCoder = [];
      this.repLenDecoder.midCoder = [];
      for (let posState = 0; posState < 1 << pb; posState++) {
        this.lenDecoder.lowCoder[posState] = createBitTree(3);
        this.lenDecoder.midCoder[posState] = createBitTree(3);
        this.repLenDecoder.lowCoder[posState] = createBitTree(3);
        this.repLenDecoder.midCoder[posState] = createBitTree(3);
      }
      return true;
    }
    // Methods that modify decoder state
    copyBlock(len) {
      const outputWindow = this.outWindow;
      const distance = this.rep0;
      let pos = outputWindow.pos - distance - 1;
      if (pos < 0) {
        pos += outputWindow.windowSize;
      }
      for (; len != 0; len -= 1) {
        if (pos >= outputWindow.windowSize) {
          pos = 0;
        }
        outputWindow.buffer[outputWindow.pos] = outputWindow.buffer[pos];
        outputWindow.pos += 1;
        pos += 1;
        if (outputWindow.pos >= outputWindow.windowSize) {
          this.flush();
        }
      }
    }
    putByte(b2) {
      this.outWindow.buffer[this.outWindow.pos] = b2;
      this.outWindow.pos += 1;
      if (this.outWindow.pos >= this.outWindow.windowSize) {
        this.flush();
      }
    }
    getByte(distance) {
      const outputWindow = this.outWindow;
      let pos = outputWindow.pos - distance - 1;
      if (pos < 0) {
        pos += outputWindow.windowSize;
      }
      return outputWindow.buffer[pos];
    }
    getDecoder(pos, prevByte) {
      const positionMask = pos & this.literalDecoder.posMask;
      const prevBitsMask = (prevByte & 255) >>> 8 - this.literalDecoder.numPrevBits;
      const index = (positionMask << this.literalDecoder.numPrevBits) + prevBitsMask;
      return this.literalDecoder.coders[index];
    }
    initLiteralDecoder() {
      let numStates = 1 << this.literalDecoder.numPrevBits + this.literalDecoder.numPosBits;
      for (let i2 = 0; i2 < numStates; ++i2) {
        for (let j2 = 0; j2 < this.literalDecoder.coders[i2].decoders.length; j2++) {
          this.literalDecoder.coders[i2].decoders[j2] = 1024;
        }
      }
    }
    init() {
      this.outWindow.streamPos = 0;
      this.outWindow.pos = 0;
      initBitModels(this.matchDecoders);
      initBitModels(this.rep0LongDecoders);
      initBitModels(this.repDecoders);
      initBitModels(this.repG0Decoders);
      initBitModels(this.repG1Decoders);
      initBitModels(this.repG2Decoders);
      initBitModels(this.posDecoders);
      this.initLiteralDecoder();
      for (let i2 = 0; i2 < 4; ++i2) {
        initBitModels(this.posSlotDecoders[i2].models);
      }
      this.initLenDecoder(this.lenDecoder);
      this.initLenDecoder(this.repLenDecoder);
      initBitModels(this.posAlignDecoder.models);
      this.initRangeDecoder();
    }
    initLenDecoder(decoder) {
      initBitModels(decoder.choice);
      for (let posState = 0; posState < decoder.numPosStates; ++posState) {
        initBitModels(decoder.lowCoder[posState].models);
        initBitModels(decoder.midCoder[posState].models);
      }
      initBitModels(decoder.highCoder.models);
    }
    outWindowReleaseStream() {
      this.flush();
      this.outWindow.stream = null;
    }
    decodeBit(probs, index) {
      return this.rangeDecoder.decodeBit(probs, index);
    }
    decodeDirectBits(numTotalBits) {
      return this.rangeDecoder.decodeDirectBits(numTotalBits);
    }
    initRangeDecoder() {
      this.rangeDecoder.init();
    }
    rangeBitTreeDecoder(bitTree) {
      let bitIndex, m = 1;
      for (bitIndex = bitTree.numBitLevels; bitIndex != 0; bitIndex -= 1) {
        m = (m << 1) + this.decodeBit(bitTree.models, m);
      }
      return m - (1 << bitTree.numBitLevels);
    }
    reverseDecode(models, startIndex, numBitLevels) {
      let symbol = 0;
      for (let bitIndex = 0, m = 1, bit; bitIndex < numBitLevels; ++bitIndex) {
        bit = this.decodeBit(models, startIndex + m);
        m <<= 1;
        m += bit;
        symbol |= bit << bitIndex;
      }
      return symbol;
    }
    reverseDecodeAlignDecoder() {
      let symbol = 0;
      for (let m = 1, bitIndex = 0, bit; bitIndex < this.posAlignDecoder.numBitLevels; ++bitIndex) {
        bit = this.decodeBit(this.posAlignDecoder.models, m);
        m <<= 1;
        m += bit;
        symbol |= bit << bitIndex;
      }
      return symbol;
    }
    // Update the placeholder implementations with actual logic
    decodeNormalWithRangeDecoder(decoder) {
      let symbol = 1;
      do {
        symbol = symbol << 1 | this.decodeBit(decoder.decoders, symbol);
      } while (symbol < 256);
      return symbol << 24 >> 24;
    }
    decodeWithMatchByteWithRangeDecoder(encoder, matchByte) {
      let bit, matchBit, symbol = 1;
      do {
        matchBit = matchByte >> 7 & 1;
        matchByte <<= 1;
        bit = this.decodeBit(encoder.decoders, (1 + matchBit << 8) + symbol);
        symbol = symbol << 1 | bit;
        if (matchBit != bit) {
          while (symbol < 256) {
            symbol = symbol << 1 | this.decodeBit(encoder.decoders, symbol);
          }
          break;
        }
      } while (symbol < 256);
      return symbol << 24 >> 24;
    }
    decodeLenWithRangeDecoder(decoder, posState) {
      if (!this.decodeBit(decoder.choice, 0)) {
        return this.rangeBitTreeDecoder(decoder.lowCoder[posState]);
      }
      let symbol = 8;
      if (!this.decodeBit(decoder.choice, 1)) {
        symbol += this.rangeBitTreeDecoder(decoder.midCoder[posState]);
      } else {
        symbol += 8 + this.rangeBitTreeDecoder(decoder.highCoder);
      }
      return symbol;
    }
    codeOneChunk() {
      let decoder2, distance, len, numDirectBits, positionSlot;
      let posState = lowBits64(this.nowPos64) & this.posStateMask;
      if (!this.decodeBit(this.matchDecoders, (this.state << 4) + posState)) {
        decoder2 = this.getDecoder(lowBits64(this.nowPos64), this.prevByte);
        if (this.state < 7) {
          this.prevByte = this.decodeNormalWithRangeDecoder(decoder2);
        } else {
          this.prevByte = this.decodeWithMatchByteWithRangeDecoder(decoder2, this.getByte(this.rep0));
        }
        this.putByte(this.prevByte);
        this.state = stateUpdateChar(this.state);
        this.nowPos64 = add64(this.nowPos64, [1, 0]);
      } else {
        if (this.decodeBit(this.repDecoders, this.state)) {
          len = 0;
          if (!this.decodeBit(this.repG0Decoders, this.state)) {
            if (!this.decodeBit(this.rep0LongDecoders, (this.state << 4) + posState)) {
              this.state = this.state < 7 ? 9 : 11;
              len = 1;
            }
          } else {
            if (!this.decodeBit(this.repG1Decoders, this.state)) {
              distance = this.rep1;
            } else {
              if (!this.decodeBit(this.repG2Decoders, this.state)) {
                distance = this.rep2;
              } else {
                distance = this.rep3;
                this.rep3 = this.rep2;
              }
              this.rep2 = this.rep1;
            }
            this.rep1 = this.rep0;
            this.rep0 = distance;
          }
          if (!len) {
            len = this.decodeLenWithRangeDecoder(this.repLenDecoder, posState) + 2;
            this.state = this.state < 7 ? 8 : 11;
          }
        } else {
          this.rep3 = this.rep2;
          this.rep2 = this.rep1;
          this.rep1 = this.rep0;
          len = 2 + this.decodeLenWithRangeDecoder(this.lenDecoder, posState);
          this.state = this.state < 7 ? 7 : 10;
          positionSlot = this.rangeBitTreeDecoder(this.posSlotDecoders[getLenToPosState(len)]);
          if (positionSlot >= 4) {
            numDirectBits = (positionSlot >> 1) - 1;
            this.rep0 = (2 | positionSlot & 1) << numDirectBits;
            if (positionSlot < 14) {
              this.rep0 += this.reverseDecode(this.posDecoders, this.rep0 - positionSlot - 1, numDirectBits);
            } else {
              this.rep0 += this.decodeDirectBits(numDirectBits - 4) << 4;
              this.rep0 += this.reverseDecodeAlignDecoder();
              if (this.rep0 < 0) {
                if (this.rep0 == -1) {
                  return 1;
                }
                return -1;
              }
            }
          } else {
            this.rep0 = positionSlot;
          }
        }
        if (compare64([this.rep0, 0], this.nowPos64) >= 0 || this.rep0 >= this.dictSizeCheck) {
          return -1;
        }
        this.copyBlock(len);
        this.nowPos64 = add64(this.nowPos64, [len, 0]);
        this.prevByte = this.getByte(0);
      }
      return 0;
    }
    // Setup decoder for chunk processing
    setupForDecoding(inStream, outSize, outputBuffer) {
      this.rangeDecoder.setStream(inStream);
      this.outSize = outSize;
      this.outWindowReleaseStream();
      this.outWindow.stream = outputBuffer;
      this.init();
      this.state = 0;
      this.rep0 = 0;
      this.rep1 = 0;
      this.rep2 = 0;
      this.rep3 = 0;
      this.outSize = outSize;
      this.nowPos64 = [0, 0];
      this.prevByte = 0;
      this.decoder = this;
      this.encoder = null;
      this.alive = 1;
    }
    // Process chunk and return alive status
    processChunk() {
      if (!this.alive) {
        throw new Error("Bad state");
      }
      if (this.encoder) {
        throw new Error("No encoding");
      }
      const result = this.codeOneChunk();
      if (result === -1) {
        throw new Error("Corrupted input");
      }
      const isOutputComplete = compare64(this.outSize, [0, 0]) >= 0 && compare64(this.nowPos64, this.outSize) >= 0;
      if (result || isOutputComplete) {
        this.flush();
        this.outWindowReleaseStream();
        this.rangeDecoder.setStream(null);
        this.alive = 0;
      }
      return this.alive;
    }
    writeToOutput(buffer, data, offset, length) {
      const requiredSize = buffer.count + length;
      if (requiredSize > buffer.buf.length) {
        const newSize = Math.max(buffer.buf.length * 2, requiredSize);
        const newBuf = new Array(newSize);
        for (let i2 = 0; i2 < buffer.count; i2++) {
          newBuf[i2] = buffer.buf[i2];
        }
        buffer.buf = newBuf;
      }
      for (let i2 = 0; i2 < length; i2++) {
        buffer.buf[buffer.count + i2] = data[offset + i2];
      }
      buffer.count += length;
    }
    isBufferWithCount(x) {
      const s = x;
      return !!s && Array.isArray(s.buf) && typeof s.count === "number" && typeof s.write === "function";
    }
    flush() {
      const size = this.outWindow.pos - this.outWindow.streamPos;
      if (!size) {
        return;
      }
      if (this.outWindow.stream && this.outWindow.buffer) {
        const outputBuffer = this.outWindow.stream;
        if (this.isBufferWithCount(outputBuffer)) {
          this.writeToOutput(outputBuffer, this.outWindow.buffer, this.outWindow.streamPos, size);
        } else if (typeof outputBuffer.write === "function") {
          const slice = this.outWindow.buffer.slice(this.outWindow.streamPos, this.outWindow.streamPos + size);
          outputBuffer.write(slice);
        }
      }
      if (this.outWindow.pos >= this.outWindow.windowSize) {
        this.outWindow.pos = 0;
      }
      this.outWindow.streamPos = this.outWindow.pos;
    }
    /**
     * Cleanup decoder resources
     */
    cleanup() {
      this.outWindow.stream = null;
      this.rangeDecoder.stream = null;
    }
  };

  // node_modules/lzma1/lib/len-coder.js
  var LenEncoder = class {
    constructor() {
      // Choice probability arrays for length range selection
      __publicField(this, "choice", initArray(2));
      // Low range coders (for lengths 2-9)
      __publicField(this, "lowCoder", []);
      // Mid range coders (for lengths 10-17)
      __publicField(this, "midCoder", []);
      // High range coder (for lengths 18+)
      __publicField(this, "highCoder", createBitTree(8));
      // Price optimization properties
      __publicField(this, "tableSize", 0);
      __publicField(this, "prices", []);
      __publicField(this, "counters", []);
      for (let posState = 0; posState < 16; ++posState) {
        this.lowCoder[posState] = createBitTree(3);
        this.midCoder[posState] = createBitTree(3);
      }
    }
    /**
     * Initialize the encoder with specified number of position states
     */
    init(numPosStates) {
      initBitModels(this.choice);
      for (let posState = 0; posState < numPosStates; ++posState) {
        initBitModels(this.lowCoder[posState].models);
        initBitModels(this.midCoder[posState].models);
      }
      initBitModels(this.highCoder.models);
    }
    /**
     * Encode a length value using the provided range encoder
     */
    encode(symbol, posState, rangeEncoder) {
      if (symbol < 8) {
        rangeEncoder.encodeBit(this.choice, 0, 0);
        rangeEncoder.encodeBitTree(this.lowCoder[posState], symbol);
      } else {
        symbol -= 8;
        rangeEncoder.encodeBit(this.choice, 0, 1);
        if (symbol < 8) {
          rangeEncoder.encodeBit(this.choice, 1, 0);
          rangeEncoder.encodeBitTree(this.midCoder[posState], symbol);
        } else {
          rangeEncoder.encodeBit(this.choice, 1, 1);
          rangeEncoder.encodeBitTree(this.highCoder, symbol - 8);
        }
      }
    }
    /**
     * Encode with price table update
     */
    encodeWithUpdate(symbol, posState, rangeEncoder) {
      this.encode(symbol, posState, rangeEncoder);
      if (this.counters && (this.counters[posState] -= 1) == 0) {
        this.counters[posState] = this.tableSize;
      }
    }
    /**
     * Get price for encoding a symbol at the given position state
     */
    getPrice(symbol, posState) {
      return this.prices[posState * 272 + symbol];
    }
    /**
     * Initialize as a price table encoder
     */
    initPriceTable() {
      this.prices = [];
      this.counters = [];
    }
    /**
     * Set table size for price optimization
     */
    setTableSize(size) {
      this.tableSize = size;
    }
    /**
     * Set table size and update internal counters
     */
    setTableSizeAndInitCounters(size, numPosStates) {
      this.tableSize = size;
      if (this.counters) {
        for (let posState = 0; posState < numPosStates; ++posState) {
          this.counters[posState] = size;
        }
      }
    }
    /**
     * Get table size
     */
    getTableSize() {
      return this.tableSize;
    }
    /**
     * Update price tables for all position states
     */
    updateTables(numPosStates) {
      if (!this.prices || !this.counters) {
        this.initPriceTable();
      }
      for (let posState = 0; posState < numPosStates; ++posState) {
        this.setPrices(posState, this.tableSize, this.prices, 0);
        if (this.counters) {
          this.counters[posState] = this.tableSize;
        }
      }
    }
    // Private methods for internal state management
    /**
     * Calculate price for bit tree encoder
     */
    getBitTreePrice(encoder, symbol) {
      let bit, bitIndex, m = 1, price = 0;
      for (bitIndex = encoder.numBitLevels; bitIndex != 0; ) {
        bitIndex -= 1;
        bit = symbol >>> bitIndex & 1;
        price += this.getBitPrice(encoder.models[m], bit);
        m = (m << 1) + bit;
      }
      return price;
    }
    /**
     * Get price for a single bit
     */
    getBitPrice(prob, symbol) {
      return getBitPrice(prob, symbol);
    }
    /**
     * Set prices for all symbols in a position state range
     */
    setPrices(posState, numSymbols, prices, priceIndex) {
      const a0 = this.getBitPrice(this.choice[0], 0);
      const a1 = this.getBitPrice(this.choice[0], 1);
      const b0 = a1 + this.getBitPrice(this.choice[1], 0);
      const b1 = a1 + this.getBitPrice(this.choice[1], 1);
      let i2 = 0;
      const st = priceIndex + posState * 272;
      for (i2 = 0; i2 < 8; ++i2) {
        if (i2 >= numSymbols)
          return;
        prices[st + i2] = a0 + this.getBitTreePrice(this.lowCoder[posState], i2);
      }
      for (; i2 < 16; ++i2) {
        if (i2 >= numSymbols)
          return;
        prices[st + i2] = b0 + this.getBitTreePrice(this.midCoder[posState], i2 - 8);
      }
      for (; i2 < numSymbols; ++i2) {
        prices[st + i2] = b1 + this.getBitTreePrice(this.highCoder, i2 - 8 - 8);
      }
    }
  };

  // node_modules/lzma1/lib/lit-coder.js
  var LitSubCoder = class {
    constructor() {
      __publicField(this, "coders");
      this.coders = initArray(768, 1024);
    }
    /**
     * Decode normal literal symbol
     */
    decodeNormal(rd) {
      let symbol = 1;
      while (symbol < 256) {
        const i2 = rd.decodeBit(this.coders, symbol);
        symbol = symbol << 1 | i2;
      }
      return symbol & 255;
    }
    /**
     * Decode literal symbol with match byte context
     */
    decodeWithMatchByte(rd, matchByte) {
      let uMatchByte = matchByte;
      let symbol = 1;
      while (symbol < 256) {
        const matchBit = uMatchByte >> 7 & 1;
        uMatchByte <<= 1;
        const bit = rd.decodeBit(this.coders, (1 + matchBit << 8) + symbol);
        symbol = symbol << 1 | bit;
        if (matchBit !== bit) {
          while (symbol < 256) {
            const i2 = rd.decodeBit(this.coders, symbol);
            symbol = symbol << 1 | i2;
          }
          break;
        }
      }
      return symbol & 255;
    }
    /**
     * Encode literal symbol
     */
    encode(re, symbol) {
      let context = 1;
      for (let i2 = 7; i2 >= 0; i2--) {
        const bit = symbol >> i2 & 1;
        re.encodeBit(this.coders, context, bit);
        context = context << 1 | bit;
      }
    }
    /**
     * Encode literal symbol with match byte context
     */
    encodeMatched(re, matchByte, symbol) {
      let uMatchByte = matchByte;
      let context = 1;
      let same = true;
      for (let i2 = 7; i2 >= 0; i2--) {
        const bit = symbol >> i2 & 1;
        let state = context;
        if (same) {
          const matchBit = uMatchByte >> i2 & 1;
          state += 1 + matchBit << 8;
          same = matchBit === bit;
        }
        re.encodeBit(this.coders, state, bit);
        context = context << 1 | bit;
      }
    }
    /**
     * Get price for encoding literal symbol
     */
    getPrice(matchMode, matchByte, symbol) {
      let uMatchByte = matchByte;
      let price = 0;
      let context = 1;
      let i2 = 7;
      if (matchMode) {
        while (i2 >= 0) {
          const matchBit = uMatchByte >> i2 & 1;
          const bit = symbol >> i2 & 1;
          price += getBitPrice(this.coders[1 + matchBit << 8 + context], bit);
          context = context << 1 | bit;
          if (matchBit !== bit) {
            i2--;
            break;
          }
          i2--;
        }
      }
      while (i2 >= 0) {
        const bit = symbol >> i2 & 1;
        price += getBitPrice(this.coders[context], bit);
        context = context << 1 | bit;
        i2--;
      }
      return price;
    }
    /**
     * Reset coder to initial state
     */
    reset() {
      this.coders.fill(1024);
    }
    /**
     * Get decoders array (for compatibility with LiteralDecoderEncoder2)
     */
    get decoders() {
      return this.coders;
    }
  };
  var LitCoder = class {
    constructor(numPosBits, numPrevBits) {
      __publicField(this, "_coders");
      __publicField(this, "_numPrevBits");
      __publicField(this, "_posMask");
      const numStates = 1 << numPrevBits + numPosBits;
      this._coders = [];
      this._numPrevBits = numPrevBits;
      this._posMask = (1 << numPosBits) - 1;
      for (let i2 = 0; i2 < numStates; i2++) {
        this._coders[i2] = new LitSubCoder();
      }
    }
    /**
     * Get sub-coder for position and previous byte
     */
    getSubCoder(pos, prevByte) {
      return this._coders[((pos & this._posMask) << this._numPrevBits) + (prevByte >> 8 - this._numPrevBits)];
    }
    /**
     * Reset all sub-coders
     */
    reset() {
      this._coders.forEach((coder) => coder.reset());
    }
    /**
     * Get number of previous bits (for compatibility)
     */
    get numPrevBits() {
      return this._numPrevBits;
    }
    /**
     * Get number of position bits (for compatibility)
     */
    get numPosBits() {
      return Math.log2(this._posMask + 1);
    }
    /**
     * Get position mask (for compatibility)
     */
    get posMask() {
      return this._posMask;
    }
    /**
     * Get coders array (for compatibility)
     */
    get coders() {
      return this._coders;
    }
  };

  // node_modules/lzma1/lib/encoder.js
  var bitTreePriceCache = /* @__PURE__ */ new Map();
  function getDirectBitsPrice(numBits) {
    return numBits << 6;
  }
  function getBitTreePrice(bitTree, symbol) {
    const cacheKey = `${bitTree.numBitLevels}-${symbol}`;
    if (bitTreePriceCache.has(cacheKey)) {
      return bitTreePriceCache.get(cacheKey);
    }
    let price = 0;
    let modelIndex = 1;
    for (let bitIndex = bitTree.numBitLevels; bitIndex > 0; bitIndex--) {
      const bit = symbol >>> bitIndex - 1 & 1;
      price += getBitPrice(bitTree.models[modelIndex], bit);
      modelIndex = (modelIndex << 1) + bit;
    }
    if (bitTreePriceCache.size < 1e4) {
      bitTreePriceCache.set(cacheKey, price);
    }
    return price;
  }
  var EncoderState = class {
    constructor() {
      // Core state
      __publicField(this, "state", 0);
      __publicField(this, "previousByte", 0);
      __publicField(this, "position", [0, 0]);
      // Repetition distances (LZ77 back-references)
      __publicField(this, "repDistances", [0, 0, 0, 0]);
      // Match finding state
      __publicField(this, "longestMatchLength", 0);
      __publicField(this, "longestMatchWasFound", false);
      __publicField(this, "additionalOffset", 0);
      // Probability models for different encoding decisions
      __publicField(this, "isMatch", initArray(192));
      __publicField(this, "isRep", initArray(12));
      __publicField(this, "isRepG0", initArray(12));
      __publicField(this, "isRepG1", initArray(12));
      __publicField(this, "isRepG2", initArray(12));
      __publicField(this, "isRep0Long", initArray(192));
    }
    /**
     * Initialize all probability models to default values
     */
    initModels() {
      initBitModels(this.isMatch);
      initBitModels(this.isRep);
      initBitModels(this.isRepG0);
      initBitModels(this.isRepG1);
      initBitModels(this.isRepG2);
      initBitModels(this.isRep0Long);
    }
    /**
     * Update repetition distances when a new match is found
     */
    updateRepDistances(newDistance, repIndex) {
      if (repIndex === 0) {
        this.repDistances[3] = this.repDistances[2];
        this.repDistances[2] = this.repDistances[1];
        this.repDistances[1] = this.repDistances[0];
        this.repDistances[0] = newDistance;
      } else {
        const temp = this.repDistances[repIndex];
        for (let i2 = repIndex; i2 > 0; i2--) {
          this.repDistances[i2] = this.repDistances[i2 - 1];
        }
        this.repDistances[0] = temp;
      }
    }
  };
  var PositionEncoder = class {
    constructor() {
      __publicField(this, "posSlotEncoder", []);
      __publicField(this, "posEncoders", initArray(114));
      __publicField(this, "posAlignEncoder");
      for (let lenState = 0; lenState < 4; lenState++) {
        this.posSlotEncoder[lenState] = createBitTree(6);
      }
      this.posAlignEncoder = createBitTree(4);
    }
    /**
     * Initialize all position models
     */
    init() {
      for (const encoder of this.posSlotEncoder) {
        initBitModels(encoder.models);
      }
      initBitModels(this.posEncoders);
      initBitModels(this.posAlignEncoder.models);
    }
    /**
     * Encode position using optimal method
     */
    encodePosition(distance, lenState, rangeEncoder) {
      const posSlot = this.getPosSlot(distance);
      rangeEncoder.encodeBitTree(this.posSlotEncoder[lenState], posSlot);
      if (posSlot >= 4) {
        const footerBits = (posSlot >> 1) - 1;
        const baseVal = (2 | posSlot & 1) << footerBits;
        const posReduced = distance - baseVal;
        if (posSlot < 14) {
          this.encodeReverseBits(posReduced, footerBits, rangeEncoder);
        } else {
          rangeEncoder.encodeDirectBits(posReduced >> 4, footerBits - 4);
          rangeEncoder.encodeBitTree(this.posAlignEncoder, posReduced & 15);
        }
      }
    }
    /**
     * Calculate price for encoding a position
     */
    getPositionPrice(distance, lenState) {
      const posSlot = this.getPosSlot(distance);
      let price = getBitTreePrice(this.posSlotEncoder[lenState], posSlot);
      if (posSlot >= 4) {
        const footerBits = (posSlot >> 1) - 1;
        const baseVal = (2 | posSlot & 1) << footerBits;
        const posReduced = distance - baseVal;
        if (posSlot < 14) {
          price += this.getReverseBitsPrice(posReduced, footerBits);
        } else {
          price += getDirectBitsPrice(footerBits - 4);
          price += getBitTreePrice(this.posAlignEncoder, posReduced & 15);
        }
      }
      return price;
    }
    getPosSlot(distance) {
      if (distance < 4)
        return distance;
      if (distance < 1 << 31 - 11) {
        return G_FAST_POS[distance >> 6] + 12;
      }
      return G_FAST_POS[distance >> 26] + 52;
    }
    encodeReverseBits(value, numBits, rangeEncoder) {
      let modelIndex = 1;
      for (let i2 = 0; i2 < numBits; i2++) {
        const bit = value & 1;
        rangeEncoder.encodeBit(this.posEncoders, modelIndex, bit);
        modelIndex = modelIndex << 1 | bit;
        value >>>= 1;
      }
    }
    getReverseBitsPrice(value, numBits) {
      let price = 0;
      let modelIndex = 1;
      for (let i2 = 0; i2 < numBits; i2++) {
        const bit = value & 1;
        price += getBitPrice(this.posEncoders[modelIndex], bit);
        modelIndex = modelIndex << 1 | bit;
        value >>>= 1;
      }
      return price;
    }
  };
  var Encoder = class {
    constructor() {
      __publicField(this, "encoderState", new EncoderState());
      __publicField(this, "positionEncoder", new PositionEncoder());
      // Core state properties
      __publicField(this, "_state", 0);
      __publicField(this, "_previousByte", 0);
      __publicField(this, "_distTableSize", 0);
      __publicField(this, "_longestMatchWasFound", 0);
      __publicField(this, "_optimumEndIndex", 0);
      __publicField(this, "_optimumCurrentIndex", 0);
      __publicField(this, "_additionalOffset", 0);
      // Dictionary and match finding
      __publicField(this, "_dictionarySize", 0);
      __publicField(this, "_matchFinder", null);
      __publicField(this, "_dictionarySizePrev", 0);
      __publicField(this, "_numFastBytes", 0);
      // Literal encoding configuration
      __publicField(this, "_numLiteralContextBits", 0);
      __publicField(this, "_numLiteralPosStateBits", 0);
      __publicField(this, "_posStateBits", 0);
      __publicField(this, "_posStateMask", 0);
      // Stream and processing state
      __publicField(this, "_needReleaseMFStream", 0);
      __publicField(this, "_inStream", null);
      __publicField(this, "_finished", 0);
      __publicField(this, "nowPos64", [0, 0]);
      // Distance and repetition arrays
      __publicField(this, "_repDistances", initArray(4));
      __publicField(this, "_optimum", []);
      // Range encoder
      __publicField(this, "_rangeEncoder", {
        stream: {
          buf: [],
          count: 0
        },
        rrange: 0,
        cache: 0,
        low: [0, 0],
        cacheSize: 0,
        position: [0, 0],
        encodeBit: () => {
        },
        encodeBitTree: () => {
        },
        encodeDirectBits: () => {
        }
      });
      // Bit model arrays for different types of encoding decisions
      __publicField(this, "_isMatch", initArray(192));
      __publicField(this, "_isRep", initArray(12));
      __publicField(this, "_isRepG0", initArray(12));
      __publicField(this, "_isRepG1", initArray(12));
      __publicField(this, "_isRepG2", initArray(12));
      __publicField(this, "_isRep0Long", initArray(192));
      // Position and alignment encoders
      __publicField(this, "_posSlotEncoder", []);
      __publicField(this, "_posEncoders", initArray(114));
      __publicField(this, "_posAlignEncoder", null);
      // Length encoders
      __publicField(this, "_lenEncoder", null);
      __publicField(this, "_repMatchLenEncoder", null);
      // Literal encoder
      __publicField(this, "_literalEncoder", null);
      // Distance and price arrays
      __publicField(this, "_matchDistances", []);
      __publicField(this, "_posSlotPrices", []);
      __publicField(this, "_distancesPrices", []);
      __publicField(this, "_alignPrices", initArray(16));
      __publicField(this, "_matchPriceCount", 0);
      __publicField(this, "_alignPriceCount", 0);
      // Optimization arrays
      __publicField(this, "reps", initArray(4));
      __publicField(this, "repLens", initArray(4));
      // Processing counters
      __publicField(this, "processedInSize", [[0, 0]]);
      __publicField(this, "processedOutSize", [[0, 0]]);
      __publicField(this, "finished", [0]);
      __publicField(this, "properties", initArray(5));
      __publicField(this, "tempPrices", initArray(128));
      // 128
      // Match finding properties
      __publicField(this, "_longestMatchLength", 0);
      __publicField(this, "_matchFinderType", 1);
      __publicField(this, "_numDistancePairs", 0);
      __publicField(this, "_numFastBytesPrev", -1);
      __publicField(this, "backRes", 0);
    }
    /**
     * Initialize basic encoder state
     */
    baseInit() {
      this._state = 0;
      this._previousByte = 0;
      for (let i2 = 0; i2 < 4; ++i2) {
        this._repDistances[i2] = 0;
      }
    }
    /**
     * Get optimum array
     */
    getOptimum() {
      return this._optimum;
    }
    /**
     * Get back result
     */
    getBackRes() {
      return this.backRes;
    }
    setBackRes(backRes) {
      this.backRes = backRes;
    }
    init() {
      this.baseInit();
      this.encoderState.initModels();
      this.positionEncoder.init();
      this._optimum = [];
      for (let i2 = 0; i2 < 4096; i2++) {
        this._optimum[i2] = {};
      }
      this.initEncoderState();
      initBitModels(this._isMatch);
      initBitModels(this._isRep0Long);
      initBitModels(this._isRep);
      initBitModels(this._isRepG0);
      initBitModels(this._isRepG1);
      initBitModels(this._isRepG2);
      initBitModels(this._posEncoders);
      this.initLiteralEncoder();
      for (let i2 = 0; i2 < 4; ++i2) {
        initBitModels(this._posSlotEncoder[i2].models);
      }
      if (this._lenEncoder) {
        this._lenEncoder.init(1 << this._posStateBits);
      }
      if (this._repMatchLenEncoder) {
        this._repMatchLenEncoder.init(1 << this._posStateBits);
      }
      if (this._posAlignEncoder) {
        initBitModels(this._posAlignEncoder.models);
      }
      this._longestMatchWasFound = 0;
      this._optimumEndIndex = 0;
      this._optimumCurrentIndex = 0;
      this._additionalOffset = 0;
    }
    /**
     * Initialize encoder range coder
     */
    initEncoderState() {
      this._rangeEncoder.low = [0, 0];
      this._rangeEncoder.rrange = 4294967295;
      this._rangeEncoder.cacheSize = 1;
      this._rangeEncoder.cache = 0;
      this._rangeEncoder.position = [0, 0];
    }
    /**
     * Initialize literal encoder
     */
    initLiteralEncoder() {
      const totalStates = 1 << this._literalEncoder.numPrevBits + this._literalEncoder.numPosBits;
      for (let i2 = 0; i2 < totalStates; ++i2) {
        initBitModels(this._literalEncoder.coders[i2].decoders);
      }
    }
    /**
     * Create optimum structures
     */
    createOptimumStructures() {
      for (let i2 = 0; i2 < 4096; ++i2) {
        this._optimum[i2] = {};
      }
      for (let i2 = 0; i2 < 4; ++i2) {
        this._posSlotEncoder[i2] = createBitTree(6);
      }
    }
    /**
     * Create length price table encoder
     */
    createLenPriceTableEncoder() {
      const encoder = new LenEncoder();
      encoder.initPriceTable();
      return encoder;
    }
    /**
     * Create literal encoder encoder2
     */
    createLiteralEncoderEncoder2() {
      const encoder = {
        decoders: initArray(768)
      };
      return encoder;
    }
    /**
     * Create literal encoder
     */
    createLiteralEncoder() {
      if (this._literalEncoder != null && this._literalEncoder.numPrevBits == this._numLiteralContextBits && this._literalEncoder.numPosBits == this._numLiteralPosStateBits) {
        return;
      }
      this._literalEncoder = new LitCoder(this._numLiteralPosStateBits, this._numLiteralContextBits);
    }
    /**
     * Initialize completely with proper encoder state
     */
    initialize() {
      this._lenEncoder = this.createLenPriceTableEncoder();
      this._repMatchLenEncoder = this.createLenPriceTableEncoder();
      this._posAlignEncoder = createBitTree(4);
      this._optimum = [];
      this.createOptimumStructures();
      this.createLiteralEncoder();
      this.init();
    }
    /**
     * Configure encoder settings
     */
    configure(mode) {
      this.setDictionarySize(1 << mode.searchDepth);
      this._numFastBytes = mode.filterStrength;
      this._matchFinderType = mode.modeIndex;
      this._numLiteralContextBits = 3;
      this._numLiteralPosStateBits = 0;
      this._posStateBits = 2;
      this._posStateMask = 3;
    }
    /**
     * Set dictionary size
     */
    setDictionarySize(dictionarySize) {
      this._dictionarySize = dictionarySize;
      let dicLogSize = 0;
      for (; dictionarySize > 1 << dicLogSize; ++dicLogSize)
        ;
      this._distTableSize = dicLogSize * 2;
    }
    /**
     * Encode a bit using range coder
     */
    encodeBit(probs, index, symbol) {
      const rangeEncoder = this._rangeEncoder;
      let newBound, prob = probs[index];
      newBound = (rangeEncoder.rrange >>> 11) * prob;
      if (!symbol) {
        rangeEncoder.rrange = newBound;
        probs[index] = prob + (2048 - prob >>> 5) << 16 >> 16;
      } else {
        rangeEncoder.low = add64(rangeEncoder.low, this.and64(fromInt64(newBound), [4294967295, 0]));
        rangeEncoder.rrange -= newBound;
        probs[index] = prob - (prob >>> 5) << 16 >> 16;
      }
      if (!(rangeEncoder.rrange & -16777216)) {
        rangeEncoder.rrange <<= 8;
        this.shiftLow();
      }
    }
    /**
     * Encode bit tree
     */
    encodeBitTree(encoder, symbol) {
      let bit, bitIndex, m = 1;
      for (bitIndex = encoder.numBitLevels; bitIndex != 0; ) {
        bitIndex -= 1;
        bit = symbol >>> bitIndex & 1;
        this.encodeBit(encoder.models, m, bit);
        m = m << 1 | bit;
      }
    }
    /**
     * Encode literal
     */
    encodeLiteral(encoder, symbol) {
      let bit, context = 1;
      for (let i2 = 7; i2 >= 0; --i2) {
        bit = symbol >> i2 & 1;
        this.encodeBit(encoder.decoders, context, bit);
        context = context << 1 | bit;
      }
    }
    /**
     * Encode matched literal
     */
    encodeMatched(encoder, matchByte, symbol) {
      let bit, matchBit, state, same = true, context = 1;
      for (let i2 = 7; i2 >= 0; --i2) {
        bit = symbol >> i2 & 1;
        state = context;
        if (same) {
          matchBit = matchByte >> i2 & 1;
          state += 1 + matchBit << 8;
          same = matchBit === bit;
        }
        this.encodeBit(encoder.decoders, state, bit);
        context = context << 1 | bit;
      }
    }
    /**
     * Encode length using direct method calls
     */
    encodeLength(encoder, symbol, posState) {
      encoder.encode(symbol, posState, this);
    }
    /**
     * Encode direct bits
     */
    encodeDirectBits(valueToEncode, numTotalBits) {
      const rangeEncoder = this._rangeEncoder;
      for (let i2 = numTotalBits - 1; i2 >= 0; i2 -= 1) {
        rangeEncoder.rrange >>>= 1;
        if ((valueToEncode >>> i2 & 1) == 1) {
          rangeEncoder.low = add64(rangeEncoder.low, fromInt64(rangeEncoder.rrange));
        }
        if (!(rangeEncoder.rrange & -16777216)) {
          rangeEncoder.rrange <<= 8;
          this.shiftLow();
        }
      }
    }
    /**
     * Reverse encode
     */
    reverseEncode(symbol) {
      const posAlignEncoder = this._posAlignEncoder;
      if (!posAlignEncoder)
        return;
      let bit, m = 1;
      for (let i2 = 0; i2 < posAlignEncoder.numBitLevels; ++i2) {
        bit = symbol & 1;
        this.encodeBit(posAlignEncoder.models, m, bit);
        m = m << 1 | bit;
        symbol >>= 1;
      }
    }
    /**
     * Reverse encode range
     */
    reverseEncodeRange(startIndex, numBitLevels, symbol) {
      let bit, m = 1;
      for (let i2 = 0; i2 < numBitLevels; ++i2) {
        bit = symbol & 1;
        this.encodeBit(this._posEncoders, startIndex + m, bit);
        m = m << 1 | bit;
        symbol >>= 1;
      }
    }
    /**
     * Write end marker
     */
    writeEndMarker(positionState) {
      this.encodeBit(this._isMatch, (this._state << 4) + positionState, 1);
      this.encodeBit(this._isRep, this._state, 0);
      this._state = this._state < 7 ? 7 : 10;
      this.encodeLength(this._lenEncoder, 0, positionState);
      const posSlot = 63;
      const lenToPosState = getLenToPosState(2);
      this.encodeBitTree(this._posSlotEncoder[lenToPosState], posSlot);
      this.encodeDirectBits(67108863, 26);
      this.reverseEncode(15);
    }
    /**
     * Encode length with price table update
     */
    encodeLengthWithPriceUpdate(encoder, symbol, posState) {
      encoder.encodeWithUpdate(symbol, posState, this);
    }
    and64(a2, b2) {
      const highBits = ~~Math.max(Math.min(a2[1] / 4294967296, 2147483647), -2147483648) & ~~Math.max(Math.min(b2[1] / 4294967296, 2147483647), -2147483648);
      const lowBits = lowBits64(a2) & lowBits64(b2);
      let high = highBits * 4294967296;
      let low = lowBits;
      if (lowBits < 0) {
        low += 4294967296;
      }
      return [low, high];
    }
    shru64(a2, n) {
      n &= 63;
      let shiftFact = this.pwrAsDouble(n);
      let sr = create64(Math.floor(a2[0] / shiftFact), a2[1] / shiftFact);
      if (a2[1] < 0) {
        sr = add64(sr, this.shl64([2, 0], 63 - n));
      }
      return sr;
    }
    shl64(a2, n) {
      let diff, newHigh, newLow, twoToN;
      n &= 63;
      if (a2[0] == 0 && a2[1] == -9223372036854776e3) {
        if (!n) {
          return a2;
        }
        return [0, 0];
      }
      if (a2[1] < 0) {
        throw new Error("Neg");
      }
      twoToN = this.pwrAsDouble(n);
      newHigh = a2[1] * twoToN % 18446744073709552e3;
      newLow = a2[0] * twoToN;
      diff = newLow - newLow % 4294967296;
      newHigh += diff;
      newLow -= diff;
      if (newHigh >= 9223372036854776e3) {
        newHigh -= 18446744073709552e3;
      }
      return [newLow, newHigh];
    }
    pwrAsDouble(n) {
      if (n <= 30) {
        return 1 << n;
      }
      return this.pwrAsDouble(30) * this.pwrAsDouble(n - 30);
    }
    /**
     * Shift low helper (proper implementation) - public method for external access
     */
    shiftLow() {
      const rangeEncoder = this._rangeEncoder;
      const LowHi = lowBits64(this.shru64(rangeEncoder.low, 32));
      if (LowHi != 0 || compare64(rangeEncoder.low, [4278190080, 0]) < 0) {
        rangeEncoder.position = add64(rangeEncoder.position, fromInt64(rangeEncoder.cacheSize));
        let temp = rangeEncoder.cache;
        do {
          this.writeToStream(rangeEncoder.stream, temp + LowHi);
          temp = 255;
        } while ((rangeEncoder.cacheSize -= 1) != 0);
        rangeEncoder.cache = lowBits64(rangeEncoder.low) >>> 24;
      }
      rangeEncoder.cacheSize += 1;
      rangeEncoder.low = this.shl64(this.and64(rangeEncoder.low, [16777215, 0]), 8);
    }
    /**
     * Write byte to stream
     */
    writeToStream(stream, b2) {
      if (!stream)
        return;
      if (stream.count >= stream.buf.length) {
        const newSize = Math.max(stream.buf.length * 2, stream.count + 1);
        const newBuf = new Array(newSize);
        for (let i2 = 0; i2 < stream.count; i2++) {
          newBuf[i2] = stream.buf[i2];
        }
        stream.buf = newBuf;
      }
      stream.buf[stream.count++] = b2 << 24 >> 24;
    }
    initRangeEncoder() {
      this._rangeEncoder.position = [0, 0];
      this._rangeEncoder.low = [0, 0];
      this._rangeEncoder.rrange = -1;
      this._rangeEncoder.cacheSize = 1;
      this._rangeEncoder.cache = 0;
    }
    /**
     * Fill alignment prices for position alignment encoder
     */
    fillAlignPrices() {
      for (let i2 = 0; i2 < 16; ++i2) {
        this._alignPrices[i2] = this.reverseGetPrice(this._posAlignEncoder, i2);
      }
      this._alignPriceCount = 0;
    }
    /**
     * Fill distance prices for position encoders
     */
    fillDistancesPrices() {
      let baseVal, bitTreeEncoder, footerBits, posSlot, st, st2;
      for (let i2 = 4; i2 < 128; ++i2) {
        posSlot = this.getPosSlot(i2);
        footerBits = (posSlot >> 1) - 1;
        baseVal = (2 | posSlot & 1) << footerBits;
        this.tempPrices[i2] = this.reverseGetPriceArray(this._posEncoders, baseVal - posSlot - 1, footerBits, i2 - baseVal);
      }
      for (let lenToPosState = 0; lenToPosState < 4; ++lenToPosState) {
        bitTreeEncoder = this._posSlotEncoder[lenToPosState];
        st = lenToPosState << 6;
        for (posSlot = 0; posSlot < this._distTableSize; posSlot += 1) {
          this._posSlotPrices[st + posSlot] = this.rangeCoder_Encoder_GetPrice_1(bitTreeEncoder, posSlot);
        }
        for (posSlot = 14; posSlot < this._distTableSize; posSlot += 1) {
          this._posSlotPrices[st + posSlot] += (posSlot >> 1) - 1 - 4 << 6;
        }
        st2 = lenToPosState * 128;
        for (let i2 = 0; i2 < 4; ++i2) {
          this._distancesPrices[st2 + i2] = this._posSlotPrices[st + i2];
        }
        for (let i2 = 4; i2 < 128; ++i2) {
          this._distancesPrices[st2 + i2] = this._posSlotPrices[st + this.getPosSlot(i2)] + this.tempPrices[i2];
        }
      }
      this._matchPriceCount = 0;
    }
    /**
     * Get position slot for a distance value
     */
    getPosSlot(pos) {
      if (pos < 2048) {
        return G_FAST_POS[pos];
      }
      if (pos < 2097152) {
        return G_FAST_POS[pos >> 10] + 20;
      }
      return G_FAST_POS[pos >> 20] + 40;
    }
    /**
     * Get reverse price for bit tree encoder
     */
    reverseGetPrice(encoder, symbol) {
      let bit, m = 1, price = 0;
      for (let i2 = encoder.numBitLevels; i2 != 0; i2 -= 1) {
        bit = symbol & 1;
        symbol >>>= 1;
        price += this.getPrice(encoder.models[m], bit);
        m = m << 1 | bit;
      }
      return price;
    }
    /**
     * Get reverse price for array of models
     */
    reverseGetPriceArray(Models, startIndex, NumBitLevels, symbol) {
      let bit, m = 1, price = 0;
      for (let i2 = NumBitLevels; i2 != 0; i2 -= 1) {
        bit = symbol & 1;
        symbol >>>= 1;
        price += PROB_PRICES[((Models[startIndex + m] - bit ^ -bit) & 2047) >>> 2];
        m = m << 1 | bit;
      }
      return price;
    }
    /**
     * Get price for probability model (optimized)
     */
    getPrice(Prob, symbol) {
      return getBitPrice(Prob, symbol);
    }
    /**
     * Get price for bit tree encoder (optimized)
     */
    rangeCoder_Encoder_GetPrice_1(encoder, symbol) {
      return getBitTreePrice(encoder, symbol);
    }
    /**
     * Create encoder optimization structures (optimized)
     */
    createEncoderStructures() {
      this._optimum = [];
      for (let i2 = 0; i2 < 4096; i2++) {
        this._optimum[i2] = {};
      }
      for (let i2 = 0; i2 < 4096; ++i2) {
        this._optimum[i2] = {};
      }
      this._posSlotEncoder = new Array(4);
      for (let i2 = 0; i2 < 4; ++i2) {
        this._posSlotEncoder[i2] = createBitTree(6);
      }
    }
    /**
     * Create match finder and encoder structures (replaces #Create_2)
     */
    createMatchFinderAndStructures() {
      if (!this._matchFinder) {
        const binTree = {};
        let numHashBytes = 4;
        if (!this._matchFinderType) {
          numHashBytes = 2;
        }
        binTree.HASH_ARRAY = numHashBytes > 2;
        if (binTree.HASH_ARRAY) {
          binTree.kNumHashDirectBytes = 0;
          binTree.kMinMatchCheck = 4;
          binTree.kFixHashSize = 66560;
        } else {
          binTree.kNumHashDirectBytes = 2;
          binTree.kMinMatchCheck = 3;
          binTree.kFixHashSize = 0;
        }
        binTree._cyclicBufferSize = 0;
        binTree._cyclicBufferPos = 0;
        binTree._streamPos = 0;
        binTree._cutValue = 255;
        binTree._matchMaxLen = 0;
        binTree._streamEndWasReached = 0;
        binTree._pos = 0;
        binTree._posLimit = 0;
        binTree._son = [];
        binTree._hash = [];
        binTree._bufferBase = [];
        binTree._blockSize = 0;
        binTree._keepSizeAfter = 0;
        binTree._keepSizeBefore = 0;
        binTree._pointerToLastSafePosition = 0;
        this._matchFinder = binTree;
      }
      this.createLiteralEncoder();
      if (this._dictionarySize == this._dictionarySizePrev && this._numFastBytesPrev == this._numFastBytes) {
        return;
      }
      this._dictionarySizePrev = this._dictionarySize;
      this._numFastBytesPrev = this._numFastBytes;
    }
    /**
     * Get literal encoder subcoder (utility method)
     */
    getSubCoderUtility(pos, prevByte) {
      const posBits = pos & this._literalEncoder.posMask;
      const posShifted = posBits << this._literalEncoder.numPrevBits;
      const prevByteShift = 8 - this._literalEncoder.numPrevBits;
      const prevByteBits = (prevByte & 255) >>> prevByteShift;
      const coderIndex = posShifted + prevByteBits;
      return this._literalEncoder.coders[coderIndex];
    }
  };

  // node_modules/lzma1/lib/lz-in-window.js
  var LzInWindow = class {
    constructor(matchFinder) {
      __publicField(this, "matchFinder");
      this.matchFinder = matchFinder;
    }
    /**
     * Get a byte at the specified index relative to current position
     */
    getIndexByte(index) {
      const byte = this.matchFinder._bufferBase[this.matchFinder._bufferOffset + this.matchFinder._pos + index];
      return byte;
    }
    /**
     * Calculate match length between current position and a previous position
     */
    getMatchLen(index, distance, limit) {
      if (this.matchFinder._streamEndWasReached) {
        if (this.matchFinder._pos + index + limit > this.matchFinder._streamPos) {
          limit = this.matchFinder._streamPos - (this.matchFinder._pos + index);
        }
      }
      ++distance;
      let i2;
      const pby = this.matchFinder._bufferOffset + this.matchFinder._pos + index;
      for (i2 = 0; i2 < limit && this.matchFinder._bufferBase[pby + i2] == this.matchFinder._bufferBase[pby + i2 - distance]; ++i2)
        ;
      return i2;
    }
    /**
     * Get number of available bytes in the input window
     */
    getNumAvailableBytes() {
      return this.matchFinder._streamPos - this.matchFinder._pos;
    }
    /**
     * Move buffer block when reaching buffer boundaries
     */
    moveBlock() {
      let offset = this.matchFinder._bufferOffset + this.matchFinder._pos - this.matchFinder._keepSizeBefore;
      if (offset > 0) {
        --offset;
      }
      const numBytes = this.matchFinder._bufferOffset + this.matchFinder._streamPos - offset;
      for (let i2 = 0; i2 < numBytes; ++i2) {
        this.matchFinder._bufferBase[i2] = this.matchFinder._bufferBase[offset + i2];
      }
      this.matchFinder._bufferOffset -= offset;
    }
    /**
     * Move position by one and handle buffer management
     */
    movePos() {
      this.matchFinder._pos += 1;
      if (this.matchFinder._pos > this.matchFinder._posLimit) {
        const pointerToPosition = this.matchFinder._bufferOffset + this.matchFinder._pos;
        if (pointerToPosition > this.matchFinder._pointerToLastSafePosition) {
          this.moveBlock();
        }
        this.readBlock();
      }
    }
    /**
     * Read a block of data from the input stream
     */
    readBlock() {
      if (this.matchFinder._streamEndWasReached) {
        return;
      }
      while (true) {
        const size = -this.matchFinder._bufferOffset + this.matchFinder._blockSize - this.matchFinder._streamPos;
        if (!size) {
          return;
        }
        const bytesRead = this.readFromStream(this.matchFinder._bufferOffset + this.matchFinder._streamPos, size);
        if (bytesRead == -1) {
          this.matchFinder._posLimit = this.matchFinder._streamPos;
          const pointerToPosition = this.matchFinder._bufferOffset + this.matchFinder._posLimit;
          if (pointerToPosition > this.matchFinder._pointerToLastSafePosition) {
            this.matchFinder._posLimit = this.matchFinder._pointerToLastSafePosition - this.matchFinder._bufferOffset;
          }
          this.matchFinder._streamEndWasReached = 1;
          return;
        }
        this.matchFinder._streamPos += bytesRead;
        if (this.matchFinder._streamPos >= this.matchFinder._pos + this.matchFinder._keepSizeAfter) {
          this.matchFinder._posLimit = this.matchFinder._streamPos - this.matchFinder._keepSizeAfter;
        }
      }
    }
    /**
     * Reduce all position offsets by the specified value
     */
    reduceOffsets(subValue) {
      this.matchFinder._bufferOffset += subValue;
      this.matchFinder._posLimit -= subValue;
      this.matchFinder._pos -= subValue;
      this.matchFinder._streamPos -= subValue;
    }
    /**
     * Read data from the input stream into the buffer
     */
    readFromStream(off, len) {
      const stream = this.matchFinder._stream;
      const buffer = this.matchFinder._bufferBase;
      if (stream.pos >= stream.count) {
        return -1;
      }
      let srcBuf;
      if (stream.buf instanceof Uint8Array) {
        srcBuf = Array.from(stream.buf);
      } else if (stream.buf instanceof ArrayBuffer) {
        srcBuf = Array.from(new Uint8Array(stream.buf));
      } else {
        srcBuf = stream.buf;
      }
      len = Math.min(len, stream.count - stream.pos);
      arraycopy(srcBuf, stream.pos, buffer, off, len);
      stream.pos += len;
      return len;
    }
  };

  // node_modules/lzma1/lib/match-finder-config.js
  function computeWindowReservSize(dictionarySize, keepBefore, numFastBytes, keepAfter) {
    return ~~((dictionarySize + keepBefore + numFastBytes + keepAfter) / 2) + 256;
  }
  function ensureCyclicBuffer(matchFinder, dictionarySize) {
    const cyclicBufferSize = dictionarySize + 1;
    if (matchFinder._cyclicBufferSize !== cyclicBufferSize) {
      const doubledCyclicBufferSize = (matchFinder._cyclicBufferSize = cyclicBufferSize) * 2;
      matchFinder._son = initArray(doubledCyclicBufferSize);
    }
  }
  function computeHashSize(dictionarySize, hashArrayEnabled) {
    let hs = 65536;
    let hashMask = 0;
    if (hashArrayEnabled) {
      hs = dictionarySize - 1;
      hs |= hs >> 1;
      hs |= hs >> 2;
      hs |= hs >> 4;
      hs |= hs >> 8;
      hs >>= 1;
      hs |= 65535;
      if (hs > 16777216) {
        hs >>= 1;
      }
      hashMask = hs;
      hs += 1;
    }
    return { hashMask, hashSizeSum: hs };
  }
  function setCutValue(numFastBytes) {
    return 16 + (numFastBytes >> 1);
  }
  function setMatchMaxLen(numFastBytes) {
    return numFastBytes;
  }
  function isDictionarySizeBelowThreshold(dictionarySize) {
    return dictionarySize < DICTIONARY_SIZE_THRESHOLD;
  }

  // node_modules/lzma1/lib/lzma.js
  var MODES = {
    1: { searchDepth: 16, filterStrength: 64, modeIndex: 0 },
    2: { searchDepth: 20, filterStrength: 64, modeIndex: 0 },
    3: { searchDepth: 19, filterStrength: 64, modeIndex: 1 },
    4: { searchDepth: 20, filterStrength: 64, modeIndex: 1 },
    5: { searchDepth: 21, filterStrength: 128, modeIndex: 1 },
    6: { searchDepth: 22, filterStrength: 128, modeIndex: 1 },
    7: { searchDepth: 23, filterStrength: 128, modeIndex: 1 },
    8: { searchDepth: 24, filterStrength: 255, modeIndex: 1 },
    9: { searchDepth: 25, filterStrength: 255, modeIndex: 1 }
  };
  var _encoder, _decoder, _lzInWindow, _compressor, _decompressor, _LZMA_instances, initCompressor_fn, initDecompressor_fn, read_fn, toByteArray_fn, write_fn, write_0_fn, getChars_fn, configure_fn, initCompression_fn, byteArrayCompressor_fn, initDecompression_fn, byteArrayDecompressor_fn, Create_4_fn, MovePos_1_fn, Create_3_fn, GetMatches_fn, Init_5_fn, MovePos_0_fn, NormalizeLinks_fn, SetType_fn, Skip_fn, CodeInChunks_fn, Init_1_fn, Backward_fn, CodeOneBlock_fn, Create_2_fn, Encoder_fn, FillAlignPrices_fn, Flush_fn, GetOptimum_fn, LZMA_Encoder_GetPosLenPrice_fn, GetPureRepPrice_fn, GetRepLen1Price_fn, MovePos_fn, ReadMatchDistances_fn, ReleaseMFStream_fn, ReleaseStreams_fn, LZMA_Encoder_GetSubCoder_fn, RangeCoder_Encoder_GetPrice_0_fn, MakeAsChar_fn, MakeAsShortRep_fn, ReverseGetPrice_fn, GetProcessedSizeAdd_fn, decodeString_fn;
  var LZMA = class {
    constructor() {
      __privateAdd(this, _LZMA_instances);
      __privateAdd(this, _encoder);
      __privateAdd(this, _decoder);
      __privateAdd(this, _lzInWindow, null);
      __privateAdd(this, _compressor);
      __privateAdd(this, _decompressor);
      __privateSet(this, _encoder, new Encoder());
      __privateSet(this, _decoder, new Decoder());
      __privateSet(this, _compressor, __privateMethod(this, _LZMA_instances, initCompressor_fn).call(this));
      __privateSet(this, _decompressor, __privateMethod(this, _LZMA_instances, initDecompressor_fn).call(this));
    }
    writeHeaderProperties() {
      const HEADER_SIZE = 5;
      __privateGet(this, _encoder).properties[0] = (__privateGet(this, _encoder)._posStateBits * 5 + __privateGet(this, _encoder)._numLiteralPosStateBits) * 9 + __privateGet(this, _encoder)._numLiteralContextBits & 255;
      for (let byteIndex = 0; byteIndex < 4; byteIndex++) {
        __privateGet(this, _encoder).properties[1 + byteIndex] = __privateGet(this, _encoder)._dictionarySize >> 8 * byteIndex & 255;
      }
      __privateMethod(this, _LZMA_instances, write_0_fn).call(this, __privateGet(this, _compressor).output, __privateGet(this, _encoder).properties, 0, HEADER_SIZE);
    }
    GetPosSlot2(pos) {
      if (pos < 131072) {
        return G_FAST_POS[pos >> 6] + 12;
      }
      if (pos < 134217728) {
        return G_FAST_POS[pos >> 16] + 32;
      }
      return G_FAST_POS[pos >> 26] + 52;
    }
    ReverseEncode(startIndex, NumBitLevels, symbol) {
      let bit, m = 1;
      for (let i2 = 0; i2 < NumBitLevels; ++i2) {
        bit = symbol & 1;
        __privateGet(this, _compressor).chunker.encoder.encodeBit(__privateGet(this, _compressor).chunker.encoder._posEncoders, startIndex + m, bit);
        m = m << 1 | bit;
        symbol >>= 1;
      }
    }
    encodeString(inputString) {
      let ch, chars = [], elen = 0, l = inputString.length;
      __privateMethod(this, _LZMA_instances, getChars_fn).call(this, inputString, 0, l, chars, 0);
      for (let i2 = 0; i2 < l; ++i2) {
        ch = chars[i2];
        if (ch >= 1 && ch <= 127) {
          ++elen;
        } else if (!ch || ch >= 128 && ch <= 2047) {
          elen += 2;
        } else {
          elen += 3;
        }
      }
      const data = [];
      elen = 0;
      for (let i2 = 0; i2 < l; ++i2) {
        ch = chars[i2];
        if (ch >= 1 && ch <= 127) {
          data[elen++] = ch << 24 >> 24;
        } else if (!ch || ch >= 128 && ch <= 2047) {
          data[elen++] = (192 | ch >> 6 & 31) << 24 >> 24;
          data[elen++] = (128 | ch & 63) << 24 >> 24;
        } else {
          data[elen++] = (224 | ch >> 12 & 15) << 24 >> 24;
          data[elen++] = (128 | ch >> 6 & 63) << 24 >> 24;
          data[elen++] = (128 | ch & 63) << 24 >> 24;
        }
      }
      return data;
    }
    compress(data, mode = 5) {
      const compressionMode = MODES[mode];
      __privateMethod(this, _LZMA_instances, byteArrayCompressor_fn).call(this, data, compressionMode);
      while (__privateGet(this, _compressor).chunker.processChunk())
        ;
      const result = __privateMethod(this, _LZMA_instances, toByteArray_fn).call(this, __privateGet(this, _compressor).output);
      return new Int8Array(result);
    }
    compressString(data, mode = 5) {
      const encodedData = this.encodeString(data);
      return this.compress(new Uint8Array(encodedData), mode);
    }
    decompress(bytearray) {
      __privateMethod(this, _LZMA_instances, byteArrayDecompressor_fn).call(this, bytearray);
      while (__privateGet(this, _decompressor).chunker.processChunk())
        ;
      return __privateMethod(this, _LZMA_instances, toByteArray_fn).call(this, __privateGet(this, _decompressor).output);
    }
    decompressString(bytearray) {
      __privateMethod(this, _LZMA_instances, byteArrayDecompressor_fn).call(this, bytearray);
      while (__privateGet(this, _decompressor).chunker.processChunk())
        ;
      const decodedByteArray = __privateMethod(this, _LZMA_instances, toByteArray_fn).call(this, __privateGet(this, _decompressor).output);
      const result = __privateMethod(this, _LZMA_instances, decodeString_fn).call(this, decodedByteArray);
      if (typeof result === "string") {
        return result;
      } else {
        return String.fromCharCode(...result);
      }
    }
    // Public methods for chunker access
    codeOneBlock() {
      __privateMethod(this, _LZMA_instances, CodeOneBlock_fn).call(this);
    }
    releaseStreams() {
      __privateMethod(this, _LZMA_instances, ReleaseStreams_fn).call(this);
    }
  };
  _encoder = new WeakMap();
  _decoder = new WeakMap();
  _lzInWindow = new WeakMap();
  _compressor = new WeakMap();
  _decompressor = new WeakMap();
  _LZMA_instances = new WeakSet();
  initCompressor_fn = function() {
    const encoderChunker = new EncoderChunker(this);
    return {
      chunker: encoderChunker,
      output: {
        buf: initArray(32),
        count: 0,
        write: () => {
        }
      }
    };
  };
  initDecompressor_fn = function() {
    const decoderChunker = new DecoderChunker(__privateGet(this, _decoder));
    return {
      chunker: decoderChunker,
      output: {
        buf: initArray(32),
        count: 0,
        write: () => {
        }
      }
    };
  };
  read_fn = function(inputStream) {
    if (inputStream.pos >= inputStream.count) {
      return -1;
    }
    let value;
    if (inputStream.buf instanceof ArrayBuffer) {
      value = new Uint8Array(inputStream.buf)[inputStream.pos++];
    } else if (inputStream.buf instanceof Uint8Array) {
      value = inputStream.buf[inputStream.pos++];
    } else {
      value = inputStream.buf[inputStream.pos++];
    }
    return value & 255;
  };
  toByteArray_fn = function(output) {
    const data = output.buf.slice(0, output.count);
    return data;
  };
  write_fn = function(buffer, b2) {
    if (!buffer)
      return;
    if (buffer.count >= buffer.buf.length) {
      const newSize = Math.max(buffer.buf.length * 2, buffer.count + 1);
      const newBuf = new Array(newSize);
      for (let i2 = 0; i2 < buffer.count; i2++) {
        newBuf[i2] = buffer.buf[i2];
      }
      buffer.buf = newBuf;
    }
    buffer.buf[buffer.count++] = b2 << 24 >> 24;
  };
  write_0_fn = function(buffer, buf, off, len) {
    const requiredSize = buffer.count + len;
    if (requiredSize > buffer.buf.length) {
      const newSize = Math.max(buffer.buf.length * 2, requiredSize);
      const newBuf = new Array(newSize);
      for (let i2 = 0; i2 < buffer.count; i2++) {
        newBuf[i2] = buffer.buf[i2];
      }
      buffer.buf = newBuf;
    }
    arraycopy(buf, off, buffer.buf, buffer.count, len);
    buffer.count += len;
  };
  getChars_fn = function(inputString, srcBegin, srcEnd, dst, dstBegin) {
    for (let srcIdx = srcBegin; srcIdx < srcEnd; ++srcIdx) {
      dst[dstBegin++] = inputString.charCodeAt(srcIdx);
    }
  };
  configure_fn = function(mode) {
    __privateGet(this, _encoder).initialize();
    __privateGet(this, _encoder).configure(mode);
  };
  initCompression_fn = function(input, len, mode) {
    if (compare64(len, N1_LONG_LIT) < 0) {
      throw new Error("invalid length " + len);
    }
    __privateGet(this, _compressor).length_0 = len;
    __privateMethod(this, _LZMA_instances, Encoder_fn).call(this);
    __privateMethod(this, _LZMA_instances, configure_fn).call(this, mode);
    this.writeHeaderProperties();
    for (let i2 = 0; i2 < 64; i2 += 8) {
      __privateMethod(this, _LZMA_instances, write_fn).call(this, __privateGet(this, _compressor).output, lowBits64(shr64(len, i2)) & 255);
    }
    __privateGet(this, _encoder)._needReleaseMFStream = 0;
    __privateGet(this, _encoder)._inStream = input;
    __privateGet(this, _encoder)._finished = 0;
    __privateMethod(this, _LZMA_instances, Create_2_fn).call(this);
    __privateGet(this, _encoder)._rangeEncoder.stream = __privateGet(this, _compressor).output;
    __privateGet(this, _encoder).init();
    __privateGet(this, _encoder).fillDistancesPrices();
    __privateGet(this, _encoder).fillAlignPrices();
    __privateGet(this, _encoder)._lenEncoder.setTableSize(__privateGet(this, _encoder)._numFastBytes + 1 - 2);
    __privateGet(this, _encoder)._lenEncoder.updateTables(1 << __privateGet(this, _encoder)._posStateBits);
    __privateGet(this, _encoder)._repMatchLenEncoder.setTableSize(__privateGet(this, _encoder)._numFastBytes + 1 - 2);
    __privateGet(this, _encoder)._repMatchLenEncoder.updateTables(1 << __privateGet(this, _encoder)._posStateBits);
    __privateGet(this, _encoder).nowPos64 = P0_LONG_LIT;
    __privateGet(this, _compressor).chunker.encoder = __privateGet(this, _encoder);
    __privateGet(this, _compressor).chunker.alive = 1;
  };
  byteArrayCompressor_fn = function(data, mode) {
    const inputSize = data instanceof ArrayBuffer ? data.byteLength : data.length;
    const estimatedOutputSize = Math.max(32, Math.ceil(inputSize * 1.2));
    __privateGet(this, _compressor).output = {
      buf: initArray(estimatedOutputSize),
      count: 0,
      write: () => {
      }
    };
    const inputBuffer = {
      pos: 0,
      buf: data instanceof ArrayBuffer ? new Uint8Array(data) : data,
      count: data instanceof ArrayBuffer ? new Uint8Array(data).length : data.length
    };
    __privateMethod(this, _LZMA_instances, initCompression_fn).call(this, inputBuffer, fromInt64(data instanceof ArrayBuffer ? data.byteLength : data.length), mode);
  };
  initDecompression_fn = function(input) {
    let hex_length = "", properties = [], r, tmp_length;
    for (let i2 = 0; i2 < 5; ++i2) {
      r = __privateMethod(this, _LZMA_instances, read_fn).call(this, input);
      if (r == -1) {
        throw new Error("truncated input");
      }
      properties[i2] = r << 24 >> 24;
    }
    const isDecoderInitialized = !__privateGet(this, _decoder).setDecoderProperties(properties) ? 1 : 0;
    if (isDecoderInitialized) {
      throw new Error("corrupted input");
    }
    for (let i2 = 0; i2 < 64; i2 += 8) {
      r = __privateMethod(this, _LZMA_instances, read_fn).call(this, input);
      if (r == -1) {
        throw new Error("truncated input");
      }
      r = r.toString(16);
      if (r.length == 1)
        r = "0" + r;
      hex_length = r + "" + hex_length;
    }
    if (/^0+$|^f+$/i.test(hex_length)) {
      __privateGet(this, _compressor).length_0 = N1_LONG_LIT;
    } else {
      tmp_length = parseInt(hex_length, 16);
      if (tmp_length > _MAX_UINT32) {
        __privateGet(this, _compressor).length_0 = N1_LONG_LIT;
      } else {
        __privateGet(this, _compressor).length_0 = fromInt64(tmp_length);
      }
    }
    __privateGet(this, _decompressor).chunker = __privateMethod(this, _LZMA_instances, CodeInChunks_fn).call(this, input, __privateGet(this, _compressor).length_0);
  };
  byteArrayDecompressor_fn = function(data) {
    const inputDataSize = data instanceof ArrayBuffer ? data.byteLength : data.length;
    const minBufferSize = 32;
    const estimatedOutputSize = inputDataSize * 2;
    const initialBufferSize = Math.max(minBufferSize, estimatedOutputSize);
    __privateGet(this, _decompressor).output = {
      buf: initArray(initialBufferSize),
      count: 0,
      write: () => {
      }
    };
    const inputBuffer = {
      buf: data,
      pos: 0,
      count: data instanceof ArrayBuffer ? data.byteLength : data.length
    };
    __privateMethod(this, _LZMA_instances, initDecompression_fn).call(this, inputBuffer);
  };
  Create_4_fn = function(keepSizeBefore, keepSizeAfter, keepSizeReserv) {
    let blockSize;
    __privateGet(this, _encoder)._matchFinder._keepSizeBefore = keepSizeBefore;
    __privateGet(this, _encoder)._matchFinder._keepSizeAfter = keepSizeAfter;
    blockSize = keepSizeBefore + keepSizeAfter + keepSizeReserv;
    if (__privateGet(this, _encoder)._matchFinder._bufferBase == null || __privateGet(this, _encoder)._matchFinder._blockSize != blockSize) {
      __privateGet(this, _encoder)._matchFinder._bufferBase = initArray(blockSize);
      __privateGet(this, _encoder)._matchFinder._blockSize = blockSize;
    }
    __privateGet(this, _encoder)._matchFinder._pointerToLastSafePosition = __privateGet(this, _encoder)._matchFinder._blockSize - keepSizeAfter;
  };
  MovePos_1_fn = function() {
    const matchFinder = __privateGet(this, _compressor).chunker.encoder._matchFinder;
    let pointerToPostion;
    matchFinder._pos += 1;
    if (matchFinder._pos > matchFinder._posLimit) {
      pointerToPostion = matchFinder._bufferOffset + matchFinder._pos;
      if (pointerToPostion > matchFinder._pointerToLastSafePosition) {
        __privateGet(this, _lzInWindow).moveBlock();
      }
      __privateGet(this, _lzInWindow).readBlock();
    }
  };
  Create_3_fn = function(keepAddBufferBefore, keepAddBufferAfter) {
    const dictionarySize = __privateGet(this, _encoder)._dictionarySize;
    const numFastBytes = __privateGet(this, _encoder)._numFastBytes;
    if (isDictionarySizeBelowThreshold(dictionarySize)) {
      __privateGet(this, _encoder)._matchFinder._cutValue = setCutValue(numFastBytes);
      const windowReservSize = computeWindowReservSize(dictionarySize, keepAddBufferBefore, numFastBytes, keepAddBufferAfter);
      __privateMethod(this, _LZMA_instances, Create_4_fn).call(this, dictionarySize + keepAddBufferBefore, numFastBytes + keepAddBufferAfter, windowReservSize);
      __privateGet(this, _encoder)._matchFinder._matchMaxLen = setMatchMaxLen(numFastBytes);
      ensureCyclicBuffer(__privateGet(this, _encoder)._matchFinder, dictionarySize);
      const { hashMask, hashSizeSum } = computeHashSize(dictionarySize, __privateGet(this, _encoder)._matchFinder.HASH_ARRAY);
      if (__privateGet(this, _encoder)._matchFinder.HASH_ARRAY) {
        __privateGet(this, _encoder)._matchFinder._hashMask = hashMask;
        const finalHashSizeSum = hashSizeSum + __privateGet(this, _encoder)._matchFinder.kFixHashSize;
        if (finalHashSizeSum !== __privateGet(this, _encoder)._matchFinder._hashSizeSum) {
          __privateGet(this, _encoder)._matchFinder._hashSizeSum = finalHashSizeSum;
          __privateGet(this, _encoder)._matchFinder._hash = initArray(finalHashSizeSum);
        }
      } else {
        if (hashSizeSum !== __privateGet(this, _encoder)._matchFinder._hashSizeSum) {
          __privateGet(this, _encoder)._matchFinder._hashSizeSum = hashSizeSum;
          __privateGet(this, _encoder)._matchFinder._hash = initArray(hashSizeSum);
        }
      }
    }
  };
  GetMatches_fn = function() {
    let count, cur, curMatch, curMatch2, curMatch3, cyclicPos, delta, hash2Value, hash3Value, hashValue, len, len0, len1, lenLimit, matchMinPos, maxLen, offset, pby1, ptr0, ptr1, temp;
    const matchFinder = __privateGet(this, _compressor).chunker.encoder._matchFinder;
    const distances = __privateGet(this, _compressor).chunker.encoder._matchDistances;
    if (matchFinder._pos + matchFinder._matchMaxLen <= matchFinder._streamPos) {
      lenLimit = matchFinder._matchMaxLen;
    } else {
      lenLimit = matchFinder._streamPos - matchFinder._pos;
      if (lenLimit < matchFinder.kMinMatchCheck) {
        __privateMethod(this, _LZMA_instances, MovePos_0_fn).call(this);
        return 0;
      }
    }
    offset = 0;
    matchMinPos = matchFinder._pos > matchFinder._cyclicBufferSize ? matchFinder._pos - matchFinder._cyclicBufferSize : 0;
    cur = matchFinder._bufferOffset + matchFinder._pos;
    maxLen = 1;
    hash2Value = 0;
    hash3Value = 0;
    if (matchFinder.HASH_ARRAY) {
      temp = CRC32_TABLE[matchFinder._bufferBase[cur] & 255] ^ matchFinder._bufferBase[cur + 1] & 255;
      hash2Value = temp & 1023;
      temp ^= (matchFinder._bufferBase[cur + 2] & 255) << 8;
      hash3Value = temp & 65535;
      hashValue = (temp ^ CRC32_TABLE[matchFinder._bufferBase[cur + 3] & 255] << 5) & matchFinder._hashMask;
    } else {
      hashValue = matchFinder._bufferBase[cur] & 255 ^ (matchFinder._bufferBase[cur + 1] & 255) << 8;
    }
    curMatch = matchFinder._hash[matchFinder.kFixHashSize + hashValue] || 0;
    if (matchFinder.HASH_ARRAY) {
      curMatch2 = matchFinder._hash[hash2Value] || 0;
      curMatch3 = matchFinder._hash[1024 + hash3Value] || 0;
      matchFinder._hash[hash2Value] = matchFinder._pos;
      matchFinder._hash[1024 + hash3Value] = matchFinder._pos;
      if (curMatch2 > matchMinPos) {
        if (matchFinder._bufferBase[matchFinder._bufferOffset + curMatch2] == matchFinder._bufferBase[cur]) {
          distances[offset++] = maxLen = 2;
          distances[offset++] = matchFinder._pos - curMatch2 - 1;
        }
      }
      if (curMatch3 > matchMinPos) {
        if (matchFinder._bufferBase[matchFinder._bufferOffset + curMatch3] == matchFinder._bufferBase[cur]) {
          if (curMatch3 == curMatch2) {
            offset -= 2;
          }
          distances[offset++] = maxLen = 3;
          distances[offset++] = matchFinder._pos - curMatch3 - 1;
          curMatch2 = curMatch3;
        }
      }
      if (offset != 0 && curMatch2 == curMatch) {
        offset -= 2;
        maxLen = 1;
      }
    }
    matchFinder._hash[matchFinder.kFixHashSize + hashValue] = matchFinder._pos;
    ptr0 = (matchFinder._cyclicBufferPos << 1) + 1;
    ptr1 = matchFinder._cyclicBufferPos << 1;
    len0 = len1 = matchFinder.kNumHashDirectBytes;
    if (matchFinder.kNumHashDirectBytes != 0) {
      if (curMatch > matchMinPos) {
        if (matchFinder._bufferBase[matchFinder._bufferOffset + curMatch + matchFinder.kNumHashDirectBytes] != matchFinder._bufferBase[cur + matchFinder.kNumHashDirectBytes]) {
          distances[offset++] = maxLen = matchFinder.kNumHashDirectBytes;
          distances[offset++] = matchFinder._pos - curMatch - 1;
        }
      }
    }
    count = matchFinder._cutValue;
    while (1) {
      if (curMatch <= matchMinPos || count == 0) {
        count -= 1;
        matchFinder._son[ptr0] = matchFinder._son[ptr1] = 0;
        break;
      }
      delta = matchFinder._pos - curMatch;
      cyclicPos = (delta <= matchFinder._cyclicBufferPos ? matchFinder._cyclicBufferPos - delta : matchFinder._cyclicBufferPos - delta + matchFinder._cyclicBufferSize) << 1;
      pby1 = matchFinder._bufferOffset + curMatch;
      len = len0 < len1 ? len0 : len1;
      if (matchFinder._bufferBase[pby1 + len] == matchFinder._bufferBase[cur + len]) {
        while ((len += 1) != lenLimit) {
          if (matchFinder._bufferBase[pby1 + len] != matchFinder._bufferBase[cur + len]) {
            break;
          }
        }
        if (maxLen < len) {
          distances[offset++] = maxLen = len;
          distances[offset++] = delta - 1;
          if (len == lenLimit) {
            matchFinder._son[ptr1] = matchFinder._son[cyclicPos];
            matchFinder._son[ptr0] = matchFinder._son[cyclicPos + 1];
            break;
          }
        }
      }
      if ((matchFinder._bufferBase[pby1 + len] & 255) < (matchFinder._bufferBase[cur + len] & 255)) {
        matchFinder._son[ptr1] = curMatch;
        ptr1 = cyclicPos + 1;
        curMatch = matchFinder._son[ptr1];
        len1 = len;
      } else {
        matchFinder._son[ptr0] = curMatch;
        ptr0 = cyclicPos;
        curMatch = matchFinder._son[ptr0];
        len0 = len;
      }
    }
    __privateMethod(this, _LZMA_instances, MovePos_0_fn).call(this);
    return offset;
  };
  Init_5_fn = function() {
    __privateGet(this, _compressor).chunker.encoder._matchFinder._bufferOffset = 0;
    __privateGet(this, _compressor).chunker.encoder._matchFinder._pos = 0;
    __privateGet(this, _compressor).chunker.encoder._matchFinder._streamPos = 0;
    __privateGet(this, _compressor).chunker.encoder._matchFinder._streamEndWasReached = 0;
    __privateGet(this, _lzInWindow).readBlock();
    __privateGet(this, _compressor).chunker.encoder._matchFinder._cyclicBufferPos = 0;
    __privateGet(this, _lzInWindow).reduceOffsets(-1);
  };
  MovePos_0_fn = function() {
    let subValue;
    const matchFinder = __privateGet(this, _compressor).chunker.encoder._matchFinder;
    if ((matchFinder._cyclicBufferPos += 1) >= matchFinder._cyclicBufferSize) {
      matchFinder._cyclicBufferPos = 0;
    }
    __privateMethod(this, _LZMA_instances, MovePos_1_fn).call(this);
    if (matchFinder._pos == DICTIONARY_SIZE_THRESHOLD) {
      subValue = matchFinder._pos - matchFinder._cyclicBufferSize;
      __privateMethod(this, _LZMA_instances, NormalizeLinks_fn).call(this, matchFinder._cyclicBufferSize * 2, subValue);
      __privateMethod(this, _LZMA_instances, NormalizeLinks_fn).call(this, matchFinder._hashSizeSum, subValue);
      __privateGet(this, _lzInWindow).reduceOffsets(subValue);
    }
  };
  /**
   * This is only called after reading one whole gigabyte.
   */
  NormalizeLinks_fn = function(numItems, subValue) {
    const items = __privateGet(this, _compressor).chunker.encoder._matchFinder._son;
    for (let i2 = 0, value; i2 < numItems; ++i2) {
      value = items[i2] || 0;
      if (value <= subValue) {
        value = 0;
      } else {
        value -= subValue;
      }
      items[i2] = value;
    }
  };
  SetType_fn = function(binTree, numHashBytes) {
    binTree.HASH_ARRAY = numHashBytes > 2;
    if (binTree.HASH_ARRAY) {
      binTree.kNumHashDirectBytes = 0;
      binTree.kMinMatchCheck = 4;
      binTree.kFixHashSize = 66560;
    } else {
      binTree.kNumHashDirectBytes = 2;
      binTree.kMinMatchCheck = 3;
      binTree.kFixHashSize = 0;
    }
  };
  Skip_fn = function(num) {
    const matchFinder = __privateGet(this, _compressor).chunker.encoder._matchFinder;
    let count, cur, curMatch, cyclicPos, delta, hash2Value, hash3Value, hashValue, len, len0, len1, lenLimit, matchMinPos, pby1, ptr0, ptr1, temp;
    do {
      if (matchFinder._pos + matchFinder._matchMaxLen <= matchFinder._streamPos) {
        lenLimit = matchFinder._matchMaxLen;
      } else {
        lenLimit = matchFinder._streamPos - matchFinder._pos;
        if (lenLimit < matchFinder.kMinMatchCheck) {
          __privateMethod(this, _LZMA_instances, MovePos_0_fn).call(this);
          continue;
        }
      }
      matchMinPos = matchFinder._pos > matchFinder._cyclicBufferSize ? matchFinder._pos - matchFinder._cyclicBufferSize : 0;
      cur = matchFinder._bufferOffset + matchFinder._pos;
      if (matchFinder.HASH_ARRAY) {
        temp = CRC32_TABLE[matchFinder._bufferBase[cur] & 255] ^ matchFinder._bufferBase[cur + 1] & 255;
        hash2Value = temp & 1023;
        matchFinder._hash[hash2Value] = matchFinder._pos;
        temp ^= (matchFinder._bufferBase[cur + 2] & 255) << 8;
        hash3Value = temp & 65535;
        matchFinder._hash[1024 + hash3Value] = matchFinder._pos;
        hashValue = (temp ^ CRC32_TABLE[matchFinder._bufferBase[cur + 3] & 255] << 5) & matchFinder._hashMask;
      } else {
        hashValue = matchFinder._bufferBase[cur] & 255 ^ (matchFinder._bufferBase[cur + 1] & 255) << 8;
      }
      curMatch = matchFinder._hash[matchFinder.kFixHashSize + hashValue];
      matchFinder._hash[matchFinder.kFixHashSize + hashValue] = matchFinder._pos;
      ptr0 = (matchFinder._cyclicBufferPos << 1) + 1;
      ptr1 = matchFinder._cyclicBufferPos << 1;
      len0 = len1 = matchFinder.kNumHashDirectBytes;
      count = matchFinder._cutValue;
      while (1) {
        if (curMatch <= matchMinPos || count == 0) {
          count -= 1;
          matchFinder._son[ptr0] = matchFinder._son[ptr1] = 0;
          break;
        }
        delta = matchFinder._pos - curMatch;
        cyclicPos = (delta <= matchFinder._cyclicBufferPos ? matchFinder._cyclicBufferPos - delta : matchFinder._cyclicBufferPos - delta + matchFinder._cyclicBufferSize) << 1;
        pby1 = matchFinder._bufferOffset + curMatch;
        len = len0 < len1 ? len0 : len1;
        if (matchFinder._bufferBase[pby1 + len] == matchFinder._bufferBase[cur + len]) {
          while ((len += 1) != lenLimit) {
            if (matchFinder._bufferBase[pby1 + len] != matchFinder._bufferBase[cur + len]) {
              break;
            }
          }
          if (len == lenLimit) {
            matchFinder._son[ptr1] = matchFinder._son[cyclicPos];
            matchFinder._son[ptr0] = matchFinder._son[cyclicPos + 1];
            break;
          }
        }
        if ((matchFinder._bufferBase[pby1 + len] & 255) < (matchFinder._bufferBase[cur + len] & 255)) {
          matchFinder._son[ptr1] = curMatch;
          ptr1 = cyclicPos + 1;
          curMatch = matchFinder._son[ptr1];
          len1 = len;
        } else {
          matchFinder._son[ptr0] = curMatch;
          ptr0 = cyclicPos;
          curMatch = matchFinder._son[ptr0];
          len0 = len;
        }
      }
      __privateMethod(this, _LZMA_instances, MovePos_0_fn).call(this);
    } while ((num -= 1) != 0);
  };
  CodeInChunks_fn = function(inStream, outSize) {
    __privateGet(this, _decoder).rangeDecoder.stream = inStream;
    __privateGet(this, _decoder).flush();
    __privateGet(this, _decoder).outWindow.stream = null;
    __privateGet(this, _decoder).outWindow.stream = __privateGet(this, _decompressor).output;
    __privateMethod(this, _LZMA_instances, Init_1_fn).call(this);
    __privateGet(this, _decoder).state = 0;
    __privateGet(this, _decoder).rep0 = 0;
    __privateGet(this, _decoder).rep1 = 0;
    __privateGet(this, _decoder).rep2 = 0;
    __privateGet(this, _decoder).rep3 = 0;
    __privateGet(this, _decoder).outSize = outSize;
    __privateGet(this, _decoder).nowPos64 = P0_LONG_LIT;
    __privateGet(this, _decoder).prevByte = 0;
    const decoderChunker = new DecoderChunker(__privateGet(this, _decoder));
    decoderChunker.alive = 1;
    return decoderChunker;
  };
  Init_1_fn = function() {
    __privateGet(this, _decoder).init();
  };
  Backward_fn = function(cur) {
    const encoder = __privateGet(this, _compressor).chunker.encoder;
    let backCur, backMem, posMem, posPrev;
    encoder._optimumEndIndex = cur;
    posMem = encoder._optimum[cur].posPrev;
    backMem = encoder._optimum[cur].backPrev;
    do {
      if (encoder._optimum[cur].prev1IsChar) {
        __privateMethod(this, _LZMA_instances, MakeAsChar_fn).call(this, encoder._optimum[posMem]);
        encoder._optimum[posMem].posPrev = posMem - 1;
        if (encoder._optimum[cur].prev2) {
          encoder._optimum[posMem - 1].prev1IsChar = 0;
          encoder._optimum[posMem - 1].posPrev = encoder._optimum[cur].posPrev2;
          encoder._optimum[posMem - 1].backPrev = encoder._optimum[cur].backPrev2;
        }
      }
      posPrev = posMem;
      backCur = backMem;
      backMem = encoder._optimum[posPrev].backPrev;
      posMem = encoder._optimum[posPrev].posPrev;
      encoder._optimum[posPrev].backPrev = backCur;
      encoder._optimum[posPrev].posPrev = cur;
      cur = posPrev;
    } while (cur > 0);
    encoder.backRes = encoder._optimum[0].backPrev;
    encoder._optimumCurrentIndex = encoder._optimum[0].posPrev;
    return encoder._optimumCurrentIndex;
  };
  CodeOneBlock_fn = function() {
    let baseVal, complexState, curByte, distance, footerBits, len, lenToPosState, matchByte, pos, posReduced, posSlot, posState, progressPosValuePrev, subCoder;
    __privateGet(this, _compressor).chunker.encoder.processedInSize[0] = P0_LONG_LIT;
    __privateGet(this, _compressor).chunker.encoder.processedOutSize[0] = P0_LONG_LIT;
    __privateGet(this, _compressor).chunker.encoder.finished[0] = 1;
    progressPosValuePrev = __privateGet(this, _compressor).chunker.encoder.nowPos64;
    if (__privateGet(this, _compressor).chunker.encoder._inStream) {
      __privateGet(this, _compressor).chunker.encoder._matchFinder._stream = __privateGet(this, _compressor).chunker.encoder._inStream;
      __privateMethod(this, _LZMA_instances, Init_5_fn).call(this);
      __privateGet(this, _compressor).chunker.encoder._needReleaseMFStream = 1;
      __privateGet(this, _compressor).chunker.encoder._inStream = null;
    }
    if (__privateGet(this, _compressor).chunker.encoder._finished) {
      return;
    }
    __privateGet(this, _compressor).chunker.encoder._finished = 1;
    if (compare64(__privateGet(this, _compressor).chunker.encoder.nowPos64, P0_LONG_LIT) === 0) {
      if (!__privateGet(this, _lzInWindow).getNumAvailableBytes()) {
        __privateMethod(this, _LZMA_instances, Flush_fn).call(this, lowBits64(__privateGet(this, _compressor).chunker.encoder.nowPos64));
        return;
      }
      __privateMethod(this, _LZMA_instances, ReadMatchDistances_fn).call(this);
      posState = lowBits64(__privateGet(this, _compressor).chunker.encoder.nowPos64) & __privateGet(this, _compressor).chunker.encoder._posStateMask;
      __privateGet(this, _compressor).chunker.encoder.encodeBit(__privateGet(this, _compressor).chunker.encoder._isMatch, (__privateGet(this, _compressor).chunker.encoder._state << 4) + posState, 0);
      __privateGet(this, _compressor).chunker.encoder._state = stateUpdateChar(__privateGet(this, _compressor).chunker.encoder._state);
      curByte = __privateGet(this, _lzInWindow).getIndexByte(-__privateGet(this, _compressor).chunker.encoder._additionalOffset);
      __privateGet(this, _compressor).chunker.encoder.encodeLiteral(__privateMethod(this, _LZMA_instances, LZMA_Encoder_GetSubCoder_fn).call(this, lowBits64(__privateGet(this, _compressor).chunker.encoder.nowPos64), __privateGet(this, _compressor).chunker.encoder._previousByte), curByte);
      __privateGet(this, _compressor).chunker.encoder._previousByte = curByte;
      __privateGet(this, _compressor).chunker.encoder._additionalOffset -= 1;
      __privateGet(this, _compressor).chunker.encoder.nowPos64 = add64(__privateGet(this, _compressor).chunker.encoder.nowPos64, P1_LONG_LIT);
    }
    if (!__privateGet(this, _lzInWindow).getNumAvailableBytes()) {
      __privateMethod(this, _LZMA_instances, Flush_fn).call(this, lowBits64(__privateGet(this, _compressor).chunker.encoder.nowPos64));
      return;
    }
    while (1) {
      len = __privateMethod(this, _LZMA_instances, GetOptimum_fn).call(this, lowBits64(__privateGet(this, _compressor).chunker.encoder.nowPos64));
      pos = __privateGet(this, _compressor).chunker.encoder.backRes;
      posState = lowBits64(__privateGet(this, _compressor).chunker.encoder.nowPos64) & __privateGet(this, _compressor).chunker.encoder._posStateMask;
      complexState = (__privateGet(this, _compressor).chunker.encoder._state << 4) + posState;
      if (len == 1 && pos == -1) {
        __privateGet(this, _compressor).chunker.encoder.encodeBit(__privateGet(this, _compressor).chunker.encoder._isMatch, complexState, 0);
        curByte = __privateGet(this, _lzInWindow).getIndexByte(-__privateGet(this, _compressor).chunker.encoder._additionalOffset);
        subCoder = __privateMethod(this, _LZMA_instances, LZMA_Encoder_GetSubCoder_fn).call(this, lowBits64(__privateGet(this, _compressor).chunker.encoder.nowPos64), __privateGet(this, _compressor).chunker.encoder._previousByte);
        if (__privateGet(this, _compressor).chunker.encoder._state < 7) {
          __privateGet(this, _compressor).chunker.encoder.encodeLiteral(subCoder, curByte);
        } else {
          matchByte = __privateGet(this, _lzInWindow).getIndexByte(-__privateGet(this, _compressor).chunker.encoder._repDistances[0] - 1 - __privateGet(this, _compressor).chunker.encoder._additionalOffset);
          __privateGet(this, _compressor).chunker.encoder.encodeMatched(subCoder, matchByte, curByte);
        }
        __privateGet(this, _compressor).chunker.encoder._previousByte = curByte;
        __privateGet(this, _compressor).chunker.encoder._state = stateUpdateChar(__privateGet(this, _compressor).chunker.encoder._state);
      } else {
        __privateGet(this, _compressor).chunker.encoder.encodeBit(__privateGet(this, _compressor).chunker.encoder._isMatch, complexState, 1);
        if (pos < 4) {
          __privateGet(this, _compressor).chunker.encoder.encodeBit(__privateGet(this, _compressor).chunker.encoder._isRep, __privateGet(this, _compressor).chunker.encoder._state, 1);
          if (!pos) {
            __privateGet(this, _compressor).chunker.encoder.encodeBit(__privateGet(this, _compressor).chunker.encoder._isRepG0, __privateGet(this, _compressor).chunker.encoder._state, 0);
            if (len == 1) {
              __privateGet(this, _compressor).chunker.encoder.encodeBit(__privateGet(this, _compressor).chunker.encoder._isRep0Long, complexState, 0);
            } else {
              __privateGet(this, _compressor).chunker.encoder.encodeBit(__privateGet(this, _compressor).chunker.encoder._isRep0Long, complexState, 1);
            }
          } else {
            __privateGet(this, _compressor).chunker.encoder.encodeBit(__privateGet(this, _compressor).chunker.encoder._isRepG0, __privateGet(this, _compressor).chunker.encoder._state, 1);
            if (pos == 1) {
              __privateGet(this, _compressor).chunker.encoder.encodeBit(__privateGet(this, _compressor).chunker.encoder._isRepG1, __privateGet(this, _compressor).chunker.encoder._state, 0);
            } else {
              __privateGet(this, _compressor).chunker.encoder.encodeBit(__privateGet(this, _compressor).chunker.encoder._isRepG1, __privateGet(this, _compressor).chunker.encoder._state, 1);
              __privateGet(this, _compressor).chunker.encoder.encodeBit(__privateGet(this, _compressor).chunker.encoder._isRepG2, __privateGet(this, _compressor).chunker.encoder._state, pos - 2);
            }
          }
          if (len == 1) {
            __privateGet(this, _compressor).chunker.encoder._state = __privateGet(this, _compressor).chunker.encoder._state < 7 ? 9 : 11;
          } else {
            __privateGet(this, _compressor).chunker.encoder.encodeLength(__privateGet(this, _compressor).chunker.encoder._repMatchLenEncoder, len - 2, posState);
            __privateGet(this, _compressor).chunker.encoder._state = __privateGet(this, _compressor).chunker.encoder._state < 7 ? 8 : 11;
          }
          distance = __privateGet(this, _compressor).chunker.encoder._repDistances[pos];
          if (pos != 0) {
            const encoder = __privateGet(this, _compressor).chunker.encoder;
            for (let i2 = pos; i2 >= 1; --i2) {
              encoder._repDistances[i2] = encoder._repDistances[i2 - 1];
            }
            encoder._repDistances[0] = distance;
          }
        } else {
          __privateGet(this, _compressor).chunker.encoder.encodeBit(__privateGet(this, _compressor).chunker.encoder._isRep, __privateGet(this, _compressor).chunker.encoder._state, 0);
          __privateGet(this, _compressor).chunker.encoder._state = __privateGet(this, _compressor).chunker.encoder._state < 7 ? 7 : 10;
          __privateGet(this, _compressor).chunker.encoder.encodeLength(__privateGet(this, _compressor).chunker.encoder._lenEncoder, len - 2, posState);
          pos -= 4;
          posSlot = __privateGet(this, _compressor).chunker.encoder.getPosSlot(pos);
          lenToPosState = getLenToPosState(len);
          __privateGet(this, _compressor).chunker.encoder.encodeBitTree(__privateGet(this, _compressor).chunker.encoder._posSlotEncoder[lenToPosState], posSlot);
          if (posSlot >= 4) {
            footerBits = (posSlot >> 1) - 1;
            baseVal = (2 | posSlot & 1) << footerBits;
            posReduced = pos - baseVal;
            if (posSlot < 14) {
              __privateGet(this, _compressor).chunker.encoder.reverseEncodeRange(baseVal - posSlot - 1, footerBits, posReduced);
            } else {
              __privateGet(this, _compressor).chunker.encoder.encodeDirectBits(posReduced >> 4, footerBits - 4);
              __privateGet(this, _compressor).chunker.encoder.reverseEncode(posReduced & 15);
              __privateGet(this, _compressor).chunker.encoder._alignPriceCount += 1;
            }
          }
          distance = pos;
          const encoder2 = __privateGet(this, _compressor).chunker.encoder;
          for (let i2 = 3; i2 >= 1; --i2) {
            encoder2._repDistances[i2] = encoder2._repDistances[i2 - 1];
          }
          encoder2._repDistances[0] = distance;
          encoder2._matchPriceCount += 1;
        }
        __privateGet(this, _compressor).chunker.encoder._previousByte = __privateGet(this, _lzInWindow).getIndexByte(len - 1 - __privateGet(this, _compressor).chunker.encoder._additionalOffset);
      }
      __privateGet(this, _compressor).chunker.encoder._additionalOffset -= len;
      __privateGet(this, _compressor).chunker.encoder.nowPos64 = add64(__privateGet(this, _compressor).chunker.encoder.nowPos64, fromInt64(len));
      if (!__privateGet(this, _compressor).chunker.encoder._additionalOffset) {
        if (__privateGet(this, _compressor).chunker.encoder._matchPriceCount >= 128) {
          __privateGet(this, _compressor).chunker.encoder.fillDistancesPrices();
        }
        if (__privateGet(this, _compressor).chunker.encoder._alignPriceCount >= 16) {
          __privateMethod(this, _LZMA_instances, FillAlignPrices_fn).call(this, __privateGet(this, _compressor).chunker.encoder);
        }
        __privateGet(this, _compressor).chunker.encoder.processedInSize[0] = __privateGet(this, _compressor).chunker.encoder.nowPos64;
        __privateGet(this, _compressor).chunker.encoder.processedOutSize[0] = __privateMethod(this, _LZMA_instances, GetProcessedSizeAdd_fn).call(this);
        if (!__privateGet(this, _lzInWindow).getNumAvailableBytes()) {
          __privateMethod(this, _LZMA_instances, Flush_fn).call(this, lowBits64(__privateGet(this, _compressor).chunker.encoder.nowPos64));
          return;
        }
        if (compare64(sub64(__privateGet(this, _compressor).chunker.encoder.nowPos64, progressPosValuePrev), [4096, 0]) >= 0) {
          __privateGet(this, _compressor).chunker.encoder._finished = 0;
          __privateGet(this, _compressor).chunker.encoder.finished[0] = 0;
          return;
        }
      }
    }
  };
  Create_2_fn = function() {
    let binTree, numHashBytes;
    if (!__privateGet(this, _encoder)._matchFinder) {
      binTree = {};
      numHashBytes = 4;
      if (!__privateGet(this, _encoder)._matchFinderType) {
        numHashBytes = 2;
      }
      __privateMethod(this, _LZMA_instances, SetType_fn).call(this, binTree, numHashBytes);
      __privateGet(this, _encoder)._matchFinder = binTree;
      __privateSet(this, _lzInWindow, new LzInWindow(binTree));
    }
    __privateGet(this, _encoder).createLiteralEncoder();
    if (__privateGet(this, _encoder)._dictionarySize == __privateGet(this, _encoder)._dictionarySizePrev && __privateGet(this, _encoder)._numFastBytesPrev == __privateGet(this, _encoder)._numFastBytes) {
      return;
    }
    __privateMethod(this, _LZMA_instances, Create_3_fn).call(this, 4096, 274);
    __privateGet(this, _encoder)._dictionarySizePrev = __privateGet(this, _encoder)._dictionarySize;
    __privateGet(this, _encoder)._numFastBytesPrev = __privateGet(this, _encoder)._numFastBytes;
  };
  Encoder_fn = function() {
    for (let i2 = 0; i2 < 4096; ++i2) {
      __privateGet(this, _encoder)._optimum[i2] = {};
    }
    for (let i2 = 0; i2 < 4; ++i2) {
      __privateGet(this, _encoder)._posSlotEncoder[i2] = createBitTree(6);
    }
  };
  FillAlignPrices_fn = function(encoder) {
    for (let i2 = 0; i2 < 16; ++i2) {
      encoder._alignPrices[i2] = __privateMethod(this, _LZMA_instances, ReverseGetPrice_fn).call(this, encoder._posAlignEncoder, i2);
    }
    encoder._alignPriceCount = 0;
  };
  Flush_fn = function(nowPos) {
    __privateMethod(this, _LZMA_instances, ReleaseMFStream_fn).call(this);
    __privateGet(this, _compressor).chunker.encoder.writeEndMarker(nowPos & __privateGet(this, _compressor).chunker.encoder._posStateMask);
    for (let i2 = 0; i2 < 5; ++i2) {
      __privateGet(this, _compressor).chunker.encoder.shiftLow();
    }
  };
  GetOptimum_fn = function(position) {
    let cur, curAnd1Price, curAndLenCharPrice, curAndLenPrice, curBack, curPrice, currentByte, distance, len, lenEnd, lenMain, lenTest, lenTest2, lenTestTemp, matchByte, matchPrice, newLen, nextIsChar, nextMatchPrice, nextOptimum, nextRepMatchPrice, normalMatchPrice, numAvailableBytes, numAvailableBytesFull, numDistancePairs, offs, offset, opt, optimum, pos, posPrev, posState, posStateNext, price_4, repIndex, repLen, repMatchPrice, repMaxIndex, shortRepPrice, startLen, state, state2, t, price, price_0, price_1, price_2, price_3, lenRes;
    const encoder = __privateGet(this, _compressor).chunker.encoder;
    if (encoder._optimumEndIndex != encoder._optimumCurrentIndex) {
      lenRes = encoder._optimum[encoder._optimumCurrentIndex].posPrev - encoder._optimumCurrentIndex;
      encoder.backRes = encoder._optimum[encoder._optimumCurrentIndex].backPrev;
      encoder._optimumCurrentIndex = encoder._optimum[encoder._optimumCurrentIndex].posPrev;
      return lenRes;
    }
    encoder._optimumCurrentIndex = encoder._optimumEndIndex = 0;
    if (encoder._longestMatchWasFound) {
      lenMain = encoder._longestMatchLength;
      encoder._longestMatchWasFound = 0;
    } else {
      lenMain = __privateMethod(this, _LZMA_instances, ReadMatchDistances_fn).call(this);
    }
    numDistancePairs = encoder._numDistancePairs;
    numAvailableBytes = __privateGet(this, _lzInWindow).getNumAvailableBytes() + 1;
    if (numAvailableBytes < 2) {
      encoder.backRes = -1;
      return 1;
    }
    if (numAvailableBytes > 273) {
      numAvailableBytes = 273;
    }
    repMaxIndex = 0;
    for (let i2 = 0; i2 < 4; ++i2) {
      encoder.reps[i2] = encoder._repDistances[i2];
      encoder.repLens[i2] = __privateGet(this, _lzInWindow).getMatchLen(-1, encoder.reps[i2], 273);
      if (encoder.repLens[i2] > encoder.repLens[repMaxIndex]) {
        repMaxIndex = i2;
      }
    }
    if (encoder.repLens[repMaxIndex] >= encoder._numFastBytes) {
      encoder.backRes = repMaxIndex;
      lenRes = encoder.repLens[repMaxIndex];
      __privateMethod(this, _LZMA_instances, MovePos_fn).call(this, lenRes - 1);
      return lenRes;
    }
    if (lenMain >= encoder._numFastBytes) {
      encoder.backRes = __privateGet(this, _compressor).chunker.encoder._matchDistances[numDistancePairs - 1] + 4;
      __privateMethod(this, _LZMA_instances, MovePos_fn).call(this, lenMain - 1);
      return lenMain;
    }
    currentByte = __privateGet(this, _lzInWindow).getIndexByte(-1);
    matchByte = __privateGet(this, _lzInWindow).getIndexByte(-encoder._repDistances[0] - 1 - 1);
    if (lenMain < 2 && currentByte != matchByte && encoder.repLens[repMaxIndex] < 2) {
      encoder.backRes = -1;
      return 1;
    }
    encoder._optimum[0].state = encoder._state;
    posState = position & encoder._posStateMask;
    encoder._optimum[1].price = PROB_PRICES[encoder._isMatch[(encoder._state << 4) + posState] >>> 2] + __privateMethod(this, _LZMA_instances, RangeCoder_Encoder_GetPrice_0_fn).call(this, __privateMethod(this, _LZMA_instances, LZMA_Encoder_GetSubCoder_fn).call(this, position, encoder._previousByte), encoder._state >= 7, matchByte, currentByte);
    __privateMethod(this, _LZMA_instances, MakeAsChar_fn).call(this, encoder._optimum[1]);
    matchPrice = PROB_PRICES[2048 - encoder._isMatch[(encoder._state << 4) + posState] >>> 2];
    repMatchPrice = matchPrice + PROB_PRICES[2048 - encoder._isRep[encoder._state] >>> 2];
    if (matchByte == currentByte) {
      shortRepPrice = repMatchPrice + __privateMethod(this, _LZMA_instances, GetRepLen1Price_fn).call(this, posState);
      if (shortRepPrice < encoder._optimum[1].price) {
        encoder._optimum[1].price = shortRepPrice;
        __privateMethod(this, _LZMA_instances, MakeAsShortRep_fn).call(this, encoder._optimum[1]);
      }
    }
    lenEnd = lenMain >= encoder.repLens[repMaxIndex] ? lenMain : encoder.repLens[repMaxIndex];
    if (lenEnd < 2) {
      encoder.backRes = encoder._optimum[1].backPrev;
      return 1;
    }
    encoder._optimum[1].posPrev = 0;
    encoder._optimum[0].backs0 = encoder.reps[0];
    encoder._optimum[0].backs1 = encoder.reps[1];
    encoder._optimum[0].backs2 = encoder.reps[2];
    encoder._optimum[0].backs3 = encoder.reps[3];
    len = lenEnd;
    do {
      encoder._optimum[len].price = INFINITY_PRICE;
      len -= 1;
    } while (len >= 2);
    for (let i2 = 0; i2 < 4; ++i2) {
      repLen = encoder.repLens[i2];
      if (repLen < 2) {
        continue;
      }
      price_4 = repMatchPrice + __privateMethod(this, _LZMA_instances, GetPureRepPrice_fn).call(this, i2, encoder._state, posState);
      do {
        curAndLenPrice = price_4 + encoder._repMatchLenEncoder.getPrice(repLen - 2, posState);
        optimum = encoder._optimum[repLen];
        if (curAndLenPrice < optimum.price) {
          optimum.price = curAndLenPrice;
          optimum.posPrev = 0;
          optimum.backPrev = i2;
          optimum.prev1IsChar = 0;
        }
      } while ((repLen -= 1) >= 2);
    }
    normalMatchPrice = matchPrice + PROB_PRICES[encoder._isRep[encoder._state] >>> 2];
    len = encoder.repLens[0] >= 2 ? encoder.repLens[0] + 1 : 2;
    if (len <= lenMain) {
      offs = 0;
      while (len > encoder._matchDistances[offs]) {
        offs += 2;
      }
      for (; ; len += 1) {
        distance = encoder._matchDistances[offs + 1];
        curAndLenPrice = normalMatchPrice + __privateMethod(this, _LZMA_instances, LZMA_Encoder_GetPosLenPrice_fn).call(this, distance, len, posState);
        optimum = encoder._optimum[len];
        if (curAndLenPrice < optimum.price) {
          optimum.price = curAndLenPrice;
          optimum.posPrev = 0;
          optimum.backPrev = distance + 4;
          optimum.prev1IsChar = 0;
        }
        if (len == encoder._matchDistances[offs]) {
          offs += 2;
          if (offs == numDistancePairs) {
            break;
          }
        }
      }
    }
    cur = 0;
    while (1) {
      ++cur;
      if (cur == lenEnd) {
        return __privateMethod(this, _LZMA_instances, Backward_fn).call(this, cur);
      }
      newLen = __privateMethod(this, _LZMA_instances, ReadMatchDistances_fn).call(this);
      numDistancePairs = encoder._numDistancePairs;
      if (newLen >= encoder._numFastBytes) {
        encoder._longestMatchLength = newLen;
        encoder._longestMatchWasFound = 1;
        return __privateMethod(this, _LZMA_instances, Backward_fn).call(this, cur);
      }
      position += 1;
      posPrev = encoder._optimum[cur].posPrev;
      if (encoder._optimum[cur].prev1IsChar) {
        posPrev -= 1;
        if (encoder._optimum[cur].prev2) {
          state = encoder._optimum[encoder._optimum[cur].posPrev2].state;
          if (encoder._optimum[cur].backPrev2 < 4) {
            state = state < 7 ? 8 : 11;
          } else {
            state = state < 7 ? 7 : 10;
          }
        } else {
          state = encoder._optimum[posPrev].state;
        }
        state = stateUpdateChar(state);
      } else {
        state = encoder._optimum[posPrev].state;
      }
      if (posPrev == cur - 1) {
        if (!encoder._optimum[cur].backPrev) {
          state = state < 7 ? 9 : 11;
        } else {
          state = stateUpdateChar(state);
        }
      } else {
        if (encoder._optimum[cur].prev1IsChar && encoder._optimum[cur].prev2) {
          posPrev = encoder._optimum[cur].posPrev2;
          pos = encoder._optimum[cur].backPrev2;
          state = state < 7 ? 8 : 11;
        } else {
          pos = encoder._optimum[cur].backPrev;
          if (pos < 4) {
            state = state < 7 ? 8 : 11;
          } else {
            state = state < 7 ? 7 : 10;
          }
        }
        opt = encoder._optimum[posPrev];
        if (pos < 4) {
          if (!pos) {
            encoder.reps[0] = opt.backs0;
            encoder.reps[1] = opt.backs1;
            encoder.reps[2] = opt.backs2;
            encoder.reps[3] = opt.backs3;
          } else if (pos == 1) {
            encoder.reps[0] = opt.backs1;
            encoder.reps[1] = opt.backs0;
            encoder.reps[2] = opt.backs2;
            encoder.reps[3] = opt.backs3;
          } else if (pos == 2) {
            encoder.reps[0] = opt.backs2;
            encoder.reps[1] = opt.backs0;
            encoder.reps[2] = opt.backs1;
            encoder.reps[3] = opt.backs3;
          } else {
            encoder.reps[0] = opt.backs3;
            encoder.reps[1] = opt.backs0;
            encoder.reps[2] = opt.backs1;
            encoder.reps[3] = opt.backs2;
          }
        } else {
          encoder.reps[0] = pos - 4;
          encoder.reps[1] = opt.backs0;
          encoder.reps[2] = opt.backs1;
          encoder.reps[3] = opt.backs2;
        }
      }
      encoder._optimum[cur].state = state;
      encoder._optimum[cur].backs0 = encoder.reps[0];
      encoder._optimum[cur].backs1 = encoder.reps[1];
      encoder._optimum[cur].backs2 = encoder.reps[2];
      encoder._optimum[cur].backs3 = encoder.reps[3];
      curPrice = encoder._optimum[cur].price;
      currentByte = __privateGet(this, _lzInWindow).getIndexByte(-1);
      matchByte = __privateGet(this, _lzInWindow).getIndexByte(-encoder.reps[0] - 1 - 1);
      posState = position & encoder._posStateMask;
      curAnd1Price = curPrice + PROB_PRICES[encoder._isMatch[(state << 4) + posState] >>> 2] + __privateMethod(this, _LZMA_instances, RangeCoder_Encoder_GetPrice_0_fn).call(this, __privateMethod(this, _LZMA_instances, LZMA_Encoder_GetSubCoder_fn).call(this, position, __privateGet(this, _lzInWindow).getIndexByte(-2)), state >= 7, matchByte, currentByte);
      nextOptimum = encoder._optimum[cur + 1];
      nextIsChar = 0;
      if (curAnd1Price < nextOptimum.price) {
        nextOptimum.price = curAnd1Price;
        nextOptimum.posPrev = cur;
        nextOptimum.backPrev = -1;
        nextOptimum.prev1IsChar = 0;
        nextIsChar = 1;
      }
      matchPrice = curPrice + PROB_PRICES[2048 - encoder._isMatch[(state << 4) + posState] >>> 2];
      repMatchPrice = matchPrice + PROB_PRICES[2048 - encoder._isRep[state] >>> 2];
      if (matchByte == currentByte && !(nextOptimum.posPrev < cur && !nextOptimum.backPrev)) {
        shortRepPrice = repMatchPrice + (PROB_PRICES[encoder._isRepG0[state] >>> 2] + PROB_PRICES[encoder._isRep0Long[(state << 4) + posState] >>> 2]);
        if (shortRepPrice <= nextOptimum.price) {
          nextOptimum.price = shortRepPrice;
          nextOptimum.posPrev = cur;
          nextOptimum.backPrev = 0;
          nextOptimum.prev1IsChar = 0;
          nextIsChar = 1;
        }
      }
      numAvailableBytesFull = __privateGet(this, _lzInWindow).getNumAvailableBytes() + 1;
      numAvailableBytesFull = 4095 - cur < numAvailableBytesFull ? 4095 - cur : numAvailableBytesFull;
      numAvailableBytes = numAvailableBytesFull;
      if (numAvailableBytes < 2) {
        continue;
      }
      if (numAvailableBytes > encoder._numFastBytes) {
        numAvailableBytes = encoder._numFastBytes;
      }
      if (!nextIsChar && matchByte != currentByte) {
        t = Math.min(numAvailableBytesFull - 1, encoder._numFastBytes);
        lenTest2 = __privateGet(this, _lzInWindow).getMatchLen(0, encoder.reps[0], t);
        if (lenTest2 >= 2) {
          state2 = stateUpdateChar(state);
          posStateNext = position + 1 & encoder._posStateMask;
          nextRepMatchPrice = curAnd1Price + PROB_PRICES[2048 - encoder._isMatch[(state2 << 4) + posStateNext] >>> 2] + PROB_PRICES[2048 - encoder._isRep[state2] >>> 2];
          offset = cur + 1 + lenTest2;
          while (lenEnd < offset) {
            encoder._optimum[lenEnd += 1].price = INFINITY_PRICE;
          }
          curAndLenPrice = nextRepMatchPrice + (price = encoder._repMatchLenEncoder.getPrice(lenTest2 - 2, posStateNext), price + __privateMethod(this, _LZMA_instances, GetPureRepPrice_fn).call(this, 0, state2, posStateNext));
          optimum = encoder._optimum[offset];
          if (curAndLenPrice < optimum.price) {
            optimum.price = curAndLenPrice;
            optimum.posPrev = cur + 1;
            optimum.backPrev = 0;
            optimum.prev1IsChar = 1;
            optimum.prev2 = 0;
          }
        }
      }
      startLen = 2;
      for (repIndex = 0; repIndex < 4; ++repIndex) {
        lenTest = __privateGet(this, _lzInWindow).getMatchLen(-1, encoder.reps[repIndex], numAvailableBytes);
        if (lenTest < 2) {
          continue;
        }
        lenTestTemp = lenTest;
        do {
          while (lenEnd < cur + lenTest) {
            encoder._optimum[lenEnd += 1].price = INFINITY_PRICE;
          }
          curAndLenPrice = repMatchPrice + (price_0 = encoder._repMatchLenEncoder.getPrice(lenTest - 2, posState), price_0 + __privateMethod(this, _LZMA_instances, GetPureRepPrice_fn).call(this, repIndex, state, posState));
          optimum = encoder._optimum[cur + lenTest];
          if (curAndLenPrice < optimum.price) {
            optimum.price = curAndLenPrice;
            optimum.posPrev = cur;
            optimum.backPrev = repIndex;
            optimum.prev1IsChar = 0;
          }
        } while ((lenTest -= 1) >= 2);
        lenTest = lenTestTemp;
        if (!repIndex) {
          startLen = lenTest + 1;
        }
        if (lenTest < numAvailableBytesFull) {
          t = Math.min(numAvailableBytesFull - 1 - lenTest, encoder._numFastBytes);
          lenTest2 = __privateGet(this, _lzInWindow).getMatchLen(lenTest, encoder.reps[repIndex], t);
          if (lenTest2 >= 2) {
            state2 = state < 7 ? 8 : 11;
            posStateNext = position + lenTest & encoder._posStateMask;
            curAndLenCharPrice = repMatchPrice + (price_1 = encoder._repMatchLenEncoder.getPrice(lenTest - 2, posState), price_1 + __privateMethod(this, _LZMA_instances, GetPureRepPrice_fn).call(this, repIndex, state, posState)) + PROB_PRICES[encoder._isMatch[(state2 << 4) + posStateNext] >>> 2] + __privateMethod(this, _LZMA_instances, RangeCoder_Encoder_GetPrice_0_fn).call(this, __privateMethod(this, _LZMA_instances, LZMA_Encoder_GetSubCoder_fn).call(this, position + lenTest, __privateGet(this, _lzInWindow).getIndexByte(lenTest - 1 - 1)), true, __privateGet(this, _lzInWindow).getIndexByte(lenTest - 1 - (encoder.reps[repIndex] + 1)), __privateGet(this, _lzInWindow).getIndexByte(lenTest - 1));
            state2 = stateUpdateChar(state2);
            posStateNext = position + lenTest + 1 & encoder._posStateMask;
            nextMatchPrice = curAndLenCharPrice + PROB_PRICES[2048 - encoder._isMatch[(state2 << 4) + posStateNext] >>> 2];
            nextRepMatchPrice = nextMatchPrice + PROB_PRICES[2048 - encoder._isRep[state2] >>> 2];
            offset = lenTest + 1 + lenTest2;
            while (lenEnd < cur + offset) {
              encoder._optimum[lenEnd += 1].price = INFINITY_PRICE;
            }
            curAndLenPrice = nextRepMatchPrice + (price_2 = encoder._repMatchLenEncoder.getPrice(lenTest2 - 2, posStateNext), price_2 + __privateMethod(this, _LZMA_instances, GetPureRepPrice_fn).call(this, 0, state2, posStateNext));
            optimum = encoder._optimum[cur + offset];
            if (curAndLenPrice < optimum.price) {
              optimum.price = curAndLenPrice;
              optimum.posPrev = cur + lenTest + 1;
              optimum.backPrev = 0;
              optimum.prev1IsChar = 1;
              optimum.prev2 = 1;
              optimum.posPrev2 = cur;
              optimum.backPrev2 = repIndex;
            }
          }
        }
      }
      if (newLen > numAvailableBytes) {
        newLen = numAvailableBytes;
        for (numDistancePairs = 0; newLen > encoder._matchDistances[numDistancePairs]; numDistancePairs += 2) {
        }
        encoder._matchDistances[numDistancePairs] = newLen;
        numDistancePairs += 2;
      }
      if (newLen >= startLen) {
        normalMatchPrice = matchPrice + PROB_PRICES[encoder._isRep[state] >>> 2];
        while (lenEnd < cur + newLen) {
          encoder._optimum[lenEnd += 1].price = INFINITY_PRICE;
        }
        offs = 0;
        while (startLen > encoder._matchDistances[offs]) {
          offs += 2;
        }
        for (lenTest = startLen; ; lenTest += 1) {
          curBack = encoder._matchDistances[offs + 1];
          curAndLenPrice = normalMatchPrice + __privateMethod(this, _LZMA_instances, LZMA_Encoder_GetPosLenPrice_fn).call(this, curBack, lenTest, posState);
          optimum = encoder._optimum[cur + lenTest];
          if (curAndLenPrice < optimum.price) {
            optimum.price = curAndLenPrice;
            optimum.posPrev = cur;
            optimum.backPrev = curBack + 4;
            optimum.prev1IsChar = 0;
          }
          if (lenTest == encoder._matchDistances[offs]) {
            if (lenTest < numAvailableBytesFull) {
              t = Math.min(numAvailableBytesFull - 1 - lenTest, encoder._numFastBytes);
              lenTest2 = __privateGet(this, _lzInWindow).getMatchLen(lenTest, curBack, t);
              if (lenTest2 >= 2) {
                state2 = state < 7 ? 7 : 10;
                posStateNext = position + lenTest & encoder._posStateMask;
                curAndLenCharPrice = curAndLenPrice + PROB_PRICES[encoder._isMatch[(state2 << 4) + posStateNext] >>> 2] + __privateMethod(this, _LZMA_instances, RangeCoder_Encoder_GetPrice_0_fn).call(this, __privateMethod(this, _LZMA_instances, LZMA_Encoder_GetSubCoder_fn).call(this, position + lenTest, __privateGet(this, _lzInWindow).getIndexByte(lenTest - 1 - 1)), true, __privateGet(this, _lzInWindow).getIndexByte(lenTest - (curBack + 1) - 1), __privateGet(this, _lzInWindow).getIndexByte(lenTest - 1));
                state2 = stateUpdateChar(state2);
                posStateNext = position + lenTest + 1 & encoder._posStateMask;
                nextMatchPrice = curAndLenCharPrice + PROB_PRICES[2048 - encoder._isMatch[(state2 << 4) + posStateNext] >>> 2];
                nextRepMatchPrice = nextMatchPrice + PROB_PRICES[2048 - encoder._isRep[state2] >>> 2];
                offset = lenTest + 1 + lenTest2;
                while (lenEnd < cur + offset) {
                  encoder._optimum[lenEnd += 1].price = INFINITY_PRICE;
                }
                curAndLenPrice = nextRepMatchPrice + (price_3 = encoder._repMatchLenEncoder.getPrice(lenTest2 - 2, posStateNext), price_3 + __privateMethod(this, _LZMA_instances, GetPureRepPrice_fn).call(this, 0, state2, posStateNext));
                optimum = encoder._optimum[cur + offset];
                if (curAndLenPrice < optimum.price) {
                  optimum.price = curAndLenPrice;
                  optimum.posPrev = cur + lenTest + 1;
                  optimum.backPrev = 0;
                  optimum.prev1IsChar = 1;
                  optimum.prev2 = 1;
                  optimum.posPrev2 = cur;
                  optimum.backPrev2 = curBack + 4;
                }
              }
            }
            offs += 2;
            if (offs == numDistancePairs) {
              break;
            }
          }
        }
      }
    }
    return 1;
  };
  LZMA_Encoder_GetPosLenPrice_fn = function(pos, len, posState) {
    const encoder = __privateGet(this, _compressor).chunker.encoder;
    let price, lenToPosState = getLenToPosState(len);
    if (pos < 128) {
      price = encoder._distancesPrices[lenToPosState * 128 + pos];
    } else {
      const position = (lenToPosState << 6) + this.GetPosSlot2(pos);
      price = encoder._posSlotPrices[position] + encoder._alignPrices[pos & 15];
    }
    return price + encoder._lenEncoder.getPrice(len - 2, posState);
  };
  GetPureRepPrice_fn = function(repIndex, state, posState) {
    const encoder = __privateGet(this, _compressor).chunker.encoder;
    let price;
    if (!repIndex) {
      price = PROB_PRICES[encoder._isRepG0[state] >>> 2];
      price += PROB_PRICES[2048 - __privateGet(this, _compressor).chunker.encoder._isRep0Long[(state << 4) + posState] >>> 2];
    } else {
      price = PROB_PRICES[2048 - __privateGet(this, _compressor).chunker.encoder._isRepG0[state] >>> 2];
      if (repIndex == 1) {
        price += PROB_PRICES[__privateGet(this, _compressor).chunker.encoder._isRepG1[state] >>> 2];
      } else {
        price += PROB_PRICES[2048 - __privateGet(this, _compressor).chunker.encoder._isRepG1[state] >>> 2];
        price += getBitPrice(__privateGet(this, _compressor).chunker.encoder._isRepG2[state], repIndex - 2);
      }
    }
    return price;
  };
  GetRepLen1Price_fn = function(posState) {
    const encoder = __privateGet(this, _compressor).chunker.encoder;
    const repG0Price = PROB_PRICES[encoder._isRepG0[encoder._state] >>> 2];
    const rep0LongPrice = PROB_PRICES[encoder._isRep0Long[(encoder._state << 4) + posState] >>> 2];
    return repG0Price + rep0LongPrice;
  };
  MovePos_fn = function(num) {
    if (num > 0) {
      __privateMethod(this, _LZMA_instances, Skip_fn).call(this, num);
      __privateGet(this, _compressor).chunker.encoder._additionalOffset += num;
    }
  };
  ReadMatchDistances_fn = function() {
    let lenRes = 0;
    const encoder = __privateGet(this, _compressor).chunker.encoder;
    encoder._numDistancePairs = __privateMethod(this, _LZMA_instances, GetMatches_fn).call(this);
    if (encoder._numDistancePairs > 0) {
      lenRes = encoder._matchDistances[encoder._numDistancePairs - 2];
      if (lenRes == encoder._numFastBytes) {
        lenRes += __privateGet(this, _lzInWindow).getMatchLen(lenRes - 1, encoder._matchDistances[encoder._numDistancePairs - 1], 273 - lenRes);
      }
    }
    encoder._additionalOffset += 1;
    return lenRes;
  };
  ReleaseMFStream_fn = function() {
    const encoder = __privateGet(this, _compressor).chunker.encoder;
    if (encoder._matchFinder && encoder._needReleaseMFStream) {
      encoder._matchFinder._stream = null;
      encoder._needReleaseMFStream = 0;
    }
  };
  ReleaseStreams_fn = function() {
    __privateMethod(this, _LZMA_instances, ReleaseMFStream_fn).call(this);
    __privateGet(this, _compressor).chunker.encoder._rangeEncoder.stream = null;
  };
  LZMA_Encoder_GetSubCoder_fn = function(pos, prevByte) {
    const subCoder = __privateGet(this, _compressor).chunker.encoder._literalEncoder.getSubCoder(pos, prevByte);
    return { decoders: subCoder.decoders };
  };
  RangeCoder_Encoder_GetPrice_0_fn = function(encoder, matchMode, matchByte, symbol) {
    let bit, context = 1, i2 = 7, matchBit, price = 0;
    if (matchMode) {
      for (; i2 >= 0; --i2) {
        matchBit = matchByte >> i2 & 1;
        bit = symbol >> i2 & 1;
        price += getBitPrice(encoder.decoders[(1 + matchBit << 8) + context], bit);
        context = context << 1 | bit;
        if (matchBit != bit) {
          --i2;
          break;
        }
      }
    }
    for (; i2 >= 0; --i2) {
      bit = symbol >> i2 & 1;
      price += getBitPrice(encoder.decoders[context], bit);
      context = context << 1 | bit;
    }
    return price;
  };
  MakeAsChar_fn = function(optimum) {
    optimum.backPrev = -1;
    optimum.prev1IsChar = 0;
  };
  MakeAsShortRep_fn = function(optimum) {
    optimum.backPrev = 0;
    optimum.prev1IsChar = 0;
  };
  ReverseGetPrice_fn = function(encoder, symbol) {
    let bit, m = 1, price = 0;
    for (let i2 = encoder.numBitLevels; i2 != 0; i2 -= 1) {
      bit = symbol & 1;
      symbol >>>= 1;
      price += getBitPrice(encoder.models[m], bit);
      m = m << 1 | bit;
    }
    return price;
  };
  GetProcessedSizeAdd_fn = function() {
    const processedCacheSize = add64(fromInt64(__privateGet(this, _compressor).chunker.encoder._rangeEncoder.cacheSize), __privateGet(this, _compressor).chunker.encoder._rangeEncoder.position);
    return add64(processedCacheSize, [4, 0]);
  };
  decodeString_fn = function(utf) {
    let j2 = 0, x, y, z, l = utf.length, buf = [], charCodes = [];
    for (let i2 = 0; i2 < l; ++i2, ++j2) {
      x = utf[i2] & 255;
      if (!(x & 128)) {
        if (!x) {
          return utf;
        }
        charCodes[j2] = x;
      } else if ((x & 224) == 192) {
        if (i2 + 1 >= l) {
          return String.fromCharCode(...utf);
        }
        y = utf[++i2] & 255;
        if ((y & 192) != 128) {
          return String.fromCharCode(...utf);
        }
        charCodes[j2] = (x & 31) << 6 | y & 63;
      } else if ((x & 240) == 224) {
        if (i2 + 2 >= l) {
          return utf;
        }
        y = utf[++i2] & 255;
        if ((y & 192) != 128) {
          return utf;
        }
        z = utf[++i2] & 255;
        if ((z & 192) != 128) {
          return utf;
        }
        charCodes[j2] = (x & 15) << 12 | (y & 63) << 6 | z & 63;
      } else {
        return utf;
      }
      if (j2 == 16383) {
        buf.push(String.fromCharCode.apply(String, charCodes));
        j2 = -1;
      }
    }
    if (j2 > 0) {
      charCodes.length = j2;
      buf.push(String.fromCharCode.apply(String, charCodes));
    }
    return buf.join("");
  };

  // node_modules/lzma1/lib/index.js
  function compress(data, mode = 5) {
    const input = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
    const result = new LZMA().compress(input, mode);
    return new Uint8Array(result);
  }

  // node_modules/bysquare/lib/base32hex.js
  var base32Hex = {
    chars: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bits: 5,
    mask: 31
    // Mask to extract 5 bits
  };
  function encode(input, addPadding = true) {
    const output = Array();
    let buffer = 0;
    let bitsLeft = 0;
    for (let i2 = 0; i2 < input.length; i2++) {
      buffer = buffer << 8 | input[i2];
      bitsLeft += 8;
      while (bitsLeft >= base32Hex.bits) {
        bitsLeft -= base32Hex.bits;
        const index = buffer >> bitsLeft & base32Hex.mask;
        output.push(base32Hex.chars[index]);
      }
    }
    if (bitsLeft > 0) {
      const maskedValue = buffer << base32Hex.bits - bitsLeft & base32Hex.mask;
      output.push(base32Hex.chars[maskedValue]);
    }
    let base32hex = output.join("");
    if (addPadding) {
      const paddedLength = Math.ceil(base32hex.length / 8) * 8;
      base32hex = base32hex.padEnd(paddedLength, "=");
    }
    return base32hex;
  }

  // node_modules/bysquare/lib/crc32.js
  function crc32(data) {
    let crc = 0 ^ -1;
    const encoded = new TextEncoder().encode(data);
    for (let i2 = 0; i2 < encoded.length; i2++) {
      crc = crc >>> 8 ^ CRC32_TABLE[(crc ^ encoded[i2]) & 255];
    }
    return (crc ^ -1) >>> 0;
  }

  // node_modules/bysquare/lib/header.js
  var EncodeErrorMessage = {
    /**
     * @description - find invalid value in extensions
     */
    BySquareType: "Invalid BySquareType value in header, valid range <0,15>",
    /**
     * @description - find invalid value in extensions
     * @see {@link ./types#Version} for valid ranges
     */
    Version: "Invalid Version value in header",
    /**
     * @description - find invalid value in extensions
     */
    DocumentType: "Invalid DocumentType value in header, valid range <0,15>",
    /**
     * @description - find invalid value in extensions
     */
    Reserved: "Invalid Reserved value in header, valid range <0,15>",
    /**
     * @description - find actual size of header in extensions
     * @see MAX_COMPRESSED_SIZE
     */
    HeaderDataSize: "Allowed header data size exceeded"
  };
  var EncodeError = class extends Error {
    constructor(message, extensions) {
      super(message);
      __publicField(this, "extensions");
      this.name = this.constructor.name;
      if (extensions) {
        this.extensions = extensions;
      }
    }
  };
  var MAX_COMPRESSED_SIZE = 131072;
  function buildBysquareHeader(header = [
    0,
    0,
    0,
    0
  ]) {
    if (header[0] < 0 || header[0] > 15) {
      throw new EncodeError(EncodeErrorMessage.BySquareType, { invalidValue: header[0] });
    }
    if (header[1] < 0 || header[1] > 15) {
      throw new EncodeError(EncodeErrorMessage.Version, { invalidValue: header[1] });
    }
    if (header[2] < 0 || header[2] > 15) {
      throw new EncodeError(EncodeErrorMessage.DocumentType, { invalidValue: header[2] });
    }
    if (header[3] < 0 || header[3] > 15) {
      throw new EncodeError(EncodeErrorMessage.Reserved, { invalidValue: header[3] });
    }
    const [bySquareType, version, documentType, reserved] = header;
    const mergedNibbles = [
      bySquareType << 4 | version << 0,
      documentType << 4 | reserved << 0
    ];
    return mergedNibbles;
  }
  function buildPayloadLength(length) {
    if (length >= MAX_COMPRESSED_SIZE) {
      throw new EncodeError(EncodeErrorMessage.HeaderDataSize, {
        actualSize: length,
        allowedSize: MAX_COMPRESSED_SIZE
      });
    }
    const header = new ArrayBuffer(2);
    new DataView(header).setUint16(0, length, true);
    return new Uint8Array(header);
  }
  function addChecksum(tabbedPayload) {
    const checksum = new ArrayBuffer(4);
    new DataView(checksum).setUint32(0, crc32(tabbedPayload), true);
    const byteArray = new TextEncoder().encode(tabbedPayload);
    return Uint8Array.from([
      ...new Uint8Array(checksum),
      ...Uint8Array.from(byteArray)
    ]);
  }

  // node_modules/bysquare/lib/types.js
  var Version = {
    /**
     * Created this document from original by square specifications.
     *
     * **Released Date:** 2013-02-22
     */
    "1.0.0": 0,
    /**
     * Added fields for beneficiary name and address
     *
     * **Released Date:** 2015-06-24
     */
    "1.1.0": 1,
    /**
     * Beneficiary name is now a required field
     *
     * **Released Date:** 2025-04-01
     */
    "1.2.0": 2
  };

  // node_modules/bysquare/lib/pay/types.js
  var Month = {
    January: 1,
    February: 2,
    March: 4,
    April: 8,
    May: 16,
    June: 32,
    July: 64,
    August: 128,
    September: 256,
    October: 512,
    November: 1024,
    December: 2048
  };
  var PaymentOptions = {
    /**
     * Single payment order
     */
    PaymentOrder: 1,
    /**
     * Standing order (recurring payment), details filled in StandingOrderExt
     */
    StandingOrder: 2,
    /**
     * Direct debit, details filled in DirectDebitExt
     */
    DirectDebit: 4
  };
  var CurrencyCode = {
    AED: "AED",
    AFN: "AFN",
    ALL: "ALL",
    AMD: "AMD",
    ANG: "ANG",
    AOA: "AOA",
    ARS: "ARS",
    AUD: "AUD",
    AWG: "AWG",
    AZN: "AZN",
    BAM: "BAM",
    BBD: "BBD",
    BDT: "BDT",
    BGN: "BGN",
    BHD: "BHD",
    BIF: "BIF",
    BMD: "BMD",
    BND: "BND",
    BOB: "BOB",
    BRL: "BRL",
    BSD: "BSD",
    BTN: "BTN",
    BWP: "BWP",
    BYN: "BYN",
    BZD: "BZD",
    CAD: "CAD",
    CDF: "CDF",
    CHF: "CHF",
    CLP: "CLP",
    CNY: "CNY",
    COP: "COP",
    CRC: "CRC",
    CUC: "CUC",
    CUP: "CUP",
    CVE: "CVE",
    CZK: "CZK",
    DJF: "DJF",
    DKK: "DKK",
    DOP: "DOP",
    DZD: "DZD",
    EGP: "EGP",
    ERN: "ERN",
    ETB: "ETB",
    EUR: "EUR",
    FJD: "FJD",
    FKP: "FKP",
    GBP: "GBP",
    GEL: "GEL",
    GHS: "GHS",
    GIP: "GIP",
    GMD: "GMD",
    GNF: "GNF",
    GTQ: "GTQ",
    GYD: "GYD",
    HKD: "HKD",
    HNL: "HNL",
    HRK: "HRK",
    HTG: "HTG",
    HUF: "HUF",
    IDR: "IDR",
    ILS: "ILS",
    INR: "INR",
    IQD: "IQD",
    IRR: "IRR",
    ISK: "ISK",
    JMD: "JMD",
    JOD: "JOD",
    JPY: "JPY",
    KES: "KES",
    KGS: "KGS",
    KHR: "KHR",
    KMF: "KMF",
    KPW: "KPW",
    KRW: "KRW",
    KWD: "KWD",
    KYD: "KYD",
    KZT: "KZT",
    LAK: "LAK",
    LBP: "LBP",
    LKR: "LKR",
    LRD: "LRD",
    LSL: "LSL",
    LYD: "LYD",
    MAD: "MAD",
    MDL: "MDL",
    MGA: "MGA",
    MKD: "MKD",
    MMK: "MMK",
    MNT: "MNT",
    MOP: "MOP",
    MRU: "MRU",
    MUR: "MUR",
    MVR: "MVR",
    MWK: "MWK",
    MXN: "MXN",
    MYR: "MYR",
    MZN: "MZN",
    NAD: "NAD",
    NGN: "NGN",
    NIO: "NIO",
    NOK: "NOK",
    NPR: "NPR",
    NZD: "NZD",
    OMR: "OMR",
    PAB: "PAB",
    PEN: "PEN",
    PGK: "PGK",
    PHP: "PHP",
    PKR: "PKR",
    PLN: "PLN",
    PYG: "PYG",
    QAR: "QAR",
    RON: "RON",
    RSD: "RSD",
    RUB: "RUB",
    RWF: "RWF",
    SAR: "SAR",
    SBD: "SBD",
    SCR: "SCR",
    SDG: "SDG",
    SEK: "SEK",
    SGD: "SGD",
    SHP: "SHP",
    SLL: "SLL",
    SOS: "SOS",
    SRD: "SRD",
    SSP: "SSP",
    STN: "STN",
    SVC: "SVC",
    SYP: "SYP",
    SZL: "SZL",
    THB: "THB",
    TJS: "TJS",
    TMT: "TMT",
    TND: "TND",
    TOP: "TOP",
    TRY: "TRY",
    TTD: "TTD",
    TWD: "TWD",
    TZS: "TZS",
    UAH: "UAH",
    UGX: "UGX",
    USD: "USD",
    UYU: "UYU",
    UZS: "UZS",
    VES: "VES",
    VND: "VND",
    VUV: "VUV",
    WST: "WST",
    XAF: "XAF",
    XCD: "XCD",
    XOF: "XOF",
    XPF: "XPF",
    YER: "YER",
    ZAR: "ZAR",
    ZMW: "ZMW",
    ZWL: "ZWL"
  };

  // node_modules/bysquare/lib/deburr.js
  var deburredLettersMap = {
    // Latin-1 Supplement block.
    "\xC0": "A",
    "\xC1": "A",
    "\xC2": "A",
    "\xC3": "A",
    "\xC4": "A",
    "\xC5": "A",
    "\xE0": "a",
    "\xE1": "a",
    "\xE2": "a",
    "\xE3": "a",
    "\xE4": "a",
    "\xE5": "a",
    "\xC7": "C",
    "\xE7": "c",
    "\xD0": "D",
    "\xF0": "d",
    "\xC8": "E",
    "\xC9": "E",
    "\xCA": "E",
    "\xCB": "E",
    "\xE8": "e",
    "\xE9": "e",
    "\xEA": "e",
    "\xEB": "e",
    "\xCC": "I",
    "\xCD": "I",
    "\xCE": "I",
    "\xCF": "I",
    "\xEC": "i",
    "\xED": "i",
    "\xEE": "i",
    "\xEF": "i",
    "\xD1": "N",
    "\xF1": "n",
    "\xD2": "O",
    "\xD3": "O",
    "\xD4": "O",
    "\xD5": "O",
    "\xD6": "O",
    "\xD8": "O",
    "\xF2": "o",
    "\xF3": "o",
    "\xF4": "o",
    "\xF5": "o",
    "\xF6": "o",
    "\xF8": "o",
    "\xD9": "U",
    "\xDA": "U",
    "\xDB": "U",
    "\xDC": "U",
    "\xF9": "u",
    "\xFA": "u",
    "\xFB": "u",
    "\xFC": "u",
    "\xDD": "Y",
    "\xFD": "y",
    "\xFF": "y",
    "\xC6": "Ae",
    "\xE6": "ae",
    "\xDE": "Th",
    "\xFE": "th",
    "\xDF": "ss",
    // Latin Extended-A block.
    "\u0100": "A",
    "\u0102": "A",
    "\u0104": "A",
    "\u0101": "a",
    "\u0103": "a",
    "\u0105": "a",
    "\u0106": "C",
    "\u0108": "C",
    "\u010A": "C",
    "\u010C": "C",
    "\u0107": "c",
    "\u0109": "c",
    "\u010B": "c",
    "\u010D": "c",
    "\u010E": "D",
    "\u0110": "D",
    "\u010F": "d",
    "\u0111": "d",
    "\u0112": "E",
    "\u0114": "E",
    "\u0116": "E",
    "\u0118": "E",
    "\u011A": "E",
    "\u0113": "e",
    "\u0115": "e",
    "\u0117": "e",
    "\u0119": "e",
    "\u011B": "e",
    "\u011C": "G",
    "\u011E": "G",
    "\u0120": "G",
    "\u0122": "G",
    "\u011D": "g",
    "\u011F": "g",
    "\u0121": "g",
    "\u0123": "g",
    "\u0124": "H",
    "\u0126": "H",
    "\u0125": "h",
    "\u0127": "h",
    "\u0128": "I",
    "\u012A": "I",
    "\u012C": "I",
    "\u012E": "I",
    "\u0130": "I",
    "\u0129": "i",
    "\u012B": "i",
    "\u012D": "i",
    "\u012F": "i",
    "\u0131": "i",
    "\u0134": "J",
    "\u0135": "j",
    "\u0136": "K",
    "\u0137": "k",
    "\u0138": "k",
    "\u0139": "L",
    "\u013B": "L",
    "\u013D": "L",
    "\u013F": "L",
    "\u0141": "L",
    "\u013A": "l",
    "\u013C": "l",
    "\u013E": "l",
    "\u0140": "l",
    "\u0142": "l",
    "\u0143": "N",
    "\u0145": "N",
    "\u0147": "N",
    "\u014A": "N",
    "\u0144": "n",
    "\u0146": "n",
    "\u0148": "n",
    "\u014B": "n",
    "\u014C": "O",
    "\u014E": "O",
    "\u0150": "O",
    "\u014D": "o",
    "\u014F": "o",
    "\u0151": "o",
    "\u0154": "R",
    "\u0156": "R",
    "\u0158": "R",
    "\u0155": "r",
    "\u0157": "r",
    "\u0159": "r",
    "\u015A": "S",
    "\u015C": "S",
    "\u015E": "S",
    "\u0160": "S",
    "\u015B": "s",
    "\u015D": "s",
    "\u015F": "s",
    "\u0161": "s",
    "\u0162": "T",
    "\u0164": "T",
    "\u0166": "T",
    "\u0163": "t",
    "\u0165": "t",
    "\u0167": "t",
    "\u0168": "U",
    "\u016A": "U",
    "\u016C": "U",
    "\u016E": "U",
    "\u0170": "U",
    "\u0172": "U",
    "\u0169": "u",
    "\u016B": "u",
    "\u016D": "u",
    "\u016F": "u",
    "\u0171": "u",
    "\u0173": "u",
    "\u0174": "W",
    "\u0175": "w",
    "\u0176": "Y",
    "\u0177": "y",
    "\u0178": "Y",
    "\u0179": "Z",
    "\u017B": "Z",
    "\u017D": "Z",
    "\u017A": "z",
    "\u017C": "z",
    "\u017E": "z",
    "\u0132": "IJ",
    "\u0133": "ij",
    "\u0152": "Oe",
    "\u0153": "oe",
    "\u0149": "'n",
    "\u017F": "ss"
  };
  function deburrLetter(key) {
    return deburredLettersMap[key];
  }
  function isCombiningMark(charCode) {
    return charCode >= 768 && charCode <= 879 || charCode >= 65056 && charCode <= 65059 || charCode >= 8400 && charCode <= 8432;
  }
  function deburr(text) {
    let result = "";
    for (const char of text) {
      const replacement = deburrLetter(char);
      if (replacement) {
        result += replacement;
      } else if (!isCombiningMark(char.charCodeAt(0))) {
        result += char;
      }
    }
    return result;
  }

  // node_modules/bysquare/lib/pay/validations.js
  var import_validator = __toESM(require_validator(), 1);

  // node_modules/bysquare/lib/errors.js
  var ValidationError = class extends Error {
    /**
     * @param message - explains, what is wrong on the specific field
     * @param path - navigates to the specific field in DataModel, where error occurred
     */
    constructor(message, path) {
      super(message);
      __publicField(this, "path");
      this.name = this.constructor.name;
      this.path = path;
    }
  };

  // node_modules/bysquare/lib/pay/validations.js
  var ErrorMessages = {
    IBAN: "Invalid IBAN. Make sure ISO 13616 format is used.",
    BIC: "Invalid BIC. Make sure ISO 9362 format is used.",
    CurrencyCode: "Invalid currency code. Make sure ISO 4217 format is used.",
    Date: "Invalid date. Make sure YYYYMMDD format is used.",
    BeneficiaryName: "Beneficiary name is required."
  };
  function isValidYYYYMMDD(date) {
    if (!/^\d{8}$/.test(date)) {
      return false;
    }
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    const isoFormat = `${year}-${month}-${day}`;
    return import_validator.default.isDate(isoFormat, {
      format: "YYYY-MM-DD",
      strictMode: true,
      delimiters: ["-"]
    });
  }
  function validateBankAccount(bankAccount, path) {
    if (!import_validator.default.isIBAN(bankAccount.iban)) {
      throw new ValidationError(ErrorMessages.IBAN, `${path}.iban`);
    }
    if (bankAccount.bic && !import_validator.default.isBIC(bankAccount.bic)) {
      throw new ValidationError(ErrorMessages.BIC, `${path}.bic`);
    }
  }
  function validateSimplePayment(simplePayment, path, version = Version["1.2.0"]) {
    for (const [index, bankAccount] of simplePayment.bankAccounts.entries()) {
      validateBankAccount(bankAccount, `${path}.bankAccounts[${index}]`);
    }
    if (simplePayment.currencyCode && !import_validator.default.isISO4217(simplePayment.currencyCode)) {
      throw new ValidationError(ErrorMessages.CurrencyCode, `${path}.currencyCode`);
    }
    if (simplePayment.paymentDueDate && !isValidYYYYMMDD(simplePayment.paymentDueDate)) {
      throw new ValidationError(ErrorMessages.Date, `${path}.paymentDueDate`);
    }
    if (simplePayment.type === PaymentOptions.StandingOrder && simplePayment.lastDate && !isValidYYYYMMDD(simplePayment.lastDate)) {
      throw new ValidationError(ErrorMessages.Date, `${path}.lastDate`);
    }
    if (simplePayment.type === PaymentOptions.DirectDebit && simplePayment.validTillDate && !isValidYYYYMMDD(simplePayment.validTillDate)) {
      throw new ValidationError(ErrorMessages.Date, `${path}.validTillDate`);
    }
    if (version >= Version["1.2.0"] && !simplePayment.beneficiary?.name) {
      throw new ValidationError(ErrorMessages.BeneficiaryName, `${path}.beneficiary.name`);
    }
  }
  function validateDataModel(dataModel, version = Version["1.2.0"]) {
    for (const [index, payment] of dataModel.payments.entries()) {
      validateSimplePayment(payment, `payments[${index}]`, version);
    }
    return dataModel;
  }

  // node_modules/bysquare/lib/pay/encode.js
  function sanitize(value) {
    return value?.replaceAll("	", " ");
  }
  function serialize(data) {
    const s = new Array();
    s.push(sanitize(data.invoiceId?.toString()));
    s.push(data.payments.length.toString());
    for (const p of data.payments) {
      s.push(p.type.toString());
      s.push(p.amount?.toString());
      s.push(sanitize(p.currencyCode));
      s.push(sanitize(p.paymentDueDate));
      s.push(sanitize(p.variableSymbol));
      s.push(sanitize(p.constantSymbol));
      s.push(sanitize(p.specificSymbol));
      s.push(sanitize(p.originatorsReferenceInformation));
      s.push(sanitize(p.paymentNote));
      s.push(p.bankAccounts.length.toString());
      for (const ba of p.bankAccounts) {
        s.push(sanitize(ba.iban));
        s.push(sanitize(ba.bic));
      }
      if (p.type === PaymentOptions.StandingOrder) {
        s.push("1");
        s.push(p.day?.toString());
        const monthValue = p.month;
        if (typeof monthValue === "string") {
          s.push(Month[monthValue]?.toString());
        } else {
          s.push(monthValue?.toString());
        }
        s.push(sanitize(p.periodicity));
        s.push(sanitize(p.lastDate));
      } else {
        s.push("0");
      }
      if (p.type === PaymentOptions.DirectDebit) {
        s.push("1");
        s.push(p.directDebitScheme?.toString());
        s.push(p.directDebitType?.toString());
        s.push(sanitize(p.ddVariableSymbol?.toString()));
        s.push(sanitize(p.ddSpecificSymbol?.toString()));
        s.push(sanitize(p.ddOriginatorsReferenceInformation?.toString()));
        s.push(sanitize(p.mandateId?.toString()));
        s.push(sanitize(p.creditorId?.toString()));
        s.push(sanitize(p.contractId?.toString()));
        s.push(p.maxAmount?.toString());
        s.push(sanitize(p.validTillDate?.toString()));
      } else {
        s.push("0");
      }
    }
    for (const p of data.payments) {
      s.push(sanitize(p.beneficiary?.name));
      s.push(sanitize(p.beneficiary?.street));
      s.push(sanitize(p.beneficiary?.city));
    }
    return s.join("	");
  }
  function removeDiacritics(model) {
    for (const payment of model.payments) {
      if (payment.paymentNote) {
        payment.paymentNote = deburr(payment.paymentNote);
      }
      if (payment.beneficiary?.name) {
        payment.beneficiary.name = deburr(payment.beneficiary.name);
      }
      if (payment.beneficiary?.city) {
        payment.beneficiary.city = deburr(payment.beneficiary.city);
      }
      if (payment.beneficiary?.street) {
        payment.beneficiary.street = deburr(payment.beneficiary.street);
      }
    }
  }
  function encode2(model, options = { deburr: true, validate: true }) {
    if (options.deburr) {
      removeDiacritics(model);
    }
    const version = options.version ?? Version["1.2.0"];
    if (options.validate) {
      validateDataModel(model, version);
    }
    const payloadTabbed = serialize(model);
    const payloadChecked = addChecksum(payloadTabbed);
    const payloadCompressed = compress(payloadChecked);
    const _lzmaHeader = payloadCompressed.subarray(0, 13);
    const lzmaBody = payloadCompressed.subarray(13);
    const output = new Uint8Array([
      ...buildBysquareHeader([0, version, 0, 0]),
      ...buildPayloadLength(payloadChecked.byteLength),
      ...lzmaBody
    ]);
    return encode(output, false);
  }

  // node_modules/@lostinbrittany/qr-esm/index.js
  var VERSIONS = [
    null,
    [[10, 7, 17, 13], [1, 1, 1, 1], []],
    [[16, 10, 28, 22], [1, 1, 1, 1], [4, 16]],
    [[26, 15, 22, 18], [1, 1, 2, 2], [4, 20]],
    [[18, 20, 16, 26], [2, 1, 4, 2], [4, 24]],
    [[24, 26, 22, 18], [2, 1, 4, 4], [4, 28]],
    [[16, 18, 28, 24], [4, 2, 4, 4], [4, 32]],
    [[18, 20, 26, 18], [4, 2, 5, 6], [4, 20, 36]],
    [[22, 24, 26, 22], [4, 2, 6, 6], [4, 22, 40]],
    [[22, 30, 24, 20], [5, 2, 8, 8], [4, 24, 44]],
    [[26, 18, 28, 24], [5, 4, 8, 8], [4, 26, 48]],
    [[30, 20, 24, 28], [5, 4, 11, 8], [4, 28, 52]],
    [[22, 24, 28, 26], [8, 4, 11, 10], [4, 30, 56]],
    [[22, 26, 22, 24], [9, 4, 16, 12], [4, 32, 60]],
    [[24, 30, 24, 20], [9, 4, 16, 16], [4, 24, 44, 64]],
    [[24, 22, 24, 30], [10, 6, 18, 12], [4, 24, 46, 68]],
    [[28, 24, 30, 24], [10, 6, 16, 17], [4, 24, 48, 72]],
    [[28, 28, 28, 28], [11, 6, 19, 16], [4, 28, 52, 76]],
    [[26, 30, 28, 28], [13, 6, 21, 18], [4, 28, 54, 80]],
    [[26, 28, 26, 26], [14, 7, 25, 21], [4, 28, 56, 84]],
    [[26, 28, 28, 30], [16, 8, 25, 20], [4, 32, 60, 88]],
    [[26, 28, 30, 28], [17, 8, 25, 23], [4, 26, 48, 70, 92]],
    [[28, 28, 24, 30], [17, 9, 34, 23], [4, 24, 48, 72, 96]],
    [[28, 30, 30, 30], [18, 9, 30, 25], [4, 28, 52, 76, 100]],
    [[28, 30, 30, 30], [20, 10, 32, 27], [4, 26, 52, 78, 104]],
    [[28, 26, 30, 30], [21, 12, 35, 29], [4, 30, 56, 82, 108]],
    [[28, 28, 30, 28], [23, 12, 37, 34], [4, 28, 56, 84, 112]],
    [[28, 30, 30, 30], [25, 12, 40, 34], [4, 32, 60, 88, 116]],
    [[28, 30, 30, 30], [26, 13, 42, 35], [4, 24, 48, 72, 96, 120]],
    [[28, 30, 30, 30], [28, 14, 45, 38], [4, 28, 52, 76, 100, 124]],
    [[28, 30, 30, 30], [29, 15, 48, 40], [4, 24, 50, 76, 102, 128]],
    [[28, 30, 30, 30], [31, 16, 51, 43], [4, 28, 54, 80, 106, 132]],
    [[28, 30, 30, 30], [33, 17, 54, 45], [4, 32, 58, 84, 110, 136]],
    [[28, 30, 30, 30], [35, 18, 57, 48], [4, 28, 56, 84, 112, 140]],
    [[28, 30, 30, 30], [37, 19, 60, 51], [4, 32, 60, 88, 116, 144]],
    [[28, 30, 30, 30], [38, 19, 63, 53], [4, 28, 52, 76, 100, 124, 148]],
    [[28, 30, 30, 30], [40, 20, 66, 56], [4, 22, 48, 74, 100, 126, 152]],
    [[28, 30, 30, 30], [43, 21, 70, 59], [4, 26, 52, 78, 104, 130, 156]],
    [[28, 30, 30, 30], [45, 22, 74, 62], [4, 30, 56, 82, 108, 134, 160]],
    [[28, 30, 30, 30], [47, 24, 77, 65], [4, 24, 52, 80, 108, 136, 164]],
    [[28, 30, 30, 30], [49, 25, 81, 68], [4, 28, 56, 84, 112, 140, 168]]
  ];
  var MODE_TERMINATOR = 0;
  var MODE_NUMERIC = 1;
  var MODE_ALPHANUMERIC = 2;
  var MODE_OCTET = 4;
  var MODE_KANJI = 8;
  var NUMERIC_REGEXP = /^\d*$/;
  var ALPHANUMERIC_REGEXP = /^[A-Za-z0-9 $%*+\-./:_]*$/;
  var ALPHANUMERIC_OUT_REGEXP = /^[A-Z0-9 $%*+\-./:_]*$/;
  var ECCLEVEL_L = 1;
  var ECCLEVEL_M = 0;
  var ECCLEVEL_Q = 3;
  var ECCLEVEL_H = 2;
  var GF256_MAP = [];
  var GF256_INVMAP = [-1];
  for (i = 0, v = 1; i < 255; ++i) {
    GF256_MAP.push(v);
    GF256_INVMAP[v] = i;
    v = v * 2 ^ (v >= 128 ? 285 : 0);
  }
  var i;
  var v;
  var GF256_GENPOLY = [[]];
  for (i = 0; i < 30; ++i) {
    prevpoly = GF256_GENPOLY[i], poly = [];
    for (j = 0; j <= i; ++j) {
      a = j < i ? GF256_MAP[prevpoly[j]] : 0;
      b = GF256_MAP[(i + (prevpoly[j - 1] || 0)) % 255];
      poly.push(GF256_INVMAP[a ^ b]);
    }
    GF256_GENPOLY.push(poly);
  }
  var prevpoly;
  var poly;
  var a;
  var b;
  var j;
  var i;
  var ALPHANUMERIC_MAP = {};
  for (i = 0; i < 45; ++i) {
    ALPHANUMERIC_MAP["0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:".charAt(i)] = i;
  }
  var i;
  var MASKFUNCS = [
    function(i2, j2) {
      return (i2 + j2) % 2 == 0;
    },
    function(i2, j2) {
      return i2 % 2 == 0;
    },
    function(i2, j2) {
      return j2 % 3 == 0;
    },
    function(i2, j2) {
      return (i2 + j2) % 3 == 0;
    },
    function(i2, j2) {
      return ((i2 / 2 | 0) + (j2 / 3 | 0)) % 2 == 0;
    },
    function(i2, j2) {
      return i2 * j2 % 2 + i2 * j2 % 3 == 0;
    },
    function(i2, j2) {
      return (i2 * j2 % 2 + i2 * j2 % 3) % 2 == 0;
    },
    function(i2, j2) {
      return ((i2 + j2) % 2 + i2 * j2 % 3) % 2 == 0;
    }
  ];
  var needsverinfo = function(ver) {
    return ver > 6;
  };
  var getsizebyver = function(ver) {
    return 4 * ver + 17;
  };
  var nfullbits = function(ver) {
    var v2 = VERSIONS[ver];
    var nbits = 16 * ver * ver + 128 * ver + 64;
    if (needsverinfo(ver)) nbits -= 36;
    if (v2[2].length) {
      nbits -= 25 * v2[2].length * v2[2].length - 10 * v2[2].length - 55;
    }
    return nbits;
  };
  var ndatabits = function(ver, ecclevel) {
    var nbits = nfullbits(ver) & ~7;
    var v2 = VERSIONS[ver];
    nbits -= 8 * v2[0][ecclevel] * v2[1][ecclevel];
    return nbits;
  };
  var ndatalenbits = function(ver, mode) {
    switch (mode) {
      case MODE_NUMERIC:
        return ver < 10 ? 10 : ver < 27 ? 12 : 14;
      case MODE_ALPHANUMERIC:
        return ver < 10 ? 9 : ver < 27 ? 11 : 13;
      case MODE_OCTET:
        return ver < 10 ? 8 : 16;
      case MODE_KANJI:
        return ver < 10 ? 8 : ver < 27 ? 10 : 12;
    }
  };
  var getmaxdatalen = function(ver, mode, ecclevel) {
    var nbits = ndatabits(ver, ecclevel) - 4 - ndatalenbits(ver, mode);
    switch (mode) {
      case MODE_NUMERIC:
        return (nbits / 10 | 0) * 3 + (nbits % 10 < 4 ? 0 : nbits % 10 < 7 ? 1 : 2);
      case MODE_ALPHANUMERIC:
        return (nbits / 11 | 0) * 2 + (nbits % 11 < 6 ? 0 : 1);
      case MODE_OCTET:
        return nbits / 8 | 0;
      case MODE_KANJI:
        return nbits / 13 | 0;
    }
  };
  var validatedata = function(mode, data) {
    switch (mode) {
      case MODE_NUMERIC:
        if (!data.match(NUMERIC_REGEXP)) return null;
        return data;
      case MODE_ALPHANUMERIC:
        if (!data.match(ALPHANUMERIC_REGEXP)) return null;
        return data.toUpperCase();
      case MODE_OCTET:
        if (typeof data === "string") {
          var newdata = [];
          for (var i2 = 0; i2 < data.length; ++i2) {
            var ch = data.charCodeAt(i2);
            if (ch < 128) {
              newdata.push(ch);
            } else if (ch < 2048) {
              newdata.push(
                192 | ch >> 6,
                128 | ch & 63
              );
            } else if (ch < 65536) {
              newdata.push(
                224 | ch >> 12,
                128 | ch >> 6 & 63,
                128 | ch & 63
              );
            } else {
              newdata.push(
                240 | ch >> 18,
                128 | ch >> 12 & 63,
                128 | ch >> 6 & 63,
                128 | ch & 63
              );
            }
          }
          return newdata;
        } else {
          return data;
        }
    }
  };
  var encode3 = function(ver, mode, data, maxbuflen) {
    var buf = [];
    var bits = 0, remaining = 8;
    var datalen = data.length;
    var pack = function(x, n) {
      if (n >= remaining) {
        buf.push(bits | x >> (n -= remaining));
        while (n >= 8) buf.push(x >> (n -= 8) & 255);
        bits = 0;
        remaining = 8;
      }
      if (n > 0) bits |= (x & (1 << n) - 1) << (remaining -= n);
    };
    var nlenbits = ndatalenbits(ver, mode);
    pack(mode, 4);
    pack(datalen, nlenbits);
    switch (mode) {
      case MODE_NUMERIC:
        for (var i2 = 2; i2 < datalen; i2 += 3) {
          pack(parseInt(data.substring(i2 - 2, i2 + 1), 10), 10);
        }
        pack(parseInt(data.substring(i2 - 2), 10), [0, 4, 7][datalen % 3]);
        break;
      case MODE_ALPHANUMERIC:
        for (var i2 = 1; i2 < datalen; i2 += 2) {
          pack(ALPHANUMERIC_MAP[data.charAt(i2 - 1)] * 45 + ALPHANUMERIC_MAP[data.charAt(i2)], 11);
        }
        if (datalen % 2 == 1) {
          pack(ALPHANUMERIC_MAP[data.charAt(i2 - 1)], 6);
        }
        break;
      case MODE_OCTET:
        for (var i2 = 0; i2 < datalen; ++i2) {
          pack(data[i2], 8);
        }
        break;
    }
    ;
    pack(MODE_TERMINATOR, 4);
    if (remaining < 8) buf.push(bits);
    while (buf.length + 1 < maxbuflen) buf.push(236, 17);
    if (buf.length < maxbuflen) buf.push(236);
    return buf;
  };
  var calculateecc = function(poly2, genpoly) {
    var modulus = poly2.slice(0);
    var polylen = poly2.length, genpolylen = genpoly.length;
    for (var i2 = 0; i2 < genpolylen; ++i2) modulus.push(0);
    for (var i2 = 0; i2 < polylen; ) {
      var quotient = GF256_INVMAP[modulus[i2++]];
      if (quotient >= 0) {
        for (var j2 = 0; j2 < genpolylen; ++j2) {
          modulus[i2 + j2] ^= GF256_MAP[(quotient + genpoly[j2]) % 255];
        }
      }
    }
    return modulus.slice(polylen);
  };
  var augumenteccs = function(poly2, nblocks, genpoly) {
    var subsizes = [];
    var subsize = poly2.length / nblocks | 0, subsize0 = 0;
    var pivot = nblocks - poly2.length % nblocks;
    for (var i2 = 0; i2 < pivot; ++i2) {
      subsizes.push(subsize0);
      subsize0 += subsize;
    }
    for (var i2 = pivot; i2 < nblocks; ++i2) {
      subsizes.push(subsize0);
      subsize0 += subsize + 1;
    }
    subsizes.push(subsize0);
    var eccs = [];
    for (var i2 = 0; i2 < nblocks; ++i2) {
      eccs.push(calculateecc(poly2.slice(subsizes[i2], subsizes[i2 + 1]), genpoly));
    }
    var result = [];
    var nitemsperblock = poly2.length / nblocks | 0;
    for (var i2 = 0; i2 < nitemsperblock; ++i2) {
      for (var j2 = 0; j2 < nblocks; ++j2) {
        result.push(poly2[subsizes[j2] + i2]);
      }
    }
    for (var j2 = pivot; j2 < nblocks; ++j2) {
      result.push(poly2[subsizes[j2 + 1] - 1]);
    }
    for (var i2 = 0; i2 < genpoly.length; ++i2) {
      for (var j2 = 0; j2 < nblocks; ++j2) {
        result.push(eccs[j2][i2]);
      }
    }
    return result;
  };
  var augumentbch = function(poly2, p, genpoly, q) {
    var modulus = poly2 << q;
    for (var i2 = p - 1; i2 >= 0; --i2) {
      if (modulus >> q + i2 & 1) modulus ^= genpoly << i2;
    }
    return poly2 << q | modulus;
  };
  var makebasematrix = function(ver) {
    var v2 = VERSIONS[ver], n = getsizebyver(ver);
    var matrix = [], reserved = [];
    for (var i2 = 0; i2 < n; ++i2) {
      matrix.push([]);
      reserved.push([]);
    }
    var blit = function(y, x, h, w, bits) {
      for (var i3 = 0; i3 < h; ++i3) {
        for (var j3 = 0; j3 < w; ++j3) {
          matrix[y + i3][x + j3] = bits[i3] >> j3 & 1;
          reserved[y + i3][x + j3] = 1;
        }
      }
    };
    blit(0, 0, 9, 9, [127, 65, 93, 93, 93, 65, 383, 0, 64]);
    blit(n - 8, 0, 8, 9, [256, 127, 65, 93, 93, 93, 65, 127]);
    blit(0, n - 8, 9, 8, [254, 130, 186, 186, 186, 130, 254, 0, 0]);
    for (var i2 = 9; i2 < n - 8; ++i2) {
      matrix[6][i2] = matrix[i2][6] = ~i2 & 1;
      reserved[6][i2] = reserved[i2][6] = 1;
    }
    var aligns = v2[2], m = aligns.length;
    for (var i2 = 0; i2 < m; ++i2) {
      var minj = i2 == 0 || i2 == m - 1 ? 1 : 0, maxj = i2 == 0 ? m - 1 : m;
      for (var j2 = minj; j2 < maxj; ++j2) {
        blit(aligns[i2], aligns[j2], 5, 5, [31, 17, 21, 17, 31]);
      }
    }
    if (needsverinfo(ver)) {
      var code = augumentbch(ver, 6, 7973, 12);
      var k = 0;
      for (var i2 = 0; i2 < 6; ++i2) {
        for (var j2 = 0; j2 < 3; ++j2) {
          matrix[i2][n - 11 + j2] = matrix[n - 11 + j2][i2] = code >> k++ & 1;
          reserved[i2][n - 11 + j2] = reserved[n - 11 + j2][i2] = 1;
        }
      }
    }
    return { matrix, reserved };
  };
  var putdata = function(matrix, reserved, buf) {
    var n = matrix.length;
    var k = 0, dir = -1;
    for (var i2 = n - 1; i2 >= 0; i2 -= 2) {
      if (i2 == 6) --i2;
      var jj = dir < 0 ? n - 1 : 0;
      for (var j2 = 0; j2 < n; ++j2) {
        for (var ii = i2; ii > i2 - 2; --ii) {
          if (!reserved[jj][ii]) {
            matrix[jj][ii] = buf[k >> 3] >> (~k & 7) & 1;
            ++k;
          }
        }
        jj += dir;
      }
      dir = -dir;
    }
    return matrix;
  };
  var maskdata = function(matrix, reserved, mask) {
    var maskf = MASKFUNCS[mask];
    var n = matrix.length;
    for (var i2 = 0; i2 < n; ++i2) {
      for (var j2 = 0; j2 < n; ++j2) {
        if (!reserved[i2][j2]) matrix[i2][j2] ^= maskf(i2, j2);
      }
    }
    return matrix;
  };
  var putformatinfo = function(matrix, reserved, ecclevel, mask) {
    var n = matrix.length;
    var code = augumentbch(ecclevel << 3 | mask, 5, 1335, 10) ^ 21522;
    for (var i2 = 0; i2 < 15; ++i2) {
      var r = [0, 1, 2, 3, 4, 5, 7, 8, n - 7, n - 6, n - 5, n - 4, n - 3, n - 2, n - 1][i2];
      var c = [n - 1, n - 2, n - 3, n - 4, n - 5, n - 6, n - 7, n - 8, 7, 5, 4, 3, 2, 1, 0][i2];
      matrix[r][8] = matrix[8][c] = code >> i2 & 1;
    }
    return matrix;
  };
  var evaluatematrix = function(matrix) {
    var PENALTY_CONSECUTIVE = 3;
    var PENALTY_TWOBYTWO = 3;
    var PENALTY_FINDERLIKE = 40;
    var PENALTY_DENSITY = 10;
    var evaluategroup = function(groups2) {
      var score2 = 0;
      for (var i3 = 0; i3 < groups2.length; ++i3) {
        if (groups2[i3] >= 5) score2 += PENALTY_CONSECUTIVE + (groups2[i3] - 5);
      }
      for (var i3 = 5; i3 < groups2.length; i3 += 2) {
        var p2 = groups2[i3];
        if (groups2[i3 - 1] == p2 && groups2[i3 - 2] == 3 * p2 && groups2[i3 - 3] == p2 && groups2[i3 - 4] == p2 && (groups2[i3 - 5] >= 4 * p2 || groups2[i3 + 1] >= 4 * p2)) {
          score2 += PENALTY_FINDERLIKE;
        }
      }
      return score2;
    };
    var n = matrix.length;
    var score = 0, nblacks = 0;
    for (var i2 = 0; i2 < n; ++i2) {
      var row = matrix[i2];
      var groups;
      groups = [0];
      for (var j2 = 0; j2 < n; ) {
        var k;
        for (k = 0; j2 < n && row[j2]; ++k) ++j2;
        groups.push(k);
        for (k = 0; j2 < n && !row[j2]; ++k) ++j2;
        groups.push(k);
      }
      score += evaluategroup(groups);
      groups = [0];
      for (var j2 = 0; j2 < n; ) {
        var k;
        for (k = 0; j2 < n && matrix[j2][i2]; ++k) ++j2;
        groups.push(k);
        for (k = 0; j2 < n && !matrix[j2][i2]; ++k) ++j2;
        groups.push(k);
      }
      score += evaluategroup(groups);
      var nextrow = matrix[i2 + 1] || [];
      nblacks += row[0];
      for (var j2 = 1; j2 < n; ++j2) {
        var p = row[j2];
        nblacks += p;
        if (row[j2 - 1] == p && nextrow[j2] === p && nextrow[j2 - 1] === p) {
          score += PENALTY_TWOBYTWO;
        }
      }
    }
    score += PENALTY_DENSITY * (Math.abs(nblacks / n / n - 0.5) / 0.05 | 0);
    return score;
  };
  var generate = function(data, ver, mode, ecclevel, mask) {
    var v2 = VERSIONS[ver];
    var buf = encode3(ver, mode, data, ndatabits(ver, ecclevel) >> 3);
    buf = augumenteccs(buf, v2[1][ecclevel], GF256_GENPOLY[v2[0][ecclevel]]);
    var result = makebasematrix(ver);
    var matrix = result.matrix, reserved = result.reserved;
    putdata(matrix, reserved, buf);
    if (mask < 0) {
      maskdata(matrix, reserved, 0);
      putformatinfo(matrix, reserved, ecclevel, 0);
      var bestmask = 0, bestscore = evaluatematrix(matrix);
      maskdata(matrix, reserved, 0);
      for (mask = 1; mask < 8; ++mask) {
        maskdata(matrix, reserved, mask);
        putformatinfo(matrix, reserved, ecclevel, mask);
        var score = evaluatematrix(matrix);
        if (bestscore > score) {
          bestscore = score;
          bestmask = mask;
        }
        maskdata(matrix, reserved, mask);
      }
      mask = bestmask;
    }
    maskdata(matrix, reserved, mask);
    putformatinfo(matrix, reserved, ecclevel, mask);
    return matrix;
  };
  var QRCode = {
    "generate": function(data, options) {
      var MODES2 = {
        "numeric": MODE_NUMERIC,
        "alphanumeric": MODE_ALPHANUMERIC,
        "octet": MODE_OCTET
      };
      var ECCLEVELS = {
        "L": ECCLEVEL_L,
        "M": ECCLEVEL_M,
        "Q": ECCLEVEL_Q,
        "H": ECCLEVEL_H
      };
      options = options || {};
      var ver = options.version || -1;
      var ecclevel = ECCLEVELS[(options.ecclevel || "L").toUpperCase()];
      var mode = options.mode ? MODES2[options.mode.toLowerCase()] : -1;
      var mask = "mask" in options ? options.mask : -1;
      if (mode < 0) {
        if (typeof data === "string") {
          if (data.match(NUMERIC_REGEXP)) {
            mode = MODE_NUMERIC;
          } else if (data.match(ALPHANUMERIC_OUT_REGEXP)) {
            mode = MODE_ALPHANUMERIC;
          } else {
            mode = MODE_OCTET;
          }
        } else {
          mode = MODE_OCTET;
        }
      } else if (!(mode == MODE_NUMERIC || mode == MODE_ALPHANUMERIC || mode == MODE_OCTET)) {
        throw "invalid or unsupported mode";
      }
      data = validatedata(mode, data);
      if (data === null) throw "invalid data format";
      if (ecclevel < 0 || ecclevel > 3) throw "invalid ECC level";
      if (ver < 0) {
        for (ver = 1; ver <= 40; ++ver) {
          if (data.length <= getmaxdatalen(ver, mode, ecclevel)) break;
        }
        if (ver > 40) throw "too large data";
      } else if (ver < 1 || ver > 40) {
        throw "invalid version";
      }
      if (mask != -1 && (mask < 0 || mask > 8)) throw "invalid mask";
      return generate(data, ver, mode, ecclevel, mask);
    },
    "generateHTML": function(data, options) {
      options = options || {};
      var matrix = QRCode["generate"](data, options);
      var modsize = Math.max(options.modulesize || 5, 0.5);
      var margin = Math.max(options.margin !== null ? options.margin : 4, 0);
      var e = document.createElement("div");
      var n = matrix.length;
      var html = ['<table border="0" cellspacing="0" cellpadding="0" style="border:' + modsize * margin + 'px solid #fff;background:#fff">'];
      for (var i2 = 0; i2 < n; ++i2) {
        html.push("<tr>");
        for (var j2 = 0; j2 < n; ++j2) {
          html.push('<td style="width:' + modsize + "px;height:" + modsize + "px" + (matrix[i2][j2] ? ";background:#000" : "") + '"></td>');
        }
        html.push("</tr>");
      }
      e.className = "qrcode";
      e.innerHTML = html.join("") + "</table>";
      return e;
    },
    "generateSVG": function(data, options) {
      options = options || {};
      var matrix = QRCode["generate"](data, options);
      var n = matrix.length;
      var modsize = Math.max(options.modulesize || 5, 0.5);
      var margin = Math.max(options.margin ? options.margin : 4, 0);
      var size = modsize * (n + 2 * margin);
      var common = ' class= "fg" width="' + modsize + '" height="' + modsize + '"/>';
      var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      e.setAttribute("viewBox", "0 0 " + size + " " + size);
      e.setAttribute("style", "shape-rendering:crispEdges");
      var svg = [
        "<style scoped>.bg{fill:#FFF}.fg{fill:#000}</style>",
        '<rect class="bg" x="0" y="0"',
        'width="' + size + '" height="' + size + '"/>'
      ];
      var yo = margin * modsize;
      for (var y = 0; y < n; ++y) {
        var xo = margin * modsize;
        for (var x = 0; x < n; ++x) {
          if (matrix[y][x])
            svg.push('<rect x="' + xo + '" y="' + yo + '"', common);
          xo += modsize;
        }
        yo += modsize;
      }
      e.innerHTML = svg.join("");
      return e;
    },
    "generatePNG": function(data, options) {
      options = options || {};
      var matrix = QRCode["generate"](data, options);
      var modsize = Math.max(options.modulesize || 5, 0.5);
      var margin = Math.max(options.margin != null ? options.margin : 4, 0);
      var n = matrix.length;
      var size = modsize * (n + 2 * margin);
      var canvas = document.createElement("canvas"), context;
      canvas.width = canvas.height = size;
      context = canvas.getContext("2d");
      if (!context) throw "canvas support is needed for PNG output";
      context.fillStyle = "#fff";
      context.fillRect(0, 0, size, size);
      context.fillStyle = "#000";
      for (var i2 = 0; i2 < n; ++i2) {
        for (var j2 = 0; j2 < n; ++j2) {
          if (matrix[i2][j2]) {
            context.fillRect(
              modsize * (margin + j2),
              modsize * (margin + i2),
              modsize,
              modsize
            );
          }
        }
      }
      return canvas.toDataURL();
    }
  };

  // js/bankovy-dar-qr.js
  function getBankCfg() {
    return window.FESTIVAL_CONFIG && window.FESTIVAL_CONFIG.bankovyDar || {};
  }
  function normalizeIban(iban) {
    return String(iban || "").replace(/\s+/g, "").trim().toUpperCase();
  }
  function buildPayBySquarePayload() {
    var bankCfg = getBankCfg();
    var iban = normalizeIban(bankCfg.iban);
    if (!iban) return null;
    var payment = {
      type: PaymentOptions.PaymentOrder,
      currencyCode: CurrencyCode.EUR,
      beneficiary: { name: String(bankCfg.prijemca || "PTRA").trim() },
      bankAccounts: [{ iban }]
    };
    var sprava = String(bankCfg.sprava || "").trim();
    if (sprava) payment.paymentNote = sprava;
    var vs = String(bankCfg.variabilnySymbol || "").trim();
    if (vs) payment.variableSymbol = vs;
    var suma = Number(bankCfg.suma);
    if (Number.isFinite(suma) && suma > 0) {
      payment.amount = Math.round(suma * 100) / 100;
    }
    return encode2({ payments: [payment] });
  }
  function showQrError(target, message) {
    if (!target) return;
    target.replaceChildren();
    var note = document.createElement("p");
    note.className = "bank-dar__qr-error";
    note.textContent = message;
    target.appendChild(note);
  }
  function renderQr(payload) {
    var target = document.getElementById("bank-dar-qr");
    if (!target) return;
    target.replaceChildren();
    target.appendChild(
      QRCode.generateSVG(payload, {
        ecclevel: "M",
        margin: 4,
        modulesize: 5
      })
    );
  }
  function updateQr() {
    var target = document.getElementById("bank-dar-qr");
    try {
      var payload = buildPayBySquarePayload();
      if (!payload) {
        showQrError(target, "Ch\xFDba IBAN v nastaven\xED.");
        return;
      }
      renderQr(payload);
    } catch (err) {
      console.error("Pay by Square QR:", err);
      showQrError(target, "QR k\xF3d sa nepodarilo vygenerova\u0165.");
    }
  }
  function initBankovyDarQr() {
    if (!normalizeIban(getBankCfg().iban)) return;
    var wrap = document.getElementById("bank-dar-qr-wrap");
    if (wrap) wrap.hidden = false;
    updateQr();
  }
  window.BankovyDarQr = { init: initBankovyDarQr };
})();
/*! Bundled license information:

lzma1/lib/index.js:
  (**
   * @license
   * Copyright Filip Seman
   * SPDX-License-Identifier: MIT
   *)

bysquare/lib/pay/index.js:
  (**
   * @license
   * Copyright Filip Seman
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
