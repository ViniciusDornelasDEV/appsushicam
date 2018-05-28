import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {MEAT_API} from '../app.api';
@Injectable() export class RegistroService{

  constructor(private http: HttpClient){}

  registrar(dados: any): Observable<string> {
    return this.http.post<any>(`${MEAT_API}/app/registro`, dados);
  }
}
