//获取当前登录用户ID，系统时间填充到页面中，作为默认值提交
var date = new Date();
var seperator1 = "-";
var seperator2 = ":";
var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
function checkTime(i){
	if (i<10){
		i = "0" + i;
	}
	return i;
}
//	var userIdVal = '';//测试完成后删除
var createTimeVal = date.getFullYear() + seperator1  + month  + seperator1  + strDate	+ " "  + date.getHours()  + seperator2  + checkTime(date.getMinutes())  + seperator2 +  + checkTime(date.getSeconds());//获取日期与时间
console.log(createTimeVal);
/*
 *查询基础表字段,在页面通过模板展示字段及录入框
 */
var carDataSource = '';
var psersonDataSource = '';
function dataPersonCar(tableId,tableName,formType){
	debugger;
	var userIdVal = app.getUser().userid;//测试完成后启用
	var relationIdVal = '';
	var appendHtml = "<input type='hidden' id='userId' value='"+userIdVal+"' class='mui-input-clear' name='userId'/>";
	appendHtml+="<input type='hidden' id='createTime' value='"+createTimeVal+"' class='mui-input-clear' name='createTime'/>";
	appendHtml+="<input type='hidden' value='"+createTimeVal+"' class='mui-input-clear' name='col_10'/>";
	appendHtml+="<input type='hidden' id='relationId' value='"+relationIdVal+"' class='mui-input-clear' name='relationId'/>";
	
	//测试完成后启用该地址
	mui.ajax(base_url+'base/table/'+tableId+'/DEPUTY1?guid='+new Date().getTime(),{
//	mui.ajax('js/test.json',{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded' //此处如果使用application/json 会遇到post发送参数失败的问题
			,'user_id_token':app.getUser().userid		
			,'urlName':"采集信息页面数据获取"
		},
		dataType:'json',//服务器返回json格式数据
		type:'get',//HTTP请求类型
		timeout:10000,//超时时间设置为10秒；	
		beforeSend: function() {
			plus.nativeUI.showWaiting('正在加载');
			mask.show();//显示遮罩层
		},
		complete: function() {
			plus.nativeUI.closeWaiting();
			mask.close();//关闭遮罩层
		},
		success:function(data){
//			if(tableName=='QS_LDRKXX'){
//				var data = data.formDataPerson;//测试完成后删除
//			}
//			if(tableName=='QS_BDCLXX'){
//				var data = data.formCarData;//测试完成后删除
//			}
//			console.log(JSON.stringify(data))
			if(data.message="success"){
				if(data.data.column.length<1){
					$("#showTempl").html('<div style="text-align:center;padding:6rem 0 0"><div style="padding-bottom:1rem;text-align:center;"><img src="img/none.png" style="height:5rem;widht:5rem" /></div><p style="color:#eee;font-size:1.125rem">数据采集内容未同步</p><button class="mui-btn mui-action-back" style="background:#00fcff; padding: 0.4rem 1.6rem;border: none;">返回</button></div>');
					$('footer').hide();
				}else{
					$('footer').show();
					//将内容通过template-web js模板添加到DOM中
					
					if(tableName=='QS_LDRKXX'){						
						var userGroupHtml=template('userGroupTempl',data);
						var userListHtml=template('userListTempl',data);
						$("#userGroupHtml").html(userGroupHtml);
						$("#userListHtml").html(userListHtml+appendHtml);
						/*//隐藏不需要展示的字段
						$('label').each(function(index, element){
							var labelName = $(element).attr('data-labelName');	
							if(labelName=='姓名'){
								$(element).hide().next('div').hide();
							}else if(labelName=='出生日期'){
								$(element).hide().next('div').hide();
							}else if(labelName=='民族'){
								$(element).hide().next('div').hide();
							}else if(labelName=='户籍地址'){
								$(element).hide().next('div').hide();
							}
						});*/
						if(psersonDataSource.length != 0){
							if(psersonDataSource.data[0].message=='重点人口'){
								var BLdataSource = psersonDataSource.data[0].data;
								console.log("BLdataSource:"+JSON.stringify(BLdataSource));
								$('label').each(function(index, element){
									var labelName = $(element).attr('data-labelName');			
									if(labelName=='姓名'){
										$(element).next('div').find('input').val(BLdataSource.zdry.XM);
									}else if(labelName=='出生日期'){
										$(element).next('div').find('input').val(BLdataSource.zdry.CSRQ.substring(0,4)+'-'+BLdataSource.zdry.CSRQ.substring(4,6)+'-'+BLdataSource.zdry.CSRQ.substring(6,8));
									}else if(labelName=='民族'){
										$(element).next("div").find('select').find("option:contains('"+BLdataSource.zdry.MZ+"')").attr("selected",true);
									}else if(labelName=='婚姻状况'){
										$(element).next("div").find('select').find("option:contains('"+BLdataSource.zdry.HYZK+"')").attr("selected",true);
									}else if(labelName=='暂住地址详址'){
										$(element).next('div').find('input').val(BLdataSource.zdry.ZZD_XXDZ);
									}else if(labelName=='暂住证签发日期'){
										$(element).next('div').find('input').val(BLdataSource.zdry.ZZZ_QFRQ);
									}else if(labelName=='现服务场所'){
										$(element).next('div').find('input').val(BLdataSource.zdry.X_FWCS);
									}else if(labelName=='现从事职业'){
										$(element).next('div').find('input').val(BLdataSource.zdry.XCS_ZY);
									}else if(labelName=='暂住事由'){
										$(element).next('div').find('input').val(BLdataSource.zdry.ZZ_JZSYDM);
									}else if(labelName=='暂住证编号'){
										$(element).next('div').find('input').val(BLdataSource.zdry.ZZJZZMBH);
									}else if(labelName=='QQ号'){
										$(element).next('div').find('input').val(BLdataSource.zdry.QQH);
									}else if(labelName=='微信号'){
										$(element).next('div').find('input').val(BLdataSource.zdry.WXH);
									}else if(labelName=='微博号'){
										$(element).next('div').find('input').val(BLdataSource.zdry.WBH);
									}else if(labelName=='暂住地址区划'){
										$(element).next('div').find('input').val(BLdataSource.zdry.ZZD_XZQHDM);
									}else if(labelName=='来本地日期'){
										$(element).next('div').find('input').val(BLdataSource.zdry.LBSSJ);
									}else if(labelName=='所属公安机关名称'){
										$(element).next('div').find('input').val(BLdataSource.zdry.HJD_PCS);
									}else if(labelName=='原表主键'){
										$(element).next('div').find('input').val(BLdataSource.zdry.JL_YBZJ);
									}
								});
							}else{
								if(psersonDataSource.data[0].message=='在逃人口'){
									var BLdataSource = psersonDataSource.data[0].data;
									console.log("BLdataSource:"+JSON.stringify(BLdataSource));
									$('label').each(function(index, element){
										var labelName = $(element).attr('data-labelName');		
										if(labelName=='姓名'){
											$(element).next('div').find('input').val(BLdataSource.ztry.XM);
										}else if(labelName=='出生日期'){
											$(element).next('div').find('input').val(BLdataSource.ztry.CSRQ.substring(0,4)+'-'+BLdataSource.ztry.CSRQ.substring(4,6)+'-'+BLdataSource.ztry.CSRQ.substring(6,8));
										}else if(labelName=='民族'){
											$(element).next("div").find('select').find("option:contains('"+BLdataSource.ztry.MZDM+"')").attr("selected",true);
										}else if(labelName=='婚姻状况'){
											$(element).next("div").find('select').find("option:contains('"+BLdataSource.ztry.HYZK+"')").attr("selected",true);
										}else if(labelName=='暂住地址详址'){
											$(element).next('div').find('input').val(BLdataSource.ztry.ZZD_XXDZ);
										}else if(labelName=='暂住证签发日期'){
											$(element).next('div').find('input').val(BLdataSource.ztry.ZZZ_QFRQ);
										}else if(labelName=='现服务场所'){
											$(element).next('div').find('input').val(BLdataSource.ztry.X_FWCS);
										}else if(labelName=='现从事职业'){
											$(element).next('div').find('input').val(BLdataSource.ztry.XCS_ZY);
										}else if(labelName=='暂住事由'){
											$(element).next('div').find('input').val(BLdataSource.ztry.ZZ_JZSYDM);
										}else if(labelName=='暂住证编号'){
											$(element).next('div').find('input').val(BLdataSource.ztry.ZZJZZMBH);
										}else if(labelName=='QQ号'){
											$(element).next('div').find('input').val(BLdataSource.ztry.QQH);
										}else if(labelName=='微信号'){
											$(element).next('div').find('input').val(BLdataSource.ztry.WXH);
										}else if(labelName=='微博号'){
											$(element).next('div').find('input').val(BLdataSource.ztry.WBH);
										}else if(labelName=='暂住地址区划'){
											$(element).next('div').find('input').val(BLdataSource.ztry.ZZD_XZQHDM);
										}else if(labelName=='来本地日期'){
											$(element).next('div').find('input').val(BLdataSource.ztry.LBSSJ);
										}else if(labelName=='所属公安机关名称'){
											$(element).next('div').find('input').val(BLdataSource.ztry.SSGAJGMC);
										}else if(labelName=='原表主键'){
											$(element).next('div').find('input').val(BLdataSource.ztry.JL_YBZJ);
										}
									});
								}
								if(psersonDataSource.data[1].code=='200'){ //常住人口
									var BLdataSource = psersonDataSource.data[1];
									console.log("BLdataSource:"+JSON.stringify(BLdataSource));
									$('label').each(function(index, element){
										var labelName = $(element).attr('data-labelName');		
										console.log("婚姻状况:"+JSON.stringify(BLdataSource.data.czrk.hyzkdm));
										if(labelName=='姓名'){
											$(element).next('div').find('input').val(BLdataSource.data.czrk.xm);
										}else if(labelName=='出生日期'){
											$(element).next('div').find('input').val(BLdataSource.data.czrk.csrq.substring(0,4)+'-'+BLdataSource.data.czrk.csrq.substring(4,6)+'-'+BLdataSource.data.czrk.csrq.substring(6,8));
										}else if(labelName=='民族'){
											$(element).next("div").find('select').find("option:contains('"+BLdataSource.data.czrk.mzdm+"')").attr("selected",true);
										}else if(labelName=='户籍地址'){
											$(element).next('div').find('input').val(BLdataSource.data.czrk.xxdz);
										}else if(labelName=='婚姻状况'){
											$(element).next("div").find('select').find("option:contains('"+BLdataSource.data.czrk.hyzkdm+"')").attr("selected",true);
										}else if(labelName=='暂住地址详址'){
											$(element).next('div').find('input').val(BLdataSource.data.czrk.zzd_xxdz);
										}else if(labelName=='暂住证签发日期'){
											$(element).next('div').find('input').val(BLdataSource.data.czrk.zzz_qfrq);
										}else if(labelName=='现服务场所'){
											$(element).next('div').find('input').val(BLdataSource.data.czrk.x_fwcs);
										}else if(labelName=='现从事职业'){
											$(element).next('div').find('input').val(BLdataSource.data.czrk.xcs_zy);
										}else if(labelName=='暂住证编号'){
											$(element).next('div').find('input').val(BLdataSource.data.czrk.zzjzzmbh);
										}else if(labelName=='QQ号'){
											$(element).next('div').find('input').val(BLdataSource.data.czrk.qqh);
										}else if(labelName=='微信号'){
											$(element).next('div').find('input').val(BLdataSource.data.czrk.wxh);
										}else if(labelName=='微博号'){
											$(element).next('div').find('input').val(BLdataSource.data.czrk.wbh);
										}else if(labelName=='暂住地址区划'){
											$(element).next('div').find('input').val(BLdataSource.data.czrk.zzd_xzqhdm);
										}else if(labelName=='来本地日期'){
											$(element).next('div').find('input').val(BLdataSource.data.czrk.lbssj);
										}else if(labelName=='所属公安机关名称'){
											$(element).next('div').find('input').val(BLdataSource.data.czrk.pcs_gajgjgmc);
										}else if(labelName=='原表主键'){
											$(element).next('div').find('input').val(BLdataSource.data.czrk.jl_ybzj);
										}
									});
								}
								if(psersonDataSource.data[2].code=='200'){ //暂住人口
									var dataSource = data.data[2];
									var BLdataSource = psersonDataSource.data[2];
									console.log("BLdataSource:"+JSON.stringify(BLdataSource));
									$('label').each(function(index, element){
										var labelName = $(element).attr('data-labelName');
										if(labelName=='姓名'){
											$(element).next('div').find('input').val(BLdataSource.data.zzrk.xm);
										}else if(labelName=='出生日期'){
											$(element).next('div').find('input').val(BLdataSource.data.zzrk.csrq.substring(0,4)+'-'+BLdataSource.data.zzrk.csrq.substring(4,6)+'-'+BLdataSource.data.zzrk.csrq.substring(6,8));
										}else if(labelName=='民族'){
											$(element).next("div").find('select').find("option:contains('"+BLdataSource.data.zzrk.mz+"')").attr("selected",true);
										}else if(labelName=='婚姻状况'){
											$(element).next("div").find('select').find("option:contains('"+BLdataSource.data.zzrk.hyzk+"')").attr("selected",true);
										}else if(labelName=='暂住地址详址'){
											$(element).next('div').find('input').val(BLdataSource.data.zzrk.zzd_xxdz);
										}else if(labelName=='暂住证签发日期'){
											$(element).next('div').find('input').val(BLdataSource.data.zzrk.zzz_qfrq);
										}else if(labelName=='现服务场所'){
											$(element).next('div').find('input').val(BLdataSource.data.zzrk.x_fwcs);
										}else if(labelName=='现从事职业'){
											$(element).next('div').find('input').val(BLdataSource.data.zzrk.xcs_zy);
										}else if(labelName=='暂住事由'){
											$(element).next('div').find('input').val(BLdataSource.data.zzrk.zz_jzsydm);
										}else if(labelName=='暂住证编号'){
											$(element).next('div').find('input').val(BLdataSource.data.zzrk.zzjzzmbh);
										}else if(labelName=='QQ号'){
											$(element).next('div').find('input').val(BLdataSource.data.zzrk.qqh);
										}else if(labelName=='微信号'){
											$(element).next('div').find('input').val(BLdataSource.data.zzrk.wxh);
										}else if(labelName=='微博号'){
											$(element).next('div').find('input').val(BLdataSource.data.zzrk.wbh);
										}else if(labelName=='暂住地址区划'){
											$(element).next('div').find('input').val(BLdataSource.data.zzrk.zzd_xzqhdm);
										}else if(labelName=='来本地日期'){
											$(element).next('div').find('input').val(BLdataSource.data.zzrk.lbssj);
										}else if(labelName=='所属公安机关名称'){
											$(element).next('div').find('input').val(BLdataSource.data.zzrk.ss_gajgjgmc);
										}else if(labelName=='原表主键'){
											$(element).next('div').find('input').val(BLdataSource.data.zzrk.jl_ybzj);
										}
									});
								}
							}
						}
						//引入验证插件方法，具体验证规则参见对应的js/verification.js
//						console.log(formType)
						$('#'+formType).vali();
					}
					if(tableName=='QS_BDCLXX'){
						
						var carGroupHtml=template('carGroupTempl',data);
						var carListHtml=template('carListTempl',data);
						$("#carGroupHtml").html(carGroupHtml);
						$("#carListHtml").html(carListHtml+appendHtml);
						
						console.log(JSON.stringify(carDataSource))
						$('label').each(function(index, element){
							var labelName = $(element).attr('data-labelName');							
							console.log('labelName'+labelName);							
							if(labelName=='车辆颜色'){
								$(element).next('div').find('input').val(carDataSource.csysdm);
							}else if(labelName=='车辆品牌'){
								$(element).next('div').find('input').val(carDataSource.zwpp);
							}else if(labelName=='发动机号'){
								$(element).next('div').find('input').val(carDataSource.fdjddjh);
							}else if(labelName=='识别代码'){
								$(element).next('div').find('input').val(carDataSource.clsb_dm);
							}else if(labelName=='车辆型号'){
								$(element).next('div').find('input').val(carDataSource.clxh);
							}else if(labelName=='所有人'){
								$(element).next('div').find('input').val(carDataSource.syr);
							}else if(labelName=='备注'){
								$(element).next('div').find('input').val(carDataSource.bz);
							}else if(labelName=='驾驶人姓名'){
								$(element).next('div').find('input').val(carDataSource.jsrxm);
							}else if(labelName=='驾驶人性别'){
								$(element).next('div').find('input').val(carDataSource.jsrxb);
							}else if(labelName=='驾驶人电话'){
								$(element).next('div').find('input').val(carDataSource.jsrdh);
							}else if(labelName=='驾驶证号'){
								$(element).next('div').find('input').val(carDataSource.jszh);
							}else if(labelName=='采集地址'){
								$(element).next('div').find('input').val(carDataSource.cjdz);
							}else if(labelName=='原表主键'){
								$(element).next('div').find('input').val(carDataSource.jl_ybzj);
							}
						});
						//引入验证插件方法，具体验证规则参见对应的js/verification.js
						$('#'+formType).vali();
					}
					
					//调用经纬度方法
					PluginTestJwd();
					//重新初始化开关switch
					mui('.mui-content .mui-switch')['switch']();
					mui('.mui-scroll-wrapper').scroll({
						deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
					});
					//调用 打开系统选择框按钮
					$(".areaCinema_img").on('tap',function(e) {
//						e.stopPropagation();
						var obj = $(this);
						if (mui.os.plus) {
					        var buttonTit = [{
					            title: "拍照"
					        }, {
					            title: "从手机相册选择"
					        }];
					        
					        plus.nativeUI.actionSheet({
					            title: "上传图片",
					            cancel: "取消",
					            buttons: buttonTit
					        }, function(b) { /*actionSheet 按钮点击事件*/
					            switch (b.index) {
					                case 0:
					                    break;
					                case 1:
					                    getImage(obj); /*拍照*/
					                    break;
					                case 2:
					                    galleryImg(obj);/*打开相册*/
					                    break;
					                default:
					                    break;
					            }
					        })
					    }        
					});
					//日期选择插件
			        (function($$) {
						var result = $('#result')[0];
						var btns = $('.check-date'); 
						btns.each(function(i, btn) {
							btn.addEventListener('tap', function(e) {
								var _self = this;
								if(_self.picker) {
									_self.picker.show(function (rs) {
										console.log('选择结果: ' + rs.text); 
										$(btns).val(rs.text);
										btns.value = rs.text;
										_self.picker.dispose();
										_self.picker = null;
									});
								} else {
									var optionsJson = this.getAttribute('data-options') || '{}';
									var options = JSON.parse(optionsJson);
									var id = this.getAttribute('id');
									
									_self.picker = new $$.DtPicker(options);
									_self.picker.show(function(rs) {
										/*
										 * rs.value 拼合后的 value
										 * rs.text 拼合后的 text
										 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
										 * rs.m 月，用法同年
										 * rs.d 日，用法同年
										 * rs.h 时，用法同年
										 * rs.i 分（minutes 的第二个字母），用法同年
										 */
													console.log('选择结果1: ' + rs.text+' '+rs.h.text+':'+rs.i.text);
										
//										$(btns).val(rs.text);
										$(_self).val(rs.text)
										_self.picker.dispose();
										_self.picker = null;
									});
								}
								
							}, false);
						});
					})(mui);
					
					//同行同住点击跳转
					mui('.flow_person').on('tap', 'a', function() {
						var href = this.getAttribute('href');
						
						//非plus环境，直接走href跳转
						if(!mui.os.plus) {
							location.href = href;
							return;
						}
						//打开新窗口
						var id = this.getAttribute("data-wid");
						if(!id) {
							id = href;
						}
						
						if(href && ~href.indexOf('.html')) {
							txz = this.getAttribute("dataTitle");
							//打开窗口的相关参数
							var options = {
								styles:{
									popGesture: "close"
								},
								extras:{
									"relationTableDeputy":this.getAttribute("dataRelationTableDeputy"),
									"relationTableId":this.getAttribute("dataRelationTableId"),
									"relationTableName":this.getAttribute("dataRelationTableName"),
									"tableId":this.getAttribute("dtaTableId"),
									"tableName":this.getAttribute("dataTableName"),
									"tableComment":this.getAttribute("dataTitle"),
									"mainId":$('#mainId').val()
								}
							};
							mui.openWindow(href,id,options);
						}
					});
				}
			}else{
				
			}
		}
	});	
}
/*
 *根据身份证号查询用户信息，将结果数据填充到核查结果区域中
 */
function findByCardIdPerson(idcardVal){
//	console.log('进入身份核查方法')
	plus.nativeUI.showWaiting('正在查询，请稍后');
	mask.show();//显示遮罩层
	//console.log(base_url_pc+"postgresql/finByIdcardPersonInfo?idCard="+idcardVal)
	layer.closeAll();
	var idcardVal = "610013197504230035";
	//$('#header_img').attr('src',base_url_pc+"postgresql/images.xhtml?idCard="+idcardVal+"&guid="+new Date().getTime());
	mui.ajax(base_url_pc+"phone/postgresql/images",{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded' //此处如果使用application/json 会遇到post发送参数失败的问题
			,'user_id_token':app.getUser().userid		
			,'urlName':"身份证照片获取"
		},
		data:{
			"idCard":idcardVal
		},//测试完成后启用
		//dataType:'json',//服务器返回json格式数据
		type:'post',//HTTP请求类型  改为pos
		timeout:100000,//超时时间设置为10秒;
		success:function(data){
			if(data == 'error'){
				$('#header_img').attr('src','img/touxiang.png');
			}else{
				clearPerson();
				clearCar();
				$('#header_img').attr('src',data);
			}
			
		},
		error:function(xhr,type,errorThrown){
			//异常处理；
			mui.toast('网络异常,请重试!');
			console.log(type);
		}
	});
	
	//测试完成后启用该地址
	mui.ajax(base_url_pc+"phone/postgresql/finByIdcardPersonInfo?guid="+new Date().getTime(),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded' //此处如果使用application/json 会遇到post发送参数失败的问题
			,'user_id_token':app.getUser().userid	
			,'urlName':"人员核查"
		},
		data:{
			"idCard":idcardVal
		},//测试完成后启用
		//dataType:'json',//服务器返回json格式数据
		type:'post',//HTTP请求类型  改为pos
		timeout:100000,//超时时间设置为10秒;
		success:function(data){
//			var data = data.finByIdcardPersonInfo;//测试完成后删除
			console.log(JSON.stringify(data))
			psersonDataSource = data;
			if(data.data[0].message=='重点人口'){//在逃+重点
//				clearPerson();
//				clearCar();
				var dataSource = data.data[0].data;
				console.log("**************dataSource00000000:"+JSON.stringify(dataSource));
				console.log("**************csrq:"+dataSource.zdry.MZ);
				$('#p_name').html(dataSource.zdry.XM);
				$('#p_sex').html(dataSource.zdry.XB);				
				$('#p_bir_y').html(dataSource.zdry.CSRQ.substring(0,4));
				$('#p_bir_m').html(dataSource.zdry.CSRQ.substring(4,6));
				$('#p_bir_d').html(dataSource.zdry.CSRQ.substring(6,8));				
				$('#p_address').html(dataSource.zdry.HJD_XXDZ);
				$('#p_userCard').html(dataSource.zdry.GMSFZHM);
				$('#p_mz').html(dataSource.zdry.MZ);
				
				//填充隐藏域的值
				$('#p_name_form').val(dataSource.zdry.XM);
				$('#p_sex_form').val(dataSource.zdry.XB);				
				$('#p_bir_form').val(dataSource.zdry.CSRQ);		
				$('#p_address_form').val(dataSource.zdry.HJD_XXDZ);
				$('#p_userCard_form').val(dataSource.zdry.GMSFZHM);
				$('#p_mz_form').val(dataSource.zdry.MZ);
				
				if(dataSource.result=='yes'){
					$('.zd_tips').removeClass('mui-hidden').show().html('<i class="iconfont icon-warning"></i>'+data.data[0].message);
					//将内容通过template-web js模板添加到DOM中
					console.log(data.data[0].message);
					var html=template('zdrDetalisTempl',dataSource.zdry);
					$("#topPopover").html(html);
				}else{
					$('.zd_tips').hide();
				}
			}
			if(data.data[0].message=='在逃人口'){//在逃+重点
//				clearPerson();
//				clearCar();
				var dataSource = data.data[0].data;
				console.log("**************dataSource33333:"+JSON.stringify(dataSource));
				$('#p_name').html(dataSource.ztry.XM);
				$('#p_sex').html(dataSource.ztry.XBDM);				
				$('#p_bir_y').html(dataSource.ztry.CSRQ.substring(0,4));
				$('#p_bir_m').html(dataSource.ztry.CSRQ.substring(5,7));
				$('#p_bir_d').html(dataSource.ztry.CSRQ.substring(8,10));				
				$('#p_address').html(dataSource.ztry.HJD_XXDZ);
				$('#p_userCard').html(dataSource.ztry.ZJHM);
				$('#p_mz').html(dataSource.ztry.MZDM);
				//填充隐藏域的值
				$('#p_name_form').val(dataSource.ztry.XM);
				$('#p_sex_form').val(dataSource.ztry.XBDM);				
				$('#p_bir_form').val(dataSource.ztry.CSRQ);		
				$('#p_address_form').val(dataSource.ztry.HJD_XXDZ);
				$('#p_userCard_form').val(dataSource.ztry.ZJHM);
				$('#p_mz_form').val(dataSource.ztry.MZDM);
				if(dataSource.result=='yes'){
					$('.zd_tips').removeClass('mui-hidden').show().html('<i class="iconfont icon-warning"></i>'+data.data[0].message);
					//将内容通过template-web js模板添加到DOM中
					var html=template('ztrDetalisTempl',dataSource.ztry);
					$("#topPopover").html(html);
				}else{
					$('.zd_tips').hide();
				}
			}
			if(data.data[1].code=='200'){ //常住人口	
				if(data.data[0].data.result!='yes'){					
//					clearPerson();
//					clearCar();
				}
				console.log("**************dataSource111111111:"+JSON.stringify(data.data[1]));
				var dataSource = data.data[1];
				console.log(dataSource.data.czrk.xm)
				$('#p_name').html(dataSource.data.czrk.xm);
				$('#p_sex').html(dataSource.data.czrk.xbdm);				
				$('#p_bir_y').html(dataSource.data.czrk.csrq.substring(0,4));
				$('#p_bir_m').html(dataSource.data.czrk.csrq.substring(4,6));
				$('#p_bir_d').html(dataSource.data.czrk.csrq.substring(6,8));				
				$('#p_address').html(dataSource.data.czrk.xxdz);
				$('#p_userCard').html(dataSource.data.czrk.gmsfzhm);
				$('#p_mz').html(dataSource.data.czrk.mzdm);
				//填充隐藏域的值
				$('#p_name_form').val(dataSource.data.czrk.xm);
				$('#p_sex_form').val(dataSource.data.czrk.xbdm);				
				$('#p_bir_form').val(dataSource.data.czrk.csrq);		
				$('#p_address_form').val(dataSource.data.czrk.xxdz);
				$('#p_userCard_form').val(dataSource.data.czrk.gmsfzhm);
				$('#p_mz_form').val(dataSource.data.czrk.mzdm);
			}
			if(data.data[2].code=='200'){ //暂住人口
				if(data.data[0].data.result!='yes'){					
//					clearPerson();
//					clearCar();
				}
				var dataSource = data.data[2];
				console.log("**************dataSource222222222222:"+JSON.stringify(data.data[2]));
				$('#p_name').html(dataSource.data.zzrk.xm);
				$('#p_sex').html(dataSource.data.zzrk.xb);				
				$('#p_bir_y').html(dataSource.data.zzrk.csrq.substring(0,4));
				$('#p_bir_m').html(dataSource.data.zzrk.csrq.substring(4,6));
				$('#p_bir_d').html(dataSource.data.zzrk.csrq.substring(6,8));				
				$('#p_address').html(dataSource.data.zzrk.czhkdz_xzqh);
				$('#p_userCard').html(dataSource.data.zzrk.gmsfzhm);
				$('#p_mz').html(dataSource.data.zzrk.mz);
				//填充隐藏域的值
				$('#p_name_form').val(dataSource.data.zzrk.xm);
				$('#p_sex_form').val(dataSource.data.zzrk.xb);				
				$('#p_bir_form').val(dataSource.data.zzrk.csrq);		
				$('#p_address_form').val(dataSource.data.zzrk.czhkdz_xzqh);
				$('#p_userCard_form').val(dataSource.data.zzrk.gmsfzhm);
				$('#p_mz_form').val(dataSource.data.zzrk.mz);
				$('label').each(function(index, element){
					var labelName = $(element).attr('data-labelName');
					if(labelName=='暂住地址详址'){
						$(element).next('div').find('input').val(dataSource.data.zzrk.zzd_xxdz);
					}else if(labelName=='暂住证签发日期'){
						$(element).next('div').find('input').val(dataSource.data.zzrk.zzz_qfrq);
					}else if(labelName=='现服务场所'){
						$(element).next('div').find('input').val(dataSource.data.zzrk.x_fwcs);
					}else if(labelName=='现从事职业'){
						$(element).next('div').find('input').val(dataSource.data.zzrk.xcs_zy);
					}else if(labelName=='暂住事由'){
						$(element).next('div').find('input').val(dataSource.data.zzrk.zz_jzsydm);
					}else if(labelName=='暂住证编号'){
						$(element).next('div').find('input').val(dataSource.data.zzrk.zzjzzmbh);
					}
				});
				
			}
			plus.nativeUI.closeWaiting();
			mask.close();//关闭遮罩层
			if(data.data[0].data.result == 'no' && data.data[1].code =='300' && data.data[2].code =='300'){
				mui.alert('暂未查询到数据，请检查身份证输入是否正确！')
			}
			
		},
		error:function(xhr,type,errorThrown){
			//异常处理；
			mui.toast('网络异常,请重试!');
			console.log(type);
		}
	});
    //根据身份证号获取身份照片
    
	
}
/*
 *根据车牌号码查询车辆类型填充到下拉框中
 */
function carCplxdm(_attr){
//	alert('_attr'+_attr)

	if($.trim(_attr).length != 0) { 
		mui.ajax(base_url_pc+"phone/postgresql/finByCarNumber?guid="+new Date().getTime(),{
			headers:{
				'Content-Type':'application/x-www-form-urlencoded' //此处如果使用application/json 会遇到post发送参数失败的问题
				,'user_id_token':app.getUser().userid	
				,'urlName':"车辆类型核查"
			},
			data:{
				"carNumber":_attr
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型 //测试完成后启用post
			timeout:10000,//超时时间设置为10秒;
			beforeSend: function() {
				plus.nativeUI.showWaiting('正在查询，请稍后');
				mask.show();//显示遮罩层
			},
			complete: function() {
				plus.nativeUI.closeWaiting();
				mask.close();//关闭遮罩层
			},
			success:function(data){
//				var data = data.carCplxdm;//测试完成后删除
				console.log(JSON.stringify(data))
				if(data.code=='200'){
					$('#sel_cllx').empty();
					var values=["请选择车辆类型"];//定义一个数组用来接受value 
					for	(var key in data.data[0]){
						values.push(data.data[0][key]);//取得value
//						console.log(key);
					}
					for (var i = 0; i < values.length; i++) {
						//如果在select中传递其他参数，可以在option 的value属性中添加参数
						//$("#selectSM").append("<option value='"+msg.rows[i].id+"'>"+msg.rows[i]+"</option>");
						$('#sel_cllx').append("<option value='"+values[i]+"'>"+values[i]+"</option>");
					}
				}else{ 
					console.log('//'+data.message);
				}
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				console.log(JSON.stringify(xhr)+JSON.stringify(type)+JSON.stringify(errorThrown));
			}
		});
	}
}
/**
 * 根据车牌号和车辆类型查询车辆信息，将结果数据填充到核查结果区域中
 */
 mui(document.body).on('tap', '#check_car', function(e) {
//  $(this).addClass("mui-disabled").removeClass('mui-btn-blue');
	var select_val = '微型普通客车';
	var carNumber = '京G00283';
//	console.log(select_val+carNumber)
	if(carNumber==''){
		mui.alert('请输入车牌号');
	}else if(select_val=='请选择车辆类型'){
		mui.alert('请选择车辆类型')
	}else{
		carDetalis(select_val,carNumber);//车辆详细信息回填
	}
//  $(this).removeClass("mui-disabled").addClass('mui-btn-blue');
});

function carDetalis(select_val,carNumber){
	console.log('*********车辆详细信息回填');
	//重点人员核查findfugitive
	console.log("carNumber:"+carNumber);
	
	if($.trim(carNumber).length == 0) { 
		$(this).focus();
	}else{	
		mui.ajax(
			,{
			headers:{
				'Content-Type':'application/x-www-form-urlencoded' //此处如果使用application/json 会遇到post发送参数失败的问题
				,'user_id_token':app.getUser().userid
				,'urlName':"车辆核查"
			},	
			data:{
				"carNumber":carNumber,
				"carType":select_val
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型//测试完成后启用post
			timeout:10000,//超时时间设置为10秒;
			beforeSend: function() {
				plus.nativeUI.showWaiting('正在查询，请稍后');
				mask.show();//显示遮罩层
			},
			complete: function() {
				plus.nativeUI.closeWaiting();
				mask.close();//关闭遮罩层
			},
			success:function(data){
//				var data = data.finByIdcardCarInfo;//测试完成后删除
				console.log(JSON.stringify(data))
				console.log(JSON.stringify(data.data.length))
				// 机动车基本信息				
				if(data.data[0].code=='200'){
					clearPerson();
					clearCar();
					var dataSource = data.data[0].data[0];
					datacl = data.data[0].data[0];
					console.log("**************dataSource:"+JSON.stringify(dataSource) );
					carDataSource = dataSource;
					$('#car_cphm').html(dataSource.cph);
					$('#car_cllx').html(dataSource.hpzldm);
					$('#car_clpp').html(dataSource.zwpp);
					$('#car_csysdm').html(dataSource.csysdm);
					$('#car_clsbdm').html(dataSource.clsbdh);
					$('#car_clxh').html(dataSource.clxh);
					$('#car_clxh').html(dataSource.cllx);
					$('#car_syr').html(dataSource.syr);
					$('#car_syr_id').html(dataSource.gmsfzhm);
					$('#car_fdjhm').html(dataSource.fdjddjh);
					//填充隐藏域的值
					$('#car_cphm_form').val(dataSource.cph);
					$('#car_cllx_form').val(dataSource.hpzldm);
					$('#car_clpp_form').val(dataSource.cl_pp);
					/*$('#car_csysdm_form').val(dataSource.csysdm);*/
					$('#car_clsbdm_form').val(dataSource.clsbdh);
					$('#car_clxh_form').val(dataSource.clxh);
					$('#car_clxh_form').val(dataSource.cllx);
					/*$('#car_syr_form').val(dataSource.syr);*/
					$('#car_syr_id_form').val(dataSource.gmsfzhm);
					$('#car_fdjhm_form').val(dataSource.fdjddjh);
					$('.zd_tips').hide();
				}
				//被盗信息
				if(data.data[1].code=='200'){
					clearPerson();
					clearCar();
					var dataSource = data.data[1].data[0][0];
					datacl = data.data[1].data[0][0];
					console.log(JSON.stringify(dataSource))
					carDataSource = dataSource;
					$('#zd_car_tips').removeClass('mui-hidden').show().html('<i class="iconfont icon-warning"></i>'+data.data[1].message);
					
					//将内容通过template-web js模板添加到DOM中
					var html=template('carDetalisTempl',dataSource);
					$("#topPopover").html(html);
					
					$('#car_cphm').html(dataSource.cph);
					$('#car_cllx').html(dataSource.cllxdm);
					$('#car_clpp').html(dataSource.zwpp);
					$('#car_csysdm').html(dataSource.csysdm);
					$('#car_clsbdm').html(dataSource.clsb_dm);
					$('#car_syr').html(dataSource.syr);
					$('#car_syr_id').html(dataSource.gmsfzhm);
					$('#car_fdjhm').html(dataSource.fdjddjh);
					//填充隐藏域的值
					$('#car_cphm_form').val(dataSource.cph);
					$('#car_cllx_form').val(dataSource.cllxdm);
					$('#car_clpp_form').val(dataSource.cl_pp);
					/*$('#car_csysdm_form').val(dataSource.csysdm);*/
					$('#car_clsbdm_form').val(dataSource.clsbdh);
					/*$('#car_syr_form').val(dataSource.syr);*/
					$('#car_syr_id_form').val(dataSource.gmsfzhm);
					$('#car_fdjhm_form').val(dataSource.fdjddjh);
				}
				if(data.data[0].code == '300' && data.data[1].code =='300'){
					mui.alert('暂未查询到数据，请检查车牌号输入是否正确！')
				}
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				console.log(type);
				mui.alert('网络延迟，请重新点击核查！', '提示', function() {});
			}
		});
	}
}

//车牌号输入虚拟键盘
function showCar(){	
	clearPerson();//清空人员
	clearCar();//清空车辆
	$(".ul_input").on('tap',function(){
		layer.open({
			type: 1
			,area:['100%', '80%']
			,content:'<div id="pro"></div>'
			,anim: 'up'
			,style: 'position:fixed; bottom:0; left:0; width: 100%;padding:10px 0; border:none;'
			,success: function(layero, index){
				console.log(layero, index);
				showProvince();
			}
		});
	});
	$(".input_pp").on('tap',function(){
		 // 如果已选择省份
		 if($(".input_pro").hasClass("hasPro")){
			layer.open({
				type: 1
				,area:['100%', '80%']
				,content:'<div id="pro"></div>'
				,anim: 'up'
//				,shade :false 
				,style: 'position:fixed; bottom:0; left:0; width: 100%;padding:10px 0; border:none;'
				,success: function(layero, index){
					console.log(layero, index);
					showKeybord();
				}
			});
		 }else{
			 $(".input_pro").click()
		 }
	});
}

var waiting ;
var readyWriteData = false;
var readyRead = false;
//人员调用nfc
$('#nfc_person').on('tap',function(){
	$('#ocr_person').css('background-color','');
	$(this).css('background-color','#00CC44');
	isFirst = false;
	plus.plugintest.PluginTestFunction(["Html5"],
	function(result) {
		var Test = plus.android.importClass("reno.Beam.MyData");
		var test = new Test();
		var data=plus.android.getAttribute(test,"name");
		var photoUrl=plus.android.getAttribute(test,"photoUrl");
		var arr = data.split(",");
		personCardNfcValue(arr,photoUrl);	
	},function(result){mui.alert(result);});
});
//人员调用ocr
//调用OCR插件方法
$('#ocr_person').on('tap',function(){
	$('#nfc_person').css('background-color','');
	$(this).css('background-color','#00CC44');
	plus.plugintest.PluginNotification(["身份证",""],
		function(result) {
			var Test = plus.android.importClass("reno.Beam.MyData");
			var test = new Test();
			var data=plus.android.getAttribute(test,"name");
			var arr = data.split(",");
			personCardOcrValue(arr,"");
	},function(result){mui.alert(result);});
});

//调用车辆OCR插件方法
$('#ocr_car').on('tap',function(){	
	plus.plugintest.PluginNotification(["车辆",""],
	function(result) {
		var Test = plus.android.importClass("reno.Beam.MyData");
		var test = new Test();
		var data=plus.android.getAttribute(test,"name");
		var arr = data.split(",");
		CarCardValue(arr);
	},function(result){mui.alert(result);});
});
//回填插件返回值到对应的html控件中
function getData(){
	var Test = plus.android.importClass("reno.Beam.MyData");
	var test = new Test();
	var name=plus.android.getAttribute(test,"name");
//			alert(name);
}
function CarCardValue(dataSource){
	//遍历车牌号填充到对应的span中
	$('.ul_input').find('li').each(function(index, element){
		$('.ul_input').find('li').eq(index).find('span').html(dataSource[1].substring(index,index+1));
		$(".car_input").attr("data-pai",dataSource[1]);
		if($(".input_pp:eq(5)").find('span').html()!=''){
			layer.open({
				type: 1
				,content: '<div id="pro"></div>'
				,anim: 'up'
				,shade :false 
				,style: 'position:fixed; bottom:0; left:0; width: 100%; height: auto; padding:0; border:none;'
               			});
			showKeybord();
		}
	});
	$('#cph_input').val(dataSource[1]);
	//closePro();
}
function personCardNfcValue(dataSource,photoImg){
	$('input').val();
	$('select').val();
	$('#p_userCard').html(dataSource[3]);
	$('#p_name').html(dataSource[5]);
	$('#p_sex').html(dataSource[4]);
	$('#p_mz').html(dataSource[2]);
	$('#p_bir_y').html(dataSource[1].substring(0,4));
	$('#p_bir_m').html(dataSource[1].substring(4,6));
	$('#p_bir_d').html(dataSource[1].substring(6,8));
	$('#p_address').html(dataSource[0]);
	$('#input_number').val(dataSource[3]);
	//填充隐藏域的值
	$('#p_name_form').val(dataSource[5]);
	$('#p_sex_form').val(dataSource[4]);				
	$('#p_bir_form').val(dataSource[1]);		
	$('#p_address_form').val(dataSource[0]);
	$('#p_userCard_form').val(dataSource[3]);
	$('#p_mz_form').val(dataSource[2]);
    if(photoImg!=''){
       $('#header_img').attr('src',photoImg);
    }else{
        $('#header_img').attr('src','img/touxiang.png');
    }

}
function personCardOcrValue(dataSource,photoImg){
	$('input').val();
	$('select').val();
	$('#p_userCard').html(dataSource[3]);
	$('#p_name').html(dataSource[5]);
	$('#p_sex').html(dataSource[4]);
	$('#p_mz').html(dataSource[2]);
	$('#p_bir_y').html(dataSource[1].substring(0,4));
	$('#p_bir_m').html(dataSource[1].substring(5,7));
	$('#p_bir_d').html(dataSource[1].substring(8,10));
	$('#p_address').html(dataSource[0]);
	$('#input_number').val(dataSource[3]);
	//填充隐藏域的值
	$('#p_name_form').val(dataSource[5]);
	$('#p_sex_form').val(dataSource[4]);				
	$('#p_bir_form').val(dataSource[1]);		
	$('#p_address_form').val(dataSource[0]);
	$('#p_userCard_form').val(dataSource[3]);
	$('#p_mz_form').val(dataSource[2]);
    if(photoImg!=''){
       $('#header_img').attr('src',photoImg);
    }else{
        $('#header_img').attr('src','img/touxiang.png');
    }
}
//调用经纬度方法
function PluginTestJwd() {
//	plus.plugintest.PluginTestJwd(["Html5"],function(result) {
//		var Test = plus.android.importClass("reno.Beam.MyData");
//		var test = new Test();
//		var data=plus.android.getAttribute(test,"jwd");
//		var loglat = data.split(",");
//		$('label').each(function(index, element){
//		var labelName = $(element).attr('data-labelName');
//		if(labelName=='经度'){
//			$(element).next('div').find('input').val(loglat[0]);
//		}else if(labelName=='纬度'){
//			$(element).next('div').find('input').val(loglat[1]);
//		}else if(labelName=='采集时间'){
//			$(element).next('div').find('input').val(createTimeVal);
//		}
//	});
//	},function(result){mui.alert(result);});

	$('label').each(function(index, element){
		var labelName = $(element).attr('data-labelName');
		if(labelName=='经度'){
			$(element).next('div').find('input').val("109.76289");
		}else if(labelName=='纬度'){
			$(element).next('div').find('input').val("38.27142");
		}else if(labelName=='采集时间'){
			$(element).next('div').find('input').val(createTimeVal);
		}
	});
//	plus.plugintest.PluginTestJwd(["Html5"],function(result) {
//		var Test = plus.android.importClass("reno.Beam.MyData");
//		var test = new Test();
//		var data=plus.android.getAttribute(test,"jwd");
//		var loglat = data.split(",");
//		$('label').each(function(index, element){
//		var labelName = $(element).attr('data-labelName');
//		if(labelName=='经度'){
//			$(element).next('div').find('input').val(loglat[0]);
//		}else if(labelName=='纬度'){
//			$(element).next('div').find('input').val(loglat[1]);
//		}else if(labelName=='采集时间'){
//			$(element).next('div').find('input').val(createTimeVal);
//		}
//	});
}
/*function pluginHandler() {
   plus.plugintest.registerWakeUpHandler(["Html5"],
   function(result) {
//		      alert('result:'+result)
      var Test = plus.android.importClass("reno.Beam.MyData");
      var test = new Test();
      var data=plus.android.getAttribute(test,"name");
      var photoUrl=plus.android.getAttribute(test,"photoUrl");
      var arr = data.split(",");
//		      alert(photoUrl);
      personCardValue(arr,photoUrl);
   },function(result){mui.alert(result);});
}*/
// document.addEventListener('plusready',listenNFCStatus,false);
/*打开相机功能，拿到照片的路径
 * 拍照获取图片
 */
function getImage(obj) {
    var c = plus.camera.getCamera();
    c.captureImage(function(e) {
        plus.io.resolveLocalFileSystemURL(e, function(entry) {
        	var imgSrc = entry.toLocalURL() + "?version=" + new Date().getTime(); //拿到图片路径
            // 其他操作,比如预览展示
 			$(obj).parent().append('<b class="delect_photo_img mui-icon mui-icon-close"></b>')
 			$(obj).attr('src',imgSrc).addClass('head-img-src');
 			upload(obj);//上传服务器
 			$('.delect_photo_img').on('tap',function(e){
				$(obj).attr('src','img/camera.png').removeClass('head-img-src').addClass('head-img');
				$(obj).parent().find('b.delect_photo_img').remove();
 			})
        }, function(e) {
            console.log("读取拍照文件错误：" + e.message);
        });
    }, function(s) {
        console.log("error" + s);
    }, {
        filename: "_doc/camera/"
    })
}
/*
 * 打开手机相册
 * 从相册中选择图片 
 */
function galleryImg(obj){
	// 从相册中选择图片gallery
    plus.gallery.pick( function(e){
    	for(var i in e.files){
	    	var fileSrc = e.files[i];
            // 其他操作,比如预览展示
			console.log('galleryImg',fileSrc+$(obj).html());
			$(obj).parent().append('<b class="delect_photo_img mui-icon mui-icon-close"></b>')
 			$(obj).attr('src',fileSrc).addClass('head-img-src');
 			upload(obj);//上传服务器
 			$('.delect_photo_img').on('tap',function(e){
				$(obj).attr('src','img/camera.png').removeClass('head-img-src').addClass('head-img');
				$(obj).parent().find('b.delect_photo_img').remove();
 			})
    	}
    }, function ( e ) {
    	console.log( "取消选择图片" );
    },{
    	filter: "image",
    	multiple: true,
    	maximum: 5,
    	system: false,
    	onmaxed: function() {
    		plus.nativeUI.alert('最多只能选择5张图片');
    	}
    });
}
/*
 * 上传到服务器方法
 */
 //服务端接口路径

// 上传文件
function upload(obj){
	var server = base_url+$("#tableNameImage").val()+'/image';
	console.log('server:'+server);
	//获取图片元素
	var imgsArr = $(obj).find('img.mui-action-preview');
	/*mui.each(imgsArr, function(index, item){
		console.log(index);
		console.log(item.src);*/
		createUp(imgsArr.prevObject[0]);
/*	});*/
	function createUp (files) {
		var task = plus.uploader.createUpload(server,
		{method:"POST"},
		function(t,status){ //上传完成
			
			console.log('status:'+JSON.stringify(status));
			if(status==200){
				console.log("上传成功："+t.responseText);
					var json_t =  JSON.parse(t.responseText);
							for(var key in json_t){	
								if(key=='data'){
									if($('#photo_img_val').val() == ''){
										$('#photo_img_val').val(json_t['data'])
									}else{
										$('#photo_img_val').val($('#photo_img_val').val()+json_t['data']);
									}
									
								}
							}
			}else{
				console.log("上传失败："+status);
			}
		});
		//添加其他参数
		//task.addData("name","test");
		// 页面中要上传的 图片路径
		task.addFile(files.src,{key:'file'});
		task.start();
	}
	
	//点击重点人类型标识弹出重点人详情信息
	mui('.mui-content').on('tap','.zhhc',function(){
		mui('#topPopover').popover('show'); // 将id为list的元素放在想要弹出的位置
	});
}

//清空人员
function clearPerson(){
	$('#p_name').html('');
	$('#p_sex').html('');				
	$('#p_bir_y').html('');
	$('#p_bir_m').html('');
	$('#p_bir_d').html('');				
	$('#p_address').html('');
	$('#p_userCard').html('');
	$('#p_mz').html('');
	$('.zd_tips').hide().addClass('mui-hidden');
	$('#header_img').attr('src','img/touxiang.png');
//	$('#photo_img_val').attr('src','img/touxiang.png');
}
//清空车辆
function clearCar(){
//	alert($('#p_name').value))
	$('#car_cphm').html('');
	$('#car_cllx').html('');
	$('#car_clpp').html('');
	$('#car_csysdm').html('');
	$('#car_clsbdm').html('');
	$('#car_clxh').html('');
	$('#car_clxh').html('');
	$('#car_syr').html('');
	$('#car_syr_id').html('');
	$('#car_fdjhm').html('');
	$('.zd_car_tips').hide().addClass('mui-hidden');
//	$('#photo_imgcar_val').attr('src','img/touxiang.png');
	$('#input_number').val('');
}
function getJsonLength(jsonData) {
	var length;
	for(var ever in jsonData) {
		length++;
	}
	return length;
}