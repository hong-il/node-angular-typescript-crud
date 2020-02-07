import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'hong-il' },
      { id: 2, name: 'yejincha' },
      { id: 3, name: 'remiel-gwon' },
      { id: 4, name: 'hby2233' },
      { id: 5, name: 'jiwon-effie-yeo' },
      { id: 6, name: 'misunny' },
      { id: 7, name: 'notabene08' },
      { id: 8, name: 'Wongok' },
      { id: 9, name: 'JunseokAhn' }
    ];
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}