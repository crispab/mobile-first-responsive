/*global define:true, console:true*/

(function() {

	"use strict";

	define(['jquery', 'index'], function($, Index) {

		var contentSel = "#content",
			leftSel = "#nav-left",
			rightSel = "#nav-right",
			indices = [],
			currentIndex = 0,
			navigate = function(index) {
				console.log('indices: ' + indices);
				currentIndex = index;
				indices[currentIndex].load(contentSel);
			},
			loadIndices = function(cb) {
				$.getJSON('slides/index.json', function(data) {
					$.each(data.slides, function(key, val) {
						indices.push(new Index(val));
						console.log('indices: ' + indices);
					});
					cb();
				});
			},
			bind = function() {
				$(leftSel).on('click', function(e) {
					e.preventDefault();
					navigate(currentIndex > 0 ? currentIndex - 1 : indices.length - 1);
				});
				$(rightSel).on('click', function(e) {
					e.preventDefault();
					navigate(currentIndex < indices.length - 1 ? currentIndex + 1 : 0);
				});
			},
			initialize = function(cb) {
				loadIndices(function() {
					bind();
					cb();
				});
			};


		return {
			initialize:initialize,
			navigate:navigate
		};

	});
}());
