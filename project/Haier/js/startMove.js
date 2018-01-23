/*
	多物体多样式运动

	endFunc  【回调函数】  【注】将在该函数中执行的某一段代码的编写权利交给别人。

	【注】必须保证所有的样式都到大目的值以后，才能关闭定时器。
*/

function startMove(obj, json, endFunc){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){

		var isEnd = true;

		for(var attr in json){
			//<1>获取当前样式
			var iCur = null;


			if(attr == "opacity"){
				iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
			}else{
				iCur = parseInt(getStyle(obj, attr));
			}


			//<2>计算速度
			var iSpeed = (json[attr] - iCur) / 8;
			
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			//停止
			if(iCur != json[attr]){
				isEnd = false;
			}
			if(attr == "opacity"){
				iCur += iSpeed;
				obj.style.filter = "alpha(opacity=" + iCur + ")";
				obj.style.opacity = iCur / 100;

			}else{
				obj.style[attr] = iCur + iSpeed + 'px';
			}
		}

		if(isEnd){ //三个样式全部到大目的值
			clearInterval(obj.timer);
			//这是动画结束的时候
			//【注】让外面填写，在这里需要执行的代码
			if(endFunc){
				endFunc.call(obj);
				// endFunc.bind(obj)();
			}
		}

	}, 30);
}




