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
			} else {
		    	$(this).prop('muted', true);
		    	$(this).removeClass('active');
		    	$('.app').removeClass('active');
		    	$('.navigation').addClass('active');
		    	$('.js-title').show();
		}
	});

	$('.navigation a').click(function(e) {
		e.preventDefault();
	});

	$('.l-serv').click(function() {
		$('.overlay').show();
		$('.service').addClass('active');
	});
	$('.l-about').click(function() {
		$('.overlay').show();
		$('.about').addClass('active');
	});
	$('.l-contact').click(function() {
		$('.overlay').show();
		$('.contact').addClass('active');
	});
	$('.l-clients').click(function() {
		$('.overlay').show();
		$('.clients').addClass('active');
	});

	$('.close').click(function() {
		$('.app > section').removeClass('active');
		$('.overlay').hide();
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
	    "begin",
	    "love",
	    "true",
	    "development",
	    "resolution",
	    "something",
	    "more",
    ];
    
    setInterval(function() {
        var i = Math.round((Math.random()) * titles.length);
        if (i == titles.length) --i;
        $(".js-title").html(titles[i]);
    }, 500);

    $('.mobile_menu').click(function() {
		$('.app').toggleClass('show_mobile');
		$('.mobile_menu').toggleClass('active');
	});

	$('.js-validate').feelform({
		notificationType: 'class',
		clearAfterSubmit: true
	});

	$('.link.play').click(function() {
		$('#my_video').show().addClass('mobile').get(0).play();
	});
       
   
});