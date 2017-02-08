/*
onload中{
	gTimer---重力定时器
	runTimer--跑动定时器
	mainBodyJump()---人体跳跃方法
	gSport()----重力方法
}
 * 
startMove(obj, json, fnEnd)---链式运动框架
getStyle(obj, name) ----------获取样式
function impact(obj, arr) ----碰撞检测函数--碰撞的是obj的上下左右的中间点
earthCheck() ----------------- //地形构建函数 
 */
var canRun = true; //是否能运动
var world = document.getElementById("world"); //获取地图上级世界
var speed = 5; //人物移动速度
var runLength=1700;

window.onload = function() {
	myAddEvent(window, 'load', mapCreateEvent()); //地图创建
	myAddEvent(window, 'load', bodyMoveEvent()); //人物移动
}

function bodyMoveEvent() { //人物移动

	var earth = earthCheck(); //不可通过的地面集合
	var jump = 1; //可跳跃次数
	var jumpHeight = 220; //跳跃高度
	var gspeed = 5; //重力加速度
	var mainBody = document.getElementById("mainBody");
	var standStats = impact(mainBody, earth); //触墙状态

	var gTimer = setInterval(function() { //重力定时器----无时无刻不在下落
		gSport();
	}, 10);

	var runTimer = setInterval(function() { //定时检测能否左右移动

		if(canRun) {
			standStats = impact(mainBody, earth);
			if(standStats.right) {
				mainBody.style.left = mainBody.offsetLeft - speed + 'px';
			}
			world.style.left = world.offsetLeft - speed + "px";
			runLength+=speed;
				if (runLength>=(world.offsetWidth)) {
					alert('you win');
					clearInterval(gTimer);
					clearInterval(runTimer);
					window.onload=function(){
						
					};
				}
				if(mainBody.offsetTop>870){
					alert('you die');
					clearInterval(gTimer);
					clearInterval(runTimer);
					window.onload=function(){
						
					};
				}
				if(mainBody.offsetLeft<0){
					alert('you die');
					clearInterval(gTimer);
					clearInterval(runTimer);
					window.onload=function(){
						
					};
				}
			
		}
	}, 30);

	document.onkeydown = function(ev) { //方向键按下
		var ev = ev || event;
		var keyCode = ev.keyCode;
		if(keyCode == 38) {
			mainBodyJump();
		}

	}
	document.ontouchstart=document.onclick=function(){
		mainBodyJump();
	}
	
	function mainBodyJump() { //人物跳跃
		if(jump > 0) {
			clearInterval(gTimer);
			var newTop = mainBody.offsetTop - jumpHeight;
			startMove(mainBody, {
				top: newTop
			}, function() {
				gTimer = setInterval(function() { //重力定时器----无时无刻不在下落
					gSport();
				}, 10);
			});

			jump--;
		}
	}

	function gSport() { //重力
		var mainBody = document.getElementById("mainBody");
		var earth = earthCheck();
		var fallHeight = mainBody.offsetTop;
		var standStats = impact(mainBody, earth);
		if(standStats.bottom == false) {
			mainBody.style.top = (fallHeight + gspeed) + 'px';
		} else {
			jump = 1;

		}
	}

	function addKeyCodeArry(num, arr) { //添加键盘码组合
		var check = 0;
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] == num) {
				check = 1;
			}
		}
		if(check == 0) {
			arr.push(num);
		}
		return arr;
	}

	function deletKeyCodeArry(num, arr) { //删除键盘码
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] == num) {
				arr.splice(i, 1);
			}
		}
		return arr;
	}

	function searchKeyCodeArry(num, arr) { //搜索键盘码
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] == num) {
				return true;
			}
		}
	}

	function startMove(obj, json, fnEnd) { //链式运动框架
		clearInterval(obj.timer);
		var earth = earthCheck(); //不可通过的地面集合
		var mainBody = document.getElementById("mainBody");
		var standStats = impact(mainBody, earth); //触墙状态

		obj.timer = setInterval(function() {

			for(var attr in json) {
				var bStop = true;
				var cur = 0; //用来记录元素当前的属性

				if(attr == 'opacity') {
					cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
				} else {
					cur = parseInt(getStyle(obj, attr));
				}

				var speed = (json[attr] - cur) / 6;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

				if(cur != json[attr]) bStop = false;

				if(attr == 'opacity') {
					obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
					obj.style.opacity = (cur + speed) / 100;
				} else {
					obj.style[attr] = cur + speed + 'px';
					standStats = impact(mainBody, earth);
					if(standStats.right == false) {
						canRun = true;
					}

				}
			}
			if(bStop) {
				clearInterval(obj.timer);
				if(fnEnd) fnEnd();
			}
		}, 30);
	}

	function getStyle(obj, name) { //获取样式
		if(obj.currentStyle) {
			return obj.currentStyle[name];
		} else {
			return getComputedStyle(obj, false)[name];
		}
	}

	function impact(obj, arr) { //碰撞检测函数--碰撞的是obj的上下左右的中间点

		var standStats = {
			left: false,
			right: false,
			top: false,
			bottom: false
		};

		var left = {},
			right = {},
			top = {},
			bottom = {};

		right.X = obj.offsetLeft + obj.offsetWidth;
		right.Y1 = obj.offsetTop + 1;
		right.Y2 = obj.offsetTop + obj.offsetHeight - 1;
		left.X = right.X - obj.offsetWidth;
		left.Y1 = obj.offsetTop + 1;
		left.Y2 = obj.offsetTop + obj.offsetHeight - 1;
		top.X1 = obj.offsetLeft + 1;
		top.X2 = obj.offsetLeft + obj.offsetWidth - 1;
		top.Y = obj.offsetTop;
		bottom.X1 = obj.offsetLeft + 1;
		bottom.X2 = obj.offsetLeft + obj.offsetWidth - 1;
		bottom.Y = obj.offsetTop + obj.offsetHeight;

		for(var i = 0; i < arr.length; i++) {

			var d = {
				x: arr[i].offsetLeft + world.offsetLeft,
				y: arr[i].offsetTop,
				w: arr[i].offsetWidth,
				h: arr[i].offsetHeight - arr[i].offsetTop

			}

			if(left.X >= d.x && left.X <= d.x + d.w && left.Y1 >= d.y && left.Y1 <= d.y + d.h || left.X >= d.x && left.X <= d.x + d.w && left.Y2 >= d.y && left.Y2 <= d.y + d.h) {
				standStats.left = true;
			}
			if(right.X >= d.x && right.X <= d.x + d.w && right.Y1 >= d.y && right.Y1 <= d.y + d.h || right.X >= d.x && right.X <= d.x + d.w && right.Y2 >= d.y && right.Y2 <= d.y + d.h) {
				standStats.right = true;
			}
			if(top.X1 >= d.x && top.X1 <= d.x + d.w && top.Y >= d.y && top.Y <= d.y + d.h || top.X2 >= d.x && top.X2 <= d.x + d.w && top.Y >= d.y && top.Y <= d.y + d.h) {
				standStats.top = true;
			}
			if(bottom.X1 >= d.x && bottom.X1 <= d.x + d.w && bottom.Y >= d.y && bottom.Y <= d.y + d.h || bottom.X2 >= d.x && bottom.X2 <= d.x + d.w && bottom.Y >= d.y && bottom.Y <= d.y + d.h) {
				standStats.bottom = true;
			}
		}

		return standStats;

	}

}

function myAddEvent(obj, ev, fn) { //兼容绑定事件函数
	if(obj.attachEvent) {
		obj.attachEvent('on' + ev, fn);
	} else {
		obj.addEventListener(ev, fn, false);
	}
}