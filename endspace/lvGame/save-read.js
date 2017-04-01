function LvGameSave(){
	localStorage.setItem("userLeve",userLeve);
	localStorage.setItem("userAtt",userAtt);
	localStorage.setItem("userDef",userDef);
	localStorage.setItem("userExp",userExp);
	localStorage.setItem("userMaxexp",userMaxexp);
	localStorage.setItem("userMaxhp",userMaxhp);
}

function LvGameRead(){
	if (localStorage.length>0) {
		 userLeve=document.getElementById("userLeve").innerText=parseInt(localStorage.getItem("userLeve"));
         userAtt = document.getElementById("userAtt").innerText=parseInt(localStorage.getItem("userAtt"));
         userDef = document.getElementById("userDef").innerText=parseInt(localStorage.getItem("userDef"));
         userExp =document.getElementById("userExp").innerText=parseInt(localStorage.getItem("userExp"));
         userMaxexp =document.getElementById("userMaxexp").innerText=parseInt(localStorage.getItem("userMaxexp"));
	     userMaxhp=parseInt(localStorage.getItem("userMaxhp"));
	     userHp = document.getElementById("userHp").innerText=userMaxhp;
	}else{
		 userHp = parseInt(document.getElementById("userHp").innerText);
         userMaxhp = userHp;
         userAtt = parseInt(document.getElementById("userAtt").innerText);
         userDef = parseInt(document.getElementById("userDef").innerText); 
         userLeve = parseInt(document.getElementById("userLeve").innerText);
         userExp = parseInt(document.getElementById("userExp").innerText);
         userMaxexp = parseInt(document.getElementById("userMaxexp").innerText);
	}
}
