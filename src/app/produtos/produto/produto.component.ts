import { Component, OnInit, Input } from '@angular/core';
import {Produto} from './produto.model';
import {MEAT_API} from '../../app.api';
import {CarrinhoService} from '../../carrinho/carrinho.service';

@Component({
  selector: 'mt-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  
  @Input() produto: Produto;
  quantidade: number = 0;
  baseUrl: string = MEAT_API;

  constructor(private carrinhoService: CarrinhoService) { }

  ngOnInit() {
  	this.quantidade = this.carrinhoService.getQuantidadeAtual(this.produto);
  }

  adicionar(){
    this.carrinhoService.addItem(this.produto);
    this.quantidade = this.carrinhoService.getQuantidadeAtual(this.produto);
  }

  subtrair(){
    this.carrinhoService.subtrairItem(this.produto);
    this.quantidade = this.carrinhoService.getQuantidadeAtual(this.produto);
  }

  toHTML(input) : any {
    return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
  }
}
