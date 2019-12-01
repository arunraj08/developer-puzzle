import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  StocksAppConfig,
  StocksAppConfigToken
} from '@coding-challenge/stocks/data-access-app-config';
import { PriceQueryResponse } from './../+state/price-query.type';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  getStockDetails(symbol, period){
    const apiURL=  `/api/stock/${symbol}/chart/${period}`;
    return this.httpClient.get<PriceQueryResponse[]>(apiURL);
  }

  constructor(
    @Inject(StocksAppConfigToken) private env: StocksAppConfig,
    private httpClient: HttpClient
  ) {}

}
