
let add_view_count = 0;
let last_height = 0;
window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      survey_mall_id = CAFE24API.MALL_ID;
      survey_shop_no = CAFE24API.SHOP_NO;

      setTimeout(async function () {
        await CAFE24API.getCustomerInfo(function (err, res) {
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

        surveyGetProductVariants();


        let history_start_date = shoplusGetParameters("history_start_date");
        let history_end_date = shoplusGetParameters("history_end_date");
        let status = shoplusGetParameters("status");
        let mode = shoplusGetParameters("mode");

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

        let _from = dayjs().subtract(180, "day").format("YYYY.MM.DD");
        if (history_start_date) {
          _from = dayjs(history_start_date).format("YYYY.MM.DD");
        }

        survey_jQuery("#survey_search_from").val(_from);
        let from = survey_jQuery("#survey_search_from")
          .datepicker()
          .on("change", function () {
            to.datepicker("option", "minDate", surveyGetDate(dateFormat, this));
          });

        let _to = dayjs().format("YYYY.MM.DD");
        if (history_end_date) {
          _to = dayjs(history_end_date).format("YYYY.MM.DD");
        }
        survey_jQuery("#survey_search_to").val(_to);
        let to = survey_jQuery("#survey_search_to")
          .datepicker()
          .on("change", function () {
            from.datepicker("option", "maxDate", surveyGetDate(dateFormat, this));
          });
        const survey_search_from = document.getElementById("survey_search_from");
        survey_search_from.dispatchEvent(new Event("change"));

        const survey_search_to = document.getElementById("survey_search_to");
        survey_search_to.dispatchEvent(new Event("change"));

        survey_jQuery("#survey_search_status").val(status);

        const date1 = dayjs(_from);
        const date2 = dayjs(_to);
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

        survey_jQuery(".survey_analysis").removeClass("active on");
        survey_jQuery(".survey_ready").removeClass("active on");
        survey_jQuery(".survey_prepare").removeClass("active on");

        survey_jQuery(".survey_shipping").removeClass("active on");
        survey_jQuery(".survey_complate").removeClass("active on");

        survey_jQuery(".survey_cs").removeClass("active on");

        let _history_start_date = history_start_date;
        if (!_history_start_date) {
          _history_start_date = survey_jQuery("#survey_search_from").val();
          _history_start_date = dayjs(_history_start_date).format("YYYY-MM-DD");
        }

        let _history_end_date = history_end_date;
        if (!_history_end_date) {
          _history_end_date = survey_jQuery("#survey_search_to").val();
          _history_end_date = dayjs(_history_end_date).format("YYYY-MM-DD");
        }
        let set_date_param = `history_start_date=${_history_start_date}&history_end_date=${_history_end_date}`;
        if (mode && mode == "cs") {
          survey_jQuery(".survey_cs").addClass("active on");
        } else if (status) {
          survey_jQuery(`.survey_${status}`).addClass("active on");
        } else {
          survey_jQuery(".survey_all").addClass("active on");
        }

        survey_jQuery(".survey_all a").attr(
          "href",
          `${survey_skin_path}/myshop/order/list.html?status=&${set_date_param}`
        );
        survey_jQuery(".survey_analysis a").attr(
          "href",
          `${survey_skin_path}/myshop/order/list.html?status=analysis&${set_date_param}`
        );
        survey_jQuery(".survey_ready a").attr(
          "href",
          `${survey_skin_path}/myshop/order/list.html?status=ready&${set_date_param}`
        );
        survey_jQuery(".survey_prepare a").attr(
          "href",
          `${survey_skin_path}/myshop/order/list.html?status=prepare&${set_date_param}`
        );

        survey_jQuery(".survey_shipping a").attr(
          "href",
          `${survey_skin_path}/myshop/order/list.html?status=shipping&${set_date_param}`
        );

        survey_jQuery(".survey_complate a").attr(
          "href",
          `${survey_skin_path}/myshop/order/list.html?status=complate&${set_date_param}`
        );
        survey_jQuery(".survey_cs a").attr(
          "href",
          `${survey_skin_path}/myshop/order/list.html?mode=cs&${set_date_param}`
        );

        let check_status = null;
        if (status == "analysis") {
          check_status = "처방 분석 중";
        }
        if (status == "ready") {
          check_status = "조제 준비 중";
        }
        if (status == "prepare") {
          check_status = "맞춤 조제 중";
        }
        if (status == "shipping") {
          check_status = "배송중";
        }
        if (status == "complate") {
          check_status = "배송완료";
        }

        // let survey_diagnosis_result = await getSurveyOrderListDiagnosis();

        let survey_diagnosis_result = await getSurveyDiagnosisOrder(_history_start_date, _history_end_date);

        let days = 180;
        if (history_start_date && history_end_date) {
          days = dayjs(history_end_date).diff(history_start_date, 'day');
        } else {
          history_start_date = dayjs().subtract(180, "day").format("YYYY-MM-DD");
          history_end_date = dayjs().format("YYYY-MM-DD");
        }


        let status_type = "N00,N10,N22,N20,N21,N30,N40,C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,E00,E10,N01,E12,E13,E20,E30,E32,E34,E36";
        // 처방 분석 조회 (상품준비중: N10)
        if (status == "analysis") {
          status_type = "N10,N22";
        }
        // 조제준비중 조회 (배송준비중: N20)
        if (status == "ready") {
          status_type = "N20";
        }
        // 맞춤조제중 조회 (배송대기: N21)
        if (status == "prepare") {
          status_type = "N21";
        }
        // 배송중 조회 N30 
        if (status == "shipping") {
          status_type = "N30";
        }
        // 배송완료 조회 N40 
        if (status == "complate") {
          status_type = "N40";
        }
        // 취소/교환/반품 조회 C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,E00,E10,N01,E12,E13,E20,E30,E32,E34,E36
        if (mode && mode == "cs") {
          status_type = "C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,E00,E10,N01,E12,E13,E20,E30,E32,E34,E36";
        }

        let survey_status_array = status_type.split(",");
        let survey_order_list = [];
        let loop_count = Math.ceil(days / 60);
        for (let i = 0; i < loop_count; i++) {
          let start_date = dayjs(history_start_date).add(((i * 60) + i), "day").format("YYYY-MM-DD");
          let end_date = dayjs(start_date).add(60, "day").format("YYYY-MM-DD");
          if (dayjs(end_date) > dayjs(history_end_date)) {
            end_date = dayjs(history_end_date).format("YYYY-MM-DD");
          }
          let survey_orders = await getSurveyOrder(status_type, start_date, end_date);
          for (let order of survey_orders) {
            survey_order_list.push(order);
          }
        }
        // 순서 정렬
        survey_order_list.sort(function(comp1, comp2) {
          let comp1UC = dayjs(comp1.order_date);
          let comp2UC = dayjs(comp2.order_date);
          if (comp1UC < comp2UC) {
            return 1;
          } else {
            return -1;
          }
        });

        
        let html = "";
        for (const order of survey_order_list) {

          // 선물하기면 건너뛴다
          if (order.additional_order_info_list && order.additional_order_info_list.length > 0) {
            if (order.additional_order_info_list[0].value && order.additional_order_info_list[0].value.indexOf("주문자이름") > -1) {
              continue;
            }
          }

          let order_date = dayjs(order.order_date).format("YYYY-MM-DD");
          let order_id = order.order_id;
          let item_index = 0;
          let row_count = 0;
          for (const item of order.items) {
            if (survey_status_array.indexOf(item.order_status) > -1) {
              row_count++;
            }
          }

          for (const item of order.items) {
            if (survey_status_array.indexOf(item.order_status) < 0) {
              continue;
            }
            let product_no = item.product_no;
            let product_name = item.product_name;
            let product_nick_name = "";
            let product_hash_code = "";
            if (item.product_bundle_list) {
              // 세트
              for (const values of item.product_bundle_list[0].additional_option_values) {
                if (values.name && (values.name.indexOf("맞춤형 트리트먼트 이름") > -1 || values.name.indexOf("맞춤형 샴푸 이름") > -1)) {
                  product_nick_name = values.value;
                }
                if (values.name && (values.name.indexOf("해시코드") > -1)) {
                  product_hash_code = values.value;
                }
              }
              if (!product_nick_name || !product_hash_code) {
                if (item.product_bundle_list[0].additional_option_value) {
                  let option_array = item.product_bundle_list[0].additional_option_value.split(";");
                  for (const option of option_array) {
                    if (option.indexOf("이름") > -1 || option.indexOf("이름") > -1) {
                      let name_array = option.split("=");
                      product_nick_name = name_array[1];
                    }
                    if (option.indexOf("해시코드") > -1) {
                      let hash_code_array = option.split("=");
                      product_hash_code = hash_code_array[1];
                    }
                  }
                }
              }
            } else {
              // 세트 X
              if (item && item.additional_option_value) {
                let option_array = item.additional_option_value.split(";");
                for (const option of option_array) {
                  if (option.indexOf("이름") > -1 || option.indexOf("이름") > -1) {
                    let name_array = option.split("=");
                    product_nick_name = name_array[1];
                  }
                  if (option.indexOf("해시코드") > -1) {
                    let hash_code_array = option.split("=");
                    product_hash_code = hash_code_array[1];
                  }
                }
              }
            }
            let payment_amount = item.payment_amount;
            let product_quantity = item.quantity;
            let product_status_text = item.status_text;
            if (product_status_text == "상품준비중" || product_status_text == "배송보류") {
              product_status_text = "처방 분석 중";
            }
            if (product_status_text == "배송준비중") {
              product_status_text = "조제 준비 중";
            }
            if (product_status_text == "배송대기") {
              product_status_text = "맞춤 조제 중";
            }

            let survey_shipping_search_style = "display: none";
            let survey_review_write_html = ``;

            let survey_btn_rebuy_style = "display: none";
            let survey_btn_rebuy_onclick = "";

            let find_qna_at = "";
            let view_result_url = "";
            let find = survey_diagnosis_result.find((e) => e.result_hash == product_hash_code);
            if (find) {
              find_qna_at = dayjs(find.qna_at).format("YYYY.MM.DD");
              if (find.parent_hash == "") {
                view_result_url = `/survey/result.html?product_no=${find.product_no}&hash=${product_hash_code}&qna_at=${find_qna_at}`
              } else {
                view_result_url = `/survey/more_result.html?product_no=${find.product_no}&hash=${find.parent_hash}&qna_at=${find_qna_at}&re_qna_hash=${product_hash_code}`
              }
            }

            if (product_status_text == "배송완료") {
              survey_shipping_search_style = "";
              if (find_qna_at) {
                survey_btn_rebuy_style = "";
                survey_review_write_html = `
                  <a
                    href="#"
                    class="btnLineG snap_review_write_btn"
                    data-params="product_no=${product_no}&order_id=${order_id}"
                    data-detail="product_no=${product_no}&order_id=${order_id}&ord_item_code=${item.order_item_code}"
                    status="${status}"
                  >리뷰작성하기</a>
                `;
                // let qna_at = dayjs(find_qna_at).format("YYYY.MM.DD");
                survey_btn_rebuy_onclick = `surveyMoveReBuyPage(${product_no}, '${product_hash_code}', '${find_qna_at}')`;
              }
            }
            if (product_status_text == "배송중") {
              survey_shipping_search_style = "";
            }
            if (!product_hash_code) {
              survey_btn_rebuy_style = "display: none";
            }

            let survey_cancel_style = "display: none";
            if (product_status_text == "입금전" || product_status_text == "처방 분석 중") {
              survey_cancel_style = "";
            }
            let order_id_array = order_id.split("-");
            let order_id_html = order_id_array[0] + "<br>-" + order_id_array[1];

            let product_image = survey_product_resource.set_product.list_image;
            if (product_no == survey_shampoo_no) {
              product_image = survey_product_resource.shampoo.list_image
            }
            if (product_no == survey_treatment_no) {
              product_image = survey_product_resource.treatment.list_image
            }

            let row_span_attr = "";
            let sub_html = "";
            if (row_count > 1 && item_index == 0) {
              row_span_attr = `rowspan= ${row_count}`;
              sub_html = `
                <td ${row_span_attr} class="number">
                ${order_date}
                </td>
                <td ${row_span_attr} class="number">
                <p>
                  <a href="/myshop/order/detail.html?order_id=${order_id}&page=1&history_start_date=${order_date}&history_end_date=${order_date}" class="line survey_order_no"
                    >${order_id_html}</a
                  >
                </p>
                </td>
              `;
            }

            if (row_count < 2) {
              sub_html = `
                <td ${row_span_attr} class="number">
                ${order_date}
                </td>
                <td ${row_span_attr} class="number">
                <p>
                  <a href="/myshop/order/detail.html?order_id=${order_id}&page=1&history_start_date=${order_date}&history_end_date=${order_date}" class="line survey_order_no"
                    >${order_id_html}</a
                  >
                </p>
                </td>
              `;
            }

            html += `
            <tr class="survey_order_area" order_id="${order_id}">
              ${sub_html}
              <td class="product left">
                <div class="thumb">
                  <a href="/product/detail.html?product_no=${product_no}"
                    ><img
                      src="${product_image}"
                      onerror="this.src='//img.echosting.cafe24.com/thumb/img_product_small.gif';"
                      alt=""
                  /></a>
                </div>
                <div class="info">
                  <strong class="name"><a href="/product/detail.html?product_no=${product_no}" class="ec-product-name">${product_name}</a></strong>
                  <h3 class="nickName">#${product_nick_name}</h3>
                  <p class="viewResult"><a href="${view_result_url}">진단결과보기</a></p>
                  <div class="price">
                    <strong>${surveyComma(Number(payment_amount))}원</strong>
                    / ${product_quantity}개
                  </div>
                </div>
              </td>
              <td class="state">
                <p class="txtEm">${product_status_text}</p>
                <a
                  href="#none"
                  class="survey_shipping_search btnLineG"
                  style="${survey_shipping_search_style}"
                  onclick="surveyShippingSearch('${order_id}')"
                  >배송조회</a
                >
                <a href="javascript:void(0);" class="survey_cancel btnLineG" style="${survey_cancel_style}" order_id="${order_id}"
                onclick="surveyCancel('${order_id}')"
                  >취소요청</a
                >
              </td>
              <td>
                <a
                  href="#none"
                  class="btnLineG survey_review_show"
                  style="display: none"
                  >내 리뷰 보기</a
                >
                ${survey_review_write_html}
                <a
                  href="#none"
                  class="btnRebuy"
                  style="${survey_btn_rebuy_style}"
                  onclick="${survey_btn_rebuy_onclick}"
                  >재구매하기</a
                >
              </td>
            </tr>
            `;
            item_index++;
          }
        }

        survey_jQuery(".survey_order_list").empty();
        if (survey_order_list.length == 0) {
          survey_jQuery(".survey_diagnosis_list").css("height", "200px");
          survey_jQuery(".message").show();
          survey_jQuery(".btn-more").remove();
        } else {
          survey_jQuery(".survey_order_list").html(html);
          addView();
        }
        survey_jQuery(".survey_order_list").show();

        survey_jQuery(".stateSelect").show();
        survey_jQuery(".survey_diagnosis_list").css("visibility", "");
      }, 100);
    })(
      CAFE24API.init({
        client_id: app_client_id,
        version: app_version,
      })
    );
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

function surveyChangeSearchForm(day, element) {
  survey_jQuery("#survey_search_from").datepicker();
  let from = dayjs().subtract(day, "day").format("YYYY.MM.DD");
  survey_jQuery("#survey_search_from").val(from);
  survey_jQuery("#survey_search_to").datepicker();
  let to = dayjs().format("YYYY.MM.DD");
  survey_jQuery("#survey_search_to").val(to);

  const survey_search_from = document.getElementById("survey_search_from");
  survey_search_from.dispatchEvent(new Event("change"));

  const survey_search_to = document.getElementById("survey_search_to");
  survey_search_to.dispatchEvent(new Event("change"));

  survey_jQuery("#survey_search_6month").removeClass("on");
  survey_jQuery("#survey_search_3month").removeClass("on");
  survey_jQuery("#survey_search_1month").removeClass("on");
  survey_jQuery(element).addClass("on");
}

async function surveySearch() {
  let search_from = survey_jQuery("#survey_search_from").val();
  let search_to = survey_jQuery("#survey_search_to").val();
  let survey_search_status = survey_jQuery("#survey_search_status").val();

  let history_start_date = dayjs(search_from).format("YYYY-MM-DD");
  let history_end_date = dayjs(search_to).format("YYYY-MM-DD");
  survey_jQuery("#history_start_date").val(dayjs(search_from).format("YYYY-MM-DD"));
  survey_jQuery("#history_end_date").val(dayjs(search_to).format("YYYY-MM-DD"));
  location.href = `${survey_skin_path}/myshop/order/list.html?history_start_date=${history_start_date}&history_end_date=${history_end_date}&status=${survey_search_status}`;
}
function surveyDatePickerClick(type) {
  survey_jQuery("#" + type).trigger("click");
}


function addView() {
  add_view_count += 1;
  let count = add_view_count * 8;
  let survey_order_area_list = survey_jQuery(".survey_order_area");
  let height = 0;

  let order_id_count = 0;
  let befor_order_id = null;

  survey_order_area_list.each(function (index, element) {

    let order_id = survey_jQuery(element).attr("order_id");
    if (!befor_order_id || befor_order_id != order_id) {
      befor_order_id = order_id;
      order_id_count++;
    }

    if (order_id_count <= count) {
      height += survey_jQuery(element).height();
      last_height = survey_jQuery(element).height();
    } else {
      return;
    }
  });

  // 60은 메뉴 높이를 더해준다
  survey_jQuery(".survey_diagnosis_list").height(height + 60 + last_height);
  if (order_id_count <= count) {
    survey_jQuery("#add_btn_style").text(`
    .survey_diagnosis_list:after {
      top: 100%
    }
    `);
    survey_jQuery(".btn-more").hide();
  } else {
    let style_height = height + 60;
    survey_jQuery("#add_btn_style").text(`
    .survey_diagnosis_list:after {
      top: ${style_height}px
    }
    `);
  }
}

function surveyShippingSearch(order_id) {
  let survey_module_shipping = survey_jQuery(".survey_module_shipping");
  for (const shipping of survey_module_shipping) {
    let shipping_order_id = survey_jQuery(shipping).attr("order_id");
    if (shipping_order_id == order_id) {
      survey_jQuery(shipping).click();
    }
  }
}

function surveyCancel(order_id) {
  OrderHistory.orderCancel(order_id);
}

// 주문 조회
async function getSurveyDiagnosisOrder(from , to) {
  let set_param = {
    member_id: survey_member_id,
    from: dayjs(from).format("YYYY-MM-DD"),
    to: dayjs(to).format("YYYY-MM-DD")
  };
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnosis/order`,
      type: "GET",
      data: set_param,
      dataType: "json",
      success: function (result) {
        resolve(result);
      },
      error: function (request, status, error) {
        console.log(request, status, error);
        resolve([]);
      },
    });
  });
}