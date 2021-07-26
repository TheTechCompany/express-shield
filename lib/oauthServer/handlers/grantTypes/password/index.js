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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../../../errors");
var verifier_1 = __importDefault(require("../../../verifier"));
var shared_1 = __importDefault(require("../shared"));
var getValidUser = function (req, getUser) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                if (!username)
                    throw new errors_1.InvalidRequestError('Missing Parameter: `username`');
                if (!password)
                    throw new errors_1.InvalidRequestError('Missing Parameter: `password`');
                if (!verifier_1.default.isUnicodeWithoutNewline(username))
                    throw new errors_1.InvalidRequestError('Invalid Parameter: `username`.', 'Must be unicode without newline characters.');
                if (!verifier_1.default.isUnicodeWithoutNewline(password))
                    throw new errors_1.InvalidRequestError('Invalid Parameter: `password`.', 'Must be unicode without newline characters.');
                return [4 /*yield*/, getUser(username, password)];
            case 1:
                user = _b.sent();
                if (!user)
                    throw new errors_1.InvalidGrantError('User Credentials are invalid');
                return [2 /*return*/, user];
        }
    });
}); };
var save = function (user, client, providedScope, model, accessCodeLifetime, refreshCodeLifetime) { return __awaiter(void 0, void 0, void 0, function () {
    var sharedData, _a, scope, accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                sharedData = { user: user, client: client, scope: providedScope, model: model };
                return [4 /*yield*/, Promise.all([
                        shared_1.default.validateScope(sharedData),
                        shared_1.default.generateAccessToken(sharedData),
                        shared_1.default.generateRefreshToken(sharedData),
                        shared_1.default.generateAccessToken(accessCodeLifetime),
                        shared_1.default.getRefreshTokenExpiresAt(refreshCodeLifetime),
                    ])];
            case 1:
                _a = _b.sent(), scope = _a[0], accessToken = _a[1], refreshToken = _a[2], accessTokenExpiresAt = _a[3], refreshTokenExpiresAt = _a[4];
                token = {
                    scope: scope,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    accessTokenExpiresAt: accessTokenExpiresAt,
                    refreshTokenExpiresAt: refreshTokenExpiresAt,
                };
                return [4 /*yield*/, model.saveToken(token, client, user)];
            case 2: return [2 /*return*/, _b.sent()];
        }
    });
}); };
var password = function (req, client, options) { return __awaiter(void 0, void 0, void 0, function () {
    var model, accessCodeLifetime, refreshCodeLifetime, getUser, saveToken, scope, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                shared_1.default.verify(options);
                model = options.model, accessCodeLifetime = options.accessCodeLifetime, refreshCodeLifetime = options.refreshCodeLifetime;
                getUser = model.getUser, saveToken = model.saveToken;
                if (!getUser)
                    throw new errors_1.MissingArgumentError('model.getUser');
                if (!saveToken)
                    throw new errors_1.MissingArgumentError('model.saveToken');
                scope = shared_1.default.getScope(req);
                return [4 /*yield*/, getValidUser(req, getUser)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, save(user, client, scope, model, accessCodeLifetime, refreshCodeLifetime)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.default = password;
