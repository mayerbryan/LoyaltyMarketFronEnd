import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Product } from '../models/product.model';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    service = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve products from the API via GET', () => {
    const dummyProducts: Product[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        price: 10.99,
        color: 'Red',
        categoryId: '1',
      },
    ];

    service.getAllProducts().subscribe((products) => {
      expect(products).toEqual(dummyProducts);
    });

    const req = httpTestingController.expectOne('http://192.168.0.100:5159/api/Product');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should add a product via POST', () => {
    const dummyProduct: Product = {
      id: '1',
      name: 'New Product',
      description: 'New Description',
      price: 19.99,
      color: 'Blue',
      categoryId: '2',
    };

    service.addProduct(dummyProduct).subscribe((product) => {
      expect(product).toEqual(dummyProduct);
    });

    const req = httpTestingController.expectOne('http://192.168.0.100:5159/api/Product');
    expect(req.request.method).toBe('POST');
    req.flush(dummyProduct);
  });

  it('should retrieve a product by ID via GET', () => {
    const productId = '1';
    const dummyProduct: Product = {
      id: productId,
      name: 'Product 1',
      description: 'Description 1',
      price: 15.99,
      color: 'Green',
      categoryId: '3',
    };

    service.getProduct(productId).subscribe((product) => {
      expect(product).toEqual(dummyProduct);
    });

    const req = httpTestingController.expectOne(`http://192.168.0.100:5159/api/Product/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProduct);
  });

  it('should update a product by ID via PUT', () => {
    const productId = '1';
    const updatedProduct: Product = {
      id: productId,
      name: 'Updated Product',
      description: 'Updated Description',
      price: 25.99,
      color: 'Yellow',
      categoryId: '4',
    };

    service.updateProduct(productId, updatedProduct).subscribe((product) => {
      expect(product).toEqual(updatedProduct);
    });

    const req = httpTestingController.expectOne(`http://192.168.0.100:5159/api/Product/${productId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedProduct);
  });

  it('should delete a product by ID via DELETE', () => {
    const productId = '1';

    service.deleteProduct(productId).subscribe((product) => {
      // For delete, the response can be empty or a success message
      expect(product).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`http://192.168.0.100:5159/api/Product/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
