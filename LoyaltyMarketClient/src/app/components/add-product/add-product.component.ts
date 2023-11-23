import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent {
  categories: Category[] = [];
  constructor(private productService: ProductsService, private categoryService: CategoryService, private router: Router){}  

  ngOnInit(): void {
    this.categoryService.getAllCategories()
    .subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }


  newProduct: Product = {
    id: '',
    name: '',
    description: '',  
    price: 0,
    color: '',
    categoryId: ''
  };

  

  addProduct() {
    this.productService.addProduct(this.newProduct)
      .subscribe({
        next: (product) => {
          this.router.navigate(['products']);
          return product;
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