import {Injectable} from '@angular/core';
import {CarrinhoItem} from './carrinho-item.model';
import {Produto} from '../produtos/produto/produto.model';

import {NotificationService} from '../shared/messages/notification.service';

@Injectable()
export class CarrinhoService {
  items: CarrinhoItem[] = [];

  constructor(private notificationService: NotificationService){}

  clear(){
    this.items = [];
  }

  getItems(): CarrinhoItem[]{
    return this.items;
  }

  addItem(item: Produto){
    let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id);
    if(foundItem){
      this.increaseQty(foundItem);
    }else{
      this.items.push(new CarrinhoItem(item));
    }
    this.notificationService.notify(`${item.nome} adicionado ao carrinho!`);
  }

  removeItem(item: CarrinhoItem){
    this.items.splice(this.items.indexOf(item), 1);
    this.notificationService.notify(`${item.menuItem.nome} excluído do carrinho!`);
  }

  subtrairItem(item: Produto){
    let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id);

    if(foundItem){
      this.decreaseQty(foundItem);
    }
  }

  getQuantidadeAtual(item: Produto){
    let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id);
    if(foundItem){
      return foundItem.quantity;
    }
    return 0;
  }

  total(): number{
    return this.items.map(item => item.value()).reduce((prev, value) => prev+value, 0);
  }

  increaseQty(item: CarrinhoItem){
    item.quantity = item.quantity+1;
    this.notificationService.notify(`${item.menuItem.nome} adicionado ao carrinho!`);
  }

  decreaseQty(item: CarrinhoItem){
    item.quantity = item.quantity-1;

    if(item.quantity === 0){
      this.removeItem(item);
    }
  }


}
