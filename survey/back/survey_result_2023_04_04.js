let survey_osdl_type = null;
survey_member_id = null;

let _survey_product_no = shoplusGetParameters("product_no");
const regex = /[^0-9]/g;
let survey_product_no = _survey_product_no.replace(regex, "") * 1;

let is_survey_cart_click = false;

let survey_gift_key = null;

let survey_product_type = null;

let survey_bom_code = [];

let survey_nick_name = null;

let survey_diagnosis_result = null;

function setSurveyResult() {
  // 세트상품 체크 하여 히든
  if (survey_product_no == survey_shampoo_no || survey_product_no == survey_treatment_no) {
    survey_jQuery(".btnArea").hide();
    survey_jQuery(".tabWrap").removeClass("tabWrap");
    survey_jQuery(".con").css("padding-top", "0px");
  }

  if (survey_product_no == survey_treatment_no) {
    survey_jQuery(".tab02").click();
  }
}

function surveyInputBomCode(result) {
  if (result.bom_code.length == 1) {
    survey_jQuery("#add_option_0").val(result.bom_code[0]);
    survey_jQuery("#add_option_1").val(result.manage_product_nick_name);
  } else {
    let set_count = 1;
    // 1개가 아니면 세트 상품
    survey_jQuery("select[id^='setproduct_option_id']").each(function (index, element) {
      // 세트 상품에 속한 상품 선택
      let options = survey_jQuery(element).children();

      for (let i = 0; i < options.length; i++) {
        let text = survey_jQuery(options[i]).text();
        if (text.indexOf("트리트먼트") > -1 || text.indexOf("샴푸") > -1) {
          if (survey_jQuery(element).val() == "*") {
            let element_id = survey_jQuery(element).attr("id");
            let val = survey_jQuery(options[i]).val();
            var e = document.getElementById(element_id);
            e.value = val;
            var event = new Event("change", { bubbles: true });
            e.dispatchEvent(event);
          } else {
            if (options.length == set_count) {
              let element_id = survey_jQuery(element).attr("id");
              let val = survey_jQuery(options[i]).val();
              var e = document.getElementById(element_id);
              e.value = val;
              var event = new Event("change", { bubbles: true });
              e.dispatchEvent(event);
            }
            set_count++;
          }
        }
      }
    });
    setTimeout(function () {
      // 코드 입력
      for (const bom_code of result.bom_code) {
        survey_jQuery("input[name^='setproduct_add_option_id']").each(function (index, element) {
          let input_value = survey_jQuery(element).val();
          // 샴푸
          if (bom_code.indexOf("CSP") > -1 && input_value.indexOf("맞춤형 샴푸 BOM") > -1) {
            let input_id = survey_jQuery(element).attr("name");
            survey_jQuery("#" + input_id).val(bom_code);
            survey_jQuery(element).next().val(bom_code);
          }
          if (bom_code.indexOf("CSP") > -1 && input_value.indexOf("맞춤형 샴푸 이름") > -1) {
            let input_id = survey_jQuery(element).attr("name");
            survey_jQuery("#" + input_id).val(result.manage_product_nick_name);
            survey_jQuery(element).next().val(result.manage_product_nick_name);
          }
          if (bom_code.indexOf("CSP") > -1 && input_value.indexOf("맞춤형 샴푸 해시코드") > -1) {
            let input_id = survey_jQuery(element).attr("name");
            survey_jQuery("#" + input_id).val(result.hash);
            survey_jQuery(element).next().val(result.hash);
          }
          // 트리트 먼트
          if (bom_code.indexOf("CHT") > -1 && input_value.indexOf("맞춤형 트리트먼트 BOM") > -1) {
            let input_id = survey_jQuery(element).attr("name");
            survey_jQuery("#" + input_id).val(bom_code);
            survey_jQuery(element).next().val(bom_code);
          }
          if (bom_code.indexOf("CHT") > -1 && input_value.indexOf("맞춤형 트리트먼트 이름") > -1) {
            let input_id = survey_jQuery(element).attr("name");
            survey_jQuery("#" + input_id).val(result.manage_product_nick_name);
            survey_jQuery(element).next().val(result.manage_product_nick_name);
          }
          if (
            bom_code.indexOf("CHT") > -1 &&
            input_value.indexOf("맞춤형 트리트먼트 해시코드") > -1
          ) {
            let input_id = survey_jQuery(element).attr("name");
            survey_jQuery("#" + input_id).val(result.hash);
            survey_jQuery(element).next().val(result.hash);
          }
        });
      }
    }, 500);
  }
}

// 조회
async function getSurveyConfig() {
  survey_product_no = shoplusGetParameters("product_no");
  return new Promise(function (resolve, reject) {
    // 세트 상품일 때
    if (survey_product_no == survey_set_product_no) {
      survey_jQuery.ajax({
        url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${survey_shampoo_no}`,
        type: "get",
        data: {},
        dataType: "json",
        success: async function (result) {
          await getSurveyReQnaConfig(survey_shampoo_no, result.qna_hierarchy);
          // resolve(result);
        },
      });
      survey_jQuery.ajax({
        url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${survey_treatment_no}`,
        type: "get",
        data: {},
        dataType: "json",
        success: async function (result) {
          await getSurveyReQnaConfig(survey_treatment_no, result.qna_hierarchy);
          resolve(result);
        },
      });
    } else {
      // 세트 상품 아닐때
      survey_jQuery.ajax({
        url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${survey_product_no}`,
        type: "get",
        data: {},
        dataType: "json",
        success: async function (result) {
          await getSurveyReQnaConfig(survey_product_no, result.qna_hierarchy);
          resolve(result);
        },
      });
    }
  });
}

function getSurveyReQnaConfig(product_no, qna_hierarchy) {
  let hash = shoplusGetParameters("hash");
  let hash_param = "";
  if (hash) {
    hash_param = "hash=" + hash;
  }
  let member_id_param = "";
  if (survey_member_id) {
    // member_id_param = `&member_id=${survey_member_id}`;
  }
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${survey_product_no}/re_qna?${hash_param}${member_id_param}`,
      type: "get",
      data: {},
      dataType: "json",
      success: function (result) {
        // 샴푸 or 트리트먼트

        let survey_worry_selected = [];
        // 세트 상품이 아닐때
        if (survey_product_no != survey_set_product_no) {
          for (const qna of qna_hierarchy) {
            for (const qna_children of qna.children) {
              if (qna_children.question_type == "main") {
                for (const answer of qna_children.children) {
                  let index = result.surveys[0].survey_result.findIndex(
                    (e) => Number(e) == Number(answer.hierarchy_id)
                  );
                  if (index > -1) {
                    survey_worry_selected.push(answer.subject);
                  }
                }
              }
              if (qna_children.question_type == "scent") {
                for (const answer of qna_children.children) {
                  let index = result.surveys[0].survey_result.findIndex(
                    (e) => Number(e) == Number(answer.hierarchy_id)
                  );
                  if (index > -1) {
                    if (answer.subject.indexOf("- 강하게") == -1) {
                      // survey_jQuery(".survey_scent_type").text("보통");
                    } else {
                      // survey_jQuery(".survey_scent_type").text("강하게");
                    }
                  }
                }
              }
            }
          }
        } else {
          for (let survey of result.surveys) {
            if (Number(survey.product_no) == Number(product_no)) {
              for (const qna of qna_hierarchy) {
                for (const qna_children of qna.children) {
                  if (qna_children.question_type == "main") {
                    for (const answer of qna_children.children) {
                      let index = survey.survey_result.findIndex(
                        (e) => Number(e) == Number(answer.hierarchy_id)
                      );
                      if (index > -1) {
                        survey_worry_selected.push(answer.subject);
                      }
                    }
                  }
                  if (qna_children.question_type == "scent") {
                    for (const answer of qna_children.children) {
                      let index = survey.survey_result.findIndex(
                        (e) => Number(e) == Number(answer.hierarchy_id)
                      );
                      if (index > -1) {
                        if (answer.subject.indexOf("- 강하게") == -1) {
                          // survey_jQuery(".survey_scent_type").text("보통");
                        } else {
                          // survey_jQuery(".survey_scent_type").text("강하게");
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (Number(product_no) == Number(survey_shampoo_no)) {
          localStorage.setItem(
            "survey_worry_shampoo_selected",
            JSON.stringify(survey_worry_selected)
          );
        }
        if (Number(product_no) == Number(survey_treatment_no)) {
          localStorage.setItem(
            "survey_worry_treatment_selected",
            JSON.stringify(survey_worry_selected)
          );
        }
        // localStorage.setItem("survey_worry_selected", JSON.stringify(survey_worry_selected));
        resolve(result);
      },
    });
  });
}

async function getSurveyDiagnosis() {
  let qna_at = shoplusGetParameters("qna_at");
  if (qna_at && qna_at.indexOf("#progress") > -1) {
    qna_at = qna_at.replace("#progress", "");
  }
  if (qna_at && qna_at.indexOf("#none") > -1) {
    qna_at = qna_at.replace("#none", "");
  }
  qna_at = dayjs(qna_at).format("YYYY-MM-DD");

  let hash = shoplusGetParameters("hash");
  let member_param = "";
  if (survey_member_id) {
    // member_param = `&member_id=${survey_member_id}`;
  }
  survey_jQuery.ajax({
    url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnosis?hash=${hash}&from=${qna_at}&to=${qna_at}${member_param}`,
    type: "get",
    data: {},
    dataType: "json",
    success: async function (result) {
      for (let befor_qna of result) {
        if (befor_qna.hash == hash) {
          survey_befor_qna_result = befor_qna;
          const newObj = { ...befor_qna, ...befor_qna.osdl_result };
          delete newObj.osdl_result;
          sessionStorage.setItem("survey_result", JSON.stringify(newObj));
          survey_jQuery(".survey_product_name").text("#" + newObj.manage_product_nick_name);
        }
      }
      for (let product_id of result[0].product_id) {
        await getSurveySetProductDiagnosisResult(hash, qna_at, Number(product_id));
      }
      survey_diagnosis_result = result[0];
      surveyInputBomCode(result[0]);
    },
  });
}

async function getSurveyDiagnosisResult() {
  let survey_result = JSON.parse(sessionStorage.getItem("survey_result"));
  let hash = survey_result.hash;
  let qna_at = dayjs().format("YYYY-MM-DD");
  let member_param = "";
  if (survey_member_id) {
    // member_param = `&member_id=${survey_member_id}`;
  }
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnosis?hash=${hash}&from=${qna_at}&to=${qna_at}${member_param}`,
      type: "get",
      data: {},
      dataType: "json",
      success: async function (result) {
        for (let befor_qna of result) {
          if (befor_qna.hash == hash) {
            survey_befor_qna_result = befor_qna;
            const newObj = { ...befor_qna, ...befor_qna.osdl_result };
            delete newObj.osdl_result;
            sessionStorage.setItem("survey_result", JSON.stringify(newObj));
            survey_jQuery(".survey_product_name").text("#" + newObj.manage_product_nick_name);
          }
        }
        for (let product_id of result[0].product_id) {
          await getSurveySetProductDiagnosisResult(hash, qna_at, Number(product_id));
        }

        surveyInputBomCode(result[0]);

        resolve(result);
      },
    });
  });
}

async function getSurveySetProductDiagnosisResult(hash, qna_at, product_id) {
  let member_param = "";
  if (survey_member_id) {
    // member_param = `&member_id=${survey_member_id}`;
  }
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnosis?hash=${hash}&from=${qna_at}&to=${qna_at}&product_id=${product_id}${member_param}`,
      type: "get",
      data: {},
      dataType: "json",
      success: function (result) {
        survey_bom_code.push(result[0].bom_code[0]);
        survey_nick_name = result[0].manage_product_nick_name;
        if (result[0].bom_code[0].indexOf("CSP") > -1) {
          setSurveyDiagnosisResult(survey_shampoo_no, result[0]);
        }
        if (result[0].bom_code[0].indexOf("CHT") > -1) {
          setSurveyDiagnosisResult(survey_treatment_no, result[0]);
        }
        resolve(result);
      },
    });
  });
}

function setSurveyDiagnosisResult(product_no, result) {
  let survey_set_param_info = sessionStorage.getItem("survey_set_param");
  let survey_set_param = JSON.parse(survey_set_param_info);

  let survey_target = null;
  let survey_worry_selected = [];
  if (Number(product_no) == Number(survey_shampoo_no)) {
    survey_target = "#survey_shampoo_area";
    survey_worry_selected = localStorage.getItem("survey_worry_shampoo_selected");
  }
  if (Number(product_no) == Number(survey_treatment_no)) {
    survey_target = "#survey_treatmen_area";
    survey_worry_selected = localStorage.getItem("survey_worry_treatment_selected");
  }

  if (!result.manage_product_nick_name && survey_set_param.member.product_name) {
    result.manage_product_nick_name = survey_set_param.member.product_name;
  }

  // OSDL 입력
  survey_jQuery("#survey_scalp").text(result.osdl_result.osdl.scalp);
  survey_jQuery("#survey_sensitive").text(result.osdl_result.osdl.sensitive);
  survey_jQuery("#survey_hair").text(result.osdl_result.osdl.hair);
  survey_jQuery("#survey_hair_loss").text(result.osdl_result.osdl.hair_loss);
  survey_jQuery(".survey_osdl_type").text(
    result.osdl_result.osdl.scalp +
      result.osdl_result.osdl.sensitive +
      result.osdl_result.osdl.hair +
      result.osdl_result.osdl.hair_loss +
      " 타입"
  );

  // ODSL 이미지 하단 텍스트
  survey_jQuery("#survey_osdl_text_top").html(surveyEnterBr(result.osdl_result.osdl.pc_text.top));
  survey_jQuery("#survey_osdl_text_bottom").html(
    surveyEnterBr(result.osdl_result.osdl.pc_text.bottom)
  );

  // 지성, 중성, 건성 세팅
  if (result.osdl_result.osdl.scalp == "O") {
    survey_jQuery(".oily_checked").addClass("checked");
    survey_jQuery("#survey_scalp_text").text("지성");
    survey_jQuery("#survey_scalp_image").attr(
      "src",
      "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/ht_O.svg"
    );
    survey_jQuery("#survey_shampoo_scalp").text("지성");
  } else if (result.osdl_result.osdl.scalp == "N") {
    survey_jQuery(".normal_checked").addClass("checked");
    survey_jQuery("#survey_scalp_text").text("중성");
    survey_jQuery("#survey_scalp_image").attr(
      "src",
      "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/ht_N.svg"
    );
    survey_jQuery("#survey_shampoo_scalp").text("중성");
  } else {
    survey_jQuery(".dry_checked").addClass("checked");
    survey_jQuery("#survey_scalp_text").text("건성");
    survey_jQuery("#survey_scalp_image").attr(
      "src",
      "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/ht_D.svg"
    );
    survey_jQuery("#survey_shampoo_scalp").text("건성");
  }

  // 민감성 세팅
  if (result.osdl_result.osdl.sensitive == "S") {
    survey_jQuery(".sensitive_checked").addClass("checked");
    survey_jQuery("#survey_sensitive_text").text("민감성");
    survey_jQuery("#survey_sensitive_image").attr(
      "src",
      "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/ht_S.svg"
    );
  } else {
    survey_jQuery(".resistant_checked").addClass("checked");
    survey_jQuery("#survey_sensitive_text").text("저항성");
    survey_jQuery("#survey_sensitive_image").attr(
      "src",
      "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/ht_R.svg"
    );
  }

  // 건강모, 손상모, 극손상모 세팅
  if (result.osdl_result.osdl.hair == "H") {
    survey_jQuery(".healthy_checked").addClass("checked");
    survey_jQuery("#survey_hair_text").text("건강모");
    survey_jQuery("#survey_hair_image").attr(
      "src",
      "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/ht_H.svg"
    );
    survey_jQuery("#survey_treatment_hair").text("건강모");
  } else if (result.osdl_result.osdl.hair == "D") {
    survey_jQuery(".damaged_checked").addClass("checked");
    survey_jQuery("#survey_hair_text").text("손상모");
    survey_jQuery("#survey_hair_image").attr(
      "src",
      "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/ht_D.svg"
    );
    survey_jQuery("#survey_treatment_hair").text("손상모");
  } else {
    survey_jQuery(".extremely_damaged_checked").addClass("checked");
    survey_jQuery("#survey_hair_text").text("극손상모");
    survey_jQuery("#survey_hair_image").attr(
      "src",
      "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/ht_E.svg"
    );
    survey_jQuery("#survey_treatment_hair").text("극손상모");
  }

  // 탈모 고민
  if (result.osdl_result.osdl.hair_loss == "L") {
    survey_jQuery(".hair_loss_checked").addClass("checked");
    survey_jQuery("#survey_hair_loss_text").text("탈모 고민");
    survey_jQuery("#survey_hair_loss_image").attr(
      "src",
      "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/ht_L.svg"
    );
  } else {
    survey_jQuery(".without_hair_loss_checked").addClass("checked");
    survey_jQuery("#survey_hair_loss_text").text("탈모 고민 없음");
    survey_jQuery("#survey_hair_loss_image").attr(
      "src",
      "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/ht_W.svg"
    );
  }

  // let survey_worry_selected = localStorage.getItem("survey_worry_selected");
  // alert(survey_worry_selected);
  let survey_worry_selected_array = JSON.parse(survey_worry_selected);
  survey_jQuery(survey_target + " .survey_worry_list").empty();
  let select_worry_array = [];
  for (const worry of survey_worry_selected_array) {
    let set_append_html = `
    <li>
      ${worry}
    </li>`;
    survey_jQuery(survey_target + " .survey_worry_list").append(set_append_html);
    select_worry_array.push("#" + worry);
  }

  survey_jQuery(".survey_result_text").text("고객님이 문진 첫 화면에서 직접 선택한 기능입니다.");

  // 샴푸
  let shampoo_keyword = result.osdl_result.point1.shampoo_keyword.split(" ");

  // shampoo_level
  let left_percent = 0;
  if (result.osdl_result.point1.sequence == 1) {
    left_percent = 16;
  }
  if (result.osdl_result.point1.sequence == 2) {
    left_percent = 34;
  }
  if (result.osdl_result.point1.sequence == 3) {
    left_percent = 50;
  }
  if (result.osdl_result.point1.sequence == 4) {
    left_percent = 66;
  }
  if (result.osdl_result.point1.sequence == 5) {
    left_percent = 83;
  }
  if (result.osdl_result.point1.sequence == 6) {
    left_percent = 100;
  }
  survey_jQuery(survey_target + " .shampoo_level").css("left", left_percent + "%");
  survey_jQuery(survey_target + " .shampoo_keyword").text(shampoo_keyword[0]);
  survey_jQuery(survey_target + " .shampoo_keyword_level").text(shampoo_keyword[1]);

  let treatment_keyword = result.osdl_result.point1.treatment_keyword.split(" ");

  survey_jQuery(survey_target + " .treatment_level").css("left", left_percent + "%");
  survey_jQuery(survey_target + " .treatment_keyword").text(treatment_keyword[0]);
  survey_jQuery(survey_target + " .treatment_keyword_level").text(treatment_keyword[1]);

  let shampoo_pc_point = surveyEnterBr(result.osdl_result.point1.shampoo_pc_point);
  survey_jQuery(survey_target + " #shampoo_pc_point").html(`<strong>${shampoo_pc_point}</strong>`);

  let treatment_pc_point = surveyEnterBr(result.osdl_result.point1.treatment_pc_point);
  survey_jQuery(survey_target + " #treatment_pc_point").html(
    `<strong>${treatment_pc_point}</strong>`
  );

  let survey_worry_text = select_worry_array.join(",");
  survey_jQuery(survey_target + " .survey_worry_text").text(survey_worry_text);

  // 엠플 입력
  survey_jQuery(survey_target + " .survey_ampoules_area").empty();

  // 샴푸
  for (let ampoule of result.osdl_result.point2.ampoules) {
    let ampoule_name_array = ampoule.name.split("\n");
    let ampoule_name = ampoule_name_array[0];
    let sub_ampoule_name_html = "";
    if (ampoule_name_array.length > 1) {
      sub_ampoule_name_html = "<span>" + ampoule_name_array[1] + "</span>";
    }

    let ingredient_html = "";
    for (let ingredient of ampoule.ingredients) {
      ingredient_html += `
        <li>
          <div class="cont_img">
            <img src="${ingredient.image}" alt="추출물">
          </div>
          <div class="cont_txt">
            ${ingredient.name}
          </div>
        </li>
      `;
    }

    let ampoule_image = "";
    if (ampoule_name == "돌콩배아추출물") {
      ampoule_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple01.gif";
    }
    if (ampoule_name == "딥클린 콤플렉스™" || ampoule_name == "딥클린 콤플렉스 ™") {
      ampoule_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple02.gif";
    }
    if (ampoule_name == "피록톤올아민") {
      ampoule_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple03.gif";
    }
    if (ampoule_name == "멘톨&허브쿨" || ampoule_name == "멘톨 & 허브쿨") {
      ampoule_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple04.gif";
    }
    if (ampoule_name == "세범컨트롤 콤플렉스™" || ampoule_name == "세범컨트롤 콤플렉스 ™") {
      ampoule_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple05.gif";
    }
    if (ampoule_name == "자라나리옴") {
      ampoule_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple06.gif";
    }
    if (ampoule_name == "미라클미네랄") {
      ampoule_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple07.gif";
    }
    if (ampoule_name == "판테놀&아쿠아씰" || ampoule_name == "판테놀 & 아쿠아씰") {
      ampoule_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple08.gif";
    }
    if (ampoule_name == "프로텍션 콤플렉스™" || ampoule_name == "프로텍션 콤플렉스 ™") {
      ampoule_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple09.gif";
    }
    if (
      ampoule_name == "너리싱 콤플렉스™" ||
      ampoule_name == "너리싱 콤플렉스 ™" ||
      ampoule_name == "너시링 콤플렉스™" ||
      ampoule_name == "너시링 콤플렉스 ™"
    ) {
      ampoule_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple10.gif";
    }
    if (ampoule_name == "엔젤링 콤플렉스™" || ampoule_name == "엔젤링 콤플렉스 ™") {
      ampoule_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple11.gif";
    }

    let set_html = `
      <div class="solution_cont">
        <div class="in">
          <h3 class="tit">
            ${ampoule_name}
            ${sub_ampoule_name_html}
          </h3>
          <div class="img"><img src="${ampoule_image}" alt="특허성분이미지"></div>
          
          <div class="explan">
            ${surveyEnterBr(ampoule.description)}
          </div>
          <div class="cont_list">
            <ul>
              ${ingredient_html}
            </ul>
          </div>
        </div>
      </div>
    `;
    survey_jQuery(survey_target + " .survey_ampoules_area").append(set_html);
  }

  survey_jQuery(survey_target + " .survey_ampoules_list").empty();
  for (const ingredient of result.osdl_result.point2.bottom_fix_ingredient) {
    let set_html = `
    <li>
      <div class="img"><img src="${ingredient.image}" alt="${ingredient.name}"></div>
      <div class="txt">
        ${ingredient.name}
      </div>
    </li>
    `;
    survey_jQuery(survey_target + " .survey_ampoules_list").append(set_html);
  }

  if (result.osdl_result.point3.scent.name) {
    survey_jQuery(survey_target + " .survey_scent_name").text(result.osdl_result.point3.scent.name);
    survey_jQuery(survey_target + " .survey_scent_detail_description").html(
      surveyEnterBr(result.osdl_result.point3.scent.detail_description)
    );
    survey_jQuery(survey_target + " .survey_scent_image").attr(
      "src",
      result.osdl_result.point3.scent.image
    );

    survey_jQuery(survey_target + " .survey_scent_top").text(
      result.osdl_result.point3.scent.text.top
    );
    survey_jQuery(survey_target + " .survey_scent_mid").text(
      result.osdl_result.point3.scent.text.mid
    );
    survey_jQuery(survey_target + " .survey_scent_bottom").text(
      result.osdl_result.point3.scent.text.bottom
    );
  } else {
    survey_jQuery(survey_target + " .survey_scent_name").text("Fragrance Free");
    survey_jQuery(survey_target + " .survey_scent_name")
      .next()
      .hide();
    // survey_jQuery(survey_target + " .survey_scent_detail_description").hide();
    survey_jQuery(survey_target + " .survey_scent_detail_description").html(
      `민감한 고객님들을 위해<br>향료를 추가하지 않았습니다.`
    );
    survey_jQuery(survey_target + " .survey_scent_image").attr("src", survey_no_fragrance_image);
    survey_jQuery(survey_target + " .survey_scent_top")
      .parent()
      .parent()
      .hide();
  }

  survey_jQuery(survey_target + " .survey_scent_image").attr(
    "style",
    "width: 792px; height: 480px !important;"
  );

  // 지성, 중성, 건성 세팅
  let scalp_list = [];
  let survey_scalp_type_image = "";
  if (result.osdl_result.osdl.scalp == "O") {
    survey_jQuery("#survey_scalp_type").html("<strong>지성</strong>이라면?");
    scalp_list = result.osdl_result.point4.hair_tip.scalp;
    survey_scalp_type_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/scalp01.png";
  } else if (result.osdl_result.osdl.scalp == "N") {
    survey_jQuery("#survey_scalp_type").html("<strong>중성</strong>이라면?");
    scalp_list = result.osdl_result.point4.hair_tip.scalp;
    survey_scalp_type_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/scalp02.png";
  } else {
    survey_jQuery("#survey_scalp_type").html("<strong>건성</strong>이라면?");
    scalp_list = result.osdl_result.point4.hair_tip.scalp;
    survey_scalp_type_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/scalp03.png";
  }

  survey_jQuery("#survey_scalp_type").nextAll().remove();
  for (const scalp of scalp_list) {
    let text = surveyEnterBr(scalp.text);
    let set_html = `
      <p class="tip">Tip</p>
      <p class="info">${text}</p>
    `;
    survey_jQuery("#survey_scalp_list").append(set_html);
    survey_jQuery("#survey_scalp_type_image").attr("src", survey_scalp_type_image);
  }

  // 민감성 세팅
  let sensitive_list = [];
  let survey_sensitive_type_image = "";
  if (result.osdl_result.osdl.sensitive == "S") {
    survey_jQuery("#survey_sensitive_type").html("<strong>민감성</strong>이라면?");
    sensitive_list = result.osdl_result.point4.hair_tip.sensitive;
    survey_sensitive_type_image =
      "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/scalp04.png";
  } else {
    survey_jQuery("#survey_sensitive_type").html("<strong>비민감성</strong>이라면?");
    sensitive_list = result.osdl_result.point4.hair_tip.sensitive;
    survey_sensitive_type_image =
      "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/scalp05.png";
  }

  survey_jQuery("#survey_sensitive_type").nextAll().remove();
  for (const sensitive of sensitive_list) {
    let text = surveyEnterBr(sensitive.text);
    let set_html = `
      <p class="tip">Tip</p>
      <p class="info">${text}</p>
    `;
    survey_jQuery("#survey_sensitive_list").append(set_html);
    survey_jQuery("#survey_sensitive_type_image").attr("src", survey_sensitive_type_image);
  }

  // 건강모, 손상모, 극손상모 세팅
  let hair_list = [];
  let survey_hair_type_image = "";
  if (result.osdl_result.osdl.hair == "H") {
    survey_jQuery("#survey_hair_type").html("<strong>건강모</strong>라면?");
    hair_list = result.osdl_result.point4.hair_tip.hair;
    survey_hair_type_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/scalp06.png";
  } else if (result.osdl_result.osdl.hair == "D") {
    survey_jQuery("#survey_hair_type").html("<strong>손상모</strong>라면?");
    hair_list = result.osdl_result.point4.hair_tip.hair;
    survey_hair_type_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/scalp07.png";
  } else {
    survey_jQuery("#survey_hair_type").html("<strong>(극)손상모</strong>라면?");
    hair_list = result.osdl_result.point4.hair_tip.hair;
    survey_hair_type_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/scalp07.png";
  }

  survey_jQuery("#survey_hair_type").nextAll().remove();
  for (const hair of hair_list) {
    let text = surveyEnterBr(hair.text);
    let set_html = `
      <p class="tip">Tip</p>
      <p class="info">${text}</p>
    `;
    survey_jQuery("#survey_hair_list").append(set_html);
    survey_jQuery("#survey_hair_type_image").attr("src", survey_hair_type_image);
  }

  // 탈모 고민
  let hair_loss_list = [];
  let survey_hair_loss_type_image = "";
  if (result.osdl_result.osdl.hair_loss == "L") {
    survey_jQuery("#survey_hair_loss_type").html("<strong>탈모</strong>라면?");
    hair_loss_list = result.osdl_result.point4.hair_tip.hair_loss;
    survey_hair_loss_type_image =
      "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/scalp08.png";
  } else {
    survey_jQuery("#survey_hair_loss_type").html("<strong>탈모를 예방</strong>하려면?");
    hair_loss_list = result.osdl_result.point4.hair_tip.hair_loss;
    survey_hair_loss_type_image =
      "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/scalp09.png";
  }
  survey_jQuery("#survey_hair_loss_type").nextAll().remove();
  for (const hair_loss of hair_loss_list) {
    let text = surveyEnterBr(hair_loss.text);
    let set_html = `
      <p class="tip">Tip</p>
      <p class="info">${text}</p>
    `;
    survey_jQuery("#survey_hair_loss_list").append(set_html);
    survey_jQuery("#survey_hair_loss_type_image").attr("src", survey_hair_loss_type_image);
  }

  survey_jQuery(survey_target + " .survey_bom_code").text(
    result.bom_code[0].substr(survey_bom_cut_start, survey_bom_cut_end)
  );

  if (survey_set_param && survey_set_param.member && survey_set_param.member.product_name) {
    survey_jQuery(survey_target + " .survey_product_name").text(
      "#" + survey_set_param.member.product_name
    );
  }

  if (survey_set_param && survey_set_param.scent_type) {
    if (survey_set_param.scent_type == "normal") {
      // survey_jQuery(survey_target + " .survey_scent_type").text("보통");
    } else {
      // survey_jQuery(survey_target + " .survey_scent_type").text("강하게");
    }
  }
}

function surveyEnterBr(text) {
  if (!text) {
    return null;
  }
  return text.replace(/(\n|\r\n)/g, "<br>");
}

function surveyProductSelect(type) {
  let product_type = "";
  let retail_price = 0;
  let pc_discount_price = 0;
  let price = 0;
  let product_no = "";
  if (type == "shampoo") {
    product_type = survey_product_resource.shampoo.product_name;
    retail_price = Number(survey_product_resource.shampoo.retail_price);
    price = Number(survey_product_resource.shampoo.price);
    pc_discount_price = Number(survey_product_resource.shampoo.discountprice.pc_discount_price);
    product_no = survey_shampoo_no;
  }
  if (type == "treatment") {
    product_type = survey_product_resource.treatment.product_name;
    retail_price = Number(survey_product_resource.treatment.retail_price);
    price = Number(survey_product_resource.treatment.price);
    pc_discount_price = Number(survey_product_resource.treatment.discountprice.pc_discount_price);
    product_no = survey_treatment_no;
  }
  if (type == "set_product") {
    product_type = survey_product_resource.set_product.product_name;
    retail_price = Number(survey_product_resource.set_product.retail_price);
    price = Number(survey_product_resource.set_product.price);
    pc_discount_price = Number(survey_product_resource.set_product.discountprice.pc_discount_price);
    product_no = survey_set_product_no;
  }

  survey_jQuery("#survey_order_select").text(product_type);
  survey_jQuery("#survey_order_select").attr("product_type", type);

  // let survey_buy_type_value = survey_jQuery("input[name=survey_buy_type][type=radio]:checked").val();
  let survey_buy_type_value = "one";
  if (!survey_buy_type_value) {
    return;
  }

  let survey_regular_cycle = "";
  //let payment_type = "1회 구매";
  let payment_type = "";
  if (survey_buy_type_value == "regular") {
    payment_type = "정기 구독";
    survey_regular_cycle = survey_jQuery(".survey_regular_cycle").val();
    if (survey_regular_cycle) {
      if (survey_regular_cycle == "2W") {
        payment_type += " - 2주";
      }
      if (survey_regular_cycle == "1M") {
        payment_type += " - 1개월";
      }
      if (survey_regular_cycle == "2M") {
        payment_type += " - 2개월";
      }
    }
  }
  let is_save = false;
  survey_jQuery(".subscribeBox").each(function (index, element) {
    let save_product_no = Number(survey_jQuery(element).attr("product_no"));
    let payment_buy_type = survey_jQuery(element).attr("payment_buy_type");
    let payment_text = survey_jQuery(element).find(".word").text();
    /*
    if (save_product_no == product_no && payment_buy_type == "regular") {
      is_save = true;
      survey_jQuery(element).find(".word").text(payment_type);
      survey_jQuery(element).attr("regular_cycle", survey_regular_cycle);
    }
    */
    if (save_product_no == product_no) {
      is_save = true;
    }
  });
  if (is_save) {
    return;
  }
  let total_price_str = survey_jQuery(".survey_popup_price .total em").text();

  let regex = /[^0-9]/g;
  let total_price = Number(total_price_str.replace(regex, ""));

  total_price += pc_discount_price;

  let total_price_resut = surveyComma(total_price) + "원";
  survey_jQuery(".survey_popup_price .total em").text(total_price_resut);

  // 수량
  let total_quantity = Number(survey_jQuery(".survey_popup_price .survey_quantity").text());
  total_quantity += 1;
  survey_jQuery(".survey_popup_price .survey_quantity").text(total_quantity);

  let price_html = "";
  if (price != 0 && price != "0" && Number(price) > Number(pc_discount_price)) {
    price_html = `<strike>${surveyComma(price)}원</strike>`;
  }

  let bom_code = survey_befor_qna_result.bom_code.join(",");
  let nick_name = survey_befor_qna_result.manage_product_nick_name;
  let qna_type = survey_befor_qna_result.qna_type;
  let hash = survey_befor_qna_result.hash;

  let html = `
  <div class="subscribeBox" product_no="${product_no}" bom_code="${bom_code}" nick_name="${nick_name}" qna_type="${qna_type}" hash="${hash}" payment_buy_type="${survey_buy_type_value}" regular_cycle="${survey_regular_cycle}">
    <span class="sbClose" onclick="surveyRemoveTag(this)"></span>
    <div class="gdsBuyOpt">
      <p class="subject">${product_type}</p>
      <p class="price">
        ${price_html}
        <em>${surveyComma(pc_discount_price)}</em>원
      </p>
    </div>
    <div class="quantity">
      <input id="quantity" name="quantity_opt[]" style="" value="1" type="text" readonly />
      <a href="javascript:;" class="up QuantityUp" onclick="surveyQuantity(this, 'up')"
        ><img
          src="//img.echosting.cafe24.com/skin/base_ko_KR/product/btn_count_up.gif"
          alt="수량증가"
      /></a>
      <a href="javascript:;" class="down QuantityDown"  onclick="surveyQuantity(this, 'down')"
        ><img
          src="//img.echosting.cafe24.com/skin/base_ko_KR/product/btn_count_down.gif"
          alt="수량감소"
      /></a>
    </div>
    <p class="word">${payment_type}</p>
  </div>`;

  // 상품 리스트 영역 style
  surveyProductAreaStyle("show");

  survey_jQuery(".subscribeKindWrap").append(html);

  /*
  if (type == "shampoo") {
    product_type = "3WAAU 샴푸";
  }
  if (type == "treatment") {
    product_type = "3WAAU 트리트먼트";
  }
  if (type == "set_product") {
    product_type = "샴푸와 트리트먼트";
  }
  */
}

function surveyRemoveTag(element) {
  let regex = /[^0-9]/g;
  let total_price_str = survey_jQuery(".survey_popup_price .total em").text();
  let total_price = Number(total_price_str.replace(regex, ""));

  let quantity = Number(survey_jQuery(element).parent().find(".quantity input").val());
  let price = survey_jQuery(element).parent().find(".price em").text();

  // 수량
  let total_quantity = Number(survey_jQuery(".survey_popup_price .survey_quantity").text());
  total_quantity -= quantity;
  survey_jQuery(".survey_popup_price .survey_quantity").text(total_quantity);

  price = Number(price.replace(regex, ""));
  total_price -= price * quantity;
  let total_price_resut = surveyComma(total_price) + "원";
  survey_jQuery(".survey_popup_price .total em").text(total_price_resut);

  survey_jQuery(element).parent().remove();

  let product_count = survey_jQuery(".subscribeBox").length;
  if (product_count == 0) {
    surveyProductAreaStyle("hide");
  }
}

function surveyQuantity(element, type) {
  let regex = /[^0-9]/g;
  let total_price_str = survey_jQuery(".survey_popup_price .total em").text();
  let total_price = Number(total_price_str.replace(regex, ""));
  let total_quantity = Number(survey_jQuery(".survey_popup_price .survey_quantity").text());
  let price_str = survey_jQuery(element).parent().parent().find(".price em").text();
  let price = Number(price_str.replace(regex, ""));

  let count = Number(survey_jQuery(element).parent().children().eq(0).val());
  if (type == "up") {
    count += 1;
    total_quantity += 1;
    total_price += price;
  } else {
    if (count > 1) {
      count -= 1;
      total_quantity -= 1;
      total_price -= price;
    }
  }

  // 총 금액
  let total_price_resut = surveyComma(total_price) + "원";
  survey_jQuery(".survey_popup_price .total em").text(total_price_resut);
  // 총 수량
  survey_jQuery(".survey_popup_price .survey_quantity").text("");
  survey_jQuery(".survey_popup_price .survey_quantity").text(total_quantity);

  survey_jQuery(element).parent().children().eq(0).val(count);
}

async function surveyCart(type) {
  if (is_survey_cart_click == true) {
    return;
  }
  is_survey_cart_click = true;

  let product_list = survey_jQuery(".subscribeBox");
  if (product_list.length == 0) {
    is_survey_cart_click = false;
    alert("상품을 선택해주세요.");
    return;
  }
  let is_show_alert = true;
  let is_set_product = false;
  let is_cart_set_product = false;

  if (survey_diagnosis_result) {
      // 코드 입력
      for (const result_bom_code of survey_diagnosis_result.bom_code) {
        survey_jQuery("input[name^='setproduct_add_option_id']").each(function (index, element) {
          let input_value = survey_jQuery(element).val();
          // 샴푸
          if (result_bom_code.indexOf("CSP") > -1 && input_value.indexOf("맞춤형 샴푸 BOM") > -1) {
            let input_id = survey_jQuery(element).attr("name");
            survey_jQuery("#" + input_id).val(result_bom_code);
            survey_jQuery(element).next().val(result_bom_code);
          }
          if (result_bom_code.indexOf("CSP") > -1 && input_value.indexOf("맞춤형 샴푸 이름") > -1) {
            let input_id = survey_jQuery(element).attr("name");
            survey_jQuery("#" + input_id).val(survey_diagnosis_result.manage_product_nick_name);
            survey_jQuery(element).next().val(survey_diagnosis_result.manage_product_nick_name);
          }
          if (result_bom_code.indexOf("CSP") > -1 && input_value.indexOf("맞춤형 샴푸 해시코드") > -1) {
            let input_id = survey_jQuery(element).attr("name");
            survey_jQuery("#" + input_id).val(survey_diagnosis_result.hash);
            survey_jQuery(element).next().val(survey_diagnosis_result.hash);
          }
          // 트리트 먼트
          if (result_bom_code.indexOf("CHT") > -1 && input_value.indexOf("맞춤형 트리트먼트 BOM") > -1) {
            let input_id = survey_jQuery(element).attr("name");
            survey_jQuery("#" + input_id).val(result_bom_code);
            survey_jQuery(element).next().val(result_bom_code);
          }
          if (result_bom_code.indexOf("CHT") > -1 && input_value.indexOf("맞춤형 트리트먼트 이름") > -1) {
            let input_id = survey_jQuery(element).attr("name");
            survey_jQuery("#" + input_id).val(survey_diagnosis_result.manage_product_nick_name);
            survey_jQuery(element).next().val(survey_diagnosis_result.manage_product_nick_name);
          }
          if (
            result_bom_code.indexOf("CHT") > -1 &&
            input_value.indexOf("맞춤형 트리트먼트 해시코드") > -1
          ) {
            let input_id = survey_jQuery(element).attr("name");
            survey_jQuery("#" + input_id).val(survey_diagnosis_result.hash);
            survey_jQuery(element).next().val(survey_diagnosis_result.hash);
          }
        });
      }
  }

  // let survey_cart_list = await getSurveyCartList();
  // let find_set_product = survey_cart_list.find((e) => Number(e.product_no) == Number(survey_set_product_no));
  // if (find_set_product) {
  //   is_cart_set_product = true;
  // }

  for (const product of product_list) {
    let product_no = Number(survey_jQuery(product).attr("product_no"));
    let bom_code = survey_jQuery(product).attr("bom_code");
    let nick_name = survey_jQuery(product).attr("nick_name");
    let qna_type = survey_jQuery(product).attr("qna_type");
    let hash = survey_jQuery(product).attr("hash");
    let quantity = survey_jQuery(product).find(".quantity input").val();

    let payment_buy_type = survey_jQuery(product).attr("payment_buy_type");
    let regular_cycle = survey_jQuery(product).attr(".regular_cycle");

    // 세트가 아니면 담는다
    if (product_no != survey_set_product_no) {
      await surveySetCart(product_no, bom_code, nick_name, qna_type, hash, quantity);
    } else {
      is_set_product = true;
      survey_jQuery("#option_box1_quantity").val(quantity);
    }

    // await surveySetCart(product_no, bom_code, nick_name, qna_type, hash, quantity);
    /*
    if (product_no != survey_set_product_no) {
      // 샴푸, 트리트먼트
      surveySetCart(product_no, bom_code, nick_name, qna_type, hash, quantity);
      setTimeout(function () {
        if (type && type == "cart") {
          if (is_show_alert == true) {
            is_show_alert = false;
            if (confirm("장바구니 담기가 되었습니다.\n장바구니 페이지로 이동하시겠습니까?")) {
              location.href = "/order/basket.html";
            }
          }
        } else {
          location.href = "/order/basket.html";
        }
        is_survey_cart_click = false;
      }, 1000);
    } else {
      // 세트 상품
      survey_jQuery(".survey_set_product_cart").click();
      is_survey_cart_click = false;
    }
    */
  }

  await surveySetTime(500);
  // 세트 상품 체크
  if (is_set_product == true) {
    // 장바구니에 세트가 있으면
    if (is_cart_set_product) {
      alert(
        "장바구니에 헤어케어 세트 상품이 있습니다.\n서로 레시피가 다른 세트 상품은 하나의 장바구니에 담아 한 번에 결제할 수 없어요.\n서로 레시피가 다른 세트 상품을 여러 개 구매하고 싶다면, 각각 따로 결제를 진행해 주세요."
      );
      is_survey_cart_click = false;
      return;
    }
    survey_jQuery(".survey_set_product_cart").click();
  } else {
    if (type && type == "cart") {
      if (confirm("장바구니 담기가 되었습니다.\n장바구니 페이지로 이동하시겠습니까?")) {
        location.href = "/order/basket.html";
      }
    } else {
      location.href = "/order/basket.html";
    }
  }
  is_survey_cart_click = false;

  /*
  await surveySetTime(1000);
  if (type && type == "cart") {
    if (is_show_alert == true) {
      is_show_alert = false;
      if (confirm("장바구니 담기가 되었습니다.\n장바구니 페이지로 이동하시겠습니까?")) {
        location.href = "/order/basket.html";
      }
    }
  } else {
    location.href = "/order/basket.html";
  }
  is_survey_cart_click = false;
  */
}

function surveyBuyBtn() {
  if (survey_jQuery(".subscribeBox").length == 0) {
    survey_jQuery(".survey_popup_price .total em").text("0원");

    // 상품 리스트 영역 style
    surveyProductAreaStyle("hide");
  }

  survey_jQuery(".survey_popup_price").css("display", "flex");
  survey_jQuery(".survey_bottom_price").hide();
}

function surveyCloseBtn() {
  // 상품 리스트 영역 style
  surveyProductAreaStyle("show");

  survey_jQuery(".survey_popup_price").hide();
  survey_jQuery(".survey_bottom_price").show();
}

function surveyProductAreaStyle(type) {
  if (type == "show") {
    survey_jQuery(".fixed-box .box-info .box-left").css("min-height", "");
    survey_jQuery(".product-info").css("height", "");
    survey_jQuery(".box-right .product-info .shadow").show();
  } else {
    survey_jQuery(".fixed-box .box-info .box-left").css("min-height", "256px");
    survey_jQuery(".product-info").css("height", "65px");
    survey_jQuery(".box-right .product-info .shadow").hide();
  }
}

function surveyGiftBtn() {
  // https://채티스-도메인?gift_key=채티스key&bom_code=샴푸bom_code,트리트먼트
  let bom_code = survey_bom_code.join(",");
  let hash = shoplusGetParameters("hash");
  location.href = `https://gp.chatis.app/gc?gift_code=${survey_gift_key}&bom_code=${bom_code}&hash=${hash}&nick_name=${survey_nick_name}`;
}

async function getSurveyBoms() {
  let survey_ingredient_text_list = [];

  let survey_scent_list = await surveyGetScent();

  for (const bom_code of survey_bom_code) {
    let survey_ingredients = [];
    let bom_info = await getSurveyBom(bom_code, survey_scent_list);
    for (const bom of bom_info) {
      if (bom.ingredients && bom.ingredients.length > 0) {
        for (const ingredient of bom.ingredients) {
          if (survey_ingredients.indexOf(ingredient.RAWCDK) == -1) {
            survey_ingredients.push(ingredient.RAWCDK);
          }
        }
      }
    }
    if (bom_code.indexOf("CHT") > -1) {
      survey_ingredient_text_list.push(
        "<span style='font-weight: bold;'>트리트먼트</span> : " + survey_ingredients.join(", ")
      );
    }
    if (bom_code.indexOf("CSP") > -1) {
      survey_ingredient_text_list.unshift(
        "<span style='font-weight: bold;'>샴푸</span> : " + survey_ingredients.join(", ")
      );
    }
    if (survey_ingredient_text_list.length > 0) {
      let survey_ingredient_text = survey_ingredient_text_list.join("<br>");
      survey_jQuery(".survey_ingredients").html(survey_ingredient_text);
    }
  }
}

async function surveyGetScent() {
  return new Promise(function (resolve, reject) {
    let product_no = Number(survey_product_no);
    if (product_no == survey_set_product_no) {
      product_no = survey_treatment_no;
    }
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/scent`,
      type: "get",
      data: { product_no },
      dataType: "json",
      success: function (result) {
        resolve(result);
      },
      error: function (e) {},
    });
  });
}

async function getSurveyBom(bom_code, scent_list) {
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/bom/${bom_code}`,
      type: "get",
      dataType: "json",
      success: function (result) {

        if (bom_code.indexOf("CHT") > -1) {
          for (let bom of result) {
            if (bom.bulk_group_name == "향") {
              let find = scent_list.find((e) => e.bulk_code == bom.composition.bulk_code);
              if (find) {
                if (Number(bom.composition.ratio) < 1) {
                  survey_jQuery(".survey_scent_type").text("보통");
                } else {
                  survey_jQuery(".survey_scent_type").text("강하게");
                }
              }
            }
          }
        }
        if (bom_code.indexOf("CSP") > -1) {
          for (let bom of result) {
            if (bom.bulk_group_name == "향") {
              let find = scent_list.find((e) => e.bulk_code == bom.composition.bulk_code);
              if (find) {
                if (Number(bom.composition.ratio) < 1) {
                  survey_jQuery(".survey_scent_type").text("보통");
                } else {
                  survey_jQuery(".survey_scent_type").text("강하게");
                }
              }
            }
          }
        }
        resolve(result);
      },
      error: function (request, status, error) {
        resolve([]);
      },
    });
  });
}

function surveyBuyTypeChange(type) {
  if (type == "one") {
    survey_jQuery(".surveyRegularDelivery").hide();
    survey_jQuery(".survey_regular_cycle").val("");
  } else {
    survey_jQuery(".surveyRegularDelivery").show();
  }

  if (type == "regular") {
    return;
  }
  //
  let select_product_type = survey_jQuery("#survey_order_select").attr("product_type");
  let product_type = "";
  let retail_price = 0;
  let price = 0;
  let product_no = "";
  if (select_product_type == "shampoo") {
    product_type = survey_product_resource.shampoo.product_name;
    retail_price = Number(survey_product_resource.shampoo.retail_price);
    price = Number(survey_product_resource.shampoo.discountprice.pc_discount_price);
    product_no = survey_shampoo_no;
  }
  if (select_product_type == "treatment") {
    product_type = survey_product_resource.treatment.product_name;
    retail_price = Number(survey_product_resource.treatment.retail_price);
    price = Number(survey_product_resource.treatment.discountprice.pc_discount_price);
    product_no = survey_treatment_no;
  }
  if (select_product_type == "set_product") {
    product_type = survey_product_resource.set_product.product_name;
    retail_price = Number(survey_product_resource.set_product.retail_price);
    price = Number(survey_product_resource.set_product.discountprice.pc_discount_price);
    product_no = survey_set_product_no;
  }

  /*
  let payment_type = survey_jQuery("input[name=survey_buy_type][type=radio]:checked")
    .siblings(".payment_text")
    .text();
  */

  //let payment_type = "1회 구매";
  let payment_type = "";
  let survey_buy_type_value = survey_jQuery(
    "input[name=survey_buy_type][type=radio]:checked"
  ).val();
  if (!survey_buy_type_value) {
    return;
  }
  if (survey_buy_type_value == "regular") {
    payment_type = "정기 구독";
    let survey_regular_cycle = survey_jQuery(".survey_regular_cycle").val();
    if (survey_regular_cycle) {
      if (survey_regular_cycle == "2W") {
        payment_type += " - 2주";
      }
      if (survey_regular_cycle == "1M") {
        payment_type += " - 1개월";
      }
      if (survey_regular_cycle == "2M") {
        payment_type += " - 2개월";
      }
    }
  }

  let is_save = false;
  survey_jQuery(".subscribeBox").each(function (index, element) {
    let save_product_no = Number(survey_jQuery(element).attr("product_no"));
    let payment_text = survey_jQuery(element).find(".word").text();
    if (save_product_no == product_no && payment_text == payment_type) {
      is_save = true;
    }
  });
  if (is_save) {
    return;
  }

  let total_price_str = survey_jQuery(".survey_popup_price .total em").text();

  let regex = /[^0-9]/g;
  let total_price = Number(total_price_str.replace(regex, ""));

  total_price += price;

  let total_price_resut = surveyComma(total_price) + "원";
  survey_jQuery(".survey_popup_price .total em").text(total_price_resut);

  // 수량
  let total_quantity = Number(survey_jQuery(".survey_popup_price .survey_quantity").text());
  total_quantity += 1;
  survey_jQuery(".survey_popup_price .survey_quantity").text(total_quantity);

  let retail_price_html = "";
  if (retail_price != 0 && retail_price != "0" && Number(retail_price) > Number(price)) {
    retail_price_html = `<strike>${surveyComma(retail_price)}원</strike>`;
  }

  let bom_code = survey_befor_qna_result.bom_code.join(",");
  let nick_name = survey_befor_qna_result.manage_product_nick_name;
  let qna_type = survey_befor_qna_result.qna_type;
  let hash = survey_befor_qna_result.hash;

  let html = `
  <div class="subscribeBox" product_no="${product_no}" bom_code="${bom_code}" nick_name="${nick_name}" qna_type="${qna_type}" hash="${hash}" payment_buy_type="${survey_buy_type_value}">
    <span class="sbClose" onclick="surveyRemoveTag(this)"></span>
    <div class="gdsBuyOpt">
      <p class="subject">${product_type}</p>
      <p class="price">
        ${retail_price_html}
        <em>${surveyComma(price)}</em>원
      </p>
    </div>
    <div class="quantity">
      <input id="quantity" name="quantity_opt[]" style="" value="1" type="text" readonly />
      <a href="javascript:;" class="up QuantityUp" onclick="surveyQuantity(this, 'up')"
        ><img
          src="//img.echosting.cafe24.com/skin/base_ko_KR/product/btn_count_up.gif"
          alt="수량증가"
      /></a>
      <a href="javascript:;" class="down QuantityDown"  onclick="surveyQuantity(this, 'down')"
        ><img
          src="//img.echosting.cafe24.com/skin/base_ko_KR/product/btn_count_down.gif"
          alt="수량감소"
      /></a>
    </div>
    <p class="word">${payment_type}</p>
  </div>`;

  // 상품 리스트 영역 style
  surveyProductAreaStyle("show");
  survey_jQuery(".subscribeKindWrap").append(html);
}

function surveyRegularCycleChange() {
  let survey_regular_cycle = survey_jQuery(".survey_regular_cycle").val();

  //
  let select_product_type = survey_jQuery("#survey_order_select").attr("product_type");
  let product_type = "";
  let retail_price = 0;
  let price = 0;
  let product_no = "";
  if (select_product_type == "shampoo") {
    product_type = survey_product_resource.shampoo.product_name;
    retail_price = Number(survey_product_resource.shampoo.retail_price);
    price = Number(survey_product_resource.shampoo.discountprice.pc_discount_price);
    product_no = survey_shampoo_no;
  }
  if (select_product_type == "treatment") {
    product_type = survey_product_resource.treatment.product_name;
    retail_price = Number(survey_product_resource.treatment.retail_price);
    price = Number(survey_product_resource.treatment.discountprice.pc_discount_price);
    product_no = survey_treatment_no;
  }
  if (select_product_type == "set_product") {
    product_type = survey_product_resource.set_product.product_name;
    retail_price = Number(survey_product_resource.set_product.retail_price);
    price = Number(survey_product_resource.set_product.discountprice.pc_discount_price);
    product_no = survey_set_product_no;
  }

  /*
  let payment_type = survey_jQuery("input[name=survey_buy_type][type=radio]:checked")
    .siblings(".payment_text")
    .text();
  */
  let survey_buy_type_value = survey_jQuery(
    "input[name=survey_buy_type][type=radio]:checked"
  ).val();
  if (!survey_buy_type_value) {
    return;
  }
  //let payment_type = "1회 구매";
  let payment_type = "";
  if (survey_buy_type_value == "regular") {
    payment_type = "정기 구독";
    let survey_regular_cycle = survey_jQuery(".survey_regular_cycle").val();
    if (survey_regular_cycle) {
      if (survey_regular_cycle == "2W") {
        payment_type += " - 2주";
      }
      if (survey_regular_cycle == "1M") {
        payment_type += " - 1개월";
      }
      if (survey_regular_cycle == "2M") {
        payment_type += " - 2개월";
      }
    }
  }
  let is_save = false;
  survey_jQuery(".subscribeBox").each(function (index, element) {
    let save_product_no = Number(survey_jQuery(element).attr("product_no"));
    let payment_buy_type = survey_jQuery(element).attr("payment_buy_type");
    let payment_text = survey_jQuery(element).find(".word").text();
    if (save_product_no == product_no && payment_buy_type == "regular") {
      is_save = true;
      survey_jQuery(element).find(".word").text(payment_type);
      survey_jQuery(element).attr("regular_cycle", survey_regular_cycle);
    }
  });
  if (is_save) {
    return;
  }

  let total_price_str = survey_jQuery(".survey_popup_price .total em").text();

  let regex = /[^0-9]/g;
  let total_price = Number(total_price_str.replace(regex, ""));

  total_price += price;

  let total_price_resut = surveyComma(total_price) + "원";
  survey_jQuery(".survey_popup_price .total em").text(total_price_resut);

  // 수량
  let total_quantity = Number(survey_jQuery(".survey_popup_price .survey_quantity").text());
  total_quantity += 1;
  survey_jQuery(".survey_popup_price .survey_quantity").text(total_quantity);

  let retail_price_html = "";
  if (retail_price != 0 && retail_price != "0" && Number(retail_price) > Number(price)) {
    retail_price_html = `<strike>${surveyComma(retail_price)}원</strike>`;
  }

  let bom_code = survey_befor_qna_result.bom_code.join(",");
  let nick_name = survey_befor_qna_result.manage_product_nick_name;
  let qna_type = survey_befor_qna_result.qna_type;
  let hash = survey_befor_qna_result.hash;

  let html = `
  <div class="subscribeBox" product_no="${product_no}" bom_code="${bom_code}" nick_name="${nick_name}" qna_type="${qna_type}" hash="${hash}" payment_buy_type="${survey_buy_type_value}" regular_cycle="${survey_regular_cycle}">
    <span class="sbClose" onclick="surveyRemoveTag(this)"></span>
    <div class="gdsBuyOpt">
      <p class="subject">${product_type}</p>
      <p class="price">
        ${retail_price_html}
        <em>${surveyComma(price)}</em>원
      </p>
    </div>
    <div class="quantity">
      <input id="quantity" name="quantity_opt[]" style="" value="1" type="text" readonly />
      <a href="javascript:;" class="up QuantityUp" onclick="surveyQuantity(this, 'up')"
        ><img
          src="//img.echosting.cafe24.com/skin/base_ko_KR/product/btn_count_up.gif"
          alt="수량증가"
      /></a>
      <a href="javascript:;" class="down QuantityDown"  onclick="surveyQuantity(this, 'down')"
        ><img
          src="//img.echosting.cafe24.com/skin/base_ko_KR/product/btn_count_down.gif"
          alt="수량감소"
      /></a>
    </div>
    <p class="word">${payment_type}</p>
  </div>`;
  // 상품 리스트 영역 style
  surveyProductAreaStyle("show");
  survey_jQuery(".subscribeKindWrap").append(html);
}

async function getSurveyCartList() {
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/carts`,
      type: "get",
      data: { member_id: survey_member_id },
      dataType: "json",
      success: async function (result) {
        resolve(result);
      },
      error: function (request, status, error) {
        resolve([]);
      },
    });
  });
}

function surveyShowDiagnosis() {
  sessionStorage.setItem("survey_result_show_diagnosis", "click");
  location.href="/member/login.html";
}

survey_jQuery(".survey_memeber_name").text("");
window.addEventListener(
  "load",
  async function (event) {
    setTimeout(async function () {
      CAFE24API.getCustomerInfo(async function (err, res) {
        return new Promise(function (resolve, reject) {
          if (err) {
            survey_jQuery(".survey_memeber_name").text("고객");
          } else {
            // res 개체를 통해 응답 메세지를 확인할 수 있습니다.
            if (res && res.customer && res.customer.name) {
              survey_member_id = res.customer.member_id;
              survey_jQuery(".survey_memeber_name").text(res.customer.name);
            } else {
              survey_jQuery(".survey_memeber_name").text("고객");
            }
          }
          resolve(res);
        });
      });
      survey_mall_id = CAFE24API.MALL_ID;
      survey_shop_no = CAFE24API.SHOP_NO;
      let hash = shoplusGetParameters("hash");
      let type = shoplusGetParameters("type");
      if (!survey_member_id) {
        sessionStorage.setItem("survey_result_product_no", survey_product_no);
        sessionStorage.setItem("survey_result_hash", hash);
      }

      survey_jQuery(".survey_bom_code").text("");
      if (hash) {
        await getSurveyConfig();
        await getSurveyDiagnosis();
      } else {
        await getSurveyDiagnosisResult();
      }

      // surveyGetProductVariants();

      await surveyGetCafe24Products();
      

      setTimeout(async function () {
        setSurveyResult();
        let pc_discount_price = Number(survey_product_resource.shampoo.discountprice.pc_discount_price);
        let pc_price = Number(survey_product_resource.shampoo.price);
        let sale_percent = 0;
        if (pc_price > pc_discount_price) {
          // 소수점 버림
          sale_percent = Math.floor((pc_price - pc_discount_price) / (pc_price) * 100);
        }
        survey_jQuery(".survey_bottom_price .total strong em").text(surveyComma(pc_discount_price) + "원");
        if (sale_percent > 0) {
          survey_jQuery(".survey_bottom_price .total strong").before(
            `
              <strike style="font-size: 12px;">${surveyComma(pc_price)}</strike>
              <p class="disPrice" style="display: inline;">${sale_percent}%</p>
            `
          );
        }

        // 문진 bom 조회
        await getSurveyBoms();

        let bom_code_list = survey_jQuery(".survey_bom_code");
        if (bom_code_list) {
          for (let bom_code of bom_code_list) {
            let bom_code_text = survey_jQuery(bom_code).text();
            if (bom_code_text[0] == "9") {
              survey_jQuery(".survey_is_hairless").text("탈모증상완화 기능성화장품");
            }
          }
        }

        survey_jQuery(".layout-detail").attr("style", "");
        survey_gift_key = shoplusGetParameters("gift_key");
        if (survey_gift_key) {
          // 요금 노출 부분 히든
          survey_jQuery(".survey_bottom_price .total").hide();
          // 단 하루 무료배송! 히든
          survey_jQuery(".saleLabel").hide();
          // 구매하기 버튼 히든
          survey_jQuery(".btn-buy").hide();

          // 배송지 정보 입력 버튼 노출
          survey_jQuery(".gift_btn").show();
        }

        survey_product_type = shoplusGetParameters("product_type");
        if (survey_product_type) {
          if (survey_product_type != "set_product") {
            survey_jQuery(".tab01").hide();
            survey_jQuery(".tab02").hide();
          }
          if (survey_product_type == "shampoo") {
            survey_jQuery(".tab01").click();
          }
          if (survey_product_type == "treatment") {
            survey_jQuery(".tab02").click();
          }
        }
        if (!survey_member_id) {
          survey_jQuery("#survey_join_move").show();
        }
        survey_jQuery("#survey_result").css("visibility", "visible");
      }, 500);
    }, 500);
  },
  false
);
