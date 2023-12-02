import { Component, OnDestroy, OnInit } from '@angular/core';
import { TagStoreService } from '../../services/tag-store.service';
import { TagPayload } from '../../interfaces/tag-payload';
import { TagApiService } from '../../services/tag-api.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss'
})
export class TagListComponent implements OnInit, OnDestroy {
  constructor(private tagApi: TagApiService, private tagStore: TagStoreService) {}

  public tags = this.tagStore.tags$;
  public isFormActive = false;

  public addTag(data: TagPayload) {
    this.tagApi.addTag(data).subscribe();
  }
  
  ngOnInit(): void {
    if(!this.tagStore.isLoaded) {
      this.tagApi.getTags().subscribe();
    }
  }
  
  ngOnDestroy(): void {
    this.tagApi.destroy$.next();
    this.tagApi.destroy$.complete();
  }

}
