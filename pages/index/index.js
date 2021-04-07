// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    year: '', //年
    month: '', //月
    today: '', //日
    roomId: 1,
    week: ['日', '一', '二', '三', '四', '五', '六'], //周
    days: [], //日期数据
    newDay: [], //模仿初始化预约满的日期
    unDay: [], //模仿初始化未预约满的日期
    // disabledWeekday: ['日','一'],
    disabledDay: [] // 模仿初始化禁用的周次
  },

  onLoad: function (options) {
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     if(res.code){
    //       wx.request({
    //         url: app.globalData.hostPre+'/user/login',
    //         method: "POST",
    //         data: {
    //           "code": res.code
    //         },
    //         success: res => {
    //           if(res.data.status=="success"){
    //             app.globalData.token = 'Bearer ' + res.data.data;
    //           }else{
    //             console.log("登录失败")
    //           }
    //           console.log("App token:"+app.globalData.token)
    //         },
    //         fail (res){
    //           console.log("登录失败")
    //         }
    //       })
    //     }else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
    // console.log("token:"+app.globalData.token)

    // let time = new Date();
    // let year = time.getFullYear();
    // let month = time.getMonth() + 1;
    // this.setData({
    //   year: year,
    //   month: month
    // })
    // this.getDayStatus();
  },

  downloadFile: function () {
    console.log("进入下载")
    var _this = this;
    wx.downloadFile({
      // url: 'http://10.111.62.80:8002/api/v1/filedownload/text',
      success: function (res) {        
        if (res.statusCode === 200) {
          console.log(res.tempFilePath)
          wx.openDocument({
            filePath: res.tempFilePath,
            success(res) {
              console.log("成功",res)
            },
            fail(res) {
              console.log("失败",res)
            }
          })
        }
      }
    })
  }
})