$(document).ready(function(){
    var _resultHref = getCookie("resultHref");
    var loginChk = $(".loginChk div").text();
    var loginChkTrim = loginChk.trim();
    console.log(loginChkTrim);
     console.log(_resultHref);
    if (loginChkTrim == "로그인" && jQuery.cookie('resultChk') == 'true') {	
        console.log("이벤트 체크 확인용");
        location.replace(_resultHref);
    }
});