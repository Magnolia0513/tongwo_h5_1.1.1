<template>
<!--pages/demolition/index.wxml-->
<view class="main">
  <image class="bgimg" src="/static/img/share.jpg"></image>
  <image class="avatar common" :src="user.img"></image>
  <view class="nickname common">{{user.name}}</view>
  <view class="hair common">给你发了一个答题红包</view>
  <view class="num common" v-if="show == 1">总金额***元</view>
  <button v-if="hydl == true" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" plain="true" hover-class="none" class="demolition common">查看红包</button>
  <view v-else class="demolition common" @tap="seeRed">查看红包</view>
  <button class="service common" plain="true" hover-class="none" open-type="contact">联系客服</button>
</view>
</template>

<script>
// pages/demolition/index.js
//获取应用实例
const app = getApp();

export default {
  data() {
    return {
      show: 0,
      order_id: "",
      hydl: "",
      user: "",
      order: "",
      answer_success_num: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var order_id = options.order_id || decodeURIComponent(options.scene);
    this.setData({
      order_id: options.order_id
    });
    this.getOrderInfo();
    this.changeData();
  },
  methods: {
    bindGetUserInfo: function (t) {
      "getUserInfo:ok" == t.detail.errMsg && (this.setData({
        hydl: !1
      }), this.changeData(), this.seeRed());
    },
    changeData: function () {
      var _this = this;

      uni.getSetting({
        success: function (t) {
          t.authSetting["scope.userInfo"] ? uni.getUserInfo({
            success: function (t) {
              var openid = uni.getStorageSync('openid') || '';

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
            }
          }) : _this.setData({
            hydl: !0
          });
        }
      });
    },

    /**
     *查看红包 
     */
    seeRed: function () {
      var _this = this;

      var user_id = uni.getStorageSync('users').id;
      var red_user_id = _this.order.user_id; //如果拆包者和发包者为一人,或红包已经全部领取则跳转到红包详情

      if (user_id == red_user_id || _this.answer_success_num == _this.order.red_num) {
        uni.redirectTo({
          url: '../detail/index?order_id=' + _this.order_id
        });
        return;
      }

      app.globalData.util.request({
        url: "entry/wxapp/HbDemolition",
        data: {
          order_id: _this.order_id,
          user_id: user_id
        },

        success(res) {
          if (res.data.isAnswer > 0) {
            //如果该用户已答过则跳转到题目详情
            uni.redirectTo({
              url: '../detail/index?order_id=' + _this.order_id
            });
          } else {
            uni.redirectTo({
              url: '../open/index?order_id=' + _this.order_id
            });
          }
        }

      });
    },

    /**
     * 题目信息
     */
    getOrderInfo: function (e) {
      uni.showLoading({
        title: 'loading...'
      });

      var _this = this;

      var order_id = _this.order_id;
      app.globalData.util.request({
        url: "entry/wxapp/HbGetRedInfo",
        data: {
          order_id: order_id
        },

        success(res) {
          _this.setData({
            show: res.data.show,
            user: res.data.user,
            order: res.data.order,
            answer_success_num: res.data.answer_success_num
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