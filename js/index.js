$(function(){
    // 导航菜单栏
    $('.nav-list li').click(function(){
        $(this).addClass('actived').siblings().removeClass('actived')
    })
    //首页左右滑动轮播图
　   var mySwiper = new Swiper('#headBanner', {
    pagination: {
        el: '.swiper-pagination',
        clickable :true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
        autoplay: true,//可选选项，自动滑动
        
    })

    //核心业务淡入淡出轮播图
    $('.coreBussiness ul li').eq(0).show()
      //右击箭头
      var banIndex = 0;
      //节流
      var flag = true
    $('#next').click(function(){
        if(flag){
            flag = false
            banIndex++;
        banIndex = banIndex > 2 ? 0 : banIndex ;
        $(".coreBussiness ul li").eq(banIndex).fadeIn(500).siblings().fadeOut(500);
        setTimeout(()=>{flag = true},500)
        }
       
    })
    $('#prev').click(function(){
        if(flag){
            flag = false;
            banIndex--;
        banIndex = banIndex <0 ? 2 : banIndex ;
        $(".coreBussiness ul li").eq(banIndex).fadeIn(500).siblings().fadeOut(500);
        setTimeout(()=>{flag = true},500)
        }
       
    })


    /**
     * 登录注册功能
    */
    //点击注册字样时  隐藏登录的相关输入框和按钮
    $('#toResister').click(function(){
        $('.loginBtn').hide().siblings('.resisterBtn').show()
        $('#loginUser').hide().siblings('#resisterUser').show()
        $('#loginpsd').hide().siblings('#resisterpsd').show()
    })
    //点击登录字样时  隐藏注册的相关输入框和按钮
    $('#toLogin').click(function(){
        $('.loginBtn').show().siblings('.resisterBtn').hide()
        $('#loginUser').show().siblings('#resisterUser').hide()
        $('#loginpsd').show().siblings('#resisterpsd').hide()
    })

    //点击登录时  判断是否存在此用户  且用户名和密码是否匹配
    $('.loginBtn').click(function(){
            //先获取所有用户的对象//变成数组    
            if(window.localStorage.userArr){
                //判断是否存在        
                var array = JSON.parse(window.localStorage.userArr);    
            }else{        
                array = [];//创建一个新数组    
            }

            $(".loginBtn").bind("click",function(){
                var username = $('#loginUser').val();        
                var password = $('#loginpsd').val();   
                console.log('username',username,'password',password);
                 
                var flagT = false;
                var index = 0;
                //遍历数组进行匹配        
                for(var i =0;i<array.length;i++){            
                    //判断是否有相同账号            
                    if(username==array[i].username){//有这个账号                
                        flagT = true;                
                        index = i;        
                    }
                }
                if(flagT){//如果存在            
                    if(password==array[index].password){                
                        alert("登录成功");
                        var yonghu = $('#loginUser');
                        localStorage.name = yonghu.val();
                        console.log(localStorage.name);
                        $('.loginModel').hide()
                        window.history.go(0)
                    }else{                
                        alert("密码错误");            
                    }        
                }else{//账号不存在或输入错误            
                    alert("用户不存在，请先注册");
                    
                }    

            })
    })

    //点击注册时  判断用户是否已经注册过
    $('.resisterBtn').click(function(){
        //先获取所有用户的对象//变成数组    
        if(window.localStorage.userArr){
            //判断是否存在        
            var array = JSON.parse(window.localStorage.userArr);    
        }else{        
            array = [];//创建一个新数组    
        }

        $('.resisterBtn').bind("click",function(){
            var username = $('#resisterUser').val();        
            var password = $('#resisterpsd').val();    
            //遍历数组进行匹配        
            for(var i =0;i<array.length;i++){            
                //判断是否有相同账号            
                if(username==array[i].username){                
                    alert("该账号已存在,快去登录吧");
                    $('.loginBtn').show().siblings('.resisterBtn').hide()
                    $('#loginUser').show().siblings('#resisterUser').hide()
                    $('#loginpsd').show().siblings('#resisterpsd').hide()
                    window.history.go(0)
                    return;            
                }        
            }
            //创建对象        
            var obj = {
                username:username,password:password
            }
            array.push(obj);        
            window.localStorage.userArr=JSON.stringify(array);    
            alert("用户创建成功");    
            $('.loginBtn').show().siblings('.resisterBtn').hide()
            $('#loginUser').show().siblings('#resisterUser').hide()
            $('#loginpsd').show().siblings('#resisterpsd').hide()
            window.history.go(0)
        })
    })

    //判断登陆状态  变化导航中登录字样
   $(function(){
    if(window.localStorage.name){
        $('#checkLogin').text(window.localStorage.name) 
         //显示退出登录弹框
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
   $('#checkLogin').click(function(){
       if(!window.localStorage.name){
        $('.loginModel').show()
       }
   })
   $('.closeBtn').click(function(){
        window.history.go(0)
   })

    
})
