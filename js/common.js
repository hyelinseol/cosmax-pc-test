//window popup script
function winPop(url) {
    window.open(url, "popup", "width=300,height=300,left=10,top=10,resizable=no,scrollbars=no");
}
/**
 * document.location.href split
 * return array Param
 */
function getQueryString(sKey)
{
    var sQueryString = document.location.search.substring(1);
    var aParam       = {};

    if (sQueryString) {
        var aFields = sQueryString.split("&");
        var aField  = [];
        for (var i=0; i<aFields.length; i++) {
            aField = aFields[i].split('=');
            aParam[aField[0]] = aField[1];
        }
    }

    aParam.page = aParam.page ? aParam.page : 1;
    return sKey ? aParam[sKey] : aParam;
};

$(function(){
    // tab
    $.eTab = function(ul){
        $(ul).find('a').on('click', function(){
            var _li = $(this).parent('li').addClass('selected').siblings().removeClass('selected'),
                _target = $(this).attr('href'),
                _siblings = '.' + $(_target).attr('class');
            $(_target).show().siblings(_siblings).hide();
            return false
        });
    }
    if ( window.call_eTab ) {
        call_eTab();
    };
});


// $(window).scroll(function(){
//     if ($("#header").offset().top > 4000){
//         $(".sec00_center").addClass("fix");
//     } else {
//         $(".sec00_center").removeClass("fix");
//     }
// });

function getQueryString(sKey)
{
    var sQueryString = document.location.search.substring(1);
    var aParam       = {};

    if (sQueryString) {
        var aFields = sQueryString.split("&");
        var aField  = [];
        for (var i=0; i<aFields.length; i++) {
            aField = aFields[i].split('=');
            aParam[aField[0]] = aField[1];
        }
    }

    aParam.page = aParam.page ? aParam.page : 1;
    return sKey ? aParam[sKey] : aParam;
};


$(document).ready(function(){
	var _category_no = getQueryString("category_no");
	var on_class = "";

	// 분류 HTML 변형
	$( "#board_category > option" ).each(function() {
		var _Val = $(this).val();

		if (_category_no == _Val) {
			on_class = 'class="on"';
		} else {
			on_class = "";
		}

		$("#board_category_custom").append('<span><a href="/board/faq/faq_list.html?board_no=3&category_no=' + _Val + '" ' + on_class + '>' + $(this).text() + '</a></span>');
 	});

	// 리스트 탭메뉴 on
	if ($('#board_menu_custom').length) {
		var _board_no = getQueryString("board_no");
		$('#board_menu_custom > li').removeClass('on');
		if (_board_no)
		{
			$('#board_menu_custom > li[data-boardno="' + _board_no + '"]').addClass('on');			
		}
		else {
			_board_no = ((document.location.pathname).split('/'))[3];					
			if (_board_no.length)
			{
				$('#board_menu_custom > li[data-boardno="' + _board_no + '"]').addClass('on');			
			}
		}
	}

	if ($('#board_menu_custom_write').length) {
		var _board_no = getQueryString("board_no");
		$('#board_menu_custom_write > li').removeClass('on');
		if (_board_no)
		{
			$('#board_menu_custom_write > li[data-boardno="' + _board_no + '"]').addClass('on');			
		}
		else {
			_board_no = ((document.location.pathname).split('/'))[3];					
			if (_board_no.length)
			{
				$('#board_menu_custom_write > li[data-boardno="' + _board_no + '"]').addClass('on');			
			}
		}
	}

	if ($('#board_menu_custom_modify').length) {
		var _board_no = getQueryString("board_no");
		$('#board_menu_custom_modify > li').removeClass('on');
		if (_board_no)
		{
			$('#board_menu_custom_modify > li[data-boardno="' + _board_no + '"]').addClass('on');			
		}
		else {
			_board_no = ((document.location.pathname).split('/'))[3];					
			if (_board_no.length)
			{
				$('#board_menu_custom_modify > li[data-boardno="' + _board_no + '"]').addClass('on');			
			}
		}
	}

	// 상세 탭메뉴 on
	if ($('#board_menu_custom_read').length) {
		var _board_no = ((document.location.pathname).split('/'))[3];
		$('#board_menu_custom_read > li').removeClass('on');
		if (_board_no.length)
		{
			$('#board_menu_custom_read > li[data-boardno="' + _board_no + '"]').addClass('on');
		}
	}

	// 리스트 페이지 카테고리명 on - 230913 임시 주석
	if ($('#prdCateMenu').length) {
		var _cate_no = getQueryString("cate_no");
		$('#prdCateMenu > .perCate').removeClass('on');
		if (_cate_no)
		{
			$('#prdCateMenu > .perCate[data-cateno="' + _cate_no + '"]').addClass('on');			
		}
		else {
			_cate_no = ((document.location.pathname).split('/'))[3];					
			if (_cate_no.length)
			{
				$('#prdCateMenu > .perCate[data-cateno="' + _cate_no + '"]').addClass('on');
			}
		}
	}

	// 리스트 페이지 카테고리별 Visual Image
	if ($('#cateVisualSec').length) {
		var _cate_no = getQueryString("cate_no");
		$('#cateVisualSec > .cateVisual').hide();
		if (_cate_no)
		{
			$('#cateVisualSec > .cateVisual[data-cateno="' + _cate_no + '"]').show();			
		}
		else {
			_cate_no = ((document.location.pathname).split('/'))[3];					
			if (_cate_no.length)
			{
				$('#cateVisualSec > .cateVisual[data-cateno="' + _cate_no + '"]').show();
			}
		}
	}

	if ($("meta[name=path_role]").attr('content') == 'PRODUCT_DETAIL')
	{
		var _productId = $('meta[property="product:productId"]').attr('content');
		console.log("_productId ==> ", _productId);

		if (_productId == null)
		{
			if (iProductNo != null)
			{
				_productId = iProductNo;
			}
		}
		console.log("_productId 2 ==> ", _productId);

		if (_productId == '11' || _productId == '12' || _productId == '13' || _productId == '15' || _productId == '17' || _productId == '24')
		{
			if (_productId == '11')
			{
				var _Html = '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/shampoo/1_n.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/shampoo/2.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/shampoo/3.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/shampoo/4.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/shampoo/5.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/shampoo/6.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/shampoo/7.jpg" /></div>';
			}
			else if (_productId == '12')
			{
				var _Html = '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/treatment/1_n.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/treatment/2.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/treatment/3.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/treatment/4.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/treatment/5.jpg" /></div>';
			}
			else if (_productId == '13')
			{
				var _Html = '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/set/1.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/set/2.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/set/3.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/set/4.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/set/5.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/set/6.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/set/7.jpg" /></div>';
			}
			else if (_productId == '15' || _productId == '17')
			{
				var _Html = '<div class="swiper-slide"><img src="/web/renew_img/prd_essence03.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/renew_img/prd_essence01.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/renew_img/prd_essence02.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/renew_img/prd_essence04.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/renew_img/prd_essence05.jpg" /></div>';
			}
			else if (_productId == '24')
			{
				var _Html = '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/prd_kit01.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/prd_kit02.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/prd_kit03.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/prd_kit04.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/prd_kit05.jpg" /></div>';
				_Html += '<div class="swiper-slide"><img src="/web/upload/mynomy/kr/prd/prd_kit06.jpg" /></div>';
			}
			$('#big-swiper-wrapper').empty();
			$('#big-swiper-wrapper').html(_Html);

			new Swiper('.big_img',{
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
		}

		if (_productId == '13' || _productId == '14' || _productId == '15')
		{
			if (_productId == '14')
			{
				var _Html = '<img src="/web/upload/mynomy/kr/layout/emblem_04.svg" alt="쓰리와우 품평단 재구매의사 99.5%">';
			}
			else if (_productId == '15')
			{
				var _Html = '';
			}
			else if (_productId == '13')
			{
				var _Html = '<img src="/web/upload/mynomy/kr/layout/emblem_04.svg" alt="쓰리와우 품평단 재구매의사 99.5%">';
			}
			$('#emblem').empty();
			$('#emblem').html(_Html);
		}

		if (_productId == '13' || _productId == '14' || _productId == '15')
		{
			if (_productId == '14')
			{
				var _Html = '<img src="/web/upload/mynomy/kr/layout/emblem_glowpick.svg" alt="emblem_glowpick">';
			}
			else if (_productId == '15')
			{
				var _Html = '';
			}
			else if (_productId == '13')
			{
				var _Html = '<img src="/web/upload/mynomy/kr/layout/emblem_glowpick.svg" alt="emblem_glowpick">';
			}
			$('#glowemblem').empty();
			$('#glowemblem').html(_Html);
		}

		if (_productId == '24') {
		  // _productId가 24일 때 처리할 내용
		  $('#perPrdEvent').css('display', 'block');
		} else {
		  // _productId가 24이 아닐 때 처리할 내용
		  $('#perPrdEvent').css('display', 'none');
		}

		// 231020 부스팅 에센스 분기
		if (_productId == '16') {
			$('.forCustom').hide();
		} 
		if (_productId == '15') {
			$('.forSku').hide();
		} 

		// 231023 샘플키트 분기
		if (_productId == '24') {
			$('#hairCont').hide();
			$('#sampleKitEvent').show();
		} else {
			$('#sampleKitEvent').hide();
		}
	}

	// 갤러리게시판 상세보기 콘텐츠 컨트롤
	if ($(".onlyReviewShow").length) {
        var pathArray = window.location.pathname.split("/");
        if (pathArray.length > 2) {
            if (pathArray[1] == "article") {				
                var board_no = pathArray[3];
                if (board_no == 12) {
                    $(".onlyReviewShow").show();
                } else {
                    $(".onlyReviewShow").hide();
                }
            }
        }
    }

	if ($(".boardCate.event").length) {
        var board_no = getParameterByName("board_no");
        if (!board_no) {
            var pathArray = window.location.pathname.split("/");
            if (pathArray.length > 2) {
                if (pathArray[1] == "board") {
                    board_no = pathArray[3];
                }
            }
        }
        if (board_no) {
            if (board_no == "8") {
                $(".boardCate.event").show();
                $(".reviewTab").hide();
				$("#bbsKind").removeClass("review");
            } else {
                $(".boardCate.event").hide();
                $(".reviewTab").show();
				$("#bbsKind").addClass("review");
            }
        }
    }
});

// top Bnr
$(function() {
	$(".bnrClose.eventTopBnr").click(function() {
		$(this).hide();
		$(".txtBnr").slideUp("fast");
	});
});
