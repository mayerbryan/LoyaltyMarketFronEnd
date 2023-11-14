import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  
  products: Product[] = [];

  constructor(private productService: ProductsService, private router: Router){}

  ngOnInit(): void {
    this.productService.getAllProducts()
    .subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  deleteProduct(id: string){
    this.productService.deleteProduct(id)
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
