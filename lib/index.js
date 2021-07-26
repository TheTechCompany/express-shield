"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth = exports.Express = void 0;
var expressWrapper_1 = __importDefault(require("./expressWrapper"));
exports.Express = expressWrapper_1.default;
var oauthServer_1 = require("./oauthServer");
Object.defineProperty(exports, "OAuth", { enumerable: true, get: function () { return oauthServer_1.Server; } });
