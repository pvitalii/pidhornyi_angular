import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './features/product/pages/product-list/product-list.component';
import { TagListComponent } from './features/tag/pages/tag-list/tag-list.component';
import { ProductDetailComponent } from './features/product/pages/product-detail/product-detail.component';
import { ProductAddComponent } from './features/product/pages/product-add/product-add.component';
import { ProductEditComponent } from './features/product/pages/product-edit/product-edit.component';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { ServerErrorPageComponent } from './core/pages/server-error-page/server-error-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'tags',
    component: TagListComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'add-product',
    component: ProductAddComponent,
  },
  {
    path: 'edit-product/:id',
    component: ProductEditComponent,
  },
  {
    path: 'server-error',
    component: ServerErrorPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
