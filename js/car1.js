$(function() {
    // 1.全选 全不选功能模块
    // 就是把全选按钮(checkall) 的状态赋值给三个小的按钮(j-checkbox)就可以了
    // 事件可以使用change
    $(".checkall").change(function() {
        // console.log($(this).prop("checked"));
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            // 就把所有商品添加.check-cart-item 类名
            $(".cart-item").addClass("check-cart-item");
        } else {
            //就移除 .check-cart-item 类名
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    // 2.如果小复选框被选中的个数等于3 就应该把全选按钮选上 否则全选按钮不选
    $(".j-checkbox").change(function() {
        if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);

        };
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");

        }
    });
    // 3.增减商品数量模块的做法，首先声明一个变量，当我们点击+号 ，就让这个值++，然后赋值给文本框
    $(".increment").click(function() {
        var n = $(this).siblings(".itxt").val();
        // console.log(n);
        n++;
        $(this).siblings(".itxt").val(n);
        //4. 计算小计模块 根据文本框的值 乘以 当前商品的价格 就是商品的小计
        // 当前的价格 p
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        // console.log(p);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (n * p).toFixed(2));
        getSum();

    });
    $(".decrement").click(function() {
        var n = $(this).siblings(".itxt").val();
        // console.log(n);
        if (n == 1) {
            return false;
        };
        n--;
        $(this).siblings(".itxt").val(n);

        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        // console.log(p);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (n * p).toFixed(2));
        getSum();

    });
    // 5.用户修改文本框里的值  计算小计模块
    $(".itxt").change(function() {
        // 先得到当前文本框里的值 再乘以商品单价
        var n = $(this).val();
        // 当前的价格 p
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (n * p).toFixed(2));
        getSum();
    });
    // 6. 计算总计和总额模块
    getSum();

    function getSum() {
        var count = 0; // 计算总件数
        var money = 0; // 计算总价钱
        $(".itxt").each(function(i, ele) {
            count += parseInt($(ele).val());

        });
        $(".amount-sum em").text(count);
        $(".p-sum").each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1));

        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    };

    // 7.删除商品模块
    // (1) 商品后面的删除按钮
    $(".p-action a").click(function() {
        $(this).parents(".cart-item").remove();
        getSum();
    });
    // (2) 删除选中的商品
    $(".remove-batch").click(function() {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    // (3) 清空购物车 删除全部商品
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getSum();
    });


})