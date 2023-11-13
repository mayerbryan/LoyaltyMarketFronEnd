import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent {
  newProduct: Product = {
    id: '',
    name: '',
    description: '',  
    price: 0,
    color: '',
    categoryId: ''
  };

  constructor(private productService: ProductsService, private router: Router){}  

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
