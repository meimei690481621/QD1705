function elementsByClassName(parent, className){
	//1、现将parent所有节点获取
	var nodes = parent.getElementsByTagName("*");
	//2、筛选
	var res = [];
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].className == className){
			res.push(nodes[i]);
		}
	}
	return res;
}

function getNumOfDate(n){
	var d = new Date();
	var date = d.getDate();
	d.setDate(date + n);
	return d;
}

/*
	【注】选择器写法进行传参
	getElementById 			#id
	getElementsByTagName    tagName
	getElementsByName       name=hello
	getElementsByClassName  .box
*/
function $(vArg){
	switch(vArg[0]){
		case "#":
			return document.getElementById(vArg.substring(1));
			break;
		case ".":
			return elementsByClassName(document, vArg.substring(1));
			break;
		default:
			//取出前面五个字符
			var subStr = vArg.substring(0, 5);
			if(subStr == "name="){
				//name
				return document.getElementsByName(vArg.substring(5));
			}else{
				//tagName
				return document.getElementsByTagName(vArg);
			}
			break;
	}
}

function getStyle(elem, attr){
	return elem.currentStyle ? elem.currentStyle[attr] : getComputedStyle(elem)[attr];
}

function randomColor(){
	var color = "rgba(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + ",1)";
	return color;
}


/*
	有一个函数可以创建一个带文本节点的元素节点
*/
function createElementWithText(tagName, txtStr){
	var node = document.createElement(tagName);
	var oTxt = document.createTextNode(txtStr);
	node.appendChild(oTxt);
	return node;
}


function insertAfter(newNode, oldNode){
	//判断oldNode是否是最后一个
	if(oldNode == oldNode.parentNode.lastChild){
		oldNode.parentNode.appendChild(newNode)
	}else{
		oldNode.parentNode.insertBefore(newNode, oldNode.nextSibling);
	}
}


function removeSpaceNode(nodes){
	var res = []; //存储不是空白的节点
	for(var i = 0; i < nodes.length; i++){
		if(!(nodes[i].nodeType == 3 && /^\s+$/ig.test(nodes[i].nodeValue))){
			res.push(nodes[i]);
		}
	}
	return res;
}


function removeSpaceNode2(parent){
	//子节点
	var nodes = parent.childNodes;
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].nodeType == 3 && /^\s+$/ig.test(nodes[i].nodeValue)){
			//将空白节点删除
			parent.removeChild(nodes[i]);
		}
	}
}


/*
	阻止默认行为做浏览器兼容
*/
function preDef(ev){
	if(ev.preventDefault){
		ev.preventDefault();
	}else{
		window.event.returnValue = false;
	}
}


function stopBubble(e){
	if(e.cancelBubble){
		e.cancelBubble = true;
	}else{
		e.stopPropagation();
	}
}

function drag(node){
	var offsetX = 0;
	var offsetY = 0
	//<1>记录相对位置
	node.onmousedown = function(ev){
		var e = ev || window.event;
		offsetX = e.clientX - this.offsetLeft;
		offsetY = e.clientY - this.offsetTop;
		//2、鼠标移动，保持相对位置
		document.onmousemove = function(ev){
			var e = ev || window.event;
			node.style.left = e.clientX - offsetX + "px";
			node.style.top = e.clientY - offsetY + "px";
		}
	}
	//3、鼠标抬起，
	document.onmouseup = function(){
		document.onmousemove = null;
	}
}
/*
	=======
	事件绑定
*/
function addEvent(obj, eventType, func){
	if(obj.addEventListener){
		obj.addEventListener(eventType, func, false);
	}else if(obj.attachEvent){
		obj.attachEvent("on" + eventType, func);
	}
}

function removeEvent(obj, eventType, func){
	if(obj.removeEventListener){
		obj.removeEventListener(eventType, func);
	}else if(obj.detachEvent){
		obj.detachEvent('on' + type, fn);

	}
}


function setCookie(name, value, json){
	var cookieStr = encodeURIComponent(name) + "=" + encodeURIComponent(value);
	if(json){
		//可选项
		if(json.expires){
			cookieStr += ";expires=" + json.expires;
		}
		if(json.path){
			cookieStr += ";path=" + json.path;
		}
		if(json.domain){
			cookieStr += ";domain=" + json.domain;
		}
		if(json.secure){
			cookieStr += ";secure";
		}
	}
	document.cookie = cookieStr;
}

function getCookie(name){
	var cookieStr = decodeURIComponent(document.cookie);
	//<1>查找键的位置
	var start = cookieStr.indexOf(name);
	if(start){ //start != 0
		//【注】需要重新去找 这个键加上空格去找
		start = cookieStr.indexOf(" " + name);
	}

	if(start == -1){
		return null;
	}
	//<2>查找键值对结束位置
	var end = cookieStr.indexOf(";", start);
	if(end == -1){
		//最后一项
		end = cookieStr.length;
	}
	

	//<3>将键值对提取出来
	var subStr = cookieStr.substring(start, end);
	// alert(subStr);
	//<4>通过字符串分割将值提取
	var arr = subStr.split("=");
	return arr[1];
}

function removeCookie(name){
	document.cookie = encodeURIComponent(name) + "=;expires=" + new Date(-1);
}


function $cookie(name, value){
	switch(arguments.length){
		case 1: //获取cookie
			return getCookie(name);
			break;
		case 2:
			if(value == null){
				//删除cookie
				removeCookie(name);
			}else{
				//设置cookie
				setCookie(name, value);
			}
			break;
		case 3: //设置cookie
			setCookie(name, value, arguments[2]);
			break;
		default:
			return false;
			break;
	}
}


//判断碰撞了  通过反证
function knock(obj1, obj2){
	var l1 = obj1.offsetLeft;
	var r1 = obj1.offsetLeft + obj1.offsetWidth;
	var t1 = obj1.offsetTop;
	var b1 = obj1.offsetTop + obj1.offsetHeight;

	var l2 = obj2.offsetLeft;
	var r2 = obj2.offsetLeft + obj2.offsetWidth;
	var t2 = obj2.offsetTop;
	var b2 = obj2.offsetTop + obj2.offsetHeight;

	//判断哪些情况是肯定碰不到的
	if(r1 < l2 || l1 > r2 || t1 > b2 || b1 < t2){
		return false;
	}else{
		return true;
	}
}









