$(document).ready(function() {
    // 토글
    $('div.eToggle .title').on('click', function(){
        var toggle = $(this).parent('.eToggle');
        if(toggle.hasClass('disable') == false){
            $(this).parent('.eToggle').toggleClass('selected')
        }
    });
});