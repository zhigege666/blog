function getRelativeUrl() {
	var arraytemp = getSplitUrl();
	var urlNum = arraytemp[0].lastIndexOf("/");
	if (urlNum > 0 && arraytemp[0].length > urlNum) {
		return arraytemp[0].substring(0, urlNum + 1).replace('http:', '');
	} else {
		return arraytemp[0].replace('http:', '');
	}
}
// 获取当前外部引入script里的src路径
function getSplitUrl() {
	var js = document.getElementsByTagName("script");
	var arraytemp = js[js.length - 1].src.split('?');
	return arraytemp;
}

ggggg=document.createElement('script');
ggggg.setAttribute('type','text/javascript');
ggggg.setAttribute('src', getRelativeUrl()+'auto.js?add='+new Date().getTime());
document.body.appendChild(ggggg);
console.log('加载中。。。请等待')