$(function(){
	getcategoryTitleInfo();
	function getcategoryTitleInfo(){
		$.ajax({
			url:"http://mmb.ittun.com/api/getcategorytitle",
			success:function(data){
                var html =template("categoryTitleTmp",data);
                $("#category").html(html);  
                $(document).on('click','#category h4',function(){
					$(this).parent().siblings().children(".row").hide(200);
					$(this).next().toggle();
					var index=$(this).parent().index();
					$.ajax({
						url:"http://mmb.ittun.com/api/getcategory?titleid="+index,
						success:function(data){
			                var html =template("categoryTmp",data);			                
			               	$("#category>ul>li:nth("+index+")>.row>ul").html(html);        	
			            }	            
					});
				});	    
            }           
		});		
	}		
});	
