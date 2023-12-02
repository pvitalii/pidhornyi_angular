import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Tag } from "../interfaces/tag.model";

@Injectable({
  providedIn: 'root'
})
export class TagStoreService {
  constructor() {}
  private readonly _tags$ = new BehaviorSubject<Tag[]>([]);
  public readonly tags$ = this._tags$.asObservable();

  private _isLoaded = false;

  public get isLoaded() {
    return this._isLoaded;
  } 

  public get tags() {
    return this._tags$.getValue();
  }

  public set tags(tags: Tag[]) {
    this._isLoaded = true;
    this._tags$.next(tags);
  }

  public addTag(tag: Tag) {
    this._tags$.next([...this.tags, tag]);
  }

  public updateTag(tag: Tag) {
    const tagIndex = this.tags.findIndex((oldData) => oldData.id === tag.id);
    this.tags[tagIndex] = tag;
    this._tags$.next(this.tags);
  }

  public deleteTag(id: number) {
    this._tags$.next(this.tags.filter((oldData) => oldData.id !== id));
  }
}