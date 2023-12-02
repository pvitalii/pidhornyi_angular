import { Component, Input, OnDestroy } from '@angular/core';
import { Tag } from '../../interfaces/tag.model';
import { TagPayload } from '../../interfaces/tag-payload';
import { TagApiService } from '../../services/tag-api.service';

@Component({
  selector: 'app-tag-item',
  templateUrl: './tag-item.component.html',
  styleUrl: './tag-item.component.scss'
})
export class TagItemComponent implements OnDestroy {
  constructor(private tagApi: TagApiService) {}

  @Input({ required: true }) tag: Tag | undefined;
  @Input({ required: true }) canManage: boolean | undefined;
  public isEdit = false;

  public editMode() {
    if (this.canManage) {
      this.isEdit = true;
    }
  }

  public updateTag(id: number, data: TagPayload) {
    this.tagApi.updateTag(id, data).subscribe()
  }

  public deleteTag(id: number) {
    if(this.canManage) {
      this.tagApi.deleteTag(id).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.tagApi.destroy$.next();
    this.tagApi.destroy$.complete();
  }
}
