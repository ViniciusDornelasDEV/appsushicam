import { Component, OnInit } from '@angular/core';
import {PontosGanhos} from '../pagamento/formas.model';
import {PagamentoService} from '../pagamento/pagamento.service';
import {ProdutosService} from '../produtos/produtos.service';
import {MEAT_API} from '../app.api';
import {LoginService} from '../security/login/login.service';
import $ from "jquery";
//import facebookConnectPlugin from "cordova-plugin-facebook4/android";
declare var facebookConnectPlugin;
@Component({
  selector: 'mt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	pontos: PontosGanhos;
	banners: any[];
	baseUrl: string = MEAT_API;

	constructor(
		private pagamentoService: PagamentoService, 
		private produtosService: ProdutosService,
		private loginService: LoginService) { 
		
	}

	ngOnInit() {
		this.pagamentoService.creditoPontos().subscribe(pontos => this.pontos = pontos);
		this.produtosService.banners().subscribe(banners => this.banners = banners);
  	}

  	teste(dados){
  		alert('teste');
  		alert(dados);
  	}

  	isLoggedIn(): boolean {
    	return this.loginService.isLoggedIn();
  	}

  	logout(){
  		document.addEventListener("deviceready", function() { 
	      facebookConnectPlugin.logout(function(success){
	      //calling api after login success
	       alert(success);
	      },function(error){
	        //authenication error callback
	        alert(error);
	       });
	   
	     }, false);
  	}

}
