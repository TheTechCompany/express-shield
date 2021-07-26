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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var verifier_1 = __importDefault(require("../../../verifier"));
var errors_1 = require("../../../errors");
var shared_1 = __importDefault(require("../shared"));
var getNewToken = function (req, providedClient, getRefreshToken) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, token, client, user, refreshTokenExpiresAt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                refreshToken = req.body.refresh_token;
                if (!refreshToken)
                    throw new errors_1.InvalidRequestError('Missing Parameter: `refresh_token`. Please include this in the body of your request.');
                if (!verifier_1.default.isPrintableUnicode(refreshToken))
                    throw new errors_1.InvalidRequestError('Invalid Parameter: `refresh_token`. Please ensure it consists of printable unicode characters');
                return [4 /*yield*/, getRefreshToken(refreshToken)];
            case 1:
                token = _a.sent();
                if (!token)
                    throw new errors_1.InvalidGrantError('Refresh Token is invalid');
                client = token.client, user = token.user, refreshTokenExpiresAt = token.refreshTokenExpiresAt;
                if (!client)
                    throw new errors_1.MissingArgumentError('token.client from model.getRefreshToken');
                if (client.id !== providedClient.id)
                    throw new errors_1.InvalidGrantError('Refresh Token is Invalid');
                if (!user)
                    throw new errors_1.MissingArgumentError('non-falsy token.user from model.getRefreshToken');
                if (refreshTokenExpiresAt) {
                    if (!(refreshTokenExpiresAt instanceof Date))
                        throw new errors_1.BadArgumentError('refreshTokenExpiresAt', 'must be an instance of Date when included in `model.getRefreshToken`');
                    if (refreshTokenExpiresAt < new Date())
                        throw new errors_1.InvalidGrantError('Refresh Token has expired');
                }
                return [2 /*return*/, token];
        }
    });
}); };
var revoke = function (token, revokeToken, alwaysIssueNewRefreshToken) { return __awaiter(void 0, void 0, void 0, function () {
    var status;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!alwaysIssueNewRefreshToken)
                    return [2 /*return*/, token];
                return [4 /*yield*/, revokeToken(token)];
            case 1:
                status = _a.sent();
                if (!status)
                    throw new errors_1.InvalidGrantError('Refresh Token is invalid');
                return [2 /*return*/, token];
        }
    });
}); };
var save = function (user, client, providedScope, model, accessTokenLifetime, refreshTokenLifetime, alwaysIssueNewRefreshToken) { return __awaiter(void 0, void 0, void 0, function () {
    var sharedData, todos, _a, accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                sharedData = { user: user, client: client, scope: providedScope, model: model };
                todos = [
                    shared_1.default.generateAccessToken(sharedData),
                    shared_1.default.getAccessTokenExpiresAt(accessTokenLifetime),
                ];
                if (alwaysIssueNewRefreshToken) {
                    todos = __spreadArray(__spreadArray([], todos), [
                        shared_1.default.generateRefreshToken(sharedData),
                        shared_1.default.getRefreshTokenExpiresAt(refreshTokenLifetime)
                    ]);
                }
                else {
                    todos = __spreadArray(__spreadArray([], todos), [undefined, undefined]);
                }
                return [4 /*yield*/, Promise.all(todos)];
            case 1:
                _a = _b.sent(), accessToken = _a[0], accessTokenExpiresAt = _a[1], refreshToken = _a[2], refreshTokenExpiresAt = _a[3];
                token = {
                    accessToken: accessToken,
                    accessTokenExpiresAt: accessTokenExpiresAt,
                    refreshToken: refreshToken,
                    refreshTokenExpiresAt: refreshTokenExpiresAt,
                };
                return [4 /*yield*/, model.saveToken(token, client, user)];
            case 2: return [2 /*return*/, _b.sent()];
        }
    });
}); };
var refreshToken = function (req, client, options) { return __awaiter(void 0, void 0, void 0, function () {
    var model, alwaysIssueNewRefreshToken, refreshTokenLifetime, accessTokenLifetime, getRefreshToken, revokeToken, saveToken, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                shared_1.default.verify(options);
                model = options.model, alwaysIssueNewRefreshToken = options.alwaysIssueNewRefreshToken, refreshTokenLifetime = options.refreshTokenLifetime, accessTokenLifetime = options.accessTokenLifetime;
                getRefreshToken = model.getRefreshToken, revokeToken = model.revokeToken, saveToken = model.saveToken;
                if (!getRefreshToken)
                    throw new errors_1.MissingArgumentError('model.getRefreshToken');
                if (!revokeToken)
                    throw new errors_1.MissingArgumentError('model.revokeToken');
                if (!saveToken)
                    throw new errors_1.MissingArgumentError('model.saveToken');
                return [4 /*yield*/, getNewToken(req, client, getRefreshToken)];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, revoke(token, revokeToken, alwaysIssueNewRefreshToken)];
            case 2:
                _a.sent();
                return [4 /*yield*/, save(token.user, client, token.scope, model, accessTokenLifetime, refreshTokenLifetime, alwaysIssueNewRefreshToken)];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
module.exports = refreshToken;
