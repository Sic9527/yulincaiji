/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
	};

	/**
	 * 设置用户信息
	 * @param {Object} account 用户名
	 * @param {Object} $realName 用户姓名
	 * @param {Object} $token 登录成功后返回的信息
	 */
	owner.setUser = function($account,$username,$userId) {
		var users = {
			account: $account,
//			token : $token,
			username : $username,
			userid : $userId
		};
		console.log('account:'+$account+'$username:'+$username+'$userId:'+$userId);
		localStorage.setItem('$users', JSON.stringify(users));
	};
	
	/**
	 * 获取用户信息 直接返回 json格式 user.account
	 */
	owner.getUser = function(state) {
		
		var url = location.href;
		var loginUrl = "login.html";
		if(url.indexOf("page/")>=0){
			loginUrl = "../login.html";
		}
		
		var _users = localStorage.getItem('$users') || "{}";
//		alert('getUser:'+_users)
		if(_users != "{}" && _users!=''){ 
			return JSON.parse(_users);
		}else{
//			alert('ddd'+state);
			if(state){
				mui.openWindow({
					url : loginUrl
				});
			}
		}
		return null;
	};
	
	/**
	 * 获取用户信息 直接返回 json格式 user.account
	 */
	owner.getToken = function(state) {
		var _users = owner.getUser(state) ;
		if(_users!=null){
			return _users.userid;
		}else{
			return '';
		}
	};
	/**
	 * 判断用户是否已经登录
	 */
	owner.checkUser = function() {
		var _users = owner.getUser();
		return _users!=null && _users!='';
	};
	
	/**
	 * 获取用户信息 直接返回 json格式 user.account
	 */
	owner.removeUser = function() {
		localStorage.removeItem('$users');
	};
	
	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
	
	/**
	 * 设置地理位置信息 
	 */
	owner.setLocation = function(position){
		var codns = position.coords;
		var myCity = position.address.city;
		var loaction = {
			longitude : codns.longitude,
			latitude : codns.latitude,
			city : myCity != undefined ?  myCity.replace("市","") : "西安",
			address : position.addresses
		};
		localStorage.setItem('loaction', JSON.stringify(loaction));
	}
	owner.getLocation = function(){
		return JSON.parse(localStorage.getItem('loaction'));
	}
	
}(mui, window.app = {}));