define(["jquery", "jquery-cookie"],function($){
var enter = function(){
    $(function(){
    //用户名输入框验证
    var empty = true;
    $("#nameofuser").blur(function(){
        $(this).val($(this).val().replace(/ /g,""));
        if($(this).val() == ""){
            var empty = false;
            $(".warning1").css("display","block");
            $(".warning1").html("请输入登陆名");
        }else{
            empty = true;
        }
    })
    //密码输入框的验证
    var length = true;
    var space = true;
    $("#password").blur(function(){
        if($(this).val().length<6){
            length = false;
            $(".warning2").css("display","block");
            $(".warning2").html("密码不能少于6位数");
        }else if(/ /g.test($(this).val())){
            length = true;
            space = false;
            $(".warning2").css("display","block");
            $(".warning2").html("密码前后不能为空格");
        }else{
            space = true;
        }
    })
    //登陆验证


    $("#loginbtn").click(function(){
          if($("#nameofuser").val() == ""){
             $(".warning1").css("display","block");
            $(".warning1").html("请输入登陆名");
            empty = false;
        }else{
             empty=true;
        }

   if($("#password").val().length < 6 ){
            length = false;
            $(".warning2").css("display","block");
            $(".warning2").html("密码不能少于6位");
        }else if(/ /g.test($("#password").val())){
            length = true;
             space = false;
            $(".warning2").css("display","block");
            $(".warning2").html("密码前后不能有空格");
        }else{
            space = true;
        }
    if(length && empty &&space){
            alert("登陆成功");
        }
      })
    $(".content").find("#loginbtn").on("mouseover",function(){
        $(".content").find("#loginbtn").css("backgroundColor","blue");
         $(this).css("cursor","pointer");
    })
    $(".content").find("#loginbtn").on("mouseleave",function(){
        $(".content").find("#loginbtn").css("backgroundColor","");
         // $(".content").find("#loginbtn").css("cluster","");
    })
})

return "我是enter"
}
return {
    enter:enter
}
})