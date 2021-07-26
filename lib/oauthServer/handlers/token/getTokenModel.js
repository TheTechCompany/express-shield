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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenModel = void 0;
var errors_1 = require("../../errors");
var getTokenModel = function (_a, allowExtendedTokenAttributes) {
    if (allowExtendedTokenAttributes === void 0) { allowExtendedTokenAttributes = false; }
    var accessToken = _a.accessToken, refreshToken = _a.refreshToken, client = _a.client, user = _a.user, accessTokenExpiresAt = _a.accessTokenExpiresAt, refreshTokenExpiresAt = _a.refreshTokenExpiresAt, scope = _a.scope, extendedAttributes = __rest(_a, ["accessToken", "refreshToken", "client", "user", "accessTokenExpiresAt", "refreshTokenExpiresAt", "scope"]);
    if (!accessToken)
        throw new errors_1.MissingArgumentError('token.accessToken from model.saveToken');
    if (!client)
        throw new errors_1.MissingArgumentError('token.client from model.saveToken');
    if (!user)
        throw new errors_1.MissingArgumentError('token.user from from model.saveToken');
    if (accessTokenExpiresAt && !(accessTokenExpiresAt instanceof Date))
        throw new errors_1.BadArgumentError('accessTokenExpiresAt', 'must be an instance of Date');
    if (refreshTokenExpiresAt && !(refreshTokenExpiresAt instanceof Date))
        throw new errors_1.BadArgumentError('refreshTokenExpiresAt', 'must be an instance of Date');
    var tokenModel = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        client: client,
        user: user,
        accessTokenExpiresAt: accessTokenExpiresAt,
        refreshTokenExpiresAt: refreshTokenExpiresAt,
        scope: scope,
        customAttributes: allowExtendedTokenAttributes ? extendedAttributes : undefined,
    };
    if (accessTokenExpiresAt) {
        tokenModel.accessTokenLifetime = Math.floor((accessTokenExpiresAt - new Date().getTime()) / 1000);
    }
    return tokenModel;
};
exports.getTokenModel = getTokenModel;
