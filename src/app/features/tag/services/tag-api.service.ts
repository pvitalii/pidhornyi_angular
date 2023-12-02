import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Tag } from '../interfaces/tag.model';
import { TagPayload } from '../interfaces/tag-payload';
import { Subject, takeUntil, tap } from 'rxjs';
import { TagStoreService } from './tag-store.service';

@Injectable({
  providedIn: 'root'
})
export class TagApiService {

  constructor(private apiService: ApiService<Tag>, private tagStore: TagStoreService) { }

  private readonly prefix = 'tags';

  public readonly destroy$ = new Subject<void>();

  public getTags() {
    return this.apiService.get(this.prefix).pipe(tap((tags) => this.tagStore.tags = tags), takeUntil(this.destroy$));
  }

  public addTag(data: TagPayload) {
    return this.apiService.post(this.prefix, data).pipe(tap((tag) => this.tagStore.addTag(tag)), takeUntil(this.destroy$));
  }

  public updateTag(id: number, data: TagPayload) {
    return this.apiService.put(`${this.prefix}/${id}`, data).pipe(tap((tag) => this.tagStore.updateTag(tag)), takeUntil(this.destroy$));
  }

  public deleteTag(id: number) {
    return this.apiService.delete(`${this.prefix}/${id}`).pipe(tap(() => this.tagStore.deleteTag(id)), takeUntil(this.destroy$));
  }
}
