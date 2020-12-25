// 显示文章详情
function showpostDetail(page) {
	document.getElementById("post-detail-modal").src = page + '?ajax=true';
	document.getElementById('post-detail-modal').style.bottom = 0;
}

// 隐藏文章详情弹窗
function hienPostDetailModal() {
  document.getElementById('post-detail-modal').style.bottom = '-101%';
}


function noticeParentHideModal() {
  parent.window.hienPostDetailModal()
}