<template>
  <div class="home">
    <div class="title">
      <span class="cion"></span>
      <p class="seckilltop">eSIM&nbsp;{{type}}专区</p>
    </div>
    <div class="centerlistkong" v-show="chanpin">
      <p>宝贝已售罄，敬请期待产品上新哦~</p>
    </div>
    <div class="centerlist" v-show="!chanpin">
      <div class="list father" v-for="(order, index) in orders" :key="index" @click="qianggou(order.id)">
        <!-- <a :href="order.introduce"> -->
          <img :src="img + order.cover" alt srcset class="fl" />
        <!-- </a> -->
        <div class="fl listyou">
          <p class="listP">{{order.title}}</p>
          <p class="listP1">{{ order.tags }}</p>
          <!-- <p class="listP1">{{order.introduce}}</p> -->
          <!-- <p class="listP2 father">
            <span class="listSpan1 fl">￥{{order.price}}</span>
            <span class="listSpan2">￥{{order.ori_price}}</span>
          </p> -->
        </div>
        <!-- <a :href="order.introduce"> -->
          <span class="listSpan3 fr"></span>
        <!-- </a> -->
      </div>
    </div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/">
        <span>首页</span>
        <img slot="icon" slot-scope="props" :src="props.active1 ? icon.active1 : icon.inactive1" />
      </van-tabbar-item>
      <van-tabbar-item to="/allShang">
        <span>全部商品</span>
        <img slot="icon" slot-scope="props" :src="props.active2 ? icon.active2 : icon.inactive2" />
      </van-tabbar-item>
      <!-- <van-tabbar-item to="/shoppingcart">
                <span>购物车</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive" />
      </van-tabbar-item>-->
      <van-tabbar-item to="/personalcenter">
        <span>个人中心</span>
        <img slot="icon" slot-scope="props" :src="props.active4 ? icon.active4 : icon.inactive4" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { gettypegoods } from "./services/home";
import { Tabbar, TabbarItem } from "vant";

export default {
  name: "home",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      active: 1,
      icon: {
        active1: require("./../img/coin1-1.png"),
        inactive1: require("./../img/coin1.png"),
        active2: require("./../img/coin2-1.png"),
        inactive2: require("./../img/coin2.png"),
        active: require("./../img/coin3-1.png"),
        inactive: require("./../img/coin3.png"),
        active4: require("./../img/coin4-1.png"),
        inactive4: require("./../img/coin4.png")
      },
      orders: [],
      img: "http://esimwx.10010sh.cn:8999/wxunicom/test_terminal_shop/public",
      chanpin: true,
      type: {}
    };
  },
  mounted() {
    this.listone();
    this.type = this.$route.query.type;
    // console.log(this.type);
  },
  methods: {
    listone() {
      let type = {
        type: 8
      };
      gettypegoods(type).then(resp => {
        // console.log(resp.data.type_goods);
        let orders = resp.data.type_goods;
        if (orders && orders.length > 0) {
          this.orders = orders;
          this.chanpin = false;
        } else {
          this.chanpin = true;
        }
      });
    },
    qianggou(id) {
      console.log(id);
      this.$router.push({
        path: "/details",
        query: { id: id }
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
}
p {
  margin: 0 auto;
}
.home {
  width: 750px;
  min-height: 101vh;
  background-color: #efefef;
  color: #333;
  padding-bottom: 95px;
  .title {
    // height: 60px;
    padding: 30px;
    span.cion {
      display: inline-block;
      width: 10px;
      height: 40px;
      background-color: #999;
      float: left;
    }
    .seckilltop {
      height: 40px;
      line-height: 40px;
      font-size: 30px;
      font-weight: bold;
      margin-left: 20px;
    }
  }
  .centerlistkong {
    text-align: center;
    margin-top: 40px;
    p {
      width: 58%;
      font-size: 40px;
      color: #999999;
    }
  }
  .centerlist {
    padding: 0 20px;
    .list {
      height: 160px;
      background-color: #fff;
      border-radius: 10px;
      // padding: 10px 0;
      margin-bottom: 20px;
      img {
        height: 100%;
        padding: 0 40px;
        border-radius: 10px 0 0 10px;
        background: url("./../img/kuang.png") no-repeat;
        background-size: 100% 100%;
      }
      .listyou {
        max-width: 40%;
        margin: 30px 40px 0px 20px;
        .listP {
          font-size: 24px;
          color: #000;
          margin-bottom: 10px;
        }
        .listP1 {
          font-size: 20px;
          color: #333;
        }
        .listP2 {
          margin-top: 20px;
          .listSpan1 {
            font-size: 30px;
            color: #ff0000;
            font-weight: 600;
          }
          .listSpan2 {
            display: inline-block;
            font-size: 24px;
            color: #999999;
            margin-left: 10px;
            margin-top: 5px;
            text-decoration: line-through;
          }
        }
      }
      .listSpan3 {
        display: inline-block;
        width: 160px;
        height: 50px;
        margin-right: 30px;
        margin-top: 55px;
        background: url("./../img/lijiyuyue.png") no-repeat;
        background-size: 100% 100%;
      }
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
}
</style>