import {Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './security/login/login.component';
import {LoggedInGuard} from './security/loggedin.guard';

import {ProdutosComponent} from './produtos/produtos.component';
import {CarrinhoComponent} from './carrinho/carrinho.component';
import {AdicionaisComponent} from './adicionais/adicionais.component';
import {RegistroComponent} from './registro/registro.component';
import {SucessoComponent} from './sucesso/sucesso.component';
import {HistoricoComponent} from './historico/historico.component';

export const ROUTES: Routes = [
  //{path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login/:to', component: LoginComponent},
  {path: '', component: ProdutosComponent},
  {path: 'carrinho', component: CarrinhoComponent},
  {path: 'adicionais', component: AdicionaisComponent},
  {path: 'pagamento', loadChildren: './pagamento/pagamento.module#PagamentoModule',
  canLoad: [LoggedInGuard], canActivate: [LoggedInGuard]},
  {path: 'registro', component: RegistroComponent},
  {path: 'endereco', loadChildren: './endereco/endereco.module#EnderecoModule',
  canLoad: [LoggedInGuard], canActivate: [LoggedInGuard]},
  {path: 'sucesso', component: SucessoComponent},
  {path: 'historico', component: HistoricoComponent},

  {path: '**', component: NotFoundComponent}
]
