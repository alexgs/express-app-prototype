# Express App Prototype

This repository contains a basic Express application. It currently serves as a sample application or starter kit, working with Couchbase. 

Originally, this project started as a way for me to test out authentication via Auth0. I was also exploring whether the authentication flow works with a React app. That work led to a separate Express middleware library, [Glados][5].

[5]: https://github.com/philgs/glados

## Considerations

- There are potentially three separate Express apps on the server, separated by the first segment of the URL path
    - **`/login`**, which hosts the pages related to the login flow
    - **`/api`**, which provides a RESTful API
    - **`/app`**, which server the React app
    - **`/app`**, which provides a GraphQL API
- There may be an additional app that lives at the root URL (and sibling paths that are not part of the above apps), this would be the marketing or public website for the server.

## Installation

In addition to running `npm install`, you will need the following:

### Docker

The Express app is configured to use a Couchbase 5.x server running in a Docker container on the localhost. To install and configure Docker:

1. Follow [the instructions in Docker's documentation][3].
1. Add the local user to the [`docker` user group][4].

[3]: https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu
[4]: https://techoverflow.net/2017/03/01/solving-docker-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket

### Couchbase

The Express app is configured to use a Couchbase 5.x server running in a Docker container on the localhost. To get started with Couchbase:

1. Run the `scripts/couchbase.sh` script, which will download, install, and start the most recent, stable release of Couchbase. This script installs Couchbase into a container named "db," and this name is assumed in all of the following scripts and commands.
1. Connect to the Couchbase web console (http://localhost:8091 or similar) and configure the cluster. For more information, see "[Running Couchbase Server using Docker][6]."

[6]: https://developer.couchbase.com/documentation/server/5.0/install/getting-started-docker.html

After Couchbase is installed, you can start and stop the container with the following `npm` commands:

- `npm run couchbase:start`
- `npm run couchbase:stop`

You can access an interactive console on the Docker container with the following:

- `docker exec -it db sh`

### Sample Database

In the Couchbase web console, install the "beer-sample" database. Create a user that has at least "query select" and "data reader" permissions for the `beer-sample` bucket. Provide the username and password in the `config.json` file (which can be created from the `config-template.json` file).

## License

The content of this repository is licensed under the [3-Clause BSD license][1]. Please see the [enclosed license file][2] for specific terms.

[1]: https://opensource.org/licenses/BSD-3-Clause
[2]: LICENSE.md
