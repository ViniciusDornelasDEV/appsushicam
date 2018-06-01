import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Bairro} from './endereco.model';

import {MEAT_API} from '../app.api';
@Injectable() export class EnderecoService{

  constructor(private http: HttpClient){}

  novoEndereco(dados: any): Observable<string> {
    return this.http.post<any>(`${MEAT_API}/app/endereco/novo`, dados);
  }

  alterarEndereco(dados: any){

  }

  getBairros(){
  	return this.http.get<Bairro[]>(`${MEAT_API}/app/bairros`);
  }
}
