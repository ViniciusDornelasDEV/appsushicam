import { Component, OnInit } from '@angular/core';
import {ProdutosService} from './produtos.service';
import {Produto, Categoria, Funcionamento} from './produto/produto.model';

@Component({
  selector: 'mt-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  funcionamento: Funcionamento;
  produtos: Produto[];
  categorias: Categoria[];
  categoriaAtual: number = 2;
  mensagemFuncionamento: string;
  exibirMensagem: boolean = false;

  constructor(private produtosService: ProdutosService) { }

  ngOnInit() {
    this.produtosService.produtos(this.categoriaAtual).subscribe(produtos => this.produtos = produtos);
    this.produtosService.categorias().subscribe(categorias => this.categorias = categorias);
    this.produtosService.horarioFuncionamento().subscribe(funcionamento => this.horarioFuncionamento(funcionamento));
  }

  filtrarCategoria(categoria: number){
    this.categoriaAtual = categoria;
    this.produtosService.produtos(this.categoriaAtual).subscribe(produtos => this.produtos = produtos);
  }

  horarioFuncionamento(funcionamento: Funcionamento){
    this.produtosService.lojaAbre(funcionamento);
    this.mensagemFuncionamento = this.produtosService.mensagemFuncionamento;
    this.exibirMensagem = this.produtosService.exibirMensagem;
  }

}
