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

	// Mobile Menu Toggle
	$('.header__menu__container').click(function(){
		$('.overlay').fadeIn();
		$('.mobile__menu').fadeIn();
		$(this).css('visibility', 'hidden');
	});
	$('.mobile__menu__close__container').click(function(){
		$('.overlay').fadeOut();
		$('.mobile__menu').fadeOut();
		$('.header__menu__container').css('visibility', 'visible');
	});

	// Mobile Search Toggle
	$('.header__search').click(function(){
		$('.overlay').fadeToggle();
		$('.mobile__search__container--outer').fadeToggle();
	});

	// Mobile Subscribe Toggle
	$('.header__subscribe__link').click(function(){
		$('.overlay').fadeToggle();
		$('.mobile__subscribe__container--outer').fadeToggle();
	});

	// Toggle when overlay is clicked
	$('.overlay').click(function(){
		$('.mobile__search__container--outer').fadeOut();
		$('.mobile__menu').fadeOut();
		$('.mobile__subscribe__container--outer').fadeOut();
		$('.header__menu__container').css('visibility', 'visible');
		$(this).fadeOut();
	});

	if ($('.sticky').length) { // make sure ".sticky" element exists
		var el = $('.sticky');
		var stickyTop = $('.sticky').offset().top; // returns number
		var stickyHeight = $('.sticky').height();

		$(window).scroll(function() { // scroll event
			var limit = $('.sticky-stop').offset().top - stickyHeight - 20;

			var windowTop = $(window).scrollTop(); // returns number

			if (stickyTop < windowTop) {
				el.css({
					position: 'fixed',
					top: 0
				});
			} else {
				el.css('position', 'static');
			}

			if (limit < windowTop) {
				var diff = limit - windowTop;
				el.css({
					top: diff
				});
			}
		});
	}

	$('.contact__form input[type=submit]').click(function(){
		$(this).hide();
		$('.contact__success').show();
	});

});
