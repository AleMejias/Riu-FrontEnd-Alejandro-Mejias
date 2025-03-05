import { Injectable } from '@angular/core';
import { FiltersParams } from '@shared-models/filters.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  private readonly filters$ = new BehaviorSubject<FiltersParams>({pageNumber: 1 , pageSize: 3 , query: ''});

  constructor() { }

  setFiltersState( newState: FiltersParams ){
    this.filters$.next( newState );
  }
  getFiltersState(){
    return this.filters$.getValue();
  }

}
