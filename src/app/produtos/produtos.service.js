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
var ProdutosService = /** @class */ (function () {
    function ProdutosService(http) {
        this.http = http;
        this.exibirMensagem = false;
    }
    ProdutosService.prototype.produtos = function (categoria) {
        return this.http.get(app_api_1.MEAT_API + "/app/produtos/" + categoria);
    };
    ProdutosService.prototype.categorias = function () {
        return this.http.get(app_api_1.MEAT_API + "/app/categorias");
    };
    ProdutosService.prototype.horarioFuncionamento = function () {
        return this.http.get(app_api_1.MEAT_API + "/app/horario/funcionamento");
    };
    ProdutosService.prototype.lojaAbre = function (funcionamento) {
        if (funcionamento.loja_abre == 'N') {
            this.mensagemFuncionamento = 'Desculpe, a loja não irá abrir hoje!';
            this.exibirMensagem = true;
        }
        else {
            if (funcionamento.abertura_pedidos_int > funcionamento.hora_atual
                || funcionamento.fechamento_pedidos_int < funcionamento.hora_atual) {
                this.mensagemFuncionamento = "Ainda n\u00E3o estamos abertos, voc\u00EA pode agendar seu pedido para qualquer \n            hor\u00E1rio entre " + funcionamento.abertura_pedidos + " e " + funcionamento.fechamento_pedidos;
                this.exibirMensagem = true;
            }
        }
    };
    ProdutosService.prototype.historicoPedidos = function () {
        return this.http.get(app_api_1.MEAT_API + "/app/historico/pedidos");
    };
    ProdutosService.prototype.repetirPedido = function (idPedido) {
        return this.http.get(app_api_1.MEAT_API + "/app/historico/pedido/" + idPedido);
    };
    ProdutosService.prototype.banners = function () {
        return this.http.get(app_api_1.MEAT_API + "/app/banners");
    };
    ProdutosService = __decorate([
        core_1.Injectable()
    ], ProdutosService);
    return ProdutosService;
}());
exports.ProdutosService = ProdutosService;
