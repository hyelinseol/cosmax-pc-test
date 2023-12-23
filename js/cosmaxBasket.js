$(document).ready(function(){
    /* 
    $(".xans-order-list > .xans-record-").each(function(){
        var _thisPrdName = $(this).find(".ec-product-name").text();
        var _thisPrdCnt = $(this).find(".ec-base-qty input").val();
        console.log(_thisPrdCnt);
        if(_thisPrdName.indexOf('세트') != "-1"){
            if(_thisPrdCnt > 2){
                $(this).addClass("asdasd123");
                // $(this).find("a.cosmaxDetailBlock").attr("onclick","alert('세트상품의 최대 주문수량은 1개 입니다');return false;");
                // $(this).find("a.cosmaxDetailBlock2").attr("onclick","alert('세트상품의 최대 주문수량은 1개 입니다');return false;");
                $(this).find("a.cosmaxDetailBlock").removeClass("displaynone");
                $(this).find("a.cosmaxDetailBlock2").removeClass("displaynone");
               
            }else if(_thisPrdCnt > 3){
          	   $(this).find("a.cosmaxChkBlock3").removeClass("displaynone");
            }
        }else{
            if(_thisPrdCnt > 2){
                console.log("초과");
                //$(this).find("a.cosmaxDetailBlock").removeClass("displaynone");
                //$(this).find("a.cosmaxDetailBlock2").removeClass("displaynone");
                //$(this).find("a.cosmaxDetailBlock3").removeClass("displaynone");
            }
        }
    });
	*/


    
    $('input[name*="basket_product_normal_type_normal"], .chkN > input').click(function(){
        var _chkAllCnt = 0; 
        $('input[name*="basket_product_normal_type_normal"]').each(function(index){
            if($(this).is(":checked")){
                var thisChkCnt = $(this).closest("tr").find('.ec-base-qty input').val();
                var thisChkName =  $(this).closest("tr").find('.ec-product-name').text();
                var chkCntNum = Number(thisChkCnt);

                if(thisChkName.indexOf('세트') != "-1"){
                    _chkAllCnt+=chkCntNum * 2;
                }else{
                    _chkAllCnt+=chkCntNum;
                }
            }
        });


        if(_chkAllCnt > 7){
            $(".cosmaxChkBlock").removeClass("displaynone");
        }else{
            $(".cosmaxChkBlock").addClass("displaynone");
        }

    });
    
 

    giftChk('.ec-base-table.typeList .xans-order-list tr', function(){ 

        var nowPrdPrice = $(".xans-order-totalsummary .total_product_price_display_front").text().replace(",", "");
        var nowPrdPriceNb = Number(nowPrdPrice);
        var nowPrdSale = $(".xans-order-totalsummary #total_product_discount_price_front").text().replace(",", "");
        var nowPrdSaleNb = Number(nowPrdSale);
        var nowPrdTotal = $(".xans-order-totalsummary #total_order_price_front").text().replace(",", "");
        var nowPrdTotalNb = Number(nowPrdTotal);

        var customPrice = 0;
        var customSale = 0;
        var customTotal = 0;
	 var _chkAllCnt2 = 0;
        $('.xans-order-basketpackage table tr.xans-record-').each(function(index){
            var thisGiftChk = $(this).find('.chatis_gp_give_present_button').length;

            if(thisGiftChk !=0){
              
                var thisChkCnt2 = $(this).find('.ec-base-qty input').val();
                var chkCntNum3 = Number(thisChkCnt2);
                if(chkCntNum3 > 7){
                    $(this).find(".cosmaxChkBlock3").removeClass("displaynone");
                }
                

            }else{
               

                var thisChkCnt = $(this).find('.ec-base-qty input').val();
                var thisChkName =  $(this).find('.ec-product-name').text();
                var chkCntNum2 = Number(thisChkCnt);

                if(thisChkName.indexOf('세트') != "-1"){
                    _chkAllCnt2+=chkCntNum2 * 2;
                }else{
                    _chkAllCnt2+=chkCntNum2;
                }



                console.log(_chkAllCnt2);
                if(_chkAllCnt2 > 7){
                    $(".cosmaxChkBlock").removeClass("displaynone");
                    $(this).find(".cosmaxChkBlock2").removeClass("displaynone");
                }else{
                    $(this).find(".cosmaxChkBlock2").addClass("displaynone");
                    $(".cosmaxChkBlock").addClass("displaynone");
                }
            }
        });


    }); 

    function giftChk(selector, callback) {
        var input = $(selector);
        var oldvalue = input.text();
        setInterval(function(){
            if (input.text()!=oldvalue){
                oldvalue = input.text();
                callback();
            }
        }, 100);
    }

    // 기프틴 스크립트가 오랫동안 돌지 않거나 앱을 중지한 경우, 주문에 영향 없도록 3초 이후 자동 삭제
    setTimeout(function () {
        console.log("3초 지남");
    	$(".block_until_separate_basket").remove();
    }, 3000);

});