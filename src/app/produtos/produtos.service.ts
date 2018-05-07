import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Produto, Categoria, Funcionamento} from './produto/produto.model';
import {MEAT_API} from '../app.api';
import {ErrorHandler} from '../app.error-handler';

@Injectable() export class ProdutosService{
  constructor(private http: Http){

  }

  produtos(categoria: number): Observable<Produto[]> {

    return this.http.get(`${MEAT_API}/app/produtos/dbIpatinga/${categoria}`)
      .map(response => response.json())
      .catch(ErrorHandler.handleError);
  }

  categorias(): Observable<Categoria[]> {

    return this.http.get(`${MEAT_API}/app/categorias/dbIpatinga`)
      .map(response => response.json())
      .catch(ErrorHandler.handleError);
  }

  horarioFuncionamento(): Observable<Funcionamento[]> {
    return this.http.get(`${MEAT_API}/app/horario/funcionamento/dbIpatinga`)
      .map(response => response.json())
      .catch(ErrorHandler.handleError);
  }



}
