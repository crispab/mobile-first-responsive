/*global require:true, console:true*/

(function() {

	"use strict";

	require.config({
		paths:{
			'jquery':'lib/jquery',
			'jquery-mobile':'lib/jquery.mobile.custom',
			'jsrender':'lib/jsrender',
			'text':'lib/text'
		}
	});

	require(['utils', 'nav', 'jquery', 'jquery-mobile'], function(utils, nav, $) {
		utils.fixViewport(document);
		nav.initialize(utils.getURLParameter('s'));
	});
}());
