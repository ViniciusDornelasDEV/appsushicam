import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SharedModule} from '../shared/shared.module';
import {PagamentoComponent} from './pagamento.component';
import {LeavePagamentoGuard} from './leave-pagamento.guard';

const ROUTES: Routes = [
	{path: '', component: PagamentoComponent, canDeactivate: [LeavePagamentoGuard]}
];

@NgModule({
	declarations: [PagamentoComponent],
	imports: [SharedModule, RouterModule.forChild(ROUTES)]
})

export class OrderModule{}