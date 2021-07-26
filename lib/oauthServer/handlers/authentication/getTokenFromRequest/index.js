"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenFromRequest = void 0;
var errors_1 = require("../../../errors");
// Only one Authentication Method should be used
// https://tools.ietf.org/html/rfc6750#section-2
var fromHeader_1 = __importDefault(require("./fromHeader"));
var fromBody_1 = __importDefault(require("./fromBody"));
var fromQuery_1 = __importDefault(require("./fromQuery"));
var getTokenFromRequest = function (req, allowBearerTokensInQueryString) {
    var header = req.get('Authorization');
    var query = req.query.access_token;
    var body = req.body.access_token;
    if (header && query && body)
        throw new errors_1.InvalidRequestError('Only one authentication method is allowed', 'Request has multiple authorizations in it (checked header, body, and query). Please only use one.');
    if (header)
        return fromHeader_1.default(header);
    if (query)
        return fromQuery_1.default(query, allowBearerTokensInQueryString);
    if (body)
        return fromBody_1.default(req);
    throw new errors_1.UnauthorizedRequestError('No authentication given', 'No authentication given (checked in header, body, and query). Please authenticate with one of those.');
};
exports.getTokenFromRequest = getTokenFromRequest;
module.exports = exports.getTokenFromRequest;
