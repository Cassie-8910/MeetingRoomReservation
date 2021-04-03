const app = getApp()
const { $Toast } = require('../dist/base/index');
Component({
  attached: function () {
    // 在组件实例进入页面节点树时执行
    this.dateData()
    this.checked()
    this.unChecked()
    this.getToday();
    this.getDayStatus();
  },
  /**
   * 组件的属性列表
   */
  properties: {
    newDay: {
      type: Array,
      value: '',
      observer: function (newVal, oldVal, changedPath) {
        // 将日期传入页面
        // this.dateData()
        // // 初始化有选中样式
        this.checked()
        // // 给当日日期添加特殊样式
        // this.getToday()
      }
    },
    unDay: {
      type: Array,
      value: '',
      observer: function (newVal, oldVal, changedPath) {
        // // 将日期传入页面
        // this.dateData()
        // // 初始化未选中样式
        this.unChecked()
        // // 给当日日期添加特殊样式
        // this.getToday()
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: '', //年
    month: '', //月
    today: '', //日
    week: ['日', '一', '二', '三', '四', '五', '六'], //周
    days: [], //日期数据
    verticalCurrent: 2,
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
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getDayStatus: function() {
      
      let that = this;
      let newDay = this.data.newDay
      let unDay = this.data.unDay
      wx.request({
        url: `${app.globalData.hostPre}/rooms/${that.data.roomCurrentId}/status?date=${that.data.year}-${that.data.month}`,
        method: 'GET',
        success(res) {
          console.log(res)
          if(res.data.status == "success"){
            newDay = res.data.data.full
            unDay = res.data.data.notFull  
            that.setData({
              newDay: newDay,
              unDay: unDay
            })
          }else{
            console.log(res);
            if(res.statusCode==401){
              // $Toast({
              //   content: '未登录',
              //   type: 'error'
              // });
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
    // 获取时间
    dateData: function () {
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1
      this.updateDays(year, month)
    },

    //时间调用方法
    updateDays: function (year, month) {
      let days = [];
      let dateDay = '';
      let dateWeek = '';

      // 根据日期获取每个月有多少天
      var getDateDay = function (year, month) {
        return new Date(year, month, 0).getDate();
      }

      //根据日期 获取当月的1号是周几
      var getDateWeek = function (year, month) {
        return new Date(year, month - 1, 1).getDay();
      }

      dateDay = getDateDay(year, month)
      dateWeek = getDateWeek(year, month)

      //console.log(dateDay);
      //console.log(dateWeek);
      //向数组中添加天
      for (let index = 1; index <= dateDay; index++) {
        let a = {
          checked: false,
          index: index
        };
        days.push(a)
      }
      //向数组中添加一号之前应该空出的空格
      for (let index = 1; index <= dateWeek; index++) {
        let a = {
          checked: false,
          index: 0
        };
        days.unshift(a)
      }


      this.setData({
        days: days,
        year: year,
        month: month,
      })
    },

    // 初始化有选中效果
    checked: function () {
      let year = this.data.year;
      let month = this.data.month;
      let newDay = this.data.newDay
      let days = this.data.days
      for (var i = 1; i < days.length; i++) {
        let a = year + '-' + month + '-' + days[i]['index']
        days[i]['checked'] = this.inArray(newDay, a)
      }
      this.setData({
        days: days
      })
    },

    // 初始化没有选中效果
    unChecked: function () {
      let year = this.data.year;
      let month = this.data.month;
      let unDay = this.data.unDay;
      let days = this.data.days;
      for (var i = 1; i < days.length; i++) {
        let a = year + '-' + month + '-' + days[i]['index']
        days[i]['unChecked'] = this.inArray(unDay, a)
      }
      // console.log(days);
      this.setData({
        days: days
      })
    },

    inArray: function (arr = [], val = '') {
      for (let k in arr) {
        if (val == arr[k]) {
          return true;
        }
      }
      return false;
    },

    //点击减小月份
    minusMonth: function () {
      let year = this.data.year;
      let month = this.data.month;
      month--
      if (month < 1) {
        month = 12
        year--
      }
      this.setData({
        year: year,
        month: month
      })

      this.updateDays(year, month)
      this.checked()
      this.unChecked()
      this.getToday()
    },
    //点击增加月份
    addMonth: function () {
      console.log("===进入增加月份");
      let year = this.data.year;
      let month = this.data.month;
      month++
      if (month > 12) {
        month = 1
        year++
      }
      this.setData({
        year: year,
        month: month
      })
      this.updateDays(year, month);
      this.checked();
      this.unChecked();
      this.getToday();
      this.getDayStatus();
    },
    // 获取今日日期，使当天日期有单独样式
    getToday: function () {
      let time = new Date();
      let year = this.data.year
      let month = this.data.month
      let today = this.data.today
      today = time.getDate()
      // console.log(month)
      // console.log(time.getMonth() + 1)
      if (year == time.getFullYear() && month == time.getMonth() + 1) {
        today = today
      } else {
        today = 0
      }
      this.setData({
        today: today
      })
    },
    // 点击某天跳转预约详情页面
    toDay: function (item) {
      var day = item.currentTarget.dataset.index;
      wx.navigateTo({
        url: '../detail/detail?day=' + day + "&year=" + this.data.year + "&month=" + this.data.month+"&roomCurrentId="+this.data.roomCurrentId,
      })
    },
    // 切换会议室
    handleRoomChange({ detail = {} }) {
      this.setData({
        roomCurrent: this.data.rooms[detail.value].name,
        roomCurrentId: this.data.rooms[detail.value].id
      });
      this.getDayStatus();
    }
  },
})
