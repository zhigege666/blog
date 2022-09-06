/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 * 
 * 
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *            佛祖保佑       永不宕机     永无BUG
 * Author       : 志哥哥
 * Date         : 2022-06-26 11:02:08
 * LastEditors  : 志哥哥
 * LastEditTime : 2022-06-26 15:31:47
 * Description  : 
*/
(function(e,t){if(typeof define==="function"&&define.amd){define([],t)}else if(typeof module!=="undefined"&&module.exports){module.exports=t()}else{e.spugAuto=t()}})(this,function(){function e(e,t,n){k(e,t,n)}function d(n){var o=[];Object.keys(n).forEach(e=>{let t=n[e];if(typeof t==="undefined"){t=""}o.push([e,encodeURIComponent(t)].join("="))});return o.join("&")}function i(e,t,n){var o=null;if(window.XMLHttpRequest){o=new XMLHttpRequest}else if(window.ActiveXObject){o=new ActiveXObject("Microsoft.XMLHTTP")}if(o==null){alert("浏览器不支持xmlHttp");return}var r=(e.method||"Get").toUpperCase();var i=e.dataType||"json";var a=e.url||"";var s=true;if(r=="GET"){var c=e.data||{};var u=d(c)}o.onreadystatechange=function(){if(o.readyState==4){if(o.status==200){t(o.responseText)}if(o.status==204){t(o.responseText)}else{n}}};if(r=="GET"){o.open("GET",a+"?"+u,s);if(e.Token)o.setRequestHeader("X-Token",e.Token);o.setRequestHeader("Accept","application/json, text/plain, */*");o.send(null)}else if(r=="POST"){o.open("POST",a,s);o.setRequestHeader("Content-Type","application/json");if(e.Token)o.setRequestHeader("X-Token",e.Token);o.send(JSON.stringify(e.data))}}function a(){return localStorage.getItem("token")}function n(e,o,r={}){return new Promise((t,n)=>{i({method:e,url:o,data:r,Token:a()},e=>{t(JSON.parse(e))},e=>{console.error("请求失败了",e);n(JSON.parse(e))})})}function s(n=300){return new Promise((e,t)=>{setTimeout(()=>{e()},1e3*n)})}function c(e){return p(new Date((e?new Date(e):new Date).setHours((new Date).getHours()+8)).toISOString())}function u(e,t={}){return n("get",e,t)}function f(e,t={}){return n("post",e,t)}function p(e){return e.replace("T"," ").replace("Z","").split(".")[0]}function l(e){return e.replace("/","_")}const m="/api/product/git/branches/commits/";const y="/api/product/";const o="/api/artifacts/";const $="/api/build/trigger_job/";const r="/api/build/job/";async function _(e){const t=await u(o,{repository_name:e.repository_name});return t&&t.data||[]}var w={};var g={};async function v(e,t,n,o){const r=await _(e);if(n&&!g[e.repository_name+l(o)]){const i=r.find(e=>e.maven2.version.split(".")[1]===t.commitId);g[e.repository_name+l(o)]=i&&i.id||"123";return false}const i=r.find(e=>e.maven2.version.split(".")[1]===t.commitId);if(n){return i&&i.id!==g[e.repository_name+l(o)]?i:false}return i}async function T(e){const t=await u(r,{module_id:e.id});return t&&t.data.length&&t.data[0].id||""}async function h(e,t,n){const o=await T(e);const r=await f($,{branch_name:n,commit_id:t.commitId,commit_at:p(t.author.date),comment:t.comment,job_id:o})}const j=10;async function b(e,t,n,o){if(w[e.repository_name+l(n)]===0&&o)console.log(`${c()} ${e.repository_name} ${n}--开始获取上次构建id 准备重新构建`);else console.log(`${c()} ${e.repository_name} ${n}--开始第${w[e.repository_name+l(n)]+1}次检查构建是否成功`);const r=await v(e,t,o,n);if(r&&r.downloadUrl){console.log(`${c()} ${e.repository_name} ${n}--构建成功\r\n模  块:       ${r.maven2.groupId}\r\n分  支:       ${r.maven2.artifactId}\r\n制品ID:       ${r.maven2.version.split(".")[0]}\r\n构建时间：     ${c(r.lastModified)}\r\n下载地址：     ${r.downloadUrl}`);return}else{w[e.repository_name+l(n)]++;if(w[e.repository_name+l(n)]%(5*60/j)===0){console.log(`${c()} ${e.repository_name} ${n}--开始执行第${w[e.repository_name+l(n)]/12+1}次构建`);await h(e,t,n)}console.log(`${c()} ${e.repository_name} ${n}--等待10秒继续检查`);await s(j);await b(e,t,n,o)}}async function I(e,t,n){const o=await f(m,{branch_name:t,config_project_id:e.config_project_id,repository_id:e.repository_id});if(o&&o.data&&o.data.length){const r=o.data[0];console.log(`${c()} ${e.repository_name} ${t}--找到提交准备检测构建\r\n提交ID：${r.commitId}\r\n备注信息：${r.comment}\r\n提交人：${r.author.name}\r\n提交时间：${c(r.author.date)}`);b(e,r,t,n)}}async function H(t,e,n){if(!t){console.error("请填写需要构建的项目名称");return}const o=await u(y);if(o&&o.data){const r=o.data.find(e=>e.repository_name===t);if(r)I(r,e,n)}}async function k(e,t,n){console.log(`${c()} ${e} ${t}--准备开始构建最新提交`);w[e+l(t)]=0;g[e+l(t)]=undefined;H(e,t,n)}return e});