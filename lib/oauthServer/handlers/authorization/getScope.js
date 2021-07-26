"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScope = void 0;
var errors_1 = require("../../errors");
var verifier_1 = __importDefault(require("../../verifier"));
var getScope = function (req) {
    var scope = req.body.scope || req.query.scope;
    if (!verifier_1.default.isUnicodeWithExclamationSpace(scope))
        throw new errors_1.InvalidScopeError('Scope is not formatted properly');
    return scope;
};
exports.getScope = getScope;
module.exports = exports.getScope;
