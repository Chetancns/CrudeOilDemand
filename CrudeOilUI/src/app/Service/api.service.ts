import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})



export class ApiService {
  private apiUrl = 'https://crudeoilapi.onrender.com/';
  constructor(private http: HttpClient) { }
  getWorldData() {
    return this.http.get(this.apiUrl);
  }
  getCountryNames() {
    return this.http.get(this.apiUrl +"/countrynames")
  }
  getCountryData(Name: string) {
    const params = new HttpParams().set('Name', Name);
    return this.http.get(this.apiUrl + "/countrydata", { params });
  }
  getLossData() {
    return this.http.get(this.apiUrl + "/loss")
  }
  getFeatureData() {
    return this.http.get(this.apiUrl + "/feature")
  }
}


