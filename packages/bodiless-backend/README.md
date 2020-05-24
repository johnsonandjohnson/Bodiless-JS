# `@bodiless/backend`

## Overview
The backend-server (responsible for saving content to json files) will be listening on [http://localhost:8006](http://localhost:8006). It is also reachable via proxy from the test site at [http://localhost:8005/___backend](http://localhost:8005/___backend). However, you should never need to access this directly.

## Usage
You can start backend server by running `node ./path/to/server.js`. Backend server expects next environment variables to be available in the node proccess:

* `APP_GIT_PATH` - Location of a folder within the git repository. Defaults to `.` ( current working directory ).
* `BODILESS_BACKEND_DATA_FILE_PATH` - Where to write the content json files. Defaults to `./src/data`.
* `BODILESS_BACKEND_STATIC_PATH` - Where to write uploaded static assets. Defaults to `./static`.
* `BODILESS_BACKEND_COMMIT_ENABLED` - Whether or not commits are enabled. Defaults to `0` for `production` and `development` environments and `1` for `test/*` and `changeset/*` branches.
* `BODILESS_BACKEND_EXTENDED_LOGGING_ENABLED` - Whether or not extended logging is enabled. Defaults to `0`. Please note that this feature requires `morgan` and `morgan-body` packages. If you plan to use this feature outside of monorepo, please ensure those dependencies are installed.

Please note that `BODILESS_BACKEND_DATA_FILE_PATH`, `BODILESS_BACKEND_STATIC_PATH` and `BODILESS_BACKEND_COMMIT_ENABLED` are defined in `@bodiless/gatsby-theme-bodiless` by default.

## Web API

Backend package provides a set of web API endpoints to allow developers working on git workflow. As a private API, not all routes are currently documented.

- ```changes```
 
  Get changes between branchs.
 
  **Request**
  - *Method:* GET
  - *Parameters:*
    - N/A
  
  Example:
    ```
    curl --request GET --url http://localhost:8006/___backend/changes
    ```

- ```changes/conflicts```

  Find conflicts between origin master and upstream branch.

  **Request**
  - *Method:* GET
  - *Parameters:*
    - N/A


  Example:
    ```
    curl --request GET --url http://localhost:8006/___backend/changes/conflicts
    ```
