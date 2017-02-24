# React SSR Base [![CircleCI](https://circleci.com/gh/peter-mouland/React-ssr-base.svg?style=svg)](https://circleci.com/gh/peter-mouland/React-ssr-base)

> A Production ready SSR React App

This repo was born from [React-Lego](https://github.com/peter-mouland/react-lego) and uses all the learnings from that test to create a good place to start for SSR Single-page apps.

The main technologies are React, Koa v2, Babel and Webpack.

## Getting Started
 
  * `npm i`
  * `npm run build`
  * `npm run start:prod`
  
## [Credit Suisse Orders](http://credit-suisse.herokuapp.com/orders/)
  
 > http://credit-suisse.herokuapp.com/orders/

This page gathers 2500 orders and formats the data into a line graph.

The graph will show overall sales by category;  (default), `gender`, `size`, `colour` and `style`.

These results can be filtered manipulated by a specific `manufacturer`, `country` or `gender`.
This filtering allows you to drill-down into the results and see the sales volume and a much more granular level.
For example, You can see `Denzil Jeans` sales split by `gender` (i.e. M, F).

There is a lso a pie-chart as each category has a small number of options.  This is useful for a quick summary.

## How's it built?

### [d3](https://d3js.org/)

The graphing has been built with [d3](https://d3js.org/) which is a visualisation library.
This has been chosen because of the powerful and flexible options it brings.  This allows any future requirements / changes to be built using the same tool.
It is well established and well maintained which means we can trust it to have very few bugs.
It is open source which means any bugs we may find, could be patched by us and fed back into the eco system.

The downside is that it is a large library (adds ~400kb) which we could improve with either code-splitting or by only including those files that we use (i.e. not the whole of d3).
This optimisation can be done after a demo to the user to confirm we are going in the right direction.

### React

React Works well when creating responsive apps that update quickly as the user interacts with the site.

## Assumptions

I have assumed that building a line-graph is desired.  This is because the amount of data (1000s) and time being talked about; a bar graph would have been too cluttered.

## Testing

We use BrowserStack to enable us to check the site against multiple browsers and environments.
With NightWatch we are able to do e2e tests against a local browser or multiple browsers (via BrowserStack). 

 * `npm run test:unit`
 * `npm run test:func`
 * `npm run test:e2e`

Currently we have 2 types of e2e tests.  These are `tagged` as:
 * `production` : tests that can be done in a production environment (smoke tests).
    * ie. _safe_ tests that do not manipulate the database.
 * `staging` : Tests that can be run in a test environment.

### Running tests against staging

`test:e2e-staging`

The purpose of these tests is to run as many tests as possible against multiple browsers to ensure that the app works for our users.

These tests will use `BrowserStack` to run all tests tagged up as `staging` against multiple browsers.
    
### Running tests against production

`test:e2e-production`

The purpose of these tests is to ensure that the vital part of the app has been put live correctly i.e. is the site up after a deployment.

These tests will use `BrowserStack` to run all tests tagged up as `production` against a single browser.

