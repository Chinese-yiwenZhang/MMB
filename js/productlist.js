$(function(){
	var id=getUrlParam('categoryid');
	var category=getUrlParam('category');
	var pageid=1;	
	// 获取商品名字
	getproductlistTitleInfo();
	function getproductlistTitleInfo(){
		$.ajax({
			url:"http://mmb.ittun.com/api/getcategorybyid?categoryid="+id,
			success:function(data){
				var html =template("productlistTitleTmp",data);							                 
				$(".productlist").prepend(html);					
			}	
		});	            	
	}
	// 获取商品列表
	getproductlistInfo();
	function getproductlistInfo(){
		$.ajax({
			url:"http://mmb.ittun.com/api/getproductlist?categoryid="+id+"&pageid="+pageid,
			success:function(data){
				var html=template("productlistTmp",data);	
				$(".productlist").append(html);
				//获取总页数
				var pagenb=data.totalCount/data.pagesize;
				pagenb=Math.ceil(pagenb);
				for(var i=1;i<=pagenb;i++){
					$("select").append("<option value="+i+">第"+i+"页</option>");					
				}
				//点击下拉框跳转到对应的页面
				$(".productlist").on("change","select",function(){
					var pagevalue=$("select").val();
					pagechange(pagevalue);
					function pagechange(pagevalue){
			 			$.ajax({
							url:"http://mmb.ittun.com/api/getproductlist?categoryid="+id+"&pageid="+pagevalue,
							success:function(data){
							var html=template("productlistTmp",data);
							//先将头部加进去
							$.ajax({
								url:"http://mmb.ittun.com/api/getcategorybyid?categoryid="+id,
								success:function(data){
									var html =template("productlistTitleTmp",data);							                 
									$(".productlist").prepend(html);
								}	
							});		
							$(".productlist").html(html);
							//重新渲染下拉列表
							for(var i=1;i<=pagenb;i++){
								$("select").append("<option value="+i+">第"+i+"页</option>");
							}
							// 让当前页被选中
							$("select").val(pagevalue);
							pageid=pagevalue;
							}
						});
					}										
				});

				//下一页
				$(document).on('click','.productlist_footer .three',function(){
					//只有当前页数小于总页数才会跳转到下一页
					if(pageid<pagenb){
						pageid=pageid+1;								
		 				$.ajax({
							url:"http://mmb.ittun.com/api/getproductlist?categoryid="+id+"&pageid="+pageid,
							success:function(data){
								var html=template("productlistTmp",data);
								//先将头部加进去
								$.ajax({
									url:"http://mmb.ittun.com/api/getcategorybyid?categoryid="+id,
									success:function(data){
										var html =template("productlistTitleTmp",data);							                 
										$(".productlist").prepend(html);
									}	
								});		
								$(".productlist").html(html);
								//重新渲染下拉列表
								for(var i=1;i<=pagenb;i++){
									$("select").append("<option value="+i+">第"+i+"页</option>");
								}
								// 让当前页被选中
								$("select").val(pageid);
							}
						});
		 			}
				});
				// 上一页
				$(document).on('click','.productlist_footer .one',function(){
					if(pageid>1){
						pageid=pageid-1;
						$.ajax({
							url:"http://mmb.ittun.com/api/getproductlist?categoryid="+id+"&pageid="+pageid,
							success:function(data){
								var html=template("productlistTmp",data);
								//先将头部加进去
								$.ajax({
									url:"http://mmb.ittun.com/api/getcategorybyid?categoryid="+id,
									success:function(data){
										var html =template("productlistTitleTmp",data);							                 
										$(".productlist").prepend(html);
									}	
								});		
								$(".productlist").html(html);
								//重新渲染下拉列表
								for(var i=1;i<=pagenb;i++){
									$("select").append("<option value="+i+">第"+i+"页</option>");
								}
								// 让当前页被选中
								$("select").val(pageid);
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
})