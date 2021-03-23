<template>
	<!--index.wxml-->
	<view class="main">
		<image class="bgimg" src="/static/img/heart.png"></image>
		<view class="down1">下载“同窝App”</text></view>
		<view class="down2">让我们更亲密，住在一起不吵架</text></view>
		<view class="orange">
			<view class="avator">
				<image :src="img"></image>
			</view>
			<!-- <view class="username">嗨!<text>{{name}}</text></view>
  <view class="introduction">{{notice}}</view> -->
			<!-- <view class="subject">
    <view>题目数量</view>
    <view>{{num}}题</view>
  </view>
  <view class="choice">
    <view>5</view>
    <view class="slider-center">
      <slider min="5" max="10" backgroundColor="#dba857" activeColor="#b8721d" block-size="24" block-color="#d95940" @change="sliderChange"></slider>
    </view>
    <view>10</view>
  </view> -->
			<view class="intro1">亲密度测试排行榜</text></view>
			<view class="intro2">测一测你们有多亲密吧?</text></view>
			<view class="down3">下载“同窝App”</text></view>
			<view class="down4">高效安排统计家务</text></view>
			<view class="down5">管理家庭日程规划</text></view>
			<view class="down6">海量家庭小游戏/话题</text></view>
			<view class="lssue topBtn" v-if="isCheckQuestion">
				<!-- button class="lssue-button1" size="mini" v-if="hydl == true" open-type="getUserInfo"
					@getuserinfo="bindGetUserInfo">去出题</button> -->
				<block>
					<view v-if="isShare" class="lssue-button2" @tap="goAnswerQuestion">去答题</view>
					<view v-else class="lssue-button1" @tap="goTakeQuestion">我要出题</view>
				</block>
			</view>
			<view class="lssue">
				<!-- button class="lssue-button1" size="mini" v-if="hydl == true" open-type="getUserInfo"
					@getuserinfo="bindGetUserInfo">去出题</button> -->
				<block>
					<view v-if="isShare" class="lssue-button1" @tap="goTakeQuestion">我要出题</view>
					<view v-else class="lssue-button2" @tap="goAnswerQuestion">去答题</view>

				</block>
			</view>
			<!-- <view class="lssue">
				<button class="lssue-button2" size="mini" v-if="hydl == true" open-type="getUserInfo"
					@getuserinfo="bindGetUserInfo">去出题</button>
				<block v-else>
					<view class="lssue-button2" @tap="lssue">分享</view>
				</block>
			</view> -->
			<image class="bgimg2" src="/static/img/excited.png"></image>
			<image class="bgimg3" src="/static/img/image1.png"></image>
		</view>
	</view>
</template>

<script>
	//index.js
	const app = getApp();

	export default {
		data() {
			return {
				num: 5,
				notice: '',
				name: "",
				img: "",
				hydl: "",
				isCheckQuestion: false,
				isShare: false,

			};
		},

		components: {},
		props: {},
		onShow: function() {
			var users = uni.getStorageSync('users');

			if (users.name && users.img) {
				this.setData({
					name: users.name,
					img: users.img
				});
			}
		},
		onLoad: function(data) {
			//从storage里面取数据
			// const oldData = uni.getStorageSync('questionList')

			// if (oldData) {
			// 	this.questionList = oldData
			// } else {
			// 	uni.setStorageSync('questionList', this.questionList)
			// }
			// this.getNotice();
			// this.changeData();
			this.setData({
				isCheckQuestion: uni.getStorageSync('isCheckQuestion')
			})
			if (data.share) this.isShare = data.share
		},
		onBackPress: function(e) {
			return true
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			/**
			 * 选择答题数量
			 */
			sliderChange: function(e) {
				this.setData({
					num: e.detail.value
				});
			},
			bindGetUserInfo: function(t) {
				"getUserInfo:ok" == t.detail.errMsg && (this.setData({
					hydl: !1
				}), this.changeData());
			},
			changeData: function() {
				var _this = this;

				uni.getSetting({
					success: function(t) {
						t.authSetting["scope.userInfo"] ? uni.getUserInfo({
							success: function(t) {
								var openid = uni.getStorageSync('openid') || '';

								if (openid != '' && openid != undefined && openid !=
									'undefined') {
									app.globalData.util.request({
										url: "entry/wxapp/login",
										cachetime: "0",
										data: {
											openid: openid,
											img: t.userInfo.avatarUrl,
											name: t.userInfo.nickName,
											gender: t.userInfo.gender
										},
										header: {
											"content-type": "application/json"
										},
										dataType: "json",
										success: function(t) {
											uni.setStorageSync("users", t.data);
										}
									});
								}

								_this.setData({
									img: t.userInfo.avatarUrl,
									name: t.userInfo.nickName
								});
							}
						}) : _this.setData({
							hydl: !0
						});
					}
				});
			},

			/**
			 * 系统通知
			 */
			getNotice: function() {
				var _this = this;

				app.globalData.util.request({
					url: "entry/wxapp/notice",
					success: function(res) {
						_this.setData({
							notice: res.data
						});
					}
				});
			},

			/**
			 * 出题
			 */
			goTakeQuestion: function() {
				uni.removeStorageSync('questionList'); //清空已选题目缓存

				uni.navigateTo({
					url: '../lssue/index?type=add',

				});
			},
			// 去答题
			goAnswerQuestion: function() {
				let url
				this.isShare ? url = '../lssue/index?type=answer&share=' + this.isShare : url =
					'../lssue/index?type=answer'
				uni.navigateTo({
					// url: '../lssue/index?type=answer',
					url: url

				});
			}
		}
	};
</script>
<style>
	@import "./index.css";
</style>
