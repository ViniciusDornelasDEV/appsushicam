import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CarrinhoService} from '../carrinho/carrinho.service';
import {HeaderService} from './header.service';
import {LoginService} from '../security/login/login.service';
import {User} from '../security/login/user.model';

import {Categoria} from '../produtos/produto/produto.model';
import {ProdutosService} from '../produtos/produtos.service';
declare var device;

@Component({
  selector: 'mt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  carrinho: boolean = false;
  categorias: Categoria[];
  
  constructor(private carrinhoService: CarrinhoService, 
              private headerService: HeaderService, 
              private loginService: LoginService,
              private produtosService: ProdutosService
             ) { }

  ngOnInit() {
    this.produtosService.categorias().subscribe(categorias => this.categorias = categorias);

    var element = document.getElementById("cardapio");
    element.classList.add("open");
  }

  exibirCarrinho(){
  	return this.headerService.exibirCarrinho();
  }

   user(): User{
    return this.loginService.user;
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  login(){
    this.loginService.handleLogin();
  }

  logout(){
    this.loginService.logout();
  }

  fecharMenu(){
    let element: HTMLElement = document.getElementsByClassName('navbar-collapse in')[0] as HTMLElement;

    if(element){
      document.getElementById('collapse').click();
    }
  }

  
}
