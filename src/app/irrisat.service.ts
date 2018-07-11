import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class IrrisatService {

  et0Url = "https://irrisat-cloud.appspot.com/_ah/api/irrisat/v1/services/forecast/evapotranspiration";

  results : object;

  constructor(
    private http: HttpClient,
    private messageService : MessageService
  ) { }


  getEvapotranspiration(): Observable<object> {
    //this.messageService.add('IrrisatService: get ' + this.et0Url);
    

  //   let resultado = this.http.get<any[]>(this.et0Url)
  //   .pipe(
  //     tap(heroes => this.log(`OK`)),
  //     catchError(this.handleError('getEvapotranspiration', []))
  //   );

  //  console.log(resultado);

  //  return of("fin");
  let resultado = this.http.get(this.et0Url);
  console.log(resultado);

  return resultado;

  }


  search(latitude: number, longitude: number) {
    let promise = new Promise((resolve, reject) => {

      let apiURL = `${this.et0Url}/${latitude.toString().replace(',','.')}/${longitude.toString().replace(',','.')}`;

      //console.log(apiURL);

      this.http.get(apiURL)
          .toPromise()
          .then(
            // res => { // Success
            //   this.results = res;
            //   console.log("OK");
            //   resolve(this.results);
            // }
              res => { // Success
                // this.results = res.json().results.map(item => {
                //   return new SearchItem(
                //       item.trackName,
                //       item.artistName,
                //       item.trackViewUrl,
                //       item.artworkUrl30,
                //       item.artistId
                //   );
                // });
                // this.results = res.json().results;
                //console.log("OK");
                resolve(res);
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
    return promise;
  }


/**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

}
