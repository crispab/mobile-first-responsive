/*global define:true, console:true*/

(function() {

	"use strict";

	define(['jquery'], function($) {
		var Index = function(data) {
			this.title = data.title;
			this.templatedTitle = $.render.titleTemplate({title:this.title});
			this.url = data.url;
		};
		Index.prototype.toString = function() {
			return 'Index(' + this.title + ', ' + this.url + ')';
		};
		Index.prototype.load = function(sel) {
			var that = this, title = $('head title');
			console.log('load: ' + this.toString());
			title.text('Loading ' + this.title + '...');
			$.get(this.url, function(data) {
				$(sel).html(data);
				title.text(that.templatedTitle);
			});
		};
		return Index;
	});
}());
