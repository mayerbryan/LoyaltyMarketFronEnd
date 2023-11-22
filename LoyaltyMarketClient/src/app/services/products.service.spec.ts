import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Product } from '../models/product.model';

describe('ProductsService', () => {
  let productService: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });

    productService = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('should retrieve all products', () => {
    const mockProducts: Product[] = [
      { id: '1', name:'Product 1', categoryId: '1', price: 10.99, color: 'Red', description: 'Product 1' },
      { id: '2', name:'Product 1', categoryId: '2', price: 19.99, color: 'Blue', description: 'Product 2' },
    ];

    productService.getAllProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${productService.baseApiUrl}/api/Product`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should add a new product', () => {
    const newProduct: Product = { id: '3', name:'Product 1', categoryId: '1', price: 15.99, color: 'Green', description: 'New Product' };

    productService.addProduct(newProduct).subscribe(product => {
      expect(product).toEqual(newProduct);
    });

    const req = httpMock.expectOne(`${productService.baseApiUrl}/api/Product`);
    expect(req.request.method).toBe('POST');
    req.flush(newProduct);
  });

  it('should retrieve a product by ID', () => {
    const productId = '1';
    const mockProduct: Product = { id: productId, name:'Product 1', categoryId: '1', price: 10.99, color: 'Red', description: 'Product 1' };

    productService.getProduct(productId).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${productService.baseApiUrl}/api/Product/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should update a product', () => {
    const productId = '1';
    const updatedProduct: Product = { id: productId, name:'Product 1', categoryId: '1', price: 12.99, color: 'Yellow', description: 'Updated Product' };

    productService.updateProduct(productId, updatedProduct).subscribe(product => {
      expect(product).toEqual(updatedProduct);
    });

    const req = httpMock.expectOne(`${productService.baseApiUrl}/api/Product/${productId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedProduct);
  });

  it('should delete a product', () => {
    const productId = '1';

    productService.deleteProduct(productId).subscribe(product => {
      expect(product).toBeNull(); 
    });

    const req = httpMock.expectOne(`${productService.baseApiUrl}/api/Product/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
