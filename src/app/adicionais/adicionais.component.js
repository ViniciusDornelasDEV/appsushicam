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
var AdicionaisComponent = /** @class */ (function () {
    function AdicionaisComponent(adicionaisService, formBuilder, produtosService, router, notificationService, carrinhoService, headerService, loginService) {
        this.adicionaisService = adicionaisService;
        this.formBuilder = formBuilder;
        this.produtosService = produtosService;
        this.router = router;
        this.notificationService = notificationService;
        this.carrinhoService = carrinhoService;
        this.headerService = headerService;
        this.loginService = loginService;
        this.loginSocial = false;
        this.mascara = [/[1-9]/, /\d/, ':', /\d/, /\d/];
        this.mascaraTelefone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    }
    AdicionaisComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adicionaisService.clear();
        //se não tiver itens no cvarrinho, retorna para produtos
        if (this.carrinhoService.items.length === 0) {
            this.notificationService.notify("Nenhum item no carrinho!");
            this.router.navigate(['/']);
        }
        this.adicionaisService.totalPecas();
        this.headerService.setCarrinho(true);
        this.adicionaisService.molho().subscribe(function (molho) { return _this.molho = molho; });
        this.adicionaisService.hashi().subscribe(function (hashi) { return _this.hashi = hashi; });
        var validator;
        if (this.produtosService.exibirMensagem) {
            validator = forms_1.Validators.required;
        }
        //se não estiver logado...
        if (this.loginService.user == undefined) {
            //verificar se está logado com rede social
            if (this.loginService.socialUser == undefined) {
                this.router.navigate(['/login']);
            }
            else {
                this.loginService.pesquisarSocial().subscribe(function (user) { return _this.telefoneObrigatorio(user); });
                this.loginSocial = true;
            }
        }
        var validatorTelefone;
        if (this.pedirTelefone()) {
            validatorTelefone = forms_1.Validators.required;
        }
        this.adicionaisForm = this.formBuilder.group({
            wasabi: this.formBuilder.control(''),
            gengibre: this.formBuilder.control(''),
            shoyu: this.formBuilder.control(''),
            teriyaki: this.formBuilder.control(''),
            hashi: this.formBuilder.control(''),
            agendar: this.formBuilder.control('', validator),
            observacoes: this.formBuilder.control(''),
            telefone: this.formBuilder.control('', validatorTelefone)
        });
    };
    AdicionaisComponent.prototype.temOpcionais = function () {
        return this.adicionaisService.temOpcionais();
    };
    AdicionaisComponent.prototype.temBebidas = function () {
        return this.adicionaisService.temBebidas();
    };
    AdicionaisComponent.prototype.telefoneObrigatorio = function (user) {
        this.user = user;
        if ((this.user == undefined || this.user.telefone == undefined) && this.loginSocial) {
            this.validatorTelefone = forms_1.Validators.required;
            return true;
        }
        return false;
    };
    AdicionaisComponent.prototype.pedirTelefone = function () {
        if ((this.user == undefined || this.user.telefone == undefined) && this.loginSocial) {
            return true;
        }
        return false;
    };
    AdicionaisComponent.prototype.salvar = function (dados) {
        var _this = this;
        this.adicionaisService.salvar(dados, this.molho, this.hashi);
        //se tiver telefone chamar cadastro...
        if (this.pedirTelefone()) {
            this.loginService.loginSocial(this.user, dados.telefone)
                .subscribe(function (user) { return _this.notificationService.notify("Adicionais selecionados com sucesso!"); }, function (response) { return _this.notificationService.notify(response.error.message); }, function () { return _this.redirPagamento(); });
        }
        else {
            this.notificationService.notify("Adicionais selecionados com sucesso!");
            this.router.navigate(['/pagamento']);
        }
    };
    AdicionaisComponent.prototype.redirPagamento = function () {
        this.loginSocial = false;
        this.user = this.loginService.user;
        this.router.navigate(['/pagamento']);
    };
    AdicionaisComponent.prototype.ngOnDestroy = function () {
        this.headerService.setCarrinho(false);
    };
    AdicionaisComponent = __decorate([
        core_1.Component({
            selector: 'mt-adicionais',
            templateUrl: './adicionais.component.html',
            styleUrls: ['./adicionais.component.css']
        })
    ], AdicionaisComponent);
    return AdicionaisComponent;
}());
exports.AdicionaisComponent = AdicionaisComponent;
