import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from 'app/features/tag/interfaces/tag.model';
import { TagApiService } from 'app/features/tag/services/tag-api.service';
import { TagStoreService } from 'app/features/tag/services/tag-store.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrl: './product-filters.component.scss'
})
export class ProductFiltersComponent implements OnInit, OnDestroy {
  constructor(private tagApi: TagApiService, private tagStore: TagStoreService, private router: Router, private activatedRoute: ActivatedRoute) {}

  @Output() selectedTags = new EventEmitter<Tag[]>();

  public selectValue: Tag[] = [];
  public tags = this.tagStore.tags$;
  public isSidebar = false;

  public clear() {
    this.selectValue = [];
    this.selectedTags.emit(this.selectValue);
  }

  public onChange() {
    this.selectedTags.emit(this.selectValue);
    this.router.navigate(['/'], {
      queryParams: {
        filters: this.selectValue.map((tag) => tag.id),
      },
      replaceUrl: true,
    })
  }

  ngOnInit(): void {
    if (!this.tagStore.isLoaded) {
      this.tagApi.getTags()
        .pipe(map((tags) => {
          return tags.filter((tag) => this.activatedRoute.snapshot.queryParamMap.getAll('filters').includes(tag.id.toString()))
        }))
        .subscribe((tags) => {
          this.selectValue = tags;
          this.selectedTags.emit(this.selectValue);
        });
    }
  }

  ngOnDestroy(): void {
    this.tagApi.destroy$.next();
  }
}
