import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseApiUrl: string = "https://192.168.0.100:5159"
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseApiUrl+'/api/Product')
  }

  addProduct(newProduct: Product): Observable<Product>{
    newProduct.id='';
    console.log(newProduct.id, newProduct.categoryId, newProduct.price, newProduct.color, newProduct.description );
    return this.http.post<Product>(this.baseApiUrl+"/api/Product", newProduct);
  }

  getProduct(id:string): Observable<Product>{
    return this.http.get<Product>(this.baseApiUrl+'/api/Product/' + id);
  }

  updateProduct(id:string, updateProductRequest: Product): Observable<Product>{
    return this.http.put<Product>(this.baseApiUrl+'/api/Product/' + id, updateProductRequest);
  }

  deleteProduct(id:string): Observable<Product>{
    return this.http.delete<Product>(this.baseApiUrl+'/api/Product/' + id);
  }
}