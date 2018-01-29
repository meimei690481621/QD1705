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
     $.ajax({

        url:"../data/five.json",
        method:"get",
        success:function(data){
            var html="";
            for(var i = 0;i<data.length;i++){
                html += `<li><a href="#"><img src="${data[i].img}"></a><p><a href="#">${data[i].title}</a><br/><span>${data[i].money}</span></p></li>`
            }
            $(".recommendation").find(".bottom").find(".right").html(html);
        }
     })
     // 精品推荐的动画效果
      $(".recommendation").find(".bottom").find(".right").on("mouseenter","img",function(){
        $(this).stop().animate({
            left:-10,
        },200);
    })
     $(".recommendation").find(".bottom").find(".right").on("mouseleave","img",function(){
        $(this).stop().animate({
            left:0,
        },200);
    })



     //第六部分新品首发
        $.ajax({
            url:"../data/threepart.json",
            method:"get",
            success:function(data){
                var html1 = '',html2 = '',html3 = '';
                for(var i = 0 ; i < data.length; i ++){
                    switch (i){
                        case 0 :
                            for(var attr in data[0]){
                                switch(attr){
                                    case "classify1":
                                        html1 += '<li><p>' + data[0].classify1.title + '</p><span>' + data[0].classify1.desc + '</span><img src="' + data[0].classify1.img + '"/></li>';
                                        break;
                                    case "classify2":
                                        html1 += '<li><p>' + data[0].classify2.title + '</p><span>' + data[0].classify2.desc + '</span><img src="' + data[0].classify2.img + '"/></li>';
                                        break;
                                    case "classify3":
                                        html1 += '<li><img src="' + data[0].classify3.img + '"/></li>';
                                        break;
                                    default:
                                        html1 += '<li><img src="' + data[0].classify4.img + '"/></li>';
                                        break;
                                }
                            }
                            $("#newproduct").html(html1);
                            break;
                        case 1 :
                            for(var attr in data[1]){
                                switch(attr){
                                    case "classify1":
                                        html2 += '<li><h3>' + data[1].classify1.title + '</h3><p>' + data[1].classify1.desc + '</p><span>' + data[1].classify1.button + '</span><img src="'+ data[1].classify1.img + '"/></li>';
                                        break;
                                    case "classify2":
                                        html2 += '<li><img src="' + data[1].classify2.img + '"/></li>';
                                        break;
                                    default:
                                        html2 += '<li><img src="' + data[1].classify3.img + '"/></li>';
                                        break;
                                }
                            }
                            $("#customization").html(html2);
                            break;
                        default:
                            for(var attr in data[2]){
                                switch(attr){
                                    case "classify1":
                                        html3 += '<li><h3>' + data[2].classify1.title + '</h3><p>' + data[2].classify1.desc + '</p><img src = "' + data[2].classify1.img + '"/></li>';
                                        break;
                                    case "classify2":
                                        html3 += '<li><h3>' + data[2].classify2.title + '</h3><p>' + data[2].classify2.desc + '</p><img src = "' + data[2].classify2.img + '"/></li>';
                                        break;
                                    case "classify3":
                                        html3 += '<li><h3>' + data[2].classify3.title + '</h3><p>' + data[2].classify3.desc + '</p><img src = "' + data[2].classify3.img + '"/></li>';
                                        break;
                                    default:
                                        html3 += '<li><h3>' + data[2].classify4.title + '</h3><p>' + data[2].classify4.desc + '</p><img src = "' + data[2].classify4.img + '"/></li>';
                                        break;
                                }
                            }
                            $("#chooseforyou").html(html3);
                            break;
                    }
                }
            }
        })

        $("#newproduct").on("mouseenter","img,span",function(){
            $(this).css("color","#2979ff");
            var iNow = $(this).index();
            if(iNow == 2){
                $(this).stop().animate({
                    left:270
                })
            }else{
                $(this).stop().animate({
                    left:-10
                })
            }

        })
        $("#newproduct").on("mouseleave","img,span",function(){
            $(this).css("color","#999999");
            var iNow = $(this).index();
            if(iNow ==2){
                $(this).stop().animate({
                    left:280
                })
            }else{
                $(this).stop().animate({
                    left:0
                })
            }
        })

        $("#customization").on("mouseenter","li",function(){
            var iNow = $(this).index();
            $(this).find("p").css("color","#2979ff");
            $(this).find("span").css("color","#2979ff");
            $(this).find("span").css("borderColor","#2979ff");
            if(iNow == 0){
                $(this).find("img").stop().animate({
                    left:-10
                })
            }else{
                $(this).find("img").stop().animate({
                    left:-10
                })
            }
        })
        $("#customization").on("mouseleave","li",function(){
            var iNow = $(this).index();
            $(this).find("p").css("color","#999999");
            $(this).find("span").css("color","#999999");
            $(this).find("span").css("borderColor","#999999");
            if(iNow == 0){
                $(this).find("img").stop().animate({
                    left:0
                })
            }else{
                $(this).find("img").stop().animate({
                    left:0
                })
            }
        })







})
 return "我是main函数";
}

return {
    main: main
}
})