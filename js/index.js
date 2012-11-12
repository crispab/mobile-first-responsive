/*global define:true, console:true*/

(function() {

	"use strict";

	define(['jquery'], function($) {
		var Index = function(data) {
			this.title = data.title;
			this.url = data.url;
		};
		Index.prototype.toString = function() {
			return 'Index(' + this.title + ', ' + this.url + ')';
		};
		Index.prototype.load = function(sel) {
			var that = this;
			console.log('load: ' + this.toString());
			$('head title').text('Loading ' + this.title + '...');
			$.get(this.url, function(data) {
				$(sel).html(data);
				$('head title').text(that.title);
			});
		};
		return Index;
	});
}());
