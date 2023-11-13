import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  updateProductRequest: Product = {
    id: '',
    name: '',
    description: '',  
    price: 0,
    color: '',
    categoryId: ''
  };

  constructor(private productService: ProductsService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.route.paramMap.subscribe({
      next:(params)=>{
        const  id = params.get('id');

        if(id){
          this.productService.getProduct(id)
            .subscribe({
              next: (response) => {
                this.updateProductRequest = response;
              }
            })
        }
      }
    })
  }

  updateProduct() {
    this.productService.updateProduct(this.updateProductRequest.id, this.updateProductRequest)
      .subscribe({
        next: (response) => {
          this.router.navigate(['products']);
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
