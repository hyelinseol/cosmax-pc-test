/* 헤더 스크롤 고정 */
$(document).ready(function(){
    if ($("#main #header").length == 0) {
        return;
    }
    var top_btn = $("#main #header").offset().top;
    $("#main #header .topCategory #categoryMenu .menu-dp1>li>a.title").children('img').attr('src','/web/upload/mynomy/kr/layout/re_feedback_w.svg');
    $("#main #header .xans-layout-logotop img").attr('src','/web/upload/mynomy/kr/main/relogo_w.svg');
    $("#main #header .shoppinginfo li a.cart").children('img').attr('src','/web/upload/mynomy/kr/layout/ico_recart_w.svg');
    $("#main #header .shoppinginfo li a.log").children('img').attr('src','/web/upload/mynomy/kr/layout/ico_relog_w.svg');
    $(window).scroll(function(){
        if($(window).scrollTop() > top_btn+40) {
            $('#main #header').addClass('header_fixed');
            $("#main #header .topCategory #categoryMenu .menu-dp1>li>a.title").children('img').attr('src','/web/upload/mynomy/kr/layout/re_feedback.svg');
            $("#main #header .xans-layout-logotop img").attr('src','/web/upload/mynomy/kr/main/relogo.svg');
            $("#main #header .shoppinginfo li a.cart").children('img').attr('src','/web/upload/mynomy/kr/layout/ico_recart.svg');
            $("#main #header .shoppinginfo li a.log").children('img').attr('src','/web/upload/mynomy/kr/layout/ico_relog.svg');
            $("#main #header .topCategory #categoryMenu .bbs.point>a>sup").css('color','#0B0A0A');
			$(".menu-dp1 li a .ar").addClass("on");
			$('.pcSideMenu a').addClass('fixed');
        }
        else {
            $('#main #header').removeClass('header_fixed');
            $("#main #header .topCategory #categoryMenu .menu-dp1>li>a.title").children('img').attr('src','/web/upload/mynomy/kr/layout/re_feedback_w.svg');
            $("#main #header .xans-layout-logotop img").attr('src','/web/upload/mynomy/kr/main/relogo_w.svg');
            $("#main #header .shoppinginfo li a.cart").children('img').attr('src','/web/upload/mynomy/kr/layout/ico_recart_w.svg');
            $("#main #header .shoppinginfo li a.log").children('img').attr('src','/web/upload/mynomy/kr/layout/ico_relog_w.svg');
            $("#main #header .topCategory #categoryMenu .bbs.point>a>sup").css('color','#fff');
			$(".menu-dp1 li a .ar").removeClass("on");
			$('.pcSideMenu a').removeClass('fixed');
        }
    });
});

// 230417 추가
$(function() {
	if ($("#main #header").length == 0) {
		return;
	}
	var top_btn = $("#main #header").offset().top;
	$("#header").mouseenter(function() {
		$('#main #header').addClass('header_fixed');
		$('.pcSideMenu a').addClass('fixed');
		$("#main #header .topCategory #categoryMenu .menu-dp1>li>a.title").children('img').attr('src','/web/upload/mynomy/kr/layout/re_feedback.svg');
		$("#main #header .xans-layout-logotop img").attr('src','/web/upload/mynomy/kr/main/relogo.svg');
		$("#main #header .shoppinginfo li a.cart").children('img').attr('src','/web/upload/mynomy/kr/layout/ico_recart.svg');
		$("#main #header .shoppinginfo li a.log").children('img').attr('src','/web/upload/mynomy/kr/layout/ico_relog.svg');
		$("#main #header .topCategory #categoryMenu .bbs.point>a>sup").css('color','#0B0A0A');
		$(".menu-dp1 li a .ar").addClass("on");
	});
	$("#header").mouseleave(function() {
		if($(window).scrollTop() < top_btn+40) {
            $('#main #header').removeClass('header_fixed');
            $("#main #header .topCategory #categoryMenu .menu-dp1>li>a.title").children('img').attr('src','/web/upload/mynomy/kr/layout/re_feedback_w.svg');
            $("#main #header .xans-layout-logotop img").attr('src','/web/upload/mynomy/kr/main/relogo_w.svg');
            $("#main #header .shoppinginfo li a.cart").children('img').attr('src','/web/upload/mynomy/kr/layout/ico_recart_w.svg');
            $("#main #header .shoppinginfo li a.log").children('img').attr('src','/web/upload/mynomy/kr/layout/ico_relog_w.svg');
            $("#main #header .topCategory #categoryMenu .bbs.point>a>sup").css('color','#fff');
			$(".menu-dp1 li a .ar").removeClass("on");
			$('.pcSideMenu a').removeClass('fixed');
			
        }
        else {
            $('#main #header').addClass('header_fixed');
            $("#main #header .topCategory #categoryMenu .menu-dp1>li>a.title").children('img').attr('src','/web/upload/mynomy/kr/layout/re_feedback.svg');
            $("#main #header .xans-layout-logotop img").attr('src','/web/upload/mynomy/kr/main/relogo.svg');
            $("#main #header .shoppinginfo li a.cart").children('img').attr('src','/web/upload/mynomy/kr/layout/ico_recart.svg');
            $("#main #header .shoppinginfo li a.log").children('img').attr('src','/web/upload/mynomy/kr/layout/ico_relog.svg');
            $("#main #header .topCategory #categoryMenu .bbs.point>a>sup").css('color','#0B0A0A');
			$(".menu-dp1 li a .ar").addClass("on");
			$('.pcSideMenu a').addClass('fixed');
        }
	});
});

$(document).ready(function(){
	// main visual
	var swiper = new Swiper(".keyvisual_main", {
		speed: 800,
		loop: true,
		effect :'fade',
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		slidesPerView: 1,
        spaceBetween: 0,
		navigation: {
			nextEl: '.keyvisual_main .arrow-next', 
			prevEl: '.keyvisual_main .arrow-prev', 
		},
		pagination: {
			el: '.keyvisual_main .pagination',
			type: 'bullets',
		},
	});
	
//	var pagingSwiper = new Swiper('.keyvisual_main', {
//		effect :'fade',
//		pagination: {
//			el: ".count-pagination",
//			type: "fraction",
//		  },
//	});
//	swiper.controller.control = pagingSwiper;
});

$(function(){
    
    let controller = new ScrollMagic.Controller();
    
    let sceneFixed = new ScrollMagic.Scene({
		triggerElement: '.content-footer',
		duration: '100%',
		triggerHook : 1.0
	})
	.setPin('.content-header', {pushFollowers: false})
	.addTo(controller)
    
//    참고용
//    const spyEls = document.querySelectorAll("section.scroll-spy");
//    spyEls.forEach(function (spyEl) {
//      new ScrollMagic.Scene({
//        triggerElement: spyEl, // 보여짐 여부를 감시할 요소 (target)
//        triggerHook: 0.8, // 전체 화면 수직 방향의 80% 지점을 감시 (0 ~ 1)
//      })
//        .setClassToggle(spyEl, "show") // 해당 요소(splEl)가 화면에 보여지면 해당 메소들 실행
//        .addTo(new ScrollMagic.Controller()); // 내부에 컨트롤러에 실제 동작하도록 넣음
//    });


    //메인 리뷰슬라이드
    var reviewSlide = new Swiper('.right .review_slide', {
        direction: "horizontal",
        //height: 600,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 20,
        speed : 5000,
        autoplay: {     
            delay: 0, 
            disableOnInteraction: true,
        },
        loop : true,
    });
    
    var reviewSlide2 = new Swiper('.left .review_slide', {
        direction: "horizontal",
        //height: 600,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 20,
        speed : 5000,
        autoplay: {     
            delay: 0, 
            disableOnInteraction: true,
            reverseDirection:true,
        },
        loop : true,
    });
    


});

$(window).scroll(function(){
    
    
    var wScroll = $(this).scrollTop();

    if(wScroll >=$('#layoutMain .mainFixSec').offset().top - $(window).height()/5.0){
        $('#layoutMain .mainFixSec .mentBefore').addClass('show');
    } else {
		$('#layoutMain .mainFixSec .mentBefore').removeClass('show');
	}

//	if(wScroll >=$('#layoutMain .conDiff').offset().top - $(window).height()/1.5){
//        $('#layoutMain .conDiff .perDiff').addClass('show');
//    } else {
//		$('#layoutMain .conDiff .perDiff').removeClass('show');
//	}
    
});

//////////////////////// 230417 추가

$(document).ready(function(){
	// main review
	var swiper = new Swiper(".mainReviewList", {
		speed: 8000,
		loop: true,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
		},
		loopAdditionalSlides: 1,
		slidesPerView: 'auto',
        spaceBetween: 12,
		freeMode: true,
	});

	// main event
	var swiper = new Swiper(".mainEventRolling", {
		speed: 1000,
		loop: true,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		loopAdditionalSlides: 1,
		slidesPerView: 1,
        spaceBetween: 20,
		centeredSlides: true,
		pagination: {
			el: ".event-pagination",
			type: "fraction",
		  },
		navigation: {
			nextEl: '.event-next', 
			prevEl: '.event-prev', 
		},
	});

	// main slide TXT
	var swiper = new Swiper('.txtNavi .swiper-container', {
		spaceBetween: 5,
		centeredSlides: true,
		speed: 20000,
		autoplay: {
			delay: 0,
			},
		loop: true,
		slidesPerView:'auto',
		allowTouchMove: false,
		disableOnInteraction: true,
	});

	// main product 230901
	var swiper = new Swiper(".prdRolling", {
		speed: 1000,
		loop: false,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
//		centeredSlides: true,
//		loopAdditionalSlides: 1,
		slidesPerView: 4,
        spaceBetween: 38,
		pagination: {
			el: '.prd-pagination',
			type: 'bullets',
		},
		navigation: {
			nextEl: '.prd-next', 
			prevEl: '.prd-prev', 
		},
	});
});

$(document).ready(function() {
  setTimeout(function() {
    $(".p01").addClass("on");
  }, 0);

  setTimeout(function() {
    $(".p03").addClass("on");
  }, 300);

  setTimeout(function() {
    $(".p04").addClass("on");
  }, 600);

  setTimeout(function() {
    $(".adTxt").addClass("on");
  }, 1000);

//  setTimeout(function() {
//    $(".adTxtSub").addClass("on");
//  }, 1300);
});

$(document).ready(function () {
	 $(window).scroll(function () {
		var scroll = $(window).scrollTop();

		// Image 1
		var parallaxStart1 = $('.mainIntroVodSec').offset().top;
		var parallaxOffset1 = scroll - parallaxStart1;
		var fixedTopValue1 = -450;
		var adjustedTopValue1 = fixedTopValue1 + (parallaxOffset1 * 0.3);

		if (parallaxOffset1 > 0) {
			$('.parallax-image').css('top', adjustedTopValue1 + 'px');
		}

		// Image 2
		var parallaxStart2 = $('.mainIntroVodSec').offset().top;
		var parallaxOffset2 = scroll - parallaxStart2;
		var fixedTopValue2 = -900;
		var adjustedTopValue2 = fixedTopValue2 + (parallaxOffset2 * 0.3);

		if (parallaxOffset2 > 0) {
			$('.parallax-image.img02').css('top', adjustedTopValue2 + 'px');
		}

		// Image 3
		var parallaxStart3 = $('.mainIntroVodSec').offset().top;
		var parallaxOffset3 = scroll - parallaxStart3;
		var fixedTopValue3 = -1400;
		var adjustedTopValue3 = fixedTopValue3 + (parallaxOffset3 * 0.3);

		if (parallaxOffset3 > 0) {
			$('.parallax-image.img03').css('top', adjustedTopValue3 + 'px');
		}
    });
});

$(function() {
	$("a.openCustomLine").click(function() {
		$(".customLine").slideToggle();
	});
});
