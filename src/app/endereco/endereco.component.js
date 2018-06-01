"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EnderecoComponent = /** @class */ (function () {
    function EnderecoComponent(formBuilder, notificationService, router) {
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.router = router;
    }
    EnderecoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.produtosService.produtos(this.categoriaAtual).subscribe(function (produtos) { return _this.produtos = produtos; });
        this.enderecoForm = this.formBuilder.group({
            bairro: this.formBuilder.control('', [forms_1.Validators.required, forms_1.Validators.minLength(5)]),
            rua: this.formBuilder.control('', [forms_1.Validators.required, forms_1.Validators.minLength(5)]),
            numero: this.formBuilder.control('', [forms_1.Validators.required]),
            apartamento: this.formBuilder.control('', [forms_1.Validators.required]),
            complemento: this.formBuilder.control(''),
            pontoReferencia: this.formBuilder.control('')
        });
    };
    EnderecoComponent = __decorate([
        core_1.Component({
            selector: 'mt-endereco',
            templateUrl: './endereco.component.html',
            styleUrls: ['./endereco.component.css']
        })
    ], EnderecoComponent);
    return EnderecoComponent;
}());
exports.EnderecoComponent = EnderecoComponent;
