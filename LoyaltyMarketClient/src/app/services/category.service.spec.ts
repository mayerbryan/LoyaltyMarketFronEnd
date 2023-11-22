import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { Category } from '../models/category.model';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });

    categoryService = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(categoryService).toBeTruthy();
  });

  it('should retrieve all categories', () => {
    const mockCategories: Category[] = [
      { id: '1', name: 'Category 1', description: 'Description 1' },
      { id: '2', name: 'Category 2', description: 'Description 2' },
    ];

    categoryService.getAllCategories().subscribe(categories => {
      expect(categories).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(`${categoryService.baseApiUrl}/api/Category`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('should add a new category', () => {
    const newCategory: Category = { id: '3', name: 'New Category', description: 'New Description' };

    categoryService.addCategory(newCategory).subscribe(category => {
      expect(category).toEqual(newCategory);
    });

    const req = httpMock.expectOne(`${categoryService.baseApiUrl}/api/Category`);
    expect(req.request.method).toBe('POST');
    req.flush(newCategory);
  });

  it('should retrieve a category by ID', () => {
    const categoryId = '1';
    const mockCategory: Category = { id: categoryId, name: 'Category 1', description: 'Description 1' };

    categoryService.getCategory(categoryId).subscribe(category => {
      expect(category).toEqual(mockCategory);
    });

    const req = httpMock.expectOne(`${categoryService.baseApiUrl}/api/Category/${categoryId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategory);
  });

  it('should update a category', () => {
    const categoryId = '1';
    const updatedCategory: Category = { id: categoryId, name: 'Updated Category', description: 'Updated Description' };

    categoryService.updateCategory(categoryId, updatedCategory).subscribe(category => {
      expect(category).toEqual(updatedCategory);
    });

    const req = httpMock.expectOne(`${categoryService.baseApiUrl}/api/Category/${categoryId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedCategory);
  });

  it('should delete a category', () => {
    const categoryId = '1';

    categoryService.deleteCategory(categoryId).subscribe(category => {
      expect(category).toBeNull(); 
    });

    const req = httpMock.expectOne(`${categoryService.baseApiUrl}/api/Category/${categoryId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
