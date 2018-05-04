import { Component, OnInit } from '@angular/core';
import {CarrinhoService} from './carrinho.service';

@Component({
  selector: 'mt-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  constructor(private carrinhoService: CarrinhoService) { }

  ngOnInit() {

  }

  items(): any[]{
    return this.carrinhoService.items;
  }

  clear(){
    this.carrinhoService.clear();
  }

  removeItem(item: any){
    this.carrinhoService.removeItem(item);
  }

  addItem(item: any){
    this.carrinhoService.addItem(item);
  }

  total(): number{
    return this.carrinhoService.total();
  }

}
