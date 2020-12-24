
(function(doc, win, designSize,htmlFontSize) {
  var docEl = doc.documentElement,
          isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
          dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
          dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
          resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  docEl.dataset.dpr = dpr;
  var recalc = function() {
    var width = docEl.clientWidth;
    if (width / dpr > designSize) {
      width = designSize * dpr;
    }
    docEl.dataset.width = width;
    docEl.dataset.percent = htmlFontSize * (width / designSize);
    docEl.style.fontSize = htmlFontSize * (width / designSize) + 'px';
  };
  recalc();
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
})(document, window, document.documentElement.clientWidth > 1000 ? 1920 : document.documentElement.clientWidth, 100);


window.onload = function () {
  setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
  }, 500);
}