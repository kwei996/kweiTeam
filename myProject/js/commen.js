document.addEventListener("DOMContentLoaded",function(){
	// 公共导航栏点击功能
	CommonObj.mainNav();
	//渲染购物车
	CommonObj.renderShippingCart();
	//吸顶菜单及客服
	CommonObj.fixTopAndToTop()
})
var CommonObj={};
//渲染购物车函数
CommonObj.renderShippingCart=function(){
	var shopCart=document.querySelector('#shopCart');
	var below=document.querySelector('#shopCart .below');
	var storage=window.localStorage;
	//判断本地存储是否有购物车商品数据,有则渲染,没有则提示为空
	if(storage.cartStr){
		var cartArr=JSON.parse(storage.cartStr);
		hasGoods(cartArr);
	}else{
		noGoods();
	}
	var checkOut=document.querySelector(".checkOut");
	checkOut.onclick=function(){
		location.href="myShoppingCart.html";
	}
	function hasGoods(arr){
		var str='<ul>';
		var totalPrice=0;
		arr.forEach(function(item){
			var price=(item.price*item.discout/10).toFixed(2);
			totalPrice+=price*item.qty;
			str+=`
				<li class="clearfix">
					<img src="${item.imgsrc}">
					<p><a href="#">${item.descript.slice(0,20)}<br>
					Color:${item.color}-Size:${item.size}</a><br>
					<span>$${price}x${item.qty}</span></p>
				</li>`
		})
		str+=`</ul>
			<p>Subtotal: <span>$${totalPrice.toFixed(2)}</span></p>
			<input type="button" value="Checkout" class="checkOut">`
		below.innerHTML=str;
	}
	function noGoods(){
		below.innerHTML=`<p>Subtotal: <span>$0</span></p>
			<input type="button" value="Checkout" class="checkOut">`;
	}
}
// 公共导航栏点击功能函数
CommonObj.mainNav=function(){
	var allLists=document.getElementById("all_lists");
	var tab1Tab1=document.getElementById("tab1_tab1");
	var allListsBtn=false;
	allLists.onclick=function(){
		if(allListsBtn){
			tab1Tab1.style.display="none";
			allListsBtn=false;
		}else{
			tab1Tab1.style.display="block";
			allListsBtn=true;
		}
	}
}
//吸顶菜单及客服函数
CommonObj.fixTopAndToTop=function(){
	var headerBelow=document.getElementById('header_below');
	var headerT=headerBelow.offsetTop;
	var toTopBtn = document.getElementsByClassName("toTopBtn")[0];
	var checkOut=document.querySelector(".checkOut");
	checkOut.onclick=function(){
		location.href="myShoppingCart.html";
	}
	window.onscroll=function(){
		fixTop();
	}
	function fixTop(){
		var scrollT =document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		if(scrollT>headerT){
			headerBelow.style.position="fixed";
			headerBelow.style.left = 0;
			headerBelow.style.top = 0;
			headerBelow.style.zIndex=99999;

		}else{
			headerBelow.style.position="";
		}
	}
	toTopBtn.onselectstart=function(){
		return false;
	}
	toTopBtn.onclick = function(){
		clearInterval(toTopBtn.timer);
		var scr = document.documentElement.scrollTop || document.body.scrollTop ||document.pageYOffset;
		if(scr>0){
			toTopBtn.timer = setInterval(moveToTop,10);
		}
		function moveToTop(){
			scr=scr*9/10;
			if(scr<=0.5){
				clearInterval(toTopBtn.timer);
				window.scrollTo(0,0);
			}else{
				window.scrollTo(0,scr);
			}
		}
	}
}





