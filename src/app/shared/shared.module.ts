import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {InputComponent} from './input/input.component';
import {RadioComponent} from './radio/radio.component';
import {RatingComponent} from './rating/rating.component';

import { SnackbarComponent } from './messages/snackbar/snackbar.component';

import {NotificationService} from './messages/notification.service';
import {LoginService} from '../security/login/login.service';
import {LoggedInGuard} from '../security/loggedin.guard';

import {AuthInterceptor} from '../security/auth.interceptor';


import { ProdutosService } from '../produtos/produtos.service';
import { CarrinhoService } from '../carrinho/carrinho.service';
import { AdicionaisService } from '../adicionais/adicionais.service';
import { RegistroService } from '../registro/registro.service';
import {HeaderService} from '../header/header.service';
import {PagamentoService} from '../pagamento/pagamento.service';
import {EnderecoService} from '../endereco/endereco.service';
import { SelectComponent } from './select/select.component';

@NgModule({
	declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent, SelectComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	exports: [InputComponent, RadioComponent, RatingComponent, 
			CommonModule, FormsModule, ReactiveFormsModule, SnackbarComponent, SelectComponent]
})

export class SharedModule{
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: [
						LoginService, NotificationService, LoggedInGuard, 
						ProdutosService, CarrinhoService, AdicionaisService, 
						RegistroService, HeaderService, PagamentoService, EnderecoService,
						{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
				]
		}
	}
}