"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildErrorRedirectUri = void 0;
var url_1 = __importDefault(require("url"));
var buildErrorRedirectUri = function (redirectUri, error) {
    var uri = url_1.default.parse(redirectUri);
    uri.query = { error: error.name, error_description: error.message };
    return uri;
};
exports.buildErrorRedirectUri = buildErrorRedirectUri;
