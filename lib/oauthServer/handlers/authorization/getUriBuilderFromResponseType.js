"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUriBuilderFromResponseType = void 0;
var responseTypes_1 = require("./responseTypes");
var errors_1 = require("../../errors");
var getUriBuilderFromResponseType = function (req) {
    var responseType = req.body.response_type || req.query.responseType;
    if (!responseType)
        throw new errors_1.InvalidRequestError('Mising Parameter: `response_type`. Please include an appropriate response_type in your request body or url query');
    var uriBuilder = responseTypes_1.responseTypes[responseType];
    if (!uriBuilder)
        throw new errors_1.UnsupportedResponseTypeError('Unsupported Response Type: provided `response_type` is not supported.');
    return uriBuilder;
};
exports.getUriBuilderFromResponseType = getUriBuilderFromResponseType;
