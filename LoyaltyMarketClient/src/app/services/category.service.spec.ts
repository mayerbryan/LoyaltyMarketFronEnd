import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
    });
    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve categories from the API via GET', () => {
    const dummyCategories = [{ id: '1', name: 'Category 1', description: 'Description 1' }];

    service.getAllCategories().subscribe((categories) => {
      expect(categories).toEqual(dummyCategories);
    });

    const req = httpTestingController.expectOne('http://192.168.0.100:5159/api/Category');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCategories);
  });

  it('should add a category via POST', () => {
    const dummyCategory = { id: '1', name: 'New Category', description: 'New Description' };

    service.addCategory(dummyCategory).subscribe((category) => {
      expect(category).toEqual(dummyCategory);
    });

    const req = httpTestingController.expectOne('http://192.168.0.100:5159/api/Category');
    expect(req.request.method).toBe('POST');
    req.flush(dummyCategory);
  });

  it('should retrieve a category by ID via GET', () => {
    const categoryId = '1';
    const dummyCategory = { id: categoryId, name: 'Category 1', description: 'Description 1' };

    service.getCategory(categoryId).subscribe((category) => {
      expect(category).toEqual(dummyCategory);
    });

    const req = httpTestingController.expectOne(`http://192.168.0.100:5159/api/Category/${categoryId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCategory);
  });

  it('should update a category by ID via PUT', () => {
    const categoryId = '1';
    const updatedCategory = { id: categoryId, name: 'Updated Category', description: 'Updated Description' };

    service.updateCategory(categoryId, updatedCategory).subscribe((category) => {
      expect(category).toEqual(updatedCategory);
    });

    const req = httpTestingController.expectOne(`http://192.168.0.100:5159/api/Category/${categoryId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedCategory);
  });

  it('should delete a category by ID via DELETE', () => {
    const categoryId = '1';

    service.deleteCategory(categoryId).subscribe((category) => {
      // For delete, the response can be empty or a success message
      expect(category).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`http://192.168.0.100:5159/api/Category/${categoryId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
