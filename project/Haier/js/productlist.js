define(["jquery", "jquery-cookie"],function(){
    var productlist = function(){
        $(function(){
            $.ajax({
                url:"../data/productlist.json",
                method:"get",
                success:function(data){
                    var html = "";
                    for(var i = 0 ;i<data.length;i++){
                        html += `<li><img src="${data[i].img}" alt="我是图片"><p>${data[i].title}</p><span>${data[i].money}</span><i>${data[i].available}</i><button>${data[i].compare}</button></li>`
                    }
                    $(".right").find("#goodlist").html(html);
                }
            })
            $(".right").find("#goodlist").on("mouseover" , "li" function(){

            })



        })

        return "我是productlist"
    }
    return{
        productlist: productlist
    }
})