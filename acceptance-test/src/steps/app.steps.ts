import { Before, Given, Then, When, After } from 'cucumber';
import { expect } from 'chai';
import { AppPage } from '../pages/app.po';
import {browser, logging} from 'protractor';

let page: AppPage;

Before(() => {
  page = new AppPage();
});

Given('Eu estou na home', async () => {
  await page.navigateTo();
});

When('Eu faco nada', () => {});

Then('Eu deveria ver o titulo', async () => {
  expect(await page.getTitleText()).to.equal('angular-awesome-hello app is running!');
});

After(async () => {
  // Assert that there are no errors emitted from the browser
  try {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.contain(({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  } catch (e) {
    console.warn('Browser not support get logs');
  }
});
