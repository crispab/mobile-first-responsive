/*global require:true, console:true*/

(function() {

	"use strict";

	require.config({
		paths:{
			'underscore':'lib/lodash.min',
			'jquery':'lib/jquery',
			'jquery-mobile':'lib/jquery.mobile.custom',
			'text':'lib/text'
		}
	});

	require(['utils', 'nav', 'jquery'], function(utils, nav, $) {
		$(function() {
			utils.fixViewport(document);
			nav.initialize(utils.getURLParameter('s'));
		});
	});
}());
