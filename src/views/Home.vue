<template>
  <div class="home">
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/">
        <span>首页</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.active : icon.inactive"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/allShang">
        <span>全部商品</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active2 ? icon.active2 : icon.inactive2"
        />
      </van-tabbar-item>
      <!-- <van-tabbar-item to="/shoppingcart">
        <span>购物车</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active3 ? icon.active3 : icon.inactive3"
        >
      </van-tabbar-item>-->
      <van-tabbar-item to="/personalcenter">
        <span>个人中心</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active4 ? icon.active4 : icon.inactive4"
        />
      </van-tabbar-item>
    </van-tabbar>
    <div class="sousuo">
      <van-search
        placeholder="搜索商品"
        v-model="search"
        show-action
        @search="onSearch"
      />
    </div>
    <!-- banner -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          v-for="(order, index1) in orders"
          :key="index1"
          class="swiper-slide"
        >
          <!-- 具体内容 -->
          <a :href="order.url">
            <!-- <a> -->
            <img
              class="swiper-img"
              :class="{ active: currentIndex === index1 }"
              :src="img + order.img_url"
              alt
              @click="itemClick(index1)"
            />
          </a>
        </div>
      </div>
      <div class="swiper-pagination" v-if="orders.length > 1">
        <span v-for="(item, index) in orders" :key="index"></span>
      </div>
    </div>
    <!-- <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item  v-for="(order, index1) in orders" :key="index1">
        <a :href="order.url"><img :class='{active:currentIndex===index1}' :src="img + order.img_url" alt=""  @click='itemClick(index1)'></a>
      </van-swipe-item>
    </van-swipe>-->
    <!-- <div class="Notice father">
      <div class="fl" style="width: 19%;">
        <img class="lbimg" src="./../img/lb.png" alt="" srcset="">
        <img class="lbguang" src="./../img/lbguang.png" alt="" srcset="">
        <span class="span1">公告</span>
      </div>
      <div class="Noticespan fr"  >
        <span class="span2">|</span><span class="span3">618狂欢——eSIM业务免费体验三个月</span><span class="span4">></span>
      </div>
    </div>-->
    <!-- 新公告 -->
    <div class="gonggao father" @click="Notice">
      <div class="fl gonggaoimg">
        <img src="./../img/trumpet.png" alt srcset />
        <span class="span1">公告</span>
      </div>
      <div class="gonggaospan father">
        <span class="span2">OPPO手表正在热卖中！</span>
        <span class="span3 fr">了解更多&nbsp;&nbsp;></span>
      </div>
    </div>
    <div class="fenlei">
      <!-- 分类 -->
      <div class="fenleicenter father">
        <ul>
          <li
            v-for="(order, index2) in orderstwo"
            :key="index2"
            @click="list(order.id, order.type)"
          >
            <img :src="img + order.imgurl" alt srcset />
            <p>{{ order.type }}</p>
          </li>
        </ul>
      </div>
      <!-- 商城推荐 -->
      <div class="center" v-show="three">
        <p class="centerp">{{ ordersthree.title }}</p>
        <div class="center-center">
          <div class="center-top">
            <img
              class="topimg"
              :src="img + ordersthree.tuijian_banner"
              alt
              srcset
            />
            <div class="center-c father">
              <div class="center-z fl">
                <img :src="img + ordersthree.tuijian_main.cover" alt srcset />
              </div>
              <div class="center-y fr">
                <p class="y1">{{ ordersthree.tuijian_main.title }}</p>
                <p class="y2">{{ ordersthree.tuijian_main.tags }}</p>
                <p class="y3">
                  <span>促销价：</span>
                  {{ ordersthree.tuijian_main.price }}
                  <span class="listSpan2"
                    >￥{{ ordersthree.tuijian_main.ori_price }}</span
                  >
                </p>
                <a class="y4" :href="ordersthree.tuijian_main.introduce">
                  <img src="./../img/icon-buy.png" alt srcset />
                </a>
              </div>
            </div>
          </div>
          <div class="center-bottom">
            <!-- 外链 -->
            <ul class="father" v-show="wailian">
              <li v-for="(order, index2) in ordersfour" :key="index2">
                <a :href="order.introduce">
                  <img :src="img + order.cover" alt srcset />
                  <div class="bottom-bottom">
                    <p class="bottomp1">{{ order.title }}</p>
                    <p class="bottomp2">{{ order.tags }}</p>
                    <span class="bottomp3">￥{{ order.price }}</span>
                    <span class="listSpan2">￥{{ order.ori_price }}</span>
                  </div>
                </a>
              </li>
            </ul>
            <!-- 内链 -->
            <ul class="father" v-show="zijiList">
              <li v-for="(order, index2) in orderszijiList" :key="index2">
                <a href="#" @click="qianggou(order.id)">
                  <img :src="img + order.cover" alt srcset />
                  <div class="bottom-bottom">
                    <p class="bottomp1">{{ order.title }}</p>
                    <p class="bottomp2">{{ order.tags }}</p>
                    <span class="bottomp3">￥{{ order.price }}</span>
                    <span class="listSpan2">￥{{ order.ori_price }}</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 爆款热销 -->
      <div class="center" v-show="rexiao">
        <p class="centerp">{{ rexiaolist.title }}</p>
        <div class="center-center">
          <div class="center-top">
            <img
              class="topimg"
              :src="img + rexiaolist.baokuan_banner"
              alt
              srcset
            />
            <div class="center-c father">
              <div class="center-z fl">
                <img :src="img + rexiaolist.baokuan_main.cover" alt srcset />
              </div>
              <div class="center-y fr">
                <p class="y1">{{ rexiaolist.baokuan_main.title }}</p>
                <p class="y2">{{ rexiaolist.baokuan_main.tags }}</p>
                <p class="y3">
                  <span>促销价：</span>
                  {{ rexiaolist.baokuan_main.price }}
                  <span class="listSpan2"
                    >￥{{ rexiaolist.baokuan_main.ori_price }}</span
                  >
                </p>
                <a class="y4" v-bind:href="[rexiaolist.baokuan_main.introduce]">
                  <img src="./../img/icon-buy.png" alt srcset />
                </a>
              </div>
            </div>
          </div>
          <div class="center-bottom">
            <!-- 外链 -->
            <ul class="father">
              <li  v-show="wailiantwo" v-for="(order, index2) in wailiantwolist" :key="index2">
                <a :href="order.introduce">
                  <img :src="img + order.cover" alt srcset />
                  <div class="bottom-bottom">
                    <p class="bottomp1">{{ order.title }}</p>
                    <p class="bottomp2">{{ order.tags }}</p>
                    <span class="bottomp3">￥{{ order.price }}</span>
                    <span class="listSpan2">￥{{ order.ori_price }}</span>
                  </div>
                </a>
              </li>
              <!-- 内链 -->
              <li  v-show="zijiListtwo" v-for="(order, index2) in zijiListtwolist" :key="index2">
                <a href="#" @click="qianggou(order.id)">
                  <img :src="img + order.cover" alt srcset />
                  <div class="bottom-bottom">
                    <p class="bottomp1">{{ order.title }}</p>
                    <p class="bottomp2">{{ order.tags }}</p>
                    <span class="listSpan3" @click="qianggou(order.id)"
                      >立即预约</span
                    >
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="mokuai father">
      <img
        class="fl"
        @click="toJi"
        src="./../img/bottom-business.png"
        alt
        srcset
      />
      <img
        class="fr"
        @click="toEr"
        src="./../img/bottom-sale1.png"
        alt
        srcset
      />
    </div>
    <van-popup v-model="loginshow" :close-on-click-overlay="overlay">
      <form class="login-form">
        <div class="form-title">登 录</div>
        <div class="form-item">
          <div class="form-label">
            <input
              type="tel"
              class="login-phone form-input"
              v-model="mobile"
              placeholder="请输入手机号"
            />
          </div>
        </div>
        <div class="form-item">
          <div class="form-label">
            <input
              type="tel"
              class="login-phone form-input"
              v-model="verify"
              placeholder="请输入验证码"
            />
            <button
              class="yan"
              @click.prevent="handleFetchCode"
              v-if="timeFlag"
            >
              获取验证码
            </button>
            <button
              class="yan"
              @click.prevent="handleFetchCode"
              v-else
              disabled
            >
              {{ count }}s
            </button>
          </div>
        </div>
        <button type="button" class="login-submit" @click="loginsubmit">
          登 录
        </button>
      </form>
    </van-popup>
  </div>
</template>

<script>
import { homePage, login, verify, binding } from "./services/home";
import {
  Swipe,
  SwipeItem,
  Search,
  Tabbar,
  TabbarItem,
  Popup,
  Toast
} from "vant";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
// import { floralwhite } from 'color-name';

export default {
  name: "home",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Search.name]: Search,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Popup.name]: Popup,
    [Toast.name]: Toast
  },
  data() {
    return {
      currentIndex: -1,
      active: 0,
      search: "",
      orders: [],
      img: "http://esimwx.10010sh.cn:8999/wxunicom/test_terminal_shop/public",
      orderstwo: [],
      ordersthree: {},
      ordersfour: [],
      orderszijiList: [],
      zijiList: false,
      three: false,
      wailian: false,
      rexiao: false,
      rexiaolist: {},
      zijiListlist: [],
      wailiantwo: false,
      zijiListtwo: false,
      wailiantwolist: [],
      zijiListtwolist: [],

      icon: {
        active: require("./../img/coin1-1.png"),
        inactive: require("./../img/coin1.png"),
        active2: require("./../img/coin2-1.png"),
        inactive2: require("./../img/coin2.png"),
        active3: require("./../img/coin3-1.png"),
        inactive3: require("./../img/coin3.png"),
        active4: require("./../img/coin4-1.png"),
        inactive4: require("./../img/coin4.png")
      },
      overlay: false,
      loginshow: false,
      mobile: "",
      verify: "",
      timeFlag: true,
      count: 30
    };
  },
  mounted() {
    // 获取code
     this.getUser()
    this.homelist();
  },
  methods: {
    //获取url中的参数
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]);
      return null; //返回参数值
    },

    getUser() {
      var code = this.getUrlParam("code");
      if (code == null) {
        var curPath =
          "http://esimwx.10010sh.cn:8999/wxunicom/test_terminal_shop/ShoppingMall/index.html";
        var realPath =
          "https://www.shyy6688.com/wxunicom/index.php/Esim/Wx/getParamCode?backUrl=" +
          curPath;
        var url =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx908fb9ef140ecc17&redirect_uri=" +
          encodeURIComponent(realPath) +
          "&response_type=code&scope=snsapi_base#wechat_redirect";
        // alert(url);
        window.location.href = url;
      } else {
        // alert(code);
        this.code = code;
        // alert(this.code);
        login(this.code).then(resp => {
          let isMobile = resp.data.isMobile;
          if (isMobile == false) {
            this.loginshow = true;
            return false;
          }
        });
      }
    },
    itemClick(index1) {
      this.currentIndex = index1;
      console.log(this.currentIndex);
    },
    homelist() {
      homePage().then(resp => {
        // console.log(resp.data.home.types)
        // banner
        let orders = resp.data.banner;
        let orderstwo = resp.data.category;
        this.ordersthree = resp.data.recommend;
        this.ordersfour = resp.data.recommend.wailianList;
        this.orderszijiList = resp.data.recommend.zijiList;
        // 爆款热销
        this.rexiaolist = resp.data.hot;
        this.wailiantwolist = resp.data.hot.wailianList;
        this.zijiListtwolist = resp.data.hot.zijiList;

        if (orders && orders.length > 0) {
          this.orders = orders;
          this.$nextTick(() => {
            new Swiper(".swiper-container", {
              effect: "coverflow",
              centeredSlides: true,
              // spaceBetween: -10,
              slidesPerView: "auto",
              loop: true,
              coverflow: {
                rotate: 30,
                stretch: 10,
                depth: 80,
                modifier: 2,
                slideShadows: false
              },
              pagination: ".swiper-pagination",
              observer: true,
              observeParents: true
            });
          });
        }
        if (orderstwo && orderstwo.length > 0) {
          this.orderstwo = orderstwo;
        }
        if (this.ordersthree !== "") {
          this.three = true;
        } else {
          this.three = false;
        }
        // 外链
        if (this.ordersfour && this.ordersfour.length > 0) {
          this.wailian = true;
        } else if (this.ordersfour.length == 0) {
          this.wailian = false;
        }
        // 内链
        if (this.orderszijiList && this.orderszijiList.length > 0) {
          this.zijiList = true;
        } else if (this.orderszijiList.length == 0) {
          this.zijiList = false;
        }
        // 爆款热销
        if (this.rexiaolist != "") {
          this.rexiao = true;
        } else {
          this.rexiao = false;
        }
        // 外链
        if (this.wailiantwolist && this.wailiantwolist.length > 0) {
          this.wailiantwo = true;
        } else if (this.wailiantwolist.length == 0) {
          this.wailiantwo = false;
        }
        // 内链
        if (this.zijiListtwolist && this.zijiListtwolist.length > 0) {
          this.zijiListtwo = true;
        } else if (this.zijiListtwolist.length == 0) {
          this.zijiListtwo = false;
        }
      });
    },
    // 确定搜索时触发
    onSearch() {
      let search = this.search;
      console.log(search);
      this.$router.push({
        path: "/allShangtwo",
        query: {
          search: search
        }
      });
    },
    // 分类
    list(id, type) {
      console.log(id);
      if (id == 1) {
        this.$router.push({
          path: "/commodityareaone",
          query: {
            id: id,
            type: type
          }
        });
        //  window.location.href="https://mp.weixin.qq.com/s/X15dWotk173S4yyEfIxZZA"
      } else if (id == 2) {
        this.$router.push({
          path: "/commodityareatwo",
          query: {
            id: id,
            type: type
          }
        });
      } else if (id == 3) {
        this.$router.push({
          path: "/commodityareathree",
          query: {
            id: id,
            type: type
          }
        });
      } else if (id == 4) {
        this.$router.push({
          path: "/commodityareafour",
          query: {
            id: id,
            type: type
          }
        });
      } else if (id == 5) {
        this.$router.push({
          path: "/CommodityAreaFive",
          query: {
            id: id,
            type: type
          }
        });
      } else if (id == 6) {
        this.$router.push({
          path: "/CommodityAreaSix",
          query: {
            id: id,
            type: type
          }
        });
        //    window.location.href ="https://mp.weixin.qq.com/s/wlO8wYCbX19DxCkNGpsrBg"
      } else if (id == 7) {
        this.$router.push({
          path: "/commodityareaseven",
          query: {
            id: id,
            type: type
          }
        });
      } else if (id == 8) {
        this.$router.push({
          path: "/commodityareaeight",
          query: {
            id: id,
            type: type
          }
        });
      }
    },
    qianggou(id) {
      console.log(id);
      this.$router.push({
        path: "/details",
        query: { id: id }
      });
    },
    // 验证码
    handleFetchCode() {
      let regPhone = /^1[0-9]{10}$/;
      const mobile = this.mobile;
      console.log(mobile);
      if (regPhone.test(mobile)) {
        this.timeDown();
        verify(mobile).then(resp => {
          let code = resp.code;
          if (code == 200) {
            this.$toast.success("发送成功");
          } else {
            this.$toast.fail("发送失败");
          }
        });
      } else {
        this.$toast.fail("请输入11为数");
      }
    },
    timeDown() {
      const TIME_COUNT = 30;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.timeFlag = false;
        this.timer = setInterval(() => {
          if (this.count > 1) {
            this.count--;
          } else {
            this.timeFlag = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    // 确定
    loginsubmit() {
      let mobile = this.mobile;
      let verify = this.verify;
      if (mobile == "" && verify == "") {
        this.$toast.fail("都不能为空");
        return false;
      } else {
        binding(this.mobile, this.verify).then(resp => {
          console.log(resp);
          let code = resp.code;
          if (code == 200) {
            this.loginshow = false;
          } else {
            this.$toast.fail(resp.msg);
          }
        });
      }
    },
    // 公告
    Notice() {
      // this.$router.push({
      //   path: "/announcement"
      // });
      window.location.href =
        "https://card.10010.com/html/actv/term/product-details.html?goodsId=992008215202";
    },
    // 业务专区跳转到公众号在线激活页面
    toJi() {
      window.location.href =
        "http://esimwx.10010sh.cn:8999/html/LastOnlinetwo/localizer.html";
    },
    // 耳机专区
    toEr() {
      this.$router.push({
        path: "/earphoneZone"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.father:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}
.father {
  zoom: 1;
}
.fr {
  float: right;
}
.fl {
  float: left;
  margin-top: -5px;
}
p {
  margin: 0 auto;
}
a {
  display: inline-block;
}
.home {
  width: 750px;
  height: 100%;
  background-color: #fff;
  color: #333;
  padding-bottom: 95px;
  padding-top: 0;
  // banner
  // .van-swipe{
  //   height: 300px;
  //   width: 95%;
  //   margin: 0 auto;
  //   border-radius: 20px;
  //   img{
  //     height: 300px;
  //   }
  // }
  .swiper-container {
    z-index: 0;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 60px;
    .swiper-pagination {
      width: 100%;
      height: 0.2rem;
      text-align: center;
      position: absolute;
      bottom: 0 !important;
      margin: 25px 0 10px;
      line-height: 0.2rem;
      box-sizing: border-box;
      padding: 0 0.3rem;
      font-size: 0;
    }
    .swiper-wrapper {
      .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 88%;
        height: 300px;
        margin: 0 auto;
        a {
          display: inline-block;
          box-shadow: 0px 20px 30px #d7f3f9;
          height: 300px;
          border-radius: 20px;
          .swiper-img {
            width: 100%;
            height: 300px;
            border-radius: 20px;
            // box-shadow: 10px 10px 20px #edfbfe;
          }
          // .active {
          //   display: inline-block;
          //   background: url("./../img/banner-5.png");
          // }
        }
      }
    }
  }
  // 搜索
  // .sousuo{
  //   background-color: #efefef;
  //   height: 110px;
  //   border-bottom: 1px solid #dbdbdb;
  //   border: none;
  //   .van-search {
  //     background: #efefef !important;
  //     .van-search__content {
  //       background-color: #fff;
  //       .van-cell.van-cell--borderless.van-field {
  //           // height: 60px;
  //           color: #6cb3ed;
  //           .van-field__body {
  //             height: 50px;
  //             line-height: 50px;
  //             input {
  //               height: 50px;
  //             }
  //           }
  //       }
  //     }
  //   }
  // }
  // 新搜索
  .sousuo {
    height: 110px;
    // border-bottom: 1px solid #dbdbdb;
    border: none;
    .van-search {
      background: #ffffff !important;
      .van-search__content {
        background-color: #fff;
        border: 2px solid #6cb3ed;
        border-radius: 40px;
        .van-cell.van-cell--borderless.van-field {
          // height: 60px;
          color: #6cb3ed;
          .van-field__body {
            height: 50px;
            line-height: 50px;
            input {
              height: 50px;
            }
          }
        }
      }
    }
  }

  // 新公告
  .gonggao {
    padding: 20px;
    margin-top: 20px;
    .gonggaoimg {
      background-color: #f0f7fd;
      padding: 10px;
      border-radius: 15px;
      img {
        width: 54px;
        height: 43px;
        vertical-align: middle;
      }
      .span1 {
        vertical-align: middle;
        color: #6cb3ed;
        display: inline-block;
        margin-left: 10px;
        font-size: 28px;
        font-weight: bold;
      }
    }
    .gonggaospan {
      height: 60px;
      line-height: 60px;
      .span2 {
        font-size: 30px;
        display: inline-block;
        margin-left: 20px;
      }
      .span3 {
        color: #6cb3ed;
        display: inline-block;
      }
    }
  }
  // .Notice {
  //   background-color: #fff;
  //   position:relative;
  //   padding: 20px 0 20px 20px;
  //   .lbimg {
  //     height: 45px;
  //   }
  //   .span1 {
  //     margin-right: 10px;
  //     font-size: 28px;
  //   }
  //   .lbguang {
  //     height: 45px;
  //     opacity: 0.1;
  //     overflow: hidden;
  //     animation-name:breath;
  //     animation-duration: 700ms;
  //     animation-timing-function: ease-in-out;
  //     animation-iteration-count: infinite;
  //     -webkit-animation-name: breath;
  //     -webkit-animation-duration: 700ms;
  //     -webkit-animation-timing-function: ease-in-out;
  //     -webkit-animation-iteration-count: infinite;
  //   }
  //   @keyframes breath {
  //     from {opacity: 0.1;}
  //     50% {opacity: 1;}
  //     to {opacity: 0.1;}
  //   }
  //   @-webkit-keyframes breath {
  //     from {opacity: 0.1;}
  //     50% {opacity: 1;}
  //     to {opacity: 0.1;}
  //   }
  //   .Noticespan {
  //     width: 80%;
  //     line-height: 55px;
  //     text-align: left;
  //     span {
  //     font-size: 26px;
  //   }
  //   .span2 {
  //     margin-right: 10px;
  //     font-weight: bold;
  //     font-size: 35px;
  //   }
  //   .span3 {
  //   }
  //   .span4 {
  //     position: absolute;
  //     display: inline-block;
  //     right: 0px;
  //     width: 30px;
  //     text-align: center;
  //   }
  //   }

  // }
  .listSpan2 {
    display: inline-block;
    font-size: 22px;
    color: #ccc;
    margin-left: 5px;
    margin-top: 5px;
    text-decoration: line-through;
  }
  // 分类
  .fenlei {
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 60px;
    .fenleicenter {
      // width: 100%;
      // height: 200px;
      background-color: #fff;
      border-radius: 10px;
      margin-bottom: 20px;
      // padding-bottom: 20px;
      padding: 0 20px;
      text-align: center;
      ul {
        width: 100%;
        li {
          float: left;
          width: 120px;
          margin-left: 63px;
          img {
            width: 100px;
            margin-top: 30px;
          }
          p {
            font-size: 24px;
            margin: 0 auto;
            line-height: 2;
            text-align: center;
            a.zimu {
              display: inline-block;
              color: #999;
              font-size: 24px;
            }
          }
        }
      }
      ul li:nth-child(1),
      ul li:nth-child(5) {
        margin-left: 0;
      }
    }
    // 新商城推荐
    .center {
      margin-top: 40px;
      // margin-bottom: 60px;
      .centerp {
        width: 370px;
        height: 70px;
        background: url("./../img/titi.png") no-repeat;
        background-size: 100%;
        line-height: 70px;
        text-align: center;
        color: #6cb3ed;
        font-size: 44px;
      }
      .center-center {
        // margin-bottom: 60px;
        .center-top {
          position: relative;
          .topimg {
            width: 100%;
            margin-top: 30px;
          }
          .center-c {
            position: relative;
            .center-z {
              position: absolute;
              bottom: 0;
              left: 30px;
              img {
                width: 260px;
                // height: 400px;
              }
            }
            .center-y {
              width: 60%;
              text-align: center;
              line-height: 1.5;
              .y1 {
                font-size: 40px;
                font-weight: bold;
              }
              .y2 {
                font-size: 24px;
              }
              .y3 {
                font-size: 40px;
                color: #fc6a6b;
                margin-bottom: 20px;
                span {
                  font-size: 24px;
                }
              }
              .y4 {
                display: inline-block;
                img {
                  width: 260px;
                  height: 75px;
                }
              }
            }
          }
        }
        .center-bottom {
          // background-color: #6cb3ed;
          margin-top: 20px;
          // margin-bottom: 60px;
          ul {
            li {
              float: left;
              border: 2px solid #6cb3ed;
              border-radius: 20px;
              margin-left: 35px;
              margin-bottom: 20px;
              width: 42.5%;
              a {
                width: 100%;
                display: inline-block;
                img {
                  width: 160px;
                  // height: 240px;
                  padding: 0 70px;
                }
                .bottom-bottom {
                  background-color: #6cb3ed;
                  background-image: linear-gradient(#77c0f5, #5976ea);
                  // height: 300px;
                  border-radius: 0 0 20px 20px;
                  text-align: center;
                  padding-top: 20px;
                  p {
                    word-wrap: break-word;
                    word-break: break-all;
                    overflow: hidden;
                    color: #fff;
                    line-height: 1.5;
                  }
                  .bottomp1 {
                    font-size: 32px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                  }
                  .bottomp2 {
                    font-size: 24px;
                  }
                  .bottomp3 {
                    display: inline-block;
                    font-size: 30px;
                    font-weight: bold;
                    padding: 10px 15px;
                    background-color: #fff;
                    border-radius: 30px;
                    color: #fc6a6b;
                    margin-top: 10px;
                    margin-bottom: 15px;
                  }
                  .listSpan3 {
                    display: inline-block;
                    width: 1.883rem;
                    color: #5b7deb;
                    height: 40px;
                    margin: 15px 50px 15px 0px;
                    background: white;
                    border-radius: 25px;
                    background-size: 100% 100%;
                    padding-top: 10px;
                  }
                }
              }
            }
          }
        }
      }
    }
    // 秒杀
    .seckill {
      // height: 465px;
      background-color: #fff;
      border-radius: 20px;
      margin-bottom: 20px;
      padding: 30px 40px 20px 20px;
      .seckilltop {
        height: 60px;
        span.cion {
          display: inline-block;
          width: 10px;
          height: 40px;
          background-color: #999;
          float: left;
        }
        p.seckilltop1 {
          width: 95%;
          float: right;
          margin-top: 5px;
          padding-bottom: 20px;
          border-bottom: 1px solid #efefef;
          a {
            display: inline-block;
            font-size: 30px;
            font-weight: bold;
            color: #333;
          }
          a.zimu {
            color: #999;
            font-size: 24px;
          }
        }
        ul {
          width: 100%;
          li {
            float: left;
            // padding-left: 23px;
            border: 2px solid #ccc;
            margin-left: 35px;
            margin-bottom: 20px;
            margin-top: 10px;
            border-radius: 10px;
            padding-bottom: 10px;
            a {
              display: inline-block;
              // margin-left: 10px;
              img {
                width: 280px;
                height: 280px;
                // margin-top: 20px;
                margin-bottom: 10px;
              }
            }
            .licenter {
              // height: 70px;
              padding: 0 10px;
              .seckilltitle {
                width: 256px;
                display: block;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin: 0 auto;
                font-size: 24px;
                color: #000;
                margin-bottom: 10px;
              }
              .seckillcenter {
                .jiage {
                  text-align: left;
                  color: #ba2b18;
                  font-size: 26px;
                }
                .jiage1 {
                  text-align: right;
                  display: block;
                  font-size: 24px;
                  text-decoration: line-through;
                }
              }
              .jiage2 {
                text-align: right;
                display: block;
                font-size: 24px;
                text-decoration: line-through;
                margin-right: 5px;
              }
              .anniu {
                text-align: center;
                display: inline-block;
                background-color: #ba2b18;
                width: 130px;
                height: 40px;
                line-height: 40px;
                color: #fff;
                border-radius: 20px;
                font-size: 24px;
                margin-top: 10px;
              }
            }
          }
        }
      }
    }
  }
  .mokuai {
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    img {
      // height: 288px;
      width: 48%;
    }
  }
  .van-hairline--top-bottom.van-tabbar.van-tabbar--fixed {
    background-color: #343740;
    .van-tabbar-item {
      color: #fff;
    }
    .van-tabbar-item.van-tabbar-item--active {
      color: #5b78e8;
    }
  }
  .van-popup {
    width: 60%;
    border-radius: 30px;
    padding: 40px 30px;
    .login-form {
      .form-title {
        text-align: center;
        font-size: 48px;
        color: #f32c2c;
      }
      .form-item {
        position: relative;
        margin-top: 44px;
        .form-label {
          position: relative;
          display: flex;
          padding-bottom: 1px;
          border-bottom: 1px solid #e5e5e5;
          .svg-icon {
            // width: 64px;
            // height: 64px;
            max-width: 46px;
            margin-top: 16px;
            font-size: 46px;
          }
          .form-input {
            width: 96%;
            height: 60px;
            font-size: 30px;
            text-indent: 12px;
            color: #666;
            border: none;
            outline: none;
            margin-top: 16px;
            flex: 1;
          }
          .yan {
            height: 70px;
            width: 32%;
            padding: 10px;
            background-color: #f32c2c;
            color: #fff;
            font-size: 24px;
            border: none;
            outline: none;
            &:disabled {
              background-color: #ccc;
            }
          }
        }
      }
      .login-submit {
        display: block;
        margin: 0 auto;
        width: 90%;
        // padding: 0;
        height: 76px;
        line-height: 76px;
        // outline: none;
        border: none;
        border-radius: 38px;
        // position: absolute;
        // bottom: 40px;
        color: #ffffff;
        font-size: 36px;
        background-color: #f32c2c;
        margin-top: 20px;
        // &.active {
        //     background: #ff874b;
        //     color: #fff;
        //     -webkit-box-shadow: 0 5px 10px #ff874b;
        //     box-shadow: 0 5px 10px #ff874b;
        // }
      }
    }
  }
}
</style>
