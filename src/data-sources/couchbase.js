// @flow

import couchbase from 'couchbase';
const bucketName = String( process.env.COUCHBASE_BUCKET );
const host = String( process.env.COUCHBASE_HOST );
const password = String( process.env.COUCHBASE_PASSWORD );
const username = String( process.env.COUCHBASE_USERNAME );

const cluster = new couchbase.Cluster( `couchbase://${host}/` );
cluster.authenticate( username, password );
const bucket = cluster.openBucket( bucketName );
const N1qlQuery = couchbase.N1qlQuery;

export default bucket;
export {
    bucket,
    cluster,
    N1qlQuery
};
