
var chessLength = 60; //棋盘线之间的间距
var chessBoard=[];
var me=true;
var wins=[];
var myWin = []; //我方胜利数组
var computerWin = []; //电脑胜利数组
var over=false;
for (var i=0;i<15;i++) {
	wins[i]=[];
	for (var j=0;j<15;j++) {
		wins[i][j]=[];
	}
}
var count=0;

for(var i = 0; i < 15; i++) { //横线赢法 
	for(var j = 0; j < 11; j++) {
		for(var k = 0; k < 5; k++) {
			wins[i][j + k][count] = true;
		}
		count++;
	}
}
for(var i = 0; i < 15; i++) { //竖线赢法
	for(var j = 0; j < 11; j++) {
		for(var k = 0; k < 5; k++) {
			wins[j + k][i][count] = true;
		}
		count++;
	}
}
for(var i = 0; i < 11; i++) { //斜线赢法
	for(var j = 0; j < 11; j++) {
		for(var k = 0; k < 5; k++) {
			wins[i + k][j + k][count] = true;
		}
		count++;
	}
}
for(var i = 0; i < 11; i++) { //反斜线赢法
	for(var j = 14; j > 3; j--) {
		for(var k = 0; k < 5; k++) {
			wins[i+k][j - k][count] = true;
		}
		count++;
	}
}

for (var i=0;i<count;i++) {
	myWin[i]=0;
	computerWin[i]=0;
}

var chess = document.getElementsByTagName("canvas")[0]; //棋盘对象
var context = chess.getContext("2d");
context.strokeStyle = "#bfbfbf"; //画的线的颜色
for (var i=0;i<15;i++) {
	chessBoard[i]=[];
	for (var j=0;j<15;j++) {
		chessBoard[i][j]=0;
	}
}


for(var i = 0; i < 15; i++) { //自动画出棋盘
	context.moveTo(chessLength / 2 + i * chessLength, chessLength / 2);
	context.lineTo(chessLength / 2 + i * chessLength, chess.offsetWidth - chessLength / 2);
	context.stroke();

	context.moveTo(chessLength / 2, chessLength / 2 + i * chessLength);
	context.lineTo(chess.offsetWidth - chessLength / 2, chessLength / 2 + i * chessLength);
	context.stroke();
}
function oneStep(i, j, me) { //封装的棋子对象
	var l = chessLength / 2 + i * chessLength;
	var t = chessLength / 2 + j * chessLength;
	context.beginPath();
	context.arc(l, t, 26, 0, 2 * Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(l + 2, t - 2, 26, l + 2, t - 2, 0); //设置渐变，从0渐变到1
	if(me) {
		gradient.addColorStop(0, "#0a0a0a");
		gradient.addColorStop(1, "#636766");
	} else {
		gradient.addColorStop(0, "#d1d1d1");
		gradient.addColorStop(1, "#f9f9f9");
	}
	context.fillStyle = gradient; //context填充色设置为渐变色
	context.fill();
}

chess.onclick = function(ev) { //落子判定
	
	if (over) {
		return;
	}
	if(!me){
		return;
	}
	
	var oEvent = ev || event;
	var x = oEvent.offsetX;
	var y = oEvent.offsetY;
	var i = Math.floor(x / 60);
	var j = Math.floor(y / 60);
	if(chessBoard[i][j] == 0) 
	{
		oneStep(i, j, me);
		chessBoard[i][j]=1;
		for(var k = 0; k < count; k++) 
		{
			if(wins[i][j][k]) {
				myWin[k]++;
				computerWin[k] = 6;
				if(myWin[k] == 5) 
				{
					alert("你赢了");
					over = true;
				}
			}
		}
		if (!over) {
			me=!me;
			computerAI();
		}
	}
}

var computerAI=function(){
	var myScore=[];
	var computerScore=[];
	var max=0;
	var u=0,v=0;
	for (var i=0;i<15;i++) {
		myScore[i]=[];
		computerScore[i]=[];
		for (var j=0;j<15;j++) {
			myScore[i][j]=0;
			computerScore[i][j]=0;
		}
	}
	for (var i=0;i<15;i++) {
		for (var j=0;j<15;j++) {
			if (chessBoard[i][j]==0) {
				for(var k=0;k<count;k++){
					if(wins[i][j][k]){
						if (myWin[k]==1) {
							myScore[i][j]+=200;
						}else if (myWin[k]==2) {
							myScore[i][j]+=400;
						}else if (myWin[k]==3) {
							myScore[i][j]+=2000;
						}else if (myWin[k]==4) {
							myScore[i][j]+=20000;
						}
						if (computerWin[k]==1) {
							computerScore[i][j]+=220;
						}else if (computerWin[k]==2) {
							computerScore[i][j]+=420;
						}else if (computerWin[k]==3) {
							computerScore[i][j]+=2100;
						}else if (computerWin[k]==4) {
							computerScore[i][j]+=40000;
						}
					}
				}
				if (myScore[i][j]>max) {
					max=myScore[i][j];
					u=i;
					v=j;
				}else if(myScore[i][j]==max){
					if (computerScore[i][j]>computerScore[u][v]) {
						u=i;
					v=j;
					}
				}
				if (computerScore[i][j]>max) {
					max=computerScore[i][j];
					u=i;
					v=j;
				}else if(computerScore[i][j]==max){
					if (myScore[i][j]>myScore[u][v]) {
						u=i;
					v=j;
					}
				}
			}
		}
	}
	oneStep(u,v,false);
	chessBoard[u][v]=2;
	for(var k = 0; k < count; k++) 
		{
			if(wins[u][v][k]) {
				computerWin[k]++;
				myWin[k] = 6;
				if(computerWin[k] == 5) 
				{
					alert("电脑赢了");
					over = true;
				}
			}
		}
		if (!over) {
			me=!me;
		}
}
