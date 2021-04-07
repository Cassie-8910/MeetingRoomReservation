// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     if(res.code){
    //       wx.request({
    //         url: this.globalData.hostPre+'/user/login',
    //         method: "post",
    //         data: {
    //           "code": res.code
    //         },
    //         success: res => {
    //           if(res.data.status=="success"){
    //             this.globalData.token = 'Bearer ' + res.data.data;
    //           }else{
    //             console.log("登录失败")
    //           }
    //           console.log("App token:"+this.globalData.token)
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
  },
  globalData: {
    userInfo: null,
    hostPre: "http://10.111.62.80:8000/api/v1",
    token:""
  }
})
