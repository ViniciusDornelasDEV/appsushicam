import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import { AdicionaisService } from './adicionais.service';
import { ProdutosService } from '../produtos/produtos.service';
import {Molho, Hashi} from './adicionais.model';
import {CarrinhoService} from '../carrinho/carrinho.service';
import {HeaderService} from '../header/header.service';

import {NotificationService} from '../shared/messages/notification.service';

@Component({
  selector: 'mt-adicionais',
  templateUrl: './adicionais.component.html',
  styleUrls: ['./adicionais.component.css']
})
export class AdicionaisComponent implements OnInit {
  
  adicionaisForm: FormGroup;
  molho: Molho;
  hashi: Hashi;
  mascara = [ /[1-9]/, /\d/, ':', /\d/, /\d/];
  constructor(private adicionaisService: AdicionaisService, 
            private formBuilder: FormBuilder, 
            private produtosService: ProdutosService,
            private router: Router,
            private notificationService: NotificationService,
            private carrinhoService: CarrinhoService,
            private headerService: HeaderService) { 

  }

  ngOnInit() {
    //se não tiver itens no cvarrinho, retorna para produtos
    if(this.carrinhoService.items.length === 0){
      this.notificationService.notify(`Nenhum item no carrinho!`);
      this.router.navigate(['/']);
    }
    this.adicionaisService.totalPecas();
    this.headerService.setCarrinho(true);
    this.adicionaisService.molho().subscribe(molho => this.molho = molho);
    this.adicionaisService.hashi().subscribe(hashi => this.hashi = hashi);

    let validator;
    if(this.produtosService.exibirMensagem){
      validator = Validators.required;
    }

    this.adicionaisForm = this.formBuilder.group({
      wasabi: this.formBuilder.control(''),
      gengibre: this.formBuilder.control(''),
      shoyu: this.formBuilder.control(''),
      teriyaki: this.formBuilder.control(''),
      hashi: this.formBuilder.control(''),
      agendar: this.formBuilder.control('', validator),
      observacoes: this.formBuilder.control(''),
    });
  }

  temOpcionais(){
    return this.adicionaisService.temOpcionais();
  }

  temBebidas(){
    return this.adicionaisService.temBebidas();
  }

  salvar(dados: any){
    this.adicionaisService.salvar(dados, this.molho, this.hashi);

    this.notificationService.notify(`Adicionais selecionados com sucesso!`);
    this.router.navigate(['/pagamento']);
  }
  
  ngOnDestroy(){
    this.headerService.setCarrinho(false);
  }
  
}
