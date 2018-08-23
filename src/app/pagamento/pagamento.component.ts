import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../shared/messages/notification.service';

import {CarrinhoService} from '../carrinho/carrinho.service';
import {AdicionaisService} from '../adicionais/adicionais.service';
import {MEAT_API} from '../app.api';
import {FormaPagamento, Endereco, PontosGanhos} from './formas.model';
import {PagamentoService} from './pagamento.service';
import {RadioOption} from '../shared/radio/radio-option.model';

@Component({
  selector: 'mt-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {
  baseUrl: string = MEAT_API;
  totalLiquido: number;
  totalBruto: number;
  taxaEntrega: number = 0;
  totalItens: number = 0;
  debitos: FormaPagamento[];
  creditos: FormaPagamento[];
  enderecos: Endereco[];
  pagamentoForm: FormGroup;
  pagamentosSelecionados: any[] = [];
  pontos: PontosGanhos;
  pagarComPontos: boolean = false;
  disableSubmit: boolean = false;

  constructor(
      private carrinhoService: CarrinhoService, 
      private adicionaisService: AdicionaisService,
      private pagamentoService: PagamentoService,
      private formBuilder: FormBuilder,
      private notificationService: NotificationService,
      private router: Router
      ) { }

  ngOnInit() {
    this.totalBruto = this.carrinhoService.total() + this.adicionaisService.totalAdicionais();
    this.totalItens = this.carrinhoService.items.length;

    //pesquisar enderecos
    this.pagamentoService.enderecos().subscribe(enderecos => this.enderecos = enderecos);

    //pesquisar formas de pagamento
    this.pagamentoService.pagamentos('D').subscribe(pagamentos => this.debitos = pagamentos);
    this.pagamentoService.pagamentos('C').subscribe(pagamentos => this.creditos = pagamentos);

    //pesquisar valor em pontuação do cliente
    this.pagamentoService.creditoPontos().subscribe(pontos => this.pontos = pontos);

    this.pagamentoForm = this.formBuilder.group({
      endereco: this.formBuilder.control('', [Validators.required]),
      forma_pagamento: this.formBuilder.control('', [Validators.required]),
      valorPagar: this.formBuilder.control(''),
      troco: this.formBuilder.control(''),
      fidelidade: this.formBuilder.control(''),
    });
  }

  isOrderCompleted(): boolean{
     return true;
   }

   alterarTaxa(taxaEntrega: string){
     this.taxaEntrega = parseInt(taxaEntrega);
     this.totalLiquido = this.totalBruto+parseInt(taxaEntrega);
   }

   selecionaPagamento(event, valor){
      if(event.target.checked) {
        this.pagamentosSelecionados[valor] = true;
      }else{
        delete this.pagamentosSelecionados[valor];
      }
   }

   pagarPontos(){
     //
     if(this.pagarComPontos == true){
       this.pagarComPontos = false;
     }else{
       this.pagarComPontos = true;
       this.notificationService.notify(`Atenção: A taxa de entrega continua sendo cobrada. Selecione a forma de pagamento da taxa.`);
     }
   }

  finalizarCompra(dados: any){
    this.disableSubmit = true;
    dados['itens'] = this.carrinhoService.getItems();
    dados['adicionais'] = this.adicionaisService.getDados();
    dados['pagamentos'] = this.pagamentosSelecionados;
    dados['taxa_entrega'] = this.taxaEntrega;
    dados['total_bruto'] = this.totalBruto;
    dados['total_liquido'] = this.totalLiquido;
    dados['pagar_pontos'] = this.pagarComPontos;
    
    this.pagamentoService.salvar(dados)
      .subscribe(idPedido => this.notificationService.notify(`Pedido realizado com sucesso!`),
        response => this.erroFinalizar(response.error.message),
        () => this.router.navigate(['/sucesso']));
  }

  erroFinalizar(response){
    this.disableSubmit = false;
    this.notificationService.notify(response);
  }

}
