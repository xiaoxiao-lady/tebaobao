(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-personalSon-Refundtype"],{"795d":function(t,n,o){"use strict";o.r(n);var e=o("ba58"),s=o.n(e);for(var i in e)"default"!==i&&function(t){o.d(n,t,function(){return e[t]})}(i);n["default"]=s.a},ba58:function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e="",s={onLoad:function(t){t&&(e=t,this.getthtypeShop(e)),console.log(t)},data:function(){return{orgoods:"",type:[]}},methods:{getthtypeShop:function(t){var n=this;this.$http.getthtypeShop(t).then(function(t){200==t.status&&(n.orgoods=t.data.orgoods,n.type=t.data.type)})}}};n.default=s},e21e:function(t,n,o){"use strict";o.r(n);var e=o("f41b"),s=o("795d");for(var i in s)"default"!==i&&function(t){o.d(n,t,function(){return s[t]})}(i);var a,r=o("f0c5"),u=Object(r["a"])(s["default"],e["b"],e["c"],!1,null,"0dc76aca",null,!1,e["a"],a);n["default"]=u.exports},f41b:function(t,n,o){"use strict";var e,s=function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("v-uni-view",{staticClass:"index_class"},[o("v-uni-view",{staticClass:"refun-type"},[o("v-uni-image",{attrs:{src:t.orgoods.thumb_url}}),o("v-uni-view",{staticClass:"refun-text"},[o("v-uni-view",[t._v(t._s(t.orgoods.goods_name))]),o("v-uni-text",[t._v(t._s(t.orgoods.goods_attr_str))]),o("v-uni-text",{staticClass:"color"},[t._v("￥"+t._s(t.orgoods.price)+" x "+t._s(t.orgoods.goods_num))])],1)],1),t._l(t.type,function(n,e){return o("v-uni-view",{key:e,staticClass:"comp-list",on:{click:function(o){arguments[0]=o=t.$handleEvent(o),t.getnav("/pages/personalSon/RefundDate?th_cate="+n.id+"&orgoods_id="+t.orgoods.id+"&order_num="+t.orgoods.ordernumber)}}},[o("v-uni-view",[o("v-uni-view",{staticClass:"comp-title"},[t._v(t._s(n.cate_name))]),o("v-uni-text",[t._v(t._s(n.desc))])],1),o("i",{staticClass:"iconfont icon_e60c"})],1)})],2)},i=[];o.d(n,"b",function(){return s}),o.d(n,"c",function(){return i}),o.d(n,"a",function(){return e})}}]);