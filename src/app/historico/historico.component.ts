import { Component, OnInit } from '@angular/core';
import $ from "jquery";

import {ProdutosService} from '../produtos/produtos.service';
import {MEAT_API} from '../app.api';

@Component({
  selector: 'mt-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {
  pedidos: any[];
  baseUrl: string = MEAT_API;

  constructor(private produtosService: ProdutosService) { }

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


}
