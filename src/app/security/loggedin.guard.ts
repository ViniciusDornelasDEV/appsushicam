import {CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {LoginService} from './login/login.service';


@Injectable() 
export class LoggedInGuard implements CanLoad, CanActivate{

	constructor(private loginService: LoginService){}

	checkAutentication(path: string): boolean{
		const loggedIn = this.loginService.isLoggedIn();
		
		if(!loggedIn){
			this.loginService.handleLogin(`/${path}`);
		}

		return loggedIn;
	}

	canLoad(route: Route): boolean {
		return this.checkAutentication(route.path);
	}

	canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
		return this.checkAutentication(activatedRoute.routeConfig.path);
	}

}