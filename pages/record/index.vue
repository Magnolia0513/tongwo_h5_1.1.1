<template>
<!--pages/record/index.wxml-->
<view class="main">
  <view class="head">
    <view @tap="selectLabel" data-idx="0" :class="'title ' + (selectedIdx == 0 ? 'selected' : 'default')">我发出的</view>
    <view @tap="selectLabel" data-idx="1" :class="'title ' + (selectedIdx == 1 ? 'selected' : 'default')">我答过的</view>
  </view>
  <view class="avatar">
    <image :src="users.img"></image>
  </view>
  <view class="nickname"><text>{{users.name}}</text>\t<text v-if="show == 1">{{selectedIdx == 0 ? '共发出' : '共收到'}}</text></view>
  <view class="moneynum" v-if="show == 1">
    <view class="money">
      <view class="moenynumcolor">金额\t(元)</view>
      <view class="bottom">{{total_amount}}</view>
    </view>
    <view class="num">
      <view class="moenynumcolor">数量\t(个)</view>
      <view class="bottom">{{count}}</view>
    </view>
  </view>
  <!--列表-->
  <view class="list">
    <!--我发出的-->
    <block v-if="selectedIdx == 0">
    <view v-for="(item, index) in recordList" :key="index" class="line" @tap="detail" :data-id="item.id">
      <view class="top">
        <view>答题红包-答对{{item.red_count}}题<text v-if="show == 1">可抢</text></view>
        <view style="flex:1;"></view>
        <view v-if="show == 1"><text class="color-red">{{item.red_amount}}</text>\t元</view>
      </view>
      <view class="lower">
        <view class="color-gray">{{item.creat_time}}</view>
        <view style="flex:1;"></view>
        <view><text class="color-blue">领取中</text>\t<text class="color-gray">{{item.receive}}/{{item.red_num}}</text></view>
      </view>
    </view>
    </block>
    <!--我答过得-->
    <block v-else>
      <view v-for="(item, index) in recordList" :key="index" class="line answer" :data-id="item.order_id" @tap="detail">
        <image :src="item.img"></image>
        <view class="answer-center">
          <view>答题红包-来自{{item.name}}</view>
          <view class="color-gray">{{item.complete_time}}</view>
        </view>
        <view class="color-red" v-if="item.answer_status == 0">失败</view>
        <view class="color-blue" v-else-if="item.answer_status == 1 && show == 0">成功</view>
        <view v-else-if="item.answer_status == 1 && show == 1"><text class="color-blue">{{item.success_amount}}</text>\t元</view>
      </view>
    </block>
  </view>
</view>
</template>

<script>
const app = getApp();

export default {
  data() {
    return {
      show: 0,
      selectedIdx: 0,
      page: 1,
      hasMoreData: true,
      recordList: [],
      users: "",
      count: "",
      total_amount: ""
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
      users: users
    });
    this.getRecord();
  },

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    if (this.hasMoreData) {
      this.getRecord();
    }
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
          recordList: [],
          selectedIdx: idx
        });
        this.getRecord();
      }
    },

    /**
     * 详情
     */
    detail: function (e) {
      uni.navigateTo({
        url: '../detail/index?order_id=' + e.currentTarget.dataset.id
      });
    },

    /**
     * 获取红包记录
     */
    getRecord: function () {
      uni.showLoading({
        title: 'loading...'
      });

      var _this = this;

      var user_id = uni.getStorageSync("users").id;
      var type = _this.selectedIdx == 0 ? 0 : 1; //0发出1答过

      var page = _this.page;
      app.globalData.util.request({
        url: "entry/wxapp/GetRecord",
        data: {
          user_id: user_id,
          type: type,
          page: page
        },
        success: function (res) {
          if (res.data.error != -1) {
            var recordListTem = _this.recordList;

            if (_this.page == 1) {
              recordListTem = [];
            }

            var recordList = res.data.list;

            if (_this.page >= res.data.pageCount) {
              _this.setData({
                recordList: recordListTem.concat(recordList),
                hasMoreData: false
              });
            } else {
              _this.setData({
                recordList: recordListTem.concat(recordList),
                hasMoreData: true,
                page: _this.page + 1
              });
            }

            _this.setData({
              show: res.data.show,
              count: res.data.count,
              total_amount: res.data.total_amount
            });
          } else {
            uni.showToast({
              title: res.data.message,
              icon: 'none'
            });
          }

          uni.hideLoading();
        }
      });
    }
  }
};
</script>
<style>
@import "./index.css";
</style>