/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import * as Hapi from '@hapi/hapi';
import * as Joi from '@hapi/joi';
import { getStock } from './app/service/stockService'

const init = async () => {

  const server = Hapi.server({
    port: 3333,
    host: 'localhost',
    routes: {
      cors: {
        origin: ["*"],
        headers: ["Accept", "Content-Type"]
      }
    }
  });


  server.method({
      name: 'stock',
      method: getStock,
      options: {
        cache: {
          expiresIn: 60 * 1000,
          generateTimeout: 10000
        },
        generateKey: function (symbol, period){
          const id = `${symbol}:${period}`;
          console.log(id);
          return id;
        }
      }  
  });

  server.route({
    method: 'GET',
    path: '/api/stock/{symbol}/chart/{period?}',
    handler: async (request, h) => {

      const symbol = request.params.symbol;
      const period = request.params.period;
      console.log('symbol :',symbol, 'period :',period);

      let stockData = await server.methods.stock(symbol, period);
      
      return h.response(stockData);

    },

    options: {
      validate: {
          params: Joi.object({
              symbol: Joi.string().required(),
              period: Joi.string().required()
          })
      }
    }

  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
