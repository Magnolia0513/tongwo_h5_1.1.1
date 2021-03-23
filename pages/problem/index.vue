<template>
<!--pages/problem/index.wxml-->
<view class="main">
  <view v-for="(item, index) in list" :key="index" class>
    <view :class="'problem ' + (selectindex == index ? 'color' : '')" @tap="selected" :data-index="index">
      <view>{{item.problem}}</view>
      <view style="flex:1;"></view>
      <image src="/static/img/move.png"></image>
    </view>
    <view v-if="selectindex == index" class="answer">{{item.answer}}</view>
  </view>
  <button type="primary" open-type="contact" class="service">联系在线客服</button>
  <view class="version">v1.0.0</view>
</view>
</template>

<script>
// pages/problem/index.js
const app = getApp();

export default {
  data() {
    return {
      list: [],
      selectindex: -1
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    this.getProblem();
  },
  methods: {
    /**
     * 选择问题
     */
    selected: function (e) {
      var index = e.currentTarget.dataset.index;
      var selectindex = this.selectindex;

      if (selectindex == index) {
        this.setData({
          selectindex: -1
        });
      } else {
        this.setData({
          selectindex: index
        });
      }
    },

    /**
     * 问题列表
     */
    getProblem: function () {
      var _this = this;

      app.globalData.util.request({
        url: 'entry/wxapp/problem',
        header: {
          "content-type": "application/json"
        },
        dataType: "json",

        success(res) {
          _this.setData({
            list: res.data
          });
        }

      });
    }
  }
};
</script>
<style>
@import "./index.css";
</style>