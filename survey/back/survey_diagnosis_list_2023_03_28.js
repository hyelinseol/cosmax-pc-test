let add_view_count = 1;

window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      survey_mall_id = CAFE24API.MALL_ID;
      survey_shop_no = CAFE24API.SHOP_NO;

      surveyGetProductVariants();
      setTimeout(async function () {
        CAFE24API.getCustomerInfo(function (err, res) {
          return new Promise(function (resolve, reject) {
            survey_member_name = null;
            survey_member_id = null;
            if (res) {
              if (res.customer) {
                survey_member_name = res.customer.name;
                survey_member_id = res.customer.member_id;
              }
            }
            resolve(res);
          });
        });

        // 연-월 select 입력
        setDateYm();

        // 진단 내역 조회
        await getSurveyDiagnosisByDate();
        setSurveyDiagnosis();
        // await getSurveyStorage();

        let update_at = null;
        let product_no = null;
        let result = await surveySearchSiagnosisIng();
        if (result) {
          for (const siagnosis of result) {
            if (!update_at) {
              update_at = siagnosis.updated_at;
              product_no = siagnosis.product_no;
            }
            if (dayjs(update_at) < dayjs(siagnosis.updated_at)) {
              update_at = siagnosis.updated_at;
              product_no = siagnosis.product_no;
            }
          }
        }

        let count = survey_jQuery(".treatHisBox").length;
        if (count == 0) {
          survey_jQuery(".field_line").hide();
        } else {
          survey_jQuery(".field_line").show();
        }

        let is_show_survey_progress = false;
        if (product_no) {
          if (Number(product_no) == survey_shampoo_no) {
            product_image = survey_product_resource.shampoo.list_image;
          } else if (Number(product_no) == survey_treatment_no) {
            product_image = survey_product_resource.treatment.list_image;
          } else {
            product_image = survey_product_resource.set_product.list_image;
          }
          survey_jQuery(".survey_progress_hair_img").attr("src", product_image);
          survey_jQuery(".survey_progress_hair_date").text(dayjs(update_at).format("YYYY.MM.DD"));
          survey_jQuery(".survey_progress_hair_link").attr(
            "href",
            `${survey_skin_path}/survey?product_no=${product_no}&type=connect`
          );

          if (count == 0) {
            survey_jQuery(".treatHis.padTop").css("padding-top", "0px");
            survey_jQuery(".order_history.ship").css("margin", "0px");
          }

          survey_jQuery(".survey_progress").show();
          is_show_survey_progress = true;
        }

        if (count <= 6) {
          // 진단이 6개 이하면 더보기 버튼 히든
          // 진단중 margin-top 초기화
          survey_jQuery(".btn-more").hide();
          survey_jQuery(".survey_progress").css("margin-top", "0px");
          // 내역이 없습니다. 히든
          survey_jQuery(".diagnosisList .all_no_data").hide();
          if (count > 0) {
            survey_jQuery(".diagnosisList").addClass("diagnosisList2");
          }
          survey_jQuery(".treatHisBox").show();
        } else {
          survey_jQuery(".diagnosisList").show();
          survey_jQuery(".treatHisBox").each(function (index, element) {
            if (index < 6) {
              survey_jQuery(element).show();
            }
          });
        }

        if (count == 0 && !is_show_survey_progress) {
          // 진단이 없을때 `진단을 시작해보세요!` 노출
          survey_jQuery(".survey_diagnosis_start_link").attr(
            "href",
            `${survey_skin_path}/survey?product_no=${survey_set_product_no}`
          );
          survey_jQuery(".order_history.ship").css("margin", "0px");
          survey_jQuery(".treatHis.padTop").css("padding-top", "0px");
          survey_jQuery("#survey_event_banner").show();
          survey_jQuery(".survey_diagnosis_start").show();
        }
        survey_jQuery(".diagnosisList").show();

        
      }, 500);
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
function surveyGetDate(dateFormat, element) {
  let date;
  try {
    date = survey_jQuery.datepicker.parseDate(dateFormat, element.value);
  } catch (error) {
    date = null;
  }
  return date;
}

function surveyDatePickerClick(type) {
  survey_jQuery("#" + type).trigger("click");
}

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
  add_view_count = 1;
  let search_from = survey_jQuery("#survey_search_from").val();
  let search_to = survey_jQuery("#survey_search_to").val();
  let survey_search_status = survey_jQuery("#survey_search_status").val();
  if (survey_search_status != "diagnosis_ing") {
    await getSurveyDiagnosisByDate(
      dayjs(search_from).format("YYYY-MM-DD"),
      dayjs(search_to).format("YYYY-MM-DD"),
      null,
      survey_search_status
    );
    setSurveyDiagnosis();
  } else {
    let result = await surveySearchSiagnosisIng();
    surveySetSiagnosisIng(result);
  }

  let count = survey_jQuery(".treatHisBox").length;
  if (count == 0) {
    if (survey_search_status == "diagnosis_ing") {
      let display = survey_jQuery(".survey_progress").css("display");
      if (display == "none") {
        survey_jQuery(".message").removeClass("displaynone");
      }
    } else {
      survey_jQuery(".message").removeClass("displaynone");
    }
  }

  if (count <= 6) {
    survey_jQuery(".btn-more").hide();
    survey_jQuery(".survey_progress").css("margin-top", "0px");
    survey_jQuery(".diagnosisList .all_no_data").hide();
    if (count > 0) {
      survey_jQuery(".diagnosisList").addClass("diagnosisList2");
    }
    survey_jQuery(".treatHisBox").show();
  } else {
    survey_jQuery(".diagnosisList").show();
    survey_jQuery(".treatHisBox").each(function (index, element) {
      if (index < 6) {
        survey_jQuery(element).show();
      }
    });
  }

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

function addView() {
  //
  add_view_count += 1;
  let count = add_view_count * 6;
  survey_jQuery(".treatHisBox").each(function (index, element) {
    if (index < count) {
      survey_jQuery(element).show();
    } else {
      survey_jQuery(element).hide();
    }
  });

  if (count >= survey_jQuery(".treatHisBox").length) {
    survey_jQuery(".btn-more").hide();
  }
}
