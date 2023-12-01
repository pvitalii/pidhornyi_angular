import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Tag } from '../interfaces/tag.model';
import { TagPayload } from '../interfaces/tag-payload';

@Injectable({
  providedIn: 'root'
})
export class TagApiService {

  constructor(private apiService: ApiService<Tag>) { }

  private readonly prefix = 'tags';

  public getTags() {
    return this.apiService.get(this.prefix);
  }

  public addTag(data: TagPayload) {
    return this.apiService.post(this.prefix, data);
  }

  public updateTag(id: number, data: TagPayload) {
    return this.apiService.put(`${this.prefix}/${id}`, data);
  }

  public deleteTag(id: number) {
    return this.apiService.delete(`${this.prefix}/${id}`);
  }
}
