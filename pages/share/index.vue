<template>
	<view>
		<!--pages/share/index.wxml-->
		<image :src="img" class="img" @tap="save" mode="widthFix"></image>
		<view class="text">点击分享图保存到手机相册<text class="reload" space="nbsp" @tap="reload"> 刷新分享图</text></view>
		<view class="save" @tap="shareClick">
			分享
		</view>
		<view class="save" @tap="back">
			返回
		</view>
		<view class="share-modal" @tap="closeShareModal" v-if="showShareModal">
			<view class="sharewdesc">请点击右上角分享</text></view>
		</view>
	</view>
</template>

<script>
	// pages/share/index.js
	const app = getApp();

	export default {
		data() {
			return {
				order_id: "",
				img: "",
				showShareModal: false
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			// this.setData({
			//   order_id: options.order_id
			// });
			// this.getCodeImg();
		},
		onBackPress: function(e) {
			console.log(e)
			uni.navigateTo({
				url: "../index/index"
			})
			return true
		},
		methods: {
			shareClick: function() {
				this.setData({
					showShareModal: true,
				})
			},
			closeShareModal: function() {
				this.setData({
					showShareModal: false,
				})
			},
			/**
			 * 获取分享图片
			 */
			getCodeImg: function() {
				uni.showLoading({
					title: 'loading...'
				});

				var _this = this;

				var order_id = _this.order_id;
				app.globalData.util.request({
					url: "entry/wxapp/MyCode",
					data: {
						order_id: order_id
					},

					success(res) {
						_this.setData({
							img: res.data
						});

						uni.hideLoading();
					}

				});
			},

			/**
			 * 预览图片
			 */
			save: function() {
				uni.previewImage({
					urls: [this.img]
				});
			},

			/**
			 * 刷新图片
			 */
			reload: function() {
				this.getCodeImg();
			},

			/**
			 * 返回
			 */
			back: function() {
				uni.navigateTo({
					url: '../index/index',
				});
			}
		}
	};
</script>
<style>
	@import "./index.css";
</style>
