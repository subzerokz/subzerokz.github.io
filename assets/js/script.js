function initNavbar() {

    var scrollSpeed = 750;
    var scrollOffset = 50;
    var easing = 'swing';

    $('#navbar-top .navbar-default ul.nav').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: scrollSpeed,
        scrollOffset: scrollOffset,
        scrollThreshold: 0.5,
        filter: ':not(.external)',
        easing: easing
    });

    $('.nav-external').click(function (e) {
        e.preventDefault();
        $('html, body').stop().animate({
            scrollTop: $($(this).attr("href")).offset().top - scrollOffset
        }, scrollSpeed, easing);
    });

    $('#navbar-top .navbar-default').affix({
        offset: {
            top: $('#home').height()
        }
    });
}
function initPortfolio () {
//    var portfolio = $('#portfolio');
//    var items = $('.items', portfolio); 
//    var filters = $('.filters li a', portfolio); 
//
//    items.imagesLoaded(function() {
//        items.isotope({
//            itemSelector: '.item',
//            layoutMode: 'fitRows',
//            transitionDuration: '0.7s'
//        });
//    });
//    
//    filters.click(function(){
//        var el = $(this);
//        filters.removeClass('active');
//        el.addClass('active');
//        var selector = el.attr('data-filter');
//        items.isotope({ filter: selector });
//        return false;
//    });   
}
function initAnimations() {
    $('.animated').appear(function () {
        var el = $(this);
        var animation = el.data('animation');
        var delay = el.data('delay');
        if (delay) {
            setTimeout(function () {
                el.addClass(animation);
                el.addClass('showing');
                el.removeClass('hiding');
            }, delay);
        } else {
            el.addClass(animation);
            el.addClass('showing');
            el.removeClass('hiding');
        }
    }, {
        accY: -60
    });

    // Service hover animation
	$('.service').hover(function(){
		$('i', this).addClass('animated tada');
	},function(){	
        $('i', this).removeClass('animated tada');
	});
}
function initMandrillCallback() {
	
	$("#mandrill-callback").click(function() {
		var name = $("#modal-name").val();
		var tel = $("#modal-tel").val();
		var topic = $("#modal-topic").val();

		$.ajax({
			type : "POST",
			url : "https://mandrillapp.com/api/1.0/messages/send.json",
			data : {
				"key" : "qbZ25AmbFMErdHQuer62LQ",
				"message" : {
					"from_email" : "callback@subzerokz.github.io",
					"from_name" : "callback",
					"to" : [ {
						"email" : "subzero.kz@yandex.ru",
						"type" : "to"
					} ],
					"autotext" : "true",
					"subject" : "callback: " + topic,
					"html" : "<p><ul><li>" + name + "</li><li>" + tel + "</li>" + 
							 "<li>" + topic + "</li></ul></p>"
				},
				"async" : false
			}
		})
		.done(function(response) {
			alert('Ваш запрос был отправлен!');
			// reset field after successful submission
			$("#modal-name").val('');
			$("#modal-tel").val('');
			$("#modal-topic").val('');
		})
		.fail(function(response) {
			alert('Во время отправки запроса произошла ошибка.');
		});
		
		//return false; // prevent page refresh
	});
}

$(document).ready(function () {
    initNavbar();
    initPortfolio();
    initAnimations();
    initMandrillCallback();
});

$(window).load(function () {
    $(".loader .fading-line").fadeOut();
    $(".loader").fadeOut("slow");
});
