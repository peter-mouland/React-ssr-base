# React SSR Base [![CircleCI](https://circleci.com/gh/peter-mouland/React-ssr-base.svg?style=svg)](https://circleci.com/gh/peter-mouland/React-ssr-base)

> A Production ready SSR React App

This repo was born from [React-Lego](https://github.com/peter-mouland/react-lego) and uses all the learnings from that test to create a good place to start for SSR Single-page apps.

The main technologies are React, Koa v2, Babel and Webpack.

Authentication is handled locally with MongoDB as well as Passport integration.

## Dependencies
 
  * `brew instal mongodb`
  * `npm i`

## Testing

We use BrowserStack to enable us to check the site against multiple browsers and environments.
With NightWatch we are able to do e2e tests against a local browser or multiple browsers (via BrowserStack). 

Currently we have 2 types of e2e tests.  These are `tagged` as:
 * `production` : tests that can be done in a production environment (smoke tests).
    * ie. _safe_ tests that do not manipulate the database.
 * `staging` : Tests that can be run in a test environment.

### Running tests against staging

 > These could be tests that manipulate the Database.
 
`test:e2e-staging`

The purpose of these tests is to run as many tests as possible against multiple browsers to ensure that the app works for our users.

These tests will use `BrowserStack` to run all tests tagged up as `staging` against multiple browsers.
    
### Running tests against production

 > These should be passive ie. _safe_ tests that do not manipulate the database.
 
`test:e2e-production`

The purpose of these tests is to ensure that the vital part of the app has been put live correctly i.e. is the site up after a deployment.

These tests will use `BrowserStack` to run all tests tagged up as `production` against a single browser.

