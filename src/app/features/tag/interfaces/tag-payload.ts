import { Tag } from "./tag.model";

export interface TagPayload extends Omit<Tag, 'id'> {}