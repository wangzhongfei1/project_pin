// 轮播图
window.addEventListener('load', function() {
    //1. 获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    //2. 鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器变量
    })
    focus.addEventListener('mouseleave', function() {
            arrow_l.style.display = 'none';
            arrow_r.style.display = 'none';
            timer = setInterval(function() {
                //手动调用点击事件
                arrow_r.click();
            }, 2000);
        })
        //3. 动态生成小圆圈 有几张图片，就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        //创建一个小li
        var li = document.createElement('li');
        //创建小li的同时，记录当前小圆圈的索引号，通过自定义属性来做
        li.setAttribute('index', i);
        //把小li插入到ol里面
        ol.appendChild(li);
        //4.小圆圈的排他思想 我们可以在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function() {
            //干掉所有人 把所有的小li 清除current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //留下我自己 当前的小li 设置current 类名
            this.className = 'current';
            //5.点击小圆圈 移动图片 注意移动的是ul
            //ul的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            //当我们点击了某个小li 就拿到当前小li 的索引号
            var index = this.getAttribute('index');
            //当我们点击了某个小li 就要把这个小li的索引号给num 和 circle 保持同步
            num = index;
            circle = index;
            animate(ul, -index * focus.offsetWidth);

        })
    }
    //把ol里面第一个小li 设置类名为current
    ol.children[0].className = 'current';
    //6. 克隆第一张图片（li）放到ul 最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //7. 点击右侧按钮，图片滚动一张
    var num = 0;
    //circle 控制小圆圈的播放
    var circle = 0;
    // flag 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false; //关闭节流阀
            // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focus.offsetWidth, function() {
                flag = true; //打开节流阀
            });

            //8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle++;
            //因为图片比小圆圈多一张，所以如果circle == 4 说明走到最后我们克隆的这张图片了，我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            //调用函数
            circleChange();
        }
    })

    //9. 左侧按钮
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false; //关闭节流阀
            // 如果到了第一张图片，就迅速跳到最后一张
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focus.offsetWidth + 'px';

            }
            num--;
            animate(ul, -num * focus.offsetWidth, function() {
                flag = true; //打开节流阀
            });

            //8. 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle--;
            //如果circle < 0 说明到第一张图片，则小圆圈要改为第四个小圆圈 索引号3
            /* if (circle < 0) {
                circle = ol.children.length - 1;
            } */
            circle = circle < 0 ? ol.children.length - 1 : circle;
            //调用函数
            circleChange();
        }
    })

    function circleChange() {
        //清除ol里面li 的所有类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //留下当前小圆圈的current类名
        ol.children[circle].className = 'current';
    }
    // 10.自动播放轮播图
    var timer = setInterval(function() {
        //手动调用点击事件
        arrow_r.click();
    }, 2000);
})



// 电梯导航
$(function() {
    //4. 当我们点击了小li 此时不需要执行 页面滚动事件里面的 添加first类名
    //4.节流阀
    var flag = true;

    //1. 显示隐藏电梯导航
    toggletool();

    function toggletool() {
        if ($(document).scrollTop() >= $(".commond").offset().top) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    };
    $(window).scroll(function() {
        toggletool();
        //3.页面滚动到某个内容区域，左侧电梯导航小li相应添加和删除current类名
        if (flag) {
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("first").siblings().removeClass();
                }
            });
        }
    });
    //2. 点击电梯导航页面可以滚动到相应的内容区域
    $(".fixedtool li").click(function() {
        flag = false;
        console.log($(this).index());
        //当我们每次点击li, 就需要计算出页面要去往的位置
        //选出对应索引号的内容区盒子 计算它的 offset().top
        var current = $(".floor .w").eq($(this).index()).offset().top
            //页面动画滚动效果
        $("body, html").stop().animate({
            scrollTop: current
        }, function() {
            flag = true;
        });
        // 让点击之后li添加first类名,其余的兄弟移除类名
        $(this).addClass("first").siblings().removeClass();

    })
})