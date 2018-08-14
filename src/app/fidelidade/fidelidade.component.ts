import { Component, OnInit } from '@angular/core';
import {PagamentoService} from '../pagamento/pagamento.service';
import {PontosGanhos} from '../pagamento/formas.model';
import {LoginService} from '../security/login/login.service';

@Component({
  selector: 'mt-fidelidade',
  templateUrl: './fidelidade.component.html',
  styleUrls: ['./fidelidade.component.css']
})
export class FidelidadeComponent implements OnInit {
  pontos: PontosGanhos;
  
  constructor(private pagamentoService: PagamentoService, private loginService: LoginService) { }

	ngOnInit() {
		this.pagamentoService.creditoPontos().subscribe(pontos => this.pontos = pontos);
	}

	isLoggedIn(): boolean {
		return this.loginService.isLoggedIn();
	}

}
