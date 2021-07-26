"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicGrantTypes = void 0;
exports.basicGrantTypes = {
    authorization_code: require('./authorizationCode'),
    client_credentials: require('./clientCredentials'),
    password: require('./password'),
    refresh_token: require('./refreshToken')
};
