import { Injectable } from "@angular/core";
import { TagApiService } from "./tag-api.service";
import { BehaviorSubject } from "rxjs";
import { Tag } from "../interfaces/tag.model";
import { TagPayload } from "../interfaces/tag-payload";

@Injectable({
  providedIn: 'root'
})
export class TagStoreService {
  constructor(private tagService: TagApiService) {}
  private readonly _tags$ = new BehaviorSubject<Tag[]>([]);
  public readonly tags$ = this._tags$.asObservable();
  private isLoaded = false;

  public get tags() {
    return this._tags$.getValue();
  }

  public loadTags() {
    if (!this.isLoaded) {
      return this.tagService.getTags().subscribe((tags) => {
        this._tags$.next(tags);
        this.isLoaded = true;
      });
    }
    return
  }

  public addTag(data: TagPayload) {
    return this.tagService.addTag(data).subscribe((tag) => {
      this._tags$.next([...this.tags, tag]);
    });
  }

  public updateTag(id: number, data: TagPayload) {
    return this.tagService.updateTag(id, data).subscribe((tag) => {
      const tagIndex = this.tags.findIndex((oldData) => oldData.id === tag.id);
      this.tags[tagIndex] = tag;
      this._tags$.next(this.tags);
    });
  }

  public deleteTag(id: number) {
    return this.tagService.deleteTag(id).subscribe(() => {
      this._tags$.next(this.tags.filter((oldData) => oldData.id !== id));
    });
  }

}