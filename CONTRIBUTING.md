# Contributing

  * [Prerequisites](#prerequisites)
  * [Developing](#developing)
  * [Testing](#testing)
  * [Styleguides](#Styleguides)

## Prerequisites

 > Clone the project `git clone git@github.com:peter-mouland/...`

PhantomJS v2 i required for tests.  If you haven't already got it installed please do the following:

 * `brew install upx`
 * `npm run phantom:install`

###Developing

 * `npm run start:dev` : the app will be on http://localhost:3000

## Testing

 * `npm test`
 * `npm run test:e2e`

To run the full browserstack suite of feature tests, first start browserstack supplying the browserstack-key

 * `./bin/BrowserStackLocal-osx <PUT-THE-BROWSERSTACK-KEY-HERE>`
 * `npm run test:e2e -- --bskey=<PUT-THE-BROWSERSTACK-KEY-HERE>`
 
Testing using VMWare: on the host mac, in iTerm run the following to find the ip address of your localhost.
 * `ifconfig vmnet8`

## Styleguides

 * Use the `.editorconfig` (this will ensure your IDE plays nicely with things like 2 Spaces (not tabs)
 * Components should work without requiring 'build' setup changes
   * i.e. Components can be *enhanced* with webpack updates but updates must not be mandatory
 * Full component functionality should be documented and demo'd
   * the default is demo'd and the ability to change options on the fly is provided


