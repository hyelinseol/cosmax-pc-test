//220721
$(function() {
	if($('.layout-detail').length){
		/*
		var target = $('.detail-header .box-info .total-price');
		create(target[0]);
		function create(t) {
			var observer = new MutationObserver(function(mutations) {
				let text = $('.detail-header .box-info .total-price em').text().replace('원', '');
				$('.detail-header .box-info .total-price em').html(text+'<span>원</span>');
				observer.disconnect();
			});
			var config = { childList: true, subtree: true };			
			observer.observe(t, config);
		}*/

		$('.fixed-box .box-info .box-right .result-wrap .btn-wrap.btn-wrap-dummy .btn-buy').on('click', function(){
			$('.fixed-box').addClass('active');
		});
		$('.fixed-box .btn-close').on('click', function(){
			$('.fixed-box').removeClass('active');
		});

		$('.ticker-wrap .ticker').each(function(){
			$(this).clone().appendTo($(this).parent());
		});
		$('.ticker-wrap').each(function(){
			$(this).find('.ticker').eq(0).addClass('first');
			$(this).find('.ticker').eq(1).addClass('second');
		});
		$('.ticker-wrap').each(function(){
			var _this = $(this);
			var num = 0;
			var timer = setInterval(ticker, 20);
			var textWidth = _this.find('.ticker.first').width();
			function ticker(){
				num = num+1;
				_this.find('.ticker.first').css('transform', 'translateX(-'+num+'px)');
				_this.find('.ticker.second').css('transform', 'translateX(-'+num+'px)');
				if(num > textWidth){
					_this.find('.ticker.first').css('transform', 'translateX('+textWidth+'px)');
					_this.find('.ticker.second').css('transform', 'translateX('+textWidth+'px)');
					clearInterval(timer);
					num = 0;
					timer = setInterval(ticker, 20);
				}
			}
		});

		//하단고정메뉴
		fixedmenu();
		$(window).on('scroll', function(){ fixedmenu(); });
		function fixedmenu(){
			let H1 = $('.detail-header .box-img').height();
			let H2 = $('.detail-header .box-info').height();
			if(H1 < H2) {
				$('.detail-header').css('min-height', H2);
			} else {
				$('.detail-header').css('min-height', H1);
			}
			
			if($(window).scrollTop() > $('.detail-header').height() + 100){
				//$('.fixed-menu').addClass('active');
				//$('.detail-header .box-info').addClass('active');
			} else {
				//$('.fixed-menu').removeClass('active');
				//$('.detail-header .box-info').removeClass('active');
			}
		}
	}

	//diagnosis progress
	if($('#stepArea').length){
		$('#stepArea').addClass('active');
		setTimeout(function(){
			let percentST = $('.step .menu.progress.ing').data('start');
			let percent = $('.step .menu.progress.ing').data('progress');
			$('.step .menu.progress.ing .percent').css('top', percentST);
			setTimeout(function(){
				$('.step .menu.progress.ing .percent').addClass('active');
				$('.step .menu.progress.ing .percent').css('top', percent);
			}, 100);
		}, 100);
	}

	//diagnosis 토스트팝업 hidden
	if($('body#diagnosis').length){
		setTimeout(function(){
			$('.popWrap').fadeOut(200);
		}, 2000);
	}

	///diagnosis/fragrance01.html
	var fragranceSlide = new Swiper('.fragranceSlide', {
        speed: 600,
        slidesPerView: 'auto',
        spaceBetween: 0,
        slideToClickedSlide : true,
        centeredSlides: true,
        mousewheel:true,
        pagination: {
            el: '.swiper-pagination-fragrance',
            clickable: true,
        },
		on: {
			slideChangeTransitionEnd: function(){
				if($('.fragranceSlide .swiper-slide-active').hasClass('slide-free')){
					$('.strength').hide();
				} else {
					$('.strength').show();
				}
			}
		}
    });

	////myshop/mypage/repurchase.html
	var fragranceSlide = new Swiper('.feedBackCon', {
        slidesPerView: 1,
        spaceBetween: 10,    
        slideToClickedSlide : true,
        centeredSlides: false,
        mousewheel:false,
        pagination: {
            el: '.fb-pagination',
            clickable: true,
        }
    });

	////myshop/mypage/repurchase_essen.html
	var swiper = new Swiper('.rollingMock', {
		autoplay: { delay: 3000, disableOnInteraction: false },
		speed: 800,
        slidesPerView: 1,
		effect:'fade',
        centeredSlides: false,
        mousewheel:false,
    });

	//draggable
	setH();
	$(window).on('load resize', function(){ setH() });
	function setH(){
		$('.controlArea:not(.plus) .slide-draggable').css('height', $('.controlArea:not(.plus) .slide-draggable').height());

		$('.controlArea:not(.plus) .control_bar .bar .blank-top').css('height', $('.controlArea:not(.plus) .control_bar ol li').height()/2 - 12);
		$('.controlArea:not(.plus) .control_bar .bar .blank-bt').css('height', $('.controlArea:not(.plus) .control_bar ol li').height()/2 - 12);
	}
	var draggable = new Swiper('.controlArea:not(.plus) .slide-draggable',{
		direction: 'vertical',
		loop: false,
		allowTouchMove: false,
		effect: 'fade',
		scrollbar: {
			el: '.controlArea:not(.plus) .control_bar .bar',
			hide: false,
			draggable: true,
		},
		on: {
			slideChange: function(){
				$('.controlArea:not(.plus) .control_bar ol li').removeClass('checked').eq(draggable.activeIndex).addClass('checked');
			}
		}
	});
	$('.controlArea:not(.plus) .control_bar ol li').on('click', function(){
		draggable.slideTo($(this).index());
	});

	setHPlus();
	$(window).on('load resize', function(){ setHPlus() });
	function setHPlus(){
		$('.select [class*="plus"] [class*="control_bar"] .bar .blank-top').css('width', $('.select [class*="plus"] [class*="control_bar"] ol li').width()/2 - 12);
		$('.select [class*="plus"] [class*="control_bar"] .bar .blank-bt').css('width', $('.select [class*="plus"] [class*="control_bar"] ol li').width()/2 - 12);
	}
	var draggablePlus = new Swiper('.select [class*="plus"] .slide-draggable',{
        initialSlide: 1,
		direction: 'horizontal',
		loop: false,
		allowTouchMove: false,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		scrollbar: {
			el: '.select [class*="plus"] .control_bar .bar',
			hide: false,
			draggable: true,
		},
		on: {
			slideChange: function(){
				$('.select [class*="plus"] .control_bar ol li').removeClass('checked').eq(draggablePlus.activeIndex).addClass('checked');
			}
		}
	});
    $('.select [class*="plus"] .control_bar ol li').on('click', function(){
        draggablePlus.slideTo($(this).index());
    });  

// drag Add - Daover S
	var draggableHorizen = new Swiper('.select [class*="horizen"] .slide-draggable',{
        initialSlide: 1,
		direction: 'horizontal',
		loop: false,
		allowTouchMove: false,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
//		navigation: {
//			nextEl: ".dirMore",
//			prevEl: ".dirLess",
//		},
		scrollbar: {
			el: '.select [class*="horizen"] .control_bar .bar',
			hide: false,
			draggable: true,
		},
		on: {
			slideChange: function(){
				$('.dontKnow a').removeClass('active');
				$('.select [class*="horizen"] .control_bar p span').removeClass('checked').eq(draggableHorizen.activeIndex).addClass('checked');
				$('.select [class*="horizen"] .control_bar .swipeTitle .thumb').removeClass('checked').eq(draggableHorizen.activeIndex).addClass('checked');
				$('.select .quantity .word').removeClass('active').eq(draggableHorizen.activeIndex).addClass('active');
				$(".bar .swiper-scrollbar-drag").removeClass("dis");
			}
		}
	});
	$('.third .dirMore').on('click', function(){
        draggableHorizen.slideTo (2,500,false)
    });
	$('.third .dirMid').on('click', function(){
        draggableHorizen.slideTo (1,500,false)
    });
	$('.third .dirLess').on('click', function(){
        draggableHorizen.slideTo (0,500,false)
    });

	$('.fourth .dirMore').on('click', function(){
        draggableHorizen.slideTo (3,500,false)
    });
	$('.fourth .dirLess').on('click', function(){
        draggableHorizen.slideTo (0,500,false)
    });

	$('.fifth .dirMore').on('click', function(){
        draggableHorizen.slideTo (4,500,false)
    });
	$('.fifth .dirLess').on('click', function(){
        draggableHorizen.slideTo (0,500,false)
    });

    $('.select [class*="horizen"] .control_bar p span').on('click', function(){
        draggableHorizen.slideTo($(this).index());
    });  
	$('.select .quantity .word').on('click', function(){
        draggableHorizen.slideTo($(this).index());
    });  
        
// drag Add - Daover E

    // 인트로페이지 동의
    $('.introBox .agree label').on('click', function(){
        fadeDisable();
    });
	//바텀시트
	$('.contentBox .infoWrap .info p').on('click', function(){
		fadeDisable();
	});
	$('.infoBox .close, .infoBox-dimmed').on('click', function(){
		if($('html').hasClass('expand-box')){
			fadeAble();
		}
	});
	function fadeDisable(){
		$('html').addClass('expand-box');
	}
	function fadeAble(){
		$('html').removeClass('expand-box');
	}
	$('.contentBox .infoWrap .info i').on('click', function(){
		$('.contentBox .infoWrap').remove();
	});
    
	//profile_slide preset
	var main_swiper = new Swiper('.profileSlide', {
        speed: 600,
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 40,
        centeredSlides: true,
        mousewheel: true,
        //parallax: true,
        /*loop: true,*/
        /*autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },*/
        /*pagination: {
            el: '.swiper-pagination-profile',
            clickable: true,
        },*/
        /*navigation: {
            nextEl: '.swiper-button-next-profile',
            prevEl: '.swiper-button-prev-profile',
        },*/
    });

	$('.slideArea .profileSlide .swiper-slide img').on('click', function(){
		$('.selectArea .select ul.view li').removeClass('checked');
		if($('.slideArea .profileSlide .swiper-slide').eq(main_swiper.activeIndex).data('preset') != undefined){
			var preset = $('.slideArea .profileSlide .swiper-slide').eq(main_swiper.activeIndex).data('preset').split(',');
			for(var i=0;i < preset.length; i++){
				$('.selectArea .select ul.view li').eq(preset[i]).addClass('checked');
			}
		}
	});
	//user select
	$('.selectArea .select ul.view li').on('click', function(){
		//if(main_swiper.activeIndex == 0){
        	// 개수 제한없음
        	$(this).toggleClass('checked');
        	// 개수 제한
			/*if($('.selectArea .select ul.view li.checked').length < 5){
				$(this).toggleClass('checked');
			} else {
				$(this).removeClass('checked');
			}*/
		//}
	});
    
	//user re_select
    $('.selectArea .re_select ul.view li').on('click', function(){
        // 개수 제한없음       
        //$(this).toggleClass('checked'); 
        // 개수 제한
        if($('.selectArea .re_select ul.view li.checked').length < 5){
            $(this).toggleClass('checked');
        } else {
            $(this).removeClass('checked');
        }
    });
    
    //solution
	var solution_swiper = new Swiper('.solution', {
        speed: 600,
        slidesPerView: 1,
        slidesPerColumn: 2,
        spaceBetween: 24,
        centeredSlides: true,
        //parallax: true,
        /*loop: true,*/
        /*autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },*/
        pagination: {
            el: '.swiper-pagination-solution',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next-solution',
            prevEl: '.swiper-button-prev-solution',
        },
    });
    
     //피드백루프 수직 롤링
    var feedbackSlide = new Swiper('.up .feedback_slide', {
        direction: "vertical",
        height: 600,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 24,
        speed : 1500,
        autoplay: {     
            delay: 2000, 
            disableOnInteraction: true,
        },
        loop : true,
    });
    
    var feedbackSlide2 = new Swiper('.down .feedback_slide', {
        direction: "vertical",
        height: 600,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 24,  
        speed : 1500,
        autoplay: {     
            delay: 2000,
            disableOnInteraction: true,
            reverseDirection:true,
        },
        loop : true,
    });
    
    $('.feedback_wrap .feedback_top .intro').addClass('show');
    $('.feedback_wrap .feedback_section.sec01 .txt').addClass('show');


	////myshop/index.html 최근 본 상품
	var swiper = new Swiper('.recentPrd', {
        slidesPerView: 'auto',
		slidesOffsetBefore : 4,
        slidesOffsetAfter : 4,
		spaceBetween: 16,
		navigation: {
            nextEl: '.recent-next',
            prevEl: '.recent-prev',
        },
    });

});

$(function() {
	$(".view2Dp").mouseenter(function() {
		$(this).find(".ar").addClass("spin");
		$(this).find("dl").stop().slideDown(300);
	});
	$(".view2Dp").mouseleave(function() {
		$(this).find(".ar").removeClass("spin");
		$(this).find("dl").stop().slideUp(300);
	});
});

$(function() {
	$(".goSurvey").mouseenter(function() {
		$(this).find(".ar").stop().addClass("on");
		$(this).find(".surveyCate").stop().slideDown(300);
	});
	$(".goSurvey").mouseleave(function() {
		$(this).find(".ar").stop().removeClass("on");
		$(this).find(".surveyCate").stop().slideUp(300);
	});
});




/* 카테고리 */
$(document).ready(function(){

	//category
	var aCategory = {};
	function get() {
		$.ajax({
			url : '/exec/front/Product/SubCategory',
			dataType: 'json',
			success: function(_aCategory) {
				$(_aCategory).each(function() {
					if (!aCategory[this.parent_cate_no]) {
						aCategory[this.parent_cate_no] = [];
					}
				aCategory[this.parent_cate_no].push(this);
			});
				draw();
			}
		});
	}
	function draw() {
		var _iCateNo = 0;
		var _aTmp    = [];
		$('#categoryMenu .menu-dp1 > li > a').each(function() {
			_aTmp = $(this).attr('href').split('?cate_no=');
			_iCateNo = _aTmp[1];
			if(!aCategory[_iCateNo]) {
				return;
			}
			var aHtml = [];
			aHtml.push('<ul class="menu-dp2">');
			for(var i=0; i<aCategory[_iCateNo].length; i++) {
				aHtml.push('<li><a href="/product/list.html'+aCategory[_iCateNo][i].param+'">'+aCategory[_iCateNo][i].name+'</a></li>');
			}
			aHtml.push('</ul>');
			$(this).parent('.menu-dp1 > li').append(aHtml.join(''));

			$(this).siblings('.menu-dp2').find(' > li > a').each(function() {
				_aTmp = $(this).attr('href').split('?cate_no=');
				_iCateNo = _aTmp[1];
				if(!aCategory[_iCateNo]) {
					return;
				}
				var aHtml = [];
				aHtml.push('<ul class="menu-dp3">');
				for(var i=0; i<aCategory[_iCateNo].length; i++) {
					aHtml.push('<li><a href="/product/list.html'+aCategory[_iCateNo][i].param+'">'+aCategory[_iCateNo][i].name+'</a></li>');
				}
				aHtml.push('</ul>');
				$(this).parent('li').append(aHtml.join(''));

				$(this).siblings('.menu-dp3').find(' > li > a').each(function() {
					_aTmp = $(this).attr('href').split('?cate_no=');
					_iCateNo = _aTmp[1];
					if(!aCategory[_iCateNo]) {
						return;
					}
					var aHtml = [];
					aHtml.push('<ul class="menu-dp4">');
					for(var i=0; i<aCategory[_iCateNo].length; i++) {
						aHtml.push('<li><a href="/product/list.html'+aCategory[_iCateNo][i].param+'">'+aCategory[_iCateNo][i].name+'</a></li>');
					}
					aHtml.push('</ul>');
					$(this).parent('li').append(aHtml.join(''));
				});
			});
		});
	}
	get();
});

/* 마이페이지 좌측 아코디언 */    
$(document).ready(function() {
    $(".sideMenu .menu h3").click(function(){
        $(".sideMenu .menu h3").removeClass('on');
        $(".sideMenu .sub_menu").slideUp();
        if(!$(this).next().is(":visible"))
        {
            $(this).addClass('on').next().slideDown();
        }
    })
});

/* 스크롤시 나타나는 우측 하단버튼 */
$(document).ready(function(){
    $(window).scroll(function () {
        if ($(this).scrollTop() > 10) { 
            $('.fixed_btn').fadeIn();
        } else {
            $('.fixed_btn').fadeOut();
        }
    });

    $(".btn.up").click(function(){
        return $("html, body").animate({scrollTop:0},1200,"easeInOutExpo"),!1});

    $(".btn.down").click(function(){
        return $("html, body").animate({scrollTop:$(document).height()},1200,"easeInOutExpo"),!1});
});

jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});
/*! Respond.js v1.4.2: min/max-width media query polyfill
 * Copyright 2014 Scott Jehl
 * Licensed under MIT
 * http://j.mp/respondjs */

$(function() {
	$("a.viewodrStats").click(function() {
		$(".odrStatsExp").fadeIn();
		$(".odrStats").fadeOut();
	});

	$(".osClose").click(function() {
		$(".odrStatsExp").fadeOut();
		$(".odrStats").fadeIn();
	});
});

//피드백루프 브릿지 에니메이션
(function($){

	var _t = 1500;
	var aaa;
	$('.fbCon ul').attr('data-num', 0);
	var falsjfasf = function(){
		$('.fbCon ul').each(function(){
			var _n = parseInt($(this).attr('data-num')) + 1;
			var _m = $(this).children('li').length;

			if (_n == _m) {

				_n = 0;

				$(this).children('li:eq(' + _n + ')').addClass('on');
				$(this).children('li:not(:eq(' + _n + '))').removeClass('on');

				$(this).attr('data-num', _n);

			} else {

				$(this).children('li:eq(' + _n + ')').addClass('on');
				$(this).children('li:not(:eq(' + _n + '))').removeClass('on');

				$(this).attr('data-num', _n);
			}
		});
		//console.log('121212');
		aaa = setTimeout(falsjfasf, _t);
	};
	aaa = setTimeout(falsjfasf, _t);
	// 자동애니메이션 끝

	/*
	// 마우스오버/아웃시 애니메이션 멈춤/다시재개
	$('.fbCon ul li').hover(function(){
		clearTimeout(aaa);

		var _idx = $(this).closest('ul').children('li').index(this);
		//console.log(_idx);

		$(this).closest('ul').attr('data-num', _idx);
		$(this).closest('ul').children('li:not(:eq(' + _idx + '))').removeClass('on');

	}, function(){
		falsjfasf();
	});
	*/

})(jQuery);

$(function() {
	$(".choiceOpt").click(function() {
		$(this).find(".current").toggleClass("on");
		$(this).find(".current .ar").toggleClass("on");
		$(this).find("ul").slideToggle();
	});
});

/* 공통 상단 띠베너 */
$(document).ready(function(){
	var swiper = new Swiper('.swiper-container.comnTopBnr', {
		spaceBetween: 0,
		speed: 1000,
		autoplay: {
			delay: 3000,
			},
		loop: true,
		slidesPerView:1,
		navigation: {
			nextEl: '.bnr-next',
			prevEl: '.bnr-prev'
		},
		observer: true,	// 추가
		observeParents: true,	// 추가
	});
});

/* 공통 상단 띠베너 */
//쿠키설정
function setCookie( name, value, expiredays ) {
var todayDate = new Date();
todayDate.setDate( todayDate.getDate() + expiredays );
document.cookie = name + '=' + escape( value ) + '; path=/; expires=' + todayDate.toGMTString() + ';'
}

//쿠키 불러오기
function getCookie(name)
{
	var obj = name + "=";
	var x = 0;
	while ( x <= document.cookie.length )
	{
		var y = (x+obj.length);
		if ( document.cookie.substring( x, y ) == obj )
		{
			if ((endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
				endOfCookie = document.cookie.length;
			return unescape( document.cookie.substring( y, endOfCookie ) );
		}
		x = document.cookie.indexOf( " ", x ) + 1;

		if ( x == 0 ) break;
	}
	return "";
}

//닫기 버튼 클릭시
function closeWin(key)
{
	setCookie('txtBnr'+key, 'Y' , 1 );
	$("#divpop"+key+"").slideUp("fast");
	$(".bnrClose.eventTopBnr").hide();
}

$(function(){
	if(getCookie("txtBnr1") !="Y"){
		$(".pcSideMenu a").removeClass("noBnr");
		$("#divpop1").show();
	} else {
		$(".pcSideMenu a").addClass("noBnr");
		$("#divpop1").hide();
	}
});


/* iframe 높이 자동 */
//<![CDATA[
function calcHeight(){
 //find the height of the internal page

 var the_height=
 document.getElementById('event_frame').contentWindow.
 document.body.scrollHeight;

 //change the height of the iframe
 document.getElementById('event_frame').height=
 the_height;

 //document.getElementById('event_frame').scrolling = "no";
 document.getElementById('event_frame').style.overflow = "hidden";
}
//

/* 231205 Add */
//	$( document ).ready( function() {
//		var jbOffset = $( '.pcSideMenu a' ).offset();
//			$( window ).scroll( function() {
//			if ( $( document ).scrollTop() > jbOffset.top ) {
//				$( '.pcSideMenu a' ).addClass( 'fixed' );
//			}
//			else {
//				$( '.pcSideMenu a' ).removeClass( 'fixed' );
//			}
//		});
//	});

$(function() {
	$(".pcSideMenu a").click(function() {
		$(this).addClass("white");
		$(this).removeClass("fixed");
		if($(".pcSideMenu").hasClass("close")) {
			$(".pcSideCategory").removeClass("on");
			$(".pcDep02Wap").removeClass("on");
			$(".pcSideMenu").removeClass("close");
			$(this).removeClass("white");
		} else {
			$(".pcSideCategory").addClass("on");
			$(".pcSideMenu").addClass("close");
		}
	});
});

$(function() {
	$(".pcDep01Wrap li a#pcDep01").mouseenter(function() {
		if($(".pcDep02Wap").hasClass("on")) {
			$(".pcDep02Wap ul").hide();
			$(".pcDep02Wap ul#pcDep0201").show();
		} else {
			$(".pcDep02Wap").addClass("on");
			$(".pcDep02Wap ul").hide();
			$(".pcDep02Wap ul#pcDep0201").show();
		}
	});

	$(".pcDep01Wrap li a#pcDep02").mouseenter(function() {
		if($(".pcDep02Wap").hasClass("on")) {
			$(".pcDep02Wap ul").hide();
			$(".pcDep02Wap ul#pcDep0202").show();
		} else {
			$(".pcDep02Wap").addClass("on");
			$(".pcDep02Wap ul").hide();
			$(".pcDep02Wap ul#pcDep0202").show();
		}
	});

	$(".pcDep01Wrap li a#pcDep03").mouseenter(function() {
		if($(".pcDep02Wap").hasClass("on")) {
			$(".pcDep02Wap ul").hide();
			$(".pcDep02Wap ul#pcDep0203").show();
		} else {
			$(".pcDep02Wap").addClass("on");
			$(".pcDep02Wap ul").hide();
			$(".pcDep02Wap ul#pcDep0203").show();
		}
	});

	$(".pcDep02Wap").mouseleave(function() {
		$(".pcDep02Wap").removeClass("on");
	});
});