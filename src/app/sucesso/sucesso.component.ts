import { Component, OnInit } from '@angular/core';
import {PagamentoService} from '../pagamento/pagamento.service';
import {CarrinhoService} from '../carrinho/carrinho.service';
import {AdicionaisService} from '../adicionais/adicionais.service';

@Component({
  selector: 'mt-sucesso',
  templateUrl: './sucesso.component.html',
  styleUrls: ['./sucesso.component.css']
})
export class SucessoComponent implements OnInit {
  dadosPedido: any;

  constructor(
  	private pagamentoService: PagamentoService, 
  	private carrinhoService: CarrinhoService,
  	private adicionaisService: AdicionaisService
  	) { }

  ngOnInit() {
  	this.dadosPedido = this.pagamentoService.getDadosPedido();
  	this.carrinhoService.clear();

  	//limpar adicionais
  	this.adicionaisService.clear();
  	
  }

}
