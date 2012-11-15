/*global define:true, console:true*/

(function() {

	"use strict";

	define(['jquery'], function($) {
		var Index = function(data) {
			this.title = data.title;
			this.templatedTitle = $.render.titleTemplate({title:this.title});
			this.url = data.url;
			if (data.selector) {
				this.text = $(data.selector).text();
			}
		};
		Index.prototype._renderSlide = function(sel, data) {
			console.log('markup: ' + data);
			$(sel).html(data);
			$('head title').text(this.templatedTitle);
		};
		Index.prototype.toString = function() {
			return 'Index(' + this.title + ', ' + this.url + ', ' + this.selector +')';
		};
		Index.prototype.load = function(sel) {
			var that = this;
			console.log('load: ' + this.toString());
			$('head title').text('Loading ' + this.title + '...');
			if (this.text) {
				console.log('markup: ' + this.text);
				this._renderSlide(sel, this.text);
			} else {
				$.get(this.url, function(data) {
					that._renderSlide(sel, data);
					that.text = data;
				});
			}
		};
		return Index;
	});
}());
