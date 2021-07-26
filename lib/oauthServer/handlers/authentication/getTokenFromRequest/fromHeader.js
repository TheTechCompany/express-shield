"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../../../errors");
// http://tools.ietf.org/html/rfc6750#section-2.1
exports.default = (function (token) {
    var matches = token.match(/Bearer\s(\S+)/);
    if (!matches || matches.length < 2) {
        throw new errors_1.InvalidRequestError('Malformed authorization header', 'Authorization header is not formed correctly. Please see the documentation for correct headers');
    }
    return matches[1];
});
