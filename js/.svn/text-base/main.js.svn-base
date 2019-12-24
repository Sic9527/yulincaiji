//var base_url = "http://caiji.znsoft.top:18099/phone/";//互联网地址
//var base_url = "http://192.168.0.226:8088/info_collection/phone/";
var base_url = "http://192.168.20.50:10061/info_collection/phone/";//公安地址
var base_url_pc = "http://192.168.20.50:10061/info_collection/";//公安地址
var uploadImgPath = base_url+"big_image/"; //大图
var smallUploadPath = base_url+"small_image/"; //小图 压缩图片
var uploadImage =  "http://192.168.20.50:10061/images/"; //后台上传图片回显地址
/**分页 页面总数 服务器返回页面数据抓取*/
function getPageCount(rows){
	var num = Number(rows);
	if(num >= 0){
		return parseInt(num / 5) + (num % 5 > 0 ? 1 : 0 );
	}else{
		return 0;
	}
}

//数字设置  如果是小数 保留两位小数
function setFloat(num){
	var num_str = num + "";
	if(num_str.indexOf(".") > 0 && num_str.split(".")[1].length > 2){
		return parseFloat(parseFloat(num_str).toFixed(2));
	}
	return num_str;
}

/**
 * * 加载数据统一方法
 * @param {Object} url 请求后台数据的方法
 * @param {Object} pram_json  需要传值的数据 json格式
 * @param {Object} template_id  script模板ID
 * @param {Object} page_id	页面需要插入值得元素ID
 * @param {Object} refresh_type 数值1表示上拉  0表示下拉
 */
function invokePage(url , pram_json , template_id , page_id , refresh_type){
	mui.post(url+"?guid="+new Date().getTime(),pram_json,
		function sgBack(data){
			if(data.status == 'success'){
				data = data.message ;
				if(data.totalCount > 0){
					data.imgPath = uploadImgPath;
					data.smallImgPath = smallUploadPath;
					var html0 = baidu.template(template_id,data);
					if(refresh_type==1){//如果是上拉刷新
						document.getElementById(page_id).innerHTML += html0 ;
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(_currPageId>= data.nextPage); //参数为true代表没有更多数据了。
					}else{//如果是下拉刷新
						document.getElementById(page_id).innerHTML = html0 ;
						mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
						if(_currPageId< data.nextPage){//如果下拉时还有下页重新启用上拉刷新
							mui('#pullrefresh').pullRefresh().refresh(true);
						}
					}
				}else{
					if(refresh_type == 1){
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
					}else{
						mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
					}
					document.getElementById(page_id).innerHTML = "" ;
				}
			}else{
				plus.nativeUI.alert(data.message);
			}
		},'json'
	);
}


/**
 * 轮播图自动切换处理 
 * 如果轮播图组数大于1则进行自动切换
 * @param {Object} sid 轮播图DIVid
 */
function setSlider(sid){
	if($('#'+sid).children('div').length > 1){
		var all = $("#"+sid).html();
		var first = "<div class='mui-slider-item'>"+ $("#"+sid+" div:first").html() + "</div>";
		var last = "<div class='mui-slider-item'>"+ $("#"+sid+" div:last").html()+ "</div>";
		$("#"+sid).html(last + all + first);
	}
}


/**
 * 自定义返回页面
 * @param {Object} htimId 返回页面的地址
 * @param {Object} isReload 是否需要重新加载
 */
//preloads 预加载页面 不能关闭
var preloads = "tab-webview-subpage-index.html,tab-webview-subpage-store.html,tab-webview-subpage-store-list.html,tab-webview-subpage-appointment.html,tab-webview-subpage-order.html,tab-webview-subpage-usercenter.html";
function myback(htmlId,isReload){
	var currentId = plus.webview.currentWebview().id;
	var alls = plus.webview.all();
	mui.each(alls,function(e,v){
		if(v.__callbacks__ != undefined && v.id != undefined && v.id != htmlId && v.id != plus.runtime.appid && v.preload == undefined && preloads.indexOf(v.id) < 0) {
			plus.webview.getWebviewById(v.id).close();
		}else if(v.id == htmlId){
			plus.webview.getWebviewById(v.id).show();
			if(isReload){
				plus.webview.getWebviewById(v.id).reload();
			}
		}
	});
	
	//判断上次打开的页面是否真正的关闭 否则再次关闭
	setTimeout(function() {
		var upWiew = plus.webview.getWebviewById(currentId);
		if(upWiew != null && upWiew != undefined){
			upWiew.close();
		}
	}, 1000);
}

/**
 * 懒加载 加载新页面
 * @param {Object} vid 页面标识
 * @param {Object} urlId  页面ID
 * @param {Object} parameter 传递参数
 */
function toPage(vid,urlId,parameter){
	 if(!vid){
	   vid = plus.webview.getWebviewById(urlId);
	 }
	 if(parameter != undefined && parameter != ''){
	 	mui.fire(vid,'parameter',parameter);
	 }
	 mui.openWindow({
	   	id : urlId
	 });
}
//返回顶部
function scrollToTopBox(){
	var scrollToTopBox = document.getElementById('scrollToTop');
	//返回按钮tap
	scrollToTopBox.addEventListener('tap', function(e) {
	    e.stopPropagation();
	    mui('#refreshContainer').pullRefresh().scrollTo(0, 0, 100);//滚动到顶部
	});
	//Android上监听原生滚动，iOS上监听div滚动，上拉超过一屏后显示按钮，否则隐藏，可自行在条件判断中修改
	if (mui.os.android) {
	    window.addEventListener('scroll', function(e) {
	        if (window.pageYOffset >= window.innerHeight && scrollToTopBox.classList.contains('hide'))
	            scrollToTopBox.classList.remove('hide');
	        else if (window.pageYOffset < window.innerHeight && !scrollToTopBox.classList.contains('hide'))
	            scrollToTopBox.classList.add('hide');
	    });
	} else {
	    document.getElementById('refreshContainer').addEventListener('scroll', function() {
            if (mui('#refreshContainer').pullRefresh().y <= window.innerHeight * (-0.5) && scrollToTopBox.classList.contains('hide'))
                scrollToTopBox.classList.remove('hide');
            else if (mui('#refreshContainer').pullRefresh().y > window.innerHeight * (-0.5) && !scrollToTopBox.classList.contains('hide'))
                scrollToTopBox.classList.add('hide');
	    });
	}
}
