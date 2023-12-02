import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product.model';
import { Observable, Subscription } from 'rxjs';
import { Tag } from '../../../tag/interfaces/tag.model';
import { TagStoreService } from '../../../tag/services/tag-store.service';
import { Router } from '@angular/router';
import { FormUtilsService } from 'app/shared/utils/form-utils.service';
import { ProductPayload } from '../../interfaces/product-payload';
import { MatDialog } from '@angular/material/dialog';
import { TagApiService } from 'app/features/tag/services/tag-api.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit, OnDestroy {

  constructor(private tagApi: TagApiService, private tagStore: TagStoreService, private router: Router, private formUtils: FormUtilsService, private dialog: MatDialog) {}

  @Input() product?: Observable<Product>;
  @Input({ required: true }) openDialog: ((enterAnimationDuration: string, exitAnimationDuration: string) => void) = () => {};
  @Output() formData = new EventEmitter<ProductPayload>();

  public tags = this.tagStore.tags$;

  private productSubscription?: Subscription;

  public productForm = new FormGroup(
    {
      name: new FormControl('', {
        validators: [Validators.required, this.formUtils.noWhitespaceValidator],
        nonNullable: true,
      }),
      description: new FormControl('', {
        validators: [Validators.required, this.formUtils.noWhitespaceValidator],
        nonNullable: true,
      }),
      price: new FormControl(1, {
        validators: [Validators.required, Validators.min(1)],
        nonNullable: true,
      }),
      tags: new FormControl([] as (Tag | undefined)[], {
        validators: [Validators.required],
        nonNullable: true,
      }),
    }
  )

  public get name() {
    return this.productForm.get('name');
  }

  public get description() {
    return this.productForm.get('description');
  }

  public get price() {
    return this.productForm.get('price');
  }

  public get tagsValue() {
    return this.productForm.get('tags');
  }

  public compareTags(tag1: Tag, tag2: Tag) {
    return tag1 && tag2 ? tag1.id === tag2.id : tag1 === tag2;
  }

  public clickSubmit() {
    if (this.productForm.valid) {
      this.openDialog('0ms', '0ms');
    } else {
      this.productForm.markAllAsTouched();
    }
  }
  
  public onFormSubmit() {
    if(this.productForm.valid) {
      this.formData.emit(this.productForm.getRawValue());
    }
  }

  public getErrorMessage = this.formUtils.getErrorMessage;

  ngOnInit(): void {
    if(this.tagStore.tags.length === 0) {
      this.tagApi.getTags().subscribe();
    }
    this.productSubscription = this.product?.subscribe((product) => {
      this.productForm.patchValue(product);
    })
  }

  ngOnDestroy(): void {
    this.tagApi.destroy$.next();
    this.tagApi.destroy$.complete();
    this.productSubscription?.unsubscribe();
  }
}
