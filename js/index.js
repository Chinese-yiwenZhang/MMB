$(function(){
    getMenuInfo();
    function getMenuInfo(){
        $.ajax({
            url: "http://mmb.ittun.com/api/getindexmenu",
            success:function(data){
                var html =template("menuTmp",data);
                $("#menu").html(html);
                $("#menu li:nth-last-child(-n+4)").hide();
                $("#menu li:nth-child(8)").on("click",function(){
                    $("#menu li:nth-last-child(-n+4)").toggle(400);
                });
            }
        });
        $.ajax({
            url: "http://mmb.ittun.com/api/getmoneyctrl",
            success:function(data){
                var html=template("recommenTmp",data);
                $("#recommen .recommen_list").html(html);
            }
        });
    }
});