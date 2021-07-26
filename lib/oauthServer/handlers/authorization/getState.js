"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getState = void 0;
var errors_1 = require("../../errors");
var verifier_1 = __importDefault(require("../../verifier"));
var getState = function (req, allowEmptyState) {
    var state = req.body.state || req.query.state;
    if (!allowEmptyState && !state)
        throw new errors_1.InvalidRequestError('state is required in the request query or body.');
    if (!verifier_1.default.isPrintableUnicode(state))
        throw new errors_1.InvalidRequestError('state must consist of printable unicode characters.');
    return state;
};
exports.getState = getState;
