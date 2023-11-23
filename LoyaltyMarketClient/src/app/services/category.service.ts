import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  baseApiUrl: string = "http://192.168.0.100:5159"
  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.baseApiUrl+'/api/Category')
  }

  addCategory(newCategory: Category): Observable<Category>{
    newCategory.id='';
    return this.http.post<Category>(this.baseApiUrl+"/api/Category", newCategory);
  }

  getCategory(id:string): Observable<Category>{
    return this.http.get<Category>(this.baseApiUrl+'/api/Category/' + id);
  }

  updateCategory(id:string, updateCategoryRequest: Category): Observable<Category>{
    return this.http.put<Category>(this.baseApiUrl+'/api/Category/' + id, updateCategoryRequest);
  }

  deleteCategory(id:string): Observable<Category>{
    return this.http.delete<Category>(this.baseApiUrl+'/api/Category/' + id);
  }
}