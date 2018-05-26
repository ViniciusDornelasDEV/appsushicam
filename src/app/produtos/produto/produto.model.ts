export interface Produto{
  id: string;
  id_ficticio: string;
  categoria: number;
  nome: string;
  descricao: string;
  valor_venda: number;
  imagem: string;
  wasabi_gengibre: string;
  cozinha_sushibar: string;
  molho_adicional: string;
  hashi_adicional: string;
  aparecer_em: string;
  ativo: string;
  nome_categoria: string;
  quantidade_itens: number;
}

export interface Categoria{
  id: string;
  nome: string;
  ordem: string;
  ativo: string;
}

export interface Funcionamento{
  id: string;
  dia_semana: string;
  abertura_pedidos: string;
  fechamento_pedidos: string;
  loja_abre: string;
  abertura_pedidos_int: number;
  fechamento_pedidos_int: number;
  hora_atual: number;
}