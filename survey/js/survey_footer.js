async function setUpdateSurveyResultMember(product_no, hash, member_id) {
  let set_parma = {
    member: {
      member_id
    },
    hash
  };
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${CAFE24API.MALL_ID}/api/survey/shops/${CAFE24API.SHOP_NO}/front/product/${product_no}/member`,
      type: "PUT",
      accept: "application/json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(set_parma),
      success: async function (result) {
        sessionStorage.removeItem("survey_result_product_no");
        sessionStorage.removeItem("survey_result_hash");
        sessionStorage.removeItem("survey_result_show_diagnosis");

        resolve(result);
      },
      error: function (request, status, error) {
        resolve([]);
      },
    });
  });
}
window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      setTimeout(async function () {
        await CAFE24API.getCustomerInfo(async function (err, res) {
            if (res) {
              if (res.customer && res.customer.member_id) {
                let survey_result_product_no = sessionStorage.getItem("survey_result_product_no");
                let survey_result_hash = sessionStorage.getItem("survey_result_hash");
                if (survey_result_product_no && survey_result_hash) {

         
                  let survey_result_show_diagnosis = sessionStorage.getItem("survey_result_show_diagnosis");
                  await setUpdateSurveyResultMember(survey_result_product_no, survey_result_hash, res.customer.member_id);
                  if (survey_result_show_diagnosis) {
                    alert("진단내역이 저장되었습니다.");
                  }
                }
              }
            }
        });
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