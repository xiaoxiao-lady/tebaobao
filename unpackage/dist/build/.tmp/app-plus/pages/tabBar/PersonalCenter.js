(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/PersonalCenter"],{"0615":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(e("a575"));function i(t){return t&&t.__esModule?t:{default:t}}var o=function(){return e.e("components/login").then(e.bind(null,"d853"))},r={onShow:function(){if(!t.getStorageSync("token"))return this.islogin=1,!1;this.islogin=0,this.getreadprofile()},onPullDownRefresh:function(){if(!t.getStorageSync("token"))return this.islogin=1,t.stopPullDownRefresh(),!1;this.islogin=0,this.getreadprofile()},data:function(){return{info:{},islogin:0,version:"",res:{},isNew:!1}},onLoad:function(){var n=this,e="https://nycs.maitexun.cn/apicloud/version/versions",a=t.getSystemInfoSync(),i=a.platform,o={appid:plus.runtime.appid,version:plus.runtime.version,client:i};this.version=plus.runtime.version,t.request({url:e,data:o,method:"POST",success:function(t){1===t.data.status&&(n.isNew=!0,n.res=t.data.data)}})},methods:{getreadprofile:function(){var n=this;this.$http.getreadprofile().then(function(e){200==e.status&&(t.setStorageSync("userInfo",JSON.stringify(e.data)),n.info=e.data)})},confirm:function(){var t=this;this.$http.getpanduan().then(function(n){200==n.status&&(2==n.data.zhuangtai?t.getnav("/pages/moneyCartSon/Settledin"):4==n.data.zhuangtai?t.getnav("/pages/loginSon/settingWx"):t.getnav("/pages/personalSon/TradingType"))})},checkUpdate:function(){var n=t.getSystemInfoSync();n.platform;this.isNew?(a.default.init({packageUrl:this.res.url,content:this.res.note,contentAlign:"left",cancel:"取消",cancelColor:"#007fff"}),a.default.show()):this.$toast("当前已是最新版本")}},components:{login:o},onNavigationBarButtonTap:function(t){this.getnav("/pages/personalSon/setinfo")}};n.default=r}).call(this,e("6e42")["default"])},"0a85":function(t,n,e){"use strict";(function(t){e("fdb5"),e("921b");a(e("66fd"));var n=a(e("58a5"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},"58a5":function(t,n,e){"use strict";e.r(n);var a=e("d485"),i=e("bf2d");for(var o in i)"default"!==o&&function(t){e.d(n,t,function(){return i[t]})}(o);var r,s=e("f0c5"),u=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"53d5f975",null,!1,a["a"],r);n["default"]=u.exports},bf2d:function(t,n,e){"use strict";e.r(n);var a=e("0615"),i=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,function(){return a[t]})}(o);n["default"]=i.a},d485:function(t,n,e){"use strict";var a,i=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"b",function(){return i}),e.d(n,"c",function(){return o}),e.d(n,"a",function(){return a})}},[["0a85","common/runtime","common/vendor"]]]);