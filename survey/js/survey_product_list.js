const surveyCommon = new SurveyCommon();
let survey_cate_no = surveyCommon.shoplusGetParameters("cate_no");

window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      await surveyCommon.getCafe24CustomerInfo(CAFE24API);        
      let find_category = surveyCommon.survey_category_no_list[surveyCommon.survey_mall_id].find(
        (e) => Number(e.no) == Number(survey_cate_no)
      );
                
      if (find_category) {

        let find_qna_link = surveyCommon.survey_qna_link_list[surveyCommon.survey_mall_id].find(
          (e) => e.type == find_category.type
        );

        let survey_link = find_qna_link.survey_link;

        // 헤어케어
        if (find_category.type == "hair_care") {
          survey_jQuery(".prdVisual.hair .btnPrd").attr("href", `${survey_link}`);
        }
        // 스킨케어
        if (find_category.type == "skin_care") {
          survey_jQuery(".prdVisual.skin .btnPrd").attr("href", `${survey_link}`);
        }
      }

      // care 종류에따른 이미지 영역 / 상품 이름 영역 상품 상세페이지 링크 변경
      let img_zoom_list = survey_jQuery(".img_zoom a");
      for (let img_zoom of img_zoom_list) {
        let img_zoom_name = survey_jQuery(img_zoom).attr("name");
        let product_no = surveyCommon.shoplusGetNumber(img_zoom_name);
        let find = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find((e) => Number(e.no) == Number(product_no));
        if (find) {
          if (find.type == "hair_care") {
            survey_jQuery(img_zoom).attr("href", "/product/detail_hair.html?product_no=" + product_no);
            survey_jQuery(img_zoom).parent().parent().next().children(".name").children("a").attr("href", "/product/detail_hair.html?product_no=" + product_no);
          }
          if (find.type == "skin_care") {
            survey_jQuery(img_zoom).attr("href", "/product/detail_essence.html?product_no=" + product_no);
            survey_jQuery(img_zoom).parent().parent().next().children(".name").children("a").attr("href", "/product/detail_essence.html?product_no=" + product_no);
          }
        }
      }

      // care 종류에따른 상품명 영역 상품 상세페이지 링크 변경
      let product_name_area_list = survey_jQuery(".ec-base-product .prdList .description a");
      for (let product_name of product_name_area_list) {
        survey_jQuery(product_name).attr("href")
      }
    })(
      CAFE24API.init({
        client_id: surveyCommon.app_client_id,
        version: surveyCommon.app_version,
      })
    );
  },
  false
);
