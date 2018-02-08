// @flow
import couchbase from 'couchbase';
import _ from 'lodash';

const bucketName = String( process.env.COUCHBASE_BUCKET );
const host = String( process.env.COUCHBASE_HOST );
const password = String( process.env.COUCHBASE_PASSWORD );
const username = String( process.env.COUCHBASE_USERNAME );

const cluster = new couchbase.Cluster( `couchbase://${host}/` );
cluster.authenticate( username, password );
const bucket = cluster.openBucket( bucketName );
const N1qlQuery = couchbase.N1qlQuery;

function formatError( error:Error ):string {
    return `>>> Couchbase: ${error.message} <<<`;
}

function retrieveById( documentId:string ):Promise<any> {
    return new Promise( ( resolve, reject ) => {
        bucket.get( documentId, ( error, result, meta ) => {
            if ( error ) {
                reject( formatError( error ) );
            } else {
                const data = _.merge( {}, result.value, { id: documentId } );
                resolve( data );
            }
        } );
    } )
}

function retrieveByQuery(
    queryString:string,
    queryParams:?{ [token:string]:string } | Array<string> = undefined
):Promise<Array<any>> {
    return new Promise( ( resolve, reject ) => {
        const query = N1qlQuery.fromString( queryString );
        bucket.query( query, queryParams, ( error, rows, meta ) => {    // Bucket.query is perfectly happy for `params` to be undefined
            if ( error ) {
                reject( formatError( error ) );
            } else {
                resolve( rows );
            }
        } );
    } );
}

export {
    retrieveById,
    retrieveByQuery
};
