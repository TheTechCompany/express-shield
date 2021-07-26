"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseTypes = void 0;
var errors_1 = require("../../errors");
var url_1 = __importDefault(require("url"));
exports.responseTypes = {
    code: function (redirectUri, code) {
        if (!code)
            throw new errors_1.MissingArgumentError('code');
        if (!redirectUri)
            throw new errors_1.MissingArgumentError('redirectUri');
        var uri = url_1.default.parse(redirectUri, true);
        uri.query.code = code;
        uri.search = null;
        return uri;
    },
};
