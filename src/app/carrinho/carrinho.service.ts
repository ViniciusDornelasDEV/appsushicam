import {CarrinhoItem} from './carrinho-item.model';
import {Produto} from '../produtos/produto/produto.model';

export class CarrinhoService {
  items: CarrinhoItem[] = [];

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
  }

  removeItem(item: CarrinhoItem){
    //console.log(item);
    this.items.splice(this.items.indexOf(item), 1);
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
  }

  decreaseQty(item: CarrinhoItem){
    item.quantity = item.quantity-1;

    if(item.quantity === 0){
      this.removeItem(item);
    }
  }


}
