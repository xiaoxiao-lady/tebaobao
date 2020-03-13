import fly from './config'
import md5 from 'js-md5'
import utils from '../utils'

function request(url, params = {}, method = 'GET') {
  return fly.request(`${url}?t=${new Date().getTime()}`, {
    ...params
  }, {
    method: method
  })
}
let api_token = null
function post (url, data={}) {
  api_token = md5(`${url}${utils.formartDate()}yiling6670238160ravntyoneapp7926`)
  return request(url, {
    ...data,
    api_token,
    client_id: 1
  }, 'POST')
}

export default {
  
  /**
   * 入驻上传图片列表支持多张图片上传
   *  data   uni.chooseImage({})
   *  url  请求地址路径
   * @param {any} data
   * @returns
   */
  getpersonapply(data,url) {
    return  new Promise(function(resolve,reject){
      let baseUrl = 'https://nycs.maitexun.cn/' 
        uni.uploadFile({
          url: baseUrl + url,
          files: data.imageres,
          formData:{
            api_token: md5(`${url}${utils.formartDate()}yiling6670238160ravntyoneapp7926`),
            client_id:1,
            token:uni.getStorageSync('token'),
            ...data
          },
          success: res => {
            console.log('---99999')
            console.log(JSON.stringify(res))
            if(res.statusCode == 200) {
              resolve(res.data)
            }
          },
          fail: err => {
            console.log(JSON.stringify(err))
          },
          complete: function(){
            uni.hideLoading()
          }
        })
    
      
        
    })
  },



  /**
   * 上传图片支持多张图片上传
   *  data   uni.chooseImage({})
   *  url  请求地址路径
   * @param {any} data
   * @returns
   */
  getupdate(data,url) {
    return  new Promise(function(resolve,reject){
      let baseUrl = 'https://nycs.maitexun.cn/'
      if(data.image.length == 0) {
        post(url,data).then(res=>{
          resolve(res)
        })
        return false
      } 
      for(var i=0; i< data.image.length;i++) {
        uni.uploadFile({
          url: baseUrl + url,
          filePath: data.image[i],
          name: 'image',
          formData:{
            api_token: md5(`${url}${utils.formartDate()}yiling6670238160ravntyoneapp7926`),
            client_id:1,
            token:uni.getStorageSync('token'),
            ...data
          },
          success: res => {
            const fileDate = JSON.parse(res.data)
            if(fileDate.status == 200) {
              // dataFlie.data.push(fileDate.data.headimgurl)

              if(data.image.length == i) {

                resolve(fileDate)
              }
            } else {
              uni.showToast({
                title: fileDate.mess,
                duration: 2000,
                icon: 'none'
              })  
              reject(fileDate)
            }
            
          },
          fail: err => {
            console.log(JSON.stringify(err))
          }
        })
      }
      
        
    })
  },
  
  

  

   /**
   * 图片上传
   * 
   * @param {any} data
   * @returns
   */
  getuploadspic(data,url) {
    return new Promise(resolve=>{
      let baseUrl = 'https://nycs.maitexun.cn/'
      let imgeArr = []
      console.log(data)
      data.forEach(element => {
        uni.uploadFile({
          url: baseUrl + url, 
          filePath: element,
          name: 'file',
          formData: {
          },
          success: (uploadFileRes) => {
           
            let srcData = JSON.parse(uploadFileRes.data)
            if(srcData.code == 200) {
              imgeArr.push(srcData.data.src.dz)
            }
            if(imgeArr.length == data.length ) {
              resolve({
                status:200,
                images:imgeArr
              })
            }
          }
        });
      });
      
    })
    
    
  },

/**
 * 获取首页的广告活动
 */
  getAdverlst(data) {
    return post('apicloud/shops/getprolst1', data)
  },
  /**
   * 获取退换货订单详情接口
   * 
   * @param {any} data
   * @returns
   */
  getthorderinfo(data) {
    return post('apicloud/MemberOrder/thorderinfo', data)
  },
  
  /**
   * 余额明细记录列表接口
   * 
   * @param {any} data
   * @returns
   */
  getlist(data) {
    return post('apicloud/Detail/getlist', data)
  },
  /**
   * 用户收货接口
   * 
   * @param {any} data
   * @returns
   */
  getsurehuan(data) {
    return post('apicloud/ThApply/surehuan', data)
  },
  /**
   * 订单评论
   * 
   * @param {any} data
   * @returns
   */
  getOrderEvaluate(data) {
    return post('apicloud/MemberOrder/evaluate', data)
  },
  /**
   * 用户退货发货接口
   * 
   * @param {any} data
   * @returns
   */
  getthfahuo(data) {
    return post('apicloud/ThApply/thfahuo', data)
  },
  /**
   * 填写物流信息调用信息接口
   * 
   * @param {any} data
   * @returns
   */
  getwuliuinfo(data) {
    return post('apicloud/ThApply/getwuliuinfo', data)
  },
  /**
   * 撤销退换申请接口
   * 
   * @param {any} data
   * @returns
   */
  getchexiao(data) {
    return post('apicloud/ThApply/chexiao', data)
  },
  
  /**
   * 安全设置发送验证码接口
   * 
   * @param {any} data
   * @returns
   */
  getsendcodeWx(data) {
    return post('apicloud/Safesz/sendcode', data)
  },
  /**
   * 账号安全设置接口
   * 
   * @param {any} data
   * @returns
   */
  getshezhi(data) {
    return post('apicloud/Safesz/shezhi', data)
  },
  /**
   * 获取用户手机号接口
   * 
   * @param {any} data
   * @returns
   */
  gethuoquphone(data) {
    return post('apicloud/MemberInfo/huoquphone', data)
  },
    /**
   * 第三方登录接口
   * 
   * @param {any} data
   * @returns
   */
  getsfdenglu(data) {
    return post('apicloud/Login/sfdenglu', data)
  },
  /**
   * 发布发现
   * 
   * @param {any} data
   * @returns
   */
  getaddfind(data) {
    return post('apicloud/Find/addfind', data)
  },

  /**
   * 获取热门话题商品列表
   * 
   * @param {any} data 
   */
  getfindgoods (data) {
    return post('apicloud/Find/getfindgoods', data)
  },
  /**
   * 获取热门话题头部信息
   * 
   * @param {any} data 
   * @returns 
   */
  getfindgoodsinfor (data) {
    return post('apicloud/Find/getfindgoodsinfor', data)
  },
  /**
   * 获取热门话题头部信息
   * 
   * @param {any} data 
   * @returns 
   */
  like (data) {
    return post('apicloud/Find/laud', data)
  },
  /**
   * 图片下载
   * 
   * @param {any} data 
   * @returns 
   */
  downloadpic (data) {
    return post('apicloud/Find/downloadpic', data)
  },
  /**
   * 获取标签
   * 
   * @param {any} data
   * @returns
   */
  getfindtag(data) {
    return post('apicloud/Find/findtag', data)
  },
 /**
   * 热门话题
   * 
   * @param {any} data
   * @returns
   */
  getgoodsList(data) {
    return post('apicloud/Find/getgoods', data)
  },
  
  /**
   * 热门话题
   * 
   * @param {any} data
   * @returns
   */
  gethottalk(data) {
    return post('apicloud/Find/hottalk', data)
  },
   /**
   * 获取退换货申请详情接口
   * 
   * @param {any} data
   * @returns
   */
  getapplyinfo(data) {
    return post('apicloud/ThApply/applyinfo', data)
  },
  /**
   * 获取退换货原因接口
   * 
   * @param {any} data
   * @returns
   */
  getreason(data) {
    return post('apicloud/ThApply/getreason', data)
  },
  /**
   * 获取申请退款信息接口
   * 
   * @param {any} data
   * @returns
   */
  getthindex(data) {
    return post('apicloud/ThApply/thindex', data)
  },
   /**
   * 退换货申请方式信息接口
   * 
   * @param {any} data
   * @returns
   */
  getthtypeShop(data) {
    return post('apicloud/ThApply/getthtype', data)
  },
  /**
   * 取消收藏
   * 
   * @param {any} data
   * @returns
   */
  getcancelShowcang(data) {
    return post('apicloud/MemberColl/cancelcoll', data)
  },
  
  /**
   * 删除订单接口
   * 
   * @param {any} data
   * @returns
   */
  getdelorder(data) {
    return post('apicloud/MemberOrder/delorder', data)
  },
  /**
   * 确认收货接口
   * 
   * @param {any} data
   * @returns
   */
  getqrshouhuo(data) {
    return post('apicloud/MemberOrder/qrshouhuo', data)
  },
  /**
   * 找回密码接口
   * 
   * @param {any} data
   * @returns
   */
  getfindpwd(data) {
    return post('apicloud/MemberInfo/findpwd', data)
  },
  /**
   * 找回密码发送验证码接口
   * 
   * @param {any} data
   * @returns
   */
  getfindpwdcode(data) {
    return post('apicloud/MemberInfo/findpwdcode', data)
  },
  /**
   * 支付订单接口 保证金
   * 
   * @param {any} data
   * @returns
   */
  getorderzhifu(data) {
    return post('apicloud/ApplyInfo/orderzhifu', data)
  },
  /**
   * 获取入驻审核状态信息接口
   * 
   * @param {any} data
   * @returns
   */
  getapplystatus(data) {
    return post('apicloud/ApplyInfo/applystatus', data)
  },
  /**
   * 提现记录列表接口
   * 
   * @param {any} data
   * @returns
   */
  getTxmxtxinfo(data) {
    return post('apicloud/Txmx/txinfo', data)
  },
  /**
   * 提现记录列表接口
   * 
   * @param {any} data
   * @returns
   */
  getTxmxlist(data) {
    return post('apicloud/Txmx/getlist', data)
  },
  /**
   * 申请提现接口
   * 
   * @param {any} data
   * @returns
   */
  getTxmxtixian(data) {
    return post('apicloud/Txmx/tixian', data)
  },
   /**
   * 提现获取钱包及银行卡信息接口
   * 
   * @param {any} data
   * @returns
   */
  getTxmxindex(data) {
    return post('apicloud/Txmx/index', data)
  },
  /**
   * 我的钱包接口
   * 
   * @param {any} data
   * @returns
   */
  getWallet(data) {
    return post('apicloud/Wallet/index', data)
  },
  /**
   * 取消收藏商家接口
   * 
   * @param {any} data
   * @returns
   */
  getshopcancelcoll(data) {
    return post('apicloud/CollShops/cancelcoll', data)
  },
  /**
   * 收藏商家接口
   * 
   * @param {any} data
   * @returns
   */
  getshopcoll(data) {
    return post('apicloud/CollShops/coll', data)
  },

  /**
   * 取消收藏商品接口
   * 
   * @param {any} data
   * @returns
   */
  getcancelcoll(data) {
    return post('apicloud/CollGoods/cancelcoll', data)
  },
   /**
   * 收藏商品接口
   * 
   * @param {any} data
   * @returns
   */
  getcoll(data) {
    return post('apicloud/CollGoods/coll', data)
  },
  /**
   * 获取我的收藏列表
   * 
   * @param {any} data
   * @returns
   */
  getshoucanglst(data) {
    return post('apicloud/MemberColl/shoucanglst', data)
  },
  
  /**
   * 用户优惠券列表接口
   * 
   * @param {any} data
   * @returns
   */
  getcouponlstshop(data) {
    return post('apicloud/MemberCoupon/couponlst', data)
  },
   /**
   * 通过行业获取经营类目接口
   * 
   * @param {any} data
   * @returns
   */
  getcates(data) {
    return post('apicloud/ApplyInfo/getcates', data)
  },
  /**
   * 申请入驻获取相关信息
   * 
   * @param {any} data
   * @returns
   */
  getruzhuinfo(data) {
    return post('apicloud/ApplyInfo/ruzhuinfo', data)
  },
  /**
   * 判断申请入驻状态
   * 
   * @param {any} data
   * @returns
   */
  getpanduan(data) {
    return post('apicloud/ApplyInfo/panduan', data)
  },
  /**
   * 解绑银行卡接口
   * 
   * @param {any} data
   * @returns
   */
  getdeletecard(data) {
    return post('apicloud/BankCard/deletecard', data)
  },
  /**
   * 获取银行卡信息接口
   * 
   * @param {any} data
   * @returns
   */
  getBankCardinfo(data) {
    return post('apicloud/BankCard/index', data)
  },
  /**
   * 添加银行卡接口
   * 
   * @param {any} data
   * @returns
   */
  getBankCardAdd(data) {
    return post('apicloud/BankCard/add', data)
  },
  /**
   * 修改支付密码接口
   * 
   * @param {any} data
   * @returns
   */
  geteditpaypwd(data) {
    return post('apicloud/MemberInfo/editpaypwd', data)
  },
  /**
   * 重置支付密码接口
   * 
   * @param {any} data
   * @returns
   */
  getresetpaypwd(data) {
    return post('apicloud/MemberInfo/resetpaypwd', data)
  },
/**
   * 重置支付密码发送短信接口
   * 
   * @param {any} data
   * @returns
   */
  getczpaypwdcode(data) {
    return post('apicloud/MemberInfo/czpaypwdcode', data)
  },
  /**
   * 设置支付密码接口
   * 
   * @param {any} data
   * @returns
   */
  getszpaypwd(data) {
    return post('apicloud/MemberInfo/szpaypwd', data)
  },
  /**
   * 设置支付密码发送短信接口
   * 
   * @param {any} data
   * @returns
   */
  getszpaypwdcode(data) {
    return post('apicloud/MemberInfo/szpaypwdcode', data)
  },
  /**
   * 更换手机号码接口
   * 
   * @param {any} data
   * @returns
   */
  geteditphone(data) {
    return post('apicloud/MemberInfo/editphone', data)
  },
  /**
   * 更换手机号码接口
   * 
   * @param {any} data
   * @returns
   */
  geteditphone(data) {
    return post('apicloud/MemberInfo/editphone', data)
  },
  /**
   * 更换手机号码发送短信接口
   * 
   * @param {any} data
   * @returns
   */
  geteditphonecode(data) {
    return post('apicloud/MemberInfo/editphonecode', data)
  },

  /**
   * 修判断用户支付密码设置与否接口
   * 
   * @param {any} data
   * @returns
   */
  getpdpaypwd(data) {
    return post('apicloud/MemberInfo/pdpaypwd', data)
  },
   /**
   * 修改登录密码接口
   * 
   * @param {any} data
   * @returns
   */
  geteditpwd(data) {
    return post('apicloud/MemberInfo/editpwd', data)
  },
  
   /**
   * 获取主页信息接口
   * 
   * @param {any} data
   * @returns
   */
  gethomeInfo(data) {
    return post('apicloud/Index/indexinfo', data)
  },
 
  /**
   * 主页获取商品信息接口
   * 
   * @param {any} data
   * @returns
   */
  getgoodlst(data) {
    return post('apicloud/Index/getgoodlst', data)
  },
  /**
   * 即将开始秒杀商品详情
   * 
   * @param {any} data
   * @returns
   */
  getrushgoodinfo(data) {
    return post('apicloud/RushActivity/rushgoodinfo', data)
  },
  /**
   * 根据时间段获取秒杀商品列表接口
   * 
   * @param {any} data
   * @returns
   */
  getActivity(data) {
    return post('apicloud/RushActivity/index', data)
  },
   /**
   * 根据时间段获取秒杀商品列表接口
   * 
   * @param {any} data
   * @returns
   */
  getrushtime(data) {
    return post('apicloud/RushActivity/getrushtime', data)
  },
  /**
   * 获取商家促销活动信息接口
   * 
   * @param {any} data
   * @returns
   */
  getprominfo(data) {
    return post('apicloud/Shops/getprominfo', data)
  },

  /**
   * 获取商家店铺详细接口
   * 
   * @param {any} data
   * @returns
   */
  getshopinfo(data) {
    return post('apicloud/Shops/shopinfo', data)
  },
  /**
   * 获取商家分类接口
   * 
   * @param {any} data
   * @returns
   */
  getallgoods(data) {
    return post('apicloud/Shops/shopgoodres', data)
  },
  /**
   * 获取商家分类接口
   * 
   * @param {any} data
   * @returns
   */
  getshopcates(data) {
    return post('apicloud/Shops/shopcates', data)
  },
  /**
   * 获取商家介绍信息接口
   * 
   * @param {any} data
   * @returns
   */
  getshops(data) {
    return post('apicloud/Shops/getshops', data)
  },
  
  /**
   * 获取店铺活动商品列表接口
   * 
   * @param {any} data
   * @returns
   */
  getprolst(data) {
    return post('apicloud/Shops/getprolst', data)
  },
  /**
   * 通过分类获取商家列表接口
   * 
   * @param {any} data
   * @returns
   */
  getcatelst(data) {
    return post('apicloud/Shops/getcatelst', data)
  },

  
  /**
   * 支付订单获取订单信息接口
   * 
   * @param {any} data
   * @returns
   */
  getzhifuorder(data) {
    return post('apicloud/MemberOrder/zhifuorder', data)
  },

  /**
   * 订单详情接口
   * 
   * @param {any} data
   * @returns
   */
  getMyorderinfo(data) {
    return post('apicloud/MemberOrder/orderinfo', data)
  },
  /**
   * 取消订单接口
   * 
   * @param {any} data
   * @returns
   */
  getMyOrderquxiao(data) {
    return post('apicloud/MemberOrder/quxiao', data)
  },
   /**
   * 所有订单列表接口
   * 
   * @param {any} data
   * @returns
   */
  getMyOrder(data) {
    return post('apicloud/MemberOrder/index', data)
  },
  
  

  /**
   * 支付订单接口
   * 
   * @param {any} data
   * @returns
   */
  getzhifu(data) {
    return post('apicloud/Order/zhifu', data)
  },
  /**
   * 购物车创建订单支付接口
   * 
   * @param {any} data
   * @returns
   */
  getaddorderPay(data) {
    return post('apicloud/Order/addorder', data)
  },
 /**
   * 立即购买创建订单接口
   * 
   * @param {any} data
   * @returns
   */
  getpuraddorderPay(data) {
    return post('apicloud/Order/puraddorder', data)
  },
  
  /**
   * 搜索商品接口
   * 
   * @param {any} data
   * @returns
   */
  getsearchgoods(data) {
    return post('apicloud/Search/searchgoods', data)
  },
/**
   * 获取商品服务项接口
   * 
   * @param {any} data
   * @returns
   */
  getserlst(data) {
    return post('apicloud/Sertion/serlst', data)
  },
  /**
   * 获取商品活动信息接口
   * 
   * @param {any} data
   * @returns
   */
  gethuodonginfo(data) {
    return post('apicloud/Promotion/huodonginfo', data)
  },
  /**
   * 领取优惠券接口
   * 
   * @param {any} data
   * @returns
   */
  getcoupons(data) {
    return post('apicloud/Coupon/getcoupons', data)
  },
  /**
   * 获取优惠券列表信息接口
   * 
   * @param {any} data
   * @returns
   */
  getcouponlst(data) {
    return post('apicloud/Coupon/couponlst', data)
  },
   /**
   * 搜索商家店铺
   * 
   * @param {any} data
   * @returns
   */
  getsearchshops(data) {
    return post('apicloud/Search/searchshops', data)
  },
  /**
   * 立即购买确认订单详情接口
   * 
   * @param {any} data
   * @returns
   */
  getpursure(data) {
    return post('apicloud/Order/pursure', data)
  },
   /**
   * 立即购买确认订单接口
   * 
   * @param {any} data
   * @returns
   */
  getpurbuy(data) {
    return post('apicloud/Order/purbuy', data)
  },
  /**
   * 购物车购买确认订单详情接口
   * 
   * @param {any} data
   * @returns
   */
  getcartsure(data) {
    return post('apicloud/Order/cartsure', data)
  },
  /**
   * 购物车购买确认订单接口
   * 
   * @param {any} data
   * @returns
   */
  getcartbuy(data) {
    return post('apicloud/Order/cartbuy', data)
  },
  /**
   * 个人中心基本信息接口
   * 
   * @param {any} data
   * @returns
   */
  getreadprofile(data) {
    return post('apicloud/MemberInfo/readprofile', data)
  },
  /**
   * 会员新增收货地址接口
   * 
   * @param {any} data
   * @returns
   */
  getAddressdel(data) {
    return post('apicloud/Address/del', data)
  },
  /**
   * 会员新增收货地址接口
   * 
   * @param {any} data
   * @returns
   */
  getAddressadd(data) {
    return post('apicloud/Address/add', data)
  },
/**
   * 获取区县接口
   * 
   * @param {any} data
   * @returns
   */
  getarea(data) {
    return post('apicloud/Address/getarea', data)
  },
  /**
   * 获取城市接口
   * 
   * @param {any} data
   * @returns
   */
  getcity(data) {
    return post('apicloud/Address/getcity', data)
  },
  /**
   * 获取省份接口
   * 
   * @param {any} data
   * @returns
   */
  getpro(data) {
    return post('apicloud/Address/getpro', data)
  },
  /**
   * 获取会员单个收货地址信息接口
   * 
   * @param {any} data
   * @returns
   */
  getAddressinfo(data) {
    return post('apicloud/Address/getinfo', data)
  },

  /**
   * 会员编辑收货地址接口
   * 
   * @param {any} data
   * @returns
   */
  getAddressedit(data) {
    return post('apicloud/Address/edit', data)
  },

   /**
   * 收货地址列表接口
   * 
   * @param {any} data
   * @returns
   */
  getAddressList (data) {
    return post('apicloud/Address/index', data)
  },

  /**
   * 短信验证码登录接口
   * 
   * @param {any} data
   * @returns
   */
  getpwddenglu (data) {
    return post('apicloud/Login/denglu', data)
  },

   /**
   * 短信验证码登录接口
   * 
   * @param {any} data
   * @returns
   */
  getduanxindenglu (data) {
    return post('apicloud/Login/duanxinlogin', data)
  },

   /**
   * 登录发送短信验证码
   * 
   * @param {any} data
   * @returns
   */
  getLoginCode (data) {
    return post('apicloud/Login/sendcode', data)
  },

  /**
   * 注册app接口
   * 
   * @param {any} data
   * @returns
   */
  getsendcode (data) {
    return post('apicloud/Register/sendcode', data)
  },

  /**
   * 注册app接口
   * 
   * @param {any} data
   * @returns
   */
  getzhuce (data) {
    return post('apicloud/Register/zhuce', data)
  },

  /**
   * 平台商品分类接口
   * 
   * @param {any} data
   * @returns
   */
  getCategory (data) {
    return post('apicloud/Category/index', data)
  },

  /**
   * 通过顶级分类id获取子类接口
   * 
   * @param {any} data
   * @returns
   */
  getCategoryList (data) {
    return post('apicloud/Category/getchild', data)
  },

  /**
   * 商品列表接口
   * 
   * @param {any} data
   * @returns
   */
  getCategoryGoodsList (data) {
    return post('apicloud/Goods/getlst', data)
  },

  /**
   * 我的签到信息接口
   * 
   * @param {any} data
   * @returns
   */
  getSignInfo (data) {
    return post('apicloud/Sign/signinfo', data)
  },
  
  /**
   * 分享
   * 
   * @param {any} data 
   * @returns 
   */
  sharewxpy (data) {
    return post('apicloud/Find/sharewxpy', data)
  },

  /**
   * 发现页面接口
   * 
   * @param {any} data
   * @returns
   */
  getsquareList (data) {
    return post('apicloud/Find/index', data)
  },

  /**
   * 我的签到记录接口
   * 
   * @param {any} data
   * @returns
   */
  recordList (data) {
    return post('apicloud/Sign/signlog', data)
  },

  /**
   * 点击签到（1连续签到0普通签到）
   * 
   * @param {any} data
   * @returns
   */
  getdosign (data) {
    return post('apicloud/Sign/dosign', data)
  },

  /**
   * 点击用户关注
   * 
   * @param {any} data
   * @returns
   */
  getfollow (data) {
    return post('apicloud/Find/follow', data)
  },

  /**
   * 获取用户信息
   * 
   * @returns
   */
  getUserInfo (data) {
    return post('apicloud/MemberInfo/readprofile',data)
  },
  

  /**
   * 热门话题
   * 
   * @returns
   */
  gethottalk (data) {
    return post('apicloud/Find/hottalk',data)
  },

  /**
   * 热门话题
   * 
   * @returns
   */
  getmyfollow (data) {
    return post('apicloud/Find/myfollow',data)
  },
  
 /**
   * 商品详情页
   * 
   * @returns
   */
  getgoodsinfo (data) {
    return post('apicloud/Goods/goodsinfo',data)
  },
  
  /**
   *根据商品属性获取商品库存
   * 
   * @returns
   */
  getgoodsPrice (data) {
    return post('apicloud/Goods/get_goods_price',data)
  },
  
  /**
   *根据商品属性获取商品库存
   * 
   * @returns
   */
  getpingoodsPrice (data) {
    return post('apicloud/Goods/get_pingoods_price',data)
  },

  /**
   * 获取拼团订单详情接口
   * 
   * @param {any} data
   * @returns
   */
  getPinTuanDetail (data) {
    return post('apicloud/MemberAssem/info', data)
  },

  /**
   * 获取拼团规则
   * 
   * @returns 
   */
  getFightGroupRule () {
    return post('apicloud/AssemContent/info')
  },

  /**
   * 获取邀请好友信息
   * 
   * @param {any} data
   * @returns
   */
  getInviteInfo (data) {
    return post('apicloud/MemberAssem/yaoqing', data)
  },

   /**
   *  加入购物车
   * 
   * @returns
   */
  getaddcart (data) {
    return post('apicloud/Cart/addcart',data)
  },

  /**
   *  购物车商品列表
   * 
   * @returns
   */
  getCartList(data) {
    return post('apicloud/Cart/index',data)
  },

  /**
   *  删除购物车商品
   * 
   * @returns
   */
  getdelcart(data) {
    return post('apicloud/Cart/delcart',data)
  },

   /**
   *  购物车商品总数
   * 
   * @returns
   */
  getgetnum(data) {
    return post('apicloud/Cart/getnum',data)
  },

  /**
   *  修改购物车商品购买数量接口
   * 
   * @returns
   */
  geteditcart(data) {
    return post('apicloud/Cart/editcart',data)
  },

  /**
   * 获取直播页面轮播图
   * 
   * @returns 
   */
  getLiveAd () {
    return post('apicloud/Alive/getalivebanner')
  },

  /**
   * 获取新人榜
   * 
   * @returns 
   */
  getaliveindex (data) {
    return post('apicloud/Alive/getaliveindex', data)
  },

  /**
   * 获取直播分类列表
   * 
   */
  getNavList () {
    return post('apicloud/Alive/gettype')
  },

  /**
   * 发起直播
   * 
   */
  launchalive (data) {
    return post('apicloud/Alive/launchalive', data)
  },

  /**
   * 获取主播礼物排行榜
   */
  getGiftRankList (data) {
    return post('apicloud/alive/giftsranking', data)
  },

  /**
   * 获取直播店铺的信息
   * 
   * @param {any} data
   * @returns
   */
  getLiveShopInfo (data) {
    return post('apicloud/Alive/aliveinformation', data)
  },

  /**
   * 获取直播商品列表
   * 
   * @param {any} data
   * @returns
   */
  getLiveGoodsList (data) {
    return post('apicloud/Alive/alivegoods', data)
  },

  /**
   * 获取直播礼物列表
   * 
   * @param {any} data
   * @returns
   */
  getLiveGiftList () {
    return post('apicloud/Alive/alivegifts')
  },

  /**
   * 获取未完成订单列表
   * 
   * @param {any} data
   * @returns
   */
  getNotOrderList (data) {
    return post('apicloud/MemberOrder/index', data)
  },

  /**
   * 分销用户接口
   * 
   * @returns
   */
  getDistributionInfo () {
    return post('apicloud/MemberFenxiao/index')
  },

  /**
   * 分销二维码
   * 
   * @returns 
   */
  getDistributionORode () {
    return post('apicloud/MemberFenxiao/tgewm')
  },

  /**
   * 获取分销团队信息
   * 
   * @returns 
   */
  getDistributionTeamInfo (data) {
    return post('apicloud/MemberFenxiao/tuandui', data)
  },

  /**
   * 分销订单
   * 
   * @param {any} data 
   * @returns 
   */
  getDistributionOrderList (data) {
    return post('apicloud/MemberFenxiao/getorder', data)
  },

  /**
   * 退货
   * 
   * @param {any} data
   * @returns
   */
  exchange (data) {
    return post('apicloud/ThApply/pinapplytui', data)
  },

  /**
   * 团购栏目列表
   * 
   * @returns 
   */
  getFightGroupCate () {
    return post('apicloud/Assemble/getcate')
  },

  /**
   * 根据分类获取拼团商品列表
   * 
   * @param {any} data 
   * @returns 
   */
  getFightGroupList (data) {
    return post('apicloud/Assemble/getgoodslst', data)
  },

  /**
   * 团购栏目列表
   * 
   * @returns 
   */
  getFightGroupCate () {
    return post('apicloud/Assemble/getcate')
  },

  /**
   * 根据分类获取拼团商品列表
   * 
   * @param {any} data 
   * @returns 
   */
  getTgList (data) {
    return post('apicloud/GroupBuy/getgoodslst', data)
  },

  getShopList (data) {
    return post('apicloud/Shops/getshoplst', data)
  }
}


