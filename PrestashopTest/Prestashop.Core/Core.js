module.exports = function() {
	/**
	 * Open the browser with the prestashop url
	 */
	function openSite(){
		cy.visit('http://172.24.41.140/PrestaShop/es/')
	}

	/**
	 * Select a menu option
	 * @param {String} menuItem
	 * @param {String} subMenu 
	 */
	function selectMenu(menuItem, subMenu){
		if(menuItem !== "" && menuItem !== null) {
			var menu = cy.get('#top-menu')
			.find('a')
			.contains(menuItem);

			// Selects the sub-menu
			if (subMenu !== "" && subMenu !== null) {
				cy.get('#top-menu')
				.find('a')
				.contains(subMenu)
				.trigger('show', {force:true})
				.click({force:true});
				return;
			}
			
			menu.click();
		}
	}

	/**
	 * Get the match with the pattern specified
	 * @param {String} pattern The regular expression
	 * @param {String} text The text to analyze
	 */
    function getMatchWithPattern(pattern, text) {
        return text.match(pattern).toString();
    }

    return {
        openSite: openSite,
		selectMenu: selectMenu,
		getMatchWithPattern: getMatchWithPattern
    };
}