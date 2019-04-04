
//随机数======================================================
function getRandomNum(a,b,coverB){
	var randomNum=Math.floor((Math.random()*(b-a))+a);
	if(coverB){
		return randomNum+1;
	}else{
		return randomNum;
	}
}

//随机色=======================================================
function getRandomColor(){
	var color1=getRandomNum(0,255,true);
	var color2=getRandomNum(0,255,true);
	var color3=getRandomNum(0,255,true);
	return `rgb(${color1},${color2},${color3})`;
}




//圆周运动=====================================================
				//sun:中心父元素          earth:圆周运动的子元素  R:运动半径
				//speed:运动速度(1 deg)   timer:定时器速度
function circleMotion(sun,earth,R,speed,timer){
	var Deg=0;
	var x=(sun.offsetWidth-earth.offsetWidth)/2;
	var y=(sun.offsetHeight-earth.offsetHeight)/2;
	setInterval(function(){
		Deg+=speed;
		var Left=x+R*Math.sin(Deg*Math.PI/180);
		var Top=y-R*Math.cos(Deg*Math.PI/180);
		earth.style.top=Top+'px';
		earth.style.left=Left+'px';
	},timer)
}

//匀速运动
function uniformMotion(ele,obj,timer,a,fn){
	var count=0;
	for(var key in obj){
		var target=obj[key];
		count++;
		motion(key,target);
	}
	function motion(key,target){
		clearInterval(ele[key+'timer']);
		key=="opacity"?target*=100:target;
		var current=window.getComputedStyle(ele)[key];
		key=="opacity"?current*=100:current;
		var unit=(current+'').match(/[a-z]+/);
		unit=unit?unit:"";
		current=parseFloat(current);
		var speed=(target-current)/Math.abs(target-current)*a;
		ele[key+'timer']=setInterval(function(){
			current+=speed;
			if(Math.abs(current-target)<a){
				count--;
				current=target;
				clearInterval(ele[key+'timer']);
			}
			key=="opacity"?current/=100:current;
			ele.style[key]=current+unit;
			if(count==0){
				typeof fn=="function"?fn():fn;
			}
		},timer)
	}
}

//缓冲运动======================================================
						//  ele:运动元素    obj:{width:200,opacity:0.8}
						//timer:动画快慢	    fn:回调函数
function bufferMotion(ele,obj,timer,fn){
	var count=0;
	for(var key in obj){
		var target=obj[key];
		count++;
		motion(key,target);
	}
	function motion(key,target){
		key=="opacity"?target*=100:target;
		clearInterval(ele[key+'timer']);
		ele[key+'timer']=setInterval(function(){
			var current=window.getComputedStyle(ele)[key];
			key=="opacity"?current*=100:current;
			var unit=(current+'').match(/[a-z]+/);
			unit=unit?unit:"";
			current=parseFloat(current);
			current+=(target-current)/10;
			if(Math.abs(current-target)<0.5){
				count--;
				current=target;
				clearInterval(ele[key+'timer']);
			}
			key=="opacity"?current/=100:current;
			ele.style[key]=current+unit;
			if(count==0){
				typeof fn=="function"?fn():fn;
			}
		},timer)
	}
}

//轮播图====================缓冲=====================
						// arr=['#box','#box ul','#box ul li'];
						// btn='#box .btnBox .btn';
						// dotted='#box .dottedUl li';
						// slideShow(arr,btn,dotted);
function slideShow(arr,btn,dotted){
	var box=document.querySelector(arr[0]);
	var ulBox=document.querySelector(arr[1]);
	var items=document.querySelectorAll(arr[2]);
	var len=items.length;
	var imgW=items[0].offsetWidth;
	var i=0;
	box.timer=setInterval(function(){i++;showPic();},2000);
	//显示区域,鼠标移入、移出事件绑定
	box.onmouseover=()=>{clearInterval(box.timer);}
	box.onmouseout=()=>{box.timer=setInterval(function(){i++;showPic();},2000);}
	//左右按钮判断+事件绑定============================
	if(btn){
		var btns=document.querySelectorAll(btn);
		btns[0].onclick=function(e){i--;showPic();}
		btns[1].onclick=function(e){i++;showPic();}
	}
	//圆点判断+事件绑定===============================
	if(dotted){
		var dottedArr=document.querySelectorAll(dotted);
		for(var k=0;k<dottedArr.length;k++){
			dottedArr[k].idx=k;
			dottedArr[k].onclick=function(e){i=this.idx;showPic();}
		}
	}
	function showPic(){
		if(i==len){i=1;ulBox.style.left=0;}
		else if(i==-1){i=len-2;ulBox.style.left=(1-len)*imgW+'px';}
		for(var j=0;j<dottedArr.length;j++){
			dottedArr[j].classList.remove('active');
		}
		if(i==len-1){dottedArr[0].classList.add('active');
		}else{dottedArr[i].classList.add('active');}
		bufferMotion(ulBox,{left:-i*imgW},10);
	}
}

//时间对象
var my={
	//传参即设置时间对象,不传参获取当前时间对象
	nowTime:function(time){
		var obj={};
		var date=new Date();
		if(time){date=new Date(time);};
		var brr=['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];
		obj.years=date.getFullYear();
		obj.months=date.getMonth()+1;
		obj.dates=date.getDate();
		obj.days=brr[date.getDay()];
		obj.hours=date.getHours();
		obj.minutes=date.getMinutes();
		obj.seconds=date.getSeconds();
		obj.time=date.getTime();//与纪元时间的秒数

		var arr=[];
		var dateArr=String(date).split(" ");
		arr[0]=dateArr[3];
		arr[1]=date.getMonth()+1;
		arr[1]=arr[1]>=10?arr[1]:'0'+arr[1];
		arr[2]=dateArr[2];
		obj.fullTime=arr.join("-")+' '+dateArr[4];
		return obj;
	},
	
}


var Cookie={
	setCookie:function(name,value,date,path){
		var str=`${name}=${value}`;
		if(date){
			str+=`; expires=${new Date(date).toUTCString()}`;
		}
		if(path){
			str+=`; path=${path}`;
		}
		document.cookie=str;
	},
	getCookie:function(name){
		var arr=document.cookie.split('; ');
		var res='';
		arr.forEach(function(item){
			var brr=item.split('=');
			if(brr[0]==name){
				res=brr[1];
			}
		})
		return res;
	},
	removeCookie:function(name,path){
		var d=new Date();
		d.setDate(d.getDate()-1);
		this.setCookie(name,this.getCookie(name),d,path);
	}
}








