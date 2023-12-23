/* 검색기간설정 */
$(document).ready(function(){
 $('.set .period a').click(function(e){
    $('.period a').removeClass('on');
    $(this).addClass('on');
      e.preventDefault();
   });
})


$('.stateSelect .order_status li a').click(function(){
    $('.order_status li').removeClass('on');
    $(this).parent('li').addClass('on');
});


$('.xans-myshop-orderhistorylistitem').height($('.xans-myshop-orderhistorylistitem tr').eq(0).height() + $('.xans-myshop-orderhistorylistitem tr').eq(0).height()*26.34);
/*
$('.btn-more button').on('click', function(){
    $(this).closest('.xans-myshop-orderhistorylistitem').height('auto').addClass('active');
    $(this).remove();
});
*/