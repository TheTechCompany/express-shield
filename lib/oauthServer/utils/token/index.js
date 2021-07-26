"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomToken = void 0;
var crypto_1 = __importDefault(require("crypto"));
var randomBytes = crypto_1.default.randomBytes;
var generateRandomToken = function () {
    return new Promise(function (res, rej) {
        randomBytes(256, function (err, buf) {
            if (err)
                return rej(err);
            return res(crypto_1.default
                .createHash('sha1')
                .update(buf)
                .digest('hex'));
        });
    });
};
exports.generateRandomToken = generateRandomToken;
