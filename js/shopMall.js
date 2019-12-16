$(function(){
    //商品通过ajax进行数据渲染

    // loadStart=0;//定义第几次加载
    // global保存变量，防止变量被污染
    var global = global || {};
    global.loadStart = 0;
    loadArticleList();
    function loadArticleList(){
      //1、判断是不是第一次加载
      if(global.loadStart == 0){
        //如果是第一次加载就清空
        $('.showList').html('');
      }
      // 2、请求数据
      var result = listData['listData0'+global.loadStart];
      var list = result.data.list;
      //判断数据存不存在
      if(!list || !list.length){
        //不存在的话
        $('.showList').html('您请求的数据不存在');
      }else{
        //存在数据
        //1、获取模板
        for(var i=0;i<list.length;i++){
          var htmlModel=$('#itemHtml').html();
          htmlModel=htmlModel.replace('../img/indexImg/goods1.jpg',list[i].itemurl)
          htmlModel=htmlModel.replace('itemName',list[i].itemName);
          htmlModel=htmlModel.replace('$itemPrice$',list[i].itemPrice);
          htmlModel=htmlModel.replace('$id$',list[i].id);
          //添加到页面中的DOM
          $('.showList').append(htmlModel)
        }
      }
      global.loadStart++;
      global.loadCount = Math.ceil(result.data.count/result.data.pageSize);
      
      if(global.loadStart>=global.loadCount){
        $('.bottom_pic').text('没有更多了~');
      }
     

    }
    $('.bottom_pic').click(function(){
      loadArticleList();
      console.log(global.loadStart);
      
    })


    //判断时候登陆状态 切换导航登录字样
    $(function(){
      if(window.localStorage.name){
        $('.isLogin').text(window.localStorage.name)
        $('.isLogin').css('color',"#fff")
        //退出登录
        var newFlag = true
        $('.isLogin').mouseover(function(){
            if(newFlag){
                newFlag = false
                $('.exitLogin').fadeIn(500)
                setTimeout(()=>{newFlag = true},500)
            }
        })
        $('.isLogin').mouseout(function(){
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

    //商品添加到购物车
      //为防止动态添加的dom无法绑定点击事件  使用事件委托
      var index = 0
    $('.showList').on('click','.addCart',function(){
      if(window.localStorage.name){
        index ++;
        // let index = $(this).parents('.goods').index()
        let obj = {
          itemName:$(this).parent('.detail').siblings('.goodTitle').text(),
          itemPrice:$(this).siblings('.price').children('span').text(),
          itemUrl:$(this).parent('.detail').siblings('.pic').children('img').attr('src'),
          itemCount:1,
          name:window.localStorage.name
        }
        window.localStorage.setItem("ID"+index,JSON.stringify(obj))
        alert('成功加入购物车！')
        
      }else{
        alert('您还未登录，请先回首页登录')
        window.location.href="../html/index.html"
      }
    })

    //点击商品打开详情页
    $('.showList').on('click','.goodInfo',function(){
      console.log($(this).siblings('span').html());
      window.location.href="../html/itemDetail.html?"+$(this).siblings('span').html()
    })

})