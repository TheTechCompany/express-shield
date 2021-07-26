"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSuccessResponse = void 0;
var updateSuccessResponse = function (res, tokenType) {
    res.body = tokenType;
    res.set('Cache-Control', 'no-store');
    res.set('Pragma', 'no-cache');
};
exports.updateSuccessResponse = updateSuccessResponse;
