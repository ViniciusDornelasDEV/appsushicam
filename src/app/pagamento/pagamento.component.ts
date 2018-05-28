import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isOrderCompleted(): boolean{
     return false;
   }

}
