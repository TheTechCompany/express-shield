"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../../../errors");
// Only available for HTTP methods that have a body
// Especially excludes GET
// http://tools.ietf.org/html/rfc6750#section-2.2
exports.default = (function (req) {
    if (req.method === 'GET') {
        throw new errors_1.InvalidRequestError('Token may not be passed in the body with GET', "GET doesn't have semantically defined body, and should not be used to pass the access token");
    }
    if (!req.is('application/x-www-form-urlencoded')) {
        throw new errors_1.InvalidRequestError('Content must be application/x-www-form-urlencoded');
    }
    return req.body.access_token;
});
