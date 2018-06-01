import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {MEAT_API} from '../app.api';
import {MenuItem} from '../restaurant-detail/menu-item/menu-item.model';
import {FormaPagamento, Endereco} from './formas.model';

@Injectable() export class PagamentoService{
  mensagemFuncionamento: string;
  exibirMensagem: boolean = false;

  constructor(private http: HttpClient){

  }

  pagamentos(formaPagamento: string): Observable<FormaPagamento[]> {
    return this.http.get<FormaPagamento[]>(`${MEAT_API}/app/formapagamento/${formaPagamento}`);
  }

  enderecos(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(`${MEAT_API}/app/enderecos`);
  }

  salvar(dados): Observable<string>{
    return this.http.post<any>(`${MEAT_API}/app/pedido/salvar`, dados);
  }


  
}
