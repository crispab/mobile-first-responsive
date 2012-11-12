/*global require:true, console:true*/

(function() {

	"use strict";

	require.config({
		paths:{
			jquery:'lib/jquery'
		}
	});

	require(['nav'], function(nav) {
		nav.initialize(function() {
			nav.navigate(0);
		});
	});
}());
