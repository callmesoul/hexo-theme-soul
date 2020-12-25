var spaceBetween = document.documentElement.clientWidth > 1000 ? 30 : 0;
function getSwiperPrams() {
	var windowsWidth = document.documentElement.clientWidth;
	var slidesPerView;
	var direction;
	if (windowsWidth > 1500) {
		direction = 'horizontal';
		slidesPerView = 4;
	} else if (windowsWidth > 1100) {
		direction = 'horizontal';
		slidesPerView = 3;
	} else if (windowsWidth > 1000) {
		direction = 'horizontal';
		slidesPerView = 2;
	} else {
		slidesPerView = 1;
		direction = 'vertical';
	}
	return {
		direction: direction,
		slidesPerView: slidesPerView,
	};
}
var params = getSwiperPrams();
var mySwiper = new Swiper('.swiper-container', {
	direction: params.direction, // 垂直切换选项
	mousewheel: true,
	slidesPerView: params.slidesPerView,
	spaceBetween,
	scrollbar: {
		el: '.swiper-scrollbar',
	},
	on: {
		resize: function () {},
	},
	// 如果需要滚动条
	scrollbar: {
		el: '.swiper-scrollbar',
	},
});

// 获取更多文章
function getMorePost(page) {
	const disabled = $('.post-item.more').attr('disabled');
	if (disabled) {
		return;
	}
	$('.post-item.more span').css('display', 'none');
	$('.post-item.more #more-loading').css('display', 'flex');
	setTimeout(() => {
		fetch('/page/' + page + '/', { 'Content-Type': 'text/html' })
			.then((res) => res.text())
			.then(function (html) {
				const parser = new DOMParser();
				const dom = parser.parseFromString(html, 'text/html');
				const boydPostList = document.querySelectorAll('.post-item');
				mySwiper.removeSlide(boydPostList.length - 1);
				const postList = dom.querySelectorAll('.post-item');
				for (var i = 0; i < postList.length; i++) {
					mySwiper.appendSlide(postList[i]);
				}
			});
	}, 1000);
}
