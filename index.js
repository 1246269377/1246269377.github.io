window.onload = function() {
	new Vue({
		el: "#mainBody",
		data: {
			aside_test_canShow: false,
			aside_test_show: [{
					name: "用户信息表(Vue)",
					url: "textspace/userInfoList-demo/userInfoList.html"
				},
				{
					name: "百度搜索接口测试--vue",
					url: "textspace/search-demo/search-demo.html"
				},
				{
					name: "form表单H5实例",
					url: "textspace/form-demo/form-demo.html"
				},
				{
					name: "轮播效果",
					url: "textspace/flash_Pic/flash_Pic.html"
				},
				{
					name: "网易大作业",
					url: "endspace/wy-endTest/hom.html"
				}
			],
			aside_test_none: [{
					name: "cookie",
					url: "textspace/cookie-demo/cookie.html"
				},
				{
					name: "正则表达式",
					url: "textspace/regexp-demo/regexp.html"
				},
				{
					name: "关于Table的BOM操作",
					url: "textspace/table-demo/tableDemo.html"
				},
				{
					name: "ajax读取文件练习",
					url: "textspace/ajax-demo/read.html"
				},
				{
					name: "ajax读取文件练习2",
					url: "textspace/ajax-demo/myajax.html"
				}
			],
			demoBox: [{
					name: "网易大作业",
					url: "endspace/wy-endTest/hom.html",
					imageUrl: "images/demo_wy-endTest.jpg"
				},
				{
					name: "五子棋",
					url: "endspace/five_win/five.html",
					imageUrl: "images/demo_five.jpg"
				},
				{
					name: "贪吃蛇",
					url: "endspace/snack/snack.html",
					imageUrl: "images/demo_snack.jpg"
				},
				{
					name: "一个跑酷游戏？",
					url: "endspace/jump-jump-1.1/jump-jump.html",
					imageUrl: ""
				},
				{
					name: "计算器",
					url: "endspace/counter/counter.html",
					imageUrl: "images/demo-counter.jpg"
				},
				{
					name: "3D效果初探",
					url: "endspace/css3-demo1/css3-demo1.html",
					imageUrl: "images/demo_css3-demo1.png"
				},
				{
					name: "打怪升级",
					url: "endspace/lvGame/index.html",
					imageUrl: "images/demo_lve.jpg"
				},
			]
		},
		methods: {
			aside_test_changeShow1: function() {
				this.aside_test_canShow = true;
			},
			aside_test_changeShow2: function() {
				this.aside_test_canShow = false;
			}
		}
	});

	demoBoxJs(); //demo盒子自移动
	someClickEvent();
	aNewWindowOpen(); //a标签在新窗口打开
	sideBall(); //边缘球动画

	function someClickEvent() {

		var a = document.getElementById("assas");
		a.onclick = function() {
			alert("真是一段让人不堪回首的往事");
		}
	}

	function aNewWindowOpen() {
		var aAll = document.getElementsByTagName("a");
		checkA(aAll);

		function checkA(all) {
			for(var i = 0; i < all.length; i++) {
				if(all[i].href != "") {
					all[i].target = "_blank";
				}
			}
		}
	}

	function demoBoxJs() { //展示区js效果
		var demoBox = document.getElementsByClassName("demoBox")[0]; //最外层盒子
		var demo_Div = demoBox.getElementsByClassName("demo_Div")[0]; //存放demo的运动盒子
		var demo = demo_Div.getElementsByClassName("demo"); //demo数组
		var demoLength = demo.length;

		demo_Div.style.width = demoLength * 2 * demo[0].offsetWidth + "px";
		var goOut = demoLength * (demo[0].offsetWidth + 12);

		var timer = null; //定时器

		for(var i = 0; i < demoLength; i++) { //复制demo
			var addDiv = document.createElement("div");
			addDiv.innerHTML = demo[i].innerHTML;
			addDiv.className = "demo";
			demo_Div.appendChild(addDiv);
		}

		timer = setInterval(move, 30);

		demo_Div.onmouseover = function() { //鼠标移入停止运动
			clearInterval(timer);
		};

		demo_Div.onmouseout = function() { //鼠标移出继续运动
			timer = setInterval(move, 30);
		};

		function move() {
			if(demo_Div.offsetLeft < -goOut) {
				demo_Div.style.left = 0;
			}
			demo_Div.style.left = demo_Div.offsetLeft - 1 + "px";
		}
	}
}

window.onresize = function() {
	var downBall = document.getElementsByClassName("downBall");
	for(var i = 0; i < downBall.length; i++) {
		clearInterval(downBall[i].timer);
		clearInterval(downBall[i].timer2);
		downBall[i].timer = null;
		downBall[i].timer2 = null;
	}
	sideBall();
}

function sideBall() {
	var bodySize = document.getElementsByTagName("body")[0].offsetWidth;
	var sideWidth = bodySize > 1205 ? (bodySize - 1205) / 2 : 0;
	var side = document.getElementsByClassName("sideBall");
	var speed = null;
	var move1 = true;
	var move2 = true;
	var downBall = document.getElementsByClassName("downBall");
	var firstSize = sideWidth * 0.1 + "px";
	var targetSize = document.getElementsByTagName("body")[0].offsetHeight * 0.8;
	var targetWidth = sideWidth * 0.6;
	var backInterval = null;
	for(var i = 0; i < side.length; i++) {
		if(i == 1) {
			side[i].style.right = 0
		} else {
			side[i].style.left = 0
		}
		side[i].style.width = sideWidth + "px";
	}

	downBallAct();
	
	setInterval(function(){
		console.log("1");
		if(move1 == false && move2 == false) {
			console.log("2");
			if(backInterval == null) {
				backInterval = setTimeout(setTimeOut, 2000);
			}

			function setTimeOut() {
				console.log(move1, move2);
				move1 = true;
				move2 = true;
				for(var i = 0; i < downBall.length; i++) {
					clearInterval(downBall[i].timer);
					clearInterval(downBall[i].timer2);
					downBall[i].timer = null;
					downBall[i].timer2 = null;
				}
				for(var i = 0; i < downBall.length; i++) {
					downBall[i].style.height = downBall[i].style.width = firstSize; //给小球设置宽高
					downBall[i].style.marginLeft = -(downBall[i].offsetWidth) / 2 + "px"; //给小球平衡定位
					downBall[i].style.top = "50px"; //小球高度还原
					startMove2(downBall[i], "top", targetSize);
					startMove1(downBall[i], {
						width: targetWidth,
						height: targetWidth
					});

				}
			}
		} else {
			return;
		}
	},1000);

	function downBallAct() {

		for(var i = 0; i < downBall.length; i++) {
			downBall[i].style.height = downBall[i].style.width = firstSize; //给小球设置宽高
			downBall[i].style.marginLeft = -(downBall[i].offsetWidth) / 2 + "px"; //给小球平衡定位
			startMove2(downBall[i], "top", targetSize);
			startMove1(downBall[i], {
				width: targetWidth,
				height: targetWidth
			});
		}
		
	}

	function startMove1(obj, json, fnEnd) {
		obj.timer = setInterval(function() {
			for(var attr in json) {
				var bStop = true;
				var cur = 0; //用来记录元素当前的属性

				if(attr == 'opacity') {
					cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
				} else {
					cur = parseInt(getStyle(obj, attr));
				}

				var speed = (json[attr] - cur) / 18;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

				if(cur != json[attr]) bStop = false;

				if(speed <= 1 && speed >= -1) {
					speed = 0;
					bStop = true;
				}

				if(attr == 'opacity') {
					obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
					obj.style.opacity = (cur + speed) / 100;
				} else {
					obj.style[attr] = cur + speed + 'px';
					obj.style.marginLeft = -(obj.offsetWidth) / 2 + "px"; //给小球平衡定位
				}
			}
			if(bStop) {
				clearInterval(obj.timer);
				move1 = false;
				if(move2 == false) {
					backInterval = null;
				}
				if(fnEnd) fnEnd();
			}
		}, 30);
	}

	function startMove2(obj, name, itarge, fnEnd) {
		obj.timer2 = setInterval(function() {
			speed += (itarge - (parseFloat(getStyle(obj, name)))) / 27;
			speed *= 0.95;
			if(Math.abs(speed) <= 2 && Math.abs(itarge - (parseFloat(getStyle(obj, name)))) <= 2) {
				clearInterval(obj.timer2);
				speed = 0;
				obj.style[name] = itarge;
				move2 = false;
				if(move1 == false) {
						backInterval = null;
					}
				if(fnEnd) {
					fnEnd();
				}
			} else {
				var H = (parseFloat(getStyle(obj, name))) + speed
				if(H < 0) {
					H = 0;
				}
				obj.style[name] = H + "px";
			}
		}, 30)
	}

	function getStyle(obj, name, value) {
		if(arguments.length == 2) {
			if(obj.currentStyle) {
				return obj.currentStyle[name];
			} else {
				return getComputedStyle(obj, false)[name];
			}
		} else if(arguments.length == 3) {
			obj.style[name] = value;
		}
	}
}