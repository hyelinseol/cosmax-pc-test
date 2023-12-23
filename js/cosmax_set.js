$(document).ready(function(){
    EC$("#setLoadBtn").bind("click", function(){        
        EC$('.productSet ul.product > li').each(function(){
            var _thisSelect = EC$(this).find('.option select');
            var choosenOpt = EC$(this).find('.option select option:nth-child(2)').val();
            var setNameChk = $('.re_product_detail .detail-header .box-info .name').text();

            //$(this).find('.option select option:nth-child(2)').attr('selected','selected');
            select_option( _thisSelect, choosenOpt);
            //EC$(this).find('.option select').val(choosenOpt);

            function select_option( selector, value ){        
                EC$(selector).find('option[value="' + value + '"]').prop('selected', true).trigger('change');	
            }

            EC$(document).on("change", _thisSelect, function() {
                setTimeout(function (){
                    $('#totalProducts tbody tr td:nth-child(1)').children('p').text(setNameChk);
                },500);
            });
        });	
    });

    var setNameChk = $('.re_product_detail .detail-header .box-info .name').text();

    console.log(setNameChk);
    if(setNameChk.indexOf('세트') != "-1"){
        //percentageCul(oPriceInfoEl, salePriceEl);
        var saleNumb = $('#setPriceChk').text().replace(",","").replace("원","");
        var saleNumbPrice = Number(saleNumb); 
        setTimeout(function (){ 
            EC$("#setLoadBtn").click();
            $('.xans-product-detail').addClass('setActive');
 
        
        },500);

    }


});