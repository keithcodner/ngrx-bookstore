# NgrxBookstore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.1.

Works in conjunction with this repo dc_scraper_api which is the swagger server api

## Overview

NgrxBookstore is a full-stack web application built with Angular for the frontend and Express for the backend server. It demonstrates state management using NgRx and provides features for browsing, ordering, and managing books and videos. The backend Express server can be extended to handle API requests, serve static files, or connect to a database.

## How the App Works

- The Angular frontend provides a user interface for browsing products, managing a cart, checking out, and viewing orders.
- State management is handled using NgRx for predictable state updates and side effects.
- The Express server (`src/index.js`) runs on Node.js and can be used to serve the frontend, provide RESTful APIs, or act as a middleware layer.

## Running the Application

### 1. Start the Express Server


Run the following command to start the Express backend:

```
npm run express-server
```

This will run the Express server using `src/index.js`. By default, the server runs on `http://localhost:3000/`.

### 2. Start the Angular Development Server

Run the following command to start the Angular frontend:

```
ng serve
```

Navigate to `http://localhost:4200/` to view the application. The app will automatically reload if you change any source files.

You can run both servers simultaneously for full-stack development.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
