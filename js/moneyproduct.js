$(function(){
	var productid=getUrlParam("productid");
	getmoneyproducttitleInfo();
	function getmoneyproducttitleInfo(){
		$.ajax({
			url:"http://mmb.ittun.com/api/getmoneyctrlproduct",
			data:{
				"productid":productid
			},
			success:function(data){
				var html=template("moneyproducttitleTmp",data);
				$(".comment").prepend(html);
				html = template("comment_siTmp",data);
				$(".comment_si").prepend(html);
				html = template("comment_biTmp",data);
				$(".comment_bi").prepend(html);
				html = template("comment_cityTmp",data);
				$(".comment_city").prepend(html);
				html = template("comment_moreTmp",data);
				$(".comment_more").prepend(html);
			}			
		});
		$.ajax({
			url:"http://mmb.ittun.com/api/getdiscountproduct",
			data:{
				"productid":productid
			},
			success:function(data){
				var html=template("inlanddiscountTitleTmp",data);
				$(".comment").prepend(html);
				html = template("inlanddiscount_biTmp",data);
				$(".comment_bi").prepend(html);
				html = template("inlanddiscount_moreTmp",data);
				$(".comment_more").prepend(html);
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