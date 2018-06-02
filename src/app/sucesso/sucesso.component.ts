import { Component, OnInit } from '@angular/core';
import {PagamentoService} from '../pagamento/pagamento.service';

@Component({
  selector: 'mt-sucesso',
  templateUrl: './sucesso.component.html',
  styleUrls: ['./sucesso.component.css']
})
export class SucessoComponent implements OnInit {
  dadosPedido: any;

  constructor(private pagamentoService: PagamentoService) { }

  ngOnInit() {
  	this.dadosPedido = this.pagamentoService.getDadosPedido();
  }

}
