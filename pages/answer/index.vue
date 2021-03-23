<template>
<!--pages/answer/index.wxml-->
<view class="main">
  <view class="list">
    <view v-for="(item, index) in list" :key="index" class="topic">
      <view class="problem">{{index+1}}.{{item.question}}</view>
      <view class="answer">正确答案:<text>{{item.options}}</text></view>
    </view>
  </view>
  <view class="back" @tap="back">返回</view>
</view>
</template>

<script>
// pages/answer/index.js
const app = getApp();

export default {
  data() {
    return {
      list: [],
      order_id: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_id: options.order_id
    });
    this.getProblem();
  },
  methods: {
    /**
     * 返回
     */
    back: function () {
      uni.navigateBack({
        delta: 1
      });
    },

    /**
     * 获取问题
     */
    getProblem: function () {
      uni.showLoading({
        title: 'loading...'
      });

      var _this = this;

      var order_id = _this.order_id;
      app.globalData.util.request({
        url: 'entry/wxapp/GetProblem',
        data: {
          order_id: order_id
        },

        success(res) {
          _this.setData({
            list: res.data
          });

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