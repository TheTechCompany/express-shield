"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUri = void 0;
var verifier_1 = __importDefault(require("../../../verifier"));
var errors_1 = require("../../../errors");
var validateUri = function (req, code) {
    if (!code.redirectUri)
        return;
    var redirectUri = req.body.redirect_uri || req.query.redirect_uri;
    if (!verifier_1.default.isUri(redirectUri))
        throw new errors_1.InvalidRequestError('`redirect_uri` is invalid');
    if (redirectUri != code.redirectUri)
        throw new errors_1.InvalidRequestError('`redirect_uri` is invalid');
};
exports.validateUri = validateUri;
module.exports = exports.validateUri;
