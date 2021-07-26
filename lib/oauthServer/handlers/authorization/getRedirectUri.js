"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedirectUri = void 0;
var getRedirectUri = function (req, client) { return req.body.redirect_uri || req.query.redirect_uri || client.redirectUris[0]; };
exports.getRedirectUri = getRedirectUri;
