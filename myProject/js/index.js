document.addEventListener("DOMContentLoaded",function(){
	// 公共导航栏点击功能
	mainNav();
	function mainNav(){
		var allLists=document.getElementById("all_lists");
		var tab1Tab1=document.getElementById("tab1_tab1");
		var allListsBtn=true;
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
	//吸顶菜单及客服
	fixTopAndToTop()
	function fixTopAndToTop(){
		var headerBelow=document.getElementById('header_below');
		var headerT=headerBelow.offsetTop;
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
	}
})








