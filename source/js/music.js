var playIndex = localStorage.getItem('playIndex')
	? parseInt(localStorage.getItem('playIndex'))
  : 0; // 获取历史播放下标
const musics = $('.music-item'); // 获取播放列表
musics.eq(playIndex).addClass('active');
var audio = document.getElementById('audio'); // 初始化audio对象
$('.song-msg').html(musics[playIndex].dataset.name); // 设置当前名字
audio.src = musics[playIndex].dataset.url;
var playbtn = document.getElementsByClassName('play-icon')[0];
var playing = false;
audio.loop = false;
// 监听播放完，自动下一首
audio.addEventListener(
	'ended',
	function () {
		if (playIndex < musics.length - 1) {
			changePlayIndex(playIndex + 1);
		} else {
			changePlayIndex(playIndex + 0);
		}
	},
	false
);

//  播放时
audio.addEventListener(
	'play',
	function () {
		playbtn.classList.remove('icon-kaishi1');
		playbtn.classList.add('icon-kaishi');
		playing = true;
	},
	false
);

//  当播放位置改变时（比如当用户快进到媒介中一个不同的位置时）运行的脚本。
audio.addEventListener(
	'timeupdate',
	function (e) {
    const percent = e.target.currentTime / e.target.duration * 100
    $('.music .current-line').css('width', percent + '%')
	},
	false
);
// 当元数据（比如分辨率和时长）被加载时运行的脚本。
audio.addEventListener(
	'loadedmetadata',
	function (e) {
		const timeLine = transeTimeToString(e.target.duration);
		$('.music .all-time').text(timeLine);
	},
	false
);

//  暂停时
audio.addEventListener(
	'pause',
	function () {
		playbtn.classList.remove('icon-kaishi');
		playbtn.classList.add('icon-kaishi1');
		playing = false;
	},
	false
);

// 播放列表的 显示/隐藏切换
function toogleShowMusicList() {
	var musiclist = document.getElementsByClassName('music-list')[0];
	if (musiclist.className.indexOf('active') === -1) {
		musiclist.classList.add('active');
	} else {
		musiclist.classList.remove('active');
	}
}

// 控制按钮
function playControl() {
	if (playing) {
		audio.pause();
	} else {
		audio.play();
	}
}

// 播放第几首
function changePlayIndex(index) {
	if (playIndex !== index) {
		localStorage.setItem('playIndex', index);
		playIndex = index;
		musics.removeClass('active');
		musics.eq(playIndex).addClass('active');
		$('.song-msg').html(musics[playIndex].dataset.name);
		audio.src = musics[playIndex].dataset.url;
		audio.play();
	} else {
		playControl();
	}
}

// 上一首
function preSong() {
	var index;
	if (playIndex === 0) {
		index = musics.length - 1;
	} else {
		index = playIndex - 1;
	}
	changePlayIndex(index);
}
// 下一首
function nextSong() {
	var index;
	if (playIndex === musics.length - 1) {
		index = 0;
	} else {
		index = playIndex + 1;
	}
	changePlayIndex(index);
}
function toggleMenu() {
	var mainLeft = $('.main-left');
	if (mainLeft.hasClass('active')) {
		mainLeft.removeClass('active');
		$('.menu').removeClass('icon-close');
		$('.menu').addClass('icon-menu');
	} else {
		mainLeft.addClass('active');
		$('.menu').removeClass('icon-menu');
		$('.menu').addClass('icon-close');
	}
}

function transeTimeToString(second) {
	let min = Math.floor(second / 60);
	let _second = Math.ceil(second - min * 60);
	if (min.toString().length === 1) {
		min = '0' + min;
	}
	if (_second.toString().length === 1) {
		_second = '0' + _second;
	}
	return `${min}:${_second}`;
}
