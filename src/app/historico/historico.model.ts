export interface Pedido{
  id_pedido: number;
  desconto: string;
  taxa_entrega: string;
  nome_cliente: string;
  data_abertura: string;
  nome_status: string;
  imagem_status: string;
  total_itens: string;
  valor_total: string;
  itens: Item[]
}

export interface Item{
  nome_produto: string;
  quantidade: string;
  valor_unitario: string;
  sub_total: string;
}
