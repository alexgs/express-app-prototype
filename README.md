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

## License

The content of this repository is licensed under the [3-Clause BSD license][1]. Please see the [enclosed license file][2] for specific terms.

[1]: https://opensource.org/licenses/BSD-3-Clause
[2]: LICENSE.md
