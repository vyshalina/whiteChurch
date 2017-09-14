$(document).ready(function() {

	$('#my_video').prop('muted', true);
	$('#my_video').click( function (){
	    if($(this).prop('muted')) {
		        $(this).prop('muted', false);
		        $(this).addClass('active');
		        $('.app').addClass('active');
		        $('.navigation').removeClass('active');
		        $('.app section').removeClass('active');
		        $('.js-title').hide();
		        return false;
			} else {
		    	$(this).prop('muted', true);
		    	$(this).removeClass('active');
		    	$('.app').removeClass('active');
		    	$('.navigation').addClass('active');
		    	$('.js-title').show();
		    	return false;
		}
	});

	$('.navigation a').click(function(e) {
		e.preventDefault();
	});

	$('.l-serv').click(function() {
		$('.overlay').show();
		$('.service').addClass('active');
		return false;
	});
	$('.l-about').click(function() {
		$('.overlay').show();
		$('.about').addClass('active');
		return false;
	});
	$('.l-contact').click(function() {
		$('.overlay').show();
		$('.contact').addClass('active');
		return false;
	});
	$('.l-clients').click(function() {
		$('.overlay').show();
		$('.clients').addClass('active');
		return false;
	});

	$('.close').click(function() {
		$('.app > section').removeClass('active');
		$('.overlay').hide();
		return false;
	});

	$('.overlay').click(function() {
		$('.app > section').removeClass('active');
		$('.overlay').hide();
	});

	setTimeout(function() {
		$('.navigation').addClass('active');
	}, 2000);

	var titles = [
	    "whitechurch",
	    "and",
	    "valid",
	    "design",
	    "bureau"
    ];

    var titleIndex = -1;
    
    setInterval(function() {
        // var i = Math.round((Math.random()) * titles.length);
        // if (i == titles.length) --i;
        // $(".js-title").html(titles[i]);

        titleIndex = (titleIndex + 1) % titles.length;
		$(".js-title").html(titles[titleIndex]);

    }, 500);

    $('.mobile_menu').click(function() {
		$('.app').toggleClass('show_mobile');
		$('.mobile_menu').toggleClass('active');
		return false;
	});

	$('.js-validate').feelform({
		notificationType: 'class',
		preventDefaultSubmit: true,
		onSubmit: function(el) {
			sendAjax(el.data('formid'), el, '');
		},			
		clearAfterSubmit: false
	});

	var video = document.getElementById("my_video");

	$('.link.play').click(function() {
		if (video.requestFullscreen) {
		  video.requestFullscreen();
		} else if (video.mozRequestFullScreen) {
		  video.mozRequestFullScreen();
		} else if (video.webkitRequestFullscreen) {
		  video.webkitRequestFullscreen();
		}

		video.setAttribute("controls","controls");

		$('#my_video').addClass('mobile').trigger('play');
		$('#my_video').prop('muted', false);

		$('.overlay_mobile').show().addClass('black');
		$('.navigation').hide();
		$('.close_me').show();

		return false;
	});
       
   $('.close_me').click(function() {
   		$('#my_video').trigger('pause').removeClass('mobile');
   		$('#my_video').prop('muted', true);
   		$('.overlay_mobile').removeClass('black').hide();
   		$('.navigation').show();
   		$('.close_me').hide();
   		return false;
   });

   $('.overlay_mobile').click(function() {
		$('#my_video').trigger('pause').removeClass('mobile');
   		$('#my_video').prop('muted', true);
   		$('.navigation').show();
   		$('.close_me').hide();
   		$('.overlay_mobile').removeClass('black').hide();
   	});
});

var isBusy = false, idHolder = -1, formHolder = $();

function sendAjax(id, form, customData) {
	if (!isBusy && id != '') {
		isBusy = true;
		setTimeout(function() {
			isBusy = false;
		}, 1000);

		idHolder = id;
		formHolder = form;
		
		var dataStr = 'id=' + id + customData;
		if (form.length != '') {
			dataStr += ('&' + form.serialize());
		}		
		$.ajax({
			type: 'post',
			url: 'ajaxHandler.php',
			data: dataStr,
			cache: false,
			success: function(result) {
				if (result != -1 && result != '') {
					if (formHolder.length > 0) {
						formHolder.find('input:not(input[type="hidden"]), textarea, select').val('');
						var curparent = formHolder.parent();
						formHolder.remove();
						curparent.append('<div class="alert alert-success">' + formHolder.data('thank') +'</div>');
					}
				} else {
					alert('ajax error');
				}
			}
		});
	}	
}