"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var jquery_1 = require("jquery");
var app_api_1 = require("../app.api");
var HistoricoComponent = /** @class */ (function () {
    function HistoricoComponent(produtosService, loginService) {
        this.produtosService = produtosService;
        this.loginService = loginService;
        this.baseUrl = app_api_1.MEAT_API;
    }
    HistoricoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.produtosService.historicoPedidos().subscribe(function (pedidos) { return _this.objToArray(pedidos); });
    };
    HistoricoComponent.prototype.exibirEsconder = function (div) {
        if (jquery_1["default"](div).is(":visible")) {
            jquery_1["default"](div).hide();
        }
        else {
            jquery_1["default"](div).show();
        }
    };
    HistoricoComponent.prototype.objToArray = function (pedidos) {
        this.pedidos = Object.keys(pedidos).map(function (key) { return ({ type: key, value: pedidos[key] }); });
    };
    HistoricoComponent = __decorate([
        core_1.Component({
            selector: 'mt-historico',
            templateUrl: './historico.component.html',
            styleUrls: ['./historico.component.css']
        })
    ], HistoricoComponent);
    return HistoricoComponent;
}());
exports.HistoricoComponent = HistoricoComponent;
