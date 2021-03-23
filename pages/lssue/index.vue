<template>
	<!--pages/lssue/index.wxml-->

	<view class="main" style="background-image:url({bg});">
		<image class="bgimg" src="/static/img/heart.png"></image>
		<view class="down1">下载“同窝App”</text></view>
		<view class="down2">让我们更亲密，住在一起不吵架</text></view>
		<view class="orange">
			<view class="avator">
				<image :src="img"></image>
			</view>
			<!--真机需要更换为网络图片-->
			<view class="top">
				<view class="num">题目{{nowQuestionIndex+1}}/10</view>
				<view class="center"></view>
				<!-- <view class="switch" @tap="switchFun">
			      <image src="/static/img/switch.png"></image>
			      <view class="font">换一题</view>
			    </view> -->
			</view>
			<view class="content">
				<view class="subject">
					<view class="problem">{{nowQuestion.title}}</view>
					<view v-for="(item, index) in nowQuestion.options" :key="index"
						:class="'answer ' + (item.id == nowQuestion.chose ? 'selected' : '')" @tap="selected(item)"
						:data-id="item.id" :data-index="index">
						<p class="ques-content">{{item.content}}</p>
						<!-- {{item.content}} -->
					</view>
				</view>
			</view>
			<view class="choice">
				<!-- <view v-if="nowQuestionIndex>0" @tap="prveQuestion">上一题</view>
						<view v-if="nowQuestionIndex<nowQuestionList.length-1" @tap="nextQuestion">下一题</view> -->
				<view v-if="nowQuestionIndex===nowQuestionList.length-1" @tap="saveData">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/lssue/index.js
	const app = getApp();

	export default {
		data() {
			return {
				bg: 'https://hongbang.dingyuedianshang.com/xcximg/lssuebg.jpg',
				num: 5,
				//题目总数
				selectedIdx: -1,
				//已选题目索引
				selectedNum: 1 //已选题目数量
					,
				subjectLen: "",
				subjectList: "",
				subject: "",
				subjectIndex: "",
				nowQuestionList: [],
				nowQuestionIndex: 0, //当前题目下标
				nowQuestion: {
					options: []
				}, //当前题目
				pageType: '', //当前页面类型
			};
		},

		components: {},
		props: {},

		/**
		 * 监听页面显示
		 */
		onShow: function() {
			// var mySubject = uni.getStorageSync('mySubject') || [];
			// var num = this.num;
			// this.setData({
			//   selectedNum: mySubject.length + 1 >= num ? num : mySubject.length + 1
			// });

			// if (this.selectedNum > 1) {
			//   this.switchFun();
			// }

		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			// this.setData({
			//   num: options.num
			// });
			// this.getQAList();
			this.setData({
				nowQuestion: this.questionList[this.nowQuestionIndex],
				pageType: options.type,
				nowQuestionList: JSON.parse((JSON.stringify(this.questionList)))
			})
		},
		methods: {
			// 保存数据
			saveData: function() {
				if (!this.nowQuestion.chose) {
					// uni.showToast({
					// 	title: "请先选择当前问题答案！"
					// })
					return
				}
				if (this.pageType == 'add') {

					uni.setStorageSync('questionList', this.nowQuestionList);
					uni.setStorageSync('isCheckQuestion', true);
					uni.navigateTo({
						url: '../share/index',

					});
				} else if (this.pageType == 'answer') {
					let answerList = uni.getStorageSync('questionList')
					let number = 0;
					this.nowQuestionList.forEach((item, index) => {
						console.log(item, answerList[index])
						// if(item.chose==answerList[index].chose){
						// 	number += 1
						// }
					})
					let result = (number / this.nowQuestionList.length).toFixed(2) * 100 + "%";
					let resultList = uni.getStorageSync('resultList') || []
					resultList.push({
						name: '张三',
						img: '',
						score: result
					})
					uni.setStorageSync('resultList', resultList)
					uni.navigateTo({
						url: '../result/index',

					});
				}
			},
			// 上一题
			prveQuestion: function() {
				this.setData({
					nowQuestionIndex: this.nowQuestionIndex - 1
				}, () => {
					this.setData({
						nowQuestion: this.nowQuestionList[this.nowQuestionIndex]
					})
				})

			},
			// 下一题
			nextQuestion: function() {

				if (!this.nowQuestion.chose) {
					// uni.showToast({
					// 	title: "请先选择当前问题答案！"
					// })
					return
				}

				if (this.nowQuestionIndex == 9) return
				this.setData({
					nowQuestionIndex: this.nowQuestionIndex + 1
				}, () => {
					this.setData({
						nowQuestion: this.nowQuestionList[this.nowQuestionIndex]
					})
				})
			},
			/**
			 * 选择答案
			 */
			selected: function(item) {
				// var _this = this;
				this.$set(this.nowQuestion, 'chose', item.id)
				this.nowQuestionList.splice(this.nowQuestionIndex, 1, this.nowQuestion)
				// let data = this.nowQuestion;
				// data.chose = item.id;
				// this.setData({
				// 	nowQuestion
				// })
				// var id = e.currentTarget.dataset.id;
				// var idx = e.currentTarget.dataset.index;
				// var num = _this.num;
				// var subject = _this.subject;
				// var subjectList = _this.subjectList;
				// var mySubject = uni.getStorageSync('mySubject') || [];
				// mySubject.push({
				//   idx: idx,
				//   subject: subject
				// });
				// uni.setStorageSync('mySubject', mySubject);

				// _this.setData({
				//   selectedIdx: idx
				// });

				// setTimeout(function () {
				//   _this.switchFun();
				// }, 500);
				setTimeout(() => {
					this.nextQuestion()
				}, 500)
			},

			/**
			 * 已出题目
			 */
			already: function() {
				if (this.selectedNum <= 1) {
					uni.showToast({
						title: '您还没有出题哦',
						icon: 'none'
					});
					return;
				}

				uni.navigateTo({
					url: '../already/index'
				});
			},

			/**
			 * 更多题库
			 */
			library: function() {
				uni.navigateTo({
					url: '../library/index?num=' + this.num
				});
			},

			/**
			 * 结束出题
			 */
			order: function() {
				var mySubject = uni.getStorageSync('mySubject');
				var len = mySubject.length;

				if (len < 5) {
					uni.showModal({
						title: '提示',
						content: '题目不得少于五题',
						showCancel: false
					});
					return;
				} else if (len >= 5 || len >= this.num) {
					uni.showModal({
						title: '出题完成',
						content: '出题已完成。点击确定后进入红包设置页面,题目不能再更改',
						cancelText: '检查一下',

						success(res) {
							if (res.confirm) {
								var user_id = uni.getStorageSync("users").id;
								app.globalData.util.request({
									url: 'entry/wxapp/HbAddOrder',
									data: {
										user_id: user_id,
										subject: JSON.stringify(mySubject),
										subject_num: len
									},

									success(o) {
										if (o.data != -1) {
											uni.redirectTo({
												url: '../order/index?order_id=' + o.data
											});
										} else {
											uni.showToast({
												title: '网络错误,请重试',
												icon: 'none'
											});
										}
									}

								});
							} else {
								uni.navigateTo({
									url: '../already/index'
								});
							}
						}

					});
				}
			},

			/**
			 * 题目列表
			 */
			getQAList: function() {
				uni.showLoading({
					title: 'loading...'
				});

				var _this = this;

				app.globalData.util.request({
					url: "entry/wxapp/getQAList",
					success: function(res) {
						var subjectLen = res.data.length;

						var subjectIndex = _this.randomNumBoth(0, subjectLen - 1);

						_this.setData({
							subjectLen: subjectLen,
							subjectList: res.data,
							subject: res.data[subjectIndex],
							subjectIndex: subjectIndex
						});

						uni.hideLoading();
					}
				});
			},

			/**
			 * 随机换题
			 */
			switchFun: function() {
				var mySubject = uni.getStorageSync('mySubject');
				var num = this.num;

				if (mySubject.length >= num) {
					this.order();
				} else {
					var subjectIndex = this.randomNumBoth(0, this.subjectLen - 1); //随机生成的题目和当前题一样时重新生成

					if (subjectIndex == this.subjectIndex) {
						this.switchFun();
						return;
					}

					var subject = this.subjectList[subjectIndex]; //随机生成的题如果已选时重新生成

					for (var i = 0; i < mySubject.length; i++) {
						if (mySubject[i].subject.id == subject.id) {
							this.switchFun();
							return;
						}
					}

					this.setData({
						selectedIdx: -1,
						subject: subject,
						subjectIndex: subjectIndex,
						selectedNum: mySubject.length + 1 >= num ? num : mySubject.length + 1
					});
				}
			},

			/**
			 * 生成指定范围的随机数
			 */
			randomNumBoth: function(Min, Max) {
				var Range = Max - Min;
				var Rand = Math.random();
				var num = Min + Math.round(Rand * Range);
				return num;
			}
		}
	};
</script>
<style>
	@import "./index.css";
</style>
