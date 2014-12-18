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
					"from_name" : "обратный звонок",
					"to" : [ {
						"email" : "subzero.kz@yandex.ru",
						"type" : "to"
					} ],
					"autotext" : "true",
					"subject" : "callback",
					"html" : "<h2>Обратный звонок</h2>" +
					"<ul><li><b>Имя</b>: " + name + "</li>" +
					"<li><b>Телефон</b>: " + tel + "</li>" +
					"<li><b>Тема</b>: " + topic + "</li></ul>"
				},
				"async" : false
			}
		})
		.done(function(response) {
			alert('Ваш запрос был успешно отправлен!');
			// reset field after successful submission
			name.val('');
			tel.val('');
			topic.val('');
		})
		.fail(function(response) {
			alert('Во время отправки запроса произошла ошибка.');
		});
		
		//return false; // prevent page refresh
	});
}

function initMandrillRequest() {
	
	$("#mandrill-request").click(function() {
		var name = $("#modal-req-name").val();
		var tel = $("#modal-req-tel").val();
		var addr = $("#modal-req-addr").val();
		var type = $("#modal-profile-type").val();
		var size = $("#modal-profile-size").val();
		var amount = $("#modal-profile-amount").val();
		var desc = $("#modal-profile-desc").val();

		$.ajax({
			type : "POST",
			url : "https://mandrillapp.com/api/1.0/messages/send.json",
			data : {
				"key" : "-mafh-KcxBX7xBZ_0QGnNw",
				"message" : {
					"from_email" : "request@subzerokz.github.io",
					"from_name" : "Заявка",
					"to" : [ {
						"email" : "subzero.kz@yandex.ru",
						"type" : "to"
					} ],
					"autotext" : "true",
					"subject" : "request",
					"html" : "<h2>Контакты</h2>" +
					"<ul><li><b>Имя</b>: " + name + "</li>" +
					"<li><b>Телефон</b>: " + tel + "</li>" +
					"<li><b>Адрес</b>: " + addr + "</li></ul>" +
					"<h2>Профиль</h2>" +
					"<ul><li><b>Тип профиля</b>: " + type + "</li>" +
					"<li><b>Размеры</b>: " + size + "</li>" + 
					"<li><b>Количество</b>: " + amount + "</li>" +
					"<li><b>Примечание</b>: " + desc + "</li></ul>"
				},
				"async" : false
			}
		})
		.done(function(response) {
			alert('Ваш заявка была успешно отправлен!');
			// reset field after successful submission
			name.val('');
			tel.val('');
			addr.val('');
			//type.val('');
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