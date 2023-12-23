EC$(function ($) {
    //할인율표기
    discount();
    function discount() {
        //상품목록
        $(".prdList").each(function () {
            $(this)
                .find("> li")
                .each(function (eee) {
                    //console.log(eee + " 000000 ");
                    var price1 = String($(this).find(".description").attr("ec-data-custom")).replace(/\,/g, "").replace("원", ""); //소비자가
                    if (price1 == "0" && $(this).find(".description > ul").length == 2) {
                        var pp1 = String($(this).find(".description .display판매가 > span").text()).replace(/\,/g, "").replace("원", "");
                        var pp2 = String($(this).find(".description .display할인판매가 > span").text()).replace(/\,/g, "").replace("원", "");
                        if (!isNaN(pp1) && !isNaN(pp2)) {
                            var discountRate = Math.floor(((pp1 - pp2) / pp1) * 100);
                            //console.log(eee + " 2 >>> " + discountRate);
                            if (discountRate > 0 && discountRate != 100) {
                                //$(this).css("border", "1px solid red");
                                //$(this).find(".description > ul:eq(0)").hide();
                                //$(this).find(".description > ul:eq(1) > li > span").before('<span class="disPrice">' + discountRate + "%</span>");

                                $(this)
                                    .find(".description .display할인판매가 > span")
                                    .before('<span class="disPrice">' + discountRate + "%</span>");
                                var priceHtml = $(this).find(".description .display판매가 > span:eq(0)").html();
                                $(this).find(".description .display판매가 > span:eq(0)").html($("<strike>").append(priceHtml));

                                //$(this).find('.display판매가').append('<div class="ec-sale-rate">'+discountRate+'%</div>');
                                //alert(12);
                            }
                        }
                    } else {
                        var price3 = $(this).find(".description .display판매가").length;
                        var price4 = $(this).find(".description .display할인판매가").length;
                        if (price3 > 0 && price4 > 0) {
                            //console.log(eee + " >>> 12121212");
                            var pp1 = $(this).find(".description .display판매가 > span:eq(0)").text().replace(/\,/g, "").replace("원", "");
                            var pp2 = $(this).find(".description .display할인판매가 > span:eq(0)").text().replace(/\,/g, "").replace("원", "");
                            if (!isNaN(pp1) && !isNaN(pp2)) {
                                var discountRate = Math.floor(((pp1 - pp2) / pp1) * 100);
                                if (discountRate > 0 && discountRate != 100) {
                                    //$(this).find('.description > ul:eq(0)').hide();
                                    $(this)
                                        .find(".description > ul:eq(1) > li > span:eq(0)")
                                        .before('<span class="disPrice">' + discountRate + "%</span>");

                                    $(this).find(".description .display판매가 > span:eq(0)").css({ "text-decoration": "none" });
                                    var priceHtml = $(this).find(".description .display판매가 > span:eq(0)").html();
                                    $(this).find(".description .display판매가 > span:eq(0)").html($("<strike>").append(priceHtml));
                                }
                            }
                        } else {
                            var price2 = String($(this).find(".description").attr("ec-data-price")).replace(/\,/g, "").replace("원", ""); //판매가
                            var price2 = price2.split(" "); //판매가참조화폐 구분
                            if (!isNaN(price1) && !isNaN(price2[0])) {
                                discountRate = Math.floor(((price1 - price2[0]) / price1) * 100);
                                if (discountRate > 0 && discountRate != 100 && $(this).find(".ec-sale-rate").length < 1) {
                                    $(this)
                                        .find(".display판매가")
                                        .append('<div class="ec-sale-rate">' + discountRate + "%</div>");
                                }
                            }
                        }
                    }
                });
        });

        // 메인페이지 영역
        if ($(".js-sale-price").length) {
            function discount2() {
                $(".js-sale-price").each(function (eee) {
                    //console.log(eee + " >>> discount2");
                    var price1 = String($(this).find(".description").attr("ec-data-custom")).replace(/\,/g, "").replace("원", ""); //소비자가
                    if (price1 == "0" && $(this).find(".description > ul").length == 2) {
                        //console.log(eee + " >>> discount2 111");
                        //$(this).find(".description").css('border', '1px solid red');
                        var pp1 = String($(this).find(".description > ul:eq(0) > li > span").text()).replace(/\,/g, "").replace("원", "");
                        var pp2 = String($(this).find(".description > ul:eq(1) > li > span").text()).replace(/\,/g, "").replace("원", "");
                        //alert(pp1 + ' , ' + pp2);
                        if (!isNaN(pp1) && !isNaN(pp2)) {
                            var discountRate = Math.round(((pp1 - pp2) / pp1) * 100);
                            if (discountRate > 0 && discountRate != 100) {
                                $(this).find(".description > ul:eq(0)").hide();
                                $(this)
                                    .find(".description > ul:eq(1) > li > span")
                                    .before('<span class="disPrice">' + discountRate + "%</span>");
                                //$(this).find('.display판매가').append('<div class="ec-sale-rate">'+discountRate+'%</div>');
                                //alert(12);
                            }
                        }
                    } else {
                        //$(this).find(".description").css('border', '1px solid red');
                        var price3 = $(this).find(".description .display판매가").length;
                        var price4 = $(this).find(".description .display할인판매가").length;
                        if (price3 > 0 && price4 > 0) {
                            //console.log(12121212);
                            //$(this).find(".description").css('border', '1px solid red');
                            var pp1 = $(this).find(".description .display판매가 > span:eq(0)").text().replace(/\,/g, "").replace("원", "");
                            var pp2 = $(this).find(".description .display할인판매가 > span:eq(0)").text().replace(/\,/g, "").replace("원", "");
                            //console.log(pp1, pp2);
                            if (!isNaN(pp1) && !isNaN(pp2)) {
                                var discountRate = Math.round(((pp1 - pp2) / pp1) * 100);
                                if (discountRate > 0 && discountRate != 100) {
                                    $(this)
                                        .find(".description .display할인판매가 > span:eq(0)")
                                        .before('<span class="disPrice">' + discountRate + "%</span>");
                                    $(this).find(".description .display판매가 > span:eq(0)").css({ "text-decoration": "none" });
                                    var priceHtml = $(this).find(".description .display판매가 > span:eq(0)").html();
                                    $(this).find(".description .display판매가 > span:eq(0)").html($("<strike>").append(priceHtml));
                                }
                            }
                        } else {
                            var price2 = String($(this).find(".description").attr("ec-data-price")).replace(/\,/g, "").replace("원", ""); //판매가
                            var price2 = price2.split(" "); //판매가참조화폐 구분
                            if (!isNaN(price1) && !isNaN(price2[0])) {
                                discountRate = Math.round(((price1 - price2[0]) / price1) * 100);
                                if (discountRate > 0 && discountRate != 100 && $(this).find(".ec-sale-rate").length < 1) {
                                    $(this)
                                        .find(".display판매가")
                                        .append('<div class="ec-sale-rate">' + discountRate + "%</div>");
                                }
                            }
                        }
                    }
                });
            }
            discount2();
        }
    }

    if ($(".xans-product-detaildesign").length) {
        discount2();
        function discount2() {
            //상품상세,확대보기(팝업)
            var price1 = String($(".xans-product-detail #span_product_price_custom").text()).replace(/\,/g, "").replace("원", ""); //소비자가
            var price2 = String($(".xans-product-detail #span_product_price_text").text()).replace(/\,/g, "").replace("원", ""); //판매가
            var price2 = price2.split(" "); //판매가참조화폐 구분
            if (!isNaN(price1) && !isNaN(price2[0])) {
                discountRate = Math.round(((price1 - price2[0]) / price1) * 100);
                if (discountRate > 0 && discountRate != 100 && $(this).find(".ec-sale-rate").length < 1) {
                    $(".xans-product-detail #span_product_price_text").append('<span class="ec-sale-rate">' + discountRate + "%</span>");
                }
            }
        }
    }
});
