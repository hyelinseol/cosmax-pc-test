$(document).ready(function(){
    var orderPrdList = $("#ec-jigsaw-area-orderProduct .xans-order-normallist > .ec-base-prdInfo");
    var _orderTotalCnt = 0;
    orderPrdList.each(function(){
        var _thisPrdCode = $(this).find(".survey_bom_code").length;
        var _thisPrdCnt = str2number($(this).find('.prdCnt').text());
        var _thisPrdTotalCnt = _thisPrdCnt * _thisPrdCode;
    
        _orderTotalCnt += _thisPrdTotalCnt;
    });
    console.log(_orderTotalCnt);
    if(_orderTotalCnt > 3){
        alert("제품 구매 수량은 3개 까지만 가능합니다");
        window.history.back();       
    } 
   
    function str2number(str){
        var res;
        res = parseInt(str.replace(/[^0-9]/g,""));
        return res;
    }
});