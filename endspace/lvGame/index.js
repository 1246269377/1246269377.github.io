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
var userHp = parseInt(document.getElementById("userHp").innerHTML); //玩家血量
var userMaxhp = userHp; //玩家最大血量 
var userAtt = parseInt(document.getElementById("userAtt").innerHTML); //玩家攻击
var userDef = parseInt(document.getElementById("userDef").innerHTML); //玩家防御
var userLeve = parseInt(document.getElementById("userLeve").innerHTML);
var userExp = parseInt(document.getElementById("userExp").innerHTML);
var userMaxexp = parseInt(document.getElementById("userMaxexp").innerHTML);

var adminHp = parseInt(document.getElementById("adminHp").innerHTML); //怪物血量
var adminAtt = parseInt(document.getElementById("adminAtt").innerHTML); //怪物攻击
var adminDef = parseInt(document.getElementById("adminDef").innerHTML); //怪物防御

document.getElementById("searchAdmin").onclick = function() {
	searchAdmin();
}
document.getElementById("killAdmin").onclick = function() {
	killAdmin();
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
			document.getElementById("adminHp").innerHTML = adminHp;
		}
	}
	document.getElementById("userHp").innerHTML = userHp;
	document.getElementById("adminHp").innerHTML = adminHp;
	if(userHp <= 0) {
		alert("you are die!");
		userHp = userMaxhp;
		userExp = 0;
		document.getElementById("userExp").innerHTML = userExp;
		document.getElementById("userHp").innerHTML = userHp;
	} else if(adminHp <= 0) {
		userHp = userMaxhp;
		userExp += 5;
		document.getElementById("userExp").innerHTML = userExp;
		document.getElementById("userHp").innerHTML = userHp;
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
	document.getElementById("userLeve").innerHTML = userLeve;
	document.getElementById("userHp").innerHTML = userHp;
	document.getElementById("userAtt").innerHTML = userAtt;
	document.getElementById("userDef").innerHTML = userDef;
	document.getElementById("userMaxexp").innerHTML = userMaxexp;
	document.getElementById("userExp").innerHTML = userExp;
}

function searchAdmin() { //寻找怪物方法
	document.getElementById("adminPage").style.display = "block";
	userHp = userMaxhp;
	document.getElementById("userHp").innerHTML = userHp; //搜索时刷新生命值
	adminHp = Math.round(Math.random() * 100 + 50);
	adminAtt = Math.round(Math.random() * 10 + 5);
	adminDef = Math.round(Math.random() * 7 + 5);
	document.getElementById("adminHp").innerHTML = adminHp;
	document.getElementById("adminAtt").innerHTML = adminAtt;
	document.getElementById("adminDef").innerHTML = adminDef;
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