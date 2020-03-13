// 弹窗组件构造函数
function Dialog(options) {
  this.cfg = {
    type: "alert",
    msg: "",
    title: "红豆恋",
    callback: null
  }
  $.extend(this.cfg, options);

  this.tipBox = null;
  this.init(this.cfg.type);
};

Dialog.prototype.init = function (type) {
  this.render(type);
  this.bindEvent();
};

Dialog.prototype.bindEvent = function () {
  var _this = this;

  // 遮罩层 按钮绑定点击隐藏事件
  ($(".tipBox").length > 0) && $(".tipBox .confirmBtn,.tipBox .cancelBtn").on("click", function (e) {
    _this.close();
    if ($(this).html() === "确认") {
      _this.cfg.callback && _this.cfg.callback();
    };
  })
};

Dialog.prototype.render = function (type) {
  var mask = (type === "showMsg") ? "" : "<div class='mask'></div>";
  var tipBoxStr = "<div class='tipBox'>" + mask + "</div></div>"
  this.tipBox = $(tipBoxStr);

  type === "confirm" && this.confirm();
  type === "alert" && this.alert();
  type === "showMsg" && this.showMsg();
  $("body").append(this.tipBox);

  setTimeout(function () {
    $(".tipBox").addClass("tipBox-active");
  }, 0)


  var self = this;
  if (type === "showMsg") {
    var delay = 1000;
    if (this.cfg.delay) {
      delay = this.cfg.delay
    }
    setTimeout(function () {
      self.tipBox && self.tipBox.remove();
    }, 2000);
  }
};

Dialog.prototype.alert = function () {
  var tip = "<div class='alert'>";
  tip += "<div class='title'>" + this.cfg.title + "</div>";
  tip += "<div class='msg'>" + this.cfg.msg + "</div>";
  tip += "<div class='tipBtn'><a class='confirmBtn'>确认</a></div>";
  tip += "</div>";
  this.tipBox.append(tip);
};

Dialog.prototype.confirm = function () {
  var tip = "<div class='confirm'>";
  tip += "<div class='title'>" + this.cfg.title + "</div>";
  tip += "<div class='msg code'>" + this.cfg.msg + "</div>";
  tip += "<div class='tipBtn'><a class='cancelBtn'>关闭</a><a class='confirmBtn'>复制</a></div>";
  tip += "</div>";
  this.tipBox.append(tip);
};

Dialog.prototype.showMsg = function () {
  var tip = "<div id='tip'>";
  tip += "<span class='msg'>" + this.cfg.msg + "</span>";
  tip += "</div>";
  this.tipBox.append(tip);
}

Dialog.prototype.close = function () {
  if (this.tipBox.length) {
    this.tipBox.removeClass("tipBox-active").remove();;
  }
};

// loading
function loading(text) {
  if (!(this instanceof loading)) {
    return new loading(text)
  }

  this.el = 'body'
  text ? this.text = text : this.text = '数据加载中'
  this.render()
}

loading.prototype.render = function () {
  var html = '<div class="loading">' +
    '<div class="loading-content">' +
    '<i class="iconfont loop icon-loading_"></i>' +
    '<span>' + this.text + '...</span>' +
    '</div>' +
    '</div>'

  $(this.el).append(html)

  setTimeout(function () {
    $('.loading').addClass('loading-active')
  }, 20)
}

loading.prototype.close = function () {
  var _this = this
  $(this.el).children('.loading').removeClass('loading-active')

  setTimeout(function () {
    $(_this.el).children('.loading').remove()
  }, 200)
}

function getUrlParam(paras) {
  var url = location.href;
  var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
  var paraObj = {};
  for (i = 0; j = paraString[i]; i++) {
    paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
  }
  var returnValue = paraObj[paras.toLowerCase()];
  if (typeof (returnValue) == "undefined") {
    return "";
  } else {
    return returnValue;
  }
}

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

$(document).ready(function () {
  FastClick.attach(document.body);
});