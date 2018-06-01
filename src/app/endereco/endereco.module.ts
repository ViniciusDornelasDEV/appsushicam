import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SharedModule} from '../shared/shared.module';
import {EnderecoComponent} from './endereco.component';

const ROUTES: Routes = [
	{path: '', component: EnderecoComponent}
];

@NgModule({
	declarations: [EnderecoComponent],
	imports: [SharedModule, RouterModule.forChild(ROUTES)]
})

export class EnderecoModule{}