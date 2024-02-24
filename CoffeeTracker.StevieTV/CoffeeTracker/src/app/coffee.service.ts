import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { environment } from "../environments/environment";
import { Coffee } from "./coffee.model";

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  private url = environment.apiBaseUrl + '/Coffee'
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getCoffees(): Observable<Coffee[]>{
    return this.http.get<Coffee[]>(this.url)
      .pipe(
        catchError(this.handleError<Coffee[]>('getCoffees', []))
      );
  }

  addCoffee(coffee: Coffee): Observable<Coffee> {
    return this.http.post<Coffee>(this.url, coffee, this.httpOptions)
      .pipe(
        catchError(this.handleError<Coffee>('addCoffee'))
      );

  }
  deleteCoffee(id: Number): Observable<Coffee> {
    const deleteUrl = `${this.url}/${id}`;

    return this.http.delete<Coffee>(deleteUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<Coffee>('deleteHero'))
      );

  }

  private handleError<T>(operation = 'operation', result?: any[]) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`Error occured in CoffeeService: ${operation}`);
      return of(result as T);
    }
  }

}
