# Express App Prototype

This repository contains a basic Express application. It is a way for me to test out authentication via Auth0. I am also testing whether the authentication flow works with a React app. I may eventually convert it into a "kit" that I can incorporate into different Express apps via an npm module.

## Goals

1. Server-hosted login page (or redirect to Auth0)
1. Server-side callback URL, for OAuth2 "authorization grant" flow
1. Create a basic user profile, based on the OAuth2 `id_token`.
1. Create an opaque, secure session token with authenticated encryption; store the session token in a cookie on the browser
1. Redirect to a React app that can use the opaque token to authenticate to an API

## Considerations

- There are potentially three separate Express apps on the server, separated by the first segment of the URL path
    - **`/login`**, which hosts the pages related to the login flow
    - **`/api`**, which provides a RESTful or GraphQL API
    - **`/app`**, which server the React app
- There may be a fourth app that lives at the root URL (and sibling paths that are not part of the above apps), this would be the marketing or public website for the server.
- This prototype is going to need some sort of data store, to hold the user profiles.

## Installation and Usage

### Docker

The Express app is configured to use a Couchbase 5.x server running in a Docker container on the localhost. To install and configure Docker:

1. Follow [the instructions in Docker's documentation][3].
1. Add the local user to the [`docker` user group][4].

[3]: https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu
[4]: https://techoverflow.net/2017/03/01/solving-docker-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket

### Couchbase

The Express app is configured to use a Couchbase 5.x server running in a Docker container on the localhost. To get started with Couchbase:

1. Run the `scripts/couchbase.sh` script, which will download, install, and start the most recent, stable release of Couchbase. This script installs Couchbase into a container named "db," and this name is assumed in all of the following scripts and commands.
1. Connect to the [Couchbase web console][5] and configure the cluster. For more information, see "[Running Couchbase Server using Docker][6]."

[5]: http://calypso.sword:8091
[6]: https://developer.couchbase.com/documentation/server/5.0/install/getting-started-docker.html

After Couchbase is installed, you can start and stop the container with the following `npm` commands:

- `npm run couchbase:start`
- `npm run couchbase:stop`

You can access an interactive console on the Docker container with the following:

- `docker exec -it db sh`

## License

The content of this repository is licensed under the [3-Clause BSD license][1]. Please see the [enclosed license file][2] for specific terms.

[1]: https://opensource.org/licenses/BSD-3-Clause
[2]: LICENSE.md
