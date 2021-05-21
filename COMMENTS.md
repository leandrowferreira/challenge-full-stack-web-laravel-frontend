# Comments about this project

Here you can read notes about architecture, third part software and other important considerations about this project.


## Table of Contents

  - [Architecture](#architecture)
  - [Third party software](#third-party-software)
  - [What to do with more time](#what-to-do-with-more-time)
  - [What required items was not delivered](#what-required-items-was-not-delivered)


## Architecture

`VueJS` is one of the best choices to implement rich user interfaces. Using it, the team can full isolate the frontend development to the rest of application. In this specific project, a Single Page Application (*SPA*) is used to consume a backend *API*. VueJS is a project requirement and could not be changed.

Over this framework, to maintains the *SPA* philosophy, client-side routig was necessary. Thanks to the VueJS ecosystem, `Vue Router` can abstract this entire job. Besides, to make the asynchronous calls to the *API*, the app uses the consolidated `Axios` as promise HTTP client.

The frontend does not holds business logic, and only shows necessary visual interfaces to show and edit data. The only few logics acts as validations and flow control. This is a beautiful architecture, because, as already said, it completely isolates the user-frontend from the rest of the solution.


## Third party software

To develop the frontend solution, some few third party software or library was used:

  - [Vue Router](https://router.vuejs.org/): Frontend router that enables "navigating" without using a real web server.
  - [Vuetify](https://vuetifyjs.com/) as frontend UI framework, that incorporates into VueJS the visual and behavioral Google Material Design implementation.
  - [Axios](https://github.com/axios/axios): As *API* consumer, the frontend does a lot of asynchronous calls to outside. Axios, a promise based HTTP client, does well this job.
  - [vue-the-mask](https://vuejs-tips.github.io/vue-the-mask/): this componente is used to mask the *CPF* and *RA* entries.


## What to do with more time

This implementation is like a proof-of-concept, holding only one specific group of use cases (the student management). This is far to be a complete solution. So, tons of works could be done if more time could be consumed:

  - Complete Auth interface (login, logout, password request, register...).
  - Implement Websockets to guarantee frontend syncing.
  - Use Vuex to manage the application statement and global constants and variables (such as endpoint and token).
  - Reinforce security to avoid CSRF.
  - Implements "real" user routing (currently, for sake of simplicity, this sits on root "/").
  - Role management, to allow maintan roles and rights to use the system funcionalities.
  - Another users management, like teachers, admins an other roles.


## What required items was not delivered

This implementation tries to meet all project specs, including all features required and even this file name.

The deploy instructions give as examples [Netlify](https://www.netlify.com/) and [Heroku](https://www.heroku.com/) platforms, that wasn't used in this project, but the term "ou semelhante" (or equivalent) gives margin to another approaches to be chosen. In present case, AWS services was chosen for deployment.