<template>
<!--logs.wxml-->
<view class="main">
  <view class="head">
    <view class="avatar">
      <image :src="img"></image>
    </view>
    <view class="username">{{name}}</view>
  </view>
  <view class="content">
    <view class="wallet" @tap="cash" v-if="show == 1">
      <image src="/static/img/wallet.png"></image>
      <view class="wallet-center">钱包</view>
      <view><text class="money">{{money}}</text>\t元</view>
    </view>
    <view class="wallet" @tap="record">
      <image src="/static/img/jilu.png"></image>
      <view class="wallet-center">我的记录</view>
    </view>
    <view class="wallet margin-none" @tap="problem">
      <image src="/static/img/problem.png"></image>
      <view class="wallet-center">常见问题</view>
    </view>
    <view class="wallet last">
      <image src="/static/img/service.png"></image>
      <button class="wallet-center service" open-type="contact" plain="true" hover-class="none">联系客服</button>
    </view>
  </view>
  <view class="authbg" v-if="hydl == true">
    <view class="auth">
      <view class="auth-title">授权提示</view>
      <view class="auth-content">
        <view class="auth-detail">
        由于收发答题红包需要获取你的头像和昵称,请点击下方按钮进行授权
        </view>
        <button class="auth-button" size="mini" type="primary" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">确认授权</button>
      </view>
        <button class="auth-service" open-type="contact" plain="true" hover-class="none">联系客服</button>
    </view>
  </view>
</view>
</template>

<script>
//logs.js
const app = getApp();

export default {
  data() {
    return {
      money: 0.00,
      show: 0,
      name: "",
      img: "",
      hydl: ""
    };
  },

  components: {},
  props: {},
  onShow: function () {
    var users = uni.getStorageSync('users');

    if (users.name && users.img) {
      this.setData({
        name: users.name,
        img: users.img
      });
    }

    this.getUserInfo();
  },
  onLoad: function () {
    this.changeData();
  },
  methods: {
    /**
     * 钱包
     */
    cash: function () {
      uni.navigateTo({
        url: '../cash/index'
      });
    },

    /**
     * 我的记录
     */
    record: function () {
      uni.navigateTo({
        url: '../record/index'
      });
    },

    /**
     * 常见问题
     */
    problem: function () {
      uni.navigateTo({
        url: '../problem/index'
      });
    },
    bindGetUserInfo: function (t) {
      "getUserInfo:ok" == t.detail.errMsg && (this.setData({
        hydl: !1
      }), this.changeData());
    },

    /**
     * 授权
     */
    changeData: function () {
      var _this = this;

      uni.getSetting({
        success: function (t) {
          t.authSetting["scope.userInfo"] ? uni.getUserInfo({
            success: function (t) {
              var openid = uni.getStorageSync('openid');

              if (openid != '' && openid != undefined && openid != 'undefined') {
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
                  success: function (t) {
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
     * 账户余额
     */
    getUserInfo: function () {
      var user_id = uni.getStorageSync("users").id;

      var _this = this;

      app.globalData.util.request({
        url: "entry/wxapp/UserInfo",
        data: {
          user_id: user_id
        },
        success: function (res) {
          _this.setData({
            money: res.data.wallet,
            show: res.data.show
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