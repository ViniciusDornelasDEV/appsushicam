import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {MEAT_API} from '../app.api';
import {ErrorHandler} from '../app.error-handler';


import {CarrinhoService} from '../carrinho/carrinho.service';
import {CarrinhoItem} from '../carrinho/carrinho-item.model';
import {Molho, Hashi} from './adicionais.model';

@Injectable() export class AdicionaisService{
  opcionais: boolean = false;
  bebidas: boolean = false;
  itens: CarrinhoItem[];
  totalMolho: number = 0;
  totalHashi: number = 0;
  adicionais: any;
  valorAdicionais: number = 0;

  constructor(private http: HttpClient, private carrinhoService: CarrinhoService){
    this.itens = this.carrinhoService.getItems();
    this.totalMolho = 0;
    this.totalHashi = 0;
    this.itens.forEach(item => {
        if(item.menuItem.molho_adicional == 'S'){
          this.totalMolho = this.totalMolho + item.menuItem.quantidade_itens * item.quantity;
        }

        if(item.menuItem.hashi_adicional == 'S'){
          this.totalHashi = this.totalHashi + item.menuItem.quantidade_itens * item.quantity;
        }
      });
  }

  temOpcionais(): boolean{
    this.itens.forEach(item => {
        if(item.menuItem.wasabi_gengibre == 'S'){
          this.opcionais = true;
        }
      });
     return this.opcionais;
  }

  temBebidas(): boolean{
    this.itens.forEach(item => {
        if(item.menuItem.categoria == 10){
          this.bebidas = true;
        }
    });

    return this.bebidas;
  }

  molho(): Observable<Molho>{
    return this.http.get<Molho>(`${MEAT_API}/app/molhos/${this.totalMolho}`);
  }

  hashi(): Observable<Hashi>{
    return this.http.get<Molho>(`${MEAT_API}/app/hashi/${this.totalHashi}`);
  }

  salvar(dados: any, molho: Molho, hashi: Hashi){
    this.adicionais = dados;
    let totalMolho = dados.shoyu + dados.teriyaki;
    if(totalMolho - molho.quantidade > 0){
      this.valorAdicionais = (totalMolho - molho.quantidade) * molho.valor;
    }

    let totalHashi = dados.hashi;
    if(totalHashi - hashi.quantidade > 0){
      this.valorAdicionais = this.valorAdicionais + ((totalHashi - hashi.quantidade) * hashi.valor);
    }

  }

  getDados(){
    return this.adicionais;
  }

  totalAdicionais(){
    return this.valorAdicionais;
  }
}
