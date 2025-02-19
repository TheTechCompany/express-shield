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
exports.getValidClient = exports.getCredentials = void 0;
var basic_auth_1 = __importDefault(require("basic-auth"));
var errors_1 = require("../../errors");
var verifier_1 = __importDefault(require("../../verifier"));
var getClientAuthenticationRequired = function (grantType, requiredGrantTypes) { return requiredGrantTypes[grantType] === undefined ? true : requiredGrantTypes[grantType]; };
var getCredentials = function (req, requiredGrantTypes) {
    var _a = req.body, clientId = _a.client_id, clientSecret = _a.client_secret, grantType = _a.grant_type;
    var cred = basic_auth_1.default(req);
    if (cred)
        return { clientId: cred.name, clientSecret: cred.pass, grantType: grantType };
    if (clientId && clientSecret)
        return { clientId: clientId, clientSecret: clientSecret, grantType: grantType };
    if (!getClientAuthenticationRequired(grantType, requiredGrantTypes) && clientId)
        return { clientId: clientId, grantType: grantType };
    throw new errors_1.InvalidClientError('Cannot retrieve client credentials. Examined the Authorization header and the body. Please see the documentation for more information.');
};
exports.getCredentials = getCredentials;
var getValidClient = function (req, res, getClient, requiredGrantTypes) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, clientId, clientSecret, grantType, client, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = exports.getCredentials(req, requiredGrantTypes), clientId = _a.clientId, clientSecret = _a.clientSecret, grantType = _a.grantType;
                if (!verifier_1.default.isPrintableUnicode(clientId))
                    throw new errors_1.InvalidClientError('`client_id` contains non-printable characters. Ensure that it contains only printable unicode characters');
                if (clientSecret && !verifier_1.default.isPrintableUnicode(clientSecret))
                    throw new errors_1.InvalidClientError('`client_secrete` contains non-printable characters. Ensure it contains only printable unicode characters');
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, getClient(clientId, clientSecret)];
            case 2:
                client = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                if ((e_1 instanceof errors_1.InvalidClientError) && req.get('authorization')) {
                    res.set('WWW-Authenticate', 'Basic realm="Service"');
                    throw new errors_1.InvalidClientError(e_1.message, { code: 401 });
                }
                throw e_1;
            case 4:
                if (!client)
                    throw new errors_1.InvalidClientError('Client is invalid');
                if (!client.grants)
                    throw new errors_1.MissingArgumentError('client.grants from model.getClient');
                if (!Array.isArray(client.grants))
                    throw new errors_1.BadArgumentError('client.grants from model.getClient', '`grants` in client must be an array. See getClient for more information');
                return [2 /*return*/, client];
        }
    });
}); };
exports.getValidClient = getValidClient;
