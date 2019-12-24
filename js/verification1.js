/**
 * 正则表达式参照表
 * 手机号码（国内):	rule_phone			/^1[34578]\d{9}$/
 * 电话号码(国内):	rule_tel			/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
 * 身份证号:			rule_userID			/^\d{15}$)|(^\d{17}([0-9]|X)$/
 * 邮政编码:			rule_postalCode		/^[0-9]{6}$/
 * Email地址:		rule_email			/^([A-Za-z0-9_\-\.])+\@(163.com|qq.com|42du.cn)$/
 * 格式日期:			rule_date			/^\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}$/
 * QQ:				rule_qq				/^[1-9]\d{5,12}$/
 * 中文,数字或字母	rule_zna			/^[A-Za-z0-9_-\u4e00-\u9fa5]+$/
 */
var oCHCK = function () {
	var rule_phone = false;//手机号码（国内) 
	var rule_tel = false;//电话号码(国内) 
	var rule_userID = false;//身份证号 
	var rule_postalCode = false;//邮政编码
	var rule_email = false;//Email地址
	var rule_date = false;//格式日期
	var rule_qq = false;//QQ
	var rule_zna = false;//中文,数字或字母
	var rule_username = false;//姓名校验，包含少数名族
	var oCheck = document.getElementById('showTempl');//父级IDIdName  showTempl
	//获取验证Class;
	function getByClass(o, s){
		var aEle = document.getElementsByTagName('*');
		var arr = [];
		for (var i = 0; i < aEle.length; i++) {
			if (aEle[i].className == s) {
				arr.push(aEle[i]);
			}
		}
		return arr;
	}
	//手机号码校验
	//ClassName  rule_phone
    function rulePhone() {
        var oChxm = getByClass(oCheck, 'rule_phone')[0];
        var rule_phone_check = /^1[34578]\d{9}$/;
        rule_phone_check.onkeyup = function () {
            if (this.value.length > 6) {
                this.value = this.value.substr(0, 6)
            }
            if (reQQ.test(this.value)) {
                mui(this).classList.add('ingreen');
                rule_phone = true;
                return;
            } else {
                this.nextSibling.innerHTML = '请输入正确的手机号码';
                this.nextSibling.className = '';              
                mui(this).classList.remove('ingreen').add('inred');
                rule_phone = false;
                return;
            }
        }

    }
    
};