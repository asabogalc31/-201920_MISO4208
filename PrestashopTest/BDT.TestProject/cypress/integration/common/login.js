import { Before, Given, Then } from 'cypress-cucumber-preprocessor/steps';
import data from '../../../../Prestashop.Core/fixtures/data.json'
const core = require('../../../../Prestashop.Core/scripts/Core')()

Given(/^I go to prestashop admin site with the input data of position (.*)$/, (dataObject) => {
  core.openSite(data[dataObject].url.admin);
});

Given(/^I log in with user (.*) and password (.*)$/, (user, password) => {
  core.LogInAsAdminUser(user, password);
});

Then(/^I go to prestashop admin site with the input data of position (.*)$/, (dataObject) => {
  core.openSite(data[dataObject].url.admin);
});

Then(/^I log in with user (.*) and password (.*)$/, (user, password) => {
  core.LogInAsAdminUser(user, password);
});