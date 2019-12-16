$(function(){
    //根据是否登录  判断右上角显示字样
    if(window.localStorage.name){
        $('#checkLogin').text(window.localStorage.name)
        $('#checkLogin').css('color','#fff')
          var newFlag = true
        $('#checkLogin').mouseover(function(){
            if(newFlag){
                newFlag = false
                $('.exitLogin').fadeIn(500)
                setTimeout(()=>{newFlag = true},500)
            }
        })
        $('#checkLogin').mouseout(function(){
            if(newFlag){
                newFlag = false
                $('.exitLogin').fadeOut(500)
                setTimeout(()=>{newFlag = true},500)
            }
        })  
        $('.exitLogin').click(function(){
           if(confirm('确定退出登录？')){
            console.log('已退出');
            window.localStorage.removeItem('name')
            window.history.go(0)
           }else{
               $('.exitLogin').hide()
               return false
           }
        }) 
    }
})
$(function(){
    //初始化渲染加入购物车的商品
    var result = []
    if(window.localStorage && window.localStorage.length>0){
            var storage=window.localStorage;
            for(var i=0;i<storage.length;i++){
                var key=storage.key(i);
               if(key.slice(0,2) == "ID"){
                   //只展示这个用户添加的商品
                   let Object = JSON.parse(localStorage.getItem(key)) 
                   if(Object.name == window.localStorage.name){
                    result.push(Object)
                    // console.log('这是最后的数组',result);
                   }
               }
            }
            if(result.length == 0){
                $('.shopList').hide()
                $('.calcSum').hide()
                $('.noData').show()
                $('.shopCar').css('background-color',"#F6F6F6")
            }else{
                for(var i=0;i<result.length;i++){
                    var htmlModel=$('#itemHtml').html();
                    htmlModel=htmlModel.replace('../img/indexImg/goods12.jpg',result[i].itemUrl)
                    htmlModel=htmlModel.replace('$title$',result[i].itemName);
                    htmlModel=htmlModel.replace('$price$',result[i].itemPrice);
                    //添加到页面中的DOM
                    $('.showList').append(htmlModel)
                  }
            }
    }

    //点击删除时  删除列表中数据和localstorage中的数据
    $('.delete').click(function(){
        let Dindex = $(this).parents('tr').index()
        $('.showList').children('tr').eq(Dindex).remove()
        console.log('要删的',result[Dindex].itemName);
        for(var i = 1; i< window.localStorage.length;i++){
            if(window.localStorage.getItem('ID'+i) !== null){
                let obj =JSON.parse(window.localStorage.getItem('ID'+i)) 
                console.log(obj);
                if(obj.itemName && obj.itemName == result[Dindex].itemName){
                    console.log('真删的',window.localStorage.getItem('ID'+i),i);
                    window.localStorage.removeItem('ID'+i)
                    result.splice(Dindex,1)
                    alert('删除成功')
                    window.history.go(0)
                }
            }
            
           
        }
    })

    //点击+号 增加这个商品的数量
    var  count = 1
    $('#plus').bind('click',function(){
        count = $(this).siblings('input').val()
        count++
        $(this).siblings('input').val(count)
    })
    $('#cut').bind('click',function(){
        count = $(this).siblings('input').val()
        if(count > 1){
            count--
            $(this).siblings('input').val(count)
        }else{
           alert('不能再减了，就剩这个了')
        }
    })

    
    //点击编辑时  可以添加或减少商品数量
    $('.edit').click(function(){
        if($('.edit').html() == "编辑"){
            $(this).parent('td').siblings('td.count').children('.showData').hide()
            $(this).parent().siblings('.count').children('.activeCount').show()
            $(this).html('完成')
        }else{
            $(this).parent('td').siblings('td.count').children('.showData').show()
            $(this).parent().siblings('.count').children('.activeCount').hide()
            $(this).parent('td').siblings('td.count').children('.showData').children('.countNum').text(count)
            calcSum()
            $(this).html('编辑')
        }

    })

    function calcSum(){
        var sum =0
        var count = 0
        $('.showList tr').each(function(index,ele){
            console.log(index,ele);
           let shuliang = $('.showList tr').eq(index).children('.count').children('.showData').children('.countNum').text()
           let qian = $('.showList tr').eq(index).children('.price').text()
            sum += shuliang*qian
            count += shuliang*1
        })
        $('.totalMoney').text(sum.toFixed(2))
        $('.totalCount').text(count)
        
    }   
    $(function(){
        calcSum()
    })
     
    //立即下单
    $('.buyNow').click(function(){
        alert('下单完成')
        window.localStorage.clear(  )
        window.location.href='../html/index.html'        
    })
})