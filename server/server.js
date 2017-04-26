'use strict';

const Glue = require('glue');
const manifest = require('./config/manifest.json');
const fillDatabase = require('./FillAccount');

if (!process.env.PRODUCTION) {
    manifest.registrations.push({
        "plugin": {
            "register": "blipp",
            "options": {}
        }
    });
}
manifest.registrations.push();


Glue.compose(manifest, {relativeTo: __dirname}, (err, server) => {
    if (err) {
        console.log('server.register err:', err);
    }
    server.start(() => {
        fillDatabase.fill_data();
        console.log('✅  Server is listening on ' + server.info.uri.toLowerCase());
    });
});