"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../../errors");
var notDefinedError = function (thing) { throw new errors_1.MissingArgumentError(thing); };
var scopeAndNotDefinedError = function (thing) { throw new errors_1.MissingArgumentError(thing + " with a defined scope"); };
function verifyAuthenticateOptions(_a) {
    var model = _a.model, scope = _a.scope, addAcceptedScopesHeader = _a.addAcceptedScopesHeader, addAuthorizedScopesHeader = _a.addAuthorizedScopesHeader;
    if (!model)
        notDefinedError('model');
    var getAccessToken = model.getAccessToken, verifyScope = model.verifyScope;
    if (!getAccessToken)
        notDefinedError('model.getAccessToken');
    if (scope && !addAcceptedScopesHeader)
        scopeAndNotDefinedError('model.addAcceptedScopesHeader');
    if (scope && !addAuthorizedScopesHeader)
        scopeAndNotDefinedError('model.addAuthorizedScopesHeader');
    if (scope && !verifyScope)
        scopeAndNotDefinedError('model.verifyScope');
    return true;
}
function verifyAuthorizationOptions(_a) {
    var model = _a.model, authenticateHandler = _a.authenticateHandler, authorizationCodeLifetime = _a.authorizationCodeLifetime;
    if (!model)
        notDefinedError('model');
    var getClient = model.getClient, saveAuthorizationCode = model.saveAuthorizationCode;
    if (authenticateHandler && !authenticateHandler.handle)
        notDefinedError('authenticateHandler.handle');
    if (!authorizationCodeLifetime)
        notDefinedError('authorizationCodeLifetime');
    if (!getClient)
        notDefinedError('model.getClient');
    if (!saveAuthorizationCode)
        notDefinedError('model.saveAuthorizationCode');
    return true;
}
function verifyTokenOptions(_a) {
    var model = _a.model, accessTokenLifetime = _a.accessTokenLifetime, refreshTokenLifetime = _a.refreshTokenLifetime;
    if (!model)
        notDefinedError('model');
    var getClient = model.getClient;
    if (!accessTokenLifetime)
        notDefinedError('accessTokenLifetime');
    if (!refreshTokenLifetime)
        notDefinedError('refreshTokenLifetime');
    if (!getClient)
        notDefinedError('model.getClient');
    return true;
}
exports.default = {
    authentication: verifyAuthenticateOptions,
    authorization: verifyAuthorizationOptions,
    token: verifyTokenOptions,
};
