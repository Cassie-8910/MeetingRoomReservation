// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: 0,
    month: 0,
    day: 0,
    verticalCurrent: 2,
    roomCurrent:"403网络直播间",
    rooms: [{
      id: 1,
      name: "403网络直播间"
    }, {
      id: 2,
      name: "404共享办公室"
    }],
    position: 'left'
  },
  handleRoomChange({detail = {}}) {
    this.setData({
      roomCurrent: detail.value
    });
    console.log(this.data.roomCurrent)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      year: options.year,
      month: options.month,
      day: options.day,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data.year);
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