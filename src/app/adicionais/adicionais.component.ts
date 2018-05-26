import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import { AdicionaisService } from './adicionais.service';
import { ProdutosService } from '../produtos/produtos.service';
import {Molho, Hashi} from './adicionais.model';


@Component({
  selector: 'mt-adicionais',
  templateUrl: './adicionais.component.html',
  styleUrls: ['./adicionais.component.css']
})
export class AdicionaisComponent implements OnInit {
  
  adicionaisForm: FormGroup;
  molho: Molho;
  hashi: Hashi;

  constructor(private adicionaisService: AdicionaisService, private formBuilder: FormBuilder, private produtosService: ProdutosService) { 

  }

  ngOnInit() {
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
      agendar: this.formBuilder.control('', validator)
    });
  }

  temOpcionais(){
    return this.adicionaisService.temOpcionais();
  }

  temBebidas(){
    return this.adicionaisService.temBebidas();
  }

  salvar(dados: any){
    console.log(dados);
  }
  


}
