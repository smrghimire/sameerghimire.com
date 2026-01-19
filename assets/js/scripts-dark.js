/*
Author       : themes_master
Template Name: Nick Berg - Personal Portfolio Template
Version      : 1.0
*/

(function($) {
	'use strict';
	
	jQuery(document).on('ready', function(){
	
		/*PRELOADER JS*/
		$(window).on('load', function() { 
			$('.status').fadeOut();
			$('.preloader').delay(350).fadeOut('slow'); 
		}); 
		/*END PRELOADER JS*/
		
		/*START MENU JS*/		
		$('#main-menu').slicknav({
			label: '',
			duration: 1000,
			easingOpen: "easeOutBounce", //available with jQuery UI
			prependTo:'#mobile_menu',
			closeOnClick: true,
			easingClose:"swing", 
			easingOpen:"swing", 
			openedSymbol: "+",
			closedSymbol: "-" 	
		});			

			if ($(window).scrollTop() > 200) {
			  $('.fixed-top').addClass('menu-bg');
		  } else {
			  $('.fixed-top').removeClass('menu-bg');
		  }
			$(window).on('scroll', function(){
				if ( $(window).scrollTop() > 70 ) {
					$('.site-navigation, .header-white, .header').addClass('navbar-fixed');
				} else {
					$('.site-navigation, .header-white, .header').removeClass('navbar-fixed');
				}
			});		  	
		/*END MENU JS*/	

		/*START SKILL JS*/
		$(function() {
			$(".skill-knob").knob({
				'min':0,
				'max':100,
				'width': 120,
				'height': 120,
				'readOnly': true,
				'lineCap': 'round',
				'displayPrevious': true,
				'angleOffset': 0,
				'bgColor': '#f9f9f9',
				'fgColor': '#2ca46d',
				'thickness': 0.15
			});
					
			/* Skill way point */
			$('.skill-item').waypoint(function(down){
				$('.skill-knob').each(function(){
				var $skill_knob = $(this);
					
					// Check knob value
					if($skill_knob.val() == 0){
						$({value: 0}).animate({value: $skill_knob.attr("data-end")}, {
							duration: 2000,
							easing:'swing',
							step: function() 
							{
								$skill_knob.val(Math.ceil(this.value)).trigger('change');
								$skill_knob.val($skill_knob.val() + '%');
							}
						})
					}
				});
			}, { offset: '90%' });
		});	
		/*END SKILL JS*/	

		$('.portfolio_item').mixItUp({
		
		});			

		/* START SERVICE JS */
		 $("#sp-slider").owlCarousel({
				items:3,
				itemsDesktop:[1199,3],
				itemsDesktopSmall:[979,2],
				itemsTablet:[768,2],
				itemsMobile:[600,1],
				pagination: false,
				navigation:true,
				navigationText:["",""],
				slideSpeed:1000,
				autoPlay:false
			});
		/* END SERVICE JS */

		/* START EXPERIENCE TABS JS */
		$('.exp-tab').on('click', function () {

			// Remove active state from all tabs
			$('.exp-tab').removeClass('active');

			// Hide all experience sections
			$('.experience-content').removeClass('active');

			// Activate clicked tab
			$(this).addClass('active');

			// Show corresponding content
			const target = $(this).data('target');
			$('#' + target).addClass('active');

		});
		/* END EXPERIENCE TABS JS */

		/* START REFERRALS */
		$(".curated-carousel").owlCarousel({
			items: 3,
			itemsDesktop: [1199, 3],
			itemsDesktopSmall: [979, 2],
			itemsTablet: [768, 2],
			itemsMobile: [600, 1],
			pagination: false,
			navigation: true,
			navigationText: ["",""],
			slideSpeed: 1000,
			autoPlay: false
		});
		/* END REFERRALS */

		/*START TESTIMONIAL*/
		$("#testimonial-slider").owlCarousel({
			items:3,
			itemsDesktop:[1000,3],
			itemsDesktopSmall:[979,2],
			itemsTablet:[768,2],
			pagination:true,
			transitionStyle:"backSlide",
			autoPlay:true
		});
		/*END TESTIMONIAL*/		
		
		/* START CONTACT FORM AJAX */
		$('#contact-form').on('submit', function (e) {
			e.preventDefault(); // stop page reload

			const form = this;
			const formData = new FormData(form);

			fetch(form.action, {
				method: 'POST',
				body: formData,
				headers: {
				'Accept': 'application/json'
				}
			})
			.then(response => {
				if (response.ok) {
					$('#success-overlay').removeClass('hidden');
					form.reset(); // clear all fields

					// Optional: auto-close after 3 seconds
					setTimeout(function () {
						$('#success-overlay').addClass('hidden');
					}, 3000);

				} else {
					alert('Oops! Something went wrong. Please try again.');
				}

			})
			.catch(() => {
				alert('Network error. Please try again later.');
			});
		});
		/* END CONTACT FORM AJAX */

		function getAverageEdgeColor(img) {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	const size = 64;
	canvas.width = size;
	canvas.height = size;

	ctx.drawImage(img, 0, 0, size, size);

	const imageData = ctx.getImageData(0, 0, size, size).data;

	let r = 0, g = 0, b = 0, count = 0;

	// sample edge pixels only
	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			const isEdge =
				x < 6 || x > size - 7 || y < 6 || y > size - 7;

			if (!isEdge) continue;

			const i = (y * size + x) * 4;
			const alpha = imageData[i + 3];

			// ignore transparent pixels
			if (alpha < 100) continue;

			r += imageData[i];
			g += imageData[i + 1];
			b += imageData[i + 2];
			count++;
		}
	}

	if (count === 0) return 'transparent';

	r = Math.round(r / count);
	g = Math.round(g / count);
	b = Math.round(b / count);

	return `rgb(${r}, ${g}, ${b})`;
}

function applyLogoBackgrounds() {
	document.querySelectorAll('.referral-logo img').forEach(img => {

		// Ensure image is loaded
		if (!img.complete) {
			img.onload = () => applyLogoBackgrounds();
			return;
		}

		try {
			const color = getAverageEdgeColor(img);
			img.parentElement.style.backgroundColor = color;
		} catch (e) {
			// Fail silently (CORS or SVG edge cases)
			console.warn('Logo color detection failed:', img.src);
		}
	});
}

// Run after page load
window.addEventListener('load', applyLogoBackgrounds);

	}); 			
		
	/*START WOW ANIMATION JS*/
	  new WOW().init();	
	/*END WOW ANIMATION JS*/		
			
})(jQuery);


  

