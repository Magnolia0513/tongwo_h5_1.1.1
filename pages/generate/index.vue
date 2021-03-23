<template>
<!--pages/generate/index.wxml-->
<view class="main">
  <image class="bgimg" src="/static/img/generatebg.jpg"></image>
  <view class="generate">你生成了一个答题红包</view>
  <button open-type="share" class="share send" hover-class="none">
    <image src="/static/img/forward.png"></image>
    <view>发送给好友</view>
  </button>
  <image class="send" src="/static/img/generate-share.jpg"></image>
  <image class="send detail" @tap="detail" src="/static/img/generate-detail.jpg"></image>
</view>
</template>

<script>

export default {
  data() {
    return {
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
  },
  methods: {
    /**
     * 红包详情
     */
    detail: function () {
      uni.navigateTo({
        url: '../detail/index?order_id=' + this.order_id
      });
    },

    /**
     * 拆包
     */
    demolition: function () {
      uni.navigateTo({
        url: '../demolition/index'
      });
    }
  }
};
</script>
<style>
@import "./index.css";
</style>