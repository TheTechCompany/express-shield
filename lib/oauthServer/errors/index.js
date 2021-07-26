"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedResponseTypeError = exports.UnsupportedGrantTypeError = exports.UnauthorizedRequestError = exports.UnauthorizedClientError = exports.InvalidTokenError = exports.InvalidScopeError = exports.InvalidRequestError = exports.InvalidGrantError = exports.InvalidClientError = exports.BadArgumentError = exports.MissingArgumentError = exports.InvalidArgumentError = exports.ServerError = exports.InsufficientScopeError = exports.AccessDeniedError = exports.OAuthError = exports.captureErrorTrace = void 0;
var captureErrorTrace = function (errInstance, errClass) {
    Error.captureStackTrace(errInstance, errClass);
};
exports.captureErrorTrace = captureErrorTrace;
var OAuthError = /** @class */ (function (_super) {
    __extends(OAuthError, _super);
    function OAuthError(err, properties) {
        if (properties === void 0) { properties = { code: 500, name: 'OAuthError', extendedMessage: '' }; }
        var _this = this;
        var msg = err instanceof Error ? err.message : err;
        _this = _super.call(this, msg.toString()) || this;
        Object.assign(_this, properties);
        _this.code = _this.status = _this.statusCode = properties.code;
        if (!_this.extendedMessage)
            _this.extendedMessage = msg;
        exports.captureErrorTrace(_this, OAuthError);
        return _this;
    }
    OAuthError.prototype.getDebugInfo = function () { return this.extendedMessage; };
    return OAuthError;
}(Error));
exports.OAuthError = OAuthError;
var AccessDeniedError = /** @class */ (function (_super) {
    __extends(AccessDeniedError, _super);
    function AccessDeniedError(reasonForDenial, extendedMessage) {
        var _this = _super.call(this, 'AccessDeniedError: ' + reasonForDenial, { code: 400, name: 'access_denied', extendedMessage: extendedMessage }) || this;
        exports.captureErrorTrace(_this, AccessDeniedError);
        return _this;
    }
    return AccessDeniedError;
}(OAuthError));
exports.AccessDeniedError = AccessDeniedError;
var InsufficientScopeError = /** @class */ (function (_super) {
    __extends(InsufficientScopeError, _super);
    function InsufficientScopeError(reasonForDenial, extendedMessage) {
        var _this = _super.call(this, 'InsufficientScopeError: ' + reasonForDenial, { code: 403, name: 'insufficient_scope', extendedMessage: extendedMessage }) || this;
        exports.captureErrorTrace(_this, InsufficientScopeError);
        return _this;
    }
    return InsufficientScopeError;
}(OAuthError));
exports.InsufficientScopeError = InsufficientScopeError;
var ServerError = /** @class */ (function (_super) {
    __extends(ServerError, _super);
    function ServerError(reasonForDenial, extendedMessage) {
        var _this = _super.call(this, 'ServerError: ' + reasonForDenial, { code: 500, name: 'server_error', extendedMessage: extendedMessage }) || this;
        exports.captureErrorTrace(_this, ServerError);
        return _this;
    }
    return ServerError;
}(OAuthError));
exports.ServerError = ServerError;
var InvalidArgumentError = /** @class */ (function (_super) {
    __extends(InvalidArgumentError, _super);
    function InvalidArgumentError(reasonForDenial, extendedMessage) {
        var _this = _super.call(this, 'InvalidArgumentError: ' + reasonForDenial, { code: 500, name: 'invalid_argument', extendedMessage: extendedMessage }) || this;
        exports.captureErrorTrace(_this, InvalidArgumentError);
        return _this;
    }
    return InvalidArgumentError;
}(ServerError));
exports.InvalidArgumentError = InvalidArgumentError;
var MissingArgumentError = /** @class */ (function (_super) {
    __extends(MissingArgumentError, _super);
    function MissingArgumentError(missingArgument) {
        var _this = _super.call(this, "'" + missingArgument + "' is not present.", "Please refer to the documentation for '" + missingArgument + "'.") || this;
        exports.captureErrorTrace(_this, MissingArgumentError);
        return _this;
    }
    return MissingArgumentError;
}(InvalidArgumentError));
exports.MissingArgumentError = MissingArgumentError;
var BadArgumentError = /** @class */ (function (_super) {
    __extends(BadArgumentError, _super);
    function BadArgumentError(badArgument, reasonBad) {
        var _this = _super.call(this, "'" + badArgument + "' is not valid.", badArgument + " is not valid. " + reasonBad + ". Please refer to the documentation for '" + badArgument + "'.") || this;
        exports.captureErrorTrace(_this, BadArgumentError);
        return _this;
    }
    return BadArgumentError;
}(InvalidArgumentError));
exports.BadArgumentError = BadArgumentError;
var InvalidClientError = /** @class */ (function (_super) {
    __extends(InvalidClientError, _super);
    function InvalidClientError(reasonForDenial, extendedMessage) {
        var _this = _super.call(this, 'InvalidClientError: ' + reasonForDenial, { code: 400, name: 'invalid_client', extendedMessage: extendedMessage }) || this;
        exports.captureErrorTrace(_this, InvalidClientError);
        return _this;
    }
    return InvalidClientError;
}(OAuthError));
exports.InvalidClientError = InvalidClientError;
var InvalidGrantError = /** @class */ (function (_super) {
    __extends(InvalidGrantError, _super);
    function InvalidGrantError(reasonForDenial, extendedMessage) {
        var _this = _super.call(this, 'InvalidGrantError: ' + reasonForDenial, { code: 400, name: 'invalid_grant', extendedMessage: extendedMessage }) || this;
        exports.captureErrorTrace(_this, InvalidGrantError);
        return _this;
    }
    return InvalidGrantError;
}(OAuthError));
exports.InvalidGrantError = InvalidGrantError;
var InvalidRequestError = /** @class */ (function (_super) {
    __extends(InvalidRequestError, _super);
    function InvalidRequestError(reasonForDenial, extendedMessage) {
        var _this = _super.call(this, 'InvalidRequestError: ' + reasonForDenial, { code: 400, name: 'invalid_request', extendedMessage: extendedMessage }) || this;
        exports.captureErrorTrace(_this, InvalidRequestError);
        return _this;
    }
    return InvalidRequestError;
}(OAuthError));
exports.InvalidRequestError = InvalidRequestError;
var InvalidScopeError = /** @class */ (function (_super) {
    __extends(InvalidScopeError, _super);
    function InvalidScopeError(reasonForDenial, extendedMessage) {
        var _this = _super.call(this, 'InvalidScopeError: ' + reasonForDenial, { code: 400, name: 'invalid_scope', extendedMessage: extendedMessage }) || this;
        exports.captureErrorTrace(_this, InvalidScopeError);
        return _this;
    }
    return InvalidScopeError;
}(OAuthError));
exports.InvalidScopeError = InvalidScopeError;
var InvalidTokenError = /** @class */ (function (_super) {
    __extends(InvalidTokenError, _super);
    function InvalidTokenError(reasonForDenial, extendedMessage) {
        var _this = _super.call(this, 'InvalidTokenError: ' + reasonForDenial, { code: 401, name: 'invalid_token', extendedMessage: extendedMessage }) || this;
        exports.captureErrorTrace(_this, InvalidTokenError);
        return _this;
    }
    return InvalidTokenError;
}(OAuthError));
exports.InvalidTokenError = InvalidTokenError;
var UnauthorizedClientError = /** @class */ (function (_super) {
    __extends(UnauthorizedClientError, _super);
    function UnauthorizedClientError(reasonForDenial, extendedMessage) {
        var _this = _super.call(this, 'UnauthorizedClientError: ' + reasonForDenial, { code: 400, name: 'unauthorized_client', extendedMessage: extendedMessage }) || this;
        exports.captureErrorTrace(_this, UnauthorizedClientError);
        return _this;
    }
    return UnauthorizedClientError;
}(OAuthError));
exports.UnauthorizedClientError = UnauthorizedClientError;
var UnauthorizedRequestError = /** @class */ (function (_super) {
    __extends(UnauthorizedRequestError, _super);
    function UnauthorizedRequestError(reasonForDenial, extendedMessage) {
        var _this = _super.call(this, 'UnauthorizedRequestError: ' + reasonForDenial, { code: 401, name: 'unauthorized_request', extendedMessage: extendedMessage }) || this;
        exports.captureErrorTrace(_this, UnauthorizedRequestError);
        return _this;
    }
    return UnauthorizedRequestError;
}(OAuthError));
exports.UnauthorizedRequestError = UnauthorizedRequestError;
var UnsupportedGrantTypeError = /** @class */ (function (_super) {
    __extends(UnsupportedGrantTypeError, _super);
    function UnsupportedGrantTypeError(reasonForDenial, extendedMessage) {
        var _this = _super.call(this, 'UnsupportedGrantTypeError: ' + reasonForDenial, { code: 400, name: 'unsupported_grant_type', extendedMessage: extendedMessage }) || this;
        exports.captureErrorTrace(_this, UnsupportedGrantTypeError);
        return _this;
    }
    return UnsupportedGrantTypeError;
}(OAuthError));
exports.UnsupportedGrantTypeError = UnsupportedGrantTypeError;
var UnsupportedResponseTypeError = /** @class */ (function (_super) {
    __extends(UnsupportedResponseTypeError, _super);
    function UnsupportedResponseTypeError(reasonForDenial, extendedMessage) {
        var _this = _super.call(this, 'UnsupportedResponseTypeError: ' + reasonForDenial, { code: 400, name: 'unsupported_response_type', extendedMessage: extendedMessage }) || this;
        exports.captureErrorTrace(_this, UnsupportedResponseTypeError);
        return _this;
    }
    return UnsupportedResponseTypeError;
}(OAuthError));
exports.UnsupportedResponseTypeError = UnsupportedResponseTypeError;
