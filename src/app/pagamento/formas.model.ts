export interface Endereco{
	id: number;
	bairro: number;
	nome_cidade: string;
	nome_bairro: string;
	rua: string;
	numero: string;
	complemento: string;
	ponto_referencia: string;
	apartamento: string;
	taxa_entrega: number;
}

export interface FormaPagamento{
  id: number;
  nome: string;
  imagem: string;
}

export interface PontosGanhos{
  valor: number;
  pontos: number;
}