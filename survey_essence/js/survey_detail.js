const surveyCommon = new SurveyCommon();
let product_no = surveyCommon.shoplusGetParameters("product_no");
let gift_list = surveyCommon.shoplusGetParameters("gift_list");

if (gift_list && gift_list == "Y") {
  survey_jQuery(".btnGift").addClass("btnGift_gift");
  survey_jQuery(".survey_link").addClass("survey_link_gift");
}

survey_jQuery(".btnGift").attr("onclick", "surveyGiftClick();");

(async function (CAFE24API) {
  await surveyCommon.getCafe24CustomerInfo(CAFE24API);

  // 상품 가격 입력
  let regex = /[^0-9]/g;
  let total_price_str = survey_jQuery("#survey_product_price").text();
  let total_price = Number(total_price_str.replace(regex, ""));
  survey_jQuery("#survey_product_price").text(surveyComma(total_price) + "원");

  let total_sale_price_str = survey_jQuery("#survey_product_sale_price").text();
  let total_sale_price = Number(total_sale_price_str.replace(regex, ""));
  survey_jQuery("#survey_product_sale_price").text(surveyComma(total_sale_price) + "원");

  let total_strike_price_str = survey_jQuery(".perOriginPrice em strike").text();
  total_strike_price = Number(total_strike_price_str.replace(regex, ""));
  survey_jQuery(".perOriginPrice em strike").text(surveyComma(total_strike_price) + "원");

  // thumb-wrap

  let skin_care_product_list = survey_jQuery(".thumb-wrap");
  for (let skin_care_product of skin_care_product_list) {
    let param = survey_jQuery(skin_care_product).attr("param");
    let param_array = param.split("&");
    for (let param_item of param_array) {
      if (param_item.indexOf("product_no") > -1) {
        let product_info = param_item.split("=");
        if (product_info && product_info[1]) {
          let detail_file = "detail.html";
          if (product_info[1]) {
            let find = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find(
              (e) => Number(e.no) == Number(product_info[1])
            );
            if (find && find.type == "hair_care") {
              detail_file = "detail_hair.html";
            }
            if (find && find.type == "skin_care") {
              detail_file = "detail_essence.html";
            }
          }
          survey_jQuery(skin_care_product).children("a").attr("href", "/product/"+detail_file+"?product_no=" + product_info[1]);
          survey_jQuery(skin_care_product).parent().find(".relation-name a").attr("href", "/product/"+detail_file+"?product_no=" + product_info[1]);
        }
      }
    }
  }

  // 화면 보정
  survey_jQuery("#survey_diagnosis_move").parent().parent().css("display", "flex");
  survey_jQuery(".btn_style03").css("width", "100%");
  survey_jQuery(".btn_style03").parent().css("width", "100%");
  survey_jQuery(".btn_style03").parent().css("margin-left", "0px");
  setTimeout(async function () {
    survey_jQuery(".survey_btn_area").css("display", "flex");
  }, 3000);

  // 타입별 문진 링크 입력
  let find = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find(
    (e) => Number(e.no) == Number(product_no)
  );
  if (find) {
    let find_qna_link = surveyCommon.survey_qna_link_list[surveyCommon.survey_mall_id].find(
      (e) => e.type == find.type
    );
    if (find_qna_link) {
      survey_jQuery(".survey_link").attr("href", find_qna_link.survey_link);
    }

    if (find.detail_type.indexOf("employees") > -1) {
      let product_type = find.product_type.replace("employees_", "");
      let href = find_qna_link.survey_link + "&discount_type=" + find.detail_type + "&buy_type=" + product_type;
      survey_jQuery(".survey_link").attr("href", href);
    }
  }

  let add_option_list = survey_jQuery(`input[id^='setproduct_add_option_id`);
  for (let i=0; i < add_option_list.length; i++) {
    survey_jQuery(add_option_list[i]).val("선물하기");
  }

  let add_option_list2 = survey_jQuery(`input[id^='add_option`);
  for (let i=0; i < add_option_list2.length; i++) {
    survey_jQuery(add_option_list2[i]).val("선물하기");
  }

})(
  CAFE24API.init({
    client_id: surveyCommon.app_client_id,
    version: surveyCommon.app_version,
  })
);

window.addEventListener(
  "load",
  async function (event) {

    let add_option_list = survey_jQuery(`input[id^='setproduct_add_option_id`);
    for (let i=0; i < add_option_list.length; i++) {
      survey_jQuery(add_option_list[i]).val("선물하기");
    }

    let add_option_list2 = survey_jQuery(`input[id^='add_option`);
    for (let i=0; i < add_option_list2.length; i++) {
      survey_jQuery(add_option_list2[i]).val("선물하기");
    }

    // 일반 상품 추가 옵션 입력
    setTimeout(async function () {
      let add_option_list = survey_jQuery(`input[id^='setproduct_add_option_id`);
      for (let i=0; i < add_option_list.length; i++) {
        survey_jQuery(add_option_list[i]).val("선물하기");
      }

      let add_option_list2 = survey_jQuery(`input[id^='add_option`);
      for (let i=0; i < add_option_list2.length; i++) {
        survey_jQuery(add_option_list2[i]).val("선물하기");
      }
    }, 1000);

  },
  false
);

async function surveyGiftClick() {
  let add_option_list = survey_jQuery("#totalProductsOption .xans-record-");
  for (let i = 0; i < add_option_list.length; i++) {
    survey_jQuery(add_option_list[i]).find("td input").val("선물하기");
  }
  let add_option_list2 = survey_jQuery(`input[id^='setproduct_add_option_id']`);
  for (let i = 0; i < add_option_list2.length; i++) {
    survey_jQuery(add_option_list2[i]).val("선물하기");
  }

  await surveyDeleteCartProduct();

  chatisGPApp.clickGiveButton()
}


async function surveyDeleteCartProduct() {
  const cart_list = await surveyGetCartList();
  const find = cart_list.find((e) => Number(e.product_no) == Number(product_no));
  if (find) {
    await surveyDeleteCart(find.product_no, find.option_id, find.basket_product_no);
  }
}

async function surveyGetCartList() {
  return new Promise(function (resolve, reject) {
    CAFE24API.getCartList(function(err, res) {
      if (res) {
        resolve(res.carts);
      }
      if (err) {
        reject(err);
      }
    });
  });
}

async function surveyDeleteCart(product_no, option_id, basket_product_no) {
  return new Promise(function (resolve, reject) {
    CAFE24API.deleteCartItems(
      'A',
      [   
        {
          product_no,
          option_id,
          basket_product_no
        },
      ],
      function(err,res) {
        if (res) {
          resolve(res);
        }
        if (err) {
          reject(err);
        }
      }
    );
  });
}
