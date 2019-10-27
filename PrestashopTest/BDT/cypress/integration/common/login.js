import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import data from '../../fixtures/data.json'
const core = require('../../../../Prestashop.Core/Core')()

Given(/^I go to prestashop site$/, () => {
  core.openSite(data.url);
});

Given(/^I log in with user (.*) and password (.*)$/, (user, password) => {
  core.LogInAsAdminUser(user, password);
});

Then(/^I go to prestashop site$/, () => {
  core.openSite(data.url);
});

Then(/^I log in with user (.*) and password (.*)$/, (user, password) => {
  core.LogInAsAdminUser(user, password);
});