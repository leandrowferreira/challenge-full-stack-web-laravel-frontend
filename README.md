# Full Stack Web Developer - Final Submission

Sample CRUD API and frontend implementation as candidate submission to fullstak web developer position at GrupoA.

## Table of Contents

  - [Challenge](#challenge)
  - [Live sample](#live-sample)
  - [Features](#features)
  - [Modules](#modules)
    - [Frontend](#frontend)
    - [API](#API)
  - [Installing](#installing)
    - [System requirements](#system-requirements)
    - [Installing frontend](#installing-frontend)
    - [Installing in production](#installing-in-production)
  - [Comments](#comments)
  - [Resources](#resources)
  - [Credits](#credits)


## Challenge

A challenge is proposed to measure applicant's technical knowledgement. The detailed requeriments are [described here](/00_project-specification/README.md).


## Live sample

A live sample frontend is online and can be reached at [https://admin.edtech.tmp.br](https://admin.edtech.tmp.br).

This sample is hosted using AWS S3, as a static site, behind Cloudflare, implementing flexible encryption (Client <-> Cloudflare) since S3 does not allow HTTPS connections.

The Backend API ([stored in another repository](https://github.com/leandrowferreira/challenge-full-stack-web-laravel)) is hosted using AWS EC2.


## Features

- SPA application isolated from backend
- Local routing using `Vue Router`
- `Vuetify` as UI framework
- Demonstrates authentication and consuming *API* entry points


## Modules

As requested, the submission is a combination of two distinct modules, that uses also distinct technologies:


### Frontend

- Frontend to consume *API*, maintaned in this repository.
- Written in `Javascript` and `Vuetify`.
- Single Page Application (*SPA*) that consumes all *API* entry points


### API

- Backend module, stored in [another repository](https://github.com/leandrowferreira/challenge-full-stack-web-laravel).
- Written in `PHP` using `Laravel 8.41.0`.
- Restful, well-formed entry points.
- Full resource test covering.


## Installing


### System requirements

This front end is a static website, that uses client side resources to communicate with API. It's only the "view" layer to the system. Any static-hosted server can be used to do so.

As development environment, the application needs `NodeJS` and `npm` installed to maintain the frontend dependencies. In Ubuntu Linux OS, these can be easyly installed like this:

````bash
$ curl -L https://npmjs.org/install.sh | sudo sh
$ sudo npm cache clean -f
$ sudo npm install -g n
$ sudo npm install -g npm
$ sudo n stable
````


### Installing frontend

The installation as described here will work well in development environment. This *SPA* is only a sample application that consumes the backend *API*. It's architecture is not ready to put in production, since user and password resides on source code, and the authentication layer is really not implemented, because it's not part of project specification.

Clone the repository.

```bash
$ git clone https://github.com/leandrowferreira/challenge-full-stack-web-laravel-frontend.git
```

Setup project.

```bash
$ cd challenge-full-stack-web-laravel-frontend
$ npm install
```

Compiles and hot-reloads for development
```bash
$ npm run serve
```


### Installing in production

As described earlier, this is not an application ready to work in production. But if you still want to publish it, you need to change some files to adjust the *API* endpoint. These files are:

  - src/Views/StudentCreate.vue
  - src/Views/StudentEdit.vue
  - src/Views/StudentIndex.vue

Inside all these files you need to change the line

```javascript
baseURL: 'http://localhost:8000/api/v1/',
```

to reflect the real *API* endpoint:

```javascript
baseURL: 'https://the-real-api-server/api/v1/',
```

Doing this, you need to generate final `HTML`, `Javascript` and `CSS` files that guarantee all web browsers compatibility.

The modern frontend technologies allows packing, transpiling an minifying source codes. The `webpack` can do this through `npm` using:

```bash
npm run build
```

The `dist` directory must be published in production server.


## Comments

Important notes about architecture, third party software and other considerations [can be read here](./COMMENTS.md).


## Resources

  - [VueJS](https://vuejs.org/): `Javascript` library/framework for building user interfaces.
  - [Vue Router](https://router.vuejs.org/): Frontend router to make *SPA* with `VueJS`.
  - [Vuetify](https://vuetifyjs.com/): UI library that implementes Material Design in `VueJS`.
  - [Material Design](https://material.io/design): Material is a design system created by Google.
  - [npm](https://www.npmjs.org/): Package manager to `Javascript` language
  - [vue-the-mask](https://vuejs-tips.github.io/vue-the-mask/): A lightweight and dependency free mask input for `Vue.js`.
  - [Axios](https://github.com/axios/axios): Promise based HTTP client for the browser and `node.js`.
  - [Webpack](https://webpack.js.org/): Module bundler for `Javascript`.
  - [node.js](https://nodejs.org/): JavaScript runtime built on `Chrome's V8 JavaScript` engine.


## Credits

This implementation was heavily based on the VueJS framework, Vue Router, Vuetify and Axios, but the whole work in the developer layer is original content.