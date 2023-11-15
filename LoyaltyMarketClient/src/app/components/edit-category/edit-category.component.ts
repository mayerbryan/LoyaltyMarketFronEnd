import { Component } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {
  
  updateCategoryRequest: Category = {
    id: '',
    name: '',
    description: ''
  };

  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.route.paramMap.subscribe({
      next:(params)=>{
        const  id = params.get('id');

        if(id){
          this.categoryService.getCategory(id)
            .subscribe({
              next: (response) => {
                this.updateCategoryRequest = response;
              }
            })
        }
      }
    })
  }

  updateCategory() {
    this.categoryService.updateCategory(this.updateCategoryRequest.id, this.updateCategoryRequest)
      .subscribe({
        next: (response) => {
          this.router.navigate(['categories']);
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
