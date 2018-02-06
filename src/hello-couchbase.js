const bucketName = 'my-awesome-bucket';
const couchbase = require( 'couchbase' );
const cluster = new couchbase.Cluster( 'couchbase://localhost/' );
cluster.authenticate( 'lambda', '6NZi6F7Bucv7' );
const bucket = cluster.openBucket( bucketName );
const N1qlQuery = couchbase.N1qlQuery;

bucket.manager()
    .createPrimaryIndex( function() {
        bucket.upsert( 'user:king_arthur', {
                'email': 'kingarthur@couchbase.com', 'interests': [ 'Holy Grail', 'African Swallows' ]
            },
            function( err, result ) {
                bucket.get( 'user:king_arthur', function( err, result ) {
                    console.log( 'Got result: %j', result.value );
                    bucket.query(
                        N1qlQuery.fromString( `SELECT * FROM \`${bucketName}\` WHERE $1 in interests LIMIT 1` ),
                        [ 'African Swallows' ],
                        function( err, rows ) {
                            if ( err ) {
                                console.log( err );
                                process.exit(1);
                            } else {
                                console.log( 'Got rows: %j', rows );
                                process.exit(0);
                            }
                        } );
                } );
            } );
    } );
