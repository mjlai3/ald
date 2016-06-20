// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

// Importing it in the base.jade because importing jquery here is going to the end of the file
//import $ from 'jquery';

import foundation from 'foundation-sites';

import Header from '../_modules/header/header';
import Footer from '../_modules/footer/footer';
import Subscribe from '../_modules/subscribe/subscribe';

$(() => {
	
	$(".slick__container--index").slick({
	    //autoplay: true,
	    slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		infinite: true,
		dots: true,
		centerMode: true,
		focusOnSelect: true,
		variableWidth: true,
		appendDots: '.slick__container--index',
		appendArrows: '.slick__container--index__arrow',
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					dots: false
				}
			}
		]
	});

	$(".slick__container--standard").slick({
		infinite: false,
		variableWidth: true,
		swipeToSlide: true,
		touchThreshold: 100
	});

	$("header").headroom({
		"offset": 0,
		"tolerance": 5
	});

	var grid = $('.grid');

	// grid.packery({
	// 	itemSelector: '.grid-item',
	// 	gutter: '.gutter-sizer',
	// 	rowHeight: 480
	// });

	grid.masonry({
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
		gutter: '.gutter-sizer',
		percentPosition: true
	});

	grid.infinitescroll({
		// Pagination element that will be hidden
		navSelector: '.article__pagination',

		// Next page link
		nextSelector: '.article__pagination p a',

		// Selector of items to retrieve
		itemSelector: '.grid-item',

		// Loading message
		loadingText: 'Loading new items…'
	},

	// Function called once the elements are retrieved
	function(new_elts) {

		// This gives a fade in effect, but it makes masonry jump flicker
		// var elts = $(new_elts).css('opacity', 0);
		// elts.animate({opacity: 1});

		// Smoother
		var elts = $(new_elts);
		elts;

		grid.masonry('appended', elts);

		$( ".filter__checkbox" ).trigger( "change" );
	});

	$(window).unbind('.infscr');

	$('.article__more').click(function(){
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

	    // Uncheck All
	    $('.filter__checkbox[value="all"]').prop('checked', false);

	    // Show all items if none of the other filters are checked
	    if(!$('.filter__checkbox[value="fitness"]').is(":checked") && !$('.filter__checkbox[value="food"]').is(":checked") && !$('.filter__checkbox[value="lifestyle"]').is(":checked")){
	    	$('.filter__checkbox[value="all"]').prop('checked', true);
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

	// Header maintain header width
	if($('.header__right__container').width() > $('.header__menu__container').width()){
		$('.header__menu__container').width($('.header__right__container').width())
	}
	else{
		$('.header__right__container').width($('.header__menu__container').width())
	}

	$(window).resize(function(){
		$('.header__right__container').css('width', 'auto');
		$('.header__menu__container').css('width', 'auto');
		if($('.header__right__container').width() > $('.header__menu__container').width()){
			$('.header__menu__container').width($('.header__right__container').width())
		}
		else{
			$('.header__right__container').width($('.header__menu__container').width())
		}
	});

});
