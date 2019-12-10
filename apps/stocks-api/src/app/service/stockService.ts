import { environment as env} from './../../environments/environment';
import * as Wreck from '@hapi/wreck';

export const getStock = async function( symbol, period) {
    
    const apiURL = `${env.apiURL}/beta/stock/${symbol}/chart/${period}?token=${env.apiKey}`;

    console.log(apiURL);

    const { res, payload } = await Wreck.get(apiURL, {
      json: true
    });

    return payload;  
  };
