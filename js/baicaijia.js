$(function(){
	var id=getUrlParam('titleid');
	id = id || 0;
	getnavInfo();
	function getnavInfo(){
		$.ajax({
			url:"http://mmb.ittun.com/api/getbaicaijiatitle",
			success:function(data){
				var html=template("navTmp",data);
				$(".nav").prepend(html);				
				//获得nav宽度
				var navwidth=$(".nav").width();
				// 将li标签的宽度设置成nav宽度的1/5
				var liwidth=$(".nav li").width(navwidth/5);
				// 获得ul标签下li标签的个数
				var lislength=$(".nav ul").children().length;				
				//将ul宽度设置成li标签的宽度*li标签的个数
				$(".nav ul").width(liwidth.width()*lislength);
				//计算出最大可移动的距离
				var max=navwidth-$(".nav ul").width();
				//点击哪个链接，哪个链接下方变红
    			for(var i=0;i<lislength;i++){
					$(".nav ul li").removeClass();						
				}
				$(".nav ul li:nth-child("+((+id)+1)+")").addClass("sel");				
				
				// 给ul添加touchstart事件
				var x_start,x_move,x_end,step;
				$(".nav ul").on('touchstart', function (e) {
					if(x_start==undefined){

					x_start=e.originalEvent.touches[0].clientX;  
					}
					else{
						x_start=-step;
						$(".nav ul").css("transform","translateX("+x_start+"px)"); 
					}
    				
				
					
    				
    			});

				$(".nav ul").on('touchmove', function (e) { 
					
					x_move=e.originalEvent.touches[0].clientX;
					
					
					step=x_move-x_start;
					
					$(".nav ul").css("transform","translateX("+step+"px)"); 										
											  				
    			});

    			$(".nav ul").on('touchend', function (e) {
					x_end=e.originalEvent.changedTouches[0].clientX;
       				console.log(x_end);
       				
    			})
				 
				
				
    			
				
			}			
		});
		$.ajax({
			url:"http://mmb.ittun.com/api/getbaicaijiaproduct",
			data:{
				"titleid":id
			},
			success:function(data){				
				html=template("commentTmp",data);
				$(".comment").append(html);
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