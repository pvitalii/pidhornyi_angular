import { Component, OnInit } from '@angular/core';
import { TagStoreService } from '../../services/tag-store.service';
import { TagPayload } from '../../interfaces/tag-payload';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss'
})
export class TagListComponent implements OnInit {
  constructor(private tagService: TagStoreService) {}
  
  public tags = this.tagService.tags$;
  public isFormActive = false;

  public addTag(data: TagPayload) {
    this.tagService.addTag(data);
  }
  
  ngOnInit(): void {
    this.tagService.loadTags();
  }
}
