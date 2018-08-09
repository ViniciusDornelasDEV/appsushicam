import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {RegistroService} from './registro.service';
import {NotificationService} from '../shared/messages/notification.service';
import {LoginService} from '../security/login/login.service';

@Component({
  selector: 'mt-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  mascara = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  
  constructor(
  	private formBuilder: FormBuilder, 
  	private registroService: RegistroService,
  	private notificationService: NotificationService,
  	private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
  	this.registroForm = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required]),
      sobrenome: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      telefone: this.formBuilder.control('', [Validators.required]),
      telefone2: this.formBuilder.control(''),
      telefone3: this.formBuilder.control(''),
      senha: this.formBuilder.control('', [Validators.required]),
      confirmarSenha: this.formBuilder.control('', [Validators.required])
    }, {validator: RegistroComponent.equalsTo});
  }

  static equalsTo(group: AbstractControl): {[key:string]: boolean} {
    const senha = group.get('senha');
    const confirmarSenha = group.get('confirmarSenha');
    if(!senha || !confirmarSenha){
      return undefined;
    }

    if(senha.value !== confirmarSenha.value){
      return {senhaNotMatch: true};
    }

    return undefined;
  }

  registro(dados: any){
  	//this.registroService.registrar(dados);
  	this.registroService.registrar(this.registroForm.value)
      .subscribe(idCliente => this.notificationService.notify(`Cadastro efetuado com sucesso!`),
        response => this.notificationService.notify(response.error.message),
        () => this.login(dados));
  }

  login(dados){
    this.loginService.login(dados.telefone, dados.senha)
      .subscribe(user => this.notificationService.notify(`Bem vindo(a) ${user.name}!`),
        response => this.notificationService.notify(response.error.message),
        () => this.router.navigate(['/pagamento']));
  }


}
