var provinces = new Array("京","沪","浙","苏","粤","鲁","晋","冀",
            "豫","川","渝","辽","吉","黑","皖","鄂",
            "津","贵","云","桂","琼","青","新","藏",
            "蒙","宁","甘","陕","闽","赣","湘");

var keyNums = new Array("Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M","1","2","3","4","5","6","7","8","9","0","删除","确定");
var next=0;			
function showProvince(){
		$("#pro").html("");
		var ss="";
		for(var i=0;i<provinces.length;i++){
			ss=ss+addKeyProvince(i)
		} 
		$("#pro").html("<ul class='clearfix ul_pro'>"+ss+"</ul><div style='margin-top: 5px;' class='mui-flex card_btn'><div class='li_close mui-flex-item clear_num' onclick='closePro();'>关闭</div><div class='li_clean submit_num mui-flex-item' onclick='cleanPro();'>清空</div>");
} 
function showKeybord(){
		$("#pro").html("");
		var sss="";
		for(var i=0;i<keyNums.length;i++){
			sss=sss+'<li class="ikey ikey'+i+' '+(i>9?"li_zm":"li_num")+' '+(i>25?"li_w":"")+' '+(i>19?"li_v":"")+' '+(i>9?"li_s":"")+'" ><span onclick="choosekey(this,'+i+');">'+keyNums[i]+'</span></li>'
		} 
		$("#pro").html("<ul class='clearfix ul_keybord'>"+sss+"</ul>");
}
function addKeyProvince(provinceIds){
    var addHtml = '<li>';
        addHtml += '<span onclick="chooseProvince(this);">'+provinces[provinceIds]+'</span>';
        addHtml += '</li>';
        return addHtml;
}

function chooseProvince(obj){
   $(".input_pro span").text($(obj).text());
   $(".input_pro").addClass("hasPro");
   $(".input_pp").find("span").text("");
   $(".ppHas").removeClass("ppHas");
   next=0;
   showKeybord();
}	



function choosekey(obj,jj){
	if(jj==37){
		layer.closeAll();
		console.log('**********车牌号焦点'+chpNumber);
//			var carNumber = '陕K19776';
		var chpNumber = $(".car_input").attr("data-pai");
		$('#cph_input').val(chpNumber);//将车牌号码填充到隐藏域,方便后期调用
//		if($("input[data-labelnames='车牌号']")){
//			$("input[data-labelnames='车牌号']").val(chpNumber);
//		}
    	carCplxdm(chpNumber);//回填车辆类型到下来选项中
	}else if(jj==36){
		if($(".ppHas").length==0){
			$(".hasPro").find("span").text("");			
			$(".hasPro").removeClass("hasPro");	
			showProvince();
			next=0;
		}
		$(".ppHas:last").find("span").text("");			
		$(".ppHas:last").removeClass("ppHas");	
		next=next-1;
		if(next<1){
			next=0;
		}
//			console.log(next);
	}else{
		if(next>5){
			return
		}
//			console.log(next);
		for(var i = 0; i<$(".input_pp").length;i++){
			if(next==0 & jj>25 & $(".input_pp:eq("+next+")").hasClass("input_zim")){
				layer.open({
					content: '车牌第二位为字母',
					skin: 'msg',
					time: 1
				});
				return;
			}
			$(".input_pp:eq("+next+")").find("span").text($(obj).text());
			$(".input_pp:eq("+next+")").addClass("ppHas");
			next=next+1;
			if(next>5){
				next=6;
			}
			getpai();
			return
		}
		
	}
}
//function CPHtype(){
//	alert('dd')
//	carCplxdm($('#car_cph').val());//回填车辆类型到下来选项中
//};
function closePro(){
   layer.closeAll()
}		
function cleanPro(){
   $(".ul_input").find("span").text("");
   $(".hasPro").removeClass("hasPro");
   $(".ppHas").removeClass("ppHas");
   next=0;
}	
function trimStr(str){return str.replace(/\s/g,"");}
function getpai(){
//		console.log($(".car_input").text())
	var pai=trimStr($(".car_input").text());
//		console.log(pai)
	$(".car_input").attr("data-pai",pai);
}
/*身份证虚拟键盘*/
; (function ($) {
    /*
     * 文本域光标操作（选、添、删、取）的jQuery扩展 @Mr.Think http://mrthink.net/text-field-jquery-extend/
     */
    $.fn.extend({
        /*
         * 获取光标所在位置
         */
        iGetFieldPos: function () {
            var field = this.get(0);
            if (document.selection) {
                //IE
                $(this).focus();
                var sel = document.selection;
                var range = sel.createRange();
                var dupRange = range.duplicate();
                dupRange.moveToElementText(field);
                dupRange.setEndPoint('EndToEnd', range);
                field.selectionStart = dupRange.text.length - range.text.length;
                field.selectionEnd = field.selectionStart + range.text.length;
            }
            return field.selectionStart;
        },
        /*
         * 选中指定位置内字符 || 设置光标位置
         * --- 从start起选中(含第start个)，到第end结束（不含第end个）
         * --- 若不输入end值，即为设置光标的位置（第start字符后）
         */
        iSelectField: function (start, end) {
            var field = this.get(0);
            //end未定义，则为设置光标位置
            if (arguments[1] == undefined) {
                end = start;
            }
            if (document.selection) {
                //IE
                var range = field.createTextRange();
                range.moveEnd('character', -$(this).val().length);
                range.moveEnd('character', end);
                range.moveStart('character', start);
                range.select();
            } else {
                //非IE
                field.setSelectionRange(start, end);
                $(this).focus();
            }
        },
        /*
         * 选中指定字符串
         */
        iSelectStr: function (str) {
            var field = this.get(0);
            var i = $(this).val().indexOf(str);
            i != -1 ? $(this).iSelectField(i, i + str.length) : false;
        },
        /*
         * 在光标之后插入字符串
         */
        iAddField: function (str) {
            var field = this.get(0);
            var v = $(this).val();
            var len = $(this).val().length;
            if (document.selection) {
                //IE
                $(this).focus()
                document.selection.createRange().text = str;
            } else {
                //非IE
                var selPos = field.selectionStart;
                $(this).val($(this).val().slice(0, field.selectionStart) + str + $(this).val().slice(field.selectionStart, len));
                this.iSelectField(selPos + str.length);
            };
        },
        /*
         * 删除光标前面(-)或者后面(+)的n个字符
         */
        iDelField: function (n) {
            var field = this.get(0);
            var pos = $(this).iGetFieldPos();
            var v = $(this).val();
            //大于0则删除后面，小于0则删除前面
            $(this).val(n > 0 ? v.slice(0, pos - n) + v.slice(pos) : v.slice(0, pos) + v.slice(pos - n));
            $(this).iSelectField(pos - (n < 0 ? 0 : n));
        }
    });
})(jQuery);
var id_number = '';
$('#input_number').focus(function(e){
	document.activeElement.blur();
	clearPerson();//清空人员
	clearCar();//清空车辆
	plus.plugintest.PluginHideKeyboard(["Html5"],function(result) {
        $('#input_number').val(result);//将车牌号码填充到隐藏域,方便后期调用
    },function(result){
    	console.log('插件调用异常');
    });
	/*layer.open({
		type: 1
		,area:['100%', '80%']
		,content:'<div class="temporary_input"><input type="text" class="temporary_val" /></div><div class="form_edit clearfix"><div class="card_number"><div class="mui-flex"><div class="num mui-flex-item" onclick="keyValue(this)">1</div><div class="num mui-flex-item" onclick="keyValue(this)">2</div><div class="num mui-flex-item" onclick="keyValue(this)">3</div></div><div class="mui-flex"><div class="num mui-flex-item" onclick="keyValue(this)">4</div><div class="num mui-flex-item" onclick="keyValue(this)">5</div><div class="num mui-flex-item" onclick="keyValue(this)">6</div></div><div class="mui-flex"><div class="num mui-flex-item" onclick="keyValue(this)">7</div><div class="num mui-flex-item" onclick="keyValue(this)">8</div><div class="num mui-flex-item" onclick="keyValue(this)">9</div></div><div class="mui-flex"><div class="num mui-flex-item" onclick="keyValue(this)">X</div><div class="num mui-flex-item" onclick="keyValue(this)">0</div><div class="num mui-flex-item" data-key="37" onclick="keyValue(this)">删除</div></div></div><div class="card_btn mui-flex"><div class="num mui-flex-item clear_num" data-key="13" onclick="keyValue(this)">清空</div><div class="num mui-flex-item submit_num" data-key="29" onclick="keyValue(this)">确定</div></div></div>'
		,anim: 'up'
		,style: 'position:fixed; bottom:0; left:0; width: 100%;padding:10px 0; border:none;'
		,success: function(layero, index){
			console.log(layero, index);
			$('.temporary_val').focus(function(e){
				document.activeElement.blur();
			});
			$('.temporary_val').val(id_number);
		}
	});*/
});
//阻止系统键盘
function activeEleme(_this){
	document.activeElement.blur();
}
function keyValue(_this){
	console.log($(_this).attr('data-key'))
	if($(_this).attr('data-key')==null){
		id_number += $(_this).html();
		$('.temporary_val').val(id_number);
	}else if($(_this).attr('data-key')==37){
		
		$('.temporary_val').iDelField(1);
        
		id_number = $('.temporary_val').val();
	}else if($(_this).attr('data-key')==13){
		$('.temporary_val').val('');
		$('#input_number').val('');
		id_number = '';
	}else if($(_this).attr('data-key')==29){
		$('#input_number').val(id_number);
		testId(id_number);//验证身份证规则
		findByCardIdPerson(id_number);//根据身份证号查询用户信息，将结果数据填充到核查结果区域中
	}
}
//身份核查点击事件 
$('#person_check_btn').on('tap',function(){
	$(this).addClass("mui-disabled").removeClass('mui-btn-blue');
	if($('#input_number').val()==''){
		findByCardIdPerson($('#input_number').val());//根据身份证号查询用户信息，将结果数据填充到核查结果区域中
	}else{
		findByCardIdPerson($('#input_number').val());//根据身份证号查询用户信息，将结果数据填充到核查结果区域中
	}
	 $(this).removeClass("mui-disabled").addClass('mui-btn-blue');
});
