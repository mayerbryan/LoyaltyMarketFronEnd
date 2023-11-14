import { Component } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

export class AddCategoryComponent {
  newcategory: Category = {
    id: '',
    name: '',
    description: ''
  };

  constructor(private categoryService: CategoryService, private router: Router){}  

  addcategory() {
    this.categoryService.addCategory(this.newcategory)
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
