
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
	$("#top, .header-wrapper, #process, #honors, #about, #portfolio, #labs").css("min-height", $(window).height());

	$(window).on("resize", function (e) {
		$("#top, .header-wrapper, #process, #honors, #about, #portfolio, #labs").css("min-height", $(window).height());
	});

	if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
	     $("#top, .header-wrapper").css("height", $(window).height());
	}
});


var imageNumber = 0;
var $container;
$(".grid").imagesLoaded(function() {
	$container = $(".grid").masonry({
		gutter: 10,
		itemSelector: '.grid-item'
	});
	$(".grid").masonry('layout');
});



$("#loadmore").click(function(){
	var $elements = getItemElement();
	$elements.hide();
	$container.append($elements);
	$elements.imagesLoaded(function() {
		$container.masonry( 'appended', $elements );
		$elements.show();
      // $container.masonry( 'appended', $elements, true );
			$(".grid").masonry('layout');
  });

});



function getItemElement() {
	var items = '';
	var item;
	var imageArray = [
		['11.jpg','385','image'],
		['12.gif','385','image'],
		['13.jpg','385','image'],
    ['14.gif','385','image'],
		['15.jpg','385','image'],
		['17.png','385','image'],
		['18.png','385','image'],
		['19.png','385','image'],
		['20.png','385','image'],
		['21.png','385','image'],
		['22.png','385','image'],
		['24.jpg','385','image'],
		['25.png','385','image'],
		['26.jpg','385','image'],
		['27.jpg','385','image'],
		['28.jpg','385','image'],
	];
	var loadthree = imageNumber+4;
	for(i=imageNumber; i<loadthree; i++){
		console.log(imageArray[imageNumber][2]);
		if(imageArray[imageNumber][2]=='video'){
				item = '<div class="grid-item"><a href="portfolio/'+imageArray[imageNumber][0]+'" data-fancybox="gallery"><video autoplay loop><source src="portfolio/' + imageArray[imageNumber][0] + '" type="video/m4v"/></video></a></div>';
		}
		else{
			item = '<div class="grid-item"><a href="portfolio/'+imageArray[imageNumber][0]+'" data-fancybox="gallery"><img src="portfolio/' + imageArray[imageNumber][0] + '"/></a></div>';
		}
		items += item;
		imageNumber++;
		if(imageNumber==16){
			$("#loadmore").hide();
		}
	}
	return $(items);
}
