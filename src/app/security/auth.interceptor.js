"use strict";
exports.__esModule = true;
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor() {
    }
    AuthInterceptor.prototype.intercept = function (request, next) {
        return next.handle(request);
    };
    return AuthInterceptor;
}());
exports.AuthInterceptor = AuthInterceptor;
