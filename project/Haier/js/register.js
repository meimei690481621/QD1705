define(["jquery", "jquery-cookie"],function($){
    var register = function(){
        $(function(){
    //验证码初始化  点击和刷新时进行更新
    // alert( $("#security"));
   $("#security").html(randomnum(4));
    $("#security").click(function(){
        $(this).html(randomnum(4));
        $(this).css("background",randomColor());
    })
    //手机号码验证
    var isEmpty = true;  isYse = true;
    // alert($("#phonenumber"));
    $("#phonenumber").blur(function(){
        //第一步将输入框中的空格去掉
        $(this).val($(this).val().replace(/ /g,""));
        var pattern = /^[1][34578]\d{9}$/ig;
        //验证输入的手机好不能为空
        if($(this).val() == ""){
            isEmpty =false;
            $(".warning7").css("display","block");
            $(".warning7").find(".warningcontent").html("手机号码不能为空");
        }else if(!pattern.test($(this).val())){
            /*验证输入的手机号码由十一为组成， 第一
            位必须为1 第二位可以从34578中选择手机号码必须全部为数字*/
            isYse = false;
            $(".warning7").css("display","block");
            $(".warning7").find(".warningcontent").html("手机号码格式不正确");
        }else{
            isEmpty = true;
            isYes = true;
        }
    })
    //验证码验证
    var isTrue = true, isNotnull = true;
    $("#yanzheng").blur(function(){
        var arrLow = [];
        var arrUp = [];
        var arrNow = [];
        var arrInit =[];
        //第一步将输入框中的空格去掉
        $(this).val($(this).val().replace(/ /g,""));
        //验证输入的验证码不能为空
        if($(this).val() == ""){
             isNotnull = false;
            $(".warning8").css("display","block");
            $(".warning8").find(".warningcontent1").html("验证码输入不能为空");
        }else{
            isNotnull = true;
            arrInit = $("#security").html().split("");
            arrLow = $("#security").html().toLowerCase().split("");
            arrUp = $("#security").html().toUpperCase().split("");
            arrNow = $(this).val().split("");

            for(var i = 0; i<arrInit.length;i++){
                if(arrNow[i]==arrLow[i] || arrNow[i] == arrUp[i]){
                    continue;
                }else{

                    isTrue = false;
                    $(".warning8").css("display","block");
                    $(".warning8").find(".warningcontent1").html("验证码输入错误");
                     break;

                }
            }

        }
    })
//下一步点击按钮的验证
$("#nextstep").on("mouseover" , function(){
    $("#nextstep").css("backgroundColor","blue");
})
$("#nextstep").on("mouseout" , function(){
    $("#nextstep").css("backgroundColor","");
})

$("#nextstep").click(function(){
    if($("#phonenumber").val() == ""){
        $(".warning7").css("display","block");
        $(".warning7").find(".warningcontent").html("手机号码不能为空");
    }else if( isEmpty =false){
        $(".warning7").css("display","block");
        $(".warning7").find(".warningcontent").html("手机号码不能为空");
    }else if(isYse = false){
         $(".warning7").css("display","block");
         $(".warning7").find(".warningcontent").html("手机号码格式不正确");
    }else if($("#yanzheng").val() == ""){
         $(".warning8").css("display","block");
         $(".warning8").find(".warningcontent1").html("验证码输入不能为空");
    }else if(isNotnull = false){
         $(".warning8").css("display","block");
         $(".warning8").find(".warningcontent1").html("验证码输入不能为空");
    }else if(isTrue = false){
          $(".warning8").css("display","block");
          $(".warning8").find(".warningcontent1").html("验证码输入错误");
    }else{
        $(".login").find(".left").css("display","none");
        $(".login").find(".leftone").css("display","block");
        $(".process-logo").find(".part").find(".second").css("background","url(../images/rgstep_1.png)");
    }
})
 //登录密码的验证
  var registerEmpty = true;
  var registerLength = true;
  var registerTrue = true;
$("#loginnumber").blur(function(){
    var pattren = /(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/ig;
    if($(this).val() == ""){
        registerEmpty=false;
        $(".intension").css("display","none");
        $(".warning2").css("display","inline-block");
        $(".warning2").find(".warningcontent6").html("密码不可以为空");
    }else if($(this).val().length <6 || $(this).val()>18||/ /g.test($(this).val())){
        registerEmpty = true;
        registerLength = false;
        $(".intension").css("display","none");
        $(".warning2").css("display","inline-block");
        $(".warning2").find(".warningcontent6").html("密码长度为6-18位且前后不可以包括空格");
    }else if(!(pattren.test($(this).val()))){
        registerEmpty = true;
        registerLength = true;
        registerTrue = false;
       $(".intension").css("display","none");
        $(".warning2").css("display","inline-block");
        $(".warning2").find(".warningcontent6").html("密码过于简单");

    }else{
         registerEmpty = true;
        registerLength = true;
        registerTrue = true;
         $(".intension").css("display","block");
        $(".warning2").css("display","none");
    }
})
    //确认密码的验证
     var confirmnunberEmpty = true;
     var confirmnunberTrue = true;
    $("#confirmnunber").blur(function(){
        if($("#confirmnunber").val() ==""){
        $(".warning3").css("display","inline-block");
        $(".warning3").find(".warningcontent3").html("验证码不可以为空");
        }else if(!($("#loginnumber").val() == $(this).val())){
             confirmnunberEmpty = true;
             confirmnunberTrue = false;
            $(".warning3").css("display","inline-block");
            $(".warning3").find(".warningcontent3").html("两次密码输入不一致");
        }else{
                confirmnunberEmpty = true;
                confirmnunberTrue = true;
                 $(".warning3").css("display","none");
        }
    })

    //完成按钮的点击事件
    $("#nextstepone").click(function(){
        if($("#loginnumber").val() == ""){
        $(".intension").css("display","none");
        $(".warning2").css("display","inline-block");
        $(".warning2").find(".warningcontent6").html("密码不可以为空");
        }else if( registerLength = false){
        $(".intension").css("display","none");
        $(".warning2").css("display","inline-block");
        $(".warning2").find(".warningcontent6").html("密码长度为6-18位且前后不可以包括空格");
        }else if(registerTrue = false){
        $(".intension").css("display","none");
        $(".warning2").css("display","inline-block");
        $(".warning2").find(".warningcontent6").html("密码过于简单");
        }else if($("#confirmnunber").val() ==""){
        $(".warning3").css("display","inline-block");
        $(".warning3").find(".warningcontent3").html("验证码不可以为空");
        }else if( confirmnunberTrue = false){
        $(".warning3").css("display","inline-block");
        $(".warning3").find(".warningcontent3").html("两次密码输入不一致");
        }else{
        $(".login").find(".leftone").css("display","none");
        $(".login").find(".lefttwo").css("display","block");
        $(".process-logo").find(".part").find(".three").css("background","url(../images/rgstep_3.png)");
        }
    })
    $("#nextstepone").on("mouseover" , function(){
        $("#nextstepone").css("cursor","pointer");
        $("#nextstepone").css("backgroundColor","blue");
    })
    $("#nextstepone").on("mouseleave" , function(){
        $("#nextstepone").css("backgroundColor","");
    })

})
    return "我是register"
    }
    return{
        register:register
    }
})

//封装生成随机数
function randomnum(n){
    var arr = [];
    for(var i = 0; i < n; i++){
        var num = parseInt(Math.random()*100);
        if(num >= 0 && num <=9){
            arr.push(num);
        }else if(num >= 10 && num <= 35){
            arr.push(String.fromCharCode(num + 87));
        }else if(num >= 65 && num <= 90){
            arr.push(String.fromCharCode(num));
        }else{
            i--;
            continue;
        }
    }
    return arr.join("");
}
//随机颜色
function randomColor(){
    return "rgba(" + parseInt(Math.random()*255) +  "," + parseInt(Math.random()*255) + "," + parseInt(Math.random()*255) + ",1)";
}