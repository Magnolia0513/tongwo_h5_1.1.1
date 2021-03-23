<template>
<!--pages/cash/index.wxml-->
<view class="main">
  <button class="service" plain="true" hover-class="none" open-type="contact">联系客服</button>
  <form @submit="formSubmit">
  <view class="content">
    <view class="balance">
      <view>账户余额</view>
      <view class="money"><text class="num">{{money}}</text>\t<text class="yuan">元</text></view>
    </view>
    <view class="waring" :style="show == false ? 'visibility:hidden;' : ''">{{waring}}</view>
    <view class="cash-withdrawal-amount">提现金额</view>
    <view class="input-money">
      <view class="symbol">¥</view>
      <input name="cash" maxlength="7" type="digit" @input="bindKeyInput" :value="cash"></input>
    </view>
    <view class="withdrawals">提现到微信钱包,\t<text class="all" @tap="allCash">全部提现</text></view>
    <button type="primary" class="cash-withdraw" form-type="submit">提现</button>
    <view class="remind">{{notice}}</view>
  </view>
  </form>
  <view class="jzwb">
      <view class="hx"></view>
      <view class="wz">您还可以参加以下活动</view>
      <view class="hx"></view>
  </view>
  <image :src="ggw" class="ggw" @tap="wkzc"></image>
  <view class="problem" @tap="problem">常见问题</view>
</view>
</template>

<script>
// pages/cash/index.js
const app = getApp();

export default {
  data() {
    return {
      money: 0.00,
      //账户余额
      account: 1,
      //提现金额限制
      show: false,
      waring: '',
      //提示
      cash: '',
      notice: '',
      ggw: "",
      user_id: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
  },
  methods: {
    /**
     * 常见问题
     */
    problem: function () {
      uni.navigateTo({
        url: '../problem/index'
      });
    },

    /**
    * 余额
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
            account: res.data.account,
            ggw: res.data.ggw,
            notice: res.data.notice,
            user_id: user_id
          });
        }
      });
    },

    /**
     * 提现
     */
    formSubmit: function (e) {
      var _this = this;

      var cash = parseFloat(e.detail.value.cash) || 0;
      var account = parseFloat(_this.account);
      var money = parseFloat(_this.money);
      var user_id = _this.user_id;

      if (cash > money) {
        _this.setData({
          show: true,
          waring: '提现金额超过账户余额'
        });

        setTimeout(function () {
          _this.setData({
            show: false
          });
        }, 3000);
        return;
      }

      if (cash < account) {
        _this.setData({
          show: true,
          waring: '提现金额不能低于' + account + '元'
        });

        setTimeout(function () {
          _this.setData({
            show: false
          });
        }, 3000);
        return;
      }

      app.globalData.util.request({
        url: "entry/wxapp/HbWithdraw",
        data: {
          cash: cash,
          user_id: user_id
        },

        success(res) {
          if (res.data.error != -1) {
            uni.showToast({
              title: '申请成功'
            });
            setTimeout(function () {
              _this.getUserInfo();
            }, 1000);
          } else {
            uni.showToast({
              title: res.data.message,
              icon: 'none'
            });
          }
        }

      });
    },

    /**
     * 全部提现
     */
    allCash: function () {
      this.setData({
        cash: this.money
      });
    },

    /**
     * 判断输入金额
     */
    bindKeyInput: function (e) {
      var _this = this;

      var balance = parseFloat(e.detail.value);
      var account = parseFloat(_this.account);
      var money = parseFloat(_this.money);

      if (balance > money) {
        _this.setData({
          show: true,
          waring: '提现金额超过账户余额'
        });

        setTimeout(function () {
          _this.setData({
            show: false
          });
        }, 3000);
        return;
      }

      if (balance < account) {
        _this.setData({
          show: true,
          waring: '提现金额不能低于' + account + '元'
        });

        setTimeout(function () {
          _this.setData({
            show: false
          });
        }, 3000);
        return;
      }
    },

    /**
     * 跳转众筹
     */
    wkzc: function () {
      uni.navigateToMiniProgram({
        appId: 'wx2c2d379a1806d40f'
      });
    }
  }
};
</script>
<style>
@import "./index.css";
</style>