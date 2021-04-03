// pages/detail/detail.js
const { $Toast } = require('../../components/dist/base/index');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    year: '',
    month: '',
    day: '',
    roomCurrent: "403网络直播间",
    roomCurrentId: 1,
    rooms: [{
      id: 1,
      name: "403网络直播间"
    }, {
      id: 2,
      name: "404共享办公室"
    }],
    position: 'left',
    reservedArr: [], // epx boolean
    reserveStatus: ["waite", "waite", "waite", "waite"],
    isReserved: ['空闲', '空闲', '空闲', '空闲']
  },

  getDetail: function () {
    let that = this
    let dateStr = this.data.year + '-' + this.data.month + '-' + this.data.day
    // console.log('dateStr',dateStr)
    let reservedArr = this.data.reservedArr
    // console.log('reservedArr-before:', reservedArr)

    let currentRoomId = this.data.roomCurrentId;

    let app = getApp()
    // console.log('app:', app.globalData)
    wx.request({
      url: `${app.globalData.hostPre}/rooms/${currentRoomId}?dateStr=` + dateStr,
      method: 'GET',
      success(res) {
        console.log(res.data)
        if (res.data.status == "success") {
          console.log('res.data.data.dayStatus:', res.data.data.dayStatus)
          // reservedArr = 
          let reserveStatus = that.data.reserveStatus;
          let isReserved = that.data.isReserved
          res.data.data.dayStatus.forEach(element=>{
            reservedArr[element - 1 ] = true;
            reserveStatus[element - 1] = "process";
            isReserved[element - 1] = "已被预约"
          })
          that.setData({
            reservedArr: reservedArr,
            reserveStatus: reserveStatus,
            isReserved: isReserved
          })
        }else{
          if(res.statusCode==401){
            $Toast({
              content: '未登录',
              type: 'error'
            });
          }else{
            $Toast({
              content: '网络错误',
              type: 'error'
            });
          }
        }
      },
      fail(res){
        $Toast({
          content: '网络错误',
          type: 'error'
        });
      }
    })
  },

  // 切换会议室
  handleRoomChange({
    detail = {}
  }) {
    this.setData({
      roomCurrent: this.data.rooms[detail.value].name
    })
    this.getDetail()
  },

  // 按钮点击事件
  handleClick: function (e) {
    console.log(e.currentTarget.id)
    let startTime = ''
    let endTime = ''
    switch (e.currentTarget.id) {
      case '1':
        startTime = '9:00'
        endTime = '11:00'
        break
      case '2':
        startTime = '14:00'
        endTime = '16:00'
        break
      case '3':
        startTime = '16:00'
        endTime = '18:00'
        break
      case '4':
        startTime = '18:00'
        endTime = '20:00'
        break
    }
    console.log('startTime:' + startTime + 'endTime: ' + endTime)
    wx.navigateTo({
      url: '../reserve/reserve?startTime=' + startTime + '&endTime=' + endTime + "&roomCurrentId="+ this.data.roomCurrentId + '&year=' + this.data.year + '&month=' + (this.data.month>9?this.data.month:'0'+this.data.month) + '&day=' + (this.data.day>9?this.data.day:'0'+this.data.day)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      year: options.year,
      month: options.month,
      day: options.day,
      roomCurrentId: options.roomCurrentId,
      roomCurrent: this.data.rooms[options.roomCurrentId - 1].name
    });
    this.getDetail()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    // console.log(this.data.reservedArr);
    // console.log("reserveStatus:", this.data.reserveStatus)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})