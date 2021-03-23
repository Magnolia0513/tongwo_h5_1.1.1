<template>
<!--pages/already/index.wxml-->
<view class="main"><!--真机需要更换为网络图片-->
  <view class="content">
    <view v-for="(item, index) in subject" :key="index" class="subject">
      <view class="problem">{{index+1}}\t{{item.subject.question}}</view>
      <view v-for="(optionsitem, index2) in item.subject.options" :key="index2" :class="'answer ' + (index == item.idx ? 'selected' : '')" @tap="selected" :data-index="index" :data-id="item.subject.id">{{optionsitem}}</view>
    </view>
  </view>
  <view class="confirm" @tap="confirm">确定</view>
  <view class="authbg" v-if="show == 1 && zf == 1" catchtouchmove="preventTouchMove" @tap="cancelpay">
    <view class="pay-auth">
      <view class="auth-title">拆包提示</view>
      <view class="auth-content">
        <view class="auth-detail">
        红包金额<text class="color-red">{{order.answer_money}}</text>元,
        答对<text class="color-red">{{order.red_count}}</text>题即可领取,
        拆包需支付红包金额的<text class="color-red">{{order.red_consume}}%</text>押金,
        答题成功,即可获得押金和红包奖励(共<text class="color-red">{{order.answer_money+order.amount}}</text>元),答题失败押金归出题方所有
        </view>
        <view class="auth-button bg-red" @tap="answerOrder">拆开红包</view>
        <view class="auth-button" @tap="sendRed">去发红包</view>
      </view>
    </view>
  </view>
</view>
</template>

<script>
// pages/already/index.js
const app = getApp();

export default {
  data() {
    return {
      selectedIdx: -1,
      over: 0,
      show: 0,
      zf: 0,
      users: "",
      user_id: "",
      order_id: "",
      subject: "",
      order: ""
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
      user_id: users.id,
      order_id: options.order_id
    });
    this.getAnswer();
  },
  methods: {
    /**
     * 选择答案
     */
    selected: function (e) {
      var idx = e.currentTarget.dataset.index;
      var id = e.currentTarget.dataset.id;
      var subject = this.subject;

      for (var i = 0; i < subject.length; i++) {
        if (subject[i].subject.id == id) {
          subject[i].idx = idx;
        }
      }

      this.setData({
        subject: subject
      });
    },

    /**
     * 保存修改
     */
    confirm: function () {
      var subject = this.subject;

      for (var i = 0, j = 1; i < subject.length; i++, j++) {
        if (subject[i].idx == -1) {
          uni.showToast({
            title: '请选择第' + j + '题答案',
            icon: 'none',
            mask: true
          });
          return;
        }
      }

      this.setData({
        zf: 1
      });
      /*
      wx.showLoading({
        title: 'loading...',
        mask: true
      })
      app.util.request({
        url: 'entry/wxapp/HbVerifyAnswer',
        data: {
          order_id: order_id,
          user_id: user_id,
          subject: JSON.stringify(subject)
        },
        success(res){
          var answer = res.data
          console.log(answer)
          _this.setData({
            answer: answer,
            over: 1
          })
          wx.hideLoading()
        }
      })
      */
    },

    /**
     * 获取问题
     */
    getAnswer: function () {
      var _this = this;

      var order_id = _this.order_id;
      app.globalData.util.request({
        url: 'entry/wxapp/getHbAnswer',
        data: {
          order_id: order_id
        },

        success(res) {
          _this.setData({
            subject: res.data.subject,
            show: res.data.show,
            order: res.data.order
          });
        }

      });
    },

    /**
    * 拆开红包
    */
    answerOrder: function () {
      uni.showToast({
        title: 'loading...',
        icon: 'none',
        mask: true
      });

      var _this = this;

      var order_id = _this.order_id;
      var user_id = _this.user_id;
      var subject = _this.subject;
      var amount = _this.order.amount; //押金

      app.globalData.util.request({
        url: "entry/wxapp/AnswerOrder2",
        data: {
          order_id: order_id,
          user_id: user_id,
          amount: amount,
          subject: JSON.stringify(subject)
        },

        success(res) {
          if (res.data.error != -1) {
            uni.requestPayment({
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: res.data.signType,
              paySign: res.data.paySign,
              success: function (t) {
                uni.showToast({
                  title: '支付成功',
                  mask: true
                });
                setTimeout(function () {
                  uni.redirectTo({
                    url: '../detail/index?order_id=' + order_id + '&open=1'
                  });
                }, 1000);
              },
              fail: function () {
                uni.showToast({
                  title: '取消支付',
                  icon: 'none'
                });
              }
            });
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
      * 去发红包
    */
    sendRed: function () {
      uni.switchTab({
        url: '../index/index'
      });
    },
    cancelpay: function () {
      this.setData({
        zf: 0
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