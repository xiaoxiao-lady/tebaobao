import emojimap from './emojimap.js'
const emoji = emojimap.emojiList.emoji
/*  #ifdef  APP-PLUS  */
// const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert')
/*  #endif  */
const showToast = msg => {
  uni.showToast({
    title: msg,
    duration: 2000,
    position:'bottom',
    icon: 'none'
  })
}

const showLoading = title => {
  uni.showLoading({
    title: title ? title : '加载中',
    mask:true,
  })
}

const hideLoading = () => {
  uni.hideLoading()
}

const share = (params) => {
  uni.showActionSheet({
    itemList: ['微信分享', '微信朋友圈分享', 'QQ分享'],
    success: (res) => {
      const index = res.tapIndex
      const provider =  index === 2 ? 'qq' : 'weixin' 
      let shareData = {}

      if (index === 2) {
        shareData = {
          provider: provider,
          // ...params,
          type: 1,
          title: params.href,
          href: params.href
        }
      } else if (index === 0) {
        shareData = {
          provider: provider,
          scene: 'WXSceneSession',
          ...params,
        }
      } else {
        shareData = {
          provider: provider,
          scene: 'WXSenceTimeline',
          ...params,
        }
      }
      uni.share({
        type: 0,
        ...shareData,
        imageUrl: 'https://nycs.maitexun.cn/uploads/logo.png',
        success: () => {
          // showToast('分享成功')
          uni.showToast({
            title: '分享成功',
            duration: 2000,
            icon: 'none'
          })
          params.callBack()
        },
        fail: (err) => {
          console.log(JSON.stringify(err))
          // showToast('分享失败')
          uni.showToast({
            title: '分享失败',
            duration: 2000,
            icon: 'none'
          })
        }
      })
    },
    fail: () => {
    }
  })
}

const showModal = (data = {content:'这是一个模态弹窗'}) => {
  return new Promise(function(resolve,reject) {
    /*  #ifdef  APP-PLUS  */
    // dcRichAlert.show({
    //   position:'center',
    //   title:'提示信息',
    //   content:data.content,
    //   buttons:[ {
    //       title: '取消'
    //   },
    //   {
    //       title: '确认',
    //       titleColor: '#FA3F3F'
    //   } ]
    // },result=>{
    //   switch (result.type) {
    //       case 'button':

    //           console.log("callback---button--" + result.index);
    //           resolve({confirm:result.index})
    //           break;
    //       case 'checkBox':
    //           console.log("callback---checkBox--" + result.isSelected);
    //           break;
    //       case 'a':
    //           console.log("callback---a--" + JSON.stringify(result));
    //           break;
    //       case 'backCancel':
    //           console.log("callback---backCancel--");
    //           break;
    //   }
    // })
    // return false
    /*  #endif  */

    uni.showModal({
        title: '提示信息',
        content: data.content,
        success: function (res) {
          resolve(res)
        }
    });
  })
}
const Dialog = {
  alert: params => {
    return new Promise(resolve => {
      uni.showModal({
        title: '温馨提示',
        content: params.message,
        showCancel: false,
        confirmText: params.confirmButtonText ? params.confirmButtonText : '确定',
        success: res => {
          if (res.confirm) {
            resolve()
          } 
        }
      })
    })
  },

  confirm: params => {
    return new Promise((resolve, reject) => {
      uni.showModal({
        title: '温馨提示',
        content: params.message,
        showCancel: true,
        cancelText: params.cancelButtonText ? params.cancelButtonText : '取消',
        confirmText: params.confirmButtonText ? params.confirmButtonText : '确定',
        success: res => {
          if (res.confirm) {
            resolve()
          } else if (res.cancel) {
            reject()
          }
        }
      })
    })
  }
}

const formartDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = parseInt(date.getMonth()) + 1 > 9 ? parseInt(date.getMonth()) + 1 : '0' + (parseInt(date.getMonth()) + 1)
  const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()

  return year + '-' + month + '-' + day
}


/**
 * 格式化时间戳 秒
 *
 * @param {Number} timestamp
 */
function fomartTime (timestamp) {
  if (!timestamp) return ''

  const date = new Date(timestamp * 1000)
  const nowDate = new Date()
  const year = date.getFullYear()
  const month = parseInt(date.getMonth()) + 1
  const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  const hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  const min = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()

  const nowYear = nowDate.getFullYear()

  if (nowYear !== year) {
    return `${year}年${month}月${day}`
  }

  if (nowYear === year && date.getMonth() === nowDate.getMonth() && date.getDate() === nowDate.getDate()) {
    return `${hours}:${min}`
  }

  return `${month}月${day}日`
}


/**
 * 生成富文本节点
 */
function generateRichTextNode (text, type) {
  if (!text) return false
  // 如果是数组，则直接返回
  if (type === 2 || type === 'img') {
    return text
  }

  let tempStr = text
  let list = []
  let leftBracketIndex = tempStr.indexOf('face[')
  let rightBracketIndex = tempStr.indexOf(']')
  let countOfWord = 0
  Array.from(tempStr).map(item => {
    if (item != '[' && item != ']') {
      countOfWord++
    }
  })
  if (leftBracketIndex == -1 || rightBracketIndex == -1 || countOfWord == 0) {//没有emoji
    return [
      {
        type: 'text',
        content: tempStr
      }
    ]
  }
  while (tempStr.length != 0) {
    leftBracketIndex = tempStr.indexOf('face[')
    rightBracketIndex = tempStr.indexOf(']')
    if (leftBracketIndex == 0) { // 开头是[
      rightBracketIndex = tempStr.indexOf(']')
      if (rightBracketIndex == -1) {
        list.push({
          type: 'text',
          content: tempStr
        })
      } else {
        let emojiName = tempStr.slice(0, rightBracketIndex + 1)
        if (emoji[emojiName]) { // 有效emoji
          list.push({
            type: 'emoji',
            content: emoji[emojiName].img
          })
        } else {
          tempStr += emojiName
          list.push({
            type: 'text',
            content: emojiName
          })
        }
        tempStr = tempStr.substring(rightBracketIndex + 1, tempStr.length)
      }
    } else { // 开头不是[
      if (leftBracketIndex == -1) {// 最后全是文字
        list.push({
          type: 'text',
          content: tempStr.slice(0, tempStr.length)
        })
        tempStr = ''
      } else {
        list.push({
          type: 'text',
          content: tempStr.slice(0, leftBracketIndex)
        })
        tempStr = tempStr.substring(leftBracketIndex, tempStr.length + 1)
      }
    }
  }

  return list
}

let imgList = []
const chooseImg = (params) => {
  imgList = []
  return new Promise((resolve) => {
    uni.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      sizeType: ['compressed', 'original'],
      ...params,
      success: res => {
        /* #ifdef APP-PLUS */
        res.tempFilePaths.forEach((item) => {
          compress(item, res.tempFilePaths.length, resolve)
        })
        
        resolve(res)
        /* #endif */
        /* #ifdef MP-WEIXIN */
        resolve(res)
        /* #endif */
      },
      fail: err => {
        console.log(err)
      }
    })
  })
}

const compress = (img, len, resolve) => {
  let image = img

  // 压缩size
  plus.io.resolveLocalFileSystemURL(image, (entry) => {
    entry.file((file) => {// 可通过entry对象操作图片 
      console.log("getFile:" + JSON.stringify(file));
      plus.zip.compressImage({
        src: image,
        dst: image,
        width: '100%',
        height: '100%',
        quality: 60,
        overwrite: true
      }, (event) => {
        let newImg = image;
        imgList.push(newImg)
        if (len === imgList.length) {
          resolve({
            tempFilePaths: imgList
          })
        }
      }, function(error) {
        console.log('success zip****' + JSON.stringify(error));
        uni.showModal({
          content:"分享图片太大,需要请重新选择图片!",
          showCancel:false
        })
      });
    });
  }, (e) => {
    console.log("Resolve file URL failed: " + e.message);
    uni.showModal({
      content:"分享图片太大,需要请重新选择图片!",
      showCancel:false
    })
  });
}

//时间戳 转 YY-mm-dd HH:ii:ss 
const formatDateTime = (inputTime) =>{
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};



const formatSeconds = function (value) {
  var secondTime = parseInt(value);// 秒
  var minuteTime = 0;// 分
  var hourTime = 0;// 小时
  if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
      //获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60);
      //获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60);
      //如果分钟大于60，将分钟转换成小时
      if(minuteTime > 60) {
          //获取小时，获取分钟除以60，得到整数小时
          hourTime = parseInt(minuteTime / 60);
          //获取小时后取佘的分，获取分钟除以60取佘的分
          minuteTime = parseInt(minuteTime % 60);
      }
  }
  var result = hourTime + '-' + minuteTime + '-'+ secondTime
  return result;
}



export default {
  showToast,
  hideLoading,
  showLoading,
  formartDate,
  chooseImg,
  generateRichTextNode,
  fomartTime,
  formatDateTime,
  showModal,
  formatSeconds,
  Dialog,
  share
}
