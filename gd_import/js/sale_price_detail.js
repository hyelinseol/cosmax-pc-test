window.addEventListener(
  "load",
  async function (event) {
    EC$(function($) {
      //할인율표기
      function discount(){
        //상품목록
        $('.perPrdInfo').each(function(){
          var pp1 = String($(this).attr('data-price1')).replace(/\,/g, '').replace('원', '');
          var pp2 = String($(this).attr('data-price2')).replace(/\,/g, '').replace('원', '');
          //alert(pp1 + ' , ' + pp2);
          var product_sale_price = false;
          if (!isNaN(pp1) && !isNaN(pp2)) {
            var discountRate = Math.floor((pp1 - pp2) / pp1 * 100);
            if(discountRate > 0 && discountRate != 100) {
              $(this).find('.prdPerPrice.ct-type1 .disPrice').text(discountRate + '%');
              $(this).find('.prdPerPrice.ct-type1').show();
              $(this).find('.prdPerPrice.ct-type2').hide();

              product_sale_price = true;
            }
          }

          if (product_sale_price == false) {
            $(this).find('.prdPerPrice.ct-type1').hide();
            $(this).find('.prdPerPrice.ct-type2').show();
          }
        });

        $('.prd-list > li').each(function(){
          var pp1 = String($(this).attr('data-price1')).replace(/\,/g, '').replace('원', '');
          var pp2 = String($(this).attr('data-price2')).replace(/\,/g, '').replace('원', '');
          //alert(pp1 + ' , ' + pp2);
          var product_sale_price = false;
          if (!isNaN(pp1) && !isNaN(pp2)) {
            var discountRate = Math.floor((pp1 - pp2) / pp1 * 100);
            if(discountRate > 0 && discountRate != 100) {
              $(this).find('.disPrice').text(discountRate + '%');
              product_sale_price = true;
            }
          }

          if (product_sale_price == false) {
            //$(this).find('.prdPerPrice.ct-type1').hide();
            //$(this).find('.prdPerPrice.ct-type2').show();
          }
        });

        $('.total-price-wrap').each(function(){
          var pp1 = String($(this).attr('data-price1')).replace(/\,/g, '').replace('원', '');
          var pp2 = String($(this).attr('data-price2')).replace(/\,/g, '').replace('원', '');
          //alert(pp1 + ' , ' + pp2);
          var product_sale_price = false;
          if (!isNaN(pp1) && !isNaN(pp2)) {
            var discountRate = Math.floor((pp1 - pp2) / pp1 * 100);
            if(discountRate > 0 && discountRate != 100) {
              $(this).find('.discount').text(discountRate + '%');
              product_sale_price = true;
            }
          }

          if (product_sale_price == false) {
            $(this).find('.discount').remove();
          }
        });

        // mypage product_recentlist
		$(".recentPrd .swiper-wrapper .swiper-slide").each(function () {
            var pp1_txt = $(this).find(".description").attr("ec-data-price");
            var pp2_txt = $(this).find(".description").attr("ec-data-price4");
            var pp1 = String(pp1_txt).replace(/\,/g, "").replace("원", "");
            var pp2 = String(pp2_txt).replace(/\,/g, "").replace("원", "");
            //alert(pp1 + ' , ' + pp2);
            var product_sale_price = false;
            if (!isNaN(pp1) && !isNaN(pp2)) {
                var discountRate = Math.floor(((pp1 - pp2) / pp1) * 100);
                if (discountRate > 0 && discountRate != 100) {
                    $(this)
                        .find(".price")
                        .html("<strike>" + pp1_txt + "</strike>" + "<string>" + discountRate + "%</string>" + "<p>" + pp2_txt + "</p>");
                    product_sale_price = true;
                }
            }

            if (product_sale_price == false) {
                //$(this).find('.prdPerPrice.ct-type1').hide();
                //$(this).find('.prdPerPrice.ct-type2').show();
            }
        });

      }
      discount();
    });
  },
  false
);