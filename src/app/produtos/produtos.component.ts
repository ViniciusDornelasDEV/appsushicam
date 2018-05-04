import { Component, OnInit } from '@angular/core';
import {Produto, Categoria} from './produto/produto.model';
import {ProdutosService} from './produtos.service';

@Component({
  selector: 'mt-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos: Produto[];
  categorias: Categoria[];
  categoriaAtual: number = 2;

  constructor(private produtosService: ProdutosService) {

  }

  ngOnInit() {
    this.produtosService.produtos(this.categoriaAtual).subscribe(produtos => this.produtos = produtos);

    this.produtosService.categorias().subscribe(categorias => this.categorias = categorias);
  }

  filtrarCategoria(categoria: number){
    console.log(this.produtos);
    console.log(categoria);
    this.categoriaAtual = categoria;
    this.produtosService.produtos(this.categoriaAtual).subscribe(produtos => this.produtos = produtos);
  }

}
