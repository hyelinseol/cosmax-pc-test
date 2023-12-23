window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      survey_mall_id = CAFE24API.MALL_ID;
      survey_shop_no = CAFE24API.SHOP_NO;
      setTimeout(async function () {
        // 상품 정보 조회
        surveyGetProductVariants();

        survey_jQuery("#survey_total_price").text(0);
      }, 500);
    })(
      CAFE24API.init({
        client_id: app_client_id,
        version: app_version,
      })
    );
  },
  false
);

function giftShow() {
  if (survey_jQuery(".subscribeBox").length == 0) {
    survey_jQuery(".total-price .total strong em").text(0 + "원");
    // 상품 리스트 영역 style
    surveyProductAreaStyle("hide");
  }
}

function surveyProductSelect(type) {

  if (survey_jQuery(".subscribeBox").length >= 1) {
    // return;
  }

  let product_type = "";
  let retail_price = 0;
  let price = 0;
  let product_no = "";
  if (type == "shampoo") {
    product_type = "유니크 맞춤 샴푸";
    retail_price = Number(survey_product_resource.shampoo.retail_price);
    price = Number(survey_product_resource.shampoo.price);
    product_no = survey_shampoo_no;
  }
  if (type == "treatment") {
    product_type = "유니크 맞춤 트리트먼트";
    retail_price = Number(survey_product_resource.treatment.retail_price);
    price = Number(survey_product_resource.treatment.price);
    product_no = survey_treatment_no;
  }
  if (type == "set_product") {
    product_type = "유니크 맞춤 헤어케어 세트";
    retail_price = Number(survey_product_resource.set_product.retail_price);
    price = Number(survey_product_resource.set_product.price);
    product_no = survey_set_product_no;
  }

  let payment_type = survey_jQuery("input[name=survey_buy_type][type=radio]:checked")
    .siblings()
    .text();
  let is_save = false;
  survey_jQuery(".subscribeBox").each(function (index, element) {
    let save_product_no = Number(survey_jQuery(element).attr("product_no"));
    let payment_text = survey_jQuery(element).find(".word").text();
    if (save_product_no == product_no && payment_text == payment_type) {
      is_save = true;
    }
  });
  // 등록된 상품 이면 추가 안함
  if (is_save) {
    return;
  }

  let total_price_str = survey_jQuery(".total-price .total em").text();

  let regex = /[^0-9]/g;
  let total_price = Number(total_price_str.replace(regex, ""));

  total_price += price;
  let total_price_resut = surveyComma(total_price) + "원";
  survey_jQuery(".total-price .total em").text(total_price_resut);

  let retail_price_html = "";
  if (retail_price != 0 && retail_price != "0") {
    retail_price_html = `<strike>${surveyComma(retail_price)}원</strike>`;
  }

  let html = `
    <div class="subscribeBox" product_no="${product_no}">
      <span class="sbClose" onclick="surveyRemoveTag(this)"></span>
      <div class="gdsBuyOpt">
        <p class="subject">${product_type}</p>
        <p class="price">
          ${retail_price_html}
          <em>${surveyComma(price)}</em>원
        </p>
      </div>
    </div>
  `;

  // 상품 리스트 영역 style
  surveyProductAreaStyle("show");

  survey_jQuery(".subscribeKindWrap").append(html);
  survey_jQuery("#survey_order_select").text(product_type);
}


function surveyProductAreaStyle(type) {
  if (type == "show") {
    survey_jQuery(".fixed-box .box-info .box-left").css("min-height", "");
    survey_jQuery(".product-info").css("height", "");
    survey_jQuery(".box-right .product-info .shadow").show();
  } else {
    // survey_jQuery(".fixed-box .box-info .box-left").css("min-height", "256px");
    survey_jQuery(".fixed-box .box-info .box-left").css("min-height", "");
    survey_jQuery(".product-info").css("height", "65px");
    survey_jQuery(".box-right .product-info .shadow").hide();
  }
}

function surveyRemoveTag(element) {
  let regex = /[^0-9]/g;
  let total_price_str = survey_jQuery(".total-price .total em").text();
  let total_price = Number(total_price_str.replace(regex, ""));

  let price = survey_jQuery(element).parent().find(".price em").text();
  price = Number(price.replace(regex, ""));
  total_price -= price;
  let total_price_resut = surveyComma(total_price) + "원";
  survey_jQuery(".total-price .total em").text(total_price_resut);

  survey_jQuery(element).parent().remove();

  let product_count = survey_jQuery(".subscribeBox").length;
  if (product_count == 0) {
    surveyProductAreaStyle("hide");
  }
}
function surveyCloseBtn() {
  // 상품 리스트 영역 style
  surveyProductAreaStyle("show");
  survey_jQuery(".survey_popup_price").hide();
  survey_jQuery(".survey_bottom_price").show();

  survey_jQuery(".fixed-box").removeClass("fix");

}