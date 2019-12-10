const Joi = require('@hapi/joi');
const Wreck = require('@hapi/wreck');
import { getStock } from '../../service/stockService'

export const stock = {
    name: 'stock',
    version: '1.0.0',
    register: async function (server, options) {
          server.method({
              name: 'stock',
              method: getStock,
              options: {
                cache: {
                  expiresIn: 5 * 60 * 1000,
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
            path: '/{symbol}/chart/{period}',
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
    }
};