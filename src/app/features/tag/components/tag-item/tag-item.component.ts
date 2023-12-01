import { Component, Input } from '@angular/core';
import { TagStoreService } from '../../services/tag-store.service';
import { Tag } from '../../interfaces/tag.model';
import { TagPayload } from '../../interfaces/tag-payload';

@Component({
  selector: 'app-tag-item',
  templateUrl: './tag-item.component.html',
  styleUrl: './tag-item.component.scss'
})
export class TagItemComponent {
  constructor(private tagService: TagStoreService) {}

  @Input({ required: true }) tag: Tag | undefined;
  @Input({ required: true }) canManage: boolean | undefined;
  public isEdit = false;

  public editMode() {
    if (this.canManage) {
      this.isEdit = true;
    }
  }

  public updateTag(id: number, data: TagPayload) {
    this.tagService.updateTag(id, data);
  }

  public deleteTag(id: number) {
    if(this.canManage) {
      this.tagService.deleteTag(id);
    }
  }
}
