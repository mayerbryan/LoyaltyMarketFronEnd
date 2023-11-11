import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Models/Product';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseApiUrl: string = "https://localhost:5158";

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product>(this.baseApiUrl + '/api/products');
  }

}
