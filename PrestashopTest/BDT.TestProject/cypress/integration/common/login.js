import { Before, Given, Then } from 'cypress-cucumber-preprocessor/steps';
import data from '../../../../Prestashop.Core/fixtures/data.json'
const core = require('../../../../Prestashop.Core/scripts/Core')()
const dataGeneration = require('../../../../Prestashop.Core/scripts/Data')()

Before({ tags: "@generateData" }, () => {
  dataGeneration.generateData();
});

Given(/^I go to prestashop admin site$/, () => {
  core.openSite(data.url.admin);
});

Given(/^I log in with user (.*) and password (.*)$/, (user, password) => {
  core.LogInAsAdminUser(user, password);
});

Then(/^I go to prestashop admin site$/, () => {
  core.openSite(data.url.admin);
});

Then(/^I log in with user (.*) and password (.*)$/, (user, password) => {
  core.LogInAsAdminUser(user, password);
});