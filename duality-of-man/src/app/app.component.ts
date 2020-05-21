import { Component, ViewChild } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'duality-of-man';

  @ViewChild('nav') nav:NavComponent;

  constructor(private router: Router ) {
    this.router.events.subscribe((ev)=>{
      if (ev instanceof NavigationEnd) { 

        // Set the right button highlights based on route
        if(this.router.url === '/about'){
          this.nav.aboutNavButtonClicked();
        }else if(this.router.url === '/create'){
          this.nav.createNavButtonClicked();
        }else{
          this.nav.browseNavButtonClicked();
        }
      }
    });
  }

  ngOnInit(){
    
  }
}
