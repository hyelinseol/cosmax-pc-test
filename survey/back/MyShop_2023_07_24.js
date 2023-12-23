// 공통사용
class SurveyMyShop {
  survey_product_resource = {};
  survey_variant_resource = {};

  constructor() {
    //
  }
  // 상품, 품목 조회
  async surveyGetProductVariants() {
    let self = this;
    (function (CAFE24API) {
      for (let survey_product of surveyCommon.survey_product_list[surveyCommon.survey_mall_id]) {
        CAFE24API.get(
          `/api/v2/products/${survey_product.no}?embed=discountprice`,
          function (err, res) {
            self.survey_product_resource[survey_product.product_type] = res.product;
          }
        );

        CAFE24API.get(`/api/v2/products/${survey_product.no}/variants`, function (err, res) {
          self.survey_variant_resource[survey_product.product_type] = res.variants[0];
        });
      }
    })(
      CAFE24API.init({
        version: surveyCommon.app_version,
        client_id: surveyCommon.app_client_id,
      })
    );
  }

  // 문진 리스트 조회
  async getSurveyResultByMemberId(form, to) {
    let url = `/front/diagnoses?member_id=${surveyCommon.survey_member_id}&from=${form}&to=${to}`;
    return new Promise(async function (resolve, reject) {
      await surveyCommon
        .getSurveyAjax(url)
        .then(function (res) {
          resolve(res);
        })
        .catch(function (err) {
          console.log(err);
          reject(null);
        });
    });
  }

  // 카페24 주문 count 조회
  async getSurveyOrderCount(order_status, start_date, end_date) {
    let set_param = {
      member_id: surveyCommon.survey_member_id,
      start_date,
      end_date,
      order_status,
    };
    return new Promise(function (resolve, reject) {
      survey_jQuery.ajax({
        url: `${surveyCommon.survey_domain}/app/${surveyCommon.survey_app_name}/mall/${surveyCommon.survey_mall_id}/api/survey/shops/${surveyCommon.survey_shop_no}/front/order/count`,
        type: "GET",
        data: set_param,
        dataType: "json",
        success: function (result) {
          resolve(result.count);
        },
        error: function (request, status, error) {
          console.log(request, status, error);
          resolve([]);
        },
      });
    });
  }

  // 진행중인 주문 카운트 입력
  async setOrderCount() {
    let start_date1 = dayjs().subtract(3, "month").format("YYYY-MM-DD");
    start_date1 = dayjs(start_date1).add(1, "day").format("YYYY-MM-DD");
    let end_date1 = dayjs().format("YYYY-MM-DD");
    let start_date2 = dayjs().subtract(6, "month").format("YYYY-MM-DD");
    start_date2 = dayjs(start_date2).add(1, "day").format("YYYY-MM-DD");
    let end_date2 = dayjs(start_date1).subtract(1, "day").format("YYYY-MM-DD");

    // 입금전 조회 (상품준비중: N00)
    let survey_n00_count1 = await this.getSurveyOrderCount("N00", start_date1, end_date1);
    let survey_n00_count2 = await this.getSurveyOrderCount("N00", start_date2, end_date2);
    let survey_n00 = Number(survey_n00_count1) + Number(survey_n00_count2);

    // 처방 분석 조회 (상품준비중: N10)
    let survey_n10_count1 = await this.getSurveyOrderCount("N10,N22", start_date1, end_date1);
    let survey_n10_count2 = await this.getSurveyOrderCount("N10,N22", start_date2, end_date2);
    let survey_n10 = Number(survey_n10_count1) + Number(survey_n10_count2);

    // 조제준비 count 조회 (배송준비중: N20)
    let survey_n20_count1 = await this.getSurveyOrderCount("N20", start_date1, end_date1);
    let survey_n20_count2 = await this.getSurveyOrderCount("N20", start_date2, end_date2);
    let survey_n20 = Number(survey_n20_count1) + Number(survey_n20_count2);

    // 맞춤조제중 count 조회 (배송대기: N21)
    let survey_n21_count1 = await this.getSurveyOrderCount("N21", start_date1, end_date1);
    let survey_n21_count2 = await this.getSurveyOrderCount("N21", start_date2, end_date2);
    let survey_n21 = Number(survey_n21_count1) + Number(survey_n21_count2);

    // 배송중 count 조회 N30
    let survey_n30_count1 = await this.getSurveyOrderCount("N30", start_date1, end_date1);
    let survey_n30_count2 = await this.getSurveyOrderCount("N30", start_date2, end_date2);
    let survey_n30 = Number(survey_n30_count1) + Number(survey_n30_count2);

    // 배송완료 count 조회 N40
    let survey_n40_count1 = await this.getSurveyOrderCount("N40", start_date1, end_date1);
    let survey_n40_count2 = await this.getSurveyOrderCount("N40", start_date2, end_date2);
    let survey_n40 = Number(survey_n40_count1) + Number(survey_n40_count2);

    // 배송완료 count 조회 N50
    let survey_n50_count1 = await this.getSurveyOrderCount("N50", start_date1, end_date1);
    let survey_n50_count2 = await this.getSurveyOrderCount("N50", start_date2, end_date2);
    let survey_n50 = Number(survey_n50_count1) + Number(survey_n50_count2);

    survey_jQuery(".survey_n10").html(`<span>${survey_n10}</span>`);
    survey_jQuery(".survey_n20").html(`<span>${survey_n20}</span>`);
    survey_jQuery(".survey_n21").html(`<span>${survey_n21}</span>`);
    survey_jQuery(".survey_n30").html(`<span>${survey_n30}</span>`);
    survey_jQuery(".survey_n40").html(`<span>${survey_n40}</span>`);
    survey_jQuery(".survey_n50").html(`<span>${survey_n50}</span>`);

    if (survey_n10 > 0) {
      survey_jQuery(".survey_n10").addClass("active");
    }
    if (survey_n20 > 0) {
      survey_jQuery(".survey_n20").addClass("active");
    }
    if (survey_n21 > 0) {
      survey_jQuery(".survey_n21").addClass("active");
    }
    if (survey_n30 > 0) {
      survey_jQuery(".survey_n30").addClass("active");
    }
    if (survey_n40 > 0) {
      survey_jQuery(".survey_n40").addClass("active");
    }
    if (survey_n50 > 0) {
      survey_jQuery(".survey_n50").addClass("active");
    }
  }

  // 문진 리스트 조회
  async setSurveyResultByMemberId(list) {
    if (list.length == 0) {
      survey_jQuery(".survey_diagnosis_start").show();
      return;
    } else {
      survey_jQuery(".survey_diagnosis_list").show();
    }

    let html = "";
    let count = 0;
    for (let param of list) {
      if (param[0].product_type == "treatment" || param[0].product_type == "sampoo") {
        // 헤어케어 html
        let result = this.getSurveyHairCareHtml(param);
        if (result) {
          html += result;
          count++;
        }
      }
      if (param[0].product_type == "essence") {
        // 스킨케어 html
        let result = this.getSurveySkinCareHtml(param);
        if (result) {
          html += result;
          count++;
        }
      }
      if (count >= 4) {
        break;
      }
    }
    survey_jQuery(".treatHis").empty();
    survey_jQuery(".treatHis").html(html);
  }
  // 전체 문진 리스트 조회
  async setSurveyResultAllByMemberId(list, type) {
    if (list.length == 0) {
      survey_jQuery(".survey_diagnosis_start").show();
      return;
    } else {
      survey_jQuery(".survey_diagnosis_start").hide();
      survey_jQuery(".survey_diagnosis_list").show();
    }

    let html = "";
    let count = 0;
    for (let param of list) {
      if (param[0].product_type == "treatment" || param[0].product_type == "sampoo") {
        if (type == "skin_care") {
          continue;
        }
        // 헤어케어 html
        let result = this.getSurveyHairCareHtml(param);
        if (result) {
          html += result;
          count++;
        }
      }
      if (param[0].product_type == "essence") {
        if (type == "hair_care") {
          continue;
        }
        // 스킨케어 html
        let result = this.getSurveySkinCareHtml(param);
        if (result) {
          html += result;
          count++;
        }
      }
    }
    if (count == 0) {
      survey_jQuery(".survey_diagnosis_start").show();
      survey_jQuery(".treatHis").empty();
      return;
    }
    survey_jQuery(".treatHis").empty();
    survey_jQuery(".treatHis").html(html);
  }
  getSurveyHairCareHtml(params) {
    let qna_at = dayjs(params[0].qna_at).format("YY.MM.DD");

    let product_html = "";
    for (let param of params) {
      let product_name = "";
      let oily_level = "";
      let oily_text = "";
      if (param.product_type == "sampoo") {
        product_name = "샴푸";
        let shampoo_keyword = param.osdl_result.point1.shampoo_keyword;
        let shampoo_keyword_array = shampoo_keyword.split(" ");
        oily_text = shampoo_keyword_array[0];
        if (shampoo_keyword_array[1]) {
          oily_level = shampoo_keyword_array[1].toLowerCase();
        }
      }
      if (param.product_type == "treatment") {
        product_name = "트리트먼트";
        let treatment_keyword = param.osdl_result.point1.treatment_keyword;
        let treatment_keyword_array = treatment_keyword.split(" ");
        oily_text = treatment_keyword_array[0];
        if (treatment_keyword_array[1]) {
          oily_level = treatment_keyword_array[1].toLowerCase();
        }
      }
      let bom_code = param.bom_code[0].substr(10, 10);
      product_html += `
                <div class="inBox">
                    <div class="thumb"><img src="${
                      this.survey_product_resource[param.product_type].list_image
                    }" /></div>
                    <div class="thumbDesc">
                        <p class="treatPart">${product_name}</p>
                        <p class="treatCode">${bom_code}</p>
                        <p class="treatLevel"><em>${oily_level}</em>${oily_text}</p>
                    </div>
                </div>
            `;
    }

    let href_url = "";
    let labelFb = "";
    let _qna_at = dayjs(params[0].qna_at).format("YYYY-MM-DD");
    if (params[0].qna_type == "qna") {
      href_url = `/survey/result.html?product_no=${params[0].product_no}&hash=${params[0].hash}&qna_at=${_qna_at}`;
    } else {
      href_url = `/survey/more_result.html?product_no=${params[0].product_no}&hash=${params[0].before_hash}&qna_at=${_qna_at}&re_qna_hash=${params[0].hash}`;
      labelFb = "labelFb";
    }
    let html = `
            <div class="treatHisBox">
                <span class="delHis"><a href="javascript:surveyMyShop.deleteSurveyDiagnosis('${params[0].hash}')" title="진단내역 삭제"></a></span>
                <div class="treatTitle">
                    <span class="${labelFb}"></span>
                    <p>
                        #${params[0].manage_product_nick_name}
                    </p>
                    <span class="treatDate">진단일 : ${qna_at}</span>
                </div>
                <div class="treatInfo">
                    ${product_html}
                </div>
                <div class="treatBtns">
                    <a href="${href_url}" class="btnSq full black">구매하기</a>
                </div>
            </div>
        `;

    return html;
  }

  getSurveySkinCareHtml(params) {
    console.log("params", params);
    let qna_at = dayjs(params[0].qna_at).format("YY.MM.DD");

    // let bom_code = params[0].bom_code[0].substr(10, 10);


    let chemical_code1 = params[0].essence_result.essence_result.ampoule[0]?.chemical_code || "";
    let chemical_code2 = params[0].essence_result.essence_result.ampoule[1]?.chemical_code || "";

    let concept_code = params[0].essence_result.essence_result.concept_ampoule[0]?.chemical_code || "";
    if (!chemical_code2 && concept_code) {
      chemical_code2 = concept_code;
    }
    // Formula Code 입력
    let formula_code =
      chemical_code1 +
      chemical_code2 +
      "-" +
      params[0].essence_result.essence_result.texture.base_code;
    survey_jQuery(".essence_wrap .ess_sec02 .img_area .product_info .code strong").text(
      formula_code
    );

    let type_html = "";
    if (!params[0].essence_result?.essence_result?.ampoule) {
      return "";
    }

    let product_no = 0;
    let find_set_essence = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find(
      (e) => e.type == "skin_care" && e.product_type == "set_essence"
    );
    if (find_set_essence) {
      product_no = find_set_essence.no;
    }

    let count = 0;
    let befor_chemical_full_code = "";
    for (const ampoule of params[0].essence_result.essence_result.ampoule) {
      if (!ampoule.chemical_full_code || count > 1) {
        continue;
      }

      let chemical_full_code = ampoule.chemical_full_code.replace(/[0-9]/g, "");
      let color = "purple";
      if (chemical_full_code == "Hydrating") {
        color = "purple";
      }
      if (chemical_full_code == "Illuminating") {
        color = "orange";
      }
      if (chemical_full_code == "Smoothing") {
        color = "yellow";
      }
      if (chemical_full_code == "Pore Refreshing") {
        color = "green";
      }
      if (chemical_full_code == "Calming") {
        color = "blue";
      }
      if (!befor_chemical_full_code && chemical_full_code) {
        befor_chemical_full_code = chemical_full_code;
      }
      if (befor_chemical_full_code == chemical_full_code && count > 0) {
        continue;
      }

      type_html += `<span class="sType ${color}">${chemical_full_code}</span>`;
      count++;
    }

    let href_url = "";
    let labelFb = "";

    let _qna_at = dayjs(params[0].qna_at).format("YYYY-MM-DD");
    if (params[0].qna_type == "qna") {
      href_url = `/survey_essence/result.html?product_no=${product_no}&hash=${params[0].hash}&qna_at=${_qna_at}`;
    } else {
      href_url = `/survey_essence/result.html?product_no=${product_no}&hash=${params[0].before_hash}&qna_at=${_qna_at}&re_qna_hash=${params[0].hash}`;
      labelFb = "labelFb";
    }
    let html = `
            <div class="treatHisBox">
                <span class="delHis"><a href="javascript:surveyMyShop.deleteSurveyDiagnosis('${
                  params[0].hash
                }')" title="진단내역 삭제"></a></span>
                <div class="treatTitle">
                    <span class="${labelFb}"></span>
                    <p>
                      <a href="${href_url}">#${params[0].manage_product_nick_name}</a>
                    </p>
                    <span class="treatDate">진단일 : ${qna_at}</span>
                </div>
                <div class="treatInfo">
                    <div class="inBox full">
                        <div class="thumb">
                          <a href="${href_url}"><img src="${
                              this.survey_product_resource[params[0].product_type].list_image
                            }" /></a>
                        </div>
                        <div class="thumbDesc">
                            <p class="treatPart">${params[0].product_name}</p>
                            <p class="treatCode">${formula_code}</p>
                            <p class="treatLevel"><!-- 총 5개 중 2개 타입만 노출 됩니다. //-->
                                ${type_html}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="treatBtns">
                    <a href="${href_url}" class="btnSq full black">구매하기</a>
                </div>
            </div>
        `;

    return html;
  }

  // 주문 삭제
  async deleteSurveyDiagnosis(hash) {
    if (!surveyCommon.survey_member_id || !hash) {
      return;
    }

    if (confirm("해당 진단내역을 삭제하시겠습니까?")) {
      return new Promise(function (resolve, reject) {
        survey_jQuery.ajax({
          url: `${surveyCommon.survey_domain}/app/${surveyCommon.survey_app_name}/mall/${surveyCommon.survey_mall_id}/api/survey/shops/${surveyCommon.survey_shop_no}/front/diagnosis?member_id=${surveyCommon.survey_member_id}&hash=${hash}`,
          type: "DELETE",
          success: function (result) {
            console.log("result", result);
            if (result.length == 0) {
              alert("삭제되었습니다.");
              location.reload();
            } else {
              alert(
                "해당 진단 내역으로 주문한 이력이 있습니다.\n주문이력과 피드백루프를 위해 삭제할 수 없습니다."
              );
            }
            resolve(result);
          },
          error: function (request, status, error) {
            console.log(request, status, error);
            resolve([]);
          },
        });
      });
    }
  }

  async getSurveyStorage(product_no) {
    let url = `/front/product/${product_no}/storage?member_id=${surveyCommon.survey_member_id}`;
    return new Promise(async function (resolve, reject) {
      await surveyCommon
        .getSurveyAjax(url)
        .then(function (res) {
          resolve(res);
        })
        .catch(function (err) {
          console.log(err);
          resolve(null);
        });
    });
  }

  async setSurveyStorage() {
    let hair_care = [];
    let skin_care = [];

    for (let survey_product of surveyCommon.survey_product_list[surveyCommon.survey_mall_id]) {
      let result = await this.getSurveyStorage(survey_product.no);
      if (result && result.result_status == "N") {
        if (survey_product.type == "hair_care") {
          hair_care.push({
            product_no: survey_product.no,
            updated_at: result.updated_at,
          });
        }
        if (survey_product.type == "skin_care") {
          skin_care.push({
            product_no: survey_product.no,
            updated_at: result.updated_at,
          });
        }
      }
    }

    let hair_care_sort = hair_care.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));

    if (hair_care_sort.length > 0) {
      survey_jQuery(".survey_progress").show();
      survey_jQuery(".survey_progress .hair").show();
      survey_jQuery(".survey_progress_hair_link").attr(
        "href",
        `/survey?product_no=${hair_care_sort[0].product_no}&type=connect`
      );
    }
    if (skin_care.length > 0) {
      survey_jQuery(".survey_progress").show();
      survey_jQuery(".survey_progress .skin").show();
      let find = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find(
        (e) => e.product_type == "set_essence"
      );
      survey_jQuery(".survey_progress_skin_link").attr(
        "href",
        `/survey_essence/index.html?product_no=${find.no}&type=connect`
      );
    }
  }

  surveyMoveReBuyPage(product_no, hash, qna_at) {
    // surveyCommon
    if (product_no && hash) {
      let find = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find(
        (e) => Number(e.no) == Number(product_no)
      );
      if (find && find.type == "hair_care") {
        location.href = `${survey_skin_path}/myshop/mypage/repurchase.html?product_no=${product_no}&hash=${hash}&qna_at=${qna_at}`;
      }
      if (find && find.type == "skin_care") {
        location.href = `${survey_skin_path}/myshop/mypage/repurchase_essen.html?product_no=${product_no}&hash=${hash}&qna_at=${qna_at}`;
      }
    }
  }
}
