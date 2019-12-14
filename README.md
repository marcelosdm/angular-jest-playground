# Awesome Hello Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io/).

Report: `coverage/lcov-report/index.html`

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

Run with chrome and firefox headless

Report: `e2e/report/index.html`

## Running acceptance tests

Run `npm run acceptance-test` to execute the acceptance tests via [Protractor](http://www.protractortest.org/).

Run with chrome and firefox headless

Report: `acceptance-test/report/index.html`

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Troubleshooting

**Webdriver manager update**

Run `./node_modules/protractor/node_modules/webdriver-manager/bin/webdriver-manager update`

## Guides

**Karma to Jest**
```
https://itnext.io/testing-angular-applications-with-jest-and-spectator-c05991579807
$ npx -p @angular/cli ng new angular-jest-spectator
$ npm rm -D karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter
$ npm install --save-dev jest jest-preset-angular @types/jest
$ rm karma.conf.js
$ rm src/test.ts

https://medium.com/@wescopeland/easier-angular-unit-testing-af4b972fea12
$ npx -p @angular/cli ng new angular-jest-spectator-two
$ rm karma.conf.js src/test.ts
$ npm rm -D karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter

Obs: "jest-preset-angular": "^7.1.1",
```

**Add cucumber + chai to protractor**
```
cucumber
https://www.amadousall.com/angular-e2e-with-cucumber/
https://imasters.com.br/desenvolvimento/integrando-protractor-com-cucumberjs
https://www.npmjs.com/package/protractor-multiple-cucumber-html-reporter-plugin
$ npm i -D cucumber protractor-cucumber-framework cucumber-html-reporter
$ npm i -D @types/{chai,cucumber} chai cucumber protractor-cucumber-framework
$npm uninstall -D jasmine-spec-reporter jasmine-core @types/jasmine @types/jasminewd2

Obs: remove pretty

chai
https://www.chaijs.com/api/bdd/#method_include
```
