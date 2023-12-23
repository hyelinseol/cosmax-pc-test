const surveyCommon = new SurveyCommon();
let product_no = surveyCommon.shoplusGetParameters("product_no");

let gift_list = surveyCommon.shoplusGetParameters("gift_list");

const discount_type = surveyCommon.shoplusGetParameters("discount_type");

if (gift_list && gift_list == "Y") {
  survey_jQuery(".btnGift").addClass("btnGift_gift");
  survey_jQuery(".btn_style03").addClass("survey_link_gift");
  survey_jQuery(".survey_start").addClass("survey_link_gift");
}

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
    if (param?.indexOf("&") > -1) {
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
  }

  // 화면 보정
  survey_jQuery("#survey_diagnosis_move").parent().parent().css("display", "flex");
  survey_jQuery(".btn_style03").css("width", "100%");
  survey_jQuery(".btn_style03").parent().css("width", "100%");
  survey_jQuery(".btn_style03").parent().css("margin-left", "0px");
  setTimeout(async function () {
    survey_jQuery(".survey_btn_area").css("display", "flex");
  }, 500);

  /*
  let find_qna_link = surveyCommon.survey_qna_link_list[surveyCommon.survey_mall_id].find(
    (e) => e.type == "hair_care" && e.detail_type == ""
  );
  survey_jQuery(".btn_style03").attr("href", find_qna_link.survey_link);

  // 타입별 문진 링크 입력
  let find = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find(
    (e) => Number(e.no) == Number(product_no)
  );
  */

  // 타입별 문진 링크 입력
  let find = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find(
    (e) => Number(e.no) == Number(product_no)
  );

  let find_qna_link = surveyCommon.survey_qna_link_list[surveyCommon.survey_mall_id].find(
    (e) => e.type == find.type && e.detail_type == ""
  );
  survey_jQuery(".btn_style03").attr("href", find_qna_link.survey_link);

  if (find) {
    if (find.detail_type.indexOf("employees") > -1) {
      let product_type = find.product_type.replace("employees_", "");
      let href = find_qna_link.survey_link + "&discount_type=" + find.detail_type + "&buy_type=" + product_type;
      survey_jQuery(".btn_style03").attr("href", href);
      survey_jQuery(".survey_start").attr("href", href);
    }
    if (find.detail_type == "sample") {
      let find_qna_link = surveyCommon.survey_qna_link_list[surveyCommon.survey_mall_id].find(
        (e) => e.type == "hair_care" && e.detail_type == "sample"
      );
      survey_jQuery(".btn_style03").attr("href", find_qna_link.survey_link);
      survey_jQuery(".survey_start").attr("href", find_qna_link.survey_link);
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

    let find = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find(
      (e) => Number(e.no) == Number(product_no)
    );
    if (find.detail_type == "sample") {
      survey_jQuery("select[id^='setproduct_option_id']").each(function (index, element) {

        let element_val = survey_jQuery(element).val();
        // 세트 상품에 속한 상품 선택
        let options = survey_jQuery(element).children();
      
        for (let i = 0; i < options.length; i++) {
          let text = survey_jQuery(options[i]).text();
      
          if (survey_jQuery(options[i]).val() == "*") {
            continue;
          } else {
            if (element_val != "*") {
              continue;
            }
            let element_id = survey_jQuery(element).attr("id");
            let val = survey_jQuery(options[i]).val();
            var e = document.getElementById(element_id);
            e.value = val;
            var event = new Event("change", { bubbles: true });
            e.dispatchEvent(event);
          }
        }
      });
    }

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
