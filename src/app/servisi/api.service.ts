import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
baseUrl: string = "http://localhost:3000/productList";
  constructor(private http:HttpClient) { }

  getProduct(){
    return this.http.get<any>(this.baseUrl)
  }

  
  postProduct(data:any){
    return this.http.post<any>(this.baseUrl, data)
  }

  putProduct(data:any, id:number){
    return this.http.put<any>(this.baseUrl + '/'+id, data)
  }

  deleteProduct(id:number){
    return this.http.delete<any>(this.baseUrl +'/'+ id)
  }

}


