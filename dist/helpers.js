"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.mergeDeep = exports.isObject = void 0;
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}
exports.isObject = isObject;
function mergeDeep(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    if (!sources.length) {
        throw new Error("No sources for mergeDeep()");
    }
    if (!isObject(target)) {
        throw new Error("Target is not an object\n" + target);
    }
    return __spreadArray([target], __read(sources)).reduce(function (a, c) {
        if (c !== undefined && c !== null) {
            for (var key in c) {
                if (c[key] !== undefined) {
                    if (isObject(c[key])) {
                        a[key] = mergeDeep(isObject(a[key]) ? a[key] : {}, c[key]);
                    }
                    else {
                        a[key] = c[key];
                    }
                }
            }
        }
        return a;
    }, {});
}
exports.mergeDeep = mergeDeep;
//# sourceMappingURL=helpers.js.map