$(window).scroll(function() {
    var wScroll = $(this).scrollTop();

	if (wScroll >= $('.esSec.part01').offset().top - $(window).height() / 2) {
        $('.esSec.part01 .imgSec').addClass('show');
		$('.esSec.part01 .txtSec').addClass('show');
    }

	if (wScroll >= $('.esSec.part02').offset().top - $(window).height() / 2) {
		$('.esSec.part02 .txtSec').addClass('show');
    }

	if (wScroll >= $('.esSec.part03').offset().top - $(window).height() / 2) {
		$('.esSec.part03 .imgSec .imgLine .mask').addClass('show');
    }

	if (wScroll >= $('.esSec.part07').offset().top - $(window).height() / 2) {
		$('.esSec.part07 .roundTxt').addClass('show');
		$('.esSec.part07 .imgSec').addClass('show');
    }
});