$(function(){
    //랜덤박스
    setInterval(function()
    {
        $(".re_product_detail .sec05 .right .random ul li").find("a").removeClass("on");
        var count_pdon = 0;
        $(".re_product_detail .sec05 .right .random ul li").each(function(){
            if( Math.random()*10 > 7 && count_pdon < 5 ){
                $(this).find("a").addClass("on");
                count_pdon++;
            }
        });
        $(".re_product_detail .sec05 .right .random ul li").each(function(){
            if( $(this).hasClass("on") === false && Math.random()*10 > 5 && count_pdon < 5 ){
                $(this).find("a").addClass("on");
                count_pdon++;
            }
        });
    }, 2000 );



    //상단슬라이드
    let bigImgslide = new Swiper('.big_img',{
//		autoplay: { delay: 4000, disableOnInteraction: false },
//		speed: 800,
		loop: true,
		effect: 'fade',
		/*
		navigation: {
			nextEl: '.keyvisual_main .arrow-next',
			prevEl: '.keyvisual_main .arrow-prev',
		},*/
		pagination: {
			el: '.big_img .pagination',
			type: 'bullets',
		},
        navigation: {
            nextEl: '.big_img .swiper-button-next-big',
            prevEl: '.big_img .swiper-button-prev-big',
        }
	});
    //system_slide
    let sysImgslide = new Swiper('.system_slide',{
		autoplay: { delay: 4000, disableOnInteraction: false },
		speed: 800,
		loop: true,
		effect: 'fade',
		navigation: {
			nextEl: '.swiper-next',
			prevEl: '.swiper-prev',
		},
		pagination: {
			el: '.system_slide .pagination',
			type: 'bullets',
		}
	});

	//슬라이드
    var slide_wrap = new Swiper('.prdBnr', {
        speed: 600,
		autoplay: {
			delay: 4000,
		},
        slidesPerView: 2,
        slidesOffsetBefore : 0,
        slidesOffsetAfter : 0,
        spaceBetween: 10,
        centeredSlides: false,
        observer: true,
        observeParents: true,
        loop: false,
        watchOverflow : true,
		pagination: {
			el: ".count-pagination",
			type: "fraction",
		  },
    });

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

$(window).scroll(function(){
    //하단 Fix Float
    var wScroll = $(this).scrollTop();
    if(wScroll < $('.prdBnrSec').offset().top - 400){
        $(".re_product_detail .fixed-box").removeClass('fix');
    }
    if(wScroll >=$('.prdBnrSec').offset().top){
        $(".re_product_detail .fixed-box").addClass('fix');
    }
});

/* 진단 전 상세 Anchor */
function fnMove(seq)
{
	var offset = $("#" + seq).offset();
	$('html, body').animate({scrollTop : offset.top}, 400);
}

/* 날짜에 맞춰 베너 노출 처리 */
var today = new Date();

// html 에서 data-expired 가 설정된 팝업 div 들을 찾기
$('[data-expired]').each(function () {
	// 문자열을 공백, -, : 으로 나눠서 배열로 저장
	var d = $(this).data('expired').split(/[\s,\-:]+/);

	var expired_date = new Date(+d[0], +d[1] - 1, +d[2], +d[3] || 23, +d[4] || 59, +d[5] || 59);

	// 오늘이 설정한 expired date 전이면 감추고
	if (today <= expired_date) {
		$(this).hide();
	}
	// 아니면 html 에서 노출
	else {
		$(this).show();
	}
});