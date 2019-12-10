import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PriceQueryResponse } from './../+state/price-query.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

   getStockDetails(symbol, period): Observable<PriceQueryResponse[]>{
    const apiURL=  `/api/stock/${symbol}/chart/${period}`;
    return this.httpClient.get<PriceQueryResponse[]>(apiURL);
  }

  constructor(
    private httpClient: HttpClient
  ) {}

}
