import { Then } from 'cypress-cucumber-preprocessor/steps';
import dataClient from '../../../../E2E/cypress/fixtures/data.json';

const core = require('../../../../Prestashop.Core/Core')();

Then(/^I go to client site$/, () => {
    core.openSite(dataClient.url);
});