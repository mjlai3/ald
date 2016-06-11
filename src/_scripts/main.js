// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

// Importing it in the base.jade because importing jquery here is going to the end of the file
//import $ from 'jquery';

import foundation from 'foundation-sites';

import Header from '../_modules/header/header';
import Footer from '../_modules/footer/footer';

$(() => {
	
	$(".stories__container").slick({
	    autoplay: true,
	    dots: true,
	    centerMode: true
	});

	var grid = $('.grid');

	grid.masonry({
		itemSelector: '.grid-item',
		columnWidth: 200
	});

	grid.infinitescroll({
		// Pagination element that will be hidden
		navSelector: '#pagination',

		// Next page link
		nextSelector: '#pagination p a',

		// Selector of items to retrieve
		itemSelector: '.grid-item',

		// Loading message
		loadingText: 'Loading new items…'
	},

	// Function called once the elements are retrieved
	function(new_elts) {
		var elts = $(new_elts).css('opacity', 0);

		elts.animate({opacity: 1});
		grid.masonry('appended', elts);
	});

	$(window).unbind('.infscr');

	$('.foo').click(function(){
		$('.grid').infinitescroll('retrieve');
		return false;
	});

});
