/*global define:true, console:true*/

(function() {

	"use strict";

	define(['index', 'jquery', 'jsrender'], function(Index, $) {

		var contentSel = "#content",
			leftNavId = "nav-left",
			leftSel = "#" + leftNavId,
			rightNavId = "nav-right",
			rightSel = "#" + rightNavId,
			indices = [],
			currentIndex = 0,
			navigate = function(index) {
				console.log('indices: ' + indices);
				currentIndex = index;
				indices[currentIndex].load(contentSel);
			},
			createIndex = function(slides) {
				$.each(slides, function(key, val) {
					indices.push(new Index(val));
					console.log('indices: ' + indices);
				});
			},
			createNavLink = function(id, label) {
				var markup = $.render.linkTemplate({id:id, label:label});
				$('body').append(markup);
			},
			createNavMarkup = function() {
				createNavLink(leftNavId, 'Left');
				createNavLink(rightNavId, 'Right');
			},
			parseTemplates = function(data) {
				$.templates({'linkTemplate':data.linkTemplate,
							'titleTemplate':data.titleTemplate});
			},
			loadNavMetaData = function(cb) {
				$.getJSON('slides/index.json', function(data) {
					parseTemplates(data);
					createIndex(data.slides);
					createNavMarkup();
					cb();
				});
			},
			setUpNavigation = function() {
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
				loadNavMetaData(function() {
					setUpNavigation();
					cb();
				});
			};


		return {
			initialize:initialize,
			navigate:navigate
		};

	});
}());
