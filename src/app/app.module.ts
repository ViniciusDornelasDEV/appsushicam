import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Corrigir o erro 404 em produção
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {ROUTES} from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import {SharedModule} from './shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './security/login/login.component';
import { UserDetailComponent } from './header/user-detail/user-detail.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutoComponent } from './produtos/produto/produto.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { AdicionaisComponent } from './adicionais/adicionais.component';
import { RegistroComponent } from './registro/registro.component';
import { SucessoComponent } from './sucesso/sucesso.component';
import { StorageServiceModule} from 'angular-webstorage-service';

import { TextMaskModule } from 'angular2-text-mask';
import { HistoricoComponent } from './historico/historico.component';
import { DetalhesComponent } from './historico/detalhes/detalhes.component';
import { FidelidadeComponent } from './fidelidade/fidelidade.component';

/*import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";

//config login com facebook e gmail
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("738563620960-vrv70jaa8kkmchckq5t9aqgede6ohjdo.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("2000362333357995")
  }
]);

export function provideConfig() {
  return config;
}*/

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    UserDetailComponent,
    ProdutosComponent,
    ProdutoComponent,
    CarrinhoComponent,
    AdicionaisComponent,
    RegistroComponent,
    SucessoComponent,
    HistoricoComponent,
    DetalhesComponent,
    FidelidadeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules}),
    StorageServiceModule,
    TextMaskModule
    //SocialLoginModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, {provide: LOCALE_ID, useValue: 'pt-BR'} 
    /*{provide: AuthServiceConfig, useFactory: provideConfig}*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
