import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import {Router, NavigationEnd} from '@angular/router';

import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

import {MEAT_API} from '../../app.api';
import {User, SocialUser} from './user.model';

@Injectable()
export class LoginService{

	user: User;
	socialUser: SocialUser;
	lastUrl: string;

	constructor(
		private http: HttpClient, 
		private router: Router,
		@Inject(LOCAL_STORAGE) private storage: WebStorageService
	){
		
		this.router.events.filter(e => e instanceof NavigationEnd).subscribe((e: NavigationEnd) => this.lastUrl = e.url);
	}

	getUser(){
		return this.user;
	}

	isLoggedIn(): boolean {
		if(this.user == undefined){
			this.user = this.storage.get('user');
		}
		return this.user != undefined;
	}

	login(telefone: string, password: string): Observable<User> {
		let header = new HttpHeaders({'Content-type': 'multipart/form-data'});

		return this.http.post<User>(`${MEAT_API}/app/login`, {telefone: telefone, password: password}, {headers: header})
		.do(user => this.localStorage(user));
	}

	handleLogin(path: string = this.lastUrl){
		this.router.navigate(['/registro']);
	}

	logout(){
		this.storage.remove('user');
		this.user = undefined;
		this.router.navigate(['/']);
	}

	localStorage(user: User){
		this.user = user;

		this.storage.set('user', user);	
	}

	setSocialUser(user: SocialUser){
		this.socialUser = user;
	}

	getSocialUser(){
		return this.socialUser;
	}

	pesquisarSocial(): Observable<User>{
		let header = new HttpHeaders({'Content-type': 'multipart/form-data'});
		return this.http.post<User>(`${MEAT_API}/app/pesquisar/social`, {email: this.socialUser.email}, {headers: header})
		.do(user => this.salvarSocial(user));

	}

	salvarSocial(user: User){
		this.user = user;
		return this.user;
	}

	loginSocial(user: User, telefone: string){
		console.log('loginService loginSocial');
		let header = new HttpHeaders({'Content-type': 'multipart/form-data'});
		return this.http.post<User>(`${MEAT_API}/app/login/social`, {user: user, telefone: telefone, socialUser: this.socialUser}, {headers: header})
		.do(user => this.localStorage(user));
	}
}
