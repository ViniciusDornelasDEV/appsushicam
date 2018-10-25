import { Component, OnInit  } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from './login.service';
import {User} from './user.model';
import {NotificationService} from '../../shared/messages/notification.service';

import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, SocialUser } from "angular4-social-login";
 

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  navigateTo: string;
  mascara = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private fb: FormBuilder, 
              private loginService: LoginService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  	this.loginForm = this.fb.group({
  		telefone: this.fb.control('', [Validators.required]),
  		password: this.fb.control('', [Validators.required])
  	});
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');

    //caso logou com rede social
    this.authService.authState.subscribe((user) => {
      if(user){
        this.loginService.setSocialUser(user);
        this.router.navigate(['/adicionais']);
      }
    });
    
  }

  login(){
    this.loginService.login(this.loginForm.value.telefone, this.loginForm.value.password)
      .subscribe(user => this.notificationService.notify(`Bem vindo(a) ${user.name}!`),
        response => this.notificationService.notify(response.error.message),
        () => this.router.navigate(['/adicionais']));
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
 
  signOut(): void {
    this.authService.signOut();
  }

}
  
