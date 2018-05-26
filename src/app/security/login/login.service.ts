import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import {Router, NavigationEnd} from '@angular/router';

import {MEAT_API} from '../../app.api';
import {User} from './user.model';

@Injectable()
export class LoginService{

	user: User;
	lastUrl: string;

	constructor(private http: HttpClient, private router: Router){
		this.router.events.filter(e => e instanceof NavigationEnd).subscribe((e: NavigationEnd) => this.lastUrl = e.url);
	}

	isLoggedIn(): boolean {
		return this.user != undefined;
	}

	login(email: string, password: string): Observable<User> {
	let header = new HttpHeaders({'Content-type': 'multipart/form-data'});

	return this.http.post<User>(`${MEAT_API}/login`, {email: email, password: password}, {headers: header})
	.do(user => this.user = user);
	}

	handleLogin(path: string = this.lastUrl){
		this.router.navigate(['/login', btoa(path)]);
	}

	logout(){
		this.user = undefined;
		this.router.navigate(['/restaurants']);
	}

}


/*
	let params: HttpParams = undefined;
	params = new HttpParams().set('email', email);
	params.set('password', password);

	return this.http.get<User>(`${MEAT_API}/login`, {params: params});

*/