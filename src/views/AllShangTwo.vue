<template>
  <div class="home">
    <div class="sousuo">
      <form action="/">
        <van-search
          placeholder="搜索商品"
          show-action
          @search="onSearch"
          @cancel="onCancel"
          v-model="search"
        />
      </form>
    </div>
    <div class="details">
      <ul class="father">
        <li v-for="(order, index) in orders" :key="index">
          <a :href="order.introduce">
          <!-- <img :src="img + order.cover" alt="" srcset="" @click="ShoppingCart(order.id)"> -->
          <img :src="img + order.cover" alt="" srcset="">
          </a>
          <div class="licenter">
                <p class="seckilltitle">{{order.title}}</p>
                <p class="seckillcenter father">
                  <span class="jiage fl">{{order.price}}</span>
                  <span class="jiage1">{{order.ori_price}}</span>
                  <a :href="order.introduce">
                  <img class="fr" src="./../img/cart.png" alt="" srcset="">
                  </a>
                </p>
              </div>  
        </li>
      </ul>
    </div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/">
        <span>首页</span>
        <img slot="icon" slot-scope="props" :src="props.active1 ? icon.active1 : icon.inactive1" />
      </van-tabbar-item>
      <van-tabbar-item to="/allShang">
        <span>全部商品</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive" />
      </van-tabbar-item>
      <!-- <van-tabbar-item to="/shoppingcart">
        <span>购物车</span>
        <img slot="icon" slot-scope="props" :src="props.active3 ? icon.active3 : icon.inactive3" />
      </van-tabbar-item> -->
      <van-tabbar-item to="/personalcenter">
        <span>个人中心</span>
        <img slot="icon" slot-scope="props" :src="props.active4 ? icon.active4 : icon.inactive4" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { goodssearch } from "./services/home";
import {  Search, Tabbar, TabbarItem, Toast, Dialog } from "vant";

export default {
  name: "home",
  components: {
    [Search.name]: Search,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
  },
  data() {
    return {
      active: 1,
      img: 'http://esimwx.10010sh.cn:8999/wxunicom/test_terminal_shop/public',
      orders: [],
      icon: {
        active1: require("./../img/coin1-1.png"),
        inactive1: require("./../img/coin1.png"),
        active: require("./../img/coin2-1.png"),
        inactive: require("./../img/coin2.png"),
        active3: require("./../img/coin3-1.png"),
        inactive3: require("./../img/coin3.png"),
        active4: require("./../img/coin4-1.png"),
        inactive4: require("./../img/coin4.png")
      },
      search:""
    };
  },
  mounted () {
    let search = this.$route.query.search
    this.search = search
    this.goodssearch()
  },
  methods: {
    goodssearch () {
      goodssearch(this.search).then(resp => {
        console.log(resp)
        let orders = resp.data.goods
        if (orders && orders.length > 0) {
            this.orders = orders
        }else {
          Dialog.alert({
            message: '未搜索到商品~'
          }).then(() => {
            this.$router.go(-1)
          });
        }
      })
    },
    // 确定搜索时触发
    onSearch () {
      this.goodssearch()
    },
    onCancel () {
      this.$router.go(-1)
    },
    ShoppingCart (id) {
      console.log(id)
      this.$router.push({
        path: "/details", 
        query: { id: id }
      })
    }
  }
};
</script>

<style lang="scss">
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
  min-height: 100vh;
  background-color: #efefef;
  color: #333;
  // padding-bottom: 95px;
  // 搜索
  .sousuo{
    background-color: #efefef;
    height: 110px;
    border-bottom: 1px solid #dbdbdb;
    .van-search {
      background: #efefef !important;
      .van-search__content {
        background-color: #fff;
        .van-field__body {
          height: 50px;
          input {
            height: 50px;
          }
        }
      }
    }
  }
  .details {
    padding-left: 20px;
    padding-right: 20px;
    height: 100%;
    margin-top: 30px;
    margin-bottom: 100px;
    text-align: left;
    ul {
      width: 100%;
      li {
        width: 300px;
        // height: 420px;
        border-radius: 20px;
        background-color: #fff;
        float: left;
        margin-left: 37px;
        margin-bottom: 20px;
        padding-bottom: 20px;
        img {
          width: 300px;
          height: 298px;
          border-radius: 20px 20px 0 0;
        }
        .licenter {
          // height: 115px;
          padding: 0 20px;
          .seckilltitle {
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin: 0 auto;
            margin-bottom: 10px;
            font-size: 22px;
            color: #000;
            margin-bottom: 10px;
            // margin-top: 10px;
          }
          .seckillcenter {
            .jiage {
              color: #ba2b18;
              font-size: 26px;
            }
            .jiage1 {
                  font-size: 24px;
                  text-decoration:line-through;
                }
            img {
              width: 38px;
              height: 31px;
            }
          }
        }
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