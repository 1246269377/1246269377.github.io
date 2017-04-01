window.onload = function() {
	myAddEvent(window, 'load', setClickEvent()); //设置一些乱七八遭的事件
	myAddEvent(window, 'load', setWorkTimeSize());
}

window.onresize = function() {
	setWorkTimeSize();
}

function setWorkTimeSize() { //自动设置work-time图片的大小
	var oBox = document.getElementById("work_time");
	var oBoxImg = oBox.getElementsByTagName("img");
	for(var i = 0; i < oBoxImg.length; i++) {
		oBoxImg[i].style.width = Math.floor((oBox.offsetWidth / 5) - 4) + "px";
	}
}

function setClickEvent() {
	setFollowClick(); //设置关注按钮点击事件
	setHeadNoremindEvent(); //设置顶部不再提醒点击事件
	setBannerEvent(); //设置banner图相关事件
	setVideoEvent(); //设置video视频相关事件
	setRightLessonEvent(); //设置右侧课程获取
	setLeftLessonEvent(); //设置左侧课程获取

	function setLeftLessonEvent() {
		var pageNo = 1; //请求的课程页码
		var psize = 20; //请求的课程数量
		var type = 10; //tap选择的课程类型
		var theLessonNum = 20; //克隆创建的课程数量
		var showLeftDemoBox = document.getElementsByClassName("show_left_demoBox")[0]; //左侧课程大盒子
		var showLeftTest = document.getElementsByClassName("show_left_demo")[0]; //左侧课程范例
		var leftPagePrev = document.getElementById("show_page_prev");
		var leftPageNext = document.getElementById("show_page_next");
		var showTabBox1 = document.getElementById("show_tab_box1");
		var showTabBox2 = document.getElementById("show_tab_box2");
		cloneLesson();

		var pageBtn = document.getElementsByClassName("show_left_page")[0].getElementsByTagName("span");
		for(var i = 0; i < pageBtn.length; i++) {
			pageBtn[i].index = i;
			pageBtn[i].onclick = function() {
				pageNo = this.index + 1;
				setLesson();
				pageStyleAction(this.index);
			}
		}

		leftPagePrev.onclick = function() {
			if(pageNo == "1") {
				alert("当前是第一页");
				return;
			}
			pageNo--;
			pageStyleAction(pageNo-1);

			setLesson();
		}

		leftPageNext.onclick = function() {
			if(pageNo == "6") {
				alert("已经是最后一页了");
				return;
			}
			pageNo++;
			pageStyleAction(pageNo-1);
			setLesson();
		}

		setLesson(); //刷新课程数据 

        //tab栏的两个标签点击事件
		showTabBox1.onclick = function() {
			if(type == "10") {
				return;
			} else {
				addClass(showTabBox1, "show_tab_action");
				removeClass(showTabBox2, "show_tab_action");
				type = 10;
				setLesson();
			}
		}
		showTabBox2.onclick = function() {
			if(type == "20") {
				return;
			} else {
				addClass(showTabBox2, "show_tab_action");
				removeClass(showTabBox1, "show_tab_action")
				type = 20;
				setLesson();
			}
		}

        //分页器点击样式变化函数
        function pageStyleAction(nowPageBtn){
            for(var i = 0; i < pageBtn.length; i++) {
				if(i == nowPageBtn) {
					addClass(pageBtn[i], "show_page_action");
				} else {
					removeClass(pageBtn[i], "show_page_action");
				}
			}
        }

        //课程克隆函数
		function cloneLesson() {
			for(var i = 1; i < theLessonNum; i++) { //复制课程节点
				var clonedNode = showLeftTest.cloneNode(true); // 克隆节点 
				document.getElementsByClassName("show_left_demoBox")[0].appendChild(clonedNode); // 在父节点插入克隆的节点 
			}
		}

        //课程刷新函数
		function setLesson() {
			ajax({ //ajax获取课程数据并改变页面表现
				url: 'http://study.163.com/webDev/couresByCategory.htm',
				data: {
					pageNo: pageNo,
					psize: psize,
					type: type
				},
				type: 'get',
				success: function(str) {
					str = JSON.parse(str);
					var showLeftDemo = document.getElementsByClassName("show_left_demo");
					var nowDemoCount = str.totalCount - (str.pagination.pageIndex - 1) * str.pagination.pageSize; //本页获取到的课程信息个数

					if(nowDemoCount < showLeftDemo.length) { //删除节点
						if(nowDemoCount < 0) {
							nowDemoCount = 0;
						}
						var deletNum = showLeftDemo.length - nowDemoCount;
						if(deletNum >= 20) {
							deletNum = 20;
						}
						for(var theDelet = showLeftDemo.length - 1; deletNum > 0; deletNum--, theDelet--) {
							document.getElementsByClassName("show_left_demoBox")[0].removeChild(showLeftDemo[theDelet]);
						}
					}
					if(nowDemoCount > showLeftDemo.length && showLeftDemo.length < 20) { //添加节点
						if(nowDemoCount < 0) {
							nowDemoCount = 0;
						}
						if(nowDemoCount >= 20) {
							nowDemoCount = 20;
						}
						var addNum = nowDemoCount - showLeftDemo.length + 1;
						theLessonNum = addNum;
						if(theLessonNum >= 20) {
							theLessonNum = 20;
						}
						if(showLeftDemo.length == "0" && theLessonNum == "20") {
							theLessonNum += 1;
						}
						console.log(theLessonNum);
						cloneLesson();
					}

					for(var i = 0;
						(i < showLeftDemo.length) && (i < nowDemoCount); i++) {
						showLeftDemo[i].getElementsByTagName("a")[0].innerHTML = str.list[i].name;
						showLeftDemo[i].getElementsByTagName("img")[0].src = str.list[i].middlePhotoUrl;
						showLeftDemo[i].getElementsByTagName("p")[0].innerHTML = str.list[i].provider;
						showLeftDemo[i].getElementsByTagName("span")[0].innerHTML = str.list[i].learnerCount;
						if(str.list[i].price == "0") {
							showLeftDemo[i].getElementsByTagName("strong")[0].innerHTML = "免费";
						} else {
							showLeftDemo[i].getElementsByTagName("strong")[0].innerHTML = "￥" + str.list[i].price;
						}
					}

				},
				error: function(str) {
					console.log(str);
				}
			});
		}
	}

	function setRightLessonEvent() { //设置右侧课程的相关事件
		var lessonNum = 20; //复制之后的节点数量
		var lessonDemoTest = document.getElementsByClassName("show_hot_demo")[0]; //复制样本

		var showDemoBox = document.getElementById("show_hot_demoBox");
		showDemoBox.style.height = 700 + "px";

		for(var i = 1; i < lessonNum; i++) { //复制最热课程节点
			var clonedNode = lessonDemoTest.cloneNode(true); // 克隆节点 
			lessonDemoTest.parentNode.appendChild(clonedNode); // 在父节点插入克隆的节点 
		}

		var lessonTimer = setInterval(function() {
			var lessonMoveBox = document.getElementById("show_hot_moveBox");
			if(lessonMoveBox.offsetTop <= -700) {
				startMove(lessonMoveBox, {
					top: 0
				});
			} else {
				startMove(lessonMoveBox, {
					top: lessonMoveBox.offsetTop - 70
				});
			}
		}, 5000);

		var lessonDemo = document.getElementsByClassName("show_hot_demo");
		ajax({ //ajax获取最热课程数据并改变页面表现
			url: 'http://study.163.com/webDev/hotcouresByCategory.htm',
			data: {},
			type: 'get',
			success: function(str) {
				str = eval(str);
				for(var i = 0; i < lessonDemo.length; i++) {
					lessonDemo[i].getElementsByTagName("p")[0].innerHTML = str[i].name;
					lessonDemo[i].getElementsByTagName("img")[0].src = str[i].smallPhotoUrl;
					lessonDemo[i].getElementsByTagName("strong")[0].innerHTML = str[i].learnerCount;
				}
			},
			error: function(str) {
				console.log(str);
			}
		});
	}

	function setVideoEvent() { //设置video视频相关事件
		var videoBeginImg = document.getElementsByClassName("show_right_me")[0].getElementsByTagName("img")[0];
		var videoEndImg = document.getElementById("hom_video_box").getElementsByTagName("i")[0];
		var videoWarp = document.getElementById("hom_video_box");
		videoBeginImg.onclick = function() {
			removeClass(videoWarp, "dis-none");
		}
		videoEndImg.onclick = function() {
			addClass(videoWarp, "dis-none");
			videoWarp.getElementsByTagName("video")[0].pause();
		}
	}

	function setBannerEvent() { //设置banner图相关事件
		var ban = document.getElementsByClassName("banner")[0].getElementsByTagName("a");
		var banBtn = document.getElementsByClassName("banner_btn")[0].getElementsByTagName("p");
		var now = 0;
		var bannerTab = setInterval(function() {
			now += 1;
			if(now >= 3) {
				now = 0;
			}
			for(var j = 0; j < banBtn.length; j++) {
				removeClass(banBtn[j], "a_action");
			}
			addClass(banBtn[now], "a_action");
			tab();
		}, 5000);

		for(var i = 0; i < banBtn.length; i++) { //圆点点击样式变化
			banBtn[i].index = i;
			banBtn[i].onclick = function() {
				var nowBtn = this.index;
				for(var j = 0; j < banBtn.length; j++) {
					removeClass(banBtn[j], "a_action");
				}
				addClass(banBtn[nowBtn], "a_action");
				now = nowBtn;
				tab();
			}
			banBtn[i].onmouseover = function() {
				clearInterval(bannerTab);
			}
			banBtn[i].onmouseout = function() {
				bannerTab = setInterval(function() {
					now += 1;
					if(now >= 3) {
						now = 0;
					}
					for(var j = 0; j < banBtn.length; j++) {
						removeClass(banBtn[j], "a_action");
					}
					addClass(banBtn[now], "a_action");
					tab();
				}, 5000);
			}
		}

		function tab() { //banner图变化函数 根据now的数值
			var timer = null;
			var nowOpt = 0;
			for(var i = 0; i < ban.length; i++) {
				if(i == now) {
					removeClass(ban[now], "dis-none");
					timer = setInterval(function() {
						nowOpt += 0.04;
						ban[now].style.opacity = nowOpt;
						ban[now].style.filter = 'alpha(opacity=' + nowOpt + ')';
						if(nowOpt >= 1) {
							clearInterval(timer);
						}
					}, 20);

				} else {
					addClass(ban[i], "dis-none");
					ban[i].style.opacity = 0;
					ban[i].style.filter = 'alpha(opacity=0)';
				}
			}
		}

	}

	if(getcookie().loginSuc == "true") { //自加载时判断关注按钮显示
		if(getcookie().followSuc == "true") {
			addClass(document.getElementById("head_attention_btn"), "dis-none");
			removeClass(document.getElementById("head_attention_upbtn"), "dis-none");
			var fansNum = parseInt(document.getElementById("head_attention_num").getElementsByTagName("span")[0].innerHTML);
			document.getElementById("head_attention_num").getElementsByTagName("span")[0].innerHTML = fansNum + 1;
		} else {
			removeClass(document.getElementById("head_attention_btn"), "dis-none");
			addClass(document.getElementById("head_attention_upbtn"), "dis-none");
		}
	} else {
		removeClass(document.getElementById("head_attention_btn"), "dis-none");
		addClass(document.getElementById("head_attention_upbtn"), "dis-none");
	}

	function setFollowClick() { //设置关注按钮点击事件
		var btn1 = document.getElementById("head_attention_btn"); //关注按钮
		var btn2 = document.getElementById("head_attention_remove"); //取消关注按钮
		var loginFormBox = document.getElementById("hom_login_box") //登录框
		var btnBack = document.getElementById("hom_login_back"); //登录框的取消按钮
		var btnLogin = document.getElementById("hom_login_btn"); //登录按钮

		btn1.onclick = function() { //关注
			if(getcookie().loginSuc == "true") {

				ajax({
					url: 'http://study.163.com/webDev/attention.htm',
					data: {},
					type: 'get',
					success: function(str) {
						if(str == 1) {
							var fansNum = parseInt(document.getElementById("head_attention_num").getElementsByTagName("span")[0].innerHTML);
							addClass(btn1, "dis-none");
							removeClass(document.getElementById("head_attention_upbtn"), "dis-none");
							document.getElementById("head_attention_num").getElementsByTagName("span")[0].innerHTML = fansNum + 1;
							document.cookie = "followSuc=true";
						} else {
							alert("未知错误");
						}
					},
					error: function(str) {
						console.log("未知错误:" + str);
					}
				});
			} else {
				loginFormBox.setAttribute("class", "wrap")
			}
		}

		btn2.onclick = function() { //取消关注
			var fansNum = parseInt(document.getElementById("head_attention_num").getElementsByTagName("span")[0].innerHTML);
			removeClass(btn1, "dis-none");
			addClass(document.getElementById("head_attention_upbtn"), "dis-none");
			document.getElementById("head_attention_num").getElementsByTagName("span")[0].innerHTML = fansNum - 1;
			document.cookie = "followSuc=false";
		}

		btnBack.onclick = function() {
			loginFormBox.setAttribute("class", "wrap dis-none")
		}

		btnLogin.onclick = function() {
			var theUsername = document.getElementById("userName").value;
			var thePassword = document.getElementById("password").value;

			ajax({
				url: 'http://study.163.com/webDev/login.htm',
				data: {
					userName: hex_md5(theUsername),
					password: hex_md5(thePassword)
				},
				type: 'get',
				success: function(str) {
					if(str == 1) {
						alert("登录成功!");
						document.cookie = "loginSuc=true";
						loginFormBox.setAttribute("class", "wrap dis-none");
					} else {
						alert("用户名或密码错误");
					}
				},
				error: function(str) {
					console.log(str);
				}
			});

		}
		var hexcase = 0;
		var b64pad = "";
		var chrsz = 8;

		function hex_md5(s) {
			return binl2hex(core_md5(str2binl(s), s.length * chrsz));
		}

		function binl2hex(binarray) {
			var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
			var str = "";
			for(var i = 0; i < binarray.length * 4; i++) {
				str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
					hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
			}
			return str;
		}

		function core_md5(x, len) {
			x[len >> 5] |= 0x80 << ((len) % 32);
			x[(((len + 64) >>> 9) << 4) + 14] = len;
			var a = 1732584193;
			var b = -271733879;
			var c = -1732584194;
			var d = 271733878;
			for(var i = 0; i < x.length; i += 16) {
				var olda = a;
				var oldb = b;
				var oldc = c;
				var oldd = d;
				a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
				d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
				c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
				b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
				a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
				d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
				c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
				b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
				a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
				d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
				c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
				b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
				a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
				d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
				c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
				b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
				a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
				d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
				c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
				b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
				a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
				d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
				c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
				b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
				a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
				d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
				c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
				b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
				a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
				d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
				c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
				b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
				a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
				d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
				c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
				b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
				a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
				d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
				c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
				b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
				a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
				d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
				c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
				b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
				a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
				d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
				c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
				b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
				a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
				d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
				c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
				b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
				a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
				d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
				c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
				b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
				a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
				d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
				c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
				b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
				a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
				d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
				c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
				b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
				a = safe_add(a, olda);
				b = safe_add(b, oldb);
				c = safe_add(c, oldc);
				d = safe_add(d, oldd);
			}
			return Array(a, b, c, d);
		}

		function md5_cmn(q, a, b, x, s, t) {
			return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
		}

		function bit_rol(num, cnt) {
			return(num << cnt) | (num >>> (32 - cnt));
		}

		function md5_ff(a, b, c, d, x, s, t) {
			return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
		}

		function md5_gg(a, b, c, d, x, s, t) {
			return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
		}

		function md5_hh(a, b, c, d, x, s, t) {
			return md5_cmn(b ^ c ^ d, a, b, x, s, t);
		}

		function md5_ii(a, b, c, d, x, s, t) {
			return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
		}

		function safe_add(x, y) {
			var lsw = (x & 0xFFFF) + (y & 0xFFFF);
			var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
			return(msw << 16) | (lsw & 0xFFFF);
		}

		function str2binl(str) {
			var bin = Array();
			var mask = (1 << chrsz) - 1;
			for(var i = 0; i < str.length * chrsz; i += chrsz)
				bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
			return bin;
		}
	}

	function setHeadNoremindEvent() { //头部不再提醒函数
		var remind = document.getElementById("head_remind");
		var noRemind = document.getElementById("head_remind_noremind");
		if(getcookie().noremind == "true") {
			addClass(remind, " dis-none");
		}
		noRemind.onclick = function() {
			document.cookie = "noremind=true";
			addClass(remind, " dis-none");
		}
	}

	function getcookie() { //获取cookie方法
		var cookie = {};
		var all = document.cookie;
		if(all === '')
			return cookie;
		var list = all.split('; ');
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var p = item.indexOf('=');
			var name = item.substring(0, p);
			name = decodeURIComponent(name);
			var value = item.substring(p + 1);
			value = decodeURIComponent(value);
			cookie[name] = value;
		}
		return cookie;
	}

	function addClass(node, className) { //添加类名
		var current = node.className || "";
		if((" " + current + " ").indexOf(" " + className + " ") === -1) {
			node.className = current ? (current + " " + className) : className;
		}
	}

	function removeClass(node, className) { //删除类名
		var current = node.className || "";
		node.className = (" " + current + " ").replace(" " + className + " ", " ").trim();
	}
}

function myAddEvent(obj, ev, fn) { //兼容绑定事件函数
	if(obj.attachEvent) {
		obj.attachEvent('on' + ev, fn);
	} else {
		obj.addEventListener(ev, fn, false);
	}
}