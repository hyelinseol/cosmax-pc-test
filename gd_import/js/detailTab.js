/* 상세페이지 탭 */
$(document).ready(function(){
    $('.detailTab').each(function(){
        var $this=$(this);
        var $btn=$this.find('.btn > li');
        var $con=$this.find('.con > li');
        var current=0;
        $btn.eq(current).addClass('on');
        $con.eq(current).addClass('on');
        $btn.bind('click',function(){
            current=$btn.index($(this));
            $btn.removeClass('on');
            $btn.eq(current).addClass('on');
            $con.removeClass('on');
            $con.eq(current).addClass('on');
            //$(".represcription > section > div").removeClass("fix");
        })
    });

    $('.tab01').on('click', function() {
        $(".articleArea.shampooTab section > div").removeClass("fix");
        $(".articleArea.treatmentTab section > div").removeClass("fix");
        $(".represcription.shampooTab section > div").removeClass("fix");
        $(".represcription.treatmentTab section > div").removeClass("fix");
        $('.treatment').hide()
        $('.shampoo').show()
    });

    $('.tab02').on('click', function() {
        $(".articleArea.shampooTab section > div").removeClass("fix");
        $(".articleArea.treatmentTab section > div").removeClass("fix");
        $(".represcription.shampooTab section > div").removeClass("fix");
        $(".represcription.treatmentTab section > div").removeClass("fix");
        $('.shampoo').hide()
        $('.treatment').show()
    });

    //OSDL 타입 슬라이드
    var osdlswiper = new Swiper('.detailArea.detail_04 .swiper-container', {
        spaceBetween: 24,
        speed: 1000,
        autoplay: true,
        loop: true,
        slidesPerView:4,
        disableOnInteraction: true,
    });

});
$(window).scroll(function(){
    var contents = $(".articleArea.shampooTab section");
    var wScroll = $(this).scrollTop();

    
    if (wScroll >= contents.eq(0).offset().top - 128){
        $(".articleArea.shampooTab .sec00_center").addClass("fix");
    } else {
        $(".articleArea.shampooTab .sec00_center").removeClass("fix");
    }

    if (wScroll >= contents.eq(1).offset().top - 128){
        $(".articleArea.shampooTab .sec00_center").removeClass("fix");
        $(".articleArea.shampooTab .sec01_center").addClass("fix");
    } else {
        $(".articleArea.shampooTab .sec01_center").removeClass("fix");
    }
    
    if (wScroll >= contents.eq(2).offset().top - 128){
        $(".articleArea.shampooTab .sec01_center").removeClass("fix");
        $(".articleArea.shampooTab .sec02_center").addClass("fix");
    } else {
        $(".articleArea.shampooTab .sec02_center").removeClass("fix");
    }
    
    if (wScroll >= contents.eq(3).offset().top - 128){
        $(".articleArea.shampooTab .sec02_center").removeClass("fix");
        $(".articleArea.shampooTab .sec03_center").addClass("fix");
    } else {
        $(".articleArea.shampooTab .sec03_center").removeClass("fix");
    }
    
    if (wScroll >= contents.eq(4).offset().top - 128){
        $(".articleArea.shampooTab .sec03_center").removeClass("fix");
        $(".articleArea.shampooTab .sec04_center").addClass("fix");
    } else {
        $(".articleArea .sec04_center").removeClass("fix");
    }
    if (wScroll >= $(".detailArea.detail_02").offset().top ){
        $(".articleArea.shampooTab .sec04_center").removeClass("fix");
    }
});
$(window).scroll(function(){
    var contents02 = $(".articleArea.treatmentTab section");
    var wScroll = $(this).scrollTop();

    
    if (wScroll >= contents02.eq(0).offset().top - 128){
        $(".articleArea.treatmentTab .sec00_center").addClass("fix");
    } else {
        $(".articleArea.treatmentTab .sec00_center").removeClass("fix");
    }

    if (wScroll >= contents02.eq(1).offset().top - 128){
        $(".articleArea.treatmentTab .sec00_center").removeClass("fix");
        $(".articleArea.treatmentTab .sec01_center").addClass("fix");
    } else {
        $(".articleArea.treatmentTab .sec01_center").removeClass("fix");
    }
    
    if (wScroll >= contents02.eq(2).offset().top - 128){
        $(".articleArea.treatmentTab .sec01_center").removeClass("fix");
        $(".articleArea.treatmentTab .sec02_center").addClass("fix");
    } else {
        $(".articleArea.treatmentTab .sec02_center").removeClass("fix");
    }
    
    if (wScroll >= contents02.eq(3).offset().top - 128){
        $(".articleArea.treatmentTab .sec02_center").removeClass("fix");
        $(".articleArea.treatmentTab .sec03_center").addClass("fix");
    } else {
        $(".articleArea.treatmentTab .sec03_center").removeClass("fix");
    }
    
    if (wScroll >= contents02.eq(4).offset().top - 128){
        $(".articleArea.treatmentTab .sec03_center").removeClass("fix");
        $(".articleArea.treatmentTab .sec04_center").addClass("fix");
    } else {
        $(".articleArea .sec04_center").removeClass("fix");
    }
    if (wScroll >= $(".detailArea.detail_02").offset().top ){
        $(".articleArea.treatmentTab .sec04_center").removeClass("fix");
    }
});

$(window).scroll(function(){
    var contents03 = $(".represcription.shampooTab section");
    var wScroll = $(this).scrollTop();

    
    if (wScroll >= contents03.eq(0).offset().top - 128){
        $(".represcription.shampooTab .sec00_center").addClass("fix");
    } else {
        $(".represcription.shampooTab .sec00_center").removeClass("fix");
    }

    if (wScroll >= contents03.eq(1).offset().top - 128){
        $(".represcription.shampooTab .sec00_center").removeClass("fix");
        $(".represcription.shampooTab .sec01_center").addClass("fix");
    } else {
        $(".represcription.shampooTab .sec01_center").removeClass("fix");
    }
    
    if (wScroll >= contents03.eq(2).offset().top - 128){
        $(".represcription.shampooTab .sec01_center").removeClass("fix");
        $(".represcription.shampooTab .sec02_center").addClass("fix");
    } else {
        $(".represcription.shampooTab .sec02_center").removeClass("fix");
    }
    
    if (wScroll >= contents03.eq(3).offset().top - 128){
        $(".represcription.shampooTab .sec02_center").removeClass("fix");
        $(".represcription.shampooTab .sec03_center").addClass("fix");
    } else {
        $(".represcription.shampooTab .sec03_center").removeClass("fix");
    }
    if (wScroll >= $(".represcription.shampooTab .sec03").offset().top - 128){
        $(".represcription.shampooTab .sec03_center").removeClass("fix");
    }
});

$(window).scroll(function(){
    var contents04 = $(".represcription.treatmentTab section");
    var wScroll = $(this).scrollTop();

    
    if (wScroll >= contents04.eq(0).offset().top - 128){
        $(".represcription.treatmentTab .sec00_center").addClass("fix");
    } else {
        $(".represcription.treatmentTab .sec00_center").removeClass("fix");
    }

    if (wScroll >= contents04.eq(1).offset().top - 128){
        $(".represcription.treatmentTab .sec00_center").removeClass("fix");
        $(".represcription.treatmentTab .sec01_center").addClass("fix");
    } else {
        $(".represcription.treatmentTab .sec01_center").removeClass("fix");
    }
    
    if (wScroll >= contents04.eq(2).offset().top - 128){
        $(".represcription.treatmentTab .sec01_center").removeClass("fix");
        $(".represcription.treatmentTab .sec02_center").addClass("fix");
    } else {
        $(".represcription.treatmentTab .sec02_center").removeClass("fix");
    }
    
    if (wScroll >= contents04.eq(3).offset().top - 128){
        $(".represcription.treatmentTab .sec02_center").removeClass("fix");
        $(".represcription.treatmentTab .sec03_center").addClass("fix");
    } else {
        $(".represcription.treatmentTab .sec03_center").removeClass("fix");
    }
    if (wScroll >= $(".represcription.treatmentTab .sec03").offset().top -128 ){
        $(".represcription.treatmentTab .sec03_center").removeClass("fix");
    }
});

