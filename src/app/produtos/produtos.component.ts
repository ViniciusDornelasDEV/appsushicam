import { Component, OnInit } from '@angular/core';
import {ProdutosService} from './produtos.service';
import {Produto, Categoria, Funcionamento} from './produto/produto.model';
import {HeaderService} from '../header/header.service';

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
  nomeCategoriaAtual: string = 'Entrada';
  mensagemFuncionamento: string;
  exibirMensagem: boolean = false;

  constructor(private produtosService: ProdutosService, private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.setCarrinho(true);
    this.produtosService.categorias().subscribe(categorias => this.categorias = categorias);
    this.produtosService.produtos(this.categoriaAtual).subscribe(produtos => this.produtos = produtos);
    this.produtosService.horarioFuncionamento().subscribe(funcionamento => this.horarioFuncionamento(funcionamento));
  }

  filtrarCategoria(categoria: number){
    console.log(this.produtos);
    this.categoriaAtual = categoria;
    let objCategoria = this.categorias.find(x => x.id == this.categoriaAtual);
    this.nomeCategoriaAtual = objCategoria.nome;
    this.produtosService.produtos(this.categoriaAtual).subscribe(produtos => this.produtos = produtos);
  }

  horarioFuncionamento(funcionamento: Funcionamento){
    this.produtosService.lojaAbre(funcionamento);
    this.mensagemFuncionamento = this.produtosService.mensagemFuncionamento;
    this.exibirMensagem = this.produtosService.exibirMensagem;
  }

  ngOnDestroy(){
    this.headerService.setCarrinho(false);
  }

}
