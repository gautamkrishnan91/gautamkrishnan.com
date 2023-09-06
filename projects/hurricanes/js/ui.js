
$(document).ready(function () {
	i = 0;
	$(window).on("scroll", function (e) {

		var scroll = $(window).scrollTop();
		if (scroll >= 70) {
			$(".top-bar").addClass("fix-search");
		} else {
			$(".top-bar").removeClass("fix-search");
		}
	});


	//set heights
	$("#top, .header-wrapper, #honors, #about, #portfolio, #labs").css("min-height", $(window).height());

	$(window).on("resize", function (e) {
		$("#top, .header-wrapper, #honors, #about, #portfolio, #labs").css("min-height", $(window).height());
	});
});
