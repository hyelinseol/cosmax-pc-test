const surveyCommon = new SurveyCommon();
const surveyMyShop = new SurveyMyShop();

window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      let type = surveyCommon.shoplusGetParameters("type");
      await surveyCommon.getCafe24CustomerInfo(CAFE24API);
      await surveyMyShop.surveyGetProductVariants();

      setTimeout(async function () {
        await surveyCommon.getCafe24CustomerInfo(CAFE24API);

        // 문진 조회
        // let from = dayjs().subtract(6, "month").format("YYYY-MM-DD");
        let from = survey_jQuery("#survey_search_from").val();
        from = dayjs(from).format("YYYY-MM-DD");
        let to = dayjs().format("YYYY-MM-DD");
        let survey_result_list = await surveyMyShop.getSurveyResultByMemberId(from, to);
        surveyMyShop.surveySampleOrderCheck(survey_result_list);

        // params[0].order_id

        // 문진 노출
        surveyMyShop.setSurveyResultAllByMemberId(survey_result_list, type);

        if (!type) {
          survey_jQuery("#type_all").addClass("active");
        } else if (type == "hair_care") {
          survey_jQuery("#type_hair_care").addClass("active");
        } else if (type && type == "skin_care") {
          survey_jQuery("#type_skin_care").addClass("active");
        }

        // 진단 이어하기 입력
        await surveyMyShop.setSurveyStorage();
      }, 1000);
    })(
      CAFE24API.init({
        client_id: app_client_id,
        version: app_version,
      })
    );

    let dateFormat = "yy.mm.dd";
    survey_jQuery.datepicker.setDefaults({
      prevText: "이전 달",
      nextText: "다음 달",
      monthNames: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
      ],
      monthNamesShort: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
      ],
      dayNames: ["일", "월", "화", "수", "목", "금", "토"],
      dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
      dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
      showMonthAfterYear: true,
      yearSuffix: "년",
      dateFormat,
      maxDate: new Date(),
    });

    let from = survey_jQuery("#survey_search_from")
      .datepicker()
      .on("change", function () {
        to.datepicker("option", "minDate", surveyGetDate(dateFormat, this));
      });
    let _from = dayjs().subtract(180, "day").format("YYYY.MM.DD");
    survey_jQuery("#survey_search_from").val(_from);

    let to = survey_jQuery("#survey_search_to")
      .datepicker()
      .on("change", function () {
        from.datepicker("option", "maxDate", surveyGetDate(dateFormat, this));
      });
    let _to = dayjs().format("YYYY.MM.DD");
    survey_jQuery("#survey_search_to").val(_to);

    const survey_search_from = document.getElementById("survey_search_from");
    survey_search_from.dispatchEvent(new Event("change"));

    const survey_search_to = document.getElementById("survey_search_to");
    survey_search_to.dispatchEvent(new Event("change"));
  },
  false
);

function surveyChangeSearchForm(day) {
  survey_jQuery("#survey_search_from").val("");
  const _survey_search_from = document.getElementById("survey_search_from");
  _survey_search_from.dispatchEvent(new Event("change"));

  let from = dayjs().subtract(day, "day").format("YYYY.MM.DD");
  survey_jQuery("#survey_search_from").val(from);

  let to = dayjs().format("YYYY.MM.DD");
  survey_jQuery("#survey_search_to").val(to);

  setTimeout(function () {
    document.getElementById("survey_search_from").dispatchEvent(new Event("change"));
  }, 200);
}

async function surveySearch() {
  let type = surveyCommon.shoplusGetParameters("type");
  let search_from = survey_jQuery("#survey_search_from").val();
  let search_to = survey_jQuery("#survey_search_to").val();
  let survey_search_status = survey_jQuery("#survey_search_status").val();

  let survey_result_list = await surveyMyShop.getSurveyResultByMemberId(search_from, search_to);

  survey_jQuery(".survey_diagnosis_list").empty();

  // 문진 노출
  surveyMyShop.setSurveyResultAllByMemberId(survey_result_list, type);

  const date1 = dayjs(search_from);
  const date2 = dayjs(search_to);
  const diff = date2.diff(date1, "day");

  survey_jQuery("#survey_search_6month").removeClass("on");
  survey_jQuery("#survey_search_3month").removeClass("on");
  survey_jQuery("#survey_search_1month").removeClass("on");
  if (diff == 180) {
    survey_jQuery("#survey_search_6month").addClass("on");
  }
  if (diff == 90) {
    survey_jQuery("#survey_search_3month").addClass("on");
  }
  if (diff == 30) {
    survey_jQuery("#survey_search_1month").addClass("on");
  }
}

function surveyGetDate(dateFormat, element) {
  let date;
  try {
    date = survey_jQuery.datepicker.parseDate(dateFormat, element.value);
  } catch (error) {
    date = null;
  }
  return date;
}
