import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Duality } from '../../Models/Duality';

@Injectable({
  providedIn: 'root'
})
export class DualityAccessorService {

  constructor(private http: HttpClient) { }

  public AddDuality(duality1: String, duality2: String){

    let duality = new Duality();
    duality.Duality1 = duality1;
    duality.Duality2 = duality2;
    duality.Boo = 0;
    duality.Woo = 0;

    return this.http.post(environment.API_CONNECTION_STRING+"AddDuality",duality);
  }

  public GetAllDualities(){
    return this.http.get(environment.API_CONNECTION_STRING+"GetAllDualities");
  }
}
