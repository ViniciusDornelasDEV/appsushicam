import { Component, OnInit } from '@angular/core';
import {Produto, Categoria, Funcionamento} from './produto/produto.model';
import {ProdutosService} from './produtos.service';

@Component({
  selector: 'mt-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  horarioFuncionamento: Funcionamento[];
  produtos: Produto[];
  categorias: Categoria[];
  categoriaAtual: number = 2;
  aberto: string;

  constructor(private produtosService: ProdutosService) {

  }

  ngOnInit() {
    this.produtosService.produtos(this.categoriaAtual).subscribe(produtos => this.produtos = produtos);
    this.produtosService.categorias().subscribe(categorias => this.categorias = categorias);
    this.produtosService.horarioFuncionamento().subscribe(horarioFuncionamento => this.horarioFuncionamento = horarioFuncionamento);
    //this.aberto = this.lojaAberta();
    console.log(this.horarioFuncionamento[0]);
  }

  filtrarCategoria(categoria: number){
    this.categoriaAtual = categoria;
    this.produtosService.produtos(this.categoriaAtual).subscribe(produtos => this.produtos = produtos);
  }

  lojaAberta(){
    console.log(this.horarioFuncionamento);
    return 'S';
    /*if(this.horarioFuncionamento === undefined){
      return 'N';
    }
    
    if(this.horarioFuncionamento[0].abertura_pedidos_int <= this.horarioFuncionamento[0].hora_atual 
        && this.horarioFuncionamento[0].fechamento_pedidos_int >= this.horarioFuncionamento[0].hora_atual){
      return 'A';
    }

    return 'F';*/    

  }

}
