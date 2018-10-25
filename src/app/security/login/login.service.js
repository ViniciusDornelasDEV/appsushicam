"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/do");
require("rxjs/add/operator/filter");
var router_1 = require("@angular/router");
var angular_webstorage_service_1 = require("angular-webstorage-service");
var app_api_1 = require("../../app.api");
var LoginService = /** @class */ (function () {
    function LoginService(http, router, storage) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.storage = storage;
        this.router.events.filter(function (e) { return e instanceof router_1.NavigationEnd; }).subscribe(function (e) { return _this.lastUrl = e.url; });
    }
    LoginService.prototype.getUser = function () {
        return this.user;
    };
    LoginService.prototype.isLoggedIn = function () {
        if (this.user == undefined) {
            this.user = this.storage.get('user');
        }
        return this.user != undefined;
    };
    LoginService.prototype.login = function (telefone, password) {
        var _this = this;
        var header = new http_1.HttpHeaders({ 'Content-type': 'multipart/form-data' });
        return this.http.post(app_api_1.MEAT_API + "/app/login", { telefone: telefone, password: password }, { headers: header })["do"](function (user) { return _this.localStorage(user); });
    };
    LoginService.prototype.handleLogin = function (path) {
        if (path === void 0) { path = this.lastUrl; }
        this.router.navigate(['/registro']);
    };
    LoginService.prototype.logout = function () {
        this.storage.remove('user');
        this.user = undefined;
        this.router.navigate(['/']);
    };
    LoginService.prototype.localStorage = function (user) {
        this.user = user;
        this.storage.set('user', user);
    };
    LoginService.prototype.setSocialUser = function (user) {
        this.socialUser = user;
    };
    LoginService.prototype.pesquisarSocial = function () {
        var _this = this;
        var header = new http_1.HttpHeaders({ 'Content-type': 'multipart/form-data' });
        return this.http.post(app_api_1.MEAT_API + "/app/pesquisar/social", { email: this.socialUser.email }, { headers: header })["do"](function (user) { return _this.salvarSocial(user); });
    };
    LoginService.prototype.salvarSocial = function (user) {
        this.user = user;
        return this.user;
    };
    LoginService.prototype.loginSocial = function (user, telefone) {
        var _this = this;
        var header = new http_1.HttpHeaders({ 'Content-type': 'multipart/form-data' });
        return this.http.post(app_api_1.MEAT_API + "/app/login/social", { user: user, telefone: telefone }, { headers: header })["do"](function (user) { return _this.salvarSocial(user); });
    };
    LoginService = __decorate([
        core_1.Injectable(),
        __param(2, core_1.Inject(angular_webstorage_service_1.LOCAL_STORAGE))
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
/*
    let params: HttpParams = undefined;
    params = new HttpParams().set('email', email);
    params.set('password', password);

    return this.http.get<User>(`${MEAT_API}/login`, {params: params});

*/ 
