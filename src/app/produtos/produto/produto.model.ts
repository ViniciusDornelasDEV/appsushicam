export interface Produto{
  id: string;
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
  id: string;
  nome: string;
  ordem: string;
  ativo: string;
}
