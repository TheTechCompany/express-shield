"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Response = /** @class */ (function () {
    function Response(_a) {
        var _b = _a.body, body = _b === void 0 ? {} : _b, _c = _a.headers, headers = _c === void 0 ? {} : _c;
        var h = {};
        for (var header in headers) {
            if (headers.hasOwnProperty(header)) {
                h[header.toLowerCase()] = headers[header];
            }
        }
        Object.assign(this, {
            headers: h,
            body: body,
            status: 200,
        });
    }
    Response.prototype.get = function (field) {
        return this.headers[field.toLowerCase()];
    };
    Response.prototype.redirect = function (location) {
        this.set('Location', location);
        this.status = 302;
    };
    Response.prototype.set = function (field, value) {
        this.headers[field.toLowerCase()] = value;
    };
    return Response;
}());
exports.default = Response;
