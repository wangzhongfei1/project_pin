window.addEventListener('load', function() {
    // 1.获取元素
    var tel = document.querySelector('#tel');
    var qq = document.querySelector('#qq');
    var nc = document.querySelector('#nc');
    var code = document.querySelector('#code');
    var pw = document.querySelector('#pw');
    var again = document.querySelector('#again');
    var regtel = /^1[3|4|5|7|8]\d{9}$/; // 手机号
    var regqq = /^[1-9]\d{4,}$/; // qq号
    var regnc = /^[\u4e00-\u9fa5]{2,8}$/; //昵称
    var regcode = /^\d{6}$/; // 短信验证码
    var regpw = /^[a-zA-Z0-9_-]{6,16}$/
    regexp(tel, regtel);
    regexp(qq, regqq);
    regexp(nc, regnc);
    regexp(code, regcode);
    regexp(pw, regpw);

    function regexp(ele, reg) {
        ele.addEventListener("blur", function() {
            if (reg.test(this.value)) {
                // console.log('正确');
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i></i>恭喜你输入正确';
            } else {
                // console.log('错误');
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i></i>格式不正确，请重新输入';

            }
        })
    };
    again.addEventListener("blur", function() {
        if (this.value == pw.value) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i></i>恭喜你输入正确';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i></i>两次密码输入不一致';
        }
    })
})