$(window).scroll(function(){
	//하단 Fix Float
    var wScroll = $(this).scrollTop();
	if( $('.prdBnrSec').length ){
		if(wScroll < $('.prdBnrSec').offset().top - 400){
			$(".re_product_detail .fixed-box").removeClass('fix');
		}
	}

    if( $('.prdBnrSec').length ){
		if(wScroll >=$('.prdBnrSec').offset().top){
			$(".re_product_detail .fixed-box").addClass('fix');
		}
	}
    
});

$(function(){
    //상단슬라이드
    let bigImgslide = new Swiper('.big_img',{
		loop: true,
		effect: 'fade',
		pagination: {
			el: '.big_img .pagination',
			type: 'bullets',
		},
        navigation: {
            nextEl: '.big_img .swiper-button-next-big',
            prevEl: '.big_img .swiper-button-prev-big',
        }
	});

	//베너 슬라이드
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
});

$(window).scroll(function(){
	
	var wScroll = $(this).scrollTop();

	//하단 Float 구매 Func
//	if(wScroll < $('.prdBnrSec').offset().top - 0){
//        $(".re_product_detail .fixed-box").removeClass('fix');
//    }
//    if(wScroll >=$('.prdBnrSec').offset().top - 300){
//        $(".re_product_detail .fixed-box").addClass('fix');
//    }

    //진정에센스 - 2주만에 끝내는 진정고민
    if( $('.prdBlock.calmCycle').length ){
       if(wScroll >=$('.prdBlock.calmCycle').offset().top - $(window).height()/2){
            $('.prdBlock.calmCycle .cycleTxt').addClass('show');
			$('.prdBlock.calmCycle .cycleBg').addClass('show');
        }
    }    

	//보습에센스 - 사용자 직접평가로 입증
    if( $('.prdBlock.moistCycle').length ){
       if(wScroll >=$('.prdBlock.moistCycle').offset().top - $(window).height()/2){
            $('.prdBlock.moistCycle .cycleTxt').addClass('show');
			$('.prdBlock.moistCycle .cycleBg').addClass('show');
        }
    }    

	//부스터에센스
	if( $('.esSec.part01').length ){
		if (wScroll >= $('.esSec.part01').offset().top - $(window).height() / 2) {
			$('.esSec.part01 .imgSecEs').addClass('show');
			$('.esSec.part01 .txtSecEs').addClass('show');
		}
	}

	if( $('.esSec.part02').length ){
		if (wScroll >= $('.esSec.part02').offset().top - $(window).height() / 2) {
			$('.esSec.part02 .txtSecEs').addClass('show');
		}
	}

	if( $('.esSec.part03').length ){
		if (wScroll >= $('.esSec.part03').offset().top - $(window).height() / 2) {
			$('.esSec.part03 .imgSecEs .imgLine .mask').addClass('show');
		}
	}

	if( $('.esSec.part07').length ){
		if (wScroll >= $('.esSec.part07').offset().top - $(window).height() / 2) {
			$('.esSec.part07 .roundTxt').addClass('show');
			$('.esSec.part07 .imgSecEs').addClass('show');
		}
	}

});