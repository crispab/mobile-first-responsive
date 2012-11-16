/*global require:true, console:true*/

(function() {

	"use strict";

	require.config({
		paths:{
			'jquery':'lib/jquery',
			'jquery-mobile':'lib/jquery.mobile.custom',
			'jsrender':'lib/jsrender'
		}
	});

	require(['nav', 'jquery', 'jquery-mobile'], function(nav, $) {
		nav.initialize(function() {
			// nav.navigate(0);
		});
	});
}());
