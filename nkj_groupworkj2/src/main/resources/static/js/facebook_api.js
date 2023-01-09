var accessToken;
// 以下 SDK初始化	以下 SDK初始化	以下 SDK初始化	以下 SDK初始化	以下 SDK初始化	以下 SDK初始化	以下 SDK初始化	以下 SDK初始化	以下 SDK初始化
window.fbAsyncInit = function() {
    FB.init({
        appId      : '660551402409269',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.9'
    });
    FB.AppEvents.logPageView();
// 加一個監聽器
    FB.Event.subscribe('auth.authResponseChange', function(response) {
    console.log("fb監聽器建立",response);
    if (response.status === 'connected') {
	  sign=true;
      console.log('Logged in');
    } else {
	  sign=false;
      console.log('Not logged in');
    }
  });
  };
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_TW/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
// 以上 SDK初始化	以上 SDK初始化	以上 SDK初始化	以上 SDK初始化	以上 SDK初始化	以上 SDK初始化	以上 SDK初始化	以上 SDK初始化	以上 SDK初始化

// 頁面加載完畢後印出登入狀態
window.onload =function(){
    FB.getLoginStatus((response) => { 
        console.log('頁面加載完畢', response); // 這裡印出fb登入狀態
        if(response.status === 'connected') {  // 若為登入狀態則存Token
            accessToken = response.authResponse.accessToken;
            FB.api("/me?fields=name,email,id",function(response){
                		name=response.name,
                        email=response.email,
                        password=response.id
                        })  	
            };
    });
}

// 登入函示，會放在登入按鈕上。
function fblogin(){
    FB.login(function(response){
        if(response.authResponse){
            console.log("login sucess")
            FB.api("/me?fields=name,email,id",function(response){
                		name=response.name,
                        email=response.email,
                        password=response.id
                        })
        }else{
            console.log("facebook login fail")
        }
        },{scope: 'public_profile,email'});
    }

// 登出函式，會放在登出按鈕上。
function fblogout(){    
    FB.getLoginStatus((response) => {
        console.log('res', response); // 這裡印出fb登入狀態
        if (response.status === 'connected') {  // 如果是連線狀態存下token，並登出刷新頁面，沒連線的話會叫你要連線。
            accessToken = response.authResponse.accessToken;
            console.log('logout success')
            FB.logout(function(response){});
            name=null;
            password=null;
            email=null;
            location.reload()
        }else{alert("log in frist!")} 
    });
};
