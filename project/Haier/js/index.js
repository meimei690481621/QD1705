define([ "jquery","startMove"],function($,startMove){
var main = function(){
$(function(){

//左面商品分类区
    var aLis = $("#con_ul").find("li");
       aLis.mouseenter(function(){
            $(this).css("backgroundColor","white");
            $(this).find("a").css("color","black");
            $(this).find("a").find("i").css("color","#C1C1C1");
            $(".see").stop().animate({left:192},1000);
            $(".see").css("display","block");
        })
           aLis.mouseleave(function(){
            $(this).css("backgroundColor","");
            $(this).find("a").css("color","white");
            $(".see").css("display","none");
            $(".see").css("left",-253);
       })

       //轮播图
       var oBtns = $("#numofbanner").find("li");
       var oLis = $("#banners").find("li");
       var iNow = 0;
       var timer = null;

       oBtns.click(function(){
            oBtns.attr("class","");
            iNow = $(this).index();
            oBtns.eq(iNow).attr("class","active");
            $("#banners").stop().animate({
                left:-952*iNow
            })
        })

        timer = setInterval(function(){
            iNow++;
            oBtns.attr("class","");
            oBtns.eq(iNow).attr("class","active");
            $("#banners").stop().animate({
                left:-952*iNow
            },function(){
                if(iNow == oBtns.size()){
                    $("#banners").css("left",0);
                    iNow = 0;
                }
            });
            if(iNow == oBtns.size()){
                oBtns.eq(0).attr("class","active");

                }
        },6000);

        //轮播图下面的第四部分
        $.ajax({
            url:"../data/four.json",
            type:"GET",
            success: function(res){
                var html="";
                for(var i = 0;i<res.length;i++){
                    html += ` <li><a href="#"><img src="${res[i].img}" alt="我是图片"></a></li>`
                }
                $(".four ul").html(html);
            }
        })
        $("#four_ul").on("mouseenter","img",function(){
            $(this).stop().animate({
                left:-10,
            },200);
        })
        $("#four_ul").on("mouseleave","img",function(){
            $(this).stop().animate({
                left:0,
            },200);
        })

    // 第五部分精品推荐
    $(".recommendation").find(".bottom").find(".left").on("mouseenter","img",function(){
        $(this).stop().animate({
            left:-10,
        },200);
    })
     $(".recommendation").find(".bottom").find(".left").on("mouseleave","img",function(){
        $(this).stop().animate({
            left:0,
        },200);
    })






})
 return "我是main函数";
}

return {
    main: main
}
})