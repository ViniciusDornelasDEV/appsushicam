import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../shared/messages/notification.service';

import {Bairro} from './endereco.model';
import {EnderecoService} from './endereco.service';
@Component({
  selector: 'mt-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {
  enderecoForm: FormGroup;
  bairros: Bairro[];

  constructor(
    private formBuilder: FormBuilder, 
    private notificationService: NotificationService,
  	private router: Router,
    private enderecoService: EnderecoService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.enderecoService.getBairros().subscribe(bairros => this.bairros = bairros);

  	this.enderecoForm = this.formBuilder.group({
      bairro: this.formBuilder.control('', [Validators.required]),
      rua: this.formBuilder.control('', [Validators.required]),
      numero: this.formBuilder.control('', [Validators.required]),
      apartamento: this.formBuilder.control(''),
      complemento: this.formBuilder.control(''),
      ponto_referencia: this.formBuilder.control('')
    });
  }

  registro(){
    this.enderecoService.novoEndereco(this.enderecoForm.value)
      .subscribe(idEndereco => this.notificationService.notify(`Endereço cadastrado com sucesso!`),
        response => this.notificationService.notify(response.error.message),
        () => this.router.navigate(['/pagamento']));
  }

}
