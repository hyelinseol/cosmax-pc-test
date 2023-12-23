$(document).ready(function(){
    
    if( $('.re_wrap .re_sec06').length ){
        //1:1맞춤케어 슬라이드
        let spinImgslide = new Swiper('.re_wrap .re_sec06 .effect_area .swiper-container',{
            slidesPerView : 1,
    		autoplay: { 
                delay: 1000, 
                disableOnInteraction: false,
            },
            speed: 600,
            loop: true,
            loopAdditionalSlides : 1,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
        });
        
        //1:1맞춤 처방 슬라이드
        let phoneImgslide = new Swiper('.re_wrap .re_sec06 .cont_wrap .right_area .img_area .swiper-container',{
            slidesPerView : 1,
    		autoplay: { 
                delay: 3000, 
                disableOnInteraction: false,
            },
            speed: 0,
            loop: true,
            loopAdditionalSlides : 1,
            effect: 'fade',
        });
    }
    
    //솔루션 매칭 슬라이드
    if( $('.re_wrap .solution_list').length ){
        let sys2Imgslide = new Swiper('.re_wrap .solution_list .swiper-container',{
            slidesPerView : 3,
			slidesPerGroup: 3,
            spaceBetween: 24,
    //		autoplay: { 
    //            delay: 2500, 
    //            disableOnInteraction: false 
    //        },
            speed: 1000,
            loop: false,
            loopAdditionalSlides : 1,
            navigation: {
                nextEl: '.re_wrap .solution_list .swiper-next',
                prevEl: '.re_wrap .solution_list .swiper-prev',
            }
        });
    }

    //21개 솔루션 슬라이드
    if( $('.re_wrap .re_sec10').length ){
        $('.re_wrap .re_sec10 .prescribe_list').each(function(index) {
            let t = $(this);
            t.addClass('swiper-' + index);

            let prescribeSwiper = new Swiper( t, {
                autoplay: {
                  delay: 0, //add
                  disableOnInteraction: false,
                },
                speed: 5000,
                loop: true,
                loopAdditionalSlides: 1,
                slidesPerView: 5,
                spaceBetween: 24,
            });
        });
    }

    //숫자카운팅
//    gsap.registerPlugin(ScrollTrigger);
//
//    var startCount = {var: 0};
//
//    gsap.to(startCount, {
//      var: 1000, duration: 3, ease:"none",
//      onUpdate: changeNumber,
//      scrollTrigger: {
//        trigger: "#number",
//        toggleActions: "restart none reverse none",
//      },
//    })
//
//    function changeNumber() {
//      number.innerHTML = (startCount.var).toFixed();
//    }



});

var once = true; // 한 번만 실행하기 위한 변수

$(window).scroll(function(){

    //제목효과
    //console.log('aa');
    var wScroll = $(this).scrollTop();
    
    if( $('.essence_wrap .ess_sec01').length ){
       if(wScroll >=$('.essence_wrap .ess_sec01').offset().top - $(window).height()/2){
            $('.essence_wrap .ess_sec01 .recipe_number').addClass('show');
        }
    }

    if( $('.re_wrap .re_sec01').length ){
       if(wScroll >=$('.re_wrap .re_sec01').offset().top - $(window).height()/2){
            $('.re_wrap .re_sec01 .img').addClass('show');
            $('.re_wrap .re_sec01 .txt_area').addClass('show');
        }
    }
    
    if( $('.re_wrap .re_sec02').length ){
       if(wScroll >=$('.re_wrap .re_sec02').offset().top - $(window).height()/2){
            $('.re_wrap .re_sec02 .point_list ul li').addClass('show');
        }
    }

    if( $('.re_wrap .re_sec03').length ){
		if (once && $(window).scrollTop() >= $('.re_wrap .re_sec03').offset().top - $(window).height() / 2) {
			once = false; // 스크롤 이벤트 한 번만 실행하도록 설정
			var numberCount = 3556;

			$(".re_wrap .re_sec03 .tit strong").addClass('number');
			if ($(".re_wrap .re_sec03 .tit strong").hasClass('number')) {
				// 숫자 카운팅
				$({ val: 0 }).animate({ val: numberCount }, {
					duration: 1500,
					step: function() {
						var num = numberWithCommas(Math.floor(this.val));
						$(".number").text(num);
					},
					complete: function() {
						var num = numberWithCommas(Math.floor(this.val));
						$(".number").text(num);
					}
				});

				// 3자리마다 , 찍기
				function numberWithCommas(x) {
					return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
			}
		}

        //첫번째 이미지 페이드 아웃
        if(wScroll >=$('.re_wrap .re_sec03').offset().top + 100 && wScroll < 16280){
            $('.re_wrap .re_sec03').addClass("show");
			$('.re_wrap .re_sec03').addClass("fixed");
        } else{
            $('.re_wrap .re_sec03').removeClass("show");
			$('.re_wrap .re_sec03').removeClass("fixed");
        }
        
        //텍스트 위치 고정
		if(wScroll >=$('.re_wrap .re_sec03').offset().top && wScroll < 16280 && wScroll < 17920){
			$('.re_wrap .re_sec03').addClass("fixed");
        } else{
			$('.re_wrap .re_sec03').removeClass("fixed");
        }

//        if(wScroll >= 16280  && wScroll < 17920){
//            $('.re_wrap .re_sec03').addClass("fixed");
//        } else {
//            $('.re_wrap .re_sec03').removeClass("fixed");
//        }
        
    }
    
    //집중해서 해결하면 다릅니다
    if( $('.re_wrap .re_sec07').length ){
       if(wScroll >=$('.re_wrap .re_sec07').offset().top - $(window).height()/2){
            $('.re_wrap .re_sec07 .img_area ul li').addClass('show');
        }
    }

    //POINT 3
    if( $('.re_wrap .re_sec12').length ){
        if(wScroll >=$('.re_wrap .re_sec12').offset().top - $(window).height()/2){
            $('.re_wrap .re_sec12 .ingredient_list').addClass('show');
        }
    }

    //POINT 4
    if( $('.re_wrap .re_sec13').length ){
        if(wScroll >=$('.re_wrap .re_sec13').offset().top - $(window).height()/2){
            $('.re_wrap .re_sec13 .prepare_list ul li').addClass('show');
        }
    }

    //피부 기초체력
    if( $('.re_wrap .re_sec15').length ){
        if(wScroll >=$('.re_wrap .re_sec15').offset().top - $(window).height()/2){
            $('.re_wrap .re_sec15 .img').addClass('show');
            $('.re_wrap .re_sec15 .txt_area').addClass('show');
        }
    }

    //고함량 에센스 효과
    if( $('.re_wrap .re_sec18').length ){
        if(wScroll >=$('.re_wrap .re_sec18').offset().top - $(window).height()/2){
            $('.re_wrap .re_sec18 .img_area .top').addClass('show');
            $('.re_wrap .re_sec18 .img_area .middle ul li').addClass('show');
            $('.re_wrap .re_sec18 .img_area .bot').addClass('show');
        }
    }

    //안전한 성분만 담았어요!
    if( $('.re_wrap .re_sec22').length ){
        if(wScroll >=$('.re_wrap .re_sec22').offset().top - $(window).height()/2){
            $('.re_wrap .re_sec22 .img_area').addClass('show');
        }
    }

    //전성분 EWG 그린등급
    if( $('.re_wrap .re_sec23').length ){
        if(wScroll >=$('.re_wrap .re_sec23').offset().top - $(window).height()/2){
            $('.re_wrap .re_sec23 .img_area').addClass('show');
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

/* 진단 전 상세 Anchor */
function fnMove(seq)
{
	var offset = $("#" + seq).offset();
	$('html, body').animate({scrollTop : offset.top}, 400);
}

/* 단품 / 세트 상세화면 호출 분기 */