import { Component, OnInit  } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {LoginService} from './login.service';
import {User, SocialUser} from './user.model';
import {NotificationService} from '../../shared/messages/notification.service';
declare var facebookConnectPlugin;
declare var window;
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
              private router: Router) { }

  ngOnInit() {
  	this.loginForm = this.fb.group({
  		telefone: this.fb.control('', [Validators.required]),
  		password: this.fb.control('', [Validators.required])
  	});
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');
  }

  login(){
    this.loginService.login(this.loginForm.value.telefone, this.loginForm.value.password)
      .subscribe(user => this.notificationService.notify(`Bem vindo(a) ${user.name}!`),
        response => this.notificationService.notify(response.error.message),
        () => this.router.navigate(['/adicionais']));
  }

  loginFacebook(){
    document.addEventListener("deviceready", () => { 
      facebookConnectPlugin.login(["public_profile","email"],(result) => {
      //calling api after login success
       facebookConnectPlugin.api("/me?fields=email,name,picture",
       ["public_profile","email"]
       ,(userData) => {
           //API success callback
           console.log(userData);
           let usuario = {name: userData.name, email: userData.email, telefone: '', accessToken: ''};
           this.loginService.setSocialUser(usuario);
           this.router.navigate(['/adicionais']);
        },(error) =>{
           //API error callback
           this.notificationService.notify('Ocorreu algum erro, por favor tente novamente!');
           this.router.navigate(['/login']);
        });
      },(error) =>{
        //authenication error callback
        this.notificationService.notify('Ocorreu algum erro, por favor tente novamente!');
        this.router.navigate(['/login']);
       });
   
     }, false);
  }

  loginGoogle(){
    /*let usuario = {name: 'Vinicius Dornelas', email: 'vinicius.s.dornelasw@gmail.com', telefone: '', accessToken: ''};
    this.loginService.setSocialUser(usuario);
    this.router.navigate(['/adicionais']);*/

    document.addEventListener("deviceready", () => { 
      window.plugins.googleplus.login(
        { 
          'idToken': '119263952091-650roq847bhtneuu5qem5qdbfhmte2uo.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
          'offline': true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
        },
        (obj) => {
          let usuario = {name: obj.displayName, email: obj.email, telefone: '', accessToken: ''};
          this.loginService.setSocialUser(usuario);
          this.router.navigate(['/adicionais']); // do something useful instead of alerting
        },
        (msg) => {
          this.notificationService.notify(msg+' - Ocorreu algum erro, por favor tente novamente!');
          this.router.navigate(['/login']);
        }
      );
   
     }, false);
  }
}
  
