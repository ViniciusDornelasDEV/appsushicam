import {Produto} from '../produtos/produto/produto.model';

export class CarrinhoItem {
  constructor(public menuItem: Produto, public quantity: number = 1){

  }

  value(): number {
    return this.menuItem.valor_venda * this.quantity;
  }
}
