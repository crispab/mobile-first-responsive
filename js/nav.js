/*global define:true, console:true*/

(function() {

	"use strict";

	define(['index', 'jquery', 'underscore', 'text!../index.json', 'jquery-mobile'], function(Index, $, _, indexDataStr) {
		var contentSel = '#slide',
			prevNavId = 'nav-prev',
			prevSel = '#' + prevNavId,
			nextNavId = 'nav-next',
			nextSel = '#' + nextNavId,
			footerSel = '#pageFooter',
			slideCountId = 'slideCount',
			indexData = $.parseJSON(indexDataStr),
			templates = {},
			indices = [],
			currentIndex = 0,
			updateSlideCount = function(index) {
				var markup = templates.slideCountTemplate({current:currentIndex + 1, total:indices.length});
				$('#' + slideCountId).html(markup);
			},
			navigate = function(index) {
				currentIndex = Number(index);
				indices[currentIndex].render(contentSel);
				updateSlideCount();
			},
			createIndex = function(slides) {
				$.each(slides, function(key, val) {
					indices.push(new Index(val, templates));
				});
			},
			createNavLink = function(id, label) {
				var markup = templates.linkTemplate({id:id, label:label});
				$(contentSel).after(markup);
			},
			createNavMarkup = function() {
				createNavLink(nextNavId, 'Next');
				createNavLink(prevNavId, 'Previous');
			},
			createSlideCountMarkup = function() {
				$('<div>', {id:slideCountId}).insertBefore(footerSel);
				updateSlideCount();
			},
			parseTemplates = function(data) {
				templates.linkTemplate = _.template(data.linkTemplate);
				templates.titleTemplate = _.template(data.titleTemplate);
				templates.slideTemplate = _.template(data.slideTemplate);
				templates.slideCountTemplate = _.template(data.slideCountTemplate);
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
				$(document).on('keyup', function(e) {
					if (e.keyCode === 37) {
						prev(e);
					} else if (e.keyCode === 39) {
						next(e);
					}
					e.preventDefault();
				});
			},
			configureSwipeThresholds = function() {
				$.event.special.swipe.verticalDistanceThreshold = 30;
			},
			loadNavMetaData = function(slide) {
				parseTemplates(indexData);
				createIndex(indexData.slides);
				createNavMarkup();
				createSlideCountMarkup();
				setUpNavigation();
				if (slide) {
					navigate(slide);
				}
				configureSwipeThresholds();
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
