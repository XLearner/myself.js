/*
 *	2017-09-01
 *	author: XLearner
 *
 *	此js文件封装了自己可能需要用到的插件。在调用此包之前需要导入 jquery.js 文件
 */
(function(window, document){

	window.myself = {
		/*
		 *	瀑布流布局
		 *
		 *	需要传入参数：	main(父盒子类名, 在此，子盒子的类名必须为 box)
		 *					-----
		 *					col(布局所需要的列数,可传可不传) 不写时按照屏幕宽度自适应
		 */
		waterfull: function (main, col){
			// search child box
			var main = $('.main');
			var box = $(".main .box");

			// achieve child box width
			var w = $(box).eq(0).outerWidth();

			// get needs col
			var wrapWid = $(main).parent().width();
			var cols = col || parseInt(wrapWid / w);
			$(main).width(w * cols);

			// create array to preserve height of every columns
			var harr = [];

			// iterate every box to set their top
			$(box).each(function(key, value){
				if(key < cols){
					// init first row harr
					harr.push($(value).outerHeight() + 20);

				}else{
					// from second to end

					// get min-top-height
					var minH = Math.min.apply(null, harr);

					// get index of min-top-height
					var indexMin = $.inArray(minH, harr);

					// set distance of left and top --- base on father element
					var setLeft = $(box).eq(indexMin).position().left;
					var setTop = minH;

					$(value).css({
						'position': 'absolute',
						'top': setTop + 'px',
						'left': setLeft  + 'px'
					});
				}

				// reset min col's height in harr  AND  add extro 20px to divide up-down element
				harr[indexMin] += ($(value).outerHeight() + 20);
			});

			// due to use "position" to finish 'waterfull', we need to Manual Setting "main" 's height
			var maxH = Math.max.apply(null, harr) + 100;
			$('.main').height(maxH);
		},

		// 卯点
		// nav --- 导航栏的类名
		// fishhook --- 给需要定位的点加上的相同的类名
		fishHook: function(nav, fishhook){
					var nav = $('.' + nav);
					var fishhook = $('.' + fishhook);

					// add click event to nav
					$(nav).children().click(function(){
						// get clicked currently element Index
						var toIndex = $.inArray(this, $(nav).children());

						// get location of being positioned element
						var top = $(fishhook).eq(toIndex).offset().top;

						// add animation
						$('html,body').animate({
							scrollTop: top - 20
							},200);
					});
		},
	};
})(window, document);