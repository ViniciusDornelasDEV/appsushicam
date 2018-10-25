"use strict";
exports.__esModule = true;
var CarrinhoItem = /** @class */ (function () {
    function CarrinhoItem(menuItem, quantity) {
        if (quantity === void 0) { quantity = 1; }
        this.menuItem = menuItem;
        this.quantity = quantity;
    }
    CarrinhoItem.prototype.value = function () {
        return this.menuItem.valor_venda * this.quantity;
    };
    return CarrinhoItem;
}());
exports.CarrinhoItem = CarrinhoItem;
