"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpiresAt = void 0;
var getExpiresAt = function (seconds) {
    var d = new Date();
    d.setSeconds(d.getSeconds() + seconds);
    return d;
};
exports.getExpiresAt = getExpiresAt;
