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
exports.AuthenticationHandler = void 0;
var errors_1 = require("../../errors");
var getTokenFromRequest_1 = require("./getTokenFromRequest");
var AuthenticationHandler = function (req, res, _a) {
    var scope = _a.scope, _b = _a.model, getAccessToken = _b.getAccessToken, verifyScope = _b.verifyScope, allowBearerTokensInQueryString = _a.allowBearerTokensInQueryString, addAcceptedScopesHeader = _a.addAcceptedScopesHeader, addAuthorizedScopesHeader = _a.addAuthorizedScopesHeader;
    return __awaiter(void 0, void 0, void 0, function () {
        var accessToken, token, verifiedScope, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, getTokenFromRequest_1.getTokenFromRequest(req, allowBearerTokensInQueryString)];
                case 1:
                    token = _c.sent();
                    return [4 /*yield*/, getAccessToken(token)];
                case 2:
                    accessToken = _c.sent();
                    if (!accessToken)
                        throw new errors_1.MissingArgumentError('token in model.getAccessToken');
                    if (!accessToken.user)
                        throw new errors_1.MissingArgumentError('token.user from model.getAccessToken');
                    if (!(accessToken.accessTokenExpiresAt instanceof Date))
                        throw new errors_1.BadArgumentError('token.accessTokenExpiresAt from model.getAccessToken', 'must be an instance of Date');
                    if (accessToken.accessTokenExpiresAt < new Date())
                        throw new errors_1.InvalidTokenError('Invalid token: Access token has expired');
                    if (!scope) return [3 /*break*/, 4];
                    return [4 /*yield*/, verifyScope(accessToken)];
                case 3:
                    verifiedScope = _c.sent();
                    if (!verifiedScope)
                        throw new errors_1.InsufficientScopeError('Authorized Scope is insufficient');
                    _c.label = 4;
                case 4:
                    if (scope && addAcceptedScopesHeader) {
                        res.set('X-Accepted-OAuth-Scopes', scope);
                    }
                    if (scope && addAuthorizedScopesHeader) {
                        res.set('X-OAuth-Scopes', accessToken.scope);
                    }
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _c.sent();
                    res.set('WWW-Authenticate', 'Bearer realm="Service"');
                    throw e_1;
                case 6: return [2 /*return*/, accessToken];
            }
        });
    });
};
exports.AuthenticationHandler = AuthenticationHandler;
