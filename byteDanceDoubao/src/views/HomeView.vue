<template>
  <div id="welcomeImg">
    <div id="mainLogo">
      <img src="@/assets/img/logo.png" width="600px" height="300px" />
    </div>
    <div id="mainBtn">
      <img src="@/assets/img/4.png" @mousedown="this.src = '@/assets/img/3.png'"
        @mouseup="this.src = '@/assets/img/4.png'" @click="showUs" />
      <img src="@/assets/img/2.png" @mousedown="this.src = '@/assets/img/1.png'"
        @mouseup="this.src = '@/assets/img/2.png'" @click="startGame()" />
    </div>
  </div>
  <div id="playImg">
    <div class="backBtn">
      <img src="@/assets/img/7.png" @mousedown="this.src = '@/assets/img/6.png'"
        @mouseup="this.src = '@/assets/img/7.png'" @click="backToMain()" />
    </div>
    <div id="words">
    </div>
    <div class="optionBtn">
    </div>
  </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
let codes = "qwertyuiopasdfghjklzxcvbnm";
let corpse = [
  "image-1725090946911.png",
  "image-1725090949588.png",
  "image-1725090953416.png",
  "image-1725090956185.png",
  "image-1725090958695.png",
  "image-1725090961083.png",
  "image-1725090963534.png",
  "image-1725090966928.gif"
]

const default_time = 15
let guihunshuzu = [];
let fenshu = 0;
let nandu = "18";
let chanshengguihun = 1000;
let yisu = 50;
let time = default_time;
let daojishiID = null
let chanshenID = null
let yidongID = null
let i = null

function showUs() {
  // alert("作者：张鑫\n" + "联系方式：18810107358\n" + "QQ：18810107358\n" + "邮箱：18810107358@163.com\n" + "地址：广东省广州市天河")
  ElMessage({
    type: 'success',
    message: `该游戏来自深圳海底不捞队:麦志轩、许贵华`,
  })
}

function startGame() {
  var welcomeImgid = document.getElementById("welcomeImg");
  welcomeImgid.style.display = "none";
  document.getElementById("playImg").style.display = "block";
  //console.debug(mainDiv.style);

  //产生倒计时div
  var daojishi = document.createElement("div");
  document.getElementById("playImg").appendChild(daojishi);
  daojishi.className = "daojishi";
  daojishi.id = "daojishi";
  daojishi.style.display = "block";
  time = time - 1;
  daojishiID = setInterval(refreshTime, 1000);
  //计时器动态产生僵尸
  chanshenID = setInterval(creatguihun, chanshengguihun);
  yidongID = setInterval(moveguihun, yisu);
}

//游戏倒计时
function refreshTime() {
  var daojishi = document.getElementById("daojishi");
  daojishi.innerHTML = time--;
  if (time < 1) {
    document.getElementById("words").innerHTML = "";

    guihunshuzu.splice(0, guihunshuzu.length);

    clearInterval(chanshenID);
    clearInterval(yidongID);
    clearInterval(daojishiID);

    //重置计时器div
    document.getElementById("daojishi").innerHTML = time;

    // alert("时间到！！！" + "\n" + "总计得分=" + fenshu);
    ElMessageBox.alert(`游戏结束！！！\n总计得分=${fenshu}`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      backToMain();
    }).catch(() => {
      backToMain();
    })
    backToMain();
  }
}

//产生僵尸方法
function creatguihun() {
  var guihunDiv = document.createElement("div");
  guihunDiv.className = "guihun";
  guihunDiv.style.background = "url(http://8.134.197.161:3000/api/images/blog/" + corpse[parseInt(Math.random() * 6)] + ")";//"url(img/corpse/c11.gif"
  console.log(guihunDiv.style.background);

  //获取屏幕高度
  var clientHeight = document.documentElement.clientHeight;
  //随机产生上边距
  guihunDiv.style.top = 10 + (Math.random() * (clientHeight - 10 - 160)) + "px";
  document.getElementById("words").appendChild(guihunDiv);
  //把产生的僵尸放入缓存
  guihunshuzu.push(guihunDiv);

  var index = parseInt(Math.random() * codes.length);
  guihunDiv.innerHTML = codes.charAt(index).toLocaleUpperCase();
}

//移动僵尸方法
function moveguihun() {
  //遍历每个僵尸
  for (i = 0; i < guihunshuzu.length; i++) {
    var guihun = guihunshuzu[i];
    var right = parseInt(guihun.style.right || 10);
    //获得屏幕宽度
    var clientWidth = document.documentElement.clientWidth;
    if (right < clientWidth - 300) {//没超过屏幕
      //guihun.style.bottom=parseInt(guihun.style.bottom.split("p",1))+10+"px";
      guihun.style.right = right + 10 + "px";
    }
    else {//僵尸即将超过屏幕
      //删除页面上的僵尸
      document.getElementById("words").removeChild(guihun);
      //删除缓存中的僵尸
      guihunshuzu.splice(i, 1);
    }
  }
}

//键盘消除僵尸
function key(e) {
  //获取键盘点击的内容
  var keyCode = e.keyCode;
  //把键盘转换成字符串
  var codeStr = String.fromCharCode(keyCode);
  //匹配键盘内容和僵尸字母
  for (i = 0; i < guihunshuzu.length; i++) {
    var guihun = guihunshuzu[i];
    var gunhunCode = guihun.innerHTML;
    //判断一样
    if (gunhunCode == codeStr) {
      fenshu++;
      //删除僵尸
      document.getElementById("words").removeChild(guihun);
      guihunshuzu.splice(i, 1);
      //跳出循环
      break;
    }
  }
}
//键盘事件启动
document.onkeydown = key;

//返回主界面
function backToMain() {
  document.getElementById("welcomeImg").style.display = "block";
  document.getElementById("playImg").style.display = "none";
  //清楚已经产生的所有僵尸
  document.getElementById("words").innerHTML = "";
  guihunshuzu.splice(0, guihunshuzu.length);

  clearInterval(chanshenID);
  clearInterval(yidongID);
  clearInterval(daojishiID);

  //重置计时器div
  document.getElementById("daojishi").innerHTML = "15";
  time = default_time;
}

//暂停菜单
function suspend() {
  //创建暂停菜单
  var zanting = document.createElement("div");
  zanting.id = "zanting";
  zanting.className = "zanting";
  zanting.style.zIndex = 9024;

  //模糊
  var mohu = document.createElement("div");
  mohu.id = "mohu";
  mohu.style.opacity = 0.40;//透明化
  //console.debug(mohu);

  document.getElementById("words").appendChild(mohu);
  document.getElementById("words").appendChild(zanting);
  document.onkeydown = "";

  //继续游戏按钮
  var jixu = document.createElement("img");
  jixu.id = "jixu";
  jixu.src = "img/37.png";
  //为继续游戏按钮添加功能
  jixu.onmousedown = function () { jixu.src = "img/36.png" }
  jixu.onmouseup = function () { jixu.src = "img/37.png" }
  jixu.onclick = function () {
    //键盘消除僵尸
    document.onkeydown = key;

    daojishiID = setInterval(refreshTime, 1000);
    //计时器动态产生僵尸
    chanshenID = setInterval(creatguihun, chanshengguihun);
    yidongID = setInterval(moveguihun, yisu);
    //删除暂停菜单div
    document.getElementById("words").removeChild(zanting);
    document.getElementById("words").removeChild(mohu);
  }

  //停止游戏按钮
  var tingzhi = document.createElement("img");
  tingzhi.id = "tingzhi";
  tingzhi.src = "img/39.png";
  //为停止按钮添加功能
  tingzhi.onmousedown = function () { tingzhi.src = "img/38.png" }
  tingzhi.onmouseup = function () { tingzhi.src = "img/39.png" }
  tingzhi.onclick = function () {
    //键盘消除僵尸
    document.onkeydown = key;

    document.getElementById("welcomeImg").style.display = "block";
    document.getElementById("playImg").style.display = "none";
    document.getElementById("words").removeChild(zanting);
    document.getElementById("words").removeChild(mohu);

    //清除已经产生的所有僵尸
    document.getElementById("words").innerHTML = "";
    guihunshuzu.splice(0, guihunshuzu.length);

    //重置计时器div
    time = default_time;
    document.getElementById("daojishi").innerHTML = time;

    //console.debug("清除计时器");
    //清除计时器
    clearInterval(chanshenID);
    clearInterval(yidongID);
    clearInterval(daojishiID);

  }

  //将继续游戏和停止按钮加到暂停菜单上
  document.getElementById("zanting").appendChild(jixu);
  document.getElementById("zanting").appendChild(tingzhi);

  //清除计时器
  clearInterval(chanshenID);
  clearInterval(yidongID);
  clearInterval(daojishiID);
}

//设置菜单
function install() {
  //创建设置菜单
  var shezhi = document.createElement("div");
  shezhi.id = "shezhi";
  shezhi.className = "shezhi";
  shezhi.style.zIndex = 9024;

  //模糊
  var mohu = document.createElement("div");
  mohu.id = "mohu";
  mohu.style.opacity = 0.40;//透明化

  document.getElementById("words").appendChild(mohu);
  document.getElementById("words").appendChild(shezhi);
  document.onkeydown = "";

  //级别
  var jibie = document.createElement("img");
  jibie.id = "jibie";
  jibie.src = "img/33.png";

  //左按钮
  var left = document.createElement("img");
  left.id = "leftBtn";
  left.src = "img/15.png";
  //为左按钮添加功能
  left.onmousedown = function () { left.src = "img/14.png" }
  left.onmouseup = function () { left.src = "img/15.png" }
  left.onclick = function () {
    if (parseInt(nandu) > 18) {
      nandu--;
      dengji.src = "img/" + nandu + ".png";
    }
  }

  //等级按钮
  var dengji = document.createElement("img");
  dengji.id = "dengji";
  dengji.src = "img/" + nandu + ".png";

  //右按钮
  var right = document.createElement("img");
  right.id = "rightBtn";
  right.src = "img/17.png";
  //为右按钮添加功能
  right.onmousedown = function () { right.src = "img/16.png" }
  right.onmouseup = function () { right.src = "img/17.png" }
  right.onclick = function () {
    if (parseInt(nandu) < 20) {
      nandu++;
      dengji.src = "img/" + nandu + ".png";
    }
  }

  //游戏时间按钮
  var youxitime = document.createElement("img");
  youxitime.id = "youxitime";
  youxitime.src = "img/34.png";

  //游戏时间文本框
  var txt = document.createElement("input");
  txt.id = "txt";
  txt.setAttribute("type", "text");

  //设置按钮
  var shezhiBtn = document.createElement("img");
  shezhiBtn.id = "shezhiBtn";
  shezhiBtn.src = "img/41.png";
  //为设置按钮添加功能
  shezhiBtn.onmousedown = function () { shezhiBtn.src = "img/40.png" }
  shezhiBtn.onmouseup = function () { shezhiBtn.src = "img/41.png" }
  shezhiBtn.onclick = function () {
    //键盘消除僵尸
    document.onkeydown = key;

    //点击设置后清空计时器div
    document.getElementById("daojishi").innerHTML = "";
    //设置游戏难度等级
    //console.debug("当前难度:"+nandu);
    switch (nandu) {
      case 18:
        chanshengguihun = 1000;
        yisu = 100;
        break;
      case 19:
        chanshengguihun = 500;
        yisu = 100;
        break;
      case 20:
        chanshengguihun = 500;
        yisu = 80;
        break;
    }
    //设置游戏时间长短
    //console.debug(document.getElementById("txt").value);
    if (document.getElementById("txt").value != 0) {
      time = document.getElementById("txt").value - 1;
    } else {
      time = 59;
    }
    document.getElementById("words").innerHTML = "";
    guihunshuzu.splice(0, guihunshuzu.length);

    //console.debug("僵尸产生速度:"+chanshengguihun);

    daojishiID = setInterval(refreshTime, 1000);
    chanshenID = setInterval(creatguihun, chanshengguihun);
    yidongID = setInterval(moveguihun, yisu);
  }

  //取消按钮
  var quxiaoBtn = document.createElement("img");
  quxiaoBtn.id = "quxiaoBtn";
  quxiaoBtn.src = "img/43.png";
  //为取消按钮添加功能
  quxiaoBtn.onmousedown = function () { quxiaoBtn.src = "img/42.png" }
  quxiaoBtn.onmouseup = function () { quxiaoBtn.src = "img/43.png" }
  quxiaoBtn.onclick = function () {
    daojishiID = setInterval(refreshTime, 1000);
    //计时器动态产生僵尸
    chanshenID = setInterval(creatguihun, chanshengguihun);
    yidongID = setInterval(moveguihun, yisu);
    //删除设置菜单div
    document.getElementById("words").removeChild(shezhi);
    document.getElementById("words").removeChild(mohu);
  }

  document.getElementById("shezhi").appendChild(jibie);
  document.getElementById("shezhi").appendChild(left);
  document.getElementById("shezhi").appendChild(dengji);
  document.getElementById("shezhi").appendChild(right);
  document.getElementById("shezhi").appendChild(youxitime);
  document.getElementById("shezhi").appendChild(txt);
  document.getElementById("shezhi").appendChild(shezhiBtn);
  document.getElementById("shezhi").appendChild(quxiaoBtn);

  //清除计时器
  clearInterval(chanshenID);
  clearInterval(yidongID);
  clearInterval(daojishiID);
}
</script>
<style>
/* 帮我引入 mycss 文件 */
@import "@/assets/css/mycss.css";

</style>