window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      survey_mall_id = CAFE24API.MALL_ID;
      survey_shop_no = CAFE24API.SHOP_NO;
      surveyGetProductVariants();
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
            if (!survey_member_id) {
              let cafe24_member_info = JSON.parse(
                sessionStorage.getItem("member_" + survey_shop_no)
              );
              if (
                cafe24_member_info &&
                cafe24_member_info.data &&
                cafe24_member_info.data.member_id
              ) {
                survey_member_id = cafe24_member_info.data.member_id;
              }
            }
            resolve(res);
          });
        });

        let survey_diagnosis_result = await getSurveyDiagnosis();



        let start_date1 = dayjs().subtract(3, "month").format("YYYY-MM-DD");
        start_date1 = dayjs(start_date1).add(1, "day").format("YYYY-MM-DD");
        let end_date1 = dayjs().format("YYYY-MM-DD");
        let start_date2 = dayjs().subtract(6, "month").format("YYYY-MM-DD");
        start_date2 = dayjs(start_date2).add(1, "day").format("YYYY-MM-DD");
        let end_date2 = dayjs(start_date1).subtract(1, "day").format("YYYY-MM-DD");


        // 입금전 조회 (상품준비중: N00)
        let survey_n00_count1 = await getSurveyOrderCount("N00", start_date1, end_date1);
        let survey_n00_count2 = await getSurveyOrderCount("N00", start_date2, end_date2);
        let survey_n00 = Number(survey_n00_count1) + Number(survey_n00_count2);


        // 처방 분석 조회 (상품준비중: N10)
        let survey_n10_count1 = await getSurveyOrderCount("N10,N22", start_date1, end_date1);
        let survey_n10_count2 = await getSurveyOrderCount("N10,N22", start_date2, end_date2);
        let survey_n10 = Number(survey_n10_count1) + Number(survey_n10_count2);

        // 조제준비 count 조회 (배송준비중: N20)
        let survey_n20_count1 = await getSurveyOrderCount("N20", start_date1, end_date1);
        let survey_n20_count2 = await getSurveyOrderCount("N20", start_date2, end_date2);
        let survey_n20 = Number(survey_n20_count1) + Number(survey_n20_count2);

        // 맞춤조제중 count 조회 (배송대기: N21)
        let survey_n21_count1 = await getSurveyOrderCount("N21", start_date1, end_date1);
        let survey_n21_count2 = await getSurveyOrderCount("N21", start_date2, end_date2);
        let survey_n21 = Number(survey_n21_count1) + Number(survey_n21_count2);

        // 배송중 count 조회 N30 
        let survey_n30_count1 = await getSurveyOrderCount("N30", start_date1, end_date1);
        let survey_n30_count2 = await getSurveyOrderCount("N30", start_date2, end_date2);
        let survey_n30 = Number(survey_n30_count1) + Number(survey_n30_count2);

        // 배송완료 count 조회 N40 
        let survey_n40_count1 = await getSurveyOrderCount("N40", start_date1, end_date1);
        let survey_n40_count2 = await getSurveyOrderCount("N40", start_date2, end_date2);
        let survey_n40 = Number(survey_n40_count1) + Number(survey_n40_count2);

        // 취소/교환/반품 count 조회 N40 
        let survey_cs_count1 = await getSurveyOrderCount("C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,E00,E10,N01,E12,E13,E20,E30,E32,E34,E36,E40", start_date1, end_date1);
        let survey_cs_count2 = await getSurveyOrderCount("C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,E00,E10,N01,E12,E13,E20,E30,E32,E34,E36,E40", start_date2, end_date2);
        let survey_cs = Number(survey_cs_count1) + Number(survey_cs_count2);

        let survey_orders1 = await getSurveyOrder("N00,N10,N22,N20,N21,N30,N40,C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,E00,E10,N01,E12,E13,E20,E30,E32,E34,E36", start_date1, end_date1);
        let survey_orders2 = await getSurveyOrder("N00,N10,N22,N20,N21,N30,N40,C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,E00,E10,N01,E12,E13,E20,E30,E32,E34,E36", start_date2, end_date2);

        // let survey_order_count = survey_n00 + survey_n10 + survey_n20 + survey_n21 + survey_n30 + survey_n40 + survey_cs;
        // let survey_order_count = survey_orders1.length + survey_orders2.length;
        // sessionStorage.setItem("survey_order_count", survey_order_count);
        // survey_jQuery("#survey_order_count").text(survey_order_count);

        // 조회된 count 입력


        survey_jQuery(".survey_n10").html(`<span>${survey_n10}</span>`);
        survey_jQuery(".survey_n20").html(`<span>${survey_n20}</span>`);
        survey_jQuery(".survey_n21").html(`<span>${survey_n21}</span>`);
        survey_jQuery(".survey_n30").html(`<span>${survey_n30}</span>`);
        survey_jQuery(".survey_n40").html(`<span>${survey_n40}</span>`);
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
        let days = 180;
        start_date = dayjs().subtract(90, "day").format("YYYY-MM-DD");
        end_date = dayjs().format("YYYY-MM-DD");


        let status_type = "N00,N10,N22,N20,N21,N30,N40,C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,E00,E10,N01,E12,E13,E20,E30,E32,E34,E36";

        let survey_status_array = status_type.split(",");
        let survey_order_list = [];
        // let survey_orders = await getSurveyOrder(status_type, start_date, end_date);
        for (let order of survey_orders1) {
          if (survey_order_list.length >= 4) {
            break;
          }
          survey_order_list.push(order);
        }
        for (let order of survey_orders2) {
          if (survey_order_list.length >= 4) {
            break;
          }
          survey_order_list.push(order);
        }
        let html = "";
        for (const order of survey_order_list) {
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
            let survey_review_write_style = "display: none";
            let survey_review_write_html = ``;
            let survey_btn_rebuy_style = "display: none";
            let survey_btn_rebuy_onclick = "";

            let find_qna_at = "";
            let view_result_url = "";
            let find = survey_diagnosis_result.find((e) => e.hash == product_hash_code);
            if (find) {
              find_qna_at = dayjs(find.qna_at).format("YYYY.MM.DD");
              if (find.qna_type == "qna") {
                view_result_url = `/survey/result.html?product_no=${find.product_no}&hash=${product_hash_code}&qna_at=${find_qna_at}`
              } else {
                view_result_url = `/survey/more_result.html?product_no=${find.product_no}&hash=${find.before_hash}&qna_at=${find_qna_at}&re_qna_hash=${product_hash_code}`
              }
            }

            if (product_status_text == "배송완료") {
              survey_shipping_search_style = "";
              // let find = survey_diagnosis_result.find((e) => e.hash == product_hash_code);
              if (find_qna_at) {
                survey_btn_rebuy_style = "";
                survey_review_write_style = "";
                survey_review_write_html = `
                <a
                  href="/myshop/mypage/review.html"
                  class="btnLineG snap_review_write_btn set"
                  data-params="product_no=${product_no}&order_id=${order_id}"
                  data-detail="product_no=${product_no}&order_id=${order_id}&ord_item_code=${item.order_item_code}"
                >리뷰작성하기</a>
                `;
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
                  <p class="viewResult" style="display: none;"><a href="${view_result_url}">진단결과보기</a></p>
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
                <a href="#none" class="survey_cancel btnLineG" style="${survey_cancel_style}"
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
        survey_jQuery(".survey_diagnosis_list").html(html);

        if (html) {
          survey_jQuery(".survey_order_area").show();
        }





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
          survey_jQuery("#survey_event_banner").show();
          survey_jQuery(".survey_progress").show();
          is_show_survey_progress = true;
        }

        survey_jQuery(".diagnosisList").empty();
        let set_html = setSurveyProductListHtml(survey_diagnosis_result);
        survey_jQuery(".diagnosisList").append(set_html);

        // 최근 주문 / 배송 내역 4개 까지 노출
        let survey_diagnosis_order_list = survey_jQuery(".survey_diagnosis_list").children();
        let diagnosis_order_count = 0;
        for (const survey_diagnosis of survey_diagnosis_order_list) {
          if (diagnosis_order_count >= 4) {
            survey_jQuery(survey_diagnosis).remove();
          }
          diagnosis_order_count++;
        }

        let survey_diagnosis_order_count = survey_jQuery(
          ".survey_diagnosis_list .xans-record-"
        ).length;
        if (survey_diagnosis_order_count > 0) {
          survey_jQuery(".survey_order_area").show();
        }

        // 최근 진단내역 4개 까지 노출
        let survey_diagnosis_list = survey_jQuery(".diagnosisList").children();
        let diagnosi_count = 0;
        for (const survey_diagnosis of survey_diagnosis_list) {
          if (diagnosi_count >= 4) {
            survey_jQuery(survey_diagnosis).remove();
          }
          diagnosi_count++;
        }

        let survey_diagnosis_count = survey_jQuery(".diagnosisList .treatHisBox").length;
        if (survey_diagnosis_count > 0) {
          survey_jQuery(".survey_diagnosis_area").show();
        }

        if (
          survey_diagnosis_order_count == 0 &&
          survey_diagnosis_count == 0 &&
          !is_show_survey_progress
        ) {
          survey_jQuery(".survey_diagnosis_start_link").attr(
            "href",
            `${survey_skin_path}/survey?product_no=${survey_set_product_no}`
          );
          survey_jQuery("#survey_event_banner").show();
          survey_jQuery(".survey_diagnosis_start").show();
        }

        survey_jQuery(".survey_order_no").each(function (index, element) {
          let order_no = survey_jQuery(element).text();
          order_no = order_no.replace("]", "");
          order_no = order_no.replace("[", "");
          let order_no_array = order_no.split("-");
          let order_no_result = order_no_array[0] + "<br>-" + order_no_array[1];
          survey_jQuery(element).html(order_no_result);
        });


        survey_jQuery(".survey_diagnosis_list").show();
        survey_jQuery(".diagnosisList").show();

        survey_jQuery(".treatHisBox").show();

        // surveyGetProductVariants();

        survey_jQuery("#contents").show();



        // .survey_progress
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
  /*
  let survey_module_cancel = survey_jQuery(".survey_module_cancel");
  for (const cancel of survey_module_cancel) {
    let cancel_order_id = survey_jQuery(cancel).attr("order_id");
    if (cancel_order_id == order_id) {
      let href = survey_jQuery(cancel).attr("href");
      location.href = "/myshop/order/cancel.html?order_id=" + cancel_order_id;
      break;
    }
  }
  */
}