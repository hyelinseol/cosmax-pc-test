window.addEventListener(
  "load",
  function (event) {
    (async function (CAFE24API) {
      setTimeout(async function () {
        survey_mall_id = CAFE24API.MALL_ID;
        survey_shop_no = CAFE24API.SHOP_NO;
        CAFE24API.getCustomerInfo(function (err, res) {
          survey_member_name = null;
          survey_member_id = null;
          if (res) {
            if (res.customer) {
              survey_member_name = res.customer.name;
              survey_member_id = res.customer.member_id;
            }
          }
        });

        getSurveyDiagnosesCount();

        let board_list = await getSurveyBoard();
        setSurveyBoardReadStatus(board_list);
      }, 1000);
    })(
      CAFE24API.init({
        client_id: app_client_id,
        version: app_version,
      })
    );
  },
  false
);
