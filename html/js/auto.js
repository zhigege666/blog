/*
 *                        ::
 *                       :;J7, :,                        ::;7:
 *                       ,ivYi, ,                       ;LLLFS:
 *                       :iv7Yi                       :7ri;j5PL
 *                      ,:ivYLvr                    ,ivrrirrY2X,
 *                      :;r@Wwz.7r:                :ivu@kexianli.
 *                     :iL7::,:::iiirii:ii;::::,,irvF7rvvLujL7ur
 *                    ri::,:,::i:iiiiiii:i:irrv177JX7rYXqZEkvv17
 *                 ;i:, , ::::iirrririi:i:::iiir2XXvii;L8OGJr71i
 *               :,, ,,:   ,::ir@mingyi.irii:i:::j1jri7ZBOS7ivv,
 *                  ,::,    ::rv77iiiriii:iii:i::,rvLq@huhao.Li
 *              ,,      ,, ,:ir7ir::,:::i;ir:::i:i::rSGGYri712:
 *            :::  ,v7r:: ::rrv77:, ,, ,:i7rrii:::::, ir7ri7Lri
 *           ,     2OBBOi,iiir;r::        ,irriiii::,, ,iv7Luur:
 *         ,,     i78MBBi,:,:::,:,  :7FSL: ,iriii:::i::,,:rLqXv::
 *         :      iuMMP: :,:::,:ii;2GY7OBB0viiii:i:iii:i:::iJqL;::
 *        ,     ::::i   ,,,,, ::LuBBu BBBBBErii:i:i:i:i:i:i:r77ii
 *       ,       :       , ,,:::rruBZ1MBBqi, :,,,:::,::::::iiriri:
 *      ,               ,,,,::::i:  @arqiao.       ,:,, ,:::ii;i7:
 *     :,       rjujLYLi   ,,:::::,:::::::::,,   ,:i,:,,,,,::i:iii
 *     ::      BBBBBBBBB0,    ,,::: , ,:::::: ,      ,,,, ,,:::::::
 *     i,  ,  ,8BMMBBBBBBi     ,,:,,     ,,, , ,   , , , :,::ii::i::
 *     :      iZMOMOMBBM2::::::::::,,,,     ,,,,,,:,,,::::i:irr:i:::,
 *     i   ,,:;u0MBMOG1L:::i::::::  ,,,::,   ,,, ::::::i:i:iirii:i:i:
 *     :    ,iuUuuXUkFu7i:iii:i:::, :,:,: ::::::::i:i:::::iirr7iiri::
 *     :     :rk@Yizero.i:::::, ,:ii:::::::i:::::i::,::::iirrriiiri::,
 *      :      5BMBBBBBBSr:,::rv2kuii:::iii::,:i:,, , ,,:,:i@petermu.,
 *           , :r50EZ8MBBBBGOBBBZP7::::i::,:::::,: :,:,::i;rrririiii::
 *               :jujYY7LS0ujJL7r::,::i::,::::::::::::::iirirrrrrrr:ii:
 *            ,:  :@kevensun.:,:,,,::::i:i:::::,,::::::iir;ii;7v77;ii;i,
 *            ,,,     ,,:,::::::i:iiiii:i::::,, ::::iiiir@xingjief.r;7:i,
 *         , , ,,,:,,::::::::iiiiiiiiii:,:,:::::::::iiir;ri7vL77rrirri::
 *          :,, , ::::::::i:::i:::i:i::,,,,,:,::i:i:::iir;@Secbone.ii:::
 * @Author: 志哥哥
 * @Description: 导入导出Cookie
 * @LastEditors: 志哥哥
 * @FilePath: \blog\source\html\js\auto.js

 获取缓存
 m=document.createElement('script');m.setAttribute('type','text/javascript');m.setAttribute('src','//api.1996wz.cn/html/js/auto.js?add=a');document.body.appendChild(m);

 获取缓存不弹alert
 m=document.createElement('script');m.setAttribute('type','text/javascript');m.setAttribute('src','//api.1996wz.cn/html/js/auto.js?add=a&&isAlert=a');document.body.appendChild(m);

 */
// 获取当前下的url
function getRelativeUrl() {
	var arraytemp = getSplitUrl();
	var urlNum = arraytemp[0].lastIndexOf("/");
	if (urlNum > 0 && arraytemp[0].length > urlNum) {
		return arraytemp[0].substring(0, urlNum + 1).replace('http:', '');
	} else {
		return arraytemp[0].replace('http:', '');
	}
}
function getQuery(query) {
	var arraytemp = getSplitUrl();
	try {
		if (arraytemp.length > 1) {
			const array = arraytemp[1].split('&')
			for (let index = 0; index < array.length; index++) {
				const element = array[index].split('=');
				if (element[0] === query)
					return element[1]
			}
		}
		return ''
	} catch {
		return ''
	}
}
// 获取当前外部引入script里的src路径
function getSplitUrl() {
	var js = document.getElementsByTagName("script");
	var arraytemp = js[js.length - 1].src.split('?');
	return arraytemp;
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
function addData(mun, data) {
	return new Promise((resolve, reject) => {
		httpRequest({
			method: "post",
			url: "//service-dedfszk5-1251555445.sh.apigw.tencentcs.com/release/p?key=" + mun,//请求的url地址
			data: JSON.stringify(data)
		}, function (res) {
			resolve(res)
		}, function (err) {
			reject(err);
		});
	})
}

function getData(key) {
	return new Promise((resolve, reject) => {
		httpRequest({
			method: "post",
			url: "//service-dedfszk5-1251555445.sh.apigw.tencentcs.com/release/p?isget=12&key=" + key,//请求的url地址
			data: {}
		}, function (res) {
			resolve(res)
		}, function (err) {
			reject(err);
		});
	})
}

function add(_isAlert = true) {
	var mun = new Date().getTime();
	var sjson = {
		sessionStorage: window.sessionStorage,
		localStorage: window.localStorage,
		cookie: document.cookie,
	};
	addData(mun, sjson).then(async (res) => {
		const code = "m=document.createElement('script');m.setAttribute('type','text/javascript');m.setAttribute('src','" + getRelativeUrl() + "auto.js?get=" + mun + "');document.body.appendChild(m);"
		const isconsole = await copytext(code,_isAlert)
		if (!isconsole) {
			console.log("获取成功，请复制下面代码，到本地调试中粘贴执行");
			console.log(code)
		}
	}).catch((error) => {
		console.log("请求失败");
	})
}
function copytext(text, _isAlert = true) {
	return new Promise((resolve) => {
		var textArea = document.createElement("textarea")
		textArea.style.position = 'fixed'
		textArea.style.top = '0'
		textArea.style.left = '0'
		textArea.style.width = '2em'
		textArea.style.height = '2em'
		textArea.style.padding = '0'
		textArea.style.border = 'none'
		textArea.style.outline = 'none'
		textArea.style.boxShadow = 'none'
		textArea.style.background = 'transparent'
		textArea.value = text
		document.body.appendChild(textArea)
		textArea.select()
		try {
			var successful = document.execCommand('copy')
			if (successful) {
				document.body.removeChild(textArea)
				resolve(true)
				console.log("复制到粘贴板成功，请到本地调试中粘贴执行");
				if(_isAlert){
					alert("复制到粘贴板成功，请到本地调试中粘贴执行")
				}
				return
			}
		} catch (err) {
		}
		document.body.removeChild(textArea)
		console.log("复制到粘贴板失败，请到手动复制粘贴执行");
		resolve(false)
	})

}

function get(key) {
	getData(key).then((sjson) => {
		if (typeof sjson === "string")
			sjson = JSON.parse(sjson);
		if (sjson.isError) {
			console.log(sjson.data)
			return
		}
		if (sjson["sessionStorage"]) {
			Object.keys(sjson.sessionStorage).forEach((key) => {
				let value = sjson.sessionStorage[key]
				sessionStorage.setItem(key, value);
			})
		}
		if (sjson.localStorage) {
			Object.keys(sjson.localStorage).forEach((key) => {
				let value = sjson.localStorage[key]
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
	}).catch((error) => {
		console.log("请求失败");
	})
}

function auto() {
	const _isAlert = getQuery('isAlert') ? false : true
	const key = getQuery('get')
	if (key) {
		get(key)
	}
	const isadd = getQuery('add')
	if (isadd) {
		add(_isAlert)
	}
}

auto()