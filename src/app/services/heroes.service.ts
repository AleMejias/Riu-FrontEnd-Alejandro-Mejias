import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Hero } from '../models/heroes.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private readonly apiUrl = 'http://localhost:5000/heroes';
  private readonly http = inject( HttpClient );

  // constructor(private readonly http: HttpClient){}


  getHeroes(){
    return this.http.get<Hero[]>(this.apiUrl)
    .pipe(
      catchError(( error: HttpErrorResponse ) => {
        return throwError(() =>  new Error(`${ error.error?.message }`))
      })
    )
  }

}
