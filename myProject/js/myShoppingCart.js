document.addEventListener("DOMContentLoaded",function(){
var itemList=document.querySelector('#yourItem .itemList');

//cookie信息： 商品ID、颜色、尺寸、数量
//获取cookie，渲染加入购物车的商品信息
var storage=window.localStorage;
var cartArr=[];
if(storage.cartStr){
	cartArr=JSON.parse(storage.cartStr);
	renderItemList(cartArr);
}else{
	itemList.innerHTML="null";
}
//初始化渲染购物车商品列表
function renderItemList(cookieArr){
	var str='';
	for(var i=0;i<cookieArr.length;i++){
		var idx=0;
		for(var j=0;j<productsArr.length;j++){
			if(cookieArr[i].id==productsArr[j].id){
				idx=j;
			}
		}
		var origiPrice=productsArr[idx].price;
		var singelPrice=productsArr[idx].price*productsArr[idx].discout/10;
		var totalPrice=(singelPrice*cookieArr[i].qty).toFixed(2);
		var saveMoney=(origiPrice*cookieArr[i].qty-totalPrice).toFixed(2);
		str+=`<tr>
					<td>
						<img src="${productsArr[idx]['imgsrc'][0]}">
					</td>
					<td>
						<h6>${productsArr[idx].descript}</h6>
						<p>ID:#${productsArr[idx].id}</p>
						<p>Size: ${cookieArr[i].size}</p>
					</td>
					<td>
						<p>
							<i>-</i><input type="text" value="${cookieArr[i].qty}"><i>+</i>
						</p>
					</td>
					<td>
						<p><span class="oriPri">${origiPrice}</span> py6.</p>
						<span><span class="sinPri">${singelPrice}</span> py6.</span>
					</td>
					<td>
						<p><span class="totPri">${totalPrice}</span> py6.</p>
						<span>You save <span class="savMon">${saveMoney}</span> py6.</span>
					</td>
					<td>
						<i class="delBtn"></i>
					</td>
				</tr>`;
	}
	itemList.innerHTML=str;
}

//点击数量增删按钮
delAndAddBtn();
function delAndAddBtn(){
	var lessBtn=document.querySelectorAll('#yourItem tr td:nth-child(3) p i:first-child');
	var moreBtn=document.querySelectorAll('#yourItem tr td:nth-child(3) p i:last-child');
	var qtyInput=document.querySelectorAll('#yourItem tr td:nth-child(3) input');
	for(let i=0;i<lessBtn.length;i++){
		//减少按钮的功能
		lessBtn[i].onclick=function(){
			if(qtyInput[i].value>1){
				qtyInput[i].value-=1;
			}
			respondChange();
		}
		lessBtn[i].onselectstart=function(){
			return false;
		}
		//增加按钮的功能
		moreBtn[i].onclick=function(){
			if(qtyInput[i].value<99){
				qtyInput[i].value=parseInt(qtyInput[i].value)+1;
			}
			respondChange();
		}
		moreBtn[i].onselectstart=function(){
			return false;
		}
		//规定输入框只能使用数字
		qtyInput[i].oninput=function(){
			if(typeof qtyInput[i].value !="number"){
				qtyInput[i].value=1;
			}
		}
	}
}

//页面数据响应函数
respondChange();
function respondChange(){
	var qtyInput=document.querySelectorAll('#yourItem tr td:nth-child(3) input');
	var oriPri=document.querySelectorAll('#yourItem .oriPri');
	var sinPri=document.querySelectorAll('#yourItem .sinPri');
	var totPri=document.querySelectorAll('#yourItem .totPri');
	var savMon=document.querySelectorAll('#yourItem .savMon');
	var totPriCart=document.querySelector('#yourItem .cartTotal .right .totalPriceCart');
	var savePriCart=document.querySelector('#yourItem .cartTotal .right .savePriCart');
	//单商品的响应数据
	for(var j=0;j<totPri.length;j++){
		totPri[j].innerText=(sinPri[j].innerText*qtyInput[j].value).toFixed(2);
		savMon[j].innerText=((oriPri[j].innerText-sinPri[j].innerText)*qtyInput[j].value).toFixed(2);
	}
	//购物车总价的响应数据
	totPriCart.innerText=sum(totPri);
	savePriCart.innerText=sum(savMon);
	function sum(arr){
		var total=0;
		for(var i=0;i<arr.length;i++){
			total+=parseFloat(arr[i].innerText);
		}
		return total.toFixed(2);
	}
}

//购物车商品删除功能
itemList.onclick=function(e){
	e=e||event;
	if(e.target.className=='delBtn'){
		var tr=e.target.parentNode.parentNode;
		itemList.children[0].removeChild(tr);
	}
	respondChange();
}















//绑定全局事件的底部,在以上书写代码
})