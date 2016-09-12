# Example / Backbone.js (Coffeescript) / UserListApp

A simple single page application written on Coffeescript using Backbone.js

## Prerequisites

_[**NodeJS**](https://nodejs.org/) and its **npm** package manager are both
assumed to be installed prior execution of the following instructions._

1. Checkout
2. `cd` into the `bin` directory and run `node install` command
3. run `./grunt` command when you will need to rebuild the application

## Installation

Built application is shipped with this repository and is located in the
`app/app.js` file. Every new build that's made via abovementioned `./grunt`
command will overwrite application code in the `app/app.js`.

**You have two options of running built application.**

1) The recommended way is to specify the `app` directory as a root directory in
the configuration of your Apache, nginx or whatever server you are running.

2) For those who by any reason can't run the application under a real webserver,
a local NodeJS-based solution is provided. Just execute `cd bin` and then run
`node server`, optionally you may pass a port number the server will
be listening on (`3000` by default), e.g. .`node server 3456` As soon
as you've lauched **server** locally on your machine you may open
**http://localhost:3000/** in your browser (replace 3000 with your port number
if any was passed as an argument during server startup).

## Configuration

In order to eliminate the need for rebuilding each time when backend server was
changed its host name was made a part of the `app/index.html` (a value of 
`APP.HOST.api`).

## Notes

- Client-side validation of form fields was oversimplified intentionally since it's
always a good idea to compare against backend validation rules first, but since
those are unavailable in our case, only a few really basic checkings was implemented.
- An original task had required a paginated list of users, but backend doesn't
seem to support any sort of server-side pagination mechanisms, hence client-side
"fake" pagination was utilized instead.
