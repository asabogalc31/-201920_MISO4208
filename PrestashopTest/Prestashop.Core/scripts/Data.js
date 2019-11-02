module.exports = function() {
    var Mockaroo = require('mockaroo');

	/**
	 * Generate data with a json structure
	 */
	function generateData(){
        var client = new Mockaroo.Client({
            apiKey: '34342b90'
        })
        var records = client.generate({
            count: 1,
            schema: 'dataPrestashop'
        })

        cy.writeFile("../Prestashop.Core/fixtures/data.json", records);
	}
    return {
        generateData: generateData
    };
}