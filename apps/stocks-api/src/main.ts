import * as Glue from '@hapi/glue';
import { manifest } from './app/config/manifest';

const options = {
    relativeTo: __dirname
};

const startServer = async function () {
    try {
        const server = await Glue.compose(manifest, options);
        await server.start();
        console.log('Server running on %s', server.info.uri);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();