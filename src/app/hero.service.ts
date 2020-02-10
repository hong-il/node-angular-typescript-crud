import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(this.heroesUrl + '/' + id)
      .pipe(
        tap(_ => this.log('fetched hero id=' + id)),
        catchError(this.handleError<Hero>('getHero'))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log('updated hero id=' + hero.id)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log('added hero w/ id=' + newHero.id)),
        catchError(this.handleError<Hero>('addHero'))
      )
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;

    return this.http.delete<Hero>(this.heroesUrl + '/' + id, this.httpOptions)
      .pipe(
        tap(_ => this.log('delete hero id=' + id)),
        catchError(this.handleError<Hero>('deleteHero'))
      )
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(this.heroesUrl + '/?name=' + term).pipe(
      tap(x => x.length ?
         this.log('found heroes matching ' + term) :
         this.log('no heroes matching ' + term)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.log(error);
      
      this.log('${operation} failed: ' + error.message);

      return of(result as T);
    }
  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}
