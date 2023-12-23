const surveyCommon = new SurveyCommon();
const surveyMyShop = new SurveyMyShop();

window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      let start_date = dayjs().subtract(1, "month").format("YYYY-MM-DD");
      let end_date = dayjs().format("YYYY-MM-DD");
      survey_jQuery(".survey_n10").attr("href", `/myshop/order/list.html?status=analysis&history_start_date=${start_date}&history_end_date=${end_date}`);
      survey_jQuery(".survey_n20").attr("href", `/myshop/order/list.html?status=ready&history_start_date=${start_date}&history_end_date=${end_date}`);
      survey_jQuery(".survey_n21").attr("href", `/myshop/order/list.html?status=prepare&history_start_date=${start_date}&history_end_date=${end_date}`);
      survey_jQuery(".survey_n30").attr("href", `/myshop/order/list.html?status=shipping&history_start_date=${start_date}&history_end_date=${end_date}`);
      survey_jQuery(".survey_n40").attr("href", `/myshop/order/list.html?status=complate&history_start_date=${start_date}&history_end_date=${end_date}`);
      survey_jQuery(".survey_n50").attr("href", `/myshop/order/list.html?status=feedbackloop&history_start_date=${start_date}&history_end_date=${end_date}`);

      // 최근 본 상품 > 상품 상세페이지 링크 수정
      let product_area_list = survey_jQuery(".description .prdImg a");
      for (let i = 0; i < product_area_list.length; i++) {
        let href = survey_jQuery(product_area_list[i]).attr("href");
        if (href) {
          for (const survey_product of surveyCommon.survey_product_list[surveyCommon.survey_mall_id]) {
            if (href.indexOf(`product_no=${survey_product.no}`) > -1 && survey_product.type == "skin_care") {
              href = href.replace("detail.html", "detail_essence.html");
              survey_jQuery(product_area_list[i]).attr("href", href);
            }
            if (href.indexOf(`product_no=${survey_product.no}`) > -1 && survey_product.type == "hair_care") {
              href = href.replace("detail.html", "detail_hair.html");
              survey_jQuery(product_area_list[i]).attr("href", href);
            }
          }
          survey_jQuery(product_area_list[i]).attr("href", href);
        }
      }

      await surveyCommon.getCafe24CustomerInfo(CAFE24API);
      await surveyMyShop.surveyGetProductVariants();

      setTimeout(async function () {
        await surveyCommon.getCafe24CustomerInfo(CAFE24API);
        // 문진 조회
        let from = dayjs().subtract(6, "month").format("YYYY-MM-DD");
        let to = dayjs().format("YYYY-MM-DD");
        let survey_result_list = await surveyMyShop.getSurveyResultByMemberId(from, to);
        surveyMyShop.surveySampleOrderCheck(survey_result_list);

        // 문진 노출
        surveyMyShop.setSurveyResultByMemberId(survey_result_list);

        // 진단 이어하기 입력
        await surveyMyShop.setSurveyStorage();

        // 주문 count 입력
        await surveyMyShop.setOrderCount();

      }, 1000);
    })(
      CAFE24API.init({
        client_id: surveyCommon.app_client_id,
        version: surveyCommon.app_version,
      })
    );
  },
  false
);
