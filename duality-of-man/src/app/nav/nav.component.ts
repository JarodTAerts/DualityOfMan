import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  navbarOpen = false;
  createSelected=true;
  browseSelected=false;
  aboutSelected=false;

  constructor() { }

  ngOnInit() {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  createNavButtonClicked(){
    this.createSelected = true;
    this.browseSelected = false;
    this.aboutSelected = false;
  }

  browseNavButtonClicked(){
    this.createSelected = false;
    this.browseSelected = false;
    this.aboutSelected = false;
  }

  aboutNavButtonClicked(){
    this.createSelected = false;
    this.browseSelected = false;
    this.aboutSelected = true;
  }

}
