import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from 'app/features/tag/interfaces/tag.model';
import { TagStoreService } from 'app/features/tag/services/tag-store.service';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrl: './product-filters.component.scss'
})
export class ProductFiltersComponent implements OnInit {
  constructor(private tagService: TagStoreService, private router: Router, private activatedRoute: ActivatedRoute) {}

  @Output() selectedTags = new EventEmitter<Tag[]>();

  public selectValue: Tag[] = [];
  public tags = this.tagService.tags$;

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
    this.tagService.loadTags();
    const queryFilters = this.activatedRoute.snapshot.queryParamMap.getAll('filters');
    if(queryFilters.length > 0) {
      this.tags.subscribe((tags) => {
        this.selectValue = tags.filter((tag) => this.activatedRoute.snapshot.queryParamMap.getAll('filters').includes(tag.id.toString()));
        this.selectedTags.emit(this.selectValue);
      });
    }
  }
}
