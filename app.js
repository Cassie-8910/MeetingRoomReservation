// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          console.log(res.code);
          wx.request({
            url: this.globalData.hostPre+'api/v1/user/login',
            method: "post",
            data: {
              code: res.code
            },
            success: res => {

            }
          })
        }else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    hostPre: "http://10.111.62.80:8000/"
  }
})
