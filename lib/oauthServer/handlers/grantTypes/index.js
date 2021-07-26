"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicGrantTypes = void 0;
var authorizationCode_1 = require("./authorizationCode");
var clientCredentials_1 = require("./clientCredentials");
var password_1 = __importDefault(require("./password"));
var refreshToken_1 = require("./refreshToken");
exports.basicGrantTypes = {
    authorization_code: authorizationCode_1.authorizationCode,
    client_credentials: clientCredentials_1.clientCredentials,
    password: password_1.default,
    refresh_token: refreshToken_1.refreshToken
};
