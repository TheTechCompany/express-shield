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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenType = void 0;
var getTokenType = function (tokenModel) {
    return __assign({ access_token: tokenModel.accessToken, token_type: 'Bearer', expires_in: tokenModel.accessTokenLifetime, refresh_token: tokenModel.refreshToken, scope: tokenModel.scope }, tokenModel.customAttributes);
};
exports.getTokenType = getTokenType;
