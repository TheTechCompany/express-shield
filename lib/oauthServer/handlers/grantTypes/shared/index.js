"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../../../errors");
var token_1 = require("../../../utils/token");
var verify = function (_a) {
    var accessTokenLifetime = _a.accessTokenLifetime, model = _a.model;
    if (!model)
        throw new errors_1.MissingArgumentError('model');
    if (!accessTokenLifetime)
        throw new errors_1.MissingArgumentError('accessTokenLifetime');
    return true;
};
var generateToken = function (key) { return function (_a) {
    var client = _a.client, user = _a.user, scope = _a.scope, _b = key, _c = _a.model[_b], generator = _c === void 0 ? token_1.generateRandomToken : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var token;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, generator(client, user, scope)];
                case 1:
                    token = _d.sent();
                    if (!token)
                        throw new errors_1.BadArgumentError(key, "falsy generated code. If a custom " + key + " function is provided, return a non-falsy value");
                    return [2 /*return*/, token];
            }
        });
    });
}; };
var getExpiresAt = function (lifetime) {
    var expires = new Date();
    expires.setSeconds(expires.getSeconds() + lifetime);
    return expires;
};
var getScope = function (req) {
    var scope = req.body.scope;
    //if (!verifier.isUnicodeWithExclamationSpace) throw new InvalidScopeError('Scope is malformed')
    return scope;
};
var validateScope = function (_a) {
    var user = _a.user, client = _a.client, scope = _a.scope, validateScope = _a.model.validateScope;
    return __awaiter(void 0, void 0, void 0, function () {
        var s;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!validateScope)
                        return [2 /*return*/, scope];
                    return [4 /*yield*/, validateScope(user, client, scope)];
                case 1:
                    s = _b.sent();
                    if (!s)
                        throw new errors_1.InvalidScopeError('Requested Scope is invalid');
                    return [2 /*return*/, scope];
            }
        });
    });
};
exports.default = {
    verify: verify,
    generateAccessToken: generateToken('generateAccessToken'),
    generateRefreshToken: generateToken('generateRefreshToken'),
    getAccessTokenExpiresAt: getExpiresAt,
    getRefreshTokenExpiresAt: getExpiresAt,
    getScope: getScope,
    validateScope: validateScope,
};
