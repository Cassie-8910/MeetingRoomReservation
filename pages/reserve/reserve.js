var app = getApp();
var util = require('../../utils/util.js');
const {
	$Toast
} = require('../../components/dist/base/index');
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
		time: "", //申请时间
		rules: [{
			name: 'name',
			rules: {
				required: true,
				message: '请输入姓名'
			},
		}, {
			name: 'className',
			rules: {
				required: true,
				message: '请输入班级'
			},
		}, {
			name: 'number',
			rules: {
				required: true,
				message: '请输入工号或学号'
			},
		}, {
			name: 'mailbox',
			rules: [{
				required: true,
				message: 'mobile必填'
			}, {
				mobile: true,
				message: 'mobile格式不对'
			}],
		}, {
			name: 'phoneNum',
			rules: {
				required: true,
				message: '请输入电话号码'
			},
		}, {
			name: 'use',
			rules: {
				required: true,
				message: '请输入用途'
			},
		}]
	},
	onLoad: function (options) {
		this.setData({
			date: util.getDate(),
			time: options.startTime + '-' + options.endTime,
			meetingRoomIndex: options.roomCurrentId - 1,
			date: options.year + '-' + options.month + '-' + options.day
		})
	},

	//表单验证规则
	initValidate() {
		const rules = {

		}
	},

	//预定按钮事件
	onReserve() {
		if (!(this.data.name && this.data.className && this.data.number && this.data.use)) {
			$Toast({
				content: '预约信息不完全',
				type: 'warning'
			});
		} else if (!(/^1[0-9]{10}$/.test(this.data.phoneNum))) {
			$Toast({
				content: '请输入正确的电话',
				type: 'warning'
			});
		} else if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.data.mailbox))) {
			$Toast({
				content: '请输入正确的邮箱',
				type: 'warning'
			});
		} else {
			console.log(this.data.meetingRoomArr[this.data.meetingRoomIndex])

			function getCurrentRoomId(currentRoom) {
				switch (currentRoom) {
					case '403网络直播间':
						return 1;
					case '404共享办公室':
						return 2;
				}
			}
			let roomId = getCurrentRoomId(this.data.meetingRoomArr[this.data.meetingRoomIndex])
			let startTime = this.data.date + ' ' + this.data.time.split('-')[0] + ":00"
			let endTime = this.data.date + ' ' + this.data.time.split('-')[1] + ":00"
			let startStamp = new Date(startTime).getTime()
			let endStamp = new Date(endTime).getTime()
			console.log('startStamp:' + startStamp + 'endStamp:' + endStamp)

			let data = {
				"roomId": roomId,
				"applicant": this.data.name,
				"college": this.data.academyArr[this.data.academyIndex],
				"classes": this.data.className,
				"identity": this.data.postArr[this.data.postIndex],
				"jobNumber": this.data.number,
				"email": this.data.mailbox,
				"phoneNumber": this.data.phoneNum,
				"reasonsForApplication": this.data.use,
				"startStamp": startStamp,
				"endStamp": endStamp
			}
			console.log(data);
			wx.showLoading({
				title: '正在预定中...',
			});
			wx.request({
				url: `${app.globalData.hostPre}/applications`,
				data: data,
				method: 'POST',
				header: {
					'content-type': 'application/json',
					'Authorization': app.globalData.token
				},
				success(res) {
					wx.hideLoading();
					if (res.data.status == "success") {
						$Toast({
							content: '预约成功',
							type: 'success'
						});
						setTimeout(function () {
							wx.navigateBack({
								delta: 2
							})
						}, 1000);
					} else {
						if (res.statusCode == 401) {
							$Toast({
								content: '未登录',
								type: 'error'
							});
						} else {
							$Toast({
								content: '网络错误',
								type: 'error'
							});
						}
					}
				},
				fail(res) {
					wx.hideLoading();
					$Toast({
						content: '预约失败',
						type: 'error'
					});
				}

			})
		}

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
	},
	getTime(e) {
		this.setData({
			time: e.detail.value
		})
	}
})