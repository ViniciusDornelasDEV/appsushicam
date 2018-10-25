"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var carrinho_item_model_1 = require("./carrinho-item.model");
var CarrinhoService = /** @class */ (function () {
    function CarrinhoService(notificationService) {
        this.notificationService = notificationService;
        this.items = [];
    }
    CarrinhoService.prototype.clear = function () {
        this.items = [];
    };
    CarrinhoService.prototype.getItems = function () {
        return this.items;
    };
    CarrinhoService.prototype.addItem = function (item) {
        var foundItem = this.items.find(function (mItem) { return mItem.menuItem.id === item.id; });
        if (foundItem) {
            this.increaseQty(foundItem);
        }
        else {
            this.items.push(new carrinho_item_model_1.CarrinhoItem(item));
        }
        this.notificationService.notify(item.nome + " adicionado ao carrinho!");
    };
    CarrinhoService.prototype.removeItem = function (item) {
        this.items.splice(this.items.indexOf(item), 1);
        this.notificationService.notify(item.menuItem.nome + " exclu\u00EDdo do carrinho!");
    };
    CarrinhoService.prototype.subtrairItem = function (item) {
        var foundItem = this.items.find(function (mItem) { return mItem.menuItem.id === item.id; });
        if (foundItem) {
            this.decreaseQty(foundItem);
        }
    };
    CarrinhoService.prototype.getQuantidadeAtual = function (item) {
        var foundItem = this.items.find(function (mItem) { return mItem.menuItem.id === item.id; });
        if (foundItem) {
            return foundItem.quantity;
        }
        return 0;
    };
    CarrinhoService.prototype.total = function () {
        return this.items.map(function (item) { return item.value(); }).reduce(function (prev, value) { return prev + value; }, 0);
    };
    CarrinhoService.prototype.increaseQty = function (item) {
        item.quantity = item.quantity + 1;
        this.notificationService.notify(item.menuItem.nome + " adicionado ao carrinho!");
    };
    CarrinhoService.prototype.decreaseQty = function (item) {
        item.quantity = item.quantity - 1;
        if (item.quantity === 0) {
            this.removeItem(item);
        }
    };
    CarrinhoService = __decorate([
        core_1.Injectable()
    ], CarrinhoService);
    return CarrinhoService;
}());
exports.CarrinhoService = CarrinhoService;
