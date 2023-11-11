import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../Models/Product';
import { Route } from '@angular/router';
import { Router, response } from 'express';
import { ProductsService } from '../../services/ProductsService';
import { error } from 'console';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products : Product[] = [];
  constructor(private productService: ProductsService, private router: Router){}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({next: (products) => {this.products = products; },
      error: (response) => {console.log(response);}});
  }

}
