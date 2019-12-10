import { stock } from './../plugin/stock';

export const manifest = {
    server: {
        port: 3333,
        host: 'localhost',
        routes: {
          cors: {
            origin: ["*"],
            headers: ["Accept", "Content-Type"]
          }
        }
    },
    register: {
        plugins: [
            {
                plugin: stock,
                routes: {
                    prefix: '/api/stock'
                }
            }
        ],
        options: {
            once: true
        }
    }
}; 