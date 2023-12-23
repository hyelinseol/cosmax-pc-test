$(document).ready(function(){
	var swiper = new Swiper('.txtNavi .swiper-container', {
		spaceBetween: 5,
		centeredSlides: true,
		speed: 20000,
		autoplay: {
			delay: 0,
			},
		loop: true,
		slidesPerView:'auto',
		allowTouchMove: false,
		disableOnInteraction: true,
	});
});