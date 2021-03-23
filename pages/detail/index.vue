<template>
<!--pages/detail/index.wxml-->
<view class="main">
  <!--顶部-->
  <view class="head">
    <view class="avatar">
      <image :src="orderInfo.img"></image>
    </view>
    <view class="nickname">{{orderInfo.name}}的答题红包</view>
    <block v-if="orderInfo.user_id == users.id">
      <view class="nickname subject-num" v-if="orderInfo.over == 0">共{{orderInfo.red_num}}个红包,答对{{orderInfo.red_count}}题可抢</view>
      <view class="nickname subject-num" v-if="orderInfo.over == 1">红包已经被抢光啦</view>
      <button class="invitation" open-type="share">邀请好友来答题</button>
      <view class="head-lower">
        <view class="show" @tap="answer" :style="show == 1 ? '' : 'margin:0 auto'">
          <image src="/static/img/show.png"></image>
          <view>查看答案</view>
        </view>
        <view class="share" @tap="share" v-if="show == 1">
          <image src="/static/img/share.png"></image>
          <view>生成分享图</view>
        </view>
      </view>
    </block>
    <block v-else>
      <view class="nickname subject-num" v-if="orderInfo.answer.answer_status == 0">很遗憾你还不够了解Ta</view>
      <view class="nickname subject-num" v-else-if="orderInfo.answer.answer_status == 1"><text v-if="show == 1">恭喜您抢到{{orderInfo.answer.success_amount}}元</text><text v-else>恭喜你答题抢包成功</text></view>
      <view class="nickname subject-num" v-else>红包已经被抢光啦</view>
    </block>
  </view>
  <!--总数-->
  <view class="count">已领取{{orderInfo.success_num}}/{{orderInfo.red_num}}个<text v-if="show == 1">,共{{orderInfo.success_amount}}/{{orderInfo.red_amount}}元</text></view>
  <!--选项卡-->
  <view class="nav">
    <view @tap="selectLabel" data-idx="0" :class="'title ' + (selectedIdx == 0 ? 'selected' : 'default')">成功({{orderInfo.success_num}})</view>
    <view @tap="selectLabel" data-idx="1" :class="'title ' + (selectedIdx == 1 ? 'selected' : 'default')">失败({{orderInfo.fail_num}})</view>
  </view>
  <!--列表-->
  <view class="list">
      <block v-if="selectedIdx == 0">
        <view v-for="(item, index) in answerList" :key="index" class="line" v-if="answerList.length > 0">
          <image :src="item.img"></image>
          <view class="right">
            <view class="top">
              <view>{{item.name}}</view>
              <view class="center"><image :src="item.gender > 0 ? (item.gender == 1 ? '/img/man.png' : '/img/girl.png') : ''"></image></view>
              <view v-if="show == 1"><text class="color-red">{{item.success_amount}}</text>\t元</view>
            </view>
            <view class="foot">
              <view class="color-gray">熟悉度{{item.know}}%</view>
              <view class="center"></view>
              <view class="color-gray">{{item.complete_time}}</view>
            </view>
          </view>
        </view>
      </block>
      <block v-else>
        <view v-for="(item, index) in answerList" :key="index" class="line" v-if="answerList.length > 0">
          <image :src="item.img"></image>
          <view class="right">
            <view class="top">
              <view>{{item.name}}</view>
              <view class="center"><image :src="item.gender == 1 ? '/img/man.png' : '/img/girl.png'"></image></view>
              <view class="color-gray">{{item.complete_time}}</view>
            </view>
            <view class="foot">
              <view class="color-gray">熟悉度{{item.know}}%</view>
            </view>
          </view>
        </view>
      </block>
  </view>
  <view class="suspension-button">
    <view class="button-left" @tap="send">
      <image src="/static/img/hbselected.png"></image>
      <view>发答题红包</view>
    </view>
    <button class="but" hover-class="none" open-type="share">
      <image src="/static/img/forward.png"></image>
      <view>发送给好友</view>
    </button>
  </view>
  <view class="authbg" catchtouchmove="preventTouchMove" v-if="open == 1" @tap="cancelpay">
    <view class="auth">
      <image :src="users.img" class="auth-avatar"></image>
      <view class="name">{{users.name}}</view>
      <block v-if="orderInfo.answer.answer_status == 1">
        <view class="name">恭喜你答对了{{orderInfo.answer.success_num}}题</view>
        <view class="money" v-if="show == 1"><text>{{orderInfo.answer.success_amount}}</text>\t元</view>
      </block>
      <view v-else class="fail">很遗憾,你还不够了解Ta</view>
      <view class="send" @tap="send">我也要发答题红包\t></view>
    </view>
  </view>
</view>
</template>

<script>
// pages/detail/index.js
const app = getApp();

export default {
  data() {
    return {
      page: 1,
      hasMoreData: true,
      answerList: [],
      selectedIdx: 0,
      show: 0,
      users: "",
      order_id: "",
      open: "",
      orderInfo: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var users = uni.getStorageSync('users');
    this.setData({
      users: users,
      order_id: options.order_id,
      open: options.open || 0
    });
    this.getOrderDetai();
    this.getOrderAnserList();
  },

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    if (this.hasMoreData) {
      this.getOrderAnserList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '恭喜发财,大吉大利',
      path: '/pages/demolition/index?order_id=' + this.order_id
    };
  },
  methods: {
    /**
     * 切换选项卡
     */
    selectLabel: function (e) {
      var idx = e.currentTarget.dataset.idx;
      var selectedIdx = this.selectedIdx;

      if (idx != selectedIdx) {
        this.setData({
          page: 1,
          answerList: [],
          selectedIdx: idx
        });
        this.getOrderAnserList();
      }
    },

    /**
     * 查看答案(回答)
     */
    answer: function () {
      uni.navigateTo({
        url: '../answer/index?order_id=' + this.order_id
      });
    },

    /**
     * 发答题红包
     */
    send: function () {
      uni.switchTab({
        url: '../index/index'
      });
    },

    /**
     * 题目详情
     */
    getOrderDetai: function () {
      uni.showLoading({
        title: 'loading....'
      });

      var _this = this;

      var order_id = _this.order_id;
      var user_id = _this.users.id;
      app.globalData.util.request({
        url: "entry/wxapp/GetOrderDetail",
        data: {
          order_id: order_id,
          user_id: user_id
        },

        success(res) {
          _this.setData({
            orderInfo: res.data,
            show: res.data.show
          });

          uni.hideLoading();
        }

      });
    },

    /**
     * 答题列表
     */
    getOrderAnserList: function () {
      uni.showLoading({
        title: 'loading...'
      });

      var _this = this;

      var order_id = _this.order_id;
      var type = _this.selectedIdx == 0 ? 0 : 1; //0成功1失败

      var page = _this.page;
      app.globalData.util.request({
        url: "entry/wxapp/GetOrderAnswerList",
        data: {
          order_id: order_id,
          type: type,
          page: page
        },

        success(res) {
          var answerListTem = _this.answerList;

          if (_this.page == 1) {
            answerListTem = [];
          }

          var answerList = res.data.list;

          if (_this.page >= res.data.pageCount) {
            _this.setData({
              answerList: answerListTem.concat(answerList),
              hasMoreData: false
            });
          } else {
            _this.setData({
              answerList: answerListTem.concat(answerList),
              hasMoreData: true,
              page: _this.page + 1
            });
          }

          uni.hideLoading();
        }

      });
    },

    /**
     * 生成分享图
     */
    share: function () {
      uni.navigateTo({
        url: '../share/index?order_id=' + this.order_id
      });
    },

    /**
     * 清除弹框
     */
    cancelpay: function () {
      this.setData({
        open: 0
      });
    },

    /**
    * 遮罩防止页面滚动
    */
    preventTouchMove() {}

  }
};
</script>
<style>
@import "./index.css";
</style>