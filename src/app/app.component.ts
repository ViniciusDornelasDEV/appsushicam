import {Component, OnInit} from "@angular/core"

declare var device;

@Component({
  selector: 'mt-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  content = 'Welcome do Meat App!'

  constructor() { }

  ngOnInit() {
  	/*document.addEventListener("deviceready", function() { 
	 alert(device.platform); 
	 }, false);*/ 
  }

}
