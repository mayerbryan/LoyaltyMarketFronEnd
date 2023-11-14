import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})

export class CategoriesComponent implements OnInit {
  
  categories: Category[] = [];

  constructor(private categorieService: CategoryService, private router: Router){}

  ngOnInit(): void {
    this.categorieService.getAllCategories()
    .subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  deleteCategory(id: string){
    this.categorieService.deleteCategory(id)
      .subscribe({
        next:(response) =>{
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', {skipLocationChange: true})
          .then(()=>{
            this.router.navigate([currentUrl]);
          });
        }
      });
  }
}
