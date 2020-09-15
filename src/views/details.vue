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
      </van-tabbar-item> -->
      <van-tabbar-item to="/personalcenter">
        <span>个人中心</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active4 ? icon.active4 : icon.inactive4"
        />
      </van-tabbar-item>
    </van-tabbar>
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(order, index) in orders" :key="index">
        <img :src="img + order.img_url" alt />
      </van-swipe-item>
    </van-swipe>
    <div class="details">
  <div class="detailstop" v-for="(order, index) in orderstwo" :key="index">
        <!-- <p class="detailstopP">Apple Watch Series 5智能手表（深空黑色不锈钢表壳 运动型表带)</p> -->
        <p class="detailstopP">{{ order.title }}</p>
        <p class="father detailstopPspan">
          <span >{{ order.tags }}</span>
        </p>
      </div>
      <div class="detailscenter">
        <p class="detailscenterP father">
          <span class="fl">
            <img src="./../img/pitchup.png" alt srcset />
            极速退货
          </span>
          <span class="centerspan">
            <img src="./../img/pitchup.png" alt srcset />
            正品保障
          </span>
          <span class="fr">
            <img src="./../img/pitchup.png" alt srcset />
            运费险赠送
          </span>
        </p>
      </div>
      <div class="detailsbottom" @click="EventSku">
        <p class="detailssbottomP father">
          <span class="fl sbottomspan1">产品规格：</span>
          <span class="sbottomspan2">产品尺寸</span>
          <span class="sbottomspan3">产品颜色</span>
          <span class="fr sbottomspan4">
            <img src="./../img/pitchup.png" alt srcset />
          </span>
        </p>
      </div>
    </div>
    <div class="commoditydetails">
      <p>————&nbsp;&nbsp;宝贝详情&nbsp;&nbsp;————</p>
      <div v-for="(order, index) in imgs" :key="index">
        <img :src="img + order.url" alt srcset />
      </div>
    </div>
    <!-- <div class="xiajia" v-if="id == 4 || id == 3 || id == 6 || id == 5">产品已经下架啦~~</div> -->
    <div class="bottom father">
      <a class="bottomimg fl" href="tel:400-021-0356">
        <img src="./../img/service.png" alt srcset />
        <span>客服</span>
      </a>
      <!-- <p class="fl bottomp bottomptwo" @click="EventSku">加入购物车</p> -->
      <p class="fr bottomp1" @click="EventSku" v-if="id == 4 || id == 3 || id == 8 || id == 11 || id==72  || id==73 || id ==9 " />
     
    </div>
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :show-add-cart-btn="false"
      :initial-sku="initialSku"
      buy-text="确定"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    >
      <template slot="sku-stepper" slot-scope="props">
        <span style="display: none">{{ props.price }}</span>
      </template>
    </van-sku>
    <!-- 登录 -->
    <div class="van-popupss">
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
  </div>
</template>

<script>
import { Swipe, SwipeItem, Sku, Popup, Tabbar, TabbarItem } from "vant";
import {
  goodsdetail,
  shoppingcart,
  login,
  verify,
  binding
} from "./services/home";

export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Sku.name]: Sku,
    [Popup.name]: Popup,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      loginshow: false,
      overlay: false,
      mobile: "",
      verify: "",
      timeFlag: true,
      count: 30,
      active: 0,
      id: "",
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
      orders: [],
      orderstwo: [],
      imgs: [],
      img: "http://esimwx.10010sh.cn:8999/wxunicom/test_terminal_shop/public",
      show: false,
      goods: {
        // 商品标题
        title: "测试商品",
        // 默认商品 sku 缩略图
        picture: "https://img.yzcdn.cn/1.jpg"
      },
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            v: [
              {
                id: "30349", // skuValueId：规格值 id
                name: "红色", // skuValueName：规格值名称
                imgUrl: "https://img.yzcdn.cn/1.jpg", // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: "https://img.yzcdn.cn/1p.jpg" // 用于预览显示的规格类目图片
              },
              {
                id: "1215",
                name: "蓝色",
                imgUrl: "https://img.yzcdn.cn/2.jpg",
                previewImgUrl: "https://img.yzcdn.cn/2p.jpg"
              }
            ],
            k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          },
          {
            k: "尺寸",
            k_id: "2",
            v: [
              {
                id: "1193",
                name: "1"
              },
              {
                id: "1194",
                name: "2"
              }
            ],
            k_s: "s2",
            count: 2
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: "1215", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1193", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 2260,
            price: 110,
            discount: 112,
            s1: "1215",
            s2: "1194",
            s3: "0",
            s4: "0",
            s5: "0",
            stock_num: 2, //库存
            goods_id: 946755
          },
          {
            id: 2257,
            price: 130,
            discount: 132,
            s1: "30349",
            s2: "1193",
            s3: "0",
            s4: "0",
            s5: "0",
            stock_num: 40, //库存
            goods_id: 946755
          },
          {
            id: 2258,
            price: 100,
            discount: 100,
            s1: "30349",
            s2: "1194",
            s3: "0",
            s4: "0",
            s5: "0",
            stock_num: 50, //库存
            goods_id: 946755
          }
        ],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        //   messages: [
        //     {
        //       // 商品留言
        //       datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
        //       multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
        //       name: '留言', // 留言名称
        //       type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
        //       required: '1', // 是否必填 '1' 表示必填
        //       placeholder: '' // 可选值，占位文本
        //     }
        //   ],
        hide_stock: false // 是否隐藏剩余库存
      },
      initialSku: {
        s1: "",
        s2: ""
      }
    };
  },
  mounted() {
    this.goodsdetail();
    this.getUser()
  },
  methods: {
    goodsdetail() {
      console.log("goodsdetail")
      let url = window.location.href;
      // let id = url.split('?')[1].split('=')[1]
      this.id = url
        .split("#")[1]
        .split("?")[1]
        .split("=")[1];
      // let openid = url.split('?')[1].split('&')[1].split('=')[1]
      let gid = {
        g_id: this.id
      };
      console.log(this.id)
      goodsdetail(gid).then(resp => {
        console.log("---")
        console.log(resp.data);
         console.log("---")
        this.goods.title = resp.data.goods_info[0].title;
        // this.goods.picture =
      //  this.img + resp.data.goods_info[0].colour[0].colour_img;
        let orders = resp.data.goods_info[0].banner;
        let orderstwo = resp.data.goods_info;
        let imgs = resp.data.goods_info[0].detail_img;
        if (orders && orders.length > 0) {
          this.orders = orders;
        }
        if (orderstwo && orderstwo.length > 0) {
          this.orderstwo = orderstwo;
        }
        if (imgs && imgs.length > 0) {
          this.imgs = imgs;
        }

        // 获取产品sku数据结构
        const carts = resp.data.goods_info[0];

        // 颜色 { k: '颜色', v: [], k_s: 's1' }
        const cartColors = carts.colour;
        console.log(cartColors);
        cartColors.forEach(x => {
          x.id = x.colour;
          x.name = x.colour;
          x.previewImgUrl = this.img + x.colour_img;
          x.imgUrl = this.img + x.colour_img;
          return x;
        });

        // 尺寸 { k: '尺寸', v: [], k_s: 's2' }
        const cartSizes = carts.size;
        if (cartSizes.length !== 0) {
          cartSizes.forEach(x => {
            x.id = x.size;
            x.name = x.size;
            return x;
          });
        }

        // 商品详细列表，{id: , price: , s1: '颜色', s2: '尺寸' }
        const cartList = carts.prices;

        cartList.forEach(x => {
          x.s1 = x.colour;
          x.s2 = x.size;
          x.stock_num = x.stock || 0;
          x.price = parseInt(Number(x.price) * 100, 10); // 单位（分）
          x.goods_id = carts.id; // 商品id
        });
        console.log(cartList);
        let fSize = "";
        let fcolor = "";
        for (let i = 0; i < cartList.length; i++) {
          if (cartList[i].stock > 0) {
            fSize = cartList[i].size;
            fcolor = cartList[i].colour;
            break;
          }
        }
        this.initialSku = {
          s1: fcolor,
          s2: fSize
        };
        // 商品 默认价格
        const defaultPrice = carts.price;
        if (cartSizes.length != 0) {
          this.sku = {
            tree: [
              {
                k: "颜色",
                v: cartColors,
                k_s: "s1"
              },
              {
                k: "尺寸",
                v: cartSizes,
                k_s: "s2"
              }
            ],
            list: cartList,
            price: defaultPrice
          };
        } else {
          this.sku = {
            tree: [
              {
                k: "颜色",
                v: cartColors,
                k_s: "s1"
              }
            ],
            list: cartList,
            price: defaultPrice
          };
        }
      });
    },
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
          "http://esimwx.10010sh.cn:8999/wxunicom/test_terminal_shop/ShoppingMall/index.html#/details?id=" +
          this.id;
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
          // alert(resp)
          // alert(resp.data.isMobile)
          let isMobile = resp.data.isMobile;
          if (isMobile == false || isMobile == "") {
            // alert('11111')
            this.show = false;
            this.loginshow = true;
            return false;
          }
        });
      }
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
    EventSku() {
      this.$router.push({
        path: "/subscribe",
        query: {
          goodsId: this.id,

        }
      });
      // if (this.id == 4 || this.id == 3 || this.id == 6 || this.id == 5) {
      //   // console.log('111')
      // } else {
     // this.show = true;
      ///    }
    },
    // 立即购买
    onBuyClicked(buyData) {
      // 点击立即购买的回调
      // 获取选择的商品
      console.log(buyData)
      const selectedData = buyData.selectedSkuComb;

      // 商品ID
      const goodsId = selectedData.goods_id;
      // 颜色
      const color = selectedData.s1;
      // 尺寸
      const size = selectedData.s2;
      // 价格
      const price = (selectedData.price || 0) / 100; // 转成元
      // window.sessionStorage.setItem('price', price)
      // window.sessionStorage.setItem('goodsId', goodsId)
      // window.sessionStorage.setItem('color', color)
      // window.sessionStorage.setItem('size', size)
      this.$router.push({
        path: "/subscribe",
        query: {
          price: price,
          goodsId: goodsId,
          color: color,
          size: size
        }
      });
    },
    // 加入购物车
    onAddCartClicked(skuData) {
      console.log(skuData);
      let gId = skuData.selectedSkuComb.gid;
      let price = (skuData.selectedSkuComb.price || 0) / 100;
      let size = skuData.selectedSkuComb.size;
      let colour = skuData.selectedSkuComb.colour;
      let detailslist = {
        g_id: gId,
        price: price,
        size: size,
        colour: colour
      };
      shoppingcart(detailslist).then(resp => {
        let code = resp.code;
        if (code == 200) {
          this.$router.push({
            path: "/shoppingcart"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home .bottom[data-v-9d209fd0] {
  bottom: 1.12rem;
}
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
}
p {
  margin: 0;
}
.home {
  width: 750px;
  min-height: 101vh;
  background-color: #efefef;
  color: #333;
  padding: 0;
  .van-swipe {
    height: 580px;
    width: 750px;
    img {
      height: 580px;
      width: 100%;
    }
  }
  .details {
    padding: 30px 30px 0;
    .detailstop {
      border-radius: 20px;
      background-color: #fff;
      padding: 10px 100px 10px 10px;
      margin-bottom: 30px;
      .detailstopP {
        text-align: left;
        font-size: 26px;
        margin-bottom: 10px;
      }
      .detailstopPspan {
        height: 40px;
        line-height: 40px;
        .detsilsspan1 {
          font-size: 28px;
          color: #e52424;
        }
        .detsilsspan2 {
          text-decoration: line-through;
          font-size: 20px;
          color: #888;
          margin-left: 10px;
        }
        .detsilsspan3 {
          font-size: 20px;
          color: #666;
          margin-left: 30px;
        }
        .detsilsspan4 {
          font-size: 20px;
          color: #666;
        }
      }
    }
    .detailscenter {
      border-radius: 20px;
      background-color: #fff;
      padding: 15px 100px 15px 15px;
      margin-bottom: 30px;
      .detailscenterP {
        span {
          display: inline-block;
          img {
            width: 20px;
          }
        }
        .centerspan {
          display: inline-block;
          margin-left: 20%;
        }
      }
    }
    .detailsbottom {
      border-radius: 20px;
      background-color: #fff;
      padding: 15px;
      .detailssbottomP {
        height: 40px;
        line-height: 40px;
        .sbottomspan1 {
          font-size: 22px;
        }
        .sbottomspan2 {
          font-size: 20px;
          color: #666;
        }
        .sbottomspan3 {
          font-size: 20px;
          color: #666;
          margin-left: 20px;
        }
        .sbottomspan3 {
          img {
            width: 30px;
          }
        }
      }
    }
  }
  .commoditydetails {
    text-align: center;
    margin-bottom: 210px;
    p {
      font-size: 24px;
      color: #666;
      margin-top: 20px;
      margin-bottom: 30px;
    }
    img {
      display: block;
      width: 100%;
    }
  }
  .xiajia {
    width: 100%;
    position: fixed;
    bottom: 210px;
    color: #fff;
    text-align: center;
    line-height: 50px;
    background: #333;
  }
  .bottom {
    width: 630px;
    // height: 98px;
    background-color: #fff;
    position: fixed;
    bottom: 100px;
    padding: 20px 60px;
    text-align: center;
    border-top: 2px solid #e5e5e5;
    .bottomimg {
      display: inline-block;
      width: 50px;
      img {
        width: 34px;
      }
      span {
        font-size: 24px;
        color: #a1a1a1;
      }
    }
    .bottomp {
      width: 225px;
      height: 65px;
      line-height: 65px;
      background-color: #e52424;
      color: #fff;
      border-radius: 40px;
      font-size: 32px;
    }
    .bottomp1 {
      background: url("../img/daohuo.png");
      width: 3rem;
      height: 0.93rem;
      background-size: 100%;
    }
    .bottomptwo {
      margin-left: 100px;
      background-color: #ffb650;
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
  .van-popupss {
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
}
</style>
