// socket已经连接成功
var socketOpen = false
// socket已经调用关闭function
var socketClose = false
// socket发送的消息队列
var socketMsgQueue = []
// 判断心跳变量
var heart = ''
// 心跳失败次数
var heartBeatFailCount = 0
// 终止心跳
var heartBeatTimeOut = null;
// 终止重新连接
var connectSocketTimeOut = null;

var reconnectTimeOut = null
var isReconnect = false
var limit =  0
var webSocket = {
 
  /**
   * 创建一个 WebSocket 连接
   * @param {options} 
   *   url          String    是    开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
   *   header        Object    否    HTTP Header , header 中不能设置 Referer
   *   method        String    否    默认是GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
   *   protocols    StringArray    否    子协议数组    1.4.0
   *   success      Function    否    接口调用成功的回调函数
   *   fail         Function    否    接口调用失败的回调函数
   *   complete      Function    否    接口调用结束的回调函数（调用成功、失败都会执行）
   */
  ws: null,
  connectSocket (options) {
    socketOpen = false
    socketClose = false
    socketMsgQueue = []
    webSocket.ws = uni.connectSocket({
      url: 'wss://nycs.maitexun.cn:8989',
      header: {
          'content-type': 'application/json'
      },
      method: 'GET',
      success: res => {
        // #ifdef H5
        console.log(111)
        bindEvent()
        // #endif
        if (options) {
          options.success && options.success(res);
        }
      },
      fail: res => {
        console.log('websocket 连接失败')
        if (options) {
          // 失败回调
          options.fail && options.fail(res);
        }
      }
    })
  },
 
  /**
   * 通过 WebSocket 连接发送数据
   * @param {options} 
   *   data    String / ArrayBuffer    是    需要发送的内容
   *   success    Function    否    接口调用成功的回调函数
   *   fail    Function    否    接口调用失败的回调函数
   *   complete    Function    否    接口调用结束的回调函数（调用成功、失败都会执行）
   */
  sendSocketMessage: (options) => {
    if (socketOpen) {
      uni.sendSocketMessage({
        data: options.data,
        success: function(res) {
          if (options) {
            options.success && options.success(res);
          }
        },
        fail: function(res) {
          if (options) {
            options.fail && options.fail(res);
          }
        }
      })
    } else {
      console.log('socket 断开')
      socketMsgQueue.push(options.data)
    }
  },
  
  reconnect () {
    if (socketOpen && isReconnect) return
    clearTimeout(this.reconnectTimeOut)
    if (limit < 100){
      reconnectTimeOut = setTimeout(() => {
        console.log(`尝试断线重连---${limit}次`)
        this.connectSocket()
      }, 2000)
      limit = limit + 1
    }
  },
 
  /**
   * 关闭 WebSocket 连接。
   * @param {options} 
   *   code    Number    否    一个数字值表示关闭连接的状态号，表示连接被关闭的原因。如果这个参数没有被指定，默认的取值是1000 （表示正常连接关闭）
   *   reason    String    否    一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于123字节的UTF-8 文本（不是字符）
   *   fail    Function    否    接口调用失败的回调函数
   *   complete    Function    否    接口调用结束的回调函数（调用成功、失败都会执行）
   */
  closeSocket: function(options) {
    if (connectSocketTimeOut) {
      clearTimeout(connectSocketTimeOut);
      connectSocketTimeOut = null;
    }

    if (!socketOpen) {
      return false
    }

    socketClose = true;
    var self = this;
    self.stopHeartBeat();
    uni.closeSocket({
      success: function(res) {
        console.log('WebSocket 已关闭！');
        if (options) {
          options.success && options.success(res);
        }
      },
      fail: function(res) {
        if (options) {
          options.fail && options.fail(res);
        }
      }
    })
  },
 
  // 收到消息回调
  onSocketMessageCallback: function(msg) {
  },
 
  // 开始心跳
  startHeartBeat: function() {
    console.log('socket开始心跳')
    var self = this;
    heart = 'heart';
    self.heartBeat();
  },
 
  // 结束心跳
  stopHeartBeat: function() {
    console.log('socket结束心跳')
    var self = this;
    heart = '';
    if (heartBeatTimeOut) {
      clearTimeout(heartBeatTimeOut);
      heartBeatTimeOut = null;
    }
    if (connectSocketTimeOut) {
      clearTimeout(connectSocketTimeOut);
      connectSocketTimeOut = null;
    }
  },
 
  // 心跳
  heartBeat: function() {
    var self = this;
    if (!heart) {
      return;
    }
    self.sendSocketMessage({
      data: JSON.stringify({
        type: 'ping',
        id: uni.getStorageSync('token')
      }),
      success: function(res) {
        console.log(`连接状态： ${socketOpen}-----心跳检测中`);
        if (heart) {
          heartBeatTimeOut = setTimeout(() => {
            self.heartBeat();
          }, 9000);
        }
      },
      fail: function(res) {
        console.log('socket心跳失败');
        if (heartBeatFailCount > 2) {
          // 重连
          self.connectSocket();
        }
        if (heart) {
          heartBeatTimeOut = setTimeout(() => {
            self.heartBeat();
          }, 9000);
        }
        heartBeatFailCount++;
      },
    });
  }
}
// #ifdef APP-PLUS || MP-WEIXIN
bindAppEvent()
// #endif

function bindEvent() {
  // 监听WebSocket连接打开事件。callback 回调函数
  webSocket.ws.onOpen(function(){
    console.log('WebSocket连接已打开！')
    // 如果已经调用过关闭function
    if (socketClose) {
      webSocket.closeSocket();
    } else {
      socketOpen = true
      for (var i = 0; i < socketMsgQueue.length; i++) {
        webSocket.sendSocketMessage(socketMsgQueue[i])
      }
      socketMsgQueue = []
      webSocket.startHeartBeat()
      limit = 0
    }
  })
  
  // 监听WebSocket错误。
  webSocket.ws && webSocket.ws.onError(function(res) {
    console.log('WebSocket连接打开失败，请检查！', res)
    socketOpen = false
    // if (!socketClose) {
    //   webSocket.reconnect()
    // }
  })
  
  // 监听WebSocket接受到服务器的消息事件。
  webSocket.ws && webSocket.ws.onMessage(function(res) {
    console.log('接收消息中...', res)
    let data = JSON.parse(res.data)
    if (data.type === 'init') {
      webSocket.sendSocketMessage({
        data: JSON.stringify({
          type: 'bind_id',
          id: uni.getStorageSync('token'),
          client_id: data.data.client_id
        })
      })
    }
    webSocket.onSocketMessageCallback(res)
  })

  // 监听WebSocket关闭。
  webSocket.ws && webSocket.ws.onClose(function(res) {
    console.log('WebSocket 已关闭！')
    socketOpen = false
    if (!socketClose) {
      webSocket.reconnect()
    }
  })
  
}

function bindAppEvent() {
  // 监听WebSocket错误。
  uni.onSocketError(function(res) {
    console.log('WebSocket连接打开失败，请检查！', res)
    socketOpen = false
  })
  
  uni.onSocketOpen(function(){
    console.log('WebSocket连接已打开！')
    // 如果已经调用过关闭function
    if (socketClose) {
      webSocket.closeSocket();
    } else {
      socketOpen = true
      for (var i = 0; i < socketMsgQueue.length; i++) {
        webSocket.sendSocketMessage(socketMsgQueue[i])
      }
      socketMsgQueue = []
      webSocket.startHeartBeat()
      limit = 0
    }
  })
  
  
  // 监听WebSocket接受到服务器的消息事件。
  uni.onSocketMessage(function(res) {
    console.log('接收消息中...')
    let data = JSON.parse(res.data)
    if (data.type === 'init') {
      webSocket.sendSocketMessage({
        data: JSON.stringify({
          type: 'bind_id',
          id: uni.getStorageSync('token'),
          client_id: data.data.client_id
        })
      })
    }

    webSocket.onSocketMessageCallback(res)
  })
  
  // 监听WebSocket关闭。
  uni.onSocketClose(function(res) {
    console.log('WebSocket 已关闭！')
    socketOpen = false
    if (!socketClose) {
      webSocket.reconnect()
    }
  })
}
 
module.exports = webSocket;