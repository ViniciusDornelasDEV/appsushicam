export interface Produto{
  id: number;
  id_ficticio: string;
  categoria: string;
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
}

export interface Categoria{
  id: number;
  nome: string;
  ordem: string;
  ativo: string;
}

export interface Funcionamento{
  id: number;
  dia_semana: number;
  abertura_pedidos: string;
  fechamento_pedidos: string;
  abertura_pedidos_int: number;
  fechamento_pedidos_int: number;
  hora_atual: number;
  loja_abre: string;
}