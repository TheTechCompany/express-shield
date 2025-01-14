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
exports.getValidClient = void 0;
var verifier_1 = __importDefault(require("../../verifier"));
var errors_1 = require("../../errors");
var getValidClient = function (req, getClient) { return __awaiter(void 0, void 0, void 0, function () {
    var clientId, redirectURI, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                clientId = req.body.client_id || req.query.client_id;
                if (!clientId)
                    throw new errors_1.InvalidRequestError('client_id must be included in either the body or as a url query.');
                if (!verifier_1.default.isPrintableUnicode(clientId))
                    throw new errors_1.InvalidRequestError('client_id must consist of printable unicode characters.');
                redirectURI = req.body.redirect_uri || req.query.redirect_uri;
                if (redirectURI && !verifier_1.default.isUri(redirectURI))
                    throw new errors_1.InvalidRequestError('redirect_uri must be a valid uri.');
                return [4 /*yield*/, getClient(clientId, undefined)];
            case 1:
                client = _a.sent();
                if (!client)
                    throw new errors_1.InvalidClientError('Client Credentials are invalid');
                if (!client.grants)
                    throw new errors_1.UnauthorizedClientError('Client does not have this grant.');
                if (!client.grants.includes('authorization_code'))
                    throw new errors_1.UnauthorizedClientError('Client does not have this grant');
                if (!client.redirectUris || client.redirectUris.length === 0)
                    throw new errors_1.InvalidClientError('Client does not have redirectUris defined.');
                if (redirectURI && !client.redirectUris.includes(redirectURI))
                    throw new errors_1.InvalidClientError('passed redirectUri is not an accepted uri for this client');
                return [2 /*return*/, client];
        }
    });
}); };
exports.getValidClient = getValidClient;
