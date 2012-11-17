/*global define:true, console:true*/

(function() {

	"use strict";

	define(['index', 'jquery', 'jsrender', 'jquery-mobile'], function(Index, $) {

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
				});
			},
			createNavLink = function(id, label) {
				var markup = $.render.linkTemplate({id:id, label:label});
				$(contentSel).after(markup);
			},
			createNavMarkup = function() {
				createNavLink(rightNavId, 'Next');
				createNavLink(leftNavId, 'Previous');
			},
			parseTemplates = function(data) {
				$.templates({'linkTemplate':data.linkTemplate, 'titleTemplate':data.titleTemplate});
			},
			loadNavMetaData = function(cb) {
				$.getJSON('slides/index.json', function(data) {
					parseTemplates(data);
					createIndex(data.slides);
					createNavMarkup();
					cb();
				});
			},
			nextPage = function() {
				return currentIndex < indices.length - 1 ? currentIndex + 1 : 0;
			},
			prevPage = function() {
				return currentIndex > 0 ? currentIndex - 1 : indices.length - 1;
			},
			setUpNavigation = function() {
				$(leftSel).on('click', function(e) {
					e.preventDefault();
					navigate(prevPage());
				});
				$(rightSel).on('click', function(e) {
					e.preventDefault();
					navigate(nextPage());
				});
				$(document).on('swipeleft', function(e) {
					e.preventDefault();
					navigate(prevPage());
				});
				$(document).on('swiperight', function(e) {
					e.preventDefault();
					navigate(nextPage());
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
