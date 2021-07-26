"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../../../errors");
// http://tools.ietf.org/html/rfc6750#section-2.3
exports.default = (function (token, allowBearerTokensInQueryString) {
    if (allowBearerTokensInQueryString === void 0) { allowBearerTokensInQueryString = false; }
    if (allowBearerTokensInQueryString)
        return token;
    throw new errors_1.InvalidRequestError('Do not send bearer tokens in query URLs', 'Bearer Tokens in Query URLs are insecure and a bad practice. You can override this by adding the allowBearerTokensInQueryString to the options.');
});
