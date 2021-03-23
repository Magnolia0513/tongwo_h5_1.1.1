<script>
var _App;
function _defineProperty(o, a, e) {
  return a in o ? Object.defineProperty(o, a, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[a] = e, o;
}

export default {
  onLaunch: function () {
    this.globalData.getUserInfo();
  },
  globalData: {
    util: require("./we7/resource/js/util.js"),
    title: function (o) {
      if ("" == o) return !0;
      uni.showModal({
        title: "",
        content: o
      });
    },
    getUserInfo: function (a) {
      var e = this,
          o = this.userInfo;
      o ? "function" == typeof a && a(o) : uni.login({
        success: function (o) {
          e.util.request({
            url: "entry/wxapp/Openid",
            cachetime: "0",
            data: {
              code: o.code
            },
            header: {
              "content-type": "application/json"
            },
            dataType: "json",
            success: function (o) {
              getApp().getOpenId = o.data.openid, getApp().getSK = o.data.session_key;

              if (o.data.openid != '' && o.data.openid != 'undefined' && o.data.openid != undefined) {
                e.util.request({
                  url: "entry/wxapp/login",
                  cachetime: "0",
                  data: {
                    openid: o.data.openid
                  },
                  header: {
                    "content-type": "application/json"
                  },
                  dataType: "json",
                  success: function (o) {
                    getApp().getuniacid = o.data.uniacid, uni.setStorageSync("users", o.data), e.userInfo = o.data, uni.setStorageSync("openid", o.data.openid), "function" == typeof a && a(e.userInfo);
                  }
                });
              }
            },
            fail: function (o) {},
            complete: function (o) {}
          });
        }
      });
    },
    convertHtmlToText: function (o) {
      var a = "" + o;
      return a = (a = a.replace(/<p.*?>/gi, "\r\n")).replace(/<\/p>/gi, "\r\n", "  *  ");
    },
    userInfo: null
  },
  methods: {}
};
</script>
<style>
@import "./app.css";
</style>