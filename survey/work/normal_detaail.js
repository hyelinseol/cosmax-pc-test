const surveyCommon = new SurveyCommon();

const survey_fix_product_no = document.querySelector("meta[property='product:productId']").getAttribute("content");

window.addEventListener(
  "load",
  async function (event) {
    await surveyCommon.getCafe24CustomerInfo(CAFE24API);

    let bom_code = "";
    let nick_name = "";

    let find = surveyCommon.survey_fix_product_list[CAFE24API.MALL_ID].find((e) => Number(e.no) == Number(survey_fix_product_no));
    if (find) {
      bom_code = find.bom_code;
      nick_name = find.nick_name;
    }
    let add_option_list = survey_jQuery("#totalProductsOption .xans-record-");
    for (let i = 0; i < add_option_list.length; i++) {
      let th = survey_jQuery(add_option_list[i]).find("th").text();
      if (th.indexOf("BOM") > -1 && bom_code) {
        survey_jQuery(add_option_list[i]).find("td input").val(bom_code);
      }
      if (th.indexOf("이름") > -1 && nick_name) {
        survey_jQuery(add_option_list[i]).find("td input").val(nick_name);
      }
    }

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
    

    // 세트 상품에 속한 상품 선택
    survey_jQuery("select[id^='setproduct_option_id']").each(async function (index, element) {
      survey_jQuery(element).children().eq(1).prop("selected", true); //첫번째 option 선택
      let element_id = survey_jQuery(element).attr("id");
      var e = document.getElementById(element_id);
      var event = new Event("change", { bubbles: true });
      e.dispatchEvent(event);
      await surveySleep(50);
    });

    // 세트 구성 상품 추가 옵션 입력
    setTimeout(async function () {
      let product_list = [];
      survey_jQuery("select[id^='setproduct_option_id']").each(async function (index, element) {
        // 세트 상품에 속한 상품 선택
        let product_no = survey_jQuery(element).attr("product-no");
        product_list.push(product_no);
      });
      if (find?.product_list && find?.product_list.length > 0) {
        for (const product of find.product_list) {
          let add_option_list = survey_jQuery(`input[name^='setproduct_add_option_id_${product}']`);
          for (let i = 0; i < add_option_list.length; i++) {
            let full_name = survey_jQuery(add_option_list[i]).attr("name");
            let option_name = survey_jQuery(add_option_list[i]).val();
            let _find = surveyCommon.survey_fix_product_list[CAFE24API.MALL_ID].find((e) => Number(e.no) == Number(product));
            let value = "";
            if (option_name.indexOf("BOM") > -1) {
              value = _find.bom_code;
            }
            if (option_name.indexOf("이름") > -1) {
              value = _find.nick_name;
            }
            survey_jQuery("#" + full_name).val(value);
            var e = document.getElementById(full_name);
            e.value = value;
            var event = new KeyboardEvent("keyup", {
              bubbles: true,
            });
            e.dispatchEvent(event);
            await surveySleep(50);
          }
        }
      }
      if (product_list.length > 0) {
        survey_jQuery(".QuantityUp").attr("href", "javascript:setProductQuantity('up')");
        survey_jQuery(".QuantityDown").attr("href", "javascript:setProductQuantity('down')");
        setTimeout(async function () {
          // let quantity = survey_jQuery(".eProductQuantityClass").val();
          survey_jQuery(`input[name^='quantity_opt']`).val(1);
          
        }, 100);
      }
      survey_jQuery(".detailBtns").css("display", "flex");
    }, 200);

    

  },
  false
);

function setProductQuantity(type) {
  if (type == "up") {
    survey_jQuery(".option_box_up").click();
  } else {
    survey_jQuery(".option_box_down").click();
  }

  setTimeout(async function () {
    let quantity = survey_jQuery(".eProductQuantityClass").val();

    survey_jQuery(`input[name^='quantity_opt']`).val(Number(quantity));

  }, 200);

}

  // 슬립
  async function surveySleep(time) {
    return new Promise(function (resolve, reject) {
      setTimeout(async function () {
        resolve(null);
      }, time);
    });
  }