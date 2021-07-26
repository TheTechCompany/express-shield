"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateResponse = void 0;
var url_1 = __importDefault(require("url"));
var updateResponse = function (res, redirectUri, state) {
    redirectUri.query = __assign(__assign({}, redirectUri.query), { state: state });
    res.redirect(url_1.default.format(redirectUri));
};
exports.updateResponse = updateResponse;
