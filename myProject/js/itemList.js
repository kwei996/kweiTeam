document.addEventListener("DOMContentLoaded",function(){
	var list_l = document.getElementById("list_l");
	var list_r = document.getElementById("list_r");
	var timeBtn = document.getElementById("Times");
	var priceBtn = document.getElementById("Price");
	timeBtn.flag=true;
	priceBtn.flag=true;
	var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && (xhr.status==200||xhr.status==304)){
				var productsArr = JSON.parse(xhr.responseText);
				console.log(productsArr)
				// 事件排序按钮，绑定事件
				timeBtn.onclick = function(){
				    sortProduct(productsArr,"time",timeBtn.flag);
			        renderProducts(productsArr,productsArr.length,list_r);
			        timeBtn.flag=!timeBtn.flag;
				}
				//价格排序按钮，绑定事件
				priceBtn.onclick = function(){
					sortProduct(productsArr,"price",priceBtn.flag);
			        renderProducts(productsArr,productsArr.length,list_r);
			        priceBtn.flag=!priceBtn.flag;
				}
				//商品排序函数
				function sortProduct(arr,type,flag){
			        arr.sort(function(a,b){
			        	if(type=="time"){
			        		if(flag){
			        			return Date.parse(a[type])-Date.parse(b[type]);
			        		}else{
			        			return Date.parse(b[type])-Date.parse(a[type]);
			        		}
			        	}else{
				        	if(flag){
				        		return a[type]-b[type];
				        	}else{
				        		return b[type]-a[type];
				        	}
			        	}
			        })
				}
				//渲染主要商品列表
				renderProducts(productsArr,productsArr.length,list_r);
				//渲染左侧推荐商品列表
				renderProducts(productsArr,3,list_l);
				//渲染商品函数
				function renderProducts(arr,len,DOM){
					var str='';
					for(var i=0;i<len;i++){
						if(len<arr.length){
							i=parseInt(Math.random()*arr.length);
						}
						var {id,imgsrc,descript,price,discout}=arr[i];
						var imgsrc = imgsrc.split(",");
						var discoutPrice=(price*discout/10).toFixed(2);
						var savePrice=(price-discoutPrice).toFixed(2);
						str+=`<li>
								<a href="itemDetail.html#data-id=${id}">
									<img src="${imgsrc[0]}">
								</a>
								<a href="#"><br>
									<input type="checkbox">${descript}
								</a>
								<p>
									<span>USD ${price}</span> <span>USD ${discoutPrice}</span>
								</p>
								<p>Save USD ${savePrice}</p>
								<a href="#">wholesale<span></span></a>
							</li>`;
					}
					DOM.innerHTML=str;
				}


			}
		}
		xhr.open("get","../api/sort.php");
		xhr.send(null);
});

