const surveyCommonHeader = new SurveyCommon();

window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      await surveyCommonHeader.getCafe24CustomerInfo(CAFE24API);
      let qna_link_list = surveyCommonHeader.survey_qna_link_list[surveyCommonHeader.survey_mall_id];
      for (const qna_link of qna_link_list) {
        if (qna_link.type == "hair_care" && qna_link.detail_type == "") {
          survey_jQuery(".survey_hair_care").attr("href", qna_link.survey_link);
        }
        if (qna_link.type == "skin_care" && qna_link.detail_type == "") {
          survey_jQuery(".survey_skin_care").attr("href", qna_link.survey_link);
        }
      }
    })(
      CAFE24API.init({
        client_id: surveyCommonHeader.app_client_id,
        version: surveyCommonHeader.app_version,
      })
    );
  },
  false
);
