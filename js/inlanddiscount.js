$(function(){
	getinlanddiscountInfo();
	function getinlanddiscountInfo(){
		$.ajax({
			url:"http://mmb.ittun.com/api/getinlanddiscount",
			success:function(data){
				var html=template("inlanddiscountTmp",data);
				$(".product").prepend(html);			
			}			
		});
	}
});