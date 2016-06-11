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

		$( ".filter__checkbox" ).trigger( "change" );
	});

	$(window).unbind('.infscr');

	$('.foo').click(function(){
		$('.grid').infinitescroll('retrieve');
		return false;
	});

	$(".filter__checkbox").change(function() {

		// Show all items if All is checked
	    if(this.checked) {
	        if($(this).val() === 'all'){
	        	$(".filter__checkbox").prop('checked', false);
	        	$(this).prop('checked', true);
	        	$('.grid-item').show();
	        	grid.masonry();
	        	return;
	        }
	    }

	    // Show all items if none of the other filters are checked
	    if(!$('.filter__checkbox[value="fitness"]').is(":checked") && !$('.filter__checkbox[value="food"]').is(":checked") && !$('.filter__checkbox[value="lifestyle"]').is(":checked")){
	    	$('.grid-item').show();
	    	grid.masonry();
	    	return;
	    }

	    // Only show category checked
	    $('.filter__checkbox').each(function(){
	    	if($(this).is(":checked")){
	    		$('.grid-item.' + $(this).val()).show();
	    	}
	    	else{
	    		$('.grid-item.' + $(this).val()).hide();
	    	}
	    });

	    // Finally, layout masonry again
	    grid.masonry();

	});

});
