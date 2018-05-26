import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Produto, Categoria, Funcionamento} from './produto/produto.model';
import {MEAT_API} from '../app.api';
import {ErrorHandler} from '../app.error-handler';
import {MenuItem} from '../restaurant-detail/menu-item/menu-item.model';

@Injectable() export class ProdutosService{
  mensagemFuncionamento: string;
  exibirMensagem: boolean = false;

  constructor(private http: HttpClient){

  }

  produtos(categoria: number): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${MEAT_API}/app/produtos/${categoria}`);
  }

  categorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${MEAT_API}/app/categorias`);
  }

  horarioFuncionamento(): Observable<Funcionamento> {
    return this.http.get<Funcionamento>(`${MEAT_API}/app/horario/funcionamento`);
  }

  lojaAbre(funcionamento: Funcionamento){
    if(funcionamento.loja_abre == 'N'){
      this.mensagemFuncionamento = 'Desculpe, a loja não irá abrir hoje!';
      this.exibirMensagem = true;
    }else{
      if(funcionamento.abertura_pedidos_int > funcionamento.hora_atual 
        || funcionamento.fechamento_pedidos_int < funcionamento.hora_atual){
        this.mensagemFuncionamento = `Ainda não estamos abertos, você pode agendar seu pedido para qualquer 
            horário entre ${funcionamento.abertura_pedidos} e ${funcionamento.fechamento_pedidos}`;
        this.exibirMensagem = true;
      }
    }
  }
  
}
