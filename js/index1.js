// 轮播图效果
window.addEventListener('load', function() {
    // 1.获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    // 2.鼠标经过focus 就显示或隐藏左右按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // 11. 鼠标经过 停止定时器
        clearInterval(timer);
        timer = null; //清除定时器变量
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        // 11.鼠标离开 打开定时器
        timer = setInterval(function() {
            // 手动调用点击事件
            arrow_r.click();
        }, 2000);
    });
    // 3.动态生成小圆圈， 有几张图片，就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    //ul.children.length   可以知道有几张图片 (就是小li个数)
    for (var i = 0; i < ul.children.length; i++) {
        //创建一个小li
        var li = document.createElement('li');
        //记录当前小圆圈的索引号 通过自定义属性来做
        li.setAttribute('data-index', i);
        //把小li插入到ol里面
        ol.appendChild(li);
        // 4.小圆圈的排他思想  我们可以直接在生成小圆圈的同时，直接绑定点击事件
        li.addEventListener('click', function() {
            //干掉所有人  把所有的小li 清除current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //留下我自己  当前的小li 设置current类名
            this.className = 'current';
            // 5.点击小圆圈 移动图片 移动的是ul
            //当我们点击了某个小li 就拿到当前小li的索引号
            var index = this.getAttribute('data-index');
            //9.当我们点击了某个小li 就要把这个li 的索引号给num 和 circle 保持同步
            num = index;
            circle = index;
            //移动图片用到  animate(obj, target, callback)
            animate(ul, -index * focus.offsetWidth);
        })
    }
    //把ol 里面第一个小li设置类名为 current
    ol.children[0].className = 'current';
    // 6.克隆第一张图片（li）放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7.点击右侧按钮一次， 图片滚动一张
    var num = 0;
    //circle 控制小圆圈的播放
    var circle = 0;
    // 12.节流阀 flag
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            //如果走到了最后复制的一张图片，此时我们的ul要快速复原：left改为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focus.offsetWidth, function() {
                flag = true; //打开节流阀
            });
            // 8.点击右侧按钮，小圆圈更随一起变化 可以再声明一个变量circle 控制小圆圈的播放
            circle++;
            //如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            //调用函数
            circleChange();
        }


    })

    // 10.点击左侧按钮一次， 图片滚动一张
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            //如果走到了第一张图片，此时我们的ul要快速复原：left改为最后一张图片
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focus.offsetWidth + 'px';
            }
            num--;
            animate(ul, -num * focus.offsetWidth, function() {
                flag = true; //打开节流阀
            });
            // 8.点击右侧按钮，小圆圈更随一起变化 可以再声明一个变量circle 控制小圆圈的播放
            circle--;
            //如果circle < 0, 说明第一张图片， 则小圆圈要改为第4个小圆圈（3）
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            //调用函数
            circleChange();
        }
    })

    function circleChange() {
        //清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }
    // 11.自动播放轮播图 
    var timer = setInterval(function() {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000);
})