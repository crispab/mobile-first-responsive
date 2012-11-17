/*global define:true*/

(function() {

	// "use strict";

	define(['jquery'], function($) {
		var Index = function(data) {
			this.title = data.title;
			this.templatedTitle = $.render.titleTemplate({title:this.title});
			this.url = data.url;
			if (data.selector) {
				this.html = $(data.selector).html();
			}
		};
		Index.prototype._renderSlide = function(sel, data) {
			$(sel).html(data);
			$('head title').text(this.templatedTitle);
		};
		Index.prototype.toString = function() {
			return 'Index(' + this.title + ', ' + this.url + ')';
		};
		Index.prototype.load = function(sel) {
			var that = this;
			$('head title').text('Loading ' + this.title + '...');
			if (this.html) {
				this._renderSlide(sel, this.html);
			} else {
				$.get(this.url, function(data) {
					that._renderSlide(sel, data);
					that.html = data;
				});
			}
		};
		return Index;
	});
}());
