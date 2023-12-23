survey_member_id = null;

// 이전 문진 결과 담은 변수
let survey_befor_qna = {
  shampoo: null,
  treatment: null,
};

let survey_product_no = Number(shoplusGetParameters("product_no"));
let survey_hash = shoplusGetParameters("hash");
let survey_re_qna_hash = shoplusGetParameters("re_qna_hash");
let survey_qna_at = shoplusGetParameters("qna_at");

let survey_shampoo_qna_result = null;
let survey_treatment_qna_result = null;

// 이전 문진 전송 데이터
let qna_send_data = null;

// 재문진 전송 데이터
let re_qna_send_data = null;

let is_survey_cart_click = false;

// 장바구니담기, 구매하기 버튼 클릭 시 체크용
let survey_re_qna_info = null;

let survey_befor_bom = null;

let survey_re_qna_result_info = null;

let survey_ingredient_list = [];

// 무향 hierarchy_id
let survey_no_scent_hierarchy_id = {
  "cosmaxtest": [1050, 1109],
  "threewaau": [2072, 1487] 
};

const survey_ampoule_code_images = [
  // 딥클린 콤플렉스™
  {
    bulk_code: "3C2A00001110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple02.gif"
  },
  // 피록톤올아민
  {
    bulk_code: "3C2A00002110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple03.gif"
  },
  // 멘톨 & 허브쿨
  {
    bulk_code: "3C2A00003110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple04.gif"
  },
  // 판테놀 & 아쿠아씰
  {
    bulk_code: "3C2A00004110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple08.gif"
  },
  // 미라클미네랄
  {
    bulk_code: "3C2A00006110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple07.gif"
  },
  // 엔젤링 콤플렉스™
  {
    bulk_code: "3C2A00007110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple11.gif"
  },
  // 프로텍션 콤플렉스™
  {
    bulk_code: "3C2A00008110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple09.gif"
  },
  // 세범컨트롤 콤플렉스™
  {
    bulk_code: "3C2A11980110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple05.gif"
  },
  // 돌콩배아추출물
  {
    bulk_code: "3C2A11984110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple01.gif"
  },
  // 너리싱 콤플렉스™
  {
    bulk_code: "3C2A11982110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple10.gif"
  },
  // 자라나리옴
  {
    bulk_code: "3C2A11981110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple06.gif"
  },
];

// 문진 결과 조회
async function getSurveyDiagnosis(hash, from, to, product_id) {
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnosis`,
      type: "get",
      data: {
        hash,
        from: dayjs(from).format("YYYY-MM-DD"),
        to: dayjs(to).format("YYYY-MM-DD"),
        product_id,
      },
      dataType: "json",
      success: async function (result) {
        resolve(result[0]);
      },
    });
  });
}

// 문진 결과 조회
async function getSurveyDiagnoses(hash, from, to, product_id) {
  return new Promise(function (resolve, reject) {
    let _survey_diagnosis_result = null;
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnoses`,
      type: "get",
      data: {
        hash,
        from: dayjs(from).format("YYYY-MM-DD"),
        to: dayjs(to).format("YYYY-MM-DD"),
        product_id,
      },
      dataType: "json",
      success: async function (result) {
        resolve(result);
      },
    });
  });
}

// 이전 문진 정보 체크
function setSurveyBeforQnaInfo(params) {
  for (const param of params) {
    // 샴푸
    if (param.bom_code[0].indexOf("CSP") > -1) {
      survey_befor_qna.shampoo = param;
    }
    // 트리트먼트
    if (param.bom_code[0].indexOf("CHT") > -1) {
      survey_befor_qna.treatment = param;
    }
  }
}

// 화면 노출
async function setSurveyDiagnosis(params) {
  let survey_target = "";
  let sub_survey_target = "";
  let befor_result = null;

  // 샴푸
  if (params.bom_code[0].indexOf("CSP") > -1) {
    survey_target = "#survey_re_shampoo_area";
    sub_survey_target = "#survey_shampoo_area";
    befor_result = survey_befor_qna.shampoo;
  }
  // 트리트먼트
  if (params.bom_code[0].indexOf("CHT") > -1) {
    survey_target = "#survey_re_treatmen_area";
    sub_survey_target = "#survey_treatmen_area";
    befor_result = survey_befor_qna.treatment;
  }

  // 재문진 전송 내용 조회
  re_qna_send_data = await getSurveySendData(survey_re_qna_hash);

  // 이전 문진 전송 내용 조회
  qna_send_data = await getSurveySendData(survey_hash);
  // BOM_CODE 입력
  survey_jQuery(survey_target + " .survey_bom_code").text(
    params.bom_code[0].substr(survey_bom_cut_start, survey_bom_cut_end)
  );
  survey_jQuery(sub_survey_target + " .survey_bom_code").text(
    params.bom_code[0].substr(survey_bom_cut_start, survey_bom_cut_end)
  );

  // 나만을 위한 세정-영양 밸런스 입력
  if (survey_target == "#survey_re_shampoo_area") {
    let shampoo_pc_point = surveyEnterBr(params.osdl_result.point1.shampoo_pc_point);
    survey_jQuery(sub_survey_target + " #shampoo_pc_point").html(shampoo_pc_point);
  } else {
    let treatment_pc_point = surveyEnterBr(params.osdl_result.point1.treatment_pc_point);
    survey_jQuery(sub_survey_target + " #treatment_pc_point").html(treatment_pc_point);
  }

  // 변경 전/후 level icon 노출
  setSurveyDiffLevel(survey_target, params, befor_result);

  // 선택한 고민 노출
  let survey_worry_array = await setSurveyWorrySelect(survey_target);

  // 이전 문진 선택한 고민 노출
  let survey_befor_worry_array = await setSurveyBeforWorrySelect(
    survey_target,
    befor_result.qna_type
  );

  // 앰플 노출
  await setSurveyAmpoule(survey_target, params);

  // 향 노출
  setSurveyScent(survey_target, params);

  // osdl 타입 입력
  survey_jQuery(".survey_osdl_type").text(
    befor_result.osdl_result.osdl.scalp +
      befor_result.osdl_result.osdl.sensitive +
      befor_result.osdl_result.osdl.hair +
      befor_result.osdl_result.osdl.hair_loss +
      " 타입"
  );

  // OSDL 노출 (샴푸, 트리트먼트 공통 페이지)
  // setSurveyOSDL(params);
  setSurveyOSDL(befor_result);

  // sub_survey_target
  setSurveySubDiagnosis(sub_survey_target, params, survey_worry_array);

  if (survey_product_no == survey_shampoo_no || survey_product_no == survey_treatment_no) {
    // survey_jQuery(".btnArea").hide();
    survey_jQuery(".tab01").hide();
    survey_jQuery(".tab02").hide();
    // survey_jQuery(".tabWrap").removeClass("tabWrap");
    survey_jQuery(".con").css("padding-top", "0px");
  }

  if (survey_product_no == survey_treatment_no) {
    survey_jQuery(".tab02").click();
  }
}

// 변경 전/후 level icon 노출
function setSurveyDiffLevel(survey_target, params, befor_result) {
  if (survey_target == "#survey_re_shampoo_area") {
    // 변경 후 level
    let shampoo_keyword = params.osdl_result.point1.shampoo_keyword.split(" ");
    let left_px = params.osdl_result.point1.sequence * 80;
    survey_jQuery(survey_target + " .after_level").css("left", left_px + "px");
    survey_jQuery(survey_target + " .after_keyword").text(shampoo_keyword[0]);
    survey_jQuery(survey_target + " .after_keyword_level").text(shampoo_keyword[1]);
    // 변경 전 lvel
    let befor_shampoo_keyword = befor_result.osdl_result.point1.shampoo_keyword.split(" ");

    // 변경 전과 변경 후가 다를경우 노출: 변경 전과 동일 시 변경 후만 노출 하기 위함
    if (
      Number(params.osdl_result.point1.sequence) != Number(befor_result.osdl_result.point1.sequence)
    ) {
      let befor_left_px = befor_result.osdl_result.point1.sequence * 80;
      survey_jQuery(survey_target + " .befor_level").css("left", befor_left_px + "px");
      survey_jQuery(survey_target + " .befor_keyword").text(befor_shampoo_keyword[0]);
      survey_jQuery(survey_target + " .befor_keyword_level").text(befor_shampoo_keyword[1]);
    } else {
      survey_jQuery(survey_target + " .befor_level").hide();
    }
    let find = re_qna_send_data.surveys.find(
      (e) => Number(e.product_no) == Number(survey_shampoo_no)
    );
    let scent_find = find.survey_section.find((e) => e.type == "base");
    if (scent_find) {
      let _html = "";
      if (scent_find.score > 0) {
        _html = "<strong>세정력이 강화되어<br>더 개운해졌어요</strong>";
      } else if (scent_find.score == 0) {
        _html = "<strong>만족스러웠던 세정력을<br>그대로 유지했어요</strong>";
      } else {
        _html = "<strong>부드러운 모발을 위해<br>영양감을 강화했어요</strong>";
      }
      survey_jQuery(survey_target + " .survey_re_shampoo_point").html(_html);
    }
  } else {
    // 변경 후 level
    let treatment_keyword = params.osdl_result.point1.treatment_keyword.split(" ");
    let treatment_left_px = params.osdl_result.point1.sequence * 80;
    survey_jQuery(survey_target + " .after_level").css("left", treatment_left_px + "px");
    survey_jQuery(survey_target + " .after_keyword").text(treatment_keyword[0]);
    survey_jQuery(survey_target + " .after_keyword_level").text(treatment_keyword[1]);
    // 변경 전 lvel
    let befor_treatment_keyword = befor_result.osdl_result.point1.treatment_keyword.split(" ");

    // 변경 전과 변경 후가 다를경우 노출: 변경 전과 동일 시 변경 후만 노출 하기 위함
    if (
      Number(params.osdl_result.point1.sequence) != Number(befor_result.osdl_result.point1.sequence)
    ) {
      let befor_left_px = befor_result.osdl_result.point1.sequence * 80;
      survey_jQuery(survey_target + " .befor_level").css("left", befor_left_px + "px");
      survey_jQuery(survey_target + " .befor_keyword").text(befor_treatment_keyword[0]);
      survey_jQuery(survey_target + " .befor_keyword_level").text(befor_treatment_keyword[1]);
      if (
        params.osdl_result.point1.treatment_keyword ==
        befor_result.osdl_result.point1.treatment_keyword
      ) {
        survey_jQuery(survey_target + " .befor_level").hide();
      }
    } else {
      survey_jQuery(survey_target + " .befor_level").hide();
    }
    let find = re_qna_send_data.surveys.find(
      (e) => Number(e.product_no) == Number(survey_treatment_no)
    );
    let scent_find = find.survey_section.find((e) => e.type == "base");
    if (scent_find) {
      let _html = "";
      if (scent_find.score > 0) {
        _html = "<strong>너무 기름지지 않도록<br>가벼운 사용감으로 조정했어요</strong>";
      } else if (scent_find.score == 0) {
        _html = "<strong>만족스러웠던 영양감을<br>그대로 유지했어요</strong>";
      } else {
        _html = "<strong>영양감이 강화되어<br>더 부드러워졌어요</strong>";
      }
      survey_jQuery(survey_target + " .survey_re_treatment_point").html(_html);
    }
  }
}

// 엠플 노출
async function setSurveyAmpoule(survey_target, params) {
  // 이전 문진 결과 담은 변수
  let befor_qna_result = {};
  // 재문진 전송 데이터
  let send_data = {};
  if (survey_target == "#survey_re_shampoo_area") {
    befor_qna_result = survey_befor_qna.shampoo;
    send_data = re_qna_send_data.surveys.find((e) => Number(e.product_no) == survey_shampoo_no);
  } else {
    befor_qna_result = survey_befor_qna.treatment;
    send_data = re_qna_send_data.surveys.find((e) => Number(e.product_no) == survey_treatment_no);
  }
  survey_befor_bom = await getSurveyBom(befor_qna_result.bom_code[0]);
  let befor_ampoule = searchSurveyBomAmpoule(survey_befor_bom);
  let param_bom = await getSurveyBom(params.bom_code[0]);
  // for (const bom of param_bom) {
  //   for (const ingredient of bom.ingredients) {
  //     survey_ingredient_list.push(ingredient);
  //   }
  // }
  let param_ampoule = searchSurveyBomAmpoule(param_bom);

  // 앰플 노출
  let ampoule_html = "";
  let count = 0;
  for (const ampoule of params.osdl_result.point2.ampoules) {
    // 이름 내려쓰기
    let ampoule_name_array = ampoule.name.split("\n");
    let ampoule_name = ampoule_name_array[0];
    if (ampoule_name_array.length > 1) {
      ampoule_name += `<span>(${ampoule_name_array[1]})</span>`;
    }
    // 설명 내려쓰기
    let ampoule_description = surveyEnterBr(ampoule.description);
    let icon_html = '<div class="icoArea iconew"><strong>NEW</strong></div>';
    let find_befor_ampoule = befor_ampoule.find((e) => e.bulk_code == ampoule.bulk_code);
    if (find_befor_ampoule) {
      let find_param_ampoule = param_ampoule.find((e) => e.bulk_code == ampoule.bulk_code);
      if (find_param_ampoule) {
        if (find_param_ampoule.ratio > find_befor_ampoule.ratio) {
          icon_html = '<div class="icoArea icoup"><strong class="up">강화</strong></div>';
        }
        if (find_param_ampoule.ratio == find_befor_ampoule.ratio) {
          icon_html = '<div class="icoArea icosame"><strong class="same">유지</strong></div>';
        }
        if (find_param_ampoule.ratio < find_befor_ampoule.ratio) {
          icon_html = '<div class="icoArea icodown"><strong class="down">약화</strong></div>';
        }
      }
    }

    ampoule_html += `
      <li>
        ${icon_html}
        <div class="titArea">
          ${ampoule_name}
        </div>
        <div class="contArea">
          <p>
            ${ampoule_description}
          </p>
        </div>
      </li>
    `;
    count++;
  }
  survey_jQuery(survey_target + " .survey_ampoules_simple_area").empty();
  survey_jQuery(survey_target + " .survey_ampoules_simple_area").append(ampoule_html);
}

async function getSurveySendData(hash) {
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${survey_product_no}/send`,
      type: "get",
      data: {
        member_id: survey_member_id,
        hash,
      },
      dataType: "json",
      success: function (result) {
        resolve(result);
      },
    });
  });
}

// 문진 조회
async function getSurveyQna(product_no) {
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${product_no}`,
      type: "get",
      data: {},
      dataType: "json",
      success: function (result) {
        resolve(result);
      },
    });
  });
}

// 선택한 고민 노출
async function setSurveyWorrySelect(survey_target) {
  let survey_worry_array = [];
  let survey_worry_html = "";
  // 재문진 전송 내용 조회
  let product_no = null;
  if (survey_target == "#survey_re_shampoo_area") {
    product_no = survey_shampoo_no;
  } else {
    product_no = survey_treatment_no;
  }
  let find = re_qna_send_data.surveys.find((e) => Number(e.product_no) == Number(product_no));
  if (find) {
    for (const hierarchy_id of find.survey_result) {
      let worry = surveyGetWorrySelect(Number(find.product_no), Number(hierarchy_id));

      if (worry) {
        let index = survey_worry_array.indexOf(worry.subject);
        if (index == -1) {
          survey_worry_array.push(worry.subject);
        }
      }
    }
  }

  for (let i = 0; i < survey_worry_array.length; i++) {
    let comma = "";
    let br = "";
    if (i == survey_worry_array.length - 1) {
      comma = "";
    } else {
      comma = ", ";
    }
    if (i == 2 && survey_worry_array.length > 3) {
      br = "<br>";
    }
    survey_worry_html += `<span>#${survey_worry_array[i]}${comma}</span>${br}`;
  }
  survey_worry_html += "에 대한 고객님의 피드백을 반영했어요";
  survey_jQuery(survey_target + " .survey_worry_area").empty();
  survey_jQuery(survey_target + " .survey_worry_area").append(survey_worry_html);

  return survey_worry_array;
}

// 선택한 고민 노출
async function setSurveyBeforWorrySelect(survey_target, qna_type) {
  let survey_worry_array = [];
  let survey_worry_html = "";
  // 재문진 전송 내용 조회
  let product_no = null;
  if (survey_target == "#survey_re_shampoo_area") {
    product_no = survey_shampoo_no;
  } else {
    product_no = survey_treatment_no;
  }
  let find = qna_send_data.surveys.find((e) => Number(e.product_no) == Number(product_no));
  if (find) {
    for (const hierarchy_id of find.survey_result) {
      let worry = surveyGetWorrySelect(Number(find.product_no), Number(hierarchy_id), qna_type);

      if (worry) {
        let index = survey_worry_array.indexOf(worry.subject);
        if (index == -1) {
          survey_worry_array.push(worry.subject);
        }
      }
    }
  }
  return survey_worry_array;
}

// 선택한 고민 찾기
function surveyGetWorrySelect(product_no, hierarchy_id, qna_type = "re_qna") {
  let params = "";
  if (product_no == survey_shampoo_no) {
    params = survey_shampoo_qna_result;
  } else {
    params = survey_treatment_qna_result;
  }
  let qna_hierarchy = null;
  if (qna_type == "qna") {
    qna_hierarchy = params.qna_hierarchy;
  } else {
    qna_hierarchy = params.re_qna_hierarchy;
  }
  for (const folder of qna_hierarchy) {
    for (const question of folder.children) {
      if (question.question_type == "main") {
        for (const answer of question.children) {
          if (Number(answer.hierarchy_id) == hierarchy_id) {
            return {
              hierarchy_id: answer.hierarchy_id,
              subject: answer.subject,
            };
          }
        }
      }
    }
  }
}

// 향 노출
function setSurveyScent(survey_target, params, befor_bom = null) {
  if (!params.osdl_result.point3.scent.name || params.osdl_result.point3.scent.image == survey_no_fragrance_image ) {
    params.osdl_result.point3.scent.name = "Fragrance Free";
    params.osdl_result.point3.scent.image = survey_no_fragrance_image;
    params.osdl_result.point3.scent.detail_description = `민감한 고객님들을 위해<br>향료를 추가하지 않았습니다.`;
    survey_jQuery(survey_target + " .survey_scent_type")
      .parent()
      .hide();
    survey_jQuery(survey_target + " .survey_scent_top")
      .parent()
      .parent()
      .hide();
  }

  // 향 이미지 입력
  survey_jQuery(survey_target + " .survey_scent_image").attr(
    "src",
    params.osdl_result.point3.scent.image
  );

  survey_jQuery(survey_target + " .survey_scent_image").attr(
    "style",
    "width: 792px !important; height: 480px !important;border-radius: 8px;"
  );

  // 향 이름 입력
  survey_jQuery(survey_target + " .survey_scent_name").text(params.osdl_result.point3.scent.name);
  // 향 설명 입력
  survey_jQuery(survey_target + " .survey_scent_detail_description").html(
    surveyEnterBr(params.osdl_result.point3.scent.detail_description)
  );
  // TOP
  survey_jQuery(survey_target + " .survey_scent_top").text(
    params.osdl_result.point3.scent.text.top
  );
  // MID
  survey_jQuery(survey_target + " .survey_scent_mid").text(
    params.osdl_result.point3.scent.text.mid
  );
  // BOTTOM
  survey_jQuery(survey_target + " .survey_scent_bottom").text(
    params.osdl_result.point3.scent.text.bottom
  );

  if (survey_target == "#survey_re_shampoo_area" || survey_target == "#survey_shampoo_area") {
    send_data = re_qna_send_data.surveys.find((e) => Number(e.product_no) == survey_shampoo_no);
  } else {
    send_data = re_qna_send_data.surveys.find((e) => Number(e.product_no) == survey_treatment_no);
  }
  let section = send_data.survey_section.find((e) => e.type == "scent");
  if (section && Number(section.scent_ratio) < 1) {
    survey_jQuery(survey_target + " .survey_scent_type").text("보통");
  } else {
    survey_jQuery(survey_target + " .survey_scent_type").text("강하게");
  }
}

// 내려쓰기
function surveyEnterBr(text) {
  return text.replace(/(\n|\r\n)/g, "<br>");
}

// OSDL 입력
function setSurveyOSDL(params) {
  // ODSL 이미지 하단 텍스트
  survey_jQuery("#survey_osdl_text_top").html(surveyEnterBr(params.osdl_result.osdl.pc_text.top));
  survey_jQuery("#survey_osdl_text_bottom").html(
    surveyEnterBr(params.osdl_result.osdl.pc_text.bottom)
  );

  // 지성, 중성, 건성 세팅
  if (params.osdl_result.osdl.scalp == "O") {
    survey_jQuery(".oily_checked").addClass("checked");
    survey_jQuery("#survey_scalp_text").text("지성");
    survey_jQuery("#survey_scalp_image").attr(
      "src",
      "/web/upload/mynomy/kr/prd/ht_O.svg"
    );
  } else if (params.osdl_result.osdl.scalp == "N") {
    survey_jQuery(".normal_checked").addClass("checked");
    survey_jQuery("#survey_scalp_text").text("중성");
    survey_jQuery("#survey_scalp_image").attr(
      "src",
      "/web/upload/mynomy/kr/prd/ht_N.svg"
    );
  } else {
    survey_jQuery(".dry_checked").addClass("checked");
    survey_jQuery("#survey_scalp_text").text("건성");
    survey_jQuery("#survey_scalp_image").attr(
      "src",
      "/web/upload/mynomy/kr/prd/ht_D.svg"
    );
  }

  // 민감성 세팅
  if (params.osdl_result.osdl.sensitive == "S") {
    survey_jQuery(".sensitive_checked").addClass("checked");
    survey_jQuery("#survey_sensitive_text").text("민감성");
    survey_jQuery("#survey_sensitive_image").attr(
      "src",
      "/web/upload/mynomy/kr/prd/ht_S.svg"
    );
  } else {
    survey_jQuery(".resistant_checked").addClass("checked");
    survey_jQuery("#survey_sensitive_text").text("저항성");
    survey_jQuery("#survey_sensitive_image").attr(
      "src",
      "/web/upload/mynomy/kr/prd/ht_R.svg"
    );
  }

  // 건강모, 손상모, 극손상모 세팅
  if (params.osdl_result.osdl.hair == "H") {
    survey_jQuery(".healthy_checked").addClass("checked");
    survey_jQuery("#survey_hair_text").text("건강모");
    survey_jQuery("#survey_hair_image").attr(
      "src",
      "/web/upload/mynomy/kr/prd/ht_H.svg"
    );
  } else if (params.osdl_result.osdl.hair == "D") {
    survey_jQuery(".damaged_checked").addClass("checked");
    survey_jQuery("#survey_hair_text").text("손상모");
    survey_jQuery("#survey_hair_image").attr(
      "src",
      "/web/upload/mynomy/kr/prd/ht_D.svg"
    );
  } else {
    survey_jQuery(".extremely_damaged_checked").addClass("checked");
    survey_jQuery("#survey_hair_text").text("극손상모");
    survey_jQuery("#survey_hair_image").attr(
      "src",
      "/web/upload/mynomy/kr/prd/ht_E.svg"
    );
  }

  // 탈모 고민
  if (params.osdl_result.osdl.hair_loss == "L") {
    survey_jQuery(".hair_loss_checked").addClass("checked");
    survey_jQuery("#survey_hair_loss_text").text("탈모 고민");
    survey_jQuery("#survey_hair_loss_image").attr(
      "src",
      "/web/upload/mynomy/kr/prd/ht_L.svg"
    );
  } else {
    survey_jQuery(".without_hair_loss_checked").addClass("checked");
    survey_jQuery("#survey_hair_loss_text").text("탈모 고민 없음");
    survey_jQuery("#survey_hair_loss_image").attr(
      "src",
      "/web/upload/mynomy/kr/prd/ht_W.svg"
    );
  }

  // 지성, 중성, 건성 세팅
  let scalp_list = [];
  let survey_scalp_type_image = "";
  if (params.osdl_result.osdl.scalp == "O") {
    survey_jQuery("#survey_scalp_type").html('<strong class="">지성</strong>이라면?');
    scalp_list = params.osdl_result.point4.hair_tip.scalp;
    survey_scalp_type_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/scalp01.png";
  } else if (params.osdl_result.osdl.scalp == "N") {
    survey_jQuery("#survey_scalp_type").html('<strong class="">중성</strong>이라면?');
    scalp_list = params.osdl_result.point4.hair_tip.scalp;
    survey_scalp_type_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/scalp02.png";
  } else {
    survey_jQuery("#survey_scalp_type").html('<strong class="">건성</strong>이라면?');
    scalp_list = params.osdl_result.point4.hair_tip.scalp;
    survey_scalp_type_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/scalp03.png";
  }

  survey_jQuery("#survey_scalp_type").nextAll().remove();
  for (const scalp of scalp_list) {
    let text = scalp.text.replace(/(\n|\r\n)/g, "<br>");
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
  if (params.osdl_result.osdl.sensitive == "S") {
    survey_jQuery("#survey_sensitive_type").html('<strong class="">민감성</strong>이라면?');
    sensitive_list = params.osdl_result.point4.hair_tip.sensitive;
    survey_sensitive_type_image =
      "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/scalp04.png";
  } else {
    survey_jQuery("#survey_sensitive_type").html('<strong class="">비민감성</strong>이라면?');
    sensitive_list = params.osdl_result.point4.hair_tip.sensitive;
    survey_sensitive_type_image =
      "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/scalp05.png";
  }

  survey_jQuery("#survey_sensitive_type").nextAll().remove();
  for (const sensitive of sensitive_list) {
    let text = sensitive.text.replace(/(\n|\r\n)/g, "<br>");
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
  if (params.osdl_result.osdl.hair == "H") {
    survey_jQuery("#survey_hair_type").html('<strong class="">건강모</strong>라면?');
    hair_list = params.osdl_result.point4.hair_tip.hair;
    survey_hair_type_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/scalp06.png";
  } else if (params.osdl_result.osdl.hair == "D") {
    survey_jQuery("#survey_hair_type").html('<strong class="">손상모</strong>라면?');
    hair_list = params.osdl_result.point4.hair_tip.hair;
    survey_hair_type_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/scalp07.png";
  } else {
    survey_jQuery("#survey_hair_type").html('<strong class="">(극)손상모</strong>라면?');
    hair_list = params.osdl_result.point4.hair_tip.hair;
    survey_hair_type_image = "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/scalp07.png";
  }

  survey_jQuery("#survey_hair_type").nextAll().remove();
  for (const hair of hair_list) {
    let text = hair.text.replace(/(\n|\r\n)/g, "<br>");
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
  if (params.osdl_result.osdl.hair_loss == "L") {
    survey_jQuery("#survey_hair_loss_type").html('<strong class="">탈모</strong>라면?');
    hair_loss_list = params.osdl_result.point4.hair_tip.hair_loss;
    survey_hair_loss_type_image =
      "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/scalp08.png";
  } else {
    survey_jQuery("#survey_hair_loss_type").html("<strong>탈모를 예방</strong>하려면?");
    hair_loss_list = params.osdl_result.point4.hair_tip.hair_loss;
    survey_hair_loss_type_image =
      "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/scalp09.png";
  }
  survey_jQuery("#survey_hair_loss_type").nextAll().remove();
  for (const hair_loss of hair_loss_list) {
    let text = hair_loss.text.replace(/(\n|\r\n)/g, "<br>");
    let set_html = `
      <p class="tip">Tip</p>
      <p class="info">${text}</p>
    `;
    survey_jQuery("#survey_hair_loss_list").append(set_html);
    survey_jQuery("#survey_hair_loss_type_image").attr("src", survey_hair_loss_type_image);
  }
}

function setSurveySubDiagnosis(sub_survey_target, params, survey_worry_array) {
  /* 샴푸 레시피 넘버 입력 */
  // survey_jQuery(sub_survey_target + " .survey_bom_code").text(params.bom_code[0].substr(survey_bom_cut_start, survey_bom_cut_end));
  /* 세정-영양 밸런스 */
  // shampoo
  let shampoo_keyword = params.osdl_result.point1.shampoo_keyword.split(" ");
  let left_px = params.osdl_result.point1.sequence * 80;
  survey_jQuery(sub_survey_target + " .shampoo_level").css("left", left_px + "px");
  survey_jQuery(sub_survey_target + " .shampoo_keyword").text(shampoo_keyword[0]);
  survey_jQuery(sub_survey_target + " .shampoo_keyword_level").text(shampoo_keyword[1]);
  // let shampoo_pc_point = surveyEnterBr(params.osdl_result.point1.shampoo_pc_point);
  // survey_jQuery(sub_survey_target + " #shampoo_pc_point").html(shampoo_pc_point);

  // treatment
  let treatment_keyword = params.osdl_result.point1.treatment_keyword.split(" ");
  survey_jQuery(sub_survey_target + " .treatment_level").css("left", left_px + "px");
  survey_jQuery(sub_survey_target + " .treatment_keyword").text(treatment_keyword[0]);
  survey_jQuery(sub_survey_target + " .treatment_keyword_level").text(treatment_keyword[1]);
  let treatment_pc_point = surveyEnterBr(params.osdl_result.point1.treatment_pc_point);
  survey_jQuery(sub_survey_target + " #treatment_pc_point").html(treatment_pc_point);

  /* 나만을 위한 솔루션 콤플렉스 */
  survey_jQuery(sub_survey_target + " .survey_worry_list").empty();
  for (const worry of survey_worry_array) {
    survey_jQuery(sub_survey_target + " .survey_worry_list").append(`<li>${worry}</li>`);
  }
  /* 고객님을 위한 솔루션 콤플렉스*/
  survey_jQuery(sub_survey_target + " .survey_ampoules_area").empty();

  for (let ampoule of params.osdl_result.point2.ampoules) {
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
    let find_ampoule_image = survey_ampoule_code_images.find((e) => e.bulk_code == ampoule.bulk_code);
    if (find_ampoule_image) {
      ampoule_image = find_ampoule_image.image;
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
    survey_jQuery(sub_survey_target + " .survey_ampoules_area").append(set_html);
  }

  survey_jQuery(sub_survey_target + " .survey_ampoules_list").empty();
  for (const ingredient of params.osdl_result.point2.bottom_fix_ingredient) {
    let set_html = `
        <li>
          <div class="img">
            <img
              src="${ingredient.image}"
              alt="${ingredient.name}"
            />
          </div>
          <div class="txt">
            ${ingredient.name}
          </div>
        </li>
      `;
    survey_jQuery(sub_survey_target + " .survey_ampoules_list").append(set_html);
  }

  // 향 입력
  setSurveyScent(sub_survey_target, params, survey_befor_bom);
}

function surveyInputBomCode(result, type = null) {
  survey_jQuery(".subscribeBox").attr("product_no", result.product_no);
  survey_jQuery(".subscribeBox").attr("bom_code", result.bom_code);
  survey_jQuery(".subscribeBox").attr("nick_name", result.manage_product_nick_name);
  survey_jQuery(".subscribeBox").attr("qna_type", result.qna_type);
  survey_jQuery(".subscribeBox").attr("hash", result.hash);
}

async function getSurveyBom(bom_code) {
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/bom/${bom_code}`,
      type: "get",
      dataType: "json",
      success: function (result) {
        resolve(result);
      },
      error: function (request, status, error) {
        resolve([]);
      },
    });
  });
}

function searchSurveyBomAmpoule(params) {
  let return_array = [];
  for (const param of params) {
    if (param.bulk_group_code == "BG-2") {
      return_array.push({
        bulk_code: param.composition.bulk_code,
        ratio: Number(param.composition.ratio),
      });
    }
  }
  return return_array;
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

function surveySetQuantityClick(type) {
  if (survey_product_no == survey_set_product_no) {
    if (type == "up") {
      survey_jQuery(".option_box_up").click();
    } else {
      survey_jQuery(".option_box_down").click();
    }
    setTimeout(async function () {
      let count = Number(survey_jQuery(".quantity_opt").val());
      survey_jQuery("#quantity").val(count);
      survey_jQuery(".survey_quantity").text(count);
    }, 200);
  } else {
    //
    if (type == "up") {
      document.getElementsByClassName("QuantityUp")[0].click();
    } else {
      document.getElementsByClassName("QuantityDown")[0].click();
    }
    setTimeout(function () {
      let count = Number(survey_jQuery("#quantity").val());
      // survey_jQuery("#quantity").val(count);
      survey_jQuery(".survey_quantity").text(count);
    }, 200);
  }
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
  for (const product of product_list) {
    let product_no = survey_jQuery(product).attr("product_no");
    let bom_code = survey_jQuery(product).attr("bom_code");
    let nick_name = survey_jQuery(product).attr("nick_name");
    let qna_type = survey_jQuery(product).attr("qna_type");
    let hash = survey_jQuery(product).attr("hash");
    let quantity = survey_jQuery(product).find(".quantity input").val();

    if (product_no != survey_set_product_no) {
      // 샴푸, 트리트먼트
      surveySetCart(product_no, bom_code, nick_name, qna_type, hash, quantity);
    } else {
      // 세트 상품
      let bom_code_list = bom_code.split(",");
      let treatment_bom = bom_code_list.find((e) => e.indexOf("CHT") > -1);
      let shampoo_bom = bom_code_list.find((e) => e.indexOf("CSP") > -1);

      // 세트 상품 장바구니 담기
      let bundle_product_components = [];

      let shampoo_option_result = await getSurveyCafe24Option(survey_shampoo_no);
      let shampoo_set_param = {
        product_no: survey_shampoo_no,
        variants_code: survey_variant_resource.shampoo.variant_code,
        additional_option_values: [
          {
            key: "item_option_add",
            type: "text",
            title: shampoo_option_result.options.additional_options[0].additional_option_name,
            value: shampoo_bom,
          },
          {
            key: "item_option_add",
            type: "text",
            title: shampoo_option_result.options.additional_options[1].additional_option_name,
            value: nick_name,
          },
          {
            key: "item_option_add",
            type: "text",
            title: shampoo_option_result.options.additional_options[2].additional_option_name,
            value: hash,
          },
        ]
      }
      bundle_product_components.push(shampoo_set_param);

      let treatment_option_result = await getSurveyCafe24Option(survey_treatment_no);
      let treatment_set_param = {
        product_no: survey_treatment_no,
        variants_code: survey_variant_resource.treatment.variant_code,
        additional_option_values: [
          {
            key: "item_option_add",
            type: "text",
            title: treatment_option_result.options.additional_options[0].additional_option_name,
            value: treatment_bom,
          },
          {
            key: "item_option_add",
            type: "text",
            title: treatment_option_result.options.additional_options[1].additional_option_name,
            value: nick_name,
          },
          {
            key: "item_option_add",
            type: "text",
            title: treatment_option_result.options.additional_options[2].additional_option_name,
            value: hash,
          },
        ]
      }
      bundle_product_components.push(treatment_set_param);

      await setCafe24SetProductCart(product_no, bundle_product_components, quantity);
    }
  }
  setTimeout(function () {
    if (type && type == "cart") {
      if (confirm("장바구니 담기가 되었습니다.\n장바구니 페이지로 이동하시겠습니까?")) {
        location.href = "/order/basket.html";
      }
    } else {
      location.href = "/order/basket.html";
    }
    is_survey_cart_click = false;
  }, 1000);
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

async function getSurveyBoms() {
  let survey_ingredient_text_list = [];
  for (const bom_code of survey_re_qna_info.bom_code) {
    let survey_ingredients = [];
    let param_bom = await getSurveyBom(bom_code);
    for (const bom of param_bom) {
      for (const ingredient of bom.ingredients) {
        if (survey_ingredients.indexOf(ingredient.RAWCDK) == -1) {
          survey_ingredients.push(ingredient.RAWCDK);
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

  let bom_code = survey_re_qna_info.bom_code.join(",");
  let nick_name = survey_re_qna_info.manage_product_nick_name;
  let qna_type = survey_re_qna_info.qna_type;
  let hash = survey_re_qna_info.hash;

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
}

// 세트 장바구니 담기
async function setCafe24SetProductCart(
  product_no,
  bundle_product_components,
  quantity
) {
  return new Promise(function (resolve, reject) {
    CAFE24API.init(app_client_id);
    CAFE24API.addBundleProductsCart(
      'A0000',
      'P',
      [
          {
            'product_no' : product_no, // 세트상품번호
            'quantity' : quantity,
            'bundle_product_components': bundle_product_components
          }
      ],
      function(err,res) {
          resolve(res);
      }
    );
  });
}

// 옵션 조회
async function getSurveyCafe24Option(product_no) {
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${location.origin}/api/v2/products/${product_no}/options`,
      type: "GET",
      async: true,
      processData: false,
      contentType: "application/json",
      beforeSend: function (xhr, opts) {
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("X-Cafe24-Api-Version", app_version);
        xhr.setRequestHeader("X-Cafe24-Client-Id", app_client_id);
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      },
      cache: false,
      data: {},
      success: async function (data) {
        resolve(data);
      },
      error: function (request, status, error) {
        console.log(request, status, error);
        reject(error);
      },
    });
  });
}

// 로드 시 실행
survey_jQuery(".survey_memeber_name").text("");
window.addEventListener(
  "load",
  async function (event) {
    setTimeout(async function () {
      await CAFE24API.getCustomerInfo(async function (err, res) {
        return new Promise(function (resolve, reject) {
          if (err) {
            survey_jQuery(".survey_memeber_name").text("고객");
            survey_member_id = null;
          } else {
            if (res && res.customer && res.customer.name) {
              survey_jQuery(".survey_memeber_name").text(res.customer.name);
              survey_member_id = res.customer.member_id;
            } else {
              survey_jQuery(".survey_memeber_name").text("고객");
            }
          }

          survey_mall_id = CAFE24API.MALL_ID;
          survey_shop_no = CAFE24API.SHOP_NO;
          resolve(res);
        });
      });

      /*
      survey_sampoo = survey_product_list[CAFE24API.MALL_ID].find((e) => e.product_type == "sampoo");
      survey_treatment = survey_product_list[CAFE24API.MALL_ID].find((e) => e.product_type == "treatment");
      survey_set_product = survey_product_list[CAFE24API.MALL_ID].find((e) => e.product_type == "set_product");
    
      survey_shampoo_no = survey_sampoo.product_no;
      survey_treatment_no = survey_treatment.product_no;
      survey_set_product_no = survey_set_product.product_no;
      */

      // no-set-product
      if (Number(survey_product_no) == Number(survey_set_product_no)) {
        survey_jQuery(".fixed-box.set-product").show();
        survey_jQuery(".fixed-box.no-set-product").remove();
      } else {
        survey_jQuery(".fixed-box.no-set-product").show();
        survey_jQuery(".fixed-box.set-product").remove();
      }


      // 문진 조회
      survey_shampoo_qna_result = await getSurveyQna(survey_shampoo_no);
      survey_treatment_qna_result = await getSurveyQna(survey_treatment_no);

      // 이전문진 - 결과조회
      let survey_qna_result = await getSurveyDiagnoses(
        survey_hash,
        dayjs("2023-01-01").format("YYYY-MM-DD"),
        dayjs().format("YYYY-MM-DD")
      );
      // 이전문진 - 결과조회 by product_id
      setSurveyBeforQnaInfo(survey_qna_result[0]);

      if (survey_qna_at && survey_qna_at.indexOf(".") > -1) {
        survey_qna_at = survey_qna_at.replace(/\./gi, '-');
      }

      // 재문진 - 결과조회
      let survey_re_qna_result = await getSurveyDiagnoses(
        survey_re_qna_hash,
        survey_qna_at,
        dayjs().format("YYYY-MM-DD")
      );
      let _survey_re_qna_info = null;
      for (let diagnoses of survey_re_qna_result) {
        let set_param = null;
        for (let diagnos of diagnoses) {
          if(set_param == null) {
            set_param = diagnos;
          } else {
            set_param.bom_code.push(diagnos.bom_code[0]);
            set_param.product_id.push(diagnos.product_id[0]);
          }
          if (diagnos.product_type == "sampoo") {
            set_param.osdl_result.point1.shampoo_keyword = diagnos.osdl_result.point1.shampoo_keyword;
          }
          if (diagnos.product_type == "treatment") {
            set_param.osdl_result.point1.treatment_keyword = diagnos.osdl_result.point1.treatment_keyword;
          }
        }
        _survey_re_qna_info = set_param;
      }
      survey_re_qna_info = _survey_re_qna_info;

      let set_param = {
        product_no: survey_re_qna_info.product_no,
        bom_code: survey_re_qna_info.bom_code,
        hash: survey_re_qna_info.hash,
      };
      sessionStorage.setItem("survey_re_qna_result", JSON.stringify(set_param));

      surveyInputBomCode(survey_re_qna_info);
      survey_re_qna_result_info = survey_re_qna_info;

      survey_jQuery("#survey_re_shampoo_area .survey_bom_code").text("");
      survey_jQuery("#survey_re_treatmen_area .survey_bom_code").text("");
      // 재문진 - 결과조회 by product_id
      for (const re_qna_result of survey_re_qna_result[0]) {
        // 화면 노출
        setSurveyDiagnosis(re_qna_result);
      }
      // 상품 가격 입력
      let survey_product_price = Number(survey_jQuery("#survey_product_price").attr("price"));
      let survey_product_price_comma = surveyComma(survey_product_price);
      survey_jQuery("#survey_product_price").text(survey_product_price_comma);

      let survey_product_custom_price = Number(
        survey_jQuery("#survey_product_custom").attr("price")
      );
      if (survey_product_custom_price > survey_product_price) {
        let survey_product_custom_price_comma = surveyComma(survey_product_custom_price);
        survey_jQuery("#survey_product_custom").text(survey_product_custom_price_comma);
        survey_jQuery("#survey_product_custom").show();
      }

      await surveyGetCafe24Products();

      let product_name_array = [];
      product_name_array[survey_shampoo_no] = survey_product_resource.shampoo.product_name;
      product_name_array[survey_treatment_no] = survey_product_resource.treatment.product_name;
      product_name_array[survey_set_product_no] = survey_product_resource.set_product.product_name;
      survey_jQuery(".survey_product_name").text(product_name_array[survey_product_no]);
      survey_jQuery(".survey_product_name_area .name").text(
        "#" + survey_re_qna_info.manage_product_nick_name
      );
      
      setTimeout(async function () {
        survey_jQuery("#survey_result").css("visibility", "visible");

        // 문진 bom 조회
        await getSurveyBoms();
        let survey_re_shampoo_bom_code = survey_jQuery(
          "#survey_re_shampoo_area .survey_bom_code"
        ).text();
        if (survey_re_shampoo_bom_code && survey_re_shampoo_bom_code[0] == "9") {
          survey_jQuery(".survey_is_hairless").text("탈모증상완화 기능성화장품");
        }
        survey_jQuery("#quantity").attr("readonly", true);
      }, 200);

      setTimeout(async function () {
        let price = Number(survey_product_resource.shampoo.discountprice.pc_discount_price);
        let retail_price = Number(survey_product_resource.shampoo.retail_price);
        survey_jQuery("#totalPrice .total strong em").text(surveyComma(price) + "원");
        survey_jQuery(".gdsBuyOpt .price strike").text(surveyComma(retail_price) + "원");
        survey_jQuery(".gdsBuyOpt .price em").text(surveyComma(price) + "원");
        if (retail_price <= price) {
          survey_jQuery(".gdsBuyOpt .price strike").hide();
        }
      }, 1000);

    }, 100);
  },
  false
);
