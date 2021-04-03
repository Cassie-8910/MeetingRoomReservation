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
  },

  onLoad: function (options) {

    console.log("token:"+app.globalData.token)
    // let time = new Date();
    // let year = time.getFullYear();
    // let month = time.getMonth() + 1;
    // this.setData({
    //   year: year,
    //   month: month
    // })
    // this.getDayStatus();
  },
  
})