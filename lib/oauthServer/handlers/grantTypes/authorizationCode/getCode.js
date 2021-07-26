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
var verifier_1 = __importDefault(require("../../../verifier"));
var errors_1 = require("../../../errors");
var getCode = function (req, client, _a) {
    var getAuthorizationCode = _a.getAuthorizationCode;
    return __awaiter(void 0, void 0, void 0, function () {
        var authCode, code;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    authCode = req.body.code;
                    if (!authCode)
                        throw new errors_1.InvalidRequestError('Missing Parameter: `code`. Ensure it is sent in the body of the request.');
                    if (!verifier_1.default.isPrintableUnicode)
                        throw new errors_1.InvalidRequestError('Invalid Parameter: `code`. Ensure it consists of printable unicode.');
                    return [4 /*yield*/, getAuthorizationCode(authCode)];
                case 1:
                    code = _b.sent();
                    if (!code)
                        throw new errors_1.InvalidGrantError('Authorization Code Is Invalid');
                    if (!code.client)
                        throw new errors_1.MissingArgumentError('code.client from model.getAuthorizationCode');
                    if (!code.user)
                        throw new errors_1.MissingArgumentError('non-falsy code.user from model.getAuthorizationCode');
                    if (code.client.id !== client.id)
                        throw new errors_1.InvalidGrantError('Authorization Code is Invalid');
                    if (!(code.expiresAt instanceof Date))
                        throw new errors_1.BadArgumentError('expiresAt from model.getAuthorizationCode', 'code.expiresAt must be an instance of Date');
                    if (code.expiresAt < new Date())
                        throw new errors_1.InvalidGrantError('Authorization Code is Expired');
                    if (code.redirectUri && !verifier_1.default.isUri(code.redirectUri))
                        throw new errors_1.InvalidGrantError('`redirect_uri` is not a valid URI.');
                    return [2 /*return*/, code];
            }
        });
    });
};
exports.default = getCode;
