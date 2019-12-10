import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StockService } from './stock.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { PriceQueryResponse } from '../+state/price-query.type';

describe('StockService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let stockService: StockService;

  beforeEach(
    () =>  {
      TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [
          StockService
        ]
      }) 

      httpClient = TestBed.get(HttpClient);
      httpTestingController = TestBed.get(HttpTestingController);
      stockService = TestBed.get(StockService);
    } 
  )

  describe('getStockDetails', () => {

    let queryResponse: PriceQueryResponse[];

    beforeEach(() => {
      stockService = TestBed.get(StockService);
      queryResponse = [
        {
          date: '2017-11-30',
          uClose: 174.49,
          uOpen: 172.86,
          uHigh: 177.81,
          uLow: 174.89,
          uVolume: 41594369,
          close: 177.88,
          open: 172.78,
          high: 175.77,
          low: 172.79,
          volume: 42803210,
          change: 0,
          changePercent: 0,
          label: 'Nov 30, 17',
          changeOverTime: 0
        }
       ] as PriceQueryResponse[];
    });

     
    it('should invoke stock api', () => {

      stockService.getStockDetails('AAPL','2y').subscribe(
        response => {
          expect(response).toEqual(queryResponse);
          expect(response.length).toEqual(1);
        } 
      );
  
      const req = httpTestingController.expectOne('/api/stock/AAPL/chart/2y');
      expect(req.request.method).toEqual('GET'); 

      req.flush(queryResponse); 
    });

  });


  afterEach(() => {
      httpTestingController.verify();
  });

});
