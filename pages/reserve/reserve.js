var app = getApp();
var util = require('../../utils/util.js');
Page({
	data: {
		meetingRoomArr: ['403网络直播间', '404共享办公室'],
		meetingRoomIndex: 0,
		name: "", //姓名
		academyArr: ['轻工科学与工程学院', '材料科学与工程学院', '环境科学与工程学院', '食品与生物工程学院', '机电工程学院', '电气与控制工程学院', '电子信息与人工智能学院', '经济与管理学院', '化学与化工学院', '设计与艺术学院', '文理学院', '教育学院', '马克思主义学院', '阿尔斯特学院'],
		academyIndex: 0,
		postArr: ['教师', '学生'], //岗位
		postIndex: 0,
		number: "", //工号/学号
		date: "", // 选择日期
		className: "",
		phoneNum: "", //电话
		mailbox: "", //邮箱
		use: "", // 申请用途
	},
	onLoad: function (options) {
		this.setData({
			date: util.getDate()
		})
	},

	//预定按钮事件
	onReserve() {
		var rooms = this.data.rboardroom.map(item => item.roomId);
		var params = {
			name: this.data.name,
			academy: this.data.academy,
			date: this.data.date,
			startTime: this.data.stime,
			endTime: this.data.etime,
			description: this.data.describe,
			rooms: rooms
		};
		wx.showLoading({
			title: '正在预定中...',
		});
	},
	onChangeMeetingRoom(e) {
		this.setData({
			meetingRoomIndex: e.detail.value
		})
	},
	onChangeAcademy(e) {
		this.setData({
			academyIndex: e.detail.value
		})
	},
	onChangePost(e) {
		this.setData({
			postIndex: e.detail.value
		})
	},
	onChangeDate(e) {
		this.setData({
			date: e.detail.value,
		});
	},
	onChangeTime(e) {
		this.setData({
			timeIndex: e.detail.value
		});
	},

	getName(e) {
		this.setData({
			name: e.detail.value
		});
	},
	getClassName(e) {
		this.setData({
			className: e.detail.value
		})
	},
	getIdentity(e) {
		this.setData({
			identity: e.detail.value
		})
	},
	getNumber(e) {
		this.setData({
			number: e.detail.value
		})
	},
	getMailbox(e) {
		this.setData({
			mailbox: e.detail.value
		})
	},
	getPhoneNum(e) {
		this.setData({
			phoneNum: e.detail.value
		})
	},
	getUse(e) {
		this.setData({
			use: e.detail.value
		})
	}
})