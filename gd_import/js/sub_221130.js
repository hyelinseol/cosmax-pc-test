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
		/*
		navigation: {
			nextEl: '.keyvisual_main .arrow-next', 
			prevEl: '.keyvisual_main .arrow-prev', 
		},*/
		pagination: {
			el: '.system_slide .pagination',
			type: 'bullets',
		}
	});
    
    
    //조합가능 레시피 수 가리기
//    let controller2 = new ScrollMagic.Controller();
//    
//    let sceneFixed3 = new ScrollMagic.Scene({
//		triggerElement: '.re_product_detail .sec02_f',
//		duration: '100%',
//		triggerHook : .7
//	})
//	.setPin('.re_product_detail .sec02', {pushFollowers: false})
//	.addTo(controller2)
    
    
    
});

$(window).scroll(function(){
    
    //무한대배경 스크롤 움직임
//    if (wScroll > 0){
//        $(".feedback_wrap .feedback_top").addClass("action");
//    } else {
//        $(".feedback_wrap .feedback_top").removeClass("action");
//    }
    
    //제목효과
    var wScroll = $(this).scrollTop();
    
    if(wScroll >=$('.re_product_detail .sec01').offset().top - $(window).height()/2){
        $('.re_product_detail .sec01 .txt span').addClass('show');
        $('.re_product_detail .sec01 .txt strong').addClass('show');
        $('.re_product_detail .sec01 .txt .effect').addClass('show');
    }
    if(wScroll < $('.re_product_detail .sec01').offset().top - 400){
        $(".prd_detail .fixed-box").removeClass('fix');
    }
    if(wScroll >=$('.re_product_detail .sec01').offset().top){
        $(".prd_detail .fixed-box").addClass('fix');
    }
    
    if(wScroll >=$('.re_product_detail .sec02').offset().top - $(window).height()/2 && wScroll < $('.re_product_detail .sec02').offset().top){
        $('.re_product_detail .sec02 .img').addClass('show');
        $('.re_product_detail .sec02 .fixed_wrap .img_fixed').addClass('show');
        $('.re_product_detail .sec02 .fixed_wrap .txt').removeClass('show');
    }
    
    if(wScroll >=$('.re_product_detail .sec02').offset().top){
        $('.re_product_detail .sec02 .fixed_wrap .img_fixed').removeClass('show');
        $('.re_product_detail .sec02 .fixed_wrap .txt').addClass('show');
    }
    
    if(wScroll >=$('.re_product_detail .sec02').offset().top - $(window).height()/2 && wScroll < 1300){
        var numberCount= 12600000;
        $(".re_product_detail .sec02 .img_fixed p").addClass('number');
        if( $(".re_product_detail .sec02 .img_fixed p").hasClass('number') ){
           //숫자 카운팅
        
            $({ val : 0 }).animate({ val : numberCount }, {
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

            //3자리마다 , 찍기
            function numberWithCommas(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        }
        
    }
    if(wScroll >=$('.re_product_detail .sec03').offset().top - $(window).height()/2){
        $( '.re_product_detail .sec03 .tit').addClass('show');
        $( '.re_product_detail .sec03 .list ul li').addClass('show');
    }
    if(wScroll >=$('.re_product_detail .sec04').offset().top - $(window).height()/2){
        $( '.re_product_detail .sec04 .tit').addClass('show');
        $( '.re_product_detail .sec04 .txt').addClass('show');
    }
    
    if(wScroll >=$('.re_product_detail .sec05').offset().top - $(window).height()/2){
        $( '.re_product_detail .sec05 .c_tit').addClass('show');
        $( '.re_product_detail .sec05 .tit').addClass('show');
        $( '.re_product_detail .sec05 .txt > p').addClass('show');
        $( '.re_product_detail .sec05 .txt .sec05_list ul li').addClass('show');
        $( '.re_product_detail .sec05 .txt > strong').addClass('show');
        $( '.re_product_detail .sec05 .right').addClass('show');
    }
    var swt ="F";
    var swt02 ="F";
    if(wScroll >=$('.re_product_detail .sec06').offset().top - $(window).height()/2){
        $( '.re_product_detail .sec06 .tit').addClass('show');
        $( '.re_product_detail .sec06 .barArea').addClass('show');
        //성분바
        if( $(".re_product_detail .sec06 .barArea").hasClass("show") ){
            var elem = document.getElementById("myBar");   
            var width = 1;
            var id = setInterval(frame, 50);
            
            function frame() {
                
                /*if (width >= 80) {
                    //clearInterval(id);
                    width--; 
                    elem.style.width = width + '%';  
                    elem.innerHTML = width * 1  + '%';
                } else if (width < 80){
                    
                    width++; 
                    elem.style.width = width + '%';  
                    elem.innerHTML = width * 1  + '%';
                }*/
                    
                if (swt == "T") { // 80 -> 1
                    //clearInterval(id);
                    width--; 
                    elem.style.width = width + '%';  
                    elem.innerHTML = width * 1  + '%';
                    if(width==1){
                        swt ="F";
                        //clearInterval(id);
                    }
                } else if (swt == "F") { // 1 -> 80
                    
                    width++; 
                    elem.style.width = width + '%';  
                    elem.innerHTML = width * 1  + '%';
                    if(width==80){
                        swt ="T";
                        //clearInterval(id);
                    }
                }
            }
            
            
            var elem02 = document.getElementById("myBar02");   
            var width02 = 1;
            var id02 = setInterval(frame02, 40);
            function frame02() {
               /* if (width02 >= 20) {
                  clearInterval(id02);
                } else {
                  width02++; 
                  elem02.style.width = width02 + '%';  
                  elem02.innerHTML = width02 * 1  + '%';
                }*/
                 if (swt02 == "T") { // 80 -> 1
                    //clearInterval(id);
                    width02--; 
                    elem02.style.width = width02 + '%';  
                    elem02.innerHTML = width02 * 1  + '%';
                    if(width02==1){
                        swt02 ="F";
                        //clearInterval(id);
                    }
                } else if (swt02 == "F") { // 1 -> 80
                    
                    width02++; 
                    elem02.style.width = width02 + '%';  
                    elem02.innerHTML = width02 * 1  + '%';
                    if(width02==20){
                        swt02 ="T";
                        //clearInterval(id);
                    }
                }
            }
        }
        
    }
    
    if(wScroll >=$('.re_product_detail .sec07').offset().top - $(window).height()/2){
        $( '.re_product_detail .sec07 .c_tit').addClass('show');
        $( '.re_product_detail .sec07 .ingredient_list ul li').addClass('show');
    }
    
    if(wScroll >=$('.re_product_detail .sec09').offset().top - $(window).height()/2){
        $( '.re_product_detail .sec09 .c_tit').addClass('show');
    }
    if(wScroll >=$('.re_product_detail .sec10').offset().top - $(window).height()/2){
        $( '.re_product_detail .sec10 .c_tit').addClass('show');
        $( '.re_product_detail .sec10 .process_list ul li').addClass('show');
    }
    
    if(wScroll >=$('.re_product_detail .sec14').offset().top - $(window).height()/2){
        $( '.re_product_detail .sec14 .tit').addClass('show');
        $( '.re_product_detail .sec14 .system_slide').addClass('show');
        $( '.re_product_detail .sec14 .txt').addClass('show');
    }
    

});