/* my custom scripts */


jQuery(document).ready(function() {
    initNavbar();
    initAnimations();	
    initMandrillCallback();
    initMandrillRequest();
    initLightbox();
});

jQuery(window).load(function () {
   $(".loader .fading-line").fadeOut();
   $(".loader").fadeOut("slow");
});

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
					"subject" : "callback",
					"html" : "<p><ul><li>" + name + "</li><li>" + tel + "</li>" + 
							 "<li>" + topic + "</li></ul></p>"
				},
				"async" : false
			}
		})
		.done(function(response) {
			alert('Ваш запрос был успешно отправлен!');
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

function initMandrillRequest() {
	
	$("#mandrill-request").click(function() {
		var type = $("#modal-profile-type").val();
		var size = $("#modal-profile-size").val();
		var amount = $("#modal-profile-amount").val();
		var desc = $("#modal-profile-desc").val();

		$.ajax({
			type : "POST",
			url : "https://mandrillapp.com/api/1.0/messages/send.json",
			data : {
				"key" : "qbZ25AmbFMErdHQuer62LQ",
				"message" : {
					"from_email" : "request@subzerokz.github.io",
					"from_name" : "request",
					"to" : [ {
						"email" : "subzero.kz@yandex.ru",
						"type" : "to"
					} ],
					"autotext" : "true",
					"subject" : "request",
					"html" : "<p><ul><li>Тип профиля :" + type + "</li><li>Размеры: " + size + "</li>" + 
							 "<li>Количество: " + amount + "</li><li>Примечание: " + desc + "</li></ul></p>"
				},
				"async" : false
			}
		})
		.done(function(response) {
			alert('Ваш заявка была успешно отправлен!');
			// reset field after successful submission
			type.val('');
			size.val('');
			amount.val('');
			desc.val('');
		})
		.fail(function(response) {
			alert('Во время отправки заявки произошла ошибка.');
		});
		
		//return false; // prevent page refresh
	});
}

function initLightbox() {
	
    /* show lightbox when clicking a thumbnail */
    $('a.thumb').click(function(event){
    	event.preventDefault();
    	var content = $('.modal-body').filter("#modal-label-profile");
    	console.log(content);
    	content.empty();
      	var title = $(this).attr("title");
      	$('.modal-title').filter("#modal-label-profile").html("Профиль " + title);      	
      	content.html($(this).html());
      	$("#modal-profile-lg").modal('toggle');
    });
}