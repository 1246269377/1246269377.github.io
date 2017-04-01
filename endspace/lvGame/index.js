//var next=document.getElementById("next");
//var page=1;
//
//next.onclick=function(){
//	if(page==1){
//		document.getElementById("page-01").style.display="none";
//	    document.getElementById("page-02").style.display="block";
//	    page=2;
//	}else if(page==2){
//		document.getElementById("page-01").style.display="block";
//	    document.getElementById("page-02").style.display="none";
//	    page=1;
//	}
//	
//};
var userLeve = null; //玩家等级
var userAtt = null; //玩家攻击
var userDef = null; //玩家防御
var userExp = null; //玩家当前经验值
var userMaxexp = null; //玩家最大经验值
var adminHp = null; //怪物生命值
var adminAtt = null; //怪物攻击
var adminDef = null; //怪物防御
var userMaxhp = null; //玩家最大生命值
var userHp = null; //玩家当前生命值

LvGameRead(); //自动读取数据
setInterval(LvGameSave, 30) //自动保存数据

document.getElementById("searchAdmin").onclick = function() {
	searchAdmin();
}
document.getElementById("killAdmin").onclick = function() {
	killAdmin();
}
document.getElementById("clearAll").onclick = function() {
	localStorage.clear();
	userLeve = document.getElementById("userLeve").innerText = 1;
	userAtt = document.getElementById("userAtt").innerText = 100;
	userDef = document.getElementById("userDef").innerText =7;
	userExp = document.getElementById("userExp").innerText =0;
	userMaxexp = document.getElementById("userMaxexp").innerText = 10;
	userMaxhp = 100;
	userHp = document.getElementById("userHp").innerText = userMaxhp;
}

function killAdmin() { //攻击怪物方法
	if(adminHp <= 0) {
		return;
	}
	var userGetkill = adminAtt - userDef;
	var adminGetkill = userAtt - adminDef;
	if(userGetkill >= 0) {
		userHp = userHp - userGetkill;
	}
	if(adminGetkill >= 0) {
		adminHp = adminHp - adminGetkill;
		if(adminHp <= 0) {
			adminHp = 0;
			document.getElementById("adminHp").innerText = adminHp;
		}
	}
	document.getElementById("userHp").innerText = userHp;
	document.getElementById("adminHp").innerText = adminHp;
	if(userHp <= 0) {
		alert("you are die!");
		userHp = userMaxhp;
		userExp = 0;
		document.getElementById("userExp").innerText = userExp;
		document.getElementById("userHp").innerText = userHp;
	} else if(adminHp <= 0) {
		userHp = userMaxhp;
		userExp += 5;
		document.getElementById("userExp").innerText = userExp;
		document.getElementById("userHp").innerText = userHp;
		if(userExp >= userMaxexp) {
			userLeveup();
		}
	}
}

function userLeveup() { //等级提升方法
	userLeve += 1; //刷新等级
	userMaxhp = Math.round(userMaxhp * 1.2); //刷新最大生命值
	userAtt = Math.round(userAtt * 1.2); //刷新玩家攻击
	userDef = Math.round(userDef * 1.1); //刷新玩家防御
	userMaxexp = Math.round(userMaxexp * 1.2); //刷新最大经验值
	userHp = userMaxhp; //刷新玩家血量
	userExp = 0; //经验清空
	document.getElementById("userLeve").innerText = userLeve;
	document.getElementById("userHp").innerText = userHp;
	document.getElementById("userAtt").innerText = userAtt;
	document.getElementById("userDef").innerText = userDef;
	document.getElementById("userMaxexp").innerText = userMaxexp;
	document.getElementById("userExp").innerText = userExp;
}

function searchAdmin() { //寻找怪物方法
	document.getElementById("adminPage").style.display = "block";
	userHp = userMaxhp;
	document.getElementById("userHp").innerText = userHp; //搜索时刷新生命值
	adminHp = Math.round(Math.random() * 100 + 50);
	adminAtt = Math.round(Math.random() * 10 + 5);
	adminDef = Math.round(Math.random() * 7 + 5);
	document.getElementById("adminHp").innerText = adminHp;
	document.getElementById("adminAtt").innerText = adminAtt;
	document.getElementById("adminDef").innerText = adminDef;
}

//var conn = new ActiveXObject("ADODB.Connection");
//conn.Open("Provider=SQLOLEDB.1; Data Source=localhost; User ID=sa; "
//  +"Password=password; Initial Catalog=meizz");
//
//var rs = new ActiveXObject("ADODB.Recordset");
//var sql="select user_kind from tbRightSet where user_id='"+ Account +"'";
//
//rs.open(sql, conn);
//if (!rs.EOF)
//{
//  sysUserKind = (rs("user_kind")+"").replace(/^\s+|\s+$/, "");
//}
//rs.close(); rs = null; conn.close(); conn = null;