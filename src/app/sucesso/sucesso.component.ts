import { Component, OnInit } from '@angular/core';
import {PagamentoService} from '../pagamento/pagamento.service';
import {CarrinhoService} from '../carrinho/carrinho.service';

@Component({
  selector: 'mt-sucesso',
  templateUrl: './sucesso.component.html',
  styleUrls: ['./sucesso.component.css']
})
export class SucessoComponent implements OnInit {
  dadosPedido: any;

  constructor(private pagamentoService: PagamentoService, private carrinhoService: CarrinhoService) { }

  ngOnInit() {
  	this.dadosPedido = this.pagamentoService.getDadosPedido();
  	console.log(this.dadosPedido);
  	this.carrinhoService.clear();
  }

}
