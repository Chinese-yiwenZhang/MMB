$(function(){
	var productid=getUrlParam('productid');
	getbijiainfo();
	function getbijiainfo(){
		$.ajax({
			url:"http://mmb.ittun.com/api/getproduct?productid="+productid,
			success:function(data){
				var html =template("bijiaTmp",data);							                 	
				$(".detailed").prepend(html);		
			}	
		});	       
	}
	getcommentinfo();
	function getcommentinfo(){
		$.ajax({
			url:"http://mmb.ittun.com/api/getproductcom?productid="+productid,
			success:function(data){
				var html =template("commentTmp",data);
				console.log(html);							                 	
				$(".comment_title").append(html);		
			}	
		});	   
	}

	//获取地址栏中的参数
	function getUrlParam(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r!=null) return unescape(r[2]); return null; //返回参数值
	} 
});