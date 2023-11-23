import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})


export class AddCategoryComponent {
  
  constructor( private categoryService: CategoryService, private router: Router){}  


  newCategory: Category = {
    id: '',
    name: '',
    description: ''
  };

  

  addCategory() {
    this.categoryService.addCategory(this.newCategory)
      .subscribe({
        next: (category) => {
          this.router.navigate(['categories']);
          return category;
        },
        error: (response) => {
          console.error('Error:', response);
          
          if (response instanceof ErrorEvent) {
            console.error('Client-side error:', response.error.message);
          } else if (response.error) {
            console.error('Server-side error:', response.error);
            
            // Extract and log validation errors
            if (response.error.errors) {
              console.error('Validation errors:', response.error.errors);
            }
          }
        }
      });
  }
}