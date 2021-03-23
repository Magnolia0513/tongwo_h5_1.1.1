<template>
<!--pages/record/index.wxml-->
<view class="main">
	<image class="bgimg" src="/static/img/heart.png"></image>
	<view class="down1">下载“同窝App”</text></view>
	<view class="down2">让我们更亲密，住在一起不吵架</text></view>
	<view class="orange">
		<view class="avator">
			<image :src="img"></image>
		</view>
		<p class='head'>我的亲密度测试排行榜</p>
		<view class="box" >
			<view class="item" v-for="(item,index) in resultList">
				<image class="avatar" src="../../static/img/excited.png" mode=""></image>
				<view class="content">
					<view class="left">
						<view >
							{{item.name}}
						</view>
						<view class="desc" v-if="item.score=='100%'">太了解你了，像家人一样</view>
						<view class="desc" v-if="item.score=='90%'">一生挚友，半生相随</view>
						<view class="desc" v-if="item.score=='80%'">想跟你一起去旅游</view>
						<view class="desc" v-if="item.score=='70%'">有时间多打电话问候一下</view>
						<view class="desc" v-if="item.score=='60%'">革命友谊刚刚及格</view>
						<view class="desc" v-if="item.score=='50%'">就差一道题就及格啦</view>
						<view class="desc" v-if="item.score=='40%'">一定是手误选错了</view>
						<view class="desc" v-if="item.score=='30%'">点赞之交是咱俩最深的交情</view>
						<view class="desc" v-if="item.score=='20%'">大概是擦肩而过的陌生人吧</view>
						<view class="desc" v-if="item.score=='10%'">总算摸对了一道题，不容易啊</view>
						<view class="desc" v-if="item.score=='0%'">太磕碜了，就算是陌生人也能猜对一道题吧</view>
						
					</view>
					<view class="right">
						{{item.score}}
					</view>
				</view>
			</view>
		</view>
	</view>
	<view class="btn-box">
		<view class="lssue-button1" @tap="shareClick">分享</view>
		<view class="lssue-button1 lssue-button2" @tap="goTakeQuestion">我要出题</view>
		
	</view>
	<view class="share-modal" @tap="closeShareModal" v-if="showShareModal">
		请点击右上角...分享
	</view>
</view>
</template>

<script>
const app = getApp();

export default {
  data() {
    return {
      resultList:[],
	  showShareModal: false
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      resultList: uni.getStorageSync('resultList')
    });
  },
onBackPress: function(e) {
			console.log(e)
			uni.navigateTo({
				url: "../index/index"
			})
			return true
		},
  methods: {
    
    goTakeQuestion: function() {
    	uni.removeStorageSync('questionList'); //清空已选题目缓存
    
    	uni.navigateTo({
    		url: '../lssue/index?type=add',
    		
    	});
    },
	shareClick: function() {
		this.setData({
			showShareModal: true,
		})
	},
	closeShareModal: function() {
		this.setData({
			showShareModal: false,
		})
	}
  }
};
</script>
<style>
@import "./index.css";
</style>