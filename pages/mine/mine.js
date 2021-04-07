// const { $Message } = require('../..components/dist/base/index');
var app = getApp();
const { $Toast } = require('../../components/dist/base/index');
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false 
    current: 2,
    verticalCurrent: 2,
    visible2: false,
    history: [],
    //小程序没有refs，所以只能用动态布尔值控制关闭
    toggle: false,
    toggle2: false,
    // 滑动后显示该模块
    actions: [{
      name: '取消预约',
      color: '#fff',
      fontsize: '20',
      width: 100,
      background: '#ed3f14'
    }]
  },

  // 取消预约的回调
  handlerCloseButton() {
    console.log("========");
    this.setData({
      toggle2: this.data.toggle2 ? false : true
    });
  },

  //事件处理函数
  bindViewTap() {
    //
  },
  getReserveTime(timeObj) {
    let startDate = new Date(timeObj.startStamp)
    let endDate = new Date(timeObj.endStamp)
    let year = startDate.getFullYear()
    let month = startDate.getMonth() + 1
    let day = startDate.getDate()
    let startTime = startDate.getHours()
    let endTime = endDate.getHours()

    return year + '-' + month + '-' + day + ' ' + startTime + ':00' + '-' + endTime + ':00'
  },
  getReserveStatus(statusObj) {
    let status = statusObj.status
    let reserveStatus = ''
    switch (status) {
      case 0:
        reserveStatus = '未处理'
        break
      case 1:
        reserveStatus = '已完成'
        break
      case 2:
        reserveStatus = '已拒绝'
        break
      case 3:
        reserveStatus = '已失效'
        break
    }
    return reserveStatus
  },
  onLoad() {
    let that = this
    let history = this.data.history
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    wx.request({
      url: `${app.globalData.hostPre}/applications?role=user&pageNum=1`,
      method: 'GET',
      header: {
        'Authorization': app.globalData.token
      },
      success(res) {
        console.log("我的页面响应", res)
        if (res.data.status == "success") {
          for (let i = 0; i < res.data.data.length; i++) {
            let historyItem = {}
            let historyItem2 = res.data.data[i]
            
            let reserveTime = that.getReserveTime(historyItem2)
            historyItem.reserveTime = reserveTime

            let roomName = historyItem2.room.roomName
            historyItem.reserveRoom = roomName

            let reserveStatus = that.getReserveStatus(historyItem2)
            historyItem.reserveStatus = reserveStatus

            history.push(historyItem)
          }
          that.setData({
            history: history
          })
        } else {
          $Toast({
            content: '网络错误',
            type: 'error'
          });
        }
      }
    })
  },
  getUserProfile(e) {
    //推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})