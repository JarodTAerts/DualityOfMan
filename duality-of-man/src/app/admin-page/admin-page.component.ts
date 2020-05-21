import { Component, OnInit } from '@angular/core';
import { DualityAccessorService } from '../services/duality-accessor-service/duality-accessor.service';
import {Duality} from './../Models/Duality';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  dualityAccessorService: DualityAccessorService;

  dualities: Duality[] = [];

  constructor(dualityAccessorService: DualityAccessorService) {
    this.dualityAccessorService = dualityAccessorService;
    this.dualityAccessorService.GetAllDualities().subscribe(dualities => this.dualities = <Duality[]>dualities);
  }

  ngOnInit() {
  }



}
