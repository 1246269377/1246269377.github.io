function mapCreateEvent() {
	var nowHeightCout = 6; //当前高度级数
	var nowWidthCout = 0; //当前宽度级数
	var nowMarginCount = 0; //当前边距级数
	var mapCount = 200; //地图块个数
	var yard = 50; //最小宽高
	var worldWidth=0;
	
	for(var i = 0; i < mapCount; i++) {
		createMap();
	}
	world.style.width=worldWidth+'px';
	earthCheck();

	function createMap() { //创建一个地图--随机宽高
		var earth = document.createElement('div'); //创建地图块并设置宽高
		var heightRandom = 0;
		var widthRandom = 0;
		var marginRandom = 0;

		var RandomMath = (Math.random() * 10); //随机出来的值

		if(RandomMath > 7) { //高度随机
			heightRandom = 1;
		} else if(RandomMath >= 5) {
			heightRandom = 2;
		} else if(RandomMath < 5) {
			heightRandom = -2;
		} else if(RandomMath < 1.5) {
			heightRandom = -4;
		}
		if(nowHeightCout <= 3) {
			nowHeightCout = 3;
		}if(nowHeightCout >= 12) {
			nowHeightCout = 14;
		}
		nowHeightCout = nowHeightCout + heightRandom;
		


		if(RandomMath > 9) { //宽度随机
			nowWidthCout = 1;
		} else if(RandomMath > 8) {
			nowWidthCout = 2;
		} else if(RandomMath > 4) {
			nowWidthCout = 4;
		} else if(RandomMath > 2) {
			nowWidthCout = 6;
		} else {
			widthRandom = 8;
		}

		if(RandomMath < 2) { //边距随机
			nowMarginCount = 1;
			if(RandomMath < 1) {
				nowMarginCount = 2;
			} else if(RandomMath < 0.8) {
				nowMarginCount = 3;
			}
		}else if(RandomMath >= 2){
			nowMarginCount=0;
		}

		
		var nowHeight = 900 - nowHeightCout * yard;
		var nowWidth = nowWidthCout * yard;
		var nowMargin = nowMarginCount * yard;

		earth.className = 'earth';
		earth.setAttribute('theTop', nowHeight);
		earth.setAttribute('theWidth', nowWidth);
		earth.setAttribute('marginLeft', nowMargin);
//		earth.innerHTML=nowWidth;
		worldWidth+=nowWidth;
		world.appendChild(earth);
	}

}

function earthCheck() { //地形构建函数
	var theWall = new Array();
	var world = document.getElementById("world");
	var earth = world.getElementsByTagName('div');
	for(var i = 0; i < earth.length; i++) {
		earth[i].style.width = earth[i].getAttribute("theWidth") + 'px';
		earth[i].style.marginTop = earth[i].getAttribute("theTop") + 'px';
		earth[i].style.marginLeft = earth[i].getAttribute("marginLeft") + 'px';
		theWall.push(earth[i]);
	}
	return theWall;
}

function checkMoveLength(){ //检查显示移动距离百分比
	var world = document.getElementById("world");
	var showMoveLength=document.getElementById("checkPercent").getElementsByTagName("span")[0];
	checkMoveTimer=setInterval(function(){
		console.log(world.style.left);
		showMoveLength.innerText=(-parseInt(world.style.left)/5)+"/"+((world.offsetWidth)/5);
	},30);
}
