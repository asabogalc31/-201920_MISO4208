import { Then } from 'cypress-cucumber-preprocessor/steps';
import data from '../../../../Prestashop.Core/fixtures/data.json';

const core = require('../../../../Prestashop.Core/scripts/Core')();

Then(/^I go to client site with the input data of position (.*)$/, (dataObject) => {
    core.openSite(data[dataObject].url.client);
});