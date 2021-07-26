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
exports.authorizeHandler = void 0;
var errors_1 = require("../../errors");
var buildErrorUri_1 = require("./buildErrorUri");
var generateAuthorizationCode_1 = require("./generateAuthorizationCode");
var getExpiresAt_1 = require("./getExpiresAt");
var getRedirectUri_1 = require("./getRedirectUri");
var getScope_1 = require("./getScope");
var getState_1 = require("./getState");
var getUriBuilderFromResponseType_1 = require("./getUriBuilderFromResponseType");
var getValidClient_1 = require("./getValidClient");
var getValidUser_1 = require("./getValidUser");
var updateResponse_1 = require("./updateResponse");
var authorizeHandler = function (req, res, _a) {
    var _b = _a.model, getClient = _b.getClient, saveAuthorizationCode = _b.saveAuthorizationCode, authorizationCodeLifetime = _a.authorizationCodeLifetime, allowEmptyState = _a.allowEmptyState, authenticateHandler = _a.authenticateHandler;
    return __awaiter(void 0, void 0, void 0, function () {
        var _c, expiresAt, client, user, uri, state, code, scope, authorizationCode, buildSuccessRedirectUri, redirectUri, e_1, redirectUri;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (req.query.allowed === 'false')
                        throw new errors_1.AccessDeniedError('Access Denied: User denied access to application');
                    return [4 /*yield*/, Promise.all([
                            getExpiresAt_1.getExpiresAt(authorizationCodeLifetime),
                            getValidClient_1.getValidClient(req, getClient),
                            getValidUser_1.getValidUser(req, res, authenticateHandler),
                        ])];
                case 1:
                    _c = _d.sent(), expiresAt = _c[0], client = _c[1], user = _c[2];
                    uri = getRedirectUri_1.getRedirectUri(req, client);
                    state = getState_1.getState(req, allowEmptyState);
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 5, , 6]);
                    scope = getScope_1.getScope(req);
                    return [4 /*yield*/, generateAuthorizationCode_1.generateAuthorizationCode(client, user, scope)];
                case 3:
                    authorizationCode = _d.sent();
                    return [4 /*yield*/, saveAuthorizationCode({
                            authorizationCode: authorizationCode,
                            expiresAt: expiresAt,
                            scope: scope,
                            redirectUri: uri,
                        }, client, user)];
                case 4:
                    code = _d.sent();
                    buildSuccessRedirectUri = getUriBuilderFromResponseType_1.getUriBuilderFromResponseType(req);
                    redirectUri = buildSuccessRedirectUri(uri, code.authorizationCode);
                    updateResponse_1.updateResponse(res, redirectUri, state);
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _d.sent();
                    redirectUri = buildErrorUri_1.buildErrorRedirectUri(uri, e_1);
                    updateResponse_1.updateResponse(res, redirectUri, state);
                    throw e_1;
                case 6: return [2 /*return*/, code];
            }
        });
    });
};
exports.authorizeHandler = authorizeHandler;
