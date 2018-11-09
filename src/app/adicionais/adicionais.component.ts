import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import { AdicionaisService } from './adicionais.service';
import { ProdutosService } from '../produtos/produtos.service';
import {Molho, Hashi} from './adicionais.model';
import {CarrinhoService} from '../carrinho/carrinho.service';
import {HeaderService} from '../header/header.service';

import {NotificationService} from '../shared/messages/notification.service';
import {LoginService} from '../security/login/login.service';
import {User} from '../security/login/user.model';

@Component({
  selector: 'mt-adicionais',
  templateUrl: './adicionais.component.html',
  styleUrls: ['./adicionais.component.css']
})
export class AdicionaisComponent implements OnInit {
  
  adicionaisForm: FormGroup;
  molho: Molho;
  hashi: Hashi;
  user: User;
  validatorTelefone: any;
  loginSocial: boolean = false;
  mascara = [ /[1-9]/, /\d/, ':', /\d/, /\d/];
  mascaraTelefone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  constructor(private adicionaisService: AdicionaisService, 
            private formBuilder: FormBuilder, 
            private produtosService: ProdutosService,
            private router: Router,
            private notificationService: NotificationService,
            private carrinhoService: CarrinhoService,
            private headerService: HeaderService,
            private loginService: LoginService) { 

  }

  ngOnInit() {
    this.adicionaisService.clear();
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


    //se não estiver logado...
    if(this.loginService.user == undefined){
      //verificar se está logado com rede social
      if(this.loginService.socialUser == undefined){
        this.router.navigate(['/login']);
      }else{
        this.loginService.pesquisarSocial().subscribe(user => this.telefoneObrigatorio(user));
        this.loginSocial = true;
      }
    }

    this.adicionaisForm = this.formBuilder.group({
      wasabi: this.formBuilder.control(''),
      gengibre: this.formBuilder.control(''),
      shoyu: this.formBuilder.control(''),
      teriyaki: this.formBuilder.control(''),
      hashi: this.formBuilder.control(''),
      agendar: this.formBuilder.control('', validator),
      observacoes: this.formBuilder.control(''),
      telefone: this.formBuilder.control('', this.validatorTelefone)
    });
  }

  temOpcionais(){
    return this.adicionaisService.temOpcionais();
  }

  temBebidas(){
    return this.adicionaisService.temBebidas();
  }

  telefoneObrigatorio(user){
    console.log('telObrigatorio');
    console.log(user);
    this.user = user;
    if((this.user == undefined || this.user.telefone == undefined)  && this.loginSocial){
      this.validatorTelefone = Validators.required;
      return true;
    }
    return false;
  }

  pedirTelefone(){
    if((this.user == undefined || this.user.telefone == undefined)  && this.loginSocial){
      return true;
    }
    return false;
  }

  salvar(dados: any){

    this.adicionaisService.salvar(dados, this.molho, this.hashi);

    //se tiver telefone chamar cadastro...
    if(this.pedirTelefone()){
      this.loginService.loginSocial(this.user, dados.telefone)
      .subscribe(user => this.notificationService.notify(`Adicionais selecionados com sucesso!`),
        response => this.notificationService.notify(response.error.message),
        () => this.redirPagamento());
      
    }else{
      this.notificationService.notify(`Adicionais selecionados com sucesso!`);
      this.router.navigate(['/pagamento']);
    }

  }

  redirPagamento(){
    this.loginSocial = false;
    this.user = this.loginService.user;
    this.router.navigate(['/pagamento']);

  }
  
  ngOnDestroy(){
    this.headerService.setCarrinho(false);
  }
  
}
