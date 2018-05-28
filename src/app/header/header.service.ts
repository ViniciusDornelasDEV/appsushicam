import {Injectable} from '@angular/core';

@Injectable() export class HeaderService{
  carrinho: boolean = false;
  constructor(){}

  exibirCarrinho(): boolean{
    return this.carrinho;
  }

  setCarrinho(status: boolean){
    this.carrinho = status;
  }
}
