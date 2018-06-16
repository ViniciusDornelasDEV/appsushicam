import { Component, OnInit } from '@angular/core';
import $ from "jquery";

import {ProdutosService} from '../produtos/produtos.service';
import {MEAT_API} from '../app.api';
import {LoginService} from '../security/login/login.service';
import {Produto} from '../produtos/produto/produto.model';
import {CarrinhoService} from '../carrinho/carrinho.service';
import {CarrinhoItem} from '../carrinho/carrinho-item.model';
import {NotificationService} from '../shared/messages/notification.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'mt-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {
  pedidos: any[];
  baseUrl: string = MEAT_API;

  constructor(
      private produtosService: ProdutosService, 
      private loginService: LoginService,
      private carrinhoService: CarrinhoService,
      private notificationService: NotificationService,
      private router: Router
    ) { }

  ngOnInit() {
     this.produtosService.historicoPedidos().subscribe(pedidos => this.objToArray(pedidos));
  }

  exibirEsconder(div: string){
  	if($(div).is(":visible")){
        $(div).hide();
    }else{
        $(div).show();
    }
  }

  objToArray(pedidos){
    this.pedidos = Object.keys(pedidos).map(key => ({type: key, value: pedidos[key]}));
  }

  logout(){
    this.loginService.logout();
  }

  repetirPedido(pedido: any){
    //pesquisar novo pedido e adicionar itens ao carrinho
    this.produtosService.repetirPedido(pedido.value.id_pedido).subscribe(itens => this.replicarPedido(itens));
  }

  replicarPedido(itens: Produto[]){
    itens.forEach(item => {
      this.carrinhoService.items.push(new CarrinhoItem(item, item.quantidade_pedido));
    });

    //mensagem e redir para o carrinho
    this.notificationService.notify(`Pedido repetido com sucesso!`);
    this.router.navigate(['/carrinho']);
  }


}
