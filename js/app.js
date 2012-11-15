/*global require:true, console:true*/

(function() {

	"use strict";

	require.config({
		paths:{
			jquery:'lib/jquery',
			jsrender:'lib/jsrender'
		}
	});

	require(['nav'], function(nav) {
		nav.initialize(function() {
			// nav.navigate(0);
		});
	});
}());
