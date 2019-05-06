//当前页数
var number=1;
//上一页
function up() {
    if(number==1){
        alert("这已经第一页了")
    }else {
        number--;
        var i= parseInt($("#ym").val());
        var data=json(number,i);
        limitSelect(data,"/limitBook",number);

    }
}
//下一页
function down() {
    var count=parseInt($(".totalPage").text());
    if(number==count){
        alert("这已经最后一页了")
    }else {
        number++;
        var i= parseInt($("#ym").val());
        var data=json(number,i);
        limitSelect(data,"/limitBook",number);
    }
}
//跳转页数
function submitOne(){
    var i= parseInt($("#ym").val());
    var j=parseInt($("#tz").val());
    var count=parseInt($(".totalPage").text());
    if(j>count){
        alert("此页大于总页数，为你跳转最后一页。");
        var data=json(count,i);
        number=count;
        $("#tz").val(number);
        limitSelect(data,"/limitBook",number);
    }else if(j<1){
        alert("抱歉页数最低为1，为你跳转第一页。");
        var data=json(1,i);
        number=1;
        $("#tz").val(number);
        limitSelect(data,"/limitBook",number);
    }else {
        var data=json(j,i);
        number=parseInt(j);
        $("#tz").val(number);
        limitSelect(data,"/limitBook",number);
    }

}
//更改每页显示
function cge() {
    var i=parseInt($("#ym").val());
    if(i<1 || i!=null){
        alert("最少显示一条数据！")
        var data=json(number,1);
        limitSelect(data,"/limitBook",number);
    }else {
        var data=json(number,i);
        limitSelect(data,"/limitBook",number);
        var count=parseInt($(".totalPage").text());
        if(number>count){
            number=count;
            data=json(number,i);
            limitSelect(data,"/limitBook",number);
        }
    }
}
//跳转首页
function sy(){
    var i=parseInt($("#ym").val());
    if(number==1){
        alert("这已经时第一页了")
    }else {
    var data=json(1,i);
    number=1;
    limitSelect(data,"/limitBook",number);
    }
}
//跳转尾页
function wy(){

    var i=parseInt($("#ym").val());
    var count=parseInt($(".totalPage").text());
    if(number==count){
        alert("这已经最后一页了")
    }else {
        var data=json(count,i);
        number=count;
        limitSelect(data,"/limitBook",number);
    }

}
/*动态加载分页数据*/
function limitSelect(data,dataUrl,number){
    $.ajax({
        url:dataUrl,
        type:"POST",
        data:data,
        dataType:"JSON",
        async : false,
        success:function(data){
            $(".removeTr").remove();//初始化数据展示
            /*动态显示数据*/
            $.each(data.show,function(i,v){
                var birthday=/\d{4}-\d{1,2}-\d{1,2}/g.exec(v.publishdate);//日期转换
                var tr = '<tr class="removeTr"><td>'+v.name+'</td><td>'+v.author+'</td><td>'+v.publish+'</td><td>'+birthday+'</td><td>'+v.page+'</td><td>'+v.price+'</td><td>'+v.content+'</td><td><a href="javascript:void(0);">删除</a><a href="javascript:void(0);">修改</a></td></tr>';
                $(".show").append(tr);
            });
            /* 判断页数*/
            var limit=data.limit;
            var count=data.count;
            if(count<limit){
                count=1;
            }else if(count%limit==0){
                count=count/limit;
            }else {
                count = Math.ceil(count/limit);
            }
            /*添加页总数*/
            $(".totalPage").html(count);
            $("#ym").val(limit)
            /*隔行换色*/
            $("tbody tr:even").css("background-color", "plum"); //为双数行表格设置背颜色素
            //$("tbody tr:odd").css("background-color", "#CC0000"); //为单数行表格设置背颜色素
            $("#tz").attr("max",count);
            $("#dq").html(number)
        }
    });
}
/*序列化form数据*/
function json(page,limit) {
    var obj = {};
    var form = $("form").serializeArray();
    $.each(form, function () {
        if (obj[this.name] !== undefined) {
            if (!obj[this.name].push) {
                obj[this.name] = [obj[this.name]];
            }
            obj[this.name].push(this.value || '');
        } else {
            obj[this.name] = this.value || '';
        }
    });
    obj["page"] =page;
    obj["limit"] =limit;
    return obj;
}