import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {PagamentoComponent} from './pagamento.component';

export class LeavePagamentoGuard implements CanDeactivate<PagamentoComponent>{

	canDeactivate(orderComponent: PagamentoComponent, activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean{
		if(!orderComponent.isOrderCompleted()){
			return window.confirm('Deseja desistir da compra?');
		}else{
			return true;
		}
	}

}