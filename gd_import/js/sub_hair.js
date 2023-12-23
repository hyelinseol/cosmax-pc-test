var once = true; // 한 번만 실행하기 위한 변수

$(window).scroll(function() {
    var wScroll = $(this).scrollTop();

    if (wScroll >= $('.hairSec.part01').offset().top - $(window).height() / 2) {
        $('.hairSec.part01 .txtSec .inTxtBox .partTxt .midTxt').addClass('show');
        setTimeout(function() {
            $('.hairSec.part01 .txtSec .inTxtBox .partTxt .midTxt .mask').addClass('on');
        }, 800);
        setTimeout(function() {
            $('.hairSec.part01 .txtSec .inTxtBox .partTxt .btmTxt').addClass('show');
        }, 1400);
    }

    if (wScroll >= $('.hairSec.part02').offset().top - $(window).height() / 2) {
        $('.hairSec.part02 .partIco').addClass('show');
    }

    if (once && wScroll >= $('.hairSec.part03').offset().top - $(window).height() / 2) {
        once = false; // 스크롤 이벤트 한 번만 실행하도록 설정
        var count = 0;
        var interval = setInterval(function() {
            count += 0.1;
            $('#counter').text(count.toFixed(1));
            if (count >= 4.8) {
                clearInterval(interval);
            }
        }, 40);
    }

	if (wScroll >= $('.hairSec.part04').offset().top - $(window).height() / 2) {
        $('.hairSec.part04 .pieGraph .pie').addClass('show');
    }

	if (wScroll >= $('.hairSec.part05').offset().top - ($(window).height() * 4 / 5)) {
		$('.hairSec.part05 .imgSec .hairLogo').addClass('show');
	}

	if (wScroll >= $('.hairSec.part08').offset().top - $(window).height() / 2) {
		$('.hairSec.part08 .scentWrap .perScent').addClass('show');
	}

	if (wScroll >= $('.hairSec.part11').offset().top - $(window).height() / 2) {
		$('.hairSec.part11 .iconSec .perIco').addClass('show');
	}
});

$(function(){

	//헤어 성분 슬라이드
    var mySwiper = new Swiper('.swiper-container.cardRolling', {
        slidesPerView: 3,
        slidesOffsetBefore : 0,
        slidesOffsetAfter : 0,
        spaceBetween: 24,
        centeredSlides: false,
        observer: true,
        observeParents: true,
        loop: false,
        watchOverflow : true,
		pagination: {
          el: ".card-pagination",
          type: "bullets",
        },
		navigation: {
		  nextEl: ".card-next",
		  prevEl: ".card-prev"
		}
    });
});