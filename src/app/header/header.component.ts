import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CarrinhoService} from '../carrinho/carrinho.service';
import {HeaderService} from './header.service';
import {LoginService} from '../security/login/login.service';
import {User} from '../security/login/user.model';

@Component({
  selector: 'mt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  carrinho: boolean = false;

  constructor(private carrinhoService: CarrinhoService, private headerService: HeaderService, private loginService: LoginService) { }

  ngOnInit() {
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

}
