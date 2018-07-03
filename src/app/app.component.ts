import {Component, OnInit} from "@angular/core"
import { Router, NavigationEnd } from '@angular/router';

declare var device;

@Component({
  selector: 'mt-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  content = 'Welcome do Meat App!'

  constructor(private router: Router) { }

  ngOnInit() {
  	/*document.addEventListener("deviceready", function() { 
	 alert(device.platform); 
	 }, false);*/ 
	this.router.events.subscribe((evt) => {
		if (!(evt instanceof NavigationEnd)) {
		    return;
		}
		window.scrollTo(0, 0)
	});
  }

}
