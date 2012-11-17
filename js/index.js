/*global define:true*/

(function() {

	"use strict";

	define(['jquery'], function($) {
		var Index = function(data) {
			var title;
			if (data.selector) {
				this.html = $(data.selector).html();
				title = $(data.titleSelector).html();
				this.title = $.render.titleTemplate({title:title});
			} else {
				this.html = $.render.slideTemplate(data);
				this.title = $.render.titleTemplate({title:data.title});
			}
		};
		Index.prototype.toString = function() {
			return 'Index(' + this.title + ')';
		};
		Index.prototype.render = function(sel) {
			$(sel).html(this.html);
			$('head title').text(this.templatedTitle);
		};
		return Index;
	});
}());
