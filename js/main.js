// createDropDown() - Replaces select menus with style selects
function createDropDown() {
	var selects = $("select.dropdown_value");
	var idCounter = 1;
	selects.each(function() {
		var dropID = "dropdown_" + idCounter;
		var source = $(this);
		var selected = source.find("option[selected]");
		var options = $("option", source);
		source.after('<dl id="' + dropID + '" class="dropdown"></dl>');
		$("#" + dropID).append('<dt><a href="#" class="pulldown"><span class="disp">' + selected.text() + '</span><span class="value">' + selected.val() + '</span></a><a href="#" class="pulldownarrow">&nbsp;</a></dt>');
		$("#" + dropID).append('<dd><ul></ul></dd>');
		options.each(function() {
			$("#" + dropID + " dd ul").append('<li><a href="#">' + $(this).text() + '<span class="value">' + $(this).val() + '</span></a></li>');
		});
		idCounter++;
	});
} 

$(document).ready(function() {
	/* HOME PAGE */
	// start home page JS
	// Make visible the captions that were hidden on load 
	$(".caption").show("slow");
        	
	// Initialize slideshow
	// Uses slides.min.jquery.js
    $("#homeslidesimage").slides({
    	preload: true,
		fadeSpeed: 1000,
    	//effect: 'fade',
		play: 10000,
		pause: 2500,
		paginationClass: 'slidepagination',
		hoverPause: true,
		animationStart: function(current){
			$('.caption').animate({
				left:-1500
			},600);
			
		},
		animationComplete: function(current){
			$('.caption').animate({
				left: 0
			},1000);
		},
		slidesLoaded: function() {
			$('.caption').animate({
				left: 0
			},600);
		}

    });
	// Initialize slide in bottom modules
    $("#homemodule1").slides({
		generatePagination: true,
		play: 8000,
    	effect: 'fade',
		generateNextPrev: false
    });
    $("#homemodule2").slides({
		generatePagination: true,
		play: 8000,
    	effect: 'fade',
		generateNextPrev: false
    });
	// end home page JS

	// Call function to replace standard select menus with 
	// styled select menus
    createDropDown();

	// Bind JS to styled select menus
	// start select menu JS
	$(".dropdown dt a").click(function(event) {
		event.preventDefault();
		var dropID = $(this).closest("dl").attr("id");
		$("#" + dropID).find("ul").toggle();
	});

	$(document).bind('click', function(e) {
		var $clicked = $(e.target);
		if (! $clicked.parents().hasClass("dropdown"))
		$(".dropdown dd ul").hide();
	});


	$(".dropdown dd ul a").click(function(event) {
		var dl = $(this).closest("dl");
		var dropID = dl.attr("id");
		var text = $(this).html();
		var source = dl.prev();
		$("#" + dropID + " dt a span.disp").html(text);
		$("#" + dropID + " dd ul").hide();
		source.val($(this).find("span.value").html())
		event.preventDefault();
	});
	// end select menu JS

	/* AD CAMPAIGNS */
	jQuery("ul.ads li").each(function(){
		jQuery(this).hover(function(){
			$(this).find('.over').hide();
			jQuery(this).animate({width: "407px"}, 200, "linear", function() { $(this).find('.over').hide() });
		}, function() {
			if($(this).hasClass('last')) {
				w = 115;
			}
			else {
				w = 55;
			}
			jQuery(this).animate({width: w+ "px"}, 200, "linear", function() { $(this).find('.over').show() });
		});
	});
});

