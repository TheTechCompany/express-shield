"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = exports.Response = exports.Errors = exports.Server = exports.OAuth = void 0;
var authentication_1 = require("./handlers/authentication");
var authorization_1 = require("./handlers/authorization");
var token_1 = require("./handlers/token");
var options_1 = __importDefault(require("./verifier/options"));
var OAuth = /** @class */ (function () {
    function OAuth(_a) {
        var model = _a.model, _b = _a.scope, scope = _b === void 0 ? false : _b, 
        // Authenticate Default Options
        _c = _a.addAcceptedScopesHeader, 
        // Authenticate Default Options
        addAcceptedScopesHeader = _c === void 0 ? true : _c, _d = _a.addAuthorizedScopesHeader, addAuthorizedScopesHeader = _d === void 0 ? true : _d, _e = _a.allowBearerTokensInQueryString, allowBearerTokensInQueryString = _e === void 0 ? false : _e, 
        // Authorization Default Options
        _f = _a.allowEmptyState, 
        // Authorization Default Options
        allowEmptyState = _f === void 0 ? false : _f, _g = _a.authorizationCodeLifetime, authorizationCodeLifetime = _g === void 0 ? 5 * 60 : _g, 
        // Token Default Options
        _h = _a.accessTokenLifetime, 
        // Token Default Options
        accessTokenLifetime = _h === void 0 ? 60 * 60 : _h, _j = _a.refreshTokenLifetime, refreshTokenLifetime = _j === void 0 ? 60 * 60 * 24 * 14 : _j, _k = _a.allowExtendedTokenAttributes, allowExtendedTokenAttributes = _k === void 0 ? false : _k, _l = _a.requireClientAuthentication, requireClientAuthentication = _l === void 0 ? {
            authorizationCode: true,
            password: true,
            refreshToken: true,
        } : _l, _m = _a.alwaysIssueNewRefreshToken, alwaysIssueNewRefreshToken = _m === void 0 ? true : _m, rest = __rest(_a, ["model", "scope", "addAcceptedScopesHeader", "addAuthorizedScopesHeader", "allowBearerTokensInQueryString", "allowEmptyState", "authorizationCodeLifetime", "accessTokenLifetime", "refreshTokenLifetime", "allowExtendedTokenAttributes", "requireClientAuthentication", "alwaysIssueNewRefreshToken"]);
        this.options = __assign({ model: model, scope: scope, addAcceptedScopesHeader: addAcceptedScopesHeader, addAuthorizedScopesHeader: addAuthorizedScopesHeader, allowBearerTokensInQueryString: allowBearerTokensInQueryString, allowEmptyState: allowEmptyState, authorizationCodeLifetime: authorizationCodeLifetime, accessTokenLifetime: accessTokenLifetime, refreshTokenLifetime: refreshTokenLifetime, allowExtendedTokenAttributes: allowExtendedTokenAttributes, requireClientAuthentication: requireClientAuthentication, alwaysIssueNewRefreshToken: alwaysIssueNewRefreshToken }, rest);
    }
    OAuth.prototype.authenticate = function (req, res, authenticateOptions) {
        var options = __assign(__assign({}, this.options), authenticateOptions);
        options_1.default.authentication(options);
        return authentication_1.AuthenticationHandler(req, res, options);
    };
    OAuth.prototype.authorize = function (req, res, authorizeOptions) {
        var options = __assign(__assign({}, this.options), authorizeOptions);
        options_1.default.authorization(options);
        return authorization_1.authorizeHandler(req, res, options);
    };
    OAuth.prototype.token = function (req, res, tokenOptions) {
        var options = __assign(__assign({}, this.options), tokenOptions);
        options_1.default.token(options);
        return token_1.tokenHandler(req, res, options);
    };
    return OAuth;
}());
exports.OAuth = OAuth;
exports.Server = OAuth;
var request_1 = require("./request");
Object.defineProperty(exports, "Request", { enumerable: true, get: function () { return request_1.Request; } });
var response_1 = require("./response");
Object.defineProperty(exports, "Response", { enumerable: true, get: function () { return response_1.Response; } });
var Errors = __importStar(require("./errors"));
exports.Errors = Errors;
