#! /bin/bash

docker run -d --name db -p 8091-8094:8091-8094 -p 11210-11211:11210-11211 -v /opt/couchbase/var:/opt/couchbase/var couchbase
