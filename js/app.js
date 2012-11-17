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

	require(['viewportfix', 'nav', 'jquery', 'jquery-mobile'], function(vpf, nav, $) {
		vpf(document);
		nav.initialize(function() {
			// nav.navigate(0);
		});
	});
}());
