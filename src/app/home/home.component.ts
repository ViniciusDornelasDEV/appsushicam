import { Component, OnInit } from '@angular/core';
import {PontosGanhos} from '../pagamento/formas.model';
import {PagamentoService} from '../pagamento/pagamento.service';
import {ProdutosService} from '../produtos/produtos.service';
import {MEAT_API} from '../app.api';

@Component({
  selector: 'mt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	pontos: PontosGanhos;
	banners: any[];
	baseUrl: string = MEAT_API;

	constructor(private pagamentoService: PagamentoService, private produtosService: ProdutosService) { 
		this.pontos.pontos = 0;
	}

	ngOnInit() {
		this.pagamentoService.creditoPontos().subscribe(pontos => this.pontos = pontos);
		this.produtosService.banners().subscribe(banners => this.banners = banners);
  	}

  	test(banners){
  		console.log(banners);
  	}

}
