import { Component, OnInit } from '@angular/core';
import {CarrinhoService} from './carrinho.service';
import {HeaderService} from '../header/header.service';
//import { AuthService } from "angular4-social-login";
import {LoginService} from '../security/login/login.service';
declare var facebookConnectPlugin;

@Component({
  selector: 'mt-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  redir: string = '/login';
  constructor(private carrinhoService: CarrinhoService, 
              private headerService: HeaderService, 
              //private authService: AuthService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.headerService.setCarrinho(true);

    //caso logou com rede social
    /*this.authService.authState.subscribe((user) => {
      if(user){
        this.loginService.setSocialUser(user);
        this.redir = '/adicionais';
      }
    });*/



  }

   items(): any[]{
    return this.carrinhoService.items;
  }

  clear(){
    this.carrinhoService.clear();
  }

  removeItem(item: any){
    this.carrinhoService.removeItem(item);
  }

  addItem(item: any){
    this.carrinhoService.addItem(item);
  }

  total(): number{
    return this.carrinhoService.total();
  }

  ngOnDestroy(){
    this.headerService.setCarrinho(false);
  }
}
