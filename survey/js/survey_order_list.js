const surveyCommon = new SurveyCommon();
const surveyOrderList = new SurveyOrderList();
const surveyMyShop = new SurveyMyShop();

let add_view_count = 0;
let last_height = 0;
// 단품 상품 리스트
let single_item_list = [];

window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      setTimeout(async function () {

        await surveyCommon.getCafe24CustomerInfo(CAFE24API);


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

        await surveyMyShop.surveyGetProductVariants();


        let history_start_date = shoplusGetParameters("history_start_date");
        let history_end_date = shoplusGetParameters("history_end_date");
        let status = shoplusGetParameters("status");
        let mode = shoplusGetParameters("mode");
        let product_type = shoplusGetParameters("product_type");
        let _order_id = shoplusGetParameters("order_id");
        let order_id_param = "&order_id=" + _order_id;
        if (!_order_id || typeof _order_id == "undefined") {
          order_id_param = "";
          survey_jQuery("#OrderHistoryForm .set").show();
        } else {
          survey_jQuery("#sidebar").prepend('<div class="xans-element- xans-layout xans-layout-statelogon menu_tit "><h3><span class="xans-member-var-name">비회원</span>님</h3><p class="memGrade"></p></div>');
          survey_jQuery("#sidebar").css("display", "block");
          survey_jQuery("#xans_myshop_bankbook_coupon_cnt").text("0");
          survey_jQuery("#xans_myshop_bankbook_avail_mileage").text("0");
        }

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
        survey_jQuery(".survey_feedbackloop").removeClass("active on");

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
        let product_type_param = "";
        if (product_type) {
          product_type_param = `&product_type=${product_type}`;
        }
        let set_date_param = `history_start_date=${_history_start_date}&history_end_date=${_history_end_date}${product_type_param}`;
        if (mode && mode == "cs") {
          survey_jQuery(".survey_cs").addClass("active on");
        } else if (status) {
          survey_jQuery(`.survey_${status}`).addClass("active on");
        } else {
          survey_jQuery(".survey_all").addClass("active on");
        }

        survey_jQuery(".survey_all a").attr(
          "href",
          `${survey_skin_path}/myshop/order/list.html?status=&${set_date_param}${order_id_param}`
        );
        survey_jQuery(".survey_analysis a").attr(
          "href",
          `${survey_skin_path}/myshop/order/list.html?status=analysis&${set_date_param}${order_id_param}`
        );
        survey_jQuery(".survey_ready a").attr(
          "href",
          `${survey_skin_path}/myshop/order/list.html?status=ready&${set_date_param}${order_id_param}`
        );
        survey_jQuery(".survey_prepare a").attr(
          "href",
          `${survey_skin_path}/myshop/order/list.html?status=prepare&${set_date_param}${order_id_param}`
        );

        survey_jQuery(".survey_shipping a").attr(
          "href",
          `${survey_skin_path}/myshop/order/list.html?status=shipping&${set_date_param}${order_id_param}`
        );

        survey_jQuery(".survey_complate a").attr(
          "href",
          `${survey_skin_path}/myshop/order/list.html?status=complate&${set_date_param}${order_id_param}`
        );

        survey_jQuery(".survey_feedbackloop a").attr(
          "href",
          `${survey_skin_path}/myshop/order/list.html?status=feedbackloop&${set_date_param}${order_id_param}`
        );

        survey_jQuery(".survey_cs a").attr(
          "href",
          `${survey_skin_path}/myshop/order/list.html?mode=cs&${set_date_param}${order_id_param}`
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

        survey_jQuery("#product_type").val(product_type);

        let survey_diagnosis_result = await surveyOrderList.getSurveyResult(_history_start_date, _history_end_date);

        let days = 180;
        if (history_start_date && history_end_date) {
          days = dayjs(history_end_date).diff(history_start_date, 'day');
        } else {
          history_start_date = dayjs().subtract(180, "day").format("YYYY-MM-DD");
          history_end_date = dayjs().format("YYYY-MM-DD");
        }


        let status_type = "N00,N10,N22,N20,N21,N30,N40,N50,C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,N01";
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
        // 피드백루프 - 배송확정 N50 
        if (status == "feedbackloop") {
          status_type = "N50";
        }
        // 취소/교환/반품 조회 C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,E00,E10,N01,E12,E13,E20,E30,E32,E34,E36
        if (mode && mode == "cs") {
          status_type = "C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,N01";
        }
        let product_type_list = [];
        if (product_type) {
          for (const survey_product of surveyCommon.survey_product_list[surveyCommon.survey_mall_id]) {
            if (product_type && survey_product.type == product_type) {
              product_type_list.push(Number(survey_product.no));
            }
          }
        }

        let survey_status_array = status_type.split(",");
        let survey_order_list = [];
        if (_order_id) {
          let survey_order_one_result = await surveyOrderList.getSurveyOrderOne(_order_id, history_start_date, history_end_date);

          for (const survey_order_one of survey_order_one_result) {
            let find = survey_order_one.items.find((e) => status_type.indexOf(e.order_status) > -1);
            if (find) {
              survey_order_list.push(survey_order_one);
            }
          }

        } else {
          let loop_count = Math.ceil(days / 60);
          for (let i = 0; i < loop_count; i++) {
            let start_date = dayjs(history_start_date).add(((i * 60) + i), "day").format("YYYY-MM-DD");
            let end_date = dayjs(start_date).add(60, "day").format("YYYY-MM-DD");
            if (dayjs(end_date) > dayjs(history_end_date)) {
              end_date = dayjs(history_end_date).format("YYYY-MM-DD");
            }
            let survey_orders = await surveyOrderList.getSurveyOrder(status_type, start_date, end_date);
            for (let order of survey_orders) {

              let order_item = [];
              for (const item of order.items) {
                if (product_type_list.length > 0) {
                  if (product_type_list.indexOf(Number(item.product_no)) > -1) {
                    order_item.push(item);
                  }
                } else {
                  order_item.push(item);
                }
              }
              if (order_item.length > 0) {
                order.items = order_item;
                survey_order_list.push(order);
              }
            }
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
        let gift_member_name = "";
        for (const order of survey_order_list) {
          let is_survey_gift = false;
          if (order.additional_order_info_list && order.additional_order_info_list.length > 0) {
            if (order.additional_order_info_list[0].value && order.additional_order_info_list[0].value.indexOf("주문자이름") > -1) {
              is_survey_gift = true;
              let value_array = order.additional_order_info_list[0].value && order.additional_order_info_list[0].value.split("|");
              for(let value of value_array) {
                if (value.indexOf("받는이이름") > -1) {
                  let gift_name_array = value.split(":");
                  gift_member_name = gift_name_array[1];
                }
              }
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

            let survey_shipping_search_style = "display: none";
            let survey_review_write_html = ``;

            let survey_btn_rebuy_style = "display: none";
            let survey_btn_rebuy_onclick = "";

            let find_qna_at = "";
            let view_result_url = "";
            let find = null;
            for (let survey_diagnosis of survey_diagnosis_result) {
              for (let survey_diagnos of survey_diagnosis) {
                if (survey_diagnos.hash == product_hash_code) {
                  find = survey_diagnos;
                }
              }
            }
            let nick_name_display = "";
            if (is_survey_gift) {
              nick_name_display = "displaynone";
            }
            let sample_hide = "";
            if (find) {
              let find_product_no = find.product_no;
              let find_product = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find((e) => e.no == find.product_no);
              let view_path = "";
              let resilt_file = "result.html";
              let more_resilt_file = "";
              if (find_product.type == "skin_care") {
                view_path = "survey_essence";
                more_resilt_file = "result.html";
                let find_set_essence = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find((e) => e.type == "skin_care" && e.product_type == "set_essence");
                if (find_set_essence) {
                  find_product_no = find_set_essence.no;
                }
              }
              if (find_product.type == "hair_care") {
                view_path = "survey";
                more_resilt_file = "more_result.html";
                if (find_product.product_type.indexOf("sample") > -1) {
                  resilt_file = "sample_result.html";
                  more_resilt_file = "sample_more_result.html";
                }
              }

              find_qna_at = dayjs(find.qna_at).format("YYYY.MM.DD");
              if (find.before_hash == "") {
                let discount_type = "";
                if (find.discount_type && find.discount_type.indexOf("employees") > -1) {
                  discount_type = "&discount_type=" + find.discount_type;
                  if (find.discount_type == "employees1") {
                    let _find = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find((e) => e.no == Number(find_product_no));
                    discount_type += "&buy_type=" + _find.product_type; 
                  }
                }
                view_result_url = `/${view_path}/${resilt_file}?product_no=${find_product_no}&hash=${product_hash_code}&qna_at=${find_qna_at}${discount_type}`
              } else {
                view_result_url = `/${view_path}/${more_resilt_file}?product_no=${find_product_no}&hash=${find.before_hash}&qna_at=${find_qna_at}&re_qna_hash=${product_hash_code}`
              }

              if (find_product.detail_type == "sample") {
                view_result_url = `/product/detail.html?product_no=${product_no}`;
                if (find_product.type == "hair_care") {
                  view_result_url = `/product/detail_hair.html?product_no=${product_no}`;
                }
                if (find_product.type == "skin_care") {
                  view_result_url = `/product/detail_essence.html?product_no=${product_no}`;
                }
                sample_hide = "displaynone";
              }

            }
            if (product_status_text == "구매확정" || product_status_text == "피드백루프" || product_status_text == "배송완료") {

              let _product_no = product_no;

              if (find && find.product_no) {
                let survey_sample_product = survey_product_list[CAFE24API.MALL_ID].find((e) => Number(e.product_no) == Number(find.product_no));
                // 샘플 문진이고 product_no로 체크 > find.product_no
                if (survey_sample_product?.product_type.indexOf("sample_") > -1) {
                  // 주문 상픔이 일반 헤어케어 상품이면
                  let survey_product = survey_product_list[CAFE24API.MALL_ID].find((e) => Number(e.product_no) == Number(product_no));
                  // 헤어케어 상품 타입에 맞게 product_no준다 (샴푸 > 샴푸 샘플)
                  if (survey_product.product_type == "shampoo" || survey_product.product_type == "treatment" || survey_product.product_type == "set_product") {
                    let result = survey_product_list[CAFE24API.MALL_ID].find((e) => e.product_type == "sample_" + survey_product.product_type);
                    if (result) {
                      _product_no = result.product_no;
                    }
                  }
                }
              }


              survey_shipping_search_style = "";
              if (find_qna_at) {
                survey_btn_rebuy_style = "";
                survey_review_write_html = `
                  <a
                    href="#"
                    class="btnLineG snap_review_write_btn"
                    data-params="product_no=${_product_no}&order_id=${order_id}"
                    data-detail="product_no=${_product_no}&order_id=${order_id}&ord_item_code=${item.order_item_code}"
                    status="${status}"
                  >리뷰작성하기</a>
                `;
                survey_btn_rebuy_onclick = `surveyMyShop.surveyMoveReBuyPage(${_product_no}, '${product_hash_code}', '${find_qna_at}')`;
              }
            }
            if (product_status_text == "배송중") {
              survey_shipping_search_style = "";
            }
            if (!product_hash_code) {
              survey_btn_rebuy_style = "display: none";
            }

            let detail_page = "detail.html";
            if (find) {
              let find_product = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find((e) => e.no == Number(find.product_no));
              if (find_product && find_product.type == 'skin_care') {
                detail_page = "detail_essence.html";
              }
              if (find_product && find_product.type == 'hair_care') {
                detail_page = "detail_hair.html";
              }
            }

            if (find && find.discount_type && find.discount_type.indexOf("employees") > -1) {
              if (find.discount_type == "employees1") {
                survey_btn_rebuy_style = "display: none";
              }
            }

            let survey_cancel_style = "display: none";
            if (product_status_text == "입금전" || product_status_text == "상품준비중") {
              survey_cancel_style = "";
            }
            let order_id_array = order_id.split("-");
            let order_id_html = order_id_array[0] + "<br>-" + order_id_array[1];

            let product_image = surveyMyShop.survey_product_resource["set_product"].list_image;
            let find_survey_product = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find((e) => Number(e.no) == Number(product_no));
            
            let single_item_hide = "";
            let single_item_style = "";
            if (find_survey_product) {
              product_image = surveyMyShop.survey_product_resource[find_survey_product.product_type].list_image
            } else {
              let find_index = single_item_list.findIndex((e) => Number(e.product_no) == Number(product_no));
              if (find_index < 0) {
                await getSingleItemProducts(product_no);
              }
              let single_item_find = single_item_list.find((e) => Number(e.product_no) == Number(product_no));
              if (single_item_find) {
                product_image = single_item_find.list_image;
                single_item_hide = "displaynone";
                single_item_style = "display: flex; justify-content: start;";
                view_result_url = `/product/${detail_page}?product_no=${product_no}`;
              }

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
                  <a href="${view_result_url}"
                    ><img
                      src="${product_image}"
                      onerror="this.src='//img.echosting.cafe24.com/thumb/img_product_small.gif';"
                      alt=""
                  /></a>
                </div>
                <div class="info" style="${single_item_style}">
                  <strong class="name"><a href="/product/${detail_page}?product_no=${product_no}" class="ec-product-name">${product_name}</a></strong>
                  <h3 class="nickName ${nick_name_display}"><a href="${view_result_url}">#${product_nick_name}</a></h3>
                  <p class="viewResult ${nick_name_display} ${sample_hide} ${single_item_hide}"><a href="${view_result_url}">진단결과보기</a></p>
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
                <a href="javascript:void(0);" class="survey_cancel btnLineG ${sample_hide}" style="${survey_cancel_style}" order_id="${order_id}"
                onclick="surveyCancel('${order_id}', '${item.order_status}')"
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
                  class="btnRebuy ${single_item_hide} ${nick_name_display}"
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
        console.log(survey_order_list.length);
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

  let product_type = survey_jQuery("#product_type").val();
  let mode = shoplusGetParameters("mode");
  let mode_param = "";
  if (mode) {
    mode_param = `&mode=${mode}`;
  }
  location.href = `${survey_skin_path}/myshop/order/list.html?history_start_date=${history_start_date}&history_end_date=${history_end_date}&status=${survey_search_status}&product_type=${product_type}${mode_param}`;
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

function surveyCancel(order_id, order_status) {
  if (order_status == "N00") {
    OrderHistory.orderCancel(order_id);
  } else {
    location.href = `./cancel.html?order_id=${order_id}`;
  }
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
      url: `${surveyCommon.survey_domain}/app/${surveyCommon.survey_app_name}/mall/${surveyCommon.survey_mall_id}/api/survey/shops/${surveyCommon.survey_shop_no}/front/diagnosis/order`,
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

// 단품 상품 조회
async function getSingleItemProducts (product_no) {
  return new Promise(function (resolve, reject) {
    CAFE24API.get(
      `/api/v2/products/${product_no}?embed=discountprice`,
      function (err, res) {
        single_item_list.push(res.product);
        resolve(res);
      }
    );
  });

}