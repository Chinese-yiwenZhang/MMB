$(function(){
	var pageid=0;
	getmoneyctrlInfo();
	function getmoneyctrlInfo(){
		$.ajax({
			url:"http://mmb.ittun.com/api/getmoneyctrl?pageid"+pageid,
			success:function(data){
				var html =template("moneyctrlTmp",data);							                 
				$(".productlist").prepend(html);
				//获取总页数
				var pagenb=data.totalCount/data.pagesize;
				pagenb=Math.ceil(pagenb);
				for(var i=1;i<=pagenb;i++){
					$("select").append("<option value="+i+">第"+i+"页</option>");					
				}
				//点击下拉框跳转到对应的页面
				$(".productlist").on("change","select",function(){
					var pagevalue=$("select").val()-1;
					pagechange(pagevalue);
					function pagechange(pagevalue){
			 			$.ajax({
							url:"http://mmb.ittun.com/api/getmoneyctrl?pageid="+pagevalue,
							success:function(data){
							var html=template("moneyctrlTmp",data);
								
							$(".productlist").html(html);
							//重新渲染下拉列表
							for(var i=1;i<=pagenb;i++){
								$("select").append("<option value="+i+">第"+i+"页</option>");
							}
							// 让当前页被选中
							$("select").val(pagevalue+1);
							pageid=pagevalue;
							}
						});
					}

				});
				//下一页
				$(document).on('click','.productlist_footer .three',function(){					
					//只有当前页数小于总页数才会跳转到下一页
					if(pageid<pagenb-1){
						pageid=pageid+1;											
		 				$.ajax({
							url:"http://mmb.ittun.com/api/getmoneyctrl?pageid="+pageid,
							success:function(data){
								var html=template("moneyctrlTmp",data);
								$(".productlist").html(html);		
								
								//重新渲染下拉列表
								for(var i=1;i<=pagenb;i++){
									$("select").append("<option value="+i+">第"+i+"页</option>");
								}
								// 让当前页被选中
								$("select").val(pageid+1);
							}
						});
		 			}
				});
				// 上一页
				$(document).on('click','.productlist_footer .one',function(){
					if(pageid>0){
						pageid=pageid-1;
						$.ajax({
							url:"http://mmb.ittun.com/api/getmoneyctrl?pageid="+pageid,
							success:function(data){
								var html=template("moneyctrlTmp",data);
								
								$(".productlist").html(html);
								//重新渲染下拉列表
								for(var i=1;i<=pagenb;i++){
									$("select").append("<option value="+i+">第"+i+"页</option>");
								}
								// 让当前页被选中
								$("select").val(pageid+1);
							}
						});
					}
					else{return false;}	
				});			
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