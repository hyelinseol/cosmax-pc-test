function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var link = document.location.href; 
var tabNum = link .split('#').reverse()[0];

if(tabNum  == 'END'){
    $('.boardCate ul li').eq(1).addClass('on');
} else {
    $('.boardCate ul li').eq(0).addClass('on');
}

//	$(document).ready(function() {
//		// board_no의 값을 확인하여 조건을 판단합니다.
//		var board_no = getParameterByName('board_no');
//		if (board_no == '8') {
//			// board_no가 8이면 특정 div를 보여줍니다.
//			$(".boardCate.event").show();
//			$("#bbsKind").removeClass("review");
//			
//		} else {
//			// 그렇지 않을 경우 특정 div를 숨깁니다.
//			$(".boardCate.event").hide(); // 이벤트 Tab 삭제
//			$("#bbsKind").addClass("review"); // 리뷰 갤러리 UI 변경
//		}
//
//		//alert(CAFE24.BOARD.);
//		var _board_no = getQueryString("board_no");
//		//alert(_board_no);
//	});