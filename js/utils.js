/*global define:true, decodeURIComponent:true, RegExp:true, location:true*/

(function() {

	"use strict";

	define(function() {
		return {

			getURLParameter: function(name) {
				try {
					return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[""])[1].replace(/\+/g, '%20'))||null;
				} catch(e) {
					return null;
				}
			},

			fixViewport: function(doc) {
				var addEvent = 'addEventListener',
					type = 'gesturestart',
					qsa = 'querySelectorAll',
					scales = [1, 1],
					meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

				function fix() {
					meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
					doc.removeEventListener(type, fix, true);
				}

				if ((meta = meta[meta.length - 1]) && addEvent in doc) {
					fix();
					scales = [0.25, 1.6];
					doc[addEvent](type, fix, true);
				}
			}

		};
	});
}());
