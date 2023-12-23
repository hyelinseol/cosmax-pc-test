$(function(){
	//키비주얼(메인슬라이드)
	let keyvisualMain = new Swiper('.keyvisual_main',{
		autoplay: { delay: 4000, disableOnInteraction: false },
		speed: 800,
		loop: true,
		effect: 'fade',
		/*
		navigation: {
			nextEl: '.keyvisual_main .arrow-next', 
			prevEl: '.keyvisual_main .arrow-prev', 
		},*/
		pagination: {
			el: '.keyvisual_main .pagination',
			type: 'bullets',
		}
	});

	//텍스트롤링
	let txtWidth = 0;
	$('.section03 .title .toggle-txt .txt-slide .swiper-slide span').each(function(){
		let w = $(this).width();
		if(txtWidth < w){
			txtWidth = w;
		}
	});	
	$('.section03 .title .toggle-txt .slide-wrap').css('width', txtWidth);
	let txtRolling = new Swiper('.txt-slide',{
		autoplay: { delay: 600, disableOnInteraction: false },
		speed: 1000,
		loop: true,
		effect: 'slide',
		direction: 'vertical',
		loopAdditionalSlides: 1,
		simulateTouch: false
	});

	//article01 슬라이드
	let article01 = new Swiper('.section04 article .slide',{
		autoplay: { delay: 4000, disableOnInteraction: false },
		speed: 800,
		loop: true,
		effect: 'slide',
		fadeEffect: {
			crossFade: true
		},
		pagination: {
			el: '.section04 article .slide .pagination',
			type: 'bullets',
		}
	});

	
	//scroll animation
	let controller = new ScrollMagic.Controller();

	let staggerElement = $('.line-wrap');
	for(let i=0; i<staggerElement.length; i++){
		let scene2 = new ScrollMagic.Scene({
			triggerElement : staggerElement[i],
			triggerHook : .9,
			reverse: false
		})	
		.setClassToggle(staggerElement[i], 'active')
		.addTo(controller)
		//.addIndicators();
	}

	let staggerElement2 = $('.curtain-effect');
	for(let i=0; i<staggerElement2.length; i++){
		let scene3 = new ScrollMagic.Scene({
			triggerElement : staggerElement2[i],
			triggerHook : .9,
			reverse: false
		})	
		.setClassToggle(staggerElement2[i], 'active')
		.addTo(controller)
		//.addIndicators();
	}

	/*
	let symbolElement = $('.line-wrap .line-v .symbol');
	for(let i=0; i<symbolElement.length; i++){
		let tween = gsap.to(symbolElement[i], 100, { rotate: '-45deg' });
		let scene2 = new ScrollMagic.Scene({
			triggerElement : symbolElement[i],
			duration: '100%',
			triggerHook : .9
		})	
		.setTween(tween)
		.addTo(controller)
		.addIndicators();
	}
	*/

	let sceneFixed = new ScrollMagic.Scene({
		triggerElement: '.content-footer',
		duration: '100%',
		triggerHook : .7
	})
	.setPin('.content-header', {pushFollowers: false})
	.addTo(controller)
	//.addIndicators({name: "setSpin"});

	let zoomOutElement = '.section04 article .slide-wrap';
	let sceneZoom = new ScrollMagic.Scene({
		triggerElement : zoomOutElement,
		triggerHook : .8,
		reverse: false
	})	
	.setClassToggle(zoomOutElement, 'active')
	.addTo(controller)
	//.addIndicators();

	let footer = '#footer';
	let sceneFooter = new ScrollMagic.Scene({
		triggerElement : footer,
		triggerHook : .8
	})	
	.setClassToggle('html', 'footer-active')
	.addTo(controller)
	//.addIndicators();
});