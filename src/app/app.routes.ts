import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path:'',
        component: ProductsComponent
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'categories',
        component: ProductsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRountinModule{}
