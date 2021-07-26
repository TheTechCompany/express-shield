"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateErrorResponse = void 0;
var updateErrorResponse = function (e, res) {
    res.body = {
        error: e.name,
        error_description: e.message,
    };
    res.status = e.code;
};
exports.updateErrorResponse = updateErrorResponse;
