/*global require:true, console:true*/

(function() {

	// "use strict";

	require.config({
		paths:{
			'jquery':'lib/jquery',
			'jquery-mobile':'lib/jquery.mobile.custom',
			'jsrender':'lib/jsrender'
		}
	});

	require(['utils', 'nav', 'jquery', 'jquery-mobile'], function(utils, nav, $) {
		$('#slide').hide();
		utils.fixViewport(document);
		nav.initialize(utils.getURLParameter('s'));
	});
}());
