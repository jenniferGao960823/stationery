$(function(){
    console.log(window.location.search.split('?')[1]);
    let result1 = listData.listData00
    let result2 = listData.listData01
    let result3 = listData.listData02
    var objectData = {}
    result1.data.list.forEach(function(item){
        if(window.location.search.split('?')[1] == item.id){
            objectData = item
            // console.log('1',item);
        }        
    })
    result2.data.list.forEach(function(item){
        if(window.location.search.split('?')[1] == item.id){
            objectData = item
            // console.log('2',item);
        }        
    })
    result3.data.list.forEach(function(item){
        if(window.location.search.split('?')[1] == item.id){
            objectData = item
            // console.log('3',item);
        }        
    })
    // console.log('objectData',objectData);
    
    //初始化数据
    $('.pic img').attr('src',objectData.itemurl)
    $('.title').html(objectData.itemName)
    $('.price span').html(objectData.itemPrice)

    $('.addCart button').click(function(){
        let arr = []
        for(var i=0;i<window.localStorage.length;i++){
            if(window.localStorage.getItem('ID'+i) !== null){
                arr.push(window.localStorage.getItem('ID'+i));
                console.log(arr);
            }
        }
        let index = arr.length+1
        let obj = {
            itemName:$(this).parent('.addCart').siblings('.title').text(),
            itemPrice:$(this).parent('.addCart').siblings('.price').children('span').text(),
            itemUrl:$(this).parents('.detail').siblings('.pic').children('img').attr('src'),
            itemCount:1,
            name:window.localStorage.name
        }
        window.localStorage.setItem("ID"+index,JSON.stringify(obj))
        alert('成功加入购物车')
        window.location.href="../html/shopMall.html"
    })
})