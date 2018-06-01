import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SharedModule} from '../shared/shared.module';
import {PagamentoComponent} from './pagamento.component';

import { CurrencyMaskModule } from "ngx-currency-mask";

const ROUTES: Routes = [
	{path: '', component: PagamentoComponent}
];

@NgModule({
	declarations: [PagamentoComponent],
	imports: [SharedModule, RouterModule.forChild(ROUTES), CurrencyMaskModule]
})

export class PagamentoModule{}