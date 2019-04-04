document.addEventListener("DOMContentLoaded",function(){

window.scrollTo(0,0);
ratingAndReviewMode();
/*评论区域*/
function ratingAndReviewMode(){
	var reviewDatebase=[{
		score:3,
		myName:"Test",
		review:"Very nice the casual shirt, is equal to the photo on the web, arrived on time, in excellent condition, I recommend, negtive: no trademark",
		time:"07/11/2012"
	},{
		score:4,
		myName:"Test",
		review:"Very nice the casual shirt, is equal to the photo on the web, arrived on time, in excellent condition, I recommend, negtive: no trademark",
		time:"07/11/2012"
	},{
		score:5,
		myName:"Test",
		review:"Very nice the casual shirt, is equal to the photo on the web, arrived on time, in excellent condition, I recommend, negtive: no trademark",
		time:"07/11/2012"
	}];
	var randomNum=document.getElementById("randomNum");
	var subBtn=document.getElementById("subBtn");
	var subReviewForm=document.getElementById("subReviewForm");
	var filterWords="傻逼,SB,尼玛,妈的,操你妈,狗日的,bitch,fuck,混蛋";
	levelScore();
	getVertifyCode();
	randomNum.onclick=function(){
		getVertifyCode();
	}
	subBtn.onclick=function(){
		var arr=document.querySelectorAll('[checkNum="detailPage"]');
		if(arr[0].value!==arr[1].value){
			alert("验证码输入错误");
			arr[0].value="";
			getVertifyCode();
			return false;
		}else{
			var levelArr=document.querySelectorAll('[name="myScore"]');
			var myname=document.querySelectorAll('[name="myName"]');
			var myReview=document.getElementById("myReview");
			var obj={};
			var date=new Date();
			var years=date.getFullYear();
			var months=date.getMonth()+1;
			var days=date.getDate();
			var filterArr=filterWords.split(",");
			for(var i=0;i<filterArr.length;i++){
                var reg=new RegExp(filterArr[i],"gi");
                myReview.value=myReview.value.replace(reg,"good");
            }
			obj.score=Number(levelArr[0].value);
			obj.myName=myname[0].value;
			obj.review=myReview.value;
			obj.time=days+"/"+months+"/"+years;
			reviewDatebase.unshift(obj);
			myReview.value="";
			arr[0].value="";
			getVertifyCode();
			renderReviewBox(reviewDatebase);
			renderAverageBox(reviewDatebase);
			alert("评论成功！");
			window.scrollTo(0,1400);
		}
	}
	renderAverageBox(reviewDatebase);
	renderReviewBox(reviewDatebase);
	function getVertifyCode(){
		var str="0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
		var newStr="";
		for(var i=0;i<4;i++){
			newStr+=str.charAt(parseInt(Math.random()*str.length));
		}
		randomNum.value=newStr;
	}
	function levelScore(){
		var subReview_level=document.getElementById("subReview_level");
		var levelArr=document.querySelectorAll('[name="myScore"]');
		var arr=[];
		for(var i=0;i<5;i++){
			var li=document.createElement("li");
			li.classList.add(i);
			arr.push(li);
			subReview_level.appendChild(li);
			arr[i].onclick=function(){
				this.parentNode.style.backgroundPosition="-"+(4-this.className)*28+"px -30px";
				levelArr[0].value=parseInt(this.className)+1;
			}
		}
	}
	function renderAverageBox(arr){
		// var averageBox=document.getElementById("averageBox");
		var reviewTotal=document.getElementsByClassName("reviewTotal");
		var totalBar=document.getElementsByClassName("totalBar");
		var totalNum=document.getElementsByClassName("totalNum");
		reviewTotal[0].innerHTML=arr.length;
		var totalNumArr=[0,0,0,0,0];
		for(var j=0;j<arr.length;j++){
			switch(arr[j].score){
				case 5:
					totalNumArr[0]++;
					break;
				case 4:
					totalNumArr[1]++;
					break;
				case 3:
					totalNumArr[2]++;
					break;
				case 2:
					totalNumArr[3]++;
					break;
				case 1:
					totalNumArr[4]++;
					break;
			}
		}
		for(var i=0;i<totalNum.length;i++){
			totalNum[i].innerHTML=totalNumArr[i];
			totalBar[i].style.width=parseInt(totalNumArr[i]*100/totalNumArr.length)+"%";
		}
	}
	function renderReviewBox(arr){
		var reviewBox=document.getElementById("reviewBox");
		var str="";
		for(var i=0;i<arr.length;i++){
			var {score,time,myName,review}=arr[i];
			str+=`<li class="clearfix">
					<ul class="view_l">
						<li style="background-position:-${(5-score)*16}px -60px;"></li>
						<li>${time}</li>
						<li>${myName}</li>
						<li class="last">
							<i class="good"></i><span>(0)</span>
							<i class="bad"></i><span>(0)</span>
						</li>
					</ul>
					<div class="view_r">
						<p>${review}</p>
						<img src="../images/product3_5.jpg">
						<p><i></i>Thank you for rating</p>
					</div>
				</li>`;
		}
		reviewBox.innerHTML=str;
	}
}
/*渲染商品详情信息及相关交互功能*/ 
var idx=0;
renderProduct();
function renderProduct(){
	var bigimg=document.querySelector(".bigimg");
	var productImg=document.getElementsByClassName("productImg");
	var priceList=document.querySelectorAll(".price");
	var proDescript=document.getElementById("proDescript");
	var our_price=document.getElementById("our_price");
	var halfPrice=document.querySelector("#halfPrice");
	var sizeUl=document.querySelector("#sizeUl");
	var colorUl=document.querySelector("#colorUl");
	var preprice=document.querySelector("#preprice");
	var str=location.hash;
	arr=str.slice(1).split("=");
	//获取商品索引
	productsArr.some(function(item,idenx){
		idx=idenx;
		return arr[1]==item.id;
	})
	//渲染小图
	productImg[0].innerHTML=productsArr[idx]["imgsrc"].map(function(item,idenx){
		return '<li class="smallimgList"><img src="'+item+'"></li>'
	}).join("");
	//渲染大图
	bigimg.innerHTML='<img src="'+productsArr[idx]["imgsrc"][0]+'">';
	//渲染商品描述&标题
	proDescript.innerHTML=productsArr[idx]["descript"]+'<span>SKU:V41332</span>';
	//渲染商品表格里的价格
	for(var i=0;i<priceList.length;i++){
		priceList[i].innerHTML='$'+(productsArr[idx]["price"]*(Math.pow(0.9,i))).toFixed(2);
	}
	//我们的价格
	our_price.innerHTML=priceList[0].innerHTML.slice(1);
	//半价
	halfPrice.innerHTML=(priceList[0].innerHTML.slice(1) * 0.5).toFixed(2);
	//尺码列表
	sizeUl.innerHTML=productsArr[idx]["size"].map(function(item,idenx){
		return '<li class="sizeList"><span>'+item+'</span><i></i></li>'
	}).join("");
	//颜色列表
	colorUl.innerHTML=productsArr[idx]["color"].map(function(item,idenx){
		return '<li class="colorList"><span>'+item+'</span><i></i></li>'
	}).join("");
	
	//根据数量判断打折力度，并计算总价
	qtyAndTotalPrice();
	function qtyAndTotalPrice(){
		var qty = document.getElementById("qty");
		var qty2 = document.getElementById("qty2");
		var zhongjia = document.getElementById("zhongjia");
		var preprice = document.getElementById("preprice");
		fprice();
		qty.oninput=fprice;
		function fprice(){
			var _qty = qty.value;
			var ourP=our_price.innerHTML;
			preprice.innerHTML=our_price.innerHTML;
			if(_qty>=5 && _qty<10){
				preprice.innerHTML=(ourP*Math.pow(0.9,1)).toFixed(2);
			}else if(_qty>=10 && _qty<20){
				preprice.innerHTML=(ourP*Math.pow(0.9,2)).toFixed(2);
			}else if(_qty>=20){
				preprice.innerHTML=(ourP*Math.pow(0.9,3)).toFixed(2);
			}
			if(_qty >= 1){
				qty2.innerHTML = _qty;
			}else if(_qty <= 1){
				qty.value=1;
				qty2.innerHTML = 1;
			}
			zhongjia .innerHTML = parseInt(qty2.innerHTML*preprice.innerHTML);
		}
	}
}
/*商品图的点击与切换*/
clickProductImg();
function clickProductImg(){
	var bigimg=document.getElementsByClassName("bigimg");
	var smallimgList=document.getElementsByClassName("smallimgList");
	for(var i=0;i<smallimgList.length;i++){
		smallimgList[i].onclick=function(){
			bigimg[0].innerHTML=this.innerHTML;
		}
	}
}
/*商品颜色与尺码的选择*/
 colorAndSizeChoose();
function colorAndSizeChoose(){
	var sizeList=document.querySelectorAll(".sizeList");
	var colorList=document.querySelectorAll(".colorList");
	productChoose(sizeList);
	productChoose(colorList);
	function productChoose(arr){
		for(var i=0;i<arr.length;i++){
			arr[i].onclick=function(){
				for(var j=0;j<arr.length;j++){
					arr[j].children[0].classList.remove('active');
					arr[j].children[1].style.background="none";
					arr[j].style.borderColor="black";
				}
				this.children[1].style.background='url(../images/spirit3.fw.png) no-repeat 0 -40px';
				this.style.border="1px solid #FF4500";
				this.children[0].classList.add('active');
			}
		}
	}
}

//商品详情页面，点击'加入购物车'后，
//获取商品id、color、size、qty、生成对象存储当前信息
var addToCart=document.querySelector("#introduce .addcar .car");
var i=0;
addToCart.onclick=function(e){
	e=e||window.event;
	var targetH=0-e.pageY-40;
	var colored=document.querySelector("#introduce #colorUl .active");
	var sized=document.querySelector("#introduce #sizeUl .active");
	var qty=document.querySelector("#qty");
	//读取本地存储购物车数据,若不存在则创建
	var storage=window.localStorage;
	var cartArr=[];
	if(storage.cartStr){
		cartArr=JSON.parse(storage.cartStr);
	}
	if(colored && sized){
		//判断是否有相同尺码颜色商品在购物车
		var flag=cartArr.some(function(item,index){
			i=index;
			return item.id==productsArr[idx].id && item.color==colored.innerText && item.size==sized.innerText;
		})
		if(flag){
			cartArr[i].qty=qty.value*1+cartArr[i].qty*1;
		}else{
			var obj={};
			obj.id=productsArr[idx].id;
			obj.color=colored.innerText;
			obj.size=sized.innerText;
			obj.qty=qty.value;
			obj.imgsrc=productsArr[idx].imgsrc[0];
			obj.descript=productsArr[idx].descript;
			obj.price=productsArr[idx].price;
			obj.discout=productsArr[idx].discout;
			cartArr.unshift(obj);
		}
		window.localStorage.cartStr=JSON.stringify(cartArr);
		flyToCartMotion(targetH)
	}
	CommonObj.renderShippingCart();
	addToCart.onselectstart=function(){return false;}
}
//点击'加入购物车'后，生成图片，飞入购物车，删除图片
function flyToCartMotion(targetH){
	var img=document.createElement("img");
	img.src=productsArr[idx].imgsrc[0];
	img.style.width='100px';
	img.style.position='absolute';
	img.style.left=0;
	img.style.top=0;
	img.style.zIndex=9999;
	addToCart.appendChild(img);
	bufferMotion(img,{width:0,left:100,top:targetH,padding:0,opacity:0.5},100,deleteImg);
	function deleteImg(){
		addToCart.removeChild(img);
	}
}














//文档底部
})