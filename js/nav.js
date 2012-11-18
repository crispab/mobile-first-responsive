/*global define:true, console:true*/

(function() {

	"use strict";

	define(['index', 'jquery', 'jsrender', 'jquery-mobile'], function(Index, $) {

		var contentSel = "#slide",
			prevNavId = "nav-prev",
			prevSel = "#" + prevNavId,
			nextNavId = "nav-next",
			nextSel = "#" + nextNavId,
			indices = [],
			currentIndex = 0,
			navigate = function(index) {
				console.log('indices: ' + indices);
				currentIndex = Number(index);
				indices[currentIndex].render(contentSel);
			},
			createIndex = function(slides) {
				$.each(slides, function(key, val) {
					indices.push(new Index(val));
				});
			},
			createNavLink = function(id, label) {
				var markup = $.render.linkTemplate({id:id, label:label});
				$(contentSel).after(markup);
			},
			createNavMarkup = function() {
				createNavLink(nextNavId, 'Next');
				createNavLink(prevNavId, 'Previous');
			},
			parseTemplates = function(data) {
				$.templates({linkTemplate:data.linkTemplate, titleTemplate:data.titleTemplate, slideTemplate:data.slideTemplate});
			},
			nextPage = function() {
				return currentIndex < indices.length - 1 ? currentIndex + 1 : 0;
			},
			prevPage = function() {
				return currentIndex > 0 ? currentIndex - 1 : indices.length - 1;
			},
			setUpNavigation = function() {
				var prev = function(e) {
					e.preventDefault();
					navigate(prevPage());
				}, next = function(e) {
					e.preventDefault();
					navigate(nextPage());
				};
				$(prevSel).on('click', prev);
				$(nextSel).on('click', next);
				$(document).on('swipeleft', next);
				$(document).on('swiperight', prev);
			},
			loadNavMetaData = function(slide) {
				$.getJSON('index.json', function(data) {
					parseTemplates(data);
					createIndex(data.slides);
					createNavMarkup();
					setUpNavigation();
					if (slide) {
						navigate(slide);
					}
				});
			},
			initialize = function(slide) {
				loadNavMetaData(slide);
			};


		return {
			initialize:initialize,
			navigate:navigate
		};

	});
}());
