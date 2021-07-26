"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("./errors");
var type_is_1 = __importDefault(require("type-is"));
var Request = /** @class */ (function () {
    function Request(_a) {
        var headers = _a.headers, method = _a.method, query = _a.query, _b = _a.body, body = _b === void 0 ? {} : _b, rest = __rest(_a, ["headers", "method", "query", "body"]);
        if (!headers)
            throw new errors_1.MissingArgumentError('headers');
        if (!method)
            throw new errors_1.MissingArgumentError('method');
        if (!query)
            throw new errors_1.MissingArgumentError('query');
        var h = {};
        for (var header in headers) {
            if (headers.hasOwnProperty(header)) {
                h[header.toLowerCase()] = headers[header];
            }
        }
        Object.assign(this, {
            headers: h,
            method: method,
            query: query,
            body: body,
        });
        for (var key in rest) {
            if (rest.hasOwnProperty(key) && !this[key]) {
                this[key] = rest[key];
            }
        }
    }
    Request.prototype.get = function (field) {
        return this.headers[field.toLowerCase()];
    };
    Request.prototype.is = function (types) {
        var t = Array.isArray(types) ? types : [].slice.call(arguments);
        return type_is_1.default(this, t);
    };
    return Request;
}());
exports.default = Request;
