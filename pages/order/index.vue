<template>
<!--pages/order/index.wxml-->
<view class="main">
  <image class="bgimg" src="/static/img/orderbg.jpg"></image>
  <view class="content">
    <view class="waring" :style="noticeShow == false ? 'visibility:hidden;' : ''">{{waring}}</view>
    <view class="money" :style="show != 1 ? 'visibility:hidden;' : ''">
      <view>红包金额</view>
      <view class="center">
        <input placeholder="填写红包总金额" type="digit" maxlength="7" placeholder-class="input-placeholder" @input="bindRedAmount"></input>
      </view>
      <view>元</view>
    </view>
    <view class="money">
      <view>红包个数</view>
      <view class="center">
        <input placeholder="填写红包个数" type="number" maxlength="3" placeholder-class="input-placeholder" @input="bindRedNum"></input>
      </view>
      <view>个</view>
    </view>
    <view class="money">
      <view>至少答对<text class="count">(共{{mySubjectLen}}题)</text></view>
      <view class="center">
        <picker :value="index" :range="count" @change="countChange">
          <view class="picker-selected">{{count[countIndex]}}\t题</view>
        </picker>
      </view>
      <view>＞</view>
    </view>
    <view class="money" v-if="show == 1">
      <view>拆包金额<text class="count">(答方支付)</text></view>
      <view class="center">
        <picker :value="index" :range="consume" @change="consumeChange">
          <view class="picker-selected">{{consume[consumeIndex]}}\t%</view>
        </picker>
      </view>
      <view>＞</view>
    </view>
    <view class="commission count" :style="show != 1 ? 'visibility:hidden;' : ''">需支付￥{{serviceTotal == null ? '0.00' : serviceTotal}}元服务费</view>
    <view class="generate" @tap="generate">生成答题红包</view>
  </view>
  <!--选择支付方式-->
  <form @reset="formReset" @submit="formSubmit" reportSubmit="true" v-if="show == 1">
        <view @tap="yczz" class="drawer_screen" v-if="showModal"></view>
        <view class="drawer_box" v-if="showModal">
            <view class="drawer_title">请选择支付方式</view>
            <view class="weui-cells weui-cells_after-title">
                <radio-group @change="radioChange1" class="radio-group" name="radiogroup">
                    <label>
                        <view class="weui-cell">
                            <view class="zfimg">
                                <image src="/static/img/weixin.png"></image>
                            </view>
                            <view class="weui-cell__bd">微信支付</view>
                            <view class="weui-cell__ft">
                                <radio :checked="zffs==1" value="wxzf"></radio>
                            </view>
                        </view>
                    </label>
                    <label>
                        <view class="weui-cell" style="border-top:1rpx solid #e6e6e6;">
                            <view class="zfimg">
                                <image src="/static/img/yezf.png"></image>
                            </view>
                            <view class="weui-cell__bd">余额支付
                <text class="yetext">您的余额{{money}}元</text>
                            </view>
                            <view class="weui-cell__ft">
                                <radio :checked="zffs==2" color="#FF9700" value="yezf"></radio>
                            </view>
                        </view>
                    </label>
                </radio-group>
            </view>
            <view class="drawer_title1">您选择的{{zfwz}}</view>
            <button :class="btntype" :disabled="zfz" form-type="submit">
                <view v-if="!zfz">确定支付<text class="zftext">￥{{totalPrice}}</text></view>
                <view v-if="zfz">
                    <text class="zfztext">支付中...</text>
                </view>
            </button>
        </view>
    </form>

  <view class="notice" v-if="show == 1">未领取的红包将于3天后返回余额</view>
</view>
</template>

<script>
// pages/order/index.js
const app = getApp();

export default {
  data() {
    return {
      countIndex: 3,
      //答对数量默认4题
      consumeIndex: 1,
      //答方支付比例默认10%
      show: 0,
      //是否显示金额相关信息
      noticeShow: false,
      //提示
      consume: [],
      //支付比例
      showModal: false,
      //支付方式
      btntype: "btn_ok1",
      //余额支付
      zffs: 1,
      //1微信支付2余额支付
      zfz: !1,
      //支付中状态
      money: 0.00,
      //余额
      redAmount: 0.00,
      //红包总额
      redNum: 0,
      //红包总数
      totalPrice: 0.00,
      //支付总金额
      serviceTotal: 0.00 //服务费
      ,
      order_id: "",
      mySubject: "",
      mySubjectLen: "",
      count: "",
      waring: "",
      zfwz: "",
      user_id: "",
      servicePrice: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mySubject = uni.getStorageSync('mySubject') || [];
    var mySubjectLen = mySubject.length;

    if (mySubjectLen < 5) {
      uni.showToast({
        title: '参数错误,请重试'
      });
      setTimeout(function () {
        uni.redirectTo({
          url: '../index/index'
        });
      }, 1000);
    } else {
      this.setData({
        order_id: options.order_id,
        mySubject: mySubject,
        mySubjectLen: mySubjectLen
      });
      this.getUserInfo();
    }

    this.correctNum();
  },
  methods: {
    /**
     * 监听红包总金额
     */
    bindRedAmount: function (e) {
      var redAmount = parseFloat(e.detail.value);

      if (redAmount < 1) {
        this.waringFun('红包总金额不能低于1元');
      }

      if (redAmount > 2000) {
        this.waringFun('红包总金额不能超过2000元');
      }

      var serviceTotal = 0.00;

      if (redAmount) {
        serviceTotal = redAmount * this.servicePrice; //计算服务费

        serviceTotal = serviceTotal.toFixed(2);
      }

      this.setData({
        redAmount: redAmount,
        serviceTotal: serviceTotal
      });
    },

    /**
     * 监听红包数量
     */
    bindRedNum: function (e) {
      var redAmount = parseFloat(this.redAmount);
      var redNum = parseFloat(e.detail.value);
      var show = this.show;

      if (redNum < 1) {
        this.waringFun('红包总数最少1个');
      }

      if (redNum > 200) {
        this.waringFun('红包总数最多200个');
      }

      if (show == 1) {
        if (redAmount / redNum < 1) {
          this.waringFun('每人获得的红包不能低于1元');
        }
      }

      this.setData({
        redNum: redNum
      });
    },

    /**
     * 答对题目数量
     */
    correctNum: function () {
      var len = this.mySubjectLen;
      var count = [];

      for (var i = 0; i < len - 1; i++) {
        count[i] = i + 1;
      }

      this.setData({
        count: count
      });
    },

    /**
     * 选择答题数量
     */
    countChange: function (e) {
      this.setData({
        countIndex: e.detail.value
      });
    },

    /**
     * 选择答方支付比例
     */
    consumeChange: function (e) {
      this.setData({
        consumeIndex: e.detail.value
      });
    },

    /**
     * 提醒
     */
    waringFun: function (v) {
      var _this = this;

      _this.setData({
        noticeShow: true,
        waring: v
      });

      setTimeout(function () {
        _this.setData({
          noticeShow: false
        });
      }, 3000);
    },

    /**
     * 选择支付方式
     */
    radioChange1: function (t) {
      "wxzf" == t.detail.value && this.setData({
        zffs: 1,
        zfwz: "微信支付",
        btntype: "btn_ok1"
      }), "yezf" == t.detail.value && this.setData({
        zffs: 2,
        zfwz: "余额支付",
        btntype: "btn_ok2"
      });
    },

    /**
     * 隐藏支付方式
     */
    yczz: function () {
      this.setData({
        showModal: false
      });
    },

    /**
     * 获取用户信息
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
            user_id: user_id,
            money: res.data.wallet,
            //余额   
            show: res.data.show,
            //是否显示支付相关
            servicePrice: res.data.servicePrice,
            //服务费率
            consume: res.data.consume //答方支付比例

          });
        }
      });
    },

    /**
     * 生成答题红包
     */
    generate: function () {
      var _this = this;

      var show = _this.show;
      var order_id = _this.order_id;
      var redAmount = parseFloat(_this.redAmount); //红包总金额

      var redNum = parseFloat(_this.redNum); //红包数量

      var redCount = _this.count[_this.countIndex]; //答对数量

      var redConsume = _this.consume[_this.consumeIndex]; //答方支付比例

      var serviceTotal = parseFloat(_this.serviceTotal); //服务费

      var mySubject = _this.mySubject; //已选题目

      if (show == 1) {
        if (redAmount < 1) {
          this.waringFun('红包总金额不能低于1元');
          return;
        }

        if (redAmount > 2000) {
          this.waringFun('红包总金额不能超过2000元');
          return;
        }

        if (redNum < 1) {
          this.waringFun('红包总数最少1个');
          return;
        }

        if (redNum > 200) {
          this.waringFun('红包总数最多200个');
          return;
        }

        if (parseFloat(redAmount / redNum) < 1) {
          this.waringFun('每人获得的红包不能低于1元');
          return;
        }

        var totalPrice = redAmount + serviceTotal; //总金额加服务费

        this.setData({
          totalPrice: totalPrice.toFixed(2),
          showModal: true
        });
      } else {
        //过审核直接生成订单免跳转
        if (redNum < 1) {
          this.waringFun('红包总数最少1个');
          return;
        }

        if (redNum > 200) {
          this.waringFun('红包总数最多200个');
          return;
        }

        var data = {
          order_id: order_id,
          redNum: redNum,
          redCount: redCount
        };
        app.globalData.util.request({
          url: 'entry/wxapp/HbOrderNoShow',
          data: data,

          success(res) {
            if (res.data.error != -1) {
              uni.showToast({
                title: '出题成功',
                mask: true
              });
              setTimeout(function () {
                uni.redirectTo({
                  url: '../detail/index?order_id=' + order_id
                });
              }, 1000);
            } else {
              uni.showToast({
                title: res.data.message,
                icon: 'none'
              });
            }
          }

        }); //分享页面

        uni.redirectTo({
          url: '../detail/index'
        });
      }
    },

    /**
     * 生成订单(支付)
     */
    formSubmit: function (e) {
      var _this = this;

      _this.setData({
        zfz: !0
      });

      var show = _this.show;
      var redAmount = parseFloat(_this.redAmount); //红包总金额

      var redNum = parseFloat(_this.redNum); //红包数量

      var redCount = _this.count[_this.countIndex]; //答对数量

      var redConsume = _this.consume[_this.consumeIndex]; //答方支付比例

      var serviceTotal = parseFloat(_this.serviceTotal); //服务费

      var totalPrice = parseFloat(_this.totalPrice); //支付总金额

      var payType = e.detail.value.radiogroup;
      var order_id = _this.order_id;
      var data = {
        order_id: order_id,
        redAmount: redAmount,
        redNum: redNum,
        redCount: redCount,
        redConsume: redConsume,
        serviceTotal: serviceTotal,
        totalPrice: totalPrice,
        payType: payType
      };
      app.globalData.util.request({
        url: 'entry/wxapp/HbOrderPay',
        data: data,

        success(res) {
          if (res.data.error != -1) {
            if (payType == 'wxzf') {
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
                      url: '../detail/index?order_id=' + order_id
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
              if (res.data == 0) {
                uni.showToast({
                  title: '支付成功',
                  mask: true
                });
                setTimeout(function () {
                  uni.redirectTo({
                    url: '../detail/index?order_id=' + order_id
                  });
                }, 1000);
              }
            }
          } else {
            uni.showToast({
              title: res.data.message,
              icon: 'none'
            });
          }

          _this.setData({
            zfz: !1
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