<template>
  <div class="home">
    <div class="sousuo">
      <form action="/">
        <van-search
          placeholder="搜索商品"
          show-action
          @search="onSearch"
          v-model="search"
        />
      </form>
    </div>
    <div class="tab">
      <van-tabs type="card" @click="onClick">
        <van-tab title="综合">
          <div class="details">
            <ul class="father">
              <li v-for="(order, index) in orders" :key="index">
                <img :src="img + order.cover" alt="" srcset="" @click="ShoppingCart(order.id,order.introduce)">
                 <!-- 外链 -->
                <!-- <a :href="order.introduce">
                  <img :src="img + order.cover" alt="" srcset="">
                </a> -->
                <div class="licenter">
                      <p class="seckilltitle">{{order.title}}</p>
                  <p class="seckillcenter father" v-if="order.introduce==''">
                    <span class="listSpan3 fr" @click="ShoppingCart(order.id,order.introduce)">立即预约</span>                 
       
                  </p>
                  <p class="seckillcenter father" v-else>
                    <span class="jiage fl">￥{{order.price}}</span>                    
                    <span class="jiage1 fl">￥{{order.ori_price}}</span>
                        <!-- <a @click="ShoppingCart(order.id,order.introduce)"> -->
                        <!-- <a :href="order.introduce"> -->
                        <!-- <img class="fr" src="./../img/cart.png" alt="" srcset=""> -->
                        <!-- </a> -->
                      </p>
                    </div>  
              </li>
            </ul>
          </div>
        </van-tab>
        <van-tab title="销量">
          <div class="details">
            <ul class="father">
              <li v-for="(order, index) in orderstwo" :key="index">
                <img :src="img + order.cover" alt="" srcset="" @click="ShoppingCart(order.id,order.introduce)">
                <!-- 外链 -->
                <!-- <a :href="order.introduce">
                  <img :src="img + order.cover" alt="" srcset="">
                </a> -->
                <div class="licenter">
                  <p class="seckilltitle">{{order.title}}</p>
                  <p class="seckillcenter father" v-if="order.introduce==''">
                    <span class="listSpan3 fr" @click="ShoppingCart(order.id,order.introduce)">立即预约</span>                 
                 
                  </p>
                  <p class="seckillcenter father" v-else>
                    <span class="jiage fl">￥{{order.price}}</span>                    
                    <span class="jiage1 fl">￥{{order.ori_price}}</span>
                    <!-- <a @click="ShoppingCart(order.id,order.introduce)"> -->
                    <!-- <a :href="order.introduce"> -->
                    <!-- <img class="fr" src="./../img/cart.png" alt="" srcset=""> -->
                    <!-- </a> -->
                  </p>
                </div>  
              </li>
            </ul>
          </div>
        </van-tab>
        <van-tab title="新品">
          <div class="details">
            <ul class="father">
              <li v-for="(order, index) in ordersthree" :key="index">
                <img :src="img + order.cover" alt="" srcset="" @click="ShoppingCart(order.id,order.introduce)">
                <!-- 外链 -->
                <!-- <a :href="order.introduce">
                  <img :src="img + order.cover" alt="" srcset="">
                </a> -->
                <div class="licenter">
                  <p class="seckilltitle">{{order.title}}</p>
                  <p class="seckillcenter father" v-if="order.introduce==''">
                    <span class="listSpan3 fr" @click="ShoppingCart(order.id,order.introduce)">立即预约</span>                 
                
                  </p>
                  <p class="seckillcenter father" v-else>
                    <span class="jiage fl">￥{{order.price}}</span>                    
                    <span class="jiage1 fl">￥{{order.ori_price}}</span>
                    <!-- <a @click="ShoppingCart(order.id,order.introduce)"> -->
                    <!-- <a :href="order.introduce"> -->
                    <!-- <img class="fr" src="./../img/cart.png" alt="" srcset=""> -->
                    <!-- </a> -->
                  </p>
                </div>  
              </li>
            </ul>
          </div>
        </van-tab>
        <van-tab title="价格">
          <div slot="title" class="title">
            价格
            <p class="trianglep" >
              <span :class="isRise ? 'triangleRed1' : 'triangle1'" @click="EventTab(0)"></span>
              <span :class="isDrop ? 'triangleRed' : 'triangle'" @click="EventTab(1)"></span>
              </p>
          </div>
          <!-- 价格价格价格 -->
          <div class="details">
            <ul class="father">
              <li v-for="(order, index) in ordersfour" :key="index">
                <img :src="img + order.cover" alt="" srcset="" @click="ShoppingCart(order.id,order.introduce)">
                <!-- 外链 -->
                <!-- <a :href="order.introduce">
                  <img :src="img + order.cover" alt="" srcset="">
                </a> -->
                <div class="licenter">
                  <p class="seckilltitle">{{order.title}}</p>
                  <p class="seckillcenter father" v-if="order.introduce==''">
                    <span class="listSpan3 fr" @click="ShoppingCart(order.id,order.introduce)">立即预约</span>                 
                
                  </p>
                  <p class="seckillcenter father" v-else>
                    <span class="jiage fl">￥{{order.price}}</span>                    
                    <span class="jiage1 fl">￥{{order.ori_price}}</span>
                    <!-- <a @click="ShoppingCart(order.id,order.introduce)"> -->
                    <!-- <a :href="order.introduce"> -->
                    <!-- <img class="fr" src="./../img/cart.png" alt="" srcset=""> -->
                    <!-- </a> -->
                  </p>
                </div>  
              </li>
            </ul>
          </div>
        </van-tab>
      </van-tabs>
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
import { goodsSort } from "./services/home";
import {  Search, Tabbar, TabbarItem, Tab, Tabs, Toast } from "vant";

export default {
  name: "home",
  inject: ["reload"],
  components: {
    [Search.name]: Search,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Toast.name]: Toast,
  },
  data() {
    return {
      active: 1,
      img: 'http://esimwx.10010sh.cn:8999/wxunicom/test_terminal_shop/public',
      orders: [],
      orderstwo: [],
      ordersthree: [],
      ordersfour: [],
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
      search: '',
      isRise: false,
      isDrop: false
    };
  },
  created() {
    let isReload = window.localStorage.getItem('isReload')
    if (isReload == null) {
      location.reload()
      window.localStorage.setItem('isReload','111')
    }
  },
  mounted () {
    // this.reload()

    let sort = {
      sort : 1
    }
    goodsSort (sort).then (resp => {
      let orders = resp.data.goods
        if (orders && orders.length > 0) {
            this.orders = orders
          }
    })

  },
  destroyed() {
    window.localStorage.removeItem('isReload')
  },
  methods: {
    onClick(name, title) {
      if (title == "综合") {
        let sort = {
          sort : 1
        }
        goodsSort (sort).then (resp => {
          let orders = resp.data.goods
        if (orders && orders.length > 0) {
            this.orders = orders
          }
        })
      }
      if (title == "销量") {
        let sort = {
          sort : 2
        }
        goodsSort (sort).then (resp => {
          // console.log(resp)
          let orderstwo = resp.data.goods
          // console.log(orderstwo)
        if (orderstwo && orderstwo.length > 0) {
            this.orderstwo = orderstwo
          }
        })
      }
      if (title == "新品") {
        let sort = {
          sort : 5
        }
        goodsSort (sort).then (resp => {
          // console.log(resp)
          let ordersthree = resp.data.goods
          // console.log(ordersthree)
        if (ordersthree && ordersthree.length > 0) {
            this.ordersthree = ordersthree
          }
        })
      }
      if (title=="价格") {
        if (this.isDrop) {
          this.isDrop = false
          this.isRise = true
          let sort = {
            sort : 4
          }
          goodsSort (sort).then (resp => {
            // console.log(resp)
            let ordersfour = resp.data.goods
            // console.log(ordersfour)
          if (ordersfour && ordersfour.length > 0) {
              this.ordersfour = ordersfour
            }
          })
        } else {
          this.isDrop = true
          this.isRise = false
          let sort = {
            sort : 3
          }
          goodsSort (sort).then (resp => {
            // console.log(resp)
            let ordersfour = resp.data.goods
            // console.log(ordersfour)
          if (ordersfour && ordersfour.length > 0) {
              this.ordersfour = ordersfour
            }
          })
        }
      }
      if(title!="价格"){
        this.isDrop=true;
        this.isRise=true;
      }

    },
    EventTab (type) {
      if(type===0){
         let sort = {
            sort : 4
          }
        this.isRise=!this.isRise;
         goodsSort (sort).then (resp => {
            // console.log(resp)
            let ordersfour = resp.data.goods
            // console.log(ordersfour)
          if (ordersfour && ordersfour.length > 0) {
              this.ordersfour = ordersfour
            }
          })
      }else if(type===1){
         let sort = {
            sort : 3
          }
        this.isDrop=!this.isDrop;
         goodsSort (sort).then (resp => {
            // console.log(resp)
            let ordersfour = resp.data.goods
            // console.log(ordersfour)
          if (ordersfour && ordersfour.length > 0) {
              this.ordersfour = ordersfour
            }
          })
      }

    },
    ShoppingCart (id,introduce) {
    
      if (introduce=='') {
        // console.log('111')
        this.$router.push({
          path: "/details", 
          query: { id: id }
        })
      } else {
        // console.log('222')
        // console.log(introduce)
        window.location.href = introduce
      }
      
    },
    // 确定搜索时触发
    onSearch () {
      let search = this.search
      // console.log(search)
      this.$router.push({
        path: "/allShangtwo", 
        query: { 
          search: search,
        }
      })
    },
  }
};
</script>

<style lang="scss" >
.father:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}
.father {
  zoom: 1;
  display: flex;
  flex-wrap: wrap;
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
  background-color: #ebeef5;
  color: #333;
  // padding-bottom: 95px;
  // 搜索
  .sousuo{
    background-color: #efefef;
    height: 110px;
    border-bottom: 1px solid #dbdbdb;
    .van-search {
         background: #ebeef5 !important;
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
  .tab {
    height: 100%;
    .van-tabs {
      // width: 20px;
      .van-tabs__wrap {
        height: 60px;
        position: relative;
        .van-tabs__nav {
          box-sizing: border-box;
          height: 60px;
          margin: 0 16px;
          border: 1px solid #e9e6e6;
          background-color:transparent;
          border: none;
          .van-tab {
            border-right:none;
            color: #333;
          }
          .van-tab.van-tab--active{
            border-radius: 30px;
            background-color: #e8e9ea;
            border: 1px solid #dbdbdb;
            color: #333;
          }
        }
      }
      .listSpan3{
       display: inline-block;
    width: 1.883rem;
    color: #5b7deb;
    height: 0.4rem;
    margin-left: 0.13333rem;
    background: white;
    /* margin-left: 28%; */
    border-radius: 0.26667rem;
    background-size: 100% 100%;
    margin-left: 0.26667rem;
    text-align: center;
    padding-top: 5px;
      }
      .title {
        position: relative;
        width: 100px;
      .trianglep{
            top: -0.033333rem;
    right: -0.4rem;
        height: 60px;

        position: absolute;
        .triangle{
          display: inline-block;
          width: 0px;
          height: 0px;
          border: 10px solid transparent;
          border-top-color: black ;
          position: absolute;
          top: 30px;
          right: 30px;
        }
        .triangleRed{
          display: inline-block;
          width: 0px;
          height: 0px;
          border: 10px solid transparent;
          border-top-color: red ;
          position: absolute;
          top: 30px;
          right: 30px;
        }
        .triangle1{
          display: inline-block;
          width: 0px;
          height: 0px;
          border: 10px solid transparent;
          border-bottom-color: black ;
          position: absolute;
          top: 5px;
          right: 30px;
        }
        .triangleRed1{
          display: inline-block;
          width: 0px;
          height: 0px;
          border: 10px solid transparent;
          border-bottom-color: red ;
          position: absolute;
          top: 5px;
          right: 30px;
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
            border: 0.02667rem solid #6cb3ed;
            float: left;
            margin: 20px 0 20px 37px;
            // padding-bottom: 20px;
       
            img {
              display: block;
              width: 50%;
              // height: 298px;
              margin: 0 auto;
              border-radius: 20px 20px 0 0;
            }
 
            .licenter {
              // height: 115px;
              width: 100%;
              background: linear-gradient(#77c0f5, #5976ea);
              border-radius: 0 0 20px 20px;
              padding: 20px 0;
              margin-top: 20px;
              height: 105px;
               
              .seckilltitle {
                display: block;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin: 0 auto;
                margin-bottom: 10px;
                font-size: 26px;
                color: #fff;
                margin-bottom: 10px;
                margin-left: 20px;
              }
              .seckillcenter {
                margin-top: 20px;
                justify-items: center;
             
                .jiage {
                  background: #fff;
                  border-radius: 20px;
                  padding: 5px 10px;
                  color: #ff0000;
                  font-size: 26px;
                  margin-left: 20px;
                }
                .jiage1 {
                  display: block;
                  font-size: 24px;
                  margin-left: 5px;
                  margin-top: 7px;
                  color: #ccc;
                  text-decoration:line-through;
                }
                img {
                  width: 38px;
                  height: 31px;
                  margin-right: 10px;
                }
              }
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