"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var app_api_1 = require("../app.api");
var AdicionaisService = /** @class */ (function () {
    function AdicionaisService(http, carrinhoService) {
        this.http = http;
        this.carrinhoService = carrinhoService;
        this.opcionais = false;
        this.bebidas = false;
        this.totalMolho = 0;
        this.totalHashi = 0;
        this.valorAdicionais = 0;
    }
    AdicionaisService.prototype.totalPecas = function () {
        var _this = this;
        this.itens = this.carrinhoService.getItems();
        this.totalMolho = 0;
        this.totalHashi = 0;
        this.itens.forEach(function (item) {
            if (item.menuItem.molho_adicional == 'S') {
                _this.totalMolho = _this.totalMolho + (item.menuItem.quantidade_itens * item.quantity);
            }
            if (item.menuItem.hashi_adicional == 'S') {
                _this.totalHashi = _this.totalHashi + (item.menuItem.quantidade_itens * item.quantity);
            }
        });
    };
    AdicionaisService.prototype.temOpcionais = function () {
        var _this = this;
        this.itens.forEach(function (item) {
            if (item.menuItem.wasabi_gengibre == 'S') {
                _this.opcionais = true;
            }
        });
        return this.opcionais;
    };
    AdicionaisService.prototype.temBebidas = function () {
        var _this = this;
        this.itens.forEach(function (item) {
            if (item.menuItem.categoria == 10) {
                _this.bebidas = true;
            }
        });
        return this.bebidas;
    };
    AdicionaisService.prototype.molho = function () {
        return this.http.get(app_api_1.MEAT_API + "/app/molhos/" + this.totalMolho);
    };
    AdicionaisService.prototype.hashi = function () {
        return this.http.get(app_api_1.MEAT_API + "/app/hashi/" + this.totalHashi);
    };
    AdicionaisService.prototype.salvar = function (dados, molho, hashi) {
        this.adicionais = dados;
        var totalMolho = dados.shoyu + dados.teriyaki;
        if (totalMolho - molho.quantidade > 0) {
            this.valorAdicionais = (totalMolho - molho.quantidade) * molho.valor;
        }
        var totalHashi = dados.hashi;
        if (totalHashi - hashi.quantidade > 0) {
            this.valorAdicionais = this.valorAdicionais + ((totalHashi - hashi.quantidade) * hashi.valor);
        }
    };
    AdicionaisService.prototype.clear = function () {
        this.valorAdicionais = 0;
        this.opcionais = false;
        this.totalMolho = 0;
        this.totalHashi = 0;
    };
    AdicionaisService.prototype.getDados = function () {
        return this.adicionais;
    };
    AdicionaisService.prototype.totalAdicionais = function () {
        return this.valorAdicionais;
    };
    AdicionaisService = __decorate([
        core_1.Injectable()
    ], AdicionaisService);
    return AdicionaisService;
}());
exports.AdicionaisService = AdicionaisService;
