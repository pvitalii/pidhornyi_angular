import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestCore, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
import { Product } from '../../features/product/interfaces/product.model';
import { Tag } from '../../features/tag/interfaces/tag.model';
import { RequestInfo } from 'angular-in-memory-web-api';

interface RequestOptions<T> extends RequestCore {
  body: T
}

interface Entity {
  id: number
}


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  put<T extends Entity>(reqInfo: RequestInfo) {
    const index = (reqInfo.collection as T[]).findIndex((object) => object.id === reqInfo.id);
    if(index !== -1) {
      reqInfo.collection[index] = { id: reqInfo.id, ...(reqInfo.req as RequestOptions<Omit<T, 'id'>>).body }
    }
    return reqInfo.utils.createResponse$(() => {
      const options: ResponseOptions =
      {
        body: reqInfo.collection[index],
        status: STATUS.OK
      }
      return options;
    });
  }

  createDb() {
    const tags: Tag[] = [
      {
        id: 1,
        name: 'Flagship',
        color: '#319680'
      },
      {
        id: 2,
        name: 'Mid-range',
        color: '#eb8634'
      },
      {
        id: 3,
        name: 'Budget',
        color: '#40b027'
      },
      {
        id: 4,
        name: 'Photography',
        color: '#5727b0'
      },
      {
        id: 5,
        name: 'Gaming',
        color: '#a33131'
      },
      {
        id: 6,
        name: '128GB',
        color: '#613825'
      },
      {
        id: 7,
        name: '256GB',
        color: '#34156e'
      }
    ];
    const products: Product[] = [
      {
        id: 1,
        name: 'IPhone',
        description: 'Boasting a powerful A16 Bionic chip, advanced camera system, and a stunning Super Retina XDR display, this smartphone redefines excellence. Elevate your mobile experience with 5G connectivity, all-day battery life, and a commitment to sustainability. Order now and step into the future of technology.',
        price: 1000,
        tags: [tags[0], tags[3], tags[6]]
      },
      {
        id: 2,
        name: 'Xiaomi',
        description: 'Boasting a powerful A16 Bionic chip, advanced camera system, and a stunning Super Retina XDR display, this smartphone redefines excellence. Elevate your mobile experience with 5G connectivity, all-day battery life, and a commitment to sustainability. Order now and step into the future of technology.',
        price: 400,
        tags: [tags[2], tags[1], tags[5]]
      },
      {
        id: 3,
        name: 'Samsung',
        description: 'Boasting a powerful A16 Bionic chip, advanced camera system, and a stunning Super Retina XDR display, this smartphone redefines excellence. Elevate your mobile experience with 5G connectivity, all-day battery life, and a commitment to sustainability. Order now and step into the future of technology.',
        price: 800,
        tags: [tags[0], tags[1], tags[4], tags[5], tags[6]]
      },
      {
        id: 4,
        name: 'Lenovo',
        description: 'Boasting a powerful A16 Bionic chip, advanced camera system, and a stunning Super Retina XDR display, this smartphone redefines excellence. Elevate your mobile experience with 5G connectivity, all-day battery life, and a commitment to sustainability. Order now and step into the future of technology.',
        price: 550,
        tags: [tags[1], tags[2], tags[3], tags[5]]
      },
      {
        id: 5,
        name: 'OnePlus',
        description: 'Boasting a powerful A16 Bionic chip, advanced camera system, and a stunning Super Retina XDR display, this smartphone redefines excellence. Elevate your mobile experience with 5G connectivity, all-day battery life, and a commitment to sustainability. Order now and step into the future of technology.',
        price: 750,
        tags: [tags[0], tags[3], tags[4], tags[5], tags[6]]
      }
    ];

    return { products, tags };
  }

  genId<T extends Entity>(collection: T[]): any {
    const maxId = collection.reduce((prev, curr) => (curr.id > prev ? curr.id : prev), 0);
    const newId = maxId + 10;

    return newId;
  }
}
