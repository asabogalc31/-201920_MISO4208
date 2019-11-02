import { Then } from 'cypress-cucumber-preprocessor/steps';
import dataClient from '../../../../E2E.TestProject/cypress/fixtures/data.json';

const core = require('../../../../Prestashop.Core/scripts/Core')();

Then(/^I go to client site$/, () => {
    core.openSite(dataClient.url);
});