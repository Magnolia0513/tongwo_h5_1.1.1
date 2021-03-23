<template>
<!--pages/already/index.wxml-->
<view class="main"><!--真机需要更换为网络图片-->
  <view class="content">
    <view v-for="(item, index) in mySubject" :key="index" class="subject">
      <view class="problem">{{index+1}}\t{{item.subject.question}}</view>
      <view v-for="(optionsitem, index2) in item.subject.options" :key="index2" :class="'answer ' + (index == item.idx ? 'selected' : '')" @tap="selected" :data-index="index" :data-id="item.subject.id">{{optionsitem}}</view>
      <view class="delete" @tap="deleteFun" :data-index="index">删除此题</view>
    </view>
  </view>
  <view class="confirm" @tap="confirm">确定</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      selectedIdx: -1,
      mySubject: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var mySubject = uni.getStorageSync('mySubject');
    this.setData({
      mySubject: mySubject
    });
  },
  methods: {
    /**
     * 选择答案
     */
    selected: function (e) {
      var idx = e.currentTarget.dataset.index;
      var id = e.currentTarget.dataset.id;
      var mySubject = this.mySubject;

      for (var i = 0; i < mySubject.length; i++) {
        if (mySubject[i].subject.id == id) {
          mySubject[i].idx = idx;
        }
      }

      this.setData({
        mySubject: mySubject
      });
    },

    /**
     * 删除问题
     */
    deleteFun: function (e) {
      var _this = this;

      var index = e.currentTarget.dataset.index;
      uni.showModal({
        title: '提示',
        content: '确定删除该问题?',

        success(res) {
          if (res.confirm) {
            var mySubject = _this.mySubject;
            mySubject.splice(index, 1);

            _this.setData({
              mySubject: mySubject
            });
          }
        }

      });
    },

    /**
     * 保存修改
     */
    confirm: function () {
      var mySubject = this.mySubject;
      uni.setStorageSync('mySubject', mySubject);
      uni.navigateBack({
        'delta': 1
      });
    }
  }
};
</script>
<style>
@import "./index.css";
</style>